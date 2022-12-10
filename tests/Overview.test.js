import React from 'react';
import { render, screen, cleanup } from 'react-test-renderer';

import App from '../src/Components/App.jsx';
// import Overview from '../src/Components/Overview/Overview.jsx';

test('I should be able to write a test', () => {
  expect(true).toBe(true);
});

describe(App, () => {
  it('should render the overview component', () => {
    render(<App />);
    // const overview = screen.get
  })
})