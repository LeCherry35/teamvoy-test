import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PokemonInfoBlock from "./components/PokemonInfoBlock/PokemonInfoBlock";
import PokemonCards from "./components/PokemonCards/PokemonCards";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <h1 className="heading">Pokedex</h1>
        <div className="content">
          <PokemonCards />

          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/:id" element={<PokemonInfoBlock />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
