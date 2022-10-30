import React, { useState } from 'react';

const AddUsers = () => {
    const [user, setuser] = useState({});

    const handleAddUser = (event) => {
        event.preventDefault();
        console.log(user);

        fetch('http://localhost:5500/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    alert('User added successfully');
                    event.target.reset();
                }
            })
    }

    const handleInputBlur = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[field] = value;
        setuser(newUser);
        console.log(value, field);
    }

    return (
        <div>
            <h2>Please Add a new User</h2>
            <form onSubmit={handleAddUser}>
                <input onBlur={handleInputBlur} type="text" name='name' placeholder='name' required />
                <br />
                <input onBlur={handleInputBlur} type="text" name='address' placeholder='address' required />
                <br />
                <input onBlur={handleInputBlur} type="email" name="email" id="" placeholder='email' required />
                <br />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AddUsers;