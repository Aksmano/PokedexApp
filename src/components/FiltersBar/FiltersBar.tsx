import React from "react";
import Filters from "../Filters/Filters";
import "./FiltersBar.css";

interface FiltersBarProps {
  filterMode: string;
  nameFilter: string;
  typeFilter: string;
  switchFilterMode: Function;
  setNameFilter: React.Dispatch<React.SetStateAction<string>>;
  setTypeFilter: React.Dispatch<React.SetStateAction<string>>;
  setOnSubmitFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const FiltersBar = ({
  filterMode,
  nameFilter,
  typeFilter,
  switchFilterMode,
  setNameFilter,
  setTypeFilter,
  setOnSubmitFilter,
}: FiltersBarProps) => {
  return (
    <div className="filters-bar">
      <Filters
        filterMode={filterMode}
        setNameFilter={setNameFilter}
        setTypeFilter={setTypeFilter}
        setOnSubmitFilter={setOnSubmitFilter}
        nameFilter={nameFilter}
        typeFilter={typeFilter}
      />
      <button
        className="theme-button filter-button"
        onClick={() => {
          switchFilterMode();
        }}
      >
        {`${filterMode} filters`}
      </button>
    </div>
  );
};

export default FiltersBar;
