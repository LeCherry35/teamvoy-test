import React, { useEffect, useState } from "react";
import pokemons from "../../store/pokemons";
import axios from "axios";
import styles from "./PokemonCards.module.css";
import PokemonSingleCard from "../PokemonSingleCard/PokemonSingleCard";
import { observer } from "mobx-react-lite";

const PokemonCards = observer(() => {
  const [nextUrl, setNextUrl] = useState(null);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=12").then((res) => {
      const pokemonsPromises = [];
      for (let pokemonInfo of res.data.results) {
        const pokemon = getAndMapPokemonData(pokemonInfo.url);
        pokemonsPromises.push(pokemon);
      }
      Promise.all(pokemonsPromises).then((pokemonsData) => {
        pokemons.setPokemons(pokemonsData);
      });
      setNextUrl(res.data.next);
    });
  }, []);

  const getPokemons = () => {
    axios.get(nextUrl).then((res) => {
      const pokemonsPromises = [];
      for (let pokemonInfo of res.data.results) {
        const pokemonInfoPromise = getAndMapPokemonData(pokemonInfo.url);
        pokemonsPromises.push(pokemonInfoPromise);
      }
      Promise.all(pokemonsPromises).then((pokemonsData) => {
        pokemons.setPokemons([...pokemons.pokemons, ...pokemonsData]);
      });
      setNextUrl(res.data.next);
    });
  };

  async function getAndMapPokemonData(url) {
    const res = await axios.get(url);
    return {
      id: res.data.id,
      name: res.data.name,
      stats: res.data.stats,
      types: res.data.types,
      totalMoves: res.data.moves.length,
      weight: res.data.weight,
    };
  }

  return (
    <div
      className={styles.PokemonCardsContainer}
      onClick={() => console.log(pokemons.pokemons)}
    >
      <ul className={styles.PokemonCardsList}>
        {pokemons.pokemons.map((pokemon) => {
          return <PokemonSingleCard pokemonData={pokemon} key={pokemon.id} />;
        })}
      </ul>
      <button onClick={getPokemons}>Load More</button>
    </div>
  );
});

export default PokemonCards;
