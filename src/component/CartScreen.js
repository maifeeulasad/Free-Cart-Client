import React, {useEffect, useState} from 'react';
import {FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import ItemPreview from "./ItemPreview";


function CartScreen({cartItems, dispatch, navigation, route}) {

    const [items, setItems] = useState([])

    useEffect(() => {
        let temItems = []
        Object.keys(cartItems).map((key) => {
            if (cartItems[key] > 0) {
                temItems.push({[key]: cartItems[key]})
            }
        })
        setItems(temItems)
    }, [])

    return (
        <FlatList
            contentContainerStyle={{padding: 5}}
            showsHorizontalScrollIndicator={false}
            data={items}
            renderItem={({item}) => (
                <ItemPreview
                    id={Object.keys(item)[0]}
                    onClick={(productId) => {
                        navigation.navigate('ItemDetailed', {
                            id: productId,
                        });
                    }}
                />
            )}
            keyExtractor={(item, count) => count.toString()}
        />
    );
}

const mapStateToProps = (state) => {
        return {
            cartItems: state.cartItems,
        };
    }
;

export default connect(mapStateToProps)(CartScreen);