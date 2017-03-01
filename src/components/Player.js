import React from 'react';
import { formatPrice } from '../helpers';

class Player extends React.Component {

  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'active';
    const buttonText = isAvailable ? 'Add To Lineup' : 'Out!';
    return (
        <li className="menu-player">
          <img src={details.imageURL} alt={details.firstName} />
          <h3 className="player-name">
            <span>{details.firstName}</span> <span>{details.lastName}</span>
            <span className="price">{formatPrice(details.fee)}</span>
          </h3>
          <p>{details.status}</p>
          <p>{details.comments}</p>
          <button disabled={!isAvailable} onClick={() => this.props.addToLineup(index)}>{buttonText}</button>
        </li>
    )
  }
  static propTypes = {
    addToLineup: React.PropTypes.func.isRequired,
    details: React.PropTypes.object.isRequired,
    index: React.PropTypes.string.isRequired
  }
}

// Player.propTypes = {
//   addToLineup: React.PropTypes.func.isRequired,
//   details: React.PropTypes.object.isRequired,
//   index: React.PropTypes.string.isRequired
// }

export default Player;