import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  AdjustmentsIcon,
} from 'react-native-heroicons/solid';

// components
import Category from '../components/Category';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../../sanity';

const Home = () => {
  const navigation = useNavigation();
  const [featured, setFeatured] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type== 'featured'] {
        ...,
        resturants[]->{
          ...,
          dishes[]->
        }
      }
    `,
      )
      .then(data => {
        setFeatured(data);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
          }}
          className="h-10 w-10 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <View className="flex-row items-end space-x-1">
            <Text className="font-bold text-xl">Current Location</Text>
            <ChevronDownIcon size={20} color="#00CCBB" />
          </View>
        </View>

        <UserIcon size={35} color="#00ccBB" />
      </View>

      {/* Search */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row items-center flex-1 space-x-2 bg-gray-200 px-2 py-.5 rounded-lg">
          <SearchIcon color="gray" size={25} />
          <TextInput
            placeholder="Resturants and cuisines"
            keyboardType="default"
          />
        </View>

        <AdjustmentsIcon color="#00ccbb" />
      </View>

      {/* Body */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{paddingBottom: 100}}>
        {/* Category */}
        <Category />

        {/* Feature row */}
        {featured?.map((category, index) => (
          <FeaturedRow
            key={index}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
