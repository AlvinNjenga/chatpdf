import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-200 to-teal-200">
      {/* HINT: Absolute positioning for one page app to place it exactly, not for layout. */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton />
          </div>

          <div className="flex mt-2">
            {isAuth && <Button>Go to Chats</Button>}
          </div>

          <p className="max-w-xl mt-2 text-lg text-slate-600 font-semibold">
            Join millions of students, researchers and professionals to 
            instantly answer questions and understand research with AI
          </p>

          {/* File upload component */}
          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button className="cursor-pointer text-lg" size="lg">
                  Login to get started!
                  <LogIn/>
                </Button>
              </Link>
            )}
          </div>


        </div>
      </div>
    </div>

  )
}