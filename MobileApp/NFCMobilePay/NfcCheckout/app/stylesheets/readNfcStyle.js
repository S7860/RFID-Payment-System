import { StyleSheet } from 'react-native';
import colors from '../config/colors';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
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
    buttonBorder: {
        padding: 10, 
        marginTop: 30,
        height: 50,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: colors.sky,

        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonUnactive: {
        color: colors.inactive,
        // textAlign: 'center', 
        fontSize: 20,
        fontFamily: colors.rubbold,
        fontWeight: '300',
    },
    buttonActive: {
        color: colors.buttonText_color,
        fontSize: 20,
    },
    Text: {
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 20, 
        marginTop: 20,
        color: colors.green,
        fontFamily: "Rubik-Regular",
        fontSize: 20,
        color: colors.tag,
    },
    Textoutput: {
        color: colors.tagOutput,
    },
    label: {
        color: colors.nfcLabel,
        marginTop : 30
    },
    supportedText:{
        color: colors.supportedText,
    },

});