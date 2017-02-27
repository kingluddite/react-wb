import React from 'react';
import AddPlayerForm from './AddPlayerForm';

class Roster extends React.Component {
  constructor() {
    super();
    this.renderRoster = this.renderRoster.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    return (
      <div>
        <h2>Roster</h2>
        {Object.keys(this.props.players).map(this.renderRoster)}
        <AddPlayerForm addPlayer={this.props.addPlayer} />
        <button onClick={this.props.loadSamples}>Load Sample Players</button>
      </div>
    )
  }
}

export default Roster;