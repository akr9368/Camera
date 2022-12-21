let video =document.querySelector("video");
let recordBtnCont =document.querySelector(".record-btn-cont");
let recordBtn =document.querySelector(".record-btn");

let captureBtnCont =document.querySelector(".capture-btn-cont");
let captureBtn =document.querySelector(".capture-btn");

let recordFlag=false;
let recorder;
let chunks =[]//media  data in chunks its mean stream data are not regular available its available periodically 

//console.log(10);
let constraints = {
    video : true,
    audio : true
}
 //navigator tells us browser info its a global object
navigator.mediaDevices.getUserMedia(constraints)
.then((stream)=>{
    video.srcObject = stream;

    recorder = new MediaRecorder(stream);
    recorder.addEventListener("start", (e)=>{
        chunks=[];
    })
    recorder.addEventListener("dataavailable", (e)=>{
        chunks.push(e.data);
    })
    recorder.addEventListener("stop", (e)=>{
        //conversion of chunks  data to video packet 
        let blob = new Blob(chunks, {
            type : "video/mp4"
        });
        let videoUrl =URL.createObjectURL(blob);
        let a= document.createElement("a");
        a.href=videoUrl;
        a.download="Video.mp4";
        a.click();


    })


})

recordBtnCont.addEventListener("click", (e)=>{
    if(!recorder) return;
    recordFlag = !recordFlag;

    if(recordFlag){
//here we start the recording
          recorder.start();
          recordBtn.classList.add("scale-record");

    }
    else{
        // here we stop the recording 
        recorder.stop();
        recordBtn.classList.remove("scale-record");

    }

    

})