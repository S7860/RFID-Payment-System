import { 
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    
 } from "react-native";
import React from 'react';
import {stringText} from './ReadNFCScreen';
import {styles} from "../stylesheets/welcomeScreenStyle"
import { Button, Card, CardSwiper, List, ListItem } from "native-base";

import * as firebase from 'firebase'
import '@firebase/firestore';
import {firebaseConfig} from '../config/FirebaseAuth'

// this initializes the database
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export default class ProductList extends React.Component {
    
    constructor(props) {
        super(props);
        stringText.toString();
        this.state = {
            paredString: [],
            mylist: [],
            pushedDb: [],
            pushedItem: [],
        }; 
    }
    
    componentDidMount(){
        this.setState({paredString:stringText});
        const myitems = firebase.database().ref("Product Name")
        myitems.once("value", datasnap => {
            const items_db = datasnap.val();
            let prod = Object.values (datasnap.val());
            this.setState({mylist: prod })
        });
    }
    
    componentWillUnmount(){
        if(this.state.myItemsReference) {
            myItemsReference.off("value");
        }
    }
    render() {

        let {paredString, mylist,pushedDb, pushedItem} = this.state;
        // console.log("state1:", this.state)
        const tagContent = this.state.paredString.map(tagString => {
            return(
                <ListItem style = {{justifyContent:"space-between"}}>
                    <Text>{tagString}</Text>
                </ListItem>
            )
        })
 
        Object.values(mylist).map((dataBaseList) => {
            let target = (dataBaseList);
            let string = (paredString);
           for(let i=0; i< string.length; i++){
                if( ((target.Name) == (string[i])) ){                    
                    this.state.pushedDb.push(target.Name,target.Price)
                    console.log("matched", pushedDb)
                }
            }
        });
    
        // This reduce function puts 2 elements togther in a pushedDb array so 
        // the item and price are mapped together instaed of a 1 long string
        const rows = this.state.pushedDb.reduce(function (rows, key, index) { 
            return (index % 2 == 0 ? rows.push([key  + '     $' ]) : rows[rows.length-1].push(key)) && rows ;
          }, [], );
        
        //   This maps the items that will be displayed on the app screen
        pushedItem = rows.map((lists) => {
            return(
                <Card style={styles.itemCardContainer}>
                    <ListItem >
                        <Text style={styles.itemLists}>  {lists}  </Text>
                    </ListItem>
                </Card>
            )
        })

        return (
            <SafeAreaView>
                <View style={styles.cardContainer}> 
                    <View style={styles.Text}>
                        <List style={styles.Textoutput}>
                            {pushedItem}
                        </List>      
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.checkoutButton}
                        // onPress = {this._checkout()}
                        onPress = { () => { this._checkout(); this._remove(); }}
                    >
                    <Text style= {styles.checkOutbutn}>Check Out</Text>
                    </TouchableOpacity>  
                    
                </View>

                
            </SafeAreaView>
        );
    }
    
    // this function check the tag and database array if element matched it 
    // decrements the quantity value for that product.
    _remove = () => {
        this.setState({mylist:[{Name:"Thank you for Shopping"}]})
        window.alert('Thank you for shopping')  
    }
    _checkout = () =>{
        Object.values(this.state.mylist).map((dbList) => {
            let target = (dbList);
            let string = (this.state.paredString);           
            const name = target.Name;
            const price = target.Price;
            const qty = target.Quantity;
           
            const decrement =  firebase.database.ServerValue.increment(-1);
            
            for(let i = 0; i < string.length; i++){
                if( ((string[i] == (target.Name))) ){       
                    firebase.database().ref("Product Name/" + name).update({
                        Quantity: decrement 
                    });
                    // console.log("Matched:",target);
                }else{
                    console.log({target},"Not_matched2") 
                } 
            }
            console.log("\n");
        });
    }
}
  

