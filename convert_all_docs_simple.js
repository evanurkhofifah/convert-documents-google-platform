/* Fungsi untuk mengonversi semua file di dalam sebuah folder Google Drive menjadi file PDF, 
lalu menyimpannya kembali ke dalam folder yang sama.*/
function convert_to_pdf(folder) {
  var folder = DriveApp.getFolderById("1kKjimtuR5yds2ZdIyR2BA-0cgbC4mjwo");
  var invoices = folder.getFiles();

  // Perulangan untuk mengonversi semua file menjadi format pdf
  while (invoices.hasNext()) {
    var invoice = invoices.next();
    var id = invoice.getId();
    var file = DriveApp.getFileById(id);
    var theBlob = file.getBlob().getAs('application/pdf');
    var newPDFFile = folder.createFile(theBlob);

    var fileName = file.getName().replace(".", "");
    newPDFFile.setName(fileName + ".pdf");
  }
}
