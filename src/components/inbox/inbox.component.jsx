import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Card, CardActions, CardContent, ListItem, Stack, Typography} from "@mui/material";
import {useSelector} from 'react-redux';


const InboxComponent = (props) => {
    const ethereum = window.ethereum;
    const {updateClickItem} = props

    const currentAccount = useSelector(state => state.account.currentAccount)
    const contacts = useSelector(state => state.contacts.contacts)
    const [decryptedMessages, updateDecryptedMessages] = useState([])
    const [receivedMessages, updateReceivedMessages] = useState([])

    const getDateTime = (timestamp) => {
        const dateObject = new Date(timestamp * 1000)
        return dateObject.toLocaleString()
    }

    const decryptMessage = async (item) => {
        updateClickItem(item)
        let response = await axios.get(item._ipfsLink)
        let encryptedMessage = response.data

        if (item.isEncrypted === "true") {
            ethereum
                .request({
                    method: 'eth_decrypt',
                    params: [encryptedMessage,
                        currentAccount],
                })
                .then((decryptedMessage) => {
                        console.log('The decrypted message is:', decryptedMessage)
                        updateDecryptedMessages({...decryptedMessages, [item.id]: decryptedMessage})

                    }
                )
                .catch((error) => console.log(error.message));
        } else {

            updateDecryptedMessages({...decryptedMessages, [item.id]: encryptedMessage})
        }
    }

    const getReceivedMessages = () => {
        var data = JSON.stringify({
            query: `query {
            
              newMessages(where: {_toAddress:"__address__"}) {
                id
                _fromAddress
                _toAddress
                _ipfsLink
                time
                isEncrypted
              }
            
            }`.replace("__address__", currentAccount),
            variables: {}
        });

        var config = {
            method: 'post',
            url: 'https://api.studio.thegraph.com/query/18117/graph-email-1/v0.1',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {

                let sortedMessages = response.data.data.newMessages.sort(function (a, b) {
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return parseInt(b.time) - parseInt(a.time);
                });
                console.log("sortedMessages", sortedMessages)
                updateReceivedMessages(sortedMessages)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        console.log(currentAccount)
        if (currentAccount) {
            getReceivedMessages()
        }
    }, [currentAccount])

    return (
        <Stack paddingTop={"1rem"} spacing={1}>
            {receivedMessages.map(item => {
                return (<ListItem key={item.id}>
                    <Card sx={{width: "30vw"}}>
                        <CardContent>
                            <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
                                From
                                : {contacts[item._toAddress] !== undefined ? contacts[item._toAddress] + " | " + item._toAddress : item._toAddress}
                            </Typography>
                            <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
                                Date : {getDateTime(item.time)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                onClick={e => decryptMessage(item)} size="small">Decrypt and View</Button>
                        </CardActions>
                    </Card>
                </ListItem>)
            })
            }
        </Stack>
    )

}


export default InboxComponent;
