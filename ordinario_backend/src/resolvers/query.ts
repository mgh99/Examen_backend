import { ApolloError } from "apollo-server";
import { Collection, Db, ObjectId } from "mongodb";
import { EquipoAPI } from "../types";

export const Query = {

    listMatches: async (parent: any, args: any, context: { teamDb: Collection }) => {

        const matches = await context.teamDb.find({ finalizado: false }).toArray();
        return matches.map(elem => ({
            id: elem._id,
            team1: elem.team1,
            team2: elem.team2,
            resultado: elem.resultado,
            minuto_juego: elem.minuto_juego,
            finalizado: elem.finalizado,
        }))
    },

    getMatch: async (parent: any, args: { id: string }, context: { teamDb: Collection }) => {

        const match = await context.teamDb.findOne({ id: new ObjectId(args.id) });

        if (!match) {
            throw new ApolloError("No se encontró el partido").status(404);
        } else {
            return {
                id: match._id,
                team1: match.team1,
                team2: match.team2,
                resultado: match.resultado,
                minuto_juego: match.minuto_juego,
                finalizado: match.finalizado
            }
        }

    },


}
