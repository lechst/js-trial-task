import React, {Component} from 'react';
import Users from './components/users';

class App extends Component {

  // default state object
  state = {
    users: []
  };

  componentDidMount() {
    fetch('http://localhost:3000/api/search?length=32')
      .then(response => response.json())
      .then((data) => {

        const newUsers = data.items.map(item => {
          return {
            id: item.id,
            name: item.name,
            lastLogin: item.last_login,
            pic: item.hasOwnProperty("picture")?item.picture.url:null
          };
        });

        const newState = Object.assign({}, this.state, {
          users: newUsers
        });

        this.setState(newState);

        console.log(this.state);

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
