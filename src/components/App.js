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
    this.updatePlayer = this.updatePlayer.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.removeFromLineup = this.removeFromLineup.bind(this);

    // initial state (was known as 'getinitialstate' with React createClass)
    this.state = {
      players: {},
      lineup: {}
    };

  }

  componentWillMount() {
    // this runs before the <App> is rendered
    this.ref = base.syncState(`${this.props.params.teamId}/players`, {
      context: this,
      state: 'players'
    });
    // check if there is any lineup in localStorage
    const localStorageRef = localStorage.getItem(`lineup-${this.props.params.teamId}`);

    if(localStorageRef) {
      // update our App component's lineup state
      this.setState({
        lineup: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`lineup-${this.props.params.teamId}`, JSON.stringify(nextState.lineup));
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

  updatePlayer(key, updatedPlayer) {
    const players = {...this.state.players};
    players[key] = updatedPlayer;
    this.setState({ players });
  }

  removePlayer(key) {
    // make a copy of our players state
    const players = {...this.state.players};
    players[key] = null;
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

  removeFromLineup(key) {
    // make a copy of our players state
    const lineup = {...this.state.lineup};
    delete lineup[key];
    this.setState({ lineup });
  }

  render() {
    return (
      <div className="team-of-the-day">
        <div className="menu">
          <Header tagline="Great Players"/>
          <ul className="list-of-players">
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
        <Lineup
          players={this.state.players}
          lineup={this.state.lineup}
          params={this.props.params}
          removeFromLineup={this.removeFromLineup}
        />
        <Roster
          addPlayer={this.addPlayer}
          loadSamples={this.loadSamples}
          players={this.state.players}
          updatePlayer={this.updatePlayer}
          removePlayer={this.removePlayer}
          teamId={this.props.params.teamId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;