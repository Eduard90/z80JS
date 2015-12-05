app = {
	afterOp: null,
	load: function(arr) {
		z80.load(arr);
	},
	start: function(afterOp) {
		z80.run(afterOp);
	}
}
