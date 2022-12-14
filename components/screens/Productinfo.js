import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Animated, StatusBar, ScrollView, TouchableOpacity, FlatList, Image, Dimensions, ToastAndroid } from 'react-native';
import { COLORS, Items } from '../dataBase/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Productinfo({route, navigation}) {
    const {productID} = route.params;

    const width = Dimensions.get('window').width;

   const scrollX = new Animated.Value(0);

    let position = Animated.divide(scrollX, width);

    const [product, setProduct] = useState({})

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
          });
           return unsubscribe;
    }, [navigation]);

    // get data from DB
    const getDataFromDB = async() => {
        for (let index = 0; index < Items.length; index++) {
            if(Items[index].id == productID){
                await setProduct(Items[index]);
            }
            
        } 

    }

    // add to cart
     const addToCart = async(id) => {
        let itemArray = await AsyncStorage.getItem('cartItem');
        itemArray = JSON.parse(itemArray);
        if(itemArray){
            let array = itemArray;
            array.push(id);

            try {
                await AsyncStorage.setItem('cartItem', JSON.stringify(array));
                ToastAndroid.show('Item Added Successfully to Cart', ToastAndroid.SHORT,);
                navigation.navigate('Home')
            } catch (error) {
                return error                
            }
        } else {
            let array =[];
            array.push(id);

            try {
                await AsyncStorage.setItem('cartItem', JSON.stringify(array));
                ToastAndroid.show('Item Added Successfully to Cart', ToastAndroid.SHORT,);
                navigation.navigate('Home')
            } catch (error) {
                return error 
            }
        }
     }

    // horizental scroll product card
    const renderProduct = ({item, index}) =>{
        return(
            <View style={{
                width: width,
                height: 240,
            }}>
                <Image 
                source={item}
                style={{
                    width:'100%',
                    height: '100%',
                    resizeMode: 'contain',
                }}
                 />

            </View>
        )

    }

    console.log(product)
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.backgroundLight} barStyle= 'dark-content' />
            <ScrollView>
                <View style={{
                    width: '100%',
                    backgroundColor: COLORS.backgroundLight,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 4,
                }}>
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingTop: 16,
                        paddingLeft: 16,
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo name='chevron-left' style={{
                                fontSize:18,
                                color: COLORS.backgroundDark,
                                padding: 12,
                                backgroundColor: COLORS.white,
                                borderRadius: 10
                            }} />
                        </TouchableOpacity>
                    </View>
                    <FlatList 
                    data={product.productImageList ? product.productImageList : null}
                    horizontal={true}
                    renderItem={renderProduct}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0.8}
                    snapToInterval={width}
                    bounces={false}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x:scrollX}}}],
                        {useNativeDriver: false}
                   )}
                    />
                    <View style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems:'center',
                        justifyContent: 'center',
                        marginTop: 32,
                        marginBottom: 16,
                    }}>
                        {
                            product.productImageList ? 
                            product.productImageList.map((data, index) => {
                                let opacity = position.interpolate({
                                    inputRange: [index - 1, index, index + 1],
                                    outputRange: [0.2, 1, 0.2],
                                    extrapolate: 'clamp',
                                });
                                return(
                                    <Animated.View 
                                    key={index}
                                    style={{
                                        width: '16%',
                                        height: 2.4,
                                        backgroundColor: COLORS.black,
                                        opacity,
                                        marginHorizontal: 4,
                                        borderRadius: 100,  
                                    }}>

                                    </Animated.View>
                                );
                            }) : null}

                    </View>
                </View>
                <View style={{
                    paddingHorizontal: 16,
                    marginTop: 6,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 14,
                    }}>
                        <Entypo name='shopping-cart' style={{
                            fontSize: 18,
                            color: COLORS.blue,
                            marginRight: 6,
                        }} />
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.black,
                        }}>
                            Shopping
                        </Text>
                    </View >
                        <View style={{
                            flexDirection: 'row',
                            marginVertical: 4,
                            alignItems: 'center',
                            justifyContent: 'space-between',

                        }}>
                            <Text style={{
                                fontSize:24,
                                fontWeight: '600',
                                letterSpacing:0.5,
                                marginVertical:4,
                                color:COLORS.black,
                                maxWidth: '84%'
                            }}>{product.productName}</Text>

                            <Ionicons name='link-outline' style={{
                                fontSize:24,
                                color:COLORS.blue, 
                                backgroundColor: COLORS.blue + 10,
                                padding: 8,
                                borderRadius: 100,
                            }} />
                        </View>
                        <Text style={{
                            fontSize: 12,
                            color: COLORS.black,
                            fontWeight: '400',
                            letterSpacing: 1,
                            opacity: 0.5,
                            lineHeight: 20,
                            maxWidth: '85%',
                            maxHeight: 44, 
                            marginBottom: 18
                        }}>
                            {
                                product.description
                            }
                        </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginVertical: 14,
                        borderBottomColor: COLORS.backgroundLight,
                        borderBottomWidth: 1,
                        paddingBottom: 20,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '80%',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                color:COLORS.blue,
                                backgroundColor: COLORS.backgroundLight,
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                borderRadius: 100,
                                marginRight: 10,
                            }}>
                                <Entypo name='location-pin' style={{
                                    fontSize:16,
                                    color:COLORS.blue,

                                }} />
                            </View>
                            <Text>
                                Rustaveli Ave 57,{'\n'}17-001 batume
                            </Text>
                        </View>
                        <Entypo name='chevron-right' style={{
                            fontSize: 22,
                            color: COLORS.backgroundDark, 
                        }}  />
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '500',
                                maxWidth: '85%',
                                color: COLORS.black,
                               // marginBottom: 3,
                            }}>
                                Rs. {product.productPrice}.00
                            </Text>
                            <Text style={{
                                marginBottom: 15,
                            }}>
                                Tax Rate 2%~ Rs. {product.productPrice / 20} (Rs. {product.productPrice + product.productPrice / 20})
                            </Text>
                        </View>
                </View>
            </ScrollView>
            <View style={{
                //position: 'absolute',
                bottom: 10,
                height: '8%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <TouchableOpacity
                onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
                 style={{
                    width: '86%',
                    height: '90%',
                    backgroundColor: COLORS.blue,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        fontSize: 12,
                        fontWeight: '500',
                        letterSpacing: 1,
                        color: COLORS.white,
                        textTransform: 'uppercase',
                    }}>
                        {product.isAvailable ? 'Add to Cart' : 'Not Available'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        height: '100%',
        width: '100%',
        backgroundColor: COLORS.white,
        position: 'relative',
}
})

export default Productinfo;