import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import ChildCareIcon from "@material-ui/icons/ChildCare";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    backgroundImage:
      "linear-gradient(to left, rgba(254, 107, 139, .5), rgba(255,142,83,.8))",
  },
  weirdIcon: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  weirdIcon2: {
    marginBottom: theme.spacing(2),
  },
  weirdIcon3: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

function AppBarTop({ onMenuItemSelected, subreddits }) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    onMenuItemSelected(event.currentTarget.title);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      className={classes.appBarContainer}
      fontFamily="Monospace"
      color="transparent"
    >
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="fade-menu"
          aria-controls="fade-menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClick} title={`"${subreddits.join("+")}"`}>
            All the weirdos
          </MenuItem>
          {subreddits.map((subreddit) => {
            return (
              <MenuItem onClick={handleClick} title={subreddit}>
                {subreddit}
              </MenuItem>
            );
          })}
        </Menu>
        <ChildCareIcon
          color="action"
          className={classes.weirdIcon}
          fontSize="large"
        />
        <ChildCareIcon
          color="action"
          className={classes.weirdIcon2}
          fontSize="large"
        />
        <ChildCareIcon
          color="action"
          className={classes.weirdIcon3}
          fontSize="large"
        />
        <Typography variant="h3" className={classes.title}>
          <Box fontFamily="Monospace" m={1}>
            weird reddit
          </Box>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarTop;
