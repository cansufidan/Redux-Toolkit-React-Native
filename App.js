import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Button, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, 
         increment,
         decrementCustomValue,
         } from './src/app/features/counter/counterSlice';
import { fetchProducts } from './src/app/features/products/productsSlice';

export default function App() {
  const dispatch = useDispatch();
  //const [count, setCounter] = useState(0);

  //const increment = () => {
     //setCounter(prevState => prevState + 1)
    //};
    //const decrement = () => {
      //setCounter(prevState => prevState - 1)
    // };
     //const decrementCustomValue = (value) => {
     // setCounter(prevState => prevState + value)
     //};

     const count = useSelector(state=> state.counter.value);

     const {data, loading, error} = useSelector(state => state.products);

     useEffect (() => {
      dispatch(fetchProducts());
     },[]);

     if(loading){
      return (
      <SafeAreaView>
        <View>
          <Text>Loadinggg....</Text>
        </View>
      </SafeAreaView>
       );
     }

     if(error){
      return <SafeAreaView>
        <View>
          <Text>Error: {error}</Text>
        </View>
      </SafeAreaView>
     }

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView style={{flex: 1}}>
        <Text style={{fontSize: 25, fontWeight: 'bold'}}>
          Products List : {data?.length}
        </Text>
        {data?.map(product => (
        <View key={product.id}> 
          <Text style={{fontSize: 18, fontWeight: '400'}}>
            {product.title} {product.brand}
          </Text>
        </View>
        ))}
      <Button 
       title="Increment Value" 
       onPress={() => dispatch(increment())} />
      <Button
       title="Decrement Value" 
       onPress={() => dispatch(decrement())} />
      <Button 
       title="Decrement Custom Value" 
       onPress={() => dispatch(decrementCustomValue(5))} />
       </ScrollView>
    </SafeAreaView>
  );
}
