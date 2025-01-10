import Link from "next/link";
import Image from "next/image";
import { Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Header() {
  return (
    <header>
      <div className="mx-auto max-w-3xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/" className="font-bold">
              <Image src="/logo.svg" alt="App Logo" width={66} height={24} />
            </Link>
          </div>
          <div>
            <Sun size={20} />
          </div>
        </div>
        <Separator className="mt-6" />
      </div>
    </header>
  );
}
