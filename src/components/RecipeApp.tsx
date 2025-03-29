import { useState } from "react"
import { useStore } from "../store"

interface Recipe {
    id: number
    name: string
    ingredients: string[]
    instructions: string
}

function RecipeApp() {

    const { recipes, addRecipe, removeRecipe } = useStore()
    const [name, setName] = useState<string>("")
    const [ingredients, setIngredients] = useState<string>("")
    const [instructions, setInstructions] = useState<string>("")
    const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)

    function handleUpdateRecipe(){
        if(name.trim() === "" || ingredients.trim() === "" || instructions.trim() === ""){
            return
        }

        if(editingRecipe){
            removeRecipe(editingRecipe.id)
            addRecipe({
                id: Date.now(),
                name: name,
                ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
                instructions: instructions
            })

            setEditingRecipe(null)
        }

        setName("")
        setIngredients("")
        setInstructions("")
    }

    function handleAddRecipe(){
        if(name.trim() === "" || ingredients.trim() === "" || instructions.trim() === ""){
            return
        }

        addRecipe({
            id: Date.now(),
            name: name,
            ingredients: ingredients.split(",").map((ingredient) => ingredient.trim()),
            instructions: instructions
        })
        setName("")
        setIngredients("")
        setInstructions("")
    }

    function handleCancleRecipe(){
        setEditingRecipe(null)
        setName("")
        setIngredients("")
        setInstructions("")
    }

    function handleEditRecipe(recipe: Recipe){
        setEditingRecipe(recipe)
        setName(recipe.name)
        setIngredients(recipe.ingredients.join(", "))
        setInstructions(recipe.instructions)
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300">
        <div className="bg-base-100 p-6 rounded-lg w-full max-w-2xl shadow">
            <h1 className="text-3xl font-semibold mb-6 text-center text-base-content">
                Recipe Book
            </h1>
            <div className="space-y-4 mb-6">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipe Name..." className="input w-full"/>
                <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Recipe Ingredients..." className="input w-full"/>
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} placeholder="Recipe Instructions..." className="textarea w-full"/>
            
                <div className="flex justify-between">
                    {editingRecipe ? (
                        <>
                            <button className="btn btn-soft btn-accent" onClick={handleUpdateRecipe}>Update Recipe</button>
                            <button className="btn btn-soft btn-error" onClick={handleCancleRecipe}>Cancle</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-soft btn-accent" onClick={handleAddRecipe}>Add Recipe</button>
                        </>
                    )}
                </div>
            </div>

            <ul className="space-y-3">
                {recipes.map((recipe, index) => (
                    <li key={index} className="p-4 bg-base-200 rounded shadow">
                        <h2 className="text-xl text-base-content font-semibold mb-2">{recipe.name}</h2>
                        <p className="text-base-content mb-2">
                            <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                        </p>
                        <p className="text-base-content mb-4">
                        <strong>Instructions:</strong><br />
                        {recipe.instructions.split("\n").map((line, i) => (
                            <span key={i}>
                                {line}
                                <br />
                            </span>
                        ))}
                        </p>

                        <div className="flex justify-between">
                            <button onClick={() => handleEditRecipe(recipe)} className="btn btn-soft btn-info">Edit</button>
                            <button onClick={() => removeRecipe(recipe.id)} className="btn btn-soft btn-error">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default RecipeApp