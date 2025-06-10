import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import{decrement, increment} from "../Components/counterslice"
function Home() {
const count =useSelector((state)=> state.counter.value)
const dispatch =useDispatch()
  return (
    <div className='text-center mt-3'>
      <h1>{count}</h1>
      <div className='d-flex justify-content-center gap-3 mt-4 '>
        <Button variant='success' aria-label='Increment Value' onClick={()=>dispatch(increment())}>Increment</Button>
        <Button variant='danger' aria-label='decrement Value' onClick={()=>dispatch(decrement())}>decrement</Button>
      </div>
    </div>
  )
}

export default Home
