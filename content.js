function setDino(name, desc) {
    document.getElementById("dinoName").innerHTML = name;
    document.getElementById("dinoDescription").innerHTML = desc;
}

const currentDay = (new Date()).getDate();

// for when local storage is reset
// chrome.storage.local.set({'dinoNameStored': 'none', 'dinoDescStored': 'none' , 'lastDate': currentDay});

chrome.storage.local.get(['dinoNameStored', 'dinoDescStored', 'lastDate'], function (result) {
    console.log(result);
    
    // if it's a new day or there's no previous day, get a new dino
    if (currentDay !== result.lastDate || result.dinoNameStored == 'none') {
        fetch('https://dinosaur-facts-api.shultzlab.com/dinosaurs/random')
            .then(r => r.json())
            .then(newDino => {
                console.log("date different");
                console.log(newDino);
                setDino(newDino.Name, newDino.Description)

                chrome.storage.local.set({
                    'dinoNameStored': newDino.Name, 
                    'dinoDescStored': newDino.Description , 
                    'lastDate': currentDay});
        });
    } else {
        // use the dino of that day
        console.log("date same");
        setDino(result.dinoNameStored, dinoDesc = result.dinoDescStored);
    }
});