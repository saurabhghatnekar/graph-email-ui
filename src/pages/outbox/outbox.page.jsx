import React, {useEffect, useState} from "react";
import ConnectWalletComponent from "../../components/connect-wallet/connect-wallet.component";
import MiniDrawer from "../../components/drawer/drawer";
import ColumnGridComponent from "../../components/column-grid/column-grid.component";

import OpenedMessage from "../../components/opened-component/opened.copmponent";
import {
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Link,
    ListItem,
    Stack,
    Typography
} from "@mui/material";
import axios from "axios";
import {connect, useSelector} from "react-redux";

const OutboxPage = (props) => {
    const currentAccount = useSelector(state => state.account.currentAccount)
    const contacts = useSelector(state => state.contacts.contacts)
    const [clickedItem, updateClickItem] = useState(null);
    const [receivedMessages, updateReceivedMessages] = useState([]);
    const getDateTime = (timestamp) => {
        const dateObject = new Date(timestamp * 1000)

        const humanDateFormat = dateObject.toLocaleString()
        return humanDateFormat
    }

    const getSentMessages = () => {
        var data = JSON.stringify({
            query: `query {
            
              newMessages(where: {_fromAddress:"__address__"}) {
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
        console.log("outbox", currentAccount)
        getSentMessages();
    }, [currentAccount])

    return (
        <MiniDrawer selected={"outbox"}>
            <Breadcrumbs>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/graph-email-ui"
                >
                    Home
                </Link>
                <Typography color="text.primary">Outbox</Typography>
            </Breadcrumbs>

            <ColumnGridComponent
                type={"outbox"}
                leftCol={<Stack paddingTop={"1rem"} spacing={1}>
                    {receivedMessages.map(item => {
                        return (<ListItem key={item.id}>
                            <Card sx={{width: "30vw"}}>
                                <CardContent>
                                    <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
                                        <strong>To</strong> : {contacts[item._toAddress] !== undefined ? contacts[item._toAddress] + "\n" + item._toAddress : item._toAddress}
                                    </Typography>
                                    <Typography sx={{fontSize: 20}} color="text.secondary" gutterBottom>
                                        <strong>Date</strong> : {getDateTime(item.time)}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        onClick={e => updateClickItem(item)} size="small">Decrypt and View</Button>
                                </CardActions>
                            </Card>
                        </ListItem>)
                    })
                    }
                </Stack>}
                openedMessage={<OpenedMessage type={"outbox"} item={clickedItem}/>}
            />
        </MiniDrawer>
    )

}

const mapStateToProps = state => ({
    currentAccount: state.account.currentAccount
})

export default connect(mapStateToProps)(OutboxPage)

