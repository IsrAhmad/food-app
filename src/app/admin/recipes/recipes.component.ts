import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { RecipeService } from './services/recipe.service';
import { Tag } from './models/tag';
import { CategoryService } from '../categories/services/category.service';
import { ICategory } from '../categories/models/category';
import { AddEditCategoryComponent } from '../categories/components/add-edit-category/add-edit-category.component';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  emptyImg: string = '../../../assets/images/noRecipe.png';
  pageSize: number = 10;
  pageNumber: number = 1;
  listData: any;
  categryItem: string = '';

  value = 'Clear me';
  searchValue: string = '';
  listTags: Tag[] = [];
  listCategories: any[] = []; //TODO: make categories INTEFRACE

  constructor(
    private _CategoryService: CategoryService,
    private _RecipeService: RecipeService,
    public dialog: MatDialog
  ) {
    this.getRecipeData();
    this.getTags();
    this.getAllCategories();
  }

  tagId: number = 0;
  categoryId: number = 0;

  getRecipeData() {
    let paramData = {
      name: this.searchValue,
      tagId: this.tagId,
      categoryId: this.categoryId,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };

    this._RecipeService.getAllRecipes(paramData).subscribe({
      next: (res) => {
        // console.log(res);
        this.listData = res;
        //TODO: this.listData = res.data; is INCORRECT because it removes the pagination
      },
    });
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

  openDeleteDialog(id: number): void {
    console.log(id);
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { itemId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.onDeleteItem(result);
      }
    });
  }

  onDeleteItem(id: number) {
    this._RecipeService.onDeleteRecipe(id).subscribe({
      next: (res) => {
        console.log(res);
      },error:()=>{},
      complete:()=>{
        this.getRecipeData();
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getRecipeData();
  }
}
