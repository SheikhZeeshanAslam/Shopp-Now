import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, Items } from '../dataBase/Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function MyCart({navigation}) {
    const [product, setProduct] = useState();
    const [total, setTotal] = useState(null);

    useEffect(() => {
        
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB();
        });   
        return unsubscribe;   
        }, [navigation]);
    
        // get data from local DB by id

        const getDataFromDB = async () =>{
            let items = await AsyncStorage.getItem('cartItem');
            items = JSON.parse(items);
            let productData = [];
            if(items){
                Items.forEach(data => {
                    if(items.includes(data.id)){
                        productData.push(data)
                        return;
                    }
                })
                setProduct(productData);
                getTotal(productData);
            }else {
                setProduct(false);
                getTotal(false);
            }
        };

        const getTotal = productData => {
            let total = 0;
            for (let index = 0; index < productData.length; index++) {
                let productPrice = productData[index].productPrice;
                total = total + productPrice;
            }
            setTotal(total);
        };

        // remove Selected Data from cart

        const removeItemFromCart = async id => {
            let itemArray = await AsyncStorage.getItem('cartItem');
            itemArray = JSON.parse(itemArray);
            if(itemArray){
                let array = itemArray;
                for (let index = 0; index < array.length; index++) {
                    if(array[index] == id){
                        array.splice(index, 1);
                    }
                    await AsyncStorage.setItem('cartItem', JSON.stringify(array));
                    getDataFromDB();
                }
            }
        };

        //checkout 
        const checkOut = async() =>{
            try {
                await AsyncStorage.removeItem('cartItem');
            } catch (error) {
                return error;
            }
            ToastAndroid.show('Thanks for Shopping Your itemes will be deliverd Soon', ToastAndroid.SHORT,);
            navigation.navigate('Home');
        }

        const renderProducts = (data, index) => {
            return(
                <TouchableOpacity 
                onPress={() => navigation.navigate('Productinfo', {productID: data.id})}
                key={index}
                style={{
                    width: '100%',
                    height: 100,
                    marginVertical: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        width: '30%',
                        height:100,
                        //padding: 14,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.backgroundLight,
                        borderRadius: 10,
                        marginRight: 22
                    }}>
                        <Image source={data.productImage} style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',

                        }} /> 
                    </View>
                    <View style={{
                        flex: 1,
                        height: '100%',
                        justifyContent: 'space-around',
                    }}>
                        <View style={{

                        }}>
                            <Text style={{
                                fontSize: 14,
                                maxWidth: '100%',
                                color: COLORS.black,
                                fontWeight: '600',
                                letterSpacing: 1,
                            }}>
                                {data.productName}
                            </Text>
                            <View style={{
                                marginTop: 4,
                                flexDirection: 'row',
                                alignItems: 'center',
                                opacity: 0.6,
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: '400',
                                    maxWidth: '85%',
                                    marginRight: 4,
                                }}>
                                    Rs.{data.productPrice}
                                </Text>
                                <Text>
                                    (~Rs.{data.productPrice + data.productPrice / 20})
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            
                        }}>
                            <View style={{
                                borderRadius: 100,
                                marginRight: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: COLORS.backgroundMedium,
                                opacity: 0.5,
                            }}>
                                <MaterialCommunityIcons name='minus' style={{
                                    fontSize: 16,
                                    color: COLORS.backgroundDark,
                                }} />
                            </View>
                            <Text>1</Text>
                            <View style={{
                                borderRadius: 100,
                                marginLeft: 20,
                                padding: 4,
                                borderWidth: 1,
                                borderColor: COLORS.backgroundMedium,
                                opacity: 0.5,
                            }}>
                                <MaterialCommunityIcons name='plus' style={{
                                    fontSize: 16,
                                    color: COLORS.backgroundDark,
                                }} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
                        <MaterialCommunityIcons name='delete-outline' style={{
                            fontSize: 16,
                            color: COLORS.backgroundDark,
                            backgroundColor: COLORS.backgroundLight,
                            padding: 8,
                            borderRadius: 100,
                        }} />
                        </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    paddingTop: 16,
                    paddingHorizontal: 16,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name='chevron-left' style={{
                            fontSize: 18,
                            color: COLORS.backgroundDark, 
                            padding: 12,
                            backgroundColor: COLORS.backgroundLight,
                            borderRadius: 12
                        }} />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 14,
                        color: COLORS.black,
                        fontWeight: '400',
                    }}>Order Details</Text>
                    <View></View>
                </View>
                <Text style={{
                    fontSize: 20,
                    color: COLORS.black,
                    fontWeight: '500',
                    paddingTop: 20,
                    paddingLeft: 16,
                    marginBottom: 10,
                }}>MY Cart</Text>
                <View style={{
                    paddingHorizontal: 16
                }}>
                    {product ? product.map(renderProducts) : null }
                </View>
                <View>
                    <View style={{
                        paddingHorizontal: 16,
                        marginVertical: 10,
                    }}>
                        <Text style={{
                            fontSize:16,
                            color: COLORS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                            Delivery Location
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                width: '80%',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    color: COLORS.blue,
                                    backgroundColor: COLORS.backgroundLight,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 12,
                                    borderRadius: 10,
                                    marginRight: 18,

                                }}>
                                    <MaterialCommunityIcons name='truck-delivery-outline' style={{
                                        fontSize: 18,
                                        color: COLORS.blue,
                                    }} />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.black,
                                        fontWeight: '400',
                                        lineHeight: 20,
                                        opacity: 0.5,
                                    }}>
                                        106-C8 Colony Hafiz Abad
                                    </Text>
                                    <Text>
                                        Multan, Punjab
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name='chevron-right' style={{
                                fontSize: 22,
                                color: COLORS.black,
                            }} />
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 16,
                        marginVertical: 10,
                    }}>
                        <Text style={{
                            fontSize:16,
                            color: COLORS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                            Payment Method
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                width: '80%',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    color: COLORS.blue,
                                    backgroundColor: COLORS.backgroundLight,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 12,
                                    borderRadius: 10,
                                    marginRight: 18,

                                }}>
                                    <Text style={{
                                        fontSize: 10,
                                        fontWeight: '900',
                                        color: COLORS.blue,
                                        letterSpacing: 1,
                                    }}>VISA</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 14,
                                        color: COLORS.black,
                                        fontWeight: '400',
                                        lineHeight: 20,
                                        opacity: 0.5,
                                    }}>
                                        Visa Classic
                                    </Text>
                                    <Text>
                                        *****-9206
                                    </Text>
                                </View>
                            </View>
                            <MaterialCommunityIcons name='chevron-right' style={{
                                fontSize: 22,
                                color: COLORS.black,
                            }} />
                        </View>
                    </View>
                    <View style={{
                         paddingHorizontal: 16,
                         marginTop: 40,
                         marginBottom: 80,
                    }}>
                        <Text style={{
                            fontSize:16,
                            color: COLORS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                            marginBottom: 20,
                        }}>
                            Order Info
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 8,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: '400',
                                color: COLORS.black,
                                opacity: 0.5,
                            }}>Subtotal</Text>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: '400',
                                color: COLORS.black,
                                opacity: 0.5,
                            }}>Rs.{total}.00</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 22,
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: '400',
                                color: COLORS.black,
                                opacity: 0.5,
                            }}>Shipping Fee</Text>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: '400',
                                color: COLORS.black,
                                opacity: 0.5,
                            }}>Rs.{total / 20}.00</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                fontSize: 12,
                                fontFamily: '400',
                                color: COLORS.black,
                                opacity: 0.5,
                            }}>Total</Text>
                            <Text style={{
                                fontSize: 18,
                                fontFamily: '500',
                                color: COLORS.black,
                            }}>Rs.{total + total / 20}.00</Text>
                        </View>
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
                onPress={() => (total !=0 ? checkOut(product.id) : null)}
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
                        CHECKOUT
                    </Text>
                </TouchableOpacity>
            </View>
                       
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
         width: '100%',
         height: '100%',
         backgroundColor: COLORS.white, 
}
})

export default MyCart;