'use client'
import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <div><button onClick={()=> signOut()} className='font-medium hover:underline'>Logout</button></div>
  )
}

export default Logout