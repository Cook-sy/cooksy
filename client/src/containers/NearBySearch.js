import React from 'react';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import './NearByMeals.css';

const NearBySearch = ({ radius, zipcode, handleSubmit, handleInputChange }) => {
  return (
    <div className="NearByMeals-search">
      <form onSubmit={handleSubmit}>
        <TextField
          name="zipcode"
          hintText="Zipcode"
          floatingLabelText="Zipcode"
          value={zipcode}
          onChange={handleInputChange}
          style={{ width: 125, marginRight: 10 }}
        />
        <TextField
          name="radius"
          hintText="Radius"
          floatingLabelText="Radius (miles)"
          value={radius}
          onChange={handleInputChange}
          style={{ width: 125, marginRight: 10 }}
        />

        <IconButton
          tooltip="Search meals nearby"
          type="submit"
        >
          <ActionSearch />
        </IconButton>
      </form>
    </div>
  );
};

export default NearBySearch;
