import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';

const TwitterQueryResolver: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_, __, { db }) => {
    const [firstUser] = db.getAllUsers();
    if (!firstUser)
      throw new Error(
        'currentUser was requested, but there are no users in the database'
      );
    return firstUser;
  },
  suggestions: (_, __, { db }) => {
    return db.getAllSuggestions();
  },
};
export default TwitterQueryResolver;
