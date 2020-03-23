/* eslint linebreak-style: ["error","windows"] */

/* eslint "react/react-in-jsx-scope": "off" */

/* globals React ReactDOM */

/* eslint "react/jsx-no-undef": "off" */

/* eslint "no-alert": "off" */
class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.addProduct = this.addProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query{
            productList{
                id Name Price Image Category
            }
        }`;
    console.log("---->>>", window.env.UI_API_ENDPOINT);
    const response = await fetch(window.env.UI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const responseResult = await response.json();
    this.setState({
      products: responseResult.data.productList
    });
  }

  async addProduct(newProduct) {
    const newProducts = this.state.products.slice();
    newProduct.id = this.state.products.length + 1;
    newProducts.push(newProduct);
    this.setState({
      products: newProducts
    });
    const query = `mutation {
            productAdd(product:{
                Name: "${newProduct.productName}",
                Price: ${newProduct.pricePerUnit},
                Image: "${newProduct.imageUrl}",
                Category: ${newProduct.category},
            }) {id}
        }`;
    const response = await fetch(window.env.UI_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    this.loadData();
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "My Company Inventory"), /*#__PURE__*/React.createElement("h3", null, "Showing all available products"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductTable, {
      products: this.state.products
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
      addProduct: this.addProduct
    }));
  }

}

class ProductTable extends React.Component {
  render() {
    const rowStyle = {
      border: "1px solid silver",
      padding: 4
    };
    const productRows = this.props.products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
      key: product.id,
      product: product
    }));
    return /*#__PURE__*/React.createElement("table", {
      className: "prodTable"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Product Name"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Price"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Category"), /*#__PURE__*/React.createElement("th", {
      style: rowStyle
    }, "Image"))), /*#__PURE__*/React.createElement("tbody", null, productRows));
  }

}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const rowStyle = {
      border: "1px solid silver",
      padding: 4
    };
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      align: "center",
      style: rowStyle
    }, product.Name), /*#__PURE__*/React.createElement("td", {
      align: "center",
      style: rowStyle
    }, "$", product.Price), /*#__PURE__*/React.createElement("td", {
      align: "center",
      style: rowStyle
    }, product.Category), /*#__PURE__*/React.createElement("td", {
      align: "center",
      style: rowStyle
    }, /*#__PURE__*/React.createElement("a", {
      href: product.Image,
      target: "_blank"
    }, "View")));
  }

}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const price = form.pricePerUnit.value;
    const product = {
      category: form.category.value,
      pricePerUnit: parseFloat(price.substring(1, price.length)),
      productName: form.productName.value,
      imageUrl: form.imageUrl.value
    };
    this.props.addProduct(product);
    form.category.value = "";
    form.pricePerUnit.value = "$";
    form.productName.value = "";
    form.imageUrl.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "Add a new product to inventory"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("div", {
      className: "column"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "category"
    }, "Category : "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("select", {
      name: "category"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Shirts"
    }, "Shirts"), /*#__PURE__*/React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), /*#__PURE__*/React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), /*#__PURE__*/React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), /*#__PURE__*/React.createElement("option", {
      value: "Accessories"
    }, "Accessories"))), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "productName"
    }, "Product Name : "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "productName"
    })), /*#__PURE__*/React.createElement("button", {
      className: "button"
    }, "Add Product")), /*#__PURE__*/React.createElement("div", {
      className: "column"
    }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "pricePerUnit"
    }, "Price Per Unit : "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "pricePerUnit",
      defaultValue: "$"
    })), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "image"
    }, "Image : "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "imageUrl"
    }))))));
  }

}

const element = /*#__PURE__*/React.createElement(ProductList, null);
ReactDOM.render(element, document.getElementById('content'));