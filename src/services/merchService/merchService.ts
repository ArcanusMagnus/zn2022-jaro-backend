import { ObjectId } from "mongodb";

import MerchModel from "./models/MerchModel";
import { getDb } from "../dbConnect";

export default class MerchService {
  // normally should add pagination, but here it'll probably never be necessary
  async getAllMerch(): Promise<MerchModel[] | undefined> {
    try {
      const merch = (await getDb()
        .collection("merch")
        .find({})
        .toArray()) as MerchModel[];
      if (!merch) {
        throw new Error("Failed to fetch merch");
      }
      console.log("Got merch from the db");
      return merch;
    } catch (err) {
      throw new Error(err);
    }
  }

  async postMerch(merchItem: MerchModel): Promise<void> {
    try {
      const result = await getDb().collection("merch").insertOne(merchItem);
      if (!result.acknowledged) {
        throw new Error("Inserting merch into the database failed.");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateMerch(_id: ObjectId, merch: MerchModel): Promise<void> {
    try {
      const result = await getDb()
        .collection("merch")
        .findOneAndUpdate(
          { _id: _id },
          {
            $set: {
              ...merch
            },
          }
        );
      if(!result.ok){
        throw new Error("Merch update failed")
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteMerch(_id: ObjectId): Promise<void> {
    try {
      await getDb().collection("merch").deleteOne({ _id: _id });
    } catch (err) {
      throw new Error(err);
    }
  }
}
