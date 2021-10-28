import { Row } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../config/colors';

export const styles = StyleSheet.create({
    cardContainer: {
      
        marginTop: 10,
        flexDirection: 'column',
        justifyContent : 'flex-start',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#fff',
        borderRadius: 16, 
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
        elevation: 5,
    
    },
    // its for "Tag Content"
    Text: {
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20, 
        marginTop: -26,
        color: "orange",
        fontFamily: "Rubik-Regular",
        fontSize: 20,
        
    },
    // Displays the NFC Output in cart
    Textoutput: {
        color: colors.nfcLabel,
    },


    checkoutButton: {
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 8, // Android
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 30,

        width: 145,
    },
    checkOutbutn: {
        color: colors.checkOutButton,
        fontWeight: 'normal',
        fontFamily:  colors.aveniFont,
        

    },

    itemCardContainer:{
        marginBottom: 20,
        borderRadius: 13,
    },
    itemLists: {
        color: colors.tagOutput,
    }
});