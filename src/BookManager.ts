function displaytable(){
    document.getElementById("main").style.display = "block";
}
function displayaddbooks(){
    document.getElementById("add").style.visibility ="visible";
}

class Book{
    id: String;
    title: String;
    author: String;
    rating: String;
    price: String;
    coverPhotoUrl?: String;
    constructor(id: String,title: String,author: String,rating: String,price: String,coverPhotoUrl?: String) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.rating = rating;
        this.price = price;
        this.coverPhotoUrl = coverPhotoUrl;
}
};


 let Books:Book[] =[];
 var j=0;
 var table = document.getElementById("booktable");


 class bookManager{

     addBook = (e:Event) =>{
         e.preventDefault();
         let id = (<HTMLInputElement>document.getElementById("Id")).value;
         let title = (<HTMLInputElement>document.getElementById("Title")).value;
         let author = (<HTMLInputElement>document.getElementById("Author")).value;
         let rating =(<HTMLInputElement>document.getElementById("Rating")).value;
         let price = (<HTMLInputElement>document.getElementById("Price")).value;
         Books.push(new Book(id, title, author, rating, price));
         (<HTMLInputElement>document.getElementById("Id")).value = '';
         (<HTMLInputElement>document.getElementById("Title")).value = '';
         (<HTMLInputElement>document.getElementById("Author")).value = '';
         (<HTMLInputElement>document.getElementById("Rating")).value = '';
         (<HTMLInputElement>document.getElementById("Price")).value = '';

    

        {

            var row =`<tr id="row-${j+1}">
            <td>${Books[j].id}</td>
            <td>${Books[j].title}</td>
            <td>${Books[j].author}</td>
            <td>${Books[j].price}</td>
            <td>${Books[j].rating}</td>

           <td>

           <button  id="row-${j+1}" style="background:rgb(84,84,196);color:white;border-radius:5px;border=none;" onclick = "Delete(${Books[j].id})">Delete</button>
           </td>

            </tr>`
        
            document.getElementById('tableBody').innerHTML += row;
        }


        localStorage.setItem("MyBooks", JSON.stringify(Books));
        j++;
    }
  
 }
let book = new bookManager();
let add = document.querySelector("form");
if(add != null)add.addEventListener("submit",book.addBook);

// function Delete(r){
//     let i = r.parentNode.parentNode.rowIndex;
//     document.getElementById("booktable").deleteRow(i);
//     localStorage.removeItem('MyBooks');
//  }

 function Delete(bookid){
    console.log(bookid);
    for(let x=0;x<Books.length;x++){
        if(bookid == Books[x].id){
        // let ind = Books.indexOf(Books[x].id);
        Books.splice(x,1);
        }
    }
    console.log(Books);
    (<HTMLInputElement>document.getElementById("mysearch")).value = '';
    resultTable(Books);
 }
 


function resultTable(data:Book[]){
    //const tableBody =document.getElementById("booktable");
    let dataHtMl = '' , op = 0;
    for(let book of data){
        dataHtMl += `<tr id=tab-${op+1}>
                  <td>${book.id}</td>
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.price}</td>
                  <td>${book.rating}</td>
                  <td>  <button id="row-${op+1}" style="background:rgb(84,84,196);color:white;border-radius:5px;border=none;" onclick = "Delete(${book.id})">Delete</button></td>
                 </tr>`               
        op++;
    }
    // j=Books.length;
    //console.log(dataHtMl);
    // console.log(table);
    document.getElementById('tableBody').innerHTML= '';
    document.getElementById('tableBody').innerHTML = dataHtMl;

}

function searchById(Books,inputText){
    let output = [];
    for(let i=0;i<Books.length;i++){
        if(inputText == Books[i].id){
            output.push(Books[i]);
        }
    }
    console.log(output);
    return output;
}

function searchByTitle(Books,inputText){
    let output = [];
    for(let k = 0 ; k < Books.length ; k++){
        inputText = inputText.toLowerCase();
        let Title = Books[k].title.toLowerCase();
        if(Title.includes(inputText)){
            output.push(Books[k]);
        }
    }
    return output;
}

function searchByAuthor(Books,inputText){
    let output = [];
    for(let l=0;l<Books.length;l++){
        inputText = inputText.toLowerCase();
        let Author = Books[l].author.toLowerCase();
        if(Author.includes(inputText)){
            output.push(Books[l]);
        }
    }
    return output;
}

function searchByPrice(Books,inputText){
    let output = [];
    for(let m=0;m<Books.length;m++){
        console.log(inputText , Books[m].price);
        if(parseInt(inputText)>=parseInt(Books[m].price)){
            output.push(Books[m]);
        }
    }
    console.log(output);
    return output;
}

function searchByRating(Books,inputText){
    let output = [];
    for(let n=0;n<Books.length;n++){
        if(parseInt(inputText)>=parseInt(Books[n].rating)){
            output.push(Books[n]);
        }
    }
    return output;
}


function search(){
    let option = (<HTMLInputElement>document.getElementById("selection")).value;
    let inputText = (<HTMLInputElement>document.getElementById("mysearch")).value;
    console.log(option);
    console.log(inputText);
    switch(option){
        case "Id":
            let id1 = searchById(Books,inputText);
            resultTable(id1);
            break;
        case "Title":
            let title1=searchByTitle(Books,inputText);
            resultTable(title1);
            break;
        case "Author":
            let author1=searchByAuthor(Books,inputText);
            resultTable(author1);
            break;
        case "Price":
            let price1 = searchByPrice(Books,inputText);
            resultTable(price1);
            break;
        case "Rating":
            let rating1 = searchByRating(Books,inputText);  
            resultTable(rating1);
            break;
        default:
            break;                
    }
}

/* function placeHoder(){
    let dropVal = (<HTMLInputElement>document.getElementById("selection")).value;
    document.getElementById('mysearch').placeholder = dropVal == 'Price' || dropVal == 'Rating' ? 'Enter The Range... ' : 'search here...';
} */
    

