import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  handleToggleDrawer
} from '../components/MenuBar/modules/menuBar';
import Header from '../components/Header';
import MenuBar from '../components/MenuBar';
import ErrorDialog from '../components/ErrorDialog';
import LoadingDialog from '../components/LoadingDialog';
import GlobalStore from '../components/GlobalStore';
import './CoreLayout.scss';
import '../../styles/core.scss';
import intl from 'intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import hostname2Name from 'lib/hostname2Name'
import { addLocaleData, IntlProvider } from 'react-intl';
import { getHostName } from 'lib/utils'
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import { zh_CN } from 'language/zh_CN';
import { en_US } from 'language/en_US';

global.Intl = intl;

addLocaleData([...en, ...zh]);

injectTapEventPlugin();

const hostname = getHostName()

if (hostname) {
  document.title = `${hostname2Name[hostname]}物流管理平台`;
  document.getElementById('favicon').setAttribute('href', `/${hostname}favicon.ico`)
}

const _colors = require('material-ui/styles/colors');
const _colorManipulator = require('material-ui/utils/colorManipulator');
const _spacing = require('material-ui/styles/spacing');
const _spacing2 = _interopRequireDefault(_spacing);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: hostname ? `${hostname2Name[hostname]}物流管理平台` : '医捷云后台管理',
      theme: {
        spacing: _spacing2.default,
        fontFamily: 'Roboto, sans-serif',
        palette: {
          primary1Color: '#00A0FF',
          primary2Color: _colors.cyan700,
          primary3Color: _colors.grey400,
          accent1Color: _colors.pinkA200,
          accent2Color: _colors.grey100,
          accent3Color: _colors.grey500,
          textColor: _colors.darkBlack,
          secondaryTextColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.54),
          alternateTextColor: _colors.white,
          canvasColor: _colors.white,
          borderColor: _colors.grey300,
          disabledColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.3),
          pickerHeaderColor: _colors.cyan500,
          clockCircleColor: (0, _colorManipulator.fade)(_colors.darkBlack, 0.07),
          shadowColor: _colors.fullBlack
        }
      },
      themeFlag: false,
      paddingLeft: 255,
      language: navigator.language.split('-')[0],
      logo: `/${hostname}logo.png`
    }
  }
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.menuBar.open != this.props.menuBar.open) {
      this.setState({
        paddingLeft: this.state.paddingLeft === 255 ? 0 : 255
      });
    }
  };

  handleToggleDrawer() {
    return () => {
      this.props.handleToggleDrawer(!this.props.menuBar.open);
    }
  }

  chooseLocale = () => {
    switch (this.state.language) {
      case 'en':
        return en_US;
      case 'zh':
        return zh_CN;
      default:
        return en_US;
    }
  }

  render() {
    return (
      <IntlProvider locale={this.state.language} messages={this.chooseLocale()} >
        <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
          <GlobalStore>
            <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
              <Header
                title={this.state.title}
                handleToggleDrawer={this.handleToggleDrawer()}
                style={{ backgroundColor: '#00a0ff' }}
                handleTitleTouch={() => {}}
              />
              <ErrorDialog />
              <MenuBar
                logo={this.state.logo}
                title={this.state.title}
              />
              <div
                className='mainContainer'
                style={{
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingLeft: this.state.paddingLeft,
                  height: 'calc(100% - 0px)',
                  width: '100%',
                  overflow: 'hidden'
                }}
              >
                <div style={{ width: '100%', height: '100%' }}>
                  {this.props.children}
                </div>
              </div>
            </div>
            <LoadingDialog />
          </GlobalStore>
        </MuiThemeProvider>
      </IntlProvider>
    )
  }
}

AppContainer.propTypes = {
  children: React.PropTypes.element.isRequired
}

const mapDispatchToProps = {
  handleToggleDrawer
}

const mapStateToProps = state => ({
  menuBar: state.menuBar
})

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
