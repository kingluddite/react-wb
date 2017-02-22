import React from 'react';

class AddPlayerForm extends React.Component {
  constructor() {
    super();
    this.createPlayer = this.createPlayer.bind(this);
  }
  createPlayer(e) {
    e.preventDefault();
    console.log('test');
    const player = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      status: this.status.value,
      position: this.position.value,
      fee: this.fee.value,
      number: this.number.value,
      email: this.email.value,
      comments: this.comments.value,
    }
    this.props.addPlayer(player);
    this.playerForm.reset();
  }
  render() {
    return (
      <form ref={(input) => this.playerForm = input} className="fish-edit" onSubmit={this.createPlayer}>
      <input ref={(input) => this.firstName = input} type="text" placeholder="Player First Name" />
      <input ref={(input) => this.lastName = input} type="text" placeholder="Player Last name" />
      <select ref={(input) => this.status = input}>
        <option value="available">Available</option>
        <option value="injured">Injured</option>
        <option value="excused">Excused Absence</option>
        <option value="unexcused">Unexcused Absence</option>
      </select>
      <input ref={(input) => this.position = input} type="text" placeholder="Player Position" />
      <input ref={(input) => this.fee= input} type="text" placeholder="Player Fee" />
      <input ref={(input) => this.number = input} type="text" placeholder="Player Jersey Number" />
      <input ref={(input) => this.email = input} type="text" placeholder="Player Email" />
      <textarea ref={(input) => this.comments = input} placeholder="Comments"></textarea>
      <button type="submit">+ Add Player</button>
      </form>

    )
  }
}

export default AddPlayerForm;