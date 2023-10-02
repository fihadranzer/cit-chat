import React from "react";
import "../styles/search.css";

import { AiOutlineSearch } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
const Search = () => {
  return (
    <div className="search">
      <input type="text" placeholder="search" />
      <div className="search__icon">
        <AiOutlineSearch/>
      </div>
      <div className="menu__icon">
        <BiDotsVerticalRounded/>
      </div>
    </div>
  );
};

export default Search;
