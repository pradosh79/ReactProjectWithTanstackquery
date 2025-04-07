import { useParams } from "react-router-dom";
import { productupdateMutation, producteditQuery } from '../../../customHooks/queries/product.query';
import { Paper, Typography, TextField, Button, Grid, Card, CardContent, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";

export default function ProductEdit() {
  const { product_id } = useParams();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  const { data, isLoading } = producteditQuery(product_id, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.data && loading) { 
      setValue("name", data.data.name || '');
      setValue("category", data.data.category || '');
      setValue("price", data.data.price || '');
      setValue("description", data.data.description || '');
      setLoading(false);
    }
  }, [data]);

  const { mutate, isPending } = productupdateMutation();
  
  const onSubmit = async (createData) => {
    const { name, category, price, description, profile_pic } = createData;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    if (profile_pic.length) {
      formData.append("image", profile_pic[0]);
    }

    mutate([formData,product_id], {
      onSuccess: () => {
        Navigate(`/cms/product_list`);
        toast.success("Product updated successfully!");
        //refetch(); // Refresh product data after update
      },
      onError: () => toast.error("Failed to update product."),
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card elevation={5}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
              Update Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    {...register("name", { required: "Name is required" })}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("category", { required: "Category is required" })}
                    label="Category"
                    variant="outlined"
                    fullWidth
                    error={!!errors.category}
                    helperText={errors.category?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("price", { required: "Price is required" })}
                    label="Price"
                    variant="outlined"
                    fullWidth
                    error={!!errors.price}
                    helperText={errors.price?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...register("description", { required: "Description is required" })}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    {...register("profile_pic")}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span" fullWidth>
                      Upload Image
                    </Button>
                  </label>
                </Grid>
                {preview && (
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Box
                      component="img"
                      src={preview}
                      alt="Preview"
                      sx={{ width: 100, height: 100, borderRadius: 2, mt: 2 }}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isPending}
                  >
                    {isPending ? "Updating..." : "Update"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
