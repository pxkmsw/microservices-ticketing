import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import FullList from "../../components/table/fullList";
import routes from "../../routes.js";

export class profiles extends Component {
  render() {
    const {
      listName,
      columns,
      items,
      genres,
      selectedGenre,
      sortColumn,
      onDeleteTableItem,
      onEditTableItem,
      onLikeItem,
      currentPage,
      pageSize,
      onPageChange,
      onGenreChange,
      onSort
    } = this.props;

    return (
      <React.Fragment>
        <div className="m-3">
          <Switch>
            {routes.map((prop, key) => {
              if (prop.layout === "/Profiles") {
                return (
                  <Route
                    path={prop.layout + prop.path}
                    key={key}
                    render={props => (
                      <prop.component
                        listName={prop.name}
                        columns={columns}
                        items={items}
                        genres={genres}
                        selectedGenre={selectedGenre}
                        sortColumn={sortColumn}
                        onDeleteTableItem={onDeleteTableItem}
                        onEditTableItem={onEditTableItem}
                        onLikeItem={onLikeItem}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        onGenreChange={onGenreChange}
                        onSort={onSort}
                      />
                    )}
                  />
                );
              }
            })}
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(profiles);
