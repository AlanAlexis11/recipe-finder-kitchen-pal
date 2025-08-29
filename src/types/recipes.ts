import { Product } from "./user";

export enum RecipeDifficulty {
  FACIL = "Fácil",
  INTERMEDIO = "Intermedio",
  DIFICIL = "Difícil",
}

export const difficultyNumber: { [key: number]: RecipeDifficulty } = {
  1: RecipeDifficulty.FACIL,
  2: RecipeDifficulty.INTERMEDIO,
  3: RecipeDifficulty.DIFICIL,
};

export interface Recipe {
  id: string;
  name: string;
  ingredients: Product[];
  instructions: string[];
  cookingTime: number; // in minutes
  difficulty: RecipeDifficulty;
  category: string;
  steps: string[];
  imageUrl: string;
  foodType: string;
  calories: number;
}
