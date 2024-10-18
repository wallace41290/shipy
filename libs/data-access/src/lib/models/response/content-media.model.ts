import { StickyImage } from './sticky-image.model';

export interface ContentMedia {
  __typename: string;
  images: StickyImage[];
}
