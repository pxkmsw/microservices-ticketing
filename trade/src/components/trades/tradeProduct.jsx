import React, { Component } from "react";
import { connect } from "react-redux";
import auth from "../../services/authService";
import Input from "../form/input";
import { getSettingItems } from "../../actions/settingActions";
import { NotificationManager } from "react-notifications";
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
import {
  getProductItem,
  updateProductItem
} from "../../actions/productActions";
import { PersianNum, EngNum } from "../table/common/persiandigit";
import ListGroupItem from "../listGroup/listGroupItem";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Trade extends Form {
  state = {
    data: {
      tradeBuyingPrice: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      otherCosts: "",
      stock: "",
      eachItemOtherCosts: "",
      wholePrice: "",
      wholePriceFinal: "",
      wholeProfitPercent: "",
      wholeProfitDiffPrice: "",
      wholePriceWithoutValueAdded: "",
      wholePriceFinalWithoutValueAdded: "",
      wholeProfitPercentWithoutValueAdded: "",
      wholeProfitDiffPriceWithoutValueAdded: "",
      retailPrice: "",
      retailPriceFinal: "",
      retailProfitPercent: "",
      retailProfitDiffPrice: "",
      retailPriceWithoutValueAdded: "",
      retailPriceFinalWithoutValueAdded: "",
      retailProfitPercentWithoutValueAdded: "",
      retailProfitDiffPriceWithoutValueAdded: "",
      marketPlacePrice: "",
      marketPlacePriceFinal: "",
      marketPlaceProfitPercent: "",
      marketPlaceProfitDiffPrice: "",
      marketPlacePriceWithoutValueAdded: "",
      marketPlacePriceFinalWithoutValueAdded: "",
      marketPlaceProfitPercentWithoutValueAdded: "",
      marketPlaceProfitDiffPriceWithoutValueAdded: ""
    }
  };

  componentDidMount = () => {
    this.props.getSettingItems();
    this.handleEditTrade();
  };

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id) {
      const { product, loadingProduct } = nextProps;
      if (loadingProduct || !product) return <h1>Loading...</h1>;
      this.handleMapPropToState(product);
      this.handleOnChangeEvents(product);
    }
  }

  handleMapPropToState = product => {
    const data = { ...this.state.data };
    data.tradeBuyingPrice = product.tradeBuyingPrice;
    data.retailPrice = product.retailPrice;
    data.wholePrice = product.wholePrice;
    data.marketPlacePrice = product.marketPlacePrice;
    data.weight = product.weight;
    data.length = product.length;
    data.width = product.width;
    data.height = product.height;
    this.setState({ data });
  };

  handleOnChangeEvents = product => {
    setTimeout(() => {
      this.handleProfitChangeWholePrice({
        target: {
          name: "wholePrice",
          value: product.wholePrice.toString()
        }
      });
      this.handleProfitChangeRetailPrice({
        target: {
          name: "retailPrice",
          value: product.retailPrice.toString()
        }
      });
      this.handleMarketPlaceProfitChange({
        target: {
          name: "marketPlacePrice",
          value: product.marketPlacePrice.toString()
        }
      });
    }, 2000);
  };

  handleEditTrade = () => {
    const id = this.props.match.params.id;
    id && this.props.getProductItem(id);
  };

  handleBasicChange = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = value;
    this.setState({ data });
  };

  handleOtherCosts = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = value;
    if (e.target.name.includes("stock") && value) {
      if (data.otherCosts)
        data.eachItemOtherCosts = parseInt(data.otherCosts) / parseInt(value);
    } else if (e.target.name.includes("eachItemOtherCosts") && value) {
      if (data.otherCosts)
        data.stock =
          parseInt(data.otherCosts) / parseInt(data.eachItemOtherCosts);
    } else {
      data.stock = "";
      data.eachItemOtherCosts = "";
    }
    this.setState({ data });
  };

  handleMarketPlaceProfitChange = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.marketPlacePrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            this.getMarketPlaceCosts() +
            this.getOtherCosts() +
            this.getCostAndTax()) /
            (1 -
              parseInt(value) / 100 -
              this.getMarketPlaceCommission() -
              this.getAddedValue()) /
            10
        ) * 10;
      data.marketPlacePriceFinal = data.eachItemOtherCosts
        ? Math.round(data.marketPlacePrice + data.eachItemOtherCosts)
        : data.marketPlacePrice;
      data.marketPlaceProfitDiffPrice =
        Math.round(getProfitByPercent(data.marketPlacePriceFinal, value) / 10) *
        10;
    } else if (value && e.target.name.includes("Profit")) {
      data.marketPlacePrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getMarketPlaceCosts() +
            this.getOtherCosts() +
            this.getCostAndTax()) /
            (1 - this.getMarketPlaceCommission() - this.getAddedValue()) /
            10
        ) * 10;

      data.marketPlacePriceFinal = data.eachItemOtherCosts
        ? Math.round(data.marketPlacePrice + data.eachItemOtherCosts)
        : data.marketPlacePrice;
      data.marketPlaceProfitPercent = getPercentByProfit(
        data.marketPlacePriceFinal,
        value
      );
    } else if (value && e.target.name.includes("Final")) {
      data.marketPlaceProfitDiffPrice =
        Math.round(
          (parseInt(value) *
            (1 - this.getMarketPlaceCommission() - this.getAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getMarketPlaceCosts() -
            this.getOtherCosts() -
            this.getCostAndTax()) /
            10
        ) * 10;
      data.marketPlacePrice = data.eachItemOtherCosts
        ? Math.round(parseInt(value) - parseInt(data.eachItemOtherCosts))
        : parseInt(value);
      data.marketPlaceProfitPercent =
        Math.round(
          (data.marketPlaceProfitDiffPrice * 10000) / parseInt(value)
        ) / 100;
    } else if (value && e.target.name.includes("Price")) {
      data.marketPlacePriceFinal = data.eachItemOtherCosts
        ? Math.round(parseInt(value) + parseInt(data.eachItemOtherCosts))
        : parseInt(value);

      data.marketPlaceProfitDiffPrice =
        Math.round(
          (parseInt(data.marketPlacePriceFinal) *
            (1 - this.getMarketPlaceCommission() - this.getAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getMarketPlaceCosts() -
            this.getOtherCosts() -
            this.getCostAndTax()) /
            10
        ) * 10;

      data.marketPlaceProfitPercent =
        Math.round(
          (data.marketPlaceProfitDiffPrice * 10000) /
            parseInt(data.marketPlacePriceFinal)
        ) / 100;
    } else {
      data.marketPlaceProfitPercent = "";
      data.marketPlaceProfitDiffPrice = "";
      data.marketPlacePrice = "";
      data.marketPlacePriceFinal = "";
    }
    this.setState({ data });
  };

  handleMarketPlaceProfitChangeWithoutValueAdded = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.marketPlacePriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            this.getMarketPlaceCosts() +
            this.getOtherCosts() +
            this.getCostAndTax() +
            this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
            (1 -
              parseInt(value) / 100 -
              this.getMarketPlaceCommission() -
              this.getMarketPlaceCommission() *
                this.getMarketPlaceAddedValue()) /
            10
        ) * 10;
      data.marketPlacePriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(
            data.marketPlacePriceWithoutValueAdded + data.eachItemOtherCosts
          )
        : data.marketPlacePriceWithoutValueAdded;
      data.marketPlaceProfitDiffPriceWithoutValueAdded =
        Math.round(
          getProfitByPercent(
            data.marketPlacePriceFinalWithoutValueAdded,
            value
          ) / 10
        ) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.marketPlacePriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getMarketPlaceCosts() +
            this.getOtherCosts() +
            this.getCostAndTax() +
            this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
            (1 -
              this.getMarketPlaceCommission() -
              this.getMarketPlaceCommission() *
                this.getMarketPlaceAddedValue()) /
            10
        ) * 10;

      data.marketPlacePriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(
            data.marketPlacePriceWithoutValueAdded + data.eachItemOtherCosts
          )
        : data.marketPlacePriceWithoutValueAdded;

      data.marketPlaceProfitPercentWithoutValueAdded = getPercentByProfit(
        data.marketPlacePriceFinalWithoutValueAdded,
        value
      );
    } else if (value && e.target.name.includes("Final")) {
      data.marketPlaceProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(value) *
            (1 -
              this.getMarketPlaceCommission() -
              this.getMarketPlaceCommission() *
                this.getMarketPlaceAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getMarketPlaceCosts() -
            this.getOtherCosts() -
            this.getCostAndTax() -
            this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
            10
        ) * 10;

      data.marketPlacePriceWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(parseInt(value) - data.eachItemOtherCosts)
        : parseInt(value);

      data.marketPlaceProfitPercentWithoutValueAdded =
        Math.round(
          (data.marketPlaceProfitDiffPriceWithoutValueAdded * 10000) /
            parseInt(value)
        ) / 100;
    } else if (value && e.target.name.includes("Price")) {
      data.marketPlacePriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(parseInt(value) + data.eachItemOtherCosts)
        : parseInt(value);

      data.marketPlaceProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(data.marketPlacePriceFinalWithoutValueAdded) *
            (1 -
              this.getMarketPlaceCommission() -
              this.getMarketPlaceCommission() *
                this.getMarketPlaceAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getMarketPlaceCosts() -
            this.getOtherCosts() -
            this.getCostAndTax() -
            this.getMarketPlaceCosts() * this.getMarketPlaceAddedValue()) /
            10
        ) * 10;

      data.marketPlaceProfitPercentWithoutValueAdded =
        Math.round(
          (data.marketPlaceProfitDiffPriceWithoutValueAdded * 10000) /
            parseInt(data.marketPlacePriceFinalWithoutValueAdded)
        ) / 100;
    } else {
      data.marketPlaceProfitPercentWithoutValueAdded = "";
      data.marketPlaceProfitDiffPriceWithoutValueAdded = "";
      data.marketPlacePriceWithoutValueAdded = "";
      data.marketPlacePriceFinalWithoutValueAdded = "";
    }
    this.setState({ data });
  };

  handleProfitChangeWholePrice = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.wholePrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) + this.getOtherCosts()) /
            (1 -
              parseInt(value) / 100 -
              this.getAddedValue() -
              this.getWholeShipping()) /
            10
        ) * 10;

      data.wholePriceFinal = data.eachItemOtherCosts
        ? Math.round(
            parseInt(data.wholePrice) + parseInt(data.eachItemOtherCosts)
          )
        : data.wholePrice;

      data.wholeProfitDiffPrice =
        Math.round(getProfitByPercent(data.wholePriceFinal, value) / 10) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.wholePrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getOtherCosts()) /
            (1 - this.getAddedValue() - this.getWholeShipping()) /
            10
        ) * 10;

      data.wholePriceFinal = data.eachItemOtherCosts
        ? Math.round(
            parseInt(data.wholePrice) + parseInt(data.eachItemOtherCosts)
          )
        : data.wholePrice;

      data.wholeProfitPercent = getPercentByProfit(data.wholePriceFinal, value);
    } else if (value && e.target.name.includes("Final")) {
      data.wholeProfitDiffPrice =
        Math.round(
          (parseInt(value) *
            (1 - this.getAddedValue() - this.getWholeShipping()) -
            parseInt(data.tradeBuyingPrice) -
            this.getOtherCosts()) /
            10
        ) * 10;

      data.wholePrice = data.eachItemOtherCosts
        ? Math.round(parseInt(value) - parseInt(data.eachItemOtherCosts))
        : parseInt(value);

      data.wholeProfitPercent =
        Math.round((data.wholeProfitDiffPrice * 10000) / parseInt(value)) / 100;
    } else if (value && e.target.name.includes("Price")) {
      data.wholePriceFinal = data.eachItemOtherCosts
        ? Math.round(parseInt(value) + parseInt(data.eachItemOtherCosts))
        : parseInt(value);

      data.wholeProfitDiffPrice =
        Math.round(
          (parseInt(data.wholePriceFinal) *
            (1 - this.getAddedValue() - this.getWholeShipping()) -
            parseInt(data.tradeBuyingPrice) -
            this.getOtherCosts()) /
            10
        ) * 10;

      data.wholeProfitPercent =
        Math.round(
          (data.wholeProfitDiffPrice * 10000) / parseInt(data.wholePriceFinal)
        ) / 100;
    } else {
      data.wholeProfitPercent = "";
      data.wholeProfitDiffPrice = "";
      data.wholePrice = "";
      data.wholePriceFinal = "";
    }
    this.setState({ data });
  };

  handleProfitChangeWholePriceWithoutValueAdded = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.wholePriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) + this.getOtherCosts()) /
            (1 - parseInt(value) / 100 - this.getWholeShipping()) /
            10
        ) * 10;

      data.wholePriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(
            parseInt(data.wholePriceWithoutValueAdded) +
              parseInt(data.eachItemOtherCosts)
          )
        : data.wholePriceWithoutValueAdded;

      data.wholeProfitDiffPriceWithoutValueAdded =
        Math.round(
          getProfitByPercent(data.wholePriceFinalWithoutValueAdded, value) / 10
        ) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.wholePriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getOtherCosts()) /
            (1 - this.getWholeShipping()) /
            10
        ) * 10;

      data.wholePriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(
            parseInt(data.wholePriceWithoutValueAdded) +
              parseInt(data.eachItemOtherCosts)
          )
        : data.wholePriceWithoutValueAdded;

      data.wholeProfitPercentWithoutValueAdded = getPercentByProfit(
        data.wholePriceFinalWithoutValueAdded,
        value
      );
    } else if (value && e.target.name.includes("Final")) {
      data.wholeProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(value) * (1 - this.getWholeShipping()) -
            parseInt(data.tradeBuyingPrice) -
            this.getOtherCosts()) /
            10
        ) * 10;

      data.wholePriceWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(parseInt(value) - parseInt(data.eachItemOtherCosts))
        : value;
      data.wholeProfitPercentWithoutValueAdded =
        Math.round(
          (data.wholeProfitDiffPriceWithoutValueAdded * 10000) / parseInt(value)
        ) / 100;
    } else if (value && e.target.name.includes("Price")) {
      data.wholePriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(parseInt(value) + parseInt(data.eachItemOtherCosts))
        : value;
      data.wholeProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(data.wholePriceFinalWithoutValueAdded) *
            (1 - this.getWholeShipping()) -
            parseInt(data.tradeBuyingPrice) -
            this.getOtherCosts()) /
            10
        ) * 10;

      data.wholeProfitPercentWithoutValueAdded =
        Math.round(
          (data.wholeProfitDiffPriceWithoutValueAdded * 10000) /
            parseInt(data.wholePriceFinalWithoutValueAdded)
        ) / 100;
    } else {
      data.wholeProfitPercentWithoutValueAdded = "";
      data.wholeProfitDiffPriceWithoutValueAdded = "";
      data.wholePriceWithoutValueAdded = "";
      data.wholePriceFinalWithoutValueAdded = "";
    }
    this.setState({ data });
  };

  handleProfitChangeRetailPrice = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.retailPrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            this.getShipping() +
            this.getOtherCosts()) /
            (1 - parseInt(value) / 100 - this.getAddedValue()) /
            10
        ) * 10;

      data.retailPriceFinal = data.eachItemOtherCosts
        ? Math.round(
            parseInt(data.retailPrice) + parseInt(data.eachItemOtherCosts)
          )
        : data.retailPrice;

      data.retailProfitDiffPrice =
        Math.round(getProfitByPercent(data.retailPriceFinal, value) / 10) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.retailPrice =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getShipping() +
            this.getOtherCosts()) /
            (1 - this.getAddedValue()) /
            10
        ) * 10;

      data.retailPriceFinal = data.eachItemOtherCosts
        ? Math.round(
            parseInt(data.retailPrice) + parseInt(data.eachItemOtherCosts)
          )
        : data.retailPrice;

      data.retailProfitPercent = getPercentByProfit(
        data.retailPriceFinal,
        value
      );
    } else if (value && e.target.name.includes("Final")) {
      data.retailProfitDiffPrice =
        Math.round(
          (parseInt(value) * (1 - this.getAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getShipping() -
            this.getOtherCosts()) /
            10
        ) * 10;

      data.retailPrice = data.eachItemOtherCosts
        ? Math.round(parseInt(value) - parseInt(data.eachItemOtherCosts))
        : value;
      data.retailProfitPercent =
        Math.round((data.retailProfitDiffPrice * 10000) / parseInt(value)) /
        100;
    } else if (value && e.target.name.includes("Price")) {
      data.retailPriceFinal = data.eachItemOtherCosts
        ? Math.round(parseInt(value) + parseInt(data.eachItemOtherCosts))
        : value;

      data.retailProfitDiffPrice =
        Math.round(
          (parseInt(data.retailPriceFinal) * (1 - this.getAddedValue()) -
            parseInt(data.tradeBuyingPrice) -
            this.getShipping() -
            this.getOtherCosts()) /
            10
        ) * 10;

      data.retailProfitPercent =
        Math.round(
          (data.retailProfitDiffPrice * 10000) / parseInt(data.retailPriceFinal)
        ) / 100;
    } else {
      data.retailProfitPercent = "";
      data.retailProfitDiffPrice = "";
      data.retailPrice = "";
      data.retailPriceFinal = "";
    }
    this.setState({ data });
  };

  handleProfitChangeRetailPriceWithoutValueAdded = e => {
    const data = { ...this.state.data };
    const clearValue = e.target.value.replace(/,/g, "");
    const value = EngNum(clearValue);
    data[e.target.name] = parseInt(value);
    if (value && e.target.name.includes("Percent")) {
      data.retailPriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            this.getShipping() +
            this.getOtherCosts()) /
            (1 - parseInt(value) / 100) /
            10
        ) * 10;

      data.retailPriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(
            parseInt(data.retailPriceWithoutValueAdded) +
              parseInt(data.eachItemOtherCosts)
          )
        : data.retailPriceWithoutValueAdded;

      data.retailProfitDiffPriceWithoutValueAdded =
        Math.round(
          getProfitByPercent(data.retailPriceFinalWithoutValueAdded, value) / 10
        ) * 10;
    } else if (value && e.target.name.includes("Profit")) {
      data.retailPriceWithoutValueAdded =
        Math.round(
          (parseInt(data.tradeBuyingPrice) +
            parseInt(value) +
            this.getShipping() +
            this.getOtherCosts()) /
            1 /
            10
        ) * 10;

      data.retailPriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(
            parseInt(data.retailPriceWithoutValueAdded) +
              parseInt(data.eachItemOtherCosts)
          )
        : data.retailPriceWithoutValueAdded;

      data.retailProfitPercentWithoutValueAdded = getPercentByProfit(
        data.retailPriceFinalWithoutValueAdded,
        value
      );
    } else if (value && e.target.name.includes("Final")) {
      data.retailProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(value) * 1 -
            parseInt(data.tradeBuyingPrice) -
            this.getShipping() -
            this.getOtherCosts()) /
            10
        ) * 10;

      data.retailPriceWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(parseInt(value) - parseInt(data.eachItemOtherCosts))
        : value;

      data.retailProfitPercentWithoutValueAdded =
        Math.round(
          (data.retailProfitDiffPriceWithoutValueAdded * 10000) /
            parseInt(value)
        ) / 100;
    } else if (value && e.target.name.includes("Price")) {
      data.retailPriceFinalWithoutValueAdded = data.eachItemOtherCosts
        ? Math.round(parseInt(value) + parseInt(data.eachItemOtherCosts))
        : value;
      data.retailProfitDiffPriceWithoutValueAdded =
        Math.round(
          (parseInt(data.retailPriceFinalWithoutValueAdded) * 1 -
            parseInt(data.tradeBuyingPrice) -
            this.getShipping() -
            this.getOtherCosts()) /
            10
        ) * 10;

      data.retailProfitPercentWithoutValueAdded =
        Math.round(
          (data.retailProfitDiffPriceWithoutValueAdded * 10000) /
            parseInt(data.retailPriceFinalWithoutValueAdded)
        ) / 100;
    } else {
      data.retailProfitPercentWithoutValueAdded = "";
      data.retailProfitDiffPriceWithoutValueAdded = "";
      data.retailPriceWithoutValueAdded = "";
      data.retailPriceFinalWithoutValueAdded = "";
    }
    this.setState({ data });
  };

  getOtherCosts = () =>
    this.state.data.eachItemOtherCosts
      ? parseInt(this.state.data.eachItemOtherCosts)
      : 0;

  getCostAndTax = () => {
    if (!this.props.settings) return 0;
    return parseInt(this.props.settings[0].shippingCosts);
  };

  getAddedValue = () => 0.09;

  getMarketPlaceAddedValue = () => 0.09;

  getMarketPlaceCommission = () => 0.1;
  getWholeShipping = () => 0.01;
  getMarketPlaceCosts = () => {
    const { length, width, height, weight } = this.state.data;
    return getDigiKalaShipping(length, width, height, weight);
  };

  getShipping = () => {
    const { length, width, height, weight } = this.state.data;
    return getDigiKalaShipping(length, width, height, weight);
  };

  handleNotify = name => {
    let msg = this.props.match.params.id
      ? " با موفقیت به روزرسانی شد."
      : " با موفقیت اضافه شد.";
    NotificationManager.info(name + msg);
  };

  handleBack = () => {
    const { state } = this.props.location;
    const path = state ? state.from.pathname : "/Products";
    this.props.onRoute(path);
    this.props.history.push(path);
  };

  doSubmit = dt => {
    const { product, match } = this.props;
    const { data } = { ...this.state };
    product.retailPrice = data.retailPriceFinal.toString();
    product.wholePrice = data.wholePriceFinal.toString();
    product.marketPlacePrice = data.marketPlacePriceFinal.toString();

    this.props.updateProductItem({
      item: product,
      id: match.params.id
    });
    this.handleBack();
    this.handleNotify(product.name);
  };

  render() {
    const { settings, loadingSettings } = this.props;
    const user = auth.getCurrentUser();

    if (loadingSettings || !settings)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
        </div>
      );

    return (
      <React.Fragment>
        <CardHeader color="rose">
          <h4 className={this.props.classes.cardTitleWhite}>
            بازرگانی محصولات
          </h4>
          <p className={this.props.classes.cardCategoryWhite}>
            بازرگانی محصولات
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.handleFormSubmission} id="addnewform1">
            <div className="row m-2">
              {this.renderSubmitBtn()}
              {this.renderCancelBtn("لغو")}
            </div>
            <div className="row">
              {this.renderInput("tradeBuyingPrice", "قیمت خرید")}
              {this.renderInput("weight", "وزن")}
              {this.renderInput("length", "طول")}
              {this.renderInput("width", "عرض")}
              {this.renderInput("height", "ارتفاع")}

              <Input
                type="text"
                name="otherCosts"
                label="سایر هزینه ها"
                size="2"
                required={false}
                value={
                  this.state.data.otherCosts &&
                  PersianNum(
                    parseInt(this.state.data.otherCosts).toLocaleString()
                  )
                }
                onChange={this.handleBasicChange}
              />
              <Input
                type="text"
                name="stock"
                label="تعداد آیتم ها"
                size="2"
                required={false}
                value={
                  this.state.data.stock &&
                  PersianNum(parseInt(this.state.data.stock).toLocaleString())
                }
                onChange={this.handleOtherCosts}
              />
              <Input
                type="text"
                name="eachItemOtherCosts"
                label="هزینه سرشکن"
                size="2"
                required={false}
                value={
                  this.state.data.eachItemOtherCosts &&
                  PersianNum(
                    parseInt(
                      this.state.data.eachItemOtherCosts
                    ).toLocaleString()
                  )
                }
                onChange={this.handleOtherCosts}
              />
            </div>
            <hr />
            <div className="row">
              <Input
                type="text"
                name="wholeProfitPercent"
                label="درصد سود عمده"
                size="2"
                required={false}
                value={PersianNum(this.state.data.wholeProfitPercent)}
                onChange={this.handleProfitChangeWholePrice}
              />
              <Input
                type="text"
                name="wholeProfitDiffPrice"
                label="مبلغ سود عمده"
                size="2"
                required={false}
                value={
                  this.state.data.wholeProfitDiffPrice &&
                  PersianNum(
                    this.state.data.wholeProfitDiffPrice.toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeWholePrice}
              />
              <Input
                type="text"
                name="wholePrice"
                label="قیمت عمده"
                size="2"
                required={false}
                value={
                  this.state.data.wholePrice &&
                  PersianNum(this.state.data.wholePrice.toLocaleString())
                }
                onChange={this.handleProfitChangeWholePrice}
              />
              <Input
                type="text"
                name="wholePriceFinal"
                label="قیمت نهایی عمده"
                size="3"
                required={false}
                value={
                  this.state.data.wholePriceFinal &&
                  PersianNum(this.state.data.wholePriceFinal.toLocaleString())
                }
                onChange={this.handleProfitChangeWholePrice}
              />
            </div>
            <div className="row">
              <Input
                type="text"
                name="wholeProfitPercentWithoutValueAdded"
                label="درصد سود عمده بدون مالیات"
                size="2"
                required={false}
                value={PersianNum(
                  this.state.data.wholeProfitPercentWithoutValueAdded
                )}
                onChange={this.handleProfitChangeWholePriceWithoutValueAdded}
              />
              <Input
                type="text"
                name="wholeProfitDiffPriceWithoutValueAdded"
                label="مبلغ سود عمده بدون مالیات"
                size="2"
                required={false}
                value={
                  this.state.data.wholeProfitDiffPriceWithoutValueAdded &&
                  PersianNum(
                    this.state.data.wholeProfitDiffPriceWithoutValueAdded.toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeWholePriceWithoutValueAdded}
              />
              <Input
                type="text"
                name="wholePriceWithoutValueAdded"
                label="قیمت عمده بدون مالیات"
                size="2"
                required={false}
                value={
                  this.state.data.wholePriceWithoutValueAdded &&
                  PersianNum(
                    this.state.data.wholePriceWithoutValueAdded.toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeWholePriceWithoutValueAdded}
              />
              <Input
                type="text"
                name="wholePriceFinalWithoutValueAdded"
                label="قیمت نهایی عمده بدون مالیات"
                size="3"
                required={false}
                value={
                  this.state.data.wholePriceFinalWithoutValueAdded &&
                  PersianNum(
                    this.state.data.wholePriceFinalWithoutValueAdded.toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeWholePriceWithoutValueAdded}
              />
            </div>
            <div className="row">
              <Input
                type="text"
                name="retailProfitPercent"
                label="درصد سود خرده"
                size="2"
                required={false}
                value={PersianNum(this.state.data.retailProfitPercent)}
                onChange={this.handleProfitChangeRetailPrice}
              />
              <Input
                type="text"
                name="retailProfitDiffPrice"
                label="مبلغ سود خرده"
                size="2"
                required={false}
                value={
                  this.state.data.retailProfitDiffPrice &&
                  PersianNum(
                    this.state.data.retailProfitDiffPrice.toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeRetailPrice}
              />
              <Input
                type="text"
                name="retailPrice"
                label="قیمت خرده"
                size="2"
                required={false}
                value={
                  this.state.data.retailPrice &&
                  PersianNum(this.state.data.retailPrice.toLocaleString())
                }
                onChange={this.handleProfitChangeRetailPrice}
              />
              <Input
                type="text"
                name="retailPriceFinal"
                label="قیمت نهایی خرده"
                size="3"
                required={false}
                value={
                  this.state.data.retailPriceFinal &&
                  PersianNum(
                    parseInt(this.state.data.retailPriceFinal).toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeRetailPrice}
              />
            </div>
            <div className="row">
              <Input
                type="text"
                name="retailProfitPercentWithoutValueAdded"
                label="درصد سود خرده بدون مالیات"
                size="2"
                required={false}
                value={PersianNum(
                  this.state.data.retailProfitPercentWithoutValueAdded
                )}
                onChange={this.handleProfitChangeRetailPriceWithoutValueAdded}
              />
              <Input
                type="text"
                name="retailProfitDiffPriceWithoutValueAdded"
                label="مبلغ سود خرده بدون مالیات"
                size="2"
                required={false}
                value={
                  this.state.data.retailProfitDiffPriceWithoutValueAdded &&
                  PersianNum(
                    this.state.data.retailProfitDiffPriceWithoutValueAdded.toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeRetailPriceWithoutValueAdded}
              />
              <Input
                type="text"
                name="retailPriceWithoutValueAdded"
                label="قیمت خرده بدون مالیات"
                size="2"
                required={false}
                value={
                  this.state.data.retailPriceWithoutValueAdded &&
                  PersianNum(
                    this.state.data.retailPriceWithoutValueAdded.toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeRetailPriceWithoutValueAdded}
              />
              <Input
                type="text"
                name="retailPriceFinalWithoutValueAdded"
                label="قیمت نهایی خرده بدون مالیات"
                size="3"
                required={false}
                value={
                  this.state.data.retailPriceFinalWithoutValueAdded &&
                  PersianNum(
                    parseInt(
                      this.state.data.retailPriceFinalWithoutValueAdded
                    ).toLocaleString()
                  )
                }
                onChange={this.handleProfitChangeRetailPriceWithoutValueAdded}
              />
            </div>

            <div className="row">
              <Input
                type="text"
                name="marketPlaceProfitPercent"
                label="درصد سود مارکت"
                size="2"
                required={false}
                value={PersianNum(this.state.data.marketPlaceProfitPercent)}
                onChange={this.handleMarketPlaceProfitChange}
              />
              <Input
                type="text"
                name="marketPlaceProfitDiffPrice"
                label="مبلغ سود مارکت"
                size="2"
                required={false}
                value={
                  this.state.data.marketPlaceProfitDiffPrice &&
                  PersianNum(
                    this.state.data.marketPlaceProfitDiffPrice.toLocaleString()
                  )
                }
                onChange={this.handleMarketPlaceProfitChange}
              />
              <Input
                type="text"
                name="marketPlacePrice"
                label="قیمت مارکت"
                size="2"
                required={false}
                value={
                  this.state.data.marketPlacePrice &&
                  PersianNum(this.state.data.marketPlacePrice.toLocaleString())
                }
                onChange={this.handleMarketPlaceProfitChange}
              />
              <Input
                type="text"
                name="marketPlacePriceFinal"
                label="قیمت نهایی مارکت"
                size="3"
                required={false}
                value={
                  this.state.data.marketPlacePriceFinal &&
                  PersianNum(
                    this.state.data.marketPlacePriceFinal.toLocaleString()
                  )
                }
                onChange={this.handleMarketPlaceProfitChange}
              />
            </div>
            <div className="row">
              <Input
                type="text"
                name="marketPlaceProfitPercentWithoutValueAdded"
                label="درصد سود مارکت بدون مالیات"
                size="2"
                required={false}
                value={PersianNum(
                  this.state.data.marketPlaceProfitPercentWithoutValueAdded
                )}
                onChange={this.handleMarketPlaceProfitChangeWithoutValueAdded}
              />
              <Input
                type="text"
                name="marketPlaceProfitDiffPriceWithoutValueAdded"
                label="مبلغ سود مارکت بدون مالیات"
                size="2"
                required={false}
                value={
                  this.state.data.marketPlaceProfitDiffPriceWithoutValueAdded &&
                  PersianNum(
                    this.state.data.marketPlaceProfitDiffPriceWithoutValueAdded.toLocaleString()
                  )
                }
                onChange={this.handleMarketPlaceProfitChangeWithoutValueAdded}
              />
              <Input
                type="text"
                name="marketPlacePriceWithoutValueAdded"
                label="قیمت مارکت بدون مالیات"
                size="2"
                required={false}
                value={
                  this.state.data.marketPlacePriceWithoutValueAdded &&
                  PersianNum(
                    this.state.data.marketPlacePriceWithoutValueAdded.toLocaleString()
                  )
                }
                onChange={this.handleMarketPlaceProfitChangeWithoutValueAdded}
              />
              <Input
                type="text"
                name="marketPlacePriceFinalWithoutValueAdded"
                label="قیمت نهایی مارکت بدون مالیات"
                size="3"
                required={false}
                value={
                  this.state.data.marketPlacePriceFinalWithoutValueAdded &&
                  PersianNum(
                    this.state.data.marketPlacePriceFinalWithoutValueAdded.toLocaleString()
                  )
                }
                onChange={this.handleMarketPlaceProfitChangeWithoutValueAdded}
              />
            </div>
          </form>
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
  { getSettingItems, getProductItem, updateProductItem }
)(withStyles(rtlStyle)(Trade));
