import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { Search as SearchIcon, ShoppingCart, Person, Favorite, Notifications, Menu as MenuIcon, Close as CloseIcon } from '@material-ui/icons';
import { useNavigate, Link } from 'react-router-dom';
import { useStyleHeader } from './headerStyle';
import Loginsign from './loginsign';

export default function Header() {
    const classes = useStyleHeader();
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userBoxOpen, setUserBoxOpen] = useState(false);

    const categoryCards = [{ id: 1, name: 'laptop', value: 'Laptop' }, { id: 2, name: 'footbear', value: 'Footbear' }, { id: 3, name: 'attire', value: 'Attire' },
    { id: 4, name: 'bottom', value: 'Bottom' }, { id: 5, name: 'camera', value: 'Camera' }, { id: 6, name: 'tops', value: 'Tops' }, { id: 7, name: 'smartphones', value: 'SmartPhones' },];

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) { navigate(`/products/${keyword}`); }
        else { navigate(`/products`); }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const showUserBox = () => {
        setUserBoxOpen(true);
    };

    const hideUserBox = () => {
        setUserBoxOpen(false);
    };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar1}>
                    <Typography variant="h6" className={classes.logo}> Brand Logo </Typography>
                    <form className={classes.search} onSubmit={searchSubmitHandler}>
                        <div className={classes.searchIcon}> <SearchIcon /> </div>
                        <InputBase
                            placeholder="Search..."
                            classes={{ root: classes.inputRoot, input: classes.inputInput, }}
                            style={{ width: '150px', height: '15px' }}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </form>
                    <div className={classes.navigationLinks2}>
                        <Typography variant="body2" style={{ marginRight: '16px' }}> 1234567891 </Typography>
                        <Typography variant="body2"> abcd1234@gmail.com </Typography>
                    </div>
                </Toolbar>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.hamburgerIcon} onClick={toggleSidebar}>
                        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <div className={classes.navigationLinks1}>
                        <Link to={'/'} variant="body2" style={{ marginRight: '16px' }} className={classes.link}> Home </Link>
                        <Link to={'/about'} variant="body2" style={{ marginRight: '16px' }} className={classes.link}> About </Link>
                        <Link to={'/contact'} variant="body2" style={{ marginRight: '16px' }} className={classes.link}> Contact </Link>
                    </div>
                    <div className={classes.navigationLinks1}>
                        {categoryCards.map((category) => (
                            <Link to={`/products/${category.name}`} key={category.id} variant="body2" style={{ marginRight: '16px' }} className={classes.link}>{category.value}</Link>
                        ))}
                    </div>
                    <div className={classes.navigationLinks}>
                        <Link to={'/wishlist'} className={classes.link}>
                            <IconButton color="inherit" style={{ marginRight: '16px' }}> <Favorite /> </IconButton>
                        </Link>
                        <Link to={'/destination'} className={classes.link}>
                            <IconButton color="inherit" style={{ marginRight: '16px' }}> <Notifications /> </IconButton>
                        </Link>
                        <Link to={'/destination'} className={classes.link}>
                            <IconButton color="inherit"> <ShoppingCart /> </IconButton>
                        </Link>
                        <IconButton color="inherit" style={{ marginLeft: '-16px' }} onMouseEnter={showUserBox} onMouseLeave={hideUserBox} > <Person /> </IconButton>
                    </div>
                    {userBoxOpen && (
                        <div className={classes.userBox} onMouseEnter={showUserBox} onMouseLeave={hideUserBox}>
                            <Loginsign />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
                <div className={classes.sidebar}>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Heading 1" className={classes.sidebarHeading} />
                        </ListItem>
                        <div>
                            <Link to={'/'} variant="body2" style={{ display: 'block', marginBottom: '8px', paddingLeft: '40px' }}> Home </Link>
                            <Link to={'/about'} variant="body2" style={{ display: 'block', marginBottom: '8px', paddingLeft: '40px' }}> About </Link>
                            <Link to={'/contact'} variant="body2" style={{ display: 'block', marginBottom: '8px', paddingLeft: '40px' }}> Contact </Link>
                        </div>
                        <ListItem button>
                            <ListItemText primary="Category Links" className={classes.sidebarHeading} />
                        </ListItem>
                        <div>
                            {categoryCards.map((category) => (
                                <Link to={`/products/${category.name}`} key={category.id} variant="body2" style={{ display: 'block', marginBottom: '8px', paddingLeft: '40px' }}>
                                    {category.value}
                                </Link>
                            ))}
                        </div>
                    </List>
                </div>
            </Drawer>
        </>
    );
};
