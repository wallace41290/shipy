import { StringUnion } from '@shipy/utils';

const numberOfNights = ['2~5','6~8','9~11','gte12'] as const;

export const NumberOfNights = StringUnion(...numberOfNights);
export type NumberOfNights = typeof NumberOfNights.type;

export const NumberOfNightsLabels: Record<NumberOfNights, string> = {
  '2~5': '2-5',
  '6~8': '6-8',
  '9~11': '9-11',
  gte12: '12+'
};
