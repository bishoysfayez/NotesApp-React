import React from 'react'

export default function Note(props) {
 

  return (
    <>
         {props.isDone ?
         <div className="noteContainer w-100 mx-0 my-1 p-2 rounded-5 row done" key={props.id}>
        
          <div className="col-md-7 my-auto">{props.body}</div> 
          <div className="col-md-5 text-end btn btnContainer">
              <i className='fa-solid fa-edit' onClick={()=>{props.editNote(props.id)}}></i>
              <i className='fa-solid fa-refresh ' onClick={()=>{props.markDone(props.id)}}></i>
              <i className='fa-solid fa-trash' onClick={()=>{props.deleteNote(props.id)}}></i>
          </div>
        </div>
: 
<div className="noteContainer w-100 mx-0 my-1 p-2 rounded-5 row" key={props.id}>
        
<div className="col-md-9 my-auto">{props.body}</div> 
<div className="col-md-3 text-end btn btnContainer">
    <i className='fa-solid fa-edit' onClick={()=>{props.editNote(props.id)}}></i>
    <i className='fa-solid fa-check ' onClick={()=>{props.markDone(props.id)}} onkey></i>
    <i className='fa-solid fa-trash' onClick={()=>{props.deleteNote(props.id)}}></i>
</div>
</div>

         }
    </>
  )
}
