import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import eyeballz from "../assets/eyeballz.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarContainer: {
    backgroundImage: `url(${eyeballz})`,
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
    <div className={classes.root}>
      <div className={classes.appBarContainer}>
        <AppBar color="transparent" position="static">
          <Toolbar>
            <ChildCareIcon className={classes.weirdIcon} fontSize="large" />
            <Typography variant="h2" className={classes.title}>
              Weird Reddit
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}

export default AppBarTop;
