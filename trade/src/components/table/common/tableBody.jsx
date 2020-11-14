import React, { Component } from "react";
import auth from "../../../services/authService";
import uuid from "uuid";
import Delete from "../../Modal/delete";
import Diversity from "../../Modal/diversity";
import { connect } from "react-redux";
import { getSettingItems } from "../../../actions/settingActions";
import Like from "./like";
import _ from "lodash";
import { PersianNum, EngNum } from "./persiandigit";

class TableBody extends Component {
  componentDidMount() {
    this.props.getSettingItems();
  }

  getDots = string => {
    if (string.length > 40) return string.substring(0, 40) + "...";
    return string;
  };

  renderCell = (item, column) => {
    if (column.path == "img") {
      let path = "../../";
      if (_.get(item, column.path) && _.get(item, column.path).includes("http"))
        path = "";
      return (
        <div className="thumbnail-small">
          <img
            className="shadow rounded"
            src={
              _.get(item, column.path) && `${path}${_.get(item, column.path)}`
            }
          />
        </div>
      );
    } else if (column.path.includes("Price"))
      return (
        _.get(item, column.path) &&
        PersianNum(parseInt(_.get(item, column.path)).toLocaleString())
      );
    else if (
      column.path == "imgFiles" ||
      column.path == "imgFile" ||
      column.path == "file" ||
      column.path == "files" ||
      column.path == "imgs"
    ) {
      return;
    } else return this.getDots(PersianNum(_.get(item, column.path)));
  };

  generateKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const user = auth.getCurrentUser();
    const {
      pageItems,
      columns,
      onDelete,
      onEdit,
      onTrade,
      onDiversity,
      onLikeItem,
      listName,
      onDetail,
      settings,
      loadingSetting
    } = this.props;
    // if (loadingSetting && !settings) return <h1>Loading...</h1>;
    return (
      <tbody>
        {pageItems.map(item => (
          <tr key={uuid.v4()}>
            {columns.map(column => (
              <td
                onClick={() => onDetail(item)}
                style={{ cursor: "pointer" }}
                key={uuid.v4()}
              >
                {this.renderCell(item, column)}
              </td>
            ))}
            {/* <td key={uuid.v4()}>
              <Like movie={item} onClick={() => onLikeItem(item, listName)} />
            </td> */}
            <td key={uuid.v4()} style={{ float: "left" }} className="no-print">
              {listName == "Product" && (
                <a
                  className="btn btn-raised btn-primary ml-2 shadow rounded"
                  data-placement="top"
                  title="در وبسایت"
                  target="_blank"
                  href={item.webLink}
                >
                  <i className="fa fa-link" />
                </a>
              )}
              {listName == "Product" &&
                ((settings && settings[0] && settings[0].addAction) ||
                  user.isAdmin) && (
                  <Diversity
                    onDiversity={onDiversity}
                    item={item}
                    classes="ml-2"
                  />
                )}
              {listName == "Product" &&
                ((settings && settings[0] && settings[0].processAction) ||
                  user.isAdmin) && (
                  <button
                    className="btn btn-raised btn-secondary ml-2 shadow rounded"
                    data-placement="top"
                    title="بازرگانی"
                    onClick={() => onTrade(item)}
                  >
                    <i className="fa fa-calculator" />
                  </button>
                )}
              {((settings && settings[0] && settings[0].editAction) ||
                user.isAdmin) && (
                <button
                  className="btn btn-raised btn-dark ml-2 shadow rounded"
                  data-placement="top"
                  title="ویرایش"
                  onClick={() => onEdit(item)}
                >
                  <i className="fa fa-wrench" />
                </button>
              )}

              {((settings && settings[0] && settings[0].deleteAction) ||
                user.isAdmin) && <Delete onDelete={onDelete} item={item} />}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
const mapStateToProps = state => ({
  settings: state.setting.settings,
  loadingSetting: state.setting.loading
});

export default connect(
  mapStateToProps,
  { getSettingItems }
)(TableBody);
