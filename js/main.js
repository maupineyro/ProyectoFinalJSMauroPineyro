let arrayProductos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        arrayProductos = data;
        cargarProductos(arrayProductos);
    })




//DOM
const contenedorProductos = document.querySelector("#contenedor-productos"); // me conecta con el contenedor principal de html
const botonesCategoria = document.querySelectorAll(".botonCategoria"); //me conecta con los botones del menu aside
const tituloPrincipal = document.querySelector("#titulo-principal"); //me conecta con los titulos
let botonesAgregar = document.querySelectorAll(".agregarProducto"); //me conecta con los botones agregar de los productos a comprar.
const numeroCarritoIndex = document.querySelector("#numeroCarritoIndex"); //me conecta con el numero de objetos agregado al carrito del index.



function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="productoDetalles">
            <h3 class="productoTitulo"> ${producto.titulo}</h3>
            <p class="productoPrecio">$${producto.precio}</p>
            <button class="agregarProducto" id="${producto.id}" > Agregar</button>
        </div>
        `
        contenedorProductos.append(div);
    })
    actualizarBotonAgregarProducto()

};

cargarProductos(arrayProductos);


botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategoria.forEach(boton => boton.classList.remove("active")); // este elimina el "active" anterior para darle movimiento a la selección de botones

        e.currentTarget.classList.add("active");



        if (e.currentTarget.id != "todos") {
            const categoriaProductos = arrayProductos.find(producto => producto.categoria.id === e.currentTarget.id);


            tituloPrincipal.innerText = categoriaProductos.categoria.nombre
            const productosBoton = arrayProductos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(arrayProductos);
        }

    })
})

//funcion que actualiza los botones agregar para cada vez que elegis una categoria "aside"
function actualizarBotonAgregarProducto() {
    botonesAgregar = document.querySelectorAll(".agregarProducto");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
};



let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroCarritoIndex();
} else {
    productosEnCarrito = [];
}




//función que agrega al carrito y al local storage
function agregarAlCarrito(e) {


    Toastify({
        text: "Agregaste al carrito un producto",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to left, #1b2d4d,#76a0e9)", //#1b2d4d; #76a0e9;    #00b09b, #96c93d
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = arrayProductos.find(producto => producto.id === idBoton)

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
        //some devuelve true si encuentra la condición
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado); // push agrega
    }

    actualizarNumeroCarritoIndex();

    // llevo el array de productosEnCarrito al LocalStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));


}


//función que actualiza el número del carrito index.

function actualizarNumeroCarritoIndex() {
    let numeritoCarritoIndex = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0);
    numeroCarritoIndex.innerText = numeritoCarritoIndex;
};
