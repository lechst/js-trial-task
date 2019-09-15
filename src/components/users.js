import React from 'react';

const Users = ({users}) => {
	return (
		<div className="card-columns">
			{users.map((user) => (
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{user.name}</h5>
						<p className="card-text">{user.id}</p>
					</div>
				</div>
			))}
		</div>
	)
};

export default Users;
