import './App.css';
import { ethers } from "ethers";
import {bufferToHex} from "ethereumjs-util";
import {encrypt, decrypt} from "@metamask/eth-sig-util"
import {useEffect, useState} from "react";
import {Button, Box, Grid, Input, TextField, Typography} from "@material-ui/core";
import { create } from 'ipfs-http-client'
import axios from "axios"

import ConnectWalletComponent from "./components/connect-wallet/connect-wallet.component";
import RegisterComponent from "./components/register/register.component";
import abi from "./utils/GraphBasedEmail.json"
import {Stack} from "@mui/material";
import OutboxComponent from "./components/outbox/outbox.component";
import InboxComponent from "./components/inbox/inbox.component";
import HomePage from "./pages/home/home.page";
import {Route, Routes} from "react-router-dom";
import InboxPage from "./pages/inbox/inbox.page";
import OutboxPage from "./pages/outbox/outbox.page";
import ContactsPage from "./pages/contacts/contacts.page";

export const basePath = "/graph-email-ui"

function App() {

    return (
        <div>
        <Routes>
            <Route   path={basePath+"/home"} element={<HomePage/>}/>
            <Route   path={basePath+"/inbox"} element={<InboxPage/>}/>
            <Route   path={basePath+"/outbox"} element={<OutboxPage/>}/>
            <Route   path={basePath+"/contacts"} element={<ContactsPage/>}/>

            {/*<Route exact path="/" element={<AddDevicePage/>}/>*/}



        </Routes>
    </div>
    )

}

export default App;



// let encryptionPublicKey;
  //
  // ethereum
  // .request({
  //   method: 'eth_getEncryptionPublicKey',
  //   params: [currentAccount], // you must have access to the specified account
  // })
  // .then((result) => {
  //   encryptionPublicKey = result;
  //   console.log(encryptionPublicKey)
  // })
  // .catch((error) => {
  //   if (error.code === 4001) {
  //     // EIP-1193 userRejectedRequest error
  //     console.log("We can't encrypt anything without the key.");
  //   } else {
  //     console.error(error);
  //   }
  // });

// 0x7b2276657273696f6e223a227832353531392d7873616c736132302d706f6c7931333035222c226e6f6e6365223a22316e49674267435058573661323879754d4f4f435434536173396f5365756379222c22657068656d5075626c69634b6579223a22477132723477313863326e743249634159547748504d41616b79347554707948706a473449414f384346413d222c2263697068657274657874223a2266775572384b4f49644a36465870724c2b517667525141756a377a6c705634525863736f227d