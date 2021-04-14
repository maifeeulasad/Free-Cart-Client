import React, {useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import {connect} from 'react-redux';
import ItemPreview from "./ItemPreview";


function CartScreen({cartItems, dispatch, navigation, route}) {

    return (
        <Text>{cartItems.toString()}</Text>
    );
}

const mapStateToProps = (state) => {
        return {
            cartItems: state.cartItems,
        };
    }
;

export default connect(mapStateToProps)(CartScreen);