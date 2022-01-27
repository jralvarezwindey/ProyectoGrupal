import * as React from 'react';
import {
  Text,
  Button,
  Avatar,
  Pressable,
  Divider
} from 'native-base';

export default function Tokens({symbol, name, price, img, nav}) {
  return (
    <>
      <Pressable 
        onPress={()=>{nav.navigate("OperationCurrencies",{symbol})}}
        alignSelf="center"
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        m="5px"
        p="10px"
        px="25px"
        width="90%"
        height="50px"
        bg="theme.150"
        borderRadius="2px"
        borderWidth="0.4px"
        borderColor="theme.400"
      >
        {img !== "" ?
          <Avatar bg="theme.150" size="33px" source={{
            uri: img
            }}
          /> : 
          <Avatar bg="theme.50" size="33px">
            <Text color="theme.100" fontWeight="bold" fontSize="18px">{symbol.charAt(0)}</Text>
          </Avatar>
        }
        
        <Text ml="15px" fontSize="16px" color="theme.50" letterSpacing="1px">{name}</Text>

        {/* <Text ml="auto" color="theme.50">{parseFloat(price).toFixed(5)}  {symbol}</Text> */}
        <Text ml="auto" color="theme.50">{parseFloat(price).toFixed(5)}  {symbol}</Text>
      </Pressable>
    </>
  );
}
