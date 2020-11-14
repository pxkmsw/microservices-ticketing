import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "../form/form";
import { getColorItems } from "../../actions/colorActions";
import $ from "jquery";
class Delete extends Form {
  state = {
    data: {
      color: "",
      colorId: ""
    }
  };
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.props.getColorItems();
  }

  onDiversityItem = item => {
    let { colors } = this.props;
    const { color, colorId } = this.state.data;
    colors = colors ? colors.filter(c => c._id != item.colorId) : [];
    const diverseItem = { ...item };

    diverseItem.color = color ? color : colors[0].name;
    diverseItem.colorId = colorId ? colorId : colors[0]._id;

    delete diverseItem._id;
    delete diverseItem.__v;

    this.props.onDiversity(diverseItem);
    this.onClose();
  };

  onClose = () => {
    $(`#${this.ref.current.id}`).modal("hide");
  };

  render() {
    let { item, classes, colors, loading } = this.props;
    colors = colors ? colors.filter(c => c._id != item.colorId) : [];
    // if (!colors || loading) return 0;
    return (
      <React.Fragment>
        <button
          type="button"
          className={`btn btn-info shadow rounded ${classes}`}
          data-toggle="modal"
          data-target={item._id && "#a" + item._id}
          data-placement="top"
          title="ایجاد تنوع"
        >
          <i className="fa fa-clone" />
        </button>

        <div
          className="modal fade"
          ref={this.ref}
          id={"a" + item._id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title" id="exampleModalLongTitle">
                  ایجاد تنوع برای {item.name}
                </span>
              </div>
              <div className="modal-body h6">
                {colors && this.renderSelect("color", "رنگ", colors, "8")}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-info m-2"
                  onClick={() => this.onDiversityItem(item)}
                >
                  <i className="fa fa-plus" />
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

const mapStateToProduct = state => ({
  colors: state.color.colors,
  loading: state.color.loading
});

export default connect(
  mapStateToProduct,
  { getColorItems }
)(Delete);
