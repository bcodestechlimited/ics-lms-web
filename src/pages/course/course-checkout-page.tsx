// src/pages/CourseCheckoutPage.tsx
import {CourseCheckoutSkeleton} from "@/components/course-card-skeleton";
import CourseCheckoutSuccessfulDialog from "@/components/course-checkout-successful-dialog";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Separator} from "@/components/ui/separator";
import {useCouponCheckout, useGetACourseById} from "@/hooks/use-course";
import {useCourseCheckout} from "@/hooks/use-payment";
import {CheckoutSchema} from "@/schema/payment.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreditCardIcon, LockIcon, ShieldIcon, TicketIcon} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router";
import {toast} from "sonner";
import {z} from "zod";

type FormValues = z.infer<typeof CheckoutSchema>;

export default function CourseCheckoutPage() {
  const params = useParams<{id: string}>();
  const {data, isLoading} = useGetACourseById(params.id);
  const course = data?.responseObject?.data;

  // ── derive original price safely ──
  const rawPriceObj = course?.course_price;
  const originalPrice = Number(rawPriceObj?.price?.coursePricing ?? 0);

  // ── coupon state ──
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(originalPrice);

  const checkoutCoupon = useCouponCheckout();
  const courseCheckout = useCourseCheckout();
  const [modal, setModal] = useState(false);

  // ── react-hook-form ──
  const form = useForm<FormValues>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      paymentMethod: "card",
      couponCode: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      cardHolder: "",
      saveCard: false,
    },
  });
  const paymentMethod = form.watch("paymentMethod");

  const handleApplyCoupon = async () => {
    const isValid = await form.trigger("couponCode");
    const couponCode = form.getValues("couponCode");

    if (!isValid || !couponCode) return;

    toast.promise(
      checkoutCoupon.mutateAsync({
        courseId: params.id!,
        couponCode,
      }),
      {
        loading: "Applying coupon…",
        success: (res) => {
          if (!res.success) throw new Error(res.message);
          const {discountedPrice, couponDiscount} = res.responseObject.data;
          setIsCouponApplied(true);
          setTotalPrice(Number(discountedPrice));
          setCouponDiscount(Number(couponDiscount));
          return "Coupon applied!";
        },
        error: (err) => err.message || "Failed to apply coupon",
      }
    );
  };

  const onSubmit = (vals: FormValues) => {
    if (!params.id) {
      toast.error("Course ID missing");
      return;
    }

    // If user is paying by card we'll console.log for now
    if (vals.paymentMethod === "card") {
      // console.log("Card payload:", vals);
      return;
    }

    // coupon payment
    toast.promise(
      courseCheckout.mutateAsync({
        courseId: params.id,
        couponCode: vals.couponCode!,
      }),
      {
        loading: "Processing coupon payment…",
        success: (res) => {
          if (!res.success) throw new Error(res.message);
          setModal(true);
          return "Enrolled successfully!";
        },
        error: (err) => err.message || "Payment failed",
      }
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row gap-8"
            >
              {/* ── Left: Checkout Card ── */}
              <div className="flex-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Your Purchase</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoading || !course ? (
                      <CourseCheckoutSkeleton />
                    ) : (
                      <div className="flex items-center gap-4">
                        <img
                          src={course?.image}
                          alt="Thumbnail"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h2 className="text-xl font-bold">{course?.title}</h2>
                          <p className="text-gray-600">
                            Instructor: ICS ACADEMY
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold">
                              NGN {originalPrice?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* ── Payment Method ── */}
                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({field}) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-lg font-semibold">
                            Payment Method
                          </FormLabel>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="grid gap-4"
                          >
                            <FormItem className="flex items-center p-4 border rounded-lg hover:border-primary space-x-4">
                              <FormControl>
                                <RadioGroupItem value="card" />
                              </FormControl>
                              <FormLabel className="flex items-center gap-2">
                                <CreditCardIcon className="w-5 h-5" />
                                Credit/Debit Card
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center p-4 border rounded-lg hover:border-primary space-x-4">
                              <FormControl>
                                <RadioGroupItem value="coupon" />
                              </FormControl>
                              <FormLabel className="flex items-center gap-2">
                                <TicketIcon className="w-5 h-5" />
                                Use Coupon
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* ── Card Fields (disabled placeholder) ── */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4">{/* ... */}</div>
                    )}

                    {/* ── Coupon Field ── */}
                    {paymentMethod === "coupon" && (
                      <FormField
                        control={form.control}
                        name="couponCode"
                        render={({field}) => (
                          <FormItem>
                            <FormLabel>Coupon Code</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input
                                  placeholder="Enter coupon code"
                                  {...field}
                                  disabled={isCouponApplied}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={handleApplyCoupon}
                                disabled={!field.value || isCouponApplied}
                              >
                                {isCouponApplied ? "Applied" : "Apply"}
                              </Button>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* ── Right: Order Summary ── */}
              <div className="md:w-96 space-y-6">
                <Card className="sticky top-8">
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold">Order Summary</h3>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Original Price:</span>
                        <span>NGN {originalPrice?.toLocaleString()}</span>
                      </div>

                      {isCouponApplied && (
                        <div className="flex justify-between">
                          <span>Coupon Discount:</span>
                          <span className="text-green-600">
                            -NGN {couponDiscount?.toLocaleString()}
                          </span>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>
                          NGN{" "}
                          {(isCouponApplied
                            ? totalPrice
                            : originalPrice
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      Complete Checkout
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      30-Day Money-Back Guarantee
                    </p>

                    <div className="flex justify-center gap-4">
                      <LockIcon className="w-5 h-5 text-gray-500" />
                      <ShieldIcon className="w-5 h-5 text-gray-500" />
                      <CreditCardIcon className="w-5 h-5 text-gray-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </Form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              By completing your purchase you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>
            </p>
            <p className="mt-2">Secure payment processed by Paystack</p>
          </div>
        </div>
      </div>

      {modal && (
        <CourseCheckoutSuccessfulDialog
          modal={modal}
          handleClose={() => setModal(false)}
        />
      )}
    </>
  );
}
