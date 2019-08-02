import { TimelineMax as Timeline, Power1 } from "gsap";

const loadPromise: Promise<any> = new Promise(resolve => {
  window.addEventListener("DOMContentLoaded", resolve);
});

const getTimeline = (node: HTMLElement, delay: number) => {
  const timeline = new Timeline({ paused: true });
  const sections = node.querySelectorAll(".router--tranistion");
  timeline
    .from(node, 0, { display: "none", autoAlpha: 0, delay })
    .staggerFrom(
      sections,
      0.4,
      { autoAlpha: 0, x: -25, ease: Power1.easeOut },
      0.125
    );

  return timeline;
};
export const play = (pathname: string, node: HTMLElement, appears: boolean) => {
  if (pathname) {
    const delay = appears ? 0 : 0.5;
    let timeline: Timeline = getTimeline(node, delay);
    loadPromise.then(() => requestAnimationFrame(() => timeline.play()));
  }
};

export const exit = (node: HTMLElement) => {
  const timeline = new Timeline({ paused: true });

  timeline.to(node, 0.4, { autoAlpha: 0, x: 25, ease: Power1.easeOut });
  timeline.play();
};
