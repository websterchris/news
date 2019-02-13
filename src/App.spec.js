import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';
import {StyleSheetTestUtils} from 'aphrodite'

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});
afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

it('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();

});
