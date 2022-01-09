import React, {useState} from "react"
import {Divider, InputBase, Stack, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import {alpha} from "@material-ui/core";


const ColumnGridComponent = (props) => {

    return (
        <Stack paddingTop={"1rem"} direction={"row"} height={"90vh"} spacing={2}>
            <Stack width={"30vw"} direction={"column"} >
                <TextField
                    disabled={true}
                    label="Search"
                    InputProps={{
                        type: 'search',
                    }}
                />

                <Stack style={{maxHeight: '100%', overflow: 'auto'}}>
                {props.leftCol}
                </Stack>

            </Stack>
            <Divider orientation="vertical"/>
            <Stack>
                {props.openedMessage}
            </Stack>
        </Stack>
    )
}

export default ColumnGridComponent