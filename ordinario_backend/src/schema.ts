import {gql} from 'apollo-server';

export const typeDefs = gql`

type Equipo {
    id: ID!
    team1: String!
    team2: String!
    resultado: String
    minuto_juego: Int
    finalizado: Boolean
}

type Query {
 
    listMatches: [Equipo]
    getMatch(id: String!): Equipo
    subscribeMatch(id: ID!): Equipo
    
    
}

type Mutation { 

    startMatch(team1: String, team2: String): Equipo
    setMatchData(id: ID!, resultado: String, minuto_juego: Int, finalizado: Boolean): Equipo
    addTeams(team1: String!, team2: String!, resultado: String!, minuto_juego: Int!, finalizado: Boolean!): Equipo
}



`