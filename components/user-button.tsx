"use client";

import { Loader } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Loading state
  if (status === "loading") {
    return <Loader className="animate-spin size-6 mt-4 mr-4 float-right" />;
  }

  // Unauthenticated state
  if (status === "unauthenticated") {
    return (
      <div className="flex justify-end p-4 gap-4">
        <Button asChild>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  // Authenticated state
  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase() || "U";

  const imageUrl =
    session?.user?.image && session.user.image.trim() !== ""
      ? session.user.image
      : null;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <nav>
      {session ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8 cursor-pointer">
            <div className="flex gap-4 items-center">
              <span>{session.user?.name}</span>
              <div className="size-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Avatar"
                    width={32}
                    height={32}
                    unoptimized
                  />
                ) : (
                  <span className="text-lg font-bold text-gray-700">
                    {avatarFallback}
                  </span>
                )}
              </div>
            </div>
          </DropdownMenuTrigger>
          {/* You can add dropdown menu content here if needed */}
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem className="h-10" onClick={() => handleSignOut()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex justify-end p-4 gap-4">
          <Button>
            <Link href="sign-in">Sign in</Link>
          </Button>
          <Button>
            <Link href="sign-up">Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default UserButton;
