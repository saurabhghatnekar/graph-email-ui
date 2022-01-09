import {Breadcrumbs, Link, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import MiniDrawer from "../../components/drawer/drawer";
import {setCurrentAccount} from "../../redux/account/account.actions";
import {connect, useSelector} from "react-redux";
import {Button, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {addContact} from "../../redux/contacts/contacts.action";


const ContactsPage = (props) => {
    const {currentAccount} = props;
    const [address, updateAddress] = useState();
    const [name, updateName] = useState("");
    const dispatch = useDispatch();

    const handleAddToContacts = () => {
        dispatch(addContact(address, name, currentAccount))
    }
    // useSelector()
    return (
        <MiniDrawer selected={"contacts"}>
            <Breadcrumbs>
                <Link
                    underline="hover"
                    color="inherit"
                    href="/graph-email-ui"
                >
                    Home
                </Link>
                <Typography color="text.primary">Contacts</Typography>
            </Breadcrumbs>

            <Stack padding={1} spacing={2}>
              <TextField
              id="toAddress"
              label="To Address"
                  onChange={(e)=>updateAddress(e.target.value)}
            />
              <TextField
              id="name"
              label="Name"
              onChange={e=>updateName(e.target.value)}
            />
          <Button variant={"contained"} onClick={handleAddToContacts} >Add To Contacts</Button>

          </Stack>
        </MiniDrawer>
    )
}


const mapDispatchToProps = dispatch => ({
    setCurrentAccount: account => dispatch(setCurrentAccount(account))
})

const mapStateToProps = state => ({
    currentAccount: state.account.currentAccount
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactsPage)