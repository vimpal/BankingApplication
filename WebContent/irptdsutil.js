
var dataStoreInUtil = null;

function checkandInit() {

	if(dataStoreInUtil == null) {
		if(sessionStorage.irpt_ds == null)
			dataStoreInUtil = ds;
		else
			dataStoreInUtil =  JSON.parse(sessionStorage.irpt_ds);
	}
}

//to get required data to grid
function fetchData(tableName,columnName,condition)
{	
   checkandInit();	  
   var returnExpression = "";
   
  if(condition.length == 0)
  {  
  for(var tableIndex = 0; tableIndex < dataStoreInUtil.children.length; tableIndex++)
  	{
    	if(dataStoreInUtil.children[tableIndex].name == tableName)
    	{    	     
    	    if(dataStoreInUtil.children[tableIndex].records.length> 0)
    	    {
            var firstRow = dataStoreInUtil.children[tableIndex].records[0]; 
            returnExpression = returnExpression + firstRow[columnName];
            }
       	}
    }  
  }
  else
  {
    var firstCondition = condition[0];
  
	var results = dojox.json.query("$.children[?name='"+tableName+"'][0].records[?"+firstCondition+"]",dataStoreInUtil );
	
	 for(var index = 0; index < results.length; index++)
  		{  	  	
  	 	  	  if(index == results.length-1)
    	 	   {
    	 	   	  returnExpression = returnExpression + results[index][columnName];
    	 	   }
    	 	   else
    	 	   {
    	 	   	  returnExpression = returnExpression + results[index][columnName]+",";
    	 	   }  	 	 
  		}
  	}
	
	sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
	return returnExpression;
	
}

//to get required data to grid into an element
function getData(tableName,columnName,condition)
{
	checkandInit();	
	var returnExpression = "";
   
  if(condition.length == 0)
  {  	
  	for(var tableIndex = 0; tableIndex < dataStoreInUtil.children.length; tableIndex++)
  	{
    	if(dataStoreInUtil.children[tableIndex].name == tableName)
    	{    	     
    	    if(dataStoreInUtil.children[tableIndex].records.length> 0)
    	    {
            var firstRow = dataStoreInUtil.children[tableIndex].records[0]; 
            returnExpression = returnExpression + firstRow[columnName];
            }
       	}
    }  
  }
  else
  {
    var firstCondition = condition[0];  
	var results = dojox.json.query("$.children[?name='"+tableName+"'][0].records[?"+firstCondition+"]",dataStoreInUtil );	
	 for(var index = 0; index < results.length; index++)
  		{  	  	
  	 	  	  if(index == results.length-1)
    	 	   {
    	 	   	  returnExpression = returnExpression + results[index][columnName];
    	 	   }
    	 	   else
    	 	   {
    	 	   	  returnExpression = returnExpression + results[index][columnName]+",";
    	 	   }  	 	 
  		}
  	}  	  
	 sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
	 return returnExpression;
}

//to set input data to datastore
function setData(tableName,columnName,inputValue,condition)
{
	checkandInit();
   if(columnName == "id")
   {
	  alert("Cannot edit column 'id' as it is a Primary Key Column!!");
	  return;
   }
 
  var firstCondition = null;
  if(condition.length == 0)
  { 
  	for(var tableIndex = 0; tableIndex < dataStoreInUtil.children.length; tableIndex++)
  	{
    	if(dataStoreInUtil.children[tableIndex].name == tableName)
    	{    	     
    	    if(dataStoreInUtil.children[tableIndex].records.length> 0)
    	    {
            var firstRow = dataStoreInUtil.children[tableIndex].records[0]; 
             firstRow[columnName]= inputValue;
            }
       	}
    }  
  }
  else
  {
   var firstCondition = condition[0];  
  var results = dojox.json.query("$.children[?name='"+tableName+"'][0].records[?"+firstCondition+"]",dataStoreInUtil);
  
  for(var index = 0; index < results.length; index++)
  {
  	  results[index][columnName] = inputValue;  	    
  } 
  }  
  sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
}

//inserting a row based into required table record
function insertRow(tableName , values)
{   
	checkandInit();
  for(var index = 0; index < dataStoreInUtil.children.length; index++)
  {
    if(dataStoreInUtil.children[index].Table == tableName)
    {
    	var numberOfRows = dataStoreInUtil.children[index].records.length + 1;
       var records = dataStoreInUtil.children[index].records;
       var itemToInsert = {"id":(Math.floor(Math.random() * 10000000 + 1))};
  		for(var key in values)
  		{
    		itemToInsert[key] = values[key];
  		} 
       records.push(itemToInsert);      
    }
  }    
  sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
}

//to retrieve number of records in the given table
function rowCount(tableName)
{
	checkandInit();
  	for(var index = 0; index < dataStoreInUtil.children.length; index++)
  	{
    	if(dataStoreInUtil.children[index].Table == tableName)
    	{
    		var numberOfRows = dataStoreInUtil.children[index].records.length ; 	 		
  			console.log("number of rows in " + tableName + " : " + numberOfRows);
  			
		}
	}
  	sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
}

//to update datarow based on the index of datarow passed
function updateField(tableName,datarowIndex,datafieldValue)  
{
	checkandInit();
  	for(var index = 0; index < dataStoreInUtil.children.length; index++)
  	{
    	if(dataStoreInUtil.children[index].Table == tableName)
    	{  	  
      		var rowToUpdate = dataStoreInUtil.children[index].records[datarowIndex - 1];
  			 for(var key in datafieldValue)
   				{
    				rowToUpdate[key] = datafieldValue[key];
   				}   			
		}   
	}
  	sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
}

//to filter all rows based on given datafieldValue and update them with datarow values passed
function updateRow(table,datarow,datafieldValue)
{
	checkandInit();
    var fieldValueToBeMatched;
  	var fieldKeyValue;
  	for(var key in datafieldValue)
  	{
    	fieldKeyValue = key;
    	fieldValueToBeMatched = datafieldValue[key];
  	}
  
  	for(var index = 0; index < dataStoreInUtil.children.length; index++)
  	{
    	if(dataStoreInUtil.children[index].Table == tableName)
    	{
    		var numberOfRows = dataStoreInUtil.children[index].records.length ; 
    		for(var index = 0; index < numberOfRows; index++)
    		{
    			if(dataStoreInUtil.children[index].records[key] == fieldValueToBeMatched)
    			{
    			   for(var key in datarow)
	    			{
	    				dataStoreInUtil.children[index].records[index][key] = datarow[key];
	    			}
    			}    		
    		}    		
    	}
	}
  	sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
	}

//fetch rows from table based on the count passed
 function fetchRows(tableName, numberOfRows)
 { 
    checkandInit();
    var rowsArray = new Array();
    
  	for(var index = 0; index < dataStoreInUtil.children.length; index++)
  	{
    	if(dataStoreInUtil.children[index].Table == tableName)
    	{
    	 for(var rowIndex=0;rowIndex < numberOfRows; rowIndex++)
    		{       
              rowsArray[rowIndex] = dataStoreInUtil.children[index].records[rowIndex];
       		}
       	}
    }       		
       	var jsonArrayValue = JSON.stringify(rowsArray);     
       	sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
    }    	
 	
 
 
 //fetch rows based on dataFieldValue
  function fetch(tableName, dataFieldValue)
  {  	
     checkandInit();
    var rowsArray = new Array();
    var fieldValueToBeMatched;
  	var fieldKeyValue;
  	for(var key in dataFieldValue)
  	{
    	fieldKeyValue = key;
    	fieldValueToBeMatched = dataFieldValue[key];
  	}
  	
  	for(var index = 0; index < dataStoreInUtil.children.length; index++)
  	{
    	if(dataStoreInUtil.children[index].Table == tableName)
    	{
    		var numberOfRows = dataStoreInUtil.children[index].records.length ; 
    		for(var rowIndex = 0; rowIndex < numberOfRows; rowIndex++)
    		{
    			if(dataStoreInUtil.children[index].records[rowIndex][key] == fieldValueToBeMatched)
    			{
    				rowsArray[rowindex] = dataStoreInUtil.children[index].records[rowIndex];
    			}
    			
     var jsonArrayValue = JSON.stringify(rowsArray);       
  	}  	  
  }
  }  
  	sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
  }
 
 //to delete rows based on the dataFieldValue passed and 
  function deleteRows(table, dataFieldValue)
   {      
    checkandInit();
    var fieldValueToBeMatched;
  	var fieldKeyValue;
  	for(var key in dataFieldValue)
  	{
    	fieldKeyValue = key;
    	fieldValueToBeMatched = dataFieldValue[key];
  	}
  	
  	for(var index = 0; index < dataStoreInUtil.children.length; index++)
  	{
    	if(dataStoreInUtil.children[index].Table == tableName)
    	{
    		var numberOfRows = dataStoreInUtil.children[index].records.length ; 
    		for(var rowIndex = 0; rowIndex < numberOfRows; rowIndex++)
    		{    		 
    		   //dataStoreInUtil.children[index].records[rowIndex]["id"] =  rowIndex;
    			if(dataStoreInUtil.children[index].records[rowIndex][key] == fieldValueToBeMatched)
    			{
    				var recordsArray = dataStoreInUtil.children[index].records;
    				recordsArray.splice(rowIndex,1);
    				numberOfRows = numberOfRows - 1;
    				if(numberOfRows !=  rowIndex)
	  	   			{
	  	   				rowIndex = rowIndex - 1;
	  	   			}
    			}
    	}
    }
   }
  	sessionStorage.irpt_ds = JSON.stringify(dataStoreInUtil);
  }
    			
 	 