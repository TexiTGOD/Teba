//metodo constructor
class Producto {
  constructor(nombre, precio, imagen, id) {
    // Set Product Attribs
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
    this.id = id;
  }
}
if (!localStorage.getItem("Carrito")) {
  localStorage.setItem("Carrito", JSON.stringify([]));
}
//declaracion de objetos

//Declaracion Array
const stock = [];

//declaracion variable del carrito
const carrito = [];
//declaracion variable favorito
const fav = [];
const carritoDialog = document.getElementById("carrito-Dialog");
const carritoImg = document.getElementById("carrito");
const closeModal = document.querySelector(".closeModal");
const buscador = document.querySelector("#input-Buscador");
const resultado = document.getElementById("resultado");
const carritoEliminar = document.querySelectorAll(".carrito-eliminar");
const modalDiv = document.querySelector(".carrito-modal");
const loaderAnimation = document.querySelector(".loader-continer");
const confirmarCompra = document.querySelector("#compra-Confiramr");
const cargarCards = async () => {
  const response = await fetch("stock.json");
  const data = await response.json();
  for (let i of data) {
    let productoNuevo = new Producto(i.nombre, i.precio, i.imagen, i.id);
    stock.push(productoNuevo);
    console.log(stock);
  }
};

function verCardsBeats(Array) {
  //capturar divStock
  let stockDiv = document.getElementById("stockBeats");
  //codigo para imprimir array de stock
  stockDiv.innerHTML = ``;
  for (let Beats of Array) {
    let nuevoBeat = document.createElement("div");
    nuevoBeat.innerHTML = `
    <label class="container"  >
      <input type="checkbox" id="checkboxFav${Beats.id}">
      <div class="checkmark">
        <svg viewBox="0 0 256 256">
        <rect fill="none" height="256" width="256"></rect>
        <path d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z" stroke-width="20px" stroke="#FFF" fill="none"></path></svg>
      </div>
    </label>
      <div class="card">
        <div class="card-details">
          <p class="text-title">${Beats.nombre}</p>
          <p class="text-body">${Beats.precio}$</p>
        </div>
        <button class="btnCarrito card-button" id="btncomprar${Beats.id}">Añadir al Carrito</button>
        <img class="imagenBeats" src="${Beats.imagen}" >
      </div> 
    `;

    stockDiv.append(nuevoBeat);
  }
}

const agregarProducto = (producto) => {
  const arr = localStorage.getItem("Carrito");
  if (!arr) localStorage.setItem("Carrito", JSON.stringify([]));
  else {
    const newCarrito = JSON.parse(arr);
    newCarrito.push(producto);
    localStorage.setItem("Carrito", JSON.stringify(newCarrito));
  }
};

//Funcion para el boton de agregar al carrito
function agregarCarrito(stock) {
  //Evento del boton "Agreagar al carrito"
  for (let e of stock) {
    const botonCarrito = document.getElementById(`btncomprar${e.id}`); // Boton

    // Bucle
    botonCarrito.addEventListener("click", () => {
      if (
        !!JSON.parse(localStorage.getItem("Carrito")).find(
          (item) => item.id == e.id
        )
      ) {
        Swal.fire({
          icon: "error",
          title: "Ya se agrrego",
        });
        return;
      }
      agregarProducto(e);
      cardCarritoAgregar(JSON.parse(localStorage.getItem("Carrito")));
      Swal.fire({
        icon: "success",
        title: "Se agrego al carrito",
      });
    }); // Modificar Evento
  }
}

function showCarrito() {
  carritoImg.addEventListener("click", () => {
    carritoDialog.showModal();
  });
  closeModal.addEventListener("click", () => {
    carritoDialog.close();
  });
}
function cardCarritoAgregar(carrito) {
  modalDiv.innerHTML = "";
  if (!carrito) return;
  for (let e of carrito) {
    let modalCarrito = document.createElement("div");
    modalCarrito.innerHTML = `      
    <img class="img-carrito" src="${e.imagen}"/>
    <div class="titulo-Container" id="${e.id}">
      <h2 class="carrito">${e.nombre}</h2>
      <h2 class="carrito-Precio">${e.precio}</h2>
      <h2 class="carrito-eliminar">X</h2>
    </div>`;
    modalDiv.appendChild(modalCarrito);
  }
  precioTotal();
}

function favGuardar(stock) {
  //Evento del boton "Agreagar al carrit
  for (let e of stock) {
    // Bucle
    const checkboxFav = document.getElementById(`checkboxFav${e.id}`);
    checkboxFav.addEventListener("click", (event) => {
      fav.push(e.nombre);
      checkboxFav.className = `classredLike`;
      localStorage.setItem("Favorito", JSON.stringify(fav));
    }); // Modificar Evento
  }
}

function buscadorInput(input, array) {
  let resultadoBusqueda = array.filter((e) =>
    e.nombre.toLowerCase().includes(input)
  );
  if (resultadoBusqueda.length == 0) {
    console.log(`nonnonon`);
    verCardsBeats(stock);
  } else {
    verCardsBeats(resultadoBusqueda);
  }
}
function precioTotal() {
  const carrito = JSON.parse(localStorage.getItem("Carrito"));
  let total = 0;
  carrito.forEach((item) => (total += item.precio));
  document.getElementById("totalCarrito").innerText = total;
  return total;
}
function FinalizarCompra() {
  confirmarCompra.addEventListener("click", () => {
    Swal.fire({
      title: "Finalizar compra",
      showDenyButton: true,
      confirmButtonText: "Confiramr",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Se a finalizado la compra, revisa tu E-Mail");
      } else if (result.isDenied) {
        Swal.fire("Se Cancelo la compra");
      }
    });
    carritoDialog.close();
  });
} // Ejecucion del Evento del boton
cargarCards();
setTimeout(() => {
  loaderAnimation.innerHTML = "";
  verCardsBeats(stock);
  FinalizarCompra();
  agregarCarrito(stock);
  favGuardar(stock);
  showCarrito(carrito);
  cardCarritoAgregar(JSON.parse(localStorage.getItem("Carrito")));
  document.getElementById("limpiar-carrito").addEventListener("click", () => {
    localStorage.setItem("Carrito", JSON.stringify([]));
    cardCarritoAgregar(JSON.parse(localStorage.getItem("Carrito")));
    Swal.fire({
      icon: "warning",
      title: "Se elimino el carrito",
    });
    carritoDialog.close();
  });

  buscador.addEventListener("input", () => {
    buscadorInput(buscador.value, stock);
  });
  modalDiv.addEventListener("click", (e) => {
    if (!e.target.className.includes("carrito-eliminar")) return;
    const cardId = e.target.parentElement.id;
    const carritoStorage = JSON.parse(localStorage.getItem("Carrito"));
    const newCarrito = carritoStorage.filter(
      (producto) => producto.id != cardId
    );
    console.log(newCarrito);
    localStorage.setItem("Carrito", JSON.stringify(newCarrito));
    cardCarritoAgregar(JSON.parse(localStorage.getItem("Carrito")));
  });
}, 1000);
