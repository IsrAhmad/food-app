import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { CategoryService } from 'src/app/admin/categories/services/category.service';
import { RecipeService } from 'src/app/admin/recipes/services/recipe.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { Tag } from '../../admin/recipes/models/tag';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent {
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
        console.log(res);
        this.listData = res;
        //TODO: this.listData = res.data; is INCORRECT because it removes the pagination
      },
    });
  }

  getTags() {
    this._RecipeService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.listTags = res;
        //TODO: this.listData = res.data; is INCORRECT because it removes the pagination
      },
    });
  }

  getAllCategories() {
    this._CategoryService.getAllCategories(10000, 1).subscribe({
      next: (res) => {
        console.log(res);
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
