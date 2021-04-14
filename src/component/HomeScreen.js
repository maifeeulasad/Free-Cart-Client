import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import ItemPreview from "./ItemPreview";
import axios from "axios";

import * as defaults from '../defaults'

function HomeScreen({cartItems, dispatch, navigation, route}) {
    const [products, setProducts] = useState([]);
    useEffect(function () {
        axios
            .get(defaults.baseUrl + "/product/featured/")
            .then((res) => {
                setProducts(res.data);
            });
    }, []);

    return (
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
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: {},
    };
};

export default connect(mapStateToProps)(HomeScreen);