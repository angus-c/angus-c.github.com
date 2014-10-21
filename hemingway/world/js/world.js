/*
 * With thanks to http://techslides.com/responsive-d3-map-with-zoom-and-pan-limits/ for
 * base map behavior
 */

d3.select(window).on("resize", throttle);

var width = document.getElementById('map').offsetWidth-60;
var height = width / 2;

var topo, projection, path, svg, g;

var tooltip = d3.select("#map").append("div").attr("class", "tooltip hidden");

setup(width,height);

function setup(width,height){
  projection = d3.geo.mercator()
    .translate([0, 0])
    .scale(width / 2 / Math.PI);

  path = d3.geo.path()
      .projection(projection);

  svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  g = svg.append("g");

}

d3.json("data/world-topo.json", function(error, world) {

  var countries = topojson.feature(world, world.objects.countries).features;

  topo = countries;
  draw(topo);

});

function draw(topo) {

  var country = g.selectAll(".country").data(topo);

  country.enter().insert("path")
      .attr("class", "country")
      .attr("d", path)
      .attr("id", function(d,i) { return d.id; })
      .attr("title", function(d,i) { return d.properties.name; })
      .style("fill", function(d, i) {
        return sites[d.properties.name] ? sites[d.properties.name].color : "#D1D2D1"
      });

  //ofsets plus width/height of transform, plsu 20 px of padding, plus 20 extra for tooltip offset off mouse
  var offsetL = document.getElementById('map').offsetLeft+(width/2)+40;
  var offsetT =document.getElementById('map').offsetTop+(height/2)+20;

  //tooltips
  country
    .on("mousemove", function(d,i) {
      var country = d.properties.name;
      if (sites[country]) {
        var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
          tooltip
            .classed("hidden", false)
            .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px")
            .html(d.properties.name)
        }
      })
      .on("mouseout",  function(d,i) {
        tooltip.classed("hidden", true)
      })
      .on("click", function(d,i) {
        var country = d.properties.name;
        if (sites[country]) {
          location.href = "http://www.amazon" + sites[country].domain + "/gp/product/1593275854/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1593275854&linkCode=as2&tag=ifhemwrojav-20&linkId=HEHXBBWQN7YSZSYD"
        }
      })

}

function redraw() {
  width = document.getElementById('map').offsetWidth-60;
  height = width / 2;
  d3.select('svg').remove();
  setup(width,height);
  draw(topo);
}

var throttleTimer;
function throttle() {
  window.clearTimeout(throttleTimer);
    throttleTimer = window.setTimeout(function() {
      redraw();
    }, 200);
}

var sites  = {
  'United States': {
    domain: '.com',
    color: '#953B1F'
  },
  'United Kingdom': {
    domain: '.co.uk',
    color: '#E6729D'
  },
  'France': {
    domain: '.fr',
    color: '#193DBB'
  },
  'Japan': {
    domain: '.jp',
    color: '#72390C'
  },
  'Germany': {
    domain: '.de',
    color: '#7B1A64'
  },
  'India': {
    domain: '.in',
    color: '#F37615'
  },
  'China': {
    domain: '.cn',
    color: '#CC0000'
  },
  'Italy': {
    domain: '.it',
    color: '#4EB849'
  },
  'Canada': {
    domain: '.ca',
    color: '#8D95E1'
  },
  'Spain': {
    domain: '.es',
    color: '#FCD308'
  }
}