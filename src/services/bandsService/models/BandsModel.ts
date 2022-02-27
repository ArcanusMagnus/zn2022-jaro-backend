import { ObjectId } from "mongodb";

export default interface Band {
    _id: ObjectId;
    name: string;
    genre: string;
    startTime: Date;
    endTime: Date;
    link: string;
    photo: string;
    description: string;
    venue_id: ObjectId;
}