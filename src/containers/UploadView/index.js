import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField              from 'material-ui/TextField'
import RaisedButton           from 'material-ui/RaisedButton';

/* component styles */
import { styles } from './styles.scss';

/* actions */
import * as uiActionCreators     from 'core/actions/actions-ui';
import * as votingActionCreators from 'core/actions/actions-vote';


class UploadView extends Component {
  constructor(props) {
    super(props);
  }

  vote=() => {
    const { actions } = this.props;
    actions.vote.voteUp();
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
          <RaisedButton label="Upload!" onTouchTap={this.vote} />
        </form>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      vote: bindActionCreators(votingActionCreators, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(UploadView);