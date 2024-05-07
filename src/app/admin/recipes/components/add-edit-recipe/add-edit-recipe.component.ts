import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from 'src/app/admin/categories/components/add-edit-category/add-edit-category.component';
import { CategoryService } from 'src/app/admin/categories/services/category.service';
import { Tag } from '../../models/tag';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute } from '@angular/router';

//ActivatedRoute //TODO: It's a class inside Angular Routing like 'Router'

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss'],
})
export class AddEditRecipeComponent implements OnInit {
  addRecipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    recipeImage: new FormControl(null),
    categoriesIds: new FormControl(null),
  });

  listTags: Tag[] = [];
  listCategories: any[] = [];
  recipeId: number = 0;
  recipeData: any;

  constructor(
    private _RecipeService: RecipeService,
    private _CategoryService: CategoryService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    _ActivatedRoute.snapshot.params['id']; //'id' here refers to the name I put in the recipes-routing module path in the Routes = [{path: 'edit/id, component: blablabla'}]
  }

  ngOnInit(): void {
    console.log(this._ActivatedRoute.snapshot.params['id']);
    this.recipeId = this._ActivatedRoute.snapshot.params['id'];
    this.getAllCategories();
    this.getTags();

    this.addOrEdit();
  }

  addOrEdit() {
    if (this.recipeId) {
      //edit - subsribe on PUT method
      this.getRecipeById(this.recipeId);
    } else {
      //add - subscribe on POST method
    }
  }

  getTags() {
    this._RecipeService.getTags().subscribe({
      next: (res) => {
        // console.log(res);
        this.listTags = res;
        //TODO: this.listData = res.data; is INCORRECT because it removes the pagination
      },
    });
  }

  getAllCategories() {
    this._CategoryService.getAllCategories(10000, 1).subscribe({
      next: (res) => {
        // console.log(res);
        this.listCategories = res.data;
        //TODO: this.listData = res.data; is INCORRECT because it removes the pagination
      },
    });
  }

  getRecipeById(id: number) {

    this._RecipeService.getRecipeById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.recipeData = res;
      },
      error: () => {},
      complete: () => {
        const categoriesIds = this.recipeData.category.map((category: { id: number }) => category.id);
        this.addRecipeForm.patchValue({
          name: this.recipeData.name,
          price: this.recipeData.price,
          // categoriesIds: this.recipeData.categoriesIds.join(','),
          categoriesIds: this.recipeData.category[0].id,
          tagId: this.recipeData.tag.id,
          description: this.recipeData.description,
          recipeImage: this.recipeData.imagePath,
        })
      }
    });
  }

  sendData(data: FormGroup) {
    console.log(data.value);

    if(this.recipeId) {
      this._RecipeService.onAddRecipe(data.value).subscribe({
        next: (res) => {
          console.log(res);

        }
      })
    }
    else {
      this._RecipeService.onEditRecipe(data.value, this.recipeId).subscribe({
        next: (res) => {
          console.log(res);

        }
      })
    }
  }
}
