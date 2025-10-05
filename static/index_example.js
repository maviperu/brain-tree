async function uploadFile() {
    const formData = new FormData();
    const file = document.getElementById("csvFile").files[0]
    console.log(file);
    formData.append("file", file);

   try {
       let r = await fetch('/items/3', {
        method: "GET"
        }); 
       console.log('HTTP response code:',r.status); 
       console.log(r.json());
    } catch(e) {
       console.log('Huston we have problem...:', e);
    }
    try {
       let r = await fetch('/upload', {
        method: "POST",
        body: formData,
        }); 
       console.log('HTTP response code:',r.status); 
       console.log(r.json());
    } catch(e) {
       console.log('Huston we have problem...:', e);
    }
}

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <title>CSV Upload</title>
// </head>
// <body>
//     <h1>Upload CSV File</h1>
//     <input type="file" id="csvFile" accept=".csv">
//     <button onclick="uploadFile()">Upload</button>

//     <script src="index.js"></script>
// </body>
// </html>
