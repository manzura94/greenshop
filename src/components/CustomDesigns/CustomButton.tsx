import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick: () => void;
  weight: string;
  fontsize: string;
  width?: string;
}

function CustomButton({
  weight,
  fontsize,
  width,
  label,
  leftIcon,
  rightIcon,
  onClick,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      {...props}
      startIcon={leftIcon}
      endIcon={rightIcon}
      variant="contained"
      onClick={onClick}
      sx={{
        textTransform: "none",
        background: "#46A358",
        color: "white",
        fontWeight: weight,
        padding: "8px 17px",
        fontSize: fontsize,
        width: width,
      }}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
