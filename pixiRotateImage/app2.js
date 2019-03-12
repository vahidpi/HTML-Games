var renderer = PIXI.autoDetectRenderer(512, 512, {
    transparent: true,
    resolution: 1
});

document.getElementById("display").appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
    .add("sp", "images/idle_right.png")
    .load(setup);

var sprite;

function setup() {
    stage.interactive = true;

    var rect = new PIXI.Rectangle(0, 0, 50, 50);
    var texture = PIXI.loader.resources["sp"].texture;
    texture.frame = rect;

    sprite = new PIXI.Sprite(texture);


    var idle = setInterval(function() {
        //console.log(rect.x + "-" + rect.y);

        if (rect.x >= 50 * 4) {
            rect.x = 0;
            rect.y += 50; 
        }

        if (rect.y >= 50 * 3) rect.y = 0;
        if ((rect.y >= 50 * 2) & (rect.x >= 50 * 3)) {
            rect.x = 0;
            rect.y = 0; 
        }


        sprite.texture.frame = rect;
        rect.x += 50;

    }, 500);

    stage.addChild(sprite);

    sprite.scale.set(2, 2);
    sprite.vx = 3;

    animationLoop();

}


function animationLoop() {

    requestAnimationFrame(animationLoop);


    renderer.render(stage);

}

window.addEventListener("keydown", function(event) {
    event.preventDefault();
    sprite.x += sprite.vx;
});