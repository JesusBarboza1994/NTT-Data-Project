import { getUsers } from "./services/users-sessions";



function App() {

  getUsers().then(response => console.log(response.results)).catch(console.log)

  return (
    <h1>Hola</h1>
  );
}

export default App;
