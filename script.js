// Get Data
   const firebaseConfig = {
  apiKey: "AIzaSyD6g-wvSHXMXN12aMYeb-hBAnfAFmg0awQ",
  authDomain: "imslabel.firebaseapp.com",
  projectId: "imslabel",
     databaseURL: "https://imslabel-default-rtdb.firebaseio.com",
  storageBucket: "imslabel.firebasestorage.app",
  messagingSenderId: "247296225932",
  appId: "1:247296225932:web:6184473a83d057a64641a9",
  measurementId: "G-9J7RRMMSLW"
};
   firebase.initializeApp(firebaseConfig);
   var database = firebase.database();

// Initialize the HTML5 QR Code Scanner
const html5QrCode = new Html5Qrcode("reader");

// Function to handle success scanning
function onScanSuccess(decodedText, decodedResult) {
    // Show the scanned result
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `<strong>${decodedText}</strong>`;
     firebase.database().ref('0/').on('value', function (snapshot) {
       var values = snapshot.val();
          alert(values.material);
      });


    
    console.log(`Decoded Text: ${decodedText}`, decodedResult);

    // Stop the scanner after successful scan
    html5QrCode.stop().then(() => {
        console.log("Scanner stopped.");
    }).catch(err => {
        console.error("Failed to stop scanner:", err);
    });
}

// Function to handle scanning errors
function onScanFailure(error) {
    // Errors are ignored in this example
    console.warn(`Scan failed: ${error}`);
}

// Start the scanner
html5QrCode.start(
    { facingMode: "environment" }, // Use rear camera
    {
        fps: 10, // Scans per second
        qrbox: { width: 250, height: 250 } // QR code scanning area size
    },
    onScanSuccess,
    onScanFailure
).catch(err => {
    console.error("Failed to start scanner:", err);
});

