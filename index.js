let addFileIcon = document.getElementById("head_info");
let table = document.querySelector(".table");
let tbody = document.getElementById("tbody");
let inp = document.querySelector("#inp");
let btnDelAll = document.querySelector(".btn");
// for drag drop from desktop
addFileIcon.ondragover = e => e.preventDefault();
addFileIcon.ondrop = function(e) {
    e.preventDefault();
    unloadImage(e.dataTransfer.files)
    table.style.display ="table";
}
// for get file input 
addFileIcon.onclick = e=>inp.click();
inp.onchange = function (e) {
    unloadImage(e.target.files)
    table.style.display ="table";
}
// for write data table
let count = 1;
function unloadImage(file) {
    [...file].forEach(file => {
        let reader = new FileReader();
        reader.onloadend = function(e) {
            let tr = `
            <tr>
                <th scope="row">${count++}</th>
                <td><img src="${e.target.result}" alt="" width="100px"></td>
                <td>${file.name}</td>
                <td>${file.size}</td>
                <td><i  onclick="delItem(this)" class="fa-solid fa-xmark"></i></td>
            </tr>
            `;
            tbody.innerHTML+=tr;
        }
        reader.readAsDataURL(file);
      
    })
}
// delete all btn
btnDelAll.onclick = function (e){
    tbody.innerHTML = "";
    table.style.display ="none";
    count = 1;
};
// welcome spagetti
function delItem(e) {
        e.parentElement.parentElement.remove();
        let allRowOrder = document.querySelectorAll("tbody>tr>th");
        count=1;
        [...allRowOrder].forEach(item=>item.innerHTML=count++);
        if (allRowOrder.length === 0) {
            tbody.innerHTML = "";
            table.style.display ="none";
            count = 1;
        }
}
