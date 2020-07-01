import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import eyeballs from "../assets/eyeballs.png";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBarContainer: {
    backgroundImage: `url(${eyeballs})`,
  },
  weirdIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBarTop() {
  const classes = useStyles();
  return (
    <div>
      <AppBar className={classes.appBarContainer} color="white">
        <Toolbar>
          <ChildCareIcon className={classes.weirdIcon} fontSize="large" />
          <Typography variant="h3" className={classes.title}>
            weird reddit
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppBarTop;
