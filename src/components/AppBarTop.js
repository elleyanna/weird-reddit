import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import githubIcon from "../assets/octocat.png";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    backgroundImage:
      "linear-gradient(to left, rgba(254, 107, 139, .5), rgba(255,142,83,.8))",
  },
  githubIcon: {
    marginTop: theme.spacing(),
    width: "25px",
    height: "20px",
  },
  title: {
    flexGrow: 1,
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

function AppBarTop({
  onSubredditMenuItemSelected,
  onSortOptionSelected,
  selectedSort,
  sortOptions,
  subreddits
}) {
  const classes = useStyles();

  const [anchorSubredditMenu, setAnchorSubredditMenu] = React.useState(null);
  const subredditMenupOpen = Boolean(anchorSubredditMenu);

  const [anchorSortMenu, setAnchorSortMenu] = React.useState(null);
  const sortMenupOpen = Boolean(anchorSortMenu);

  const handleSubredditMenuClick = (event) => {
    setAnchorSubredditMenu(event.currentTarget);
  };

  const handleSubredditMenuItemClick = (event) => {
    onSubredditMenuItemSelected(event.currentTarget.title);
    setAnchorSubredditMenu(null);
  };

  const handleSortOptionClick = (event) => {
    onSortOptionSelected(event.currentTarget.title);
    setAnchorSortMenu(null);
  };

  const handleClose = () => {
    setAnchorSortMenu(null);
    setAnchorSubredditMenu(null);
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
          onClick={handleSubredditMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorSubredditMenu}
          keepMounted
          open={subredditMenupOpen}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={handleSubredditMenuItemClick}
            title={`"${subreddits.join("+")}"`}
          >
            All the weirdos
          </MenuItem>
          {subreddits.map((subreddit, index) => {
            return (
              <MenuItem
                onClick={handleSubredditMenuItemClick}
                title={subreddit}
                key={index}
              >
                {subreddit}
              </MenuItem>
            );
          })}
        </Menu>
        <Link
          rel="noopener"
          color="inherit"
          target="_blank"
          href="https://github.com/elleyanna/weird-reddit"
          underline="none"
        >
          <img src={githubIcon} alt="octocat" className={classes.githubIcon} />
        </Link>
        <Typography variant="h4" className={classes.title}>
          <Box fontFamily="Monospace" m={1}>
            weird reddit
          </Box>
        </Typography>
        <Menu
          id="fade-menu"
          anchorEl={anchorSortMenu}
          keepMounted
          open={sortMenupOpen}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {sortOptions.map((option, index) => {
            return (
              <MenuItem
                key={index}
                title={option}
                onClick={handleSortOptionClick}
              >
                {option}
              </MenuItem>
            );
          })}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarTop;
