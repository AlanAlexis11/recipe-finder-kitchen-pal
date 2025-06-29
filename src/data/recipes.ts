
export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number; // in minutes
  difficulty: "Fácil" | "Intermedio" | "Difícil";
  category: string;
}

export const recipes: Recipe[] = [
  {
    id: "1",
    name: "Tortilla de Huevos",
    ingredients: ["huevos", "sal", "aceite"],
    instructions: [
      "Batir los huevos en un bol",
      "Agregar una pizca de sal",
      "Calentar aceite en una sartén",
      "Verter los huevos batidos",
      "Cocinar hasta que cuaje por ambos lados"
    ],
    cookingTime: 10,
    difficulty: "Fácil",
    category: "Desayuno"
  },
  {
    id: "2",
    name: "Pasta con Tomate",
    ingredients: ["pasta", "tomate", "ajo", "aceite", "sal"],
    instructions: [
      "Hervir agua con sal para la pasta",
      "Cocinar la pasta según las instrucciones del paquete",
      "En otra sartén, calentar aceite y agregar ajo picado",
      "Añadir tomate cortado en cubos",
      "Sazonar con sal y cocinar 5 minutos",
      "Mezclar la pasta con la salsa de tomate"
    ],
    cookingTime: 20,
    difficulty: "Fácil",
    category: "Almuerzo"
  },
  {
    id: "3",
    name: "Ensalada César",
    ingredients: ["lechuga", "queso", "pan", "aceite", "limón"],
    instructions: [
      "Lavar y cortar la lechuga",
      "Tostar el pan y cortarlo en cubitos",
      "Rallar el queso",
      "Preparar aderezo con aceite y limón",
      "Mezclar todos los ingredientes"
    ],
    cookingTime: 15,
    difficulty: "Fácil",
    category: "Ensaladas"
  },
  {
    id: "4",
    name: "Pollo a la Plancha",
    ingredients: ["pollo", "sal", "pimienta", "aceite", "limón"],
    instructions: [
      "Sazonar el pollo con sal y pimienta",
      "Calentar aceite en una plancha o sartén",
      "Cocinar el pollo 6-8 minutos por lado",
      "Verificar que esté bien cocido",
      "Servir con limón"
    ],
    cookingTime: 20,
    difficulty: "Intermedio",
    category: "Carne"
  },
  {
    id: "5",
    name: "Arroz con Huevo",
    ingredients: ["arroz", "huevos", "cebolla", "aceite", "sal"],
    instructions: [
      "Cocinar el arroz según las instrucciones",
      "Picar la cebolla finamente",
      "Calentar aceite en una sartén",
      "Saltear la cebolla hasta que esté dorada",
      "Agregar el arroz cocido y mezclar",
      "Hacer un hueco en el centro y agregar los huevos",
      "Revolver todo hasta que los huevos se cocinen"
    ],
    cookingTime: 25,
    difficulty: "Intermedio",
    category: "Almuerzo"
  },
  {
    id: "6",
    name: "Sándwich de Queso",
    ingredients: ["pan", "queso", "manteca"],
    instructions: [
      "Untar manteca en las rebanadas de pan",
      "Colocar queso entre las rebanadas",
      "Calentar una sartén",
      "Tostar el sándwich por ambos lados hasta que el queso se derrita"
    ],
    cookingTime: 5,
    difficulty: "Fácil",
    category: "Desayuno"
  },
  {
    id: "7",
    name: "Sopa de Cebolla",
    ingredients: ["cebolla", "aceite", "sal", "pimienta", "queso"],
    instructions: [
      "Cortar las cebollas en juliana",
      "Calentar aceite en una olla",
      "Cocinar las cebollas a fuego lento hasta caramelizar",
      "Agregar agua caliente",
      "Sazonar con sal y pimienta",
      "Servir con queso rallado encima"
    ],
    cookingTime: 30,
    difficulty: "Intermedio",
    category: "Sopas"
  },
  {
    id: "8",
    name: "Papas Fritas",
    ingredients: ["papa", "aceite", "sal"],
    instructions: [
      "Pelar y cortar las papas en bastones",
      "Calentar aceite abundante",
      "Freír las papas hasta que estén doradas",
      "Escurrir en papel absorbente",
      "Sazonar con sal al gusto"
    ],
    cookingTime: 15,
    difficulty: "Fácil",
    category: "Acompañamientos"
  },
  {
    id: "9",
    name: "Yogurt con Frutas",
    ingredients: ["yogurt", "azúcar"],
    instructions: [
      "Servir el yogurt en un bol",
      "Endulzar con azúcar al gusto",
      "Mezclar bien y servir frío"
    ],
    cookingTime: 2,
    difficulty: "Fácil",
    category: "Postre"
  },
  {
    id: "10",
    name: "Milanesas de Carne",
    ingredients: ["carne", "huevos", "pan", "sal", "aceite"],
    instructions: [
      "Cortar la carne en filetes finos",
      "Sazonar con sal",
      "Batir los huevos",
      "Rallar el pan para hacer pan rallado",
      "Pasar cada filete por huevo y luego por pan rallado",
      "Freír en aceite caliente hasta dorar"
    ],
    cookingTime: 25,
    difficulty: "Intermedio",
    category: "Carne"
  }
];
