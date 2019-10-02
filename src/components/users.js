import React from 'react';

const Users = ({users}) => {

    function styleCard(plus){

        if(plus){
            return {
                styleCard: {
                    width: '800px',
                    height: '800px'
                },
                styleImage: {
                    width: '200px',
                    height: '200px'
                },
                styleText: {
                    height: '60px'
                }
            };
        } else {
            return {
                styleCard: {
                    width: '400px',
                    height: '400px'
                },
                styleImage: {
                    width: '100px',
                    height: '100px'
                },
                styleText: {
                    height: '30px'
                }
            }
        }

    }


    function renderCard(user) {

        return (
            <div className="card" key={user.id} style={styleCard(user.plus).styleCard}>
                <img className="card-img-top" src={user.pic} alt="Card image cap" style={styleCard(user.plus).styleImage}></img>
                <div className="card-body">
                    <h5 className="card-title" style={styleCard(user.plus).styleText}>{user.name}</h5>
                    <p className="card-text" style={styleCard(user.plus).styleText}>{user.headline}</p>
                    <p className="card-text" style={styleCard(user.plus).styleText}>Age: {user.age}</p>
                    <p className="card-text" style={styleCard(user.plus).styleText}>Location: {user.location}</p>
                    <p className="card-text" style={styleCard(user.plus).styleText}>Distance: {user.distance}</p>
                    <div className="card-footer" style={styleCard(user.plus).styleText}>
                        <small className="text-muted">{user.lastLogin}</small>
                    </div>
                </div>
            </div>
        );

    }


	return (
		<div className="card-columns">


			{

                (function(){

                    let usersBig = users.filter(user => user.plus === true);

                    let usersSmall = users.filter(user => user.plus === false);

                    let newUsers = [];

                    let indexUsersSmall = 0;

                    for(let i=0; i<usersBig.length; i++){
                        newUsers.push(usersBig[i]);
                        for(let j=0; j<4; j++){
                            newUsers.push(usersSmall[indexUsersSmall]);
                            indexUsersSmall++;
                        }
                    }

                    for(let i=indexUsersSmall; i<usersSmall.length; i++){
                        newUsers.push(usersSmall[i]);
                    }

			        return newUsers.map((user) => (

                        renderCard(user)

                    ))
                })()


			}


		</div>
	)
};

export default Users;
