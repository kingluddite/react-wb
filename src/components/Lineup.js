import React from 'react';
import { formatPrice } from '../helpers.js';

class Lineup extends React.Component {
  constructor() {
    super();
    this.renderLineup = this.renderLineup.bind(this);
  }

  renderLineup(key) {
    const player = this.props.players[key];
    const count = this.props.lineup[key];
    const removeButton = <button onClick={() => this.props.removeFromLineup(key)}>&times;</button>;

    if(!player || player.status !== 'active') {
      return <li key={key}>Sorry, {player ? player.firstName : 'player'} is no longer available {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>{count} {player.firstName} {removeButton}</span>
        <span className="price">{formatPrice(count * player.fee)}</span>
      </li>
    )
  }

  render() {
    const lineupIds = Object.keys(this.props.lineup);
    const total = lineupIds.reduce((prevTotal, key) => {
      const player = this.props.players[key];
      const count = this.props.lineup[key];
      // const count = lineupIds.length;
      const isAvailable = player && player.status === 'active';
      if (isAvailable) {
        return prevTotal + (count * player.fee || 0);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="lineup-wrap">
        <h2>Your Starting Lineup</h2>
        <ul className="lineup">
          {lineupIds.map(this.renderLineup)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>

    )
  }
}

export default Lineup;