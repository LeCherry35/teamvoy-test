import { makeAutoObservable } from "mobx";

class Pokemons {
  pokemons = [];
  filter = "";
  constructor() {
    makeAutoObservable(this);
  }
  setPokemons(pokemons) {
    console.log(pokemons);
    this.pokemons = pokemons;
  }
  setFilter(filter) {
    this.filter = filter;
  }
}

export default new Pokemons();
