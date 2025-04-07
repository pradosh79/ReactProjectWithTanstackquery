import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { userRegistration_verifyMutation } from '../../../customHooks/queries/auth.query';

export default function Verify_otp() {
    const { register, handleSubmit, formState:{ errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const { mutate, isPending } = userRegistration_verifyMutation();
    const navigate = useNavigate(); 

    const onhandelSubmit = async (createData) => {
        console.log(createData);
        const {email,verify_otp} = createData;
        const formdata = new URLSearchParams();
        formdata.append("otp", verify_otp);
        formdata.append("email", email);
        mutate(formdata, {
          onSuccess: () => {
            navigate(`/auth/verify_otp`);
          },
        });
        
      };

  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Grid container spacing={2} style={{ marginTop: "50px" }}>
    <Grid item xs={12} md={6} style={{ marginTop: "100px" }}>
      <Paper elevation={3} sx={{ padding: 3 }} style={{ maxWidth: "450px", margin: "0 auto" }}>
    
        <form onSubmit={handleSubmit(onhandelSubmit)}>
        <TextField
                {...register("email", {
                  required: "email is required",
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                })}
                label="email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
             <TextField
                {...register("verify_otp", {
                  required: "verify_otp is required",
                })}
                label="verify_otp"
                fullWidth
                margin="normal"
                error={!!errors.verify_otp}
                helperText={errors.verify_otp?.message}
              />
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
  )
}
