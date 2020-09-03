//These functions are just tools for the main ones at the bottom
function getEachDayEst(id){
  var item = items.get(id);
  var result = Math.round((item.dailyestimate/getNextDayTaskDur(item.id))/60);
  return result; 
}

function CalPotential(id){
    var item = items.get(id);
    var potential = 1;
    var dailyests = new Array();
    var priorities = new Array();
    var i = 0;
    while(i < window.reschd.length){
      dailyests.push(items.get(parseInt(window.reschd[i],10)).dailyestimate);
      priorities.push(items.get(parseInt(window.reschd[i],10)).priority/4);
      i++;
    }
    potential *= parseFloat(item.dailyestimate/Arrsum(dailyests));
    potential *= parseFloat((item.priority+1)/4);
    // console.log(Arrsum(dailyests) + ', ' + item.priority);
    return potential;
    // potential += item.arrAvg()
    // if(item.)
  }
  // console.log(CalPotential(1) + ', ' + CalPotential(2) + ', ' + CalPotential(3) + ', ' + CalPotential(4));
  
  function movetask(id,dir){
    var item = items.get(id);
    var tempstartDate = new Date(item.start);
    var tempendDate = new Date(item.end);
    if(dir == 'left'){
    items.update(
    
          {id: id,
           content: item.content, 
           dailyestimate:item.dailyestimate,
           projectname:item.projectname, 
           start: new Date(tempstartDate.setDate(tempstartDate.getDate() - 1)), 
           end: new Date(tempstartDate.setDate(tempstartDate.getDate() - 1)),
           notes: item.notes,
           priority: item.priority,
           style: item.style,
           type: item.type}
          );
    }else if(dir == 'right'){
    
      items.update(
          {id: id,
           content: item.content,
           dailyestimate:item.dailyestimate,
           projectname:item.projectname, 
           start: new Date(tempstartDate.setDate(tempstartDate.getDate() + 1)), 
           end: new Date(tempendDate.setDate(tempendDate.getDate() + 1)),
           notes: item.notes,
           priority: item.priority,
           style: item.style,
           type: item.type}
          );
    
    }
    // console.log(checkFixedDlyEst());
    // return checkFixedDlyEst();
  }

  function MoveTaskNTimes(id,n){
    var item = items.get(id);
    var windowend = timeline.getWindow().end;
    var tempstartDate = new Date(item.start);
    var tempendDate = new Date(item.end);
    item.start = new Date(tempstartDate.setDate(tempstartDate.getDate() + n));
    item.end = new Date(tempendDate.setDate(tempendDate.getDate() + n));
    items.update(item);
    // console.log('Ready to move ' + id + ' ' + n + ' spaces');
    
  }

  function MovedToItem(callback,id,n){
    var item = items.get(id);
    var tempendDate = new Date(item.end); 
    var tempendDateTest = new Date(tempendDate);
    tempendDateTest.setDate(tempendDateTest.getDate() + (n+1));

    if(tempendDateTest <= timeline.getWindow().end){  
      callback(id,n);
      return true;
    }
    return false;
  }

  function waitFor(condition, callback) {
    if(!condition()) {
        console.log('waiting');
        window.setTimeout(waitFor.bind(null, condition, callback), 100);
    } else {
        console.log('done');
        callback();
    }
  }

  function WaitUntilSafe(id,callback){

    waitFor(() => MoveUntilSafe(id), () => {callback();});

  }

  function getUnbalancedDates(){
    var temparr = new Array();
    temparr = getoverbudget();
    var result = new Array();
    while(temparr.length != 0){
      result.push(getDlyEstDate(temparr.pop()));
    }
    // console.log(temparr);
    return temparr;
  }

  function getstartendDate(id){
    var temp = new Array();
    temp.push(items.get(id).start);
    temp.push(items.get(id).end);
    return temp;
  }

  function checkFixedDlyEst(){
    var dlyestArr = window.DailyPoolArr; 
    var i = 0;
    var res = true;
    while(i < dlyestArr.length){
      if(dlyestArr[i] > 0){
        res = false;
        break;
      }
      i++;
    }
    return res;
  }

  function getDlyEstArr(){
    var tempdate = window.DailyPoolArr;
    var result = new Array();
    var i = 0;
    while(i < tempdate.length){
      if(tempdate[i] == '&nbsp'){
        result.push();
      }
    }
  }

  function getoverbudgetDates(){
    var temparr = new Array();
    var result = new Array();
    temparr = window.DailyPoolArr;
    var datearr = getDateArr(timeline.getWindow().start, new Date((timeline.getWindow().end).setDate(timeline.getWindow().end.getDate() - 1)));
    var i = 0;
    while(i < temparr.length){
      // console.log(i);
      if(parseInt(temparr[i],10) > 0){
        result.push(datearr[i]);
        
      }
      
      i++;
    
    }
    return result;
  }

  

  function ismovesafe(id){
    function isclearlocal(id){
    // var temparr = new Array();
    // temparr = window.reschd;
    
    var start = new Date(items.get(id).start);
    var end = new Date(items.get(id).end);
    
    var maxRangeDate = new Date(end.setDate(end.getDate() + window.MaxRescheduleRange));
    // var temp = ismovesafe(id);
    // var DatetoMove = new Date(end.setDate(end.getDate() + temp + 1));

    // start = new Date(rounddate(start));
    // start.setDate(new Date(start.getDate() + 1));

    // end.setDate(new Date(end.getDate()  1));
    // end = new Date(rounddate(end));
    // console.log(start);
    // console.log(end); 
    // console.log(OvrBudgetDates);
    // console.log(temparr);
    var out = true;
    var i = 0;

    for (var d = start; d < end; d.setDate(d.getDate() + 1)){
      // console.log(d);
      if(getDlyEstForDate(d) > 0){
        // console.log(getDlyEstForDate2(d));  
        out = false;
        break;
      }

    }
    // if(end >= )
      return out;
      }

    var clear = isclearlocal(id);
    if(!clear){
    var start = new Date(items.get(id).start);
    var end = new Date(items.get(id).end);
    var testnum;
    var val;
    var res = new Array();
    // var datearr = new Array();
    // start.setDate(start.getDate() - 1);
    // end.setDate(end.getDate() + 1);
    // console.log(start + ', ' + end);
    for (var d = start; d < end; d.setDate(d.getDate() + 1)){

      // res.forEach(function(item){
        
        testnum = getDlyEstForDate(d);
      //   // console.log(testnum);
        res.push(!(testnum > 0));
      
      // });
    }

    testnum = getDlyEstForDate(end) + getEachDayEst(id);
    // console.log(testnum);
    res.push(!(testnum > 0));
    // console.log(getDlyEstForDate(end));
    // console.log(res);
    // if(res[0] == true){
    //   val = true
    // }else if()   
    return res.lastIndexOf(false);// && (isclear(id)))
    }
    return -1;
  }

  function isclear(id){
    // var temparr = new Array();
    // temparr = window.reschd;
    
    var start = new Date(items.get(id).start);
    var end = new Date(items.get(id).end);


    // var maxRangeDate = window.MaxRescheduleDate;
    // var temp = ismovesafe(id);
    // var DatetoMove = new Date(end.setDate(end.getDate() + temp + 1));
    
    // console.log(DatetoMove);
    // console.log(maxRangeDate);

    // start = new Date(rounddate(start));
    // start.setDate(new Date(start.getDate() + 1));

    // console.log(start);
    // console.log(end); 
    // end.setDate(new Date(end.getDate()  1));
    // end = new Date(rounddate(end));
    // console.log(OvrBudgetDates);
    // console.log(temparr);
    var out = true;
    var i = 0;

    for (var d = start; d < end; d.setDate(d.getDate() + 1)){
      // console.log(d);
      if(getDlyEstForDate(d) > 0){
        // console.log(getDlyEstForDate2(d));  
        out = false;
        break;
      }

    }
    // if(DatetoMove > maxRangeDate){out = false;}
      return out;
      }

function MaxRangeReached(id,end){
    var temp = ismovesafe(id);
    var endDate = new Date(items.get(id).end);
    var DatetoMove = endDate.addDays(temp + 1);
    return (DatetoMove < end);
  }

  function MoveSafe(id,end,callback){
    var temp = ismovesafe(id);
    var endDate = new Date(items.get(id).end);
    var DatetoMove = endDate.addDays(temp + 1);
    // console.log(DatetoMove + '<br>' + end);        
    

    if((temp > -1) && (DatetoMove < end)){
      MoveTaskNTimes(id,temp + 1);
    }
    // callback();
    return ((temp > -1) && (DatetoMove <= end)?false:true);
      // console.log(temp);
  }

  function MoveUntilSafe(id,end,callback){
    var taskenddate = new Date(items.get(id).end);
    var enddate = new Date(timeline.getWindow().end);
    // var start = new Date(items.get(id).start);
    // console.log(start);
    // console.log(maxRangeDate);
    var clear = isclear(id);
    // console.log(clear);
      var intervalID = window.setInterval(function(){

        if(MoveSafe(id,end)){    
            callback();
            window.clearInterval(intervalID);
            // return;
        }MoveSafe(id,end);
        // console.log(end);

      }, 10); 
    return isclear(id);
    // return clear;
  
  }

  function IsClearCallback(callback){
    return true;
  }

  function delay(id) {
    return new Promise(resolve => {
      MoveUntilSafe(id,resolve);

  });  
  // return new Promise((resolve, reject) => {
  //   if (!isclear(val)) {
  //     return reject();
  //   }

  //   resolve("Success!!");
  // });
}

  async function AwaitMove(id){

    await delay(id);
    // console.log(id + " done");

  }

  function MoveTaskCallBack(){

    return true;
  
  }
  //Main reschedule function that performs the auto reschedling
  function Reschedule(){
    
    if(document.getElementById('MaxSearchDateID').value == '') {
      window.MaxRescheduleDate = '';
    }else{
      window.MaxRescheduleDate = rounddate(new Date(document.getElementById('MaxSearchDateID').value));
    }

    window.MaxRescheduleRange = document.getElementById('MaxSearchRangeID').value;
    var reschdArr = timeline.getSelection();
    var MaxRangeDate = window.MaxRescheduleDate;
    var MaxRange = parseInt(window.MaxRescheduleRange,10);
    console.log(window.MaxRescheduleDate);
    console.log(window.MaxRescheduleRange);
    var i = 0;
    var tempdatearr = new Array();
    var flag = true;

    if(MaxRangeDate == ''){flag = true;}else{
    while(i < reschdArr.length){
      if(rounddate(new Date(items.get(reschdArr[i]).end)) > MaxRangeDate){
        flag = false;
        break;
      }
      i++;
    }
  }

    console.log(flag);
    if(timeline.getSelection().length > 0){
      if(flag){

    // console.log(window.reschd);
    const datearr = new Array();
    var intervalID;
    var PotentialArr = new Array();
    var doneArr = new Array();
    var j = 0;

    // temparr[0] = [];
    // const reschdArr = new Array();
    // console.log(reschdArr);
    while(j < reschdArr.length){
      datearr.push(rounddate(new Date(items.get(parseInt(reschdArr[j])).end).addDays(MaxRange)));
      j++;
    }
    // datearr.map(date=>
    //   return date.addDays(window.MaxRescheduleRange);
    // });
    reschdArr.sort(function(a, b) {
      return PotentialArr.indexOf(a) - PotentialArr.indexOf(b);
    });

    // console.log(reschdArr);
    // console.log(PotentialArr);
    // var check = true;
    var delayval;
    var counter = 0;

    //Loop that performs the internal loop which makes the actual rescheduling possible
    function RescheduleLoopDefault () {

      // reschdArr.forEach(function(item){
      //   WaitMoveUntilSafe(item);
      // });

      // for (const item of array) {
      //   // MoveUntilSafe(item);
      //   await AwaitMove(item);
      //   console.log(item);
      // }

      // };

      // temp = reschdArr[0];
      // setTimeout(function () {

        // MoveUntilSafe(reschdArr[counter]);
        // waitFor(() => MoveUntilSafe(reschdArr[counter]), RescheduleLoop);
        // (window.doneArr).push(isclear(reschdArr[counter]));
        // setTimeout(function () {counter++;}, 100);
        
        if (counter < reschdArr.length) {
        
          MoveUntilSafe(reschdArr[counter],datearr[counter],function() {RescheduleLoopDefault();});
          console.log(reschdArr[counter]);
          counter++;
        
        }

        //waitFor(() => isclear(reschdArr[counter - 1]), RescheduleLoop);
        // console.log(reschdArr[counter]);
        //RescheduleLoop();
      // }, 100)

      // reschdArr.forEach(function(item) {
      //   WaitUntilSafe(item,() => {});
      // });

    //   reschdArr.reduce(MoveUntilSafe);
    };
    function RescheduleLoopMaxRange () {

        if (counter < reschdArr.length) {MoveUntilSafe(reschdArr[counter],MaxRangeDate,function() {RescheduleLoopMaxRange();});console.log(reschdArr[counter]);counter++;}//waitFor(() => isclear(reschdArr[counter - 1]), RescheduleLoop);

    };

    //   RescheduleLoop();
    if(MaxRangeDate == ''){
      RescheduleLoopDefault();
    }else if(MaxRangeDate != ''){RescheduleLoopMaxRange();}

    
      window.reschd = new Array();
      }else {alert("The max. search range date must be after the tasks to be rescheduled");return;}
    }else{alert("Please select the tasks to be rescheduled");return;}
    

    // return doneArr;
    // Reschedule();
    // const promiseSerial = funcs =>
    //   funcs.reduce((promise, func) =>
    //     promise.then(result =>
    //       func().then(Array.prototype.concat.bind(result))),
    //     Promise.resolve([]))

    // const funcs = reschdArr.map(id => () => MoveUntilSafe(id))
    
    // // convert each url to a function that returns a promise
    
    // // execute Promises in serial
    // promiseSerial(funcs)
    // .then(console.log.bind(console))
    // .catch(console.error.bind(console))

  }