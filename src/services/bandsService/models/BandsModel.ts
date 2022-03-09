import { ObjectId } from "mongodb";

export default interface Band {
    _id: ObjectId;
    name: string;
    genre: string;
    day: Date;
    startTime: Date;
    endTime: Date;
    link: string;
    photo: string;
    description: string;
    venue?: string;
    venue_no?: number;
    venue_id: ObjectId;
}