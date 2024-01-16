// https://www.typescriptlang.org/play?useJavaScript=trueq=418#example/typescript-with-webgl
// This example creates an HTML canvas which uses WebGL to
// render spinning confetti using JavaScript. We're going
// to walk through the code to understand how it works, and
// see how TypeScript's tooling provides useful insight.
// This example builds off: example:working-with-the-dom
// First up, we need to create an HTML canvas element, which
// we do via the DOM API and set some inline style attributes:
var canvas = document.createElement("canvas");
canvas.id = "spinning-canvas";
canvas.style.backgroundColor = "#0078D4";
canvas.style.position = "fixed";
canvas.style.bottom = "10px";
canvas.style.right = "20px";
canvas.style.width = "500px";
canvas.style.height = "400px";
canvas.style.zIndex = "100";
// Next, to make it easy to make changes, we remove any older
// versions of the canvas when hitting "Run" - now you can
// make changes and see them reflected when you press "Run"
// or (cmd + enter):
var existingCanvas = document.getElementById(canvas.id);
if (existingCanvas && existingCanvas.parentElement) {
    existingCanvas.parentElement.removeChild(existingCanvas);
}
// Tell the canvas element that we will use WebGL to draw
// inside the element (and not the default raster engine):
var gl = canvas.getContext("webgl");
// Next we need to create vertex shaders - these roughly are
// small programs that apply maths to a set of incoming
// array of vertices (numbers).
// You can see the large set of attributes at the top of the shader,
// these are passed into the compiled shader further down the example.
// There's a great overview on how they work here:
// https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, "\nprecision lowp float;\n\nattribute vec2 a_position; // Flat square on XY plane\nattribute float a_startAngle;\nattribute float a_angularVelocity;\nattribute float a_rotationAxisAngle;\nattribute float a_particleDistance;\nattribute float a_particleAngle;\nattribute float a_particleY;\nuniform float u_time; // Global state\n\nvarying vec2 v_position;\nvarying vec3 v_color;\nvarying float v_overlight;\n\nvoid main() {\n  float angle = a_startAngle + a_angularVelocity * u_time;\n  float vertPosition = 1.1 - mod(u_time * .25 + a_particleY, 2.2);\n  float viewAngle = a_particleAngle + mod(u_time * .25, 6.28);\n\n  mat4 vMatrix = mat4(\n    1.3, 0.0, 0.0, 0.0,\n    0.0, 1.3, 0.0, 0.0,\n    0.0, 0.0, 1.0, 1.0,\n    0.0, 0.0, 0.0, 1.0\n  );\n\n  mat4 shiftMatrix = mat4(\n    1.0, 0.0, 0.0, 0.0,\n    0.0, 1.0, 0.0, 0.0,\n    0.0, 0.0, 1.0, 0.0,\n    a_particleDistance * sin(viewAngle), vertPosition, a_particleDistance * cos(viewAngle), 1.0\n  );\n\n  mat4 pMatrix = mat4(\n    cos(a_rotationAxisAngle), sin(a_rotationAxisAngle), 0.0, 0.0,\n    -sin(a_rotationAxisAngle), cos(a_rotationAxisAngle), 0.0, 0.0,\n    0.0, 0.0, 1.0, 0.0,\n    0.0, 0.0, 0.0, 1.0\n  ) * mat4(\n    1.0, 0.0, 0.0, 0.0,\n    0.0, cos(angle), sin(angle), 0.0,\n    0.0, -sin(angle), cos(angle), 0.0,\n    0.0, 0.0, 0.0, 1.0\n  );\n\n  gl_Position = vMatrix * shiftMatrix * pMatrix * vec4(a_position * 0.03, 0.0, 1.0);\n  vec4 normal = vec4(0.0, 0.0, 1.0, 0.0);\n  vec4 transformedNormal = normalize(pMatrix * normal);\n\n  float dotNormal = abs(dot(normal.xyz, transformedNormal.xyz));\n  float regularLighting = dotNormal / 2.0 + 0.5;\n  float glanceLighting = smoothstep(0.92, 0.98, dotNormal);\n  v_color = vec3(\n    mix((0.5 - transformedNormal.z / 2.0) * regularLighting, 1.0, glanceLighting),\n    mix(0.5 * regularLighting, 1.0, glanceLighting),\n    mix((0.5 + transformedNormal.z / 2.0) * regularLighting, 1.0, glanceLighting)\n  );\n\n  v_position = a_position;\n  v_overlight = 0.9 + glanceLighting * 0.1;\n}\n");
gl.compileShader(vertexShader);
// This example also uses fragment shaders - a fragment
// shader is another small program that runs through every
// pixel in the canvas and sets its color.
// In this case, if you play around with the numbers you can see how
// this affects the lighting in the scene, as well as the border
// radius on the confetti:
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, "\nprecision lowp float;\nvarying vec2 v_position;\nvarying vec3 v_color;\nvarying float v_overlight;\n\nvoid main() {\n  gl_FragColor = vec4(v_color, 1.0 - smoothstep(0.8, v_overlight, length(v_position)));\n}\n");
gl.compileShader(fragmentShader);
// Takes the compiled shaders and adds them to the canvas'
// WebGL context so that can be used:
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertexShader);
gl.attachShader(shaderProgram, fragmentShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);
gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
// We need to get/set the input variables into the shader in a
// memory-safe way, so the order and the length of their
// values needs to be stored.
var attrs = [
    { name: "a_position", length: 2, offset: 0 },
    { name: "a_startAngle", length: 1, offset: 2 },
    { name: "a_angularVelocity", length: 1, offset: 3 },
    { name: "a_rotationAxisAngle", length: 1, offset: 4 },
    { name: "a_particleDistance", length: 1, offset: 5 },
    { name: "a_particleAngle", length: 1, offset: 6 },
    { name: "a_particleY", length: 1, offset: 7 },
];
var STRIDE = Object.keys(attrs).length + 1;
// Loop through our known attributes and create pointers in memory for the JS side
// to be able to fill into the shader.
// To understand this API a little bit: WebGL is based on OpenGL
// which is a state-machine styled API. You pass in commands in a
// particular order to render things to the screen.
// So, the intended usage is often not passing objects to every WebGL
// API call, but instead passing one thing to one function, then passing
// another to the next. So, here we prime WebGL to create an array of
// vertex pointers:
for (var i = 0; i < attrs.length; i++) {
    var name = attrs[i].name;
    var length = attrs[i].length;
    var offset = attrs[i].offset;
    var attribLocation = gl.getAttribLocation(shaderProgram, name);
    gl.vertexAttribPointer(attribLocation, length, gl.FLOAT, false, STRIDE * 4, offset * 4);
    gl.enableVertexAttribArray(attribLocation);
}
// Then on this line they are bound to an array in memory:
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
// Set up some constants for rendering:
var NUM_PARTICLES = 200;
var NUM_VERTICES = 4;
// Try reducing this one and hitting "Run" again,
// it represents how many points should exist on
// each confetti and having an odd number sends
// it way out of whack.
var NUM_INDICES = 6;
// Create the arrays of inputs for the vertex shaders
var vertices = new Float32Array(NUM_PARTICLES * STRIDE * NUM_VERTICES);
var indices = new Uint16Array(NUM_PARTICLES * NUM_INDICES);
for (var i_1 = 0; i_1 < NUM_PARTICLES; i_1++) {
    var axisAngle = Math.random() * Math.PI * 2;
    var startAngle = Math.random() * Math.PI * 2;
    var groupPtr = i_1 * STRIDE * NUM_VERTICES;
    var particleDistance = Math.sqrt(Math.random());
    var particleAngle = Math.random() * Math.PI * 2;
    var particleY = Math.random() * 2.2;
    var angularVelocity = Math.random() * 2 + 1;
    for (var j = 0; j < 4; j++) {
        var vertexPtr_1 = groupPtr + j * STRIDE;
        vertices[vertexPtr_1 + 2] = startAngle; // Start angle
        vertices[vertexPtr_1 + 3] = angularVelocity; // Angular velocity
        vertices[vertexPtr_1 + 4] = axisAngle; // Angle diff
        vertices[vertexPtr_1 + 5] = particleDistance; // Distance of the particle from the (0,0,0)
        vertices[vertexPtr_1 + 6] = particleAngle; // Angle around Y axis
        vertices[vertexPtr_1 + 7] = particleY; // Angle around Y axis
    }
    // Coordinates
    vertices[groupPtr] = vertices[groupPtr + STRIDE * 2] = -1;
    vertices[groupPtr + STRIDE] = vertices[groupPtr + STRIDE * 3] = +1;
    vertices[groupPtr + 1] = vertices[groupPtr + STRIDE + 1] = -1;
    vertices[groupPtr + STRIDE * 2 + 1] = vertices[groupPtr + STRIDE * 3 + 1] = +1;
    var indicesPtr = i_1 * NUM_INDICES;
    var vertexPtr = i_1 * NUM_VERTICES;
    indices[indicesPtr] = vertexPtr;
    indices[indicesPtr + 4] = indices[indicesPtr + 1] = vertexPtr + 1;
    indices[indicesPtr + 3] = indices[indicesPtr + 2] = vertexPtr + 2;
    indices[indicesPtr + 5] = vertexPtr + 3;
}
// Pass in the data to the WebGL context
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
var timeUniformLocation = gl.getUniformLocation(shaderProgram, "u_time");
var startTime = (window.performance || Date).now();
// Start the background colour as black
gl.clearColor(0, 0, 0, 1);
// Allow alpha channels on in the vertex shader
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
// Set the WebGL context to be the full size of the canvas
gl.viewport(0, 0, canvas.width, canvas.height);
// Create a run-loop to draw all of the confetti
(function frame() {
    gl.uniform1f(timeUniformLocation, ((window.performance || Date).now() - startTime) / 1000);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, NUM_INDICES * NUM_PARTICLES, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(frame);
})();
// Add the new canvas element into the bottom left
// of the playground
document.body.appendChild(canvas);
// Credit: based on this JSFiddle by Subzey
// https://jsfiddle.net/subzey/52sowezj/
