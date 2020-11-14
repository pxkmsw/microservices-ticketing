import React, { Component } from "react";
import { connect } from "react-redux";
import auth from "../../services/authService";
import Input from "../form/input";
import { getProductItem } from "../../actions/productActions";
import { getSettingItems } from "../../actions/settingActions";
import { getDigiKalaShipping } from "../../handlers/digikala";
import {
  getProfitByPercent,
  getProfitByPrice,
  getPercentByProfit,
  getPercentByPrice,
  getPriceByPercent,
  getPriceByProfit,
  getPercent,
  getDiffPrice
} from "../../handlers/profit";
import { PersianNum, EngNum } from "../table/common/persiandigit";
import ListGroupItem from "../listGroup/listGroupItem";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Process extends Component {
  // state = {
  //   data: {
  //     wholePrice: "",
  //     wholeProfitPercent: "",
  //     wholeProfitDiffPrice: "",
  //     wholePriceWithoutValueAdded: "",
  //     wholeProfitPercentWithoutValueAdded: "",
  //     wholeProfitDiffPriceWithoutValueAdded: "",
  //     retailPrice: "",
  //     retailProfitPercent: "",
  //     retailProfitDiffPrice: "",
  //     retailPriceWithoutValueAdded: "",
  //     retailProfitPercentWithoutValueAdded: "",
  //     retailProfitDiffPriceWithoutValueAdded: "",
  //     marketPlacePrice: "",
  //     marketPlaceProfitPercent: "",
  //     marketPlaceProfitDiffPrice: "",
  //     marketPlacePriceWithoutValueAdded: "",
  //     marketPlaceProfitPercentWithoutValueAdded: "",
  //     marketPlaceProfitDiffPriceWithoutValueAdded: ""
  //   }
  // };
  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.props.getProductItem(id);
    this.props.getSettingItems();
  };

  // handleMarketPlaceProfitChange = e => {
  //   const data = { ...this.state.data };
  //   const clearValue = e.target.value.replace(/,/g, "");
  //   const value = EngNum(clearValue);
  //   data[e.target.name] = parseInt(value);
  //   if (value && e.target.name.includes("Percent")) {
  //     data.marketPlacePrice =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) +
  //           this.getMarketPlaceCosts() +
  //           this.getCostAndTax()) /
  //           (1 -
  //             parseInt(value) / 100 -
  //             this.getMarketPlaceCommission() -
  //             this.getAddedValue()) /
  //           10
  //       ) * 10;
  //     data.marketPlaceProfitDiffPrice =
  //       Math.round(getProfitByPercent(data.marketPlacePrice, value) / 10) * 10;
  //   } else if (value && e.target.name.includes("Profit")) {
  //     data.marketPlacePrice =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) +
  //           parseInt(value) +
  //           this.getMarketPlaceCosts() +
  //           this.getCostAndTax()) /
  //           (1 - this.getMarketPlaceCommission() - this.getAddedValue()) /
  //           10
  //       ) * 10;

  //     data.marketPlaceProfitPercent = getPercentByProfit(
  //       data.marketPlacePrice,
  //       value
  //     );
  //   } else if (value && e.target.name.includes("Price")) {
  //     data.marketPlaceProfitDiffPrice =
  //       Math.round(
  //         (parseInt(value) *
  //           (1 - this.getMarketPlaceCommission() - this.getAddedValue()) -
  //           parseInt(this.props.product.tradeBuyingPrice) -
  //           this.getMarketPlaceCosts() -
  //           this.getCostAndTax()) /
  //           10
  //       ) * 10;

  //     data.marketPlaceProfitPercent =
  //       Math.round(
  //         (data.marketPlaceProfitDiffPrice * 10000) / parseInt(value)
  //       ) / 100;
  //   } else {
  //     data.marketPlaceProfitPercent = "";
  //     data.marketPlaceProfitDiffPrice = "";
  //     data.marketPlacePrice = "";
  //   }
  //   this.setState({ data });
  // };

  // handleMarketPlaceProfitChangeWithoutValueAdded = e => {
  //   const data = { ...this.state.data };
  //   const clearValue = e.target.value.replace(/,/g, "");
  //   const value = EngNum(clearValue);
  //   data[e.target.name] = parseInt(value);
  //   if (value && e.target.name.includes("Percent")) {
  //     data.marketPlacePriceWithoutValueAdded =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) +
  //           this.getMarketPlaceCosts() +
  //           this.getCostAndTax() +
  //           this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
  //           (1 -
  //             parseInt(value) / 100 -
  //             this.getMarketPlaceCommission() -
  //             this.getMarketPlaceCommission() *
  //               this.getMarketPlaceAddedValue()) /
  //           10
  //       ) * 10;
  //     data.marketPlaceProfitDiffPriceWithoutValueAdded =
  //       Math.round(
  //         getProfitByPercent(data.marketPlacePriceWithoutValueAdded, value) / 10
  //       ) * 10;
  //   } else if (value && e.target.name.includes("Profit")) {
  //     data.marketPlacePriceWithoutValueAdded =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) +
  //           parseInt(value) +
  //           this.getMarketPlaceCosts() +
  //           this.getCostAndTax() +
  //           this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
  //           (1 -
  //             this.getMarketPlaceCommission() -
  //             this.getMarketPlaceCommission() *
  //               this.getMarketPlaceAddedValue()) /
  //           10
  //       ) * 10;

  //     data.marketPlaceProfitPercentWithoutValueAdded = getPercentByProfit(
  //       data.marketPlacePriceWithoutValueAdded,
  //       value
  //     );
  //   } else if (value && e.target.name.includes("Price")) {
  //     data.marketPlaceProfitDiffPriceWithoutValueAdded =
  //       Math.round(
  //         (parseInt(value) *
  //           (1 -
  //             this.getMarketPlaceCommission() -
  //             this.getMarketPlaceCommission() *
  //               this.getMarketPlaceAddedValue()) -
  //           parseInt(this.props.product.tradeBuyingPrice) -
  //           this.getMarketPlaceCosts() -
  //           this.getCostAndTax() -
  //           this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
  //           10
  //       ) * 10;

  //     data.marketPlaceProfitPercentWithoutValueAdded =
  //       Math.round(
  //         (data.marketPlaceProfitDiffPriceWithoutValueAdded * 10000) /
  //           parseInt(value)
  //       ) / 100;
  //   } else {
  //     data.marketPlaceProfitPercentWithoutValueAdded = "";
  //     data.marketPlaceProfitDiffPriceWithoutValueAdded = "";
  //     data.marketPlacePriceWithoutValueAdded = "";
  //   }
  //   this.setState({ data });
  // };

  // handleProfitChangeWholePrice = e => {
  //   const data = { ...this.state.data };
  //   const clearValue = e.target.value.replace(/,/g, "");
  //   const value = EngNum(clearValue);
  //   data[e.target.name] = parseInt(value);
  //   if (value && e.target.name.includes("Percent")) {
  //     data.wholePrice =
  //       Math.round(
  //         parseInt(this.props.product.tradeBuyingPrice) /
  //           (1 -
  //             parseInt(value) / 100 -
  //             this.getAddedValue() -
  //             this.getWholeShipping()) /
  //           10
  //       ) * 10;
  //     data.wholeProfitDiffPrice =
  //       Math.round(getProfitByPercent(data.wholePrice, value) / 10) * 10;
  //   } else if (value && e.target.name.includes("Profit")) {
  //     data.wholePrice =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) + parseInt(value)) /
  //           (1 - this.getAddedValue() - this.getWholeShipping()) /
  //           10
  //       ) * 10;

  //     data.wholeProfitPercent = getPercentByProfit(data.wholePrice, value);
  //   } else if (value && e.target.name.includes("Price")) {
  //     data.wholeProfitDiffPrice =
  //       Math.round(
  //         (parseInt(value) *
  //           (1 - this.getAddedValue() - this.getWholeShipping()) -
  //           parseInt(this.props.product.tradeBuyingPrice)) /
  //           10
  //       ) * 10;

  //     data.wholeProfitPercent =
  //       Math.round((data.wholeProfitDiffPrice * 10000) / parseInt(value)) / 100;
  //   } else {
  //     data.wholeProfitPercent = "";
  //     data.wholeProfitDiffPrice = "";
  //     data.wholePrice = "";
  //   }
  //   this.setState({ data });
  // };

  // handleProfitChangeWholePriceWithoutValueAdded = e => {
  //   const data = { ...this.state.data };
  //   const clearValue = e.target.value.replace(/,/g, "");
  //   const value = EngNum(clearValue);
  //   data[e.target.name] = parseInt(value);
  //   if (value && e.target.name.includes("Percent")) {
  //     data.wholePriceWithoutValueAdded =
  //       Math.round(
  //         parseInt(this.props.product.tradeBuyingPrice) /
  //           (1 - parseInt(value) / 100 - this.getWholeShipping()) /
  //           10
  //       ) * 10;
  //     data.wholeProfitDiffPriceWithoutValueAdded =
  //       Math.round(
  //         getProfitByPercent(data.wholePriceWithoutValueAdded, value) / 10
  //       ) * 10;
  //   } else if (value && e.target.name.includes("Profit")) {
  //     data.wholePriceWithoutValueAdded =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) + parseInt(value)) /
  //           (1 - this.getWholeShipping()) /
  //           10
  //       ) * 10;

  //     data.wholeProfitPercentWithoutValueAdded = getPercentByProfit(
  //       data.wholePriceWithoutValueAdded,
  //       value
  //     );
  //   } else if (value && e.target.name.includes("Price")) {
  //     data.wholeProfitDiffPriceWithoutValueAdded =
  //       Math.round(
  //         (parseInt(value) * (1 - this.getWholeShipping()) -
  //           parseInt(this.props.product.tradeBuyingPrice)) /
  //           10
  //       ) * 10;

  //     data.wholeProfitPercentWithoutValueAdded =
  //       Math.round(
  //         (data.wholeProfitDiffPriceWithoutValueAdded * 10000) / parseInt(value)
  //       ) / 100;
  //   } else {
  //     data.wholeProfitPercentWithoutValueAdded = "";
  //     data.wholeProfitDiffPriceWithoutValueAdded = "";
  //     data.wholePriceWithoutValueAdded = "";
  //   }
  //   this.setState({ data });
  // };

  // handleProfitChangeRetailPrice = e => {
  //   const data = { ...this.state.data };
  //   const clearValue = e.target.value.replace(/,/g, "");
  //   const value = EngNum(clearValue);
  //   data[e.target.name] = parseInt(value);
  //   if (value && e.target.name.includes("Percent")) {
  //     data.retailPrice =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) + this.getShipping()) /
  //           (1 - parseInt(value) / 100 - this.getAddedValue()) /
  //           10
  //       ) * 10;
  //     data.retailProfitDiffPrice =
  //       Math.round(getProfitByPercent(data.retailPrice, value) / 10) * 10;
  //   } else if (value && e.target.name.includes("Profit")) {
  //     data.retailPrice =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) +
  //           parseInt(value) +
  //           this.getShipping()) /
  //           (1 - this.getAddedValue()) /
  //           10
  //       ) * 10;

  //     data.retailProfitPercent = getPercentByProfit(data.retailPrice, value);
  //   } else if (value && e.target.name.includes("Price")) {
  //     data.retailProfitDiffPrice =
  //       Math.round(
  //         (parseInt(value) * (1 - this.getAddedValue()) -
  //           parseInt(this.props.product.tradeBuyingPrice) -
  //           this.getShipping()) /
  //           10
  //       ) * 10;

  //     data.retailProfitPercent =
  //       Math.round((data.retailProfitDiffPrice * 10000) / parseInt(value)) /
  //       100;
  //   } else {
  //     data.retailProfitPercent = "";
  //     data.retailProfitDiffPrice = "";
  //     data.retailPrice = "";
  //   }
  //   this.setState({ data });
  // };

  // handleProfitChangeRetailPriceWithoutValueAdded = e => {
  //   const data = { ...this.state.data };
  //   const clearValue = e.target.value.replace(/,/g, "");
  //   const value = EngNum(clearValue);
  //   data[e.target.name] = parseInt(value);
  //   if (value && e.target.name.includes("Percent")) {
  //     data.retailPriceWithoutValueAdded =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) + this.getShipping()) /
  //           (1 - parseInt(value) / 100) /
  //           10
  //       ) * 10;
  //     data.retailProfitDiffPriceWithoutValueAdded =
  //       Math.round(
  //         getProfitByPercent(data.retailPriceWithoutValueAdded, value) / 10
  //       ) * 10;
  //   } else if (value && e.target.name.includes("Profit")) {
  //     data.retailPriceWithoutValueAdded =
  //       Math.round(
  //         (parseInt(this.props.product.tradeBuyingPrice) +
  //           parseInt(value) +
  //           this.getShipping()) /
  //           1 /
  //           10
  //       ) * 10;

  //     data.retailProfitPercentWithoutValueAdded = getPercentByProfit(
  //       data.retailPriceWithoutValueAdded,
  //       value
  //     );
  //   } else if (value && e.target.name.includes("Price")) {
  //     data.retailProfitDiffPriceWithoutValueAdded =
  //       Math.round(
  //         (parseInt(value) * 1 -
  //           parseInt(this.props.product.tradeBuyingPrice) -
  //           this.getShipping()) /
  //           10
  //       ) * 10;

  //     data.retailProfitPercentWithoutValueAdded =
  //       Math.round(
  //         (data.retailProfitDiffPriceWithoutValueAdded * 10000) /
  //           parseInt(value)
  //       ) / 100;
  //   } else {
  //     data.retailProfitPercentWithoutValueAdded = "";
  //     data.retailProfitDiffPriceWithoutValueAdded = "";
  //     data.retailPriceWithoutValueAdded = "";
  //   }
  //   this.setState({ data });
  // };

  onEdit = item => {
    this.props.history.push(`/EditProduct/${item._id}`);
  };

  handleBack = () => {
    const { id } = this.props.match.params;
    this.props.onRoute(`/Product/${id}`);
    this.props.history.push(`/Product/${id}`);
  };

  getCostAndTax = () => {
    if (!this.props.settings) return 0;
    return parseInt(this.props.settings[0].shippingCosts);
  };

  getAddedValue = () => 0.09;

  getMarketPlaceAddedValue = () => 0.09;

  getMarketPlaceCommission = () => 0.1;
  getWholeShipping = () => 0.01;
  getMarketPlaceCosts = () => {
    const { length, width, height, weight } = this.props.product;
    return getDigiKalaShipping(length, width, height, weight);
  };

  getShipping = () => {
    const { length, width, height, weight } = this.props.product;
    return getDigiKalaShipping(length, width, height, weight);
  };

  render() {
    const { product, loadingProduct, settings } = this.props;
    const user = auth.getCurrentUser();

    if (!product || loadingProduct || !settings)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#9932CC"} />
        </div>
      );

    const buyingDiscoutPercent = getPercent(
      product.tradeBuyingPrice,
      product.tradeListPrice
    );
    const buyingDiscoutDiffPrice = getDiffPrice(
      product.tradeBuyingPrice,
      product.tradeListPrice
    );

    const wholeProfitDiffPrice =
      Math.round(
        (parseInt(product.wholePrice) * (1 - this.getAddedValue()) -
          parseInt(product.tradeBuyingPrice) -
          this.getShipping() * 2) /
          10
      ) * 10;

    const wholeProfitPercent =
      Math.round(
        (wholeProfitDiffPrice * 10000) / parseInt(product.wholePrice)
      ) /
        100 +
      " %";

    const retailProfitDiffPrice =
      Math.round(
        (parseInt(product.retailPrice) * (1 - this.getAddedValue()) -
          parseInt(product.tradeBuyingPrice) -
          this.getShipping() * 2) /
          10
      ) * 10;

    const retailProfitPercent =
      Math.round(
        (retailProfitDiffPrice * 10000) / parseInt(product.retailPrice)
      ) /
        100 +
      " %";

    const marketPlaceProfitDiffPrice =
      Math.round(
        (parseInt(product.marketPlacePrice) *
          (1 - this.getMarketPlaceCommission() - this.getAddedValue()) -
          parseInt(product.tradeBuyingPrice) -
          this.getMarketPlaceCosts()) /
          10
      ) * 10;

    const marketPlaceProfitPercent =
      Math.round(
        (marketPlaceProfitDiffPrice * 10000) /
          parseInt(product.marketPlacePrice)
      ) /
        100 +
      " %";

    const shippingPrice = getDigiKalaShipping(
      product.length,
      product.width,
      product.height,
      product.weight
    );

    return (
      <React.Fragment>
        <CardHeader color="primary">
          <h4 className={this.props.classes.cardTitleWhite}>پردازش محصول</h4>
          <p className={this.props.classes.cardCategoryWhite}>
            پردازش {product.name}
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
              <button
                className="btn btn-lg btn-dark m-2 shadow rounded"
                onClick={() => this.onEdit(product)}
              >
                <i className="fa fa-wrench" />
              </button>
            </div>
            <div className="row">
              <div className="list-group p-4 text-center col-12">
                <div className="row shadow rounded p-3">
                  <ListGroupItem
                    label="عنوان"
                    value={product.name}
                    float=""
                    size="6"
                  />
                  <ListGroupItem
                    label="دسته بندی"
                    value={product.category}
                    float=""
                    size="6"
                  />
                </div>
                <div className="row shadow rounded mt-3">
                  <div className="shadow rounded col-3 pt-3 pb-3">
                    <ListGroupItem
                      label="گروه فنی"
                      value={product.proCode}
                      size="12"
                    />
                    <ListGroupItem
                      label="کد"
                      value={product.diverseCode}
                      size="12"
                    />
                    <ListGroupItem
                      label="کد تنوع مارکت پلیس"
                      value={product.marketCode}
                      size="12"
                    />
                    <ListGroupItem
                      label="کد تامین کننده"
                      value={product.taminMallCode}
                      size="12"
                    />
                    <ListGroupItem
                      label="کد آیتم نامبر"
                      value={product.itemNumber}
                      size="12"
                    />
                  </div>
                  <div className="shadow rounded col-3 pt-3 pb-3">
                    <ListGroupItem
                      label="قیمت لیست"
                      value={parseInt(product.tradeListPrice)}
                      size="12"
                    />
                    <ListGroupItem
                      label="قیمت خرید"
                      value={parseInt(product.tradeBuyingPrice)}
                      size="12"
                    />
                    <ListGroupItem
                      label="قیمت عمده فروشی"
                      value={parseInt(product.wholePrice)}
                      size="12"
                    />
                    <ListGroupItem
                      label="قیمت خرده فروشی"
                      value={parseInt(product.retailPrice)}
                      size="12"
                    />
                    <ListGroupItem
                      label="قیمت مارکت پلیس"
                      value={parseInt(product.marketPlacePrice)}
                      size="12"
                    />
                  </div>
                  <div className="shadow rounded col-3 pt-3 pb-3">
                    <ListGroupItem
                      label="درصد تخفیف مرجع"
                      value={buyingDiscoutPercent}
                      size="12"
                    />
                    <ListGroupItem
                      label="درصد تخفیف بازرگان"
                      value={buyingDiscoutPercent}
                      size="12"
                    />
                    <ListGroupItem
                      label="درصد سود عمده فروشی"
                      value={wholeProfitPercent}
                      size="12"
                    />
                    <ListGroupItem
                      label="درصد سود خرده فروشی"
                      value={retailProfitPercent}
                      size="12"
                    />
                    <ListGroupItem
                      label="درصد سود مارکت پلیس"
                      value={marketPlaceProfitPercent}
                      size="12"
                    />
                  </div>
                  <div className="shadow rounded col-3 pt-3 pb-3">
                    <ListGroupItem
                      label="مبلغ تخفیف مرجع"
                      value={buyingDiscoutDiffPrice}
                      size="12"
                    />
                    <ListGroupItem
                      label="مبلغ تخفیف بازرگان"
                      value={buyingDiscoutDiffPrice}
                      size="12"
                    />
                    <ListGroupItem
                      label="مبلغ سود عمده فروشی"
                      value={wholeProfitDiffPrice}
                      size="12"
                    />
                    <ListGroupItem
                      label="مبلغ سود خرده فروشی"
                      value={retailProfitDiffPrice}
                      size="12"
                    />
                    <ListGroupItem
                      label="مبلغ سود مارکت پلیس"
                      value={marketPlaceProfitDiffPrice}
                      size="12"
                    />
                  </div>

                  <div className="shadow rounded col-4 pt-3 pb-3">
                    <ListGroupItem
                      label="هزینه بسته بندی و ارسال به مارکت پلیس"
                      value={
                        settings[0] &&
                        parseInt(settings[0].shippingCosts).toLocaleString()
                      }
                      size="12"
                    />
                    <ListGroupItem
                      label="هزینه پردازش و حمل و نقل مارکت پلیس"
                      value={shippingPrice}
                      size="12"
                    />
                  </div>

                  <div className="shadow rounded col-4 pt-3 pb-3">
                    <ListGroupItem
                      label="درصد ارزش افزوده عمده فروشی"
                      value={
                        settings[0] && parseInt(settings[0].valueAdded) + " %"
                      }
                      size="12"
                    />
                    <ListGroupItem
                      label="درصد ارزش افزوده خرده فروشی"
                      value={
                        settings[0] && parseInt(settings[0].valueAdded) + " %"
                      }
                      size="12"
                    />
                    <ListGroupItem
                      label="درصد ارزش افزوده مارکت پلیس"
                      value={
                        settings[0] && parseInt(settings[0].valueAdded) + " %"
                      }
                      size="12"
                    />
                  </div>
                  <div className="shadow rounded col-4 pt-3 pb-3">
                    <ListGroupItem
                      label="مبلغ ارزش افزوده عمده فروشی"
                      value={
                        settings[0] &&
                        Math.round(
                          ((parseInt(settings[0].valueAdded) / 100) *
                            product.wholePrice) /
                            10
                        ) * 10
                      }
                      size="12"
                    />
                    <ListGroupItem
                      label="مبلغ ارزش افزوده خرده فروشی"
                      value={
                        settings[0] &&
                        Math.round(
                          ((parseInt(settings[0].valueAdded) / 100) *
                            product.retailPrice) /
                            10
                        ) * 10
                      }
                      size="12"
                    />
                    <ListGroupItem
                      label="مبلغ ارزش افزوده مارکت پلیس"
                      value={
                        settings[0] &&
                        Math.round(
                          ((parseInt(settings[0].valueAdded) / 100) *
                            this.getMarketPlaceCosts() -
                            this.getCostAndTax() +
                            this.getMarketPlaceCommission() *
                              parseInt(product.marketPlacePrice)) /
                            10
                        ) * 10
                      }
                      size="12"
                    />
                  </div>
                  {/* <div className="shadow rounded col-12 pt-3 pb-3">
                      <div className="row">
                        <Input
                          type="text"
                          name="wholeProfitPercent"
                          label="درصد سود مستقیم عمده فروشی"
                          size="3"
                          required="false"
                          value={PersianNum(this.state.data.wholeProfitPercent)}
                          onChange={this.handleProfitChangeWholePrice}
                        />
                        <Input
                          type="text"
                          name="wholeProfitDiffPrice"
                          label="مبلغ سود مستقیم عمده فروشی"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.wholeProfitDiffPrice.toLocaleString()
                          )}
                          onChange={this.handleProfitChangeWholePrice}
                        />
                        <Input
                          type="text"
                          name="wholePrice"
                          label="قیمت فروش مستقیم عمده فروشی"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.wholePrice.toLocaleString()
                          )}
                          onChange={this.handleProfitChangeWholePrice}
                        />
                      </div>
                      <div className="row">
                        <Input
                          type="text"
                          name="wholeProfitPercentWithoutValueAdded"
                          label="درصد سود عمده فروشی بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.wholeProfitPercentWithoutValueAdded
                          )}
                          onChange={
                            this.handleProfitChangeWholePriceWithoutValueAdded
                          }
                        />
                        <Input
                          type="text"
                          name="wholeProfitDiffPriceWithoutValueAdded"
                          label="مبلغ سود عمده فروشی بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.wholeProfitDiffPriceWithoutValueAdded.toLocaleString()
                          )}
                          onChange={
                            this.handleProfitChangeWholePriceWithoutValueAdded
                          }
                        />
                        <Input
                          type="text"
                          name="wholePriceWithoutValueAdded"
                          label="قیمت فروش عمده فروشی بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.wholePriceWithoutValueAdded.toLocaleString()
                          )}
                          onChange={
                            this.handleProfitChangeWholePriceWithoutValueAdded
                          }
                        />
                      </div>
                      <div className="row">
                        <Input
                          type="text"
                          name="retailProfitPercent"
                          label="درصد سود مستقیم خرده فروشی"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.retailProfitPercent
                          )}
                          onChange={this.handleProfitChangeRetailPrice}
                        />
                        <Input
                          type="text"
                          name="retailProfitDiffPrice"
                          label="مبلغ سود مستقیم خرده فروشی"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.retailProfitDiffPrice.toLocaleString()
                          )}
                          onChange={this.handleProfitChangeRetailPrice}
                        />
                        <Input
                          type="text"
                          name="retailPrice"
                          label="قیمت فروش مستقیم خرده فروشی"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.retailPrice.toLocaleString()
                          )}
                          onChange={this.handleProfitChangeRetailPrice}
                        />
                      </div>
                      <div className="row">
                        <Input
                          type="text"
                          name="retailProfitPercentWithoutValueAdded"
                          label="درصد سود خرده فروشی بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.retailProfitPercentWithoutValueAdded
                          )}
                          onChange={
                            this.handleProfitChangeRetailPriceWithoutValueAdded
                          }
                        />
                        <Input
                          type="text"
                          name="retailProfitDiffPriceWithoutValueAdded"
                          label="مبلغ سود خرده فروشی بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.retailProfitDiffPriceWithoutValueAdded.toLocaleString()
                          )}
                          onChange={
                            this.handleProfitChangeRetailPriceWithoutValueAdded
                          }
                        />
                        <Input
                          type="text"
                          name="retailPriceWithoutValueAdded"
                          label="قیمت فروش خرده فروشی بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.retailPriceWithoutValueAdded.toLocaleString()
                          )}
                          onChange={
                            this.handleProfitChangeRetailPriceWithoutValueAdded
                          }
                        />
                      </div>

                      <div className="row">
                        <Input
                          type="text"
                          name="marketPlaceProfitPercent"
                          label="درصد سود مارکت پلیس"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.marketPlaceProfitPercent
                          )}
                          onChange={this.handleMarketPlaceProfitChange}
                        />
                        <Input
                          type="text"
                          name="marketPlaceProfitDiffPrice"
                          label="مبلغ سود مارکت پلیس"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.marketPlaceProfitDiffPrice.toLocaleString()
                          )}
                          onChange={this.handleMarketPlaceProfitChange}
                        />
                        <Input
                          type="text"
                          name="marketPlacePrice"
                          label="قیمت فروش مارکت پلیس"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.marketPlacePrice.toLocaleString()
                          )}
                          onChange={this.handleMarketPlaceProfitChange}
                        />
                      </div>
                      <div className="row">
                        <Input
                          type="text"
                          name="marketPlaceProfitPercentWithoutValueAdded"
                          label="درصد سود مارکت پلیس بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data
                              .marketPlaceProfitPercentWithoutValueAdded
                          )}
                          onChange={
                            this.handleMarketPlaceProfitChangeWithoutValueAdded
                          }
                        />
                        <Input
                          type="text"
                          name="marketPlaceProfitDiffPriceWithoutValueAdded"
                          label="مبلغ سود مارکت پلیس بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.marketPlaceProfitDiffPriceWithoutValueAdded.toLocaleString()
                          )}
                          onChange={
                            this.handleMarketPlaceProfitChangeWithoutValueAdded
                          }
                        />
                        <Input
                          type="text"
                          name="marketPlacePriceWithoutValueAdded"
                          label="قیمت فروش مارکت پلیس بدون ارزش افزوده"
                          size="3"
                          required="false"
                          value={PersianNum(
                            this.state.data.marketPlacePriceWithoutValueAdded.toLocaleString()
                          )}
                          onChange={
                            this.handleMarketPlaceProfitChangeWithoutValueAdded
                          }
                        />
                      </div>
                    </div> */}
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
  settings: state.setting.settings,
  product: state.product.product,
  loadingProduct: state.product.loading
});

export default connect(
  mapStateToProps,
  { getProductItem, getSettingItems }
)(withStyles(rtlStyle)(Process));
