"use strict";
(() => {
  var _e = Object.defineProperty,
    ke = (e, t, r) =>
      t in e
        ? _e(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
        : (e[t] = r),
    F = (e, t, r) => (ke(e, typeof t != "symbol" ? t + "" : t, r), r);
  function M(e, t) {
    return Math.round(e * t) / t;
  }
  function Y(e, t, r, n) {
    let o = (e + (n || "")).toString().includes("%");
    if (
      (typeof e == "string"
        ? ([e, t, r, n] = e.match(/(0?\.?\d+)%?\b/g).map((i) => Number(i)))
        : n !== void 0 && (n = Number.parseFloat(n)),
      typeof e != "number" ||
        typeof t != "number" ||
        typeof r != "number" ||
        e > 255 ||
        t > 255 ||
        r > 255)
    )
      throw new TypeError("Expected three numbers below 256");
    if (typeof n == "number") {
      if (!o && n >= 0 && n <= 1) n = Math.round(255 * n);
      else if (o && n >= 0 && n <= 100) n = Math.round((255 * n) / 100);
      else
        throw new TypeError(
          `Expected alpha value (${n}) as a fraction or percentage`
        );
      n = (n | 256).toString(16).slice(1);
    } else n = "";
    return (r | (t << 8) | (e << 16) | (1 << 24)).toString(16).slice(1) + n;
  }
  function k(e) {
    return e.filter(ee);
  }
  function ee(e) {
    return e != null;
  }
  function D(e) {
    console.warn(e);
  }
  function H(e) {
    return typeof e == "object" && e.type === "VARIABLE_ALIAS";
  }
  function De(e) {
    if ("a" in e) {
      let r = M(e.a, 100);
      if (r !== 1) return `rgba(${e.r},${e.g},${e.b},${r})`;
    }
    let t = Y(e.r, e.g, e.b);
    return t[0] === t[1] && t[2] === t[3] && t[4] === t[5]
      ? `#${t[0]}${t[2]}${t[4]}`
      : `#${t}`;
  }
  function He(e) {
    let { r: t, g: r, b: n, a: o = 1 } = e;
    return { r: M(t * 255, 1), g: M(r * 255, 1), b: M(n * 255, 1), a: o };
  }
  function C(e) {
    return `${M(e, 10)}px`;
  }
  function j(e) {
    return `${M(e, 10)}%`;
  }
  function te(e) {
    switch (typeof e) {
      case "object":
        if (H(e)) return `var(${e.id})`;
        if ("r" in e) return De(He(e));
      case "string":
      case "number":
      case "boolean":
      default:
        return String(e);
    }
  }
  function $(e) {
    return "T" + e;
  }
  function X(e, t, r) {
    let n = Object.entries(t);
    if (!n.length) return "";
    let o = [
      e + " {",
      ...n
        .filter(([, i]) => i !== void 0 && i !== "")
        .map(([i, u]) => `  ${i}: ${u};`),
      "}",
    ];
    return (
      r && (o = o.map((i) => r + i)),
      o.join(`
`)
    );
  }
  var We = { padding: "0", margin: "0" },
    ze = {
      a: { color: "inherit", "text-decoration": "inherit" },
      input: {
        border: "none",
        font: "inherit",
        outline: "none",
        "background-color": "inherit",
      },
      button: {
        "border-style": "none",
        width: "auto",
        overflow: "visible",
        background: "transparent",
        font: "inherit",
        "background-color": "inherit",
        "line-height": "normal",
        color: "inherit",
      },
      textarea: { font: "inherit", "background-color": "inherit" },
      select: { font: "inherit", "background-color": "inherit" },
      img: { display: "block" },
      picture: { display: "block" },
      video: { display: "block" },
      canvas: { display: "block" },
      svg: { display: "block" },
    },
    Yt =
      X("*", We) +
      Object.entries(ze).map(([e, t]) => X(e, t)).join(`
`),
    ne = [
      "mousedown",
      "mouseenter",
      "mouseleave",
      "mouseup",
      "timeout",
      "click",
      "press",
      "drag",
      "keydown",
      "hover",
    ];
  function re(e, t, r) {
    if (r.direction === "LEFT") {
      if (t === "BOTTOM_LEFT" || t === "TOP_LEFT")
        return [{ eltId: e, props: [{ key: "left", from: "100%", to: "0%" }] }];
      if (t === "BOTTOM_RIGHT" || t === "TOP_RIGHT")
        return [
          {
            eltId: e,
            props: [{ key: "translate", from: "100% 0px", to: "0px 0px" }],
          },
        ];
      {
        let n = t === "CENTER" ? "-50%" : "0px";
        return [
          {
            eltId: e,
            props: [
              { key: "left", from: "100%", to: "50%" },
              { key: "translate", from: `0px ${n}`, to: `-50% ${n}` },
            ],
          },
        ];
      }
    } else if (r.direction === "RIGHT") {
      if (t === "BOTTOM_LEFT" || t === "TOP_LEFT")
        return [
          {
            eltId: e,
            props: [{ key: "translate", from: "-100% 0px", to: "0px 0px" }],
          },
        ];
      if (t === "BOTTOM_RIGHT" || t === "TOP_RIGHT")
        return [
          { eltId: e, props: [{ key: "right", from: "100%", to: "0px" }] },
        ];
      {
        let n = t === "CENTER" ? "-50%" : "0px";
        return [
          {
            eltId: e,
            props: [
              { key: "left", from: "0px", to: "50%" },
              { key: "translate", from: `-100% ${n}`, to: `-50% ${n}` },
            ],
          },
        ];
      }
    } else if (r.direction === "TOP")
      if (
        t === "BOTTOM_LEFT" ||
        t === "BOTTOM_RIGHT" ||
        t === "BOTTOM_CENTER"
      ) {
        let n = t === "BOTTOM_CENTER" ? "-50%" : "0px";
        return [
          {
            eltId: e,
            props: [{ key: "translate", from: `${n} 100%`, to: `${n} 0px` }],
          },
        ];
      } else
        return t === "TOP_LEFT" || t === "TOP_RIGHT" || t === "TOP_CENTER"
          ? [{ eltId: e, props: [{ key: "top", from: "100%", to: "0px" }] }]
          : [
              {
                eltId: e,
                props: [
                  { key: "top", from: "100%", to: "50%" },
                  { key: "translate", from: "-50% 0%", to: "-50% -50%" },
                ],
              },
            ];
    else if (r.direction === "BOTTOM") {
      if (t === "BOTTOM_LEFT" || t === "BOTTOM_RIGHT" || t === "BOTTOM_CENTER")
        return [
          { eltId: e, props: [{ key: "bottom", from: "100%", to: "0px" }] },
        ];
      if (t === "TOP_LEFT" || t === "TOP_RIGHT" || t === "TOP_CENTER") {
        let n = t === "TOP_CENTER" ? "-50%" : "0px";
        return [
          {
            eltId: e,
            props: [{ key: "translate", from: `${n} -100%`, to: `${n} 0px` }],
          },
        ];
      } else
        return [
          {
            eltId: e,
            props: [
              { key: "top", from: "0px", to: "50%" },
              { key: "translate", from: "-50% -100%", to: "-50% -50%" },
            ],
          },
        ];
    } else console.warn("Unsupported transition:", r);
    return [];
  }
  function W(e) {
    if (e)
      return (...t) => {
        if (!e) return;
        let r = e;
        return (e = void 0), r(...t);
      };
  }
  var Ge = (e) => e instanceof HTMLElement || e instanceof SVGElement;
  function Ke(e, t) {
    if (!e.parentElement) return;
    let r = new MutationObserver((n) => {
      for (let o of n.filter((i) => i.type === "childList"))
        for (let i of o.removedNodes) i === e && (t?.(), r.disconnect());
    });
    r.observe(e.parentElement, { childList: !0 });
  }
  function P(e, t) {
    let r = new MutationObserver((n) => {
      for (let o of n.filter((i) => i.type === "childList"))
        for (let i of o.addedNodes) Ge(i) && i.matches(e) && Ke(i, t(i));
    });
    return (
      r.observe(document, { childList: !0, subtree: !0 }), () => r.disconnect()
    );
  }
  var oe = new Set([
    "youtube-video",
    "vimeo-video",
    "spotify-audio",
    "jwplayer-video",
    "videojs-video",
    "wistia-video",
    "cloudflare-video",
    "hls-video",
    "shaka-video",
    "dash-video",
  ]);
  function Ue(e) {
    return oe.has(e.tagName.toLowerCase()) || e.tagName === "VIDEO";
  }
  function Ye(e) {
    if (e.tagName !== "IFRAME") return !1;
    let t = e.src;
    return (
      (t.includes("youtube.com") || t.includes("youtube-nocookie.com")) &&
      t.includes("enablejsapi=1")
    );
  }
  var B = class {
    constructor(e) {
      (this.iframe = e),
        F(this, "info", {}),
        F(this, "loaded"),
        F(this, "messageListener", null),
        (this.loaded = new Promise((t) => {
          let r = () => {
            this.iframe.removeEventListener("load", r),
              setTimeout(() => {
                this.requestYoutubeListening();
              });
          };
          this.iframe.addEventListener("load", r),
            (this.messageListener = (n) => {
              if (n.source === this.iframe.contentWindow && n.data) {
                let o;
                try {
                  o = JSON.parse(n.data);
                } catch (i) {
                  console.error("YoutubeController messageListener", i);
                  return;
                }
                o.event === "onReady" &&
                  this.iframe.removeEventListener("load", r),
                  o.info && (Object.assign(this.info, o.info), t(!0));
              }
            }),
            window.addEventListener("message", this.messageListener),
            this.requestYoutubeListening();
        }));
    }
    async sendYoutubeMessage(e, t = []) {
      await this.loaded,
        this.iframe.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: e, args: t }),
          "*"
        );
    }
    requestYoutubeListening() {
      this.iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "listening" }),
        "*"
      );
    }
    get muted() {
      return this.info.muted;
    }
    get volume() {
      return this.info.volume;
    }
    set muted(e) {
      e ? this.sendYoutubeMessage("mute") : this.sendYoutubeMessage("unMute");
    }
    get currentTime() {
      return this.info.currentTime;
    }
    set currentTime(e) {
      this.sendYoutubeMessage("seekTo", [e, !0]);
    }
    get paused() {
      return this.info.playerState === 2;
    }
    play() {
      this.sendYoutubeMessage("playVideo");
    }
    pause() {
      this.sendYoutubeMessage("pauseVideo");
    }
    static from(e) {
      return e.f2w_yt_controller || (e.f2w_yt_controller = new B(e));
    }
  };
  function w(e) {
    if (Ue(e)) return e;
    if (Ye(e)) return B.from(e);
  }
  function ie(e) {
    let t = w(e);
    return t
      ? () => (
          (t.muted = !t.muted),
          () => {
            t.muted = !t.muted;
          }
        )
      : () => console.warn("Video element not recognized", e);
  }
  function se(e) {
    let t = w(e);
    return t
      ? () => (
          (t.muted = !0),
          () => {
            t.muted = !1;
          }
        )
      : () => console.warn("Video element not recognized", e);
  }
  function ae(e) {
    let t = w(e);
    return t
      ? () => (
          (t.muted = !1),
          () => {
            t.muted = !0;
          }
        )
      : () => console.warn("Video element not recognized", e);
  }
  function le(e) {
    let t = w(e);
    return t
      ? () => (t.play(), () => t.pause())
      : () => console.warn("Video element not recognized", e);
  }
  function ue(e) {
    let t = w(e);
    return t
      ? () => (t.pause(), () => t.play())
      : () => console.warn("Video element not recognized", e);
  }
  function de(e) {
    let t = w(e);
    return t
      ? () => (
          t.paused ? t.play() : t.pause(),
          () => {
            t.paused ? t.play() : t.pause();
          }
        )
      : () => console.warn("Video element not recognized", e);
  }
  function ce(e, t) {
    let r = w(e);
    return r
      ? () => {
          r.currentTime = t;
        }
      : () => console.warn("Video element not recognized", e);
  }
  function pe(e, t) {
    let r = w(e);
    return r
      ? () => (
          (r.currentTime += t),
          () => {
            r.currentTime -= t;
          }
        )
      : () => console.warn("Video element not recognized", e);
  }
  function fe(e, t) {
    let r = w(e);
    return r
      ? () => (
          (r.currentTime -= t),
          () => {
            r.currentTime += t;
          }
        )
      : () => console.warn("Video element not recognized", e);
  }
  function me() {
    let e = navigator.userAgent;
    return e.includes("Safari") && !e.includes("Chrome");
  }
  function ge(e) {
    return e === "absolute" || e === "fixed";
  }
  var je = me();
  function z(e, t, r) {
    e.animate(
      { ...t },
      { pseudoElement: r, iterations: 1, duration: 0, fill: "forwards" }
    );
  }
  function q(e) {
    return Object.fromEntries(e.map((t) => [t.camelKey, [t.from, t.to]]));
  }
  function Ee(e, t, r, n, o) {
    let i = e.parentElement,
      u = getComputedStyle(e),
      c = getComputedStyle(i).display,
      s = c.endsWith("flex") || c.endsWith("grid"),
      p = ge(u.position),
      v = t.map((l) => ({
        ...l,
        camelKey: l.key.startsWith("--")
          ? l.key
          : l.key.replace(/-([a-z])/g, (y, E) => E.toUpperCase()),
      })),
      N = {},
      h = v.filter((l) =>
        l.pseudo
          ? !1
          : l.key.startsWith("--f2w-attr-")
          ? ((N[l.key.slice(11)] = l.to), !1)
          : !0
      ),
      a = q(h),
      m = q(v.filter((l) => l.pseudo === "::before")),
      b = q(v.filter((l) => l.pseudo === "::after")),
      d = !1;
    a.display &&
      (a.display[0] === "none"
        ? (e.style.display = String(a.display[1]))
        : a.display[1] === "none" &&
          (s && !p ? (e.style.display = "none") : (d = !0)),
      delete a.display),
      je && (ye(e, a, "overflow"), ye(e, a, "rowGap", "gridRowGap"));
    let g = +getComputedStyle(e).getPropertyValue("--f2w-order");
    if (a["--f2w-order"]) {
      let l = a["--f2w-order"][1];
      (g = l === void 0 ? NaN : +l),
        isNaN(g) || e.style.setProperty("--f2w-order", String(g)),
        delete a["--f2w-order"];
    }
    if ((isNaN(g) || o.add(i), a["--f2w-img-src"])) {
      let l = e.f2w_image_lazy_loader,
        y = a["--f2w-img-src"][1];
      l ||
        ((e.f2w_image_lazy_loader = l = new Image()),
        (l.decoding = "sync"),
        (l.onload = () => {
          (e.decoding = "sync"),
            e.setAttribute("src", y),
            delete e.f2w_image_lazy_loader;
        })),
        (l.src = y),
        delete a["--f2w-img-src"];
    }
    a.$innerHTML &&
      ((e.innerHTML = String(a.$innerHTML[1])), delete a.$innerHTML);
    for (let [l, y] of Object.entries(N)) e.setAttribute(l, String(y));
    if (a.left && a.right) {
      if (a.left[1] === "revert" && a.right[0] === "revert") {
        let { right: l } = i.getBoundingClientRect(),
          { right: y } = e.getBoundingClientRect(),
          E = C(l - y);
        z(e, { left: "revert", right: E }), delete a.left, (a.right[0] = E);
      } else if (a.left[0] === "revert" && a.right[1] === "revert") {
        let { left: l } = i.getBoundingClientRect(),
          { left: y } = e.getBoundingClientRect(),
          E = C(y - l);
        z(e, { right: "revert", left: E }), delete a.right, (a.left[0] = E);
      }
    }
    if (a.top && a.bottom) {
      if (a.top[1] === "revert" && a.bottom[0] === "revert") {
        let { bottom: l } = i.getBoundingClientRect(),
          { bottom: y } = e.getBoundingClientRect(),
          E = C(l - y);
        z(e, { top: "revert", bottom: E }), delete a.top, (a.bottom[0] = E);
      } else if (a.top[0] === "revert" && a.bottom[1] === "revert") {
        let { top: l } = i.getBoundingClientRect(),
          { top: y } = e.getBoundingClientRect(),
          E = C(y - l);
        z(e, { bottom: "revert", top: E }), delete a.bottom, (a.top[0] = E);
      }
    }
    a.backgroundImage &&
      h
        .filter((l) => l.key.startsWith("background-"))
        .forEach((l) => {
          e.style.setProperty(l.key, String(l.to)), delete a[l.camelKey];
        });
    for (let [l, y] of [
      ["before", m],
      ["after", b],
    ])
      y.display &&
        (y.display[1] === "none"
          ? (e.classList.remove(l + "-visible"), e.classList.add(l + "-hidden"))
          : (e.classList.remove(l + "-hidden"),
            e.classList.add(l + "-visible")));
    let f = (l, y) => {
        if (Object.keys(l).length)
          return e.animate(
            { easing: r, ...l },
            { pseudoElement: y, iterations: 1, duration: n, fill: "both" }
          );
      },
      x = f(a);
    d &&
      x?.finished.then(() => {
        e.style.display = "none";
      }),
      f(m, "::before"),
      f(b, "::after");
  }
  var ye = (e, t, ...r) => {
      let n = r.find((o) => o in t);
      !n || ((e.style[r[0]] = String(t[n][1])), delete t[n]);
    },
    Re = () => window.F2W_REACTIONS,
    K = () => window.F2W_VARIABLES,
    Xe = () => window.F2W_COLLECTION_MODE_BPS,
    we = (e) => window.F2W_COLLECTION_VARS?.[e] ?? {},
    qe = (e, t) => we(e)[t];
  function Se(e, t) {
    K()[e] = t;
    let r = te(t);
    document.body.style.setProperty(e, r);
    let n = `data${e.slice(1)}`;
    document.body.hasAttribute(n) && document.body.setAttribute(n, r),
      document.dispatchEvent(
        new CustomEvent("f2w-set-variable", {
          detail: { id: e, value: t, str: r },
        })
      );
  }
  function U(e, t) {
    document.body.setAttribute(`data-${e}`, t);
    let r = qe(e, t) ?? {};
    for (let [n, o] of Object.entries(r)) Se(n, o);
  }
  function Ze(e, t) {
    U(e, t),
      window.F2W_COLOR_SCHEMES?.includes(e)
        ? localStorage?.setItem(Pe, t)
        : window.F2W_LANGUAGES?.includes(e) && localStorage?.setItem(Oe, t);
  }
  function T(e) {
    return typeof e == "number"
      ? e
      : typeof e == "boolean"
      ? e
        ? 1
        : 0
      : typeof e == "string"
      ? parseFloat(e)
      : 0;
  }
  function L(e) {
    return String(e);
  }
  function A(e) {
    return typeof e == "string" ? e === "true" : !!e;
  }
  function _(e, t) {
    if (e === void 0) return !1;
    if (H(e)) return _(K()[e.id]);
    if (typeof e == "object" && "expressionArguments" in e) {
      let r = e.expressionArguments
          .map((o) => o.value)
          .filter((o) => o !== void 0)
          .map((o) => _(o, t)),
        n = e.expressionArguments[0]?.resolvedType ?? "STRING";
      switch (e.expressionFunction) {
        case "ADDITION":
          return n === "FLOAT"
            ? r.map(T).reduce((o, i) => o + i)
            : r.map(L).reduce((o, i) => o + i);
        case "SUBTRACTION":
          if (r.length !== 2) throw new Error("Invalid expression");
          return T(r[0]) - T(r[1]);
        case "DIVISION":
          if (r.length !== 2) throw new Error("Invalid expression");
          return T(r[0]) / T(r[1]);
        case "MULTIPLICATION":
          return r.map(T).reduce((o, i) => o * i);
        case "NEGATE":
          if (r.length !== 1) throw new Error("Invalid expression");
          return -T(r[0]);
        case "GREATER_THAN":
          if (r.length !== 2) throw new Error("Invalid expression");
          return T(r[0]) > T(r[1]);
        case "GREATER_THAN_OR_EQUAL":
          if (r.length !== 2) throw new Error("Invalid expression");
          return T(r[0]) >= T(r[1]);
        case "LESS_THAN":
          if (r.length !== 2) throw new Error("Invalid expression");
          return T(r[0]) < T(r[1]);
        case "LESS_THAN_OR_EQUAL":
          if (r.length !== 2) throw new Error("Invalid expression");
          return T(r[0]) <= T(r[1]);
        case "EQUALS":
          if (r.length !== 2) throw new Error("Invalid expression");
          return n === "FLOAT"
            ? T(r[0]) === T(r[1])
            : n === "BOOLEAN"
            ? A(r[0]) === A(r[1])
            : L(r[0]) === L(r[1]);
        case "NOT_EQUAL":
          if (r.length !== 2) throw new Error("Invalid expression");
          return n === "FLOAT"
            ? T(r[0]) !== T(r[1])
            : n === "BOOLEAN"
            ? A(r[0]) !== A(r[1])
            : L(r[0]) !== L(r[1]);
        case "AND":
          if (r.length !== 2) throw new Error("Invalid expression");
          return A(r[0]) && A(r[1]);
        case "OR":
          if (r.length !== 2) throw new Error("Invalid expression");
          return A(r[0]) || A(r[1]);
        case "NOT":
          if (r.length !== 1) throw new Error("Invalid expression");
          return !A(r[0]);
        case "VAR_MODE_LOOKUP":
        default:
          return (
            console.warn(
              `Expression not implemented yet: ${e.expressionFunction}`
            ),
            !1
          );
      }
    } else return e;
  }
  function Q(e, t, r) {
    let n = e.map((o) => Qe(o, t, r));
    return (o, i) => {
      let u = n.map((c) => c(o, i)).filter((c) => !!c);
      if (u.length) return (c, s) => u.forEach((p) => p(c, s));
    };
  }
  function Qe(e, t, r) {
    for (; e.type === "ALIAS"; ) e = Re()[e.alias];
    let n = Je(e, t, r);
    return (o) => {
      if (e.type !== "ANIMATE" && r === "drag") {
        let i = o.detail;
        if (!i.handled) return (i.handled = !0), n(o);
      }
      if (!V) {
        if (e.type === "ANIMATE" && e.rootId) {
          let i = document.getElementById(e.rootId);
          if (i?.parentElement) {
            let u = W(n(o));
            if (u) {
              let c = i?.parentElement;
              for (
                ;
                c &&
                ((c.f2w_reset || (c.f2w_reset = [])).push(u),
                (c = c.parentElement),
                c?.tagName !== "BODY");

              );
            }
            return u;
          }
        }
        return n(o);
      }
    };
  }
  function Je(action, bound, trigger) {
    switch (action.type) {
      case "BACK":
        return () => (window.F2W_PREVIEW_BACK ?? history.back)();
      case "JS":
        return () => eval(action.code);
      case "URL":
        return () => {
          action.openInNewTab
            ? window.open(action.url, "_blank")
            : window.F2W_PREVIEW_NAVIGATE
            ? window.F2W_PREVIEW_NAVIGATE(action.url)
            : location.assign(action.url);
        };
      case "SET_VARIABLE":
        let { variableId, variableValue } = action;
        if (variableId && variableValue?.value !== void 0)
          return () => Se(variableId, _(variableValue.value, variableId));
        break;
      case "SET_VARIABLE_MODE":
        let { variableCollectionName, variableModeName } = action;
        if (variableCollectionName && variableModeName)
          return () => Ze(variableCollectionName, variableModeName);
        break;
      case "CONDITIONAL":
        let blocks = action.conditionalBlocks.map((e) => {
          let t = Q(e.actions, bound, trigger),
            { condition: r } = e;
          return { test: r ? () => A(_(r.value)) : () => !0, run: t };
        });
        return () => {
          let e = [];
          for (let t of blocks)
            if (t.test()) {
              let r = t.run();
              r && e.push(r);
              break;
            }
          if (e.length) return (t) => e.forEach((r) => r(t));
        };
      case "KEY_CONDITION":
        let run = Q(action.actions, bound, trigger),
          keyCode = action.keyCodes[0],
          shiftKey = action.keyCodes.slice(1).includes(16),
          ctrlKey = action.keyCodes.slice(1).includes(17),
          altKey = action.keyCodes.slice(1).includes(18),
          metaKey = action.keyCodes.slice(1).includes(91);
        return (e) => {
          if (e instanceof KeyboardEvent) {
            if (
              e.keyCode !== keyCode ||
              e.ctrlKey !== ctrlKey ||
              e.altKey !== altKey ||
              e.metaKey !== metaKey ||
              e.shiftKey !== shiftKey
            )
              return;
            e.preventDefault(), e.stopPropagation(), run(e);
          }
        };
      case "CLOSE_OVERLAY": {
        if (action.self) return (e) => e?.target?.f2w_close?.();
        if (action.overlayId) {
          let e = document.getElementById(action.overlayId);
          if (!e) break;
          return () => e.f2w_close?.();
        }
        break;
      }
      case "SCROLL_TO":
        if (!action.destinationId) break;
        let elt = document.getElementById(action.destinationId);
        if (!elt) break;
        return (e) => {
          e?.currentTarget instanceof HTMLAnchorElement && e?.preventDefault(),
            elt.scrollIntoView({
              behavior: action.transition?.type ? "smooth" : "instant",
            });
        };
      case "OVERLAY":
        if (!action.destinationId) break;
        let overlay = document.getElementById(action.destinationId);
        if (!overlay) break;
        let modal = Array(...overlay.children).find(
          (e) => e.tagName !== "TEMPLATE"
        );
        if (!modal) break;
        let { transition, overlayPositionType, overlayRelativePosition } =
            action,
          duration = Math.round(1e3 * (transition?.duration ?? 0)),
          animations = [
            {
              eltId: action.destinationId,
              props: [
                { key: "visibility", from: "hidden", to: "visible" },
                { key: "opacity", from: "0", to: "1" },
              ],
            },
          ];
        return overlayPositionType === "MANUAL"
          ? () => {
              if (trigger === "hover") {
                let n = bound.f2w_mouseleave_remove?.();
                if (n) {
                  let o = (i) => {
                    be(i, bound) &&
                      be(i, modal) &&
                      (n(), document.removeEventListener("mousemove", o));
                  };
                  document.addEventListener("mousemove", o);
                }
              }
              let e = animations.slice(0),
                t = C(
                  bound.getBoundingClientRect().left +
                    (overlayRelativePosition?.x ?? 0)
                ),
                r = C(
                  bound.getBoundingClientRect().top +
                    (overlayRelativePosition?.y ?? 0)
                );
              return (
                modal.style.setProperty("left", t),
                modal.style.setProperty("top", r),
                transition?.type === "MOVE_IN" &&
                  (transition.direction === "LEFT"
                    ? e.push({
                        eltId: modal.id,
                        props: [{ key: "left", from: "100%", to: t }],
                      })
                    : transition.direction === "RIGHT"
                    ? e.push({
                        eltId: modal.id,
                        props: [
                          { key: "left", from: "0px", to: t },
                          {
                            key: "translate",
                            from: "-100% 0px",
                            to: "0px 0px",
                          },
                        ],
                      })
                    : transition.direction === "TOP"
                    ? e.push({
                        eltId: modal.id,
                        props: [{ key: "top", from: "100%", to: r }],
                      })
                    : transition.direction === "BOTTOM" &&
                      e.push({
                        eltId: modal.id,
                        props: [
                          { key: "top", from: "0px", to: r },
                          {
                            key: "translate",
                            from: "0px -100%",
                            to: "0px 0px",
                          },
                        ],
                      })),
                Z(
                  e,
                  transition?.easing,
                  duration,
                  bound,
                  trigger,
                  `${trigger}(manual_overlay)`,
                  overlay
                )()
              );
            }
          : (transition?.type === "MOVE_IN"
              ? animations.push(
                  ...re(modal.id, overlayPositionType, transition)
                )
              : transition?.type &&
                console.warn("Unsupported transition:", transition),
            Z(
              animations,
              transition?.easing,
              duration,
              bound,
              trigger,
              `${trigger}(overlay)`,
              overlay
            ));
      case "ANIMATE": {
        let { animations: e, transition: t, rootId: r, reset: n } = action,
          o = Math.round(1e3 * (t?.duration ?? 0)),
          i = Z(
            e,
            t?.easing,
            o,
            bound,
            trigger,
            n ? `${trigger}(+reset)` : trigger
          );
        return n && r
          ? (u, c) => {
              let s = document.getElementById(r);
              if (s) {
                let { f2w_reset: p } = s;
                p?.length &&
                  (delete s.f2w_reset,
                  p.reverse().forEach((v) => v(void 0, !0)));
              }
              return i(u, c);
            }
          : i;
      }
      case "UPDATE_MEDIA_RUNTIME": {
        if (!action.destinationId) break;
        let e = document.getElementById(action.destinationId);
        if (!e) break;
        switch (action.mediaAction) {
          case "MUTE":
            return se(e);
          case "UNMUTE":
            return ae(e);
          case "TOGGLE_MUTE_UNMUTE":
            return ie(e);
          case "PLAY":
            return le(e);
          case "PAUSE":
            return ue(e);
          case "TOGGLE_PLAY_PAUSE":
            return de(e);
          case "SKIP_BACKWARD":
            return fe(e, action.amountToSkip);
          case "SKIP_FORWARD":
            return pe(e, action.amountToSkip);
          case "SKIP_TO":
            return ce(e, action.newTimestamp);
        }
      }
      default:
        return () => console.warn("Action not implemented yet: " + action.type);
    }
    return () => {};
  }
  var xe = 9999;
  function Z(e, t = "linear", r, n, o, i, u) {
    return (c) => {
      let s = e;
      u &&
        ((document.body.parentElement.style.overflow = "hidden"),
        (s = [
          { eltId: u.id, props: [{ key: "z-index", from: 0, to: xe++ }] },
          ...s,
        ]));
      let p = O(s, t, r, n, o, i, c),
        v = W((N, h) => {
          u && (xe--, (document.body.parentElement.style.overflow = "")),
            O(p, t, h ? 0 : r, n, o, `${i}(revert)`);
        });
      return u && (u.f2w_close = v), v;
    };
  }
  var he = new Map();
  function O(e, t, r, n, o, i, u) {
    let c = [],
      s = new Set();
    if (o === "drag") return et(e, t, r, n, u.detail), [];
    for (let { eltId: p, altId: v, props: N, reactions: h } of e) {
      let a = document.getElementById(p);
      if (!a) {
        let m = he.get(p);
        m && (a = document.getElementById(m));
      }
      if (!a) {
        D(`Can't find element for id: ${p}`);
        continue;
      }
      if (v) {
        let m = document.getElementById(v);
        if (!m) {
          let f = document.getElementById($(v));
          if (!f) {
            D(`Can't find template for id: ${v}`);
            continue;
          }
          m = f.content?.cloneNode(!0).querySelector("*");
        }
        Ve(m, !0, r);
        let { f2w_mouseup: b, f2w_mouseleave: d } = a;
        b && m.addEventListener("mouseup", b),
          d && m.addEventListener("mouseleave", d),
          (d || b) && Me(m),
          a.parentElement.replaceChild(m, a);
        let g = document.getElementById($(p));
        g ||
          ((g = document.createElement("template")),
          (g.id = $(p)),
          (g.innerHTML = a.outerHTML),
          m.insertAdjacentElement("afterend", g)),
          he.set(p, m.id),
          c.push({ eltId: m.id, altId: a.id }),
          isNaN(+getComputedStyle(m).getPropertyValue("--f2w-order")) ||
            s.add(m.parentElement);
      } else {
        let m = (N || [])
          .map((d) => {
            let g = Te(a, d.key, d.from),
              f = Te(a, d.key, d.to);
            return { key: d.key, pseudo: d.pseudo, from: g, to: f };
          })
          .filter((d) => d.from !== d.to);
        Ee(a, m, t, r, s),
          h &&
            (o !== "hover" && a.f2w_mouseleave_remove?.(),
            h.forEach((d) => Ie(a, d.type, d.to, r)));
        let b = {
          eltId: p,
          props: m.map((d) => {
            let g = { key: d.key, from: d.to, to: d.from };
            return d.pseudo && (g.pseudo = d.pseudo), g;
          }),
        };
        h &&
          (b.reactions = h.map((d) => ({
            type: d.type,
            from: d.to,
            to: d.from,
          }))),
          c.push(b);
      }
    }
    for (let p of s) {
      let v = Array.from(p.children).map((h, a) => ({ it: h, i: a })),
        N = !1;
      v.sort((h, a) => {
        let m = +(
            getComputedStyle(h.it).getPropertyValue("--f2w-order") || "99999"
          ),
          b = +(
            getComputedStyle(a.it).getPropertyValue("--f2w-order") || "99999"
          );
        return m - b;
      }).forEach((h, a) => {
        N ? p.appendChild(h.it) : (N = a !== h.i);
      });
    }
    return c;
  }
  function Me(e) {
    let t = e;
    for (; t; )
      t.classList.remove("pointer-events-none"), (t = t.parentElement);
  }
  function et(e, t, r, n, o) {
    if (o.handled) return;
    let i = n.getBoundingClientRect(),
      u = O(
        e
          .filter((a) => a.props)
          .map(({ eltId: a, props: m }) => ({ eltId: a, props: m })),
        "linear",
        0,
        n,
        "click",
        "drag_start(tmp)"
      ),
      c = n.getBoundingClientRect(),
      s = c.left - i.left,
      p = c.top - i.top,
      v = Math.sqrt(s * s + p * p);
    O(u, "linear", 0, n, "click", "drag_start(tmp undo)");
    let { x: N, y: h } = J(o.start, o.end);
    if (
      (N > 0 && s > 0) ||
      (N < 0 && s < 0) ||
      (s === 0 && ((h > 0 && p > 0) || (h < 0 && p < 0)))
    ) {
      o.handled = !0;
      let a = e.map((d) => ({
          ...d,
          swapped: !1,
          props: d.props?.map((g) => ({ ...g, curr: g.from })),
        })),
        m = (d) => {
          let { x: g, y: f } = J(d.start, d.end),
            x = (g * s + f * p) / v;
          return Math.max(0, Math.min(100, (100 * x) / v));
        },
        b = (d) => {
          d.end.preventDefault(), d.end.stopPropagation();
          let g = m(d);
          O(
            k(
              a.map((f) => {
                let { reactions: x, ...l } = f;
                if (f.props)
                  return {
                    ...l,
                    props: f.props.map((y) => {
                      let E = it(y, g),
                        S = y.curr;
                      return (y.curr = E), { ...y, from: S, to: E };
                    }),
                  };
                if (f.altId) {
                  if (g < 50 && f.swapped)
                    return (f.swapped = !1), { altId: f.eltId, eltId: f.altId };
                  if (g >= 50 && !f.swapped) return (f.swapped = !0), l;
                }
              })
            ),
            "linear",
            0,
            n,
            "click",
            "dragging"
          );
        };
      b(o),
        (n.f2w_drag_listener = (d) => {
          if ((b(d), d.finished)) {
            let g = m(d);
            O(
              k(
                a.map((f) => {
                  if (f.props) {
                    let x = g < 50 ? void 0 : f.reactions;
                    return {
                      eltId: f.eltId,
                      props: f.props.map((l) => ({
                        ...l,
                        from: l.curr,
                        to: g < 50 ? l.from : l.to,
                      })),
                      reactions: x,
                    };
                  }
                  if (f.altId) {
                    if (g < 50 && f.swapped)
                      return (
                        (f.swapped = !1), { altId: f.eltId, eltId: f.altId }
                      );
                    if (g >= 50 && !f.swapped) return (f.swapped = !0), f;
                  }
                })
              ),
              t,
              r,
              n,
              "click",
              "drag_end"
            );
          }
        });
    }
  }
  function Te(e, t, r) {
    return r !== "$current" ? r : getComputedStyle(e).getPropertyValue(t);
  }
  function Ve(e, t = !1, r = 0) {
    for (let n of ne)
      for (let o of tt(e, `[data-reaction-${n}]`, t))
        Ie(o, n, o.getAttribute(`data-reaction-${n}`), r);
  }
  function tt(e, t, r = !1) {
    let n = [...e.querySelectorAll(t)];
    return r && e.matches(t) && n.unshift(e), n;
  }
  function Ie(e, t, r = "", n = 0) {
    if (!r && t !== "hover") {
      rt(e, t);
      return;
    }
    let o = 0;
    if (r[0] === "T") {
      let s = r.indexOf("ms");
      (o = parseFloat(r.slice(1, s)) || 0), (r = r.slice(s + 3));
    }
    let i = Re(),
      u = k(r.split(",").map((s) => i[s])),
      c = Q(u, e, t);
    if (t === "timeout") {
      nt(e, () => c(), o + n);
      return;
    }
    if ((Me(e), t === "press")) {
      let s,
        p = () => {
          s?.(), (s = void 0);
        };
      (e.f2w_mouseup = p),
        G(
          e,
          "mousedown",
          (v) => {
            s?.(), (s = c(v));
          },
          t,
          I(e, "mouseup", p)
        );
    } else if (t === "drag")
      G(
        e,
        "dragging",
        (s) => {
          c(s);
        },
        t
      );
    else if (t === "hover") {
      let s,
        p = (b) => {
          s || (s = W(c(b)));
        },
        v = e.f2w_mouseleave_remove?.(),
        N = () => {
          s?.(), (s = void 0), v?.();
        },
        h = setTimeout(() => {
          e.matches(":hover") && p();
        }, n),
        a = I(e, "mouseleave", N),
        m = () => (
          a(),
          clearTimeout(h),
          delete e.f2w_mouseleave,
          delete e.f2w_mouseleave_remove,
          N
        );
      G(e, "mouseenter", p, t, m),
        (e.f2w_mouseleave = N),
        (e.f2w_mouseleave_remove = m);
    } else
      t === "keydown" &&
        !e.getAttribute("tabindex") &&
        e.setAttribute("tabindex", "-1"),
        G(
          e,
          t,
          (s) => {
            t !== "keydown" && s.stopPropagation(),
              o ? setTimeout(() => c(s), o) : c(s);
          },
          t
        );
  }
  function be({ clientX: e, clientY: t }, r) {
    let { top: n, left: o, right: i, bottom: u } = r.getBoundingClientRect();
    return e > i + 2 || e < o - 2 || t > u + 2 || t < n - 2;
  }
  function Le(e) {
    return `f2w_cleanup_${e}`;
  }
  function nt(e, t, r) {
    let n = setTimeout(t, r);
    e.f2w_cleanup_timeout?.(),
      (e.f2w_cleanup_timeout = () => {
        delete e.f2w_cleanup_timeout, clearTimeout(n);
      });
  }
  function rt(e, t) {
    let r = Le(t);
    e[r]?.();
  }
  function G(e, t, r, n, ...o) {
    let i = [...o, I(e, t, r)],
      u = Le(n);
    e[u]?.(),
      (e[u] = () => {
        delete e[u], i.forEach((c) => c());
      });
  }
  function I(e, t, r, n) {
    let o = (i) => {
      !e.isConnected || r(i);
    };
    return (
      e.addEventListener(t, o, n),
      () => {
        e.removeEventListener(t, o, n);
      }
    );
  }
  var Pe = "f2w-color-scheme",
    Oe = "f2w-lang";
  if (
    ((window.F2W_THEME_SWITCH = (e) =>
      window.F2W_COLOR_SCHEMES?.forEach((t) => U(t, e))),
    window.F2W_COLOR_SCHEMES)
  ) {
    let e = matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
      t = localStorage?.getItem(Pe);
    P("body", () => {
      let r = document.body.getAttribute("data-preview-theme") ?? t ?? e;
      window.F2W_THEME_SWITCH?.(r);
    });
  }
  if (window.F2W_LANGUAGES) {
    let e = localStorage?.getItem(Oe);
    P("body", () => {
      window.F2W_LANGUAGES?.forEach((t) => {
        let r = Object.fromEntries(
            Object.entries(we(t)).map(([o]) => [o.toLowerCase(), o])
          ),
          n = [...navigator.languages];
        e && n.unshift(e);
        for (let o of n) {
          o = o.toLowerCase();
          let i = o.split("-")[0],
            u = r[o] ?? r[i];
          if (u) {
            U(t, u);
            break;
          }
        }
      });
    });
  }
  var ve = {},
    ot = Object.fromEntries(
      Object.entries(Xe()).map(([e, t]) => [
        e,
        Object.entries(t).map(([r, { minWidth: n }]) => ({
          name: r,
          minWidth: n,
        })),
      ])
    );
  function Ne() {
    let e = window.visualViewport?.width || window.innerWidth;
    for (let [t, r] of Object.entries(ot)) {
      let n = [...r],
        o = n.splice(0, 1)[0].name;
      for (let { name: i, minWidth: u } of n) e >= u && (o = i);
      o !== ve[t] && (U(t, o), (ve[t] = o));
    }
  }
  var V = !1;
  P("body", () => {
    let e,
      t = !1;
    I(document, "mousedown", (r) => {
      (e = r), (V = !1);
    }),
      I(document, "mousemove", (r) => {
        if (e && J(e, r).dist > 2) {
          let n = { start: e, end: r };
          V
            ? e.target?.f2w_drag_listener?.(n)
            : (e.target?.dispatchEvent(
                new CustomEvent("dragging", { detail: n })
              ),
              (V = !0),
              (t = !0));
        }
      }),
      I(document, "mouseup", (r) => {
        e &&
          V &&
          e.target?.f2w_drag_listener?.({ start: e, end: r, finished: !0 }),
          (e = void 0),
          (V = !1);
      }),
      I(document, "mouseup", (r) => {
        e &&
          V &&
          e.target?.f2w_drag_listener?.({ start: e, end: r, finished: !0 }),
          (e = void 0),
          (V = !1);
      }),
      I(
        document,
        "click",
        (r) => {
          t && ((t = !1), r.preventDefault(), r.stopPropagation());
        },
        { capture: !0 }
      ),
      Ne(),
      window.addEventListener("resize", Ne);
  }),
    addEventListener("DOMContentLoaded", () => Ve(document)),
    addEventListener("DOMContentLoaded", () => {
      if ("mediumZoom" in window) {
        let e = mediumZoom("[data-zoomable]");
        e.on("open", (t) => {
          let r = getComputedStyle(t.target).objectFit,
            n = t.detail.zoom.getZoomedImage();
          r && n && (n.style.objectFit = r);
        }),
          e.on("closed", (t) => {
            let r = t.detail.zoom.getZoomedImage();
            r.style.objectFit = "";
          });
      }
    });
  function Ce(e) {
    return e.endsWith("px") || e.endsWith("%") || e.startsWith("calc");
  }
  function Ae(e) {
    return e.startsWith("calc") ? e.slice(4) : e;
  }
  function it({ from: e, to: t }, r) {
    if (e === t) return t;
    if (typeof e == "number" && typeof t == "number")
      return e + (t - e) * (r / 100);
    if (typeof e == "string" && typeof t == "string") {
      if (e === "none" || t === "none" || e === "auto" || t === "auto")
        return r < 50 ? e : t;
      if (e.endsWith("px") && t.endsWith("px")) {
        let n = parseFloat(e),
          o = parseFloat(t);
        return C(n + (o - n) * (r / 100));
      }
      if (e.endsWith("%") && t.endsWith("%")) {
        let n = parseFloat(e),
          o = parseFloat(t);
        return j(n + (o - n) * (r / 100));
      }
      if (Ce(e) && Ce(t)) {
        let n = Ae(e),
          o = Ae(t);
        return `calc(${n} + (${o} - ${n}) * ${r / 100})`;
      }
      if (e.startsWith("rgb") && t.startsWith("rgb")) {
        let n = e.match(/\d+/g).map(Number),
          o = t.match(/\d+/g).map(Number);
        return `rgb(${n.map((i, u) => i + (o[u] - i) * (r / 100)).join(",")})`;
      }
    }
    return r < 50 ? e : t;
  }
  function J(e, t) {
    let r = t.clientX - e.clientX,
      n = t.clientY - e.clientY;
    return { x: r, y: n, dist: Math.sqrt(Math.pow(r, 2) + Math.pow(n, 2)) };
  }
  P("[data-bound-characters]", (e) => {
    let t = () => {
      let r = e.getAttribute("data-bound-characters"),
        n = L(_(K()[r]));
      n !== e.textContent && (e.textContent = n);
    };
    return (
      t(),
      document.addEventListener("f2w-set-variable", t),
      () => document.removeEventListener("f2w-set-variable", t)
    );
  }),
    P("[data-bound-visible]", (e) => {
      let t = () => {
        let r = e.getAttribute("data-bound-visible"),
          n = L(_(K()[r]));
        n !== void 0 && e.setAttribute("data-visible", n);
      };
      return (
        t(),
        document.addEventListener("f2w-set-variable", t),
        () => document.removeEventListener("f2w-set-variable", t)
      );
    });
})();
