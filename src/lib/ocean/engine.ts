// Copied from ascii-sharks (https://github.com/stackedlol/ascii-sharks, commit a0074c1),
// © 2026 drewdi, MIT licence: see LICENSE in this folder. Changes are marked "Adaptation:".
import { AsciiRenderer, type RendererOptions } from "./renderer.ts";
import type { Species } from "./species.ts";
import { World, type Crossing, type SharkSpec } from "./world.ts";

const STEP = 1 / 60;
const MAX_STEPS = 4;

export interface OceanOptions extends RendererOptions {
  /** Adaptation: overrides the area-based fish population; 0 leaves the sharks alone. */
  fishCount?: number;
  /** Adaptation: one pass across the canvas, then onDone. */
  crossing?: Crossing;
  /** Adaptation: false ignores the pointer (fish don't flee, clicks don't splash). */
  interactive?: boolean;
  /** Adaptation: the fish species living in the world; the bait fish when absent. */
  species?: Species[];
  onDone?: () => void;
}

/**
 * Wires World + AsciiRenderer to a canvas: fixed-timestep loop, resize,
 * pointer input, pausing off-screen, and prefers-reduced-motion.
 */
export class OceanEngine {
  private world: World;
  private renderer: AsciiRenderer;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private visible = true;
  private reducedMotion: MediaQueryList;
  private resizeObserver: ResizeObserver;
  private intersectionObserver: IntersectionObserver;
  private disposed = false;
  private canvas: HTMLCanvasElement;
  private options: OceanOptions;

  constructor(canvas: HTMLCanvasElement, sharks?: SharkSpec[], options: OceanOptions = {}) {
    this.canvas = canvas;
    this.options = options;
    this.world = new World(sharks, { fishCount: options.fishCount, crossing: options.crossing, species: options.species });
    this.renderer = new AsciiRenderer(canvas, options);
    this.renderer.setFontFamily(getComputedStyle(canvas).fontFamily);
    this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
    this.intersectionObserver = new IntersectionObserver(([entry]) => {
      this.visible = entry.isIntersecting;
      this.schedule();
    });
    this.intersectionObserver.observe(canvas);

    this.reducedMotion.addEventListener("change", this.onMotionPreference);
    if (options.interactive ?? true) {
      window.addEventListener("pointermove", this.onPointerMove, { passive: true });
      window.addEventListener("pointerdown", this.onPointerDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", this.onPointerLeave);
      window.addEventListener("blur", this.onPointerLeave);
    }

    this.resize();
    // Canvas text can't trigger a webfont load; once the mono face is in, redraw.
    document.fonts?.load(`600 16px ${getComputedStyle(canvas).fontFamily}`).then(() => {
      if (!this.disposed && this.reducedMotion.matches) this.drawStill();
    });
    this.schedule();
  }

  /** Adaptation: whether a viewport point (clientX, clientY) is on a shark. */
  hitShark(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    return this.renderer.isSharkAt(clientX - rect.left, clientY - rect.top);
  }

  /** Adaptation: recolour the fish (theme change); a still frame is redrawn at once. */
  setFishColors(colors: string[]) {
    this.renderer.setFishColors(colors);
    if (this.reducedMotion.matches) this.renderer.render(this.world, STEP);
  }

  destroy() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.intersectionObserver.disconnect();
    this.reducedMotion.removeEventListener("change", this.onMotionPreference);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("pointerdown", this.onPointerDown);
    document.documentElement.removeEventListener("pointerleave", this.onPointerLeave);
    window.removeEventListener("blur", this.onPointerLeave);
  }

  private resize() {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.resize(rect.width, rect.height, dpr);
    this.world.resize(rect.width, rect.height, this.renderer.cellWidth, this.renderer.cellHeight);
    if (this.reducedMotion.matches) this.drawStill();
  }

  private schedule() {
    cancelAnimationFrame(this.raf);
    if (this.disposed || !this.visible || this.reducedMotion.matches) return;
    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private frame = (now: number) => {
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    this.acc += dt;
    let steps = 0;
    while (this.acc >= STEP && steps < MAX_STEPS) {
      this.world.step(STEP);
      this.acc -= STEP;
      steps++;
    }
    if (steps === MAX_STEPS) this.acc = 0;
    // Adaptation: a finished crossing stops the loop and hands over to the caller.
    if (this.world.done) {
      this.raf = 0;
      this.renderer.clear();
      this.options.onDone?.();
      return;
    }
    this.renderer.render(this.world, dt);
    this.raf = requestAnimationFrame(this.frame);
  };

  /** Reduced motion: let the ecosystem settle, then show a single frame. */
  private drawStill() {
    if (this.world.time < 4) {
      for (let i = 0; i < 240; i++) this.world.step(STEP);
    }
    this.renderer.render(this.world, STEP);
  }

  private onMotionPreference = () => {
    if (this.reducedMotion.matches) {
      cancelAnimationFrame(this.raf);
      // Adaptation: a crossing in progress is cut short instead of freezing on a still frame.
      if (this.options.crossing) {
        this.renderer.clear();
        this.options.onDone?.();
        return;
      }
      this.drawStill();
    } else {
      this.schedule();
    }
  };

  private toLocal(e: PointerEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    return { x, y, inside };
  }

  private onPointerMove = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    const p = this.world.pointer;
    p.x = x;
    p.y = y;
    p.active = inside && e.pointerType !== "touch";
  };

  private onPointerDown = (e: PointerEvent) => {
    const { x, y, inside } = this.toLocal(e);
    if (inside && !this.reducedMotion.matches) this.world.splash(x, y);
  };

  private onPointerLeave = () => {
    this.world.pointer.active = false;
  };
}
