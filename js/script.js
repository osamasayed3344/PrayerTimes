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
            $(".error400").css("display","none");
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








