import { ProductItemModel, CouponModel } from "models";
import { RootState } from "reducers";
import { getTotalPrice } from "lib/calc";

interface CartItem {
  checked: boolean;
  quantity: number;
  product: ProductItemModel;
}
type CartItems = Record<ProductItemModel["id"], CartItem>;
interface CartCoupon {
  checked: boolean;
  coupon: CouponModel;
}
type CartCoupons = Record<CouponModel["id"], CartCoupon>;
interface Cart {
  cartItemsNum: number;
  cartItems: CartItems;
  cartCoupons: CartCoupons;
  totalPrice: number;
}
export const cartSelector = () => ({
  coupons: { coupons },
  productItems: { items },
  cart: { cartItemsNum, cartItemsState, cartCouponsState }
}: RootState): Cart => {
  const cartItems: CartItems = {};
  const checkedProducts: {
    quantity: number;
    product: ProductItemModel;
  }[] = [];
  for (let id in cartItemsState) {
    const product = items[id];
    const { checked, quantity } = cartItemsState[id];
    cartItems[id] = { checked, quantity, product };
    if (checked && quantity > 0) {
      checkedProducts.push({ quantity, product });
    }
  }

  const cartCoupons: CartCoupons = {};
  const checkedCoupons: CouponModel[] = [];
  for (let id in coupons) {
    const coupon = coupons[id];
    const checked = cartCouponsState[id] && cartCouponsState[id].checked;
    cartCoupons[id] = { checked, coupon };
    if (checked) {
      checkedCoupons.push(coupon);
    }
  }

  return {
    cartItemsNum,
    cartItems,
    cartCoupons,
    totalPrice: getTotalPrice(checkedProducts, checkedCoupons)
  };
};
