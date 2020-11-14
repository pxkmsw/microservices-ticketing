import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NotificationContainer } from "react-notifications";
import routes from "./routes";
import Navigation from "./components/layouts/Navbar";
import ProtectedRoute from "./components/protectedRoute";
import { Login } from "./components/users/login";
import { Register } from "./components/users/register";
import Logout from "./components/users/logout";

import {
  getBusinessColumns,
  getCompanyColumns,
  getProductColumns,
  getPaymentColumns,
  getInvoiceColumns
} from "./services/fakeColumnService";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";

class App extends Component {
  state = {
    listName: "",
    pageName: "",
    addLink: "",
    columns: [],
    links: [],
    selectedGenre: "all",
    sortColumn: { path: "proCode", order: "desc" },
    currentPage: 1,
    pageSize: 20,
    personInfo: false,
    personId: 1,
    activePage: "Home",
    formStep: 0
  };

  componentDidMount() {
    this.handleRouteChange(this.props.location.pathname);
  }

  getBusinessLinks = () => {
    const links = [
      { label: "کسب و کار", link: "/Profiles/Business" },
      { label: "فرد", link: "/Profiles/Person" },
      { label: "کارمند", link: "/Profiles/Employee" }
    ];
    this.setState({ links });
  };

  handleRouteChange = Route => {
    if (Route == "/Profiles/Business") {
      return this.setState({
        listName: "Business",
        pageName: "اشخاص",
        addLink: "/AddPerson",
        columns: getBusinessColumns(),
        currentPage: 1
      });
    }
    if (Route == "/Profiles/Company") {
      return this.setState({
        listName: "Company",
        addLink: "/AddCompany",
        columns: getCompanyColumns(),
        currentPage: 1
      });
    }
    // if (Route.includes("/Financial/Payments")) {
    //   return this.setState({
    //     listName: "Payments",
    //     addLink: "/Financial/AddPayment",
    //     columns: getPaymentColumns(),
    //     currentPage: 1
    //   });
    // }
    // if (Route.includes("/Financial/Invoices")) {
    //   return this.setState({
    //     listName: "Invoices",
    //     addLink: "/Financial/AddInvoice",
    //     columns: getInvoiceColumns(),
    //     currentPage: 1
    //   });
    // }
    if (Route == "/AddPerson") {
      return this.setState({
        pageName: "افزودن شخص"
      });
    }
    if (Route == "/Products") {
      return this.setState({
        listName: "Product",
        pageName: "محصولات",
        addLink: "/AddProduct",
        columns: getProductColumns(),
        currentPage: 1
      });
    }

    if (Route == "/Settings") {
      return this.setState({
        listName: "Settings",
        pageName: "تنظیمات",
        addLink: "/Settings",
        columns: getProductColumns(),
        currentPage: 1
      });
    }
    if (Route == "/AddProduct")
      return this.setState({
        pageName: "افزودن محصول"
      });
  };

  handlePageChange = (page, listName) => {
    if (page == "next") page = this.state.currentPage + 1;
    if (page == "previous") page = this.state.currentPage - 1;

    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn, listName) => this.setState({ sortColumn });

  render() {
    const { activePage } = this.state;
    return (
      <div className="load">
        <ToastContainer />
        <NotificationContainer />
        <Navigation activePage={activePage} onRoute={this.handleRouteChange} />
        <div className="m-3">
          <Switch>
            {routes.map((prop, key) => {
              return (
                <ProtectedRoute
                  path={prop.layout + prop.path}
                  key={key}
                  component={prop.component}
                  state={this.state}
                  properties={prop}
                  onPageChange={this.handlePageChange}
                  onSort={this.handleSort}
                  onRoute={this.handleRouteChange}
                />
              );
            })}
            <Route path="/Logout" component={Logout} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Redirect from="/" to="/Dashboard" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
