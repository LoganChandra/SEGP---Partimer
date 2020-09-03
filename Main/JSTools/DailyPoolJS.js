function Axis2Date(axis){
  var start = timeline.getWindow().start;
  var end = timeline.getWindow().end;
  var scale = (Date.parse(end) - Date.parse(start))/$('#visualization').width();
  var date = new Date(getDateString(new Date((axis*scale) + Date.parse(start))));
  return date;
}
//Calculates and displays the daily pools
function DispDP(start,end){
      var DateArr = getArrVisDates(start,end);
      // console.log(DateArr);
      var offset;
      // window.totalDailyEstArr = DailyPoolTest(DailyPoolEst); 
      var xDate;
      var TWidth = $('#visualization').width();
      var scale = (Date.parse(end) - Date.parse(start))/TWidth;
      // console.log(start + ', ' + end + '-' + scale);
      // console.log(scale);
      var xDate = new Array(10);
      for(var i = 0 ;i < xDate.length ;i++){
      xDate[i] = ((Date.parse(new Date(getDateString(new Date(DateArr[i])))) - Date.parse(start))) / scale;
    }
      
      // console.log(xDate);
      $('#dp0class').css({
        left: xDate[0],//getPosDate(new Date(DateArr[0]),properties.start,scale)
        // content: DailyPool[0],
      });
      $('#dp1class').css({
        left: xDate[1],
        // content: DailyPool[1],
      });
      $('#dp2class').css({
        left: xDate[2],
        // content: DailyPool[2],
      });
      $('#dp3class').css({
        left: xDate[3],
        // content: DailyPool[3],
      });
      $('#dp4class').css({
        left: xDate[4],
        // content: DailyPool[4],
      });
      $('#dp5class').css({
        left: xDate[5],
        // content: DailyPool[5],
      });
      $('#dp6class').css({
        left: xDate[6],
        // content: DailyPool[6],
      });
      $('#dp7class').css({
        left: xDate[7],
        // content: DailyPool[7],
      });
      $('#dp8class').css({
        left: xDate[8],
        // content: DailyPool[8],
      });
      $('#dp9class').css({
        left: xDate[9],
        // content: DailyPool[9],
      });
      // $('#testmove1').offset().left = x;
      // // logEvent('rangechange', properties);
      //       console.log(x);
    // });
  }
    function setDailyPool(){
      window.DailyPoolEst = parseInt(document.getElementById('DailyPoolID').value,10);
    }
    function setMaxSearchDate(){
      window.MaxRescheduleDate = new Date(document.getElementById('MaxSearchDateID').value);
    }
    document.addEventListener('click', function (event) {
    
    if (event.target.closest('.task_form')) return;
          document.getElementById("TaskForm").style.display = "none";
    
    }, false);
    
    // document.addEventListener('click', function (event) {
    
    // if (event.target.closest('.topnav')){ return;}
    //   // if(!window.ReschdDropDownOpen) 
    //   // document.getElementById("RescheduleDropdown").style.display = "none";
    //   console.log(document.getElementById("RescheduleDropdown").classList.toggle("show"));
    // }, false);
    
