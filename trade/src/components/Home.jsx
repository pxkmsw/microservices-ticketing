import React, { Component } from "react";
import Products from "./layouts/Products";
import PropTypes from "prop-types";

class Home extends Component {
  static propTypes = {};

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-warning btn-lg m-2">
          <i className="fa fa-search" />
        </button>
        <button
          className="btn btn-primary btn-lg m-2"
          style={{ float: "right" }}
        >
          محصول جدید
        </button>
        <div className="clearfix" />
        <Products
          products={this.props.products}
          onDelete={this.props.onDelete}
        />
      </React.Fragment>
    );
  }
}

export default Home;
