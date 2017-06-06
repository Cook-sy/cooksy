import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import { Rating } from 'material-ui-rating';
import { fetchMealsByChef } from '../actions/index';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';
import './ChefProfile.css';
const style = {margin: 5};

class ChefProfile extends Component {
	constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMealsByChef();
  }

	render() {
		const { meals } = this.props;

 		if(!this.props.meals) {
			return <p>Loading.....</p>
		}

		return (
		  <List>
		    <ListItem
		      disabled={true}
		      leftAvatar={
		        <Avatar
		          src="https://camo.mybb.com/e01de90be6012adc1b1701dba899491a9348ae79/687474703a2f2f7777772e6a71756572797363726970742e6e65742f696d616765732f53696d706c6573742d526573706f6e736976652d6a51756572792d496d6167652d4c69676874626f782d506c7567696e2d73696d706c652d6c69676874626f782e6a7067"
		          size={300}
		          style={style}
		        />
		      }
		    >
		    </ListItem>
		    <div className="chef-info">
		    	<h3>chef name</h3>
		    	<Rating value={3} max={5} readOnly={true} />
		    </div>
		  </List>
		);
	}
}

function mapStateToProps({meals}) {
	return {
		meals
	}
}

export default connect(mapStateToProps, { fetchMealsByChef })(ChefProfile);