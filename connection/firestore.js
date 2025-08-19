import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Assuming 'db' is initialized from the previous step

async function getRoomDetails() {
  // Create a reference to the specific document
  const actRef = doc(db, "acts", "TheInfilreation");

  // Fetch the document
  const docSnap = await getDoc(roomRef);

  if (docSnap.exists()) {
    console.log("Room data:", docSnap.data());
    // Now you can use the data to update your UI
    // For example: document.getElementById('actitle').innerText = docSnap.data().name;
  } else {
    console.log("No such room found!");
  }
}

// Call the function to get the data
getRoomDetails();
