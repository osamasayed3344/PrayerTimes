/*const day = { day: 'numeric' };
const month = { month: 'numeric' };
const year = { year: 'numeric' };
const prayer=["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"];
const mouthsbarthday=["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر"];
const dateislam_en=[];
const dayislam_en=[];
const checkarray=[];
const checkarrayhour=[];
const date=new Date();
fetch(" http://api.aladhan.com/v1/timings?latitude=28.0871&longitude=30.7618").then(reponse=>reponse.json())
.then(data=>{
    const dateformat=date.toLocaleDateString("en-US",day).toString().padStart(2,"0")+"-"+date.toLocaleDateString("en-US",month).toString().padStart(2,"0")+"-"+date.toLocaleDateString("en-US",year).toString().padStart(2,"0");
    dateislam_en.push(data["data"]["date"]["hijri"]["date"]);
    dateislam_en.push(dateformat);
    dayislam_en.push(data["data"]["date"]["hijri"]["month"]["ar"]);
    let monthnumber=data["data"]["date"]["gregorian"]["month"]["number"]-1;
    for(let i=0; i<mouthsbarthday.length; i++){
        if(monthnumber==i){
            dayislam_en.push(mouthsbarthday[i]);
            break;
        }
    }
    dateislam_prayer();
    for(let j=0; j<prayer.length; j++){
        let minuteprayer=data["data"]["timings"][prayer[j]].slice(3,5);
        if(data["data"]["timings"][prayer[j]].slice(0,2)>12){
            let hourprayer=(parseInt(data["data"]["timings"][prayer[j]].slice(0,2))-12).toString().padStart(2,"0");
            document.querySelectorAll(".prayerbackground .bottomdate .prayeritem .clock")[j].innerHTML=hourprayer+":"+minuteprayer+" م";
        }else{
            let hourprayer=data["data"]["timings"][prayer[j]].slice(0,2);
            document.querySelectorAll(".prayerbackground .bottomdate .prayeritem .clock")[j].innerHTML=hourprayer+":"+minuteprayer+" ص";
        }
        let check=parseInt(data["data"]["timings"][prayer[j]].slice(3))+15;
        if(check>=60){
            checkarray.push((check-60).toString().padStart(2,"0"));
            checkarrayhour.push((parseInt(data["data"]["timings"][prayer[j]].slice(0,2))+1).toString().padStart(2,"0"));
            
        }else{
            checkarray.push((check).toString().padStart(2,"0"));
            checkarrayhour.push(data["data"]["timings"][prayer[j]].slice(0,2));
        }
    }
    iqama();
});

//--------------------------الوقت الحالي--------------------------------
clockcount();
function clockcount(){
    const date=new Date();
    let minute=date.getMinutes().toString().padStart(2,"0");
    let second=date.getSeconds().toString().padStart(2,"0");
    if(date.getHours()>12){
        let hour=(date.getHours()-12).toString().padStart(2,"0");
        document.querySelector(".prayerbackground .topdate .clock").innerHTML=hour+":"+minute+":"+second+" م";
    }
    else{
        let hour=date.getHours().toString().padStart(2,"0");
        document.querySelector(".prayerbackground .topdate .clock").innerHTML=hour+":"+minute+":"+second+" ص";
    }
    setTimeout(function(){clockcount()},1000);
}*/

//-------------------------------- اليوم والتاريخ ------------------------------
/*let index=0;
function dateislam_prayer(){
    if(index<dateislam_en.length){
        document.querySelector(".prayerbackground .topdate .date").innerHTML=dateislam_en[index];
        document.querySelector(".prayerbackground .topdate .day").innerHTML=dayislam_en[index];
        index++;
    }else{
        index=0;
    }
    setTimeout(dateislam_prayer,4000);
}

//-------------------------------------تشغيل الاذان والاقامة-----------------------------------------------
let i_prayer=0;
setTimeout(prayerNow,1000);
function prayerNow(){
    const date=new Date();
    for(let i=0; i<prayer.length; i++){
        let hour="";
        let minute=date.getMinutes().toString().padStart(2,"0");
        let second=date.getSeconds().toString().padStart(2,"0");
        let hourprayer=document.querySelectorAll(".prayerbackground .bottomdate .prayeritem .clock")[i_prayer].innerHTML.slice(0,2);
        let minuteprayer=document.querySelectorAll(".prayerbackground .bottomdate .prayeritem .clock")[i_prayer].innerHTML.slice(3,5);
        if(date.getHours().toString().padStart(2,"0")>12){
            hour=(parseInt(date.getHours().toString().padStart(2,"0"))-12).toString().padStart(2,"0");
        }else{
            hour=date.getHours().toString().padStart(2,"0");
        }
        if(second==="00"&& minute==="49" && hour==="04"){
            document.querySelector(".prayer_now").style.display="block";
            document.getElementById("video1").src="./public/الاذان.mp4";
            document.getElementById("video1").mute="false";
            document.getElementById("video1").play();
        }
    }
    setTimeout(prayerNow,1000);
}


function iqama(){
    const date=new Date();
    for(let i=0; i<prayer.length; i++){
        let hour="";
        let minute=date.getMinutes().toString().padStart(2,"0");
        let second=date.getSeconds().toString().padStart(2,"0");
        if(date.getHours().toString().padStart(2,"0")>12){
            hour=(parseInt(date.getHours().toString().padStart(2,"0"))-12).toString().padStart(2,"0");
        }else{
            hour=date.getHours().toString().padStart(2,"0");
        }
        if(second==="00" && minute==="45" && hour==="04"){
            document.querySelector(".prayer_now").style.display="block";
            document.getElementById("video1").src="./public/اقامة.mp4";
            document.getElementById("video1").mute="false";
            document.getElementById("video1").play();
        }
    }
    setTimeout(iqama,1000);
}

/*window.onload=function(){
    document.querySelector(".prayer_now").style.display="block";
    document.getElementById("video1").src="./public/الاذان.mp4";
    document.getElementById("video1").mute="false";
    document.getElementById("video1").play();
}*/

//-------------------------------------------------------------------
const getmonth = { month: 'numeric' };
const prayer=["Fajr","Sunrise","Dhuhr","Asr","Maghrib","Isha"];
const mouthsbarthday=["يناير","فبراير","مارس","ابريل","مايو","يونيو","يوليو","اغسطس","سبتمبر","اكتوبر","نوفمبر","ديسمبر"];
const date=new Date();
const day=date.getDate();
const year=date.getFullYear();
const month=date.toLocaleDateString("en-US",getmonth).toString().padStart(2,"0");
const date_enOrar=[];
const day_enOrar=[];

$(document).ready(function() {
    $("#btngetprayer").click(function(e){
        let city = $("#getcity").val();
        let country = $("#getcountry").val();
        if($("#getcity").val().trim()!=="" && $("#getcountry").val().trim()!==""){
            localStorage.setItem("city",city);
            localStorage.setItem("country",country);
            showprayer(localStorage.getItem("city"),localStorage.getItem("country"));
        }
    });

    const savecity=localStorage.getItem("city");
    const savecountry=localStorage.getItem("country");
    if(savecity){
        showprayer(savecity,savecountry);
    }
});;

//-----------------------------------------عرض مواقيت الصلاة-----------------------------------
function showprayer(savecity,savecountry){
    $("#cityshow").text(savecity);
    $.get("https://api.aladhan.com/v1/calendarByCity/"+year+"/"+month+"?city="+savecity+"&country="+savecountry+"").done(
        function(data, textStatus, jqXHR){
            for(let i=0; i<data["data"].length; i++){
                if(i==(day-1)){
                    date_enOrar.push(data["data"][i]["date"]["gregorian"]["date"]);
                    date_enOrar.push(data["data"][i]["date"]["hijri"]["date"]);
                    //---------------------------------------------------------
                    for(let j=0; j<mouthsbarthday.length; j++){
                        if(j==(data["data"][i]["date"]["gregorian"]["month"]["number"]-1)){
                            day_enOrar.push(mouthsbarthday[j]);
                            day_enOrar.push(data["data"][i]["date"]["hijri"]["month"]["ar"]);
                            break;
                        }
                    }
                    //----------------------------------------------------------
                    const displayprayertimes=document.querySelectorAll(".prayerbackground .bottomdate .prayeritem .clock");
                    for(let x=0; x<prayer.length; x++){
                        const hourprayer=data["data"][i]["timings"][prayer[x]].slice(0,2);
                        const minuteprayer=data["data"][i]["timings"][prayer[x]].slice(3,5);
                        if(hourprayer>12){
                            displayprayertimes[x].innerHTML=(hourprayer-12).toString().padStart(2,"0")+" : "+minuteprayer+" م";
                        }else{
                            displayprayertimes[x].innerHTML=hourprayer+" : "+minuteprayer+" ص";
                        }
                    }
                    break;
                }
            }
            console.log(jqXHR.status);
            printsuccess();
            displayclocknow();
        }
    ).fail(
        function(jqXHR, textStatus, errorThrown){
            $(".error400").css("display","block");
            console.log(jqXHR.status);
        }
    );
}

//-------------------------------عرض التاريخ الميلادي والهجري--------------------------------------
let index=0;
function printsuccess(){
    $(document).ready(function() {
        if(index<date_enOrar.length){
            $(".prayerbackground .topdate .date").text(date_enOrar[index]);
            $(".prayerbackground .topdate .day").text(day_enOrar[index]);
            index++;
        }
        else{
            index=0;
        }
    });
    setTimeout(printsuccess,4000);
}


//---------------------------عرض الوقت الحالي------------------------------------
function displayclocknow(){
    let datenow=new Date();
    const hour=datenow.getHours();
    const minute=datenow.getMinutes().toString().padStart(2,"0");
    const second=datenow.getSeconds().toString().padStart(2,"0");
    $(document).ready(function() {
        if(hour>12){
            $(".prayerbackground .topdate .clock").text((hour-12).toString().padStart(2,"0")+" : "+minute+" : "+second+" م");
        }else{
            $(".prayerbackground .topdate .clock").text(hour.toString().padStart(2,"0")+" : "+minute+" : "+second+" ص");
        }
    });
    setTimeout(displayclocknow,1000);
}








