import React, {useEffect, useState} from "react";
import {Box, Button} from "@material-ui/core";
import {Typography} from "@mui/material";
import {Stack} from "@mui/material";

const ConnectWalletComponent = (props) => {
    const ethereum = props.ethereum;
    const {currentAccount, setCurrentAccount} = props;
    // const [currentAccount, setCurrentAccount] = useState("");

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

    setCurrentAccount(accounts[0]);
    } catch (error) {
    console.log(error)
    }
    }

    let connectWalletButton = <></>
    if(!currentAccount){

        connectWalletButton =
            <Stack direction={"column"} spacing={2} justifyContent={"center"}>
                <Typography variant={"h5"}>Please connect your wallet to open your Email Box</Typography>
                 <Button variant={"contained"} onClick={connectWallet}>Connect Wallet</Button>
            </Stack>
    }

    useEffect(() => {
    checkIfWalletIsConnected()

  }, [])

    return (
        <Box>
            {connectWalletButton}
        </Box>
    )
}

export default ConnectWalletComponent