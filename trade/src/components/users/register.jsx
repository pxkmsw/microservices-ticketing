import React, { Component } from "react";
import Form from "../form/form";
import { EngNum } from "../table/common/persiandigit";
import { ToastContainer, toast } from "react-toastify";

import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

import * as userService from "../../services/userService";
import auth from "../../services/authService";

export class Register extends Form {
  state = {
    data: {
      name: "",
      username: "",
      password: ""
    },
    errors: {}
  };

  doSubmit = async data => {
    try {
      const response = await userService.register(data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      this.handleCleaningForm();
      window.location = "/Dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.info(data.username + " قبلا ثبت شده است !");
      }
    }
  };

  render() {
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose">
            <h4>ثبت نام کاربران</h4>
            <p>ثبت نام در سامانه مدیریت کسب و کار</p>
          </CardHeader>
          <CardBody>
            <form
              onSubmit={this.handleFormSubmission}
              id="addnewform1"
              className="container"
            >
              <div className="row">
                <div className="col-6">
                  {this.renderInput("name", "نام و نام خانوادگی", "8", true)}

                  {this.renderInput("username", "نام کاربری", "8", true)}

                  {this.renderInput(
                    "password",
                    "رمز عبور",
                    "8",
                    true,
                    "password"
                  )}
                  <div className="row m-2 d-flex justify-content-start mr-5">
                    {this.renderSubmitBtn("ثبت نام")}
                  </div>
                </div>

                <div className="col-5 mt-5 mr-5">
                  <img src="../../2.2.jpg" style={{ width: "300px" }} />
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

export default withStyles(rtlStyle)(Register);
