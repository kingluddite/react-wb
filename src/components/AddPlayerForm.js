import React from 'react';

class AddPlayerForm extends React.Component {
  constructor() {
    super();
    this.createPlayer = this.createPlayer.bind(this);
  }
  createPlayer(e) {
    e.preventDefault();
    const player = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      status: this.status.value,
      fieldPosition: this.fieldPosition.value,
      fee: this.fee.value,
      jerseyNumber: this.jerseyNumber.value,
      email: this.email.value,
      comments: this.comments.value,
      imageURL: this.imageURL.value
    }
    this.props.addPlayer(player);
    this.playerForm.reset();
  }
  render() {
    return (
      <form ref={(input) => this.playerForm = input} className="player-edit" onSubmit={this.createPlayer}>
      <input ref={(input) => this.firstName = input} type="text" placeholder="Player First Name" />
      <input ref={(input) => this.lastName = input} type="text" placeholder="Player Last name" />
      <select ref={(input) => this.status = input}>
        <option value="active">Active</option>
        <option value="injured">Injured</option>
        <option value="excused">Excused Absence</option>
        <option value="unexcused">Unexcused Absence</option>
      </select>
      <input ref={(input) => this.fieldPosition = input} type="text" placeholder="Field Position" />
      <input ref={(input) => this.fee= input} type="text" placeholder="Player Fee" />
      <input ref={(input) => this.jerseyNumber = input} type="text" placeholder="Jersey Number" />
      <input ref={(input) => this.email = input} type="text" placeholder="Email" />
      <input ref={(input) => this.imageURL = input} type="text" placeholder="Player Photo URL" />
      <textarea ref={(input) => this.comments = input} placeholder="Comments"></textarea>
      <button type="submit">+ Add Player</button>
      </form>

    )
  }
}

export default AddPlayerForm;