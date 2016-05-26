$(function(){
	var PARSE_APP_ID = "opu6rH8YJpyQew8ohv3k30oAsQD1VC5qKj5hn2Bk";
	var PARSE_KEY = "8yliGg9bWZeBqTMkASg8uXOreYjFp7Kr4sLciGWS";

	var Race = Parse.Object.extend("AlienRace");
	var Word = Parse.Object.extend("AlienWord");
	var WordTranslation = Parse.Object.extend("AlienWordTranslation");
	
	var races = [];
	var words = [];
	var translations = [];

	// Parse.initialize(PARSE_APP_ID, PARSE_KEY);

	// new Parse.Query(Race).find().then(function(result) {
	// 	races = JSON.parse(JSON.stringify(result));
	// 	new Vue({
	// 		el: '#app',
	// 		data: {
	// 			races: races
	// 		}
	// 	});
	// });
	
});