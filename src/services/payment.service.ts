import {CheckoutCouponInterface} from "@/interfaces/payment.interface";
import apiClient from "@/lib/api-client";

class PaymentService {
  public async checkoutCouponService(payload: CheckoutCouponInterface) {
    const {data} = await apiClient.post("/coupons/coupon-checkout", {
      courseId: payload.courseId,
      couponCode: payload.couponCode,
    });

    return data;
  }

  // test
  public async checkoutCourseService(payload: CheckoutCouponInterface) {
    const {data} = await apiClient.post("/payments/course-checkout", {
      courseId: payload.courseId,
      couponCode: payload.couponCode,
    });
    return data;
  }
}

export default new PaymentService();
