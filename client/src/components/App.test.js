import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  test('renders correctly', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
