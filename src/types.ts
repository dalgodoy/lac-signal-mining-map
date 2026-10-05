export interface Initiative {
  id: string;
  country: string;
  name: string;
  topic: string;
  category: string;
  description: string;
  url: string;
  locationRaw?: string;
  potentialFollowUp?: string;
  suggestedBy?: string;
  lat: number;
  lng: number;
  cityName: string;
  rawIndex: number;
}

export type CategoryKey = 'school' | 'regional conference' | 'national conference' | 'society' | 'one-time event' | 'workshop' | 'other' | string;

export interface CategoryStyle {
  bg: string;
  text: string;
  hex: string;
  ring: string;
  border: string;
  bgLight: string;
  iconName: string;
}

export interface DataSourceState {
  type: 'google_sheets' | 'custom_csv' | 'fallback';
  sheetUrl: string;
  sheetId: string;
  gid: string;
  lastFetched: Date | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage?: string;
  rowCount: number;
  autoRefresh: boolean;
}

export type PageView = 'map' | 'directory' | 'stats';

