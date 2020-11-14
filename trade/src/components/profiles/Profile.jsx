import React, { Component } from "react";
import { toast } from "react-toastify";
import auth from "../../services/authService";
import { connect } from "react-redux";
import { getPersonItem, deletePersonItem } from "../../actions/personActions";
import { PersianDigit } from "../table/common/persiandigit";
import Delete from "../Modal/delete";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class Profile extends Component {
  componentDidMount() {
    const personId = this.props.match.params.id;
    this.props.getPersonItem(personId);
  }

  onDelete = item => {
    this.props.deletePersonItem(item._id);
    this.handleBack();
    toast.info(`${item.name} با موفقیت حذف شد.`);
  };

  onEdit = item => {
    this.props.history.push(`/EditPerson/${item._id}`);
  };

  handleBack = () => {
    this.props.onRoute("/Profiles/" + this.props.state.listName);
    this.props.history.push("/Profiles/" + this.props.state.listName);
  };

  render() {
    const user = auth.getCurrentUser();
    const { person, loading } = this.props;

    if (loading || !person)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#FFC300"} />
        </div>
      );
    return (
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={this.props.classes.cardTitleWhite}>جزئیات شخص</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              جزئیات {person.name}
            </p>
          </CardHeader>
          <CardBody>
            <React.Fragment>
              <div className="row m-2">
                <button
                  className="btn btn-lg btn-info m-2 shadow rounded"
                  onClick={this.handleBack}
                >
                  <i className="fa fa-arrow-right" />
                </button>
                <button
                  className="btn btn-lg btn-dark m-2 shadow rounded"
                  onClick={() => this.onEdit(person)}
                >
                  <i className="fa fa-wrench" />
                </button>
                {user.isAdmin && (
                  <Delete
                    onDelete={this.onDelete}
                    item={person}
                    classes="btn-lg m-2"
                  />
                )}
              </div>
              <p className="list-group m-2">
                <span className="list-group-item">
                  هویت :
                  <span style={{ fontWeight: "600" }}>{person.identity}</span>
                </span>
                <span className="list-group-item">
                  نام و نام خانوادگی :
                  <span style={{ fontWeight: "600" }}>{person.name}</span>
                </span>

                <span className="list-group-item">
                  نام کسب و کار :
                  <span style={{ fontWeight: "600" }}>{person.company}</span>
                </span>

                <span className="list-group-item">
                  حوزه فعالیت :
                  <span style={{ fontWeight: "600" }}>
                    {person.marketSector}
                  </span>
                </span>

                <span className="list-group-item">
                  شماره موبایل :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.mobile}</PersianDigit>
                  </span>
                </span>
                <span className="list-group-item">
                  <span className="row">
                    <span className="col-6">
                      تلفن :
                      <span style={{ fontWeight: "600" }}>
                        <PersianDigit>{person.telephone}</PersianDigit>
                      </span>
                    </span>
                    <span className="col-6">
                      داخلی :
                      <span style={{ fontWeight: "600" }}>
                        <PersianDigit>{person.telExtention}</PersianDigit>
                      </span>
                    </span>
                  </span>
                </span>
                <span className="list-group-item">
                  کد پستی :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.postalCode}</PersianDigit>
                  </span>
                </span>

                <span className="list-group-item">
                  استان :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.state}</PersianDigit>
                  </span>
                </span>
                <span className="list-group-item">
                  شهر :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.city}</PersianDigit>
                  </span>
                </span>

                <span className="list-group-item">
                  آدرس :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.address}</PersianDigit>
                  </span>
                </span>
                <span className="list-group-item">
                  اعتبار :
                  <span style={{ fontWeight: "600" }}>
                    <PersianDigit>{person.credit}</PersianDigit>
                  </span>
                </span>
              </p>
            </React.Fragment>
          </CardBody>
        </Card>
      </GridItem>
    );
  }
}

const mapStateToProps = state => ({
  person: state.person.person,
  loading: state.person.loading
});

export default connect(
  mapStateToProps,
  { getPersonItem, deletePersonItem }
)(withStyles(rtlStyle)(Profile));
