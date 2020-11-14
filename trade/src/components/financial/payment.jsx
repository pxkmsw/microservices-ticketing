import React, { Component } from "react";
import Form from "../form/form";
import uuid from "uuid";
import { NotificationManager } from "react-notifications";
import {
  addPaymentItem,
  getPaymentItem,
  updatePaymentItem
} from "../../actions/paymentActions";
import { getAccountItems } from "../../actions/accountActions";
import { getInvoiceItems } from "../../actions/invoiceActions";
import { getAccountTypeItems } from "../../actions/accountTypeActions";
import GridItem from "../Grid/GridItem";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Payment extends Form {
  state = {
    data: {
      accountType: "",
      accountTypeId: "",
      account: "",
      accountId: "",
      invoice: "",
      invoiceId: "",
      person: "",
      personId: "",
      price: "",
      type: "",
      status: ""
    },
    allInvoiceOptions: [],
    invoiceSuggestions: [],
    invoiceValue: "",
    invoiceId: "",
    invoice: {},
    errors: {}
  };

  componentDidMount() {
    this.props.getInvoiceItems();
    this.props.getAccountItems();
    this.props.getAccountTypeItems();
    this.handleEditPayment();
  }

  handleEditPayment = () => {
    const id = this.props.match.params.id;
    id && this.props.getPaymentItem(id);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.invoices)
      this.setState({ allInvoiceOptions: nextProps.invoices });
    if (this.props.match.params.id) {
      if (nextProps.payment) {
        this.setState({
          data: nextProps.payment,
          invoiceValue: nextProps.payment.invoice,
          invoiceId: nextProps.payment.invoiceId
        });
      }
    }
  }

  handleNotify = name => {
    let msg = this.props.match.params.id
      ? " با موفقیت به روزرسانی شد."
      : " با موفقیت اضافه شد.";
    NotificationManager.success(name + msg);
  };

  handlePreparingForm = payload => {
    let data = { ...payload };
    const { accounts, accountTypes } = this.props;

    const accountTypeId = this.state.data.accountTypeId
      ? this.state.data.accountTypeId
      : accountTypes[0]._id;

    const subIndex = accounts.filter(e => e.accountTypeId == accountTypeId);

    data.account = !data.accountId ? subIndex[0].name : data.account;
    data.accountId = !data.accountId ? subIndex[0]._id : data.accountId;

    delete data.typeId;
    delete data.statusId;

    return data;
  };

  handleBack = () => {
    const { state } = this.props.location;
    let path = state ? state.from.pathname : "/FinDashboard";
    const id = this.props.match.params.id;
    if (id) path = `/Financial/Payments/${this.state.data.accountId}`;
    this.props.onRoute(path);
    this.props.history.push(path);
  };

  doSubmit = data => {
    const prepared = this.handlePreparingForm(data);
    this.props.match.params.id
      ? this.props.updatePaymentItem({
          item: prepared,
          id: this.props.match.params.id
        })
      : this.props.addPaymentItem(prepared);

    this.handleBack();
    this.handleNotify(prepared.person);
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
    const { accounts, accountTypes, loadingAccount } = this.props;
    if (!accounts || loadingAccount || !accountTypes)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
        </div>
      );
    const status = [
      { _id: uuid.v4(), name: "معلق", value: "suspended" },
      { _id: uuid.v4(), name: "لغو شد", value: "canceled" },
      { _id: uuid.v4(), name: "به تعویق افتاد", value: "postponed" },
      { _id: uuid.v4(), name: "در حال انجام", value: "inProcess" },
      { _id: uuid.v4(), name: "انجام شده", value: "done" }
    ];
    const types = [
      { _id: uuid.v4(), name: "دریافت", value: true },
      { _id: uuid.v4(), name: "پرداخت", value: false }
    ];

    const accountTypeId = this.state.data.accountTypeId
      ? this.state.data.accountTypeId
      : accountTypes[0] && accountTypes[0]._id;

    const filteredAccounts = accounts.filter(
      e => e.accountTypeId == accountTypeId
    );

    return (
      <React.Fragment>
        <CardHeader color="rose">
          <h4 className={this.props.classes.cardTitleWhite}>دریافت / پرداخت</h4>
          <p className={this.props.classes.cardCategoryWhite}>
            دریافت / پرداخت
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.handleFormSubmission} id="addPaymentform">
            <div className="row m-2">
              {this.renderSubmitBtn()}
              {this.renderCancelBtn("لغو")}
            </div>
            <div className="row col-12">
              <div className="row col-12">
                {this.renderSelect("type", "نوع عملیات", types)}
                {this.renderSelect("accountType", "نوع حساب", accountTypes)}
                {this.renderSelect(
                  "account",
                  "عنوان حساب",
                  filteredAccounts,
                  "4"
                )}
                {this.renderSelect("status", "وضعیت", status)}
              </div>
              <ColoredLine color="black" />
              <div className="row col-12">
                {/* {this.renderInput("name", "شرح عملیات", "5")} */}
                {this.renderInvoiceAutoSuggest(
                  "invoice",
                  "عنوان فاکتور",
                  true,
                  "5"
                )}
                {this.renderInput("person", "نام شخص", "3", true)}
                {/* {this.renderPersonAutoSuggest("person", "نام شخص", true)} */}
                {this.renderInput("price", "مبلغ", "3", true)}
              </div>
            </div>
          </form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  invoices: state.invoice.invoices,
  payment: state.payment.payment,
  accounts: state.account.accounts,
  accountTypes: state.accountType.accountTypes,
  loadingAccount: state.account.loading
});

export default connect(
  mapStateToProps,
  {
    getAccountItems,
    getAccountTypeItems,
    addPaymentItem,
    updatePaymentItem,
    getInvoiceItems,
    getPaymentItem
  }
)(withStyles(rtlStyle)(Payment));
