import {z} from "zod";

export const CouponPaymentSchema = z.object({
  coupon: z.string(),
});

export const CheckoutSchema = z
  .object({
    paymentMethod: z.enum(["card", "coupon"], {
      required_error: "Please select a payment method",
    }),
    couponCode: z.string().optional(),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvc: z.string().optional(),
    cardHolder: z.string().optional(),
    saveCard: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "card") {
      if (!data.cardNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card number is required",
          path: ["cardNumber"],
        });
      }
      if (!data.expiryDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Expiry date is required",
          path: ["expiryDate"],
        });
      }
      if (!data.cvc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CVC is required",
          path: ["cvc"],
        });
      }
      if (!data.cardHolder) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cardholder name is required",
          path: ["cardHolder"],
        });
      }
    }
  });
