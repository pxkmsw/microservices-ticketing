import React, { Component } from "react";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getPaymentItems,
  deletePaymentItem
} from "../../actions/paymentActions";
import { getPaymentColumns } from "../../services/fakeColumnService";
import Notifications from "../dashboard/Notifications";
import { BeatLoader } from "react-spinners";
import { getSettingItems } from "../../actions/settingActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Payments extends Notifications {
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
      loadingSetting,
      state,
      ...rest
    } = this.props;
    if (loadingPayment || !payments)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#20B2AA"} />
        </div>
      );

    const modifiedState = { ...state };
    modifiedState.listName = "";
    modifiedState.addLink = "/Financial/AddPayment";
    modifiedState.columns = getPaymentColumns();
    const id = this.props.match.params.id;
    const filtered = id ? payments.filter(e => e.accountId == id) : payments;
    return (
      <React.Fragment>
        {this.renderNotification()}
        <ListPage
          state={modifiedState}
          title={filtered[0] && filtered[0].account}
          items={filtered}
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
)(withStyles(rtlStyle)(Payments));
