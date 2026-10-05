import Papa from 'papaparse';
import { Initiative } from '../types';
import { resolveLocationCoordinates, getCoordinatesForCountry, normalizeKey } from '../data/geoCoordinates';
import { DEFAULT_SHEET_ID, DEFAULT_SHEET_GID } from '../data/fallbackData';

export function extractSheetInfo(url: string): { sheetId: string; gid: string } {
  let sheetId = DEFAULT_SHEET_ID;
  let gid = DEFAULT_SHEET_GID;

  const idMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (idMatch && idMatch[1]) {
    sheetId = idMatch[1];
  }

  const gidMatch = url.match(/gid=([0-9]+)/);
  if (gidMatch && gidMatch[1]) {
    gid = gidMatch[1];
  } else {
    gid = '';
  }

  return { sheetId, gid };
}

export function buildCsvExportUrl(sheetId: string, gid?: string): string {
  const gidParam = gid ? `&gid=${gid}` : '';
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv${gidParam}&t=${Date.now()}`;
}

export function buildGvizUrl(sheetId: string, gid?: string): string {
  const gidParam = gid ? `&gid=${gid}` : '';
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${gidParam}&t=${Date.now()}`;
}

export function parseRawCsvToInitiatives(csvText: string): Initiative[] {
  const parsed = Papa.parse<string[]>(csvText, {
    skipEmptyLines: true,
  });

  const rows = parsed.data;
  if (!rows || rows.length === 0) return [];

  // Determine if row 0 is header
  let startIndex = 0;
  const firstRow = rows[0].map((c) => String(c).trim());
  const headerKeys = firstRow.map((c) => normalizeKey(c));

  let countryCol = 0;
  let nameCol = 1;
  let topicCol = 2;
  let catCol = 3;
  let linkCol = 4;
  let locationCol = -1;
  let noteCol = 6;
  let followUpCol = 7;
  let suggestedCol = 8;

  // Check if first row is header
  const isHeader = headerKeys.some(
    (k) =>
      k.includes('country') ||
      k.includes('pais') ||
      k.includes('institution') ||
      k.includes('topic') ||
      k.includes('signal') ||
      k.includes('location')
  );

  if (isHeader) {
    startIndex = 1;
    headerKeys.forEach((key, idx) => {
      if (key.includes('country') || key.includes('pais') || key.includes('region') || key.includes('nacion')) {
        countryCol = idx;
      } else if (key.includes('institution') || key.includes('group') || key.includes('event') || key.includes('name') || key.includes('nombre') || key.includes('iniciativa')) {
        nameCol = idx;
      } else if (key.includes('topic') || key.includes('tema') || key.includes('area')) {
        topicCol = idx;
      } else if (key.includes('signal') || key.includes('type') || key.includes('tipo') || key.includes('categor')) {
        catCol = idx;
      } else if (key.includes('link') || key.includes('url') || key.includes('web') || key.includes('sitio') || key.includes('enlace')) {
        linkCol = idx;
      } else if (key.includes('location') || key.includes('ubicacion') || key.includes('ciudad') || key.includes('city') || key.includes('sede')) {
        locationCol = idx;
      } else if (key.includes('note') || key.includes('descrip') || key.includes('resumen') || key.includes('short')) {
        noteCol = idx;
      } else if (key.includes('follow') || key.includes('seguimiento')) {
        followUpCol = idx;
      } else if (key.includes('suggest') || key.includes('suger') || key.includes('autor')) {
        suggestedCol = idx;
      }
    });
  }

  const initiatives: Initiative[] = [];

  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 2) continue;

    const country = (row[countryCol] || '').trim();
    const name = (row[nameCol] || '').trim();
    const topic = (row[topicCol] || '').trim();
    const rawCategory = (row[catCol] || '').trim();
    let category = rawCategory || 'General';
    const lowerCat = rawCategory.toLowerCase();
    if (lowerCat.includes('non-recurrent') || lowerCat.includes('one-time') || lowerCat.includes('one time') || lowerCat.includes('evento único') || lowerCat.includes('evento unico')) {
      category = 'One-time Event';
    } else if (lowerCat.includes('school') || lowerCat.includes('escuela')) {
      category = 'School';
    } else if (lowerCat.includes('regional')) {
      category = 'Regional Conference';
    } else if (lowerCat.includes('national') || lowerCat.includes('nacional')) {
      category = 'National Conference';
    } else if (lowerCat.includes('society') || lowerCat.includes('sociedad')) {
      category = 'Society';
    } else if (lowerCat.includes('workshop')) {
      category = 'Workshop';
    } else if (rawCategory.length > 0) {
      category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
    }
    const rawLink = (row[linkCol] || '').trim();
    const locationRaw = locationCol >= 0 ? (row[locationCol] || '').trim() : '';
    const note = (row[noteCol] || '').trim();
    const potentialFollowUp = (row[followUpCol] || '').trim();
    const suggestedBy = (row[suggestedCol] || '').trim();

    // Skip empty dummy rows or separator lines or instruction notes
    if (!country && !name) continue;
    const lowerCountry = country.toLowerCase();
    const lowerName = name.toLowerCase();
    if (
      lowerCountry === 'country / sub-region' || 
      lowerCountry === 'país' || 
      lowerCountry.startsWith('instruction') || 
      lowerCountry.startsWith('instruccion') ||
      lowerName.startsWith('instruction') ||
      lowerName.startsWith('instruccion')
    ) {
      continue;
    }

    // Check if rawLink is a URL or description
    let url = '';
    let description = note;
    if (rawLink.startsWith('http://') || rawLink.startsWith('https://')) {
      url = rawLink;
    } else if (rawLink && !description) {
      description = rawLink;
    }

    // Leave only what is in the sheet - no synthetic "Iniciativa de ..." fallback
    description = description || '';

    // Prioritize Location (if exist) to resolve map coordinates
    const location = resolveLocationCoordinates(locationRaw, country);

    initiatives.push({
      id: `init-${i}-${normalizeKey(name || country)}`,
      country: country || 'Latinoamérica',
      name: name || 'Iniciativa sin nombre',
      topic: topic || 'General',
      category: category.charAt(0).toUpperCase() + category.slice(1),
      description,
      url,
      locationRaw: locationRaw || undefined,
      potentialFollowUp,
      suggestedBy,
      lat: location.lat,
      lng: location.lng,
      cityName: location.name,
      rawIndex: i,
    });
  }

  return initiatives;
}

export async function fetchSpreadsheetData(sheetId: string, gid: string): Promise<Initiative[]> {
  const exportUrl = buildCsvExportUrl(sheetId, gid);
  
  try {
    const response = await fetch(exportUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv, text/plain, */*',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const csvText = await response.text();
    const initiatives = parseRawCsvToInitiatives(csvText);
    
    if (initiatives.length === 0) {
      throw new Error('La planilla se leyó pero no se encontraron filas con iniciativas válidas.');
    }

    return initiatives;
  } catch (primaryError) {
    console.warn('Error fetching CSV directly, trying GViz endpoint...', primaryError);
    // Try gviz endpoint as backup
    const gvizUrl = buildGvizUrl(sheetId, gid);
    const response2 = await fetch(gvizUrl, { cache: 'no-store' });
    if (!response2.ok) {
      throw new Error(`No se pudo conectar a la planilla de Google. Verifique que tenga permisos de lectura públicos.`);
    }
    const csvText2 = await response2.text();
    return parseRawCsvToInitiatives(csvText2);
  }
}
