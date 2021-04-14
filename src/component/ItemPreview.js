import React, {useState} from 'react';
import {Button, Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {setItemAction} from "../action";

import * as defaults from '../defaults'

const screenWidth = Dimensions.get('window').width;

function ItemPreview({data, onClick}) {

    const [count, setCount] = useState(0);
    const [availability] = useState(data.availability || 0)
    const [minimumOrder] = useState(data.minimum_order || 0)

    return (
        <View style={{width: screenWidth / 2 - 5, padding: 5}}>
            <View
                style={{
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    shadowRadius: 3,
                    elevation: 3,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    backgroundColor: 'white',
                }}>

                <TouchableOpacity onPress={() => {
                    onClick(data.id)
                }}>
                    <Image
                        source={{
                            uri: (data.image === "" || data.image === undefined)
                                ? defaults.imageUrl
                                : data.image
                        }}
                        style={{
                            height: undefined,
                            alignSelf: 'center',
                            aspectRatio: 1,
                            width: '100%',
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
                    <Text>{data.name}</Text>
                    <Text style={{textAlign: 'right'}}>{
                        "Price : " + (data.price - data.discount > 0 ? data.price - data.discount : 0)
                    }</Text>

                </TouchableOpacity>
                <View style={{flexDirection: "row"}}>
                    <Button
                        title={"-"}
                        onPress={() => {
                            if (count > 0) {
                                setItemAction({[data.id]: count - 1})
                                setCount(count - 1)
                            }
                            if (count <= minimumOrder) {
                                setItemAction({[data.id]: 0})
                                setCount(0)
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
                                    setItemAction({[data.id]: minimumOrder})
                                    setCount(minimumOrder)
                                } else {
                                    setItemAction({[data.id]: count + 1})
                                    setCount(count + 1)
                                }
                            }
                        }}/>
                </View>
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