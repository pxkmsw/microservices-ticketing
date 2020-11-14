import React, { Component } from "react";
import { toast } from "react-toastify";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  getCompanyItems,
  deleteCompanyItem
} from "../../actions/companyActions";
import Notifications from "../dashboard/Notifications";
import { BeatLoader } from "react-spinners";
import { getSettingItems } from "../../actions/settingActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Companies extends Notifications {
  componentDidMount() {
    this.props.getCompanyItems();
    this.props.getSettingItems();
  }

  handleProfileDetail = item => {
    // this.props.history.push(`/Profiles/${item._id}`);
  };

  handleEditTableItem = item => {
    this.props.history.push(`/EditCompany/${item._id}`);
  };

  handleDeleteTableItem = item => {
    this.props.deleteCompanyItem(item._id);
    this.showNotification(`${item.name} با موفقیت حذف شد.`, "danger");
  };

  render() {
    const {
      companies,
      loadingCompanies,
      settings,
      loadingSetting,
      ...rest
    } = this.props;
    if (loadingCompanies || !companies)
      return (
        <div className="loader">
          <BeatLoader
            // css={override}
            sizeUnit={"px"}
            size={20}
            color={"#20B2AA"}
          />
        </div>
      );
    return (
      <React.Fragment>
        {this.renderNotification()}
        <ListPage
          items={companies}
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
  companies: state.company.companies,
  loadingCompanies: state.company.loading,
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getCompanyItems, deleteCompanyItem, getSettingItems }
)(withStyles(rtlStyle)(Companies));
