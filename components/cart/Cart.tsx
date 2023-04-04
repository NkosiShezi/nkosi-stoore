import React from "react";
import {
  Add,
  DeleteForeverOutlined,
  Remove,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { numberFormat } from "@/utils/amount-conversion";
import { useStateContext } from "@/context/StateContext";
import style from "./cart.module.css";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    totalQuantities,
    toggleCartQty,
    removeProduct,
  } = useStateContext();

  return (
    <>
      <Typography mb={5}>{`< cart items  (${totalQuantities})`}</Typography>

      {cartItems.length < 1 && (
        <>
          <Box
            alignSelf={"center"}
            mb={10}
          >
            <Typography ml={2}>
              <ShoppingBagOutlined sx={{ fontSize: 150 }} />
            </Typography>
            <Typography m={2}>your shopping cart is empty</Typography>
          </Box>
        </>
      )}
      {cartItems.length > 0 &&
        cartItems.map((item) => (
          <Card
            key={item.product.id}
            sx={{ maxWidth: 345, minHeight: "30vw" }}
            className={style.card}
          >
            <CardMedia
              component='img'
              height='250'
              image={item.product.image}
              alt={item.product.title}
              title={item.product.title}
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            />

            <CardContent>
              <Typography
                gutterBottom
                variant='h5'
                component='div'
              >
                {item.product.title}
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
              >
                {numberFormat(item.product.price)}
              </Typography>
              <ButtonGroup>
                <Button
                  aria-label='reduce'
                  onClick={() =>
                    toggleCartQty &&
                    item.product.id &&
                    toggleCartQty(item.product.id, "decr")
                  }
                >
                  <Remove fontSize='small' />
                </Button>
                <Button>{item.quantity}</Button>
                <Button
                  aria-label='increase'
                  onClick={() =>
                    toggleCartQty &&
                    item.product.id &&
                    toggleCartQty(item.product.id, "incr")
                  }
                >
                  <Add fontSize='small' />
                </Button>
              </ButtonGroup>
            </CardContent>

            <CardActions>
              <Button onClick={() => removeProduct && removeProduct(item)}>
                <DeleteForeverOutlined />
              </Button>
            </CardActions>
          </Card>
        ))}

      {cartItems.length >= 1 && (
        <Box
          mt={5}
          mb={5}
        >
          <Typography
            variant='subtitle1'
            color={"secondary"}
            mb={5}
          >
            {`Total : ${numberFormat(totalPrice)}`}
          </Typography>
          <Button
            color='secondary'
            variant='outlined'
          >
            Pay order
          </Button>
        </Box>
      )}
    </>
  );
};

export default Cart;
