import {ApolloServer,gql} from 'apollo-server'

// The GraphQL schema
const typeDefs = gql`
    type Query {
        aaa: String

    }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    aaa: () => {
        return "Hello World! 반가워요 !! 555"
    },
  },
};

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

server.listen(3000).then(({}) => {
  console.log("프로그램 켜는데 성공했어요 !_!");
});