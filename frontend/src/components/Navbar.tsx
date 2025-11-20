import { SignedIn, SignedOut, useClerk, UserButton } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { openSignIn, signOut } = useClerk();
  const location = useLocation();

  return (
    <div className="flex justify-between mt-4">
      <span className="logo text-blue-400 text-2xl">mockdev</span>
      <SignedIn>
        {location.pathname.startsWith("/projects") ? (
          <UserButton />
        ) : (
          <div className="space-x-4">
            <Link
              to="/projects"
              className="px-4 py-2 hover:bg-gray-200 rounded-xl"
            >
              Projects
            </Link>
            <Button
              onClick={() => signOut()}
              className="bg-white hover:bg-gray-200 border-black border-2 rounded-xl text-black cursor-pointer"
            >
              Sign out
            </Button>
          </div>
        )}
      </SignedIn>
      <SignedOut>
        <Button
          onClick={() => openSignIn()}
          className="bg-white hover:bg-gray-200 border-black border-2 rounded-xl text-black cursor-pointer"
        >
          Sign in
        </Button>
      </SignedOut>
    </div>
  );
};

export default Navbar;
