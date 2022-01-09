import {connect, useSelector} from "react-redux";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";
import OutboxComponent from "../outbox/outbox.component";


const OpenedMessage = (props) => {
    const {type} = props
    const ethereum = window.ethereum
    const {currentAccount, item} = props
    const [decryptedMessage, updateMessage] = useState("")
    const contacts = useSelector(state => state.contacts.contacts)
    const [visibility, updateVisibility] = useState("hidden")
    const getDateTime = (timestamp) => {
        const dateObject = new Date(timestamp * 1000)
        return dateObject.toLocaleString()
    }

    const decryptMessage = async () => {
        let response = await axios.get(item._ipfsLink)
        console.log(item, item._isEncrypted)

        let rawMessage ;
        if (item.isEncrypted==="true") {
            if (type === "outbox") {
                rawMessage = response.data["encryptedWithSenderKey"]
            } else {
                rawMessage = response.data["encryptedWithReceiverKey"]
            }
        } else {
            rawMessage = response.data
        }

        console.log("rawMessage", rawMessage)
        if (item.isEncrypted === "true") {
            ethereum
                .request({
                    method: 'eth_decrypt',
                    params: [rawMessage,
                        currentAccount],
                })
                .then((message) => {
                        console.log('The decrypted message is:', message)
                        updateMessage(message)

                    }
                )
                .catch((error) => console.log(error.message));
        } else {

            updateMessage(rawMessage)
        }
    }

    const handleReply = () => {
        updateVisibility("visible")
    }
    useEffect(() => {
        if (item) {
            decryptMessage()
        }
    },[currentAccount, item])

    let openedMessage = <></>
    if(!item) {
        openedMessage = <Typography>Click on a Message to open it</Typography>
    } else {
        openedMessage =
            <Stack direction={"column"} spacing={2}>
                <Card key={item.id}>
            <CardContent>
                <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
                    <strong>{type ==="outbox"?"To":"From"}</strong> : {contacts[item._toAddress] !== undefined ? contacts[item._toAddress] + " - " + item._toAddress: item._toAddress}
                </Typography>
                <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
                    <strong>Date</strong> : {getDateTime(item.time)}
                </Typography>
                <Typography sx={{overflow:"auto", fontSize: 20}} color="text.secondary" gutterBottom>
                    <strong>Message</strong>: {decryptedMessage}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleReply} size="small">Send a Reply</Button>
            </CardActions>
        </Card>
                <Typography></Typography>
                <OutboxComponent visibility={visibility} selectedAddress={item._toAddress}/>
        </Stack>
    }
    return (
        <>
        {openedMessage}

        </>
    )
}


const mapStateToProps = state => ({
    currentAccount: state.account.currentAccount
})

export default connect(mapStateToProps)(OpenedMessage)
