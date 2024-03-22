function stars() {
    let e = document.createElement('div');
    e.setAttribute('class', 'star');
    document.body.appendChild(e);
    e.style.left = Math.random() * + innerWidth + 'px';

    let size = Math.random() * 12;
    let duration = Math.random() * 3;

    e.style.animationDuration = 2 + duration + 's';
    e.style.fontSize = 12 + size + 'px';

    setTimeout(function(){
        document.body.removeChild(e);
    }, 5000)
}

setInterval(function(){
    stars()
},100)

function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
  }
  function animate(options) {

    var start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      var timeFraction = (time - start) / options.duration;
      if (timeFraction > 1) timeFraction = 1;
  

      var progress = options.timing(timeFraction)
      
      options.draw(progress);
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
  }

  function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      }
    }
  }

  function quad(timeFraction) {
    return Math.pow(timeFraction, 4);
  }

  ball.onclick = function() {

    let height = field.clientHeight - ball.clientHeight;
    let width = 500;

    animate({
      duration: 2000,
      timing: makeEaseOut(bounce),
      draw: function(progress) {
        ball.style.top = height * progress + 'px'
      }
    });

    animate({
      duration: 2000,
      timing: makeEaseOut(quad),
      draw: function(progress) {
        ball.style.left = width * progress + "px"
      }
    });
  }