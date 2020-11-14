export const getProfitByPercent = (buyPrice, profitPercent) =>
  (parseInt(buyPrice) * parseInt(profitPercent)) / 100;

export const getProfitByPrice = (buyPrice, price) =>
  parseInt(price) - parseInt(buyPrice);

export const getPercentByProfit = (buyPrice, profit) =>
  Math.round((parseInt(profit) / parseInt(buyPrice)) * 10000) / 100;

export const getPercentByPrice = (buyPrice, price) =>
  Math.round(
    ((parseInt(price) - parseInt(buyPrice)) / parseInt(buyPrice)) * 10000
  ) / 100;

export const getPriceByPercent = (buyPrice, profitPercent) =>
  parseInt(buyPrice) + (parseInt(buyPrice) * parseInt(profitPercent)) / 100;

export const getPriceByProfit = (buyPrice, profit) =>
  parseInt(buyPrice) + parseInt(profit);

export const getPercent = (buyPrice, sellPrice) =>
  Math.round(
    ((parseInt(sellPrice) - parseInt(buyPrice)) / parseInt(buyPrice)) * 1000
  ) /
    10 +
  " %";

export const getDiffPrice = (buyPrice, sellPrice) =>
  parseInt(sellPrice) - parseInt(buyPrice);
