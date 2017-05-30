import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { NewMealForm } from './NewMealForm';

const store = createStore(() => ({}));
const Decorated = reduxForm({ form: 'testForm' })(NewMealForm);

describe('NewMealForm', () => {
  it('renders without crashing', () => {
    shallow(<NewMealForm />);
  });

  it('renders correctly', () => {
    const component = renderer.create(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Provider 
      	store={store}>
          <Decorated />
        </Provider>
      </MuiThemeProvider>
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
