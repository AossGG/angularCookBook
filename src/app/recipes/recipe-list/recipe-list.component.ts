import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as firebase from 'firebase';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { SaveChangesService } from 'src/app/shared/save-changes.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;
  Authenticated: boolean;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private datachanges : SaveChangesService,
              private route: ActivatedRoute,
              private dataStore: DataStorageService) {
  }

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes();
    this.Authenticated = false;
    firebase.auth().onAuthStateChanged( (user) =>{
      if (user) {
        this.Authenticated = true;
        this.dataStore.getRecipes();
        this.subscription = this.recipeService.UserRecipesChanged
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipes = recipes;
          }
        );
      } else {
        this.Authenticated = false;
        this.dataStore.getPublicRecipes();
        this.subscription = this.recipeService.recipesChanged
        .subscribe(
          (recipes: Recipe[]) => {
            this.recipes = recipes;
          }
        );
      }
    });
  }

  onNewRecipe() {
    this.datachanges.edditMode = true;
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  isAuthenticated(){
    return this.Authenticated;
  }
}
