import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';

import * as defaults from '../defaults'
import axios from "axios";


function ItemDetailed({cartItems, dispatch, navigation, route}) {
    const [product, setProduct] = useState({});
    useEffect(function () {
        axios
            .get(defaults.baseUrl + "/product/" + route.params.id)
            .then((res) => {
                setProduct(res.data);
            });
    }, []);

    return (
        <ScrollView>
            <Image
                source={{
                    uri: (product.image === "" || product.image === undefined)
                        ? defaults.imageUrl
                        : product.image
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
            <Text>{"Name : " + product.name}</Text>
            <Text>{"Title : " + product.title}</Text>
            <Text>{"Details : " + product.details}</Text>
            <Text>
                {"Price : "
                + product.price
                + " - "
                + product.discount
                + " = "
                + (product.price - product.discount > 0 ? product.price - product.discount : 0)}
            </Text>
            <Button
                title={"Cart"}
                onPress={() => {
                    navigation.navigate('CartScreen', {})
                }}/>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
        return {
            cartItems: state.cartItems,
        };
    }
;

export default connect(mapStateToProps)(ItemDetailed);