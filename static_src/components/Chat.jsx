import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListItem } from 'material-ui/List';
import ContentSend from 'material-ui/svg-icons/content/send';

export default class Chat extends React.Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  render() {
    return <Link to={this.props.path}>
      <ListItem primaryText={this.props.title} leftIcon={< ContentSend />}/>
    </Link>
  }
}