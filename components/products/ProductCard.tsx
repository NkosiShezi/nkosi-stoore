import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Link from "next/link";
import { useRouter } from "next/router";

import { Products } from "../../modules/products";
import style from "./product-card.module.css";
import { numberFormat } from "@/utils/amount-conversion";

const ProductCard = (props: Products) => {
  const { id, image, title, price } = props;

  const router = useRouter();

  const viewProduct = (id: number): void => {
    router.push(`/products/${id}`);
  };

  return (
    <Card
      raised
      className={style.card}
      sx={{ minHeight: "30vw" }}
    >
      <CardMedia
        component='img'
        height='250'
        image={image}
        alt={title}
        title={title}
        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
        onClick={() => id && viewProduct(id)}
      />
      <Link href={`/products/${id}`}>
        <CardContent>
          <Typography
            gutterBottom
            component='div'
          >
            {title}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
          >
            {numberFormat(price)}
          </Typography>
        </CardContent>
      </Link>

      <CardActions className={style.cardActions}>
        <Button
          variant='contained'
          size='small'
          color='secondary'
          onClick={() => id && viewProduct(id)}
        >
          View Product
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
