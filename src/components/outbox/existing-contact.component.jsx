import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useState} from "react";

const ExistingContactComponent = (props) => {
    const {contacts, handleSelectContact} = props
    const [_selectedContact, _updateSelectedContact] = useState()


    const handleSelect = (e) => {
        let selectedAddress = e.target.value
        handleSelectContact({_toAddress: selectedAddress})
        _updateSelectedContact({_toAddress: selectedAddress})
    }

    return (
        <Box paddingTop={"1rem"} width={"30vw"}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Existing Contact</InputLabel>
                <Select
                    isClearable={true}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={_selectedContact}
                    label="Existing Contact"
                    onChange={handleSelect}
                >
                    {Object.keys(contacts).map(key =>
                        <MenuItem key={key} value={key}>{`${contacts[key]} - ${key}`}</MenuItem>
                    )}
                    <MenuItem value="">
                        <em>Enter Manually</em>
                    </MenuItem>

                </Select>
            </FormControl>
        </Box>
    )
}

export default ExistingContactComponent