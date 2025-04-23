import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {useNavigate} from "react-router";

const CourseCheckoutSuccessfulDialog = ({
  modal,
  handleClose,
}: {
  modal: boolean;
  handleClose: () => void;
}) => {
  const navigate = useNavigate();
  const handleAction = () => {
    handleClose();
    navigate("/dashboard");
  };
  return (
    <AlertDialog open={modal}>
      <AlertDialogTrigger>Open</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enrollment Successful!</AlertDialogTitle>
          <AlertDialogDescription>
            You are now successfully enrolled in the course. Please go to your
            dashboard to access and begin learning.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CourseCheckoutSuccessfulDialog;
