import React, {useEffect} from "react";
import {connect, shallowEqual, useDispatch, useSelector} from "react-redux";
import {Box, Typography, Button, Divider, Grid} from "@mui/material";
import MiniDrawer from "../../components/drawer/drawer";
import ConnectWalletComponent from "../../components/connect-wallet/connect-wallet.component";
import {useState} from "react";
import {ethers} from "ethers";

import abi from '../../utils/GraphBasedEmail.json'
import {setCurrentAccount} from "../../redux/account/account.actions";
import {setGraphEmailContract} from "../../redux/contract/contract.actions";
import {getReceivedMessages} from "./home.function";
import {loadContacts} from "../../redux/contacts/contacts.action";
import OutboxComponent from "../../components/outbox/outbox.component";
import ExistingContactComponent from "../../components/outbox/existing-contact.component";
import RegisterComponent from "../../components/register/register.component";

const HomePage = (props) =>{

    const {graphEmailContract, setGraphEmailContract} = props;
    const dispatch = useDispatch();
    const GraphEmailContractAddress = "0xEEA1d4f3694B56Bb7E7F1e5999B91EA9f57F172B"
    const contractABI = abi.abi
     const currentAccount = useSelector(state => state.account.currentAccount)
    const contacts = useSelector(state => state.contacts.contacts)
    const [selectedContact, handleSelectContact] = useState(null);
    const [selectedAddress, updateSelectedAddress] = useState()
    const [senderPublicKey, updateSenderPublicKey] = useState();

    const getSenderPublicKey = async () => {
         let senderPublicKey = await graphEmailContract.GetSenderPublicKey().then(response => response)
        updateSenderPublicKey(senderPublicKey)
    }

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            let GraphEmailContract = new ethers.Contract(GraphEmailContractAddress, contractABI, signer);
            setGraphEmailContract(GraphEmailContract)
            console.log("GraphEmailContract", graphEmailContract);
             dispatch(loadContacts(currentAccount))

        }
    }, [currentAccount != null])


    useEffect(() => {
        if(selectedContact){
            console.log("selectedContact[\"_toAddress\"]", selectedContact["_toAddress"])
            updateSelectedAddress(selectedContact["_toAddress"])
        }
    },[selectedContact])

   useEffect(() => {
       if(graphEmailContract){
        getSenderPublicKey();
       }
   }, [graphEmailContract])

    return (
        <MiniDrawer selected={"home"}>
            <ConnectWalletComponent />
            <RegisterComponent senderPublicKey={senderPublicKey}/>
            {
                currentAccount.includes("0x") ?
                    <Grid paddingTop={"1rem"} width={"30vw"}>
                        <Typography>Quick Message</Typography>
                        <ExistingContactComponent contacts={contacts} handleSelectContact={handleSelectContact}/>
                        <Divider><p style={{fontSize: 10}}>Or Add Manually</p></Divider>
                        <OutboxComponent selectedAddress={selectedAddress}/>
                    </Grid> : <></>
            }
        </MiniDrawer>

    )

}

const mapDispatchToProps = dispatch => ({
     setGraphEmailContract: contract => dispatch(setGraphEmailContract(contract)),

})

const mapStateToProps = state => ({
    graphEmailContract: state.contract.graphEmailContract
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)