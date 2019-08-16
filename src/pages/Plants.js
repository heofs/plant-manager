import React from 'react';
import { withFirebaseUser } from '../components/Firebase';

class PlantsPage extends React.Component {
  constructor(props) {
    super(props);
    this.user = this.props.firebase.currentUser();
  }
  logUser() {
    console.log(this.user);
  }
  componentDidMount() {
    this.props.firebase.currentUser().onAuthStateChanged(user => {
      if (user) {
        console.log('Got user');
        console.log(user.ra);
      }
    });

    // this.props.firebase
    //   .signIn('ofstad10@gmail.com', 'Password123')
    //   .then(msg => {
    //     console.log(msg);
    //   });
  }

  render() {
    return (
      <div>
        <h1 onClick={() => this.logUser()}>Plants</h1>
      </div>
    );
  }
}

export default withFirebaseUser(PlantsPage);
