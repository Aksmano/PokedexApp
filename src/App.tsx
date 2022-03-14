import React, { useEffect, useState } from "react";
import PokeList from "./components/PokeList/PokeList";
import Navbar from "./components/Navbar/Navbar";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import FiltersBar from "./components/FiltersBar/FiltersBar";
import useLocalStorage from "use-local-storage";
import { Pokemon } from "./Interfaces";
import "./App.css";
import { Routes, Route } from "react-router";

const API_URL: string = "https://pokeapi.co/api/v2/";

const App = () => {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const [filterMode, setFilterMode] = useState<string>("Show");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [onSubmitFilter, setOnSubmitFilter] = useState<boolean>(false);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const switchFilterMode = () => {
    const newFilterMode = filterMode === "Show" ? "Hide" : "Show";
    setFilterMode(newFilterMode);
  };

  const switchShowFilter = (showOrNot: boolean) => {
    setShowFilter(showOrNot);
  };

  const fetchData = async (url: string): Promise<any> => {
    try {
      const res: Response = await fetch(url);
      const data = await res.json();
      return data;
    } catch (err: any) {
      return err;
    }
  };

  // useEffect(() => {
  //   const loadFilteredPokemons = async () => {
  //     if (onSubmitFilter) {
  //       let fetched = 0;
  //       let offset = 0;
  //       if (nameFilter !== "") {
  //         const data: Pokemon = await fetchData(
  //           `${API_URL}pokemon/${nameFilter}`
  //         );
  //         setPokemons([data]);
  //         setOnSubmitFilter(false);
  //         console.log(pokemons);
  //       }
  //     }
  //   };
  //   loadFilteredPokemons();
  // }, [nameFilter, pokemons, onSubmitFilter]);

  return (
    <div className="App" data-theme={theme}>
      {showFilter === true ? (
        <FiltersBar
          switchFilterMode={switchFilterMode}
          filterMode={filterMode}
          setNameFilter={setNameFilter}
          setTypeFilter={setTypeFilter}
          setOnSubmitFilter={setOnSubmitFilter}
          nameFilter={nameFilter}
          typeFilter={typeFilter}
        />
      ) : null}

      <Navbar
        switchTheme={switchTheme}
        switchFilterMode={switchFilterMode}
        filterMode={filterMode}
      />
      <Routes>
        <Route
          path="/"
          element={
            <PokeList
              fetchData={fetchData}
              setPokemons={setPokemons}
              pokemonsAPI={pokemons}
              switchShowFilter={switchShowFilter}
              key={0}
            />
          }
        ></Route>
        <Route
          path="/pokemon:id"
          element={
            <PokemonDetails
              pokemons={pokemons}
              fetchData={fetchData}
              switchShowFilter={switchShowFilter}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
