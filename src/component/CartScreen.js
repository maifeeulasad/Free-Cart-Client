import React from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';


function CartScreen({cartItems, dispatch, navigation, route}) {

    return (
        <Text>Cart</Text>
    );
}

const mapStateToProps = (state) => {
        return {
            cartItems: {},
        };
    }
;

export default connect(mapStateToProps)(CartScreen);