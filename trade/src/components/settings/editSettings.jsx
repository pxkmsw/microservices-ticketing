import React, { Component } from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import {
  getSettingItems,
  updateSettingItem
} from "../../actions/settingActions";
import Form from "../form/form";
import { EngNum } from "../table/common/persiandigit";
import ItemsModalView from "../Modal/itemsModalView";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class EditSettings extends Form {
  state = {
    data: {
      valueAdded: "",
      shippingCosts: "",
      wholeProfit: "",
      retailProfit: "",
      marketPlaceProfit: "",
      addAction: false,
      editAction: false,
      deleteAction: false,
      processAccess: false,
      personsAccess: false,
      companiesAccess: false,
      tradeAccess: false
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getSettingItems();
  }

  componentWillReceiveProps(nextProps) {
    const { settings, loading } = nextProps;
    if (loading || !settings)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
        </div>
      );
    this.setState({ data: settings[0] });
  }

  handleBack = () => {
    this.props.onRoute("/Settings");
    this.props.history.push("/Settings");
  };

  doSubmit = data => {
    this.props.updateSettingItem(data);

    setTimeout(() => {
      this.props.onRoute("/Settings");
      this.props.history.push("/Settings");
      NotificationManager.info("تنظیمات" + " با موفقیت به روزرسانی شد.");
    }, 1000);
  };

  render() {
    return (
      <React.Fragment>
        <CardHeader color="rose">
          <h4 className={this.props.classes.cardTitleWhite}>ویرایش تنظیمات</h4>
          <p className={this.props.classes.cardCategoryWhite}>
            ویرایش تمامی تنظیمات
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.handleFormSubmission} id="addnewform1">
            <div className="row m-2">
              {this.renderSubmitBtn()}
              {this.renderCancelBtn("لغو")}
            </div>
            <div className="row">
              {this.renderInput("valueAdded", "ارزش افزوده برای مالیات")}
              {this.renderInput("shippingCosts", "هزینه ارسال به دیجیکالا")}
              {this.renderInput("wholeProfit", "درصد سود عمده فروشی")}
              {this.renderInput("retailProfit", "درصد سود خرده فروشی")}
              {this.renderInput("marketPlaceProfit", "درصد سود مارکت پلیس")}
              {this.renderCheck(
                "addAction",
                `امکان انجام فرآیند "افزودن" برای کاربران`
              )}
              {this.renderCheck(
                "editAction",
                `امکان انجام فرآیند "ویرایش" برای کاربران`
              )}
              {this.renderCheck(
                "deleteAction",
                `امکان انجام فرآیند "حذف" برای کاربران`
              )}
              {this.renderCheck(
                "processAccess",
                `دسترسی به "پردازش" برای کاربران`
              )}
              {this.renderCheck(
                "personsAccess",
                `دسترسی به "اشخاص" برای کاربران`
              )}
              {this.renderCheck(
                "companiesAccess",
                `دسترسی به "شرکت ها" برای کاربران`
              )}
              {this.renderCheck(
                "tradeAccess",
                `دسترسی به "بازرگانی" برای کاربران`
              )}
            </div>
          </form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProduct = state => ({
  settings: state.setting.settings,
  loading: state.setting.loading
});

export default connect(
  mapStateToProduct,
  {
    getSettingItems,
    updateSettingItem
  }
)(withStyles(rtlStyle)(EditSettings));
