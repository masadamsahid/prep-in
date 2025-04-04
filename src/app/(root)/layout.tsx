import { isAuthenticated } from "@/lib/actions/auth.action";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Props) => {
  if (! await isAuthenticated()) return redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav>
        <Link href='/' className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">Prep-In</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
}

export default RootLayout;