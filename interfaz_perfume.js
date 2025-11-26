const URL = "https://teachablemachine.withgoogle.com/models/8mMtpIW2s/"; 

let model, webcam;

async function init() {
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    console.log("Modelo cargado");

    webcam = new tmImage.Webcam(400, 300, true); 
    await webcam.setup(); 
    await webcam.play();
    document.getElementById("webcam").appendChild(webcam.canvas);

   
    window.requestAnimationFrame(loop);


    document.getElementById("btnCapturar").addEventListener("click", predict);
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = ""; 

    prediction.forEach(p => {
        resultadosDiv.innerHTML += `<p>${p.className}: ${(p.probability*100).toFixed(2)}%</p>`;
    });
}

init();

