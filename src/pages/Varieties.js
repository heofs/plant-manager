import React from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { Button } from 'reactstrap';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: 'testTokenCeyJhbGciOiJSU',
  },
});

const handleQuery = () => {
  client
    .query({
      query: gql`
        {
          allVarieties {
            id
            variety
          }
        }
      `,
    })
    .then(result => console.log(result));
};

const VarietiesPage = () => {
  handleQuery();
  return (
    <div>
      <h1>Varieties</h1>
      <Button onClick={() => handleQuery()}>Query</Button>
    </div>
  );
};

export default VarietiesPage;
