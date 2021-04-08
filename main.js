Prediction_1 = "";
Prediction_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
   png_quality: 100 
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    }
        ) ;
}

console.log("ml5.version:",ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/RZE6YTvyS/model.json',ModelLoaded);

function ModelLoaded(){
    console.log("Model is loaded");
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = "The first prediction is"+Prediction_1;
    speak_data2 = "And the second prediction is"+Prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data+speak_data2);
    synth.speak(utterThis);
}
function check() {
     img = document.getElementById('captured_image');
      classifier.classify(img, gotresult);
 }

 function gotresult(error, results){
   if(error){
       console.error(error);
   }
   else
   {
       console.log("results");
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       document.getElementById("result_emotion_name2").innerHTML = results[1].label;
       Prediction_1 = results[0].label;
       Prediction_2 = results[1].label;
       speak();
       if(results[0].label == "amazing"){
           document.getElementById("update_emoji").innerHTML = "&#128076;";
       }
      if(results[0].label == "best"){
        document.getElementById("update_emoji").innerHTML = "&#128077;";
       }
         if(results[0].label == "victory"){
        document.getElementById("update_emoji").innerHTML = "&#9996;";
       }
       if(results[1].label == "amazing"){
        document.getElementById("update_emoji2").innerHTML = "&#128076;";
    }
   if(results[1].label == "best"){
     document.getElementById("update_emoji2").innerHTML = "&#128077;";
    }
      if(results[1].label == "victory"){
     document.getElementById("update_emoji2").innerHTML = "&#9996;";
    }
   }
 }