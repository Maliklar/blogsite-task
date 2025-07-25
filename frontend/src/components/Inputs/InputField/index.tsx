import classNames from "classnames";
import { InputHTMLAttributes, JSX } from "react";

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>,
  "prefix"
> & {
  label: string;
  error?: string;
  prefix?: JSX.Element;
  suffix?: JSX.Element;
  controlClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  textArea?: boolean;
};

export type InputFieldProps = Props;

export default function InputField({
  label,
  error,
  prefix,
  suffix,
  className,
  controlClassName,
  errorClassName,
  containerClassName,
  textArea = false,
  ...props
}: Props) {
  return (
    <div
      className={classNames(
        "relative",
        "flex flex-col gap-2",
        error && "text-red-500",
        props.hidden && "hidden",
        controlClassName
      )}
    >
      <label htmlFor={props.id} className="sr-only">
        {label}
      </label>
      <div
        role="group"
        className={classNames(
          "flex items-center justify-between gap-3.5",
          "py-0 px-4",
          "text-sm",
          "duration-300",
          `focus:outline-1 outline-1 `,
          "focus-within:ring-1",
          !textArea ? "h-[50px] rounded-full" : "rounded-3xl",
          error
            ? "outline-red-500 focus-within:ring-red-500"
            : "outline-[#e1e1e1] focus-within:ring-[#818181]",
          props.disabled
            ? "opacity-30 grayscale-100 bg-gray-400"
            : "opacity-100",
          containerClassName
        )}
      >
        {prefix ? <span className="my-4">{prefix}</span> : null}

        {textArea ? (
          <textarea
            aria-label={label}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            className={classNames(
              "relative",
              "flex-1",
              "min-w-0 w-full h-full",
              "focus:outline-none",
              "text-black",
              "resize-none",
              "py-4",
              "min-h-[100px] ",
              error
                ? "placeholder:text-[#de0a0a68]"
                : "placeholder:text-[#989898]",
              className
            )}
            placeholder={label}
            {...props}
          />
        ) : (
          <input
            aria-label={label}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            className={classNames(
              "relative",
              "flex-1",
              "min-w-0 w-full h-full",
              "focus:outline-none",
              "text-black",
              error
                ? "placeholder:text-[#de0a0a68]"
                : "placeholder:text-[#989898]",
              className
            )}
            placeholder={label}
            {...props}
          />
        )}
        {suffix ? <span className="my-4">{suffix}</span> : null}
      </div>
      {error ? (
        <small
          id={`${props.id}-error`}
          aria-live="polite"
          className={classNames(
            "relative",
            "flex items-center",
            "text-red-600",
            "ms-5",
            errorClassName
          )}
        >
          {error}
        </small>
      ) : null}
    </div>
  );
}
