import React, {useEffect, useState} from 'react';
import {Button, FlatList} from 'react-native';
import {connect} from 'react-redux';
import ItemPreview from "./ItemPreview";
import axios from "axios";

import * as defaults from '../defaults'

function HomeScreen({cartItems, dispatch, navigation, route}) {

    const [products, setProducts] = useState([]);
    const [total,setTotal] = useState(0)

    useEffect(()=>{
        let temTotal = 0
        Object.keys(cartItems).map((key) => {
            temTotal += cartItems[key]['count']*cartItems[key]['price']
        })
        setTotal(temTotal)
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
                total>0 &&
                <Button
                    title={"Cart : "+total + " taka"}
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