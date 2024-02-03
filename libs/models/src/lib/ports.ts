import { StringUnion } from '@shipy/utils';

const ports = ['PCN', 'FLL', 'MIA', 'TPA', 'GAL'] as const;

export const Port = StringUnion(...ports);
export type Port = typeof Port.type;

export const PortLabels: Record<Port, string> = {
  PCN: 'Port Canaveral',
  FLL: 'Fort Lauderdale',
  MIA: 'Miami',
  TPA: 'Tampa',
  GAL: 'Galveston',
};
