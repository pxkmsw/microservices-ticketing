export function getDigiKalaShipping(length, width, height, weight) {
  if (!length || !width || !height || !weight) return 9000 + 8000;
  const sizeUnit = getSize(parseInt(length), parseInt(width), parseInt(height));
  const weightUnit = getWeight(parseInt(weight) / 1000, sizeUnit);

  if (sizeUnit === 1 && weightUnit === 1) return 9000 + 8000;
  if (sizeUnit === 1 && weightUnit === 2) return 12000 + 14000;
  if (sizeUnit === 1 && weightUnit === 3) return 15000 + 19000;

  if (sizeUnit === 2 && weightUnit === 1) return 15000 + 19000;
  if (sizeUnit === 2 && weightUnit === 2) return 18000 + 21000;
  if (sizeUnit === 2 && weightUnit === 3) return 21000 + 24000;

  if (sizeUnit === 3 && weightUnit === 1) return 19000 + 23000;
  if (sizeUnit === 3 && weightUnit === 2) return 27000 + 27000;
  if (sizeUnit === 3 && weightUnit === 3) return 39000 + 34000;

  if (sizeUnit === 4 && weightUnit === 1) return 49000 + 49000;
  if (sizeUnit === 4 && weightUnit === 2) return 90000 + 79000;
  if (sizeUnit === 4 && weightUnit === 3) return 210000 + 99000;

  if (sizeUnit === 5 && weightUnit === 1) return 110000 + 79000;
  if (sizeUnit === 5 && weightUnit === 2) return 190000 + 109000;
  if (sizeUnit === 5 && weightUnit === 3) return 390000 + 159000;
}

function getSize(length, width, height) {
  if (length <= 20 && width <= 15 && height <= 10) return 1;
  if (length <= 35 && width <= 25 && height <= 15) return 2;
  if (length <= 50 && width <= 35 && height <= 35) return 3;
  if (length <= 90 && width <= 65 && height <= 65) return 4;
  if (length > 90 && width > 65 && height > 65) return 5;
}

function getWeight(weight, sizeUnit) {
  if (weight <= 0.5 && sizeUnit === 1) return 1;
  if (weight <= 1 && sizeUnit === 2) return 1;
  if (weight <= 3 && sizeUnit === 3) return 1;
  if (weight <= 10 && sizeUnit === 4) return 1;
  if (weight > 10 && weight < 25 && sizeUnit === 5) return 1;

  if (weight <= 1 && sizeUnit === 1) return 2;
  if (weight <= 3 && sizeUnit === 2) return 2;
  if (weight <= 8 && sizeUnit === 3) return 2;
  if (weight <= 25 && sizeUnit === 4) return 2;
  if (weight > 25 && sizeUnit === 5) return 2;

  if (weight > 1 && sizeUnit === 1) return 3;
  if (weight > 3 && sizeUnit === 2) return 3;
  if (weight > 8 && sizeUnit === 3) return 3;
  if (weight > 25 && sizeUnit === 4) return 3;
  if (weight > 25 && sizeUnit === 5) return 3;
}
