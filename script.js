const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
const frames = {
    currentIndex: 0,
    maxIndex: 1345
};
let loadedImg = [];
let imagesLoaded = 0;

function preLoadImage(){// images Preloading
for(let i = 1; i <= frames.maxIndex; i++){
    const img = new Image();
    img.src = `./images/frame_${i.toString().padStart(4,"0")}.jpeg`;
    loadedImg.push(img);
    console.log(img);
    img.onload = function(){
        imagesLoaded++;
        if(imagesLoaded === frames.maxIndex){
            loadImage(frames.currentIndex);
            startAnimation();

        }
    }
    
}

};
function loadImage(index){ //image drawing and loading
    if(index >= 0 && index <= frames.maxIndex){
        const img = loadedImg[index];
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        scaleX = canvas.width / img.width;
        scaleY = canvas.height / img.height;
        scale = Math.max(scaleX,scaleY);

        newWidth = img.width * scale;
        newHeight = img.height * scale;

        offsetX = (canvas.width - newWidth)/2;
        offsetY = (canvas.height - newHeight)/2;

        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;

        
}
};
function startAnimation(){ //IMAGES ANIMATION
    let tl = gsap.timeline({
        scrollTrigger:{
            trigger:'.parent',
            start: "top top",
            scrub:5,
            end:"bottom bottom"
            
        }
    })
    function updateFrame(index){
        return{
            currentIndex: index,
            ease: "linear",
            onUpdate: function(){
                loadImage(Math.floor(frames.currentIndex));
            }
    }
  
    }
    tl
    .to(frames,updateFrame(180),"first")
    .to(".animate1",{opacity:0,ease: "linear"},"first")
    
    .to(frames,updateFrame(250),"second")
    .to(".animate2",{opacity:1, ease: "linear"},"second")
    .to(frames,updateFrame(320),"third")
    .to(".animate2",{opacity:1, ease: "linear"},"third")
    .to(frames,updateFrame(390),"fourth")
    .to(".animate2",{opacity:0, ease: "linear"},"fourth")

    .to(frames,updateFrame(460),"fifth")
    .to(".animate3",{opacity:1 ,ease: "linear"},"fifth")
    .to(frames,updateFrame(530),"sixth")
    .to(".animate3",{opacity:1, ease: "linear"},"sixth")
    .to(frames,updateFrame(600),"seventh")
    .to(".animate3",{opacity:0, ease: "linear"},"seventh")

    .to(frames,updateFrame(670),"eighth")
    .to(".panel",{x: "0%", ease: "expo"},"eighth")
    .to(frames,updateFrame(740),"ninth")
    .to(".panel",{x:"0%", ease: "expo"},"ninth")
    .to(frames,updateFrame(773),"tenth")
    .to(".panel",{opacity: 0, ease: "linear"},"tenth")

    .to(frames,updateFrame(890),"eleventh")
    .to("canvas",{scale: 0.5, ease: "linear"},"eleventh")

    .to(frames,updateFrame(970),"twelfth")
    .to(".panelism",{opacity:1,ease:"expo"},"twelfth")

    .to(frames,updateFrame(1040),"twelfth")
    .to(".panelism span",{width:200,ease:"expo"},"twelfth")

    .to(frames,updateFrame(1110),"thirteenth")
    .to("canvas",{scale: 1, ease: "linear"},"thirteenth")

    .to(frames,updateFrame(1190),"fourteenth")
    .to(".panelism",{scale:2,ease:"circle"},"fourteenth")
    .to(frames,updateFrame(1260),"fifteenth")
    .to(".panelism",{scale:2,ease:"circle"},"fifteenth")
    .to(frames,updateFrame(1345),"fifteenth")
    .to(".panelism",{scale:2,ease:"circle"},"fifteenth")
};
window.addEventListener("resize", function(){
    loadImage(Math.floor(frames.currentIndex));
})
preLoadImage();