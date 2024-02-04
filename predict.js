import {imageData} from './script.js'

const model = await tf.loadGraphModel('./statics/model/model.json');

$("result").change(async function () {
    let imageUrl = document.getElementById("result").src
    let tensor = tf.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
    
    let predictions = await model.predict(tensor).data();
    let top5 = Array.from(predictions)
        .map(function (p, i) {
            return {
                probability
            }
        })
})