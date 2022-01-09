import React, {useState} from "react";
import ConnectWalletComponent from "../../components/connect-wallet/connect-wallet.component";
import MiniDrawer from "../../components/drawer/drawer";
import ColumnGridComponent from "../../components/column-grid/column-grid.component";
import InboxComponent from "../../components/inbox/inbox.component";
import OpenedMessage from "../../components/opened-component/opened.copmponent";
import {Breadcrumbs, Divider, Link, Typography} from "@mui/material";

const InboxPage = (props) => {
    const [clickedItem, updateClickItem] = useState(null);

    return (
        <MiniDrawer selected={"inbox"}>
            <Breadcrumbs>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/graph-email-ui"
                >
                    Home
                </Link>
                <Typography color="text.primary">Inbox</Typography>
            </Breadcrumbs>

            <ColumnGridComponent

                leftCol={<InboxComponent updateClickItem={updateClickItem}/>}
                openedMessage={<OpenedMessage type={"inbox"} item={clickedItem}/>}
            />
        </MiniDrawer>
    )

}

export default InboxPage;