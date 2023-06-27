import React, { useState } from 'react';
import { useStyleSidebar } from './sidebarStyle';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@material-ui/core';
import { Dashboard as DashboardIcon, ShoppingCart as ShoppingCartIcon, Store as StoreIcon, Menu as MenuIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const classes = useStyleSidebar();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={`${classes.drawer} ${open ? classes.drawerOpen : classes.drawerClose}`}
        classes={{
          paper: `${open ? classes.drawerOpen : classes.drawerClose}`,
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button component={Link} to="/seller/dashboard" className={classes.listItem}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className={open ? classes.listItemText : ''} />
          </ListItem>
          <ListItem button component={Link} to="/shopping-cart" className={classes.listItem}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Shopping Cart" className={open ? classes.listItemText : ''} />
          </ListItem>
          <ListItem button component={Link} to="/seller/products" className={classes.listItem}>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Products" className={open ? classes.listItemText : ''} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};