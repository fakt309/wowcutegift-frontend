import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CreateComponent } from './create/create.component'

const routes: Routes = [
  {
    component: CreateComponent,
    path: 'create'
  },
  {
    component: CreateComponent,
    path: 'gift'
  },
  {
    component: CreateComponent,
    path: 'payment'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
