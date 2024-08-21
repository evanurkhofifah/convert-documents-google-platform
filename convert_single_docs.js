// Fungsi untuk mengonversi dokumen Google Docs menjadi PDF dan menyimpannya di dalam folder tertentu di Google Drive
function docs_to_pdf(fileID) {
  var pdfFolder = DriveApp.getFolderById("1kKjimtuR5yds2ZdIyR2BA-0cgbC4mjwo"); 
  var docFile = DriveApp.getFileById("1zAfrs0j1GTVSCfzxEdmMIi5BM5giwx3aobnd7O115N4")
  
  // Memanggil fungsi createPDF dengan parameter ID file dan ID folder tempat menyimpan PDF
  createPDF(docFile.getId(), pdfFolder.getId(), function (fileID, folderID) {
    if (fileID) createPDFfile(fileID, folderID);
  }
 )
}

// Fungsi untuk memeriksa apakah file PDF yang sesuai sudah ada di dalam folder. Jika belum ada, maka file akan dibuat.
function createPDF(fileID, folderID, callback) {
    var templateFile = DriveApp.getFileById(fileID);
    var templateName = templateFile.getName();
    
    var existingPDFs = DriveApp.getFolderById(folderID).getFiles();

    // Jika folder kosong, maka lanjutkan untuk membuat PDF 
    if (!existingPDFs.hasNext()) {
        return callback(fileID, folderID);
    }

    // Memeriksa setiap file yang ada di dalam folder untuk melihat apakah file PDF yang sesuai sudah ada.
    for (; existingPDFs.hasNext();) {

        var existingPDFfile = existingPDFs.next();
        var existingPDFfileName = existingPDFfile.getName();

        // Jika nama file PDF yang ada sama dengan nama template file, maka log pesan dan hentikan proses pembuatan PDF baru.
        if (existingPDFfileName == templateName + ".pdf") {
            Logger.log("PDF exists already. No PDF created")
            return callback();
        }

        // ika tidak ada file PDF yang sesuai ditemukan sampai akhir loop, maka callback function dipanggil untuk membuat PDF baru.
        if (!existingPDFs.hasNext()) {
            Logger.log("PDF is created")
            return callback(fileID, folderID)
        }
    }
}

// Fungsi ini untuk mengonversi file dokumen menjadi PDF dan menyimpannya di folder yang ditentukan.
function createPDFfile(fileID, folderID) {
    var templateFile = DriveApp.getFileById(fileID);
    var folder = DriveApp.getFolderById(folderID);
    var theBlob = templateFile.getBlob().getAs('application/pdf');
    var newPDFFile = folder.createFile(theBlob);

    var fileName = templateFile.getName().replace(".", "");   
    newPDFFile.setName(fileName + ".pdf");
}
