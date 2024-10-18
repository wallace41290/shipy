import { StringUnion } from '@shipy/utils';

const sortBy = ['RECOMMENDED', 'PRICE', 'NIGHTS'] as const;

export const SortBy = StringUnion(...sortBy);
export type SortBy = typeof SortBy.type;

export const SortByLabels: Record<SortBy, string> = {
  NIGHTS: 'Number of Nights',
  PRICE: 'Price',
  RECOMMENDED: 'Recommended',
};
