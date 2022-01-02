import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Card, CardActions, CardContent, Stack, Typography} from "@mui/material";

const InboxComponent = (props) => {
    const {currentAccount, ethereum,senderPublicKey} = props
    const [decryptedMessages, updateDecryptedMessages] = useState([])
    const [receivedMessages, updateReceivedMessages] = useState([])

    const [popUpData, updatePopUpData] = useState("");

    const getDateTime = (timestamp) => {
        const dateObject = new Date(timestamp*1000)

        const humanDateFormat = dateObject.toLocaleString()
        return humanDateFormat
    }


    const decryptMessage = async (item) => {

        let response = await axios.get(item._ipfsLink)
        let encryptedMessage = response.data

        ethereum
          .request({
            method: 'eth_decrypt',
            params: [encryptedMessage,
                currentAccount],
          })
          .then((decryptedMessage) => {
                  console.log('The decrypted message is:', decryptedMessage)
              updateDecryptedMessages({...decryptedMessages, [item.id]:decryptedMessage})

              }
          )
          .catch((error) => console.log(error.message));
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
              }
            
            }`.replace("__address__", currentAccount),
              variables: {}
            });

        var config = {
            method: 'post',
            url: 'https://api.studio.thegraph.com/query/18117/graph-email/v0.4',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                updateReceivedMessages(response.data.data.newMessages)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getReceivedMessages()

    }, [])

    return (
        <Box paddingTop={"5rem"}>
            <Typography>Inbox</Typography>
            <Stack spacing={1}>
            {receivedMessages.map(item => {
                return (<Card key={item.id} sx={{ width:"30vw" }}>
                  <CardContent >
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      From : {item._fromAddress}
                    </Typography>
                      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Date : {getDateTime(item.time)}
                    </Typography>
                      <Typography>
                          Message : {decryptedMessages[item.id]}
                      </Typography>
                  </CardContent>
                  <CardActions>
                    <Button disabled={decryptedMessages[item.id] && true} onClick={e=>decryptMessage(item)} size="small">Decrypt and View</Button>
                  </CardActions>
                </Card>)
            })
            }
            </Stack>
        </Box>
    )

}

export default InboxComponent;