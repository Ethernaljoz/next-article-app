'use client'

import { useState } from "react"
import { useSession } from "next-auth/react";
import ReactTextareaAutosize from 'react-textarea-autosize';
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";




const ArticleForm = () => {

  const [data, setData]= useState({
    title:'',
    content:''
  })

  const isLogged = false
  
  const router = useRouter()
  const { data:session } = useSession()

  const createArticle = async(e)=>{
    e.preventDefault()
    axios.post('/api/articles',data)
    .then(()=>{
      toast.success('article created')
      router.push(`/article`)
    })
    .catch(()=>toast.error('something wrong'))
      
    
  }


  return (
    <>
     
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an article
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={createArticle}>
            <div>
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder='Enter the title'                  
                  required
                  value={data.title}
                  onChange={(e)=> setData({...data, title:e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <div>
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                Content
              </label>
              <div className="mt-2">
                <ReactTextareaAutosize
                    minRows={5}
                    name='content'
                    value={data.content}
                    onChange={(e)=> setData({...data, content:e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled:bg-gray-400"
                    placeholder='Enter the content' 
                />
                
              </div>
            </div>

            <button
              disabled={session?.user?.email ? isLogged : !isLogged}
              type='submit'
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400'
            >
              Create
            </button>


          </form>    
        </div>
      </div>
    </>
    
  )
}

export default ArticleForm