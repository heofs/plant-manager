import gql from 'graphql-tag';

export const createVariety = (client, variables) => {
  return client.mutate({
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

export const getVarieties = client => {
  return client.query({
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
