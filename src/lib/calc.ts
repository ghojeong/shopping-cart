import { ProductItemModel, CouponModel } from "models";

interface ProductWithQuantity {
  quantity: number;
  product: ProductItemModel;
}
export const getTotalPrice = (
  products: ProductWithQuantity[],
  coupons?: CouponModel[]
): number => {
  if (products.length < 1) {
    return 0;
  }

  if (!coupons || coupons.length < 1) {
    return products.reduce(
      (accTotalPrice, { quantity, product: { price } }) =>
        accTotalPrice + quantity * price,
      0
    );
  }

  const couponAvailableProducts: ProductWithQuantity[] = [];
  const couponUnavailableProducts: ProductWithQuantity[] = [];

  for (const productWithQuantity of products) {
    if (productWithQuantity.product.availableCoupon === false) {
      couponUnavailableProducts.push(productWithQuantity);
    } else {
      couponAvailableProducts.push(productWithQuantity);
    }
  }

  const couponUnavailableTotalPrice = couponUnavailableProducts.reduce(
    (accTotalPrice, { quantity, product: { price } }) =>
      accTotalPrice + quantity * price,
    0
  );

  if (couponAvailableProducts.length < 1) {
    return couponUnavailableTotalPrice;
  }

  const couponAvailableTotalPrice = couponAvailableProducts.reduce(
    (accTotalPrice, { quantity, product: { price } }) =>
      accTotalPrice + quantity * price,
    0
  );

  const totalDiscount = coupons.reduce(
    (accDiscount, { discountRate, discountAmount }) => {
      if (discountAmount) {
        accDiscount += discountAmount;
      }
      if (discountRate && discountRate > 0 && discountRate < 100) {
        accDiscount += couponAvailableTotalPrice * discountRate * 0.01;
      }
      return accDiscount;
    },
    0
  );

  const totalPrice =
    couponUnavailableTotalPrice + couponAvailableTotalPrice - totalDiscount;

  return totalPrice > 0 ? totalPrice : 0;
};
