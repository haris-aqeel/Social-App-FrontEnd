import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../global/StateProvider";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CircularProgress from "@material-ui/core/CircularProgress";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const GetPosts = () => {
  const [{ user, postanduser }, dispatch] = useStateValue();
  const [data, setData] = useState([]);

  const classes = useStyles();

  const handleDelete = async (id) => {
    const deleteData = await fetch(
      "http://cors-anywhere.herokuapp.com/https://smallsocialappbackend.herokuapp.com/userPosts",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: id,
        }),
      }
    );

    console.log(deleteData);

    dispatch({
      type: "Delete_PostsAndUser",
      id: id,
    });
  };

  useEffect(() => {
    setData(postanduser);
  }, [postanduser]);



  return (
    <Paper
      elevation={3}
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      
      {data && data!==undefined ?  (
        data.map((curr) => {


        return  <Card
            className={classes.root}
            style={{ minWidth: "300px", width: "500px", margin: "20px 0px" }}
          >
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {curr.name[0] || ""}
                </Avatar>
              }
              action={
                user._id === curr.personalId ? (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(curr._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : undefined
              }
              title={curr.email}
              subheader={curr.time}
            />
            
            <CardMedia
              className={classes.media}
              image={curr.myFile}
              title={curr.text}
            />

            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {curr.text}
              </Typography>
            </CardContent>
          </Card>;
        })
      ) : (
       "loading"
      )}
    </Paper>
  );
};

export default GetPosts;
