import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Link, Links, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { userLoginMutation } from '../../../customHooks/queries/auth.query';
import { NotAccessibleOutlined } from '@mui/icons-material';

export default function Login() {

  const { register, handleSubmit, formState:{ errors } } = useForm();
      const [successMessage, setSuccessMessage] = useState('');
      const { mutate, isPending } = userLoginMutation();
      const navigate = useNavigate();

  const onhandelSubmit =async (data) => {
    console.log(data);
    const formData = new URLSearchParams();
      formData.append("email",data.email);
      formData.append("password",data.password)
      mutate(formData, {
        onSuccess: () => {
          //navigate(`/auth/verify_otp`);
        },
      });
        //toast(response.data?.message)
        navigate("/cms/product_list")
      
  }
  return (
    <>

<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
  <Grid container spacing={2} style={{ height: "100vh" }}>
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          height: '40vh',
          width: '20vw',
          backgroundImage: 'url(https://pagedone.io/asset/uploads/1696488602.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          padding: 3,
          marginTop:'17vh',
        }}
        md={6}
      />
    </Grid>
    </Grid>
        <Grid container spacing={2} style={{ height: "100vh" }}>
          <Grid item
            xs={12}
            md={6}
            sx={{ margin: "0 auto" }}
            style={{ marginTop: "100px" }}>
            <Paper elevation={3} sx={{ padding: 2 }} style={{ height: "250px", width: "450px" }}>
              <Typography variant="h5" gutterBottom align="center">
                Login
              </Typography>
              <form>
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email format",
                    },
                  })}
                  id="email"
                  label="Email Address"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  error={errors.email}
                helperText={errors.email && errors.email.message}
                />


                <TextField
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: "Minimum eight characters, at least one letter, one number and one special character",
                    },
                  })}
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  margin="normal"
                  fullWidth
                  error={errors.password}
                 helperText={errors.password && errors.password.message}
                />

                <Button variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  onClick={handleSubmit(onhandelSubmit)}
                  sx={{ marginTop: 2 }} >
                  Login
                </Button>

              </form>
              <Typography variant="body2" align="center">
                        Don't have an account? <Link to="/auth/registration">Registration</Link>
                      </Typography>
              
            </Paper>
          </Grid>
        </Grid>
      </div>

    </>
  );
}
