import { ProductItemModel, CouponModel } from "models";

export const getTotalPrice = (
  products: {
    quantity: number;
    product: ProductItemModel;
  }[],
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

  let hasCouponAvailableItem = false;

  const totalPrice = products.reduce((accTotalPrice, { quantity, product }) => {
    const { price, availableCoupon } = product;

    if (quantity > 0 && !(availableCoupon === false)) {
      hasCouponAvailableItem = true;
    }

    const discountedPrice = coupons.reduce(
      (accDiscountedPrice, { discountRate }) =>
        discountRate &&
        discountRate > 0 &&
        discountRate < 100 &&
        !(availableCoupon === false)
          ? accDiscountedPrice - price * discountRate * 0.01
          : accDiscountedPrice,
      price
    );
    return accTotalPrice + quantity * discountedPrice;
  }, 0);

  const totalDiscountAmount = coupons.reduce(
    (accDiscountAmount, { discountAmount }) =>
      accDiscountAmount + (discountAmount || 0),
    0
  );

  return hasCouponAvailableItem ? totalPrice - totalDiscountAmount : totalPrice;
};
