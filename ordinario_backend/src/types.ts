import { ObjectId } from "mongodb";

export type EquipoAPI = {
    id?: ObjectId;
    team1: string;
    team2: string;
    resultado: string;
    minuto_juego: number;
    finalizado: boolean;
}