import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {muiStyleAlpha} from "@material-ui/data-grid";
import {BsSearch} from "react-icons/bs";
import InputBase from '@material-ui/core/InputBase';
import {Box} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        backgroundColor: muiStyleAlpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: muiStyleAlpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        boxShadow: 'none !important',
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}));

const SearchExtended = (props) => {
    const [searched, setSearched] = React.useState("");
    const classes = useStyles();

    const requestSearch = (searchedVal) => {
        const filteredRows = props.data.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });

        props.setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };


    return (
        <Box component={"div"} className={`${classes.search} ${props.className}`} borderRadius={16}>
            <Box component={"div"} className={classes.searchIcon}>
                <BsSearch/>
            </Box>
            <InputBase
                fullWidth
                placeholder="Search…"
                onChange={(event) => requestSearch(event.target.value)}
                onCancelSearch={() => cancelSearch()}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'search'}}
            />
        </Box>
    );
};

export default SearchExtended;