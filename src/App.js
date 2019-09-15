import React, {Component} from 'react';
import Users from './components/users';

class App extends Component {

  // default state object
  state = {
    users: []
  };

  componentDidMount() {
    fetch('http://localhost:3000/api/search?length=2')
      .then(response => response.json())
      .then((data) => {

        const newUsers = data.items.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        });

        const newState = Object.assign({}, this.state, {
          users: newUsers
        });

        this.setState(newState);

      })
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Users users={this.state.users} />
    )
  }

}

export default App;
