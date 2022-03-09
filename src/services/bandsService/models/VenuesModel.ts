import { ObjectId } from "mongodb";

export default interface Venue {
    _id: ObjectId;
    name: string;
    order: number;
    adress?: string;
    notes?: string;
    gps_x?: number;
    gps_y?: number;
}