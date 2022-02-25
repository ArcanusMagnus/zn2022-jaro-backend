import * as mongodb from "mongodb";
import * as dotenv from 'dotenv';

dotenv.config();

const MongoClient = mongodb.MongoClient;
const MONGODB_URI = process.env.MONGODB_URI ?? "";
let _db: undefined | mongodb.Db;

export const mongoConnect = async (cb: any): Promise<void> => {
  try {
    const client = await MongoClient.connect(MONGODB_URI);
    _db = client.db();
    cb();
  } catch (err: any) {
    console.log(err);
    throw err;
  }
};

export const getDb = () => {
    if(_db){
        return _db;
    }
    throw new Error('No database found');
}
