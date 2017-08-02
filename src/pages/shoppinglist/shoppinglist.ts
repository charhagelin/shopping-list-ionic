import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { FirebaseListObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-items/shopping-items.interface';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

/**
 * Generated class for the ShoppinglistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shoppinglist',
  templateUrl: 'shoppinglist.html',
})
export class ShoppinglistPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: AngularFireDatabase, 
    private actionSheetCtrl: ActionSheetController ) {
    
    //point shoppingListRef to the firebase shopping-list node. enables us to add and access the firebase node 
    this.shoppingListRef$ = this.database.list('shopping-list');
    //nothing will happen to this ref unless we subscribe to it
    // this.shoppingListRef$.subscribe()
  }
  //to see which item has been selected we need to pass in shoppingItem: ShoppingItem
  selectShoppingItem(shoppingItem: ShoppingItem) {
    //to be aboe to impliment the CRUD functions 
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push(EditShoppingItemPage, { shoppingItemId: shoppingItem.$key })
           //make hander sen user to edit item page along with a key as a param 
          }           
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key) //key is in reference to the key inside firebase
           //delete the item, passed in via param  
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('the user have selected the cancel button');
          }
        }
      ]  
    }).present(); //present the action sheet to user 
  }

  nextPage() {
    this.navCtrl.push(AddShoppingPage)
  }

}
