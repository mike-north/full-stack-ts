import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  tweet?: Maybe<Tweet>;
  updatedAt: Scalars['String'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFavorite: Favorite;
  deleteFavorite: Favorite;
};


export type MutationCreateFavoriteArgs = {
  tweetId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteFavoriteArgs = {
  tweetId: Scalars['String'];
  userId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  tweets?: Maybe<Array<Tweet>>;
  user?: Maybe<User>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Tweet = {
  __typename?: 'Tweet';
  author?: Maybe<User>;
  body: Scalars['String'];
  commentCount?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  favoriteCount?: Maybe<Scalars['Int']>;
  favorites?: Maybe<Array<Favorite>>;
  id: Scalars['String'];
  retweetCount?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
  coverUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
  favorites?: Maybe<Array<Favorite>>;
  handle: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  statistics?: Maybe<UserStatistics>;
  tweets?: Maybe<Array<Tweet>>;
  updatedAt: Scalars['String'];
};

export type UserStatistics = {
  __typename?: 'UserStatistics';
  followerCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  tweetCount: Scalars['Int'];
  user: User;
};

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, name: string, handle: string, avatarUrl: string, createdAt: string, updatedAt: string, coverUrl?: string | null, statistics?: { __typename?: 'UserStatistics', tweetCount: number, followerCount: number, followingCount: number } | null } };


export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    name
    handle
    avatarUrl
    createdAt
    updatedAt
    coverUrl
    statistics {
      tweetCount
      followerCount
      followingCount
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;