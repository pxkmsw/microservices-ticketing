import React, { Component } from "react";
import Form from "../form/form";

class Add extends Form {
  state = {
    data: {
      name: ""
    }
  };

  render() {
    const { title, onAdd, modal, classes = "" } = this.props;
    const { name } = this.state;
    return (
      <React.Fragment>
        <button
          type="button"
          className={`btn btn-info shadow rounded ${classes}`}
          data-toggle="modal"
          data-target="#addmodal"
        >
          <i className="fa fa-plus" />
        </button>

        <div
          className="modal fade"
          id="addmodal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="false"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title" id="exampleModalLongTitle">
                  افزودن آیتم
                </span>
              </div>
              <div className="modal-body h6">
                {this.renderInput("name", "نام آیتم", "8")}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-info m-2"
                  onClick={() => onAdd(name)}
                >
                  <i className="fa fa-arrow-down" />
                </button>
                <button type="button" className="btn btn-secondary m-2">
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Add;
