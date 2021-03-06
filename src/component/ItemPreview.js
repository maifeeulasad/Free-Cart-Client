import React, {useEffect, useState} from 'react';
import {Button, Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {setItemAction} from "../action";

import * as defaults from '../defaults'
import axios from "axios";

const screenWidth = Dimensions.get('window').width;

function ItemPreview({cartItems, data, onClick, dispatch, id}) {

    const [count, setCount] = useState(id === undefined ? (cartItems[data.id]===undefined ? 0 : cartItems[data.id]['count']) : cartItems[id]['count']);
    const [availability, setAvailability] = useState(id === undefined ? (data.availability || 0) : 0)
    const [minimumOrder, setMinimumOrder] = useState(id === undefined ? (data.minimum_order || 0) : 0)
    const [image, setImage] = useState((id === undefined && data.image !== "" && data.image !== undefined) ? data.image : defaults.imageUrl)
    const [name, setName] = useState(id === undefined ? data.name : "")
    const [price, setPrice] = useState(id === undefined ? data.price : 0)
    const [discount, setDiscount] = useState(id === undefined ? data.discount : 0)
    const [subTotal,setSubtotal] = useState(0)

    useEffect(()=>{
        if(id!==undefined){
            setSubtotal(cartItems[id]["count"]*cartItems[id]["price"])
        }
    },[count,price,discount])

    useEffect(()=>{
        setCount(id === undefined ? (cartItems[data.id]===undefined ? 0 : cartItems[data.id]['count']) : cartItems[id]['count'])
    },[cartItems])

    useEffect(() => {
        if (id !== undefined) {
            axios
                .get(defaults.baseUrl + "/product/" + id)
                .then((res) => {
                    setAvailability(res.data.availability)
                    setMinimumOrder(res.data.minimum_order)
                    setImage(res.data.image)
                    setName(res.data.name)
                    setPrice(res.data.price)
                    setDiscount(res.data.discount)
                });
        }
    }, [])

    return (
        <View
            style={{
                justifyContent: 'space-between',
                borderRadius: 3,
                shadowRadius: 3,
                elevation: 3,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                backgroundColor: 'white',
                width: id === undefined ? screenWidth / 2 - 5 : screenWidth,
                padding: 5,
                flexDirection: id === undefined ? undefined : "row"
            }}>
            <TouchableOpacity
                style={{flexDirection: id === undefined ? undefined : "row"}}
                onPress={() => {
                    onClick(id === undefined ? data.id : id)
                }}>
                <Image
                    source={{
                        uri: image
                    }}
                    style={{
                        height: undefined,
                        alignSelf: 'center',
                        aspectRatio: 1,
                        width: id === undefined ? '100%' : '20%',
                        justifyContent: 'flex-end',
                        padding: 10,
                        borderRadius: 3,
                        shadowRadius: 3,
                        shadowOffset: {width: 0, height: 2},
                        shadowOpacity: 0.3,
                        overflow: 'hidden',
                        alignItems: 'center',
                        backgroundColor: 'orange',
                        position: 'relative',
                        margin: 10,
                    }}
                />
                <View>
                    <Text>{name}</Text>
                    <Text style={{textAlign: id === undefined ? 'right' : 'left'}}>{
                        "Price : " + (price - discount > 0 ? price - discount : 0)
                    }</Text>
                </View>
            </TouchableOpacity>
            {
                id!==undefined &&
                <Text>{subTotal}</Text>
            }
            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: 'center'}}>
                <Button
                    title={"-"}
                    onPress={() => {
                        if (count > 0) {
                            dispatch(setItemAction({
                                [id===undefined ? data.id : id]: {
                                    "count" : count-1,
                                    "price": (price - discount > 0 ? price - discount : 0)
                                }
                            }))
                        }
                        if (count <= minimumOrder) {
                            dispatch(setItemAction({
                                [id===undefined ? data.id : id]: {
                                    "count" : 0,
                                    "price": (price - discount > 0 ? price - discount : 0)
                                }
                            }))
                        }
                    }}/>
                <Text style={{flexGrow: 1, textAlign: 'center'}}>
                    {count}
                </Text>
                <Button
                    title={"+"}
                    onPress={() => {
                        if (availability - count > 0 && availability > minimumOrder) {
                            if (count < minimumOrder) {
                                dispatch(setItemAction({
                                    [id===undefined ? data.id : id]:{
                                        "count" : minimumOrder,
                                        "price": (price - discount > 0 ? price - discount : 0)
                                    }
                                }))
                            } else {
                                dispatch(setItemAction({
                                    [id===undefined ? data.id : id]: {
                                        "count" : count+1,
                                        "price": (price - discount > 0 ? price - discount : 0)
                                    }
                                }))
                            }
                        }
                    }}/>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
    };
};

export default connect(mapStateToProps)(ItemPreview)