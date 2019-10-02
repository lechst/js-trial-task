import React, {Component} from 'react';
import Users from './components/users';

class App extends Component {

  // default state object
  state = {
    users: []
  };

  componentDidMount() {

    // 1st API endpoint request

    fetch('http://localhost:3000/api/search?length=32')
      .then(response => response.json())
      .then((data) => {

        // feed up users with relevant data from 1st API endpoint

        const newUsers = data.items.map(item => {
          return {
            id: item.id,
            plus: item.is_plus,
            name: item.name,
            lastLogin: item.last_login,
            pic: item.hasOwnProperty("picture")?item.picture.url:null
          };
        });

        // update state object

        const newState = Object.assign({}, this.state, {
          users: newUsers
        });

        this.setState(newState);

        // find url for the 2nd API endpoint request

        let reqUrl = "";

        data.items.forEach(item => {
          reqUrl += "ids="+item.id+"&";
        });

        // 2nd API endpoint request

        return fetch('http://localhost:3000/api/profiles?'+reqUrl);

      })
      .then(response => response.json())
      .then((data) => {

        // feed up users with a new data from 2nd API endpoint

        const newUsers = this.state.users.map(item => {

          const userData = data.find(x => x.id === item.id);

          return {
            id: item.id,
            plus: item.plus,
            name: item.name,
            lastLogin: item.lastLogin,
            pic: item.pic,
            headline: userData.headline,
            location: userData.location.name,
            distance: userData.location.distance,
            age: userData.personal.age
          };

        });

        // update state object

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
