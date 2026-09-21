import Image from "next/image";
import Link from "next/link";

import type { QuoteProductCatalogItem } from "@/lib/constants/quote-products";
import { cn } from "@/lib/utils";

interface QuoteProductCardProps {
  product: QuoteProductCatalogItem;
  priority?: boolean;
}

export function QuoteProductCard({ product, priority = false }: QuoteProductCardProps) {
  const isActive = product.status === "active";

  const media = (
    <>
      <Image
        src={product.imageSrc}
        alt={product.imageAlt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className={cn(
          "object-cover transition duration-500",
          isActive && "group-hover:scale-[1.04]",
          !isActive && "grayscale",
        )}
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/5"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <span
          className={cn(
            "mb-2 w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide",
            product.badge === "Bientôt"
              ? "bg-white/20 text-white/80"
              : "bg-brand-primary text-white",
          )}
        >
          {product.badge}
        </span>
        <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
          {product.title}
        </h2>
        <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-white/85">
          {product.job}
        </p>
        <p className="mt-3 text-xs font-medium text-white/70">
          {isActive ? `${product.durationLabel} →` : product.durationLabel}
        </p>
      </div>
    </>
  );

  const frameClass =
    "relative block aspect-[4/3] overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";

  if (!isActive) {
    return (
      <article className={cn(frameClass, "cursor-not-allowed")} aria-disabled="true">
        {media}
      </article>
    );
  }

  return (
    <Link
      href={product.href}
      className={cn(frameClass, "group")}
      aria-label={`${product.title} - ${product.durationLabel}`}
    >
      {media}
    </Link>
  );
}
