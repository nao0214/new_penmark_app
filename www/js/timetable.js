//ローカルストレージを全て削除
//localStorage.clear();

// Page init event
document.addEventListener('init', function(event) {
    var page = event.target;
    
    if(!JSON.parse(localStorage.getItem("section"))){
        var section = [];
        for(var i = 0; i < 30; i++){
            section[i] = {"sub":"","tea":"","rom":"","clr":"","mem":""};
        }
        localStorage.setItem('section', JSON.stringify(section));
    }else{
        var section = JSON.parse(localStorage.getItem("section"));
    }
    
    if (page.matches('#timetable')) {
            
        for(var i = 1; i < 31; i++){
            var j = i - 1;
            document.querySelector('#sec' + i +  ' .celltop span').textContent = section[j].sub;
            document.querySelector('#sec' + i +  ' .cellbot span').textContent = section[j].rom;            
            document.querySelector('#sec' + i +  ' .cellbox').style.backgroundColor = section[j].clr;
            if((section[j].sub !== "" || section[j].rom !== "") && section[j].clr === ""){
                document.querySelector('#sec' + i +  ' .cellbox').style.backgroundColor ="#dbdbdb";
            }
            document.getElementById('sec' + i).addEventListener('click', function(e) {
                document.querySelector('#navigator').pushPage('page/timetable/timetable-detail.html');
                sectionId = e.currentTarget.id;
            });
        }
        
    } else if (page.matches('#timetable-detail')) {
            
        var sectionIdNum = sectionId.replace(/[^0-9]/g, '');
        var sectionIdNumGen = sectionIdNum % 5;
        if (sectionIdNumGen === 0) {
            sectionIdNumGen = 5;
        }
        var DoW;
        switch(sectionIdNum){
            case "1": case "2": case "3": case "4": case "5": DoW = "月"; break;
            case "6": case "7": case "8": case "9": case "10": DoW = "火"; break;
            case "11": case "12": case "13": case "14": case "15": DoW = "水"; break;
            case "16": case "17": case "18": case "19": case "20": DoW = "木"; break;
            case "21": case "22": case "23": case "24": case "25": DoW = "金"; break;
            case "26": case "27": case "28": case "29": case "30": DoW = "土"; break;
        }
        document.querySelector('#timetable-detail div.center').textContent = DoW + "曜" + sectionIdNumGen + "限";    　　
        document.getElementById("subject").value = section[sectionIdNum - 1].sub;
        document.getElementById("teacher").value = section[sectionIdNum - 1].tea;
        document.getElementById("room").value = section[sectionIdNum - 1].rom;
        var radio = document.getElementsByName("color");
        radio.value = section[sectionIdNum - 1].clr;
        //alert(radio.value);
        document.getElementById("memo").value = section[sectionIdNum - 1].mem;
        
        page.querySelector('#pop').onclick = function() {    
            
            section[sectionIdNum - 1].sub = document.getElementById("subject").value;
            section[sectionIdNum - 1].tea = document.getElementById("teacher").value;
            section[sectionIdNum - 1].rom = document.getElementById("room").value;
            
            var colorRadios = document.getElementsByName("color");
            var colorVal;
            for(var i=0; i<colorRadios.length; i++){
                if (colorRadios[i].checked) {
                    colorVal = colorRadios[i].value;
                    break;
                }
            }

            section[sectionIdNum - 1].clr = colorVal;
            section[sectionIdNum - 1].mem = document.getElementById("memo").value;
            
            localStorage.setItem('section', JSON.stringify(section));
            
            document.querySelector('#sec' + sectionIdNum +  ' .celltop span').textContent = section[sectionIdNum - 1].sub;   
            document.querySelector('#sec' + sectionIdNum +  ' .cellbot span').textContent = section[sectionIdNum - 1].rom;
            document.querySelector('#sec' + sectionIdNum +  ' .cellbox').style.backgroundColor = section[sectionIdNum - 1].clr;
            if((section[sectionIdNum - 1].sub !== "" || section[sectionIdNum - 1].rom !== "") && section[sectionIdNum - 1].clr == ""){
                document.querySelector('#sec' + sectionIdNum +  ' .cellbox').style.backgroundColor ="#dbdbdb";
            }
            
            document.querySelector('#navigator').popPage();
        };
        
        page.querySelector('#remove').onclick = function() {    
            document.getElementById("subject").value = "";
            document.getElementById("teacher").value = "";
            document.getElementById("room").value = "";
            for (i = 1; i <= 12; i++) {
                document.getElementById('color' + i).checked = false;
            }
            document.getElementById("memo").value = "";        
        }
    }
});