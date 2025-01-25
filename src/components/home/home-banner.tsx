import Image from "next/image";
import Link from "next/link";
import { IHomeBanner } from "../../../@types/types";

export default function HomeBanner({ src, href, className }: IHomeBanner) {
  return (
    <div className={"flex justify-center " + className}>
      {href ? (
        <Link
          href={href}
          className="relative xl:w-[85%] w-[90%] aspect-video shadow-xl rounded-md"
        >
          <Image
            src={src}
            alt={src}
            fill={true}
            className="object-cover rounded-md border-2 border-border-pizza"
            quality={100}
          />
        </Link>
      ) : (
        <div className="relative xl:w-[85%] w-[90%] aspect-video shadow-xl rounded-md">
          <Image
            src={src}
            alt={src}
            fill={true}
            className="object-cover rounded-md border-2 border-border-pizza"
            quality={100}
          />
        </div>
      )}
    </div>
  );
}
