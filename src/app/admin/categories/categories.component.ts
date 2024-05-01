import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  pageSize: number = 10;
  pageNumber: number = 0;
  listData: any;
  categryItem: string = '';

  constructor(
    private _CategoryService: CategoryService,
    public dialog: MatDialog
  ) {
    this.getCategoryData();
  }

  getCategoryData() {
    this._CategoryService
      .getAllCategories(this.pageSize, this.pageNumber)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.listData = res;
          //TODO: this.listData = res.data; is INCORRECT because it removes the pagination
        },
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { name: this.categryItem },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if(result) {
        this.addCategory(result);
      }
    });
  }

  // hidePageSize = false;
  // disabled = false;
  // pageEvent: PageEvent;

  // length = 50;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25];

  showPageSizeOptions = true;
  showFirstLastButtons = true;

  handlePageEvent(e: PageEvent) {
    console.log(e);
    // this.pageEvent = e;
    // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getCategoryData();
  }

  addCategory(categoryName: string) {
    this._CategoryService.onAddCategory(categoryName).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err) => {},
      complete:() => {
        this.getCategoryData();
      }
    })
    // let data = {
    //   name: categoryName,
    // };
    // this._CategoryService.onAddCategory(data);
  }


}
