import dotenv from "dotenv";
dotenv.config();

export default {
    Db: process.env.URI || "mongodb+srv://Default2310:dUWDSYBmgpwjgu5x@cluster0.iqdewrr.mongodb.net/Manna-carteleria"
}