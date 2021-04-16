import React, {useEffect, useState} from 'react';
import {Button, Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {setItemAction} from "../action";

import * as defaults from '../defaults'
import axios from "axios";

const screenWidth = Dimensions.get('window').width;

function ItemPreview({cartItems, data, onClick, dispatch, id}) {

    const [count, setCount] = useState(id === undefined ? (cartItems[data.id]===undefined ? 0 : cartItems[data.id]) : cartItems[id]);
    const [availability, setAvailability] = useState(id === undefined ? (data.availability || 0) : 0)
    const [minimumOrder, setMinimumOrder] = useState(id === undefined ? (data.minimum_order || 0) : 0)
    const [image, setImage] = useState((id === undefined && data.image !== "" && data.image !== undefined) ? data.image : defaults.imageUrl)
    const [name, setName] = useState(id === undefined ? data.name : "")
    const [price, setPrice] = useState(id === undefined ? data.price : 0)
    const [discount, setDiscount] = useState(id === undefined ? data.discount : 0)

    useEffect(()=>{
        if(id===undefined){
            let coun=id === undefined ? (cartItems[data.id]===undefined ? 0 : cartItems[data.id]) : cartItems[id]
            if(coun!==0){
                console.log("count of id - " + id + " - " + (data!==undefined ? data.id : ""))
                console.log(coun)
            }
        }
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
            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: 'center'}}>
                <Button
                    title={"-"}
                    onPress={() => {
                        if (count > 0) {
                            if(id===undefined){
                                dispatch(setItemAction({[data.id]: count - 1}))
                            }else{
                                dispatch(setItemAction({[id]: count - 1}))
                            }
                            //setCount(count - 1)
                        }
                        if (count <= minimumOrder) {
                            if(id===undefined){
                                dispatch(setItemAction({[data.id]: 0}))
                            }else{
                                dispatch(setItemAction({[id]: 0}))
                            }
                            //setCount(0)
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
                                if(id===undefined){
                                    dispatch(setItemAction({[data.id]: minimumOrder}))
                                }else{
                                    dispatch(setItemAction({[id]: minimumOrder}))
                                }
                                //setCount(minimumOrder)
                            } else {
                                if(id===undefined){
                                    dispatch(setItemAction({[data.id]: count+1}))
                                }else{
                                    dispatch(setItemAction({[id]: count+1}))
                                }
                                //setCount(count + 1)
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

export default connect(mapStateToProps)(ItemPreview);