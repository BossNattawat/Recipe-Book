import { create } from 'zustand'

interface Recipe {
    id: number
    name: string
    ingredients: string[]
    instructions: string
}

interface Recipes {
    recipes: Recipe[]
    addRecipe: (recipe: Recipe) => void
    removeRecipe: (id: number) => void
}

const loadRecipes = (): Recipe[] => {
    const storedRecipes = localStorage.getItem("recipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
};

export const useStore = create<Recipes>((set) => ({
    recipes: loadRecipes(),
    addRecipe: (recipe) => set((state) => {
        const updatedRecipes = [...state.recipes, recipe];
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        return { recipes: updatedRecipes };
    }),
    removeRecipe: (id) => set((state) => {
        const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
        localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
        return { recipes: updatedRecipes };
    }),
}))