// set the dino's name and description in the html
function setDino(name, desc) {
    document.getElementById("dinoName").innerHTML = name;
    document.getElementById("dinoDescription").innerHTML = desc;
}

// sets the wikipedia attribution section with the correct uploader name and by
// linking to the correct page
function setWikipediaAttribution(uploader, dinoName) {
    document.getElementById("wikipediaAttribution").innerHTML = "Main image uploaded by ";
    var link = document.createElement("a");
    var linkParent = document.getElementById("wikipediaAttribution");
    link.href = "https://en.wikipedia.org/wiki/" + dinoName;
    link.id = "wikipediaAttributionLink";
    linkParent.appendChild(link);

    document.getElementById("wikipediaAttributionLink").innerHTML = uploader + " on Wikipedia";
}

// creates a bullet point for additional dino information
function makeMoreDescBullet(bulletId) {
    document.getElementById("moreDescLabel").innerHTML = "More info:";

    var bullet = document.createElement("li");
    var parent = document.getElementById("moreDesc");
    bullet.id = bulletId;
    parent.appendChild(bullet);
}

// takes in a string environment and returns the image tha corresponds to it
function setBackgroundImg(environment) {
    var picture = "";
    switch(environment) {
        case "ground dwelling":
            picture = "url('images/ground.jpg')";
            break;
        case "aquatic":
            picture = "url('images/water.jpg')";
            break; 
        case "volant": //flying
            picture = "url('images/sky.jpg')";
            break;
        default:
            picture = "url('images/ground.jpg')";
    }

    document.body.style.backgroundImage = picture;
    
}

// returns "a" or "an" depending on noun given
function getCorrectA(noun) {
    if (noun[0] == "a" || 
        noun[0] == "e" ||
        noun[0] == "i" ||
        noun[0] == "o" ||
        noun[0] == "u") {
            return "an"
        }
    return "a"
}

// https://paleobiodb.org/data1.2/taxa/single_doc.html
// gets more info about a given dinosaur using the Paleo DB
function paleoDBInfo(dinoName) {
    url = "https://paleobiodb.org/data1.2/taxa/single.json?name=" + dinoName + "&show=common,ecospace,app,img";
    // TODO: what if the dino isn't in this db? need to set background image
    fetch(url)
        .then(r => r.json())
        .then(info => {
            if (info.records.length == 0) {
                console.log("info list doesn't exist");
            }
            var record = info.records[0];
            if (record.hasOwnProperty('nm2')) {
                document.getElementById("nickname").innerHTML = "(" + record.nm2 + ")";
            }
            if (record.hasOwnProperty('tei')) {
                makeMoreDescBullet("timePeriod");
                document.getElementById("timePeriod").innerHTML = "Lived in the " + record.tei + " time period";
            }
            if (record.hasOwnProperty('jdt')) {
                makeMoreDescBullet("diet");
                var s = "Was " + getCorrectA(String(record.jdt)) + " " + record.jdt;
                document.getElementById("diet").innerHTML = s;
            }
            if (record.hasOwnProperty('img')) {
                var image = document.createElement("img");
                var imageParent = document.getElementById("dinoThumbnail");
                image.id = "id";
                image.className = "class";
                image.src = "https://paleobiodb.org/data1.2/taxa/thumb.png?id=" + record.img.substring(4);
                imageParent.appendChild(image);
            }

            if (record.hasOwnProperty('jlh')) {
                makeMoreDescBullet("environment");
                var environment = String(record.jlh).split(",")[0];
                var s = "Lived " + getCorrectA(environment) + " " + environment + " life";
                document.getElementById("environment").innerHTML = s;
                setBackgroundImg(environment);
            }
            else {
                setBackgroundImg("");
            }
            
        })
        .catch(function(error) {console.log(error); });

}

// Wikipedia API docs  https://www.mediawiki.org/wiki/API:Properties

// return the first image on the wikipedia page of dinoName
async function wikipediaImageFromPage(dinoName) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        prop: "images",
        titles: dinoName,
        format: "json",
        imlimit: 1
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    imgName = ""

    await fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.pages;
            for (var page in pages) {
                for (var img of pages[page].images) {
                    console.log(img.title);
                    imgName = img.title;
                    break;
                }
                break;
            }
        })
        .catch(function(error){console.log(error);});
    
    return imgName;
}

// returns thumbnail image for a specific Wikipedia page
async function wikipediaImg(dinoName) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        titles: dinoName,
        prop: "pageprops",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key) { url += "&" + key + "=" + params[key]; });

    var imgName = "";
    await fetch(url)
        .then(function(response) { return response.json(); })
        .then(function(response) { 
            var pages = response.query.pages;
            for (var page in pages) {
                imgName = pages[page].pageprops.page_image_free;
                console.log(imgName);
            }
        })
        .catch(function(error) { console.log(error); });
    
    // if this wikipedia page has no thumbnail, take the first image on the page
    if (imgName === undefined) {
        console.log("no thumbnail!");

        await wikipediaImageFromPage(dinoName)
            .then(img => { imgName = img});
        return imgName;
    }

    return "File:" + imgName;
}

// returns url to a specific Wikipedia image
async function wikipediaRequestImgUrl(img, dinoName) {
    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        format: "json",
        prop: "imageinfo",
        titles: img,
        iiprop: "url"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    var imgUrl = "";
    var uploader = "";

    await fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.pages;
            for (var p in pages) {
                console.log(pages[p].title + " is uploaded to:" + pages[p].imageinfo[0].url);
                imgUrl = pages[p].imageinfo[0].url;
                uploader = pages[p].imageinfo[0].user;
            }
        })
        .catch(function(error){console.log(error);});
    
    setWikipediaAttribution(uploader, dinoName);
    return imgUrl;
}

// use the Wikipedia API to get an image of the dino
function setDinoImage(dinoName) {
    // TODO: it's possible that the article found doesn't correspond to the dinosaur. (check "Minmi")
    // or it's possible no article is found at all 
    wikipediaImg(dinoName)
        .then(img => { 
            wikipediaRequestImgUrl(img, dinoName).then(imgUrl => {
                var image = document.createElement("img");
                var imageParent = document.getElementById("dinoImg");
                image.src = imgUrl;
                image.style.width = "100%";
                imageParent.appendChild(image);
            }); 
        });
}



// get the stored dino name and description for the day
const currentDay = (new Date()).getDate();
chrome.storage.local.get(['dinoNameStored', 'dinoDescStored', 'lastDate'], function (result) {
    
    // if it's a new day or there's no previous day, get a new dino
    if (result.dinoNameStored == undefined || currentDay !== result.lastDate) {
        //TODO: this is missing so many dinos - plesiosaur, mosasaur, quetzalcoatlus
        fetch('https://dinosaur-facts-api.shultzlab.com/dinosaurs/random')
            .then(r => r.json())
            .then(newDino => {
                setDino(newDino.Name, newDino.Description);
                setDinoImage(newDino.Name);
                paleoDBInfo(newDino.Name);

                chrome.storage.local.set({
                    'dinoNameStored': newDino.Name, 
                    'dinoDescStored': newDino.Description , 
                    'lastDate': currentDay});    
            })
            .catch(function(error) {console.log(error); });
    } else {
        // use the dino of that day
        setDino(result.dinoNameStored, result.dinoDescStored);
        setDinoImage(result.dinoNameStored);
        paleoDBInfo(result.dinoNameStored);
    }
});


// When the user clicks on sources button, open the popup
const sourcesBtn = document.getElementById("popupBtnID");
sourcesBtn.addEventListener("click", myFunction);
function myFunction() {
    var popup = document.getElementById("popupTextID");
    popup.classList.toggle("show");
}