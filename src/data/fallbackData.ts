import { CategoryStyle } from '../types';

export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  school: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-700',
    hex: '#10b981',
    ring: 'ring-emerald-100',
    border: 'border-emerald-200',
    bgLight: 'bg-emerald-50',
    iconName: 'GraduationCap',
  },
  'regional conference': {
    bg: 'bg-rose-500',
    text: 'text-rose-700',
    hex: '#f43f5e',
    ring: 'ring-rose-100',
    border: 'border-rose-200',
    bgLight: 'bg-rose-50',
    iconName: 'Globe',
  },
  'national conference': {
    bg: 'bg-amber-500',
    text: 'text-amber-700',
    hex: '#f59e0b',
    ring: 'ring-amber-100',
    border: 'border-amber-200',
    bgLight: 'bg-amber-50',
    iconName: 'Award',
  },
  society: {
    bg: 'bg-indigo-600',
    text: 'text-indigo-700',
    hex: '#4f46e5',
    ring: 'ring-indigo-100',
    border: 'border-indigo-200',
    bgLight: 'bg-indigo-50',
    iconName: 'Users',
  },
  'one-time event': {
    bg: 'bg-purple-500',
    text: 'text-purple-700',
    hex: '#a855f7',
    ring: 'ring-purple-100',
    border: 'border-purple-200',
    bgLight: 'bg-purple-50',
    iconName: 'Calendar',
  },
  'non-recurrent event': {
    bg: 'bg-purple-500',
    text: 'text-purple-700',
    hex: '#a855f7',
    ring: 'ring-purple-100',
    border: 'border-purple-200',
    bgLight: 'bg-purple-50',
    iconName: 'Calendar',
  },
  workshop: {
    bg: 'bg-cyan-500',
    text: 'text-cyan-700',
    hex: '#06b6d4',
    ring: 'ring-cyan-100',
    border: 'border-cyan-200',
    bgLight: 'bg-cyan-50',
    iconName: 'Cpu',
  },
  project: {
    bg: 'bg-violet-500',
    text: 'text-violet-700',
    hex: '#8b5cf6',
    ring: 'ring-violet-100',
    border: 'border-violet-200',
    bgLight: 'bg-violet-50',
    iconName: 'Boxes',
  },
  other: {
    bg: 'bg-slate-500',
    text: 'text-slate-700',
    hex: '#64748b',
    ring: 'ring-slate-100',
    border: 'border-slate-200',
    bgLight: 'bg-slate-50',
    iconName: 'Layers',
  },
};

export function getCategoryStyle(category: string): CategoryStyle {
  const clean = (category || '').trim().toLowerCase();
  for (const key of Object.keys(CATEGORY_STYLES)) {
    if (clean === key || clean.includes(key)) {
      return CATEGORY_STYLES[key];
    }
  }
  return CATEGORY_STYLES.other;
}

export const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1VAlRqA2CbvC3rGynGkvHWo9hAzBg9hzUceN4aA-RQfM/edit?usp=sharing';
export const DEFAULT_SHEET_ID = '1VAlRqA2CbvC3rGynGkvHWo9hAzBg9hzUceN4aA-RQfM';
export const DEFAULT_SHEET_GID = '';

export { STATIC_INITIATIVES } from './staticInitiativesData';


