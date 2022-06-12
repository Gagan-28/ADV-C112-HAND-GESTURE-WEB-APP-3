Webcam.set({
    Width: 350,
    Height: 300,
    image_format: 'png',
    png_quality: 90
});

Webcam.attach("camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='"+data_uri+"'>";
    })
}

console.log("ml5 version: ", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RHfWl5kmX/model.json", modelLoaded);

function modelLoaded()
{
    console.log("model is loaded");
}
function speak()
{
    synth = window.speechSynthesis;
    speak_data = "The prediction is"+prediction;
    utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResults);
}
function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        prediction = results[0].label;
        document.getElementById('result_hand_gesture').innerHTML = prediction;
        if(prediction == 'Perfect')
        {
            document.getElementById('hand_gesture_emoji').innerHTML = "&#128076;";
        }
        if(prediction == 'Done')
        {
            document.getElementById('hand_gesture_emoji').innerHTML = "&#128077;";
        }
        if(prediction == 'Victory')
        {
            document.getElementById('hand_gesture_emoji').innerHTML = "&#9996;";
        }
        if(prediction == 'Punch')
        {
            document.getElementById('hand_gesture_emoji').innerHTML = "&#9994;";
        }
        if(prediction == 'Clap')
        {
            document.getElementById('hand_gesture_emoji').innerHTML = "&#128079;";
        }
        if(prediction == 'Yo Swag')
        {
            document.getElementById('hand_gesture_emoji').innerHTML = "&#129304;";
        }
    }
}