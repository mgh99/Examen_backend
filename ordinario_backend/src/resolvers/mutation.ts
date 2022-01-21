import { ApolloError, ApolloServer, gql } from "apollo-server";
import { Collection, Db, ObjectId } from "mongodb";
import { EquipoAPI } from "../types";

export const Mutation = {

    startMatch: async (parent: any, args: { team1: string, team2: string}, context: { teamDb: Collection }) => {

        //comprueba que no exista ningun partido en juego con el mismo nombre de equipos
        const match = await context.teamDb.findOne({ team1: args.team1, team2: args.team2, finalizado: false });

        if(!match) {

            const equipo: EquipoAPI = {
                id: new ObjectId(),
                team1: args.team1,
                team2: args.team2,
                resultado: "0",
                minuto_juego: 0,
                finalizado: false
            };

            const result = await context.teamDb.insertOne(equipo); //inserta el partido en la base de datos

            return {
            id: result.insertedId,
            team1: args.team1,
            team2: args.team2,
            resultado: "0",
            minuto_juego: 0,
            finalizado: false
            }
        } else {
            throw new ApolloError("Ya existe un partido en juego con los mismos nombres de equipos").status(442); //MY_ERROR_CODE

        }
    },

    setMatchData: async (parent: any, args: { id: string, resultado: string, minuto_juego: number, finalizado: boolean }, context: { teamDb: Collection }) => {
        //actualiza los datos del partido menos los nombres de los equipos
        const match = await context.teamDb.findOne({ _id: args.id });

        if (!match) {
            throw new ApolloError("No se encontró el partido").status(404);
        } else {

            if ((args.minuto_juego < match.minuto_juego) || (args.resultado < match.resultado) || (args.finalizado)) {
                throw new ApolloError("No se puede modificar el partido").status(442);
            }

            const result = await context.teamDb.updateOne( //actualiza los datos del partido menos los nombres de los equipos
                { id: args.id },
                {
                    $set:
                    {
                        resultado: args.resultado,
                        minuto_juego: args.minuto_juego,
                        finalizado: args.finalizado
                    }
                });

            return {
                id: args.id,
                team1: match.team1,
                team2: match.team2,
                resultado: args.resultado,
                minuto_juego: args.minuto_juego,
                finalizado: args.finalizado
            }
        }
    },

    addTeams: async (parent: any, args: { team1: string, team2: string, resultado: string, minuto_juego: number, finalizado: boolean }, context: { teamDb: Collection }) => {

        const equipo: EquipoAPI = {
            id: new ObjectId(),
            team1: args.team1,
            team2: args.team2,
            resultado: args.resultado,
            minuto_juego: args.minuto_juego,
            finalizado: args.finalizado
        }

        const result = await context.teamDb.insertOne(equipo);

        return {
            id: result.insertedId,
            team1: args.team1,
            team2: args.team2,
            resultado: args.resultado,
            minuto_juego: args.minuto_juego,
            finalizado: args.finalizado
        }
    },
}