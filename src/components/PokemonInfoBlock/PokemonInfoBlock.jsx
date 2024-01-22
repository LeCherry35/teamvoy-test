import React from "react";
import { useParams } from "react-router-dom";
import styles from "./PokemonInfoBlock.module.css";
import pokemons from "../../store/pokemons";
import addZeroes from "../../helpers/addZeroes";
import { observer } from "mobx-react-lite";

const PokemonInfoBlock = () => {
  const { id } = useParams();
  const [imageNumber, setImageNumber] = React.useState(0);

  const pokemon = pokemons.pokemons.find(
    (pokemon) => pokemon.id === Number(id),
  );
  if (!pokemon && pokemons.isLoading)
    return <></>; //if no pokemon selected return empty fragment
  else if (pokemon) {
    const { name, types, stats, sprites, weight, totalMoves } = pokemon;

    const images = [];
    for (let image in sprites) {
      if (sprites[image] && typeof sprites[image] === "string")
        images.push(sprites[image]);
    }

    const changeImage = () => {
      if (imageNumber < images.length - 1) {
        setImageNumber((imageNumber) => imageNumber + 1);
      } else {
        setImageNumber(0);
      }
    };

    return (
      <div className={styles.pokemonInfoContainer}>
        <div className={styles.pokemonInfoCard}>
          <div className={styles.pokemonImage} onClick={() => changeImage()}>
            <img src={images[imageNumber]} />
          </div>
          <div>
            <h4
              className={styles.pokemonName}
            >{`${name} #${addZeroes(id)}`}</h4>
            <div className={styles.pokemonStatsBox}>
              <div>
                <div>Type</div>
                <div>{types[0]}</div>
              </div>
              {stats?.map((stat) => {
                return (
                  <div key={id + stat.stat.name}>
                    <div className={styles.statName}>{stat.stat.name}</div>
                    <div className={styles.statValue}>{stat.base_stat}</div>
                  </div>
                );
              })}
              <div>
                <div>Weight</div>
                <div>{weight}</div>
              </div>
              <div>
                <div> Total moves</div>
                <div>{totalMoves}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default observer(PokemonInfoBlock);
