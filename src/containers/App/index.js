import React, { Component }       from 'react';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import injectTapEventPlugin       from 'react-tap-event-plugin';
import getMuiTheme                from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider           from 'material-ui/styles/MuiThemeProvider';
import { HashRouter, Route }      from 'react-router-dom'
import * as OfflinePluginRuntime  from 'offline-plugin/runtime';
import Web3                       from 'web3';

// global styles for entire app
import './styles/app.scss';

/* application containers */
import Header     from 'containers/Header';
import LeftNavBar from 'containers/LeftNavBar';
import Home       from 'containers/Home';
import UploadView from 'containers/UploadView';

/* actions */
import * as providerActionCreators from 'core/actions/actions-provider';

injectTapEventPlugin();

OfflinePluginRuntime.install();

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { actions } = this.props;
    let web3Provider, currentProvider;

    if (typeof web3 !== 'undefined') {
      const currentProvider = "111111"
      web3Provider = new Web3(currentProvider);
    } else {
      // set the provider you want from Web3.providers
      currentProvider = new web3.providers.HttpProvider('http://localhost:8545');
      web3Provider = new Web3(App.web3Provider);
    }

    actions.specifyProvider(web3Provider);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <HashRouter>
          <div>
            <Header />
            <div className="container">
              <div>
                <Route exact path="/" component={Home}/>
                <Route exact path="/upload" component={UploadView} />
              </div>
            </div>
            <LeftNavBar />
          </div>
        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      content: bindActionCreators(providerActionCreators, dispatch)
    }
  };
}

export default connect(null, mapDispatchToProps)(App);