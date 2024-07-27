import { useEffect, useState } from 'react'


function App() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
          'content-type':'application/json'
      },
      body:JSON.stringify(users)
    })
    .then(res=>res.json())
    .then(data=>setUsers(data))
  },[])

  const handleAddUser=e=>{
    e.preventDefault();
    const form=e.target;
    const name=form.name.value;
    const email=form.email.value;
    const user={name,email};
    console.log(user);
    fetch("http://localhost:5000/users",{
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)
    });
  }

  return (
    <>
      <h1>User managemnet System</h1>
      <p>number:{users.length}</p>
      <form action="" onSubmit={handleAddUser}>
        <input type="text" name=" name" id="" />
        <br></br>
        <input type="email" name="email" id="" />
        <br></br>
        <input type="submit" value="add user" />
      </form>
      {users.map((user) => (
        <p key={user.id}>
          {user.id}
          {user.name}
        </p>
      ))}
    </>
  );
}

export default App
