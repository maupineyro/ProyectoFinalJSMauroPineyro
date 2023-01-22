let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
console.log(productosEnCarrito)

//DOM / Rafas del carrito :)
const carritoVacio = document.querySelector("#carrito-vacio");
const containerCarritoDeProductos = document.querySelector("#containerCarritoDeProductos"); // este es el carrito en sí.
const accionesDelCarrito = document.querySelector("#accionesDelCarrito");
const carritoComprado = document.querySelector("#carritoComprado");
let botonesEliminar = document.querySelectorAll(".eliminarDelCarrito");
const botonVaciarCarrito = document.querySelector("#botonVaciarCarrito");
const totalActualizado = document.querySelector("#total");
const botonComprar = document.querySelector("#botonComprar");



//Funciones y demás.

function cargarProductosEnCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {


        carritoVacio.classList.add("deshabilitar");
        containerCarritoDeProductos.classList.remove("deshabilitar");
        accionesDelCarrito.classList.remove("deshabilitar");
        carritoComprado.classList.add("deshabilitar");

        containerCarritoDeProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("productoEnCarrito");
            div.innerHTML = `
        <img class="imagenProductoEnCarrito" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="productoEnCarritoNombre">
                                <small>Nombre:</small>
                                <h3>${producto.titulo}</h3>
                            </div>
                            <div class="productoEnCarritoCantidad">
                                <small>Cantidad</small>
                                <p>${producto.cantidad}</p>
                            </div>
                            <div class="productoEnCarritoPrecio">
                                <small>Precio</small>
                                <p>$${producto.precio}</p>
                            </div>
                            <div class="productoEnCarritoSubtotal">
                                <small>Subtotal</small>
                                <p>$${producto.precio * producto.cantidad}</p>
                            </div>
                            <button class="eliminarDelCarrito" id="${producto.id}" ><i class="bi bi-trash3-fill"></i></button>
        `;
            containerCarritoDeProductos.append(div);
        });
    } else {
        carritoVacio.classList.remove("deshabilitar");
        containerCarritoDeProductos.classList.add("deshabilitar");
        accionesDelCarrito.classList.add("deshabilitar");
        carritoComprado.classList.add("deshabilitar");
    };

    actualizarBotonEliminarProducto() //invocación
    calcularTotalActualizado() //invocación para que se cargue cada vez q se carguen productos al carrito

};


cargarProductosEnCarrito();//invocación.

//funcion que actualiza los botones Eliminar del carrito
function actualizarBotonEliminarProducto() {
    botonesEliminar = document.querySelectorAll(".eliminarDelCarrito");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarProductosDelCarrito);
    })
};


//función que elimina del Carrito.
function eliminarProductosDelCarrito(e) {

    Toastify({
        text: "Eliminaste un producto",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to left, #1b2d4d,#76a0e9)", //#1b2d4d; #76a0e9;    #00b09b, #96c93d
        },
        onClick: function () { } // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id;
    const indexProductoEliminado = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(indexProductoEliminado, 1)

    cargarProductosEnCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};




//Evento del boton Vaciar Carrito
botonVaciarCarrito.addEventListener("click", vaciarCarrito);

//función para vaciar el carrito con el botón "vaciar carrito"
function vaciarCarrito() {

    //sweetAlert
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html:
            'Se van a borrar todos tus productos ',
        showCancelButton: true,
        focusConfirm: false,

        confirmButtonText:
            'Si',

        cancelButtonText:
            'No',

    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosEnCarrito();
        }
    })
    //termina sweetAlert


};


//función para calcular el total
function calcularTotalActualizado() {
    const totalCalculado = productosEnCarrito.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    totalActualizado.innerText = `$ ${totalCalculado} `;
}



//Evento del boton Comprar Ahora
botonComprar.addEventListener("click", comprarCarrito);

//función para comprar el carrito con el botón "comprar ahora"
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    carritoVacio.classList.add("deshabilitar");
    containerCarritoDeProductos.classList.add("deshabilitar");
    accionesDelCarrito.classList.add("deshabilitar");
    carritoComprado.classList.remove("deshabilitar");
};
