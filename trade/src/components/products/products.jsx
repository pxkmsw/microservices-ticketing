import React, { Component } from "react";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  getProductItems,
  addDiversityProductItem,
  deleteProductItem
} from "../../actions/productActions";
import { getSettingItems } from "../../actions/settingActions";
import Notifications from "../dashboard/Notifications";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Products extends Notifications {
  componentDidMount() {
    this.props.getProductItems();
    this.props.getSettingItems();
  }

  handleProductDetail = item => this.props.history.push(`/Product/${item._id}`);

  handleDeleteTableItem = item => {
    this.props.deleteProductItem(item._id);
    this.showNotification(`${item.name} با موفقیت حذف شد.`, "danger");
  };

  handleEditTableItem = item =>
    this.props.history.push(`/EditProduct/${item._id}`);

  handleTradeTableItem = item =>
    this.props.history.push(`/TradeProduct/${item._id}`);

  handleDiversityTableItem = item => {
    this.props.addDiversityProductItem(item);
    setTimeout(() => {
      this.props.getProductItems();
      this.showNotification(`تنوع برای ${item.name} با موفقیت شد.`, "info");
    }, 2000);
  };

  // handleLikeItem = item => {
  //   const items = [...this.state.items];
  //   const index = items.indexOf(item);
  //   items[index].liked = !items[index].liked;
  //   this.setState({
  //     items
  //   });
  // };

  // handleTypesFilter = type => {
  //   this.setState({
  //     items:
  //       type.name && type.id
  //         ? getCustomerItems().filter(item => item.type == type.name)
  //         : getCustomerItems(),
  //     selectedGenre: type == "all" ? "all" : type.name,
  //     currentPage: 1
  //   });
  // };

  render() {
    const {
      products,
      loadingProducts,
      settings,
      loadingSetting,
      ...rest
    } = this.props;
    if (loadingProducts || !products)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#20B2AA"} />
        </div>
      );

    return (
      <React.Fragment>
        {this.renderNotification()}
        <ListPage
          items={products}
          onTrade={this.handleTradeTableItem}
          onDiversity={this.handleDiversityTableItem}
          onDetail={this.handleProductDetail}
          onEdit={this.handleEditTableItem}
          onDelete={this.handleDeleteTableItem}
          settings={settings}
          {...rest}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.products,
  loadingProducts: state.product.loading,
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  {
    getProductItems,
    deleteProductItem,
    getSettingItems,
    addDiversityProductItem
  }
)(withStyles(rtlStyle)(Products));
