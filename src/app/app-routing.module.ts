import { FindUsersComponent } from './find-users/find-users.component';
import { ProxyService } from './proxy.service';
import { CasePage } from './case/case.page';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';



import { ListPageModule } from './list/list.module';

import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component';
import { UploadPageModule } from './upload/upload.module';

var  routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'case/:id',
    component:CasePage,
    resolve: {
      proxy: ProxyService
    }
  },
  {
    path:'listUsers',
    component:FindUsersComponent,
    resolve:{
      proxy:ProxyService
    }
  },
  //list,upload,case handled by @DeepakKhemraj drk3931@gmail.com
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  {
    path: 'upload',
    loadChildren: './upload/upload.module#UploadPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
