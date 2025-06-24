import { Loader2Icon } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='bg-white h-screen flex justify-center items-center'>
        <Loader2Icon className='w-10 h-10 animate-spin'/>
    </div>
  )
}

export default Loading