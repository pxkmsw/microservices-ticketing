import React, { Component } from "react";
import Form from "../../form/form";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import GridItem from "../../Grid/GridItem";
import {
  getAccountItem,
  addAccountItem,
  updateAccountItem
} from "../../../actions/accountActions";
import { getAccountTypeItems } from "../../../actions/accountTypeActions";
import { getAccountLevelItems } from "../../../actions/accountLevelActions";
import Card from "../../Card/Card";
import CardBody from "../../Card/CardBody";
import CardHeader from "../../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Account extends Form {
  state = {
    data: {
      code: "",
      name: "",
      description: "",
      accountLevel: "",
      accountLevelId: "",
      accountType: "",
      accountTypeId: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getAccountLevelItems();
    this.props.getAccountTypeItems();
    this.handleEditForm();
  }

  handleEditForm = () => {
    const id = this.props.match.params.id;
    id && this.props.getAccountItem(id);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.id) {
      const { account, loadingAccount } = nextProps;
      if (loadingAccount || !account)
        return (
          <div className="loader">
            <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
          </div>
        );
      this.setState({ data: account });
    }
  }

  handlePreparingForm = data => {
    const { accountLevels, accountTypes } = this.props;

    data.accountLevel = !data.accountLevelId
      ? accountLevels[0].name
      : data.accountLevel;
    data.accountLevelId = !data.accountLevelId
      ? accountLevels[0]._id
      : data.accountLevelId;

    data.accountType = !data.accountTypeId
      ? accountTypes[0].name
      : data.accountType;
    data.accountTypeId = !data.accountTypeId
      ? accountTypes[0]._id
      : data.accountTypeId;

    return data;
  };

  handleBack = () => {
    const { state } = this.props.location;
    const path = state ? state.from.pathname : "/FinDashboard";
    this.props.onRoute(path);
    this.props.history.push(path);
  };

  handleNotify = name => {
    let msg = this.props.match.params.id
      ? " با موفقیت به روزرسانی شد."
      : " با موفقیت اضافه شد.";
    NotificationManager.success(name + msg);
  };

  doSubmit = data => {
    const prepared = this.handlePreparingForm(data);
    const accountId = this.props.match.params.id;
    accountId
      ? this.props.updateAccountItem({ item: prepared, id: accountId })
      : this.props.addAccountItem(prepared);

    this.handleBack();
    this.handleNotify(prepared.name);
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
    const { accountLevels, accountTypes, loadingAccountLevels } = this.props;
    if (!accountLevels || !accountTypes || loadingAccountLevels)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
        </div>
      );

    const accountTypeItems =
      this.state.data.accountLevel == "گروه" || !this.state.data.accountLevel
        ? []
        : accountTypes;

    return (
      <React.Fragment>
        <CardHeader color="rose">
          <h4 className={this.props.classes.cardTitleWhite}>افزودن حساب</h4>
          <p className={this.props.classes.cardCategoryWhite}>افزودن حساب</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.handleFormSubmission} id="addAccountform">
            <div className="row m-2">
              {this.renderSubmitBtn()}
              {this.renderCancelBtn("لغو")}
            </div>
            <div className="row p-4">
              <div className="row col-12">
                {this.renderSelect("accountLevel", "سطح حساب", accountLevels)}
                {this.renderSelect("accountType", "نقش حساب", accountTypeItems)}
              </div>
              <ColoredLine color="black" />
              <div className="row col-12">
                {this.renderInput("code", "کد")}
                {this.renderInput("name", "عنوان", "4", true)}
                {this.renderInput("description", "شرح", "5", true)}
              </div>
            </div>
          </form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  accountLevels: state.accountLevel.accountLevels,
  loadingAccountLevels: state.accountLevel.loading,
  accountTypes: state.accountType.accountTypes,
  account: state.account.account,
  loadingAccount: state.account.loading
});

export default connect(
  mapStateToProps,
  {
    getAccountLevelItems,
    getAccountTypeItems,
    addAccountItem,
    updateAccountItem,
    getAccountItem
  }
)(withStyles(rtlStyle)(Account));
