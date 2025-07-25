import Button from "@/components/Inputs/Button";
import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
  title: string;
  subTitle: string;
  link: string;
  children: ReactNode;
};
export default function Section({ title, subTitle, link, children }: Props) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex justify-between gap-2 items-center">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm font-bold text-gray-700">{subTitle}</p>
        </div>
        <Button.Link
          variant="secondary"
          size="small"
          href={link}
          suffix={<FaArrowRight />}
        >
          View More
        </Button.Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </section>
  );
}
