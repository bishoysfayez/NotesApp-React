# Notes & TODOs app using React.js

The App consist of 2 components 
1- MainInputPage : contains the react js logic - please see below -  and the main body of the page
2 - Note Component : is the that is to be built for every note - it takes te main props from the MainInputPage component for the Note (ID, note Body, note status) and build the component correspondingly.

React js Logic : 
1- checking Local storage if has previous data for the user's notes to render. if not the page will be empty.
2- function "deleteNote" : deleting the pointed note after pointing the desired index in the notes array, then the 3 steps to update state ( deep copy of the notes array - deleting the pointed note - update state to the notes array)
3- function "markDone" : Marking (toggle) the pointed note status to be done(or not done) after pointing the desired index in the notes array, then the 3 steps to update state ( deep copy of the notes array - updating the pointed note status - update state to the notes array.
4- function " addNote" : to add new note (id,body,status) and update local storge.
5- function " editNote" & "postEditedNote" : to edit the note and update local storge.

thanks
Bishoy S. Fayez
bishoysfayez@gmail.com
