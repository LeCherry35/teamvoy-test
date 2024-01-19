import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PokemonInfoBlock.module.css";
import pokemons from "../../store/pokemons";
import addZeroes from "../../helpers/addZeroes";

const PokemonInfoBlock = () => {
  
  const { id } = useParams();

  const pokemon = pokemons.pokemons.find(
    (pokemon) => pokemon.id === Number(id),
  );

  if (!pokemon) return <></>; //if no pokemon selected return empty fragment

  return (
    <div className={styles.pokemonInfoContainer}>
      <div className={styles.pokemonInfoCard}>
        <div className={styles.pokemonImage}></div>
        <div>
          <h4
            className={styles.pokemonName}
          >{`${pokemon.name} #${addZeroes(pokemon.id)}`}</h4>
          <div className={styles.pokemonStatsBox}>
            <div>
              <div>Type</div>
              <div>{pokemon.types[0]}</div>
            </div>
            {pokemon.stats?.map((stat) => {
              return (
                <div key={pokemon.id + stat.stat.name}>
                  <div className={styles.statName}>{stat.stat.name}</div>
                  <div className={styles.statValue}>{stat.base_stat}</div>
                </div>
              );
            })}
            <div>
              <div>Weight</div>
              <div>{pokemon.weight}</div>
            </div>
            <div>
              <div> Total moves</div>
              <div>{pokemon.totalMoves}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfoBlock;
