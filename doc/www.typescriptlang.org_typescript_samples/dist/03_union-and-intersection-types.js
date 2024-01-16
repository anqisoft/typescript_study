// https://www.typescriptlang.org/play?q=374#example/union-and-intersection-types
// Type unions are a way of declaring that an object
// could be more than one type.
// For example:
var handleArtistsResponse = function (response) {
    if (response.error) {
        console.error(response.error.message);
        return;
    }
    console.log(response.artists);
};
// Now you can only create a request when you include
// artistID and either html or markdown
var workingRequest = {
    artistID: "banksy",
    markdown: "Banksy is an anonymous England-based graffiti artist..."
};
var badRequest = {
    artistID: "banksy"
};
