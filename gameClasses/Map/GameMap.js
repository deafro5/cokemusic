var GameMap = IgeTileMap2d.extend({
	classId: 'GameMap',	

	init: function() {
		IgeTileMap2d.prototype.init.call(this);

		var self = this;

		self._mouseEventsActive = true;
		self._mouseMove = function(x, y) {
			self.mouseMove(x, y);
		};

		ige.input.on('mouseDown', function (x, y) { self.mouseDown(x, y); });
		//ige.input.on('mouseOver', function (x, y) { self.mouseOver(x, y); });

		//Setup click handlers for item selections
		$('#itemDelete').on('click', function() { self.itemDelete(); });
		$('#itemPickup').on('click', function() { self.itemPickup(); });
		$('#itemRotate').on('click', function() { self.itemRotate(); });
		$('#itemMove').on('click', function() { self.itemMove(); });
	},

	mouseDown: function(x, y) {
		if(ige.movingItem == true) {
			var tile = this.mouseToTile(),
				transformX = tile.x,
				transformY = tile.y;

			ige.selected.moveTo(transformX, transformY);
			ige.movingItem = false;
		} 
	},

	mouseMove: function(mouseX, mouseY) {
		if(ige.movingItem == true) {
			var tile = this.mouseToTile(),
				transformX = tile.x,
				transformY = tile.y;

			if(ige.selected.data('tileYHeight') >= 2) { 
				var objectHeight = ige.selected.data('tileYHeight');
				transformY += 1 / objectHeight;
			} else if(ige.selected.data('tileXWidth') >= 2) {
				var objectWidth = ige.selected.data('tileXWidth');
				transformX += 1 / objectWidth;
			}

			if(!ige.client.itemAt(transformX, transformY)) {
				ige.selected.translateToTile(transformX, transformY, 0);
			}
		}
	},

	strokeTile: function(x, y) {
		var tile = [ { 'x': x, 'y' : y } ];
		this.highlightTile(tile);
	},

	clearStrokes: function() {
		this.highlightTile([]);
	},

	itemDelete: function() {
		if(typeof ige.selected == 'undefined')
			return;

		ige.selected.destroy();
	},

	itemPickup: function() {

	},

	itemRotate: function() {
		ige.selected.rotate();
	},

	itemMove: function() {
		this.clearStrokes();
		ige.movingItem = true;
	},
});