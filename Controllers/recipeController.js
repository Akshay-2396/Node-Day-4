import recipes from "../Modles/recipeSchema.js";

// create recipe / post method

export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new recipes(req.body);
    await newRecipe.save(); //saving the details in mongodb
    res
      .status(200)
      .json({ message: "Recipe Added Successfully", data: newRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all recipe

export const getAllRecipes = async (req, res) => {
  try {
    const getRecipe = await recipes.find();
    res
      .status(200)
      .json({ message: "Recipe Added Successfully", data: getRecipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get recipe by id

export const getRecipeById = async (req, res) => {
  try {
    const recipeid = req.params.id;
    const recipeDetail = await recipes.findById(recipeid);
    if (!recipeDetail) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    res
      .status(200)
      .json({ message: "Recipe retrived Successfully", data: recipeDetail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update

export const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { name, ingredients, procedure } = req.body;
    const result = await recipes.findByIdAndUpdate(
      { _id: recipeId },
      { name, ingredients, procedure },
      { new: true }
    );
    if (result.matchedCount == 0) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    res
      .status(200)
      .json({ message: "Recipe Updated Successfully", data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete

export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const result = await recipes.findByIdAndDelete({ _id: recipeId });
    if (!result) {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
    const recipe = await recipes.find();
    res
      .status(200)
      .json({ message: "Recipe Deleted Successfully", data: recipe });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
