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
import { UserButton } from "@clerk/nextjs"
import { MenuIcon, XIcon } from "lucide-react"
import Link from "next/link"

export default function NavBar() {
  return (
    <header className="flex py-4 shadow bg-background">
      <nav className="flex justify-between items-center container">
        <Link className="mr-auto" href="/dashboard">
          <BrandLogo />
        </Link>
        <div className="flex justify-end gap-4 sm:gap-10">
          <div className="hidden sm:flex justify-end gap-10">
            <Link href="/dashboard/products">Products</Link>
            <Link href="/dashboard/analytics">Analytics</Link>
            <Link href="/dashboard/subscription">Subscription</Link>
          </div>

          <UserButton />

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
                  <Link href="/dashboard/products">Products</Link>
                  <Link href="/dashboard/analytics">Analytics</Link>
                  <Link href="/dashboard/subscription">Subscription</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
