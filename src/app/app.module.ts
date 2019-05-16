import { CasePageModule } from './case/case.module';
import { ProxyService } from './proxy.service';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UploadPage } from './upload/upload.page';
import { CasePage } from './case/case.page';
import { ListPage } from './list/list.page';
import { HomePage } from './home/home.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
  
  ],
  entryComponents: [
    LoginComponent,
    CasePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ProxyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
