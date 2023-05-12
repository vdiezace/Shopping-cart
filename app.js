document.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonblob.com/api/1067871304245592064')
      .then((response) => response.json())
      .then((data) => mostrarListaProductos(data));
  });
  
  let currentCart = null;
  
  const mostrarListaProductos = (data) => {
    let products = data.products.map(function (product) {
      return new Product(product);
    });
    currentCart = new Carrito(data.currency, products);
    actualizarCarrito();
  };
  
  const actualizarCarrito = () => {
    cart = currentCart.obtenerCarrito();
    imprimirListaProductos(cart);
    imprimirTotalProductos(cart);
  }
  
  const añadirCantidadProducto = (sku, quantity) => {
    currentCart.actualizarUnidades(sku, quantity + 1);
    document.getElementById('product-list').replaceChildren();
    actualizarCarrito();
  }
  
  const disminuirCantidadProducto = (sku, quantity) => {
    currentCart.actualizarUnidades(sku, quantity - 1);
    document.getElementById('product-list').replaceChildren();
    actualizarCarrito();
  }
  
  const imprimirListaProductos = (cart) => {
    const listaProductos = document.getElementById('product-list');
  
    cart.products.forEach((product) => {
      const divProducto = document.createElement('div');
      divProducto.classList.add('cart-products');
  
      const ulProducto = document.createElement('ul');
      ulProducto.classList.add('cart-products__item');
  
      const liTitleProducto = document.createElement('li');
      liTitleProducto.classList.add('cart-products__item-product');
  
      const h2TitleProducto = document.createElement('h2');
      h2TitleProducto.classList.add('cart-products__item-title');
      h2TitleProducto.appendChild(document.createTextNode(product.getTitle()));
  
      const pSKU = document.createElement('p');
      pSKU.classList.add('cart-products__item-p');
      pSKU.appendChild(document.createTextNode('Ref:' + ` ${product.getSku()}`));
  
      liTitleProducto.appendChild(h2TitleProducto);
      liTitleProducto.appendChild(pSKU);
  
      const liQuantityProducto = document.createElement('li');
      liQuantityProducto.classList.add('cart-products__item-quantity');
  
      // Btn negative
      const minusBtn = document.createElement('button');
      minusBtn.classList.add('btn');
      minusBtn.classList.add('btn-negative');
      minusBtn.appendChild(document.createTextNode('-'));
      minusBtn.setAttribute('dataset-id', product.getSku());
  
      minusBtn.addEventListener('click', (ev) => {
        disminuirCantidadProducto(product.getSku(), product.getQuantity());
      });
  
      const input = document.createElement('input');
      input.classList.add('cart-products__item-in');
      input.value = product.getQuantity();
      input.setAttribute('type', 'number');
  
      input.addEventListener('change', (ev) => {
        console.log(product.getQuantity(), ev.target.value);
        if (ev.target.value > product.getQuantity()) {
            añadirCantidadProducto(product.getSku(), product.getQuantity());
        } else if (ev.target.value < product.getQuantity()) {
            disminuirCantidadProducto(product.getSku(), product.getQuantity());
        }
      });
  
      // Btn positive
      const plusBtn = document.createElement('button');
      plusBtn.classList.add('btn');
      plusBtn.classList.add('btn-positive');
      plusBtn.appendChild(document.createTextNode('+'));
      plusBtn.setAttribute('dataset-id', product.getSku());
  
      plusBtn.addEventListener('click', (ev) => {
        añadirCantidadProducto(product.getSku(), product.getQuantity());
      });
  
      liQuantityProducto.appendChild(minusBtn);
      liQuantityProducto.appendChild(input);
      liQuantityProducto.appendChild(plusBtn);
  
      const liUnityProducto = document.createElement('li');
      liUnityProducto.classList.add('cart-products__item-unity');
      liUnityProducto.appendChild(
        document.createTextNode(product.getPrice() + ' ' + cart.currency)
      );
  
      const liTotalProducto = document.createElement('li');
      liTotalProducto.classList.add('cart-products__item-total');
      liTotalProducto.appendChild(
        document.createTextNode(product.getTotal() + ' ' + cart.currency)
      );
  
      ulProducto.appendChild(liTitleProducto);
      ulProducto.appendChild(liQuantityProducto);
      ulProducto.appendChild(liUnityProducto);
      ulProducto.appendChild(liTotalProducto);
  
      divProducto.appendChild(ulProducto);
  
      listaProductos.appendChild(divProducto);
    });
  };
  
  const imprimirTotalProductos = (cart) => {
    // mostrar carrito de compra
    const listaCarrito = document.getElementById('cart-list');
    const totalCarrito = document.getElementById('cart-total');
  
    // Limpia los productos del carrito
    listaCarrito.innerHTML = '';
    totalCarrito.innerHTML = '';
  
    cart.products.forEach((product) => {
      if (product.getQuantity() > 0) {
        const divCarrito = document.createElement('div');
        divCarrito.classList.add('cart-summary__item');
  
        const cartProductTitle = document.createElement('div');
        cartProductTitle.classList.add('cart-summnary__item-label');
        cartProductTitle.appendChild(document.createTextNode(product.getTitle()));
  
        const cartProductContent = document.createElement('div');
        cartProductContent.classList.add('cart-summary__item-content');
  
        const precioTotalProducto = document.createElement('span');
        precioTotalProducto.classList.add('cart-summary__price');
        precioTotalProducto.appendChild(
          document.createTextNode(product.getTotal() + cart.currency)
        );
  
        cartProductContent.appendChild(precioTotalProducto);
        //cartProductTitle.appendChild(cartProductContent);
        divCarrito.appendChild(cartProductTitle);
        divCarrito.appendChild(cartProductContent);
  
        listaCarrito.appendChild(divCarrito);
      }
    });
  
    // Suma del Total de todos los productos
    const labelCarrito = document.createElement('div');
    labelCarrito.classList.add('cart-total__price-label');
    labelCarrito.appendChild(document.createTextNode('TOTAL'));
  
    const priceSumCarrito = document.createElement('div');
    priceSumCarrito.classList.add('cart-total__price-sum');
  
    const pCarrito = document.createElement('span');
    pCarrito.classList.add('cart-total__price-price');
    pCarrito.appendChild(
      document.createTextNode(cart.total + ' ' + cart.currency)
    );
  
    priceSumCarrito.appendChild(pCarrito);
    totalCarrito.appendChild(labelCarrito);
    totalCarrito.appendChild(priceSumCarrito);
  };
  