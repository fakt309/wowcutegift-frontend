import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CreateComponent } from './create/create.component'
import { GiftComponent } from './gift/gift.component'
import { PaymentComponent } from './payment/payment.component'
import { ReadyPageComponent } from './ready-page/ready-page.component'

const routes: Routes = [
  {
    component: CreateComponent,
    path: 'create'
  },
  {
    component: GiftComponent,
    path: 'gift'
  },
  {
    component: PaymentComponent,
    path: 'payment'
  },
  {
    component: ReadyPageComponent,
    path: 'ready'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
