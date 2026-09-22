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

  const body = (
    <>
      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden">
        <Image
          src={product.imageSrc}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className={cn(
            "object-cover transition duration-500",
            isActive && "group-hover:scale-[1.03]",
            !isActive && "grayscale",
          )}
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
        <h2
          className={cn(
            "text-lg font-semibold leading-snug sm:text-xl",
            isActive ? "text-brand-primary" : "text-gray-400",
          )}
        >
          {product.title}
        </h2>
        <p
          className={cn(
            "mt-2 line-clamp-4 text-sm leading-relaxed",
            isActive ? "text-gray-600" : "text-gray-400",
          )}
        >
          {product.job}
        </p>
        <span
          className={cn(
            "mt-auto self-end pt-8 text-sm font-medium",
            isActive ? "text-brand-primary" : "text-gray-400",
          )}
        >
          {isActive ? "En savoir plus" : product.badge}
        </span>
      </div>
    </>
  );

  const frameClass = cn(
    "flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
  );

  if (!isActive) {
    return (
      <article className={cn(frameClass, "cursor-not-allowed opacity-80")}>
        {body}
      </article>
    );
  }

  return (
    <Link
      href={product.href}
      className={cn(frameClass, "group")}
      aria-label={`${product.title} — En savoir plus`}
    >
      {body}
    </Link>
  );
}
