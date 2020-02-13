import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    func: PropTypes.object.isRequired,
  };

  render() {
    return  <div 
              className="message"
              style={ this.props.sender === 'me' ? 
                {alignSelf: 'flex-end', backgroundColor: 'rgb(207, 246, 252)'} : 
                {alignSelf: 'flex-start', backgroundColor: 'rgb(165, 238, 248)'} }
            >
              <div>{ this.props.text }{ this.props.func }</div>
              <div className="message-sender">{ this.props.sender }</div>
            </div>
  }
}
