import React, { Component } from "react";
import Pagination from "./common/pagination";
import Paginate from "./common/paginate";
import ListItem from "./listItem";
import Table from "../table/table";
import _ from "lodash";
import Search from "./common/search";
import ItemsCount from "./common/itemsCount";
import { PersianNum, EngNum } from "./common/persiandigit";

export class FullList extends Component {
  state = {
    items: [],
    search: ""
  };

  handleSearch = search => {
    const { items } = this.props;
    if (search != "") {
      const filteredItems = items.filter(
        i =>
          (i.name && i.name.includes(search)) ||
          (i.diverseCode && i.diverseCode.toString().includes(search)) ||
          (i.proCode && i.proCode.toString().includes(EngNum(search))) ||
          (i.category && i.category.includes(search)) ||
          (i.color && i.color.includes(search)) ||
          (i.mobile && i.mobile.toString().includes(EngNum(search))) ||
          (i.identity && i.identity.includes(search)) ||
          (i.city && i.city.includes(search)) ||
          (i.marketSector && i.marketSector.includes(search)) ||
          (i.company && i.company.includes(search))
      );
      this.props.onPageChange(1);
      this.setState({ items: filteredItems, search });
    } else {
      this.setState({ items, search });
    }
  };

  render() {
    const { state, classes, onPageChange, onGenreChange, ...rest } = this.props;

    const {
      user,
      listName,
      columns,
      sortColumn,
      currentPage,
      pageSize,
      settings,
      types,
      selectedGenre
    } = state;

    const searchedItems =
      this.state.search == "" ? this.props.items : this.state.items;
    const sortedItems = _.orderBy(
      searchedItems,
      [sortColumn.path],
      [sortColumn.order]
    );
    const pageItems = Paginate(sortedItems, pageSize, currentPage);

    return (
      <React.Fragment>
        <div className="m-4">
          {/* <div className="col-3">
            <ListItem
              listName={listName}
              types={types}
              onGenreChange={onGenreChange}
              selectedGenre={selectedGenre}
            />
          </div> */}
          <Search
            search={PersianNum(this.state.search)}
            onSearch={this.handleSearch}
          />
          <ItemsCount itemsCount={PersianNum(sortedItems.length)} />
          <Table
            user={user}
            listName={listName}
            sortColumn={sortColumn}
            pageItems={pageItems}
            columns={columns}
            {...rest}
          />
          <Pagination
            listName={listName}
            pageSize={pageSize}
            currentPage={currentPage}
            itemsCount={sortedItems.length}
            onPageChange={onPageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default FullList;
