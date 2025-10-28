"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  href?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  className,
  appName,
  href,
  onClick,
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (href && typeof window !== "undefined") {
      window.location.assign(href);
      return;
    }

    if (appName) {
      alert(`Hello from your ${appName} app!`);
    }
  };

  return (
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
};
