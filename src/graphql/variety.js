import gql from 'graphql-tag';
import { apolloClient } from '../App';

export const createVariety = variables => {
  return apolloClient.mutate({
    mutation: gql`
      mutation CreateVariety(
        $variety: String!
        $flower_time: Int
        $grow_time: Int
        $notes: String
      ) {
        createVariety(
          input: {
            variety: $variety
            flower_time: $flower_time
            grow_time: $grow_time
            notes: $notes
          }
        ) {
          id
          grow_time
          flower_time
          variety
          notes
        }
      }
    `,
    variables: variables,
  });
};

export const getVarieties = () => {
  return apolloClient.query({
    query: gql`
      {
        allVarieties {
          id
          grow_time
          flower_time
          variety
          notes
        }
      }
    `,
  });
};

export const deleteVariety = variables => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteVariety($id: ID!) {
        deleteVariety(input: { id: $id }) {
          id
          variety
        }
      }
    `,
    variables: variables,
  });
};