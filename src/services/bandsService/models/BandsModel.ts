import { ObjectId } from "mongodb";

export default interface Band {
    _id: ObjectId;
    name: string;
    genre: string;
    StartTime: Date;
    EndTime: Date;
    Link: string;
    photo: string;
    description: string;
    venue_id: ObjectId;
}