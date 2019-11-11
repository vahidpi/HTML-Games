let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  deer_animal,
  chicken_animal,
  croc_animal,
  fox_animal,
  elephant_animal,
  giraffe_animal,
  panda_animal,
  gameHolder = document.getElementById("display"),
  renderer = PIXI.autoDetectRenderer(360,720),
  newUIblocks =[]

//Create a Pixi Application
let app = new Application({
  width: 360,
  height: 720,
  antialias: true,
  transparent: false,
  resolution: 1
  
});
let UI = new Application({
  width: 360,
  height: 360,
  antialias: true,
  transparent: false,
  resolution: 1
});
var drawBlocks = [];
gameHolder.appendChild(app.view);
gameHolder.append(UI.view)
let myGraph = new PIXI.Graphics();
myGraph.position.set(0,0)
app.renderer.view.style.position = "absolute"
app.renderer.view.style.left = "33%"
app.renderer.view.style.top = "10%"
UI.renderer.view.style.position = "absolute"
UI.renderer.view.style.left = "55%"
UI.renderer.view.style.top = "10%"
app.stage.position.y = app.renderer.height / app.renderer.resolution;
app.stage.position.x = 0
app.stage.scale.y = -1;

drawPixiGrid = () => {
  myGraph.position.set(0,0)
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      

      // set the line style to have a width of 5 and set the color to red
      myGraph.lineStyle(1, 0x000000);
      myGraph.drawRect(j*xScale, i*yScale, xScale, yScale);
    }
  }
  
  
  
  app.stage.addChild(myGraph);
  
  
};

//load an image and run the `setup` function when it's done
loader.add("assets/asset.json").load(setup);

//This `setup` function will run when the image has loaded
function setup() {
  //Create the cat sprite
  let asset = PIXI.loader.resources["assets/asset.json"];
  deer_animal = asset.textures["animal_deer.png"];
  giraffe_animal = asset.textures["animal_girafe.png"];
  croc_animal = asset.textures["animal_crocodile.png"]
  chicken_animal=asset.textures["animal_chicken.png"]
  panda_animal = asset.textures["animal_panda.png"]
  fox_animal = asset.textures["animal_fox.png"]
  elephant_animal = asset.textures["animal_elephant.png"]
  //console.log(deer_animal);
  //Add the cat to the stage
  GameInit();
  drawPixiGrid()
  PixiInit()
  setInterval(gameLoop, 10); 
  UI.renderer.backgroundColor = 0xffffff
  app.renderer.backgroundColor = 0x00ffff
}
var pointText
PixiInit=()=>{
  var text = "Points:"  + points.toString()
  pointText = new PIXI.Text(text)
  UI.stage.addChild(pointText)
}
handleNext=(newB,init)=>{
  var newSprite
  switch (newB.type) {
    case "deerBlock":
      newSprite = new Sprite(deer_animal);
      newSprite.pivot = {x:15,y:15}
      break;
    case "giraffeBlock":
      newSprite = new Sprite(giraffe_animal);
      newSprite.pivot = {x:15,y:45}
      break;
      case "crocBlock":
      newSprite = new Sprite(croc_animal);
      newSprite.pivot = {x:15,y:15}
      break;
      case "elephantBlock":
      newSprite = new Sprite(elephant_animal)
      newSprite.pivot ={x:15,y:45}
      break
      case "foxBlock":
      newSprite = new Sprite(fox_animal)
      newSprite.pivot ={x:15,y:45}
      break
      case "pandaBlock":
      newSprite = new Sprite(panda_animal)
      newSprite.pivot ={x:15,y:45}
      break
      case "chickenBlock":
      newSprite= new Sprite(chicken_animal)
      newSprite.pivot ={x:15,y:15}
      break
  }
  if(!init){
    UI.stage.removeChild(newUIblocks.shift())
  }
  UI.stage.addChild(newSprite)
  newUIblocks.push(newSprite)

 
  for(var i = 0;i<newUIblocks.length;i++){
    
    newUIblocks[i].x = i*60+newUIblocks[i].pivot.x
    newUIblocks[i].y = 120

  }
}
checkBlocks=()=>{
  var LiveIDS = []
  LiveIDS.push(currentBlock.id)
  allblocks.forEach(e=>{
    LiveIDS.push(e.id)
  })
  for(var i=0;i<drawBlocks.length;i++){
    if(LiveIDS.some(e=> e===drawBlocks[i].id)){
      //console.log(LiveIDS.some(e=> e===drawBlocks[i].id))
    }else{
      app.stage.removeChild(drawBlocks[i].sprite);
      drawBlocks.splice(i,1)
      //console.log("WTF")
      
    }
  }

}
updateBlocks = block => {
  //console.log(drawBlocks);
  var correctBlock = drawBlocks.filter(e => e.id === block.id);
  if (correctBlock.length > 0) {
    correctBlock[0].sprite.x = block.pos.x * xScale +correctBlock[0].pivot.x;
    correctBlock[0].sprite.y = block.pos.y * yScale+correctBlock[0].pivot.y;
    correctBlock[0].sprite.rotation = (block.rotation*-90)*(Math.PI/180)+(-180)*(Math.PI/180)
    correctBlock[0].sprite.scale.x = -1    
      
    //console.log(correctBlock[0].sprite.pivot)
  }
  pointText.text = "Points: " +points
};
removeBlock = block => {
  /*
  var correctBlock = drawBlocks.filter(e => e.id === block.id);
  if (correctBlock.length > 0) {
    drawBlocks.splice(drawBlocks.indexOf(correctBlock[0], 1));
    app.stage.removeChild(correctBlock[0].sprite);
  }*/
};
ShowNext=()=>{

}
AddBlock = block => {
  //console.log();
  var newSprite = null;
  var newObj = { sprite: null, id: block.id,pivot:null };
  var pivot = null
  switch (block.type) {
    case "deerBlock":
      newSprite = new Sprite(deer_animal);
      pivot = {x:15,y:15}
      break;
    case "giraffeBlock":
      newSprite = new Sprite(giraffe_animal);
      pivot = {x:15,y:45}
      break;
      case "crocBlock":
      newSprite = new Sprite(croc_animal);
      pivot = {x:15,y:15}
      break;
      case "elephantBlock":
      newSprite = new Sprite(elephant_animal)
      pivot ={x:15,y:45}
      break
      case "foxBlock":
      newSprite = new Sprite(fox_animal)
      pivot ={x:15,y:45}
      break
      case "pandaBlock":
      newSprite = new Sprite(panda_animal)
      pivot ={x:15,y:45}
      break
      case "chickenBlock":
      newSprite= new Sprite(chicken_animal)
      pivot ={x:15,y:15}
      break
  }
  newObj.sprite = newSprite;
  newObj.sprite.x = (block.pos.x * xScale)+pivot.x;
  newObj.sprite.y = (block.pos.y * yScale)+pivot.y;
  //console.log(newSprite.pivot)
  newObj.pivot = pivot
  newObj.sprite.pivot.set(pivot.x,pivot.y)
  drawBlocks.push(newObj);
  //console.log(newSprite.pivot)
  app.stage.addChild(newObj.sprite);
};



var rightTimer = 0;
var leftTimer = 0;
getBlockPos = (block, pos) => {
    correctPos = [];
    block.blocks.forEach(element => {
        var newX = element.x + pos.x;
        var newY = element.y + pos.y;
        correctPos.push({ x: newX, y: newY });
    });
    return correctPos;
};
rotateBlock = (block, angle) => {
    a = angle * (Math.PI / 180); // Convert to radians

    var rotatedPoints = [block.blocks[0]];
    for (var i = 1; i < block.blocks.length; i++) {
        var rotatedX =
            Math.cos(a) * (block.blocks[i].x - block.blocks[0].x) -
            Math.sin(a) * (block.blocks[i].y - block.blocks[0].y) +
            block.blocks[0].x;
        var rotatedY =
            Math.sin(a) * (block.blocks[i].x - block.blocks[0].x) -
            Math.cos(a) * (block.blocks[i].y - block.blocks[0].y) +
            block.blocks[0].y;
        var newPoint = { x: Math.round(rotatedX), y: Math.round(rotatedY) };
        rotatedPoints.push(newPoint);
    }
    return rotatedPoints;
};

moveBlock = (block, vector2) => {
    var posBlock = Object.assign({}, block);
    posBlock.pos = {
        x: posBlock.pos.x + vector2.x,
        y: posBlock.pos.y + vector2.y
    };
    return posBlock;
};
fallDown = () => {
    for (var i = 0; i < allblocks.length; i++) {
        var e = allblocks[i];
        var downCollision = checkCollision(
            moveBlock(e, { x: 0, y: -1 }),
            allblocks
        );
        if (downCollision === false) {
            allblocks[i] = moveBlock(e, { x: 0, y: -1 });
            //console.log(moveBlock(e, { x: 0, y: -1 }));
        } else if (downCollision === true) {} else {
            collision(e, downCollision);
            collision(true, [e]);
        }
    }
    //var downCollision =checkCollision(moveBlock(e,{x:0,y:-1}),allblocks)
};
checkCollision = (block, collision) => {
    var posBlocks = getBlockPos(block, block.pos);
    var collided = false;
    var blockPos = Object.assign({}, block.pos);
    blockPos.y += 1;
    var filteredList = collision.filter(e => e.id !== block.id);

    if (collision.length - filteredList.length > 1) {} else if (collision.length - filteredList.length === 1) {
        collision = filteredList;
    }

    var collisionArray = [];
    collision.forEach(element => {
        collisionArray.push({
            pos: getBlockPos(element, element.pos),
            type: element.type
        });
    });
    var type = [];

    posBlocks.forEach(element => {
        collisionArray.forEach(e => {
            var tempType = e;
            e.pos.forEach(e => {
                if (element.x === e.x && element.y === e.y) {
                    collided = true;

                    type.push(tempType);
                }
            });
        });
    });
    var collisions = [];
    type.forEach(element => {
        if (element && element.type === block.type) {
            collisions.push(collision[collisionArray.indexOf(element)]);
        }
    });

    if (posBlocks.some(e => e.y === -1)) {
        collided = true;
    }
    if (posBlocks.some(e => e.x === -1)) {
        collided = true;
    }
    if (posBlocks.some(e => e.x === 10)) {
        collided = true;
    }
    if (collisions.length > 0) {
        //console.log(collisions);
        return collisions;
    }
    if (collided) {
        return true;
    } else {
        return false;
    }
};
getNewBlock = () => {
    var newB = blockInit();
    nextBlocks.push(newB);
    currentBlock = nextBlocks.shift();
    handleNext(newB)
}
pysics = () => {
    timer++;
    var aika = timeScale;
    var rightCollision = checkCollision(
        moveBlock(currentBlock, { x: 1, y: 0 }),
        allblocks
    );
    if (downKey) {
        aika = aika / 2;
    }
    if (rightKey) {
        rightTimer++;
    } else {
        rightTimer = 0;
    }
    if (leftKey) {
        leftTimer++;
    } else {
        leftTimer = 0;
    }
    if (rightTimer > aika / 5 && rightCollision === false) {
        rightTimer = 0;
        currentBlock = moveBlock(currentBlock, { x: 1, y: 0 });
    } else if (!rightKey && rightCollision.length >= 1) {
        collision(currentBlock, rightCollision);
        getNewBlock();
        AddBlock(currentBlock);
    }
    var leftCollision = checkCollision(
        moveBlock(currentBlock, { x: -1, y: 0 }),
        allblocks
    );
    if (leftTimer > aika / 5 && leftCollision === false) {
        currentBlock = moveBlock(currentBlock, { x: -1, y: 0 });
        leftTimer = 0;
    } else if (!leftKey && leftCollision.length >= 1) {
        collision(currentBlock, leftCollision);
        getNewBlock();
        AddBlock(currentBlock);
    }
    if (leftCollision.pos) {
        //console.log("asd")
    }

    if (upKey) {
        var rotatedBlock = Object.assign({}, currentBlock);
        rotatedBlock.blocks = rotateBlock(rotatedBlock, -90);
        if (!checkCollision(rotatedBlock, allblocks)) {
            currentBlock.blocks = rotateBlock(currentBlock, -90);
            currentBlock.rotation += 1;
        }
        upKey = false;
    }
    var downCollision = checkCollision(
        moveBlock(currentBlock, { x: 0, y: -1 }),
        allblocks
    );
    if (downCollision === false && timer >= aika) {
        timer = 0;
        currentBlock = moveBlock(currentBlock, { x: 0, y: -1 });
    } else if (downCollision === true) {
        collision(currentBlock);
        getNewBlock();
        AddBlock(currentBlock);
    } else if (downCollision !== false) {
        collision(currentBlock, downCollision);
        getNewBlock();
        AddBlock(currentBlock);
    }
    fallDown();
};

checkLose = () => {
    var loseBlocks = []
    allblocks.forEach(e => {
        loseBlocks = loseBlocks.concat(getBlockPos(e, e.pos))
    })
    if (loseBlocks.some(e => e.y >= 15)) {
        allblocks.splice(0, allblocks.length)

        pointText.text = "YOU LOSE"
        points = 0
        paused = true
        timeScale = 50
        currentBlock = nextBlocks.shift()
        AddBlock(currentBlock)
    }
}


draw = () => {

    updateBlocks(currentBlock)

    allblocks.forEach(e => {
        updateBlocks(e)
    })


};

keyDownHandler = e => {
    e.preventDefault()

    switch (e.code) {
        case "ArrowLeft":
            leftKey = true;
            leftTimer = timeScale / 5 + 1
            break;
        case "ArrowRight":
            rightKey = true;
            rightTimer = timeScale / 5 + 1
            break;
        case "ArrowUp":
            upKey = true;
            break;
        case "ArrowDown":
            downKey = true;
            break;
        case "Space":
            paused = !paused;
            break;
    }

    ;

};
keyUpHandler = e => {
    e.preventDefault()

    switch (e.code) {
        case "ArrowLeft":
            leftKey = false;
            break;
        case "ArrowRight":
            rightKey = false;
            break;

        case "ArrowDown":
            downKey = false
            break;

    }



};

var rows = 20;
var columns = 10;
var allblocks = [];
var xScale = (app.renderer.width / app.renderer.resolution) / columns;
var yScale = (app.renderer.height / app.renderer.resolution) / rows;
var paused = true;
var leftKey = false;
var downKey = false;
var upKey = false;
var rightKey = false;
var timer = 0;
var timeScale = 50;
var blockID = 0
var frames = 0;
var fallingBlocks = [];
var points = 0;
var Iblock = {
    blocks: [{ x: 0, y: 1 }, { x: 0, y: 0 }, { x: 0, y: 2 }],
    type: "giraffeBlock"
};

var Iblock2 = {
    blocks: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
    type: "crocBlock"
};

var oneBlock = {
    blocks: [{ x: 0, y: 0 }],
    type: "chickenBlock"
};

var Oblock = {
    blocks: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 2 }],
    type: "elephantBlock"
};

var nextBlocks = []
var Lblock = {
    blocks: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }],
    type: "deerBlock"
};
var foxblock = {
    blocks: [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }],
    type: "foxBlock"
};
var pandablock = {
    blocks: [{ x: 0, y: 1 }, { x: 0, y: 2 }],
    type: "pandaBlock"
};
var currentBlock = {
    blocks: null,
    pos: null,
    id: null,
    rotation: 0
};

blockInit = () => {
    var blocks = [Lblock, Iblock, Iblock2, oneBlock, Oblock, foxblock, pandablock];

    var RNGblock = Object.assign({},
        blocks[Math.round(Math.random() * (blocks.length - 1))]
    );
    newBlock = {
        blocks: RNGblock.blocks,
        type: RNGblock.type,
        pos: { x: Math.round(Math.random() * 6), y: 16 },
        id: blockID,
        rotation: 0
    };
    blockID++

    return newBlock;
};


collision = (block, connection) => {
    if (!connection) {
        var newBlock = Object.assign({}, block);
        allblocks.push(newBlock);
        //console.log(allblocks);
    } else {
        points += 10
        timeScale -= 1
        connection.forEach(element => {
            if (allblocks.indexOf(element) >= 0) {
                if (block !== element) {
                    //console.log("deleted at index: " +allblocks.indexOf(element) )
                    removeBlock(element)
                    removeBlock(block)

                    allblocks.splice(allblocks.indexOf(element), 1)
                }

            }
        });

    }
};

gameLoop = () => {
    if (!paused) {
        pysics();
        draw();
        checkBlocks()
        checkLose()
    }
};

GameInit = () => {
    for (var i = 0; i < 4; i++) {
        newB = blockInit()
        nextBlocks.push(newB)

    }

    currentBlock = nextBlocks.shift()
    AddBlock(currentBlock)
    nextBlocks.forEach(e => {
        handleNext(e, true)
    })

    paused = false
}
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);