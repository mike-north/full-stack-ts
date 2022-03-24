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

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  suggestions: Array<Suggestion>;
  tweets: Array<Tweet>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  avatarUrl: Scalars['String'];
  handle: Scalars['String'];
  name: Scalars['String'];
  reason: Scalars['String'];
};

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

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, name: string, handle: string, avatarUrl: string, createdAt: string, stats?: { __typename?: 'UserStats', tweetCount: number, followerCount: number, followingCount: number } | null }, suggestions: Array<{ __typename?: 'Suggestion', name: string, handle: string, avatarUrl: string, reason: string }> };

export type GetTimelineTweetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTimelineTweetsQuery = { __typename?: 'Query', tweets: Array<{ __typename?: 'Tweet', id: string, body: string, createdAt: string, stats?: { __typename?: 'TweetStats', favoriteCount: number, retweetCount: number, commentCount: number } | null, author?: { __typename?: 'User', name: string, handle: string, avatarUrl: string } | null }> };


export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  currentUser {
    id
    name
    handle
    avatarUrl
    createdAt
    stats {
      tweetCount
      followerCount
      followingCount
    }
  }
  suggestions {
    name
    handle
    avatarUrl
    reason
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
export const GetTimelineTweetsDocument = gql`
    query GetTimelineTweets {
  tweets {
    id
    body
    stats {
      favoriteCount
      retweetCount
      commentCount
    }
    createdAt
    author {
      name
      handle
      avatarUrl
    }
  }
}
    `;

/**
 * __useGetTimelineTweetsQuery__
 *
 * To run a query within a React component, call `useGetTimelineTweetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTimelineTweetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTimelineTweetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTimelineTweetsQuery(baseOptions?: Apollo.QueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>(GetTimelineTweetsDocument, options);
      }
export function useGetTimelineTweetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>(GetTimelineTweetsDocument, options);
        }
export type GetTimelineTweetsQueryHookResult = ReturnType<typeof useGetTimelineTweetsQuery>;
export type GetTimelineTweetsLazyQueryHookResult = ReturnType<typeof useGetTimelineTweetsLazyQuery>;
export type GetTimelineTweetsQueryResult = Apollo.QueryResult<GetTimelineTweetsQuery, GetTimelineTweetsQueryVariables>;