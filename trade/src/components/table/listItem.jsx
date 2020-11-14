import React, { Component } from "react";
import PropTypes from "prop-types";

const ListItem = props => {
  const {
    listName,
    selectedGenre,
    types,
    textProperty,
    valueProperty,
    onGenreChange
  } = props;
  return (
    <ul className="list-group m-2">
      <li
        className={
          selectedGenre == "all" ? "list-group-item active" : "list-group-item"
        }
        style={{ cursor: "pointer" }}
        onClick={() => onGenreChange("all", listName)}
      >
        All Genres
      </li>
      {types.map(genre => (
        <li
          key={genre[valueProperty]}
          className={
            selectedGenre == genre[textProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          onClick={() => onGenreChange(genre, listName)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListItem.defaultProps = {
  textProperty: "name",
  valueProperty: "id"
};

ListItem.propTypes = {};

export default ListItem;
