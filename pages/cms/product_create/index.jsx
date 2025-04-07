import { useNavigate } from "react-router-dom";
import { productCreateMutation } from '../../../customHooks/queries/product.query';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState } from "react";

export default function ProductCreate(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { mutate } = productCreateMutation();
    const navigate = useNavigate();
    
    const onSubmit = async (createData) => {
        const { name, category, price, description, profile_pic } = createData;
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("category", category);
        formdata.append("price", price);
        formdata.append("description", description);
        formdata.append("image", profile_pic[0]);

        mutate(formdata, {
            onSuccess: () => {
                navigate(`/cms/product_list`);
            },
        });
    };

    return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, textAlign: "center" }}>
                        Create Product
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("name", { required: "Name is required" })}
                            label="Product Name"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            {...register("category", { required: "Category is required" })}
                            label="Category"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.category}
                            helperText={errors.category?.message}
                        />
                        <TextField
                            {...register("price", { required: "Price is required" })}
                            label="Price"
                            variant="outlined"
                            type="number"
                            margin="normal"
                            fullWidth
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                        <TextField
                            {...register("description", { required: "Description is required" })}
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={3}
                            fullWidth
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        
                        {/* File Upload Field */}
                        <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
                            Upload Image
                            <input type="file" {...register("profile_pic", { required: "Image is required" })} hidden />
                        </Button>
                        {errors.profile_pic && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{errors.profile_pic.message}</Typography>}

                        <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            size="large" 
                            type="submit"
                            sx={{ mt: 3 }}
                        >
                            Create
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
    );
}
