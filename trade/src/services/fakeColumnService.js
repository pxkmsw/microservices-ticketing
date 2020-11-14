export const employeeColumns = [
  { label: "ID", path: "id" },
  { label: "نام", path: "name" },
  { label: "واحد فعالیت", path: "type" },
  { label: "تلفن اینترنتی", path: "telephone" },
  {},
  {},
  {}
];

export const customerColumns = [
  { label: "ID", path: "id" },
  { label: "نام", path: "name" },
  { label: "هویت", path: "identityType" },
  { label: "حوزه فعالیت", path: "type" },
  { label: "موبایل", path: "mobile" },
  { label: "تلفن", path: "telephone" },
  { label: "اعتبار", path: "credit" },
  { label: "شهر", path: "city" },
  { label: "", path: "" }
];

export const businessColumns = [
  { label: "نام", path: "name" },
  { label: "هویت", path: "identity" },
  { label: "نام کسب وکار", path: "company" },
  { label: "موبایل", path: "mobile" },
  { label: "تلفن", path: "telephone" },
  { label: "داخلی", path: "telExtention" },
  { label: "اعتبار", path: "credit" },
  { label: "شهر", path: "city" },
  { label: "", path: "" }
];

export const companyColumns = [
  { label: "نام", path: "name" },
  { label: "شهر", path: "city" },
  { label: "حوزه فعالیت", path: "marketSector" },
  { label: "تلفن 1", path: "telephone1" },
  { label: "تلفن 2", path: "telephone2" },
  { label: "آدرس", path: "address" }
];

export const paymentColumns = [
  { label: "عملیات", path: "type" },
  { label: "شرح", path: "invoice" },
  { label: "نام شخص", path: "person" },
  { label: "مبلغ", path: "price" },
  { label: "وضعیت", path: "status" },
  { label: "تاریخ", path: "date" }
];

export const allPaymentsColumns = [
  { label: "عملیات", path: "type" },
  { label: "حساب", path: "account" },
  { label: "شرح", path: "invoice" },
  { label: "نام شخص", path: "person" },
  { label: "مبلغ", path: "price" },
  { label: "وضعیت", path: "status" },
  { label: "تاریخ", path: "date" }
];

export const invoiceColumns = [
  { label: "نوع فاکتور", path: "invoiceType" },
  { label: "نام خریدار", path: "buyerName" },
  { label: "نام فروشنده", path: "sellerName" },
  { label: "مبلغ", path: "totalPrice" },
  { label: "تاریخ", path: "date" }
];

export const productColumns = [
  { label: "عکس", path: "img" },
  { label: "دسته بندی", path: "category" },
  { label: "گروه فنی", path: "proCode" },
  { label: "کد", path: "diverseCode" },
  { label: "عنوان", path: "name" },
  { label: "رنگ", path: "color" },
  { label: "عمده", path: "wholePrice" },
  { label: "دیجیکالا", path: "marketPlacePrice" }
];

export function getBusinessColumns() {
  return businessColumns.filter(g => g);
}

export function getCompanyColumns() {
  return companyColumns.filter(g => g);
}

export function getPaymentColumns() {
  return paymentColumns.filter(g => g);
}

export function getAllPaymentsColumns() {
  return allPaymentsColumns.filter(g => g);
}

export function getInvoiceColumns() {
  return invoiceColumns.filter(g => g);
}

export function getEmployeeColumns() {
  return employeeColumns.filter(g => g);
}

export function getCustomerColumns() {
  return customerColumns.filter(g => g);
}

export function getProductColumns() {
  return productColumns.filter(g => g);
}
