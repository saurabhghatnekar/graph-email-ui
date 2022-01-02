import React, {useState} from "react";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {Button, TextField} from "@material-ui/core";
import {encrypt} from "@metamask/eth-sig-util";
import {bufferToHex} from "ethereumjs-util";
import {create} from "ipfs-http-client";


const OutboxComponent = (props) => {
    const [toAddress, updateToAddress] = useState("");
    const [message, updateMessage] = useState("");
    const [encryptedMessage, updateEncryptedMessage] = useState("");
    const {graphEmailContract} = props
    const client = create('https://ipfs.infura.io:5001/api/v0')

    const getReceiverPublicKey = async (receiverAddress) => {
        graphEmailContract.GetReceiverPublicKey(receiverAddress)
            .then(async response => {
                console.log("reciever publickey response", response, response.length)
                const encrypted = JSON.stringify(
                                encrypt(
                                    {publicKey:response, data: message, version: 'x25519-xsalsa20-poly1305' },
                                )
                            )
                console.log("encrypted", encrypted)
                const encryptedMessage = bufferToHex(
                Buffer.from(encrypted, 'utf8')
                )
                updateEncryptedMessage(encryptedMessage);
                console.log("encryptedMessage", encryptedMessage);
                console.log("receiverAddress", receiverAddress)
                const added = await client.add(encryptedMessage)
                const url = `https://ipfs.infura.io/ipfs/${added.path}`
                console.log(url)
                response = await graphEmailContract.SendMessage(receiverAddress, url)
                console.log("response", response)
                return response
            })
            .catch(error => {
                console.log(error)
            })
    }

    const encryptMessage = async () => {
        const response = getReceiverPublicKey(toAddress)
        console.log("response of send message", response)
    }

    return (
        <Grid paddingTop={"5rem"} width={"30vw"}>
            <Typography >Outbox</Typography>
            <Stack spacing={2}>
              <TextField
              id="toAddress"
              label="To Address"
              variant="filled"
                  onChange={(e)=>updateToAddress(e.target.value)}
            />
              <TextField
              id="message"
              label="Your Message"
              multiline
              rows={4}
              variant="filled"
              onChange={e=>updateMessage(e.target.value)}
            />
          <Button variant={"contained"} onClick={encryptMessage}>Encrypt and Send</Button>
          {/*<Button variant={"contained"} onClick={decryptMessage}>Decrypt</Button>*/}
          </Stack>
        </Grid>
    )

}

export default OutboxComponent;