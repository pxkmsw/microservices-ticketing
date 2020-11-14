import React, { Component } from "react";
const ItemsCount = ({ itemsCount }) => {
  return (
    <div className="m-3 h6 mr-5">
      {itemsCount == 0
        ? "هیچ آیتمی برای نمایش وجود ندارد"
        : `تعداد ${itemsCount} آیتم در پایگاه داده وجود دارد.`}
    </div>
  );
};

export default ItemsCount;
