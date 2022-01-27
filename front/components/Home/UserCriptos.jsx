import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Pressable, RefreshControl, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useFocusEffect } from '@react-navigation/native';
import {
  Box,
  Button,
  IconButton,
  Stack, HStack, Text,
  ChevronLeftIcon,
  Center,
  Popover,
  Flex,
  Divider,
  ScrollView,
} from 'native-base';
import { getBalance, getAllStellarData, getAllEthData } from '../../redux/actions';
import Tokens from './components/Tokens';
import OperationCurrencies from '../HeaderCurrencies/OperationCurrencies';

export default function UserCriptos({navigation}) {
  const dispatch = useDispatch();
  const balance = useSelector(state => state.userData.balance)
  const blockChain = useSelector(state => state.blockChain);
  const [balanceUSD, setBalanceUsd] = useState(0);
  const [currencies, setCurrencies] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const Tab = createMaterialTopTabNavigator();
  const allStellarData = useSelector(state => state.allStellarData);
  const allEthData = useSelector(state => state.allEthData);

  React.useEffect(() => {
    dispatch(getAllStellarData());
    dispatch(getAllEthData());
  },[])

  React.useEffect( () => {
    if (balance) {
      setBalanceUsd(parseFloat(balance[blockChain]?.cryptoBalance).toFixed(2));
      setCurrencies(balance[blockChain]?.currencies);
    }
  }, [balance, blockChain])

  useFocusEffect(
    React.useCallback(() => {
      try{
        dispatch(getBalance());
      }catch(error){ console.error(error) }

      return  () => {};
    }, [])
  );

  return (
    <>    
      <HStack alignSelf="center" mt="33px" height="59px" >
        <Text mt="2px" fontSize="26px">$</Text>
        <Text mt="-2px" fontSize="36px" style={styles.verticallyStretchedText}> {balanceUSD} </Text>
        <Text mb="1px" alignSelf="flex-end" fontSize="15px">USD</Text>
      </HStack>

      <Text 
        alignSelf="flex-start"
        justifyContent="center"
        mt="33px"
        pl="14px"
        color="theme.300"
        fontSize="13px"
        letterSpacing="2px"
      >
        {`Your ${blockChain} currencies`.toUpperCase()}
      </Text>

      <Divider alignSelf="center" my="3" width="91%" bg='theme.300'/>
    
      <ScrollView mt="5" >
        
          {/* blockChain === "stellar" ?
            currencies?.map((element, index)=>{
              return (
                <Tokens key={index} symbol={element.currency} name={allStellarData.filter(cur => cur.symbol === element.currency)[0].amount} price={allStellarData.filter(cur => cur.symbol === element.currency)[0].price} img={allStellarData.filter(cur => cur.symbol === element.currency)[0].img} amount={element.amount} nav={navigation}/>
              );
            }) : 
            currencies?.map((element, index)=>{
              return (
                <Tokens key={index} symbol={element.currency} name={allEthData.filter(cur => cur.symbol === element.currency)[0].amount} price={allEthData.filter(cur => cur.symbol === element.currency)[0].price} img={allEthData.filter(cur => cur.symbol === element.currency)[0].img} amount={element.amount} nav={navigation}/>
              );
            }) */
          }
       
        {blockChain === "stellar" ?
          (allStellarData.length === 1 ?
            currencies?.map((element, index)=>{ return ( <Tokens key={index} symbol={element.currency} name={"Coin"} price={element.amount} percDay={"+0,00%"} img={""} nav={navigation}/>)}) :
            allStellarData?.map((el, index)=>{ return ( <Tokens key={index} symbol={el.symbol} name={el.name} price={currencies?.filter(cur => cur.currency === el.symbol)[0].amount} percDay={el.percDay} img={el.img} nav={navigation}/>)})
          ) :
          (allEthData.length === 1 ?
            currencies?.map((element, index)=>{ return ( <Tokens key={index} symbol={element.currency} name={"Coin"} price={element.amount} percDay={"+0,00%"} img={""} nav={navigation}/>)}) :
            allEthData?.map((el, index)=>{ return ( <Tokens key={index} symbol={el.symbol} name={el.name} price={el.price} percDay={el.percDay} img={el.img} nav={navigation}/>)})
          )
        }
        {/* (allStellarData.length === 1 ?
            currencies?.map((element, index)=>{ return ( <Tokens key={index} symbol={element.currency} name={"Coin"} price={element.amount} percDay={"+0,00%"} img={""} nav={navigation}/>)}) :
            allStellarData?.map((el, index)=>{
              if (currencies.filter(cur => cur.currency === el.symbol)[0].amount > 0) {
                return (<Tokens key={index} symbol={el.symbol} name={el.name} price={currencies.filter(cur => cur.currency === el.symbol)[0].amount} percDay={el.percDay} img={el.img} nav={navigation}/>)
              }
            })
          ) : */}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  verticallyStretchedText: {
    transform: [{scaleY: 1.4}]
  }
});
