import React, {useState} from "react";
import {Box, Grid, Link, Stack, Typography} from "@mui/material";
import {Button, TextField} from "@material-ui/core";
import {encrypt} from "@metamask/eth-sig-util";
import {bufferToHex} from "ethereumjs-util";
import {create} from "ipfs-http-client";


const OutboxComponent = (props) => {
    const [toAddress, updateToAddress] = useState("");
    const [message, updateMessage] = useState("");
    const [encryptedMessage, updateEncryptedMessage] = useState("");
    const [response, updateResponse] = useState("");

    const {graphEmailContract} = props
    const client = create('https://ipfs.infura.io:5001/api/v0')


    const getReceiverPublicKey = async (receiverAddress) => {
        graphEmailContract.GetReceiverPublicKey(receiverAddress)
            .then(async response => {

                let encrypted, encryptedMessage;
                let isEncrypted;

                if(response.length===0){
                    encryptedMessage = message;
                    isEncrypted = "false";
                }
                else {

                    encrypted = JSON.stringify(
                        encrypt(
                            {publicKey: response, data: message, version: 'x25519-xsalsa20-poly1305'},
                        )
                    )


                    console.log("encrypted", encrypted)
                    encryptedMessage = bufferToHex(
                        Buffer.from(encrypted, 'utf8')
                    )
                    isEncrypted = "true";
                }
                updateEncryptedMessage(encryptedMessage);


                const added = await client.add(encryptedMessage)
                const url = `https://ipfs.infura.io/ipfs/${added.path}`

                response = await graphEmailContract.SendMessage(receiverAddress, url, isEncrypted)

                updateResponse(response.hash)
                updateMessage("")
                return response
            })
            .catch(error => {
                console.log("error23", error)
            })
    }

    const encryptMessage = async () => {
        const response = getReceiverPublicKey(toAddress)

    }
    let responseComponent = <></>
    if(response){
        responseComponent =
            <Link target="_blank" href={"https://rinkeby.etherscan.io/tx/"+response}>See your transaction on etherscan</Link>
    }

    return (
        <Grid paddingTop={"5rem"} width={"30vw"}>
            <Typography >Outbox</Typography>
            <Stack spacing={2}>
              <TextField
              id="toAddress"
              label="To Address"
              value={toAddress}
              variant="filled"
                  onChange={(e)=>updateToAddress(e.target.value)}
            />
              <TextField
              id="message"
              label="Your Message"
              value={message}
              multiline
              rows={4}
              variant="filled"
              onChange={e=>updateMessage(e.target.value)}
            />
          <Button variant={"contained"} onClick={encryptMessage}>Encrypt and Send</Button>
          {responseComponent}
          </Stack>
        </Grid>
    )

}

export default OutboxComponent;