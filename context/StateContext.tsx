import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Products } from "@/modules/products";

interface CartItems {
  product: Products;
  quantity: number;
}
interface State {
  showCart: boolean;
  cartItems: CartItems[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAddHandler?: (product: Products, quantity: number) => void;
  toggleCartQty?: (id: number, value: string) => void;
  removeProduct?: (product: CartItems) => void;
}

const defaultState = {
  showCart: false,
  cartItems: {},
  totalPrice: 0,
  totalQuantities: 0,
  qty: 0,
  incQty: () => {},
  decQty: () => {},
} as State;

const Context = createContext(defaultState);

interface Props {
  children?: React.ReactNode;
}

export const StateContent = ({ children }: Props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: CartItems | undefined;
  let index;

  const onAddHandler = (product: Products, quantity: number) => {
    const isProductInCart = cartItems.find(
      (item) => item.product.id === product.id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotal) => prevTotal + quantity);
    if (isProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct): CartItems => {
        if (cartProduct.product.id === product.id) {
          return {
            product: cartProduct.product as Products,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { product, quantity: quantity }]);
    }

    toast.success(`${qty} ${product.title} added to the cart`);
  };

  const removeProduct = (product: CartItems) => {
    foundProduct = cartItems.find(
      (item) => item.product.id === product.product.id
    );
    const newCartItems = cartItems.filter(
      (item) => item.product.id !== product.product.id
    );

    setCartItems(newCartItems);
    setTotalPrice(
      (prevPrice) => prevPrice - product.product.price * product.quantity
    );
    setTotalQuantities((preQty) => preQty - product.quantity);
  };
  const toggleCartQty = (id: number, value: string) => {
    foundProduct = cartItems.find((item) => item.product.id === id);
    index = cartItems.findIndex((product) => product.product.id === id);
    let newCart = [...cartItems];
    if (value === "incr") {
      newCart[index].quantity = foundProduct ? foundProduct.quantity + 1 : 0;

      setCartItems([...newCart]);
      if (foundProduct) {
        const currentProductPrice = foundProduct
          ? foundProduct?.product.price
          : 0;
        setTotalPrice((prevPrice) => prevPrice + currentProductPrice);
        setTotalQuantities((preQty) => preQty + 1);
      }
    } else if (value === "decr") {
      if (foundProduct && foundProduct?.quantity > 1) {
        newCart[index].quantity = foundProduct ? foundProduct.quantity - 1 : 0;
        setCartItems([...newCart]);
        const currentProductPrice = foundProduct
          ? foundProduct?.product.price
          : 0;
        setTotalPrice((prevPrice) => prevPrice - currentProductPrice);
        setTotalQuantities((preQty) => preQty - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prev) => prev + 1);
  };

  const decQty = () => {
    setQty((prev) => {
      if (prev < 2) return 1;
      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAddHandler,
        toggleCartQty,
        removeProduct,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
