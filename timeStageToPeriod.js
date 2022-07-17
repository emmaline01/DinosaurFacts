// referenced https://www.britannica.com/science/Callovian-Stage
// and https://paleobiodb.org/data1.2/intervals/list.txt?scale=1 
// from https://paleobiodb.org/data1.2/intervals_doc.html 
export function timeStageToPeriod(stage) {
    switch (stage) {
        case "Holocene":
        case "Late Pleistocene":
        case "Middle Pleistocene":
        case "Calabrian":
        case "Quaternary":
        case "Pleistocene":
        case "Gelasian":
            return "Quaternary period (Cenozoic era)";
        case "Piacenzian":
        case "Pliocene":
        case "Zanclean":
        case "Messinian":
        case "Tortonian":
        case "Serravallian":
        case "Langhian":
        case "Burdigalian":
        case "Neogene":
        case "Miocene":
        case "Aquitanian":
            return "Neogene period (Cenozoic era)";
        case "Chattian":
        case "Oligocene":
        case "Rupelian":
        case "Priabonian":
        case "Bartonian":
        case "Lutetian":
        case "Eocene":
        case "Ypresian":
        case "Thanetian":
        case "Selandian":
        case "Paleogene":
        case "Paleocene":
        case "Danian":
            return "Paleogene period (Cenozoic era)";
        case "Cenozoic":
            return "Cenozoic era";
        case "Maastrichtian":
        case "Campanian":
        case "Santonian":
        case "Coniacian":
        case "Turonian":
        case "Late Cretaceous":
        case "Cenomanian":
        case "Albian":
        case "Aptian":
        case "Barremian":
        case "Hauterivian":
        case "Valanginian":
        case "Early Cretaceous":
        case "Berriasian":
        case "Cretaceous":
            return "Cretaceous period (Mesozoic era)";
        case "Tithonian":
        case "Kimmeridgian":
        case "Late Jurassic":
        case "Oxfordian":
        case "Callovian":
        case "Bathonian":
        case "Bajocian":
        case "Middle Jurassic":
        case "Aalenian":
        case "Toarcian":
        case "Pliensbachian":
        case "Sinemurian":
        case "Jurassic":
        case "Early Jurassic":
        case "Hettangian":
            return "Jurassic period (Mesozoic era)";
        case "Rhaetian":
        case "Norian":
        case "Late Triassic":
        case "Carnian":
        case "Ladinian":
        case "Middle Triassic":
        case "Anisian":
        case "Olenekian":
        case "Triassic":
        case "Early Triassic":
        case "Induan":
            return "Triassic period (Mesozoic era)";
        case "Mesozoic":
            return "Mesozoic era";
        case "Changhsingian":
        case "Lopingian":
        case "Wuchiapingian":
        case "Capitanian":
        case "Wordian":
        case "Guadalupian":
        case "Roadian":
        case "Kungurian":
        case "Artinskian":
        case "Sakmarian":
        case "Permian":
        case "Cisuralian":
        case "Asselian":
            return "Permian period (Paleozoic era)";
        case "Gzhelian":
        case "Kasimovian":
        case "Moscovian":
        case "Pennsylvanian":
        case "Bashkirian":
        case "Serpukhovian":
        case "Visean":
        case "Carboniferous":
        case "Mississippian":
        case "Tournaisian":
            return "Carboniferous period (Paleozoic era)";
        case "Famennian":
        case "Late Devonian":
        case "Frasnian":
        case "Givetian":
        case "Middle Devonian":
        case "Eifelian":
        case "Emsian":
        case "Pragian":
        case "Devonian":
        case "Early Devonian":
        case "Lochkovian":
            return "Devonian period (Paleozoic era)";
        case "Pridoli":
        case "Ludfordian":
        case "Ludlow":
        case "Gorstian":
        case "Homerian":
        case "Wenlock":
        case "Sheinwoodian":
        case "Telychian":
        case "Aeronian":
        case "Silurian":
        case "Llandovery":
        case "Rhuddanian":
            return "Silurian period (Paleozoic era)";
        case "Hirnantian":
        case "Katian":
        case "Late Ordovician":
        case "Sandbian":
        case "Darriwilian":
        case "Middle Ordovician":
        case "Dapingian":
        case "Floian":
        case "Ordovician":
        case "Early Ordovician":
        case "Tremadocian":
            return "Ordovician period (Paleozoic era)";
        case "Stage 10":
        case "Jiangshanian":
        case "Furongian":
        case "Paibian":
        case "Guzhangian":
        case "Drumian":
        case "Series 3":
        case "Stage 5":
        case "Stage 4":
        case "Series 2":
        case "Stage 3":
        case "Stage 2":
        case "Phanerozoic":
        case "Cambrian":
        case "Terreneuvian":
        case "Fortunian":
            return "Cambrian period (Paleozoic era)";
        case "Paleozoic":
            return "Paleozoic era";
        case "Ediacaran":
        case "Cryogenian":
        case "Neoproterozoic":
        case "Tonian":
        case "Stenian":
        case "Ectasian":
        case "Mesoproterozoic":
        case "Calymmian":
        case "Statherian":
        case "Orosirian":
        case "Rhyacian":
        case "Proterozoic":
        case "Paleoproterozoic":
        case "Siderian":
            return "Proterozoic period (Precambrian era)";
        case "Neoarchean":
        case "Mesoarchean":
        case "Paleoarchean":
        case "Archean":
        case "Eoarchean":
            return "Archaean period (Precambrian era)";
        case "Hadean":
            return "Hadean period (Precambrian era)";
    }
}