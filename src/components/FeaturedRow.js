import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import ResturantCard from './ResturantCard';
import sanityClient from '../../sanity';

const FeaturedRow = ({id, title, description}) => {
  const [resturants, setResturants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == 'featured' && _id == $id] {
        ...,
        resturants[]->{
          ...,
          dishes[]->,
          type->{
            title
          }
        },
      }[0]
      `,
        {id},
      )
      .then(data => {
        setResturants(data?.resturants);
      });
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{paddingHorizontal: 15}}
        showsHorizontalScrollIndicator={false}
        className="pt-5">
        {/* Resturant Card */}
        {resturants.map(resturant => (
          <ResturantCard
            key={resturant._id}
            id={resturant._id}
            imgUrl={resturant.image}
            title={resturant.name}
            rating={resturant.rating}
            genre={resturant.type?.title}
            address={resturant.address}
            short_description={resturant.short_description}
            dishes={resturant.dishes}
            long={resturant.long}
            lat={resturant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
