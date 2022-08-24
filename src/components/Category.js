import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';

import CategoryCard from './CategoryCard';
import sanityClient, {urlFor} from '../../sanity';

const Category = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    sanityClient.fetch(`*[_type == 'category']`).then(data => {
      setCategories(data);
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{paddingHorizontal: 10, paddingTop: 10}}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {categories.map(category => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.title}
        />
      ))}
    </ScrollView>
  );
};

export default Category;
