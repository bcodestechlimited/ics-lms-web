import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useUpdatePassword, useUpdateUserProfile} from "@/hooks/use-user";
import {useSession} from "@/hooks/useSession";
import DashboardLayout from "@/layouts/dashboard-layout";
import {
  UpdateUserPasswordSchema,
  UpdateUserProfileSchema,
} from "@/schema/auth.schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {CameraIcon, Loader2, LockIcon, UserIcon} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

export function UserProfileDashboard() {
  const {session} = useSession();
  const fileInputRef = useRef(null);
  const updateProfile = useUpdateUserProfile();
  const updatePassword = useUpdatePassword();
  const profileForm = useForm({
    resolver: zodResolver(UpdateUserProfileSchema),
    defaultValues: {
      avatar: "",
      firstName: session.user?.firstName || "",
      lastName: session.user?.lastName || "",
    },
  });
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPwdLoading, setIsPwdLoading] = useState(false);

  const passwordForm = useForm({
    resolver: zodResolver(UpdateUserPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const avatarFile = profileForm.watch("avatar");
  const [previewUrl, setPreviewUrl] = useState(session.user?.avatar || "");

  useEffect(() => {
    if (avatarFile instanceof File) {
      const url = URL.createObjectURL(avatarFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile]);

  const handleProfileSubmit = (
    values: z.infer<typeof UpdateUserProfileSchema>
  ) => {
    if (!session.user?._id) {
      toast("User not found");
      return;
    }

    setIsProfileLoading(true);
    try {
      toast.promise(
        updateProfile.mutateAsync({
          userId: session.user._id,
          firstName: values.firstName,
          lastName: values.lastName,
          avatar: values.avatar instanceof File ? values.avatar : undefined,
        }),
        {
          loading: "Updating profile…",
          success: (res) => {
            if (res.success) {
              setIsProfileLoading(false);
              return "Profile updated!";
            }
            setIsProfileLoading(false);
            throw new Error(res.message);
          },
          error: (err) => {
            setIsProfileLoading(false);
            return err?.message || "Failed to update profile";
          },
        }
      );
    } catch {
      setIsProfileLoading(false);
      toast.error("Error updating user profile");
    }
  };

  const handlePasswordSubmit = (
    values: z.infer<typeof UpdateUserPasswordSchema>
  ) => {
    if (!values.currentPassword || !values.newPassword) return;
    setIsPwdLoading(true);

    toast.promise(
      updatePassword.mutateAsync({
        newPassword: values.newPassword,
        oldPassword: values.currentPassword,
      }),
      {
        loading: "Updating password...",
        success: (res) => {
          setIsPwdLoading(false);
          if (res.success) {
            passwordForm.reset();
            window.location.reload();
            return "Password updated!";
          }
          throw new Error(res.message);
        },
        error: (err) => {
          setIsPwdLoading(false);
          return err?.message || "Failed to update password";
        },
      }
    );
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-start-2 col-end-12 py-16 space-y-16">
          <div className="max-w-4xl mx-auto space-y-16">
            <h1 className="text-2xl font-bold text-[#013467]">User Profile</h1>

            {/* update user profile */}
            <section className="space-y-8">
              {/* Profile information card */}
              <Card className="border border-gray-200 rounded-lg shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    <div className="flex items-center gap-2">
                      <UserIcon className="h-5 w-5 text-[#013467]" />
                      <span>Profile Information</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                    className="space-y-6"
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={previewUrl} />
                          <AvatarFallback>
                            {profileForm.watch("firstName")?.[0]}
                            {profileForm.watch("lastName")?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <label
                          htmlFor="avatarFile"
                          className="absolute -bottom-2 -right-2 rounded-full bg-white p-1 cursor-pointer"
                        >
                          <CameraIcon className="h-4 w-4 text-gray-700" />
                        </label>

                        <input
                          id="avatarFile"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          {...profileForm.register("avatar", {
                            onChange: (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                profileForm.setValue("avatar", file, {
                                  shouldValidate: true,
                                  shouldDirty: true,
                                });
                              }
                            },
                          })}
                          ref={fileInputRef}
                        />
                      </div>

                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            {...profileForm.register("firstName")}
                            className="border-gray-300 focus:border-[#013467]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            {...profileForm.register("lastName")}
                            className="border-gray-300 focus:border-[#013467]"
                          />
                        </div>
                      </div>

                      <div className="w-full flex justify-end pt-4">
                        <Button
                          type="submit"
                          className="bg-[#013467] hover:bg-[#013467]/90"
                          disabled={isProfileLoading}
                        >
                          {isProfileLoading ? (
                            <div className="flex items-center gap-x-1">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span className="ml-2">Saving...</span>
                            </div>
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </section>

            {/* update user password */}
            <section>
              <Card className="border border-gray-200 rounded-lg shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    <div className="flex items-center gap-2">
                      <LockIcon className="h-5 w-5 text-[#013467]" />
                      <span>Change Password</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...passwordForm.register("currentPassword")}
                          className="border-gray-300 focus:border-[#013467]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          {...passwordForm.register("newPassword")}
                          className="border-gray-300 focus:border-[#013467]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...passwordForm.register("confirmPassword")}
                          className="border-gray-300 focus:border-[#013467]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button
                        type="submit"
                        className="bg-[#013467] hover:bg-[#013467]/90"
                        disabled={isPwdLoading}
                      >
                        {isPwdLoading ? (
                          <div className="flex items-center gap-x-1">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
