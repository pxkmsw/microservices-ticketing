import React, { Component } from "react";
import $ from "jquery";
class DeleteIcon extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  onDeleteItem = item => {
    this.props.onDelete(item);
    this.onClose();
  };
  onClose = () => {
    $(`#${this.ref.current.id}`).modal("hide");
  };
  render() {
    const { item, classes } = this.props;
    return (
      <React.Fragment>
        <span
          className={`${classes}`}
          data-toggle="modal"
          data-placement="top"
          title="حذف"
          data-target={item._id && "#r" + item._id}
        >
          <i className="fa fa-trash-alt" />
        </span>

        <div
          className="modal fade"
          ref={this.ref}
          id={"r" + item._id}
          tabIndex="-10"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <span
                  className="modal-title"
                  id="exampleModalLongTitle1"
                  style={{ color: "black" }}
                >
                  تایید برای حذف دائمی
                </span>
              </div>
              <div
                className="modal-body h6"
                style={{ color: "black", textAlign: "right" }}
              >
                آیا از حذف {`"${item.name}"`} اطمینان دارید؟
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger m-2"
                  onClick={() => this.onDeleteItem(item)}
                >
                  <i className="fa fa-check" />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary m-2"
                  onClick={() => this.onClose()}
                >
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

export default DeleteIcon;
