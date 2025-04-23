import {CheckoutCouponInterface} from "@/interfaces/payment.interface";
import paymentService from "@/services/payment.service";
import {useMutation} from "@tanstack/react-query";

export const useCourseCheckout = () => {
  return useMutation({
    mutationFn: (payload: CheckoutCouponInterface) =>
      paymentService.checkoutCourseService(payload),
  });
};
