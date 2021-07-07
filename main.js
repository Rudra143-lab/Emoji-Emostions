prediction_1 = "";
prediction_2 = "";

camera = document.getElementsByClassName("cam")[0];

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 100
});

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementsByClassName("result")[0].innerHTML = '<img id="my_image" src="' + data_uri + '"/>'
    });
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/IfaaFIpFd/model.json", model_loaded);

console.log("ml5_version", ml5.version);

function model_loaded() {
    console.log("Model_Loaded");
}

function speak() {
    synth = window.speechSynthesis;
    data_1 = "First Prediction is " + prediction_1;
    data_2 = "Second Prediction is " + prediction_2;
    utterThis = new SpeechSynthesisUtterance(data_1 + data_2);
    synth.speak(utterThis);
}

function check() {
    my_image = document.getElementById("my_image");  
    classifier.classify(my_image,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if (prediction_1 == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128512;";
        }
        if (prediction_1 == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if (prediction_1 == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }

        if (prediction_2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128512;";
        }
        if (prediction_2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if (prediction_2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
    }
}