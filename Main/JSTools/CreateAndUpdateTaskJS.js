function getClickedTime(i){
      if(i === 0){
      if(document.getElementById("StartDateID").value){
        return document.getElementById("StartDateID").value;
      }
      else{return StartDate;}
      }
      else if(i === 1){
       if(document.getElementById("EndDateID").value){
        return document.getElementById("EndDateID").value;
      }
      else{return EndDate;}
      } 
      }
//create a task
function Create(){
      
      var clickedstarttime = new Date(getClickedTime(0));
      var clickedendtime = new Date(getClickedTime(1));
      if(clickedendtime < clickedstarttime){
        clickedendtime.setDate(clickedstarttime.getDate() + 1);
        console.log(clickedstarttime.getDate());
      }
      var colourInput = parseInt(document.getElementById('PriorityID').value,10);
      // console.log(colourInput);
      
      var ID = GenID();
        var dlyest = parseInt((document.getElementById("DlyEstH").value*60),10) + parseInt(document.getElementById("DlyEstM").value,10);
          items.add([
          {id: ID, 
    
           content: document.getElementById("TaskNameID").value,
           dailyestimate:dlyest, 
           projectname:document.getElementById("ProjectNameID").value, 
           start: new Date(clickedstarttime),
           end: new Date(clickedendtime),
           notes: document.getElementById("noteID").value,
           priority: colourInput,
           style: getColour(getColorPicker()),
           type: 'range'}
          ]);
          document.getElementById("TaskForm").style.display = 'none';
          document.getElementById('PriorityID').value = '';
          // document.getElementById("frm1").reset();    
    }
    //update the task
    function Update(ID){
        var dlyest = parseInt((document.getElementById("DlyEstH").value*60),10) + parseInt(document.getElementById("DlyEstM").value,10);
        var clickedstarttime = new Date(getClickedTime(0));
        var clickedendtime = new Date(getupdateEndDate(ID));
        clickedendtime.setDate(clickedendtime.getDate() + 1);
        if(clickedendtime < clickedstarttime){
        clickedendtime.setDate(clickedstarttime.getDate() + 1);
        console.log(clickedstarttime.getDate());
      }
        var PriorityColour = getPriority(ID);//console.log(typeof PriorityColour);
        items.update(
          {id: ID,
           content: document.getElementById("TaskNameID").value,
           dailyestimate:dlyest,
           projectname:document.getElementById("ProjectNameID").value, 
           start: new Date(clickedstarttime), 
           end: new Date(clickedendtime),//.setDate(clickedendtime.getDate() + 1)
           notes: document.getElementById("noteID").value,
           priority: PriorityColour,
           style: getColour(getColorPicker()),
           type: 'range'}
          );
    
          document.getElementById("TaskForm").style.display = "none";
          document.getElementById('PriorityID').value = '';

    }
    //generates the from to show up when double clicked on the timline
    function createForm(id){
      document.getElementById("frm").reset();
      var updateitem = items.get(id);
    
      document.getElementById("CreateUpdateBtn").onclick = function(){Create()};
      document.getElementById("CreateUpdateBtn").innerHTML = 'Create';
      // $('#DuplicateBtn').addClass('nodisplay');
      document.getElementById("DuplicateBtn").style.display = "none";

      document.getElementById("ColorPickerID").value = ''; 

    
    }
    //generates the from to show up when double clicked on the task
    function updateForm(id){
      var updateitem = items.get(id);
      var PriorityColour = getPriority(id)
      var tempendDate = new Date(updateitem.end);//.setDate(updateitem.end.getDate() - 1)
      tempendDate.setDate(updateitem.end.getDate() - 1);
      
      var colourInput = StringToHex(items.get(id).style);
      // console.log(rbg[0] + ', ' + rbg[1] + ', ' + rbg[2]);
      console.log(StringToHex(items.get(id).style));

      document.getElementById("TaskNameID").value = updateitem.content;
      document.getElementById("DlyEstH").value = Math.floor(updateitem.dailyestimate/60);
      document.getElementById("DlyEstM").value = updateitem.dailyestimate%60;
      document.getElementById("ProjectNameID").value = updateitem.projectname;
      document.getElementById("StartDateID").value = getDateString(updateitem.start);
      document.getElementById("EndDateID").value = getDateString(tempendDate);
      document.getElementById("noteID").value = updateitem.notes;
      document.getElementById("PriorityID").value = updateitem.priority;
      document.getElementById("CreateUpdateBtn").onclick = function(){Update(id)};
      document.getElementById("CreateUpdateBtn").innerHTML = 'Update';
      // console.log(getColorPicker());//document.getElementById("ColorPickerID").value
      document.getElementById("ColorPickerID").value = colourInput;
      // document.getElementById("ColorPickerID").value = ''; 
      // console.log(document.getElementById("ColorPickerID").value);
      // $('#DuplicateBtn').addClass('display');
      document.getElementById("DuplicateBtn").style.display = "block";
      // console.log(updateitem);
    } 

    //Handles the duplicate feature 
    function DuplicateTask(){
      if(window.DuplicateID){
      item = items.get(window.DuplicateID);
      var ID = GenID();
          items.add([
          {id: ID, 
    
           content: item.content,
           dailyestimate:item.dailyestimate, 
           projectname:item.projectname, 
           start: item.start,
           end:item.end,
           notes: item.notes,
           priority: item.priority,
           style: item.style,
           type: item.type}
          ]);

          document.getElementById("TaskForm").style.display = 'none';
          // document.getElementById("frm1").reset();    
        }
          window.DuplicateID = null;
    }
