import React, {useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup"; // for everything
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import { showAlert } from "../alert/Alert";
import { useStateValue } from "../global/StateProvider";
import fetchUsersData from '../services/service1'


const useStyles = makeStyles((theme) => ({
  paper: {
    height: "83vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: "0 auto",
    maxWidth: "500px",
    minWidth: "220px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();

  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    const data = fetchUsersData();

    data
      .then((curr) => {
        dispatch({
          type: "Add_PostsAndUser",
          item: curr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let validationSchema = yup.object({
    email: yup.string().email().required("Please enter valid email Address"),
    password: yup.string().min(6, "Pssword must contain atleast 6 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await fetch(
          "https://cors-anywhere.herokuapp.com/https://smallsocialappbackend.herokuapp.com/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        const resultStatus = await result.json();
        
        // Effects Of Login User Successful

        showAlert("Login Successful");
        values.email = "";
        values.password = "";
        dispatch({
          type: "Set_User",
          user: resultStatus,
        });
        history.push('/home')

        return resultStatus;
      } catch (err) {

        // Effects Of Fail Login

        showAlert("Invalid Login Details");
        values.email = "";
        values.password = "";
        dispatch({
          type: "Set_User",
          user: null,
        });



        return err;
      }
    },

    validationSchema: validationSchema,
  });




  return (
    <div className={classes.paper}>
      <div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
      </div>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          Don't Have an Account?{" "}
          <Link to="/authentication/register">Create an Account Now.</Link>
        </Grid>

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
