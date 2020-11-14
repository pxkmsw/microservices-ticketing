export const productTypes = [
  { id: 1, name: "سرویس غذاخوری" },
  { id: 2, name: "ست کتری و قوری" },
  { id: 3, name: "سرویس پخت غذا" },
  { id: 4, name: "کلمن و فلاسک" },
  { id: 5, name: "بند رخت" },
  { id: 6, name: "لوازم برقی" }
];

export const businessTypes = [
  { id: 1, name: "ظروف چینی" },
  { id: 2, name: "جهیزیه" },
  { id: 3, name: "ظروف مسی" },
  { id: 4, name: "دکوراتیو" },
  { id: 5, name: "صنایع دستی" },
  { id: 6, name: "لوازم برقی" }
];

export const employeeTypes = [
  { id: 1, name: "واحد فنی" },
  { id: 2, name: "واحد بازرگانی" },
  { id: 3, name: "واحد مالی" },
  { id: 4, name: "واحد فروش" },
  { id: 5, name: "واحد منابع انسانی" },
  { id: 6, name: "مدیر پروژه" }
];

export const customerTypes = [
  { id: 1, name: "واحد فنی" },
  { id: 2, name: "واحد بازرگانی" },
  { id: 3, name: "واحد مالی" },
  { id: 4, name: "واحد فروش" },
  { id: 5, name: "واحد منابع انسانی" },
  { id: 6, name: "مدیر پروژه" },
  { id: 7, name: "ظروف چینی" },
  { id: 8, name: "جهیزیه" },
  { id: 9, name: "ظروف مسی" },
  { id: 10, name: "دکوراتیو" },
  { id: 11, name: "صنایع دستی" },
  { id: 12, name: "لوازم برقی" }
];

export function getBusinessTypes() {
  return businessTypes.filter(g => g);
}

export function getEmployeeTypes() {
  return employeeTypes.filter(g => g);
}

export function getCustomerTypes() {
  return customerTypes.filter(g => g);
}

export function getProductTypes() {
  return productTypes.filter(g => g);
}
