import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  goToStore(e) {
    e.preventDefault();
    // first grab text from text field
    // console.log(this.storeInput.value );
    const storeId = this.storeInput.value;
    console.log(`Going to ${storeId}`);
    // second change URL from / to /store/:storeId
    this.context.router.transitionTo(`/store/${storeId}`)
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/* Look here */}
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />

        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;