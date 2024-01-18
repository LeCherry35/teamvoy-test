import React, { useEffect, useState } from "react";
import pokemons from "../../store/pokemons";
import axios from "axios";
import styles from "./PokemonCards.module.css";
import PokemonSingleCard from "../PokemonSingleCard/PokemonSingleCard";
import { observer } from "mobx-react-lite";

const PokemonCards = observer(() => {
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
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
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getPokemons = () => {
    setIsLoading(true);
    try {
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
    } catch (e) {
      console.log(e);
    } finally {
      // setIsLoading(false);
    }
  };

  async function getAndMapPokemonData(url) {
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
  return (
    <div className={styles.PokemonCardsContainer}>
      <ul className={styles.PokemonCardsList}>
        {pokemons.pokemons.map((pokemon) => {
          return <PokemonSingleCard pokemonData={pokemon} key={pokemon.id} />;
        })}
      </ul>
      {isLoading && <div className={styles.loader}>Loading...</div>}
      <button onClick={getPokemons}>Load More</button>
    </div>
  );
});

export default PokemonCards;
