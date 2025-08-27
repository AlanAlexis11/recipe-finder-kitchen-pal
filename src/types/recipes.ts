export enum RecipeDifficulty {
  FACIL = "Fácil",
  INTERMEDIO = "Intermedio",
  DIFICIL = "Difícil",
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: number; // in minutes
  difficulty: RecipeDifficulty;
  category: string;
  steps: string[];
}