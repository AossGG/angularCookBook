import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { SaveChangesService } from 'src/app/shared/save-changes.service';

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
              private router: Router,
              private datachanges : SaveChangesService) {
  }

  ngOnInit() {
    this.loggedIn = false;
    this.uid = "";
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
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = +params['id'];
        let temp = this.getrecip(this.id);
        if(temp == null)
        {
          this.router.navigate(['../'], {relativeTo: this.route});
        }
        this.recipe = temp;
      }
    );    

  }
  getrecip(id: number): any {
    if(this.loggedIn)
       return this.recipeService.UserGetRecipe(this.id);
    else
       return this.recipeService.getRecipe(this.id);
  }

  onAddToShoppingList() {
    if(this.loggedIn ) {
      this.recipeService.UserAddIngredientsToShoppingList(this.recipe.ingredients);
    }else{
      this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }
  }

  onEditRecipe() {
    if(this.loggedIn ) {
      this.datachanges.edditMode = true;
      this.router.navigate(['edit'], {relativeTo: this.route});
    }
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    if(this.loggedIn ) {
      this.recipeService.UserDeleteRecipe(this.id);
      this.datachanges.isChanged = true;
      this.datachanges.isChangesSaved = false; 
      this.router.navigate(['/recipes']);
    }
  }

}
