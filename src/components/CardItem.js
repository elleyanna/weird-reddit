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
  nsfw: {
    filter: "blur(5px)"
  }
});

const CardItem = ({ file, icon }) => {
  const classes = useStyles();

  const getCardMediaImage = (imageData) => {
    switch(true) {      
      case imageData.thumbnail === "nsfw":
        return imageData.url_overridden_by_dest;
      case imageData.domain.includes("i.redd.it"):
        return imageData.url;
      case imageData.url.includes(".jpg"):
          return imageData.url;
      case imageData.url.includes("youtube"):
          return imageData.thumbnail;
      case imageData.url.includes(".gifv"):
          return imageData.thumbnail;
      default: return eyeballs;
    }
  };

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
            src={getCardMediaImage(file.data)}
            alt={file.data.url}
            height="180"
            title={file.data.title}
            className={file.data.thumbnail === "nsfw" ? classes.nsfw : null}
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
