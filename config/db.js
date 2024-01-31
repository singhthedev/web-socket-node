import mongoose from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();


mongoose.connect(
  `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWD}@graphql.wfstb7b.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
  console.log('Database is connected... 🔥')
})
  .catch(() => {
    console.log('Database is not connected...😵')
  })