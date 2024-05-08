import { Component, OnInit } from '@angular/core';
import { FavService } from './services/fav.service';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fav',
  templateUrl: './fav.component.html',
  styleUrls: ['./fav.component.scss'],
})
export class FavComponent implements OnInit{
  imgUrl: string = 'https://upskilling-egypt.com:3006/';
  emptyImg: string = '../../../assets/images/noRecipe.png';
  pageSize: number = 10;
  pageNumber: number = 0;
  listFav: any;

  constructor(private _FavService:FavService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
      this.getAllFav()
  }


  getAllFav() {
    this._FavService.getAllRecipes().subscribe({
      next: (res) => {
        this.listFav = res;
        console.log(res);

      }
    })
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
    this._FavService.onDeleteFavRecipes(id).subscribe({
      next: (res) => {
        console.log(res);
      },error:()=>{},
      complete:()=>{
        this.getAllFav();
      }
    });
  }



  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;

    this.getAllFav();
  }

}
