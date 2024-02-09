import { gsap } from "gsap";

export function firstSectionAnimation() {
  gsap.fromTo(
    ".wlcm",
    {
      y: 100,
    },
    {
      y: 0,
      duration: 0.9,
      delay: 1,
    }
  );
  gsap.fromTo(
    "#imgHome",
    {
      x: 170,
    },
    {
      x: 0,
      duration: 0.9,
      delay: 1,
    }
  );

  gsap.fromTo(
    ".test",
    {
      y: 150,
    },
    {
      y: 0,
      duration: 0.9,
      delay: 1.2,
      stagger: 0.2,
    }
  );
  gsap.fromTo(
    ".portal",
    {
      y: 100,
    },
    {
      y: 0,
      duration: 0.9,
      delay: 1.2,
    }
  );
  gsap.fromTo(
    ".right-para",
    {
      y: 200,
    },
    {
      y: 0,
      duration: 0.9,
      delay: 1.5,
      stagger: 0.2,
    }
  );

  gsap.fromTo(
    ".login",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      delay: 0.5,
      duration: 1.2,
    }
  );
}
