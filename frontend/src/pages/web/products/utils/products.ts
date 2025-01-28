import uniformeDeportivo from "../assets/conjunto-removebg-preview.png"
import pantalongris from "../assets/pantalongris2-removebg-preview.png"
import cbtaUniforme from "../assets/cbta-removebg-preview.png"
import escolta from "../assets/uniformes-escolta-removebg-preview.png"
import careta from "../assets/orimaria-img.png"
import deportivaroja from "../assets/deportiva-removebg-preview.png"
import shortsnegros from "../assets/shortsnegros-removebg-preview.png"
import calcetasAzul from "../assets/calceta-azul-marino-removebg-preview.png"
import chaquetaAzul from "../assets/chaquetaazul.png"
import polo3 from "../assets/polo-3-removebg-preview.png"
import sudare from "../assets/sudadera-removebg-preview.png"
import gorraNaranja from "../assets/gorranaranja-removebg-preview.png"
import casualRojo from "../assets/casualrojo.png"
import poloAzul from "../assets/polo_azul-removebg-preview.png";
import playerarosa from "../assets/mujer-rosa.png";
import calcetas from "../assets/calcetas-grises.png"
import espinilleras from "../assets/espinnilleras-grises.png"
import gorraUnisex from "../assets/gorraunisex.png"
import uniformeEscolar from "../assets/uniformeescolarhombre.png"
import playeraDeportivaMujer from "../assets/deportivomujer.png"
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  color: string;
  size: string;
  sex:string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Uniforme Deportivo Azul",
    price: 299,
    image: uniformeDeportivo,
    category: "Uniformes Deportivos",
    color: "#3B82F6", // Azul
    size: "M",
    sex:"Hombre"
  },
  {
    id: 2,
    name: "Uniforme CBTA femenino",
    price: 349,
    image: cbtaUniforme,
    category: "Uniformes Escolares",
    color: "#FFFFFF", // Blanco
    size: "L",
    sex:"Mujer"
  },
  {
    id: 3,
    name: "Camiseta Deportiva Roja",
    price: 199,
    image: deportivaroja,
    category: "Uniformes Deportivos",
    color: "#EF4444", // Rojo
    size: "S",
    sex:"Hombre"
  },
  {
    id: 4,
    name: "Pantalón Escolar Gris",
    price: 249,
    image: pantalongris,
    category: "Uniformes Escolares",
    color: "#6B7280", // Gris
    size: "M",
    sex:"Hombre"
  },
  {
    id: 5,
    name: "Shorts Deportivos Negros",
    price: 179,
    image: shortsnegros,
    category: "Uniformes Deportivos",
    color: "#111827", // Negro
    size: "L",
    "sex":"Hombre"
  },
  {
    id: 6,
    name: "Uniforme de escolta",
    price: 229,
    image: escolta,
    category: "Uniformes Escolares",
    color: "#111827", // Negro
    size: "S",
    sex:"Unisex"
  },
  {
    id: 7,
    name: "Chaqueta Deportiva",
    price: 399,
    image: chaquetaAzul,
    category: "Uniformes Deportivos",
    color: "#3B82F6", // Azul
    size: "XL",
    sex:"Hombre"
  },
  {
    id: 8,
    name: "Calcetas negras",
    price: 59,
    image: calcetasAzul,
    category: "Calcetas",
    color: "#111827", // Negro
    size: "M",
    sex:"Unisex"
  },
  {
    id: 9,
    name: "Polo Secundaria 3",
    price: 189,
    image: polo3,
    category: "Polos",
    color: "#FFFFFF", // Verde
    size: "L",
    sex:"Hombre"
  },
  {
    id: 10,
    name: "Sudadera con Capucha",
    price: 329,
    image: sudare,
    category: "Uniformes Deportivos",
    color: "#111827", // Negro
    size: "XL",
    sex:"Hombre"
  },
  {
    id: 11,
    name: "Gorra Deportiva",
    price: 89,
    image: gorraNaranja,
    category: "Gorras",
    color: "#F59E0B", // Naranja
    size: "M",
    sex:"Unisex"
  },
  {
    id: 12,
    name: "Playera Casual",
    price: 149,
    image: casualRojo,
    category: "Playeras",
    color: "#EF4444", // Rojo
    size: "S",
    sex:"Hombre"
  },
  {
    id: 13,
    name: "Uniforme Fausta Careta",
    price: 229,
    image: careta,
    category: "Uniformes Escolares",
    color: "#111827", // Negro
    size: "S",
    sex:"Unisex"
  },
  {
    id: 14,
    name: "Polo Casual Hombre",
    price: 199,
    image: poloAzul,
    category: "Polos",
    color: "#2563EB", // Azul intenso
    size: "M",
    sex: "Hombre",
  },
  {
    id: 15,
    name: "Playera Básica Mujer",
    price: 149,
    image: playerarosa,
    category: "Playeras",
    color: "#F87171", // Rosa claro
    size: "S",
    sex: "Mujer",
  },
  {
    id: 16,
    name: "Calcetas  Hombre",
    price: 69,
    image: calcetas,
    category: "Calcetas",
    color: "#4B5563", // Gris oscuro
    size: "L",
    sex: "Hombre",
  },
  {
    id: 17,
    name: "Espinilleras Pro",
    price: 299,
    image: espinilleras,
    category: "Espinilleras",
    color: "#374151", // Gris medio
    size: "M",
    sex: "Unisex",
  },
  {
    id: 18,
    name: "Gorra Unisex",
    price: 99,
    image: gorraUnisex,
    category: "Gorras",
    color: "#D97706", // Naranja oscuro
    size: "M",
    sex: "Unisex",
  },
  {
    id: 19,
    name: "Uniforme Escolar Primaria Hombre",
    price: 349,
    image: uniformeEscolar,
    category: "Uniforme Escolar",
    color: "#F3F4F6", // Blanco/gris claro
    size: "L",
    sex: "Hombre",
  },
  {
    id: 20,
    name: "Playera Deportiva Mujer",
    price: 329,
    image: playeraDeportivaMujer,
    category: "Uniforme Deportivo",
    color: "#60A5FA", // Azul claro
    size: "M",
    sex: "Mujer",
  },
  {
    id: 21,
    name: "Polo Estilo Deportivo Unisex",
    price: 209,
    image: polo3,
    category: "Polos",
    color: "#34D399", // Verde menta
    size: "S",
    sex: "Unisex",
  },
  {
    id: 22,
    name: "Playera Casual Hombre",
    price: 159,
    image: casualRojo,
    category: "Playeras",
    color: "#F87171", // Rosa claro
    size: "L",
    sex: "Hombre",
  },
  {
    id: 23,
    name: "Calcetas Escolares Mujer",
    price: 49,
    image: calcetasAzul,
    category: "Calcetas",
    color: "#1E293B", // Azul marino
    size: "S",
    sex: "Mujer",
  },
  {
    id: 24,
    name: "Espinilleras Clásicas Hombre",
    price: 199,
    image: shortsnegros,
    category: "Espinilleras",
    color: "#6B7280", // Gris
    size: "L",
    sex: "Hombre",
  },
  {
    id: 25,
    name: "Gorra Casual Mujer",
    price: 89,
    image: gorraNaranja,
    category: "Gorras",
    color: "#F59E0B", // Amarillo
    size: "S",
    sex: "Mujer",
  },
  {
    id: 26,
    name: "Uniforme Escolar Secundaria Mujer",
    price: 389,
    image: cbtaUniforme,
    category: "Uniforme Escolar",
    color: "#FFFFFF", // Blanco
    size: "M",
    sex: "Mujer",
  },
  {
    id: 27,
    name: "Uniforme Deportivo Unisex",
    price: 309,
    image: uniformeDeportivo,
    category: "Uniforme Deportivo",
    color: "#3B82F6", // Azul
    size: "XL",
    sex: "Unisex",
  },
  {
    id: 28,
    name: "Polo Deportivo Hombre",
    price: 219,
    image: polo3,
    category: "Polos",
    color: "#0EA5E9", // Azul celeste
    size: "M",
    sex: "Hombre",
  },
  {
    id: 29,
    name: "Playera Casual Unisex",
    price: 169,
    image: casualRojo,
    category: "Playeras",
    color: "#F43F5E", // Rosa oscuro
    size: "L",
    sex: "Unisex",
  },
];

