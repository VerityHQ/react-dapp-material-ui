import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

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
        this is the uplaod view!
      </div>
    );
  }

}

export default connect(null)(UploadView);