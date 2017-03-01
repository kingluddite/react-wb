import React from 'react';
import { formatPrice } from '../helpers.js';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Lineup extends React.Component {
  constructor() {
    super();
    this.renderLineup = this.renderLineup.bind(this);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.props.lineup);
  //   console.log(nextState);
  //   if (this.props.lineup !== nextProps.lineup) {
  //     return true;
  //   }
  //   if (this.state.lineup !== nextState.lineup) {
  //     return true;
  //   }
  //   return false;
  // }

  renderLineup = (key) => {
    const player = this.props.players[key];
    const count = this.props.lineup[key];
    const removeButton = <button onClick={() => this.props.removeFromLineup(key)}>&times;</button>;

    // if(!player || player.status !== 'active') {
    //   return <li key={key}>Sorry, {player ? player.firstName : 'player'} is no longer available {removeButton}</li>
    // }

    if(!player) {
      return <li key={key}></li>
    } else if (player.status !== 'active') {
      return <li key={key}>Sorry, {player ? player.firstName : 'player'} is no longer available {removeButton}</li>
    }

    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          {player.firstName} {removeButton}
        </span>
        <span className="price">{formatPrice(count * player.fee)}</span>
      </li>
    )
  };

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
        <CSSTransitionGroup
          className="lineup"
          component="ul"
          transitionName="lineup"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {lineupIds.map(this.renderLineup)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    )
  }
  static propTypes = {
    lineup: React.PropTypes.object.isRequired,
    players: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    removeFromLineup: React.PropTypes.func.isRequired
  }
}

// Lineup.propTypes = {
//   lineup: React.PropTypes.object.isRequired,
//   players: React.PropTypes.object.isRequired,
//   params: React.PropTypes.object.isRequired,
//   removeFromLineup: React.PropTypes.func.isRequired
// }

export default Lineup;