import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {EyeOffIcon} from "lucide-react";
import {useState} from "react";

interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const EyeIcon: React.FC<EyeIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
};

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder = "Enter your password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="relative">
        <Input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="pr-10"
          {...props}
        />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <EyeIcon className="h-4 w-4" />
          ) : (
            <EyeOffIcon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle password visibility</span>
        </Button>
      </div>
    </div>
  );
};

export default PasswordInput;
