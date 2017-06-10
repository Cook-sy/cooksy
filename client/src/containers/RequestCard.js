import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

class RequestCard extends Component {
  render() {
  	return (
  		<div>
	  		<LinearProgress mode="indeterminate" />
  		</div>	
  	);
  }
}

export default RequestCard;