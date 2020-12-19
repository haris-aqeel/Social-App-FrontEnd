import React, { useState } from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Button, Paper, TextField } from "@material-ui/core";
import { useStateValue } from "../global/StateProvider";

const UploadPosts = () => {
  const [text, settext] = useState("");
  const [loading, setLoading] = useState(false); // This will contain state of image;
  const [myFile, setmyFile] = useState(""); // This will contain url of the image

  const [{ user }, dispatch] = useStateValue();

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "mySocialAppImages");
    setLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/haris123/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setmyFile(file.url);
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const obj = {
      personalId: user._id,
      myFile: myFile,
      text: text,
    };

    try {
      const postFormData = await fetch(
        "https://cors-anywhere.herokuapp.com/https://smallsocialappbackend.herokuapp.com/userPosts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        }
      );
      dispatch({
        type: "Add_PostsAndUser",
        item: [{...obj, ...user }],
      });

      const result = await postFormData.json();

      return result;
    } catch (error) {
      return error;
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ maxHeight: "83vh", height: "auto", padding: "30px 0px" }}
    >
      <form
        style={{ maxWidth: "500px", margin: "0 auto", minWidth: "280px" }}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <TextField
          id="outlined-multiline-static"
          label="Add Your Post"
          multiline
          fullWidth
          rows={4}
          name="text"
          value={text}
          onChange={(e) => settext(e.target.value)}
          variant="outlined"
        />
        <div style={{ textAlign: "right", marginTop: "5px" }}>
          <label htmlFor="myFile">
            <input
              style={{ display: "none" }}
              id="myFile"
              name="myFile"
              type="file"
              onChange={uploadPhoto}
            />
            <Button fullWidth component="span" variant="contained">
              <PhotoCameraIcon />
            </Button>
          </label>
        </div>
        {loading === false ? (
          <Button variant="contained" color="primary" fullWidth type="submit">
            POST
          </Button>
        ) : (
          <Button variant="contained" color="primary" fullWidth>
            Loading... 
          </Button>
        )}
      </form>
    </Paper>
  );
};

export default UploadPosts;
