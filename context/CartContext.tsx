// "use client";

// import React, { createContext, useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   image?: string;
//   quantity: number;
// };

// type CartItem = Product & {
//   quantity: number;
// };

// type CartContextType = {
//   cart: CartItem[];

//   addToCart: (product: Product) => void;

//   // ✅ NEW
//   increaseQuantity: (id: string) => void;
//   decreaseQuantity: (id: string) => void;
//   removeFromCart: (id: string) => void;

//   cartCount: number;

//   isCartOpen: boolean;

//   openCart: () => void;
//   closeCart: () => void;
// };

// const CartContext = createContext<CartContextType | null>(null);

// export const CartProvider = ({ children }: { children: React.ReactNode }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const [isCartOpen, setIsCartOpen] = useState(false);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const openCart = () => setIsCartOpen(true);

//   const closeCart = () => setIsCartOpen(false);

//   // ✅ ADD TO CART
//   const addToCart = (product: Product) => {
//     const existing = cart.find((item) => item.id === product.id);

//     if (existing) {
//       toast.success("Product already added");
//       return;
//     }

//     setCart((prev) => [...prev, { ...product, quantity: 1 }]);

//     toast.success("Product added to cart");
//   };

//   // ✅ INCREASE QUANTITY
//   const increaseQuantity = (id: string) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity: item.quantity + 1,
//             }
//           : item
//       )
//     );
//   };

//   // ✅ DECREASE QUANTITY
//   const decreaseQuantity = (id: string) => {
//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               quantity: item.quantity > 1 ? item.quantity - 1 : 1,
//             }
//           : item
//       )
//     );
//   };

//   // ✅ REMOVE ITEM
//   const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//     toast.success("Remove from cart");
//   };

//   // ✅ TOTAL ITEMS COUNT
//   const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,

//         // ✅ NEW
//         increaseQuantity,
//         decreaseQuantity,
//         removeFromCart,

//         cartCount,

//         isCartOpen,

//         openCart,
//         closeCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);

//   if (!context) {
//     throw new Error("useCart must be provided inside CartProvider");
//   }

//   return context;
// };

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (product: Product) => void;

  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;

  // NEW
  clearCart: () => void;

  buyNowItem: CartItem | null;
  setBuyNowItem: (product: CartItem | null) => void;

  cartCount: number;

  isCartOpen: boolean;

  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [buyNowItem, setBuyNowItemState] = useState<CartItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const openCart = () => setIsCartOpen(true);

  const closeCart = () => setIsCartOpen(false);

  // ADD TO CART
  const addToCart = (product: Product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      toast.success("Product already added");
      return;
    }

    setCart((prev) => [...prev, { ...product, quantity: 1 }]);

    toast.success("Product added to cart");
  };
  useEffect(() => {
    const savedBuyNow = localStorage.getItem("buyNowItem");

    if (savedBuyNow) {
      setBuyNowItemState(JSON.parse(savedBuyNow));
    }
  }, []);

  // INCREASE
  const increaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  // REMOVE
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));

    toast.success("Removed from cart");
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const setBuyNowItem = (product: CartItem | null) => {
    setBuyNowItemState(product);

    if (product) {
      localStorage.setItem("buyNowItem", JSON.stringify(product));
    } else {
      localStorage.removeItem("buyNowItem");
    }
  };

  // TOTAL COUNT
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,

        clearCart,
        buyNowItem,
        setBuyNowItem,

        cartCount,

        isCartOpen,

        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be provided inside CartProvider");
  }

  return context;
};
