import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import Link from "@material-ui/core/Link";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  buttonBase: {
    display: "block",
    textAlign: "initial",
  },
});

const CardItem = ({ file, icon }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link
          rel="noopener"
          color="inherit"
          target="_blank"
          href={file.data.url}
          underline="none"
        >
          <CardHeader
            avatar={<Avatar aria-label="subreddit avatar" src={icon} />}
            title={file.data.title}
            subheader={`r/${file.data.subreddit}`}
          />

          <CardMedia
            component={file.data.domain === "youtu.be" ? "iframe" : "img"}
            src={
              file.data.domain === "youtu.be"
                ? `https://www.youtube.com/embed/${file.data.url
                    .split("/")
                    .pop()}`
                : null
            }
            image={file.data.domain !== "youtu.be" ? file.data.url : null}
            alt={file.data.url}
            height="140"
            title={file.data.title}
          />
        </Link>
      </CardActionArea>
      <CardActions>
        <ArrowUpwardIcon />
        <Typography variant="subtitle1">{file.data.ups}</Typography>
        <Typography variant="caption">u/{file.data.author}</Typography>
      </CardActions>
    </Card>
  );
};

export default CardItem;
