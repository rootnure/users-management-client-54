import { useEffect, useState } from 'react'
import './App.css'


function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);

    // post api
    fetch('http://localhost:5000/users', {
      method: 'POST', // default value is GET but to send data to server must use POST method
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user) // must use JSON.stringify()
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        const newUsers = [...users, data]

        setUsers(newUsers)


        form.reset();
      })
  }

  return (
    <>
      <h1>Users Management System</h1>
      <p>Number of Users: {users.length}</p>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Submit" />
        <br />
      </form>
      {
        users.map(user => <p key={user.id}>{user.id}. {user.name} ({user.email})</p>)
      }
    </>
  )
}

export default App
