"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LogIn({ big, setMobileMenuOpen }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    if (!big) {
      setMobileMenuOpen(false);
    }
  };

  const classes = "text-md font-semibold leading-6 text-gray-900";

  if (session) {
    return (
      <button className={big ? classes : undefined} onClick={handleSignOut}>
        Log out
      </button>
    );
  } else {
    return (
      <button onClick={() => signIn()} className={big ? classes : undefined}>
        Log in <span aria-hidden="true">&rarr;</span>
      </button>
    );
  }
}
