import React, { Component } from "react";
import { PersianNum } from "./common/persiandigit";
import FullList from "../table/fullList";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { Link, NavLink } from "react-router-dom";
import auth from "../../services/authService";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";
import Button from "../../components/CustomButtons/Button.jsx";

class ListPage extends Component {
  render() {
    const {
      title,
      classes,
      onNewForm,
      onRoute,
      properties,
      settings,
      ...rest
    } = this.props;
    const { addLink, links } = this.props.state;
    const user = auth.getCurrentUser();
    return (
      <React.Fragment>
        <CardHeader color="info">
          <h4 className={classes.cardTitleWhite}>
            {PersianNum(title) || PersianNum(properties.rtlName)}
          </h4>
          <p className={classes.cardCategoryWhite}>
            {links.map(link => {
              return (
                <NavLink
                  className="btn btn-info m-1"
                  to={link.link}
                  onClick={() => onRoute(link.link)}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </p>
          <p className={this.props.classes.cardCategoryWhite}>
            لیست جدیدترین {PersianNum(title) || PersianNum(properties.rtlName)}
          </p>
          <div />
        </CardHeader>
        <CardBody>
          <div className="row m-2 no-print">
            {((settings[0] && settings[0].addAction) || user.isAdmin) && (
              <Link
                to={addLink}
                className="btn btn-lg btn-info m-2 shadow-lg rounded"
              >
                <i className="fa fa-plus" />
              </Link>
            )}
          </div>
          <FullList {...rest} />
        </CardBody>
      </React.Fragment>
    );
  }
}

export default withStyles(rtlStyle)(ListPage);
