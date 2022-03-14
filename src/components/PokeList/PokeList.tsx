import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NamedAPIResourceList, Pokemon } from "../../Interfaces";
import ListElement from "../ListElement/ListElement";
import Loader from "../Loader/Loader";
import "./PokeList.css";

interface ListProps {
  fetchData: Function;
  pokemonsAPI: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  switchShowFilter: Function;
}

const API_URL: string = "https://pokeapi.co/api/v2/";

const PokeList = ({
  fetchData,
  pokemonsAPI,
  setPokemons,
  switchShowFilter,
}: ListProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const [pokemonsJSX, setPokemonsJSX] = useState<JSX.Element[]>([]);

  const loadPokemonList = async () => {
    setLoading(true);

    const data: NamedAPIResourceList = await fetchData(
      `${API_URL}pokemon?limit=${limit}&offset=${offset}`
    );

    console.log(data);

    const pokemonElems: Pokemon[] = await Promise.all(
      data.results.map(async (pokemon): Promise<Pokemon> => {
        return await fetchData(pokemon.url);
      })
    );

    const allPokemonsAPI: Pokemon[] = [...pokemonsAPI, ...pokemonElems];
    console.log(pokemonElems);
    setPokemons(allPokemonsAPI);

    const pokemonsList: JSX.Element[] = pokemonElems.map((pokemon: Pokemon) => {
      return (
        <Link to={"/pokemon" + pokemon.id} key={pokemon.id}>
          <ListElement pokemon={pokemon} key={pokemon.id} />
        </Link>
      );
    });

    const pokemons: JSX.Element[] = [...pokemonsJSX, ...pokemonsList];
    const newOffset: number = offset + 20;

    setPokemonsJSX(pokemons);
    setOffset(newOffset);
    setLoading(false);
  };

  const loadFetchedPokemonList = () => {
    let newOffset: number = 0;
    const pokemonsList: JSX.Element[] = pokemonsAPI.map((pokemon: Pokemon) => {
      newOffset++;
      return (
        <Link to={"/pokemon" + pokemon.id} key={pokemon.id}>
          <ListElement pokemon={pokemon} key={pokemon.id} />
        </Link>
      );
    });
    setPokemonsJSX(pokemonsList);
    setOffset(newOffset);
  };

  /* Adding empty [] to use it like componentDidMount */
  useEffect(() => {
    // window.scrollTo(0, 0);
    switchShowFilter(true);
    if (pokemonsAPI.length === 0) loadPokemonList();
    else loadFetchedPokemonList();
  }, []);

  // useEffect(() => {
  //   setPokemonsJSX([
  //     <Link to={"/pokemon" + pokemonsAPI[0].id} key={pokemonsAPI[0].id}>
  //       <ListElement pokemon={pokemonsAPI[0]} key={pokemonsAPI[0].id} />
  //     </Link>,
  //   ]);
  // }, [pokemonsAPI]);

  return (
    <div className={`container`}>
      <div className="list-container">
        {pokemonsJSX}
        <div className="button-container">
          {!loading ? (
            <button
              className="load-more"
              onClick={async () => {
                await loadPokemonList();
              }}
            >
              Load more...
            </button>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default PokeList;
