import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'RGNR1342545',
      phone: '+11001001010'
    }
  }

  render() {
    return <div className="background-field">
      <div className="header">
        <AppBar
          title="Chat on React"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          >

          <span style={ { fontSize: '20px', color: 'white', margin: '3%' } }>Profile</span>
          <Link to="/chat/1/">
          <IconMenu className="icon-menu"
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
          >
          </IconMenu>
          </Link>
        </AppBar>
      </div>
      <div className="body-block">
        <div className="profile-block">
          <span className="message">
            <p className="bold">Имя: </p>
            { this.state.name }
            <p className="bold">Номер телефона: </p>
            { this.state.phone }
          </span>
        </div>
      </div>
    </div>
  }
}