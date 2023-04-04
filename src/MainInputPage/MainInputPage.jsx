import React from 'react'
import { useState } from 'react'
import Note from '../Note/Note.jsx'
import Modal from '../Modal/Modal.jsx';



export default function MainInputPage (){

    let notes = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
    let [filterHandler, setFilterHandler] = useState("")
    let [postedNotes, setPostedNotes] = useState(notes);
    const [showModal, setShowModal] = useState(false)

    //let noteRef = useRef(null);



    const closeModal = ()=>{
      setShowModal(false)
    }
  

// input filter handler 

const filterHandlerFunction = (e)=>{
    setFilterHandler(e.target.value);
    console.log(filterHandler)
}

const filteredNotes = notes.filter((element)=>{
    return (element.noteBody.toLowerCase().includes(filterHandler.toLowerCase()))
})
console.log(filteredNotes)
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
        let newNote ={id:newNoteID, noteBody :newNoteBody, isDone: false, toBeEdited:false};
        // updating state with the new note
        let copiedNotes = [...postedNotes]
        copiedNotes.push(newNote)
        setPostedNotes(copiedNotes);
        // update local storage
        let savedPostedNotes = JSON.stringify(copiedNotes)
        localStorage.setItem ("notes" ,savedPostedNotes);
    } else {
        //window.alert('empty note ignored - please add note')
        // turnModalOn()
        setShowModal(true);
    }
    document.getElementById('todoInput').value = '';
}
// editing note

const editNote = function (itemID){
    //1-deeb copy
    let copiedNotes = [...postedNotes];
    let markedIndex = -1;
    // find item with specific id - find index of element
    for (let i = 0; i < copiedNotes.length; i++){
        if(copiedNotes[i].id === itemID ){
            markedIndex = i;
            // set toBeEdited flag to true to mark it to the next function
            copiedNotes[i].toBeEdited = true;
        } 
    }
    // put the note body before edit in the input field
    document.getElementById('todoInput').value =  copiedNotes[markedIndex].noteBody;
    // add class to the pointed note
    document.querySelectorAll('.noteContainer').forEach((element, index)=>{
        if (index === markedIndex){
            element.classList.add('selectedForEdit')
            

        } else{
            element.classList.remove('selectedForEdit')
        }
        // set state to the nots array contains the "to be edited" flag
        setPostedNotes(copiedNotes);
        // update local storage
        let savedPostedNotes = JSON.stringify(copiedNotes)
        localStorage.setItem ("notes" ,savedPostedNotes);

    })
    
     // hiding the Add btn 
     document.querySelector('.addNoteBtn').classList.add('d-none');
     document.querySelector('.editNoteBtn').classList.remove('d-none');
};


const postEditedNote = function (){

    let copiedNotes = [...postedNotes];
    // find item with specific id - find index of element
    for (let i = 0; i < copiedNotes.length; i++){
        if(copiedNotes[i].toBeEdited ){
            copiedNotes[i].noteBody = document.getElementById('todoInput').value;
            // removing toBeEdited flag 
            copiedNotes[i].toBeEdited = false;
        }
    }
    // hiding the edit btn 
    document.querySelector('.addNoteBtn').classList.remove('d-none');
    document.querySelector('.editNoteBtn').classList.add('d-none');
    // remove editing class from note 
    let notesNodeList = document.querySelectorAll('.noteContainer')
    for (let i = 0; i < notesNodeList.length; i++){
        notesNodeList[i].classList.remove('selectedForEdit');
    }
    // set state
    setPostedNotes(copiedNotes);
    // update local storage
    let savedPostedNotes = JSON.stringify(copiedNotes)
    localStorage.setItem ("notes" ,savedPostedNotes);
    // resetting input field
    document.getElementById('todoInput').value = '';
    
}
    return(
        <>
        <h1 className="display-1 text-center mx-auto mb-4 font-bold" >The Epic Note App</h1>
        <div className="mainContainer container d-flex flex-column w-50">
            <input type="text" placeholder='filter by name' onChange={filterHandlerFunction} value={filterHandler} name="" id="" />
            <div className="row m-1 align-items-between justify-content-between">
                <div className="col-md-9 p-0">
                  <input className='w-100 my-2' type="text" name="todoInput" id="todoInput" placeholder='Type Your Task Here'/>
                </div>
                <div className="col-md-2 p-0">
                    <button className='w-100 m-0 rounded-5 my-2 addNoteBtn visible' type="submit" onClick={()=>{addNote()}}>Add</button>
                    <button className='w-100 m-0 rounded-5 my-2 editNoteBtn hidden d-none' type="submit" onClick={()=>{postEditedNote()}}>Edit</button>
                </div>
            </div>

            <div className="notesContainer container-fluid d-flex flex-column-reverse align-items-center justify-content-center px-0 py-3 my-4">
                {filterHandler.length===0 ?      
                postedNotes.map((element)=>{
                return  <Note isDone = {element.isDone} body={element.noteBody} id={element.id} key={element.id} deleteNote = {()=>deleteNote(element.id)} markDone = {()=>{markDone(element.id)}} editNote = {()=>{editNote(element.id)}} /> 
                  })  : 
                filteredNotes.map((element)=> {
                    return  <Note isDone = {element.isDone} body={element.noteBody} id={element.id} key={element.id} deleteNote = {()=>deleteNote(element.id)} markDone = {()=>{markDone(element.id)}} editNote = {()=>{editNote(element.id)}} /> 

                })} 
                
        
            </div>

            <br />
   
        </div>

        <footer>
            <div className="text-center p-3" >
                © 2023 Copyright: Bishoy S. Fayez bishoysfayez@gmail.com
            </div>
        </footer>
        <Modal show = {showModal} close={closeModal} />

    </>
    )
}
