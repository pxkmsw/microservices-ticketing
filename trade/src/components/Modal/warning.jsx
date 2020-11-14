import React, { Component } from "react";
import $ from "jquery";
class Warning extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  onWarning = item => {
    this.props.onWarn(item);
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
          className={`btn btn-warning shadow rounded ${classes}`}
          data-toggle="modal"
          data-placement="top"
          title="هشدار"
          data-target={item._id && "#r" + item._id}
        >
          {item.title}
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
                  تایید نهایی برای انجام عملیات
                </span>
              </div>
              <div className="modal-body h6">
                آیا از {`"${item.title}"`} اطمینان دارید؟
              </div>
              {item.descr && <p className="m-2">{item.descr}</p>}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning m-2"
                  onClick={() => this.onWarning(item)}
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

export default Warning;
