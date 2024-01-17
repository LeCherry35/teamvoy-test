import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PokemonInfoBlock.module.css";

const PokemonInfoBlock = () => {
  const id = useParams();
  return (
    <div className={styles.pokemonInfoContainer}>
      <div className={styles.pokemonInfoCard}>
        <div className={styles.pokemonImage}></div>
      </div>
    </div>
  )
}

export default PokemonInfoBlock;
