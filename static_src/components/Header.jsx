import React from 'react';
import PropTypes from "prop-types";
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import Profile from './Profile';


export default class Header extends React.Component {

  static propTypes = {
    chatId: PropTypes.number,
  };

  static defaultProps = {
    chatId: 1,
  };

  render() {
    return <div className="header">
      <AppBar
        title="Chat on React"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        >

        <span style={ { fontSize: '20px', color: 'white', margin: '3%' } }>Chat{this.props.chatId }</span>
        <Link to="/profile/">
        <IconMenu className="icon-menu"
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