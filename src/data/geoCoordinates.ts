export interface LocationCoord {
  name: string;
  lat: number;
  lng: number;
}

export const LATAM_COORDINATES: Record<string, LocationCoord> = {
  argentina: { name: "Buenos Aires, Argentina", lat: -34.6037, lng: -58.3816 },
  bolivia: { name: "La Paz, Bolivia", lat: -16.5000, lng: -68.1500 },
  brasil: { name: "Brasilia, Brasil", lat: -15.7938, lng: -47.8828 },
  brazil: { name: "Brasilia, Brasil", lat: -15.7938, lng: -47.8828 },
  chile: { name: "Santiago, Chile", lat: -33.4489, lng: -70.6693 },
  colombia: { name: "Bogotá, Colombia", lat: 4.7110, lng: -74.0721 },
  costarica: { name: "San José, Costa Rica", lat: 9.9281, lng: -84.0907 },
  cuba: { name: "La Habana, Cuba", lat: 23.1136, lng: -82.3666 },
  ecuador: { name: "Quito, Ecuador", lat: -0.1807, lng: -78.4678 },
  elsalvador: { name: "San Salvador, El Salvador", lat: 13.6929, lng: -89.2182 },
  guatemala: { name: "Ciudad de Guatemala, Guatemala", lat: 14.6349, lng: -90.5069 },
  honduras: { name: "Tegucigalpa, Honduras", lat: 14.0723, lng: -87.1921 },
  mexico: { name: "Ciudad de México, México", lat: 19.4326, lng: -99.1332 },
  nicaragua: { name: "Managua, Nicaragua", lat: 12.1150, lng: -86.2362 },
  panama: { name: "Ciudad de Panamá, Panamá", lat: 8.9824, lng: -79.5199 },
  paraguay: { name: "Asunción, Paraguay", lat: -25.2637, lng: -57.5759 },
  peru: { name: "Lima, Perú", lat: -12.0464, lng: -77.0428 },
  puertorico: { name: "San Juan, Puerto Rico", lat: 18.4655, lng: -66.1057 },
  republicadominicana: { name: "Santo Domingo, Rep. Dominicana", lat: 18.4861, lng: -69.9312 },
  dominicanrepublic: { name: "Santo Domingo, Rep. Dominicana", lat: 18.4861, lng: -69.9312 },
  uruguay: { name: "Montevideo, Uruguay", lat: -34.9011, lng: -56.1645 },
  venezuela: { name: "Caracas, Venezuela", lat: 10.4806, lng: -66.9036 },
  caribbean: { name: "Región del Caribe", lat: 18.1096, lng: -77.2975 },
  caribe: { name: "Región del Caribe", lat: 18.1096, lng: -77.2975 },
  jamaica: { name: "Kingston, Jamaica", lat: 17.9716, lng: -76.7936 },
  trinidad: { name: "Port of Spain, Trinidad y Tobago", lat: 10.6549, lng: -61.5019 },
  trinidadytobago: { name: "Port of Spain, Trinidad y Tobago", lat: 10.6549, lng: -61.5019 },
  trinidadandtobago: { name: "Port of Spain, Trinidad y Tobago", lat: 10.6549, lng: -61.5019 },
  barbados: { name: "Bridgetown, Barbados", lat: 13.1132, lng: -59.5988 },
  bahamas: { name: "Nassau, Bahamas", lat: 25.0480, lng: -77.3554 },
  belize: { name: "Belmopán, Belice", lat: 17.2510, lng: -88.7670 },
  belice: { name: "Belmopán, Belice", lat: 17.2510, lng: -88.7670 },
  guyana: { name: "Georgetown, Guyana", lat: 6.8013, lng: -58.1551 },
  suriname: { name: "Paramaribo, Surinam", lat: 5.8520, lng: -55.2038 },
  haiti: { name: "Puerto Príncipe, Haití", lat: 18.5944, lng: -72.3074 },
  latam: { name: "Latinoamérica y Caribe", lat: -12.0, lng: -60.0 },
  regional: { name: "Latinoamérica y Caribe (Regional)", lat: -10.5, lng: -62.0 },
};

export const LATAM_CITIES: Record<string, LocationCoord> = {
  // Argentina
  buenosaires: { name: "Buenos Aires, Argentina", lat: -34.6037, lng: -58.3816 },
  caba: { name: "Buenos Aires, Argentina", lat: -34.6037, lng: -58.3816 },
  cordoba: { name: "Córdoba, Argentina", lat: -31.4201, lng: -64.1888 },
  rosario: { name: "Rosario, Argentina", lat: -32.9468, lng: -60.6393 },
  mendoza: { name: "Mendoza, Argentina", lat: -32.8895, lng: -68.8458 },
  laplata: { name: "La Plata, Argentina", lat: -34.9215, lng: -57.9545 },
  tandil: { name: "Tandil, Argentina", lat: -37.3217, lng: -59.1332 },
  bahiablanca: { name: "Bahía Blanca, Argentina", lat: -38.7196, lng: -62.2724 },
  santafe: { name: "Santa Fe, Argentina", lat: -31.6333, lng: -60.7000 },
  bariloche: { name: "Bariloche, Argentina", lat: -41.1335, lng: -71.3103 },
  sancarlosdebariloche: { name: "Bariloche, Argentina", lat: -41.1335, lng: -71.3103 },
  mardelplata: { name: "Mar del Plata, Argentina", lat: -38.0055, lng: -57.5560 },
  tucuman: { name: "San Miguel de Tucumán, Argentina", lat: -26.8083, lng: -65.2176 },
  sanmigueldetucuman: { name: "San Miguel de Tucumán, Argentina", lat: -26.8083, lng: -65.2176 },
  salta: { name: "Salta, Argentina", lat: -24.7821, lng: -65.4232 },
  corrientes: { name: "Corrientes, Argentina", lat: -27.4692, lng: -58.8306 },
  resistencia: { name: "Resistencia, Chaco, Argentina", lat: -27.4514, lng: -58.9866 },
  sanluis: { name: "San Luis, Argentina", lat: -33.3017, lng: -66.3378 },
  sanjuanarg: { name: "San Juan, Argentina", lat: -31.5375, lng: -68.5364 },

  // Brasil
  petropolis: { name: "Petrópolis, Rio de Janeiro, Brasil", lat: -22.5050, lng: -43.1789 },
  riodejaneiro: { name: "Rio de Janeiro, Brasil", lat: -22.9068, lng: -43.1729 },
  rio: { name: "Rio de Janeiro, Brasil", lat: -22.9068, lng: -43.1729 },
  saopaulo: { name: "São Paulo, Brasil", lat: -23.5505, lng: -46.6333 },
  sp: { name: "São Paulo, Brasil", lat: -23.5505, lng: -46.6333 },
  campinas: { name: "Campinas, São Paulo, Brasil", lat: -22.9056, lng: -47.0608 },
  saocarlos: { name: "São Carlos, São Paulo, Brasil", lat: -22.0175, lng: -47.8908 },
  belohorizonte: { name: "Belo Horizonte, Minas Gerais, Brasil", lat: -19.9167, lng: -43.9345 },
  bh: { name: "Belo Horizonte, Brasil", lat: -19.9167, lng: -43.9345 },
  portoalegre: { name: "Porto Alegre, Rio Grande do Sul, Brasil", lat: -30.0346, lng: -51.2177 },
  poa: { name: "Porto Alegre, Brasil", lat: -30.0346, lng: -51.2177 },
  curitiba: { name: "Curitiba, Paraná, Brasil", lat: -25.4290, lng: -49.2671 },
  florianopolis: { name: "Florianópolis, Santa Catarina, Brasil", lat: -27.5954, lng: -48.5480 },
  recife: { name: "Recife, Pernambuco, Brasil", lat: -8.0476, lng: -34.8770 },
  salvadorba: { name: "Salvador, Bahia, Brasil", lat: -12.9714, lng: -38.5014 },
  fortaleza: { name: "Fortaleza, Ceará, Brasil", lat: -3.7172, lng: -38.5433 },
  brasilia: { name: "Brasília, Distrito Federal, Brasil", lat: -15.7938, lng: -47.8828 },
  manaus: { name: "Manaus, Amazonas, Brasil", lat: -3.1190, lng: -60.0217 },
  belem: { name: "Belém, Pará, Brasil", lat: -1.4558, lng: -48.4902 },
  natal: { name: "Natal, Rio Grande do Norte, Brasil", lat: -5.7945, lng: -35.2110 },
  vitoria: { name: "Vitória, Espírito Santo, Brasil", lat: -20.3155, lng: -40.3128 },

  // Chile
  santiago: { name: "Santiago, Chile", lat: -33.4489, lng: -70.6693 },
  santiagodechile: { name: "Santiago, Chile", lat: -33.4489, lng: -70.6693 },
  valparaiso: { name: "Valparaíso, Chile", lat: -33.0472, lng: -71.6127 },
  vinadelmar: { name: "Viña del Mar, Chile", lat: -33.0245, lng: -71.5518 },
  concepcion: { name: "Concepción, Chile", lat: -36.8270, lng: -73.0503 },
  antofagasta: { name: "Antofagasta, Chile", lat: -23.6500, lng: -70.4000 },
  temuco: { name: "Temuco, Chile", lat: -38.7359, lng: -72.5904 },
  valdivia: { name: "Valdivia, Chile", lat: -39.8142, lng: -73.2459 },
  laserena: { name: "La Serena, Chile", lat: -29.9027, lng: -71.2520 },
  arica: { name: "Arica, Chile", lat: -18.4783, lng: -70.3126 },
  talca: { name: "Talca, Chile", lat: -35.4264, lng: -71.6554 },

  // Colombia
  bogota: { name: "Bogotá, Colombia", lat: 4.7110, lng: -74.0721 },
  medellin: { name: "Medellín, Antioquia, Colombia", lat: 6.2442, lng: -75.5812 },
  cali: { name: "Cali, Valle del Cauca, Colombia", lat: 3.4516, lng: -76.5320 },
  barranquilla: { name: "Barranquilla, Atlántico, Colombia", lat: 10.9685, lng: -74.7813 },
  bucaramanga: { name: "Bucaramanga, Santander, Colombia", lat: 7.1254, lng: -73.1198 },
  cartagena: { name: "Cartagena, Bolívar, Colombia", lat: 10.3910, lng: -75.4794 },
  manizales: { name: "Manizales, Caldas, Colombia", lat: 5.0689, lng: -75.5174 },
  pereira: { name: "Pereira, Risaralda, Colombia", lat: 4.8133, lng: -75.6961 },
  pasto: { name: "Pasto, Nariño, Colombia", lat: 1.2136, lng: -77.2811 },
  popayan: { name: "Popayán, Cauca, Colombia", lat: 2.4419, lng: -76.6063 },
  cucuta: { name: "Cúcuta, Norte de Santander, Colombia", lat: 7.8939, lng: -72.5078 },
  santa_marta: { name: "Santa Marta, Colombia", lat: 11.2408, lng: -74.1990 },

  // México
  ciudaddemexico: { name: "Ciudad de México, México", lat: 19.4326, lng: -99.1332 },
  cdmx: { name: "Ciudad de México, México", lat: 19.4326, lng: -99.1332 },
  df: { name: "Ciudad de México, México", lat: 19.4326, lng: -99.1332 },
  guadalajara: { name: "Guadalajara, Jalisco, México", lat: 20.6597, lng: -103.3496 },
  monterrey: { name: "Monterrey, Nuevo León, México", lat: 25.6866, lng: -100.3161 },
  puebla: { name: "Puebla, México", lat: 19.0414, lng: -98.2063 },
  queretaro: { name: "Querétaro, México", lat: 20.5888, lng: -100.3899 },
  merida: { name: "Mérida, Yucatán, México", lat: 20.9674, lng: -89.5926 },
  tijuana: { name: "Tijuana, Baja California, México", lat: 32.5149, lng: -117.0382 },
  leon: { name: "León, Guanajuato, México", lat: 21.1221, lng: -101.6826 },
  sanluispotosi: { name: "San Luis Potosí, México", lat: 22.1565, lng: -100.9855 },
  cuernavaca: { name: "Cuernavaca, Morelos, México", lat: 18.9242, lng: -99.2216 },
  xalapa: { name: "Xalapa, Veracruz, México", lat: 19.5438, lng: -96.9102 },
  cancun: { name: "Cancún, Quintana Roo, México", lat: 21.1619, lng: -86.8515 },
  toluca: { name: "Toluca, Estado de México, México", lat: 19.2826, lng: -99.6557 },
  hermosillo: { name: "Hermosillo, Sonora, México", lat: 29.0729, lng: -110.9559 },

  // Perú
  lima: { name: "Lima, Perú", lat: -12.0464, lng: -77.0428 },
  arequipa: { name: "Arequipa, Perú", lat: -16.4090, lng: -71.5375 },
  cusco: { name: "Cusco, Perú", lat: -13.5319, lng: -71.9675 },
  cuzco: { name: "Cusco, Perú", lat: -13.5319, lng: -71.9675 },
  trujillo: { name: "Trujillo, La Libertad, Perú", lat: -8.1160, lng: -79.0300 },
  chiclayo: { name: "Chiclayo, Lambayeque, Perú", lat: -6.7714, lng: -79.8409 },
  piura: { name: "Piura, Perú", lat: -5.1945, lng: -80.6328 },
  huancayo: { name: "Huancayo, Junín, Perú", lat: -12.0651, lng: -75.2049 },

  // Ecuador
  quito: { name: "Quito, Ecuador", lat: -0.1807, lng: -78.4678 },
  guayaquil: { name: "Guayaquil, Guayas, Ecuador", lat: -2.1894, lng: -79.8891 },
  cuenca: { name: "Cuenca, Azuay, Ecuador", lat: -2.9001, lng: -79.0059 },
  loja: { name: "Loja, Ecuador", lat: -3.9931, lng: -79.2042 },

  // Uruguay
  montevideo: { name: "Montevideo, Uruguay", lat: -34.9011, lng: -56.1645 },
  puntadeleste: { name: "Punta del Este, Uruguay", lat: -34.9644, lng: -54.9439 },

  // Costa Rica
  sanjose: { name: "San José, Costa Rica", lat: 9.9281, lng: -84.0907 },
  heredia: { name: "Heredia, Costa Rica", lat: 10.0024, lng: -84.1165 },
  alajuela: { name: "Alajuela, Costa Rica", lat: 10.0163, lng: -84.2116 },
  cartago: { name: "Cartago, Costa Rica", lat: 9.8644, lng: -83.9194 },

  // Bolivia
  lapaz: { name: "La Paz, Bolivia", lat: -16.5000, lng: -68.1500 },
  santacruz: { name: "Santa Cruz de la Sierra, Bolivia", lat: -17.7833, lng: -63.1821 },
  santacruzdelasierra: { name: "Santa Cruz de la Sierra, Bolivia", lat: -17.7833, lng: -63.1821 },
  cochabamba: { name: "Cochabamba, Bolivia", lat: -17.3895, lng: -66.1568 },
  sucre: { name: "Sucre, Bolivia", lat: -19.0196, lng: -65.2620 },

  // Paraguay
  asuncion: { name: "Asunción, Paraguay", lat: -25.2637, lng: -57.5759 },
  ciudaddeleste: { name: "Ciudad del Este, Paraguay", lat: -25.5097, lng: -54.6111 },

  // Venezuela
  caracas: { name: "Caracas, Venezuela", lat: 10.4806, lng: -66.9036 },
  maracaibo: { name: "Maracaibo, Zulia, Venezuela", lat: 10.6544, lng: -71.6297 },
  valencia: { name: "Valencia, Carabobo, Venezuela", lat: 10.1620, lng: -68.0077 },
  barquisimeto: { name: "Barquisimeto, Lara, Venezuela", lat: 10.0678, lng: -69.3474 },
  meridavzla: { name: "Mérida, Venezuela", lat: 8.5983, lng: -71.1450 },

  // Panamá
  ciudaddepanama: { name: "Ciudad de Panamá, Panamá", lat: 8.9824, lng: -79.5199 },
  panamacity: { name: "Ciudad de Panamá, Panamá", lat: 8.9824, lng: -79.5199 },

  // Caribe y Centroamérica
  sanjuan: { name: "San Juan, Puerto Rico", lat: 18.4655, lng: -66.1057 },
  santodomingo: { name: "Santo Domingo, República Dominicana", lat: 18.4861, lng: -69.9312 },
  lahabana: { name: "La Habana, Cuba", lat: 23.1136, lng: -82.3666 },
  kingston: { name: "Kingston, Jamaica", lat: 17.9716, lng: -76.7936 },
  portofspain: { name: "Port of Spain, Trinidad y Tobago", lat: 10.6549, lng: -61.5019 },
  bridgetown: { name: "Bridgetown, Barbados", lat: 13.1132, lng: -59.5988 },
  sansalvador: { name: "San Salvador, El Salvador", lat: 13.6929, lng: -89.2182 },
  ciudaddeguatemala: { name: "Ciudad de Guatemala, Guatemala", lat: 14.6349, lng: -90.5069 },
  tegucigalpa: { name: "Tegucigalpa, Honduras", lat: 14.0723, lng: -87.1921 },
  managua: { name: "Managua, Nicaragua", lat: 12.1150, lng: -86.2362 },
};

export function normalizeKey(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Resolves map coordinates prioritizing "Location (if exist)" when provided.
 * Supports:
 *  1. Direct coordinates ("lat, lng" or "-22.505, -43.178")
 *  2. Specific LATAM cities catalog (e.g. Petrópolis, Buenos Aires, Medellín, etc.)
 *  3. Fallback to Country / Sub-region coordinates
 */
export function resolveLocationCoordinates(
  locationRaw: string | undefined,
  rawCountry: string
): LocationCoord {
  const trimmedLoc = (locationRaw || "").trim();

  if (trimmedLoc) {
    // 1. Direct coordinate format: e.g. "-22.505, -43.178" or "-22.505; -43.178"
    const coordMatch = trimmedLoc.match(/^(-?\d+(\.\d+)?)\s*[,;\s]\s*(-?\d+(\.\d+)?)$/);
    if (coordMatch) {
      const lat = parseFloat(coordMatch[1]);
      const lng = parseFloat(coordMatch[3]);
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return {
          name: trimmedLoc,
          lat,
          lng,
        };
      }
    }

    // 2. Direct city match in LATAM_CITIES
    const cleanLoc = normalizeKey(trimmedLoc);
    if (LATAM_CITIES[cleanLoc]) {
      return {
        name: trimmedLoc,
        lat: LATAM_CITIES[cleanLoc].lat,
        lng: LATAM_CITIES[cleanLoc].lng,
      };
    }

    // 3. Match individual segments (e.g. "Petrópolis, Rio de Janeiro, Brazil" -> check "Petrópolis")
    const segments = trimmedLoc.split(/[,;\-\/]/).map((s) => normalizeKey(s.trim())).filter(Boolean);
    for (const seg of segments) {
      if (LATAM_CITIES[seg]) {
        return {
          name: trimmedLoc,
          lat: LATAM_CITIES[seg].lat,
          lng: LATAM_CITIES[seg].lng,
        };
      }
    }

    // 4. Substring matching against known cities (sorted by length descending to match most specific first)
    const sortedCityKeys = Object.keys(LATAM_CITIES).sort((a, b) => b.length - a.length);
    for (const cityKey of sortedCityKeys) {
      if (cleanLoc.includes(cityKey)) {
        return {
          name: trimmedLoc,
          lat: LATAM_CITIES[cityKey].lat,
          lng: LATAM_CITIES[cityKey].lng,
        };
      }
    }
  }

  // Fallback to Country / Sub-region
  const countryCoord = getCoordinatesForCountry(rawCountry);
  if (trimmedLoc) {
    return {
      name: `${trimmedLoc} (${countryCoord.name})`,
      lat: countryCoord.lat,
      lng: countryCoord.lng,
    };
  }
  return countryCoord;
}

export function getCoordinatesForCountry(rawCountry: string): LocationCoord {
  const cleanKey = normalizeKey(rawCountry || "");
  
  if (LATAM_COORDINATES[cleanKey]) {
    return LATAM_COORDINATES[cleanKey];
  }

  // Fuzzy match
  for (const [key, coord] of Object.entries(LATAM_COORDINATES)) {
    if (cleanKey.includes(key) || key.includes(cleanKey)) {
      return coord;
    }
  }

  // Fallback centered in northern South America / Caribbean
  return {
    name: rawCountry || "Latinoamérica",
    lat: -4.0 + (Math.sin(rawCountry.length) * 5),
    lng: -65.0 + (Math.cos(rawCountry.length) * 5),
  };
}

/**
 * Applies a mathematical spiral jitter around the central coordinates
 * so multiple initiatives in the same city/country don't overlap.
 */
export function applyJitter(
  baseLat: number,
  baseLng: number,
  index: number,
  totalInSameLocation: number
): [number, number] {
  if (totalInSameLocation <= 1) {
    return [baseLat, baseLng];
  }

  // Spread out smoothly based on count
  const baseRadius = totalInSameLocation > 8 ? 0.35 : 0.22;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees
  const angle = index * goldenAngle;
  const radius = baseRadius * Math.sqrt((index + 1) / totalInSameLocation);

  const latOffset = radius * Math.cos(angle);
  // Adjust lng for latitude projection stretching
  const lngOffset = (radius * Math.sin(angle)) / Math.cos((baseLat * Math.PI) / 180 || 1);

  return [baseLat + latOffset, baseLng + lngOffset];
}
