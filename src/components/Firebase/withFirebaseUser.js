import React from 'react';

import { FirebaseContext } from './';

export const withQuestionnaire = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default withQuestionnaire;
