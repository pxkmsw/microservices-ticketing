import React, { Component } from "react";
import ProItem from "./ProItem";
import PropTypes from "prop-types";

class Products extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.products.map(pro => {
          return (
            <ProItem
              key={pro.id}
              product={pro}
              onDelete={this.props.onDelete}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

export default Products;
