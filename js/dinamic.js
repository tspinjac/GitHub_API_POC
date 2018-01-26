/* */
alert("Započni...");

/* ======================================= */
createContainer();
createList();
/* ======================================= */


/* ######## GLAVNE FUNKCIJE ######## */
function createContainer () {

   
    var createLoader = document.createElement("div");
        createLoader.id = "loader";
        createLoader.setAttribute("style", "display:none; ");
       
       /*var createImg = document.createElement("div");
            createImg.id = "loader";
        createLoader.appendChild(createImg);*/

    document.body.appendChild(createLoader);

   
    //1. Create and append divContainer; #container;  (dynamic CSS)
    var divContainer = document.createElement("div");
        divContainer.id = "container";
        divContainer.setAttribute("style", " margin:10px; max-height:700px; max-width:300px; border-radius: 5px; border: 3px solid #73AD21; ");
        document.body.appendChild(divContainer); //dodaj ga u BODY
        alert("Kreiran container div");
    

    //1.2. Create and append container HEADER; #header;  (dynamic CSS)
    var divHeader = document.createElement("header");
        divHeader.id = "header";
        divHeader.setAttribute("style", " background-color: #24292e; color:white; text-align: left; font-size:1.2em; padding:10px; ");
        divHeader.innerHTML = "Github Users:"
        divContainer.appendChild(divHeader); //dodaj ga u container kao PRVO dijete
/*
    var btnX = document.createElement("span");
        btnX.id = "btnX";
        btnX.setAttribute("style", " position:absolute; top:0; right:5px; color:white; font-weight: bold; font-size:1.2em; ");
        btnX.innerHTML = "&#10006;";
        divHeader.appendChild(btnX); 
        */
        var btnId = "btnX";
        kreirajX(btnId, divHeader);
        document.querySelector("#"+btnId).addEventListener("click", hide);
        function hide(){document.querySelector("#container").style.display = "none";}
}//END of createContainer

function createList() {

    //divContainer = document.querySelector("container") NE RADI???
    divContainer = document.getElementById("container");
    //alert(divContainer); Što ovo radi?
    alert("Dohvatio sam divContainer...slijedi kreiranje sectiona");

    //1.3. Creating SECTION; #section; (dynamic CSS)
    var section = document.createElement("section");
    section.id = "section";
    section.setAttribute("style", " max-height:400px; max-width:300px; background-color: #e6eae6; padding:10px; overflow-y: scroll;");
    section.innerHTML = ""; //placeholder
    divContainer.appendChild(section); //dodaj ga u container kao DRUGO dijete

    //1.4 Create OL (section first child); #nav; (no CSS)
    var nav = document.createElement("ol");
    nav.id = "nav";
    section.appendChild(nav); 

    //2. FETCH sa Googla https://developers.google.com/web/updates/2015/03/introduction-to-fetch
 document.getElementById("loader").style.display = "block";
                    //loadingImg.style.width = "300px";
                    //loadingImg.style.height = "300px";

    fetch('https://api.github.com/users') //30 je default...
        .then(

            function(response) {

                   

                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
           
                  

                response.json().then(function(data) {
                    console.log(data); //returns Javascript objects; key:"value"; (Array with js objects and I can work with objects :D) - not JSON OBJECT!

                    //Loop Array
                    data.forEach(function(elementi) {
                        
                        //1. First check storage; 2. display all users which are not in storage; CACHING IDEA: caching changes only etc. clicked items (users)
                        var storageContent = localStorage.getItem(elementi.login);//get CACHE content(storageContent); if storage emtpy, list ALL users.
                        if (storageContent == null) {
                            //If storage is empty, create li for all users...
                            var listItem = document.createElement("li"); 
                            // <a onclick = mojafunkcija('elementi.login')> elementi.login </a>; event listener is better??
                            listItem.innerHTML = "<a onclick=mojafunkcija('" + elementi.login + "') href=#>" + elementi.login + "</a>";
                            nav.appendChild(listItem); //appending to parrent - nav :D
                        }
                    });

                     document.getElementById("loader").style.display = "none";
                        
                    //Get and Check localstorage
                    var storageContent = localStorage.getItem('');
                    console.log("Numbers of items inside localstorage:", localStorage.length);
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}//END of createList



//1. Delete old section
function deleteList() {
    alert("Deleting old user list...");
    var deleteOldSection = document.querySelector("section");
    deleteOldSection.parentNode.removeChild(deleteOldSection);
}//END of deleteList

/*Main function:
1. when user (li a) is clicked it stores key:value in cach (parametar, parametar)
2. Deletes old list
3. Creates new section and lists...
4. Creates User datails view - fetch new api, get img, repos and gists
*/
function mojafunkcija(parametar) {
    localStorage.setItem(parametar, parametar);
    deleteList();

    createList();

    userDetails(parametar);

    document.querySelector("#container").style.display = "none";
}//END of mojafunkcija

//4. Creating USER DETAILS VIEW...
function userDetails(parametar) {
    //Creating HTML elements...
    var divContainer2 = window.document.createElement("div");
        divContainer2.id = "container2";
        divContainer2.setAttribute("style", " margin: auto; width: 50%; border-radius: 5px; border: 3px solid green; margin:10px; max-height:700px; max-width:300px;");
        window.document.body.appendChild(divContainer2); //dodaj ga u BODY

    var divHeader2 = document.createElement("header");
        divHeader2.id = "header2";
        divHeader2.setAttribute("style", " position: relative; background-color: #24292E; color:white; text-align: left; font-size:1.2em; padding:10px;");
        divHeader2.innerHTML = "User Details: " + parametar;
        divContainer2.appendChild(divHeader2); //first child

    var userCompany = document.createElement("p");
        userCompany.id = "userCompany";
        userCompany.setAttribute("style", "text-alighn: center; font-size:1.2em; ");
        //divContainer2.appendChild(userCompany);  company:undefined
/*
    var btnX2 = document.createElement("span");
        btnX2.id = "btnX2";
        btnX2.setAttribute("style", " position:absolute; top:0; right:5px; color:red; font-weight: bold; font-size:1.2em; ");
        btnX2.innerHTML = "&#10006;";
        divHeader2.appendChild(btnX2); 
        */
        var btn2Id = "btnX2"
        kreirajX(btn2Id, divHeader2);
        document.getElementById(btn2Id).addEventListener("click", obrisiX);
        //function hide(){document.querySelector("#container2").style.display = "none";

        //var deleteOldSection = document.querySelector("section");
        function obrisiX(){window.document.body.removeChild(document.getElementById("container2"));
        document.querySelector("#container").style.display = "block";
        //deleteOldSection.parentNode.removeChild(deleteOldSection);

    }



    //Getting data with API
    alert("Fetch user details...");
    //pozvati api za details o useru i ostalo...
    document.getElementById("loader").style.display = "block";
    fetch('https://api.github.com/users/' + parametar) //30 je default...
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                
                response.json().then(function(data) {
                    console.log("User details: ", data); 
                    //Creating section and display data...
                    var userDetailsSection = window.document.createElement("section");
                    //userCompany.innerText = data.avatar_url;
                    userDetailsSection.innerHTML = "<img src=" + data.avatar_url + ">" + "<br>"
                                                    + "<p> Company: " 
                                                    + data.company + "</p><br>"
                                                    + "Repos:" + data.public_repos + "  "
                                                    + "Gists:" + data.public_gists;
                    divContainer2.appendChild(userDetailsSection);
                    document.getElementById("loader").style.display = "none";
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}//END of userDetails


function kreirajX(btnId, header){

    var btnX = document.createElement("span");
        btnX.id = btnId;
        btnX.setAttribute("style", " position:absolute; top:0; right:5px; color:white; font-weight: bold; font-size:1.2em; ");
        btnX.innerHTML = "&#10006;";
        header.appendChild(btnX); 

}

