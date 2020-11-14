/*eslint-disable*/
import React from "react";
import { connect } from "react-redux";
import { getProductItems } from "../../actions/productActions";
import { getNewCount } from "../../actions/counterActions";
import { setDefaultSettings } from "../../actions/defaultActions";
import { syncProductsNow } from "../../actions/syncActions";
import { getPersonItems } from "../../actions/personActions";
import {
  getUserItems,
  updateUserItem,
  deleteUserItem
} from "../../actions/userActions";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DataUsage from "@material-ui/icons/DataUsage";
// import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import Button from "../CustomButtons/Button.jsx";
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import Tasks from "../Tasks/Tasks.jsx";
import CustomTabs from "../CustomTabs/CustomTabs.jsx";
import Danger from "../Typography/Danger.jsx";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardAvatar from "../Card/CardAvatar.jsx";
import CardIcon from "../Card/CardIcon.jsx";
import CardBody from "../Card/CardBody.jsx";
import CardFooter from "../Card/CardFooter.jsx";
import SnackbarContent from "../Snackbar/SnackbarContent.jsx";
import { PersianNum } from "../table/common/persiandigit";
import { BeatLoader } from "react-spinners";
import Warning from "../Modal/warning";
import auth from "../../services/authService";

import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

import avatar from "../../assets/img/faces/marc.jpg";

let website = [
  "بعد از اینکه متن در آن قرار گیرد چگونه به نظر می‌رسد و قلم‌ها و اندازه‌بندی‌ها چگونه در نظر گرفته",
  "اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید؟"
];
let server = [
  "گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی؟",
  "از این متن به عنوان عنصری از ترکیب بندی برای پر کردن صفحه و ارایه اولیه شکل ظاهری و کلی طرح سفارش گرفته شده استفاده می نماید، تا از نظر گرافیکی نشانگر چگونگی نوع و اندازه فونت و ظاهر متن باشد. معمولا طراحان گرافیک برای صفحه‌آرایی، نخست از متن‌های آزمایشی ؟",
  "از متن‌های آزمایشی و بی‌معنی استفاده می‌کنند تا صرفا به مشتری یا صاحب کار خود نشان دهند؟"
];

class Dashboard extends React.Component {
  state = {
    value: 0
  };

  componentDidMount() {
    this.props.getProductItems();
    this.props.getPersonItems();
    this.props.getUserItems();
  }

  cancelUser = user => this.props.deleteUserItem(user._id);

  checkUser = user => {
    user.isActive = true;
    delete user.descr;
    this.props.updateUserItem(user);
  };

  makeAdmin = user => {
    user.isAdmin = true;
    delete user.descr;
    this.props.updateUserItem(user);
  };

  undoAdmin = user => {
    user.isAdmin = false;
    delete user.descr;
    this.props.updateUserItem(user);
  };

  handleNewCount = () => {
    this.props.getNewCount();
  };

  handleDefaultSettings = () => {
    this.props.setDefaultSettings();
  };

  handleNikradSync = () => {
    this.props.syncProductsNow();
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const user = auth.getCurrentUser();
    const {
      classes,
      products,
      loading,
      persons,
      users,
      loadingPersons,
      loadingUsers,
      counter,
      loadingCounter
    } = this.props;
    if (
      !products ||
      loading ||
      !persons ||
      loadingPersons ||
      !users ||
      loadingUsers
    )
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#20B2AA"} />
        </div>
      );

    let inActiveUsers = [];
    let activeUsers = [];
    let adminUsers = [];
    let inActiveUserIndexes = [];
    let activeUserIndexes = [];
    let adminUserIndexes = [];
    let activeUserIndex = 0;
    let inActiveUserIndex = 0;
    let adminUserIndex = 0;

    for (let user of users) {
      let inActive = {
        ...user,
        descr: `آیا اجازه فعالیت "${user.name}" را صادر می کنید؟`
      };
      let active = {
        ...user,
        descr: `آیا سطح دسترسی مدیریت برای "${user.name}" را فعال می کنید؟`
      };
      let admin = {
        ...user,
        descr: `آیا می خواهید "${user.name}" را به کاربر عادی تبدیل کنید؟`
      };
      if (!user.isActive) {
        inActiveUsers.push(inActive);
        inActiveUserIndexes.push(inActiveUserIndex++);
      }
      if (user.isActive && !user.isAdmin) {
        activeUsers.push(active);
        activeUserIndexes.push(activeUserIndex++);
      }

      if (user.isActive && user.isAdmin) {
        adminUsers.push(admin);
        adminUserIndexes.push(adminUserIndex++);
      }
    }

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <i className="fa fa-sync" />
                </CardIcon>
                <p className={classes.cardCategory}>فضا مصرف شده</p>
                <h3
                  className={classes.cardTitle}
                  style={{ textAlign: "center" }}
                >
                  {PersianNum("49/50")} <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <i className="fa fa-exclamation-circle ml-2" />
                  </Danger>
                  فضای بیشتری داشته باشید...
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <i className="fa fa-store" />
                </CardIcon>
                <p className={classes.cardCategory}>محصولات</p>
                <h3
                  className={classes.cardTitle}
                  style={{ textAlign: "center" }}
                >
                  {PersianNum(`${products.length}+`)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  ۲۴ ساعت اخیر
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <i className="fa fa-exclamation-circle" />
                </CardIcon>
                <p className={classes.cardCategory}>مشکلات حل شده</p>
                <h3
                  className={classes.cardTitle}
                  style={{ textAlign: "center" }}
                >
                  {PersianNum(75)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  توسط گیت‌هاب
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <i className="fa fa-user" />
                </CardIcon>
                <p className={classes.cardCategory}>اشخاص</p>
                <h3
                  className={classes.cardTitle}
                  style={{ textAlign: "center" }}
                >
                  {PersianNum(`${persons.length}+`)}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  هم‌اکنون
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          {user.isAdmin && (
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>عملیات های سیستم</h4>
                </CardHeader>
                <CardBody>
                  <div className="container">
                    <div className="d-flex justify-content-center">
                      {/* <p>
                        <span
                          className="btn btn-info m-2 ml-5"
                          onClick={() => this.handleNewCount()}
                        >
                          گرفتن شماره
                        </span>
                        <span className="btn btn-warning btn-lg m-2">
                          {counter ? counter.count : "000"}
                        </span>
                      </p> */}

                      <div className="col-6">
                        <Warning
                          item={{
                            _id: 13,
                            title: "همگام سازی محصولات با نیکراد"
                          }}
                          onWarn={this.handleNikradSync}
                          classes="btn-block"
                        />
                      </div>
                      <div className="col-6">
                        <Warning
                          item={{
                            _id: 12,
                            title: "برگشتن به تنظیمات اولیه",
                            descr: "حذف تمام اطلاعات موجود در سیستم!"
                          }}
                          onWarn={this.handleDefaultSettings}
                          classes="btn-block"
                        />
                      </div>
                      {/* <p>
                        <span
                          className="btn btn-warning btn-block m-2 ml-5"
                          onClick={() => this.handleDefaultSettings()}
                        >
                          برگشتن به تنظیمات اولیه
                        </span>
                        <span
                          className="btn btn-warning btn-block m-2 ml-5"
                          onClick={() => this.handleNikradSync()}
                        >
                          همگام سازی محصولات با نیکراد
                        </span>
                      </p> */}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          )}

          {/* <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>اعلان ها</h4>
                <p className={classes.cardCategoryWhite}>
                  يدويا من قبل أصدقائنا من{" "}
                  <a target="_blank" href="https://material-ui-next.com/">
                    واجهة المستخدم المادية
                  </a>{" "}
                  ونصب من قبل{" "}
                  <a target="_blank" href="https://www.creative-tim.com/">
                    الإبداعية تيم
                  </a>
                  . يرجى التحقق من{" "}
                </p>
              </CardHeader>
              <CardBody>
                <SnackbarContent
                  message={
                    'این یک اعلان است که با کلاس color="warning" ایجاد شده است.'
                  }
                  close
                  rtlActive
                  color="warning"
                />
                <SnackbarContent
                  message={
                    'این یک اعلان است که با کلاس color="primary" ایجاد شده است.'
                  }
                  close
                  rtlActive
                  color="primary"
                />
                <SnackbarContent
                  message={"این یک اعلان با دکمه بستن و آیکن است"}
                  close
                  rtlActive
                  color="success"
                />
              </CardBody>
            </Card>
          </GridItem> */}
          {user.isAdmin && (
            <GridItem xs={12} sm={12} md={6}>
              <CustomTabs
                title="وظایف:"
                headerColor="primary"
                rtlActive
                tabs={[
                  {
                    tabName: "کاربران غیر فعال",
                    tabIcon: BugReport,
                    tabContent: (
                      <Tasks
                        checkAction={this.checkUser}
                        cancelAction={this.cancelUser}
                        checkedIndexes={[]}
                        tasksIndexes={inActiveUserIndexes}
                        tasks={inActiveUsers}
                        rtlActive
                      />
                    )
                  },
                  {
                    tabName: "کاربران فعال",
                    tabIcon: Code,
                    tabContent: (
                      <Tasks
                        checkAction={this.makeAdmin}
                        checkedIndexes={[]}
                        tasksIndexes={activeUserIndexes}
                        tasks={activeUsers}
                        rtlActive
                      />
                    )
                  },
                  {
                    tabName: " مدیران",
                    tabIcon: Cloud,
                    tabContent: (
                      <Tasks
                        checkAction={this.undoAdmin}
                        checkedIndexes={[]}
                        tasksIndexes={adminUserIndexes}
                        tasks={adminUsers}
                        rtlActive
                      />
                    )
                  }
                ]}
              />
            </GridItem>
          )}
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  products: state.product.products,
  loading: state.product.loading,
  persons: state.person.persons,
  users: state.user.users,
  loadingPersons: state.person.loadiong,
  loadingUsers: state.user.loadiong,
  counter: state.counter.counter,
  loadingCounter: state.counter.loading
});

export default connect(
  mapStateToProps,
  {
    getProductItems,
    getPersonItems,
    getUserItems,
    updateUserItem,
    deleteUserItem,
    getNewCount,
    setDefaultSettings,
    syncProductsNow
  }
)(withStyles(rtlStyle)(Dashboard));
