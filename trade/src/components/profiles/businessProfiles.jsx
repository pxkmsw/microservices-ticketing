import React, { Component } from "react";
import ListPage from "../table/listPage";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getPersonItems, deletePersonItem } from "../../actions/personActions";
import Notifications from "../dashboard/Notifications";
import { BeatLoader } from "react-spinners";
import { getSettingItems } from "../../actions/settingActions";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class BusinessProfiles extends Notifications {
  componentDidMount() {
    this.props.getPersonItems();
    this.props.getSettingItems();
  }

  handleProfileDetail = item => {
    this.props.history.push(`/Profiles/${item._id}`);
  };

  handleEditTableItem = item => {
    this.props.history.push(`/EditPerson/${item._id}`);
  };

  handleDeleteTableItem = item => {
    this.props.deletePersonItem(item._id);
    this.showNotification(`${item.name} با موفقیت حذف شد.`, "danger");
  };

  // handleLikeItem = item => {
  //   const items = [...this.state.items];
  //   const index = items.indexOf(item);
  //   items[index].liked = !items[index].liked;
  //   this.setState({
  //     items
  //   });
  // };

  // handleTypesFilter = (type, listName) => {
  //   if (listName == "Business") {
  //     this.setState({
  //       items:
  //         type.name && type.id
  //           ? getBusinessItems().filter(item => item.type == type.name)
  //           : getBusinessItems(),
  //       selectedGenre: type == "all" ? "all" : type.name,
  //       currentPage: 1
  //     });
  //   } else if (listName == "Employee") {
  //     this.setState({
  //       items:
  //         type.name && type.id
  //           ? getEmployeeItems().filter(item => item.type == type.name)
  //           : getEmployeeItems(),
  //       selectedGenre: type == "all" ? "all" : type.name,
  //       currentPage: 1
  //     });
  //   } else if (listName == "Person") {
  //     this.setState({
  //       items:
  //         type.name && type.id
  //           ? getCustomerItems().filter(item => item.type == type.name)
  //           : getCustomerItems(),
  //       selectedGenre: type == "all" ? "all" : type.name,
  //       currentPage: 1
  //     });
  //   }
  // };

  render() {
    const {
      persons,
      loadingPersons,
      settings,
      loadingSetting,
      ...rest
    } = this.props;
    if (loadingPersons || !persons)
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
          items={persons}
          onDetail={this.handleProfileDetail}
          onEdit={this.handleEditTableItem}
          onDelete={this.handleDeleteTableItem}
          settings={settings}
          {...rest}
        />{" "}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  persons: state.person.persons,
  loadingPersons: state.person.loading,
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getPersonItems, deletePersonItem, getSettingItems }
)(withStyles(rtlStyle)(BusinessProfiles));
