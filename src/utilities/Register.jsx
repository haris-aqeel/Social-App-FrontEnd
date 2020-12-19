import React from "react";
import { useFormik } from "formik";
import * as yup from "yup"; // for everything
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { showAlert } from "../alert/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "20px",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    marginBottom: "20px",
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

const Register = () => {
  const classes = useStyles();

  let validationSchema = yup.object({
    name: yup
      .string()
      .required("Please enter your Name")
      .min(3, "Name must contain 3 characters"),
    email: yup.string().email().required("Please enter valid email Address"),
    password: yup
      .string()
      .min(6, "Password must contain at least 6 characters")
      .required("Please enter valid address"),
    confirmpassword: yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const result = await fetch(
          "http://cors-anywhere.herokuapp.com/https://smallsocialappbackend.herokuapp.com/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          }
        );

        const resultStatus = await result.json();

        if (resultStatus) {
          showAlert("Account Successfully Created");
          values.name = "";
          values.email = "";
          values.password = "";
          values.confirmpassword = "";
        }
        return resultStatus;
      } catch (err) {
        showAlert("Account with this email already exists");
        values.name="";
        values.email="";
        values.password="";
        values.confirmpassword="";
        return err;
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <Navbar />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

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
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                autoComplete="current-confirmpassword"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmpassword &&
                  Boolean(formik.errors.confirmpassword)
                }
                helperText={
                  formik.touched.confirmpassword &&
                  formik.errors.confirmpassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              Already Have a Account?{" "}
              <Link to="/authentication">Want to Log In?</Link>
            </Grid>
          </Grid>

          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Create Free Account
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
