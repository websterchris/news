import React, {Component} from "react";
import { StyleSheet, css } from 'aphrodite';
import {FONTS} from './config'
export default class App extends Component {
  render() {
    return <div className={css(styles.wrapper)}>Hello World</div>;
  }
}

const styles = StyleSheet.create({
  wrapper: {
      fontFamily: FONTS.primary
  },

});