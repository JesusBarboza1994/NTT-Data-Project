import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { getUsers } from "./services/users-sessions";

const Row = styled.div`
  display:flex;
  gap: 20px;
  border: 1px solid black;
`

function App() {
  const [users, setUsers] = useState(null)
  useEffect(() => {
    getUsers()
      .then(response => {
        setUsers(response.results)
        console.log(response.results)
      })
      .catch(console.log)
    
  }, [])
  
  return (
    users ? users.map(user => {
      return  <Row>
                <h1>{user.name.first}</h1>
                <h1>{user.name.last}</h1>
                <h1>{user.dob.age}</h1>
                <h1>{ user.gender == "female" ? "F" : "M" }</h1>
                <h1>{user.email}</h1>
                <h1>{user.nat}</h1>
                <img src={user.picture.thumbnail} />
              </Row>
    }) : null
  );
}

export default App;
