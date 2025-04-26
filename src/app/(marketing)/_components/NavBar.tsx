import BrandLogo from "@/components/BrandLogo"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { MenuIcon, XIcon } from "lucide-react"
import Link from "next/link"

export default function NavBar() {
  return (
    <header className="flex py-6 shadow-xl fixed top-0 w-full z-10 bg-background/95">
      <nav className="flex justify-between items-center gap-10 container font-semibold">
        <Link href="/">
          <BrandLogo />
        </Link>
        <div className="hidden sm:flex justify-end items-center gap-10">
          <Link href="#" className="text-lg">
            Features
          </Link>
          <Link href="/#pricing" className="text-lg">
            Pricing
          </Link>
          <Link href="#" className="text-lg">
            About
          </Link>
          <span className="text-lg">
            <SignedIn>
              <Link href="/dashboard">Dashboard</Link>
            </SignedIn>
            <SignedOut>
              <SignInButton>Login</SignInButton>
            </SignedOut>
          </span>
        </div>
        <div className="block sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side={"left"} className="p-4">
              <SheetHeader className="flex flex-row justify-between items-center w-full py-4">
                <SheetTitle>
                  <Link href="/">
                    <BrandLogo />
                  </Link>
                </SheetTitle>
                <SheetClose asChild>
                  <XIcon />
                </SheetClose>
              </SheetHeader>
              <Separator />
              <div className="flex flex-col gap-4 py-4">
                <Link href="#" className="text-lg">
                  Features
                </Link>
                <Link href="/#pricing" className="text-lg">
                  Pricing
                </Link>
                <Link href="#" className="text-lg">
                  About
                </Link>
                <span className="text-lg">
                  <SignedIn>
                    <Link href="/dashboard">Dashboard</Link>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton>Login</SignInButton>
                  </SignedOut>
                </span>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
