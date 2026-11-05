import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  startTransition,
} from "react";

const MAX_TAGS = 60;
const SUB = 1 / 240;
const WALL = { x: 0, y: 0, vx: 0, vy: 0, va: 0, invM: 0, invI: 0 };

function wrapAngle(a) {
  return a - Math.PI * 2 * Math.round(a / (Math.PI * 2));
}

function clampTilt(a, maxTilt) {
  if (maxTilt < 0) return a;
  const wa = wrapAngle(a);
  return Math.max(-maxTilt, Math.min(maxTilt, wa));
}

function makeRandom(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s + 1831565813) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function luminance(color) {
  if (typeof color !== "string") return 0.5;
  let r = 0;
  let g = 0;
  let b = 0;
  const m = color.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (m) {
    r = +m[1];
    g = +m[2];
    b = +m[3];
  } else if (color.charAt(0) === "#") {
    let h = color.slice(1);
    if (h.length === 3 || h.length === 4) {
      h = h
        .split("")
        .map((c) => c + c)
        .join("");
    }
    r = parseInt(h.slice(0, 2), 16);
    g = parseInt(h.slice(2, 4), 16);
    b = parseInt(h.slice(4, 6), 16);
  } else {
    return 0.5;
  }
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function closestSegSeg(p1x, p1y, q1x, q1y, p2x, p2y, q2x, q2y, out) {
  const d1x = q1x - p1x;
  const d1y = q1y - p1y;
  const d2x = q2x - p2x;
  const d2y = q2y - p2y;
  const rx = p1x - p2x;
  const ry = p1y - p2y;
  const a = d1x * d1x + d1y * d1y;
  const e = d2x * d2x + d2y * d2y;
  const f = d2x * rx + d2y * ry;
  let s = 0;
  let t = 0;
  const EPS = 1e-8;
  if (a <= EPS && e <= EPS) {
    s = 0;
    t = 0;
  } else if (a <= EPS) {
    s = 0;
    t = Math.max(0, Math.min(1, f / e));
  } else {
    const c = d1x * rx + d1y * ry;
    if (e <= EPS) {
      t = 0;
      s = Math.max(0, Math.min(1, -c / a));
    } else {
      const b = d1x * d2x + d1y * d2y;
      const denom = a * e - b * b;
      s = denom !== 0 ? Math.max(0, Math.min(1, (b * f - c * e) / denom)) : 0;
      t = (b * s + f) / e;
      if (t < 0) {
        t = 0;
        s = Math.max(0, Math.min(1, -c / a));
      } else if (t > 1) {
        t = 1;
        s = Math.max(0, Math.min(1, (b - c) / a));
      }
    }
  }
  out[0] = p1x + d1x * s;
  out[1] = p1y + d1y * s;
  out[2] = p2x + d2x * t;
  out[3] = p2y + d2y * t;
}

function wakeBody(w, b) {
  if (!b.sleep && b.still === 0) return;
  const stack = [b];
  b.sleep = false;
  b.still = 0;
  while (stack.length) {
    const a = stack.pop();
    for (const o of w.bodies) {
      if (!o.active || (!o.sleep && o.still === 0)) continue;
      const reach = a.hl + a.r + o.hl + o.r + 6;
      if ((o.x - a.x) ** 2 + (o.y - a.y) ** 2 > reach * reach) continue;
      o.sleep = false;
      o.still = 0;
      stack.push(o);
    }
  }
}

function resolve(w, A, B, Px, Py, nx, ny, pen, p) {
  const rax = Px - A.x;
  const ray = Py - A.y;
  const rbx = Px - B.x;
  const rby = Py - B.y;
  const vax = A.vx - A.va * ray;
  const vay = A.vy + A.va * rax;
  const vbx = B.vx - B.va * rby;
  const vby = B.vy + B.va * rbx;
  const rvx = vbx - vax;
  const rvy = vby - vay;
  const vn = rvx * nx + rvy * ny;

  if (vn < -120) {
    if (A.sleep) wakeBody(w, A);
    if (B.sleep) wakeBody(w, B);
  }

  const iMA = A.sleep ? 0 : A.invM;
  const iIA = A.sleep ? 0 : A.invI;
  const iMB = B.sleep ? 0 : B.invM;
  const iIB = B.sleep ? 0 : B.invI;
  const invMass = iMA + iMB;
  if (invMass === 0) return;

  const corr = (Math.max(pen - 0.5, 0) * 0.5) / invMass;
  A.x -= nx * corr * iMA;
  A.y -= ny * corr * iMA;
  B.x += nx * corr * iMB;
  B.y += ny * corr * iMB;
  if (vn > 0) return;

  const raCn = rax * ny - ray * nx;
  const rbCn = rbx * ny - rby * nx;
  const denom = invMass + raCn * raCn * iIA + rbCn * rbCn * iIB;
  const e = Math.abs(vn) < 80 ? 0 : p.bounce;
  const j = (-(1 + e) * vn) / denom;
  A.vx -= j * nx * iMA;
  A.vy -= j * ny * iMA;
  A.va -= raCn * j * iIA;
  B.vx += j * nx * iMB;
  B.vy += j * ny * iMB;
  B.va += rbCn * j * iIB;

  let tx = rvx - vn * nx;
  let ty = rvy - vn * ny;
  const tl = Math.hypot(tx, ty);
  if (tl < 1e-6) return;
  tx /= tl;
  ty /= tl;
  const raCt = rax * ty - ray * tx;
  const rbCt = rbx * ty - rby * tx;
  const denomT = invMass + raCt * raCt * iIA + rbCt * rbCt * iIB;
  let jt = -(rvx * tx + rvy * ty) / denomT;
  const maxF = p.friction * j;
  jt = Math.max(-maxF, Math.min(maxF, jt));
  A.vx -= jt * tx * iMA;
  A.vy -= jt * ty * iMA;
  A.va -= raCt * jt * iIA;
  B.vx += jt * tx * iMB;
  B.vy += jt * ty * iMB;
  B.va += rbCt * jt * iIB;
}

const tmp = [0, 0, 0, 0];

function step(w, dt, p, interactive) {
  const { bodies, W, H } = w;
  const g = p.gravity * 1600;

  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    if (!b.active || b.sleep) continue;
    b.vy += g * dt;

    if (p.maxTilt >= 0 && !b.held) {
      b.a = wrapAngle(b.a);
      const over = b.a - Math.max(-p.maxTilt, Math.min(p.maxTilt, b.a));
      if (over !== 0) {
        b.va += (-over * 300 - b.va * 12) * dt;
      }
    }

    if (b.held && interactive) {
      const ca = Math.cos(b.a);
      const sa = Math.sin(b.a);
      const rx = ca * b.gx - sa * b.gy;
      const ry = sa * b.gx + ca * b.gy;
      const Gx = b.x + rx;
      const Gy = b.y + ry;
      const vGx = b.vx - b.va * ry;
      const vGy = b.vy + b.va * rx;
      const Fx = (w.px - Gx) * 400 - vGx * 25;
      const Fy = (w.py - Gy) * 400 - vGy * 25;
      b.vx += Fx * dt;
      b.vy += Fy * dt;
      b.va += ((rx * Fy - ry * Fx) * 12) / (b.w * b.w + b.h * b.h) * dt;
      b.va -= b.va * 4 * dt;
    }

    b.vx -= b.vx * 0.15 * dt;
    b.vy -= b.vy * 0.15 * dt;
    b.va -= b.va * 1.2 * dt;

    if (!b.held && Math.abs(b.vx) + Math.abs(b.vy) < 40 && Math.abs(b.va) < 0.6) {
      const k = 1 - 10 * dt;
      b.vx *= k;
      b.vy *= k;
      b.va *= k;
    }

    const sp = Math.hypot(b.vx, b.vy);
    if (sp > 3000) {
      b.vx *= 3000 / sp;
      b.vy *= 3000 / sp;
    }
    if (b.va > 30) b.va = 30;
    else if (b.va < -30) b.va = -30;

    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.a += b.va * dt;
  }

  const ceil = -H * 3;
  for (let iter = 0; iter < 3; iter++) {
    for (let i = 0; i < bodies.length; i++) {
      const A = bodies[i];
      if (!A.active) continue;
      const ca = Math.cos(A.a);
      const sa = Math.sin(A.a);
      const p1x = A.x - ca * A.hl;
      const p1y = A.y - sa * A.hl;
      const q1x = A.x + ca * A.hl;
      const q1y = A.y + sa * A.hl;

      for (let j = i + 1; j < bodies.length; j++) {
        const B = bodies[j];
        if (!B.active || (A.sleep && B.sleep)) continue;
        const dx = B.x - A.x;
        const dy = B.y - A.y;
        const reach = A.hl + A.r + B.hl + B.r;
        if (dx * dx + dy * dy > reach * reach) continue;
        const cb = Math.cos(B.a);
        const sb = Math.sin(B.a);
        closestSegSeg(
          p1x,
          p1y,
          q1x,
          q1y,
          B.x - cb * B.hl,
          B.y - sb * B.hl,
          B.x + cb * B.hl,
          B.y + sb * B.hl,
          tmp
        );
        let nx = tmp[2] - tmp[0];
        let ny = tmp[3] - tmp[1];
        const d = Math.hypot(nx, ny);
        const pen = A.r + B.r - d;
        if (pen <= 0) continue;
        if (d < 1e-6) {
          nx = 0;
          ny = -1;
        } else {
          nx /= d;
          ny /= d;
        }
        resolve(
          w,
          A,
          B,
          tmp[0] + nx * (A.r - pen / 2),
          tmp[1] + ny * (A.r - pen / 2),
          nx,
          ny,
          pen,
          p
        );
      }

      if (A.sleep) continue;
      for (let k = 0; k < 2; k++) {
        const ex = k === 0 ? p1x : q1x;
        const ey = k === 0 ? p1y : q1y;
        if (ey + A.r > H) resolve(w, A, WALL, ex, H, 0, 1, ey + A.r - H, p);
        if (ex - A.r < 0) resolve(w, A, WALL, 0, ey, -1, 0, A.r - ex, p);
        if (ex + A.r > W) resolve(w, A, WALL, W, ey, 1, 0, ex + A.r - W, p);
        if (ey - A.r < ceil) resolve(w, A, WALL, ex, ceil, 0, -1, ceil - (ey - A.r), p);
      }
    }
  }
  w.t += dt;
}

function draw(w) {
  for (let i = 0; i < w.bodies.length; i++) {
    const b = w.bodies[i];
    if (!b.el) continue;
    if (!b.active) {
      b.el.style.visibility = "hidden";
      continue;
    }
    b.el.style.visibility = "visible";
    b.el.style.transform = `translate(${b.x - b.w / 2}px, ${b.y - b.h / 2}px) rotate(${b.a}rad)`;
  }
}

function place(w, style, stagger, allActive) {
  const rnd = makeRandom(w.bodies.length * 7919 + Math.round(w.W));
  const { W, H } = w;
  w.t = 0;
  w.quiet = 0;
  w.calm = 0;
  w.run = 0;
  for (let i = 0; i < w.bodies.length; i++) {
    const b = w.bodies[i];
    const half = b.hl + b.r;
    b.vx = 0;
    b.vy = 0;
    b.va = 0;
    b.held = false;
    b.a = (rnd() - 0.5) * 0.6;
    if (style === "pour") {
      b.x = W / 2 + (rnd() - 0.5) * 40;
      b.y = -b.h - 10 - rnd() * 30;
      b.vx = (rnd() - 0.5) * 320;
      b.vy = 150;
      b.delay = i * stagger;
    } else if (style === "burst") {
      b.x = W / 2 + (rnd() - 0.5) * 60;
      b.y = H - b.r - 4;
      b.vx = (rnd() - 0.5) * 1800;
      b.vy = -(700 + rnd() * 800);
      b.va = (rnd() - 0.5) * 10;
      b.delay = i * stagger * 0.5;
    } else {
      b.x = half + rnd() * Math.max(1, W - half * 2);
      b.y = -b.h - 20 - rnd() * H * 0.6;
      b.delay = i * stagger;
    }
    if (allActive) {
      b.x = half + rnd() * Math.max(1, W - half * 2);
      b.y = -(i + 1) * (b.h + 6);
      b.vx = 0;
      b.vy = 0;
      b.va = 0;
      b.delay = 0;
    }
    b.active = allActive;
    b.lx = b.x;
    b.ly = b.y;
    b.la = b.a;
    b.sleep = false;
    b.still = 0;
  }
}

function settleNow(w, p) {
  for (let i = 0; i < 1000; i++) step(w, SUB, p, false);
  for (const b of w.bodies) {
    b.vx = 0;
    b.vy = 0;
    b.va = 0;
    b.a = clampTilt(b.a, p.maxTilt);
  }
}

const DEFAULT_COLORS = ["#1a1a1a", "#393632", "#2a2a28", "#e5e5e0", "#8b8b73"];

/**
 * Physics Tag Pile — Framer PhysicsTagPile port (no Framer runtime).
 * Tags fall, bounce, pile; drag/throw + cursor push. Reduced-motion → settled pile.
 */
export default function PhysicsTagPile({
  tags = [],
  trigger = "view",
  replay = true,
  dropStyle = "rain",
  gravity = 1,
  bounce = 0.35,
  friction = 0.4,
  stagger = 0.06,
  drag = true,
  cursorPush = true,
  keepReadable = true,
  maxTilt = 25,
  colors = DEFAULT_COLORS,
  featuredColor = "#cfa355",
  textMode = "auto",
  textColor = "#111114",
  borderWidth = 1,
  borderColor = "rgba(255, 255, 255, 0.18)",
  radius = 999,
  paddingX = 18,
  paddingY = 10,
  background = "transparent",
  className = "",
  style,
  height = 420,
}) {
  const list = useMemo(() => {
    const src = tags.length
      ? tags
      : [{ label: "Tag", featured: false }];
    return src.slice(0, MAX_TAGS).map((t) => ({
      label: (t.label || "").trim() || "Tag",
      link: t.link || "",
      featured: !!t.featured,
    }));
  }, [tags]);

  const palette = colors?.length ? colors : DEFAULT_COLORS;
  const [phase, setPhase] = useState("flow");
  const rootRef = useRef(null);
  const tagRefs = useRef([]);
  const worldRef = useRef({
    bodies: [],
    W: 0,
    H: 0,
    t: 0,
    quiet: 0,
    calm: 0,
    run: 0,
    px: 0,
    py: 0,
  });
  const paramsRef = useRef({ gravity, bounce, friction, maxTilt: -1 });
  paramsRef.current = {
    gravity: Math.max(0.05, gravity),
    bounce: Math.max(0, Math.min(1, bounce)),
    friction: Math.max(0, Math.min(1, friction)),
    maxTilt: keepReadable
      ? (Math.max(0, Math.min(90, maxTilt)) * Math.PI) / 180
      : -1,
  };

  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const lastRef = useRef(0);
  const accRef = useRef(0);
  const inViewRef = useRef(false);
  const ioReadyRef = useRef(false);
  const startedRef = useRef(false);
  const reducedRef = useRef(false);
  const frozenRef = useRef(false);
  const pointerRef = useRef({
    prevX: 0,
    prevY: 0,
    prevT: 0,
    downX: 0,
    downY: 0,
    downT: 0,
    moved: false,
  });
  const heldRef = useRef(null);
  const optsRef = useRef({ dropStyle, stagger, trigger, replay, drag, cursorPush });
  optsRef.current = { dropStyle, stagger, trigger, replay, drag, cursorPush };

  const layoutKey = useMemo(
    () =>
      JSON.stringify([
        list.map((t) => t.label),
        paddingX,
        paddingY,
        borderWidth,
        dropStyle,
        height,
      ]),
    [list, paddingX, paddingY, borderWidth, dropStyle, height]
  );

  const stopLoop = () => {
    runningRef.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  };

  const wake = () => {
    if (
      runningRef.current ||
      frozenRef.current ||
      !inViewRef.current ||
      !startedRef.current
    ) {
      return;
    }
    runningRef.current = true;
    lastRef.current = 0;
    accRef.current = 0;
    worldRef.current.quiet = 0;
    worldRef.current.calm = 0;
    worldRef.current.run = 0;
    rafRef.current = requestAnimationFrame(loop);
  };

  const loop = (ts) => {
    if (!runningRef.current) return;
    const w = worldRef.current;
    const dtFrame = lastRef.current
      ? Math.min((ts - lastRef.current) / 1000, 1 / 30)
      : 1 / 60;
    lastRef.current = ts;
    accRef.current += dtFrame;
    let n = 0;
    while (accRef.current >= SUB && n < 8) {
      step(w, SUB, paramsRef.current, true);
      accRef.current -= SUB;
      n++;
    }

    let pending = false;
    let maxMove = 0;
    for (const b of w.bodies) {
      if (!b.active) {
        if (w.t >= b.delay) b.active = true;
        else pending = true;
      }
      if (b.active) {
        const mv = Math.max(
          Math.abs(b.x - b.lx),
          Math.abs(b.y - b.ly),
          Math.abs(b.a - b.la) * (b.hl + b.r)
        );
        maxMove = Math.max(maxMove, mv);
        if (!b.sleep && !b.held) {
          if (mv < 0.35) b.still++;
          else b.still = 0;
          if (b.still > 25) {
            b.sleep = true;
            b.vx = 0;
            b.vy = 0;
            b.va = 0;
            b.a = clampTilt(b.a, paramsRef.current.maxTilt);
          }
        }
      }
      b.lx = b.x;
      b.ly = b.y;
      b.la = b.a;
    }
    draw(w);

    if (!pending && !heldRef.current && maxMove < 0.08) w.quiet++;
    else w.quiet = 0;
    if (!pending && !heldRef.current && maxMove < 0.5) w.calm++;
    else w.calm = 0;
    w.run += dtFrame;
    if (
      w.quiet > 40 ||
      w.calm > 90 ||
      (w.run > 30 && !pending && !heldRef.current)
    ) {
      for (const b of w.bodies) {
        b.sleep = true;
        b.still = 0;
        b.a = clampTilt(b.a, paramsRef.current.maxTilt);
        b.vx = 0;
        b.vy = 0;
        b.va = 0;
      }
      draw(w);
      stopLoop();
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
  };

  const restart = () => {
    const w = worldRef.current;
    if (!w.bodies.length) return;
    if (frozenRef.current) {
      place(w, "rain", 0, true);
      settleNow(w, paramsRef.current);
      draw(w);
      return;
    }
    stopLoop();
    place(w, optsRef.current.dropStyle, optsRef.current.stagger, false);
    draw(w);
    startedRef.current = true;
    wake();
  };

  useEffect(() => {
    startTransition(() => setPhase("physics"));
  }, []);

  useLayoutEffect(() => {
    if (phase !== "physics") return;
    const root = rootRef.current;
    if (!root) return;
    const w = worldRef.current;
    w.W = root.clientWidth;
    w.H = root.clientHeight;
    w.bodies = list.map((_, i) => {
      const el = tagRefs.current[i];
      const bw = el ? el.offsetWidth : 80;
      const bh = el ? el.offsetHeight : 36;
      const m = (bw * bh) / 1600;
      return {
        x: 0,
        y: 0,
        a: 0,
        vx: 0,
        vy: 0,
        va: 0,
        w: bw,
        h: bh,
        hl: Math.max(0, (bw - bh) / 2),
        r: bh / 2,
        invM: 1 / m,
        invI: 12 / (m * (bw * bw + bh * bh)),
        active: false,
        delay: 0,
        held: false,
        gx: 0,
        gy: 0,
        lx: 0,
        ly: 0,
        la: 0,
        still: 0,
        sleep: false,
        el,
      };
    });
    heldRef.current = null;

    const mq =
      typeof matchMedia === "function"
        ? matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    reducedRef.current = !!(mq && mq.matches);
    frozenRef.current = reducedRef.current;

    if (frozenRef.current) {
      place(w, "rain", 0, true);
      settleNow(w, paramsRef.current);
      draw(w);
      return () => stopLoop();
    }

    stopLoop();
    startedRef.current = false;
    place(w, optsRef.current.dropStyle, optsRef.current.stagger, false);
    draw(w);

    if (
      optsRef.current.trigger === "load" &&
      ioReadyRef.current &&
      !inViewRef.current
    ) {
      place(w, "rain", 0, true);
      settleNow(w, paramsRef.current);
      draw(w);
      startedRef.current = true;
    } else if (inViewRef.current) {
      startedRef.current = true;
      wake();
    }

    return () => stopLoop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, layoutKey]);

  useEffect(() => {
    if (phase !== "physics") return;
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      inViewRef.current = true;
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0].isIntersecting;
        const wasInView = inViewRef.current;
        const first = !ioReadyRef.current;
        inViewRef.current = visible;
        ioReadyRef.current = true;
        if (frozenRef.current) return;
        const w = worldRef.current;
        if (visible) {
          if (!startedRef.current) {
            startedRef.current = true;
            wake();
          } else if (
            !wasInView &&
            optsRef.current.replay &&
            optsRef.current.trigger === "view"
          ) {
            restart();
          } else {
            wake();
          }
        } else {
          stopLoop();
          if (
            first &&
            optsRef.current.trigger === "load" &&
            !startedRef.current &&
            w.bodies.length
          ) {
            place(w, "rain", 0, true);
            settleNow(w, paramsRef.current);
            draw(w);
            startedRef.current = true;
          }
        }
      },
      { threshold: 0.15 }
    );
    io.observe(root);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== "physics") return;
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      const w = worldRef.current;
      if (Math.abs(rect.width - w.W) < 1 && Math.abs(rect.height - w.H) < 1) {
        return;
      }
      w.W = rect.width;
      w.H = rect.height;
      for (const b of w.bodies) {
        b.sleep = false;
        b.still = 0;
      }
      if (frozenRef.current) {
        place(w, "rain", 0, true);
        settleNow(w, paramsRef.current);
        draw(w);
      } else {
        wake();
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (phase !== "physics") return;
    const onMove = (e) => {
      const root = rootRef.current;
      const w = worldRef.current;
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      w.px = px;
      w.py = py;
      const pr = pointerRef.current;
      const now = e.timeStamp || Date.now();
      const dtp = Math.max(0.004, (now - pr.prevT) / 1000);
      const pvx = (px - pr.prevX) / dtp;
      const pvy = (py - pr.prevY) / dtp;
      pr.prevX = px;
      pr.prevY = py;
      pr.prevT = now;

      if (heldRef.current) {
        if (Math.hypot(px - pr.downX, py - pr.downY) > 6) pr.moved = true;
        return;
      }
      if (
        !optsRef.current.cursorPush ||
        frozenRef.current ||
        !inViewRef.current ||
        !startedRef.current
      ) {
        return;
      }
      if (px < -60 || py < -60 || px > w.W + 60 || py > w.H + 60) return;
      const speed = Math.min(Math.hypot(pvx, pvy), 2500);
      if (speed < 20) return;
      let touched = false;
      for (const b of w.bodies) {
        if (!b.active) continue;
        const ca = Math.cos(b.a);
        const sa = Math.sin(b.a);
        const dx = px - b.x;
        const dy = py - b.y;
        const t = Math.max(-b.hl, Math.min(b.hl, dx * ca + dy * sa));
        const cx = b.x + ca * t;
        const cy = b.y + sa * t;
        let nx = cx - px;
        let ny = cy - py;
        const d = Math.hypot(nx, ny);
        const R = b.r + 36;
        if (d > R) continue;
        if (d < 0.001) {
          nx = pvx;
          ny = pvy;
        }
        const nl = Math.hypot(nx, ny) || 1;
        nx /= nl;
        ny /= nl;
        const k = (1 - d / R) * (120 + speed * 0.4);
        wakeBody(w, b);
        b.vx += nx * k;
        b.vy += ny * k;
        b.va +=
          ((cx - b.x) * ny * k - (cy - b.y) * nx * k) *
          (12 / (b.w * b.w + b.h * b.h)) *
          0.3;
        touched = true;
      }
      if (touched) wake();
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const onPointerDown = (e, i) => {
    const pr = pointerRef.current;
    const root = rootRef.current;
    if (!root) return;
    const rect = root.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    pr.downX = px;
    pr.downY = py;
    pr.downT = e.timeStamp || Date.now();
    pr.moved = false;
    pr.prevX = px;
    pr.prevY = py;
    pr.prevT = pr.downT;
    if (!optsRef.current.drag || frozenRef.current || e.button > 0) return;
    const w = worldRef.current;
    const b = w.bodies[i];
    if (!b || !b.active) return;
    w.px = px;
    w.py = py;
    const dx = px - b.x;
    const dy = py - b.y;
    const ca = Math.cos(b.a);
    const sa = Math.sin(b.a);
    b.gx = ca * dx + sa * dy;
    b.gy = -sa * dx + ca * dy;
    wakeBody(w, b);
    b.held = true;
    heldRef.current = b;
    try {
      e.currentTarget?.setPointerCapture?.(e.pointerId);
    } catch {
      /* ignore */
    }
    if (e.currentTarget) e.currentTarget.style.cursor = "grabbing";
    wake();
  };

  const onPointerUp = (e) => {
    const b = heldRef.current;
    if (b) {
      b.held = false;
      heldRef.current = null;
      if (e.currentTarget) e.currentTarget.style.cursor = "grab";
    }
    wake();
  };

  const onClick = (e) => {
    const pr = pointerRef.current;
    const dt = (e.timeStamp || Date.now()) - pr.downT;
    if (pr.moved || dt > 300) e.preventDefault();
  };

  const tagStyle = (i, physics) => {
    const t = list[i];
    const fill = t.featured ? featuredColor : palette[i % palette.length];
    const color =
      textMode === "custom"
        ? textColor
        : luminance(fill) > 0.6
          ? "#111114"
          : "#FFFFFF";
    return {
      boxSizing: "border-box",
      display: "inline-flex",
      alignItems: "center",
      whiteSpace: "nowrap",
      padding: `${paddingY}px ${paddingX}px`,
      borderRadius: radius,
      background: fill,
      color,
      border: borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : "none",
      textDecoration: "none",
      userSelect: "none",
      WebkitUserSelect: "none",
      pointerEvents: "auto",
      fontFamily: "inherit",
      fontWeight: 500,
      fontSize: "15px",
      lineHeight: 1.2,
      ...(physics
        ? {
            position: "absolute",
            left: 0,
            top: 0,
            visibility: "hidden",
            touchAction: "none",
            cursor: drag ? "grab" : t.link ? "pointer" : "default",
            willChange: "transform",
          }
        : {}),
    };
  };

  const renderTag = (i, physics) => {
    const t = list[i];
    const common = {
      ref: (el) => {
        tagRefs.current[i] = el;
      },
      style: tagStyle(i, physics),
      draggable: false,
      onPointerDown: physics ? (e) => onPointerDown(e, i) : undefined,
      onPointerUp: physics ? onPointerUp : undefined,
      onPointerCancel: physics ? onPointerUp : undefined,
      onClick: physics ? onClick : undefined,
      onDragStart: (e) => e.preventDefault(),
    };
    if (t.link) {
      return (
        <a key={i} {...common} href={t.link}>
          {t.label}
        </a>
      );
    }
    return (
      <div key={i} {...common}>
        {t.label}
      </div>
    );
  };

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        ...style,
        position: "relative",
        overflow: "hidden",
        background,
        pointerEvents: "none",
        boxSizing: "border-box",
        height,
        minHeight: height,
      }}
      aria-label="Skills tags"
    >
      {phase === "flow" ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-end",
            justifyContent: "center",
            gap: 6,
            padding: 8,
            boxSizing: "border-box",
          }}
        >
          {list.map((_, i) => renderTag(i, false))}
        </div>
      ) : (
        list.map((_, i) => renderTag(i, true))
      )}
    </div>
  );
}
