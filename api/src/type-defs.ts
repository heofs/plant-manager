import { gql } from "apollo-server-express";

export default gql`
  type Query {
    """
    Test Message.
    """
    variety(id: ID!): Variety!
    allVarieties: [Variety]!
  }

  type Variety {
    id: ID!
    variety: String
    yield: Yield
    height: Height
    harvest_time: HarvestTime
    flowering_time: String
    flowering_type: String
    difficulty: String
    effect: [String]
    smell_and_flavour: [String]
    content: Content
    parents: [String]
    genetics: String
  }
  type Yield {
    indoor: String
    outdoor: String
  }
  type Height {
    indoor: String
    outdoor: String
  }
  type HarvestTime {
    outdoor: String
  }
  type Content {
    thc: String
    cbd: String
  }
`;
