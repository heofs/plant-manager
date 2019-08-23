import React from 'react';
import PropTypes from 'prop-types';
import NotFoundPage from 'App/pages/NotFoundPage';

export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = { hasError: false, errorMsg: '' };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log('Caught error!');
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }
    return this.props.children;
  }
}
