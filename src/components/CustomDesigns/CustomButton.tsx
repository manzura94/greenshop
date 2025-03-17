import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface CustomButtonProps extends ButtonProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick: () => void;
}

const capitalizeFirstLetter = (text: string) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

function CustomButton({
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
        fontWeight: 500,
        padding: "8px 17px",
      }}
    >
      {capitalizeFirstLetter(label)}
    </Button>
  );
}

export default CustomButton;
