import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChangeDetectionModule } from './change-detection/change-detection.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'changeDetection',
    loadChildren: () => ChangeDetectionModule,
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
