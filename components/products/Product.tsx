import * as React from "react";

import Button from "@mui/material/Button";
import { Add, Remove } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { ButtonGroup, Grid, Paper, Rating } from "@mui/material";
import { Box } from "@mui/system";

import Image from "next/image";
import { useRouter } from "next/router";

import { Products } from "@/modules/products";
import { useStateContext } from "@/context/StateContext";
import { numberFormat } from "@/utils/amount-conversion";

interface Props {
  product: Products;
}
const Product = ({ product }: Props) => {
  const { incQty, decQty, qty, onAddHandler } = useStateContext();
  const router = useRouter();

  const backToProducts = () => {
    router.push("/products");
  };

  return (
    <Paper>
      <Box
        mr={2}
        sx={{ height: "700px" }}
        mt={5}
      >
        <Box ml={5}>
          <Grid
            container
            spacing={10}
          >
            <Grid
              item
              xs={12}
              md={4}
            >
              <Image
                src={product ? product?.image : ""}
                alt={"view"}
                width={400}
                height={600}
                style={{ objectFit: "contain" }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={8}
            >
              <Typography variant='h6'>{product.title}</Typography>
              <Typography
                variant='body1'
                mt={5}
              >
                {product.description}
              </Typography>

              <Rating
                name='read-only'
                value={product?.rating?.rate}
                precision={0.5}
              />
              <Typography>({product?.rating?.count})</Typography>
              <Typography
                variant='body2'
                color='text.secondary'
              >
                {numberFormat(product?.price ?? 0)}
              </Typography>

              <Grid
                container
                mt={5}
              >
                <Grid
                  item
                  xs={4}
                >
                  <ButtonGroup>
                    <Button
                      aria-label='reduce'
                      onClick={decQty}
                    >
                      <Remove fontSize='small' />
                    </Button>
                    <Button>{qty}</Button>
                    <Button
                      aria-label='increase'
                      onClick={incQty}
                    >
                      <Add fontSize='small' />
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid xs={8}>
                  <Button
                    disabled={qty == 0}
                    variant='outlined'
                    color='secondary'
                    onClick={() =>
                      onAddHandler &&
                      onAddHandler(product ?? ({} as Products), qty)
                    }
                  >
                    Add to cart
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={12}
                  mt={5}
                >
                  <Button
                    disabled={qty == 0}
                    variant='contained'
                    color='secondary'
                    onClick={backToProducts}
                  >
                    Continue Shopping
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

export default Product;
