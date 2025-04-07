import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { userforgot_passwordMutation } from '../../../customHooks/queries/auth.query';

export default function Forgot_password() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const { mutate, isPending } = userforgot_passwordMutation();
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem("user_email");
        if (storedEmail) {
            setValue("email", storedEmail);
        }
        setValue("answer", "test"); // Setting predefined value for answer
    }, [setValue]);

    const onhandelSubmit = async (createData) => {
        
        const { new_password,answer,email } = createData;
        const token = localStorage.getItem("token");
        const user_id = localStorage.getItem("user_id");

        const formdata = new URLSearchParams();
        formdata.append("email", email);
        formdata.append("answer", answer);
        formdata.append("newPassword", new_password);
        formdata.append("token", token);
        


        mutate(formdata, {
            onSuccess: () => {
                navigate(`/auth/verify_otp`);
            },
        });
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                                marginTop: '17vh',
                            }}
                            md={6}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ height: "100vh" }}>
                    <Grid item xs={12} md={6} sx={{ margin: "0 auto" }} style={{ marginTop: "100px" }}>
                        <Paper elevation={3} sx={{ padding: 2 }} style={{ height: "250px", width: "450px" }}>
                            <Typography variant="h5" gutterBottom align="center">
                                Forgot Password
                            </Typography>
                            <form onSubmit={handleSubmit(onhandelSubmit)}>
                                <TextField
                                    {...register("email")}
                                    id="email"
                                    label="Email"
                                    variant="standard"
                                    type="email"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                />
                                <TextField
                                    {...register("new_password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                            message: "Minimum eight characters, at least one letter, one number, and one special character",
                                        },
                                    })}
                                    id="new_password"
                                    label="Password"
                                    variant="standard"
                                    type="password"
                                    margin="normal"
                                    fullWidth
                                    error={!!errors.new_password}
                                    helperText={errors.new_password?.message}
                                />
                                <TextField
                                    {...register("answer")}
                                    id="answer"
                                    label="Answer"
                                    variant="standard"
                                    type="text"
                                    margin="normal"
                                    fullWidth
                                    InputProps={{ readOnly: true }}
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    sx={{ marginTop: 2 }}>
                                    Forgot Password
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
