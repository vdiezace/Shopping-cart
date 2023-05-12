class Product {
    #title;
    #sku;
    #price;
    #quantity;
    #total;
  
    constructor(product) {
      this.#title = product.title;
      this.#sku = product.SKU;
      this.#price = product.price;
      this.#quantity = 0;
      this.setInitialTotal(product);
    }
  
    getTitle() {
      return this.#title;
    }
  
    getSku() {
      return this.#sku;
    }
  
    getPrice() {
      return this.#price;
    }
  
    getQuantity() {
      return this.#quantity;
    }
  
    setQuantity(quantity) {
      this.#quantity = quantity;
    }
  
    getTotal() {
      return this.#total;
    }
  
    setTotal(total) {
      this.#total = parseFloat(parseFloat(total).toFixed(2));
    }
  
    setInitialTotal(product) {
      if (isNaN(product.quantity)) {
        this.#total = 0;
      } else {
        this.#total = this.setTotal(product.quantity * product.price);
      }
    }
  }
  
  class Carrito {
    #currency;
    #products;
    #total;
  
    constructor(currency, products) {
      this.#currency = currency;
      this.#products = products;
      this.#total = 0;
    }
  
    getProducts() {
      return this.#products;
    }
  
    getTotal() {
      return parseFloat(parseFloat(this.#total).toFixed(2));
    }
  
    getCurrency() {
      return this.#currency;
    }
  
    /***
     *  Actualiza el número de unidades que se quieren comprar de un producto
     */
    actualizarUnidades(sku, quantity = 0) {
      if (quantity < 0) {
        return;
      }
      this.#products = this.#products.map(function (product) {
        if (product.getSku() == sku) {
          product.setQuantity(quantity);
          product.setTotal(product.getQuantity() * product.getPrice());
        }
        return product;
      });
      //this.obtenerInformacionProducto(sku).quantity = unidades;
    }
  
    /*
    Devuelve los datos de un producto además de las unidades seleccionadas
    Por ejemplo:
    {
      "sku": "0K3QOSOV4V",
      "quantity": 3
    }
    */
    obtenerInformacionProducto(sku) {
      return this.#products.find((product) => product.getSku() === sku);
    }
  
    /* 
      Devuelve información de los productos añadidos al carrito
      Además del total calculado de todos los productos
      Por ejemplo:
      {
        "total": "5820",
        "currency: "€",
        "products" : [
            {
              "sku": "0K3QOSOV4V"
              ..
            }
        ]}
      }
      */
    obtenerCarrito() {
      let total = 0;
      for (let i of this.#products) {
        total += i.getTotal();
      }
  
      return {
        currency: this.#currency,
        total: parseFloat(parseFloat(total).toFixed(2)),
        products: this.#products,
      };
    }
  }
  