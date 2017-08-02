import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-items/shopping-items.interface'
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the AddShoppingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem
  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]> //import firebase and what kind of list item it is 


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    //defining out shoppingItemRef to be equal to shopping-list. shopping-list point to the node inside firebase 
    this.shoppingItemRef$ = this.database.list('shopping-list')
  }

  addItem(shoppingItem: ShoppingItem) {
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemQuantity: Number(this.shoppingItem.itemQuantity) //create a anonymous object to convert itemQuantity to number. push this to out firebase database unde rthe shopping-list node.
    });
     //resent our shoppingItem
    this.shoppingItem = {} as ShoppingItem;

    //navigate user back to shopping lsit page
    this.navCtrl.pop();
  }

}
