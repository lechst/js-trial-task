import React, {Component} from 'react';
import Users from './components/users';

class App extends Component {

  constructor( props ){
    super( props );
    this.state = {
      users: [],
      cursorHistory: [],
      cursorIndex: 0
    };
    this.changePage = this.changePage.bind(this);
  }

  requestData(url) {

    // 1st API endpoint request

    fetch(url)
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

        let newCursorHistory = this.state.cursorHistory;
        newCursorHistory.push( data.cursors.after );

        const newState = Object.assign({}, this.state, {
          users: newUsers,
          cursorHistory: newCursorHistory
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

  changePage(next){

    console.log(this.state.cursorIndex);

    let cursor;

    if( next ){

      cursor = this.state.cursorHistory[ this.state.cursorIndex ];

      console.log("next "+cursor);

      const newState = Object.assign({}, this.state, {
        cursorIndex : this.state.cursorIndex + 1
      });

      this.setState(newState);

      this.requestData('http://localhost:3000/api/search?cursor='+cursor);

    } else {

      if( this.state.cursorIndex === 0 ){
        return;
      }

      cursor = this.state.cursorHistory[ this.state.cursorIndex - 2 ];

      console.log("prev "+cursor);

      let newCursorHistory = this.state.cursorHistory;
      newCursorHistory.pop();
      newCursorHistory.pop();

      const newState = Object.assign({}, this.state, {
        cursorHistory : newCursorHistory,
        cursorIndex : this.state.cursorIndex - 1
      });

      this.setState(newState);

      if( this.state.cursorIndex === 1 ){

        this.requestData('http://localhost:3000/api/search?length=32');

      } else {

        this.requestData('http://localhost:3000/api/search?cursor='+cursor);

      }

    }

  }

  componentDidMount() {

    this.requestData('http://localhost:3000/api/search?length=32');

  }

  render() {
    return (
        <div>

          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item" onClick={ () => this.changePage(false) }><a className="page-link" href="#">Previous</a></li>
              <li className="page-item" onClick={ () => this.changePage(true) }><a className="page-link" href="#">Next</a></li>
            </ul>
          </nav>

          <div className="row">
            <div className="col-md-6 box">big content</div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-6 small-box">1</div>
                <div className="col-md-6 small-box">2</div>
                <div className="col-md-6 small-box">3</div>
                <div className="col-md-6 small-box">4</div>
              </div>
            </div>
          </div>

          <Users users={this.state.users} />

        </div>
    )
  }

}

export default App;
