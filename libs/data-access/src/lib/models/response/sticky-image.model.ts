import { Meta } from './meta.model';

export interface StickyImage {
  __typename: string;
  meta: Meta;
  path: string;
}
