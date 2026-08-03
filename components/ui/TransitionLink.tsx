"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { useRouter } from "next/navigation";

type TransitionLinkProps = ComponentPropsWithoutRef<typeof Link>;

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

function shouldHandleTransition(event: MouseEvent<HTMLAnchorElement>) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}

export default function TransitionLink({ href, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();

  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);

        if (!shouldHandleTransition(event)) {
          return;
        }

        event.preventDefault();

        const target = typeof href === "string" ? href : href.toString();
        const doc = document as ViewTransitionDocument;

        if (doc.startViewTransition) {
          doc.startViewTransition(() => {
            router.push(target);
          });
          return;
        }

        router.push(target);
      }}
    />
  );
}
