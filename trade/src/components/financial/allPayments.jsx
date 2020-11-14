import React, { Component } from "react";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getPaymentItems,
  deletePaymentItem
} from "../../actions/paymentActions";
import { getAllPaymentsColumns } from "../../services/fakeColumnService";
import Notifications from "../dashboard/Notifications";
import { BeatLoader } from "react-spinners";
import { getSettingItems } from "../../actions/settingActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class AllPayments extends Notifications {
  componentDidMount() {
    this.props.getSettingItems();
    this.props.getPaymentItems();
  }

  handleProfileDetail = item => {
    // this.props.history.push(`/Profiles/${item._id}`);
  };

  handleEditTableItem = item => {
    this.props.history.push(`/Financial/EditPayment/${item._id}`);
  };

  handleDeleteTableItem = item => {
    this.props.deletePaymentItem(item._id);
    this.showNotification(`${item.name} با موفقیت حذف شد.`, "danger");
  };

  render() {
    const {
      payments,
      loadingPayment,
      settings,
      state,
      loadingSetting,
      ...rest
    } = this.props;
    if (loadingPayment || !payments)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#20B2AA"} />
        </div>
      );

    const modifiedState = { ...state };
    modifiedState.listName = "AllPayments";
    modifiedState.addLink = "/Financial/AddPayment";
    modifiedState.columns = getAllPaymentsColumns();
    // const filtered = id ? payments.filter(e => e.accountId == id) : payments;
    return (
      <React.Fragment>
        {this.renderNotification()}
        <ListPage
          state={modifiedState}
          title="تمام پرداخت ها و دریافت ها"
          items={payments}
          onDetail={this.handleProfileDetail}
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
  payments: state.payment.payments,
  loadingPayment: state.payment.loading,
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getSettingItems, getPaymentItems, deletePaymentItem }
)(withStyles(rtlStyle)(AllPayments));
