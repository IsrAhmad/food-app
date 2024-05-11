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
  // addRecipeForm = new FormGroup({
  //   name: new FormControl(''),
  //   description: new FormControl(''),
  //   price: new FormControl(''),
  //   tagId: new FormControl(''),
  //   recipeImage: new FormControl(''),
  //   categoriesIds: new FormControl(),
  // });

  data: { [key: string]: any } = {
    name: "",
    description: "",
    price: null,
    tagId: null,
    categoriesIds: [],
    recipeImage: null,
  }



  addRecipeForm!: FormGroup;

  imgSrc: any;
  id!: number;
  image!: any;
  listTags: Tag[] = [];
  listCategories: any[] = [];
  recipeId: number = 0;
  recipeData: any;
  baseUrl = "https://upskilling-egypt.com:3006/";
selectedCategoryIds: number[] =[];
files: any[] =[];

  constructor(
    private _RecipeService: RecipeService,
    private _CategoryService: CategoryService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    _ActivatedRoute.snapshot.params['id']; //'id' here refers to the name I put in the recipes-routing module path in the Routes = [{path: 'edit/id, component: blablabla'}]
  }

  ngOnInit(): void {

     this.addRecipeForm = new FormGroup({
    name: new FormControl(this.data['name']),
    description: new FormControl(this.data['description']),
    price: new FormControl(this.data['price']),
    tagId: new FormControl(this.data['tagId']),
    recipeImage: new FormControl(this.data['recipeImage']),
    categoriesIds: new FormControl(this.data['categoriesIds'])
  });


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
        // for(let i=0 ; i<this.recipeData.category.length ; i++){
        //   this.selectedCategoryIds.push(this.recipeData.category[i].id);
        //  }
        // const categoriesIds = this.recipeData.category.map((category: { id: number }) => category.id).join(',');

        const imgUrl:any = this.baseUrl + this.recipeData.imagePath;

        this.fetchImage(imgUrl);
        // const categoriesIds = this.recipeData.category.map((category: { id: number }) => category.id).join(',');
        // const categoriesIds = this.recipeData.category.map((category: { id: number }) => category.id);
        this.addRecipeForm.patchValue({
          name: this.recipeData.name,
          price: this.recipeData.price,
          // categoriesIds:categoriesIds,
          // categoriesIds: this.recipeData.category.map((category: { id: number }) => category.id).join(','),
          // categoriesIds: this.recipeData.categoriesIds.join(','),
          categoriesIds: this.recipeData.category.map((value:any) => value.id),
          // categoriesIds: this.selectedCategoryIds,
          tagId: this.recipeData.tag.id,
          description: this.recipeData.description,
          recipeImage: imgUrl,
          // recipeImage: this.baseUrl + this.recipeData.imagePath,
        })
      }
    })
  }

  async fetchImage(url: string) {
    var res = await fetch(url);
    var blob = await res.blob();
    this.image = blob;
    return blob;
  };

  onSelect(event: any) {
    this.image = event.addedFiles[0];
  }

  onRemove(event: any) {
    this.image = null;
  }

  sendData(recipeData: FormGroup) {
    console.log(recipeData.value);
    let data = new FormData();


    for (let key in this.addRecipeForm.value) {
      if (key === "recipeImage") continue;
      data.append(key, this.addRecipeForm.value[key]);
    }

    if (this.imgSrc) data.append("recipeImage", this.imgSrc);

    if(this.recipeId) {
      this._RecipeService.onAddRecipe(data).subscribe({
        next: (res) => {
          console.log(res);

        }
      })
    }
    else {
      this._RecipeService.onEditRecipe(data, this.recipeId).subscribe({
        next: (res) => {
          console.log(res);

        }
      })
    }
  }
}
