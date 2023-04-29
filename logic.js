function calculateTotal() {
  let total = 0;
  let table = document.getElementById("tablebody");

  // Loop through each row in the table
  for (let i = 0; i < table.rows.length; i++) {
    // Get the value from the last column of the current row
    let cell = table.rows[i].cells[table.rows[i].cells.length - 1]; // Assuming the last column contains the values to be summed up
    let value = parseFloat(cell.textContent);

    // Add the value to the running total
    total += value;
  }

  return total;
}
let cnt=1 // serial number
function addRow() {
  // Get the table body element in which you want to add row
  let table = document.getElementById("tablebody");

  // Create row element
  let row = document.createElement("tr")

  // get the values entered in the form
  let date = document.getElementById("date").value;
  let consignee = document.getElementById("Consignee").value;
  let weight = document.getElementById("Weight").value;
  let amount = document.getElementById("Amount").value;
  let dest = document.getElementById("Dest").value;


  // Create cells
  let c1 = document.createElement("td")
  c1.contentEditable = true;
  c1.innerHTML = cnt++;
  let c2 = document.createElement("td")
  c2.contentEditable = true;
  c2.innerHTML = date;
  let c3 = document.createElement("td")
  c3.contentEditable = true;
  c3.innerHTML = consignee;
  let c4 = document.createElement("td")
  c4.contentEditable = true;
  c4.innerHTML = dest;
  let c5 = document.createElement("td")
  c5.contentEditable = true;
  c5.innerHTML = weight;
  let c6 = document.createElement("td")
  c6.contentEditable = true;
  c6.innerHTML = amount;

  // Append cells to row
  row.appendChild(c1);
  row.appendChild(c2);
  row.appendChild(c3);
  row.appendChild(c4);
  row.appendChild(c5);
  row.appendChild(c6);

  // Append row to table body
  table.appendChild(row)

  // Call the calculateTotal() function to get the total amount
  let totalAmount = calculateTotal();

  // Update the text content of the last td element with the total amount
  document.getElementById("total-amount").textContent = totalAmount;

}

function deleteRow() {
  //the table that should be eliminated
  let elmtTable = document.getElementById("tablebody");
  // rows in the table body 
  let tableRows = elmtTable.getElementsByTagName("tr");
  // number of rows 
  let rowCount = tableRows.length;
  // Delete the last row
  if (rowCount > 0) {
    elmtTable.deleteRow(rowCount - 1);
    cnt--;
  }

  // Call the calculateTotal() function to get the total amount
  let totalAmount = calculateTotal();

  // Update the text content of the last td element with the total amount
  document.getElementById("total-amount").textContent = totalAmount;

}

function createPDF() {
  let doc = new jsPDF();
  let table = document.getElementById("mytable");

  //updating the total
  // Call the calculateTotal() function to get the total amount
  let totalAmount = calculateTotal();

  // Update the text content of the last td element with the total amount
  document.getElementById("total-amount").textContent = totalAmount;

  // Set the font size and style
doc.setFontSize(18);
doc.setFontStyle('bold');

// Add the headline
doc.text('INVOICE', 90, 10);

// Set the font size and style for the remaining text
doc.setFontSize(12);
doc.setFontStyle('normal');

// Add the date, time, and place
const date = new Date();
doc.text(`Date: ${date.toLocaleDateString()}`, 150, 20);
doc.text(`Time: ${date.toLocaleTimeString()}`, 150, 25);
doc.text('Place: India', 150, 30);

// Draw a horizontal line to separate the header from the content
doc.setLineWidth(0.5);
doc.line(20, 40, doc.internal.pageSize.width - 20, 40);

  doc.autoTable({
    html: '#' + table.id,
    startY: 50,
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
    },
    didDrawCell: (data) => {
      // Draw borders around each cell
      doc.rect(
        data.cell.x,
        data.cell.y,
        data.cell.width,
        data.cell.height,
        data.lineWidth,
        data.lineStyle
      );
    },
    footStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.5,
      fontStyle: 'bold'
    },
  });

  // Add the seal and signature column
  doc.text('Seal & Signature', 20, 280);

  // Save the PDF
  doc.save("table.pdf");
}
