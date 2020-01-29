import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
   static propTypes = {
       text: PropTypes.string.isRequired,
       author: PropTypes.string.isRequired
   };

   render() {
    return  <div className="message"
                style={ this.props.author === 'me' ? 
                      {alignSelf: 'flex-end', backgroundColor: 'rgb(207, 246, 252)'} : 
                      {alignSelf: 'flex-start', backgroundColor: 'rgb(165, 238, 248)'} }
            >
              <div>{ this.props.text }</div>
              <div className="message-sender">{ this.props.author }</div>
            </div>
   }
}
