/* eslint-disable @typescript-eslint/ban-ts-comment */
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { JSX } from "react";
import { UrlObject } from "url";
type Variants = "primary" | "secondary" | "tertiary" | "unset" | "error";
type Sizes = "small" | "medium" | "large" | "unset";
type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
export type LinkButtonProps = Props &
  Omit<LinkProps, "prefix"> & {
    href: UrlObject | string;
  };

export type CustomButtonProps = Props;
type Props = Omit<ButtonProps, "prefix"> & {
  variant?: Variants;
  size?: Sizes;
  rounded?: boolean;
  suffix?: JSX.Element | string;
  prefix?: JSX.Element | string;
  loading?: boolean;
};

const VARIANT: { [key in Variants]: string } = {
  primary: "bg-[#8EC24D] text-white",
  secondary: "bg-white text-black outline-1 outline-solid outline-[#e1e1e1]",
  tertiary: "bg-[#8EC24D1A] text-black",
  error: "bg-red-500 text-white",
  unset: "",
};

const SIZE: { [key in Sizes]: string } = {
  small: "py-[10px] px-[16px] text-sm",
  medium: "py-[14.5px] px-[16px] text-md",
  large: "py-5 px-[16px] text-md",
  unset: "",
};

export default function Button({
  className,
  variant = "primary",
  size = "medium",
  rounded = true,
  prefix,
  suffix,
  loading,
  children,
  ...props
}: Props) {
  return (
    <button
      className={classNames(
        "relative cursor-pointer whitespace-nowrap",
        "flex items-center justify-center gap-[5px] flex-nowrap",
        "min-w-[80px]",
        (props.disabled || loading) && "opacity-60 !cursor-auto",
        SIZE[size],
        VARIANT[variant],
        rounded ? "rounded-full" : null,
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {prefix ? prefix : null}
      {children}
      {loading ? <Spinner variant={variant} /> : null}
      {!loading && suffix ? suffix : null}
    </button>
  );
}

Button.Link = function ButtonLink({
  className,
  variant = "primary",
  size = "medium",
  rounded = true,
  prefix,
  suffix,
  loading,
  children,
  ...props
}: LinkButtonProps) {
  return (
    // @ts-ignore
    <Link
      className={classNames(
        "relative cursor-pointer whitespace-nowrap",
        "flex items-center justify-center gap-[5px] flex-nowrap",
        (props.disabled || loading) && "opacity-60 !cursor-auto",
        SIZE[size],
        VARIANT[variant],
        rounded ? "rounded-full" : null,
        className
      )}
      disabled={props.disabled || loading}
      {...props}
    >
      {prefix ? prefix : null}
      {children}
      {loading ? <Spinner variant={variant} /> : null}
      {!loading && suffix ? suffix : null}
    </Link>
  );
};

type SpinnerProps = {
  variant?: Variants;
};
function Spinner({ variant = "primary" }: SpinnerProps) {
  const color = variant === "primary" ? "white" : "black";
  return (
    <div
      className={classNames(
        "relative animate-spin h-5 w-5 min-h-5 min-w-5 rounded-full border-2 border-t-transparent",
        `border-[${color}]`
      )}
    />
  );
}
