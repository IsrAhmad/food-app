import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { CategoryService } from '../categories/services/category.service';
import { Tag } from '../recipes/models/tag';
import { RecipeService } from '../recipes/services/recipe.service';
import { UsersService } from './services/users.service';
import { ViewUserComponent } from './components/view-user/view-user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  emptyImg: string = '../../../assets/images/default-user.png';
  pageSize: number = 10;
  pageNumber: number = 0;
  listData: any;
  categryItem: string = '';

  value = 'Clear me';
  searchValue: string = '';
  listTags: Tag[] = [];
  listCategories: any[] = []; //TODO: make categories INTEFRACE

  constructor( private _UsersService:UsersService,
    private _CategoryService: CategoryService,
    private _RecipeService: RecipeService,
    public dialog: MatDialog
  ) {
    this.getUsersData();
  }

  roleIds: number[] = [];
  parameterKey: number = 0;

  getUsersData() {
    console.log(this.parameterKey);
    console.log(this.searchValue);


    let paramData = {
      [this.parameterKey]: this.searchValue, //[] brackets when the value is dynamic
      groups: this.roleIds,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };

    this._UsersService.getAllUsers(paramData).subscribe({
      next: (res) => {
        console.log(res);
        this.listData = res;
        //TODO: this.listData = res.data; is INCORRECT because it removes the pagination
      },
    });
  }


  openViewUserDialog(userData: any): void {
    console.log(userData);
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: userData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.onDeleteItem(result);
      }
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
    this._UsersService.onDeleteUser(id).subscribe({
      next: (res) => {
        console.log(res);
      },error:()=>{},
      complete:()=>{
        this.getUsersData();
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getUsersData();
  }

}
