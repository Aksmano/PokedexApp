import React, { Component, useEffect, useState } from "react";
import { Pokemon, PokemonType } from "../../Interfaces";
import Loader from "../Loader/Loader";
import "./ListElement.css";

interface ListElementProps {
  pokemon: Pokemon;
}

const ListElement = ({ pokemon }: ListElementProps) => {
  const [types, setTypes] = useState<JSX.Element[]>([]);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const typeColorBkg = (typesObjs: PokemonType[]): void => {
    let key: number = -1;
    const typesJSX: JSX.Element[] = typesObjs.map((type: PokemonType) => {
      key++;
      return (
        <div className={"type " + type.type.name} key={key}>
          {type.type.name}
        </div>
      );
    });

    setTypes(typesJSX);
  };

  useEffect(() => {
    typeColorBkg(pokemon.types);
  }, []);

  return (
    <div className="list-element">
      {isImageLoaded === false ? (
        <div style={{ margin: "1rem auto" }}>
          <Loader />
        </div>
      ) : null}
      <div className="image">
        <img
          src={pokemon.sprites.front_default}
          onLoad={() => {
            setIsImageLoaded(true);
          }}
          alt={pokemon.name}
        />
      </div>
      <div className="default-data">
        <div className="name">{pokemon.name}</div>
        <div className="types">{types}</div>
      </div>
    </div>
  );
};

export default ListElement;
