import React from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import {
  getCompanyItem,
  addCompanyItem,
  updateCompanyItem
} from "../../actions/companyActions";
import { getMarketSectorItems } from "../../actions/marketSectorActions";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class AddCompany extends Form {
  state = {
    data: {
      name: "",
      city: "",
      marketSector: "",
      marketSectorId: "",
      telephone1: "",
      telephone2: "",
      address: "",
      postalCode: "",
      explanation: ""
    },
    errors: {}
  };

  componentDidMount() {
    this.props.getMarketSectorItems();
    this.handleCleaningForm();
    this.handleEditForm();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id) {
      const { company, loadingCompany } = nextProps;
      if (loadingCompany || !company)
        return (
          <div className="loader">
            <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
          </div>
        );
      this.setState({ data: company });
    }
  }

  handlePreparingForm = data => {
    const { marketSectors } = this.props;
    if (!data.marketSectorId) {
      data.marketSector = marketSectors[0].name;
      data.marketSectorId = marketSectors[0]._id;
    }
    return data;
  };

  handleNotify = name => {
    let msg = "";
    this.props.match.params.id
      ? (msg = " با موفقیت به روزرسانی شد.")
      : (msg = " با موفقیت اضافه شد.");
    NotificationManager.success(name + msg);
  };

  handleEditForm = () => {
    const id = this.props.match.params.id;
    id && this.props.getCompanyItem(id);
  };

  handleBack = () => {
    const { listName } = this.props.state;
    this.props.onRoute(`/Profiles/${listName}`);
    this.props.history.push(`/Profiles/${listName}`);
  };

  doSubmit = data => {
    const result = this.handlePreparingForm(data);

    this.props.match.params.id
      ? this.props.updateCompanyItem(result)
      : this.props.addCompanyItem(result);

    this.handleBack();
    this.handleCleaningForm();
    this.handleNotify(result.name);
  };

  render() {
    const { marketSectors, loadingMarketSectors } = this.props;
    if (!marketSectors || loadingMarketSectors)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#20B2AA"} />
        </div>
      );

    return (
      <React.Fragment>
        <CardHeader color="rose">
          <h4 className={this.props.classes.cardTitleWhite}>افزودن شرکت</h4>
          <p className={this.props.classes.cardCategoryWhite}>
            افزودن شرکت جدید
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.handleFormSubmission} id="addnewform1">
            <div className="row m-2">
              {this.renderSubmitBtn("")}
              {this.renderCancelBtn("لغو")}
            </div>
            <div className="row">
              {this.renderInput("name", "نام", "3", true)}
              {this.renderInput("city", "شهر")}
              {this.renderSelect("marketSector", "حوزه فعالیت", marketSectors)}
              {this.renderInput("telephone1", "تلفن 1")}
              {this.renderInput("telephone2", "تلفن 2")}
              {this.renderInput("address", "آدرس", "5", false)}
              {this.renderInput("postalCode", "کد پستی")}
              {this.renderInput("explanation", "توضیح", "5", false)}
            </div>
          </form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  company: state.company.company,
  loadingCompany: state.company.loading,
  marketSectors: state.marketSector.marketSectors,
  loadingMarketSectors: state.marketSector.loading
});

export default connect(
  mapStateToProps,
  {
    addCompanyItem,
    getCompanyItem,
    updateCompanyItem,
    getMarketSectorItems
  }
)(withStyles(rtlStyle)(AddCompany));
