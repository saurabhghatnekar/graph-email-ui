import React, {useEffect, useState} from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {Stack} from "@mui/material";

const RegisterComponent = (props) => {
    const {senderPublicKey, currentAccount, graphEmailContract, ethereum} = props;

    const registerUser = async (encryptionPublicKey) => {
        const response = await graphEmailContract.Register(encryptionPublicKey)

        console.log("PublicKey response", response)
    }

    const getPublicKey = () => {
        let encryptionPublicKey;
        ethereum.request({
        method: 'eth_getEncryptionPublicKey',
        params: [currentAccount], // you must have access to the specified account
        })
            .then((result) => {
        encryptionPublicKey = result;
        console.log(encryptionPublicKey)
               registerUser(encryptionPublicKey)
        })
            .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log("We can't encrypt anything without the key.");
        } else {
          console.error(error);
        }
        });

    }
    let registerButton = <></>
    console.log("senderPublicKey in Reg comp", senderPublicKey)
    if(currentAccount && !senderPublicKey) {

        registerButton = <Stack direction={"column"} spacing={2} justifyContent={"center"}>
                <Typography variant={"h5"}>To Send and Receive encrypted messages please register</Typography>
                 <Button variant={"contained"} onClick={getPublicKey}>Register</Button>
            </Stack>

    }else {
        registerButton = <></>
    }

    // useEffect(()=>{
    // registerUser();
    // }, [publicKey])
    return (
       <Box>
            {registerButton}
        </Box>
    )
}

export default RegisterComponent;