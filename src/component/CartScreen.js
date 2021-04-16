import React, {useEffect, useState} from 'react';
import {FlatList,Button} from 'react-native';
import {connect} from 'react-redux';
import ItemPreview from "./ItemPreview";

function CartScreen({cartItems, dispatch, navigation, route}) {

    const [items, setItems] = useState([])
    const [total,setTotal] = useState(0)

    useEffect(() => {
        let temItems = []
        Object.keys(cartItems).map((key) => {
            if (cartItems[key]['count'] > 0) {
                temItems.push({[key]: cartItems[key]})
            }
        })
        setItems(temItems)
    }, [])

    useEffect(()=>{
        let temTotal = 0
        Object.keys(cartItems).map((key) => {
            temTotal += cartItems[key]['count'] * cartItems[key]['price']
        })
        setTotal(temTotal)
    },[cartItems])

    return (
        <>
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
            {
                total > 0 &&
                <Button
                    title={"Checkout : " + total + " taka"}
                    onPress={() => {
                        navigation.navigate('CheckoutScreen', {})
                    }}/>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cartItems,
    };
};

export default connect(mapStateToProps)(CartScreen);