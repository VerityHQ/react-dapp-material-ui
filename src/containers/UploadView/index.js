import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField              from 'material-ui/TextField'
import RaisedButton           from 'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators   from 'core/actions/actions-ui';

class UploadView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles} >
        <h2>Upload content and get votes!</h2>
        <form>
          <TextField
            hintText="Enter a title"
            id="title" />
          <br />
          <TextField
            hintText="Enter the link for the content"
            id="link" />
          <br />
          <br />
          <RaisedButton label="Upload!" />
        </form>
      </div>
    );
  }

}

export default connect(null)(UploadView);