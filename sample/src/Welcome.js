import React, {Component} from 'react'
import {View, Button, StyleSheet} from 'react-native'
import {TableSDK} from 'table-react-native-sdk'

export default class Welcome extends Component {
    constructor(props) {
        super(props)
        this.navigation = props.navigation
    }

    static navigationOptions = () => {
        return {
            headerTitle: 'Table SDK Sample App',
        }
    }

    async componentDidMount() {
        await TableSDK.init(
            'https://develop4.dev.table.co/',
            '978fQmN5ReV3vPKclQgHEg',
        )
    }

    onRegisterButtonPress = async () => {
        let tableParams = {
            email: 'jackforesight@gmail.com',
            first_name: 'Jack',
            last_name: 'Jack',
            user_hash: '2712',
            custom_attributes: {},
        }

        try {
            await TableSDK.registerWithDetail('2712', tableParams)
            alert('Successful registration')
            console.log('Successful registration')
        } catch (err) {
            alert(`Error ${err}`)
            console.log(err)
        }
    }

    onRegisterAnonymousButtonPress = async () => {
        try {
            await TableSDK.registerUnidentifiedUser()
            alert('Successful anonymous registration')
        } catch (err) {
            alert(`Error ${err}`)
            console.log(err)
        }
    }

    onConversationListPress = () => {
        this.props.navigation.navigate('TableScreen')
    }

    onTableScreenFinished = () => {
        console.log("Table SDK has finished")

        // Navigate back to us
        this.props.navigation.navigate('Welcome')
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={styles.btnStyle}>
                    <Button onPress={this.onRegisterButtonPress} title="Register User" />
                </View>
                <View style={styles.btnStyle}>
                    <Button onPress={this.onRegisterAnonymousButtonPress} title="Anonymous User" />
                </View>
                <View style={styles.btnStyle}>
                    <Button
                        onPress={this.onConversationListPress}
                        title="Show Conversation List" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnStyle: {
        width: '90%',
        alignSelf: 'center',
        margin: 5,
    },
})
