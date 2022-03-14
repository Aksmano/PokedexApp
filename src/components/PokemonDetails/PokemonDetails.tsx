import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Pokemon } from "../../Interfaces";
import Loader from "../Loader/Loader";
import "./PokemonDetails.css";

interface PDProps {
  pokemons: Pokemon[];
  fetchData: Function;
  switchShowFilter: Function;
}

const API_URL: string = "https://pokeapi.co/api/v2/";

const PokemonDetails = ({ pokemons, fetchData, switchShowFilter }: PDProps) => {
  const { id } = useParams<string>();

  const [pokemon, setPokemon] = useState<Pokemon>(pokemons[parseInt(id!) - 1]);
  const [stats, setStats] = useState<JSX.Element[]>([]);
  const [types, setTypes] = useState<JSX.Element[]>([]);

  const loadPokemonFromAPI = async () => {
    const pokemonAPI: Pokemon = await fetchData(`${API_URL}pokemon/${id}`);
    setPokemon(pokemonAPI);
  };

  const createStats = async () => {
    let i: number = 0;
    const fetchedStats: JSX.Element[] = pokemon.stats.map((item) => {
      i++;
      return (
        <div
          className="details small"
          key={i}
        >{`${item.stat.name}: ${item.base_stat}`}</div>
      );
    });

    setStats(fetchedStats);
  };

  const createTypes = async () => {
    let i: number = 0;
    const fetchedTypes: JSX.Element[] = pokemon.types.map((item) => {
      i++;
      return (
        <div className={"type " + item.type.name} key={i}>
          {item.type.name}
        </div>
      );
    });

    setTypes(fetchedTypes);
  };

  useEffect(() => {
    switchShowFilter(false);
    if (pokemon === undefined) loadPokemonFromAPI();
    if (pokemon !== undefined && stats.length === 0) createStats();
    if (pokemon !== undefined && types.length === 0) createTypes();
  });

  return pokemon === undefined ? (
    <div className="loader">
      <Loader />
    </div>
  ) : (
    <div className="description-container">
      <div className="column">
        <div className="name desc">{pokemon.name}</div>
        <img
          src={pokemon.sprites.front_default}
          alt="pokemonImg"
          className="desc-image"
        />
      </div>
      <div className="column">
        <h1>Stats</h1>
        {stats}
      </div>
      <div className="column">
        <h1>Types</h1>
        <div className="types">{types}</div>
        <div className="details">height: {pokemon.height}</div>
        <div className="details">weight: {pokemon.weight}</div>
        <Link to="/">
          <button className="">Explore more Pokemons</button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetails;
