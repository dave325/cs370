import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ListPageModule } from './list/list.module';
import { UploadComponent } from './upload/upload.component';
import { CaseViewComponent } from './case-view/case-view.component';
import { HomePage } from './home/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'upload',
    component: UploadComponent
  },
  {
    path:'view-case',
    component: CaseViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
