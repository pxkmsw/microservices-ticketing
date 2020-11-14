import React, { Component } from "react";
import PropTypes from "prop-types";

export class ProItem extends Component {
  static propTypes = {};

  render() {
    const {
      id,
      name,
      price1,
      price2,
      properties,
      type,
      stock
    } = this.props.product;

    return (
      <div className="text-center mt-2">
        <ul className="list-group">
          <li className="list-group-item">
            <p className="text-right">
              <span>{name}</span>
              <span style={{ float: "left" }}>
                <button className="btn btn-secondary mr-2">ویرایش</button>
                <button
                  className="btn btn-danger mr-2"
                  onClick={this.props.onDelete.bind(this, id)}
                >
                  حذف
                </button>
                <span>کد محصول : {id}</span> |{" "}
                <span>قیمت 1 : {price1.toLocaleString()}</span> |{" "}
                <span>قیمت 2 : {price2.toLocaleString()}</span> |{" "}
                <span>
                  قیمت 3 : {this.props.product.price3().toLocaleString()}
                </span>
              </span>
            </p>
          </li>
        </ul>
      </div>
    );
  }
}

export default ProItem;
