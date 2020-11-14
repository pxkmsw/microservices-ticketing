import React, { Component } from "react";
import $ from "jquery";

const FormValidate = e => {
  let msg, pname;
  let status = true;
  let input = e.target.value;
  let name = e.target.name;
  switch (name) {
    case "name":
      pname = "نام";
      break;
    case "person":
      pname = "نام شخص";
      break;
    case "password":
      pname = "رمز عبور";
      break;
    case "username":
      pname = "نام کاربری";
      break;
    case "price":
      pname = "مبلغ";
      break;
    case "mobile":
      pname = "موبایل";
      break;
    case "telephone":
      pname = "تلفن";
      break;
    case "telExtension":
      pname = "تلفن داخلی";
      break;
    case "address":
      pname = "آدرس";
      break;
    case "postalCode":
      pname = "کد پستی";
      break;
    case "state":
      pname = "استان";
      break;
    case "city":
      pname = "شهر";
      break;
    case "credit":
      pname = "اعتبار";
      break;
  }
  $("#" + e.target.id).removeClass("is-invalid");
  $("#" + e.target.id).removeClass("is-valid");
  $("#valid-" + e.target.id + ",#invalid-" + e.target.id).remove();

  if (input == "" || input == null || typeof input == "undefined") {
    if ($(e.target).prop("required")) {
      e.target.setCustomValidity(" ");
      msg = "لطفا " + pname + " را وارد کنید.";
      status = false;
    } else {
      status = 0;
    }
  } else if (name == "mobile") {
    if (input.length !== 11 && input.length !== 13) {
      e.target.setCustomValidity(" ");
      msg = "لطفا " + pname + " را به درستی وارد کنید.";
      status = false;
    }
  }

  if (status) {
    // $(e.target.parentNode).append(
    //   '<div class="valid-feedback" id="valid-' +
    //     e.target.id +
    //     '">کاملا درسته</div>'
    // );
    // $("#" + e.target.id).addClass("is-valid");
    e.target.setCustomValidity("");
    return true;
  } else if (status === false) {
    $(e.target.parentNode).append(
      '<div class="invalid-feedback" id="invalid-' +
        e.target.id +
        '">' +
        msg +
        "</div>"
    );
    $("#" + e.target.id).addClass("is-invalid");
    e.preventDefault();
    return false;
  }
};

export default FormValidate;
