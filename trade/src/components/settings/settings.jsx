import React, { Component } from "react";
import GridItem from "../Grid/GridItem";
import { connect } from "react-redux";
import { getSettingItems } from "../../actions/settingActions";
import ListGroupItem from "../listGroup/listGroupItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Settings extends Component {
  componentDidMount() {
    this.props.getSettingItems();
  }
  render() {
    const { settings, loading } = this.props;
    if (loading || !settings)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#FFC300"} />
        </div>
      );
    return (
      <React.Fragment>
        <CardHeader color="warning">
          <h4 className={this.props.classes.cardTitleWhite}>تنظیمات</h4>
          <p className={this.props.classes.cardCategoryWhite}>جزئیات تنظیمات</p>
        </CardHeader>
        <CardBody>
          <React.Fragment>
            <div className="row m-2">
              <button
                className="btn btn-lg btn-dark m-2 shadow rounded"
                onClick={() => this.props.history.push("/EditSettings")}
              >
                <i className="fa fa-wrench" />
              </button>
            </div>
            <div className="row">
              <div className="list-group p-4 col-12">
                <div className="row shadow rounded mt-3">
                  <div className="shadow rounded col-3 pt-3 pb-3">
                    <ListGroupItem
                      label="درصد ارزش افزوده برای مالیات"
                      value={
                        settings && settings[0] && `${settings[0].valueAdded} %`
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label="درصد ارزش افزوده مارکت پلیس"
                      value={
                        settings && settings[0] && `${settings[0].valueAdded} %`
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label="هزینه حمل و نقل به مارکت پلیس  "
                      value={
                        settings &&
                        settings[0] &&
                        `${settings[0].shippingCosts}`
                      }
                      size="12"
                      float="left"
                    />
                  </div>
                  <div className="shadow rounded col-3 pt-3 pb-3">
                    <ListGroupItem
                      label="درصد سود پیش فرض از عمده فروشی"
                      value={
                        settings &&
                        settings[0] &&
                        `${settings[0].wholeProfit} %`
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label="درصد سود پیش فرض از خرده فروشی"
                      value={
                        settings &&
                        settings[0] &&
                        `${settings[0].retailProfit} %`
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label="درصد سود پیش فرض از مارکت پلیس"
                      value={
                        settings &&
                        settings[0] &&
                        `${settings[0].marketPlaceProfit} %`
                      }
                      size="12"
                      float="left"
                    />
                  </div>
                  <div className="shadow rounded col-3 pt-3 pb-3">
                    <ListGroupItem
                      label={`انجام فرآیند "افزودن" برای کاربران`}
                      value={
                        settings && settings[0] && settings[0].addAction
                          ? "بله"
                          : "خیر"
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label={`انجام فرآیند "ویرایش" برای کاربران`}
                      value={
                        settings && settings[0] && settings[0].editAction
                          ? "بله"
                          : "خیر"
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label={`انجام فرآیند "حذف" برای کاربران`}
                      value={
                        settings && settings[0] && settings[0].deleteAction
                          ? "بله"
                          : "خیر"
                      }
                      size="12"
                      float="left"
                    />
                  </div>
                  <div className="shadow rounded col-3 pt-3 pb-3">
                    <ListGroupItem
                      label={`دسترسی به "پردازش" برای کاربران`}
                      value={
                        settings && settings[0] && settings[0].processAccess
                          ? "بله"
                          : "خیر"
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label={`دسترسی به "اشخاص" برای کاربران`}
                      value={
                        settings && settings[0] && settings[0].personsAccess
                          ? "بله"
                          : "خیر"
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label={`دسترسی به "شرکت ها" برای کاربران`}
                      value={
                        settings && settings[0] && settings[0].companiesAccess
                          ? "بله"
                          : "خیر"
                      }
                      size="12"
                      float="left"
                    />
                    <ListGroupItem
                      label={`دسترسی به "بازرگانی" برای کاربران`}
                      value={
                        settings && settings[0] && settings[0].tradeAccess
                          ? "بله"
                          : "خیر"
                      }
                      size="12"
                      float="left"
                    />
                  </div>
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
  loading: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getSettingItems }
)(withStyles(rtlStyle)(Settings));
