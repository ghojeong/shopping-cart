export interface CouponModel {
  id: string;
  type: string;
  title: string;
  discountRate?: number;
  discountAmount?: number;
}
