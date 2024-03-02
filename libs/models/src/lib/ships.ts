import { StringUnion } from '@shipy/utils';

const ships = [
  'AD',
  'AL',
  'AN',
  'BR',
  'EN',
  'EX',
  'FR',
  'GR',
  'HM',
  'IC',
  'ID',
  'JW',
  'LB',
  'MA',
  'NV',
  'OA',
  'OV',
  'OY',
  'QN',
  'RD',
  'RH',
  'SC',
  'SR',
  'ST',
  'SY',
  'UT',
  'VI',
  'VY',
  'WN',
] as const;

export const Ship = StringUnion(...ships);
export type Ship = typeof Ship.type;

export const ShipLabels: Record<Ship, string> = {
  AD: 'Adventure',
  AL: 'Allure',
  AN: 'Anthem',
  BR: 'Brilliance',
  EN: 'Enchantment',
  EX: 'Explorer',
  FR: 'Freedom',
  GR: 'Grandeur',
  HM: 'Harmony',
  IC: 'Icon',
  ID: 'Independence',
  JW: 'Jewel',
  LB: 'Liberty',
  MA: 'Mariner',
  NV: 'Navigator',
  OA: 'Oasis',
  OV: 'Ovation',
  OY: 'Odyssey',
  QN: 'Quantum',
  RD: 'Radiance',
  RH: 'Rhapsody',
  SC: 'Spectrum',
  SR: 'Serenade',
  ST: 'Star',
  SY: 'Symphony',
  UT: 'Utopia',
  VI: 'Vision',
  VY: 'Voyager',
  WN: 'Wonder',
};

export interface ShipClass {
  label: string;
  ships: ReadonlyArray<Ship>;
}

export const SHIP_CLASSES: ReadonlyArray<ShipClass> = [
  {
    label: 'Vision Class',
    ships: ['EN', 'GR', 'RH', 'VI'],
  },
  {
    label: 'Voyager class',
    ships: ['AD', 'EX', 'MA', 'NV', 'VY'],
  },
  {
    label: 'Radiance class',

    ships: ['BR', 'JW', 'RD', 'SR'],
  },
  {
    label: 'Freedom class',

    ships: ['FR', 'ID', 'LB'],
  },
  {
    label: 'Oasis class',

    ships: ['AL', 'HM', 'OA', 'SY', 'UT', 'WN'],
  },
  {
    label: 'Quantum class',

    ships: ['AN', 'OV', 'OY', 'QN', 'SC'],
  },
  {
    label: 'Icon class',

    ships: ['IC', 'ST'],
  },
] as const;
