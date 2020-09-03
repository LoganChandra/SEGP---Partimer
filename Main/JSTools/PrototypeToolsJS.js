// This javascript file has mulitple functions that act as tools for the other asscociated functions to use.


const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
function getMaxRange(id){
  var start = new Date(items.get(id).start);
  return start.addDays(window.MaxRescheduleRange);
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getDateArr(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
}

function SortBySecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function intersect(a, b) {
    var t;
    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
    return a.filter(function (e) {
        return b.indexOf(e) > -1;
    });
}

function rounddate(d) {
  
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  return d;
}

function GenID(){
      var list = new Array();
      var ids = items.getIds();
        for(var i=0; i<100; i++)
          if(!ids.includes(i))
            list.push(i);
      return list[Math.floor(Math.random() * list.length)];
    }
function GenTitle(id,taskname,startdate,enddate,projectname,dlyestHour,dlyestMin,notes,priority){
      var title;
      title = "ID: " + id + "<br>" + "Task Name: " +  taskname + "<br>" + "Start Date:" + startdate + "<br>" + "End Date:" + enddate + "<br>" + "Project Name: " + projectname + '<br>' + "Priority: " + getPriorityString(priority) + "<br>" +  "Task Estimate(hh:mm): " + dlyestHour + ":" + dlyestMin + " hrs" + "<br>" +  "Notes: " +  notes;
     
      return title;
    }
function getids(){
      document.getElementById("test").innerHTML  = items.getIds();

    }
function stringifyObject (object) {
      if (!object) return;
      var replacer = function(key, value) {
        if (value && value.tagName) {
          return "DOM Element";
        } else {
          return value;
        }
      }
      return JSON.stringify(object, replacer)
    }
// function getDate(d)
//     {
//     var day, month, year;
    
//     result = d.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
//     if(null != result) {
//     dateSplitted = result[0].split(result[1]);
//     day = dateSplitted[0];
//     month = dateSplitted[1];
//     year = dateSplitted[2];
//     }
//     result = d.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
//     if(null != result) {
//     dateSplitted = result[0].split(result[1]);
//     day = dateSplitted[2];
//     month = dateSplitted[1];
//     year = dateSplitted[0];
//     }
    
//     if(month>12) {
//     aux = day;
//     day = month;
//     month = aux;
//     }
//     return year+"-"+month+"-"+day;
//     }

    function getDateString(d){
      var year = String(new Date(d).getFullYear());
      var month = String(pad(new Date(d).getMonth() + 1)); 
      var day = String(pad(new Date(d).getDate()));
      return year + '-' + month + '-' + day;
    }

    function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}
    
    function closeForm() {
    // var tempdate = new Date(document.getElementById("EndDateID").value);
    // tempdate.setDate(tempdate.getDate() + 1);
    // items.get() = new Date(tempdate);
    document.getElementById("TaskForm").style.display = "none";
    window.startdate = '';
    console.log(window.enddate);
    }

    function getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
          diff = d.getDate() - day + (day == 0 ? -6:1);
      return new Date(d.setDate(diff));
    }

    function Min2HM(totmins,i){
      if(i == 0){
        return Math.floor( $('.totmins').html() / 60) 
      }

    }
    function Arrsum(numbers){
      var x = numbers.reduce(function(prev,curr){
        return curr + prev;
      },0);
      return x;
    }

    function saveJSON(obj){
      var json = JSON.stringify(obj);
      var fs = require('fs');
      fs.writeFile('PrototypeJSON.json', json, 'utf8', callback);
    }

    function readJSON(obj) {
    var fs = require('fs');

      fs.readFile('PrototypeJSON.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } 
        else {
          obj = JSON.parse(data); //now it an object
          obj.table.push({id: 2, square:3}); //add some data
          json = JSON.stringify(obj); //convert it back to json
          fs.writeFile('PrototypeJSON.json', json, 'utf8', callback); // write it back 
        }
      });
    }

    function getTaskDur(id){
      var start = items.get(id).start.getTime();
      var end = items.get(id).end.getTime();
      var diff = end - start;
      // console.log(diff);
      return diff/86400000;
    }
    
    function getNextDayTaskDur(id){
      var start = new Date(items.get(id).start);
      var end = new Date(items.get(id).end);
      end.setDate(end.getDate() + 1);
      start.setDate(start.getDate() + 1);
      var diff = end.getTime() - start.getTime();
      // console.log(diff);
      return diff/86400000;
    }

    function DailyPool(dlyhours){
      var Allitems = timeline.getVisibleItems();
      var RangeAllItems = timeline.getItemRange();
      var itemsPerDay;
      var totalDailyEst = 0;
      var totalDailyEstArr = [];
      var mindate = RangeAllItems.min;
      mindate.setDate(mindate.getDate() + 1);
      // console.log(Allitems);
      for (var d = new Date(mindate); d <= new Date(RangeAllItems.max); d.setDate(d.getDate() + 1)){
              itemsPerDay = items.get({

                  filter: function (item){
                    return (d.getTime() >= item.start.getTime() && d.getTime() < item.end.getTime());
                  }

            });
            totalDailyEstArr.push(Math.round(Math.floor(Arrsum(itemsPerDay.map(a => a.dailyestimate/getTaskDur(a.id))) - dlyhours*60)/60));
           // console.log(itemsPerDay);
    }


    document.getElementById("logDailyEstPool").innerHTML = "";
    document.getElementById("logDailyEstPool").innerHTML = totalDailyEstArr;

    // document.getElementById("testmove").innerHTML = totalDailyEstArr.join('&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');

    // console.log(totalDailyEstArr);
    return totalDailyEstArr;
}

function getArrVisDates(mindate,maxdate){
  
  var DateArr = [];
   for (var d = new Date(mindate); d < new Date(maxdate); d.setDate(d.getDate() + 1)){
      DateArr.push(getDateString(d));
      // console.log(d);
   }
   return DateArr;
   
}

function getDate(d)
    {
    var day, month, year;
    
    result = d.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
    if(null != result) {
    dateSplitted = result[0].split(result[1]);
    day = dateSplitted[0];
    month = dateSplitted[1];
    year = dateSplitted[2];
    }
    result = d.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
    if(null != result) {
    dateSplitted = result[0].split(result[1]);
    day = dateSplitted[2];
    month = dateSplitted[1];
    year = dateSplitted[0];
    }
    
    if(month>12) {
    aux = day;
    day = month;
    month = aux;
    }
    return year+"-"+month+"-"+day;
    }

function getDlyEstPool(d){

  var dlyhours = DailyPools.get({
          filter: function (item){
                    return (d.getTime() == item.date.getTime());
                  }
                });
  if(dlyhours.length > 0){
    return dlyhours[0].dailyestimate;
  }else{return DailyPoolEst;}
}

function getDlyEstForDate(d){
  var itemsPerDay = items.get({
                          filter: function (item){
                            return (d.getTime() >= item.start.getTime() && d.getTime() < item.end.getTime());
                          }

                          });
  var res = Math.round(Math.floor(Arrsum(itemsPerDay.map(a => a.dailyestimate/getTaskDur(a.id))) - getDlyEstPool(d)*60)/60)
  return res;

}

function getEachDayEst(id){
  var item = items.get(id);
  var result = Math.round((item.dailyestimate/getNextDayTaskDur(item.id))/60);
  return result; 
}

function DailyPoolGen(){
      var Allitems = timeline.getVisibleItems();
      var RangeAllItems = timeline.getItemRange();
      var itemsPerDay;
      var totalDailyEst = 0;
      var mindate = new Date(getDateString(new Date(timeline.getWindow().start)));
      var maxdate = new Date(getDateString(new Date(timeline.getWindow().end)));
      // maxdate.setDate(0,0,0,0);
      // console.log(mindate + ', ' + maxdate);
      var totalDailyEstArr = [];
      var temp;

      // mindate.setDate(mindate.getDate() + 1);
      // console.log(Allitems);

      for (var d = new Date(mindate); d < new Date(maxdate); d.setDate(d.getDate() + 1)){
          dlyhours = getDlyEstPool(d);
              itemsPerDay = items.get({
                  filter: function (item){
                    return (d.getTime() >= item.start.getTime() && d.getTime() < item.end.getTime());
                  }

            });
            temp = Math.floor(Arrsum(itemsPerDay.map(a => a.dailyestimate/getTaskDur(a.id))) - dlyhours*60)/60;
            if(temp > dlyhours*-1 && temp < (dlyhours - 0.5)*-1){
              totalDailyEstArr.push('spc');  
            }
            else if (temp == dlyhours*-1){ 
              totalDailyEstArr.push('&nbsp');  
            }
            else{
            totalDailyEstArr.push(Math.round(Math.floor(Arrsum(itemsPerDay.map(a => a.dailyestimate/getTaskDur(a.id))) - dlyhours*60)/60));
          }
           // console.log(dlyhours);
    }

    document.getElementById("dp0").innerHTML = "";
    document.getElementById("dp0").innerHTML = getDPCtrString(changeInputColor($('#dp0'),totalDailyEstArr[0]));
    document.getElementById("dp0DP").innerHTML = "";
    document.getElementById("dp0DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp0class').position().left)),totalDailyEstArr[0]);

    document.getElementById("dp1").innerHTML = "";
    document.getElementById("dp1").innerHTML = getDPCtrString(changeInputColor($('#dp1'),totalDailyEstArr[1]));
    document.getElementById("dp1DP").innerHTML = "";
    document.getElementById("dp1DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp1class').position().left)),totalDailyEstArr[1]);

    document.getElementById("dp2").innerHTML = "";
    document.getElementById("dp2").innerHTML = getDPCtrString(changeInputColor($('#dp2'),totalDailyEstArr[2]));
    document.getElementById("dp2DP").innerHTML = "";
    document.getElementById("dp2DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp2class').position().left)),totalDailyEstArr[2]);

    document.getElementById("dp3").innerHTML = "";
    document.getElementById("dp3").innerHTML = getDPCtrString(changeInputColor($('#dp3'),totalDailyEstArr[3]));
    document.getElementById("dp3DP").innerHTML = "";
    document.getElementById("dp3DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp3class').position().left)),totalDailyEstArr[3]);

    document.getElementById("dp4").innerHTML = "";
    document.getElementById("dp4").innerHTML = getDPCtrString(changeInputColor($('#dp4'),totalDailyEstArr[4]));
    document.getElementById("dp4DP").innerHTML = "";
    document.getElementById("dp4DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp4class').position().left)),totalDailyEstArr[4]);

    document.getElementById("dp5").innerHTML = "";
    document.getElementById("dp5").innerHTML = getDPCtrString(changeInputColor($('#dp5'),totalDailyEstArr[5]));
    document.getElementById("dp5DP").innerHTML = "";
    document.getElementById("dp5DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp5class').position().left)),totalDailyEstArr[5]);

    document.getElementById("dp6").innerHTML = "";
    document.getElementById("dp6").innerHTML = getDPCtrString(changeInputColor($('#dp6'),totalDailyEstArr[6]));
    document.getElementById("dp6DP").innerHTML = "";
    document.getElementById("dp6DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp6class').position().left)),totalDailyEstArr[6]);

    document.getElementById("dp7").innerHTML = "";
    document.getElementById("dp7").innerHTML = getDPCtrString(changeInputColor($('#dp7'),totalDailyEstArr[7]));
    document.getElementById("dp7DP").innerHTML = "";
    document.getElementById("dp7DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp7class').position().left)),totalDailyEstArr[7]);

    document.getElementById("dp8").innerHTML = "";
    document.getElementById("dp8").innerHTML = getDPCtrString(changeInputColor($('#dp8'),totalDailyEstArr[8]));
    document.getElementById("dp8DP").innerHTML = "";
    document.getElementById("dp8DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp8class').position().left)),totalDailyEstArr[8]);

    document.getElementById("dp9").innerHTML = "";
    document.getElementById("dp9").innerHTML = getDPCtrString(changeInputColor($('#dp9'),totalDailyEstArr[9]));
    document.getElementById("dp9DP").innerHTML = "";
    document.getElementById("dp9DP").innerHTML =getDPEstString(getDlyEstPool(Axis2Date($('#dp9class').position().left)),totalDailyEstArr[9]);

    // document.getElementById("testmove").innerHTML = totalDailyEstA rr.join('&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp');

    // console.log(totalDailyEstArr);
    // document.getElementById("lolo").innerHTML = '';
    // document.getElementById("lolo").innerHTML = totalDailyEstArr;

    return totalDailyEstArr;


  }

  function changeInputColor(input, value){
        $(input).removeClass();
        if (value > 0){
            $(input).addClass('high-risk');
        }else if(value == 'spc'){
            $(input).addClass('lessthan30');

        }
        return value;
  }

  function getDPEstString(num,DailyPool){
    if(DailyPool == '&nbsp'){
      return '';
    }else{
      return 'Out of ' + num + 'hrs'; 
    }
    
  }

  function getDPCtrString(num){
    var plus = (num>0)?'+':'';
    if(num == '&nbsp'){
      return num;
    }else if(num == 'spc'){
      return '<30mins';
    }

    else{
      return plus + num + 'hrs'; 
    }
    
  }

  // $('#dp0class').map(function () {//, #dp1class, #dp2class, #dp3class, #dp4class, #dp5class, #dp6class, #dp7class, #dp8class, #dp9class

      // Score Color
      // var score = parseInt($(this).text().trim());
      // var color = 'red';
      // if (!isNaN(score)) {
      //     if (score >= DailyPoolEst*0.5) {
      //         color = 'orange';
      //     }
      //     if (score >= DailyPoolEst*0.7) {
      //         color = 'green';
      //     }
      //     $(this).css('color', color);
      // }
      
    // $('#dp0class').css({
    //   color: red,

    // });
// });
  

  // function getupdateEndDate(ID){
  //   var tempdate = new Date(document.getElementById("EndDateID").value);
  //     if(document.getElementById("EndDateID").value){
  //       tempdate.setDate(tempdate.getDate() + 1);
  //       // console.log(String(document.getElementById("EndDateID").value));
  //       return String(tempdate);
  //     }
  //     else{return getDate(stringifyObject(items.get(ID).end));}
  //   }

    function getupdateEndDate(ID){
      if(document.getElementById("EndDateID").value){
        return document.getElementById("EndDateID").value
      }
      else{return getDate(stringifyObject(items.get(ID).end));}
    }
  // function test1(){
    //   var D = new Date('2019-01-02').getTime();
    //     var itemsPerDay = items.get({
    //           filter: function (item){
    //             return (D >= item.start.getTime() && D < item.end.getTime());
    //           }

    //     });

    //   // result = itemsPerDay.map(a => a.dailyestimate).reduce(add);  // document.getElementById("logDailyEstPool").innerHTML = "";    
    //   document.getElementById("logDailyEstPool").innerHTML = result;


    //   }

  function getRGBvalue(id){
    var rgb = (String(items.get(id).style).replace(/[^\d,]/g, '').split(',').map(function(item){return parseInt(item,10);}));
      // rgb = (String(items.get(id).style).replace(/[^\d,]/g, '').split(',')).map((item) => {return parseInt(item,10);});
      var r = rgb[0];
      var g = rgb[1];
      var b = rgb[2];
      var colourInput = rgbToHex(r,g,b);
      return colourInput;
  }
  function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function StringToHex(str) {
    if(str.includes("#")){return str.substring(str.indexOf("#"));}
    else{return '';}
} 

  function getColorPicker(id){
    // var color = rgbToHex(getRGBvalue(id));
    if(getRGBvalue(id) != "")
    if(document.getElementById("ColorPickerID").value){
      // console.log(document.getElementById("ColorPickerID").value);
            return document.getElementById("ColorPickerID").value;
          }
          else{return '';}
    }

function getColour(colorpicker){
    var colourcode;    
    // if(colorpicker == ''){
    //   switch(priority){
    //     case 0:
    //       colourcode = 'background-color: rgb(240,240,240)';
    //       break;
    //     case 1:
    //       colourcode = 'background-color: rgb(104, 207, 255)';
    //       break;
    //     case 2:
    //       colourcode = 'background-color: rgb(255, 240, 79)';
    //       break;
    //     case 3:
    //       colourcode = 'background-color: rgb(255, 50, 50)';
    //       break;
    //     default:
    //       return '';
    //   }
    // }else{
        colourcode = 'background-color: ' + colorpicker;
      // }
      // console.log(colourcode + ' Logan');
      return colourcode;

    }

    function getPriorityString(priority){

      var PriorityString;    
      switch(priority){
        case 0:
          PriorityString = 'Low';
          break;
        case 1:
          PriorityString = 'Moderate';
          break;
        case 2:
          PriorityString = 'High';
          break;
        case 3:
          PriorityString = 'Critical';
          break;
        default:
          return '';
      }
      return PriorityString;

    }

    function getPriority(id){
      if(document.getElementById("PriorityID").value){
        return parseInt(document.getElementById("PriorityID").value,10);

      }
      else{
        return parseInt(items.get(id).priority,10);
      }
    }
    
    function getStyle(id){
      if(document.getElementById("PriorityID").value){
        return document.getElementById("PriorityID").value;

      }
      else{
        return items.get(id).priority;
      }
    }

    function getPosDate(date,startdate,scale){
      return (new Date(getDateString(date)).getTime() - new Date(getDateString(new Date(startdate))).getTime()) / scale;
    }
  function getthetime(date){
    return date.getTime()
  }

  function getHexFromString(string) {
      // console.log(string);
    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the string, HEX or RGB?
    if (string.match(/^rgb/)) {
        // If HEX --> store the red, green, blue values in separate variables
        string = string.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = string[1];
        g = string[2];
        b = string[3];
    } 
    else {
        
        // If RGB --> Convert it to HEX: http://gist.github.com/983661
        string = +("0x" + string.slice(1).replace( 
        string.length < 5 && /./g, '$&$&'));
        r = string >> 16;
        g = string >> 8 & 255;
        b = string & 255;
    }
    return String(r + ' ' + g + ' ' + ' ' + b);
    // // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    // hsp = Math.sqrt(
    // 0.299 * (r * r) +
    // 0.587 * (g * g) +
    // 0.114 * (b * b)
    // );
    // // Using the HSP value, determine whether the string is light or dark
    // if (hsp>127.5) {
    //     return true;
    // } 
    // else {
    //     return false;
    // }
}