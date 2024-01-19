import React, { useEffect } from "react";
import pokemons from "../../store/pokemons";
import styles from "./PokemonCards.module.css";
import PokemonSingleCard from "../PokemonSingleCard/PokemonSingleCard";
import { observer } from "mobx-react-lite";

const PokemonCards = () => {
  useEffect(() => {
    pokemons.getPokemons();
  }, []);

  const getPokemons = () => {
    pokemons.getPokemons();
    pokemons.setFilter("");
  };

  return (
    <div className={styles.PokemonCardsContainer}>
      <ul className={styles.PokemonCardsList}>
        {pokemons.pokemons.map((pokemon) => {
          return <PokemonSingleCard pokemonData={pokemon} key={pokemon.id} />;
        })}
      </ul>
      {pokemons.isLoading && <div className={styles.loader}>Loading...</div>}
      <button onClick={getPokemons}>Load More</button>
    </div>
  );
};

export default observer(PokemonCards);
