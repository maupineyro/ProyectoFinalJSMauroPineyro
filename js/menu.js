//Rafas del menú
const abrirMenu = document.querySelector("#abrirMenu");
const cerrarMenu = document.querySelector("#cerrarMenu");
const aside = document.querySelector("aside");


abrirMenu.addEventListener("click", () => {
    aside.classList.add("asideVisible");
});

cerrarMenu.addEventListener("click", () => {
    aside.classList.remove("asideVisible");
});


botonesCategoria.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("asideVisible");
}));