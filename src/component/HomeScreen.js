import React from 'react';
import {Text,View} from 'react-native';
import {connect} from 'react-redux';

function HomeScreen({cartItems, dispatch, navigation, route}) {
    return(
        <>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>Home</Text>
            </View>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: [],
    };
};

export default connect(mapStateToProps)(HomeScreen);