import BandsModel from "./models/BandsModel";
import { getDb } from "../dbConnect";
import { ObjectId } from "mongodb";

export default class BandsService {
  //add pagination later
  async getAllBands(): Promise<BandsModel[] | undefined> {
    try {
      const bands = (await getDb()
        .collection("bands")
        .find({})
        .toArray()) as BandsModel[];
      if (!bands) {
        throw new Error("Failed to fetch bands");
      }
      console.log("Got bands from the db");
      return bands;
    } catch (err) {
      throw new Error(err);
    }
  }

  async getOneBand(_id: ObjectId): Promise<BandsModel | undefined> {
    try {
      const band = (await getDb()
        .collection("bands")
        .findOne({ _id: _id })) as BandsModel;
      if (band) {
        console.log("Fetched one band from the db successfully");
        return band;
      }
      throw new Error("Fetching band failed");
    } catch (err) {
      throw new Error(err);
    }
  }

  async postBand(band: Object): Promise<void> {
    try {
      const result = await getDb().collection("bands").insertOne(band);
      if (!result.acknowledged) {
        throw new Error("Inserting band into the database failed.");
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteBand(_id: ObjectId): Promise<void> {
    try {
      await getDb().collection("bands").deleteOne({ _id: _id });
    } catch (err) {
      throw new Error(err);
    }
  }
}
