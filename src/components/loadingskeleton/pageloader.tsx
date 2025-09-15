import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="grid place-items-center h-[100vh] bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoader;
