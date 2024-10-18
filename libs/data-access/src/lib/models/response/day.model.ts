import { PortElement } from './port-element.model';

export interface Day {
  __typename: string;
  number: number;
  ports: PortElement[];
  type: string;
}
