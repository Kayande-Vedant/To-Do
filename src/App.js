import logo from './logo.svg';
import './App.css';
import Welcome from './welcome/welcome';
import Board from './components/board/board';

function App() {
  return (
    <div className="App">
      {/* <Welcome /> */}
      <h1> To-Do Application </h1>
      <Board />
    </div>
  );
}

export default App;
