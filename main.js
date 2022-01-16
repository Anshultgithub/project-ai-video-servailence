function setup(){
    c1 = createCanvas(480, 500)
    c1.center()
    v1 = createCapture(VIDEO)
    v1.hide()
    
}
function start(){
    mymodel = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "detecting objects"
   objectname =  document.getElementById("on").value;

}
status = ""
function modelLoaded(){
    console.log("model has loaded")
    status = true
}
objects = []
function gotResult(error, results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results)
        objects = results
    }
}
function draw(){
    image(v1, 0, 0, 480, 500)
    if(status != ""){
mymodel.detect(v1, gotResult)
for(i = 0; i < objects.length; i++){
    document.getElementById("status").innerHTML = "objects detected"
    fill("red")
    per = floor(objects[i].confidence * 100)
    text(objects[i].label+"  "+per, objects[i].x, objects[i].y)
    noFill()
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
if(objects[i].label == objectname){
v1.stop()
mymodel.detect(gotResult)
document.getElementById("number").innerHTML = objectname + " found"
s = window.speechSynthesis
say = new SpeechSynthesisUtterance(objectname + "found")
s.speak(say)

}
else{document.getElementById("number").innerHTML = objectname+"not found"}



}


    }
}