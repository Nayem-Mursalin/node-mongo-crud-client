import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
    const user = useLoaderData();
    const [displayUsers, setDisplayUsers] = useState(user);

    const handleDelete = user => {
        const agree = window.confirm(`Are you sure you want to delete: ${user.name}`);
        if (agree) {
            fetch(`http://localhost:5500/users/${user._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.deletedCount > 0) {
                        alert('User Deleted Successfully');
                        const remainingUser = displayUsers
                            .filter(usr => usr._id !== user._id)
                        setDisplayUsers(remainingUser);
                    }
                })

        }
    }
    return (
        <div>
            <h2>Users: {displayUsers.length}</h2>
            <div>
                {
                    displayUsers.map(user => <p key={user._id}>
                        {user.name} {user.email}
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(user)}>X</button>
                    </p>)
                }
            </div>
        </div >
    );
};

export default Home;