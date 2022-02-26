import BandsModel from "./models/BandsModel";
import { getDb } from "../dbConnect";

export default class BandsService {
    // TODO: code logic

    async getAllBands(): Promise<BandsModel[] | undefined> {
        try{
            const bands = await getDb().collection('bands').find({}).toArray() as BandsModel[];
            console.log('Got bands form the db');
            return bands;
        } catch (err){
            throw new Error(err);
        }
    }
}