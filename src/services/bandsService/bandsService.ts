import BandsModel from "./models/BandsModel";
import VenuesModel from "./models/VenuesModel";
import { getDb } from "../dbConnect";
import { ObjectId } from "mongodb";

export default class BandsService {
  //add pagination later
  async getAllBands(): Promise<BandsModel[] | undefined> {
    try {
      const dbBands = (await getDb()
        .collection("bands")
        .find({})
        .toArray()) as BandsModel[];
      if (!dbBands) {
        throw new Error("Failed to fetch bands");
      }

      const bands: BandsModel[] = [];
      for (const band of dbBands) {
        const venue = await getDb()
          .collection("venues")
          .findOne({ _id: band.venue_id }) as VenuesModel;
        if (!venue) {
          throw new Error("Venue not found");
        }
        bands.push({
          ...band,
          venue: venue.name,
          venue_no: venue.order,
        });
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

  async updateBand(_id: ObjectId, band: BandsModel): Promise<void> {
    try {
      const result = await getDb()
        .collection("bands")
        .findOneAndUpdate(
          { _id: _id },
          {
            $set: {
              ...band,
            },
          }
        );
      if (!result.ok) {
        throw new Error("Band update failed");
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
