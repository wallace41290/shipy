import { PortMedia } from './port-media.model';

export interface PortPort {
  __typename: string;
  code: string;
  media: PortMedia;
  name: string;
  region: null | string;
}
