import { typeDefs } from "./schema";
import { ApolloServer } from "apollo-server";
import * as dotenv from "dotenv";
import { connectDB } from "./mongo";
import { Db } from "mongodb";
import {Query} from "./resolvers/query";
import { Mutation } from "./resolvers/mutation";

const resolvers = {
    Query,
    Mutation,
}

const run = async () => {

    console.log("Connecting to MongoDB...");
    const db: Db = await connectDB();
    console.log("MongoDB connected");
    const team = await db.collection("team");

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({req, res}) => {
            return {
                teamDb: team,
            }
        }
    });

    dotenv.config();

    server.listen(process.env.PORT).then(() => {
        console.log("Server escuchando del puerto 3000");
    })

}

try {
    run();
} catch(e) {
    console.error(e);
}