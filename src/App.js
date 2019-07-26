import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Layout from './components/layout';

import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" exact component={Dashboard} />
        <Route path="/about/" component={Dashboard} />
        <Route path="/users/" component={Dashboard} />
      </Layout>
    </Router>
  );
}

export default App;
