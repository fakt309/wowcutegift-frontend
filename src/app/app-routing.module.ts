import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { CreateComponent } from './create/create.component'
import { GiftComponent } from './gift/gift.component'
import { PaymentComponent } from './payment/payment.component'
import { ReadyPageComponent } from './ready-page/ready-page.component'
import { AnalyticComponent } from './analytic/analytic.component'
import { TestComponent } from './test/test.component'

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
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
  },
  {
    component: AnalyticComponent,
    path: 'analytic'
  },
  {
    component: TestComponent,
    path: 'test'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
