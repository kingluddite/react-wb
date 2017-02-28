import React from 'react';
import AddPlayerForm from './AddPlayerForm';
import base from '../base';

class Roster extends React.Component {
  constructor() {
    super();
    this.renderRoster = this.renderRoster.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const player = this.props.players[key];

    // take a copy of that player and update it with the new data
    const updatedPlayer = {
      ...player,
      [e.target.name]: e.target.value
    };
    this.props.updatePlayer(key, updatedPlayer);
  }

  authenticate(provider) {
    // console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null})
  }

  authHandler(err, authData) {
    // console.log(authData);
    if (err) {
      console.error(err);
      return;
    }

    // grab the team info
    const teamRef = base.database().ref(this.props.teamId);
    // query the firebase once for the team data
    teamRef.once('value', (snapshot) => {
      // get the data or store an empty object {}
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already
      if(!data.owner) {
        teamRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    });
  }

  renderLogin() {
    return (
      <div>
        <h2>Roster</h2>
        <p>Sign in to manage your team's roster</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In With Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In With Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In With Twitter</button>
      </div>
    )
  }

  renderRoster(key) {
    const player = this.props.players[key];
    return (
      <div className="player-edit" key={key}>
        <input type="text" value={player.firstName} name="firstName" placeholder="First Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" value={player.lastName} name="lastName" placeholder="Last Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" value={player.email} name="email" placeholder="Email" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" value={player.fieldPosition} name="fieldPosition" placeholder="Field Position" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" value={player.fee} name="fee" placeholder="Game Fee" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" value={player.jerseyNumber} name="jerseyNumber" placeholder="Jersey Number" onChange={(e) => this.handleChange(e, key)} />
        <select type="text" value={player.status} name="status" placeholder="Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="active">Active</option>
          <option value="injured">Injured</option>
          <option value="vacation">Vacation</option>
          <option value="unexcused">Unexcused</option>
          <option value="excused">Excused</option>
        </select>
        <textarea type="text" value={player.comments} name="comments" placeholder="Comments" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" value={player.imageURL} name="imageURL" placeholder="Image URL" onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removePlayer(key)}>Remove Player</button>
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out</button>;
    // check if they are not logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    // check if they are the owner of the current team
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the coach of this team.</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Roster</h2>
        {logout}
        {Object.keys(this.props.players).map(this.renderRoster)}
        <AddPlayerForm addPlayer={this.props.addPlayer} />
        <button onClick={this.props.loadSamples}>Load Sample Players</button>
      </div>
    )
  }
}

Roster.propTypes = {
  addPlayer: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  players: React.PropTypes.object.isRequired,
  removePlayer: React.PropTypes.func.isRequired,
  updatePlayer: React.PropTypes.func.isRequired,
  teamId: React.PropTypes.string.isRequired
}

export default Roster;