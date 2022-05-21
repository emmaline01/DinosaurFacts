// set the dino's name and description in the html
function setDino(name, desc) {
    document.getElementById("dinoName").innerHTML = name;
    document.getElementById("dinoDescription").innerHTML = desc;
}

// creates a bullet point for additional dino information
function makeMoreDescBullet(bulletId) {
    document.getElementById("moreDescLabel").innerHTML = "More info:";

    var bullet = document.createElement("li");
    var parent = document.getElementById("moreDesc");
    bullet.id = bulletId;
    parent.appendChild(bullet);
}

// https://paleobiodb.org/data1.2/taxa/single_doc.html
// gets more info about a given dinosaur using the Paleo DB
function paleoDBInfo(dinoName) {
    url = "https://paleobiodb.org/data1.2/taxa/single.json?name=" + dinoName + "&show=common,ecospace,app,img";

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
            if (record.hasOwnProperty('tli')) {
                makeMoreDescBullet("timePeriod");
                document.getElementById("timePeriod").innerHTML = "Lived in the " + record.tli + " time period";
            }
            if (record.hasOwnProperty('jdt')) {
                makeMoreDescBullet("diet");
                document.getElementById("diet").innerHTML = "Was an " + record.jdt;
            }
            if (record.hasOwnProperty('img')) {
                var image = document.createElement("img");
                var imageParent = document.getElementById("dinoThumbnail");
                image.id = "id";
                image.className = "class";
                image.src = "https://paleobiodb.org/data1.2/taxa/thumb.png?id=" + record.img.substring(4);
                imageParent.appendChild(image);
            }
            
        })
        .catch(function(error) {console.log(error); });

}


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

    imgName = ""
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
async function wikipediaRequestImgUrl(img) {
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

    imgUrl = "";

    await fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.pages;
            for (var p in pages) {
                console.log(pages[p].title + " is uploaded to:" + pages[p].imageinfo[0].url);
                imgUrl = pages[p].imageinfo[0].url;
            }
        })
        .catch(function(error){console.log(error);});

    return imgUrl;
}

// use the Wikipedia API to get an image of the dino
function setDinoImage(dinoName) {
    wikipediaImg(dinoName)
        .then(img => { 
            wikipediaRequestImgUrl(img).then(imgUrl => {
                var image = document.createElement("img");
                var imageParent = document.getElementById("dinoImg");
                image.id = "id";
                image.className = "class";
                image.src = imgUrl;
                image.style.width = "100%";
                imageParent.appendChild(image);
            }); 
        });
}

const currentDay = (new Date()).getDate();

// for when local storage is reset
// chrome.storage.local.set({'dinoNameStored': 'none', 'dinoDescStored': 'none' , 'lastDate': currentDay});

// get the stored dino name and description for the day
chrome.storage.local.get(['dinoNameStored', 'dinoDescStored', 'lastDate'], function (result) {
    console.log(result);
    
    // if it's a new day or there's no previous day, get a new dino
    if (currentDay !== result.lastDate || result.dinoNameStored == 'none') {
        fetch('https://dinosaur-facts-api.shultzlab.com/dinosaurs/random')
            .then(r => r.json())
            .then(newDino => {
                console.log("date different");
                console.log(newDino);
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
        console.log("date same");
        setDino(result.dinoNameStored, result.dinoDescStored);
        setDinoImage(result.dinoNameStored);
        paleoDBInfo(result.dinoNameStored);
    }
});