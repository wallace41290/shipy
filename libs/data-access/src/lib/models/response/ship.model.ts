import { StateroomClassElement } from "./stateroom-class-element.model";
import { ShipMedia } from "./ship-media.model";



export interface Ship {
    __typename: string;
    code: string;
    media: ShipMedia;
    name: string;
    stateroomClasses: StateroomClassElement[];

}
