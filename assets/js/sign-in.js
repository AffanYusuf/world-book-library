
particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1,
        "box-shadow": "rgba(0,0,0,0.8) 0 0 10px"
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  
});

function getUsers() { 
    fetch('./data/users.json') // Replace 'data.json' with the path to your JSON file
    .then(response => response.json())
    .then(data => {
        // Data is the parsed JSON object
        console.log('data', data);
       return data;
    })
    .catch(error => {
        console.error('Error fetching JSON data:', error);
    });
}

function signin() { 
    const users = getUsers();
    console.log('users', users);
}
$(document).ready(function() {
    var _ParallaxHover = function(el) {
            // Set up handle
            var t = this,
                $orig = $(el);
            // Extend object with handy variables
            t.$link = $orig.clone().addClass('enhanced');
            t.levels = parseInt(t.$link.data('levels'));
            t.space = parseInt(t.$link.data('space'));
            t.imgName = t.$link.data('imgname');
            t.images = new Array();
            t.pos = $orig.offset();
            t.dim = {
                w: $orig.outerWidth(),
                h: $orig.outerHeight()
            };
            t.$levels = $();
            t.threshold = 1;
            t.cPos = {
                x: t.dim.w / 2,
                y: t.dim.h / 2
            };
            t.tPos = {
                x: t.cPos.x,
                y: t.cPos.y
            };
            t.vPos = {
                x: 0,
                y: 0
            };
            t.interval;
            t.isLooping = false;
            // Set up elements and bind events
            if (t.levels > 0 && t.space > 0 && t.imgName.indexOf('*') > -1) {
                for (var i = 0; i < t.levels; i++) {
                    (function() {
                        var levelImgName = t.imgName.replace('*', i),
                            index = i + 1,
                            mid = Math.round(t.levels / 2),
                            dist = (index - mid) / (t.levels - mid),
                            $level = $('<span />').addClass('level').data('dist', dist).css('background-image', 'url(' + levelImgName + ')').prependTo(t.$link);
                        t.$levels.push($level);
                        t.images.push(levelImgName);
                    })();
                }
                t.$link.mousemove(function(e) {
                    var mPos = {
                        x: e.pageX,
                        y: e.pageY
                    },
                        xPos = mPos.x - t.pos.left,
                        yPos = mPos.y - t.pos.top;
                    t.tPos = {
                        x: xPos,
                        y: yPos
                    };
                    t.startAnimationLoop();
                }).mouseenter(function() {
                    t.startAnimationLoop();
                }).mouseleave(function() {
                    t.tPos.x = t.dim.w / 2;
                    t.tPos.y = t.dim.h / 2;
                });
                $.imgpreload(t.images, function() {
                    $orig.replaceWith(t.$link);
                });
            }
            // Return object
            return this;
        };
    _ParallaxHover.prototype.animateTo = function(x, y) {
        var t = this;
        t.tPos = {
            x: x,
            y: y
        };
        t.startAnimationLoop();
    };
    _ParallaxHover.prototype.startAnimationLoop = function() {
        var t = this;
        if (!t.isLooping) {
            t.isLooping = true;
            t.interval = setInterval(function() {
                t.animationLoop();
            }, 35);
        }
    };
    _ParallaxHover.prototype.setPosition = function() {
        var t = this;
        t.$levels.each(function() {
            var $level = $(this);
            $level.css({
                'top': -((t.cPos.y / t.dim.h) * 2 - 1) * t.space * $level.data('dist'),
                'left': -((t.cPos.x / t.dim.w) * 2 - 1) * t.space * $level.data('dist')
            });
        });
        return t.cPos;
    };
    _ParallaxHover.prototype.animationLoop = function() {
        var t = this,
            x = (t.tPos.x - t.cPos.x),
            y = (t.tPos.y - t.cPos.y);
        t.vPos.x *= 0.7;
        t.vPos.y *= 0.7;
        x *= 0.10;
        y *= 0.10;
        t.vPos.x += x;
        t.vPos.y += y;
        t.cPos.x += t.vPos.x;
        t.cPos.y += t.vPos.y;
        if (t.vPos.x >= t.threshold || t.vPos.y >= t.threshold || t.vPos.x <= -t.threshold || t.vPos.y <= -t.threshold) {
            t.setPosition();
        } else {
            t.isLooping = false;
            clearInterval(t.interval);
        }
    };
    $('.parallax').each(function() {
        window.parallaxHover = new _ParallaxHover(this);
    });
});

