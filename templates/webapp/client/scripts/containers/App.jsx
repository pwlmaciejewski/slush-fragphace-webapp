import React from 'react';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';

export class App extends React.Component {
  render() {
    return (
      <StyleRoot>
        { this.props.children }
      </StyleRoot>
    );
  }
}

export default connect((state) => ({}))(App);
