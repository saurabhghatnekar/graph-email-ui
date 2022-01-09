import React, {useEffect, useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {Stack} from "@mui/material";
import {useSelector} from "react-redux";

const RegisterComponent = (props) => {
    const {senderPublicKey} = props
    const ethereum = window.ethereum
    const currentAccount = useSelector(state => state.account.currentAccount)
    const graphEmailContract = useSelector(state => state.contract.graphEmailContract)
    const [user, updateUser] = useState()

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
            .then(async (result) => {
                encryptionPublicKey = result;
                console.log(encryptionPublicKey)
                await registerUser(encryptionPublicKey)
                window.location.reload()
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
    if (currentAccount && !senderPublicKey) {
         registerButton = <Stack alignSelf={"center"} direction={"column"} spacing={2} justifyContent={"center"}>
                    <Typography alignSelf={"center"} variant={"h5"}>To Send and Receive encrypted messages please register</Typography>
                    <Button size="small" variant={"contained"} onClick={getPublicKey}>Register</Button>
                </Stack>

    } else {
        registerButton = <></>
    }

    // useEffect(()=>{
    // registerUser();
    // }, [publicKey])
    return (
         <Grid container justifyContent={"center"}>
            {registerButton}
        </Grid>
    )
}

export default RegisterComponent;