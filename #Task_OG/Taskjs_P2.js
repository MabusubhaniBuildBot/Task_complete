let x = 0;
var loadFile = function (event) {
    x = event.target.files[0];
    console.log(x)
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};
console.log(x)
var totalPrize = 0;
var previousPrize = 0;
let selectedRow = null;
function onFormSubmit() {
    console.log(x);
    let formdata = readFormdata();
    if (selectedRow == null) {
        inseRnewrec(formdata)
    }
    else {
        updateData(formdata);
    }
   
    resetForm();
};
//Getting the data from the form input
function readFormdata() {
    let formdata = {};
    formdata["output"] = document.getElementById("output").value;
    formdata["p_bRand"] = document.getElementById("p_bRand").value;
    formdata["p_nAme"] = document.getElementById("p_nAme").value;
    formdata["p_Model"] = document.getElementById("p_Model").value;
    formdata["p_color"] = document.getElementById("p_color").value;
    formdata["prize"] = document.getElementById("prize").value;
    formdata["textarea"] = document.getElementById("textarea").value;

    return (formdata);
}
function inseRnewrec(data) {
    let table = document.getElementById("table-data").getElementsByTagName('tbody')[0]
    let newRow = table.insertRow(table.length);
    console.log(data)

    let cell1 = newRow.insertCell(0);
    let image = document.createElement("img");
    image.src = URL.createObjectURL(x);
    image.alt = data.name;
    image.width = 100;
    cell1.appendChild(image);

    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.p_bRand;

    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.p_nAme;

    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.p_Model;


    let cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.p_color;

    let cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.prize;

    let cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.textarea;

    let cell8 = newRow.insertCell(7);;
    cell8.innerHTML = `<button onclick="onEdit(this)">Edit</button> `

    let cell9 = newRow.insertCell(8);;
    cell9.innerHTML = `<button onclick="onDelete(this)">Delete</button>`



    totalPrize += parseInt(data.prize)
    document.getElementById("totalvalue").innerHTML = totalPrize;
}

//Edit the form
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    previousPrize = selectedRow.cells[5].innerHTML
    totalPrize = totalPrize - previousPrize
    document.getElementById("output").value = selectedRow.cells[0].innerHTML;
    document.getElementById("p_bRand").value = selectedRow.cells[1].innerHTML;
    document.getElementById("p_nAme").value = selectedRow.cells[2].innerHTML;
    document.getElementById("p_Model").value = selectedRow.cells[3].innerHTML;
    document.getElementById("p_color").value = selectedRow.cells[4].innerHTML;
    document.getElementById("prize").value = selectedRow.cells[5].innerHTML;
    document.getElementById("textarea").value = selectedRow.cells[6].innerHTML;
    document.getElementById("subbtn").value = "Update Product";
    document.getElementById("totalvalue").innerHTML = totalPrize;
}
function updateData(formdata) {
    let oldImg = selectedRow.cells[0].querySelector("img");
    
    // Create a new img element
    let Newimage = document.createElement("img");
    Newimage.src = URL.createObjectURL(x);
    Newimage.alt = "New image description";
    Newimage.width = 100;

    // Replace the existing img element with the new one
    selectedRow.cells[0].replaceChild( Newimage, oldImg);
    selectedRow.cells[1].innerHTML = formdata.p_bRand;
    selectedRow.cells[2].innerHTML = formdata.p_nAme;
    selectedRow.cells[3].innerHTML = formdata.p_Model;
    selectedRow.cells[4].innerHTML = formdata.p_color;
    selectedRow.cells[5].innerHTML = formdata.prize;
    selectedRow.cells[6].innerHTML = formdata.textarea;
    totalPrize += parseInt(formdata.prize);
    selectedRow = null; // reset selectedRow
    document.getElementById("subbtn").value = "Add Product";
    document.getElementById("totalvalue").innerHTML = totalPrize;
}

//delete r remove 
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        //console.log("mytable",row.cells[4].innerHTML)
        document.getElementById("table-data").deleteRow(row.rowIndex);
        let a = row.cells[5].innerHTML
        totalPrize -= parseInt(a)
        document.getElementById("totalvalue").innerHTML = totalPrize;
        resetForm();
    }
}
// Reset function
function resetForm() {
    var image = document.getElementById('output');
    image.src = "";
    document.getElementById("p_details").value = " ";
    document.getElementById("p_bRand").value = " ";
    document.getElementById("p_nAme").value = " ";
    document.getElementById("p_Model").value = " ";
    document.getElementById("p_color").value = " ";
    document.getElementById("prize").value = " ";
    document.getElementById("totalvalue").value = " ";
    document.getElementById("textarea").value = " ";
    selectedRow = null;
    resetFile();
}
function resetFile() {
    var image = document.getElementById('output');
    image.src = "";
    var fileInput = document.querySelector('input[type="file"]');
    fileInput.value = "";
}