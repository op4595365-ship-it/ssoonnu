let tl = gsap.timeline();
gsap.to(".mask1", {
    
    duration: 1
});
//t11111111111111111111111111
tl.from(".text1", { 
    x: 500,
    opacity:0,
    duration: 1.8, 
    ease: "power4.out"
    },0.5);
tl.to(".text1", { 
    y: -510,
    x: 560,
    rotation:0,
    duration: 1, 
    scale:0.8,
    ease: "power4.out"
    },2.5);
tl.to(".text1", { 
    opacity:0,
    duration: 0.2,
    },5.8);
//t222222222222222222222
tl.from(".text2", { 
    y: 100, 
    duration: 1,
    opacity:0,
    scale: 0.5,
    ease: "power3.out"
    },0.7);
tl.to(".text2", { 
    y: 300,
    opacity:0,
    duration: 1, 
    ease: "power4.out"
    },2.5);
//t3333333333333333333333
tl.from(".text3", { 
    y: 120,
    opacity:0,
    duration: 1 ,
    scale: 0.5,
    ease: "power3.out"
    },1);
tl.to(".text3", { 
    y: 300,
    opacity:0,
    duration: 1, 
    ease: "power4.out"
    },2.5);
//mask11111111111111111111
tl.to(".mask1", { 
    y: -500,
    duration: 1.3, 
    ease: "power2.out"
    },5.5);
//mask22222222222222222222
tl.to(".mask2", { 
    y: 500 ,
    duration: 1.3 ,
    ease: "power2.out"
    },5.5);
//line11111111111111111111
tl.to(".line", { 
    width: -2,
    duration: 2, 
    ease: "power3.out",
    },3.8);
gsap.registerPlugin(ScrollTrigger);

const v1 = document.getElementById("v1");
const v2 = document.getElementById("v2");
const FPS = 30;
let finished = false;

// 🔥 关键1：提前预加载视频2，杜绝黑屏
v2.load();

v1.onloadedmetadata = function () {
  const duration = v1.duration;

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 0,
    onUpdate: (self) => {
      const time = self.progress * duration;
      const frameTime = Math.round(time * FPS) / FPS;
      v1.currentTime = frameTime;


      if (self.progress > 0.99 && !finished) {
        finished = true;
        ScrollTrigger.getAll().forEach(t => t.kill());

        // 🔥 关键2：先播放视频2 → 再淡入显示 → 最后隐藏视频1
        v2.play().then(() => {
          // 视频2播放成功后，再执行切换，完全无黑屏
          v2.style.opacity = 1;
          v1.style.opacity = 0;
        }).catch(e => console.log("错误：", e));
      }
    }
  });
};