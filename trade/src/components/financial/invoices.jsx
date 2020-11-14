import React, { Component } from "react";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getInvoiceItems,
  deleteInvoiceItem
} from "../../actions/invoiceActions";
import { getInvoiceColumns } from "../../services/fakeColumnService";
import Notifications from "../dashboard/Notifications";
import { BeatLoader } from "react-spinners";
import { getSettingItems } from "../../actions/settingActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Invoices extends Notifications {
  componentDidMount() {
    this.props.getSettingItems();
    this.props.getInvoiceItems();
  }

  handleProfileDetail = item => {
    // this.props.history.push(`/Profiles/${item._id}`);
  };

  handleEditTableItem = item => {
    this.props.history.push(`/Financial/EditInvoice/${item._id}`);
  };

  handleDeleteTableItem = item => {
    this.props.deleteInvoiceItem(item._id);
    this.showNotification(`${item.name} با موفقیت حذف شد.`, "danger");
  };

  render() {
    const {
      invoices,
      loadingPayment,
      settings,
      loadingSetting,
      state,
      ...rest
    } = this.props;
    if (loadingPayment || !invoices)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#20B2AA"} />
        </div>
      );
    const modifiedState = { ...state };
    modifiedState.listName = "Invoices";
    modifiedState.addLink = "/Financial/AddInvoice";
    modifiedState.columns = getInvoiceColumns();
    // const id = this.props.match.params.id;
    // const filtered = id ? invoices.filter(e => e.accountId == id) : invoices;
    return (
      <React.Fragment>
        {this.renderNotification()}
        <ListPage
          state={modifiedState}
          title={"فاکتورهای صادر شده"}
          items={invoices}
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
  invoices: state.invoice.invoices,
  loadingInvoice: state.invoice.loading,
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getSettingItems, getInvoiceItems, deleteInvoiceItem }
)(withStyles(rtlStyle)(Invoices));
