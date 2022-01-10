import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import OutboundIcon from '@mui/icons-material/Outbound';
import ContactsIcon from '@mui/icons-material/Contacts';
import {Button, ListItemButton, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ConnectWalletComponent from "../connect-wallet/connect-wallet.component";
import {Home} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {basePath} from "../../App";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const currentAccount = useSelector(state => state.account.currentAccount)

    const handleLogout = () => {
        localStorage.setItem("currentAccount", "")
        console.log(localStorage.getItem("currentAccount"))
        window.location.reload()
        navigate(basePath+"/home")
    }

    const handleListItemClick = (event, index, text) => {
        navigate(basePath+"/" + text.toLowerCase().split(" ").join("-"))
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    let logoutButton = <></>
    if (typeof currentAccount === "string"){

        logoutButton = currentAccount.includes("0x")?<Button fullWidth onClick={handleLogout} variant={"contained"}>Logout</Button>:<></>
    }


    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Stack direction={"row"}>

                        <Typography variant="h5" noWrap component="div">
                            DeMail
                        </Typography>

                    </Stack>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>

                <Box display={"flex"} flexDirection={"column"} height={"100vh"} justifyContent={"space-between"}>

                    <div>
                        <List>
                            {[["Home", <Home/>], ['Inbox', <InboxIcon/>], ['Outbox', <OutboundIcon/>], ['Contacts',
                                <ContactsIcon/>]].map((item, index) => (
                                <ListItemButton key={item[0]}
                                                selected={props.selected === item[0].toLowerCase().split(" ").join("-")}
                                                onClick={(event) => handleListItemClick(event, index, item[0])}>
                                    <ListItemIcon>
                                        {item[1]}
                                    </ListItemIcon>
                                    <ListItemText primary={item[0]}/>
                                </ListItemButton>
                            ))}
                        </List>
                    </div>
                    <div>
                        {logoutButton}
                    </div>
                </Box>
            </Drawer>
            <Box component="main" sx={{fontSize: 72, flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {props.children}
            </Box>
        </Box>
    );
}
