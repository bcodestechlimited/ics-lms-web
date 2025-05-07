import {useRequestForExtension} from "@/hooks/use-user";
import {useValidateUser} from "@/hooks/useAuth";
import {extensionSchema} from "@/schema/user.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Loader2} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";
import {Button} from "./ui/button";
import {Card} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {Input} from "./ui/input";
import {Label} from "./ui/label";
import {Textarea} from "./ui/textarea";

type ExtensionFormData = z.infer<typeof extensionSchema>;

export const ExpiredCourseCard = ({
  id,
  image,
  title,
  expiresAt,
}: {
  title: string;
  image: string;
  id: string;
  expiresAt: Date;
}) => {
  const {data: user, isLoading} = useValidateUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ExtensionFormData>({
    resolver: zodResolver(extensionSchema),
  });
  const extensionRequest = useRequestForExtension();

  const onSubmit = (data: ExtensionFormData) => {
    const payload = {
      courseId: id,
      expiryDate: expiresAt,
      reason: data.reason,
      userId: user?._id as string,
      extensionDays: Number(data.days),
    };

    toast.promise(extensionRequest.mutateAsync(payload), {
      loading: "Requesting for course extension...",
      success: (res) => {
        if (!res.success) {
          return "Error requesting for course extension";
        }

        return "Request for extension sent successfully";
      },
      error: () => {
        return "Error requesting for course extension";
      },
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="relative w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group py-0 p-2">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white font-bold text-lg">Expired</p>
        </div>

        <div className="relative">
          <img
            src={image}
            alt="course-card"
            className="w-full h-48 object-cover opacity-75 group-hover:opacity-50 transition-opacity duration-300"
          />

          <div className="p-4 space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              This course has expired and is no longer accessible. Please
              request an extension to regain access.
            </p>
          </div>

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    " Request Extension"
                  )}
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader className="mb-6">
            <DialogTitle>Request Course Extension</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason for Extension</Label>
              <Textarea
                id="reason"
                {...register("reason")}
                className="mt-1"
                placeholder="Explain why you need an extension..."
              />
              {errors.reason && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.reason.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="days">Extension Duration (days)</Label>
              <Input
                type="number"
                id="days"
                {...register("days", {valueAsNumber: true})}
                className="mt-1"
                min="1"
              />
              {errors.days && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.days.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
