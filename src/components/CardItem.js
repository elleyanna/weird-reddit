import React from "react";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import eyeballs from "../assets/eyeballs.png";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  buttonBase: {
    display: "block",
    textAlign: "initial",
  },
});

const CardItem = ({ file, icon }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <Link
          rel="noopener"
          color="inherit"
          target="_blank"
          href={`http://www.reddit.com${file.data.permalink}`}
          underline="none"
        >
          <CardHeader
            avatar={<Avatar aria-label="subreddit avatar" src={icon} />}
            title={file.data.title}
            subheader={`r/${file.data.subreddit}`}
          />
          <CardMedia
            component="img"
            src={
              file.data.thumbnail === "nsfw"
                ? file.data.url_overridden_by_dest
                : file.data.domain.includes("i.redd.it")
                ? file.data.url
                : file.data.thumbnail
                ? file.data.thumbnail
                : eyeballs
            }
            alt={file.data.url}
            height="160"
            title={file.data.title}
          />
        </Link>
      </CardActionArea>
      <CardActions>
        <ArrowUpwardIcon />
        <Typography variant="subtitle1">{file.data.ups}</Typography>
        <Typography variant="caption">{`u/${file.data.author}`}</Typography>
      </CardActions>
    </Card>
  );
};

export default CardItem;
