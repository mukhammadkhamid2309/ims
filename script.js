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
     firebase.database().ref('qr/'+decodedText+'/').on('value', function (snapshot) {
       var values = snapshot.val();
          var text = '<div><table style = "text-align: left; font-size: 14px;"><tbody>'
        if(values.tanggal){
           text = text + '<tr><td> Tanggal </td> <td> : </td> <td>'+ values.tanggal+ '</td></tr>';
        }if(values.vessel){
        text = text + '<tr><td> Kapal </td> <td> : </td> <td>'+ values.vessel+ '</td></tr>';
        }if(values.suplier){
        text = text + '<tr><td> Suplier </td> <td> : </td> <td>'+ values.suplier+ '</td></tr>';
        }if(values.material){
        text = text + '<tr><td> Material </td> <td> : </td> <td>'+ values.material+ '</td></tr>';
        }if(values.material_number){
        text = text + '<tr><td> Material Number </td> <td> : </td> <td>'+ values.material_number+ '</td></tr>';
        }if(values.gudang){
        text = text + '<tr><td> Gudang </td> <td> : </td> <td>'+ values.gudang+ '</td></tr>';
        }if(values.quantity){
        text = text + '<tr><td> Quantity </td> <td> : </td> <td>'+ values.quantity+ ' '+ values.satuan+ '</td></tr>';
        }if(values.catatan){
        text = text + '<tr><td> Catatan </td> <td> : </td> <td>'+ values.catatan+ '</td></tr>';
        }
        text = text + '</tbody></table></div>';
        text = text + '<div><button onclick = "scanner()"> Back To SCAN</button></div>';
        resultElement.innerHTML = text; 
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


    $(document).ready(function() {

    scanner();
    });
function scanner(){

    const resultElement = document.getElementById("result");
   resultElement.innerHTML = 'Result will be displayed here.'; 
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
}
