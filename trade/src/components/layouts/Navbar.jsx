import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getSettingItems } from "../../actions/settingActions";
import auth from "../../services/authService";

export class Navigation extends Component {
  componentDidMount() {
    this.props.getSettingItems();
  }
  handlePrint = () => {
    window.print();
    return false;
  };
  render() {
    const user = auth.getCurrentUser();
    const { onRoute, settings } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand mr-auto ml-5" to="/">
          سیستم مدیریت بازرگانی
        </NavLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Dashboard"
                    onClick={() => onRoute("/Dashboard")}
                  >
                    داشبورد <i className="fa fa-chart-line"></i>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Products"
                    onClick={() => onRoute("/Products")}
                  >
                    محصولات <i className="fa fa-box-open"></i>
                  </NavLink>
                </li>

                {((settings && settings[0] && settings[0].personsAccess) ||
                  user.isAdmin) && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/Profiles/Business"
                      onClick={() => onRoute("/Profiles/Business")}
                    >
                      اشخاص <i className="fa fa-user"></i>
                    </NavLink>
                  </li>
                )}
                {((settings && settings[0] && settings[0].companiesAccess) ||
                  user.isAdmin) && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/Profiles/Company"
                      onClick={() => onRoute("/Profiles/Company")}
                    >
                      شرکت ها <i className="fa fa-building"></i>
                    </NavLink>
                  </li>
                )}
                {((settings && settings[0] && settings[0].tradeAccess) ||
                  user.isAdmin) && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/Trade"
                      onClick={() => onRoute("/Trade")}
                    >
                      بازرگانی <i className="fa fa-truck"></i>
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/FinDashboard"
                    onClick={() => onRoute("/FinDashboard")}
                  >
                    مالی <i className="fa fa-credit-card"></i>
                  </NavLink>
                </li>
                {user.isAdmin && (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/Settings"
                      onClick={() => onRoute("/Settings")}
                    >
                      تنظیمات <i className="fa fa-cogs"></i>
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Logout">
                    خروج از حساب <i className="fa fa-sign-out-alt"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#">
                    {user.name} <i className="fa fa-smile"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => this.handlePrint()}>
                    <i className="fa fa-print"></i>
                  </span>
                </li>
              </React.Fragment>
            )}
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Register"
                    onClick={() => onRoute("/Register")}
                  >
                    ثبت نام <i className="fa fa-clipboard"></i>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Login"
                    onClick={() => onRoute("/Login")}
                  >
                    ورود به حساب کاربری <i className="fa fa-sign-in-alt"></i>
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
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
)(withRouter(Navigation));
