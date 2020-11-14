import React, { Component } from "react";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import ListGroupItem from "../listGroup/listGroupItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";

import {
  addInvoiceItem,
  getInvoiceItem,
  updateInvoiceItem
} from "../../actions/invoiceActions";

import { getPersonItems } from "../../actions/personActions";
import { getProductItems } from "../../actions/productActions";

import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Invoice extends Form {
  state = {
    data: {
      name: "",
      product: "",
      productPrice: "",
      invoiceType: "",
      sellerName: "",
      sellerAddress: "",
      sellerPhoneNumber: "",
      buyerId: "",
      buyerName: "",
      buyerAddress: "",
      buyerPhoneNumber: "",
      products: [],
      totalPrice: 0
    },
    allPersonOptions: [],
    allProductOptions: [],
    personSuggestions: [],
    productSuggestions: [],
    personValue: "",
    productValue: "",
    personId: "",
    person: {},
    product: {},
    productId: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getPersonItems();
    this.props.getProductItems();
    this.handleEditInvoice();
  }

  handleEditInvoice = () => {
    const id = this.props.match.params.id;
    id && this.props.getInvoiceItem(id);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.products)
      this.setState({ allProductOptions: nextProps.products });
    if (nextProps.persons)
      this.setState({ allPersonOptions: nextProps.persons });
    if (this.props.match.params.id) {
      if (nextProps.invoice) {
        this.setState({
          data: nextProps.invoice,
          personValue: nextProps.invoice.buyerName,
          personId: nextProps.invoice.buyerId
        });
      }
    }
  }

  getDots = string => {
    if (string.length > 58) return string.substring(0, 58) + "...";
    return string;
  };

  addProHandler = () => {
    let data = { ...this.state.data };
    let products = [...data.products];
    let product = { ...this.state.product };
    if (product.name) {
      if (products.some(pro => pro.name == product.name)) {
        products.map((a, i) => {
          if (a.name == product.name) this.addItem(i);
        });
      } else {
        product.quantity = 1;
        products.push(product);
      }
    }
    data.products = [...products];
    data.totalPrice = 0;
    data.products.map(
      pro => (data.totalPrice += pro.tradeBuyingPrice * pro.quantity)
    );
    data.product = "";
    data.productPrice = "";
    this.setState({ data, product: {}, productValue: "" });
  };

  addItem = i => {
    let data = { ...this.state.data };
    data.products[i].quantity++;
    data.totalPrice += data.products[i].tradeBuyingPrice;
    this.setState({ data });
  };

  subItem = i => {
    let data = { ...this.state.data };
    if (data.products[i].quantity > 1) {
      data.products[i].quantity--;
      data.totalPrice -= data.products[i].tradeBuyingPrice;
      this.setState({ data });
    }
  };

  delItem = i => {
    let data = { ...this.state.data };
    if (data.products[i].quantity) {
      data.totalPrice -=
        data.products[i].tradeBuyingPrice * data.products[i].quantity;
      data.products.splice(i, 1);
      this.setState({ data });
    }
  };

  preparingInvoice = data => {
    if (!data.products.length) {
      NotificationManager.warning(`لطفا یک یا چند محصول به فاکتور اضافه کنید`);
      return false;
    }
    if (!data.buyerName) {
      NotificationManager.warning(`لطفا نام خریدار را وارد کنید`);
      return false;
    }
    if (!data.sellerName) {
      NotificationManager.warning(`لطفا نام فروشنده را وارد کنید`);
      return false;
    }
    return true;
  };

  handleNotify = name => {
    let msg = this.props.match.params.id
      ? " با موفقیت به روزرسانی شد."
      : " با موفقیت اضافه شد.";
    NotificationManager.success(name + msg);
  };

  handleBack = () => {
    const { state } = this.props.location;
    const path = state ? state.from.pathname : "/Financial/Invoices";
    this.props.onRoute(path);
    this.props.history.push(path);
  };

  doSubmit = payload => {
    let data = { ...payload };
    const prepared = this.preparingInvoice(data);
    if (prepared) {
      data.buyerId = this.state.personId;
      data.name = `${data.invoiceType} مربوط به ${data.buyerName}`;
      this.props.match.params.id
        ? this.props.updateInvoiceItem({
            item: data,
            id: this.props.match.params.id
          })
        : this.props.addInvoiceItem(data);

      this.handleBack();
      this.handleNotify(data.invoiceType);
    }
  };

  render() {
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          backgroundColor: color,
          width: "90%"
        }}
      />
    );
    const invoiceTypes = [
      { name: "فاکتور فروش", value: "sellInvoice" },
      { name: "فاکتور خرید", value: "buyInvoice" },
      { name: "پیش فاکتور فروش", value: "preSellInvoice" },
      { name: "پیش فاکتور خرید", value: "preBuyInvoice" }
    ];

    return (
      <React.Fragment>
        <CardHeader color="info">
          <h4 className={this.props.classes.cardTitleWhite}>صدور فاکتور</h4>
          <p className={this.props.classes.cardCategoryWhite}>صدور فاکتور</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.handleFormSubmission} id="addInvoiceform">
            <div className="row m-2">
              {this.renderSubmitBtn("", "info", true)}
              {this.renderCancelBtn("لغو")}
            </div>
            <div className="row">
              <div className="list-group p-4 text-center col-12">
                <div className="row">
                  {this.renderSelect(
                    "invoiceType",
                    "نوع فاکتور",
                    invoiceTypes,
                    "3"
                  )}
                </div>
                <div className="row">
                  {this.renderInput("sellerName", "فروشنده", "3")}
                  {this.renderInput("sellerَAddress", "آدرس فروشنده", "5")}
                  {this.renderInput("sellerَPhoneNumber", "تلفن فروشنده", "3")}
                </div>
                <div className="row">
                  {this.renderPersonAutoSuggest("buyerName", "خریدار", "3")}
                  {this.renderInput("buyerAddress", "آدرس خریدار", "5")}
                  {this.renderInput("buyerPhoneNumber", "تلفن خریدار", "3")}
                </div>
                <ColoredLine color="black" />
                <div className="row">
                  <div className={`form-group m-3 col-1 mt-5`}>
                    <p
                      id="ProInput"
                      className="btn btn-info shadow"
                      onClick={this.addProHandler}
                    >
                      افزودن
                    </p>
                  </div>
                  {this.renderProductAutoSuggest(
                    "product",
                    "نام محصول",
                    false,
                    "6"
                  )}
                  {this.renderInput("productPrice", "مبلغ")}
                </div>

                <div className="list-group m-2 mt-4">
                  {this.state.data.products.map((pro, i) => (
                    <div className="row">
                      <ListGroupItem
                        label={`${i + 1} - نام محصول`}
                        value={this.getDots(pro.name)}
                        float=""
                        size="5"
                      />
                      <ListGroupItem
                        label="قیمت واحد"
                        value={pro.tradeBuyingPrice}
                        float=""
                        size="2"
                      />
                      <ListGroupItem
                        label="تعداد"
                        value={pro.quantity}
                        float=""
                        size="1"
                      />
                      <ListGroupItem
                        label="قیمت کل"
                        value={pro.tradeBuyingPrice * pro.quantity}
                        float=""
                        size="2"
                      />
                      <span
                        className="btn btn-info btn-rounded shadow m-2 mr-3"
                        onClick={() => this.addItem(i)}
                      >
                        <i className="fa fa-plus"></i>
                      </span>
                      <span
                        className="btn btn-info btn-rounded shadow m-2"
                        onClick={() => this.subItem(i)}
                      >
                        <i className="fa fa-minus"></i>
                      </span>
                      <span
                        className="btn btn-danger btn-rounded shadow m-2"
                        onClick={() => this.delItem(i)}
                      >
                        <i className="fa fa-times"></i>
                      </span>
                    </div>
                  ))}
                  <ListGroupItem
                    label="مبلغ کل فاکتور"
                    value={this.state.data.totalPrice}
                    float=""
                    size="3"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  invoice: state.invoice.invoice,
  persons: state.person.persons,
  products: state.product.products
});

export default connect(
  mapStateToProps,
  {
    getInvoiceItem,
    getPersonItems,
    getProductItems,
    addInvoiceItem,
    updateInvoiceItem
  }
)(withStyles(rtlStyle)(Invoice));
