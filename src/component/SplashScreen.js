import React, {useEffect} from 'react';
import {Text,View} from 'react-native';
import {connect} from 'react-redux';

const navigateHome = (navigation) => {
    navigation.navigate('HomeScreen', {});
}

function SplashScreen({cartItems, dispatch, navigation, route}) {

    const splashDuration = 2 * 1000;
    const init = () => {
        navigateHome(navigation)
    }

    useEffect(()=>{
        let homeNavigationTimer = setTimeout(
            () => init(),
            splashDuration);
        return () => {
            clearTimeout(homeNavigationTimer);
        };
    })

    return(
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Text>Welcome to Free Cart Client</Text>
                <Text>Developed & Maintained by Maifee Ul Asad</Text>
            </View>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: [],
    };
};

export default connect(mapStateToProps)(SplashScreen);