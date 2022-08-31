import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectRestaurant} from '../features/restaurantSlice';
import {XIcon} from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const Delivery = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-lg text-white">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimate Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: 'https://media1.giphy.com/media/gsr9MG7bDvSRWWSD1Y/giphy.gif?cid=6c09b952zuwueh0tm1zhmxcydegrybcvtevdijmoltgv0urk&rid=giphy.gif&ct=s',
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500   ">
            Your order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        className="flex-1 -mt-10 z-0"
        mapType="standard"
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
        <Image
          source={{
            uri: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Kyaw linn Thant</Text>
          <Text className="text-gray-500">Your Rider</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default Delivery;
