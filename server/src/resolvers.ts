import TwitterQueryResolver from './resolvers/Query';

export function createResolvers() {
  const resolvers = {
    Query: TwitterQueryResolver,
  };
  return resolvers;
}
