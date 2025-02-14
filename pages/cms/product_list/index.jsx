import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import axiosInstance, { product_pic } from '../../../api/axios/axios';
import { endPoints } from '../../../api/endpoints/endpoints';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Updateproduct from '../product_update/index';
import SweetAlertComponent from '../../../UI/SwiteAlert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Pagination, Stack } from '@mui/material';
import { productListQuery } from '../../../customHooks/queries/product.query';


export default function ProuctList() {
  const [products, setProducts] = useState([]);
  const [deletedproduct, setdeletedproduct] = useState(0);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalpage, settotalpage] = useState(0);
  const [currentPage, setpage] = useState(1);

  //const { data: response, refetch: refetchStudents, isPending } = productListQuery();
  
  const { data, isLoading, isError, refetch } = productListQuery(); 
  const response = data? data : []; 
  
  
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products.</p>;

  const handleChange=(event, value)=>{
    setpage(value);
    fetchProducts(value);
  }
  

  const handleDelete = async (productId) => {
    try {
      const formData = new FormData();
      formData.append("id", id);
      const response2 = await axiosInstance.delete(endPoints.cms.productRemove+'/'+id);
      console.log(response2);
      //setProducts(response2.data.data);
      setdeletedproduct(deletedproduct + 1);
      toast(response2.data?.message)
    } catch (err) {
      console.error("Error deleting product:", err);
    }
    setModal(false);
  };
 console.log(response,'res');
  return (
    <>
      <IconButton component={Link} to={`../cms/product_create`}><AddCircleOutlineIcon /></IconButton>
    <List sx={{ width: "100%", maxWidth: 960, bgcolor: "background.paper" }}>
  {Array.isArray(response.data) && response.data.length > 0 ? (
    response.data.map((item, idx) => (
      <React.Fragment key={item._id}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={item.name} src={product_pic(item.image)} />
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                   {` — category: ${item.category}`}
                   {` — price: ${item.price}`}
                </Typography>
                {` — Description: ${item.description}`}
              </React.Fragment>
            }
          />
          <IconButton component={Link} to={`../cms/update_product/${item._id}`}>
            <EditIcon />
          </IconButton>

          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => { setId(item._id); setModal(true) }}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
        {idx < response.data.length - 1 && <Divider variant="inset" component="li" />}
      </React.Fragment>
    ))
  ) : (
    <Typography variant="body2">No products available</Typography>
  )}
</List>

{Array.isArray(response.data) && response.data.length > 0 ? (
  <Stack spacing={2}>
    <Pagination
      count={totalpage}
      variant="outlined"
      onChange={handleChange}
      shape="rounded"
      showFirstButton
      showLastButton
    />
  </Stack>
) : null}


      {modal && (
        <SweetAlertComponent
          confirm={handleDelete}
          cancle={() => setModal(false)}
          title={"Are you sure?"}
          subtitle={"You will not be able to recover!"}
        />
      )}
    </>
  )
}
