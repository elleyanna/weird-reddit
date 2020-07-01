import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const CardItem = ({ file, icon }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              src={icon}
              // className={classes.avatar}
            />
          }
          action={
            <IconButton aria-label="settings">
              {/* <MoreVertIcon />x */}
            </IconButton>
          }
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
        {/* <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Content
          </Typography>
        </CardContent> */}
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;
