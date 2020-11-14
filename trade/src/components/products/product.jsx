import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import auth from "../../services/authService";
import { connect } from "react-redux";
import {
  getProductItem,
  deleteProductItem
} from "../../actions/productActions";
import { getSettingItems } from "../../actions/settingActions";
import { PersianNum } from "../table/common/persiandigit";
import Delete from "../Modal/delete";
import ListGroupItem from "../listGroup/listGroupItem";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class Product extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getProductItem(id);
    this.props.getSettingItems();
  }

  onDelete = item => {
    this.props.deleteProductItem(item._id);
    this.props.history.push("/Products");
    NotificationManager.success(`${item.name} با موفقیت حذف شد.`);
  };

  onEdit = item => {
    this.props.history.push(`/EditProduct/${item._id}`);
  };

  onProcess = item => {
    this.props.history.push(`/Process/${item._id}`);
  };

  handleBack = () => {
    this.props.onRoute("/Products");
    this.props.history.push("/Products");
  };

  render() {
    const user = auth.getCurrentUser();
    let imgpath = "../";
    const { product, loading, settings, loadingSetting } = this.props;
    if (loading || !product || loadingSetting || !settings)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#FFC300"} />
        </div>
      );

    if (product.img && product.img.includes("http")) imgpath = "";
    return (
      <React.Fragment>
        <CardHeader color="warning">
          <h4 className={this.props.classes.cardTitleWhite}>جزئیات محصول</h4>
          <p className={this.props.classes.cardCategoryWhite}>
            جزئیات {product.name}
          </p>
        </CardHeader>
        <CardBody>
          <React.Fragment>
            <div className="row m-2">
              <button
                className="btn btn-lg btn-info m-2 shadow rounded"
                onClick={this.handleBack}
              >
                <i className="fa fa-arrow-right" />
              </button>
              {((settings && settings[0] && settings[0].processAccess) ||
                user.isAdmin) && (
                <button
                  className="btn btn-lg btn-success m-2 shadow rounded"
                  style={{
                    backgroundColor: "#9c27b0",
                    borderColor: "#9c27b0"
                  }}
                  onClick={() => this.onProcess(product)}
                >
                  <i className="fa fa-sync" />
                </button>
              )}
              {((settings && settings[0] && settings[0].editAction) ||
                user.isAdmin) && (
                <button
                  className="btn btn-lg btn-dark m-2 shadow rounded"
                  onClick={() => this.onEdit(product)}
                >
                  <i className="fa fa-wrench" />
                </button>
              )}
              {((settings && settings[0] && settings[0].deleteAction) ||
                user.isAdmin) && (
                <Delete
                  onDelete={this.onDelete}
                  item={product}
                  classes="btn-lg m-2"
                />
              )}
            </div>
            <div className="row">
              <div className="m-2 col-6">
                {product.img && (
                  <div class="thumbnail">
                    <img src={product.img && `${imgpath}${product.img}`} />
                  </div>
                )}

                <br />
                {product.imgs &&
                  product.imgs[0] &&
                  product.imgs.map(img => (
                    <img
                      style={{
                        maxHeight: "100px",
                        maxWidth: "100px",
                        borderRadius: "5px"
                      }}
                      className="shadow rounded m-2"
                      src={img && `../${img}`}
                    />
                  ))}
              </div>
              <div className="list-group m-2 mt-4 col-5">
                <div className="row shadow rounded">
                  <ListGroupItem
                    label="عنوان"
                    value={product.name}
                    size="12"
                    float=""
                  />
                  <ListGroupItem
                    label="دسته بندی"
                    value={product.category}
                    size="12"
                    float=""
                  />
                  <ListGroupItem label="برند" value={product.brand} float="" />
                  <ListGroupItem label="رنگ" value={product.color} float="" />
                  <ListGroupItem label="گروه فنی" value={product.proCode} />
                  <ListGroupItem
                    label="کد"
                    value={product.diverseCode && parseInt(product.diverseCode)}
                  />
                  <ListGroupItem
                    label="کد تامین کننده"
                    value={product.taminMallCode}
                  />
                  <ListGroupItem
                    label="آیتم نامبر"
                    value={product.itemNumber}
                  />

                  <ListGroupItem
                    label="قیمت لیست"
                    value={
                      product.tradeListPrice && parseInt(product.tradeListPrice)
                    }
                  />
                  <ListGroupItem
                    label="قیمت خرید"
                    value={
                      product.tradeBuyingPrice &&
                      parseInt(product.tradeBuyingPrice)
                    }
                  />
                  <ListGroupItem
                    label="قیمت عمده فروشی"
                    value={product.wholePrice && parseInt(product.wholePrice)}
                  />
                  <ListGroupItem
                    label="قیمت خرده فروشی"
                    value={product.retailPrice && parseInt(product.retailPrice)}
                  />
                  <ListGroupItem
                    label="قیمت مارکت پلیس"
                    value={
                      product.marketPlacePrice &&
                      parseInt(product.marketPlacePrice)
                    }
                  />
                  <ListGroupItem
                    label="تعداد در جعبه"
                    value={product.boxQuantity && parseInt(product.boxQuantity)}
                  />
                  <ListGroupItem
                    label="موجودی انبار خرده فروشی"
                    value={
                      product.retailStoreStock &&
                      parseInt(product.retailStoreStock)
                    }
                  />
                  <ListGroupItem
                    label="موجودی انبار عمده فروشی"
                    value={
                      product.wholeStoreStock &&
                      parseInt(product.wholeStoreStock)
                    }
                  />
                  <ListGroupItem
                    label="موجودی انبار مارکت پلیس"
                    value={
                      product.wholeStoreStock &&
                      parseInt(product.wholeStoreStock)
                    }
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.product,
  loading: state.product.loading,
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getProductItem, deleteProductItem, getSettingItems }
)(withStyles(rtlStyle)(Product));
