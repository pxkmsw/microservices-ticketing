import React from "react";
import Spinner from "../form/spinner";
import Images from "../form/images";
import Buttons from "../form/buttons";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import {
  getProductItem,
  addProductItem,
  updateProductItem
} from "../../actions/productActions";
import { getSettingItems } from "../../actions/settingActions";
import {
  getCategoryItems,
  addCategoryItem,
  updateCategoryItem,
  deleteCategoryItem
} from "../../actions/categoryActions";
import {
  getColorItems,
  addColorItem,
  updateColorItem,
  deleteColorItem
} from "../../actions/colorActions";
import {
  getMaterialItems,
  addMaterialItem,
  updateMaterialItem,
  deleteMaterialItem
} from "../../actions/materialActions";
import {
  getSupplierItems,
  addSupplierItem,
  updateSupplierItem,
  deleteSupplierItem
} from "../../actions/supplierActions";
import {
  getSubCategoryItems,
  addSubCategoryItem,
  updateSubCategoryItem,
  deleteSubCategoryItem
} from "../../actions/subCategoryActions";
import {
  getGroupItems,
  addGroupItem,
  updateGroupItem,
  deleteGroupItem
} from "../../actions/groupActions";
import { getDigiKalaShipping } from "../../handlers/digikala";

import Form from "../form/form";
import { EngNum } from "../table/common/persiandigit";
import ItemsModalView from "../Modal/itemsModalView";
import GridItem from "../Grid/GridItem";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import { BeatLoader } from "react-spinners";
import withStyles from "@material-ui/core/styles/withStyles";
import rtlStyle from "../../assets/jss/material-dashboard-react/views/rtlStyle.jsx";

export class AddProduct extends Form {
  state = {
    data: {
      uploading: true,
      img: "",
      imgs: [],
      imgFile: [],
      imgFiles: [],
      file: "",
      files: [],
      category: "",
      categoryId: 0,
      subCategory: "",
      subCategoryId: 0,
      group: "",
      groupId: 0,
      webLink: "",
      itemNumber: "",
      taminMallCode: "",
      marketCode: "",
      name: "",
      brand: "",
      color: "",
      colorId: 0,
      material: "",
      materialId: 0,
      supplier: "",
      supplierId: 0,
      tradeListPrice: "",
      tradeBuyingPrice: "",
      buyingPriceHistory: "",
      valueAdded: "",
      commission: "",
      shippingCosts: "",
      refPrice: "",
      breakEvenPrice: "",
      wholePrice: "",
      retailPrice: "",
      marketPlacePrice: "",
      retailStoreStock: "",
      wholeStoreStock: "",
      virtualStoreStock: "",
      boxQuantity: "",
      width: "",
      length: "",
      height: "",
      weight: ""
    },
    errors: {},
    modal: false
  };

  componentDidMount() {
    this.props.getCategoryItems();
    this.props.getMaterialItems();
    this.props.getColorItems();
    this.props.getSupplierItems();
    this.props.getSubCategoryItems();
    this.props.getGroupItems();
    this.props.getSettingItems();
    this.handleCleaningForm();
    this.handleEditForm();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.match.params.id) {
      const { product, loadingProduct } = nextProps;
      if (loadingProduct || !product)
        return (
          <div className="loader">
            <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
          </div>
        );
      this.setState({ data: product });
    }
  }

  handleCheckCategory = data => {
    const { materials, suppliers, subCategories, groups } = this.props;

    const subIndex = subCategories.filter(e => e.category == data.categoryId);
    const grpIndex = groups.filter(e => e.subCategory == data.subCategoryId);
    const matIndex = materials.filter(e => e.category == data.categoryId);
    const supIndex = suppliers.filter(e => e.category == data.categoryId);

    data.subCategoryId = subIndex[0] ? data.subCategoryId : "";
    data.subCategory = subIndex[0] ? data.subCategory : "";

    data.groupId = grpIndex[0] ? data.groupId : "";
    data.group = grpIndex[0] ? data.group : "";

    data.materialId = matIndex[0] ? data.materialId : "";
    data.material = matIndex[0] ? data.material : "";

    data.supplierId = supIndex[0] ? data.supplierId : "";
    data.supplier = supIndex[0] ? data.supplier : "";

    if (!data.subCategoryId) delete data.subCategoryId;
    if (!data.groupId) delete data.groupId;
    if (!data.materialId) delete data.materialId;
    if (!data.supplierId) delete data.supplierId;

    return data;
  };

  handlePreparingForm = data => {
    const {
      categories,
      colors,
      materials,
      suppliers,
      subCategories,
      groups
    } = this.props;

    data.category = !data.categoryId ? categories[0].name : data.category;
    data.categoryId = !data.categoryId ? categories[0]._id : data.categoryId;

    data.color = !data.colorId ? colors[0].name : data.color;
    data.colorId = !data.colorId ? colors[0]._id : data.colorId;

    data.material = !data.materialId ? materials[0].name : data.material;
    data.materialId = !data.materialId ? materials[0]._id : data.materialId;

    data.supplier = !data.supplierId ? suppliers[0].name : data.supplier;
    data.supplierId = !data.supplierId ? suppliers[0]._id : data.supplierId;

    data.subCategory = !data.subCategoryId
      ? subCategories[0].name
      : data.subCategory;

    data.subCategoryId = !data.subCategoryId
      ? subCategories[0]._id
      : data.subCategoryId;

    data.group = !data.groupId ? groups[0].name : data.group;

    data.groupId = !data.groupId ? groups[0]._id : data.groupId;

    return data;
  };

  handleNotify = name => {
    let msg = this.props.match.params.id
      ? " با موفقیت به روزرسانی شد."
      : " با موفقیت اضافه شد.";
    NotificationManager.success(name + msg);
  };

  onAddItem = name => {
    this.props.addCategoryItem({ name });
    name && NotificationManager.success(name + " با موفقیت اضافه شد.");
  };

  onDeleteItem = item => {
    this.props.deleteCategoryItem(item._id);
    NotificationManager.success(item.name + " با موفقیت حذف شد.");
  };

  onEditItem = item => {
    this.props.updateCategoryItem(item);
    item.name &&
      NotificationManager.success(item.name + " با موفقیت به روز رسانی شد.");
  };

  onAddSubCategoryItem = name => {
    const category = this.state.data.categoryId
      ? this.state.data.categoryId
      : this.props.categories[0]._id;
    this.props.addSubCategoryItem({ name, category });
    name && NotificationManager.success(name + " با موفقیت اضافه شد.");
  };

  onDeleteSubCategoryItem = item => {
    this.props.deleteSubCategoryItem(item._id);
    NotificationManager.success(item.name + " با موفقیت حذف شد.");
  };

  onEditSubCategoryItem = item => {
    const category = this.state.data.categoryId
      ? this.state.data.categoryId
      : this.props.categories[0]._id;
    this.props.updateSubCategoryItem({ ...item, category });
    item.name &&
      NotificationManager.success(item.name + " با موفقیت به روز رسانی شد.");
  };

  onAddGroupItem = name => {
    const categoryId = this.state.data.categoryId
      ? this.state.data.categoryId
      : this.props.categories[0]._id;
    const subCategories = this.props.subCategories.filter(
      e => e.category == categoryId
    );
    const subCategory = this.state.data.subCategoryId
      ? this.state.data.subCategoryId
      : subCategories[0] && subCategories[0]._id;
    this.props.addGroupItem({ name, subCategory });
    name && NotificationManager.success(name + " با موفقیت اضافه شد.");
  };

  onDeleteGroupItem = item => {
    this.props.deleteGroupItem(item._id);
    NotificationManager.success(item.name + " با موفقیت حذف شد.");
  };

  onEditGroupItem = item => {
    const categoryId = this.state.data.categoryId
      ? this.state.data.categoryId
      : this.props.categories[0]._id;
    const subCategories = this.props.subCategories.filter(
      e => e.category == categoryId
    );
    const subCategory = this.state.data.subCategoryId
      ? this.state.data.subCategoryId
      : subCategories[0] && subCategories[0]._id;
    this.props.updateGroupItem({ ...item, subCategory });
    item.name &&
      NotificationManager.success(item.name + " با موفقیت به روز رسانی شد.");
  };

  onAddColorItem = name => {
    this.props.addColorItem({ name });
    name && NotificationManager.success(name + " با موفقیت اضافه شد.");
  };

  onDeleteColorItem = item => {
    this.props.deleteColorItem(item._id);
    NotificationManager.success(item.name + " با موفقیت حذف شد.");
  };

  onEditColorItem = item => {
    this.props.updateColorItem(item);
    item.name &&
      NotificationManager.success(item.name + " با موفقیت به روز رسانی شد.");
  };

  onAddMaterialItem = name => {
    const category = this.state.data.categoryId
      ? this.state.data.categoryId
      : this.props.categories[0]._id;
    this.props.addMaterialItem({ name, category });
    name && NotificationManager.success(name + " با موفقیت اضافه شد.");
  };

  onDeleteMaterialItem = item => {
    this.props.deleteMaterialItem(item._id);
    NotificationManager.success(item.name + " با موفقیت حذف شد.");
  };

  onEditMaterialItem = item => {
    const category = this.state.data.categoryId
      ? this.state.data.categoryId
      : this.props.categories[0]._id;
    this.props.updateMaterialItem({ ...item, category });
    item.name &&
      NotificationManager.success(item.name + " با موفقیت به روز رسانی شد.");
  };

  onAddSupplierItem = name => {
    const category = this.state.data.categoryId
      ? this.state.data.categoryId
      : this.props.categories[0]._id;
    this.props.addSupplierItem({ name, category });
    name && NotificationManager.success(name + " با موفقیت اضافه شد.");
  };

  onDeleteSupplierItem = item => {
    this.props.deleteSupplierItem(item._id);
    NotificationManager.success(item.name + " با موفقیت حذف شد.");
  };

  onEditSupplierItem = item => {
    const category = this.state.data.categoryId
      ? this.state.data.categoryId
      : this.props.categories[0]._id;
    this.props.updateSupplierItem({ ...item, category });
    item.name &&
      NotificationManager.success(item.name + " با موفقیت به روز رسانی شد.");
  };

  handleEditForm = () => {
    const id = this.props.match.params.id;
    id && this.props.getProductItem(id);
  };

  getCostAndTax = () => {
    if (!this.props.settings) return 0;
    return parseInt(this.props.settings[0].shippingCosts);
  };

  getMarketPlaceCosts = data => {
    const { length, width, height, weight } = data;
    return getDigiKalaShipping(length, width, height, weight);
  };

  getMarketPlaceCommission = () => 0.1;

  getShipping = data => {
    const { length, width, height, weight } = data;
    return getDigiKalaShipping(length, width, height, weight);
  };
  getWholeShipping = () => 0.01;
  getAddedValue = () => {
    if (!this.props.settings) return 0;
    return parseInt(this.props.settings[0].valueAdded);
  };

  getWholePrice = data =>
    Math.round(
      parseInt(EngNum(data.tradeBuyingPrice)) /
        (1 -
          (parseInt(this.props.settings[0].wholeProfit) +
            this.getAddedValue()) /
            100 -
          this.getWholeShipping()) /
        10
    ) * 10;

  getRetailPrice = data =>
    Math.round(
      (parseInt(EngNum(data.tradeBuyingPrice)) + this.getShipping(data)) /
        (1 -
          (parseInt(this.props.settings[0].retailProfit) +
            this.getAddedValue()) /
            100) /
        10
    ) * 10;

  getMarketPlacePrice = data =>
    Math.round(
      (parseInt(EngNum(data.tradeBuyingPrice)) +
        this.getMarketPlaceCosts(data) +
        this.getCostAndTax()) /
        (1 -
          (parseInt(this.props.settings[0].marketPlaceProfit) +
            this.getAddedValue()) /
            100 -
          this.getMarketPlaceCommission()) /
        10
    ) * 10;

  handleCalculatingData = data => {
    for (let key of Object.keys(data)) {
      if (!data[key] && key === "wholePrice")
        data.wholePrice = data.tradeBuyingPrice && this.getWholePrice(data);
      if (!data[key] && key === "retailPrice")
        data.retailPrice = data.tradeBuyingPrice && this.getRetailPrice(data);
      if (!data[key] && key === "marketPlacePrice")
        data.marketPlacePrice =
          data.tradeBuyingPrice && this.getMarketPlacePrice(data);
    }
    return data;
  };

  handleBack = () => {
    const { state } = this.props.location;
    const path = state ? state.from.pathname : "/Products";
    this.props.onRoute(path);
    this.props.history.push(path);
  };

  doSubmit = data => {
    const newData = this.handleCalculatingData(data);
    const prepared = this.handlePreparingForm(newData);
    const result = this.handleCheckCategory(prepared);

    const finaldata = new FormData();
    for (let key in result) finaldata.append(key, result[key]);
    if (result.files)
      for (let img of result.files) finaldata.append("file", img);

    this.props.match.params.id
      ? this.props.updateProductItem({
          item: finaldata,
          id: this.props.match.params.id
        })
      : this.props.addProductItem(finaldata);

    this.handleBack();
    this.handleNotify(result.name);
  };

  render() {
    let {
      categories,
      colors,
      materials,
      suppliers,
      subCategories,
      groups,
      loadingCategories,
      loadingSubCategories
    } = this.props;
    if (
      !categories ||
      loadingCategories ||
      !colors ||
      !materials ||
      !suppliers ||
      !subCategories ||
      !groups ||
      loadingSubCategories
    )
      return (
        <div className="loader">
          <BeatLoader sizeUnit={"px"} size={20} color={"#C70039"} />
        </div>
      );

    const categoryId = this.state.data.categoryId
      ? this.state.data.categoryId
      : categories[0] && categories[0]._id;

    subCategories = subCategories.filter(e => e.category == categoryId);
    materials = materials.filter(e => e.category == categoryId);
    suppliers = suppliers.filter(e => e.category == categoryId);

    const subCategoryId = this.state.data.subCategoryId
      ? this.state.data.subCategoryId
      : subCategories[0] && subCategories[0]._id;

    groups = groups.filter(e => e.subCategory == subCategoryId);

    return (
      <React.Fragment>
        <CardHeader color="rose">
          <h4 className={this.props.classes.cardTitleWhite}>افزودن محصول</h4>
          <p className={this.props.classes.cardCategoryWhite}>
            افزودن محصول جدید
          </p>
        </CardHeader>
        <CardBody>
          <form onSubmit={this.handleFormSubmission} id="addnewform1">
            <div className="row m-2">
              {this.renderSubmitBtn()}
              {this.renderCancelBtn("لغو")}
              <button
                type="button"
                className={`btn btn-dark shadow rounded btn-lg m-2`}
                onClick={() => this.setState({ modal: true })}
                data-toggle="modal"
                data-target={"#abc"}
              >
                دسته بندی ها
              </button>
              {this.state.modal && (
                <ItemsModalView
                  id="abc"
                  title="دسته بندی ها"
                  items={categories}
                  onAdd={this.onAddItem}
                  onEdit={this.onEditItem}
                  onDelete={this.onDeleteItem}
                  classes="btn-lg m-2"
                />
              )}
              <button
                type="button"
                className={`btn btn-dark shadow rounded btn-lg m-2`}
                onClick={() => this.setState({ modal: true })}
                data-toggle="modal"
                data-target={"#subcat"}
              >
                گروه ها
              </button>
              {this.state.modal && (
                <ItemsModalView
                  id="subcat"
                  title="گروه ها"
                  items={subCategories}
                  onAdd={this.onAddSubCategoryItem}
                  onEdit={this.onEditSubCategoryItem}
                  onDelete={this.onDeleteSubCategoryItem}
                  classes="btn-lg m-2"
                />
              )}
              <button
                type="button"
                className={`btn btn-dark shadow rounded btn-lg m-2`}
                onClick={() => this.setState({ modal: true })}
                data-toggle="modal"
                data-target={"#groups"}
              >
                زیرگروه ها
              </button>
              {this.state.modal && (
                <ItemsModalView
                  id="groups"
                  title="زیرگروه ها"
                  items={groups}
                  onAdd={this.onAddGroupItem}
                  onEdit={this.onEditGroupItem}
                  onDelete={this.onDeleteGroupItem}
                  classes="btn-lg m-2"
                />
              )}
              <button
                type="button"
                className={`btn btn-dark shadow rounded btn-lg m-2`}
                onClick={() => this.setState({ modal: true })}
                data-toggle="modal"
                data-target={"#materialmodal"}
              >
                جنس ها
              </button>
              {this.state.modal && (
                <ItemsModalView
                  id="materialmodal"
                  title="جنس ها"
                  items={materials}
                  onAdd={this.onAddMaterialItem}
                  onEdit={this.onEditMaterialItem}
                  onDelete={this.onDeleteMaterialItem}
                  classes="btn-lg m-2"
                />
              )}
              <button
                type="button"
                className={`btn btn-dark shadow rounded btn-lg m-2`}
                onClick={() => this.setState({ modal: true })}
                data-toggle="modal"
                data-target={"#colormodal"}
              >
                رنگ ها
              </button>
              {this.state.modal && (
                <ItemsModalView
                  id="colormodal"
                  title="رنگ ها"
                  items={colors}
                  onAdd={this.onAddColorItem}
                  onEdit={this.onEditColorItem}
                  onDelete={this.onDeleteColorItem}
                  classes="btn-lg m-2"
                />
              )}
              <button
                type="button"
                className={`btn btn-dark shadow rounded btn-lg m-2`}
                onClick={() => this.setState({ modal: true })}
                data-toggle="modal"
                data-target={"#suppliermodal"}
              >
                تامین کننده ها
              </button>
              {this.state.modal && (
                <ItemsModalView
                  id="suppliermodal"
                  title="تامین کننده ها"
                  items={suppliers}
                  onAdd={this.onAddSupplierItem}
                  onEdit={this.onEditSupplierItem}
                  onDelete={this.onDeleteSupplierItem}
                  classes="btn-lg m-2"
                />
              )}
            </div>
            <div className="row">
              {this.renderInput("marketCode", "کد تنوع مارکت پلیس")}
              {this.renderInput("taminMallCode", "کد تامین کننده")}
              {this.renderInput("itemNumber", "آیتم نامبر")}
              {this.renderInput("webLink", "لینک در سایت", "4")}
              {this.renderSelect("category", "دسته بندی", categories, "4")}
              {this.renderSelect("subCategory", "گروه", subCategories, "3")}
              {this.renderSelect("group", "زیرگروه", groups, "3")}
              {this.renderInput("name", "عنوان", "4", true)}
              {this.renderInput("brand", "برند")}
              {this.renderSelect("supplier", "تامین کننده", suppliers)}
              {this.renderSelect("color", "رنگ", colors)}
              {this.renderSelect("material", "جنس", materials)}
              {this.renderInput("weight", "وزن")}
              {this.renderInput("length", "طول")}
              {this.renderInput("width", "عرض")}
              {this.renderInput("height", "ارتفاع")}
              {this.renderInput("tradeListPrice", "قیمت لیست")}
              {this.renderInput("tradeBuyingPrice", "قیمت خرید")}
              {this.renderInput("commission", "کمیسیون")}
              {this.renderInput("wholePrice", "قیمت عمده فروشی")}
              {this.renderInput("retailPrice", "قیمت خرده فروشی")}
              {this.renderInput("marketPlacePrice", "قیمت مارکت پلیس")}
              {this.renderInput(
                "retailStoreStock",
                "موجودی انبار خرده فروشی",
                "2"
              )}
              {this.renderInput(
                "wholeStoreStock",
                "موجودی انبار عمده فروشی",
                "2"
              )}
              {this.renderInput(
                "virtualStoreStock",
                "موجودی انبار دیجیکالا",
                "2"
              )}
              {this.renderInput("boxQuantity", "تعداد در جعبه")}
              {this.renderInput(
                "buyingPriceHistory",
                "قیمت خرید های قبلی",
                "11"
              )}
              {this.renderImage("img", " انتخاب عکس اصلی")}
              {this.renderGallery("imgs", "انتخاب عکس گالری")}
            </div>
          </form>
        </CardBody>
      </React.Fragment>
    );
  }
}

const mapStateToProduct = state => ({
  settings: state.setting.settings,
  categories: state.category.categories,
  loadingCategories: state.category.loading,
  colors: state.color.colors,
  loadingColors: state.color.loading,
  materials: state.material.materials,
  loadingMaterials: state.material.loading,
  suppliers: state.supplier.suppliers,
  loadingSuppliers: state.supplier.loading,
  subCategories: state.subCategory.subCategories,
  loadingSubCategories: state.subCategory.loading,
  groups: state.group.groups,
  loadingGroups: state.group.loading,
  product: state.product.product,
  loadingProduct: state.product.loading
});

export default connect(
  mapStateToProduct,
  {
    getProductItem,
    getCategoryItems,
    addCategoryItem,
    updateCategoryItem,
    deleteCategoryItem,
    getColorItems,
    addColorItem,
    updateColorItem,
    deleteColorItem,
    getMaterialItems,
    addMaterialItem,
    updateMaterialItem,
    deleteMaterialItem,
    getSupplierItems,
    addSupplierItem,
    updateSupplierItem,
    deleteSupplierItem,
    getSubCategoryItems,
    addSubCategoryItem,
    updateSubCategoryItem,
    deleteSubCategoryItem,
    getGroupItems,
    addGroupItem,
    updateGroupItem,
    deleteGroupItem,
    addProductItem,
    updateProductItem,
    getSettingItems
  }
)(withStyles(rtlStyle)(AddProduct));
