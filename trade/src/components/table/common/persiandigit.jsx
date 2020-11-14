import React, { Component } from "react";

let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
let englishDigits = "0123456789";
let persianMap = persianDigits.split("");
let englishMap = englishDigits.split("");

export function PersianNum(num) {
  if (typeof num == "undefined" || num == null) {
    num = "";
  }
  let input = num.toString();
  for (var i = 0; i < 10; i++) {
    input = input.replace(new RegExp(englishDigits[i], "g"), persianDigits[i]);
  }
  return input;

  //method 2
  // let word = "";
  // if (typeof num == "undefined") {
  //   num = "";
  // }
  // let input = num.toString();
  // for (let i = 0; i < input.length; i++) {
  //   if (englishDigits.includes(input[i])) {
  //     word += persianMap[parseInt(input[i])];
  //   } else {
  //     word += input[i];
  //   }
  // }
  // return word;
}

export function EngNum(num) {
  if (typeof num == "undefined") {
    num = "";
  }
  let input = num.toString();
  for (var i = 0; i < 10; i++) {
    input = input.replace(new RegExp(persianDigits[i], "g"), i);
  }
  return input;
}

export const PersianDigit = props => {
  return PersianNum(props.children);
};

export default PersianDigit;
