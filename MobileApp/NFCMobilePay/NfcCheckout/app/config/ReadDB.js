// import * as firebase from 'firebase'
// import React from 'react';
// import {config} from './FirebaseAuth'

// firebase.initializeApp(config);
// export default class ReadDB extends React.Component {
//     constructor () {   
//         super(props); 
//         this.state = {
//             myItemsReference: null
//         }; 
//     }
//     componentDidMount(){
    
//         const myitems = firebase.database().ref("Item")
//         myitems.on("value", datasnap => {
//             console.log('database Worked!!!', datasnap.val());
//         });
//         this.setState({myItemsReference: myitems});
//     }
//     componentWillUnmount(){
//         if(this.state.myItemsReference) {
//             myItemsReference.off("value");
//         }
//     }
// }