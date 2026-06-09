let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editIndex = -1;

const popup = document.getElementById("popup");
const notesGrid = document.getElementById("notesGrid");

document.getElementById("addBtn").onclick = () => {
    popup.style.display = "flex";
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    editIndex = -1;
};

function closePopup(){
    popup.style.display = "none";
}

function saveNote(){

    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    if(title === "" || content === ""){
        alert("Fill all fields");
        return;
    }

    let note = {
        title,
        content,
        date:new Date().toLocaleString()
    };

    if(editIndex === -1){
        notes.push(note);
    }else{
        notes[editIndex] = note;
    }

    localStorage.setItem("notes",
        JSON.stringify(notes));

    closePopup();
    displayNotes();
}

function displayNotes(){

    notesGrid.innerHTML = "";

    notes.forEach((note,index)=>{

        notesGrid.innerHTML += `
        <div class="note">
            <h3>${note.title}</h3>
            <p>${note.content}</p>

            <small>${note.date}</small>

            <div class="actions">
                <button class="edit"
                    onclick="editNote(${index})">
                    Edit
                </button>

                <button class="delete"
                    onclick="deleteNote(${index})">
                    Delete
                </button>
            </div>
        </div>
        `;
    });
}

function editNote(index){

    popup.style.display="flex";

    document.getElementById("title").value =
        notes[index].title;

    document.getElementById("content").value =
        notes[index].content;

    editIndex = index;
}

function deleteNote(index){

    if(confirm("Delete this note?")){
        notes.splice(index,1);

        localStorage.setItem("notes",
            JSON.stringify(notes));

        displayNotes();
    }
}

document.getElementById("searchInput")
.addEventListener("keyup",function(){

    let value = this.value.toLowerCase();

    let cards = document.querySelectorAll(".note");

    cards.forEach(card=>{

        let text =
        card.innerText.toLowerCase();

        card.style.display =
        text.includes(value)
        ? "block"
        : "none";
    });
});

displayNotes();
