'use client'
import Link from "next/link"
import Logout from "./Logout"
//import { getCurrentUser } from "../lib/session"
import { useSession } from "next-auth/react";



const Header =  () => {
  
  //const user = getCurrentUser()
  const { data:session } = useSession()

  return (
    <header className="bg-blue-500">
        <nav className=" max-w-4xl mx-auto flex justify-between text-white py-3 ">
            <Link href='/' className="font-bold text-2xl">Articles App</Link>

            <ul className=" flex justify-center gap-x-5 items-center">
                <li><Link href='/article' className="font-medium hover:underline">Articles</Link></li>
                {session?.user?.email ?(
                  <Logout/>
                ):(

                  <li>
                    <Link href='/login'className=" text-white font-medium px-4 py-2 hover:underline">
                      Login
                    </Link>
                  </li>
                )}
            </ul>

        </nav>
    </header>
  )
}

export default Header