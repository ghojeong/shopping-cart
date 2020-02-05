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

  let couponAvailableTotalPrice = 0;
  let couponUnavailableTotalPrice = 0;
  for (const {
    quantity,
    product: { price, availableCoupon }
  } of products) {
    if (availableCoupon === false) {
      couponUnavailableTotalPrice += quantity * price;
    } else {
      couponAvailableTotalPrice += quantity * price;
    }
  }

  if (couponAvailableTotalPrice <= 0) {
    return couponUnavailableTotalPrice;
  }

  const discountRates: number[] = [];
  for (const { discountRate, discountAmount } of coupons) {
    if (discountAmount && discountAmount > 0) {
      couponAvailableTotalPrice -= discountAmount;
      if (couponAvailableTotalPrice <= 0) {
        return couponUnavailableTotalPrice;
      }
    }
    if (discountRate && discountRate > 0 && discountRate < 100) {
      discountRates.push(discountRate);
    }
  }

  const sortedDiscountRates = discountRates.sort((num1, num2) => num1 - num2);
  for (const discountRate of sortedDiscountRates) {
    couponAvailableTotalPrice -=
      couponAvailableTotalPrice * discountRate * 0.01;
  }

  return couponUnavailableTotalPrice + couponAvailableTotalPrice;
};
