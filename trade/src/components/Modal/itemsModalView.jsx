import React, { Component } from "react";
import Delete from "./delete";
import uuid from "uuid";
import Form from "../form/form";

class ItemsModalView extends Form {
  state = {
    data: { name: "" },
    selectedItem: {},
    edit: false
  };

  addItem = () => {
    const { name } = this.state.data;
    this.state.edit
      ? this.props.onEdit({ _id: this.state.selectedItem._id, name })
      : this.props.onAdd(name);
    this.setState({ data: { name: "" }, edit: false });
  };

  editItem = item => {
    this.setState({ data: { name: item.name }, edit: true });
  };

  render() {
    const { id, title, items, onDelete, onEdit, classes = "" } = this.props;
    const { selectedItem } = this.state;
    const modalId = uuid.v4();
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id={id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title" id="exampleModalLongTitle">
                  {title}
                </span>
              </div>
              <div className="modal-body">
                <div
                  className="btn-group btn-group-toggle"
                  data-toggle="buttons"
                  style={{ direction: "ltr", display: "inline-block" }}
                >
                  {items &&
                    items.map(item => (
                      <label
                        key={`label${item._id}`}
                        className="btn btn-outline-info m-1"
                        onClick={() => this.setState({ selectedItem: item })}
                      >
                        <input
                          type="radio"
                          name="options"
                          id={item._id}
                          autoComplete="off"
                        />
                        {item.name}
                      </label>
                    ))}
                </div>
                {this.renderInput("name", "نام آیتم", "4")}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-info shadow rounded m-2"
                  onClick={() => this.addItem()}
                >
                  <i className="fa fa-plus" />
                </button>
                <button
                  type="button"
                  className="btn btn-dark m-2"
                  onClick={() => this.editItem(selectedItem)}
                >
                  <i className="fa fa-wrench" />
                </button>

                <Delete onDelete={onDelete} item={selectedItem} classes="m-2" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ItemsModalView;
