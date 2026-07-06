import { forwardRef, type HTMLAttributes, type ImgHTMLAttributes } from "react";
import { cn } from "../lib/utils";
import { avatarRoot, avatarImage, avatarFallback, type AvatarVariants } from "./avatar.tv";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & AvatarVariants;

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, ...props }, ref) => (
    <span ref={ref} className={cn(avatarRoot({ size }), className)} {...props} />
  ),
);
Avatar.displayName = "Avatar";

export const AvatarImage = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img ref={ref} className={cn(avatarImage(), className)} {...props} />
  ),
);
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn(avatarFallback(), className)} {...props} />
  ),
);
AvatarFallback.displayName = "AvatarFallback";
