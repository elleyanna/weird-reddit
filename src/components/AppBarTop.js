import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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

function AppBarTop() {
  const classes = useStyles();
  return (
    <div>
      <AppBar
        className={classes.appBarContainer}
        fontFamily="Monospace"
        color="transparent"
      >
        <Toolbar>
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
    </div>
  );
}

export default AppBarTop;
