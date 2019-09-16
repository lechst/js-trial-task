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
						<p className="card-text">Age: {user.age}</p>
						<p className="card-text">Location: {user.location}</p>
						<p className="card-text">Distance: {user.distance}</p>
						<div className="card-footer">
							<small className="text-muted">{user.lastLogin}</small>
						</div>
					</div>
				</div>
			))}
		</div>
	)
};

export default Users;
