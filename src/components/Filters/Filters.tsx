import React from "react";
import "./Filters.css";

interface FiltersProps {
  filterMode: string;
  nameFilter: string;
  typeFilter: string;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
  setOnSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters = ({
  filterMode,
  nameFilter,
  typeFilter,
  setNameFilter,
  setTypeFilter,
  setOnSubmitFilter,
}: FiltersProps) => {
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNameFilter(e.target.value);
  };

  const handleChangeType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setTypeFilter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOnSubmitFilter(true);
  };

  const handleReset = () => {
    setNameFilter("");
    setTypeFilter("");
    setOnSubmitFilter(true);
  };

  return (
    <div className={`nav-filters ${filterMode.toLocaleLowerCase()}`}>
      <div className="filters">
        <form onSubmit={handleSubmit}>
          <label htmlFor="id">Name or ID</label>
          <input
            type="text"
            value={nameFilter}
            name="id"
            className="input"
            onChange={handleChangeName}
          />
          <label htmlFor="type">Type</label>
          <select
            name="type"
            value={typeFilter}
            id="type"
            className="input"
            onChange={handleChangeType}
          >
            <option value="" defaultChecked>
              All
            </option>
            <option value="normal">Normal</option>
            <option value="fighting">Fighting</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="ground">Ground</option>
            <option value="rock">Rock</option>
            <option value="bug">Bug</option>
            <option value="ghost">Ghost</option>
            <option value="steel">Steel</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="grass">Grass</option>
            <option value="electric">Electric</option>
            <option value="psychic">Psychic</option>
            <option value="ice">Ice</option>
            <option value="dragon">Dragon</option>
            <option value="dark">Dark</option>
            <option value="fairy">Fairy</option>
            <option value="unknown">Unknown</option>
            <option value="shadow">Shadow</option>
          </select>
          <button onClick={handleReset} style={{ margin: "0 2rem 0 0" }}>
            Reset
          </button>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

// interface FiltersProps {}

// interface FiltersState {
//   visible: boolean;
//   nameOrId: string;
// }

// class Filters extends Component<FiltersProps, FiltersState> {
//   state: Readonly<FiltersState> = {
//     visible: true,
//     nameOrId: "",
//   };

//   render(): React.ReactNode {
//   }
// }

export default Filters;
