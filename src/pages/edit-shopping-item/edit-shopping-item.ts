import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-items/shopping-items.interface'
import { Subscription } from 'rxjs/Subscription'
//import subscription to unsubsribe from athe observable when leaving page


@IonicPage()
@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
 //för att vi inte längre kollar på listan utan på själva item
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>; 
  shoppingItem = {} as ShoppingItem
//assigning shoppignItem to be a new javascript item as ShoppigItem
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: AngularFireDatabase) {


   //capture the shoppingItemId as a nav param
   const shoppingItemId = this.navParams.get('shoppingItemId');   
   //sert the scope of our firebase object equal to our selected item
    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);   
    //subscribe the object and assing result to this.shoppingItem
    this.shoppingItemSubscription = this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem);
  }

  editItem(shoppingItem: ShoppingItem) {
    this.shoppingItemRef$.update(shoppingItem);
    this.navCtrl.pop()
  }

  ionViewWillLeave() {
    this.shoppingItemSubscription.unsubscribe(); 
    //sets the lifecycle to unsubscribe when leaving the page. frees up memory resources and makes sure you have no unecessary subs.
  }

}
