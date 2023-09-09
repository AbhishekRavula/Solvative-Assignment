import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./components/User";
import { NewUser } from "./components/NewUser";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  async function getAllUsers() {
    try {
      const res = await fetch(" http://localhost:5005/users");
      const users = await res.json();
      setUsers(users);
    } catch (error) {
      console.log("error fetching users");
    }
  }

  return (
    <>
      <NewUser />
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>P5 balance</th>
          <th>Reward balance</th>
        </tr>
        {users.map((user, index) => {
          return <User key={user._id} index={index} user={user} />;
        })}
      </table>
    </>
  );
}

export default App;
