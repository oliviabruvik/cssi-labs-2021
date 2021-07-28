let googleUserId, editedNoteId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};


const renderDataAsHtml = (data) => {
  let cards = ``;

  let orderedKeys = Object.keys(data).sort((a, b) => {
      return data[a].title.localeCompare(data[b].title);
    });
  console.log(orderedKeys);
  
//   for(const noteItem in data) {
    orderedKeys.forEach((noteItem) => {
        console.log("yes", noteItem);
        const note = data[noteItem];

        // For each note create an HTML card
        cards += createCard(note, noteItem);
    });

  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};



const createCard = (note, noteId) => {
    return `
    <div class="column is-one-quarter">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">${note.title}</p>
            </header>
            <div class="card-content">
                <div class="content">${note.note}</div>
            </div>
            <footer class="card-footer">
                <a  id="${noteId}" href="#" class="card-footer-item"
                    onclick="deleteNote('${noteId}')">
                    Delete
               </a>
               <a href="#" class="card-footer-item"
                  onclick="editNote('${noteId}')">
                    Edit
                </a>
            </footer>
        </div>
    </div>
    `;
};

const deleteNote = (noteId) => {
    console.log(`Deleting note: ${noteId}`);
    firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
};

const editNote = (noteId) => {
    console.log(`Editing note: ${noteId}`);

    editedNoteId = noteId;

    // Show the modal dialog
    const editNoteModal = document.querySelector("#editNoteModal");
    
    // Get the text from the note in the database
    const notesRef = firebase.database().ref(`users/${googleUserId}/${noteId}`);
    notesRef.on('value', snapshot => {
        const data = snapshot.val();
        
        document.querySelector("#editTitleInput").value = data.title;
        document.querySelector("#editTextInput").value = data.note;
        

    });

    // Show the text from the database in the modal
    editNoteModal.classList.toggle('is-active');

};

const closeEditModal = () => {
    const editNoteModal = document.querySelector("#editNoteModal");
    editNoteModal.classList.toggle("is-active");
    
    // const saveButton = querySelector("#save-button");
    // saveButton.onclick = () => {
    //     saveEditedNote(noteId)
    // }
};

const saveEditedNote = () => {
    const newTitle = document.querySelector("#editTitleInput").value;
    const newNote = document.querySelector("#editTextInput").value;

    firebase.database().ref(`users/${googleUserId}/${editedNoteId}`)
        .update({
            title: newTitle,
            note: newNote
        })
    
    closeEditModal();
};