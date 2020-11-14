import React from "react";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import {
  getPersonItem,
  addPersonItem,
  updatePersonItem
} from "../../actions/personActions";
import { getIdentityItems } from "../../actions/identityActions";
import {
  getMarketSectorItems,
  addMarketSectorItem,
  deleteMarketSectorItem,
  updateMarketSectorItem
} from "../../actions/marketSectorActions";
import {
  getOfficeSectorItems,
  addOfficeSectorItem,
  deleteOfficeSectorItem,
  updateOfficeSectorItem
} from "../../actions/officeSectorActions";
import { getCompanyItems } from "../../actions/companyActions";
import ItemsModalView from "../Modal/itemsModalView";
import Form from "../form/form";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class AddPerson extends Form {
  state = {
    data: {
      identity: "",
      identityId: "",
      name: "",
      company: "",
      companyId: "",
      officeSector: "",
      officeSectorId: "",
      marketSector: "",
      marketSectorId: "",
      telephone: "",
      telExtention: "",
      mobile: "",
      postalCode: "",
      state: "",
      city: "",
      address: "",
      credit: "",
      explanation: ""
    },
    errors: {},
    modal: false
  };

  componentDidMount() {
    this.props.getIdentityItems();
    this.props.getCompanyItems();
    this.props.getMarketSectorItems();
    this.props.getOfficeSectorItems();
    this.handleCleaningForm();
    this.handleEditForm();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id) {
      const { person, loadingPerson } = nextProps;
      if (loadingPerson || !person)
        return (
          <div className="loader">
            <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
          </div>
        );
      this.setState({ data: person });
    }
  }

  handlePreparingForm = data => {
    const { identities, companies, marketSectors, officeSectors } = this.props;

    if (!data.identityId) {
      data.identity = identities[0].name;
      data.identityId = identities[0]._id;
    }
    if (!data.companyId) {
      data.company = companies[0].name;
      data.companyId = companies[0]._id;
    }
    if (!data.marketSectorId) {
      data.marketSector = marketSectors[0].name;
      data.marketSectorId = marketSectors[0]._id;
    }
    if (!data.officeSectorId) {
      data.officeSector = officeSectors[0].name;
      data.officeSectorId = officeSectors[0]._id;
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
  onAddMarketSectorItem = name => {
    this.props.addMarketSectorItem({ name });
    name && NotificationManager.success(name + " با موفقیت اضافه شد.");
  };

  onDeleteMarketSectorItem = item => {
    this.props.deleteMarketSectorItem(item._id);
    NotificationManager.success(item.name + " با موفقیت حذف شد.");
  };

  onEditMarketSectorItem = item => {
    this.props.updateMarketSectorItem(item);
    item.name &&
      NotificationManager.success(item.name + " با موفقیت به روز رسانی شد.");
  };

  onAddOfficeSectorItem = name => {
    this.props.addOfficeSectorItem({ name });
    name && NotificationManager.success(name + " با موفقیت اضافه شد.");
  };

  onDeleteOfficeSectorItem = item => {
    this.props.deleteOfficeSectorItem(item._id);
    NotificationManager.success(item.name + " با موفقیت حذف شد.");
  };

  onEditOfficeSectorItem = item => {
    this.props.updateOfficeSectorItem(item);
    item.name &&
      NotificationManager.success(item.name + " با موفقیت به روز رسانی شد.");
  };

  handleEditForm = () => {
    const id = this.props.match.params.id;
    id && this.props.getPersonItem(id);
  };

  handleBack = () => {
    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
  };

  doSubmit = data => {
    const result = this.handlePreparingForm(data);

    this.props.match.params.id
      ? this.props.updatePersonItem(result)
      : this.props.addPersonItem(result);

    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
    this.handleCleaningForm();
    this.handleNotify(result.name);
  };

  render() {
    const {
      identities,
      companies,
      marketSectors,
      officeSectors,
      loadingCompanies,
      loadingIdentities,
      loadingMarketSectors,
      loadingOfficeSectors
    } = this.props;
    if (
      !identities ||
      !companies ||
      !marketSectors ||
      !officeSectors ||
      loadingCompanies ||
      loadingIdentities ||
      loadingMarketSectors ||
      loadingOfficeSectors
    )
      return <h1>Loading ...</h1>;

    return (
      <React.Fragment>
        <CardHeader color="rose">
          <h4 className={this.props.classes.cardTitleWhite}>افزودن شخص</h4>
          <p className={this.props.classes.cardCategoryWhite}>
            افزودن شخص جدید
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.handleFormSubmission} id="addnewform1">
            <div className="row m-2">
              {this.renderSubmitBtn("")}
              {this.renderCancelBtn("لغو")}
              <button
                type="button"
                className={`btn btn-dark shadow rounded btn-lg m-2`}
                onClick={() => this.setState({ modal: true })}
                data-toggle="modal"
                data-target={"#abc2"}
              >
                واحدهای سازمان
              </button>
              {this.state.modal && (
                <ItemsModalView
                  id="abc2"
                  title="واحدهای سازمان"
                  items={officeSectors}
                  onAdd={this.onAddOfficeSectorItem}
                  onEdit={this.onEditOfficeSectorItem}
                  onDelete={this.onDeleteOfficeSectorItem}
                  classes="btn-lg m-2"
                />
              )}
              <button
                type="button"
                className={`btn btn-dark shadow rounded btn-lg m-2`}
                onClick={() => this.setState({ modal: true })}
                data-toggle="modal"
                data-target={"#abc1"}
              >
                حوزه های فعالیت
              </button>
              {this.state.modal && (
                <ItemsModalView
                  title="حوزه های فعالیت"
                  id="abc1"
                  items={marketSectors}
                  onAdd={this.onAddMarketSectorItem}
                  onEdit={this.onEditMarketSectorItem}
                  onDelete={this.onDeleteMarketSectorItem}
                  classes="btn-lg m-2"
                />
              )}
            </div>
            <div className="row">
              {this.renderInput("name", "نام و نام خانوادگی", "3", true)}
              {this.renderSelect("identity", "هویت", identities)}
              {this.renderSelect("officeSector", "واحد سازمانی", officeSectors)}
              {this.renderSelect("marketSector", "حوزه فعالیت", marketSectors)}
              {this.renderSelect("company", "نام کسب و کار", companies)}
              {this.renderInput("mobile", "شماره موبایل", "3", true)}
              {this.renderInput("telephone", "تلفن")}
              {this.renderInput("telExtention", "تلفن داخلی")}
              {this.renderInput("postalCode", "کد پستی")}
              {this.renderInput("state", "استان")}
              {this.renderInput("city", "شهر")}
              {this.renderInput("address", "آدرس", "5", false)}
              {this.renderInput("credit", "اعتبار")}
            </div>
          </form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  person: state.person.person,
  loadingPerson: state.person.loading,
  companies: state.company.companies,
  loadingCompanies: state.company.loading,
  identities: state.identity.identities,
  loadingIdentities: state.identity.loading,
  marketSectors: state.marketSector.marketSectors,
  loadingMarketSectors: state.marketSector.loading,
  officeSectors: state.officeSector.officeSectors,
  loadingOfficeSectors: state.officeSector.loading
});

export default connect(
  mapStateToProps,
  {
    addPersonItem,
    getPersonItem,
    updatePersonItem,
    getCompanyItems,
    getIdentityItems,
    getMarketSectorItems,
    addMarketSectorItem,
    deleteMarketSectorItem,
    updateMarketSectorItem,
    getOfficeSectorItems,
    addOfficeSectorItem,
    deleteOfficeSectorItem,
    updateOfficeSectorItem
  }
)(withStyles(rtlStyle)(AddPerson));
