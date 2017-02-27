import React from 'react';
import { getFunName } from '../helpers';

class TeamPicker extends React.Component {
  constructor() {
    super();
    this.goToTeam = this.goToTeam.bind(this);
  }
  goToTeam(e) {
    e.preventDefault();
    // first grab text from text field
    // console.log(this.teamInput.value );
    const teamId = this.teamInput.value;
    console.log(`Going to ${teamId}`);
    // second change URL from / to /team/:teamId
    this.context.router.transitionTo(`/team/${teamId}`)
  }

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam}>
        {/* Look here */}
        <h2>Please Enter a Team</h2>
        <input type="text" required placeholder="Team Name" defaultValue={getFunName()} ref={(input) => { this.teamInput = input }} />

        <button type="submit">Visit Team</button>
      </form>
    )
  }
}

TeamPicker.contextTypes = {
  router: React.PropTypes.object
}

export default TeamPicker;