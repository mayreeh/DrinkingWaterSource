//loading csv file usng d3 js library
d3.csv("kenya-tuberculosis-prevalence-per-county.csv", function(data) {
//create an empty array and store the data(Counties) in the array
var counties = [];
var tbData = [];
for (var num in data) {
	var dd = data[num]['Counties'];
  var tbdd = data[num]['Tuberculosis prevalence'];
	 counties.push(dd);
   tbData.push(tbdd);
}

//display pie chart
var piedata = [
{
     values: tbData,
     labels: counties,
     type: 'pie'
  }
];

var layout = {
  height: 680,
  width: 880
};

Plotly.newPlot('myDiv', piedata, layout);

//storing the counties in a drop down list to be used in filetering results.
var s = document.getElementById('countyName');
for(var i = 0; i < counties.length; i++){
   var t = document.createElement("option")
   var countyname   = counties[i];
   t.value = countyname;
   t.textContent = countyname;
   s.appendChild(t);
}

//populating  tabular TB results as per county
var table = document.getElementById("myTable");
for(var i = 0; i < data.length; i++)
{
if(data[i]['Counties'] !== "" || data[i]['Tuberculosis prevalence'] !== "") {
      var row = table.insertRow(0);
    	var cell1 = row.insertCell(0);
    	var cell2 = row.insertCell(1);
    	cell1.innerHTML =  data[i]['Counties'];
    	cell2.innerHTML = data[i]['Tuberculosis prevalence'];
    }

}
});

//Filoer list from the drop ist of counties
function onChangeHandler(county)
{
  //document.getElementById("myTable").innerHTML = "";
  d3.csv("kenya-tuberculosis-prevalence-per-county.csv", function(data) {
      //fileter the county selected and display the number of TB cases
      var filterCountyData = data.filter(function()
         {
             csv = data.filter(function(row) {
             return row['Counties'] == county;
            })
        });
        document.getElementById("tb").innerHTML = csv[0]['Tuberculosis prevalence'] + " TB Cases Reported ";

  });

}
