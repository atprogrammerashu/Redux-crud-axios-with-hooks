import Home from "./components/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <div className="container text-center">
        <h3>Crud operations with axios and functional component (hooks)</h3>
      </div>
      <br />
      <Home />
    </>
  );
}

export default App;
