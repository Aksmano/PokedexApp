import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

interface NavbarProps {
  switchTheme: Function;
  switchFilterMode: Function;
  filterMode: string;
}

const Navbar = ({ switchTheme, switchFilterMode, filterMode }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="title">
        <Link to={"/"} key={0} className="link-title">
          <img src={require("../../img/pokeball.png")} alt="pokeball" />
          <div className="div-title">Pokedex</div>
        </Link>
      </div>

      <button
        className="theme-button"
        onClick={() => {
          switchTheme();
        }}
      >
        Switch theme
      </button>
    </nav>
  );
};

export default Navbar;
