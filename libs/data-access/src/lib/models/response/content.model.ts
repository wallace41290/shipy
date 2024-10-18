import { ContentMedia } from './content-media.model';

export interface Content {
  __typename: string;
  amenities: string[];
  area: null;
  code: string;
  maxCapacity: string;
  media: ContentMedia;
  superCategory: string;
}
