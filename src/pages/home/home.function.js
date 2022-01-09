import axios from "axios";

export const getReceivedMessages = (currentAccount) => {
    console.log("getReceivedMessages", currentAccount)
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
                console.log(response.data)
                return response.data.data.newMessages
            })
            .catch(function (error) {
                console.log(error);
            });
    }
