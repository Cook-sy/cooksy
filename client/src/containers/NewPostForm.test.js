import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import NewPostForm from './NewPostForm';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(() => ({}));
const Decorated = reduxForm({ form: 'testForm' })(NewPostForm);

describe('NewPostForm', () => {
  it('renders without crashing', () => {
    shallow(<NewPostForm />);
  });

  it('renders correctly', () => {
    const component = renderer.create(<Provider 
    	store={store}>
        <Decorated />
      </Provider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
