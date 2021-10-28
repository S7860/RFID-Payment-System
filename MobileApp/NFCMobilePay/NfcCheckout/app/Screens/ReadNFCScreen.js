/*
    This file is one that reads the NFC tag multiple times and outputs it to device screeen.
    and the some of the code was used from "whitedogg13/react-native-nfc-manager/examples"
*/
import { Button } from 'native-base';
import React,{Component} from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Alert,
} from 'react-native';
import NfcManager, {NfcEvents,NdefParser,NfcTech} from 'react-native-nfc-manager';
import {styles} from "../stylesheets/readNfcStyle"
// This function handles the string parsing when recied from the tag
export const parseText = (tag) => {
    if (tag.ndefMessage) {
        return NdefParser.parseText(tag.ndefMessage[0]); 
    }
    return null;
}
let stringText = [];
export default class ReadNFCScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supported: false,
            enabled: false,
            isTestRunning: false,
            parsedText: null,
            tag: null,
            parsedText: '',
            test: ''
        }
        
    }
    // this funciton checks if the NFC on the device is enabled
    _startNfc = () => {
        NfcManager.start()
            .then(() => NfcManager.isEnabled())
            .then(enabled => this.setState({enabled}))
            .catch(err => {
                console.warn(err);
                this.setState({enabled: false})
            })
    }
    componentDidMount = (props) => {
        NfcManager.start();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {

            let parsedText = parseText(tag);
            this.setState({tag, parsedText})

            stringText.push(parsedText.toString())

            let text = JSON.stringify(stringText)
            console.log("stringText log Worked?", text);
            NfcManager.setAlertMessageIOS('I got your tag!');
            NfcManager.unregisterTagEvent().catch(() => 0);
            
        });
        // This function check whether the NFC tecnology is suported on the device
        NfcManager.isSupported()
        .then(supported => {
            this.setState({ supported });
            if (supported) {
                this._startNfc();
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
        });
    }
    
    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
    
    render() {
        let { supported, enabled, parsedText, isTestRunning} = this.state;
        return ( 
            <SafeAreaView style={styles.container}>
                <View style={styles.cardContainer}> 

                    <Text style={styles.supportedText}>{`Is NFC supported ? ${supported}`}</Text>
                    <Text style={styles.supportedText}>{`Is NFC enabled (Android only)? ${enabled}`}</Text>
                    <Text style={styles.label}> NFC Reader </Text>
                    {/* isTestRunning checks if the reader is not running then when clicked enables the NFC reader */}
                    {!isTestRunning && (
                        <TouchableOpacity 
                            style={styles.buttonBorder}
                            onPress={ this._run}
                        >
                        <Text style= {styles.buttonUnactive}>Enable NFC </Text>
                        </TouchableOpacity>
                    )}
                    {/* isTestRunning checks if the reader is running then when clicked diables the NFC reader  */}
                    {isTestRunning && (
                        <TouchableOpacity 
                            style={styles.buttonBorder}
                            onPress={this._cancel}
                        >
                        <Text style = {styles.buttonActive}>Disable NFC</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.Text}>
                        <Text style={styles.Text}>{`Tag Content:`}</Text>
                        <Text style={styles.Textoutput}>{this.state.parsedText}</Text> 
                        

                    </View>
                </View>
             </SafeAreaView>
        )
    }
    // If the NFC enabled when clicked it will diable the Reader 
    _cancel = () => {
        this.setState({isTestRunning: false});
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
    // On the device when the button is clicked this will triger an event and enable the NFC reader
    _run = async () => {
        try {
            // this line switched between is the state when button is clicked and disaply to cancel the Nfc on device.
            this.setState({isTestRunning: true});
            await NfcManager.registerTagEvent();
        } catch (ex) {
            console.warn('ex', ex);
            NfcManager.unregisterTagEvent().catch(() => 0);
        }
    }
}
export {stringText};
// export default ReadNFCScreen;