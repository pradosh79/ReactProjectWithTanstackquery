import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userpassword_verifyMutation } from '../../../customHooks/queries/auth.query';

export default function Update_password() {

  const { register, handleSubmit, formState:{ errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const { mutate, isPending } = userpassword_verifyMutation();
  const navigate = useNavigate();
  
  const onhandelSubmit = async (createData) => {
    const {new_password} = createData;
    const token=localStorage.getItem("token"); // Corrected from getIem
    const user_id=localStorage.getItem("user_id");

    const formdata = new URLSearchParams();
    formdata.append("password", new_password);
    formdata.append("token", token);
    formdata.append("user_id", user_id);
    mutate(formdata, {
      onSuccess: () => {
        navigate(`/auth/verify_otp`);
      },
    });
    
  };


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
                Update Password
              </Typography>
              <form>
                <TextField
                  {...register("new_password", {
                    required: "password is required",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: "Minimum eight characters, at least one letter, one number and one special character",
                    },
                  })}
                  id="new_password"
                  label="Password"
                  variant="standard"
                  type="password"
                  margin="normal"
                  fullWidth
                  error={errors.new_password}
                 helperText={errors.new_password && errors.new_password.message}
                />

                <Button variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  onClick={handleSubmit(onhandelSubmit)}
                  sx={{ marginTop: 2 }} >
                  Update Password
                </Button>

              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>

    </>
  )
}
