var body = document.body,
    html = document.documentElement,
    pointArray = [],
    triangleCoordAray = [],
    triCount = 100;
    bColor = '';

function getWidth() {
    return body.clientWidth;
}

function getHeight() {
    return Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function setup() {

    width = getWidth();
    height = getHeight();
    createInitialPoints();
    var defaultCanvas = createCanvas(1920, 1080);
    var backgroundArray = ['rgba(255,255,0, 0.25)', 'rgba(0,255,0, 0.25)', 'rgba(0,0,255, 0.25)', 'rgba(255,0,0, 0.25)', 'rgba(0,255,255, 0.25)', 'rgba(255,0,255, 0.25)'];
    bColor = backgroundArray[Math.floor(random(6))];

    background(bColor);

    for(var i = 0; i < triCount; i++) {
        push();
        strokeWeight(4);
        translate(pointArray[i][0], pointArray[i][1]);
        new Triangle(0,0);
        pop();
        //point(pointArray[i][0], pointArray[i][1]);
    }

    //triangleRealCoordAray = triangleCoordAray.map(function(item, index){
    //    return [item[0]+pointArray[index][0], item[1]+pointArray[index][1], item[2]+pointArray[index][0], item[3]+pointArray[index][1], item[4]+pointArray[index][0], item[5]+pointArray[index][1]]
    //});

}

function mouseClicked(){
    setup();
}

function Triangle(x1, y1){
    angleMode(degrees);
    rotate(random(180));
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x1 + 100 + (random(-40, 40));
    this.y2 = y1 + 175;
    this.x3 = x1 + 175 + (random(-40, 40));
    this.y3 =  y1;

    fill(random(222,255));
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
    triangleCoordAray.push([this.x1, this.y1, this.x2, this.y2, this.x3, this.y3]);


    //for(var i = 0; i < random(2,5); i++){
    strokeWeight(3);
    stroke(50);
    //line(this.x2, this.y2, (this.x1+this.x3)/2, (this.y1+this.y3)/2);
    //line(this.x2, this.y2, (this.x1+this.x3)/2+50, (this.y1+this.y3)/2);
    //line(this.x2, this.y2, (this.x1+this.x3)/3, (this.y1+this.y3)/3);
    //line(this.x2, this.y2, (this.x1+this.x3)/2-50, (this.y1+this.y3)/2);

    for(var i = 0; i < random(1,3); i++){
        triangle(this.x2, this.y2, ((this.x1 + this.x3) / 2 + random(-50, 50)), ((this.y1 + this.y3) / 2), ((this.x1 + this.x3) / 2 + random(-70, 70)), ((this.y1 + this.y3) / 2));
    }
}

function createInitialPoints(){
    var yDelta = 200;
    var yPosition = 0;
    var xPosition = 0;
    var numPerLine = 20;
    var numPerLineCounter = 0;
    for (var i = 0; i<triCount; i++){

        numPerLineCounter++;

        if(numPerLineCounter == numPerLine){
            numPerLine = Math.floor(random(8, 15));
            xPosition=0;
            yPosition+=yDelta+(random(10));
            numPerLineCounter = 0;

        }
        xPosition+=(width/numPerLine);
        var point = [xPosition, yPosition+random(-25, 25)];
        pointArray.push(point);
    }

}

function draw(){

}

function mouseDraw(){

    var connectionRadius = 400;
    var d, a;
    colorMode(RGB, 255, 255, 255, 100);
    background(255);
    strokeWeight(1);
    strokeCap(ROUND);
    noFill();
    translate(width/2, height/2);
    for (var i1 = 0; i1 < triCount; i1++) {
        for (var i2 = 0; i2 < i1; i2++) {
            var p1 = [pointArray[i1][0], pointArray[i1][1]];
            var p2 = [mouseX, mouseY];
            d = dist(p1, p2);
            a = pow(1/(d/connectionRadius+1), 6);
            if (d <= connectionRadius) {
                stroke(color(0,0,0,a*50));
                line(p1[0], p1[1], p2[0], p2[1]);

            }
        }
    }
}

function windowResized(){
    console.log("resize")
    width = getWidth();
    height = getHeight();
    resizeCanvas(width, height);
    background(bColor);


    for(var i = 0; i < triCount; i++) {
        push();
        strokeWeight(4);
        translate(pointArray[i][0], pointArray[i][1]);
        new Triangle(0,0);
        pop();
        //point(pointArray[i][0], pointArray[i][1]);
    }

}
