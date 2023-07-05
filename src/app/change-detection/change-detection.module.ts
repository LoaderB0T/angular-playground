import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './default/default.component';
import { OnPushAsyncComponent } from './on-push-async/on-push-async.component';
import { OnPushSignalsComponent } from './on-push-signals/on-push-signals.component';
import { ChangeDetectionComponent } from './change-detection.component';

const routes: Routes = [
  {
    path: '',
    component: ChangeDetectionComponent,
    children: [
      {
        path: 'default',
        component: DefaultComponent,
      },
      {
        path: 'on-push-async',
        component: OnPushAsyncComponent,
      },
      {
        path: 'on-push-signals',
        component: OnPushSignalsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ChangeDetectionComponent,
    DefaultComponent,
    OnPushAsyncComponent,
    OnPushSignalsComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ChangeDetectionModule {}
