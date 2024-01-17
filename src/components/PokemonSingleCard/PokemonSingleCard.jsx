import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonSingleCard.module.css";
import firstLetterToUppercase from "../../helpers/firstLetterToUppercase";

const PokemonSingleCard = ({ pokemonData }) => {
  const { name, types } = pokemonData;
  return (
    <li className={styles.cardContainer}>
      <Link to={`/${pokemonData.id}`}>
        <div className={styles.pokemonImage}></div>
        <h4 className={styles.pokemonName}>{firstLetterToUppercase(name)}</h4>
        <div className={styles.pokemonTypesBox}>
          {types?.map((type) => (
            <div
              className={`${styles.type} ${styles[type.type.name]}`}
              key={type.type.name}
            >
              {firstLetterToUppercase(type.type.name)}
            </div>
          ))}
        </div>
      </Link>
    </li>
  );
};

export default PokemonSingleCard;
