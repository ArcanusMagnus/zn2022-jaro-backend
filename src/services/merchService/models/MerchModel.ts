import { ObjectId } from "mongodb";

export default interface Merch {
    _id: ObjectId;
    name: string;
    link: string;
    photo: string;
    description: string;
    price: number;
}