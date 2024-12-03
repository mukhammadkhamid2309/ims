// Get Data
    var firebaseConfig = {
     apiKey: "AIzaSyDDTRU6rb-g14apb2UpL3g83HK4FRenYTE",
     authDomain: "smart-sounder-control.firebaseapp.com",
     databaseURL: "https://smart-sounder-control-default-rtdb.firebaseio.com",
     projectId: "smart-sounder-control",
     storageBucket: "smart-sounder-control.appspot.com",
     messagingSenderId: "25217180899",
     appId: "1:25217180899:web:072dd2b8a3c6d4b56dd1d6",
     measurementId: "G-ZSGMVKNCY3"
   };
   firebase.initializeApp(firebaseConfig);
   var database = firebase.database();

    // Get Data
   



// Initialize the HTML5 QR Code Scanner
const html5QrCode = new Html5Qrcode("reader");

// Function to handle success scanning
function onScanSuccess(decodedText, decodedResult) {
    // Show the scanned result
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `<strong>${decodedText}</strong>`;

     firebase.database().ref('/').on('value', function (snapshot) {
    var values = snapshot.val();

   
         
    resultElement.innerHTML = `<strong>${decodedText}${values.indikasi} </strong>`;


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

