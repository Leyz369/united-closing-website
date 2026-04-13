import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { trackCTAClick } from "@/lib/analytics";

interface GetStartedButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  trackingLocation?: string;
  disabled?: boolean;
}

export function GetStartedButton({
  children,
  onClick,
  href,
  className,
  type = "button",
  trackingLocation = "unknown",
  disabled = false
}: GetStartedButtonProps) {
  const buttonContent = (
    <>
      <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
        {children}
      </span>
      <i className="absolute right-1 top-1 bottom-1 rounded-md z-10 grid w-1/4 place-items-center transition-all duration-500 bg-white/20 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95 text-white">
        <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      </i>
    </>
  );

  const handleClick = (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    trackCTAClick(trackingLocation, String(children));
    if (onClick) {
      onClick(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  if (href) {
    return (
      <Button
        className={`group relative overflow-hidden bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 text-gray-900 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-400/50 ${className || ''}`}
        size="lg"
        asChild
      >
        <a href={href} onClick={handleClick}>{buttonContent}</a>
      </Button>
    );
  }

  return (
    <Button
      className={`group relative overflow-hidden bg-gradient-to-b from-gray-200 via-gray-300 to-gray-400 text-gray-900 hover:from-gray-300 hover:via-gray-400 hover:to-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-400/50 ${className || ''}`}
      size="lg"
      type={type}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonContent}
    </Button>
  );
}
