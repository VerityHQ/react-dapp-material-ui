import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField              from 'material-ui/TextField'
import RaisedButton           from 'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators      from 'core/actions/actions-ui';
import * as contentActionCreators from 'core/actions/actions-content';


class UploadView extends Component {
  constructor(props) {
    super(props);
  }

  upload=() => {
    const { actions } = this.props;
    actions.content.upload();
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
          <RaisedButton label="Upload!" onTouchTap={this.upload} />
        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      content: bindActionCreators(contentActionCreators, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(UploadView);