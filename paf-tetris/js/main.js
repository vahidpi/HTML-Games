var Q = Quintus()
	.include("Sprites, Anim, Input, Touch, Scenes, UI")
	.setup({width:800, height: 480})
	.touch();

Q.input.touchControls({
	controls:
	[
		['left','<'],
		['right','>'],
		[],
		[],
		[],
		[],
		['fire','a']
	]
});

Q.controls();

Q.scene("mainLevel", function(stage){
	Q.gravity = 0;
	stage.insert(new Q.Sprite({asset: "spacebackground.png", x: Q.el.width/2, y: Q.el.height/2, type:Q.SPRITE_NONE}));
	stage.insert(new Q.Player());
	stage.insert(new Q.Alien());
});


Q.load(["spacebackground.png","asset.png", "asset.json"],function(){
			Q.compileSheets("spaceship2.png", "player.json");
			Q.compileSheets("shot.png", "shot.json");
			Q.compileSheets("alien2.png", "alien.json");

			Q.animations("player", {default:{frames:[0,1,2,3], rate: 1/4}});
			Q.animations("shot", {default:{frames:[0,1,2,3], rate: 1/4}});
			Q.animations("alien", {default:{frames:[0,1,2,3], rate: 1/4}});

			Q.stageScene("mainLevel");
	});