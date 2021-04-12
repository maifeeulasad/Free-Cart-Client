import React from 'react';
import {Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';

import * as defaults from '../defaults'

const screenWidth = Dimensions.get('window').width;

function ItemPreview({data, onClick}) {
    return (
        <View style={{width: screenWidth / 2 - 5, padding: 5}}>
            <View
                style={{
                    justifyContent: 'space-between',
                    borderRadius: 3,
                    shadowRadius: 3,
                    elevation: 3,
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.3,
                    backgroundColor: 'white',
                }}>
                <TouchableOpacity onPress={() => onClick(data.id)}>
                    <Image
                        source={{
                            uri: (data.image === "" || data.image === undefined)
                                ? defaults.imageUrl
                                : data.image
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
                </TouchableOpacity>
                <Text>{data.name}</Text>
                <Text style={{textAlign: 'right'}}>{
                    "Price : " + (data.price-data.discount >0 ? data.price-data.discount : 0)
                }</Text>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        cartItems: [],
    };
};

export default connect(mapStateToProps)(ItemPreview);