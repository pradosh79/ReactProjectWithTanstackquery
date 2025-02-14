import { Button, Grid2, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axiosInstance from '../../../api/axios/axios';
import { endPoints } from '../../../api/endpoints/endpoints';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Updateproduct() {
    const {product_id} = useParams();
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({title:null,description:null});
    const [successMessage, setSuccessMessage] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    //
    
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            setLoading(true);
              const response = await axiosInstance.get(endPoints.cms.productDetails+'/'+product_id);
              console.log(response);
              setLoading(false);
            if (response.status === 200||response.status === 201) {
              console.log(response);
              setProducts(response.data.data); // Update success message
              reset(
                {name:response.data.data.name,category:response.data.data.category,price:response.data.data.price,description:response.data.data.description}
              )
            }
            
          } catch (err) {
            console.error("Error fetching products:", err);
            setError(err.message || "Failed to fetch products");
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, [product_id]);

    const onhandelSubmit = async (data) => {
    
          const formData = new FormData();
          formData.append("id",product_id);
          formData.append("name",data.name);
          formData.append("caegory",data.category);
          formData.append("price",data.price);
          formData.append("description",data.description)
          formData.append("image",data.profile_pic[0]);
          //console.log(formData);
          try{
            const response = await axiosInstance.post(endPoints.cms.productUpdate+'/'+product_id, formData);
            if (response.status === 200) {
              setSuccessMessage(response.data.message); // Update success message
            }
            if (response.status === 201) {
              console.log(response)
              setSuccessMessage(response.data.message); // Update success message
            }
            toast(response.data?.message)
          }catch(error){
            console.log(error);
            setSuccessMessage('Registration failed. Please try again.');
          }
      }
  return (
    <>
    <div>
        <Grid2 container spacing={2} style={{ height: "100vh" }}>
          <Grid2 item
            xs={12}
            md={6}
            sx={{ margin: "0 auto" }}
            style={{ marginTop: "100px" }}>
            <Paper elevation={3} sx={{ padding: 2 }} style={{ height: "250px", width: "450px" }}>
              <Typography variant="h5" gutterBottom>
                Update Product
              </Typography>
              <form>
                <TextField
                  {...register("name", {
                    required: "name is required",
                  })}
                  id="name"
                  label="name"
                  value={watch('name')||''}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  error={errors.name}
                  helperText={errors.name && errors.name.message}
                />
                <TextField
                  {...register("category", {
                    required: "category is required",
                  })}
                  id="category"
                  label="category"
                  value={watch('category')||''}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  error={errors.category}
                  helperText={errors.category && errors.category.message}
                />
                <TextField
                  {...register("price", {
                    required: "price is required",
                  })}
                  id="price"
                  label="price"
                  value={watch('price')||''}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  error={errors.price}
                  helperText={errors.price && errors.price.message}
                />

                <TextField
                  {...register("description", {
                    required: "description is required",
                  })}
                  id="description"
                  label="description"
                  value={watch('description')||''}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  error={errors.description}
                helperText={errors.description && errors.description.message}
                />
                 <TextField
                            {...register("profile_pic", {
                                required: "profile_pic is required",
                            })}
                            type="file"
                            variant='outlined'
                            color='secondary'
                            
                            error={!!errors.profile_pic}
                            helperText={errors.profile_pic && errors.profile_pic.message}
                            fullWidth
                            sx={{ backgroundColor: 'white', borderRadius: '5px', mb: 4 }}

                            slotProps={{
                                inputLabel: {
                                    sx: {
                                        color:  "#000",
                                    }
                                },
                                input: {
                                    sx: {
                                      backgroundColor: "white",
                                      color:  "#000", 
                                    },
                                }
                            }}
                        />

                <Button variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  disable={loading}
                  onClick={handleSubmit(onhandelSubmit)}
                  sx={{ marginTop: 2 }} >
                  {loading?'Please Wait':'Update'}
                </Button>

              </form>
            </Paper>
          </Grid2>
        </Grid2> 
      </div>
    
    </>
  )
}
