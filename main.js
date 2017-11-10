function getAllEvents() {
    fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/events?_embed")
        .then(res => res.json())
        .then(showEvents);
}


function getAllEventsByTag(id) {
    fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/events?_embed&tags="+id)
        .then(res => res.json())
        .then(showEvents);
}
function getSingleEventsById(myId){
    console.log(myId);
    fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/events/"+myId+"/?_embed")
        .then(res => res.json())
        .then(showSingleEvents);
    
    
    }


function getMenu(){
    fetch("http://joannamarievelasco.com/wordpress/wp-json/wp/v2/tags")
    .then(res => res.json())
        .then(showMenu)
    

}


function showMenu(tags){
  console.log(tags)
  let lt=document.querySelector("#linkTemplate").content;
    
    
    tags.forEach(function(tag){
        if(tag.count > 0){
            
            
        let clone = lt.cloneNode(true);
    let parent=document.querySelector("#tagmenu");
        clone.querySelector("a").textContent=tag.name;
        clone.querySelector("a").setAttribute("href","index.html?tagid="+tag.id);
    parent.appendChild(clone);  }
               } );
    

}

function showSingleEvents(json){
    console.log(json);
    document.querySelector("#single h1").textContent=json.title.rendered;
    document.querySelector("#single .price span").textContent=json.acf.ticket_price;
    document.querySelector("#single .info").innerHTML=json.acf.event_info;
    
    
    }
function showEvents(data) {
    //console.log(data);
    let list = document.querySelector("#list");
    let template = document.querySelector("#eventsTemplate").content;

    data.forEach(function (myEvents) {
        console.log(myEvents)
       
    
     let clone = template.cloneNode(true);
     let title = clone.querySelector("h1");
     let info = clone.querySelector(".info");
     let date = clone.querySelector(".date");
     let time = clone.querySelector(".time");
     let location = clone.querySelector(".location");
     let price = clone.querySelector(".price span");
     let img = clone.querySelector("img");
     let link=clone.querySelector("a.read-more");
        
        
    title.textContent=myEvents.title.rendered;
    //console.log(myEvents._embedded["wp:featuredmedia"]);
        if(myEvents._embedded["wp:featuredmedia"][0].media_details) {
           // img.setAttribude("src", myEvents._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source.url)
         }
        
        
        
        date.textContent=myEvents.acf.date;
        time.textContent=myEvents.acf.time;
        location.textContent=myEvents.acf.location;
        price.textContent=myEvents.acf.ticket_price;
        console.log(myEvents._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        img.setAttribute("src",myEvents._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
        link.setAttribute("href","events.html?id="+myEvents.id);
        //console.log(myEvents._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url)
        
        list.appendChild(clone);
    })
 }
let searchParams = new URLSearchParams(window.location.search);
let id = searchParams.get("id");
let tagid = searchParams.get("tagid");
//console.log(id)

getMenu();
if(id) {
     getSingleEventsById(id);
    
  }   
     if(tagid) {
     
    getAllEventsByTag(tagid);
        } 
else  {
    
    getAllEvents();
        }




   
   
// let title=clone.querySelector("h1");
// title.textContent=myEvents.title.rendered;