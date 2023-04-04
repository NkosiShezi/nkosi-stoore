import React, { useEffect } from "react";

import { Alert, CircularProgress, Grid, Typography } from "@mui/material";

import style from "./products.module.css";
import ProductCard from "./ProductCard";
import { useAppDispatch, useAppSelector } from "@/hooks/useProductsSelector";
import { fetchProductsData } from "@/features/productsSlice";

const ProductsList = () => {
  const dispatch = useAppDispatch();

  const { products, error, loading } = useAppSelector((state) => state);

  useEffect(() => {
    if (products.length < 1) {
      dispatch(fetchProductsData());
    }
  }, [dispatch]);

  return (
    <>
      {products.length > 0 && (
        <>
          <Typography
            variant='h5'
            align={"center"}
          >
            Best Selling Products
          </Typography>
          <Grid
            container
            spacing={2}
            className={style.main}
          >
            {products.map((product) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={product.id}
                >
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                    price={product.price}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}

      {loading && (
        <Grid xl={12}>
          <Grid
            item
            textAlign={"center"}
          >
            <CircularProgress
              size={200}
              color='secondary'
            />
          </Grid>
        </Grid>
      )}

      {error && (
        <>
          <Alert severity='error'>
            Something went wrong, please try again later!
          </Alert>
        </>
      )}
    </>
  );
};

export default ProductsList;
