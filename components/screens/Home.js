import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native';
import {COLORS, Items} from '../dataBase/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

function Home({navigation}) {

    const [products, setProducts] = useState([]);
    const [accessories, setAccessories] = useState([]);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getDataFromDB();
      });
       return unsubscribe;
    }, [navigation])
    
// get data from DB
     
    const getDataFromDB =() => {
        let productList = [];
        let accessoryList = [];
        for (let index = 0; index < Items.length; index++) {
            if(Items[index].category == 'product'){
                productList.push(Items[index]);
            }else if (Items[index].category == 'accessories'){
                accessoryList.push(Items[index]);
            }
            
        }
        setProducts(productList);
        setAccessories(accessoryList);

    }
    
    // create an reuseable card

    const ProductCard = ({data}) => {
        return(
            <TouchableOpacity
            onPress={() => navigation.navigate("Productinfo" , {productID: data.id})}
             style={{
                width: '48%',
                marginVertical: 14,
            }}>
                <View style={{
                    width: '100%',
                    height: 100,
                    borderRadius:10,
                    backgroundColor: COLORS.backgroundLight,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                }}>
                    {
                        data.isOff ? (
                            <View style={{
                                position: 'absolute',
                                width: '20%',
                                height: '24%',
                                backgroundColor: COLORS.green,
                                top: 0,
                                left:0,
                                borderTopLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: COLORS.white,
                                    letterSpacing: 1,
                                }}>{data.offPercentage}%</Text>
                            </View>
                        ) : null
                    }
                    <Image source={data.productImage} style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                    }}/>
                </View>
                <Text style={{
                    fontSize: 12,
                    color: COLORS.black,
                    fontWeight: '600',
                }}>{data.productName}</Text>
                {data.category == 'accessories' ? (data.isAvailable ? (
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <FontAwesome name="circle" style={{
                            fontSize: 12,
                            marginRight: 6,
                            color: COLORS.green,
                        }} />
                        <Text style={{
                            fontSize: 12,
                            marginRight: 6,
                            color: COLORS.green,
                        }}>Available</Text>
                    </View>
                ): (<View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <FontAwesome name="circle" style={{
                        fontSize: 12,
                        marginRight: 6,
                        color: COLORS.red,
                    }} />
                    <Text style={{
                        fontSize: 12,
                        marginRight: 6,
                        color: COLORS.red,
                    }}>Unavailable</Text>
                </View>) ) : null}
                <Text>Rs. {data.productPrice}</Text>
            </TouchableOpacity>
        )

    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content"  />
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                width:'100%',
                flexDirection: 'row',
                justifyContent:'space-between',
                padding:16,
            }}>
                <TouchableOpacity>
                    <Entypo name='shopping-bag' style={{
                        fontSize:18,
                        color: COLORS.backgroundMedium,
                        padding:12,
                        borderRadius:10,
                        backgroundColor:COLORS.backgroundLight,
                    }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('My Cart')}>
                    <MaterialCommunityIcons name='cart' style={{
                        borderWidth:1,
                        borderColor: COLORS.backgroundLight,
                        fontSize:18,
                        color: COLORS.backgroundMedium,
                        padding:12,
                        borderRadius:10,
                    }} />
                </TouchableOpacity>

            </View>
            <View style={{
                marginBottom:10,
                padding:16,
                
            }}>
                <Text style ={{
                    fontSize:26,
                    color: COLORS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    marginBottom: 10,
                }}>Hi-Fi Shop &amp; Servics</Text>
                <Text style ={{
                    fontSize:14,
                    color: COLORS.black,
                    fontWeight: '400',
                    letterSpacing: 1,
                    lineHeight: 24,
                    
                }}>Audio shop on Rustaveli Ave 57.
                {'\n'}This shop offers both products and services</Text>
            </View>
            <View style={{
                padding:16,
                }}>
            <View style={{
                padding:16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize:18,
                        color: COLORS.black,
                        fontWeight: "500",
                        letterSpacing: 1,
                    }}>Products</Text>
                    <Text style={{
                        fontSize:14,
                        color: COLORS.black,
                        fontWeight: "400",
                        opacity: 0.5,
                        margin: 10,
                    }}>41</Text>
                </View >
                <View>
                    <Text style={{
                        fontSize:14,
                        color: COLORS.blue,
                    }}>See All</Text>
                </View>
                </View>
             <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
             }}>
                {
                    products.map(data => {
                        return <ProductCard data={data} key={data.id} />
                    })
                }
             </View>
             </View>
             <View style={{
                padding:16,
                }}>
            <View style={{
                padding:16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize:18,
                        color: COLORS.black,
                        fontWeight: "500",
                        letterSpacing: 1,
                    }}>Accessories</Text>
                    <Text style={{
                        fontSize:14,
                        color: COLORS.black,
                        fontWeight: "400",
                        opacity: 0.5,
                        margin: 10,
                    }}>72</Text>
                </View >
                <View>
                    <Text style={{
                        fontSize:14,
                        color: COLORS.blue,
                    }}>See All</Text>
                </View>
                </View>
             <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
             }}>
                {
                    accessories.map(data => {
                        return <ProductCard data={data} key={data.id} />
                    })
                }
             </View>
             </View>
            
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.white,
}
})

export default Home;