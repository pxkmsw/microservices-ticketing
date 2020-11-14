import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import FormValidate from "./formValidate";
import uuid from "uuid";
import { PersianNum, EngNum } from "../table/common/persiandigit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faImage,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";
import Input from "./input";
import Select from "./select";
import UploadImg from "./uploadImg";
import Check from "./check";

export default class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  handleFormChange = e => {
    let data = { ...this.state.data };
    if (e.target.files) {
      if (e.target.name == "img") {
        data.img = e.target.files[0].name;
        data.file = e.target.files[0];
        data.imgFile = [URL.createObjectURL(e.target.files[0])];
        this.setState({ data });
      } else if (e.target.name == "imgs") {
        data.imgs = [];
        data.imgFiles = [];
        data.files = [];
        for (let file of e.target.files) {
          data.imgs.push(file.name);
          data.files.push(file);
          data.imgFiles.push([URL.createObjectURL(file)]);
        }
        this.setState({ data });
      }
    } else if (e.target.type === "select-one") {
      data[e.target.name] = e.target.value;
      var index = e.target.selectedIndex;
      var optionElement = e.target.childNodes[index];
      var optionId = optionElement.getAttribute("id");
      data[e.target.name + "Id"] = optionId;
      if (e.target.name == "category") data.subCategoryId = 0;
      const errors = FormValidate(e);
      this.setState({ data, errors });
    } else if (e.target.type == "checkbox") {
      data[e.target.value] = e.target.checked;
      this.setState({ data });
    } else if (
      e.target.value &&
      e.target.name.includes("Price") &&
      e.target.name !== "buyingPriceHistory"
    ) {
      const clearValue = e.target.value.replace(/,/g, "");
      const value = EngNum(clearValue);
      data[e.target.name] = PersianNum(parseInt(value).toLocaleString());
      const errors = FormValidate(e);
      this.setState({ data, errors });
    } else {
      data[e.target.name] = PersianNum(e.target.value);
      const errors = FormValidate(e);
      this.setState({ data, errors });
    }
  };

  handleFormSubmission = e => {
    e.preventDefault();
    let data = { ...this.state.data };
    for (let i = 0; i < Object.keys(e.target).length; i++) {
      if (
        e.target[i] &&
        e.target[i].name !== "img" &&
        e.target[i].name !== "file" &&
        e.target[i].name !== "imgs" &&
        e.target[i].name !== "submit"
      ) {
        if (e.target[i].name.includes("Price")) {
          e.target[i].value = e.target[i].value.replace(/,/g, "");
        }
        data[e.target[i].name] = EngNum(e.target[i].value);
      }
    }
    this.doSubmit(data);
  };

  handleCleaningForm = () => {
    const data = { ...this.state.data };
    for (let key in data) data[key] = "";
    this.setState({ data });
  };

  renderSubmitBtn = (label = "", color = "info", style = false) => {
    function getSubmitStyle(style) {
      if (style === false)
        return { backgroundColor: "#e91e63", borderColor: "#e91e63" };
    }
    return (
      <button
        type="submit"
        name="submit"
        className={`btn btn-lg btn-${color} m-2 shadow-lg rounded`}
        data-placement="top"
        title="ذخیره"
        style={getSubmitStyle(style)}
      >
        {label === "" && <i className="fa fa-arrow-down" />}
        {label !== "" && label}
      </button>
    );
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getPersonSuggestions = value => {
    const inputLength = value.length;

    return inputLength === 0
      ? []
      : this.state.allPersonOptions.filter(lang => lang.name.includes(value));
  };
  getProductSuggestions = value => {
    const inputLength = value.length;

    return inputLength === 0
      ? []
      : this.state.allProductOptions.filter(lang => lang.name.includes(value));
  };
  getInvoiceSuggestions = value => {
    const inputLength = value.length;

    return inputLength === 0
      ? []
      : this.state.allInvoiceOptions.filter(lang => lang.name.includes(value));
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onPersonSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      personSuggestions: this.getPersonSuggestions(value)
    });
  };
  onProductSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      productSuggestions: this.getProductSuggestions(value)
    });
  };
  onInvoiceSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      invoiceSuggestions: this.getInvoiceSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onPersonSuggestionsClearRequested = () => {
    this.setState({
      personSuggestions: []
    });
  };
  onProductSuggestionsClearRequested = () => {
    this.setState({
      productSuggestions: []
    });
  };
  onInvoiceSuggestionsClearRequested = () => {
    this.setState({
      invoiceSuggestions: []
    });
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getPersonSuggestionValue = suggestion => {
    let data = { ...this.state.data };
    data.buyerId = suggestion._id;
    data.buyerAddress = suggestion.address;
    data.buyerPhoneNumber = suggestion.mobile;
    this.setState({
      personId: suggestion._id,
      person: suggestion,
      data
    });
    return suggestion.name;
  };
  getProductSuggestionValue = suggestion => {
    let data = { ...this.state.data };
    data.productPrice = suggestion.tradeBuyingPrice;
    this.setState({ productId: suggestion._id, product: suggestion, data });
    return suggestion.name;
  };

  getInvoiceSuggestionValue = suggestion => {
    let data = { ...this.state.data };
    data.price = suggestion.totalPrice;
    data.person = suggestion.buyerName;
    data.personId = suggestion.buyerId;
    data.invoice = suggestion.name;
    data.invoiceId = suggestion._id;
    this.setState({ invoiceId: suggestion._id, invoice: suggestion, data });
    return suggestion.name;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion, { query }) => {
    const matches = AutosuggestHighlightMatch(suggestion.name, query);
    const parts = AutosuggestHighlightParse(suggestion.name, matches);

    return (
      <span>
        {parts.map((part, index) => {
          const className = part.highlight
            ? "react-autosuggest__suggestion-match"
            : null;

          return (
            <span className={className} key={index}>
              {part.text}
            </span>
          );
        })}
      </span>
    );
  };

  onPersonChange = (event, { newValue }) => {
    this.setState({ personValue: newValue });
  };

  onProductChange = (event, { newValue }) => {
    this.setState({ productValue: newValue });
  };

  onInvoiceChange = (event, { newValue }) => {
    this.setState({ invoiceValue: newValue });
  };

  renderCancelBtn = label => {
    return (
      <span
        className="btn btn-lg btn-secondary m-2 shadow-lg rounded"
        data-placement="top"
        title="لغو"
        onClick={this.handleBack}
      >
        <i className="fa fa-times" />
      </span>
    );
  };

  renderInput = (name, label, size = "2", required = false, type = "text") => {
    const { data } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        size={size}
        required={required}
        value={data && PersianNum(data[name])}
        onChange={this.handleFormChange}
      />
    );
  };

  renderSelect = (name, label, options, size = "2") => {
    const { data } = this.state;
    return (
      <Select
        name={name}
        label={label}
        size={size}
        options={options}
        value={data && data[name]}
        onChange={this.handleFormChange}
      />
    );
  };

  renderCheck = (name, label, size = "3") => {
    const { data } = this.state;
    return (
      <Check
        name={name}
        label={label}
        size={size}
        value={data && data[name]}
        onChange={this.handleFormChange}
      />
    );
  };

  renderPersonAutoSuggest = (
    name,
    label,
    required = false,
    size = "3",
    placeholder = "..."
  ) => {
    const { data, personSuggestions, personValue } = this.state;
    const inputProps = {
      className: "form-control shadow rounded",
      id: `${name}Input`,
      required,
      name,
      placeholder,
      value: personValue,
      onChange: this.onPersonChange
    };
    return (
      <div className={`form-group m-3 col-${size}`}>
        <label htmlFor={`${name}Input`}>{label}</label>
        <Autosuggest
          suggestions={personSuggestions}
          onSuggestionsFetchRequested={this.onPersonSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onPersonSuggestionsClearRequested}
          getSuggestionValue={this.getPersonSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  };

  renderProductAutoSuggest = (
    name,
    label,
    required = false,
    size = "3",
    placeholder = "..."
  ) => {
    const { data, productSuggestions, productValue } = this.state;
    const inputProps = {
      className: "form-control shadow rounded",
      id: `${name}Input`,
      required,
      name,
      placeholder,
      value: productValue,
      onChange: this.onProductChange
    };
    return (
      <div className={`form-group m-3 col-${size}`}>
        <label htmlFor={`${name}Input`}>{label}</label>
        <Autosuggest
          suggestions={productSuggestions}
          onSuggestionsFetchRequested={this.onProductSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onProductSuggestionsClearRequested}
          getSuggestionValue={this.getProductSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  };

  renderInvoiceAutoSuggest = (
    name,
    label,
    required = false,
    size = "3",
    placeholder = "..."
  ) => {
    const { data, invoiceSuggestions, invoiceValue } = this.state;
    const inputProps = {
      className: "form-control shadow rounded",
      id: `${name}Input`,
      required,
      name,
      placeholder,
      value: invoiceValue,
      onChange: this.onInvoiceChange
    };
    return (
      <div className={`form-group m-3 col-${size}`}>
        <label htmlFor={`${name}Input`}>{label}</label>
        <Autosuggest
          suggestions={invoiceSuggestions}
          onSuggestionsFetchRequested={this.onInvoiceSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onInvoiceSuggestionsClearRequested}
          getSuggestionValue={this.getInvoiceSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  };

  renderImage = (
    name,
    label,
    size = "2",
    required = false,
    type = "file",
    multiple = false
  ) => {
    let imgpath = "../";
    const { data } = this.state;
    let img = null;
    if (data.img) {
      if (data.img.includes("http")) imgpath = "";
      img = (
        <div className="fadein">
          <div
            onClick={() => {
              data.img = "";
              data.imgFile = [];
              data.file = null;
              this.setState({ data });
            }}
            className="delete"
          >
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
            <div className="clearfix"> </div>
            <img
              style={{
                maxWidth: "150px",
                maxHeight: "130px",
                borderRadius: "50%"
              }}
              className="shadow rounded"
              src={data.imgFile || `${imgpath}${data.img}`}
            />
          </div>
        </div>
      );
    } else {
      img = (
        <div className="button">
          <label htmlFor="single">
            <FontAwesomeIcon icon={faImage} color="#3B5998" size="10x" />
          </label>
        </div>
      );
    }
    return (
      <React.Fragment>
        <UploadImg
          type={type}
          name={name}
          label={label}
          size={size}
          required={required}
          multiple={multiple}
          // value={data[name]}
          onChange={this.handleFormChange}
        />
        {img}
      </React.Fragment>
    );
  };

  renderGallery = (
    name,
    label,
    size = "2",
    required = false,
    type = "file",
    multiple = true
  ) => {
    const { data } = this.state;
    let imgs = [];
    if (data.imgs[0]) {
      data.imgs.map((item, i) => {
        imgs[i] = (
          <div className="fadein">
            <div
              onClick={() => {
                data.imgs.splice(i, 1);
                data.imgFiles && data.imgFiles.splice(i, 1);
                data.files && data.files.splice(i, 1);
                this.setState({ data });
              }}
              className="delete"
            >
              <FontAwesomeIcon icon={faTimesCircle} size="2x" />
              <div className="clearfix"> </div>
              <img
                style={{
                  maxWidth: "150px",
                  maxHeight: "130px",
                  borderRadius: "50%"
                }}
                className="m-2 shadow rounded"
                src={data.imgFiles ? data.imgFiles[i] : `../${item}`}
              />
            </div>
          </div>
        );
      });
    } else {
      imgs[0] = (
        <div className="button" key={uuid.v4()}>
          <label htmlFor="multi">
            <FontAwesomeIcon icon={faImages} color="#6d84b4" size="10x" />
          </label>
        </div>
      );
    }
    return (
      <React.Fragment>
        <UploadImg
          type={type}
          name={name}
          label={label}
          size={size}
          required={required}
          multiple={multiple}
          // value={data[name]}
          onChange={this.handleFormChange}
        />
        {imgs.map(c => c)}
      </React.Fragment>
    );
  };
}
