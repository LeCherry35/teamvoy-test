import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonSingleCard.module.css";
import pokemons from "../../store/pokemons";
import { observer } from "mobx-react-lite";

const PokemonSingleCard = observer(({ pokemonData }) => {
  const { name, types } = pokemonData;

  if (pokemons.filter && !types.includes(pokemons.filter)) return <></>;

  return (
    <Link className={styles.cardContainer} to={`/${pokemonData.id}`}>
      <div className={styles.pokemonImage}></div>
      <h4 className={styles.pokemonName}>{name}</h4>
      <div className={styles.pokemonTypesBox}>
        {types?.map((type) => (
          <div
            className={
              pokemons.filter === type
                ? `${styles.type} ${styles[type]} ${styles.selected}`
                : `${styles.type} ${styles[type]}`
            }
            key={type}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              pokemons.setFilter(pokemons.filter === type ? "" : type);
            }}
          >
            {type}
          </div>
        ))}
      </div>
    </Link>
  );
});

export default PokemonSingleCard;
