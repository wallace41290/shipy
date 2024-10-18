import { StringUnion } from '@shipy/utils';

const sortOrder = ['ASC', 'DESC'] as const;

export const SortOrder = StringUnion(...sortOrder);
export type SortOrder = typeof SortOrder.type;

export const SortOrderLabels: Record<SortOrder, string> = {
  ASC: 'Ascending',
  DESC: 'Descending',
};
