let userName;

window.onload = () => {
    // When page loads, check user logged in state
    firebase.auth().onAuthStateChanged((user) => {
        
        if (user) {
            //  If logged in, get user's notes from db
            const googleUserId = user.uid;
            userName = user.displayName;
            console.log("UN: ", userName)
            getNotes(googleUserId);
    
        } else {
            // If not logged in redirect to log in page
            window.location = 'index.html';
        }

    })
}

// Get notes from db, display notes on page
const getNotes = (userId) => {
    console.log(userId);
    const userRef = firebase.database().ref(`users/${userId}`);
    userRef.on('value', snapshot => {
        const data = snapshot.val();
        writeNotesToHtml(data);
    })
};

const writeNotesToHtml = (data) => {
    // Put all html into page at once
    const labelDropdown = document.querySelector("#labels-dropdown");
    const noteRenderArea = document.querySelector('#app');
    for (let noteKey in data) {
        // Create html string for one note
        let noteHtml = createHtmlForNote(data[noteKey]);
        console.log("data: ", data);
        console.log("data[noteKey]: ", data[noteKey]);
        noteRenderArea.innerHTML += noteHtml;

        let labelHtml = addLabelDropdown(data[noteKey]);
        labelDropdown.innerHTML += labelHtml;
    }
};


const filterOnLabel = (note) => {
    noteRenderArea.innerHTML = "";
    // writeNotesToHtml(note);
    // let label-card = document.querySelector(`card-${note.label}`);
    
    // noteRenderArea.innerHTML += card;
};

// .remove() + condition
// Remove all elements that don't have matching labels

const addLabelDropdown = (note) => {
    console.log("SUCCESS");
    return `<a onclick="filterOnLabel(${note})" class="dropdown-item">
                ${note.label}
            </a>`;
};

const createHtmlForNote = (note) => {
    console.log(note);
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    //TODO: create html and put in the note data
    return `<div class="column is-one-third">
                <div class="card" style="background-color: #${randomColor}">
                    <header class="card-header">
                        <p class="card-header-title" style="color: white">
                            ${note.title}
                        </p>
                        <p class="subtitle is-6" style="color: white">
                            ${userName}
                        </p>
                    </header>
                    <div class="card-content " style="color: white">
                        <div class="content">
                            ${note.note}
                        </div>
                    </div>
                </div>
            </div>`;
};