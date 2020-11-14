import React, { Component } from "react";

const Like = props => {
  let classes = "fa fa-bell";
  if (!props.movie.liked) classes += "-slash";
  return (
    <i
      className={classes}
      onClick={() => props.onClick(props.movie)}
      style={{ cursor: "pointer", verticalAlign: "bottom" }}
    />
  );
};

export default Like;
