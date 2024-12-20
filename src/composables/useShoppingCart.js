import { useQuasar } from "quasar";
import { useMarketStore } from "../stores/marketStore.js";

export function useShoppingCart() {
  const marketStore = useMarketStore();
  const $q = useQuasar();

  const addProductToCart = (item) => {
    let stallCart = marketStore.shoppingCarts.find(
      (s) => s.id === item.stall_id
    );
    if (!stallCart) {
      stallCart = {
        id: item.stall_id,
        products: [],
      };
      marketStore.shoppingCarts.push(stallCart);
    }
    stallCart.merchant = item.pubkey;

    let product = stallCart.products.find((p) => p.id === item.id);
    if (!product) {
      product = { ...item, orderedQuantity: 0 };
      stallCart.products.push(product);
    }
    product.orderedQuantity = Math.min(
      product.quantity,
      item.orderedQuantity || product.orderedQuantity + 1
    );

    $q.localStorage.set("nostrmarket.shoppingCarts", marketStore.shoppingCarts);

    $q.notify({
      type: "positive",
      message: "Product added to cart!",
    });
  };

  const removeProductFromCart = (item) => {
    const stallCart = marketStore.shoppingCarts.find(
      (c) => c.id === item.stallId
    );
    if (stallCart) {
      stallCart.products = stallCart.products.filter(
        (p) => p.id !== item.productId
      );
      if (!stallCart.products.length) {
        marketStore.shoppingCarts = marketStore.shoppingCarts.filter(
          (s) => s.id !== item.stallId
        );
      }
      $q.localStorage.set(
        "nostrmarket.shoppingCarts",
        marketStore.shoppingCarts
      );
    }
  };

  const removeCart = (cartId) => {
    marketStore.shoppingCarts = marketStore.shoppingCarts.filter(
      (s) => s.id !== cartId
    );
    $q.localStorage.set("nostrmarket.shoppingCarts", marketStore.shoppingCarts);
  };

  const checkoutStallCart = (cart) => {
    marketStore.checkoutCart = cart;
    marketStore.checkoutStall = marketStore.stalls.find((s) => s.id === cart.id);
    marketStore.setActivePage("shopping-cart-checkout");
  };

  return {
    addProductToCart,
    removeProductFromCart,
    removeCart,
    checkoutStallCart,
  };
}
