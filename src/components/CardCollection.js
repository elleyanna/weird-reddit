import React from "react";

import Box from "@material-ui/core/Box";
import CardItem from "./CardItem.js";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "60px",
    paddingBottom: "60px",
  },
  header: {
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.75)",
    [theme.breakpoints.down("lg")]: {
      fontSize: "5rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "4rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    }
  }
}));

const CardCollection = ({ files, icon, subreddit }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h1" className={classes.header}>
        <Box fontFamily="Monospace" m={1}>
          {subreddit}
        </Box>
      </Typography> 
      <Grid
        container
        alignItems="center"
        justify="space-between"
        spacing={3}
      >
        {files.map((file, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <CardItem file={file} icon={icon} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CardCollection;
