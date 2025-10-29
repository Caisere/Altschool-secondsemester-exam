import { lazy, Suspense } from "react";

// Lazy load icons to reduce initial bundle size
const Loader2 = lazy(() =>
  import("lucide-react").then((module) => ({ default: module.Loader2 }))
);
const Plus = lazy(() =>
  import("lucide-react").then((module) => ({ default: module.Plus }))
);
const XIcon = lazy(() =>
  import("lucide-react").then((module) => ({ default: module.X }))
);

interface IconProps {
  name: "loader2" | "plus" | "x";
  className?: string;
  size?: number;
}

const Icon = ({ name, className = "", size = 16 }: IconProps) => {
  const iconMap = {
    loader2: Loader2,
    plus: Plus,
    x: XIcon,
  };

  const IconComponent = iconMap[name];

  return (
    <Suspense fallback={<div className={`w-${size} h-${size}`} />}>
      <IconComponent className={className} size={size} />
    </Suspense>
  );
};

export { Icon };
