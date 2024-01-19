import axios from "axios";
import { makeAutoObservable } from "mobx";

class Pokemons {
  pokemons = [];
  filter = "";
  nextUrl = null;

  constructor() {
    makeAutoObservable(this);
  }

  setPokemons(pokemons) {
    this.pokemons = pokemons;
  }
  setFilter(filter) {
    this.filter = filter;
  }
  getPokemons() {
    const url = this.nextUrl || "https://pokeapi.co/api/v2/pokemon?limit=12";
    axios
      .get(url)
      .then((res) => {
        const pokemonsPromises = [];
        for (let pokemonInfo of res.data.results) {
          const pokemonInfoPromise = getAndMapPokemonData(pokemonInfo.url);
          pokemonsPromises.push(pokemonInfoPromise);
        }
        Promise.all(pokemonsPromises).then((pokemonsData) => {
          this.setPokemons([...this.pokemons, ...pokemonsData]);
        });
        this.nextUrl = res.data.next;
      })
      .catch((e) => console.log(e.message));

    async function getAndMapPokemonData(url) {
      //gets single pokemon data and maps it to the format we need
      const res = await axios.get(url);
      const types = res.data.types.map((type) => type.type.name);
      return {
        id: res.data.id,
        name: res.data.name,
        stats: res.data.stats,
        types,
        totalMoves: res.data.moves.length,
        weight: res.data.weight,
      };
    }
  }
}

const pokemons = new Pokemons();
export default pokemons;
