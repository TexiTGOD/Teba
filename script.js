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

//declaracion de objetos
const beatreggeton = new Producto(`Nuevula`, 25, "./IMG/nebulaBeat.jpg", 1);
const beattrap = new Producto(`fack World`, 30, "./IMG/fackwld.jpg", 2);
const sadbeat = new Producto(`I am alone`, 40, "./IMG/solo.jpg", 3);
const richtype2beat = new Producto(`Money`, 33, "./IMG/iamrisch.jpg", 4);
const basbaet = new Producto(`the final min`, 30, "./IMG/tirofinal.jpg", 5);
const richtypebeat = new Producto(`I am Rich`, 20, "./IMG/ihavemoney.jpg", 6);

//Declaracion Array
const stock = [
  beatreggeton,
  beattrap,
  sadbeat,
  richtype2beat,
  basbaet,
  richtypebeat,
];

//declaracion variable del carrito
const carrito = [];
//declaracion variable favorito
const fav = [];
const caritoDialog = document.getElementById("carito-Dialog");
const caritoImg = document.getElementById("carito");
const closeModal = document.querySelector(".closeModal");
function verCardsBeats(Array) {
  //capturar divStock
  let stockDiv = document.getElementById("stockBeats");
  //codigo para imprimir array de stock
  for (let Beats of Array) {
    let nuevoBeat = document.createElement("div");
    nuevoBeat.innerHTML = `
    <label class="container" id="btnFav${Beats.id}" >
      <input type="checkbox">
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
//Funcion para el boton de agregar al carrito
function agregarCarrito(stock) {
  //Evento del boton "Agreagar al carrito"
  for (let e of stock) {
    // Bucle
    let botonCarrito = document.getElementById(`btncomprar${e.id}`); // Boton
    botonCarrito.onclick = () => carrito.push(e.nombre); // Modificar Evento
    localStorage.setItem("Carrito", JSON.stringify(carrito));
  }
}
function showCarrito() {
  caritoImg.addEventListener("click", () => {
    caritoDialog.showModal();
  });
  closeModal.addEventListener("click", () => {
    caritoDialog.close();
  });
}
function cardCarritoAgregar(carrito) {
  for (let e of carrito) {
    let modalCarrito = document.createElement("div");
    let modalDiv = document.getElementsByClassName("card-Carrito-Container");
    modalCarrito.innerHTML = `      
   <img class="img-carrito" src="${carrito.imagen}"/>
  <div class="titulo-Container">
    <h2 class="carrito">${carrito.titulo}</h2>
    <h2 class="carrito-Precio">${carrito.precio}</h2>
  </div>`;
    modalDiv.appendChild(modalCarrito);
  }
}
function favGuardar(stock) {
  //Evento del boton "Agreagar al carrit
  for (let e of stock) {
    // Bucle
    const bottonFav = document.getElementById(`btnFav${e.id}`); // Boton

    bottonFav.addEventListener("click", () => {
      fav.push(e.nombre);
      e.preventDefault();
      localStorage.setItem("Favorito", JSON.stringify(fav));
      console.log(fav);
    }); // Modificar Evento
  }
}

// Ejecucion del Evento del boton
verCardsBeats(stock);
agregarCarrito(stock);
favGuardar(stock);
showCarrito(carrito);
cardCarritoAgregar(carrito);
