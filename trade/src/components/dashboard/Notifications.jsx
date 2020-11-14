import React, { Component } from "react";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "../../components/Snackbar/Snackbar.jsx";

export default class Notifications extends Component {
  state = {
    tl: false,
    tc: false,
    tr: false,
    bl: false,
    bc: false,
    br: false,
    msg: "",
    color: ""
  };

  showNotification = (msg, color = "info") => {
    var x = [];
    x["tl"] = true;
    x["msg"] = msg;
    x["color"] = color;
    this.setState(x);
    this.alertTimeout = setTimeout(() => {
      x["tl"] = false;
      this.setState(x);
    }, 6000);
  };

  renderNotification = () => {
    const { color, msg, tl } = this.state;
    return (
      <Snackbar
        place="tl"
        color={color}
        icon={AddAlert}
        message={msg}
        open={tl}
        closeNotification={() => this.setState({ tl: false })}
        close
      />
    );
  };
}
