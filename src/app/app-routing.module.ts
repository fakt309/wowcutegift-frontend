import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CreateComponent } from './create/create.component'

const routes: Routes = [
  {
    component: CreateComponent,
    path: 'create'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
