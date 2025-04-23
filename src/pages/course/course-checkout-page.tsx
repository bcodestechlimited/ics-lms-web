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
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const params = useParams();
  const {data, isLoading} = useGetACourseById(params.id);
  const course = !isLoading && data.responseObject.data;
  const checkoutCoupon = useCouponCheckout();
  const [couponDiscount, setCouponDiscount] = useState(0);
  const courseCheckout = useCourseCheckout();
  const [modal, setModal] = useState(false);

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

    const payload = {
      courseId: params.id as string,
      couponCode: form.getValues("couponCode") as string,
    };

    toast.promise(checkoutCoupon.mutateAsync(payload), {
      loading: "Applying coupon...",
      success: (res) => {
        if (!res.success) {
          return "Invalid coupon!";
        }

        if (isValid) {
          setIsCouponApplied(true);
          setTotalPrice(res.responseObject.data.discountedPrice);
          setCouponDiscount(res.responseObject.data.couponDiscount);
        }

        return "Coupon applied successfully";
      },
      error: "Invalid coupon",
    });
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      courseId: params.id as string,
      couponCode: data.couponCode as string,
    };
    if (payload.couponCode === "" || payload.courseId === "") {
      toast.error("Invalid coupon code or course");
      return;
    }
    if (data.paymentMethod === "card") {
      console.log("Processing card payment:", data);
    } else {
      toast.promise(courseCheckout.mutateAsync(payload), {
        loading: "Processing coupon payment...",
        success: (res) => {
          if (!res.success) {
            return "Invalid coupon!";
          }
          setModal(true);
          return "User enrolled successfully";
        },
        error: "Invalid coupon",
      });
      console.log("Processing coupon payment:", data);
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 mt-40 py-16">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col md:flex-row gap-8"
            >
              <div className="flex-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Your Purchase</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoading ? (
                      <div className="flex w-full items-center">
                        <CourseCheckoutSkeleton />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <img
                          src={course.image}
                          alt="Course Thumbnail"
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                          <h2 className="text-xl font-bold">{course.title}</h2>
                          <p className="text-gray-600">
                            Instructor: ICS ACADEMY
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-2xl font-bold">
                              NGN {course.course_price.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Separator />

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
                            defaultValue={field.value}
                            className="grid gap-4"
                          >
                            <FormItem className="flex items-center space-x-4 p-4 border rounded-lg hover:border-primary">
                              <FormControl>
                                <RadioGroupItem value="card" />
                              </FormControl>
                              <FormLabel className="flex items-center gap-2">
                                <CreditCardIcon className="w-5 h-5" />
                                Credit/Debit Card
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-4 p-4 border rounded-lg hover:border-primary">
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

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({field}) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Card Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="4242 4242 4242 4242"
                                    {...field}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="expiryDate"
                            render={({field}) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Expiry Date</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="MM/YY"
                                    {...field}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cvc"
                            render={({field}) => (
                              <FormItem className="space-y-2">
                                <FormLabel>CVC</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123"
                                    {...field}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cardHolder"
                            render={({field}) => (
                              <FormItem className="space-y-2">
                                <FormLabel>Cardholder Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="John Doe"
                                    {...field}
                                    disabled
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="saveCard"
                          render={({field}) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="w-4 h-4"
                                  disabled
                                />
                              </FormControl>
                              <FormLabel>
                                Save card for future purchases
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    )}

                    {paymentMethod === "coupon" && (
                      <div className="space-y-4">
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
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="md:w-96 space-y-6">
                <Card className="sticky top-8">
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold">Order Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Original Price:</span>
                        NGN {course?.course_price?.price}
                      </div>

                      {isCouponApplied && (
                        <div className="flex justify-between">
                          <span>Coupon Discount:</span>
                          <span className="text-green-600">
                            -{couponDiscount}
                          </span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>
                          NGN{" "}
                          {isCouponApplied
                            ? totalPrice
                            : course?.course_price?.price}
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
              By completing your purchase you agree to these{" "}
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
          handleClose={handleClose}
        />
      )}
    </>
  );
}
