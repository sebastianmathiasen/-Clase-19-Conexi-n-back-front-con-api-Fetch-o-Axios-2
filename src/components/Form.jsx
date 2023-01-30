import React from 'react';

export default function Form({ title }) {

    async function handleForm(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const newUser = {
            fullName: data.get("fullName"),
            userName: data.get("userName"),
            email: data.get("email"),
            profilePic: data.target(),
            password: data.get("password")
        };

        console.log(newUser.profilePic);

        await fetch("http://localhost:3030/api/users",
            {
                method: 'POST',
                headers: {
                    "Accept": 'application/json', //default mime type and subtype
                    'Content-Type': 'application/json; charset=utf-8', //mime character encoder
                },
                body: JSON.stringify(newUser),
            })
            .then((res) => res.status.json())
            .then((data) => console.log())
            .catch((err) => console.log(err))

            // console.log(newUser.profilePic.name);
    };
    
    return (
        <section>
            <h2>{title}</h2>
            <form className='form-container' onSubmit={handleForm} encType="multipart/form-data">
                <label htmlFor="fullName">Full Name</label><input type="text" id='fullName' name='fullName' />
                <br />
                <label htmlFor="userName">User Name</label><input type="text" id='userName' name='userName' />
                <br />
                <label htmlFor="email">Email</label><input type="text" id='email' name='email' />
                <br />
                <label htmlFor="profilePic">Photo</label><input type="file" id='profilePic' name='profilePic' />
                <br />
                <label htmlFor="password">Password</label><input type="text" id='password' name='password' />
                <br />
                <input type="submit" value="submit" />
            </form>
        </section>
    );
}