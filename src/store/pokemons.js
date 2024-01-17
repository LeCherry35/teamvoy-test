import { makeAutoObservable } from "mobx";

class Pokemons {
  pokemons = [];
  constructor() {
    makeAutoObservable(this);
  }
  setPokemons(pokemons) {
    this.pokemons = pokemons;
  }
}

export default new Pokemons();
