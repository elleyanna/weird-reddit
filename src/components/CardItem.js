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
import spinner from "../assets/eyeball.gif";

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 345,
  },
  buttonBase: {
    display: "block",
    textAlign: "initial",
  },
});

const CardItem = ({ file, icon }) => {
  const classes = useStyles();
  console.log(file);
  return (
    <Card className={classes.root}>
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
              file.data.domain.includes("red")
                ? file.data.url
                : file.data.thumbnail
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
