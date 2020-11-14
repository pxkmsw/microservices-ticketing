import React, { Component } from "react";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class EmployeeProfiles extends Component {
  render() {
    const { ...rest } = this.props;
    return <ListPage {...rest} />;
  }
}

export default withStyles(rtlStyle)(EmployeeProfiles);
