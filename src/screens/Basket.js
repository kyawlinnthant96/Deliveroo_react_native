import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {selectRestaurant} from '../features/restaurantSlice';
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../features/basketSlice';
import {XCircleIcon} from 'react-native-heroicons/solid';
import {urlFor} from '../../sanity';
import {formatCurrency} from 'react-native-format-currency';

const Basket = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupItemsInBasket, setGroupItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const groupedItems = items.reduce((result, item) => {
      (result[item.id] = result[item.id] || []).push(item);
      return result;
    }, {});

    setGroupItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        {/* banner */}
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            className="absolute top-3 right-5 rounded-full"
            onPress={() => {
              navigation.goBack();
            }}>
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
        </View>

        {/* profile */}
        <View className="flex-row items-center space-x-2 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: 'https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg',
            }}
            className="h-10 w-10 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-60 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        {/* List of Ites */}
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white px-5 py-2">
              <Text>{items.length} *</Text>
              <Image
                source={{uri: urlFor(items[0]?.image).url()}}
                className="h-14 w-14 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                {formatCurrency({amount: items[0]?.price, code: 'GBP'})[0]}
              </Text>

              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({id: key}))}>
                <Text className="text-[#00CCBB] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white space-y-4 mt-5">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              {formatCurrency({amount: basketTotal, code: 'GBP'})[0]}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fees</Text>
            <Text className="text-gray-400">
              {formatCurrency({amount: 5.99, code: 'GBP'})[0]}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              {formatCurrency({amount: basketTotal + 5.99, code: 'GBP'})[0]}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('PrepareOrder')}
            className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-white text-lg font-bold text-center">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Basket;
