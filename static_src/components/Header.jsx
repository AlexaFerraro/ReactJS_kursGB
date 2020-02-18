import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { loadProfile } from '../actions/profileActions';
import PushToggle from './PushToggle';


class Header extends React.Component {

  static propTypes = {
    chatId: PropTypes.number,
    data:   PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    chatId: 1,
  };

  componentDidMount() {
    this.props.loadProfile();
  }

  render() {
    if (this.props.isLoading) {
        return <div>GeekChat</div>
    }
    const { name } = this.props.data;
    return <div className="header">
      <AppBar
        title={<PushToggle />}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
      >
        <span style={ { fontSize: '14px', color: 'lightblue', margin: '3%' } }>User:{ name }
          <span style={ { fontSize: '20px', color: 'white', margin: '3%' } }>Chat{this.props.chatId }
          </span>
        </span>
        <Link to="/profile/">
          <IconMenu 
            className="icon-menu"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
            <Profile/>
          </IconMenu>
        </Link>
      </AppBar>
    </div>
  }
}

const mapStateToProps = ({ profileReducer, chatReducer }) => ({
  data: profileReducer.data,
  isLoading: chatReducer.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({ loadProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);