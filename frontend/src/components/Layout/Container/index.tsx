import classNames from "classnames";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const defaultElement = "div";

type PolymorphicAsProp<T extends ElementType> = {
  as?: T;
};

type PolymorphicProps<T extends ElementType> = PropsWithChildren<
  ComponentPropsWithoutRef<T> & PolymorphicAsProp<T>
>;

type Props<T extends ElementType = typeof defaultElement> =
  PolymorphicProps<T> & {
    noPadding?: boolean;
  };

export default function Container<
  T extends ElementType = typeof defaultElement
>({ as, noPadding = false, className, ...props }: Props<T>) {
  const Tag = as || "div";
  return (
    <Tag
      className={classNames(
        "w-full max-w-full lg:max-w-[1188px] mx-auto",
        noPadding ? "px-0" : "px-[16px]",
        className
      )}
      {...props}
    />
  );
}
