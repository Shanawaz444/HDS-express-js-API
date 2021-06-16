import dbconfig from "../config/db.config.js";
import  mongoose  from "mongoose";

const db ={};
db.mongoose=mongoose;
db.url=dbconfig.url;
db.mongotut=require("./mongotut.model.js")(mongoose);

export default db;

