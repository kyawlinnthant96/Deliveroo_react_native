import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {selectBasketItems, selectBasketTotal} from '../features/basketSlice';
import {formatCurrency} from 'react-native-format-currency';

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  const [valueFormatWithValue, valueFormatWithoutValue, value] = formatCurrency(
    {
      amount: basketTotal,
      code: 'GBP',
    },
  );

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className="mx-5 bg-[#00CCBB] rounded-lg p-4 flex-row items-center space-x-2">
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 font-extrabold text-white text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          {valueFormatWithValue}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
