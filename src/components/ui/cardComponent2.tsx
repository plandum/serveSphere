// components/ui/card2.tsx

import React from "react";
import classNames from "classnames";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={classNames("rounded-xl shadow-md bg-white", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={classNames("", className)}>
      {children}
    </div>
  );
}
