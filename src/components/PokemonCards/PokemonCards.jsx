import React, { useEffect } from "react";
import pokemons from "../../store/pokemons";
import styles from "./PokemonCards.module.css";
import PokemonSingleCard from "../PokemonSingleCard/PokemonSingleCard";
import { observer } from "mobx-react-lite";

const PokemonCards = observer(() => {
  useEffect(() => {
    pokemons.getPokemons();
  }, []);

  const getPokemons = () => {
    pokemons.getPokemons();
  };

  return (
    <div className={styles.PokemonCardsContainer}>
      <ul className={styles.PokemonCardsList}>
        {pokemons.pokemons.map((pokemon) => {
          return <PokemonSingleCard pokemonData={pokemon} key={pokemon.id} />;
        })}
      </ul>
      {/* {isLoading && <div className={styles.loader}>Loading...</div>} */}
      <button onClick={getPokemons}>Load More</button>
    </div>
  );
});

export default PokemonCards;
