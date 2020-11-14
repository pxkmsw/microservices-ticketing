import React, { Component } from "react";
import TreeMenu from "react-simple-tree-menu";
import { connect } from "react-redux";
import {
  getAccountItems,
  deleteAccountItem
} from "../../actions/accountActions";
import { Link } from "react-router-dom";
import { PersianNum } from "../table/common/persiandigit";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import DeleteIcon from "../modal/deleteIcon";
import CardBody from "../Card/CardBody";
import { BeatLoader } from "react-spinners";
import Notifications from "../dashboard/Notifications";
import CardHeader from "../Card/CardHeader";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

class FinDahsboard extends Notifications {
  state = {
    treeData: [{ title: "Chicken", children: [{ title: "Egg" }] }]
  };

  componentDidMount() {
    this.props.getAccountItems();
  }

  handleLink = id => {
    const link = `/Financial/Payments/${id}`;
    this.props.history.push(link);
    this.props.onRoute(`/Financial/Payments`);
  };

  handleDelete = item => {
    this.props.deleteAccountItem(item._id);
    this.showNotification(`${item.name} با موفقیت حذف شد.`, "danger");
  };

  handleShow = item => {
    const state = {};
    Object.keys(this.state).map(key => {
      state[key] = false;
    });
    state[item] = true;
    this.setState({ ...state });
  };

  handleShowDetail = item => {
    const details = {};
    Object.keys(this.state.details).map(key => {
      details[key] = false;
    });
    details[item] = true;
    this.setState({ details });
  };

  render() {
    // const treeData = [
    //   {
    //     key: "first-level-node-1",
    //     label: "دارائی ها",
    //     nodes: [
    //       {
    //         key: "second-level-node-1",
    //         label: "موجودی نقد و بانک",
    //         nodes: [
    //           {
    //             key: "third-level-node-1",
    //             label: (
    //               <span
    //                 onClick={() => this.this.handleLink("/Financial/Assets/Funds")}
    //               >
    //                 صندوق
    //               </span>
    //             )
    //           },
    //           {
    //             key: "third-level-node-2",
    //             label: "بانک"
    //           },
    //           {
    //             key: "third-level-node-3",
    //             label: "تنخواه گردان"
    //           }
    //         ]
    //       },
    //       {
    //         key: "second-level-node-2",
    //         label: "اسناد دریافتنی"
    //       },
    //       {
    //         key: "second-level-node-3",
    //         label: "اسناد پرداختنی"
    //       }
    //     ]
    //   },
    //   {
    //     key: "first-level-node-2",
    //     label: "بدهی ها"
    //   },
    //   {
    //     key: "first-level-node-3",
    //     label: "حساب های سود و زیانی"
    //   }
    // ];
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          backgroundColor: color,
          width: "90%"
        }}
      />
    );
    const { accounts, loading, onRoute } = this.props;
    if (!accounts || loading)
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#20B2AA"} />
        </div>
      );

    const treeData = [];
    let newAccounts = [...accounts];
    newAccounts.map((account, i) => {
      if (account.code.toString().length <= 2)
        treeData.push({
          key: account._id,
          code: account.code,
          label: (
            <p>
              <Link to={`/Financial/EditAccount/${account._id}`}>
                <i
                  className="fa fa-wrench ml-3 text-dark"
                  data-placement="top"
                  title="ویرایش"
                />
              </Link>
              <DeleteIcon
                key={`del-${account._id}`}
                item={account}
                onDelete={this.handleDelete}
                classes="ml-3"
              />
              <span>{PersianNum(`${account.name} : ${account.code}`)}</span>
            </p>
          ),
          nodes: []
        });
    });

    newAccounts.map(account => {
      if (account.code.toString().length == 3) {
        let index = treeData.findIndex(
          x => account.code.toString()[0] === x.code.toString()
        );
        treeData[index] &&
          treeData[index].nodes.push({
            key: account._id,
            code: account.code,
            label: (
              <p>
                <Link to={`/Financial/EditAccount/${account._id}`}>
                  <i
                    className="fa fa-wrench ml-3 text-dark"
                    data-placement="top"
                    title="ویرایش"
                  />
                </Link>
                <DeleteIcon
                  key={`del-${account._id}`}
                  item={account}
                  onDelete={this.handleDelete}
                  classes="ml-3"
                />
                <span onClick={() => this.handleLink(account._id)}>
                  {PersianNum(`${account.name} : ${account.code}`)}
                </span>
              </p>
            ),
            nodes: []
          });
      }
    });

    newAccounts.map(account => {
      if (account.code.toString().length == 6) {
        let index = treeData.findIndex(
          x => account.code.toString()[0] === x.code.toString()
        );
        let nodeIndex =
          treeData[index] &&
          treeData[index].nodes.findIndex(
            x => account.code.toString().slice(0, 3) === x.code.toString()
          );
        treeData[index].nodes[nodeIndex] &&
          treeData[index].nodes[nodeIndex].nodes.push({
            key: account._id,
            code: account.code,
            label: (
              <p>
                <Link to={`/Financial/EditAccount/${account._id}`}>
                  <i
                    className="fa fa-wrench ml-3 text-dark"
                    data-placement="top"
                    title="ویرایش"
                  />
                </Link>
                <DeleteIcon
                  key={`del-${account._id}`}
                  item={account}
                  onDelete={this.handleDelete}
                  classes="ml-3"
                />
                <span onClick={() => this.handleLink(account._id)}>
                  {PersianNum(`${account.name} : ${account.code}`)}
                </span>
              </p>
            ),
            nodes: []
          });
      }
    });

    newAccounts.map(account => {
      if (account.code.toString().length == 9) {
        let index = treeData.findIndex(
          x => account.code.toString()[0] === x.code.toString()
        );
        let nodeIndex =
          treeData[index] &&
          treeData[index].nodes.findIndex(
            x => account.code.toString().slice(0, 3) === x.code.toString()
          );
        let childNodeIndex =
          treeData[index] &&
          treeData[index].nodes[nodeIndex].nodes.findIndex(
            x => account.code.toString().slice(0, 6) === x.code.toString()
          );
        treeData[index].nodes[nodeIndex].nodes[childNodeIndex] &&
          treeData[index].nodes[nodeIndex].nodes[childNodeIndex].nodes.push({
            key: account._id,
            code: account.code,
            label: (
              <p>
                <Link to={`/Financial/EditAccount/${account._id}`}>
                  <i
                    className="fa fa-wrench ml-3 text-dark"
                    data-placement="top"
                    title="ویرایش"
                  />
                </Link>
                <DeleteIcon
                  key={`del-${account._id}`}
                  item={account}
                  onDelete={this.handleDelete}
                  classes="ml-3"
                />
                <span onClick={() => this.handleLink(account._id)}>
                  {PersianNum(`${account.name} : ${account.code}`)}
                </span>
              </p>
            ),
            nodes: []
          });
      }
    });
    return (
      <React.Fragment>
        <CardHeader color="info">
          <h4 className={this.props.classes.cardTitleWhite}>داشبورد مالی</h4>
          <p className={this.props.classes.cardCategoryWhite}>داشبورد مالی</p>
        </CardHeader>
        <CardBody>
          <React.Fragment>
            <div className="row">
              <div className="list-group p-4 text-center col-12">
                <div className="row d-flex justify-content-center">
                  <Link
                    className={`btn btn-info btn-block btn-lg m-2 col-3 shadow`}
                    to="/Financial/AllPayments"
                  >
                    دریافت ها / پرداخت ها
                  </Link>
                  {/* <Link
                      className={`btn btn-info btn-block btn-lg m-2 col-3 shadow`}
                      to="/Financial/AddInvoice"
                    >
                      صدور فاکتور جدید
                    </Link> */}
                  <Link
                    className={`btn btn-info btn-block btn-lg m-2 col-3 shadow`}
                    to="/Financial/Invoices"
                  >
                    فاکتور ها
                  </Link>
                  <Link
                    className={`btn btn-info btn-block btn-lg m-2 col-3 shadow`}
                    to="/Financial/AddAccount"
                  >
                    حساب جدید
                  </Link>
                </div>

                <ColoredLine color="black" />
                <div id="treelist">
                  <TreeMenu data={treeData} />
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
  accounts: state.account.accounts,
  loading: state.account.loading
});

export default connect(
  mapStateToProps,
  { getAccountItems, deleteAccountItem }
)(withStyles(rtlStyle)(FinDahsboard));
