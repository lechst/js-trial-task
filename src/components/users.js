import React from 'react';

const Users = ({users}) => {

	let styleCard = {
		width: '400px',
		height: '400px'
	};

	let styleImage = {
		width: '100px',
		height: '100px'
	};

	let styleText = {
		height: '30px'
	};

	return (
		<div className="card-columns">
			{users.map((user) => (
				<div className="card" key={user.id} style={styleCard}>
					<img className="card-img-top" src={user.pic} alt="Card image cap" style={styleImage}></img>
					<div className="card-body">
						<h5 className="card-title" style={styleText}>{user.name}</h5>
						<p className="card-text" style={styleText}>{user.headline}</p>
						<p className="card-text" style={styleText}>Age: {user.age}</p>
						<p className="card-text" style={styleText}>Location: {user.location}</p>
						<p className="card-text" style={styleText}>Distance: {user.distance}</p>
						<div className="card-footer" style={styleText}>
							<small className="text-muted">{user.lastLogin}</small>
						</div>
					</div>
				</div>
			))}
		</div>
	)
};

export default Users;
