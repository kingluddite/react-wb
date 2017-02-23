import React from 'react';
import Header from './Header';
import Lineup from './Lineup';
import Roster from './Roster';
import samplePlayers from '../sample-players';
import Player from './Player';
import base from '../base';

class App extends React.Component {

  constructor() {
    super();
    this.addPlayer = this.addPlayer.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToLineup = this.addToLineup.bind(this);
    // initial state (was known as 'getinitialstate' with React createClass)
    this.state = {
      players: {},
      lineup: {}
    };

  }
    componentWillMount() {
      this.ref = base.syncState(`${this.props.params.storeId}/players`, {
        context: this,
        state: 'players'
      });
    }

    componentWillUnmount() {
      base.removeBinding(this.ref);
    }




  addPlayer(player) {
    // update our state
    const players = {...this.state.players};
    // add in our new player
    const timestamp = Date.now();
    players[`player-${timestamp}`] = player;
    // this.state.players.player1 = player;
    // set state
    this.setState({ players });
  }

  loadSamples() {
    this.setState({
      players: samplePlayers
    });
  }

  addToLineup(key) {
    // take a copy of our state
    const lineup = {...this.state.lineup};
    // update or add the new number of players added to lineup
    lineup[key] = lineup[key] + 1 || 1;
    // update our state
    this.setState({ lineup });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Fish" />
          <ul className="list-of-fishes">
            {
              Object
              .keys(this.state.players)
              .map(key =>
                <Player
                  key={key} index={key}
                  details={this.state.players[key]} addToLineup={this.addToLineup}
                />)
            }
          </ul>
        </div>
        <Lineup players={this.state.players} lineup={this.state.lineup}/>
        <Roster
          addPlayer={this.addPlayer}
          loadSamples={this.loadSamples}
        />
      </div>
    )
  }
}

export default App;