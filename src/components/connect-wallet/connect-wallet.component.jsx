import React, {useEffect, useState} from "react";
import {Box, Button, Grid} from "@mui/material";
import {Typography} from "@mui/material";
import {Stack} from "@mui/material";
import {connect, useSelector} from "react-redux";
import {setCurrentAccount} from "../../redux/account/account.actions";

const ConnectWalletComponent = (props) => {
    const ethereum = window.ethereum;
    const {setCurrentAccount, buttonOnly} = props;

    const currentAccount = useSelector(state => state.account.currentAccount)

    const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account, typeof account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
    }

    const connectWallet = async () => {
    try {
    const { ethereum } = window;

    if (!ethereum) {
    alert("Get MetaMask!");
    return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    await ethereum.request({ method: 'wallet_switchEthereumChain', params:[{chainId: '0x4'}]});
    console.log("Connected", accounts[0]);
        console.log("json", JSON.stringify(accounts[0]))
    setCurrentAccount(accounts[0]);
    } catch (error) {
    console.log(error)
    }
    }

    let connectWalletButton = <></>
    console.log("connect Wallet",currentAccount, typeof currentAccount)
    if(!currentAccount.includes("0x")){
        if(buttonOnly){
            connectWalletButton = <Button size="medium" bgcolor={"white"} variant={"contained"} onClick={connectWallet}>Connect Wallet</Button>
        }
        else {
            connectWalletButton =
                <Stack direction={"column"} spacing={2} justifyContent={"center"}>
                    <Typography alignSelf={"center"} variant={"h5"}>Please connect your wallet to open your Email
                        Box</Typography>
                    <Button size="small" variant={"contained"} onClick={connectWallet}>Connect Wallet</Button>
                </Stack>
        }
    }

    useEffect(() => {
    checkIfWalletIsConnected()

  }, [])

    return (
        <Grid container justifyContent={"center"}>
            {connectWalletButton}
        </Grid>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentAccount: account => dispatch(setCurrentAccount(account))
})

const mapStateToProps = state => ({
    currentAccount: state.account.currentAccount
})

export default connect(mapStateToProps,mapDispatchToProps)(ConnectWalletComponent)