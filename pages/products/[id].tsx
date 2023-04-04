import * as React from "react";

import { Alert, CircularProgress, Grid } from "@mui/material";

import { useRouter } from "next/router";

import { Products } from "@/modules/products";
import { useAppDispatch, useAppSelector } from "@/hooks/useProductsSelector";
import { fetchProductsData } from "@/features/productsSlice";
import Product from "@/components/products/Product";

const ProductItem = () => {
  const [product, setProduct] = React.useState<Products>();

  const dispatch = useAppDispatch();

  const { products, error, loading } = useAppSelector((state) => state);

  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    if (products.length < 1) {
      dispatch(fetchProductsData());
    }
  }, [dispatch]);

  React.useEffect(() => {
    const selected = products.find((product) => {
      return product.id == id;
    });
    setProduct(selected);
  }, [products, id]);

  return (
    <>
      {product && <Product product={product} />}

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

export default ProductItem;
