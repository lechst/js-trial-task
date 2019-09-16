import React from 'react';

const Users = ({users}) => {
	return (
		<div className="card-columns">
			{users.map((user) => (
				<div className="card">
					<img className="card-img-top" src={user.pic} alt="Card image cap"></img>
					<div className="card-body">
						<h5 className="card-title">{user.name}</h5>
						<p className="card-text">{user.headline}</p>
						<p className="card-text">{user.lastLogin}</p>
					</div>
				</div>
			))}
		</div>
	)
};

export default Users;
