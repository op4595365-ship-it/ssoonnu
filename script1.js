
document.body.style.overflow = 'hidden';
window.scrollTo(0, 0); // 确保页面在顶部
let tl = gsap.timeline();
//t11111111111111111111111111

tl.from(".text1", { 
    x: 200,rotation:0,opacity:0,duration: 1, scale:0.5,ease: "power4.out"},2.8);
tl.to(".text1", { 
    opacity:0,duration: 0.1,},5.8);
//t222222222222222222222
tl.from(".text2", { 
    x: 20,y: -10, duration: 1,opacity:0,scale: 1.2,ease: "power4.out"},0.7);
tl.to(".text2", { 
    x: -800,opacity:0,duration: 1.8, ease: "expo.inOut"},1.95);
//t3333333333333333333333
tl.from(".text3", { 
    x:20,y: -10,opacity:0,duration: 1 ,scale: 1.2,ease: "power4.out"},0.9);
tl.to(".text3", { 
    x: -800,opacity:0,duration: 1.8, ease: "expo.inOut"},2);
//t44444444444444444444
tl.from(".text4", {
    y: 20,opacity:0,duration: 1 ,scale: 1.3,ease: "power3.out"},1.1);
tl.to(".text4", { 
    x: -800,opacity:0,duration: 1.8, ease: "expo.inOut"},2.05);
//t1a
//tl.from(".text1a", {
    //y: 20,opacity:0,duration: 1 ,scale: 1.3,ease: "power3.out"},8.25);
tl.to(".icon",{
    y: 300,opacity:1,duration: 1.8, ease: "expo.inOut"},2.25);
tl.to(".icon",{
    opacity:0,duration: 0.1, },5.5);
//mask11111111111111111111
tl.to(".mask1", { 
    y: -500,duration: 1.3, ease: "power2.out"},5.5);
//mask22222222222222222222
tl.to(".mask2", { 
    y: 500 ,duration: 1.3 ,ease: "power2.out"},5.5);
//line11111111111111111111
tl.to(".line", { 
    width: -2,duration: 2, ease: "power3.out",},3.8);
tl.to(".prompt",{
    x: -40 ,duration: 0.8 ,ease: "power3.out"},6);  
//滚动事件  
gsap.registerPlugin(ScrollTrigger);


const v1 = document.getElementById("v1");
const v2 = document.getElementById("v2");
const v3 = document.getElementById("v3");
const v3l = document.getElementById("v3l"); // 循环视频
const v4 = document.getElementById("v4");
const v5 = document.getElementById("v5");
const v6 = document.getElementById("v6");
const v7 = document.getElementById("v7");
const v8 = document.getElementById("v8");
const v9 = document.getElementById("v9");
const v10 = document.getElementById("v10");

const playNextBtn = document.getElementById("playNextBtn");
const FPS = 60;
let finished = false;
let scrollTriggerInstance = null;
let currentIndex = 0;   // 当前播放第几个
let isPlaying = false;  // 是否正在播放（锁点击）

const videos = [v3, v4, v5, v6, v7, v8, v9, v10]; // 需要切换的视频
const texts = ["改变车的外观",
       "替换车的外形",
       "改变车轮的样式",
       "改变场景",
       "随心所欲改变一切",
       "开启智能驾驶",
       "未来已来，智驾万象",
       " "
];
const textAnimations = [
  animateStep1,
  animateStep2,
  animateStep3,
  animateStep4,
  animateStep5,
  animateStep6,
  animateStep7,
  animateStep8
];
// 🔥 关键1：提前预加载视频2，杜绝黑屏
v2.load();

v2.addEventListener("ended", () => {
  console.log("v2视频播放完成弹出box");
  // GSAP实现box弹出动画（可自定义动画效果）
  gsap.to(".box", {
    opacity: 1,          // 从0变为1，淡入效果
    scale: 1,            // 缩放恢复正常
    x: 0,                // 可选：横向位移
    y: -130,                // 可选：纵向位移
    duration: 0.5,       // 动画时长
    ease: "power3.out",  // 缓动效果（丝滑弹出）
    pointerEvents: "auto"// 恢复交互（如果需要点击等）
  });
});

tl.eventCallback("onComplete", () => {
    // 1. 恢复页面滚动能力
    document.body.style.overflow = 'auto';
    
    // 2. 增加页面高度（确保有滚动空间）
    document.body.style.paddingBottom = '2000px'; // 或者根据视频长度计算
    
    // 3. 初始化 ScrollTrigger（现在用户才能触发）
    initScrollVideo();
    
    console.log("开场动画完成，可以开始滑动");
});
v1.onloadedmetadata = function () {
  const duration = v1.duration;
  gsap.config({ trialWarn: false });
  gsap.ticker.fps(60); // 强制60帧

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.2,
    fastScrollEnd: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const targetTime = progress * duration;
      gsap.to(v1, {
        currentTime: targetTime,
        duration: 0.05, // 0秒即时响应（配合scrub丝滑）
        ease: "none", // 线性过渡，无快慢变化
        overwrite: "auto" // 强制覆盖旧动画，防止卡顿
      });

      if (self.progress > 0.99 && !finished) {
        finished = true;
        ScrollTrigger.getAll().forEach(t => t.kill());
        // 🔥 关键2：先播放视频2 → 再淡入显示 → 最后隐藏视频1
        v2.play().then(() => {
          gsap.to(".prompt",{
            opacity:0,},0);
          gsap.to(".text1a",{
            delay:4.8,opacity:1,duration:0.6,y: -125,
            ease:"power3.out",  
        })
          gsap.to(".text2a",{
            delay:5,opacity:1,duration:0.6,y: -110,
            ease:"power3.out",  
        })
          gsap.to(".text3a",{
            delay:5.2,opacity:1,duration:0.6,y: -95,
            ease:"power3.out",
        })
          // 视频2播放成功后，再执行切换，完全无黑屏
          v2.style.opacity = 1;
          v1.style.opacity = 0;
        }).catch(e => console.log("错误：", e));
      }
    }
  });
};
function animateStep1() {
  const tl = gsap.timeline();
    tl.to(".text1a,.text2a,.text3a", {
    x: -200,
    opacity: 0,
    duration: 0.4
  })
    gsap.to(".text1b",{
      opacity:1,
      duration: 0.6,
      y: -125,
      ease:"power3.out",
  })
}
function animateStep2() {
    gsap.to(".text1b",{
      opacity:0,
      duration: 0.6,
      y: 125,
      ease:"power3.out",
  })
}
function animateStep3() {
  gsap.to(".text1c",{
    opacity:1,
    duration: 0.6,
    y: -125,
    ease:"power3.out",
  })
}
function animateStep4() {
  gsap.to(".text1c",{
    opacity:0,
    duration: 0.6,
    y: 125,
    ease:"power3.out",
})
  gsap.to(".text1d",{
    opacity:1,
    duration: 0.6,
    y: -125,
    ease:"power3.out",
})
}
function animateStep5() {
let tl1 = gsap.timeline();
  tl1.to(".text1d",{
    opacity:0,
    duration: 0.6,
    y: 125,
    ease:"power3.out",
},0)
  tl1.to(".text1e",{
    opacity:1,
    duration: 0.6,
    y: -125,
    ease:"power3.out",
},0.6)
  tl1.to(".text1e",{
    opacity:0,
    duration: 0.6,
    y: 125,
    ease:"power3.out",
},2.3)
    tl1.to(".text1f",{
    opacity:1,
    duration: 0.6,
    y: -125,
    ease:"power3.out",
},2.6)
    tl1.to(".text1f",{
    opacity:0,
    duration: 0.6,
    y: 125,
    ease:"power3.out",
},6.9)
    tl1.to(".text1g",{
    opacity:1,
    duration: 0.6,
    y:-125,
    ease:"power3.out",
},7.1)
    tl1.to(".text1g",{
    opacity:0,
    duration: 0.6,
    y:125,
    ease:"power3.out",
},10.5)
    tl1.to(".text1h",{
    opacity:1,
    duration: 0.6, 
    y:-125,
    ease:"power3.out",
},10.7)
    tl1.to(".text1h",{
    opacity:0,
    duration: 0.6, 
    y:125,
    ease:"power3.out",
},17)
}
function animateStep6() {
    gsap.to(".text1i",{
    opacity:1,
    duration: 0.6,
    y:-125,
    ease:"power3.out",
})
}
function animateStep7() {
    gsap.to(".text1i",{
    opacity:0,
    duration: 0.6,
    y:125,
    ease:"power3.out",
})
    gsap.to(".text2i",{
    opacity:1,
    duration: 0.6,
    y:-125,
    ease:"power3.out",
})
}        
function animateStep8() {
    gsap.to(".text2i",{
    opacity:0,
    duration: 0.6,
    y:125,
    ease:"power3.out",
})
}
//按钮点击

playNextBtn.addEventListener("click", () => {

  // 🚫 播放中禁止点击
  if (isPlaying) return;

  // 🚫 播完了也不能再点
  if (currentIndex >= videos.length) return;

  isPlaying = true;

  textAnimations[currentIndex]?.();

  // 👉 禁止点击box
  document.querySelector(".box").style.pointerEvents = "none";

  // 1️⃣ 更新文字
  document.getElementById("boxText").innerText = texts[currentIndex];

  // 2️⃣ 隐藏所有视频
  videos.forEach(v => v.style.opacity = 0);

  // 3️⃣ 播放当前视频
  const currentVideo = videos[currentIndex];
  currentVideo.style.opacity = 1;
  currentVideo.currentTime = 0;
  currentVideo.play();

  // 4️⃣ 播完解锁
  currentVideo.onended = () => {
    isPlaying = false;
    currentIndex++;

    // 👉 恢复点击
    document.querySelector(".box").style.pointerEvents = "auto";
  };

});
function preventScroll(e) {
    // 如果开场动画还没完成，阻止滚动
    if (tl.progress() < 1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}
window.addEventListener('wheel', preventScroll, { passive: false });
window.addEventListener('touchmove', preventScroll, { passive: false });

// 动画完成后移除事件监听
tl.eventCallback("onComplete", () => {
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
});