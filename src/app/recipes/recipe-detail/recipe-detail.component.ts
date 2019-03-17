import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  loggedIn: boolean;
  uid: string;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.loggedIn = false;
    this.uid = "";
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          let temp = this.recipeService.getRecipe(this.id);
          if(temp == null)
          {
            this.router.navigate(['../'], {relativeTo: this.route});
          }
          this.recipe = temp;
        }
      );
      firebase.auth().onAuthStateChanged( (user) =>{
        if (user) {
          console.log("user id logged in");
          this.loggedIn = true;
          this.uid = user.uid;
        } else {
          this.loggedIn = false;
          this.uid = "";
          console.log("user id logged out");

        }
      });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
