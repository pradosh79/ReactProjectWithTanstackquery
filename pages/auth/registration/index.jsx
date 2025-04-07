import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, InputAdornment, Paper, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@emotion/react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { userCreateMutation } from '../../../customHooks/queries/auth.query';


export default function Registration() {
    const { register, handleSubmit, formState:{ errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const { mutate, isPending } = userCreateMutation();
    const navigate = useNavigate();  

  const onhandelSubmit = async (createData) => {
    
    const {fname,email,password,phone,answer} = createData;
    const formdata = new URLSearchParams();
    formdata.append("name", fname);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("phone", phone);
    formdata.append("answer", answer);
    mutate(formdata, {
      onSuccess: () => {
        navigate(`/auth/login`);
      },
    });
    
  };
  //const password=watch('password');

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Grid container spacing={2} style={{ marginTop: "50px" }}>
    <Grid item xs={12} md={6}>
      <Box
        sx={{
          height: '106vh',
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

    <Grid item xs={12} md={6} style={{ marginTop: "100px" }}>
      <Paper elevation={3} sx={{ padding: 3 }} style={{ maxWidth: "450px", margin: "0 auto" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create an Account
        </Typography>
        <Typography variant="body2" align="center">
          Already have an account? <Link to="/auth/login">Login</Link>
        </Typography>
        <form onSubmit={handleSubmit(onhandelSubmit)}>
          
            
              <TextField
                {...register("fname", {
                  required: "name is required",
                  pattern: /^[a-z ,.'-]+$/i,
                })}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.fname}
                helperText={errors.fname?.message}
              />
            
             
          
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
            label="Email Address"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password", {
              required: "Password is required",
              pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
           {/* <TextField
            {...register("confirmpassword", {
              required: "Confirm password is required",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.confirmpassword}
            helperText={errors.confirmpassword?.message}
          />  */}
          <TextField
                {...register("phone", {
                  required: "Phone is required",
                })}
                label="Phone"
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
              <TextField
                {...register("answer", {
                  required: "answer is required",
                })}
                label="answer"
                fullWidth
                margin="normal"
                error={!!errors.answer}
                helperText={errors.answer?.message}
              />
          {/* <TextField
            {...register("profile_pic", { required: "Profile picture is required" })}
            type="file"
            fullWidth
            margin="normal"
            sx={{ backgroundColor: "white", borderRadius: "5px", mb: 4 }}
            error={!!errors.profile_pic}
            helperText={errors.profile_pic?.message}
          /> */}
          <Button variant="contained" color="primary" fullWidth size="large" type="submit" sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </form>
        {successMessage && (
          <Typography variant="body1" color="success" sx={{ marginTop: 2 }}>
            {successMessage}
          </Typography>
        )}
      </Paper>
    </Grid>
  </Grid>
</div>

    </>
  );
}