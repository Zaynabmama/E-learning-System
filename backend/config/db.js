import mongoose from "mongoose";



const databaseConnection = async () => {
  try{
         await mongoose.connect(process.env.MONGO_URI);

         console.log("Connected to database");}

  catch(error){
         console.log(error);
  }

};

export default databaseConnection;
