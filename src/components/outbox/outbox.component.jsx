import React, {useEffect, useState} from "react";
import {Box, Divider, Grid, InputLabel, Link, MenuItem, Select, Stack, Typography} from "@mui/material";
import {Button, TextField} from "@mui/material";
import {encrypt} from "@metamask/eth-sig-util";
import {bufferToHex} from "ethereumjs-util";
import {create} from "ipfs-http-client";

import {connect, useSelector} from "react-redux";


const OutboxComponent = (props) => {
    const {selectedAddress, visibility} = props
    const currentAccount = useSelector(state => state.account.currentAccount)
    const contacts = useSelector(state => state.contacts.contacts)
    const [toAddress, updateToAddress] = useState("");
    const [toName, updateToName] = useState("");
    const [message, updateMessage] = useState("");
    const [encryptedMessage, updateEncryptedMessage] = useState("");
    let [response, updateResponse] = useState("");
    const [values, updateValues] = useState({"toAddress": "", "name": ""});
    const graphEmailContract = useSelector(state => state.contract.graphEmailContract)
    const client = create('https://ipfs.infura.io:5001/api/v0')

    const encryptWithKey = (message, publicKey) => {
        let encrypted, encryptedMessage;
        encrypted = JSON.stringify(
            encrypt(
                {publicKey: publicKey, data: message, version: 'x25519-xsalsa20-poly1305'},
            )
        )
        console.log("encrypted", encrypted)
        encryptedMessage = bufferToHex(
            Buffer.from(encrypted, 'utf8')
        )
        return encryptedMessage
    }

    const handleChange = (e) => {
        updateValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))


    }

    const getReceiverPublicKey = async (receiverAddress) => {
        let encryptedWithReceiverKey, encryptedWithSenderKey, isEncrypted, payload;

        let receiverPublicKey = await graphEmailContract.GetReceiverPublicKey(receiverAddress)
        console.log("receiverPublicKey", receiverPublicKey)

        let senderPublicKey = await graphEmailContract.GetSenderPublicKey().then(response => response)
        console.log("senderPublicKey", senderPublicKey)

        if (receiverPublicKey.length === 0) {
            updateResponse({link:null,
            message: "Sending unencrypted message "})
            payload = message;
            isEncrypted = "false";
        } else if (receiverPublicKey.length > 0 && senderPublicKey.length === 0){
            updateResponse({link: "#",
                message: "looks like you haven't enable encrypted messages while the receiver has enabled them "})
        }

        else {
            encryptedWithReceiverKey = encryptWithKey(message, receiverPublicKey)
            encryptedWithSenderKey = encryptWithKey(message, senderPublicKey)
            isEncrypted = "true";
            payload = JSON.stringify({
                encryptedWithReceiverKey,
                encryptedWithSenderKey
            })
        }
        console.log("payload", payload)
        const added = await client.add(payload)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        console.log("url", url)
        let response = await graphEmailContract.SendMessage(receiverAddress, url, isEncrypted)
        // updateResponse(response.hash)
        updateResponse({link: "https://rinkeby.etherscan.io/tx/" + response.hash,
            message: "Check your transaction on Etherscan here "})
        return response
    }

    const encryptMessage = async () => {
        console.log(toAddress, message)
        getReceiverPublicKey(toAddress);

    }
    let responseComponent = <></>
    if (response) {
        responseComponent =
            <p style={{fontSize:12}}>{response.message}
                {response.link? <Link style={{fontSize:12}} target="_blank" href={response.link}>click here</Link>:<p>.</p>}
            </p>

    }
    let addressInput = <></>
    useEffect(() => {
        updateToAddress(selectedAddress)
    }, [selectedAddress])

    if (selectedAddress) {
        addressInput = <TextField
            name={"toAddress"}
            id="toAddress"
            label="To Address"
            value={toAddress}
            onChange={e => updateToAddress(e.target.value)}
        />
        // addressInput = <Typography>{toAddress}</Typography>
    } else {

        addressInput = <TextField
            name={"toAddress"}
            id="toAddress"
            label="To Address"
            value={toAddress}
            onChange={e => updateToAddress(e.target.value)}

        />
    }

    return (

        <Stack style={{visibility: visibility}} paddingTop={"1rem"} spacing={2}>

            {addressInput}
            <TextField
                id="message"
                label="Your Message"
                value={message}
                multiline
                rows={4}

                onChange={e => updateMessage(e.target.value)}
            />
            <Button variant={"contained"} onClick={encryptMessage}>Encrypt and Send</Button>
            {responseComponent}
        </Stack>
    )

}

const mapStateToProps = state => ({
    currentAccount: state.account.currentAccount
})

export default connect(mapStateToProps)(OutboxComponent)

