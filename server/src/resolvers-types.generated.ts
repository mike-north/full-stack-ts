import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  tweet: Tweet;
  updatedAt: Scalars['String'];
  user: User;
};

export type FavoriteInput = {
  tweetId: Scalars['String'];
  userId: Scalars['String'];
};

export type HashtagTrend = {
  __typename?: 'HashtagTrend';
  hashtag: Scalars['String'];
  tweetCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createFavorite: Favorite;
  createTweet: Tweet;
  deleteFavorite: Favorite;
};


export type MutationCreateFavoriteArgs = {
  favorite: FavoriteInput;
};


export type MutationCreateTweetArgs = {
  body: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteFavoriteArgs = {
  favorite: FavoriteInput;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  suggestions: Array<Suggestion>;
  trends: Array<Trend>;
  tweets: Array<Tweet>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  avatarUrl: Scalars['String'];
  handle: Scalars['String'];
  name: Scalars['String'];
  reason: Scalars['String'];
};

export type TopicTrend = {
  __typename?: 'TopicTrend';
  quote?: Maybe<TopicTrendQuote>;
  topic: Scalars['String'];
  tweetCount: Scalars['Int'];
};

export type TopicTrendQuote = {
  __typename?: 'TopicTrendQuote';
  description: Scalars['String'];
  imageUrl: Scalars['String'];
  title: Scalars['String'];
};

export type Trend = HashtagTrend | TopicTrend;

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  body: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['String'];
  stats?: Maybe<TweetStats>;
  updatedAt: Scalars['String'];
};

export type TweetStats = {
  __typename?: 'TweetStats';
  commentCount: Scalars['Int'];
  favoriteCount: Scalars['Int'];
  retweetCount: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  coverUrl: Scalars['String'];
  createdAt: Scalars['String'];
  favorites?: Maybe<Array<Favorite>>;
  handle: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  stats?: Maybe<UserStats>;
  updatedAt: Scalars['String'];
};

export type UserStats = {
  __typename?: 'UserStats';
  followerCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  tweetCount: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Favorite: ResolverTypeWrapper<Favorite>;
  FavoriteInput: FavoriteInput;
  HashtagTrend: ResolverTypeWrapper<HashtagTrend>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Suggestion: ResolverTypeWrapper<Suggestion>;
  TopicTrend: ResolverTypeWrapper<TopicTrend>;
  TopicTrendQuote: ResolverTypeWrapper<TopicTrendQuote>;
  Trend: ResolversTypes['HashtagTrend'] | ResolversTypes['TopicTrend'];
  Tweet: ResolverTypeWrapper<Tweet>;
  TweetStats: ResolverTypeWrapper<TweetStats>;
  User: ResolverTypeWrapper<User>;
  UserStats: ResolverTypeWrapper<UserStats>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Favorite: Favorite;
  FavoriteInput: FavoriteInput;
  HashtagTrend: HashtagTrend;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Suggestion: Suggestion;
  TopicTrend: TopicTrend;
  TopicTrendQuote: TopicTrendQuote;
  Trend: ResolversParentTypes['HashtagTrend'] | ResolversParentTypes['TopicTrend'];
  Tweet: Tweet;
  TweetStats: TweetStats;
  User: User;
  UserStats: UserStats;
};

export type FavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Favorite'] = ResolversParentTypes['Favorite']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type HashtagTrendResolvers<ContextType = any, ParentType extends ResolversParentTypes['HashtagTrend'] = ResolversParentTypes['HashtagTrend']> = {
  hashtag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweetCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFavorite?: Resolver<ResolversTypes['Favorite'], ParentType, ContextType, RequireFields<MutationCreateFavoriteArgs, 'favorite'>>;
  createTweet?: Resolver<ResolversTypes['Tweet'], ParentType, ContextType, RequireFields<MutationCreateTweetArgs, 'body' | 'userId'>>;
  deleteFavorite?: Resolver<ResolversTypes['Favorite'], ParentType, ContextType, RequireFields<MutationDeleteFavoriteArgs, 'favorite'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  suggestions?: Resolver<Array<ResolversTypes['Suggestion']>, ParentType, ContextType>;
  trends?: Resolver<Array<ResolversTypes['Trend']>, ParentType, ContextType>;
  tweets?: Resolver<Array<ResolversTypes['Tweet']>, ParentType, ContextType>;
};

export type SuggestionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Suggestion'] = ResolversParentTypes['Suggestion']> = {
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  reason?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicTrendResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicTrend'] = ResolversParentTypes['TopicTrend']> = {
  quote?: Resolver<Maybe<ResolversTypes['TopicTrendQuote']>, ParentType, ContextType>;
  topic?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tweetCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopicTrendQuoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopicTrendQuote'] = ResolversParentTypes['TopicTrendQuote']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TrendResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trend'] = ResolversParentTypes['Trend']> = {
  __resolveType: TypeResolveFn<'HashtagTrend' | 'TopicTrend', ParentType, ContextType>;
};

export type TweetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tweet'] = ResolversParentTypes['Tweet']> = {
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['TweetStats']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TweetStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TweetStats'] = ResolversParentTypes['TweetStats']> = {
  commentCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  favoriteCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  retweetCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  avatarUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coverUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<ResolversTypes['Favorite']>>, ParentType, ContextType>;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stats?: Resolver<Maybe<ResolversTypes['UserStats']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserStats'] = ResolversParentTypes['UserStats']> = {
  followerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  followingCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tweetCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Favorite?: FavoriteResolvers<ContextType>;
  HashtagTrend?: HashtagTrendResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Suggestion?: SuggestionResolvers<ContextType>;
  TopicTrend?: TopicTrendResolvers<ContextType>;
  TopicTrendQuote?: TopicTrendQuoteResolvers<ContextType>;
  Trend?: TrendResolvers<ContextType>;
  Tweet?: TweetResolvers<ContextType>;
  TweetStats?: TweetStatsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserStats?: UserStatsResolvers<ContextType>;
};

