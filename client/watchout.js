// start slingin' some d3 here.
var asteroids = ['asteroid1.svg', 'asteroid2.svg', 'asteroid4.svg', 'asteroid5.svg', 'asteroid6.svg', 'asteroid7.svg', 'asteroid8.svg'];
var boardAsteroids = []
var boxHeight = "100vh";
var boxWidth = "100vw";
var score = '0';
var high = '0';


for (var i = 0; i < 25; i++) {
  boardAsteroids.push(asteroids[Math.floor(Math.random() * asteroids.length)]);
}

function collision () {
  var scoreboard = d3.select('.scoreboard');

  var highScore = scoreboard
                    .selectAll('.highscore').selectAll('span')
                    .text(function () {
                      if (Number(score) > Number(high)) {
                        console.log("score", score, "highScore", high)
                        high = score;
                        return score;
                      } else {
                        console.log("not high", high, score)
                        return high;
                      }
                    });

  var currentScore = scoreboard
                       .selectAll('.current').selectAll('span')
                       .text('0');

  setTimeout(function () { score = 0}, 100);

  var collisions = scoreboard
                    .selectAll('.collisions').selectAll('.collisions-wrapper')
                    .append("svg:image")
                    .attr("xlink:href", 'collision-ship.svg')
                    .attr('class', 'collision-ship')
}
var box = d3.select('.board')
              .append('svg')
              .attr('width', boxWidth)
              .attr('height', boxHeight)
              .on('mouseout', collision)

var asteroid = box.selectAll('div')
             .data(boardAsteroids)
             .enter()
             .append("svg:image")
             .attr('x', function () { return Math.random() * 1500 })
             .attr('y', function () { return Math.random() * 1500 })
             .attr('r', function () { return Math.random() * 100  })
             .attr('class', 'asteroid')
             .attr("xlink:href", function (d) { return d })
             .on('mouseover', collision);


function moveAsteroids () {
  var asteroids = box.selectAll('.asteroid')
                     .attr('x', function () { return Math.random() * 1500; })
                     .attr('y', function () { return Math.random() * 1500; })
}

setInterval(moveAsteroids, 1000);

function incrementScore () {
  score = "" + (Number(score) + 1);
  var currentScore = d3.select('.scoreboard')
                       .selectAll('.current').selectAll('span')
                       .text(score);
}

setInterval(incrementScore, 200);
