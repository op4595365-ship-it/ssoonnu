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