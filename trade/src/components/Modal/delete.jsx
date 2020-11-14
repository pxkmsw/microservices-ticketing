import React, { Component } from "react";
import $ from "jquery";
class Delete extends Component {
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
        <button
          type="button"
          className={`btn btn-danger shadow rounded ${classes}`}
          data-toggle="modal"
          data-placement="top"
          title="حذف"
          data-target={item._id && "#r" + item._id}
        >
          <i className="fa fa-trash-alt" />
        </button>

        <div
          className="modal fade"
          ref={this.ref}
          id={"r" + item._id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title" id="exampleModalLongTitle">
                  تایید برای حذف دائمی
                </span>
              </div>
              <div className="modal-body h6">
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

export default Delete;
