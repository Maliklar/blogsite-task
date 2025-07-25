"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { HTMLAttributes } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const buttonStyles = classNames(
  "flex items-center justify-center",
  "min-h-8 min-w-8 h-8 w-8",
  "sm:min-h-13 sm:min-w-13 sm:h-13 sm:w-13",
  "sm:text-lg text-sm",
  "border-[#999999] border-1 border-solid rounded-full"
);

const buttonActiveStyles = "bg-[#8EC24D] text-white !border-[#8EC24D]";

const buttonDisabledStyles =
  "text-[#999999] !border-[#999999] pointer-events-none";

type Props = HTMLAttributes<HTMLDivElement> & {
  totalPages: number;
  max?: number;
};
export default function Pagination({
  totalPages,
  max = 5,
  className,
  ...props
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = Object.fromEntries(searchParams.entries());

  const page = Number(searchParams.get("page")) || 1;
  if (isNaN(page) || totalPages <= 1) return null;

  const halfMax = Math.floor(max / 2);

  let start = Math.max(1, page - halfMax);
  let end = Math.min(totalPages, page + halfMax);

  if (page <= halfMax) end = Math.min(max, totalPages);
  else if (page + halfMax >= totalPages)
    start = Math.max(totalPages - max + 1, 1);

  return (
    <nav
      aria-label="Pagination"
      className={classNames(
        "flex items-center gap-1 sm:gap-2 w-full flex-wrap",
        className
      )}
      {...props}
    >
      <Link
        href={{
          pathname,
          query: { ...query, page: page - 1 },
        }}
        className={classNames(
          buttonStyles,
          page - 1 <= 0 ? buttonDisabledStyles : null,
          "me-auto"
        )}
      >
        <FiArrowLeft />
      </Link>

      {start + 1 > 1 && (
        <>
          <Link
            href={{
              pathname,
              query: { ...query, page: 1 },
            }}
            className={classNames(
              buttonStyles,
              page === 1 || !page ? buttonActiveStyles : null
            )}
            data-active={start === page}
          >
            1
          </Link>
          {start > 2 && <span className={classNames(buttonStyles)}>··</span>}
        </>
      )}
      {Array.from({ length: end - start }, (_, i) => start + i).map((p) => (
        <Link
          href={{
            pathname,
            query: { ...query, page: p + 1 },
          }}
          className={classNames(
            buttonStyles,
            page === p + 1 ? buttonActiveStyles : null
          )}
          data-active={p + 1 === page}
          key={p}
        >
          {p + 1}
        </Link>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages && (
            <span className={classNames(buttonStyles)}>··</span>
          )}
          <Link
            href={{ pathname, query: { ...query, page: totalPages } }}
            className={classNames(
              buttonStyles,
              page === totalPages ? buttonDisabledStyles : null
            )}
            data-active={end === page}
          >
            {totalPages}
          </Link>
        </>
      )}
      <Link
        href={{ pathname, query: { ...query, page: page + 1 } }}
        className={classNames(
          buttonStyles,
          page + 1 > totalPages ? buttonDisabledStyles : null,
          "ms-auto"
        )}
      >
        <FiArrowRight />
      </Link>
    </nav>
  );
}
