"use client";

import {
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated, useMutation } from "convex/react";
import {
  Briefcase,
  DoorClosed,
  DoorOpen,
  Home,
  Info,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const registerUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (user) {
      registerUser();
      router.replace("/colleges");
    }
  }, [user, registerUser]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#0A0A0A] p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link href={"/"}>College Management System</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Button variant="link" className="text-white flex items-center">
            <Home className="mr-1" /> Home
          </Button>
          <Button variant="link" className="text-white flex items-center">
            <Info className="mr-1" /> About
          </Button>
          <Button variant="link" className="text-white flex items-center">
            <Briefcase className="mr-1" /> Services
          </Button>
          <Button variant="link" className="text-white flex items-center">
            <Mail className="mr-1" /> Contact
          </Button>
          <Button variant="link" className="text-white flex items-center">
            <Unauthenticated>
              <SignInButton mode="modal" forceRedirectUrl={"/"} />
            </Unauthenticated>
            <Authenticated>
              <UserButton />
            </Authenticated>
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute left-0 top-full w-full p-4 transition-all duration-300 ease-in-out shadow-lg z-10">
          <Button variant="link" className="text-white flex items-center mb-2">
            <Home className="mr-1" /> Home
          </Button>
          <Button variant="link" className="text-white flex items-center mb-2">
            <Info className="mr-1" /> About
          </Button>
          <Button variant="link" className="text-white flex items-center mb-2">
            <Briefcase className="mr-1" /> Services
          </Button>
          <Button variant="link" className="text-white flex items-center mb-2">
            <Mail className="mr-1" /> Contact
          </Button>
          <Button variant="link" className="text-white flex items-center">
            <Unauthenticated>
              <DoorOpen className="mr-1" />
              <SignInButton mode="modal" forceRedirectUrl={"/"} />
            </Unauthenticated>
            <Authenticated>
              <DoorClosed className="mr-1" />
              <SignOutButton redirectUrl="/" />
            </Authenticated>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
