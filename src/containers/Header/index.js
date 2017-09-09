import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar                 from 'components/AppBar';
import { FlatButton }         from 'material-ui';
import { withRouter }         from 'react-router-dom';

/* actions */
import * as uiActionCreators from 'core/actions/actions-ui';

/* component styles */
import { styles } from './styles.scss';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleToggle=() => {
    this.props.actions.ui.openNav();
  }

  goToUpload=() => {
    const { history } = this.props;
    history.push('/upload');
  }

  render() {
    return (
      <div className={styles}>
        <header>
          <AppBar
            onLeftIconButtonTouchTap={this.handleToggle}
            onRightIconButtonTouchTap={this.goToUpload}
            iconElementRight={<FlatButton label="Upload" />} />
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      ui: bindActionCreators(uiActionCreators, dispatch)
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));