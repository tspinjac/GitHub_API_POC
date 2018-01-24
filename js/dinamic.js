
// 1.Kreiraj PARENT, container (uz dinamički css i postavljanje iznad skripte)
var divContainer = document.createElement("div");
divContainer.id="container";
divContainer.setAttribute("style"," margin:10px; max-height:700px; max-width:300px; border: 3px solid #73AD21; ");
document.body.appendChild(divContainer);//dodaj ga u BODY
//dodati divContainer iznad skripte: 1) selektiraj skriptu 2)insertBefore  YAY! :D
var scriptElement = document.querySelector("script");
document.body.insertBefore(divContainer, scriptElement);

//1.1: Header containera  (uz dinamički CSS)
var divHeader = document.createElement("header");
divHeader.id="header";
divHeader.setAttribute("style"," background-color: #24292e; color:white; text-align: left; font-size:1.2em; padding:10px; ");
divHeader.innerHTML = "Github Users:"
divContainer.appendChild(divHeader);//dodaj ga u container kao PRVO dijete

alert("onload");
kreirajListu();




function brisiListu()
{
    alert("brisem");
    var temp = document.querySelector("section");
    
    temp.parentNode.removeChild(temp);
}
function kreirajListu(){
//divContainer = document.querySelector(divContainer)
divContainer = document.getElementById("container");
alert(divContainer);
alert("kreiram");
  //1.2: SECTION, drugo dijete containera (uz dinamički css)
var section = document.createElement("section");
section.id = "section";
section.setAttribute("style"," max-height:400px; max-width:300px; background-color: #e6eae6; padding:10px; overflow-y: scroll;");
section.innerHTML = ""; //placeholder
divContainer.appendChild(section);//dodaj ga u container kao DRUGO dijete

//1.3 Kreirati OL child i apendati u SECTION kao prvo dijete 
var nav = document.createElement("ol");
nav.id = "nav";
section.appendChild(nav); //Dodajemo OL u section

//2. FETCH sa Googla https://developers.google.com/web/updates/2015/03/introduction-to-fetch
fetch('https://api.github.com/users') //30 je default...
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            // Examine the text in the response for USERS via GITHUB API
            response.json().then(function(data) {
                console.log(data); //JSON sada imamo

                //3.vrtimo Array i stvaramo za svaki element li, dajemo mu vrijednost logina i appendamo ga na RODITELJ - OL sa id "nav"
                data.forEach(function(elementi) {
                    
                //CASCHIRAS SAMO PROMJENE; ako ne postoji ID usera u cachu, //var user = ;
                
                var vrijednost = localStorage.getItem(elementi.login);
                if(vrijednost==null){
                    var listItem = document.createElement("li");//dinamički kreiramo list items
                    listItem.innerHTML = "<a onclick=mojafunkcija('"+elementi.login+"') href=#>" + elementi.login + "</a>"; 
                    nav.appendChild(listItem); //li elemente smo dodati u nav ol! RADI! :D
                }
                });

                /* 4. CACHING-TO DO: Local storage needs strings (key:value pairs ARE STRINGS) */
                                
                console.log(pod);
                var pod = localStorage.getItem('');
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });  
}

function mojafunkcija(parametar, document){
localStorage.setItem(parametar, parametar);

brisiListu();

kreirajListu();

userDetails(parametar);

}
//kreiramo div za user details
function userDetails(parametar) {
    var divContainer2 = window.document.createElement("div");
    divContainer2.id="container2";
    divContainer2.innerHTML = "Hello "
    divContainer2.setAttribute("style"," margin:10px; max-height:700px; max-width:300px; border: 3px solid #73AD21; ");
    window.document.body.appendChild(divContainer2);//dodaj ga u BODY

  // var zatvoriX = window.document.createElement("p");

alert("fetch");
//pozvati api za details o useru
fetch('https://api.github.com/users/'+parametar) //30 je default...
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }
            // Examine the text in the response for USERS via GITHUB API
            response.json().then(function(data) {
                console.log(data); //JSON sada imamo

                //3.vrtimo Array i stvaramo za svaki element li, dajemo mu vrijednost logina i appendamo ga na RODITELJ - OL sa id "nav"
              
                
                    
                //CASCHIRAS SAMO PROMJENE; ako ne postoji ID usera u cachu, //var user = ;
                    alert("BLALALALA");
                    var listItem = window.document.createElement("div");
                    listItem.innerHTML = "Repos:" + data.public_repos+".";
                    window.document.body.appendChild(listItem); //li elemente smo dodati u nav ol! RADI! :D
                
                

                
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });  
}

