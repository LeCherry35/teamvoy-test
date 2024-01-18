import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PokemonInfoBlock.module.css";
import pokemons from "../../store/pokemons";
import firstLetterToUppercase from "../../helpers/firstLetterToUppercase";
import addZeroes from "../../helpers/addZeroes";

const PokemonInfoBlock = () => {
  const { id } = useParams();
  const pokemon = pokemons.pokemons[id - 1];

  if (!pokemon) return <></>;

  return (
    <div className={styles.pokemonInfoContainer}>
      <div className={styles.pokemonInfoCard}>
        <div className={styles.pokemonImage}></div>
        <div>
          <h4
            className={styles.pokemonName}
          >{`${firstLetterToUppercase(pokemon.name)} #${addZeroes(pokemon.id)}`}</h4>
          <div className={styles.pokemonStatsBox}>
            <div>Type</div>
            <div>{firstLetterToUppercase(pokemon.types[0])}</div>
            {pokemon.stats?.map((stat) => {
              return (
                <>
                  <div className={styles.statName}>
                    {firstLetterToUppercase(stat.stat.name)}
                  </div>
                  <div className={styles.statValue}>{stat.base_stat}</div>
                </>
              );
            })}
            <div>Weight</div>
            <div>{pokemon.weight}</div>
            <div> Total moves</div>
            <div>{pokemon.totalMoves}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfoBlock;
