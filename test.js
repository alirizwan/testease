var Testease = require("./index")({
	app: "../../app",
	responseNode: "data",
	autoUpdateData: true,
	tests: [{
		name: "Brand",
		data: "../branddata.json",
		path: "/brands",
		test: {
			post: {
				description: "This will create a brand"
			}
		}
	}]
});
