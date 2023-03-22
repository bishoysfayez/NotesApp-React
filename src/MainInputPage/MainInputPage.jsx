import React from 'react'
import { useState } from 'react'
import Note from '../Note/Note.jsx'
export default function MainInputPage (){

    let notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];

    let [postedNotes, setPostedNotes] = useState(notes)



    // marking done function 

    const markDone = function (itemID){
        //1-deeb copy
        let copiedNotes = [...postedNotes]
        let markedIndex = -1;
        // find item with specific id - find index of element
        for (let i = 0; i < copiedNotes.length; i++){
            if(copiedNotes[i].id === itemID ){
                markedIndex = i;
                
            } 
        }
        // 2- markdone

        copiedNotes[markedIndex].isDone=== false ? copiedNotes[markedIndex].isDone = true: copiedNotes[markedIndex].isDone = false;

        // 3- assign and update
        setPostedNotes(copiedNotes);

        // update local storage
        let savedPostedNotes = JSON.stringify(copiedNotes)
        localStorage.setItem ("notes" ,savedPostedNotes);
    }

// deleting note function

    const deleteNote = function (itemID){
        //1-deeb copy
        let copiedNotes = [...postedNotes]
        let deletedIndex = -1;
        // find item with specific id - find index of element
        for (let i = 0; i < copiedNotes.length; i++){
            if(copiedNotes[i].id === itemID ){
                deletedIndex = i;
                
            } 
            
            copiedNotes.slice(deletedIndex, 1)
            // assign and update
            setPostedNotes(copiedNotes);
            // update local storage
            let savedPostedNotes = JSON.stringify(copiedNotes)
            localStorage.setItem ("notes" ,savedPostedNotes);
        }



        // 2- delete
        copiedNotes.splice(deletedIndex ,1);
        // 3- assign and update
        setPostedNotes(copiedNotes);
        // update local storage
        let savedPostedNotes = JSON.stringify(copiedNotes)
        localStorage.setItem ("notes" ,savedPostedNotes);
    }
  




  // adding new note Note

  let addNote = function(){
    if(document.getElementById('todoInput').value){
        let newNoteBody = document.getElementById('todoInput').value;
        let newNoteID = postedNotes.length
        let newNote ={id:newNoteID, noteBody :newNoteBody, isDone: false};
        // updating state with the new note
        let copiedNotes = [...postedNotes]
        copiedNotes.push(newNote)
        setPostedNotes(copiedNotes);
        // update local storage
        let savedPostedNotes = JSON.stringify(copiedNotes)
        localStorage.setItem ("notes" ,savedPostedNotes);
    } else {
        window.alert('empty note ignored - please add note')
    }
  

}

// setup local storage




    return(
        <>
        <h1 className="display-1 text-center mx-auto mb-4 font-bold" >The Epic Note App</h1>
        <div className="mainContainer container d-flex flex-column w-50">

            <div className="row m-1 align-items-between justify-content-between">
                <div className="col-md-9 p-0">
                  <input className='w-100 my-2' type="text" name="todoInput" id="todoInput" placeholder='Type Your Task Here'/>
                </div>
                <div className="col-md-2 p-0">
                    <button className='w-100 m-0 rounded-5 my-2' type="submit" onClick={()=>{addNote()}}>Add</button>
                </div>
            </div>

            <div className="notesContainer container-fluid d-flex flex-column-reverse align-items-center justify-content-center px-0 py-3 my-4">
                {postedNotes.map((element)=>{
                return  <Note isDone = {element.isDone} body={element.noteBody} id={element.id} key={element.id} deleteNote = {()=>deleteNote(element.id)} markDone = {()=>{markDone(element.id)}} /> 

            })}
            


            </div>

        </div>
    </>
    )
}
