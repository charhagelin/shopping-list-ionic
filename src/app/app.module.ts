import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';


import { MyApp } from './app.component';
import { ShoppinglistPage } from '../pages/shoppinglist/shoppinglist';
import { AddShoppingPage } from '../pages/add-shopping/add-shopping';

@NgModule({
  declarations: [
    MyApp,
    ShoppinglistPage,
    AddShoppingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //initial angularfire with credentials from dashbord 
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    //import the firebase datamodule to use database interaction 
    AngularFireDatabaseModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppinglistPage,
    AddShoppingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
