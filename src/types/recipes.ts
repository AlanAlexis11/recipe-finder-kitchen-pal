export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number; // in minutes
  difficulty: "Fácil" | "Intermedio" | "Difícil";
  category: string;
  steps: string[];
}
