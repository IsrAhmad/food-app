import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'edit/:id', component: AddEditCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
