import { Creator } from "@/components/creator";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div className="flex items-center justify-center my-8">
      <Creator />
      <Toaster />
    </div>
  );
}
