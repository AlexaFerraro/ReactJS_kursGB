import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';

class Profile extends React.Component {

  render() {
    return <div className="background-field">
      <div className="header">
        <AppBar
          title="Chat on React"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        >

          <span style={ { fontSize: '20px', color: 'white', margin: '3%' } }>Profile</span>
          <Link to="/chat/1/">
            <IconMenu
              className="icon-menu"
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
              { this.props.name }
            <p className="bold">Номер телефона: </p>
              { this.props.phone }
          </span>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = ({ profileReducer }) => ({
  name: profileReducer.name,
  phone: profileReducer.phone
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);