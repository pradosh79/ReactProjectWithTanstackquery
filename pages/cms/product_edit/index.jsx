import axiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoints";
import { productCreateMutation } from '../../../customHooks/queries/product.query';
import { Paper, Typography, TextField, Button, Box, Grid} from '@mui/material';
import { useForm } from 'react-hook-form';


export default function ProductCreate(){
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { mutate, isPending } = productCreateMutation();

const onSubmit = async (createData) => {
    const {name,category,price,description, profile_pic} = createData;
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("category", category);
    formdata.append("price", price);
    formdata.append("description", description);
    formdata.append("image", profile_pic[0]);

    mutate(formdata, {
      onSuccess: () => {
        // router.push("/cms/blogs");
      },
    });
    console.log(formdata);

    // router.push("/cms/list");
  };
    return (
        <div>
      <Grid container spacing={2} style={{ height: "50vh" }}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ margin: "0 auto" }}
          style={{ marginTop: "100px" }}
        >
          <Paper elevation={3} sx={{ padding: 2 }} style={{ height: "250px", width: "450px" }}>
            <Typography variant="h5" gutterBottom>
              Create Product
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("name", {
                  required: "name is required",
                })}
                id="name"
                label="name"
                variant="standard"
                margin="normal"
                fullWidth
                error={!!errors.name}
              />
              <TextField
                {...register("category", {
                  required: "category is required",
                })}
                id="category"
                label="category"
                variant="standard"
                margin="normal"
                fullWidth
                error={!!errors.category}
              />
              <TextField
                {...register("price", {
                  required: "price is required",
                })}
                id="price"
                label="price"
                variant="standard"
                margin="normal"
                fullWidth
                error={!!errors.price}
              />
              <TextField
                {...register("description", {
                  required: "Description is required",
                })}
                id="description"
                label="Description"
                variant="standard"
                margin="normal"
                fullWidth
                error={!!errors.description}
              />
              <TextField
                {...register("profile_pic", {
                  required: "Profile picture is required",
                })}
                type="file"
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ backgroundColor: "white", borderRadius: "5px", mb: 4 }}
                error={!!errors.profile_pic}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
              >
               "Create"
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
    );
}
