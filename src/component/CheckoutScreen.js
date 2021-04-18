import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native';
import {connect} from 'react-redux';
import axios from "axios";

import * as defaults from '../defaults'
import {clearItemAction} from "../action";

function CheckoutScreen({cartItems, dispatch, navigation, route}) {

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [isCompleteForm, setCompleteForm] = useState(false)

    useEffect(() => {
        setCompleteForm(name.length > 0 && address.length > 0 && contact.length > 0)
    }, [name, address, contact])

    return (
        <>
            <TextInput
                style={{width: '100%', backgroundColor: '#ffffff'}}
                placeholder="Please enter your name"
                onChangeText={setName}/>
            <TextInput
                style={{width: '100%', backgroundColor: '#ffffff'}}
                placeholder="Please enter your address"
                onChangeText={setAddress}/>
            <TextInput
                style={{width: '100%', backgroundColor: '#ffffff'}}
                placeholder="Please enter your contact number"
                onChangeText={setContact}/>
            {
                isCompleteForm &&
                <Button
                    onPress={() => {
                        axios
                            .post(defaults.baseUrl + "/product/order/", {
                                "user_details": {
                                    "name": name,
                                    "address": address,
                                    "contact": contact,
                                },
                                "cart_items": cartItems
                            }).then((res) => {
                            if (res.data === true) {
                                dispatch(clearItemAction())
                                navigation.navigate("HomeScreen")
                            }
                        })
                    }}
                    title={"Place order"}/>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
    };
};

export default connect(mapStateToProps)(CheckoutScreen);