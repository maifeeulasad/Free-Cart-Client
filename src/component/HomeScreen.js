import React, {useEffect, useState} from 'react';
import {Button, FlatList} from 'react-native';
import {connect} from 'react-redux';
import ItemPreview from "./ItemPreview";
import axios from "axios";

import * as defaults from '../defaults'

function HomeScreen({cartItems, dispatch, navigation, route}) {

    const [products, setProducts] = useState([]);
    const [isCartAvailable,setCartAvailable] = useState(false);

    useEffect(()=>{
        let temCartAvailable = false
        Object.keys(cartItems).map((key) => {
            if (cartItems[key] > 0) {
                temCartAvailable = true
                return false
            }
        })
        setCartAvailable(temCartAvailable)
    },[cartItems])

    useEffect(function () {
        axios
            .get(defaults.baseUrl + "/product/featured/")
            .then((res) => {
                setProducts(res.data);
            });
    }, []);

    return (
        <>
            <FlatList
                contentContainerStyle={{padding: 5}}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                data={products}
                renderItem={({item}) => (
                    <ItemPreview
                        data={item}
                        onClick={(productId) => {
                            navigation.navigate('ItemDetailed', {
                                id: productId,
                            });
                        }}
                    />
                )}
                keyExtractor={(item, count) => count.toString()}
            />
            {
                isCartAvailable &&
                <Button
                    title={"Cart"}
                    onPress={() => {
                        navigation.navigate('CartScreen', {})
                    }}/>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
    };
};

export default connect(mapStateToProps)(HomeScreen);