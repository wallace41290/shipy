import { PortPort } from "./port-port.model";



export interface PortElement {
    __typename: string;
    activity: string;
    arrivalTime: null | string;
    departureTime: null | string;
    port: PortPort;

}
