/* == For Kraken Systems miniproject, Tomislav == */


createContainer();
createList();

function createContainer () {   
    var createLoader = document.createElement("div");
        createLoader.id = "loader";
        createLoader.setAttribute("style", "display:none; "); 
        document.body.appendChild(createLoader);
   
    var divContainer = document.createElement("div");
        divContainer.id = "container";
        divContainer.setAttribute("style", " margin:10px; max-height:700px; max-width:300px; border-radius: 5px; border: 3px solid #73AD21; ");
        document.body.appendChild(divContainer); 
       
    var divHeader = document.createElement("header");
        divHeader.id = "header";
        divHeader.setAttribute("style", " max-width:100%; background-color: #24292e; color:white; text-align: left; font-size:1.2em; padding:10px; ");
        divHeader.innerHTML = "Github Users:"
        divContainer.appendChild(divHeader); 

        //
    var btnId = "btnX";
        createX(btnId, divHeader);
        document.querySelector("#"+btnId).addEventListener("click", hide);
        function hide(){document.querySelector("#container").style.display = "none";}
}//END of createContainer

function createList() {
    divContainer = document.getElementById("container");
    var section = document.createElement("section");
    section.id = "section";
    section.setAttribute("style", " max-height:400px; max-width:300px; background-color: #e6eae6; padding:10px; overflow-y: scroll;");
    divContainer.appendChild(section); 

    var nav = document.createElement("ol");
    nav.id = "nav";
    section.appendChild(nav); 

    //Animacija: show animation during load ...
    document.getElementById("loader").style.display = "block";
                  
    //2. FETCH sa Googla https://developers.google.com/web/updates/2015/03/introduction-to-fetch
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

                    data.forEach(function(elementi) {
                        
                        //1. First check storage; 2. display all users which are not in storage; CACHING IDEA: caching changes only etc. clicked items (users)
                        var storageContent = localStorage.getItem(elementi.login);//get CACHE content(storageContent); if storage emtpy, list ALL users.
                        if (storageContent == null) {
                            //If storage is empty, create li for all users...
                            var listItem = document.createElement("li"); 
                            // <a onclick = mainFunction('elementi.login')> elementi.login </a>; event listener is better...
                            listItem.innerHTML = "<a onclick=mainFunction('" + elementi.login + "') href=#>" + elementi.login + "</a>";
                            nav.appendChild(listItem); 
                        }
                    });

                    //Hide loader animation when list is loaded
                    document.getElementById("loader").style.display = "none";
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}//END of createList

//1. Delete old section
function deleteList() {
    //alert("Deleting old user list...");
    var deleteOldSection = document.querySelector("#section");
    deleteOldSection.parentNode.removeChild(deleteOldSection);
}//END of deleteList

function mainFunction(parametar) {
    localStorage.setItem(parametar, parametar);
    deleteList();

    createList();

    userDetails(parametar);

    document.querySelector("#container").style.display = "none";
}//END of mainFunction

//Creating USER DETAILS VIEW...
function userDetails(parametar) {
    
    var divContainer2 = window.document.createElement("div");
        divContainer2.id = "container2";
        divContainer2.setAttribute("style", " margin: 0 auto; width: 50%; border-radius: 5px; border: 3px solid green; max-height:700px; max-width:300px;");
        window.document.body.appendChild(divContainer2); 

    var divHeader2 = document.createElement("header");
        divHeader2.id = "header2";
        divHeader2.setAttribute("style", " position: relative; background-color: #24292E; color:white; text-align: left; font-size:1.2em; padding:10px;");
        divHeader2.innerHTML = "User Details: " + parametar;
        divContainer2.appendChild(divHeader2); 

    var userCompany = document.createElement("p");
        userCompany.id = "userCompany";
        userCompany.setAttribute("style", "text-alighn: center; font-size:1.2em; ");
  
    
    var btn2Id = "btnX2"
    createX(btn2Id, divHeader2);
    document.getElementById(btn2Id).addEventListener("click", deleteDetails);

function deleteDetails(){
    window.document.body.removeChild(document.getElementById("container2"));
    document.querySelector("#container").style.display = "block";
    }   
    //alert("Fetch user details...");
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
                    var userDetailsSection = window.document.createElement("section");
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

function createX(btnId, header){
    var btnX = document.createElement("span");
        btnX.id = btnId;
        btnX.setAttribute("style", " position:absolute; top:0; right:5px; color:white; font-weight: bold; font-size:1.2em; ");
        btnX.innerHTML = "&#10006;";
        header.appendChild(btnX); 
}

