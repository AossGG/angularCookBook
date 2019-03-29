import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  UserRecipesChanged = new Subject<Recipe[]>();
  private Userrecipes: Recipe[]=[];
  private recipes: Recipe[] = []
  //   new Recipe(
  //     'Tasty Schnitzel',
  //     'A super-tasty Schnitzel - just awesome!',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]),
  //   new Recipe('Big Fat Burger',
  //     'What else you need to say?',
  //     'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 1)
  //     ]),
  //   new Recipe('Steak',
  //     'What else you need to say?',
  //     'https://www.bbcgoodfood.com/sites/default/files/guide/hub-image/2014/02/steak-hub.jpg',
  //     [
  //       new Ingredient('fried chips', 5),
  //       new Ingredient('Meat', 1),
  //       new Ingredient('salat', 1)
  //     ]),
  //   new Recipe('Perfect Air Fryer Salmon',
  //     'What else you need to say?',
  //     'https://noblepig.com/site/wp-content/uploads/2018/02/Perfect-Air-Fryer-Salmon-12.jpg',
  //     [
  //       new Ingredient('Salmon fish', 1),
  //       new Ingredient('salat', 1)
  //     ]),
  //   new Recipe('Perfect Air Fryer Salmon',
  //     'What else you need to say?',
  //     'https://scontent-atl3-1.cdninstagram.com/vp/23c3b5c54f45793b7e5c6da7450ab75b/5D1421F3/t51.2885-15/e35/17595989_398317563867026_4326686338150563840_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com',
  //     [
  //       new Ingredient('c water', 1),
  //       new Ingredient('c sugar', 1),
  //       new Ingredient('g soft goat cheese', 130),
  //       new Ingredient('g kadaif noodles', 200),
  //       new Ingredient('tsp rose water', 2),
  //       new Ingredient(' g melted butter/ margarine', 75)
  //     ])
  // ];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }



  UserSetRecipes(recipes: Recipe[]) {
    this.Userrecipes = recipes;
    this.UserRecipesChanged.next(this.Userrecipes.slice());
  }

  UserGetRecipes() {
    return this.Userrecipes.slice();
  }

  UserGetRecipe(index: number) {
    return this.Userrecipes[index];
  }

  UserAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  UserAddRecipe(recipe: Recipe) {
    this.Userrecipes.push(recipe);
    this.UserRecipesChanged.next(this.Userrecipes.slice());
  }

  UserUpdateRecipe(index: number, newRecipe: Recipe) {
    this.Userrecipes[index] = newRecipe;
    this.UserRecipesChanged.next(this.Userrecipes.slice());
  }

  UserDeleteRecipe(index: number) {
    this.Userrecipes.splice(index, 1);
    this.UserRecipesChanged.next(this.Userrecipes.slice());
  }
}
