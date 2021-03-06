



//penguins is the array of data
//target is the selection of the g element to place the graph in
//xscale,yscale are the x and y scales.
var drawLines = function(penguins,target,
                         xScale,yScale)
{     var lineGenerator = d3.line()
        .x(function(weight,i) 
           {
            return xScale(i);
        })
        .y(function(weight)   
           { console.log(weight.grade)
            return yScale(weight.grade);
        })
    
    
    var lines = d3.select("svg")
        .select("#graph")
        .selectAll("g")
        .data(penguins)
        .enter()
        .append("g")
        .classed("line",true)
    
    
    .on("mouseover",function(penguins)
{   
    if(! d3.select(this).classed("off"))
    {
        d3.selectAll(".line")
            .classed("fade",true);
            
        d3.select(this)
            .classed("fade",false)
            .raise()
            .attr("fill", "yellow")
            //move to top
        
         var xPos=d3.event.pageX;
      var yPos=d3.event.pageY;
      d3.select("#tooltip")
      .classed("hidden", false)
      .style("top", xPos+"px")
      .style("left", yPos+"px")
        d3.select("img")
        .attr("src","imgs/"+ penguins.picture)
        
    }
})
.on("mouseout",function(penguins)
{
    if(! d3.select(this).classed("off"))
    {
        d3.selectAll(".line")
        .classed("fade",false);
    }
})
    
    lines.append("path")
        .datum(function(penguin) 
            { return penguin.quizes;})
        .attr("d",lineGenerator); 
   
    
    lines.append()
    .datum(penguins)
    .attr("class", "line")
    .attr("d", lines);
}


var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}


//graphDim is an object that describes the width and height of the graph area.
//margins is an object that describes the space around the graph
//xScale and yScale are the scales for the x and y scale.
var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  var axes = d3.select("svg")
      .append("g")
  axes.append("g")
      .attr("transform","translate("+margins.left+","
           +(margins.top+graphDim.height)+")")
      .call(xAxis)
  axes.append("g")
      .attr("transform","translate("+margins.left+","
           +(margins.top)+")")
      .call(yAxis)
   
 
}


//graphDim -object that stores dimensions of the graph area
//margins - object that stores the size of the margins
var drawLabels = function(graphDim,margins)
{
  var labels = d3.select("svg")
  .append("g")
  .classed("labels",true)

labels.append("text")
  .text("Days")
  .classed("title",true)
  .attr("text-anchor","middle")
  .attr("x",margins.left+(graphDim.width/2))
  .attr("y",margins.top)

labels.append("text")
  .text("Quizes")
  .classed("label",true)
  .attr("text-anchor","middle")
  .attr("x",margins.left+(graphDim.width/2))
  .attr("y",screen.height)

labels.append("g")
  .attr("transform","translate(20,"+
        (margins.top+(graphDim.height/2))+")")
  .append("text")
  .text("Quiz Score")
  .classed("label",true)
  .attr("text-anchor","middle")
  .attr("transform","rotate(90)")

}





//sets up several important variables and calls the functions for the visualization.
var initGraph = function(penguins)
{
    //size of screen
    var screen = {width:800,height:600}
    //how much space on each side
    var margins = {left:100,right:20,top:20,bottom:30}
    
    
    
    var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }
    console.log(graph);
    
    d3.select("svg")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target = d3.select("svg")
    .append("g")
    .attr("id","graph")
    .attr("transform",
          "translate("+margins.left+","+
                        margins.top+")");
    
    var maxDay = d3.max(penguins[0].quizes,
                        function(quiz)
                        {return quiz.day});
    
    var xScale = d3.scaleLinear()
        .domain([1,maxDay])
        .range([0,graph.width])

    var yScale = d3.scaleLinear()
        .domain([0,10])
        .range([graph.height,0])
    
    drawAxes(graph,margins,xScale,yScale);
    drawLines(penguins,target,xScale,yScale);
    drawLabels(graph,margins);
   
}




var successFCN = function(penguins)
{
    console.log("penguins",penguins);
    initGraph(penguins);
}

var failFCN = function(error)
{
    console.log("error",error);
}

var polPromise = d3.json("classData.json")
polPromise.then(successFCN,failFCN);