import React from 'react';
import { formatPrice } from '../helpers';

class Player extends React.Component {
  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'active';
    const buttonText = isAvailable ? 'Add To Lineup' : 'Out!';
    return (
        <li className="menu-fish">
          <img src={details.image} alt={details.firstName} />
          <h3 className="fish-name">
            <span>{details.firstName}</span> <span>{details.lastName}</span>
            <span className="price">{formatPrice(details.fee)}</span>
          </h3>
          <p>{details.comments}</p>
          <button disabled={!isAvailable} onClick={() => this.props.addToLineup(index)}>{buttonText}</button>
        </li>
    )
  }
}

export default Player;