import {
  c as Je,
  g as I,
  p as E,
  D as _i,
  r as se,
  $ as Wa,
  R as Ia,
  n as Sn,
  O as Hr,
  w as ze,
  o as Xr,
  k as Ht,
  t as Dt,
  U as Ki,
  X as Xi,
  a0 as Jf,
  L as zi,
  A as Db,
  u as Wu,
  a1 as Yu,
  b as Hu,
  a2 as $a,
  e as oo,
  a3 as Ph,
  h as Gu,
  a4 as Ah,
  W as Mo,
  a5 as Ya,
  s as Mt,
  V as Ft,
  a as ir,
  a6 as qb,
  d as ar,
  a7 as xb,
  q as Ku,
  a8 as Wt,
  a9 as Pb,
  aa as Qu,
  M as Eh,
  ab as ju,
  ac as Zu,
  ad as ia,
  ae as aa,
  af as Ab,
  ag as Eb,
  ah as Ih,
  ai as Do,
  aj as $h,
  ak as Rh,
  al as Oh,
  T as Du,
  am as Lh,
  an as Xf,
  ao as Ib,
  ap as $b,
  aq as Nh,
  ar as Rb,
  as as Bh,
  at as so,
  au as Ob,
  av as ye,
  S as gi,
  aw as Lb,
  ax as Nb,
  ay as Ju,
  i as uo,
  f as Sr,
  l as Bb,
  y as Fb,
  K as Fh,
  az as Ub,
  aA as Vb,
  aB as zb,
  E as sn,
  aC as Uh,
  m as Hn,
  aD as Vh,
  aE as Wi,
  x as zh,
  aF as Xu,
  aG as Wh,
  aH as Yh,
  aI as Hh,
  aJ as Wb,
  aK as Yb,
  aL as eh,
  aM as Hb,
  aN as Gb,
  aO as Kb,
  aP as co,
  N as Qb,
  Q as uu,
  aQ as jb,
  _ as Tn,
  G as R,
  aR as re,
  J as y,
  I as b,
  aS as jr,
  aT as S,
  aU as ge,
  aV as Te,
  aW as Lt,
  F as Jr,
  H as oe,
  aX as Ne,
  aY as ut,
  aZ as $e,
  a_ as It,
  a$ as ro,
  b0 as qu,
  b1 as Yt,
  b2 as Jt,
  b3 as cu,
  b4 as Ra,
  b5 as Zb,
  b6 as Jb,
  b7 as yi,
  b8 as Xb,
  b9 as jl,
  Y as du,
  ba as th,
  bb as Gh,
  bc as ew,
  bd as tw,
  be as nw,
  bf as nh,
  bg as rw,
  bh as iw,
  bi as aw,
  bj as lw,
} from "./index.d0f96b53.js";
import {
  c as fo,
  a as xu,
  n as rh,
  g as ih,
  s as ah,
  b as Zl,
  Q as ow,
  T as lh,
} from "./QResizeObserver.b8a0e5fe.js";
const sw = ["top", "middle", "bottom"];
var Cn = Je({
  name: "QBadge",
  props: {
    color: String,
    textColor: String,
    floating: Boolean,
    transparent: Boolean,
    multiLine: Boolean,
    outline: Boolean,
    rounded: Boolean,
    label: [Number, String],
    align: { type: String, validator: (e) => sw.includes(e) },
  },
  setup(e, { slots: t }) {
    const r = I(() => (e.align !== void 0 ? { verticalAlign: e.align } : null)),
      a = I(() => {
        const l = (e.outline === !0 && e.color) || e.textColor;
        return (
          `q-badge flex inline items-center no-wrap q-badge--${
            e.multiLine === !0 ? "multi" : "single"
          }-line` +
          (e.outline === !0
            ? " q-badge--outline"
            : e.color !== void 0
            ? ` bg-${e.color}`
            : "") +
          (l !== void 0 ? ` text-${l}` : "") +
          (e.floating === !0 ? " q-badge--floating" : "") +
          (e.rounded === !0 ? " q-badge--rounded" : "") +
          (e.transparent === !0 ? " q-badge--transparent" : "")
        );
      });
    return () =>
      E(
        "div",
        {
          class: a.value,
          style: r.value,
          role: "status",
          "aria-label": e.label,
        },
        _i(t.default, e.label !== void 0 ? [e.label] : [])
      );
  },
});
const Kh = {
  target: { default: !0 },
  noParentEvent: Boolean,
  contextMenu: Boolean,
};
function Qh({ showing: e, avoidEmit: t, configureAnchorEl: r }) {
  const { props: a, proxy: l, emit: s } = Dt(),
    u = se(null);
  let d = null;
  function f(_) {
    return u.value === null
      ? !1
      : _ === void 0 || _.touches === void 0 || _.touches.length <= 1;
  }
  const g = {};
  r === void 0 &&
    (Object.assign(g, {
      hide(_) {
        l.hide(_);
      },
      toggle(_) {
        l.toggle(_), (_.qAnchorHandled = !0);
      },
      toggleKey(_) {
        Wa(_, 13) === !0 && g.toggle(_);
      },
      contextClick(_) {
        l.hide(_),
          Ia(_),
          Sn(() => {
            l.show(_), (_.qAnchorHandled = !0);
          });
      },
      prevent: Ia,
      mobileTouch(_) {
        if ((g.mobileCleanup(_), f(_) !== !0)) return;
        l.hide(_), u.value.classList.add("non-selectable");
        const P = _.target;
        Hr(g, "anchor", [
          [P, "touchmove", "mobileCleanup", "passive"],
          [P, "touchend", "mobileCleanup", "passive"],
          [P, "touchcancel", "mobileCleanup", "passive"],
          [u.value, "contextmenu", "prevent", "notPassive"],
        ]),
          (d = setTimeout(() => {
            (d = null), l.show(_), (_.qAnchorHandled = !0);
          }, 300));
      },
      mobileCleanup(_) {
        u.value.classList.remove("non-selectable"),
          d !== null && (clearTimeout(d), (d = null)),
          e.value === !0 && _ !== void 0 && fo();
      },
    }),
    (r = function (_ = a.contextMenu) {
      if (a.noParentEvent === !0 || u.value === null) return;
      let P;
      _ === !0
        ? l.$q.platform.is.mobile === !0
          ? (P = [[u.value, "touchstart", "mobileTouch", "passive"]])
          : (P = [
              [u.value, "mousedown", "hide", "passive"],
              [u.value, "contextmenu", "contextClick", "notPassive"],
            ])
        : (P = [
            [u.value, "click", "toggle", "passive"],
            [u.value, "keyup", "toggleKey", "passive"],
          ]),
        Hr(g, "anchor", P);
    }));
  function v() {
    Ki(g, "anchor");
  }
  function T(_) {
    for (u.value = _; u.value.classList.contains("q-anchor--skip"); )
      u.value = u.value.parentNode;
    r();
  }
  function M() {
    if (a.target === !1 || a.target === "" || l.$el.parentNode === null)
      u.value = null;
    else if (a.target === !0) T(l.$el.parentNode);
    else {
      let _ = a.target;
      if (typeof a.target == "string")
        try {
          _ = document.querySelector(a.target);
        } catch {
          _ = void 0;
        }
      _ != null
        ? ((u.value = _.$el || _), r())
        : ((u.value = null),
          console.error(`Anchor: target "${a.target}" not found`));
    }
  }
  return (
    ze(
      () => a.contextMenu,
      (_) => {
        u.value !== null && (v(), r(_));
      }
    ),
    ze(
      () => a.target,
      () => {
        u.value !== null && v(), M();
      }
    ),
    ze(
      () => a.noParentEvent,
      (_) => {
        u.value !== null && (_ === !0 ? v() : r());
      }
    ),
    Xr(() => {
      M(),
        t !== !0 &&
          a.modelValue === !0 &&
          u.value === null &&
          s("update:modelValue", !1);
    }),
    Ht(() => {
      d !== null && clearTimeout(d), v();
    }),
    { anchorEl: u, canShow: f, anchorEvents: g }
  );
}
function jh(e, t) {
  const r = se(null);
  let a;
  function l(d, f) {
    const g = `${f !== void 0 ? "add" : "remove"}EventListener`,
      v = f !== void 0 ? f : a;
    d !== window && d[g]("scroll", v, Xi.passive),
      window[g]("scroll", v, Xi.passive),
      (a = f);
  }
  function s() {
    r.value !== null && (l(r.value), (r.value = null));
  }
  const u = ze(
    () => e.noParentEvent,
    () => {
      r.value !== null && (s(), t());
    }
  );
  return (
    Ht(u),
    { localScrollTarget: r, unconfigureScrollTarget: s, changeScrollEvent: l }
  );
}
const { notPassiveCapture: ho } = Xi,
  vi = [];
function go(e) {
  const t = e.target;
  if (
    t === void 0 ||
    t.nodeType === 8 ||
    t.classList.contains("no-pointer-events") === !0
  )
    return;
  let r = Jf.length - 1;
  for (; r >= 0; ) {
    const a = Jf[r].$;
    if (a.type.name === "QTooltip") {
      r--;
      continue;
    }
    if (a.type.name !== "QDialog") break;
    if (a.props.seamless !== !0) return;
    r--;
  }
  for (let a = vi.length - 1; a >= 0; a--) {
    const l = vi[a];
    if (
      (l.anchorEl.value === null || l.anchorEl.value.contains(t) === !1) &&
      (t === document.body ||
        (l.innerRef.value !== null && l.innerRef.value.contains(t) === !1))
    )
      (e.qClickOutside = !0), l.onClickOutside(e);
    else return;
  }
}
function Zh(e) {
  vi.push(e),
    vi.length === 1 &&
      (document.addEventListener("mousedown", go, ho),
      document.addEventListener("touchstart", go, ho));
}
function mo(e) {
  const t = vi.findIndex((r) => r === e);
  t > -1 &&
    (vi.splice(t, 1),
    vi.length === 0 &&
      (document.removeEventListener("mousedown", go, ho),
      document.removeEventListener("touchstart", go, ho)));
}
let oh, sh;
function vo(e) {
  const t = e.split(" ");
  return t.length !== 2
    ? !1
    : ["top", "center", "bottom"].includes(t[0]) !== !0
    ? (console.error(
        "Anchor/Self position must start with one of top/center/bottom"
      ),
      !1)
    : ["left", "middle", "right", "start", "end"].includes(t[1]) !== !0
    ? (console.error(
        "Anchor/Self position must end with one of left/middle/right/start/end"
      ),
      !1)
    : !0;
}
function Jh(e) {
  return e
    ? !(e.length !== 2 || typeof e[0] != "number" || typeof e[1] != "number")
    : !0;
}
const Pu = {
  "start#ltr": "left",
  "start#rtl": "right",
  "end#ltr": "right",
  "end#rtl": "left",
};
["left", "middle", "right"].forEach((e) => {
  (Pu[`${e}#ltr`] = e), (Pu[`${e}#rtl`] = e);
});
function po(e, t) {
  const r = e.split(" ");
  return {
    vertical: r[0],
    horizontal: Pu[`${r[1]}#${t === !0 ? "rtl" : "ltr"}`],
  };
}
function uw(e, t) {
  let {
    top: r,
    left: a,
    right: l,
    bottom: s,
    width: u,
    height: d,
  } = e.getBoundingClientRect();
  return (
    t !== void 0 &&
      ((r -= t[1]),
      (a -= t[0]),
      (s += t[1]),
      (l += t[0]),
      (u += t[0]),
      (d += t[1])),
    {
      top: r,
      bottom: s,
      height: d,
      left: a,
      right: l,
      width: u,
      middle: a + (l - a) / 2,
      center: r + (s - r) / 2,
    }
  );
}
function cw(e, t, r) {
  let { top: a, left: l } = e.getBoundingClientRect();
  return (
    (a += t.top),
    (l += t.left),
    r !== void 0 && ((a += r[1]), (l += r[0])),
    {
      top: a,
      bottom: a + 1,
      height: 1,
      left: l,
      right: l + 1,
      width: 1,
      middle: l,
      center: a,
    }
  );
}
function dw(e, t) {
  return { top: 0, center: t / 2, bottom: t, left: 0, middle: e / 2, right: e };
}
function uh(e, t, r, a) {
  return {
    top: e[r.vertical] - t[a.vertical],
    left: e[r.horizontal] - t[a.horizontal],
  };
}
function ec(e, t = 0) {
  if (e.targetEl === null || e.anchorEl === null || t > 5) return;
  if (e.targetEl.offsetHeight === 0 || e.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      ec(e, t + 1);
    }, 10);
    return;
  }
  const {
    targetEl: r,
    offset: a,
    anchorEl: l,
    anchorOrigin: s,
    selfOrigin: u,
    absoluteOffset: d,
    fit: f,
    cover: g,
    maxHeight: v,
    maxWidth: T,
  } = e;
  if (zi.is.ios === !0 && window.visualViewport !== void 0) {
    const J = document.body.style,
      { offsetLeft: z, offsetTop: H } = window.visualViewport;
    z !== oh && (J.setProperty("--q-pe-left", z + "px"), (oh = z)),
      H !== sh && (J.setProperty("--q-pe-top", H + "px"), (sh = H));
  }
  const { scrollLeft: M, scrollTop: _ } = r,
    P = d === void 0 ? uw(l, g === !0 ? [0, 0] : a) : cw(l, d, a);
  Object.assign(r.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth: T || "100vw",
    maxHeight: v || "100vh",
    visibility: "visible",
  });
  const { offsetWidth: $, offsetHeight: L } = r,
    { elWidth: F, elHeight: W } =
      f === !0 || g === !0
        ? {
            elWidth: Math.max(P.width, $),
            elHeight: g === !0 ? Math.max(P.height, L) : L,
          }
        : { elWidth: $, elHeight: L };
  let D = { maxWidth: T, maxHeight: v };
  (f === !0 || g === !0) &&
    ((D.minWidth = P.width + "px"),
    g === !0 && (D.minHeight = P.height + "px")),
    Object.assign(r.style, D);
  const A = dw(F, W);
  let N = uh(P, A, s, u);
  if (d === void 0 || a === void 0) fu(N, P, A, s, u);
  else {
    const { top: J, left: z } = N;
    fu(N, P, A, s, u);
    let H = !1;
    if (N.top !== J) {
      H = !0;
      const pe = 2 * a[1];
      (P.center = P.top -= pe), (P.bottom -= pe + 2);
    }
    if (N.left !== z) {
      H = !0;
      const pe = 2 * a[0];
      (P.middle = P.left -= pe), (P.right -= pe + 2);
    }
    H === !0 && ((N = uh(P, A, s, u)), fu(N, P, A, s, u));
  }
  (D = { top: N.top + "px", left: N.left + "px" }),
    N.maxHeight !== void 0 &&
      ((D.maxHeight = N.maxHeight + "px"),
      P.height > N.maxHeight && (D.minHeight = D.maxHeight)),
    N.maxWidth !== void 0 &&
      ((D.maxWidth = N.maxWidth + "px"),
      P.width > N.maxWidth && (D.minWidth = D.maxWidth)),
    Object.assign(r.style, D),
    r.scrollTop !== _ && (r.scrollTop = _),
    r.scrollLeft !== M && (r.scrollLeft = M);
}
function fu(e, t, r, a, l) {
  const s = r.bottom,
    u = r.right,
    d = Db(),
    f = window.innerHeight - d,
    g = document.body.clientWidth;
  if (e.top < 0 || e.top + s > f)
    if (l.vertical === "center")
      (e.top = t[a.vertical] > f / 2 ? Math.max(0, f - s) : 0),
        (e.maxHeight = Math.min(s, f));
    else if (t[a.vertical] > f / 2) {
      const v = Math.min(
        f,
        a.vertical === "center"
          ? t.center
          : a.vertical === l.vertical
          ? t.bottom
          : t.top
      );
      (e.maxHeight = Math.min(s, v)), (e.top = Math.max(0, v - s));
    } else
      (e.top = Math.max(
        0,
        a.vertical === "center"
          ? t.center
          : a.vertical === l.vertical
          ? t.top
          : t.bottom
      )),
        (e.maxHeight = Math.min(s, f - e.top));
  if (e.left < 0 || e.left + u > g)
    if (((e.maxWidth = Math.min(u, g)), l.horizontal === "middle"))
      e.left = t[a.horizontal] > g / 2 ? Math.max(0, g - u) : 0;
    else if (t[a.horizontal] > g / 2) {
      const v = Math.min(
        g,
        a.horizontal === "middle"
          ? t.middle
          : a.horizontal === l.horizontal
          ? t.right
          : t.left
      );
      (e.maxWidth = Math.min(u, v)), (e.left = Math.max(0, v - e.maxWidth));
    } else
      (e.left = Math.max(
        0,
        a.horizontal === "middle"
          ? t.middle
          : a.horizontal === l.horizontal
          ? t.left
          : t.right
      )),
        (e.maxWidth = Math.min(u, g - e.left));
}
var Yr = Je({
  name: "QTooltip",
  inheritAttrs: !1,
  props: {
    ...Kh,
    ...Wu,
    ...Yu,
    maxHeight: { type: String, default: null },
    maxWidth: { type: String, default: null },
    transitionShow: { default: "jump-down" },
    transitionHide: { default: "jump-up" },
    anchor: { type: String, default: "bottom middle", validator: vo },
    self: { type: String, default: "top middle", validator: vo },
    offset: { type: Array, default: () => [14, 14], validator: Jh },
    scrollTarget: { default: void 0 },
    delay: { type: Number, default: 0 },
    hideDelay: { type: Number, default: 0 },
  },
  emits: [...Hu],
  setup(e, { slots: t, emit: r, attrs: a }) {
    let l, s;
    const u = Dt(),
      {
        proxy: { $q: d },
      } = u,
      f = se(null),
      g = se(!1),
      v = I(() => po(e.anchor, d.lang.rtl)),
      T = I(() => po(e.self, d.lang.rtl)),
      M = I(() => e.persistent !== !0),
      { registerTick: _, removeTick: P } = $a(),
      { registerTimeout: $ } = oo(),
      { transitionProps: L, transitionStyle: F } = Ph(e),
      {
        localScrollTarget: W,
        changeScrollEvent: D,
        unconfigureScrollTarget: A,
      } = jh(e, X),
      {
        anchorEl: N,
        canShow: J,
        anchorEvents: z,
      } = Qh({ showing: g, configureAnchorEl: rt }),
      { show: H, hide: pe } = Gu({
        showing: g,
        canShow: J,
        handleShow: te,
        handleHide: xe,
        hideOnRouteChange: M,
        processOnMount: !0,
      });
    Object.assign(z, { delayShow: K, delayHide: me });
    const {
      showPortal: _e,
      hidePortal: Pe,
      renderPortal: lt,
    } = Ah(u, f, he, "tooltip");
    if (d.platform.is.mobile === !0) {
      const fe = {
          anchorEl: N,
          innerRef: f,
          onClickOutside(Ve) {
            return (
              pe(Ve),
              Ve.target.classList.contains("q-dialog__backdrop") && Ft(Ve),
              !0
            );
          },
        },
        Ke = I(
          () => e.modelValue === null && e.persistent !== !0 && g.value === !0
        );
      ze(Ke, (Ve) => {
        (Ve === !0 ? Zh : mo)(fe);
      }),
        Ht(() => {
          mo(fe);
        });
    }
    function te(fe) {
      _e(),
        _(() => {
          (s = new MutationObserver(() => j())),
            s.observe(f.value, {
              attributes: !1,
              childList: !0,
              characterData: !0,
              subtree: !0,
            }),
            j(),
            X();
        }),
        l === void 0 &&
          (l = ze(
            () =>
              d.screen.width +
              "|" +
              d.screen.height +
              "|" +
              e.self +
              "|" +
              e.anchor +
              "|" +
              d.lang.rtl,
            j
          )),
        $(() => {
          _e(!0), r("show", fe);
        }, e.transitionDuration);
    }
    function xe(fe) {
      P(),
        Pe(),
        Be(),
        $(() => {
          Pe(!0), r("hide", fe);
        }, e.transitionDuration);
    }
    function Be() {
      s !== void 0 && (s.disconnect(), (s = void 0)),
        l !== void 0 && (l(), (l = void 0)),
        A(),
        Ki(z, "tooltipTemp");
    }
    function j() {
      ec({
        targetEl: f.value,
        offset: e.offset,
        anchorEl: N.value,
        anchorOrigin: v.value,
        selfOrigin: T.value,
        maxHeight: e.maxHeight,
        maxWidth: e.maxWidth,
      });
    }
    function K(fe) {
      if (d.platform.is.mobile === !0) {
        fo(), document.body.classList.add("non-selectable");
        const Ke = N.value,
          Ve = ["touchmove", "touchcancel", "touchend", "click"].map((we) => [
            Ke,
            we,
            "delayHide",
            "passiveCapture",
          ]);
        Hr(z, "tooltipTemp", Ve);
      }
      $(() => {
        H(fe);
      }, e.delay);
    }
    function me(fe) {
      d.platform.is.mobile === !0 &&
        (Ki(z, "tooltipTemp"),
        fo(),
        setTimeout(() => {
          document.body.classList.remove("non-selectable");
        }, 10)),
        $(() => {
          pe(fe);
        }, e.hideDelay);
    }
    function rt() {
      if (e.noParentEvent === !0 || N.value === null) return;
      const fe =
        d.platform.is.mobile === !0
          ? [[N.value, "touchstart", "delayShow", "passive"]]
          : [
              [N.value, "mouseenter", "delayShow", "passive"],
              [N.value, "mouseleave", "delayHide", "passive"],
            ];
      Hr(z, "anchor", fe);
    }
    function X() {
      if (N.value !== null || e.scrollTarget !== void 0) {
        W.value = Mo(N.value, e.scrollTarget);
        const fe = e.noParentEvent === !0 ? j : pe;
        D(W.value, fe);
      }
    }
    function Z() {
      return g.value === !0
        ? E(
            "div",
            {
              ...a,
              ref: f,
              class: [
                "q-tooltip q-tooltip--style q-position-engine no-pointer-events",
                a.class,
              ],
              style: [a.style, F.value],
              role: "tooltip",
            },
            Mt(t.default)
          )
        : null;
    }
    function he() {
      return E(Ya, L.value, Z);
    }
    return Ht(Be), Object.assign(u.proxy, { updatePosition: j }), lt;
  },
});
const fw = { xs: 8, sm: 10, md: 14, lg: 20, xl: 24 };
var Ha = Je({
    name: "QChip",
    props: {
      ...ir,
      ...qb,
      dense: Boolean,
      icon: String,
      iconRight: String,
      iconRemove: String,
      iconSelected: String,
      label: [String, Number],
      color: String,
      textColor: String,
      modelValue: { type: Boolean, default: !0 },
      selected: { type: Boolean, default: null },
      square: Boolean,
      outline: Boolean,
      clickable: Boolean,
      removable: Boolean,
      removeAriaLabel: String,
      tabindex: [String, Number],
      disable: Boolean,
      ripple: { type: [Boolean, Object], default: !0 },
    },
    emits: ["update:modelValue", "update:selected", "remove", "click"],
    setup(e, { slots: t, emit: r }) {
      const {
          proxy: { $q: a },
        } = Dt(),
        l = ar(e, a),
        s = xb(e, fw),
        u = I(() => e.selected === !0 || e.icon !== void 0),
        d = I(() =>
          e.selected === !0 ? e.iconSelected || a.iconSet.chip.selected : e.icon
        ),
        f = I(() => e.iconRemove || a.iconSet.chip.remove),
        g = I(
          () => e.disable === !1 && (e.clickable === !0 || e.selected !== null)
        ),
        v = I(() => {
          const L = (e.outline === !0 && e.color) || e.textColor;
          return (
            "q-chip row inline no-wrap items-center" +
            (e.outline === !1 && e.color !== void 0 ? ` bg-${e.color}` : "") +
            (L ? ` text-${L} q-chip--colored` : "") +
            (e.disable === !0 ? " disabled" : "") +
            (e.dense === !0 ? " q-chip--dense" : "") +
            (e.outline === !0 ? " q-chip--outline" : "") +
            (e.selected === !0 ? " q-chip--selected" : "") +
            (g.value === !0
              ? " q-chip--clickable cursor-pointer non-selectable q-hoverable"
              : "") +
            (e.square === !0 ? " q-chip--square" : "") +
            (l.value === !0 ? " q-chip--dark q-dark" : "")
          );
        }),
        T = I(() => {
          const L =
              e.disable === !0
                ? { tabindex: -1, "aria-disabled": "true" }
                : { tabindex: e.tabindex || 0 },
            F = {
              ...L,
              role: "button",
              "aria-hidden": "false",
              "aria-label": e.removeAriaLabel || a.lang.label.remove,
            };
          return { chip: L, remove: F };
        });
      function M(L) {
        L.keyCode === 13 && _(L);
      }
      function _(L) {
        e.disable || (r("update:selected", !e.selected), r("click", L));
      }
      function P(L) {
        (L.keyCode === void 0 || L.keyCode === 13) &&
          (Ft(L),
          e.disable === !1 && (r("update:modelValue", !1), r("remove")));
      }
      function $() {
        const L = [];
        g.value === !0 && L.push(E("div", { class: "q-focus-helper" })),
          u.value === !0 &&
            L.push(
              E(Wt, { class: "q-chip__icon q-chip__icon--left", name: d.value })
            );
        const F =
          e.label !== void 0
            ? [E("div", { class: "ellipsis" }, [e.label])]
            : void 0;
        return (
          L.push(
            E(
              "div",
              {
                class:
                  "q-chip__content col row no-wrap items-center q-anchor--skip",
              },
              Pb(t.default, F)
            )
          ),
          e.iconRight &&
            L.push(
              E(Wt, {
                class: "q-chip__icon q-chip__icon--right",
                name: e.iconRight,
              })
            ),
          e.removable === !0 &&
            L.push(
              E(Wt, {
                class: "q-chip__icon q-chip__icon--remove cursor-pointer",
                name: f.value,
                ...T.value.remove,
                onClick: P,
                onKeyup: P,
              })
            ),
          L
        );
      }
      return () => {
        if (e.modelValue === !1) return;
        const L = { class: v.value, style: s.value };
        return (
          g.value === !0 &&
            Object.assign(L, T.value.chip, { onClick: _, onKeyup: M }),
          Ku(
            "div",
            L,
            $(),
            "ripple",
            e.ripple !== !1 && e.disable !== !0,
            () => [[Qu, e.ripple]]
          )
        );
      };
    },
  }),
  kr = Je({
    name: "QList",
    props: {
      ...ir,
      bordered: Boolean,
      dense: Boolean,
      separator: Boolean,
      padding: Boolean,
      tag: { type: String, default: "div" },
    },
    setup(e, { slots: t }) {
      const r = Dt(),
        a = ar(e, r.proxy.$q),
        l = I(
          () =>
            "q-list" +
            (e.bordered === !0 ? " q-list--bordered" : "") +
            (e.dense === !0 ? " q-list--dense" : "") +
            (e.separator === !0 ? " q-list--separator" : "") +
            (a.value === !0 ? " q-list--dark" : "") +
            (e.padding === !0 ? " q-list--padding" : "")
        );
      return () => E(e.tag, { class: l.value }, Mt(t.default));
    },
  });
const hw = ["horizontal", "vertical", "cell", "none"];
var gw = Je({
  name: "QMarkupTable",
  props: {
    ...ir,
    dense: Boolean,
    flat: Boolean,
    bordered: Boolean,
    square: Boolean,
    wrapCells: Boolean,
    separator: {
      type: String,
      default: "horizontal",
      validator: (e) => hw.includes(e),
    },
  },
  setup(e, { slots: t }) {
    const r = Dt(),
      a = ar(e, r.proxy.$q),
      l = I(
        () =>
          `q-markup-table q-table__container q-table__card q-table--${e.separator}-separator` +
          (a.value === !0 ? " q-table--dark q-table__card--dark q-dark" : "") +
          (e.dense === !0 ? " q-table--dense" : "") +
          (e.flat === !0 ? " q-table--flat" : "") +
          (e.bordered === !0 ? " q-table--bordered" : "") +
          (e.square === !0 ? " q-table--square" : "") +
          (e.wrapCells === !1 ? " q-table--no-wrap" : "")
      );
    return () =>
      E("div", { class: l.value }, [
        E("table", { class: "q-table" }, Mt(t.default)),
      ]);
  },
});
function mw(e, t) {
  return E("div", e, [E("table", { class: "q-table" }, t)]);
}
let Ba = !1;
{
  const e = document.createElement("div");
  e.setAttribute("dir", "rtl"),
    Object.assign(e.style, { width: "1px", height: "1px", overflow: "auto" });
  const t = document.createElement("div");
  Object.assign(t.style, { width: "1000px", height: "1px" }),
    document.body.appendChild(e),
    e.appendChild(t),
    (e.scrollLeft = -1e3),
    (Ba = e.scrollLeft >= 0),
    e.remove();
}
const Yn = 1e3,
  vw = ["start", "center", "end", "start-force", "center-force", "end-force"],
  Xh = Array.prototype.filter,
  pw =
    window.getComputedStyle(document.body).overflowAnchor === void 0
      ? Eh
      : function (e, t) {
          e !== null &&
            (e._qOverflowAnimationFrame !== void 0 &&
              cancelAnimationFrame(e._qOverflowAnimationFrame),
            (e._qOverflowAnimationFrame = requestAnimationFrame(() => {
              if (e === null) return;
              e._qOverflowAnimationFrame = void 0;
              const r = e.children || [];
              Xh.call(
                r,
                (l) => l.dataset && l.dataset.qVsAnchor !== void 0
              ).forEach((l) => {
                delete l.dataset.qVsAnchor;
              });
              const a = r[t];
              a && a.dataset && (a.dataset.qVsAnchor = "");
            })));
        };
function Qi(e, t) {
  return e + t;
}
function hu(e, t, r, a, l, s, u, d) {
  const f =
      e === window ? document.scrollingElement || document.documentElement : e,
    g = l === !0 ? "offsetWidth" : "offsetHeight",
    v = {
      scrollStart: 0,
      scrollViewSize: -u - d,
      scrollMaxSize: 0,
      offsetStart: -u,
      offsetEnd: -d,
    };
  if (
    (l === !0
      ? (e === window
          ? ((v.scrollStart =
              window.pageXOffset ||
              window.scrollX ||
              document.body.scrollLeft ||
              0),
            (v.scrollViewSize += document.documentElement.clientWidth))
          : ((v.scrollStart = f.scrollLeft),
            (v.scrollViewSize += f.clientWidth)),
        (v.scrollMaxSize = f.scrollWidth),
        s === !0 &&
          (v.scrollStart =
            (Ba === !0 ? v.scrollMaxSize - v.scrollViewSize : 0) -
            v.scrollStart))
      : (e === window
          ? ((v.scrollStart =
              window.pageYOffset ||
              window.scrollY ||
              document.body.scrollTop ||
              0),
            (v.scrollViewSize += document.documentElement.clientHeight))
          : ((v.scrollStart = f.scrollTop),
            (v.scrollViewSize += f.clientHeight)),
        (v.scrollMaxSize = f.scrollHeight)),
    r !== null)
  )
    for (
      let T = r.previousElementSibling;
      T !== null;
      T = T.previousElementSibling
    )
      T.classList.contains("q-virtual-scroll--skip") === !1 &&
        (v.offsetStart += T[g]);
  if (a !== null)
    for (let T = a.nextElementSibling; T !== null; T = T.nextElementSibling)
      T.classList.contains("q-virtual-scroll--skip") === !1 &&
        (v.offsetEnd += T[g]);
  if (t !== e) {
    const T = f.getBoundingClientRect(),
      M = t.getBoundingClientRect();
    l === !0
      ? ((v.offsetStart += M.left - T.left), (v.offsetEnd -= M.width))
      : ((v.offsetStart += M.top - T.top), (v.offsetEnd -= M.height)),
      e !== window && (v.offsetStart += v.scrollStart),
      (v.offsetEnd += v.scrollMaxSize - v.offsetStart);
  }
  return v;
}
function ch(e, t, r, a) {
  t === "end" &&
    (t = (e === window ? document.body : e)[
      r === !0 ? "scrollWidth" : "scrollHeight"
    ]),
    e === window
      ? r === !0
        ? (a === !0 &&
            (t =
              (Ba === !0
                ? document.body.scrollWidth -
                  document.documentElement.clientWidth
                : 0) - t),
          window.scrollTo(
            t,
            window.pageYOffset || window.scrollY || document.body.scrollTop || 0
          ))
        : window.scrollTo(
            window.pageXOffset ||
              window.scrollX ||
              document.body.scrollLeft ||
              0,
            t
          )
      : r === !0
      ? (a === !0 && (t = (Ba === !0 ? e.scrollWidth - e.offsetWidth : 0) - t),
        (e.scrollLeft = t))
      : (e.scrollTop = t);
}
function Ta(e, t, r, a) {
  if (r >= a) return 0;
  const l = t.length,
    s = Math.floor(r / Yn),
    u = Math.floor((a - 1) / Yn) + 1;
  let d = e.slice(s, u).reduce(Qi, 0);
  return (
    r % Yn !== 0 && (d -= t.slice(s * Yn, r).reduce(Qi, 0)),
    a % Yn !== 0 && a !== l && (d -= t.slice(a, u * Yn).reduce(Qi, 0)),
    d
  );
}
const yw = {
    virtualScrollSliceSize: { type: [Number, String], default: null },
    virtualScrollSliceRatioBefore: { type: [Number, String], default: 1 },
    virtualScrollSliceRatioAfter: { type: [Number, String], default: 1 },
    virtualScrollItemSize: { type: [Number, String], default: 24 },
    virtualScrollStickySizeStart: { type: [Number, String], default: 0 },
    virtualScrollStickySizeEnd: { type: [Number, String], default: 0 },
    tableColspan: [Number, String],
  },
  eg = { virtualScrollHorizontal: Boolean, onVirtualScroll: Function, ...yw };
function tg({
  virtualScrollLength: e,
  getVirtualScrollTarget: t,
  getVirtualScrollEl: r,
  virtualScrollItemSizeComputed: a,
}) {
  const l = Dt(),
    { props: s, emit: u, proxy: d } = l,
    { $q: f } = d;
  let g,
    v,
    T,
    M = [],
    _;
  const P = se(0),
    $ = se(0),
    L = se({}),
    F = se(null),
    W = se(null),
    D = se(null),
    A = se({ from: 0, to: 0 }),
    N = I(() => (s.tableColspan !== void 0 ? s.tableColspan : 100));
  a === void 0 && (a = I(() => s.virtualScrollItemSize));
  const J = I(() => a.value + ";" + s.virtualScrollHorizontal),
    z = I(
      () =>
        J.value +
        ";" +
        s.virtualScrollSliceRatioBefore +
        ";" +
        s.virtualScrollSliceRatioAfter
    );
  ze(z, () => {
    j();
  }),
    ze(J, H);
  function H() {
    Be(v, !0);
  }
  function pe(Z) {
    Be(Z === void 0 ? v : Z);
  }
  function _e(Z, he) {
    const fe = t();
    if (fe == null || fe.nodeType === 8) return;
    const Ke = hu(
      fe,
      r(),
      F.value,
      W.value,
      s.virtualScrollHorizontal,
      f.lang.rtl,
      s.virtualScrollStickySizeStart,
      s.virtualScrollStickySizeEnd
    );
    T !== Ke.scrollViewSize && j(Ke.scrollViewSize),
      lt(
        fe,
        Ke,
        Math.min(e.value - 1, Math.max(0, parseInt(Z, 10) || 0)),
        0,
        vw.indexOf(he) > -1 ? he : v > -1 && Z > v ? "end" : "start"
      );
  }
  function Pe() {
    const Z = t();
    if (Z == null || Z.nodeType === 8) return;
    const he = hu(
        Z,
        r(),
        F.value,
        W.value,
        s.virtualScrollHorizontal,
        f.lang.rtl,
        s.virtualScrollStickySizeStart,
        s.virtualScrollStickySizeEnd
      ),
      fe = e.value - 1,
      Ke = he.scrollMaxSize - he.offsetStart - he.offsetEnd - $.value;
    if (g === he.scrollStart) return;
    if (he.scrollMaxSize <= 0) {
      lt(Z, he, 0, 0);
      return;
    }
    T !== he.scrollViewSize && j(he.scrollViewSize), te(A.value.from);
    const Ve = Math.floor(
      he.scrollMaxSize -
        Math.max(he.scrollViewSize, he.offsetEnd) -
        Math.min(_[fe], he.scrollViewSize / 2)
    );
    if (Ve > 0 && Math.ceil(he.scrollStart) >= Ve) {
      lt(Z, he, fe, he.scrollMaxSize - he.offsetEnd - M.reduce(Qi, 0));
      return;
    }
    let we = 0,
      Me = he.scrollStart - he.offsetStart,
      ft = Me;
    if (Me <= Ke && Me + he.scrollViewSize >= P.value)
      (Me -= P.value), (we = A.value.from), (ft = Me);
    else
      for (let ee = 0; Me >= M[ee] && we < fe; ee++) (Me -= M[ee]), (we += Yn);
    for (; Me > 0 && we < fe; )
      (Me -= _[we]),
        Me > -he.scrollViewSize ? (we++, (ft = Me)) : (ft = _[we] + Me);
    lt(Z, he, we, ft);
  }
  function lt(Z, he, fe, Ke, Ve) {
    const we = typeof Ve == "string" && Ve.indexOf("-force") > -1,
      Me = we === !0 ? Ve.replace("-force", "") : Ve,
      ft = Me !== void 0 ? Me : "start";
    let ee = Math.max(0, fe - L.value[ft]),
      wt = ee + L.value.total;
    wt > e.value && ((wt = e.value), (ee = Math.max(0, wt - L.value.total))),
      (g = he.scrollStart);
    const nn = ee !== A.value.from || wt !== A.value.to;
    if (nn === !1 && Me === void 0) {
      me(fe);
      return;
    }
    const { activeElement: un } = document,
      rn = D.value;
    nn === !0 &&
      rn !== null &&
      rn !== un &&
      rn.contains(un) === !0 &&
      (rn.addEventListener("focusout", xe),
      setTimeout(() => {
        rn !== null && rn.removeEventListener("focusout", xe);
      })),
      pw(rn, fe - ee);
    const qt = Me !== void 0 ? _.slice(ee, fe).reduce(Qi, 0) : 0;
    if (nn === !0) {
      const Gt = wt >= A.value.from && ee <= A.value.to ? A.value.to : wt;
      (A.value = { from: ee, to: Gt }),
        (P.value = Ta(M, _, 0, ee)),
        ($.value = Ta(M, _, wt, e.value)),
        requestAnimationFrame(() => {
          A.value.to !== wt &&
            g === he.scrollStart &&
            ((A.value = { from: A.value.from, to: wt }),
            ($.value = Ta(M, _, wt, e.value)));
        });
    }
    requestAnimationFrame(() => {
      if (g !== he.scrollStart) return;
      nn === !0 && te(ee);
      const Gt = _.slice(ee, fe).reduce(Qi, 0),
        Zn = Gt + he.offsetStart + P.value,
        Kt = Zn + _[fe];
      let Bn = Zn + Ke;
      if (Me !== void 0) {
        const Pr = Gt - qt,
          St = he.scrollStart + Pr;
        Bn =
          we !== !0 && St < Zn && Kt < St + he.scrollViewSize
            ? St
            : Me === "end"
            ? Kt - he.scrollViewSize
            : Zn -
              (Me === "start"
                ? 0
                : Math.round((he.scrollViewSize - _[fe]) / 2));
      }
      (g = Bn), ch(Z, Bn, s.virtualScrollHorizontal, f.lang.rtl), me(fe);
    });
  }
  function te(Z) {
    const he = D.value;
    if (he) {
      const fe = Xh.call(
          he.children,
          (ee) =>
            ee.classList &&
            ee.classList.contains("q-virtual-scroll--skip") === !1
        ),
        Ke = fe.length,
        Ve =
          s.virtualScrollHorizontal === !0
            ? (ee) => ee.getBoundingClientRect().width
            : (ee) => ee.offsetHeight;
      let we = Z,
        Me,
        ft;
      for (let ee = 0; ee < Ke; ) {
        for (
          Me = Ve(fe[ee]), ee++;
          ee < Ke &&
          fe[ee].classList.contains("q-virtual-scroll--with-prev") === !0;

        )
          (Me += Ve(fe[ee])), ee++;
        (ft = Me - _[we]),
          ft !== 0 && ((_[we] += ft), (M[Math.floor(we / Yn)] += ft)),
          we++;
      }
    }
  }
  function xe() {
    D.value !== null && D.value !== void 0 && D.value.focus();
  }
  function Be(Z, he) {
    const fe = 1 * a.value;
    (he === !0 || Array.isArray(_) === !1) && (_ = []);
    const Ke = _.length;
    _.length = e.value;
    for (let we = e.value - 1; we >= Ke; we--) _[we] = fe;
    const Ve = Math.floor((e.value - 1) / Yn);
    M = [];
    for (let we = 0; we <= Ve; we++) {
      let Me = 0;
      const ft = Math.min((we + 1) * Yn, e.value);
      for (let ee = we * Yn; ee < ft; ee++) Me += _[ee];
      M.push(Me);
    }
    (v = -1),
      (g = void 0),
      (P.value = Ta(M, _, 0, A.value.from)),
      ($.value = Ta(M, _, A.value.to, e.value)),
      Z >= 0
        ? (te(A.value.from),
          Sn(() => {
            _e(Z);
          }))
        : rt();
  }
  function j(Z) {
    if (Z === void 0 && typeof window != "undefined") {
      const Me = t();
      Me != null &&
        Me.nodeType !== 8 &&
        (Z = hu(
          Me,
          r(),
          F.value,
          W.value,
          s.virtualScrollHorizontal,
          f.lang.rtl,
          s.virtualScrollStickySizeStart,
          s.virtualScrollStickySizeEnd
        ).scrollViewSize);
    }
    T = Z;
    const he = parseFloat(s.virtualScrollSliceRatioBefore) || 0,
      fe = parseFloat(s.virtualScrollSliceRatioAfter) || 0,
      Ke = 1 + he + fe,
      Ve = Z === void 0 || Z <= 0 ? 1 : Math.ceil(Z / a.value),
      we = Math.max(
        1,
        Ve,
        Math.ceil(
          (s.virtualScrollSliceSize > 0 ? s.virtualScrollSliceSize : 10) / Ke
        )
      );
    L.value = {
      total: Math.ceil(we * Ke),
      start: Math.ceil(we * he),
      center: Math.ceil(we * (0.5 + he)),
      end: Math.ceil(we * (1 + he)),
      view: Ve,
    };
  }
  function K(Z, he) {
    const fe = s.virtualScrollHorizontal === !0 ? "width" : "height",
      Ke = { ["--q-virtual-scroll-item-" + fe]: a.value + "px" };
    return [
      Z === "tbody"
        ? E(Z, { class: "q-virtual-scroll__padding", key: "before", ref: F }, [
            E("tr", [
              E("td", {
                style: { [fe]: `${P.value}px`, ...Ke },
                colspan: N.value,
              }),
            ]),
          ])
        : E(Z, {
            class: "q-virtual-scroll__padding",
            key: "before",
            ref: F,
            style: { [fe]: `${P.value}px`, ...Ke },
          }),
      E(
        Z,
        {
          class: "q-virtual-scroll__content",
          key: "content",
          ref: D,
          tabindex: -1,
        },
        he.flat()
      ),
      Z === "tbody"
        ? E(Z, { class: "q-virtual-scroll__padding", key: "after", ref: W }, [
            E("tr", [
              E("td", {
                style: { [fe]: `${$.value}px`, ...Ke },
                colspan: N.value,
              }),
            ]),
          ])
        : E(Z, {
            class: "q-virtual-scroll__padding",
            key: "after",
            ref: W,
            style: { [fe]: `${$.value}px`, ...Ke },
          }),
    ];
  }
  function me(Z) {
    v !== Z &&
      (s.onVirtualScroll !== void 0 &&
        u("virtualScroll", {
          index: Z,
          from: A.value.from,
          to: A.value.to - 1,
          direction: Z < v ? "decrease" : "increase",
          ref: d,
        }),
      (v = Z));
  }
  j();
  const rt = ju(Pe, f.platform.is.ios === !0 ? 120 : 35);
  Zu(() => {
    j();
  });
  let X = !1;
  return (
    ia(() => {
      X = !0;
    }),
    aa(() => {
      if (X !== !0) return;
      const Z = t();
      g !== void 0 && Z !== void 0 && Z !== null && Z.nodeType !== 8
        ? ch(Z, g, s.virtualScrollHorizontal, f.lang.rtl)
        : _e(v);
    }),
    Ht(() => {
      rt.cancel();
    }),
    Object.assign(d, { scrollTo: _e, reset: H, refresh: pe }),
    {
      virtualScrollSliceRange: A,
      virtualScrollSliceSizeComputed: L,
      setVirtualScrollSize: j,
      onVirtualScrollEvt: rt,
      localResetVirtualScroll: Be,
      padVirtualScroll: K,
      scrollTo: _e,
      reset: H,
      refresh: pe,
    }
  );
}
const _w = { list: kr, table: gw },
  bw = ["list", "table", "__qtable"];
var tc = Je({
  name: "QVirtualScroll",
  props: {
    ...eg,
    type: { type: String, default: "list", validator: (e) => bw.includes(e) },
    items: { type: Array, default: () => [] },
    itemsFn: Function,
    itemsSize: Number,
    scrollTarget: { default: void 0 },
  },
  setup(e, { slots: t, attrs: r }) {
    let a;
    const l = se(null),
      s = I(() =>
        e.itemsSize >= 0 && e.itemsFn !== void 0
          ? parseInt(e.itemsSize, 10)
          : Array.isArray(e.items)
          ? e.items.length
          : 0
      ),
      {
        virtualScrollSliceRange: u,
        localResetVirtualScroll: d,
        padVirtualScroll: f,
        onVirtualScrollEvt: g,
      } = tg({
        virtualScrollLength: s,
        getVirtualScrollTarget: P,
        getVirtualScrollEl: _,
      }),
      v = I(() => {
        if (s.value === 0) return [];
        const W = (D, A) => ({ index: u.value.from + A, item: D });
        return e.itemsFn === void 0
          ? e.items.slice(u.value.from, u.value.to).map(W)
          : e.itemsFn(u.value.from, u.value.to - u.value.from).map(W);
      }),
      T = I(
        () =>
          "q-virtual-scroll q-virtual-scroll" +
          (e.virtualScrollHorizontal === !0 ? "--horizontal" : "--vertical") +
          (e.scrollTarget !== void 0 ? "" : " scroll")
      ),
      M = I(() => (e.scrollTarget !== void 0 ? {} : { tabindex: 0 }));
    ze(s, () => {
      d();
    }),
      ze(
        () => e.scrollTarget,
        () => {
          L(), $();
        }
      );
    function _() {
      return l.value.$el || l.value;
    }
    function P() {
      return a;
    }
    function $() {
      (a = Mo(_(), e.scrollTarget)),
        a.addEventListener("scroll", g, Xi.passive);
    }
    function L() {
      a !== void 0 &&
        (a.removeEventListener("scroll", g, Xi.passive), (a = void 0));
    }
    function F() {
      let W = f(e.type === "list" ? "div" : "tbody", v.value.map(t.default));
      return t.before !== void 0 && (W = t.before().concat(W)), _i(t.after, W);
    }
    return (
      Zu(() => {
        d();
      }),
      Xr(() => {
        $();
      }),
      aa(() => {
        $();
      }),
      ia(() => {
        L();
      }),
      Ht(() => {
        L();
      }),
      () => {
        if (t.default === void 0) {
          console.error(
            "QVirtualScroll: default scoped slot is required for rendering"
          );
          return;
        }
        return e.type === "__qtable"
          ? mw({ ref: l, class: "q-table__middle " + T.value }, F())
          : E(
              _w[e.type],
              { ...r, ref: l, class: [r.class, T.value], ...M.value },
              F
            );
      }
    );
  },
});
const ww = [
  E("circle", { cx: "15", cy: "15", r: "15" }, [
    E("animate", {
      attributeName: "r",
      from: "15",
      to: "15",
      begin: "0s",
      dur: "0.8s",
      values: "15;9;15",
      calcMode: "linear",
      repeatCount: "indefinite",
    }),
    E("animate", {
      attributeName: "fill-opacity",
      from: "1",
      to: "1",
      begin: "0s",
      dur: "0.8s",
      values: "1;.5;1",
      calcMode: "linear",
      repeatCount: "indefinite",
    }),
  ]),
  E("circle", { cx: "60", cy: "15", r: "9", "fill-opacity": ".3" }, [
    E("animate", {
      attributeName: "r",
      from: "9",
      to: "9",
      begin: "0s",
      dur: "0.8s",
      values: "9;15;9",
      calcMode: "linear",
      repeatCount: "indefinite",
    }),
    E("animate", {
      attributeName: "fill-opacity",
      from: ".5",
      to: ".5",
      begin: "0s",
      dur: "0.8s",
      values: ".5;1;.5",
      calcMode: "linear",
      repeatCount: "indefinite",
    }),
  ]),
  E("circle", { cx: "105", cy: "15", r: "15" }, [
    E("animate", {
      attributeName: "r",
      from: "15",
      to: "15",
      begin: "0s",
      dur: "0.8s",
      values: "15;9;15",
      calcMode: "linear",
      repeatCount: "indefinite",
    }),
    E("animate", {
      attributeName: "fill-opacity",
      from: "1",
      to: "1",
      begin: "0s",
      dur: "0.8s",
      values: "1;.5;1",
      calcMode: "linear",
      repeatCount: "indefinite",
    }),
  ]),
];
var Au = Je({
  name: "QSpinnerDots",
  props: Ab,
  setup(e) {
    const { cSize: t, classes: r } = Eb(e);
    return () =>
      E(
        "svg",
        {
          class: r.value,
          fill: "currentColor",
          width: t.value,
          height: t.value,
          viewBox: "0 0 120 30",
          xmlns: "http://www.w3.org/2000/svg",
        },
        ww
      );
  },
});
const Sw = { ratio: [String, Number] };
function kw(e, t) {
  return I(() => {
    const r = Number(e.ratio || (t !== void 0 ? t.value : void 0));
    return isNaN(r) !== !0 && r > 0 ? { paddingBottom: `${100 / r}%` } : null;
  });
}
const Cw = 16 / 9;
var nc = Je({
    name: "QImg",
    props: {
      ...Sw,
      src: String,
      srcset: String,
      sizes: String,
      alt: String,
      crossorigin: String,
      decoding: String,
      referrerpolicy: String,
      draggable: Boolean,
      loading: { type: String, default: "lazy" },
      fetchpriority: { type: String, default: "auto" },
      width: String,
      height: String,
      initialRatio: { type: [Number, String], default: Cw },
      placeholderSrc: String,
      fit: { type: String, default: "cover" },
      position: { type: String, default: "50% 50%" },
      imgClass: String,
      imgStyle: Object,
      noSpinner: Boolean,
      noNativeMenu: Boolean,
      noTransition: Boolean,
      spinnerColor: String,
      spinnerSize: String,
    },
    emits: ["load", "error"],
    setup(e, { slots: t, emit: r }) {
      const a = se(e.initialRatio),
        l = kw(e, a);
      let s = null,
        u = !1;
      const d = [se(null), se(L())],
        f = se(0),
        g = se(!1),
        v = se(!1),
        T = I(() => `q-img q-img--${e.noNativeMenu === !0 ? "no-" : ""}menu`),
        M = I(() => ({ width: e.width, height: e.height })),
        _ = I(
          () =>
            `q-img__image ${
              e.imgClass !== void 0 ? e.imgClass + " " : ""
            }q-img__image--with${e.noTransition === !0 ? "out" : ""}-transition`
        ),
        P = I(() => ({
          ...e.imgStyle,
          objectFit: e.fit,
          objectPosition: e.position,
        }));
      ze(() => $(), F);
      function $() {
        return e.src || e.srcset || e.sizes
          ? { src: e.src, srcset: e.srcset, sizes: e.sizes }
          : null;
      }
      function L() {
        return e.placeholderSrc !== void 0 ? { src: e.placeholderSrc } : null;
      }
      function F(H) {
        s !== null && (clearTimeout(s), (s = null)),
          (v.value = !1),
          H === null
            ? ((g.value = !1), (d[f.value ^ 1].value = L()))
            : (g.value = !0),
          (d[f.value].value = H);
      }
      function W({ target: H }) {
        u !== !0 &&
          (s !== null && (clearTimeout(s), (s = null)),
          (a.value =
            H.naturalHeight === 0 ? 0.5 : H.naturalWidth / H.naturalHeight),
          D(H, 1));
      }
      function D(H, pe) {
        u === !0 ||
          pe === 1e3 ||
          (H.complete === !0
            ? A(H)
            : (s = setTimeout(() => {
                (s = null), D(H, pe + 1);
              }, 50)));
      }
      function A(H) {
        u !== !0 &&
          ((f.value = f.value ^ 1),
          (d[f.value].value = null),
          (g.value = !1),
          (v.value = !1),
          r("load", H.currentSrc || H.src));
      }
      function N(H) {
        s !== null && (clearTimeout(s), (s = null)),
          (g.value = !1),
          (v.value = !0),
          (d[f.value].value = null),
          (d[f.value ^ 1].value = L()),
          r("error", H);
      }
      function J(H) {
        const pe = d[H].value,
          _e = {
            key: "img_" + H,
            class: _.value,
            style: P.value,
            crossorigin: e.crossorigin,
            decoding: e.decoding,
            referrerpolicy: e.referrerpolicy,
            height: e.height,
            width: e.width,
            loading: e.loading,
            fetchpriority: e.fetchpriority,
            "aria-hidden": "true",
            draggable: e.draggable,
            ...pe,
          };
        return (
          f.value === H
            ? ((_e.class += " q-img__image--waiting"),
              Object.assign(_e, { onLoad: W, onError: N }))
            : (_e.class += " q-img__image--loaded"),
          E(
            "div",
            { class: "q-img__container absolute-full", key: "img" + H },
            E("img", _e)
          )
        );
      }
      function z() {
        return g.value !== !0
          ? E(
              "div",
              {
                key: "content",
                class: "q-img__content absolute-full q-anchor--skip",
              },
              Mt(t[v.value === !0 ? "error" : "default"])
            )
          : E(
              "div",
              {
                key: "loading",
                class: "q-img__loading absolute-full flex flex-center",
              },
              t.loading !== void 0
                ? t.loading()
                : e.noSpinner === !0
                ? void 0
                : [E(Ih, { color: e.spinnerColor, size: e.spinnerSize })]
            );
      }
      return (
        F($()),
        Ht(() => {
          (u = !0), s !== null && (clearTimeout(s), (s = null));
        }),
        () => {
          const H = [];
          return (
            l.value !== null &&
              H.push(E("div", { key: "filler", style: l.value })),
            v.value !== !0 &&
              (d[0].value !== null && H.push(J(0)),
              d[1].value !== null && H.push(J(1))),
            H.push(E(Ya, { name: "q-transition--fade" }, z)),
            E(
              "div",
              {
                class: T.value,
                style: M.value,
                role: "img",
                "aria-label": e.alt,
              },
              H
            )
          );
        }
      );
    },
  }),
  Tw = Je({
    name: "QBanner",
    props: { ...ir, inlineActions: Boolean, dense: Boolean, rounded: Boolean },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: r },
        } = Dt(),
        a = ar(e, r),
        l = I(
          () =>
            "q-banner row items-center" +
            (e.dense === !0 ? " q-banner--dense" : "") +
            (a.value === !0 ? " q-banner--dark q-dark" : "") +
            (e.rounded === !0 ? " rounded-borders" : "")
        ),
        s = I(
          () =>
            `q-banner__actions row items-center justify-end col-${
              e.inlineActions === !0 ? "auto" : "all"
            }`
        );
      return () => {
        const u = [
            E(
              "div",
              {
                class: "q-banner__avatar col-auto row items-center self-start",
              },
              Mt(t.avatar)
            ),
            E(
              "div",
              { class: "q-banner__content col text-body2" },
              Mt(t.default)
            ),
          ],
          d = Mt(t.action);
        return (
          d !== void 0 && u.push(E("div", { class: s.value }, d)),
          E(
            "div",
            {
              class:
                l.value +
                (e.inlineActions === !1 && d !== void 0
                  ? " q-banner--top-padding"
                  : ""),
              role: "alert",
            },
            u
          )
        );
      };
    },
  }),
  Ie = Je({
    name: "QItemSection",
    props: {
      avatar: Boolean,
      thumbnail: Boolean,
      side: Boolean,
      top: Boolean,
      noWrap: Boolean,
    },
    setup(e, { slots: t }) {
      const r = I(
        () =>
          `q-item__section column q-item__section--${
            e.avatar === !0 || e.side === !0 || e.thumbnail === !0
              ? "side"
              : "main"
          }` +
          (e.top === !0
            ? " q-item__section--top justify-start"
            : " justify-center") +
          (e.avatar === !0 ? " q-item__section--avatar" : "") +
          (e.thumbnail === !0 ? " q-item__section--thumbnail" : "") +
          (e.noWrap === !0 ? " q-item__section--nowrap" : "")
      );
      return () => E("div", { class: r.value }, Mt(t.default));
    },
  }),
  Ge = Je({
    name: "QItemLabel",
    props: {
      overline: Boolean,
      caption: Boolean,
      header: Boolean,
      lines: [Number, String],
    },
    setup(e, { slots: t }) {
      const r = I(() => parseInt(e.lines, 10)),
        a = I(
          () =>
            "q-item__label" +
            (e.overline === !0
              ? " q-item__label--overline text-overline"
              : "") +
            (e.caption === !0 ? " q-item__label--caption text-caption" : "") +
            (e.header === !0 ? " q-item__label--header" : "") +
            (r.value === 1 ? " ellipsis" : "")
        ),
        l = I(() =>
          e.lines !== void 0 && r.value > 1
            ? {
                overflow: "hidden",
                display: "-webkit-box",
                "-webkit-box-orient": "vertical",
                "-webkit-line-clamp": r.value,
              }
            : null
        );
      return () => E("div", { style: l.value, class: a.value }, Mt(t.default));
    },
  }),
  zt = Je({
    name: "QItem",
    props: {
      ...ir,
      ...Do,
      tag: { type: String, default: "div" },
      active: { type: Boolean, default: null },
      clickable: Boolean,
      dense: Boolean,
      insetLevel: Number,
      tabindex: [String, Number],
      focused: Boolean,
      manualFocus: Boolean,
    },
    emits: ["click", "keyup"],
    setup(e, { slots: t, emit: r }) {
      const {
          proxy: { $q: a },
        } = Dt(),
        l = ar(e, a),
        {
          hasLink: s,
          linkAttrs: u,
          linkClass: d,
          linkTag: f,
          navigateOnClick: g,
        } = $h(),
        v = se(null),
        T = se(null),
        M = I(() => e.clickable === !0 || s.value === !0 || e.tag === "label"),
        _ = I(() => e.disable !== !0 && M.value === !0),
        P = I(
          () =>
            "q-item q-item-type row no-wrap" +
            (e.dense === !0 ? " q-item--dense" : "") +
            (l.value === !0 ? " q-item--dark" : "") +
            (s.value === !0 && e.active === null
              ? d.value
              : e.active === !0
              ? ` q-item--active${
                  e.activeClass !== void 0 ? ` ${e.activeClass}` : ""
                }`
              : "") +
            (e.disable === !0 ? " disabled" : "") +
            (_.value === !0
              ? " q-item--clickable q-link cursor-pointer " +
                (e.manualFocus === !0
                  ? "q-manual-focusable"
                  : "q-focusable q-hoverable") +
                (e.focused === !0 ? " q-manual-focusable--focused" : "")
              : "")
        ),
        $ = I(() => {
          if (e.insetLevel === void 0) return null;
          const D = a.lang.rtl === !0 ? "Right" : "Left";
          return { ["padding" + D]: 16 + e.insetLevel * 56 + "px" };
        });
      function L(D) {
        _.value === !0 &&
          (T.value !== null &&
            (D.qKeyEvent !== !0 && document.activeElement === v.value
              ? T.value.focus()
              : document.activeElement === T.value && v.value.focus()),
          g(D));
      }
      function F(D) {
        if (_.value === !0 && Wa(D, 13) === !0) {
          Ft(D), (D.qKeyEvent = !0);
          const A = new MouseEvent("click", D);
          (A.qKeyEvent = !0), v.value.dispatchEvent(A);
        }
        r("keyup", D);
      }
      function W() {
        const D = Rh(t.default, []);
        return (
          _.value === !0 &&
            D.unshift(
              E("div", { class: "q-focus-helper", tabindex: -1, ref: T })
            ),
          D
        );
      }
      return () => {
        const D = {
          ref: v,
          class: P.value,
          style: $.value,
          role: "listitem",
          onClick: L,
          onKeyup: F,
        };
        return (
          _.value === !0
            ? ((D.tabindex = e.tabindex || "0"), Object.assign(D, u.value))
            : M.value === !0 && (D["aria-disabled"] = "true"),
          E(f.value, D, W())
        );
      };
    },
  }),
  Mw = Je({
    name: "QBtnGroup",
    props: {
      unelevated: Boolean,
      outline: Boolean,
      flat: Boolean,
      rounded: Boolean,
      square: Boolean,
      push: Boolean,
      stretch: Boolean,
      glossy: Boolean,
      spread: Boolean,
    },
    setup(e, { slots: t }) {
      const r = I(() => {
        const a = [
          "unelevated",
          "outline",
          "flat",
          "rounded",
          "square",
          "push",
          "stretch",
          "glossy",
        ]
          .filter((l) => e[l] === !0)
          .map((l) => `q-btn-group--${l}`)
          .join(" ");
        return (
          `q-btn-group row no-wrap${a.length !== 0 ? " " + a : ""}` +
          (e.spread === !0 ? " q-btn-group--spread" : " inline")
        );
      });
      return () => E("div", { class: r.value }, Mt(t.default));
    },
  }),
  ng = Je({
    name: "QMenu",
    inheritAttrs: !1,
    props: {
      ...Kh,
      ...Wu,
      ...ir,
      ...Yu,
      persistent: Boolean,
      autoClose: Boolean,
      separateClosePopup: Boolean,
      noRouteDismiss: Boolean,
      noRefocus: Boolean,
      noFocus: Boolean,
      fit: Boolean,
      cover: Boolean,
      square: Boolean,
      anchor: { type: String, validator: vo },
      self: { type: String, validator: vo },
      offset: { type: Array, validator: Jh },
      scrollTarget: { default: void 0 },
      touchPosition: Boolean,
      maxHeight: { type: String, default: null },
      maxWidth: { type: String, default: null },
    },
    emits: [...Hu, "click", "escapeKey"],
    setup(e, { slots: t, emit: r, attrs: a }) {
      let l = null,
        s,
        u,
        d;
      const f = Dt(),
        { proxy: g } = f,
        { $q: v } = g,
        T = se(null),
        M = se(!1),
        _ = I(() => e.persistent !== !0 && e.noRouteDismiss !== !0),
        P = ar(e, v),
        { registerTick: $, removeTick: L } = $a(),
        { registerTimeout: F } = oo(),
        { transitionProps: W, transitionStyle: D } = Ph(e),
        {
          localScrollTarget: A,
          changeScrollEvent: N,
          unconfigureScrollTarget: J,
        } = jh(e, fe),
        { anchorEl: z, canShow: H } = Qh({ showing: M }),
        { hide: pe } = Gu({
          showing: M,
          canShow: H,
          handleShow: X,
          handleHide: Z,
          hideOnRouteChange: _,
          processOnMount: !0,
        }),
        {
          showPortal: _e,
          hidePortal: Pe,
          renderPortal: lt,
        } = Ah(f, T, ft, "menu"),
        te = {
          anchorEl: z,
          innerRef: T,
          onClickOutside(ee) {
            if (e.persistent !== !0 && M.value === !0)
              return (
                pe(ee),
                (ee.type === "touchstart" ||
                  ee.target.classList.contains("q-dialog__backdrop")) &&
                  Ft(ee),
                !0
              );
          },
        },
        xe = I(() =>
          po(
            e.anchor || (e.cover === !0 ? "center middle" : "bottom start"),
            v.lang.rtl
          )
        ),
        Be = I(() =>
          e.cover === !0 ? xe.value : po(e.self || "top start", v.lang.rtl)
        ),
        j = I(
          () =>
            (e.square === !0 ? " q-menu--square" : "") +
            (P.value === !0 ? " q-menu--dark q-dark" : "")
        ),
        K = I(() => (e.autoClose === !0 ? { onClick: Ke } : {})),
        me = I(() => M.value === !0 && e.persistent !== !0);
      ze(me, (ee) => {
        ee === !0 ? ($b(we), Zh(te)) : (Xf(we), mo(te));
      });
      function rt() {
        Nh(() => {
          let ee = T.value;
          ee &&
            ee.contains(document.activeElement) !== !0 &&
            ((ee =
              ee.querySelector(
                "[autofocus][tabindex], [data-autofocus][tabindex]"
              ) ||
              ee.querySelector(
                "[autofocus] [tabindex], [data-autofocus] [tabindex]"
              ) ||
              ee.querySelector("[autofocus], [data-autofocus]") ||
              ee),
            ee.focus({ preventScroll: !0 }));
        });
      }
      function X(ee) {
        if (
          ((l = e.noRefocus === !1 ? document.activeElement : null),
          Oh(Ve),
          _e(),
          fe(),
          (s = void 0),
          ee !== void 0 && (e.touchPosition || e.contextMenu))
        ) {
          const wt = Du(ee);
          if (wt.left !== void 0) {
            const { top: nn, left: un } = z.value.getBoundingClientRect();
            s = { left: wt.left - un, top: wt.top - nn };
          }
        }
        u === void 0 &&
          (u = ze(
            () =>
              v.screen.width +
              "|" +
              v.screen.height +
              "|" +
              e.self +
              "|" +
              e.anchor +
              "|" +
              v.lang.rtl,
            Me
          )),
          e.noFocus !== !0 && document.activeElement.blur(),
          $(() => {
            Me(), e.noFocus !== !0 && rt();
          }),
          F(() => {
            v.platform.is.ios === !0 && ((d = e.autoClose), T.value.click()),
              Me(),
              _e(!0),
              r("show", ee);
          }, e.transitionDuration);
      }
      function Z(ee) {
        L(),
          Pe(),
          he(!0),
          l !== null &&
            (ee === void 0 || ee.qClickOutside !== !0) &&
            ((
              (ee && ee.type.indexOf("key") === 0
                ? l.closest('[tabindex]:not([tabindex^="-"])')
                : void 0) || l
            ).focus(),
            (l = null)),
          F(() => {
            Pe(!0), r("hide", ee);
          }, e.transitionDuration);
      }
      function he(ee) {
        (s = void 0),
          u !== void 0 && (u(), (u = void 0)),
          (ee === !0 || M.value === !0) && (Lh(Ve), J(), mo(te), Xf(we)),
          ee !== !0 && (l = null);
      }
      function fe() {
        (z.value !== null || e.scrollTarget !== void 0) &&
          ((A.value = Mo(z.value, e.scrollTarget)), N(A.value, Me));
      }
      function Ke(ee) {
        d !== !0 ? (Ib(g, ee), r("click", ee)) : (d = !1);
      }
      function Ve(ee) {
        me.value === !0 &&
          e.noFocus !== !0 &&
          Rb(T.value, ee.target) !== !0 &&
          rt();
      }
      function we(ee) {
        r("escapeKey"), pe(ee);
      }
      function Me() {
        ec({
          targetEl: T.value,
          offset: e.offset,
          anchorEl: z.value,
          anchorOrigin: xe.value,
          selfOrigin: Be.value,
          absoluteOffset: s,
          fit: e.fit,
          cover: e.cover,
          maxHeight: e.maxHeight,
          maxWidth: e.maxWidth,
        });
      }
      function ft() {
        return E(Ya, W.value, () =>
          M.value === !0
            ? E(
                "div",
                {
                  role: "menu",
                  ...a,
                  ref: T,
                  tabindex: -1,
                  class: ["q-menu q-position-engine scroll" + j.value, a.class],
                  style: [a.style, D.value],
                  ...K.value,
                },
                Mt(t.default)
              )
            : null
        );
      }
      return Ht(he), Object.assign(g, { focus: rt, updatePosition: Me }), lt;
    },
  });
const Dw = Object.keys(Bh),
  qw = (e) =>
    Dw.reduce((t, r) => {
      const a = e[r];
      return a !== void 0 && (t[r] = a), t;
    }, {});
var rg = Je({
    name: "QBtnDropdown",
    props: {
      ...Bh,
      ...Yu,
      modelValue: Boolean,
      split: Boolean,
      dropdownIcon: String,
      contentClass: [Array, String, Object],
      contentStyle: [Array, String, Object],
      cover: Boolean,
      persistent: Boolean,
      noRouteDismiss: Boolean,
      autoClose: Boolean,
      menuAnchor: { type: String, default: "bottom end" },
      menuSelf: { type: String, default: "top end" },
      menuOffset: Array,
      disableMainBtn: Boolean,
      disableDropdown: Boolean,
      noIconAnimation: Boolean,
      toggleAriaLabel: String,
    },
    emits: [
      "update:modelValue",
      "click",
      "beforeShow",
      "show",
      "beforeHide",
      "hide",
    ],
    setup(e, { slots: t, emit: r }) {
      const { proxy: a } = Dt(),
        l = se(e.modelValue),
        s = se(null),
        u = so(),
        d = I(() => {
          const A = {
            "aria-expanded": l.value === !0 ? "true" : "false",
            "aria-haspopup": "true",
            "aria-controls": u,
            "aria-label":
              e.toggleAriaLabel ||
              a.$q.lang.label[l.value === !0 ? "collapse" : "expand"](e.label),
          };
          return (
            (e.disable === !0 ||
              (e.split === !1 && e.disableMainBtn === !0) ||
              e.disableDropdown === !0) &&
              (A["aria-disabled"] = "true"),
            A
          );
        }),
        f = I(
          () =>
            "q-btn-dropdown__arrow" +
            (l.value === !0 && e.noIconAnimation === !1 ? " rotate-180" : "") +
            (e.split === !1 ? " q-btn-dropdown__arrow-container" : "")
        ),
        g = I(() => Ob(e)),
        v = I(() => qw(e));
      ze(
        () => e.modelValue,
        (A) => {
          s.value !== null && s.value[A ? "show" : "hide"]();
        }
      ),
        ze(() => e.split, D);
      function T(A) {
        (l.value = !0), r("beforeShow", A);
      }
      function M(A) {
        r("show", A), r("update:modelValue", !0);
      }
      function _(A) {
        (l.value = !1), r("beforeHide", A);
      }
      function P(A) {
        r("hide", A), r("update:modelValue", !1);
      }
      function $(A) {
        r("click", A);
      }
      function L(A) {
        gi(A), D(), r("click", A);
      }
      function F(A) {
        s.value !== null && s.value.toggle(A);
      }
      function W(A) {
        s.value !== null && s.value.show(A);
      }
      function D(A) {
        s.value !== null && s.value.hide(A);
      }
      return (
        Object.assign(a, { show: W, hide: D, toggle: F }),
        Xr(() => {
          e.modelValue === !0 && W();
        }),
        () => {
          const A = [
            E(Wt, {
              class: f.value,
              name: e.dropdownIcon || a.$q.iconSet.arrow.dropdown,
            }),
          ];
          return (
            e.disableDropdown !== !0 &&
              A.push(
                E(
                  ng,
                  {
                    ref: s,
                    id: u,
                    class: e.contentClass,
                    style: e.contentStyle,
                    cover: e.cover,
                    fit: !0,
                    persistent: e.persistent,
                    noRouteDismiss: e.noRouteDismiss,
                    autoClose: e.autoClose,
                    anchor: e.menuAnchor,
                    self: e.menuSelf,
                    offset: e.menuOffset,
                    separateClosePopup: !0,
                    transitionShow: e.transitionShow,
                    transitionHide: e.transitionHide,
                    transitionDuration: e.transitionDuration,
                    onBeforeShow: T,
                    onShow: M,
                    onBeforeHide: _,
                    onHide: P,
                  },
                  t.default
                )
              ),
            e.split === !1
              ? E(
                  ye,
                  {
                    class: "q-btn-dropdown q-btn-dropdown--simple",
                    ...v.value,
                    ...d.value,
                    disable: e.disable === !0 || e.disableMainBtn === !0,
                    noWrap: !0,
                    round: !1,
                    onClick: $,
                  },
                  {
                    default: () => Mt(t.label, []).concat(A),
                    loading: t.loading,
                  }
                )
              : E(
                  Mw,
                  {
                    class:
                      "q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",
                    rounded: e.rounded,
                    square: e.square,
                    ...g.value,
                    glossy: e.glossy,
                    stretch: e.stretch,
                  },
                  () => [
                    E(
                      ye,
                      {
                        class: "q-btn-dropdown--current",
                        ...v.value,
                        disable: e.disable === !0 || e.disableMainBtn === !0,
                        noWrap: !0,
                        round: !1,
                        onClick: L,
                      },
                      { default: t.label, loading: t.loading }
                    ),
                    E(
                      ye,
                      {
                        class: "q-btn-dropdown__arrow-container q-anchor--skip",
                        ...d.value,
                        ...g.value,
                        disable: e.disable === !0 || e.disableDropdown === !0,
                        rounded: e.rounded,
                        color: e.color,
                        textColor: e.textColor,
                        dense: e.dense,
                        size: e.size,
                        padding: e.padding,
                        ripple: e.ripple,
                      },
                      () => A
                    ),
                  ]
                )
          );
        }
      );
    },
  }),
  _r = Je({
    name: "QBreadcrumbsEl",
    props: {
      ...Do,
      label: String,
      icon: String,
      tag: { type: String, default: "span" },
    },
    emits: ["click"],
    setup(e, { slots: t }) {
      const {
          linkTag: r,
          linkAttrs: a,
          linkClass: l,
          navigateOnClick: s,
        } = $h(),
        u = I(() => ({
          class:
            "q-breadcrumbs__el q-link flex inline items-center relative-position " +
            (e.disable !== !0
              ? "q-link--focusable" + l.value
              : "q-breadcrumbs__el--disable"),
          ...a.value,
          onClick: s,
        })),
        d = I(
          () =>
            "q-breadcrumbs__el-icon" +
            (e.label !== void 0 ? " q-breadcrumbs__el-icon--with-label" : "")
        );
      return () => {
        const f = [];
        return (
          e.icon !== void 0 && f.push(E(Wt, { class: d.value, name: e.icon })),
          e.label !== void 0 && f.push(e.label),
          E(r.value, { ...u.value }, _i(t.default, f))
        );
      };
    },
  });
const xw = ["", !0];
var Pw = Je({
    name: "QBreadcrumbs",
    props: {
      ...Lb,
      separator: { type: String, default: "/" },
      separatorColor: String,
      activeColor: { type: String, default: "primary" },
      gutter: {
        type: String,
        validator: (e) => ["none", "xs", "sm", "md", "lg", "xl"].includes(e),
        default: "sm",
      },
    },
    setup(e, { slots: t }) {
      const r = Nb(e),
        a = I(
          () =>
            `flex items-center ${r.value}${
              e.gutter === "none" ? "" : ` q-gutter-${e.gutter}`
            }`
        ),
        l = I(() => (e.separatorColor ? ` text-${e.separatorColor}` : "")),
        s = I(() => ` text-${e.activeColor}`);
      return () => {
        const u = Ju(Mt(t.default));
        if (u.length === 0) return;
        let d = 1;
        const f = [],
          g = u.filter(
            (T) => T.type !== void 0 && T.type.name === "QBreadcrumbsEl"
          ).length,
          v = t.separator !== void 0 ? t.separator : () => e.separator;
        return (
          u.forEach((T) => {
            if (T.type !== void 0 && T.type.name === "QBreadcrumbsEl") {
              const M = d < g,
                _ = T.props !== null && xw.includes(T.props.disable),
                P =
                  (M === !0 ? "" : " q-breadcrumbs--last") +
                  (_ !== !0 && M === !0 ? s.value : "");
              d++,
                f.push(E("div", { class: `flex items-center${P}` }, [T])),
                M === !0 &&
                  f.push(
                    E(
                      "div",
                      { class: "q-breadcrumbs__separator" + l.value },
                      v()
                    )
                  );
            } else f.push(T);
          }),
          E("div", { class: "q-breadcrumbs" }, [
            E("div", { class: a.value }, f),
          ])
        );
      };
    },
  }),
  Aw = Je({
    name: "QPage",
    props: { padding: Boolean, styleFn: Function },
    setup(e, { slots: t }) {
      const {
          proxy: { $q: r },
        } = Dt(),
        a = uo(Bb, Sr);
      if (a === Sr)
        return console.error("QPage needs to be a deep child of QLayout"), Sr;
      if (uo(Fb, Sr) === Sr)
        return console.error("QPage needs to be child of QPageContainer"), Sr;
      const s = I(() => {
          const d =
            (a.header.space === !0 ? a.header.size : 0) +
            (a.footer.space === !0 ? a.footer.size : 0);
          if (typeof e.styleFn == "function") {
            const f =
              a.isContainer.value === !0
                ? a.containerHeight.value
                : r.screen.height;
            return e.styleFn(d, f);
          }
          return {
            minHeight:
              a.isContainer.value === !0
                ? a.containerHeight.value - d + "px"
                : r.screen.height === 0
                ? d !== 0
                  ? `calc(100vh - ${d}px)`
                  : "100vh"
                : r.screen.height - d + "px",
          };
        }),
        u = I(() => `q-page${e.padding === !0 ? " q-layout-padding" : ""}`);
      return () => E("main", { class: u.value, style: s.value }, Mt(t.default));
    },
  });
const Ew = E("div", { class: "q-space" });
var Iw = Je({
  name: "QSpace",
  setup() {
    return () => Ew;
  },
});
function dh(e) {
  if (e === !1) return 0;
  if (e === !0 || e === void 0) return 1;
  const t = parseInt(e, 10);
  return isNaN(t) ? 0 : t;
}
var Hi = Fh({
  name: "close-popup",
  beforeMount(e, { value: t }) {
    const r = {
      depth: dh(t),
      handler(a) {
        r.depth !== 0 &&
          setTimeout(() => {
            const l = Ub(e);
            l !== void 0 && Vb(l, a, r.depth);
          });
      },
      handlerKey(a) {
        Wa(a, 13) === !0 && r.handler(a);
      },
    };
    (e.__qclosepopup = r),
      e.addEventListener("click", r.handler),
      e.addEventListener("keyup", r.handlerKey);
  },
  updated(e, { value: t, oldValue: r }) {
    t !== r && (e.__qclosepopup.depth = dh(t));
  },
  beforeUnmount(e) {
    const t = e.__qclosepopup;
    e.removeEventListener("click", t.handler),
      e.removeEventListener("keyup", t.handlerKey),
      delete e.__qclosepopup;
  },
});
function $w() {
  return uo(zb);
}
var Ma =
    typeof globalThis != "undefined"
      ? globalThis
      : typeof window != "undefined"
      ? window
      : typeof global != "undefined"
      ? global
      : typeof self != "undefined"
      ? self
      : {},
  Rw = function () {
    return (
      typeof Promise == "function" &&
      Promise.prototype &&
      Promise.prototype.then
    );
  },
  ig = {},
  Mn = {};
let rc;
const Ow = [
  0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
  733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
  2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
];
Mn.getSymbolSize = function (t) {
  if (!t) throw new Error('"version" cannot be null or undefined');
  if (t < 1 || t > 40)
    throw new Error('"version" should be in range from 1 to 40');
  return t * 4 + 17;
};
Mn.getSymbolTotalCodewords = function (t) {
  return Ow[t];
};
Mn.getBCHDigit = function (e) {
  let t = 0;
  for (; e !== 0; ) t++, (e >>>= 1);
  return t;
};
Mn.setToSJISFunction = function (t) {
  if (typeof t != "function")
    throw new Error('"toSJISFunc" is not a valid function.');
  rc = t;
};
Mn.isKanjiModeEnabled = function () {
  return typeof rc != "undefined";
};
Mn.toSJIS = function (t) {
  return rc(t);
};
var qo = {};
(function (e) {
  (e.L = { bit: 1 }),
    (e.M = { bit: 0 }),
    (e.Q = { bit: 3 }),
    (e.H = { bit: 2 });
  function t(r) {
    if (typeof r != "string") throw new Error("Param is not a string");
    switch (r.toLowerCase()) {
      case "l":
      case "low":
        return e.L;
      case "m":
      case "medium":
        return e.M;
      case "q":
      case "quartile":
        return e.Q;
      case "h":
      case "high":
        return e.H;
      default:
        throw new Error("Unknown EC Level: " + r);
    }
  }
  (e.isValid = function (a) {
    return a && typeof a.bit != "undefined" && a.bit >= 0 && a.bit < 4;
  }),
    (e.from = function (a, l) {
      if (e.isValid(a)) return a;
      try {
        return t(a);
      } catch {
        return l;
      }
    });
})(qo);
function ag() {
  (this.buffer = []), (this.length = 0);
}
ag.prototype = {
  get: function (e) {
    const t = Math.floor(e / 8);
    return ((this.buffer[t] >>> (7 - (e % 8))) & 1) === 1;
  },
  put: function (e, t) {
    for (let r = 0; r < t; r++) this.putBit(((e >>> (t - r - 1)) & 1) === 1);
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (e) {
    const t = Math.floor(this.length / 8);
    this.buffer.length <= t && this.buffer.push(0),
      e && (this.buffer[t] |= 128 >>> this.length % 8),
      this.length++;
  },
};
var Lw = ag;
function Ga(e) {
  if (!e || e < 1)
    throw new Error("BitMatrix size must be defined and greater than 0");
  (this.size = e),
    (this.data = new Uint8Array(e * e)),
    (this.reservedBit = new Uint8Array(e * e));
}
Ga.prototype.set = function (e, t, r, a) {
  const l = e * this.size + t;
  (this.data[l] = r), a && (this.reservedBit[l] = !0);
};
Ga.prototype.get = function (e, t) {
  return this.data[e * this.size + t];
};
Ga.prototype.xor = function (e, t, r) {
  this.data[e * this.size + t] ^= r;
};
Ga.prototype.isReserved = function (e, t) {
  return this.reservedBit[e * this.size + t];
};
var Nw = Ga,
  lg = {};
(function (e) {
  const t = Mn.getSymbolSize;
  (e.getRowColCoords = function (a) {
    if (a === 1) return [];
    const l = Math.floor(a / 7) + 2,
      s = t(a),
      u = s === 145 ? 26 : Math.ceil((s - 13) / (2 * l - 2)) * 2,
      d = [s - 7];
    for (let f = 1; f < l - 1; f++) d[f] = d[f - 1] - u;
    return d.push(6), d.reverse();
  }),
    (e.getPositions = function (a) {
      const l = [],
        s = e.getRowColCoords(a),
        u = s.length;
      for (let d = 0; d < u; d++)
        for (let f = 0; f < u; f++)
          (d === 0 && f === 0) ||
            (d === 0 && f === u - 1) ||
            (d === u - 1 && f === 0) ||
            l.push([s[d], s[f]]);
      return l;
    });
})(lg);
var og = {};
const Bw = Mn.getSymbolSize,
  fh = 7;
og.getPositions = function (t) {
  const r = Bw(t);
  return [
    [0, 0],
    [r - fh, 0],
    [0, r - fh],
  ];
};
var sg = {};
(function (e) {
  e.Patterns = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
  };
  const t = { N1: 3, N2: 3, N3: 40, N4: 10 };
  (e.isValid = function (l) {
    return l != null && l !== "" && !isNaN(l) && l >= 0 && l <= 7;
  }),
    (e.from = function (l) {
      return e.isValid(l) ? parseInt(l, 10) : void 0;
    }),
    (e.getPenaltyN1 = function (l) {
      const s = l.size;
      let u = 0,
        d = 0,
        f = 0,
        g = null,
        v = null;
      for (let T = 0; T < s; T++) {
        (d = f = 0), (g = v = null);
        for (let M = 0; M < s; M++) {
          let _ = l.get(T, M);
          _ === g ? d++ : (d >= 5 && (u += t.N1 + (d - 5)), (g = _), (d = 1)),
            (_ = l.get(M, T)),
            _ === v ? f++ : (f >= 5 && (u += t.N1 + (f - 5)), (v = _), (f = 1));
        }
        d >= 5 && (u += t.N1 + (d - 5)), f >= 5 && (u += t.N1 + (f - 5));
      }
      return u;
    }),
    (e.getPenaltyN2 = function (l) {
      const s = l.size;
      let u = 0;
      for (let d = 0; d < s - 1; d++)
        for (let f = 0; f < s - 1; f++) {
          const g =
            l.get(d, f) +
            l.get(d, f + 1) +
            l.get(d + 1, f) +
            l.get(d + 1, f + 1);
          (g === 4 || g === 0) && u++;
        }
      return u * t.N2;
    }),
    (e.getPenaltyN3 = function (l) {
      const s = l.size;
      let u = 0,
        d = 0,
        f = 0;
      for (let g = 0; g < s; g++) {
        d = f = 0;
        for (let v = 0; v < s; v++)
          (d = ((d << 1) & 2047) | l.get(g, v)),
            v >= 10 && (d === 1488 || d === 93) && u++,
            (f = ((f << 1) & 2047) | l.get(v, g)),
            v >= 10 && (f === 1488 || f === 93) && u++;
      }
      return u * t.N3;
    }),
    (e.getPenaltyN4 = function (l) {
      let s = 0;
      const u = l.data.length;
      for (let f = 0; f < u; f++) s += l.data[f];
      return Math.abs(Math.ceil((s * 100) / u / 5) - 10) * t.N4;
    });
  function r(a, l, s) {
    switch (a) {
      case e.Patterns.PATTERN000:
        return (l + s) % 2 === 0;
      case e.Patterns.PATTERN001:
        return l % 2 === 0;
      case e.Patterns.PATTERN010:
        return s % 3 === 0;
      case e.Patterns.PATTERN011:
        return (l + s) % 3 === 0;
      case e.Patterns.PATTERN100:
        return (Math.floor(l / 2) + Math.floor(s / 3)) % 2 === 0;
      case e.Patterns.PATTERN101:
        return ((l * s) % 2) + ((l * s) % 3) === 0;
      case e.Patterns.PATTERN110:
        return (((l * s) % 2) + ((l * s) % 3)) % 2 === 0;
      case e.Patterns.PATTERN111:
        return (((l * s) % 3) + ((l + s) % 2)) % 2 === 0;
      default:
        throw new Error("bad maskPattern:" + a);
    }
  }
  (e.applyMask = function (l, s) {
    const u = s.size;
    for (let d = 0; d < u; d++)
      for (let f = 0; f < u; f++) s.isReserved(f, d) || s.xor(f, d, r(l, f, d));
  }),
    (e.getBestMask = function (l, s) {
      const u = Object.keys(e.Patterns).length;
      let d = 0,
        f = 1 / 0;
      for (let g = 0; g < u; g++) {
        s(g), e.applyMask(g, l);
        const v =
          e.getPenaltyN1(l) +
          e.getPenaltyN2(l) +
          e.getPenaltyN3(l) +
          e.getPenaltyN4(l);
        e.applyMask(g, l), v < f && ((f = v), (d = g));
      }
      return d;
    });
})(sg);
var xo = {};
const Gr = qo,
  Jl = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
    4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
    9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13,
    18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18,
    25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13,
    26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54,
    18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59,
    70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
  ],
  Xl = [
    7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
    88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192,
    72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352,
    120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448,
    532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442,
    644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312,
    588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050,
    1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510,
    924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064,
    1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860,
    2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
  ];
xo.getBlocksCount = function (t, r) {
  switch (r) {
    case Gr.L:
      return Jl[(t - 1) * 4 + 0];
    case Gr.M:
      return Jl[(t - 1) * 4 + 1];
    case Gr.Q:
      return Jl[(t - 1) * 4 + 2];
    case Gr.H:
      return Jl[(t - 1) * 4 + 3];
    default:
      return;
  }
};
xo.getTotalCodewordsCount = function (t, r) {
  switch (r) {
    case Gr.L:
      return Xl[(t - 1) * 4 + 0];
    case Gr.M:
      return Xl[(t - 1) * 4 + 1];
    case Gr.Q:
      return Xl[(t - 1) * 4 + 2];
    case Gr.H:
      return Xl[(t - 1) * 4 + 3];
    default:
      return;
  }
};
var ug = {},
  Po = {};
const Oa = new Uint8Array(512),
  yo = new Uint8Array(256);
(function () {
  let t = 1;
  for (let r = 0; r < 255; r++)
    (Oa[r] = t), (yo[t] = r), (t <<= 1), t & 256 && (t ^= 285);
  for (let r = 255; r < 512; r++) Oa[r] = Oa[r - 255];
})();
Po.log = function (t) {
  if (t < 1) throw new Error("log(" + t + ")");
  return yo[t];
};
Po.exp = function (t) {
  return Oa[t];
};
Po.mul = function (t, r) {
  return t === 0 || r === 0 ? 0 : Oa[yo[t] + yo[r]];
};
(function (e) {
  const t = Po;
  (e.mul = function (a, l) {
    const s = new Uint8Array(a.length + l.length - 1);
    for (let u = 0; u < a.length; u++)
      for (let d = 0; d < l.length; d++) s[u + d] ^= t.mul(a[u], l[d]);
    return s;
  }),
    (e.mod = function (a, l) {
      let s = new Uint8Array(a);
      for (; s.length - l.length >= 0; ) {
        const u = s[0];
        for (let f = 0; f < l.length; f++) s[f] ^= t.mul(l[f], u);
        let d = 0;
        for (; d < s.length && s[d] === 0; ) d++;
        s = s.slice(d);
      }
      return s;
    }),
    (e.generateECPolynomial = function (a) {
      let l = new Uint8Array([1]);
      for (let s = 0; s < a; s++) l = e.mul(l, new Uint8Array([1, t.exp(s)]));
      return l;
    });
})(ug);
const cg = ug;
function ic(e) {
  (this.genPoly = void 0),
    (this.degree = e),
    this.degree && this.initialize(this.degree);
}
ic.prototype.initialize = function (t) {
  (this.degree = t), (this.genPoly = cg.generateECPolynomial(this.degree));
};
ic.prototype.encode = function (t) {
  if (!this.genPoly) throw new Error("Encoder not initialized");
  const r = new Uint8Array(t.length + this.degree);
  r.set(t);
  const a = cg.mod(r, this.genPoly),
    l = this.degree - a.length;
  if (l > 0) {
    const s = new Uint8Array(this.degree);
    return s.set(a, l), s;
  }
  return a;
};
var Fw = ic,
  dg = {},
  ei = {},
  ac = {};
ac.isValid = function (t) {
  return !isNaN(t) && t >= 1 && t <= 40;
};
var lr = {};
const fg = "[0-9]+",
  Uw = "[A-Z $%*+\\-./:]+";
let Fa =
  "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
Fa = Fa.replace(/u/g, "\\u");
const Vw =
  "(?:(?![A-Z0-9 $%*+\\-./:]|" +
  Fa +
  `)(?:.|[\r
]))+`;
lr.KANJI = new RegExp(Fa, "g");
lr.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
lr.BYTE = new RegExp(Vw, "g");
lr.NUMERIC = new RegExp(fg, "g");
lr.ALPHANUMERIC = new RegExp(Uw, "g");
const zw = new RegExp("^" + Fa + "$"),
  Ww = new RegExp("^" + fg + "$"),
  Yw = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
lr.testKanji = function (t) {
  return zw.test(t);
};
lr.testNumeric = function (t) {
  return Ww.test(t);
};
lr.testAlphanumeric = function (t) {
  return Yw.test(t);
};
(function (e) {
  const t = ac,
    r = lr;
  (e.NUMERIC = { id: "Numeric", bit: 1 << 0, ccBits: [10, 12, 14] }),
    (e.ALPHANUMERIC = { id: "Alphanumeric", bit: 1 << 1, ccBits: [9, 11, 13] }),
    (e.BYTE = { id: "Byte", bit: 1 << 2, ccBits: [8, 16, 16] }),
    (e.KANJI = { id: "Kanji", bit: 1 << 3, ccBits: [8, 10, 12] }),
    (e.MIXED = { bit: -1 }),
    (e.getCharCountIndicator = function (s, u) {
      if (!s.ccBits) throw new Error("Invalid mode: " + s);
      if (!t.isValid(u)) throw new Error("Invalid version: " + u);
      return u >= 1 && u < 10
        ? s.ccBits[0]
        : u < 27
        ? s.ccBits[1]
        : s.ccBits[2];
    }),
    (e.getBestModeForData = function (s) {
      return r.testNumeric(s)
        ? e.NUMERIC
        : r.testAlphanumeric(s)
        ? e.ALPHANUMERIC
        : r.testKanji(s)
        ? e.KANJI
        : e.BYTE;
    }),
    (e.toString = function (s) {
      if (s && s.id) return s.id;
      throw new Error("Invalid mode");
    }),
    (e.isValid = function (s) {
      return s && s.bit && s.ccBits;
    });
  function a(l) {
    if (typeof l != "string") throw new Error("Param is not a string");
    switch (l.toLowerCase()) {
      case "numeric":
        return e.NUMERIC;
      case "alphanumeric":
        return e.ALPHANUMERIC;
      case "kanji":
        return e.KANJI;
      case "byte":
        return e.BYTE;
      default:
        throw new Error("Unknown mode: " + l);
    }
  }
  e.from = function (s, u) {
    if (e.isValid(s)) return s;
    try {
      return a(s);
    } catch {
      return u;
    }
  };
})(ei);
(function (e) {
  const t = Mn,
    r = xo,
    a = qo,
    l = ei,
    s = ac,
    u =
      (1 << 12) |
      (1 << 11) |
      (1 << 10) |
      (1 << 9) |
      (1 << 8) |
      (1 << 5) |
      (1 << 2) |
      (1 << 0),
    d = t.getBCHDigit(u);
  function f(M, _, P) {
    for (let $ = 1; $ <= 40; $++) if (_ <= e.getCapacity($, P, M)) return $;
  }
  function g(M, _) {
    return l.getCharCountIndicator(M, _) + 4;
  }
  function v(M, _) {
    let P = 0;
    return (
      M.forEach(function ($) {
        P += g($.mode, _) + $.getBitsLength();
      }),
      P
    );
  }
  function T(M, _) {
    for (let P = 1; P <= 40; P++)
      if (v(M, P) <= e.getCapacity(P, _, l.MIXED)) return P;
  }
  (e.from = function (_, P) {
    return s.isValid(_) ? parseInt(_, 10) : P;
  }),
    (e.getCapacity = function (_, P, $) {
      if (!s.isValid(_)) throw new Error("Invalid QR Code version");
      typeof $ == "undefined" && ($ = l.BYTE);
      const L = t.getSymbolTotalCodewords(_),
        F = r.getTotalCodewordsCount(_, P),
        W = (L - F) * 8;
      if ($ === l.MIXED) return W;
      const D = W - g($, _);
      switch ($) {
        case l.NUMERIC:
          return Math.floor((D / 10) * 3);
        case l.ALPHANUMERIC:
          return Math.floor((D / 11) * 2);
        case l.KANJI:
          return Math.floor(D / 13);
        case l.BYTE:
        default:
          return Math.floor(D / 8);
      }
    }),
    (e.getBestVersionForData = function (_, P) {
      let $;
      const L = a.from(P, a.M);
      if (Array.isArray(_)) {
        if (_.length > 1) return T(_, L);
        if (_.length === 0) return 1;
        $ = _[0];
      } else $ = _;
      return f($.mode, $.getLength(), L);
    }),
    (e.getEncodedBits = function (_) {
      if (!s.isValid(_) || _ < 7) throw new Error("Invalid QR Code version");
      let P = _ << 12;
      for (; t.getBCHDigit(P) - d >= 0; ) P ^= u << (t.getBCHDigit(P) - d);
      return (_ << 12) | P;
    });
})(dg);
var hg = {};
const Eu = Mn,
  gg =
    (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
  Hw = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1),
  hh = Eu.getBCHDigit(gg);
hg.getEncodedBits = function (t, r) {
  const a = (t.bit << 3) | r;
  let l = a << 10;
  for (; Eu.getBCHDigit(l) - hh >= 0; ) l ^= gg << (Eu.getBCHDigit(l) - hh);
  return ((a << 10) | l) ^ Hw;
};
var mg = {};
const Gw = ei;
function ea(e) {
  (this.mode = Gw.NUMERIC), (this.data = e.toString());
}
ea.getBitsLength = function (t) {
  return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
};
ea.prototype.getLength = function () {
  return this.data.length;
};
ea.prototype.getBitsLength = function () {
  return ea.getBitsLength(this.data.length);
};
ea.prototype.write = function (t) {
  let r, a, l;
  for (r = 0; r + 3 <= this.data.length; r += 3)
    (a = this.data.substr(r, 3)), (l = parseInt(a, 10)), t.put(l, 10);
  const s = this.data.length - r;
  s > 0 &&
    ((a = this.data.substr(r)), (l = parseInt(a, 10)), t.put(l, s * 3 + 1));
};
var Kw = ea;
const Qw = ei,
  gu = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":",
  ];
function ta(e) {
  (this.mode = Qw.ALPHANUMERIC), (this.data = e);
}
ta.getBitsLength = function (t) {
  return 11 * Math.floor(t / 2) + 6 * (t % 2);
};
ta.prototype.getLength = function () {
  return this.data.length;
};
ta.prototype.getBitsLength = function () {
  return ta.getBitsLength(this.data.length);
};
ta.prototype.write = function (t) {
  let r;
  for (r = 0; r + 2 <= this.data.length; r += 2) {
    let a = gu.indexOf(this.data[r]) * 45;
    (a += gu.indexOf(this.data[r + 1])), t.put(a, 11);
  }
  this.data.length % 2 && t.put(gu.indexOf(this.data[r]), 6);
};
var jw = ta,
  Zw = function (t) {
    for (var r = [], a = t.length, l = 0; l < a; l++) {
      var s = t.charCodeAt(l);
      if (s >= 55296 && s <= 56319 && a > l + 1) {
        var u = t.charCodeAt(l + 1);
        u >= 56320 &&
          u <= 57343 &&
          ((s = (s - 55296) * 1024 + u - 56320 + 65536), (l += 1));
      }
      if (s < 128) {
        r.push(s);
        continue;
      }
      if (s < 2048) {
        r.push((s >> 6) | 192), r.push((s & 63) | 128);
        continue;
      }
      if (s < 55296 || (s >= 57344 && s < 65536)) {
        r.push((s >> 12) | 224),
          r.push(((s >> 6) & 63) | 128),
          r.push((s & 63) | 128);
        continue;
      }
      if (s >= 65536 && s <= 1114111) {
        r.push((s >> 18) | 240),
          r.push(((s >> 12) & 63) | 128),
          r.push(((s >> 6) & 63) | 128),
          r.push((s & 63) | 128);
        continue;
      }
      r.push(239, 191, 189);
    }
    return new Uint8Array(r).buffer;
  };
const Jw = Zw,
  Xw = ei;
function na(e) {
  (this.mode = Xw.BYTE),
    typeof e == "string" && (e = Jw(e)),
    (this.data = new Uint8Array(e));
}
na.getBitsLength = function (t) {
  return t * 8;
};
na.prototype.getLength = function () {
  return this.data.length;
};
na.prototype.getBitsLength = function () {
  return na.getBitsLength(this.data.length);
};
na.prototype.write = function (e) {
  for (let t = 0, r = this.data.length; t < r; t++) e.put(this.data[t], 8);
};
var eS = na;
const tS = ei,
  nS = Mn;
function ra(e) {
  (this.mode = tS.KANJI), (this.data = e);
}
ra.getBitsLength = function (t) {
  return t * 13;
};
ra.prototype.getLength = function () {
  return this.data.length;
};
ra.prototype.getBitsLength = function () {
  return ra.getBitsLength(this.data.length);
};
ra.prototype.write = function (e) {
  let t;
  for (t = 0; t < this.data.length; t++) {
    let r = nS.toSJIS(this.data[t]);
    if (r >= 33088 && r <= 40956) r -= 33088;
    else if (r >= 57408 && r <= 60351) r -= 49472;
    else
      throw new Error(
        "Invalid SJIS character: " +
          this.data[t] +
          `
Make sure your charset is UTF-8`
      );
    (r = ((r >>> 8) & 255) * 192 + (r & 255)), e.put(r, 13);
  }
};
var rS = ra,
  vg = { exports: {} };
(function (e) {
  var t = {
    single_source_shortest_paths: function (r, a, l) {
      var s = {},
        u = {};
      u[a] = 0;
      var d = t.PriorityQueue.make();
      d.push(a, 0);
      for (var f, g, v, T, M, _, P, $, L; !d.empty(); ) {
        (f = d.pop()), (g = f.value), (T = f.cost), (M = r[g] || {});
        for (v in M)
          M.hasOwnProperty(v) &&
            ((_ = M[v]),
            (P = T + _),
            ($ = u[v]),
            (L = typeof u[v] == "undefined"),
            (L || $ > P) && ((u[v] = P), d.push(v, P), (s[v] = g)));
      }
      if (typeof l != "undefined" && typeof u[l] == "undefined") {
        var F = ["Could not find a path from ", a, " to ", l, "."].join("");
        throw new Error(F);
      }
      return s;
    },
    extract_shortest_path_from_predecessor_list: function (r, a) {
      for (var l = [], s = a; s; ) l.push(s), r[s], (s = r[s]);
      return l.reverse(), l;
    },
    find_path: function (r, a, l) {
      var s = t.single_source_shortest_paths(r, a, l);
      return t.extract_shortest_path_from_predecessor_list(s, l);
    },
    PriorityQueue: {
      make: function (r) {
        var a = t.PriorityQueue,
          l = {},
          s;
        r = r || {};
        for (s in a) a.hasOwnProperty(s) && (l[s] = a[s]);
        return (l.queue = []), (l.sorter = r.sorter || a.default_sorter), l;
      },
      default_sorter: function (r, a) {
        return r.cost - a.cost;
      },
      push: function (r, a) {
        var l = { value: r, cost: a };
        this.queue.push(l), this.queue.sort(this.sorter);
      },
      pop: function () {
        return this.queue.shift();
      },
      empty: function () {
        return this.queue.length === 0;
      },
    },
  };
  e.exports = t;
})(vg);
(function (e) {
  const t = ei,
    r = Kw,
    a = jw,
    l = eS,
    s = rS,
    u = lr,
    d = Mn,
    f = vg.exports;
  function g(F) {
    return unescape(encodeURIComponent(F)).length;
  }
  function v(F, W, D) {
    const A = [];
    let N;
    for (; (N = F.exec(D)) !== null; )
      A.push({ data: N[0], index: N.index, mode: W, length: N[0].length });
    return A;
  }
  function T(F) {
    const W = v(u.NUMERIC, t.NUMERIC, F),
      D = v(u.ALPHANUMERIC, t.ALPHANUMERIC, F);
    let A, N;
    return (
      d.isKanjiModeEnabled()
        ? ((A = v(u.BYTE, t.BYTE, F)), (N = v(u.KANJI, t.KANJI, F)))
        : ((A = v(u.BYTE_KANJI, t.BYTE, F)), (N = [])),
      W.concat(D, A, N)
        .sort(function (z, H) {
          return z.index - H.index;
        })
        .map(function (z) {
          return { data: z.data, mode: z.mode, length: z.length };
        })
    );
  }
  function M(F, W) {
    switch (W) {
      case t.NUMERIC:
        return r.getBitsLength(F);
      case t.ALPHANUMERIC:
        return a.getBitsLength(F);
      case t.KANJI:
        return s.getBitsLength(F);
      case t.BYTE:
        return l.getBitsLength(F);
    }
  }
  function _(F) {
    return F.reduce(function (W, D) {
      const A = W.length - 1 >= 0 ? W[W.length - 1] : null;
      return A && A.mode === D.mode
        ? ((W[W.length - 1].data += D.data), W)
        : (W.push(D), W);
    }, []);
  }
  function P(F) {
    const W = [];
    for (let D = 0; D < F.length; D++) {
      const A = F[D];
      switch (A.mode) {
        case t.NUMERIC:
          W.push([
            A,
            { data: A.data, mode: t.ALPHANUMERIC, length: A.length },
            { data: A.data, mode: t.BYTE, length: A.length },
          ]);
          break;
        case t.ALPHANUMERIC:
          W.push([A, { data: A.data, mode: t.BYTE, length: A.length }]);
          break;
        case t.KANJI:
          W.push([A, { data: A.data, mode: t.BYTE, length: g(A.data) }]);
          break;
        case t.BYTE:
          W.push([{ data: A.data, mode: t.BYTE, length: g(A.data) }]);
      }
    }
    return W;
  }
  function $(F, W) {
    const D = {},
      A = { start: {} };
    let N = ["start"];
    for (let J = 0; J < F.length; J++) {
      const z = F[J],
        H = [];
      for (let pe = 0; pe < z.length; pe++) {
        const _e = z[pe],
          Pe = "" + J + pe;
        H.push(Pe), (D[Pe] = { node: _e, lastCount: 0 }), (A[Pe] = {});
        for (let lt = 0; lt < N.length; lt++) {
          const te = N[lt];
          D[te] && D[te].node.mode === _e.mode
            ? ((A[te][Pe] =
                M(D[te].lastCount + _e.length, _e.mode) -
                M(D[te].lastCount, _e.mode)),
              (D[te].lastCount += _e.length))
            : (D[te] && (D[te].lastCount = _e.length),
              (A[te][Pe] =
                M(_e.length, _e.mode) +
                4 +
                t.getCharCountIndicator(_e.mode, W)));
        }
      }
      N = H;
    }
    for (let J = 0; J < N.length; J++) A[N[J]].end = 0;
    return { map: A, table: D };
  }
  function L(F, W) {
    let D;
    const A = t.getBestModeForData(F);
    if (((D = t.from(W, A)), D !== t.BYTE && D.bit < A.bit))
      throw new Error(
        '"' +
          F +
          '" cannot be encoded with mode ' +
          t.toString(D) +
          `.
 Suggested mode is: ` +
          t.toString(A)
      );
    switch ((D === t.KANJI && !d.isKanjiModeEnabled() && (D = t.BYTE), D)) {
      case t.NUMERIC:
        return new r(F);
      case t.ALPHANUMERIC:
        return new a(F);
      case t.KANJI:
        return new s(F);
      case t.BYTE:
        return new l(F);
    }
  }
  (e.fromArray = function (W) {
    return W.reduce(function (D, A) {
      return (
        typeof A == "string"
          ? D.push(L(A, null))
          : A.data && D.push(L(A.data, A.mode)),
        D
      );
    }, []);
  }),
    (e.fromString = function (W, D) {
      const A = T(W, d.isKanjiModeEnabled()),
        N = P(A),
        J = $(N, D),
        z = f.find_path(J.map, "start", "end"),
        H = [];
      for (let pe = 1; pe < z.length - 1; pe++) H.push(J.table[z[pe]].node);
      return e.fromArray(_(H));
    }),
    (e.rawSplit = function (W) {
      return e.fromArray(T(W, d.isKanjiModeEnabled()));
    });
})(mg);
const Ao = Mn,
  mu = qo,
  iS = Lw,
  aS = Nw,
  lS = lg,
  oS = og,
  Iu = sg,
  $u = xo,
  sS = Fw,
  _o = dg,
  uS = hg,
  cS = ei,
  vu = mg;
function dS(e, t) {
  const r = e.size,
    a = oS.getPositions(t);
  for (let l = 0; l < a.length; l++) {
    const s = a[l][0],
      u = a[l][1];
    for (let d = -1; d <= 7; d++)
      if (!(s + d <= -1 || r <= s + d))
        for (let f = -1; f <= 7; f++)
          u + f <= -1 ||
            r <= u + f ||
            ((d >= 0 && d <= 6 && (f === 0 || f === 6)) ||
            (f >= 0 && f <= 6 && (d === 0 || d === 6)) ||
            (d >= 2 && d <= 4 && f >= 2 && f <= 4)
              ? e.set(s + d, u + f, !0, !0)
              : e.set(s + d, u + f, !1, !0));
  }
}
function fS(e) {
  const t = e.size;
  for (let r = 8; r < t - 8; r++) {
    const a = r % 2 === 0;
    e.set(r, 6, a, !0), e.set(6, r, a, !0);
  }
}
function hS(e, t) {
  const r = lS.getPositions(t);
  for (let a = 0; a < r.length; a++) {
    const l = r[a][0],
      s = r[a][1];
    for (let u = -2; u <= 2; u++)
      for (let d = -2; d <= 2; d++)
        u === -2 || u === 2 || d === -2 || d === 2 || (u === 0 && d === 0)
          ? e.set(l + u, s + d, !0, !0)
          : e.set(l + u, s + d, !1, !0);
  }
}
function gS(e, t) {
  const r = e.size,
    a = _o.getEncodedBits(t);
  let l, s, u;
  for (let d = 0; d < 18; d++)
    (l = Math.floor(d / 3)),
      (s = (d % 3) + r - 8 - 3),
      (u = ((a >> d) & 1) === 1),
      e.set(l, s, u, !0),
      e.set(s, l, u, !0);
}
function pu(e, t, r) {
  const a = e.size,
    l = uS.getEncodedBits(t, r);
  let s, u;
  for (s = 0; s < 15; s++)
    (u = ((l >> s) & 1) === 1),
      s < 6
        ? e.set(s, 8, u, !0)
        : s < 8
        ? e.set(s + 1, 8, u, !0)
        : e.set(a - 15 + s, 8, u, !0),
      s < 8
        ? e.set(8, a - s - 1, u, !0)
        : s < 9
        ? e.set(8, 15 - s - 1 + 1, u, !0)
        : e.set(8, 15 - s - 1, u, !0);
  e.set(a - 8, 8, 1, !0);
}
function mS(e, t) {
  const r = e.size;
  let a = -1,
    l = r - 1,
    s = 7,
    u = 0;
  for (let d = r - 1; d > 0; d -= 2)
    for (d === 6 && d--; ; ) {
      for (let f = 0; f < 2; f++)
        if (!e.isReserved(l, d - f)) {
          let g = !1;
          u < t.length && (g = ((t[u] >>> s) & 1) === 1),
            e.set(l, d - f, g),
            s--,
            s === -1 && (u++, (s = 7));
        }
      if (((l += a), l < 0 || r <= l)) {
        (l -= a), (a = -a);
        break;
      }
    }
}
function vS(e, t, r) {
  const a = new iS();
  r.forEach(function (f) {
    a.put(f.mode.bit, 4),
      a.put(f.getLength(), cS.getCharCountIndicator(f.mode, e)),
      f.write(a);
  });
  const l = Ao.getSymbolTotalCodewords(e),
    s = $u.getTotalCodewordsCount(e, t),
    u = (l - s) * 8;
  for (
    a.getLengthInBits() + 4 <= u && a.put(0, 4);
    a.getLengthInBits() % 8 !== 0;

  )
    a.putBit(0);
  const d = (u - a.getLengthInBits()) / 8;
  for (let f = 0; f < d; f++) a.put(f % 2 ? 17 : 236, 8);
  return pS(a, e, t);
}
function pS(e, t, r) {
  const a = Ao.getSymbolTotalCodewords(t),
    l = $u.getTotalCodewordsCount(t, r),
    s = a - l,
    u = $u.getBlocksCount(t, r),
    d = a % u,
    f = u - d,
    g = Math.floor(a / u),
    v = Math.floor(s / u),
    T = v + 1,
    M = g - v,
    _ = new sS(M);
  let P = 0;
  const $ = new Array(u),
    L = new Array(u);
  let F = 0;
  const W = new Uint8Array(e.buffer);
  for (let z = 0; z < u; z++) {
    const H = z < f ? v : T;
    ($[z] = W.slice(P, P + H)),
      (L[z] = _.encode($[z])),
      (P += H),
      (F = Math.max(F, H));
  }
  const D = new Uint8Array(a);
  let A = 0,
    N,
    J;
  for (N = 0; N < F; N++)
    for (J = 0; J < u; J++) N < $[J].length && (D[A++] = $[J][N]);
  for (N = 0; N < M; N++) for (J = 0; J < u; J++) D[A++] = L[J][N];
  return D;
}
function yS(e, t, r, a) {
  let l;
  if (Array.isArray(e)) l = vu.fromArray(e);
  else if (typeof e == "string") {
    let g = t;
    if (!g) {
      const v = vu.rawSplit(e);
      g = _o.getBestVersionForData(v, r);
    }
    l = vu.fromString(e, g || 40);
  } else throw new Error("Invalid data");
  const s = _o.getBestVersionForData(l, r);
  if (!s)
    throw new Error("The amount of data is too big to be stored in a QR Code");
  if (!t) t = s;
  else if (t < s)
    throw new Error(
      `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` +
        s +
        `.
`
    );
  const u = vS(t, r, l),
    d = Ao.getSymbolSize(t),
    f = new aS(d);
  return (
    dS(f, t),
    fS(f),
    hS(f, t),
    pu(f, r, 0),
    t >= 7 && gS(f, t),
    mS(f, u),
    isNaN(a) && (a = Iu.getBestMask(f, pu.bind(null, f, r))),
    Iu.applyMask(a, f),
    pu(f, r, a),
    {
      modules: f,
      version: t,
      errorCorrectionLevel: r,
      maskPattern: a,
      segments: l,
    }
  );
}
ig.create = function (t, r) {
  if (typeof t == "undefined" || t === "") throw new Error("No input text");
  let a = mu.M,
    l,
    s;
  return (
    typeof r != "undefined" &&
      ((a = mu.from(r.errorCorrectionLevel, mu.M)),
      (l = _o.from(r.version)),
      (s = Iu.from(r.maskPattern)),
      r.toSJISFunc && Ao.setToSJISFunction(r.toSJISFunc)),
    yS(t, l, a, s)
  );
};
var pg = {},
  lc = {};
(function (e) {
  function t(r) {
    if ((typeof r == "number" && (r = r.toString()), typeof r != "string"))
      throw new Error("Color should be defined as hex string");
    let a = r.slice().replace("#", "").split("");
    if (a.length < 3 || a.length === 5 || a.length > 8)
      throw new Error("Invalid hex color: " + r);
    (a.length === 3 || a.length === 4) &&
      (a = Array.prototype.concat.apply(
        [],
        a.map(function (s) {
          return [s, s];
        })
      )),
      a.length === 6 && a.push("F", "F");
    const l = parseInt(a.join(""), 16);
    return {
      r: (l >> 24) & 255,
      g: (l >> 16) & 255,
      b: (l >> 8) & 255,
      a: l & 255,
      hex: "#" + a.slice(0, 6).join(""),
    };
  }
  (e.getOptions = function (a) {
    a || (a = {}), a.color || (a.color = {});
    const l =
        typeof a.margin == "undefined" || a.margin === null || a.margin < 0
          ? 4
          : a.margin,
      s = a.width && a.width >= 21 ? a.width : void 0,
      u = a.scale || 4;
    return {
      width: s,
      scale: s ? 4 : u,
      margin: l,
      color: {
        dark: t(a.color.dark || "#000000ff"),
        light: t(a.color.light || "#ffffffff"),
      },
      type: a.type,
      rendererOpts: a.rendererOpts || {},
    };
  }),
    (e.getScale = function (a, l) {
      return l.width && l.width >= a + l.margin * 2
        ? l.width / (a + l.margin * 2)
        : l.scale;
    }),
    (e.getImageWidth = function (a, l) {
      const s = e.getScale(a, l);
      return Math.floor((a + l.margin * 2) * s);
    }),
    (e.qrToImageData = function (a, l, s) {
      const u = l.modules.size,
        d = l.modules.data,
        f = e.getScale(u, s),
        g = Math.floor((u + s.margin * 2) * f),
        v = s.margin * f,
        T = [s.color.light, s.color.dark];
      for (let M = 0; M < g; M++)
        for (let _ = 0; _ < g; _++) {
          let P = (M * g + _) * 4,
            $ = s.color.light;
          if (M >= v && _ >= v && M < g - v && _ < g - v) {
            const L = Math.floor((M - v) / f),
              F = Math.floor((_ - v) / f);
            $ = T[d[L * u + F] ? 1 : 0];
          }
          (a[P++] = $.r), (a[P++] = $.g), (a[P++] = $.b), (a[P] = $.a);
        }
    });
})(lc);
(function (e) {
  const t = lc;
  function r(l, s, u) {
    l.clearRect(0, 0, s.width, s.height),
      s.style || (s.style = {}),
      (s.height = u),
      (s.width = u),
      (s.style.height = u + "px"),
      (s.style.width = u + "px");
  }
  function a() {
    try {
      return document.createElement("canvas");
    } catch {
      throw new Error("You need to specify a canvas element");
    }
  }
  (e.render = function (s, u, d) {
    let f = d,
      g = u;
    typeof f == "undefined" && (!u || !u.getContext) && ((f = u), (u = void 0)),
      u || (g = a()),
      (f = t.getOptions(f));
    const v = t.getImageWidth(s.modules.size, f),
      T = g.getContext("2d"),
      M = T.createImageData(v, v);
    return (
      t.qrToImageData(M.data, s, f), r(T, g, v), T.putImageData(M, 0, 0), g
    );
  }),
    (e.renderToDataURL = function (s, u, d) {
      let f = d;
      typeof f == "undefined" &&
        (!u || !u.getContext) &&
        ((f = u), (u = void 0)),
        f || (f = {});
      const g = e.render(s, u, f),
        v = f.type || "image/png",
        T = f.rendererOpts || {};
      return g.toDataURL(v, T.quality);
    });
})(pg);
var yg = {};
const _S = lc;
function gh(e, t) {
  const r = e.a / 255,
    a = t + '="' + e.hex + '"';
  return r < 1 ? a + " " + t + '-opacity="' + r.toFixed(2).slice(1) + '"' : a;
}
function yu(e, t, r) {
  let a = e + t;
  return typeof r != "undefined" && (a += " " + r), a;
}
function bS(e, t, r) {
  let a = "",
    l = 0,
    s = !1,
    u = 0;
  for (let d = 0; d < e.length; d++) {
    const f = Math.floor(d % t),
      g = Math.floor(d / t);
    !f && !s && (s = !0),
      e[d]
        ? (u++,
          (d > 0 && f > 0 && e[d - 1]) ||
            ((a += s ? yu("M", f + r, 0.5 + g + r) : yu("m", l, 0)),
            (l = 0),
            (s = !1)),
          (f + 1 < t && e[d + 1]) || ((a += yu("h", u)), (u = 0)))
        : l++;
  }
  return a;
}
yg.render = function (t, r, a) {
  const l = _S.getOptions(r),
    s = t.modules.size,
    u = t.modules.data,
    d = s + l.margin * 2,
    f = l.color.light.a
      ? "<path " +
        gh(l.color.light, "fill") +
        ' d="M0 0h' +
        d +
        "v" +
        d +
        'H0z"/>'
      : "",
    g =
      "<path " +
      gh(l.color.dark, "stroke") +
      ' d="' +
      bS(u, s, l.margin) +
      '"/>',
    v = 'viewBox="0 0 ' + d + " " + d + '"',
    T = l.width ? 'width="' + l.width + '" height="' + l.width + '" ' : "",
    M =
      '<svg xmlns="http://www.w3.org/2000/svg" ' +
      T +
      v +
      ' shape-rendering="crispEdges">' +
      f +
      g +
      `</svg>
`;
  return typeof a == "function" && a(null, M), M;
};
const wS = Rw,
  Ru = ig,
  _g = pg,
  SS = yg;
function oc(e, t, r, a, l) {
  const s = [].slice.call(arguments, 1),
    u = s.length,
    d = typeof s[u - 1] == "function";
  if (!d && !wS()) throw new Error("Callback required as last argument");
  if (d) {
    if (u < 2) throw new Error("Too few arguments provided");
    u === 2
      ? ((l = r), (r = t), (t = a = void 0))
      : u === 3 &&
        (t.getContext && typeof l == "undefined"
          ? ((l = a), (a = void 0))
          : ((l = a), (a = r), (r = t), (t = void 0)));
  } else {
    if (u < 1) throw new Error("Too few arguments provided");
    return (
      u === 1
        ? ((r = t), (t = a = void 0))
        : u === 2 && !t.getContext && ((a = r), (r = t), (t = void 0)),
      new Promise(function (f, g) {
        try {
          const v = Ru.create(r, a);
          f(e(v, t, a));
        } catch (v) {
          g(v);
        }
      })
    );
  }
  try {
    const f = Ru.create(r, a);
    l(null, e(f, t, a));
  } catch (f) {
    l(f);
  }
}
Ru.create;
var kS = oc.bind(null, _g.render),
  CS = oc.bind(null, _g.renderToDataURL),
  TS = oc.bind(null, function (e, t, r) {
    return SS.render(e, r);
  });
/*! vue-qrcode v2.0.0 | (c) 2018-present Chen Fengyuan | MIT */ const mh =
  "ready";
var MS = sn({
  name: "VueQrcode",
  props: {
    value: { type: String, default: void 0 },
    options: { type: Object, default: void 0 },
    tag: { type: String, default: "canvas" },
  },
  emits: [mh],
  watch: {
    $props: {
      deep: !0,
      immediate: !0,
      handler() {
        this.$el && this.generate();
      },
    },
  },
  mounted() {
    this.generate();
  },
  methods: {
    generate() {
      const e = this.options || {},
        t = String(this.value),
        r = () => {
          this.$emit(mh, this.$el);
        };
      switch (this.tag) {
        case "canvas":
          kS(this.$el, t, e, (a) => {
            if (a) throw a;
            r();
          });
          break;
        case "img":
          CS(t, e, (a, l) => {
            if (a) throw a;
            (this.$el.src = l), (this.$el.onload = r);
          });
          break;
        case "svg":
          TS(t, e, (a, l) => {
            if (a) throw a;
            const s = document.createElement("div");
            s.innerHTML = l;
            const u = s.querySelector("svg");
            if (u) {
              const { attributes: d, childNodes: f } = u;
              Object.keys(d).forEach((g) => {
                const v = d[Number(g)];
                this.$el.setAttribute(v.name, v.value);
              }),
                Object.keys(f).forEach((g) => {
                  const v = f[Number(g)];
                  this.$el.appendChild(v.cloneNode(!0));
                }),
                r();
            }
          });
          break;
      }
    },
  },
  render() {
    return E(this.tag, this.$slots.default);
  },
});
function DS(e) {
  const t = document.createElement("textarea");
  (t.value = e), (t.contentEditable = "true"), (t.style.position = "fixed");
  const r = () => {};
  Oh(r), document.body.appendChild(t), t.focus(), t.select();
  const a = document.execCommand("copy");
  return t.remove(), Lh(r), a;
}
function qS(e) {
  return navigator.clipboard !== void 0
    ? navigator.clipboard.writeText(e)
    : new Promise((t, r) => {
        const a = DS(e);
        a ? t(!0) : r(a);
      });
}
let xS = 0;
const PS = ["click", "keydown"],
  AS = {
    icon: String,
    label: [Number, String],
    alert: [Boolean, String],
    alertIcon: String,
    name: { type: [Number, String], default: () => `t_${xS++}` },
    noCaps: Boolean,
    tabindex: [String, Number],
    disable: Boolean,
    contentClass: String,
    ripple: { type: [Boolean, Object], default: !0 },
  };
function ES(e, t, r, a) {
  const l = uo(Uh, Sr);
  if (l === Sr)
    return (
      console.error("QTab/QRouteTab component needs to be child of QTabs"), Sr
    );
  const { proxy: s } = Dt(),
    u = se(null),
    d = se(null),
    f = se(null),
    g = I(() =>
      e.disable === !0 || e.ripple === !1
        ? !1
        : Object.assign(
            { keyCodes: [13, 32], early: !0 },
            e.ripple === !0 ? {} : e.ripple
          )
    ),
    v = I(() => l.currentModel.value === e.name),
    T = I(
      () =>
        "q-tab relative-position self-stretch flex flex-center text-center" +
        (v.value === !0
          ? " q-tab--active" +
            (l.tabProps.value.activeClass
              ? " " + l.tabProps.value.activeClass
              : "") +
            (l.tabProps.value.activeColor
              ? ` text-${l.tabProps.value.activeColor}`
              : "") +
            (l.tabProps.value.activeBgColor
              ? ` bg-${l.tabProps.value.activeBgColor}`
              : "")
          : " q-tab--inactive") +
        (e.icon && e.label && l.tabProps.value.inlineLabel === !1
          ? " q-tab--full"
          : "") +
        (e.noCaps === !0 || l.tabProps.value.noCaps === !0
          ? " q-tab--no-caps"
          : "") +
        (e.disable === !0
          ? " disabled"
          : " q-focusable q-hoverable cursor-pointer") +
        (a !== void 0 ? a.linkClass.value : "")
    ),
    M = I(
      () =>
        "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " +
        (l.tabProps.value.inlineLabel === !0
          ? "row no-wrap q-tab__content--inline"
          : "column") +
        (e.contentClass !== void 0 ? ` ${e.contentClass}` : "")
    ),
    _ = I(() =>
      e.disable === !0 ||
      l.hasFocus.value === !0 ||
      (v.value === !1 && l.hasActiveTab.value === !0)
        ? -1
        : e.tabindex || 0
    );
  function P(D, A) {
    if ((A !== !0 && u.value !== null && u.value.focus(), e.disable === !0)) {
      a !== void 0 && a.hasRouterLink.value === !0 && Ft(D);
      return;
    }
    if (a === void 0) {
      l.updateModel({ name: e.name }), r("click", D);
      return;
    }
    if (a.hasRouterLink.value === !0) {
      const N = (J = {}) => {
        let z;
        const H =
          J.to === void 0 || Wi(J.to, e.to) === !0
            ? (l.avoidRouteWatcher = so())
            : null;
        return a
          .navigateToRouterLink(D, { ...J, returnRouterError: !0 })
          .catch((pe) => {
            z = pe;
          })
          .then((pe) => {
            if (
              (H === l.avoidRouteWatcher &&
                ((l.avoidRouteWatcher = !1),
                z === void 0 &&
                  (pe === void 0 ||
                    pe.message.startsWith("Avoided redundant navigation") ===
                      !0) &&
                  l.updateModel({ name: e.name })),
              J.returnRouterError === !0)
            )
              return z !== void 0 ? Promise.reject(z) : pe;
          });
      };
      r("click", D, N), D.defaultPrevented !== !0 && N();
      return;
    }
    r("click", D);
  }
  function $(D) {
    Wa(D, [13, 32])
      ? P(D, !0)
      : Vh(D) !== !0 &&
        D.keyCode >= 35 &&
        D.keyCode <= 40 &&
        D.altKey !== !0 &&
        D.metaKey !== !0 &&
        l.onKbdNavigate(D.keyCode, s.$el) === !0 &&
        Ft(D),
      r("keydown", D);
  }
  function L() {
    const D = l.tabProps.value.narrowIndicator,
      A = [],
      N = E("div", {
        ref: f,
        class: ["q-tab__indicator", l.tabProps.value.indicatorClass],
      });
    e.icon !== void 0 && A.push(E(Wt, { class: "q-tab__icon", name: e.icon })),
      e.label !== void 0 &&
        A.push(E("div", { class: "q-tab__label" }, e.label)),
      e.alert !== !1 &&
        A.push(
          e.alertIcon !== void 0
            ? E(Wt, {
                class: "q-tab__alert-icon",
                color: e.alert !== !0 ? e.alert : void 0,
                name: e.alertIcon,
              })
            : E("div", {
                class:
                  "q-tab__alert" + (e.alert !== !0 ? ` text-${e.alert}` : ""),
              })
        ),
      D === !0 && A.push(N);
    const J = [
      E("div", { class: "q-focus-helper", tabindex: -1, ref: u }),
      E("div", { class: M.value }, _i(t.default, A)),
    ];
    return D === !1 && J.push(N), J;
  }
  const F = {
    name: I(() => e.name),
    rootRef: d,
    tabIndicatorRef: f,
    routeData: a,
  };
  Ht(() => {
    l.unregisterTab(F);
  }),
    Xr(() => {
      l.registerTab(F);
    });
  function W(D, A) {
    const N = {
      ref: d,
      class: T.value,
      tabindex: _.value,
      role: "tab",
      "aria-selected": v.value === !0 ? "true" : "false",
      "aria-disabled": e.disable === !0 ? "true" : void 0,
      onClick: P,
      onKeydown: $,
      ...A,
    };
    return Hn(E(D, N, L()), [[Qu, g.value]]);
  }
  return { renderTab: W, $tabs: l };
}
var _u = Je({
  name: "QTab",
  props: AS,
  emits: PS,
  setup(e, { slots: t, emit: r }) {
    const { renderTab: a } = ES(e, t, r);
    return () => a("div");
  },
});
function IS(e, t, r) {
  const a = r === !0 ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${t === !0 ? a[0] : a[1]}${e ? ` text-${e}` : ""}`;
}
const $S = ["left", "center", "right", "justify"];
var RS = Je({
    name: "QTabs",
    props: {
      modelValue: [Number, String],
      align: {
        type: String,
        default: "center",
        validator: (e) => $S.includes(e),
      },
      breakpoint: { type: [String, Number], default: 600 },
      vertical: Boolean,
      shrink: Boolean,
      stretch: Boolean,
      activeClass: String,
      activeColor: String,
      activeBgColor: String,
      indicatorColor: String,
      leftIcon: String,
      rightIcon: String,
      outsideArrows: Boolean,
      mobileArrows: Boolean,
      switchIndicator: Boolean,
      narrowIndicator: Boolean,
      inlineLabel: Boolean,
      noCaps: Boolean,
      dense: Boolean,
      contentClass: String,
      "onUpdate:modelValue": [Function, Array],
    },
    setup(e, { slots: t, emit: r }) {
      const { proxy: a } = Dt(),
        { $q: l } = a,
        { registerTick: s } = $a(),
        { registerTick: u } = $a(),
        { registerTick: d } = $a(),
        { registerTimeout: f, removeTimeout: g } = oo(),
        { registerTimeout: v, removeTimeout: T } = oo(),
        M = se(null),
        _ = se(null),
        P = se(e.modelValue),
        $ = se(!1),
        L = se(!0),
        F = se(!1),
        W = se(!1),
        D = [],
        A = se(0),
        N = se(!1);
      let J = null,
        z = null,
        H;
      const pe = I(() => ({
          activeClass: e.activeClass,
          activeColor: e.activeColor,
          activeBgColor: e.activeBgColor,
          indicatorClass: IS(e.indicatorColor, e.switchIndicator, e.vertical),
          narrowIndicator: e.narrowIndicator,
          inlineLabel: e.inlineLabel,
          noCaps: e.noCaps,
        })),
        _e = I(() => {
          const G = A.value,
            de = P.value;
          for (let qe = 0; qe < G; qe++) if (D[qe].name.value === de) return !0;
          return !1;
        }),
        Pe = I(
          () =>
            `q-tabs__content--align-${
              $.value === !0 ? "left" : W.value === !0 ? "justify" : e.align
            }`
        ),
        lt = I(
          () =>
            `q-tabs row no-wrap items-center q-tabs--${
              $.value === !0 ? "" : "not-"
            }scrollable q-tabs--${
              e.vertical === !0 ? "vertical" : "horizontal"
            } q-tabs__arrows--${
              e.outsideArrows === !0 ? "outside" : "inside"
            } q-tabs--mobile-with${e.mobileArrows === !0 ? "" : "out"}-arrows` +
            (e.dense === !0 ? " q-tabs--dense" : "") +
            (e.shrink === !0 ? " col-shrink" : "") +
            (e.stretch === !0 ? " self-stretch" : "")
        ),
        te = I(
          () =>
            "q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position " +
            Pe.value +
            (e.contentClass !== void 0 ? ` ${e.contentClass}` : "")
        ),
        xe = I(() =>
          e.vertical === !0
            ? {
                container: "height",
                content: "offsetHeight",
                scroll: "scrollHeight",
              }
            : {
                container: "width",
                content: "offsetWidth",
                scroll: "scrollWidth",
              }
        ),
        Be = I(() => e.vertical !== !0 && l.lang.rtl === !0),
        j = I(() => Ba === !1 && Be.value === !0);
      ze(Be, he),
        ze(
          () => e.modelValue,
          (G) => {
            K({ name: G, setCurrent: !0, skipEmit: !0 });
          }
        ),
        ze(() => e.outsideArrows, me);
      function K({ name: G, setCurrent: de, skipEmit: qe }) {
        P.value !== G &&
          (qe !== !0 &&
            e["onUpdate:modelValue"] !== void 0 &&
            r("update:modelValue", G),
          (de === !0 || e["onUpdate:modelValue"] === void 0) &&
            (X(P.value, G), (P.value = G)));
      }
      function me() {
        s(() => {
          rt({ width: M.value.offsetWidth, height: M.value.offsetHeight });
        });
      }
      function rt(G) {
        if (xe.value === void 0 || _.value === null) return;
        const de = G[xe.value.container],
          qe = Math.min(
            _.value[xe.value.scroll],
            Array.prototype.reduce.call(
              _.value.children,
              (it, Ze) => it + (Ze[xe.value.content] || 0),
              0
            )
          ),
          gt = de > 0 && qe > de;
        ($.value = gt),
          gt === !0 && u(he),
          (W.value = de < parseInt(e.breakpoint, 10));
      }
      function X(G, de) {
        const qe =
            G != null && G !== "" ? D.find((it) => it.name.value === G) : null,
          gt =
            de != null && de !== ""
              ? D.find((it) => it.name.value === de)
              : null;
        if (qe && gt) {
          const it = qe.tabIndicatorRef.value,
            Ze = gt.tabIndicatorRef.value;
          J !== null && (clearTimeout(J), (J = null)),
            (it.style.transition = "none"),
            (it.style.transform = "none"),
            (Ze.style.transition = "none"),
            (Ze.style.transform = "none");
          const Fe = it.getBoundingClientRect(),
            mt = Ze.getBoundingClientRect();
          (Ze.style.transform =
            e.vertical === !0
              ? `translate3d(0,${Fe.top - mt.top}px,0) scale3d(1,${
                  mt.height ? Fe.height / mt.height : 1
                },1)`
              : `translate3d(${Fe.left - mt.left}px,0,0) scale3d(${
                  mt.width ? Fe.width / mt.width : 1
                },1,1)`),
            d(() => {
              J = setTimeout(() => {
                (J = null),
                  (Ze.style.transition =
                    "transform .25s cubic-bezier(.4, 0, .2, 1)"),
                  (Ze.style.transform = "none");
              }, 70);
            });
        }
        gt && $.value === !0 && Z(gt.rootRef.value);
      }
      function Z(G) {
        const {
            left: de,
            width: qe,
            top: gt,
            height: it,
          } = _.value.getBoundingClientRect(),
          Ze = G.getBoundingClientRect();
        let Fe = e.vertical === !0 ? Ze.top - gt : Ze.left - de;
        if (Fe < 0) {
          (_.value[e.vertical === !0 ? "scrollTop" : "scrollLeft"] +=
            Math.floor(Fe)),
            he();
          return;
        }
        (Fe += e.vertical === !0 ? Ze.height - it : Ze.width - qe),
          Fe > 0 &&
            ((_.value[e.vertical === !0 ? "scrollTop" : "scrollLeft"] +=
              Math.ceil(Fe)),
            he());
      }
      function he() {
        const G = _.value;
        if (G === null) return;
        const de = G.getBoundingClientRect(),
          qe = e.vertical === !0 ? G.scrollTop : Math.abs(G.scrollLeft);
        Be.value === !0
          ? ((L.value = Math.ceil(qe + de.width) < G.scrollWidth - 1),
            (F.value = qe > 0))
          : ((L.value = qe > 0),
            (F.value =
              e.vertical === !0
                ? Math.ceil(qe + de.height) < G.scrollHeight
                : Math.ceil(qe + de.width) < G.scrollWidth));
      }
      function fe(G) {
        z !== null && clearInterval(z),
          (z = setInterval(() => {
            ee(G) === !0 && we();
          }, 5));
      }
      function Ke() {
        fe(j.value === !0 ? Number.MAX_SAFE_INTEGER : 0);
      }
      function Ve() {
        fe(j.value === !0 ? 0 : Number.MAX_SAFE_INTEGER);
      }
      function we() {
        z !== null && (clearInterval(z), (z = null));
      }
      function Me(G, de) {
        const qe = Array.prototype.filter.call(
            _.value.children,
            (mt) =>
              mt === de ||
              (mt.matches && mt.matches(".q-tab.q-focusable") === !0)
          ),
          gt = qe.length;
        if (gt === 0) return;
        if (G === 36) return Z(qe[0]), qe[0].focus(), !0;
        if (G === 35) return Z(qe[gt - 1]), qe[gt - 1].focus(), !0;
        const it = G === (e.vertical === !0 ? 38 : 37),
          Ze = G === (e.vertical === !0 ? 40 : 39),
          Fe = it === !0 ? -1 : Ze === !0 ? 1 : void 0;
        if (Fe !== void 0) {
          const mt = Be.value === !0 ? -1 : 1,
            xt = qe.indexOf(de) + Fe * mt;
          return (
            xt >= 0 &&
              xt < gt &&
              (Z(qe[xt]), qe[xt].focus({ preventScroll: !0 })),
            !0
          );
        }
      }
      const ft = I(() =>
        j.value === !0
          ? {
              get: (G) => Math.abs(G.scrollLeft),
              set: (G, de) => {
                G.scrollLeft = -de;
              },
            }
          : e.vertical === !0
          ? {
              get: (G) => G.scrollTop,
              set: (G, de) => {
                G.scrollTop = de;
              },
            }
          : {
              get: (G) => G.scrollLeft,
              set: (G, de) => {
                G.scrollLeft = de;
              },
            }
      );
      function ee(G) {
        const de = _.value,
          { get: qe, set: gt } = ft.value;
        let it = !1,
          Ze = qe(de);
        const Fe = G < Ze ? -1 : 1;
        return (
          (Ze += Fe * 5),
          Ze < 0
            ? ((it = !0), (Ze = 0))
            : ((Fe === -1 && Ze <= G) || (Fe === 1 && Ze >= G)) &&
              ((it = !0), (Ze = G)),
          gt(de, Ze),
          he(),
          it
        );
      }
      function wt(G, de) {
        for (const qe in G) if (G[qe] !== de[qe]) return !1;
        return !0;
      }
      function nn() {
        let G = null,
          de = { matchedLen: 0, queryDiff: 9999, hrefLen: 0 };
        const qe = D.filter(
            (Fe) =>
              Fe.routeData !== void 0 && Fe.routeData.hasRouterLink.value === !0
          ),
          { hash: gt, query: it } = a.$route,
          Ze = Object.keys(it).length;
        for (const Fe of qe) {
          const mt = Fe.routeData.exact.value === !0;
          if (
            Fe.routeData[mt === !0 ? "linkIsExactActive" : "linkIsActive"]
              .value !== !0
          )
            continue;
          const {
              hash: xt,
              query: cn,
              matched: Jn,
              href: ti,
            } = Fe.routeData.resolvedLink.value,
            Fn = Object.keys(cn).length;
          if (mt === !0) {
            if (xt !== gt || Fn !== Ze || wt(it, cn) === !1) continue;
            G = Fe.name.value;
            break;
          }
          if ((xt !== "" && xt !== gt) || (Fn !== 0 && wt(cn, it) === !1))
            continue;
          const Qt = {
            matchedLen: Jn.length,
            queryDiff: Ze - Fn,
            hrefLen: ti.length - xt.length,
          };
          if (Qt.matchedLen > de.matchedLen) {
            (G = Fe.name.value), (de = Qt);
            continue;
          } else if (Qt.matchedLen !== de.matchedLen) continue;
          if (Qt.queryDiff < de.queryDiff) (G = Fe.name.value), (de = Qt);
          else if (Qt.queryDiff !== de.queryDiff) continue;
          Qt.hrefLen > de.hrefLen && ((G = Fe.name.value), (de = Qt));
        }
        (G === null &&
          D.some(
            (Fe) => Fe.routeData === void 0 && Fe.name.value === P.value
          ) === !0) ||
          K({ name: G, setCurrent: !0 });
      }
      function un(G) {
        if (
          (g(),
          N.value !== !0 &&
            M.value !== null &&
            G.target &&
            typeof G.target.closest == "function")
        ) {
          const de = G.target.closest(".q-tab");
          de &&
            M.value.contains(de) === !0 &&
            ((N.value = !0), $.value === !0 && Z(de));
        }
      }
      function rn() {
        f(() => {
          N.value = !1;
        }, 30);
      }
      function qt() {
        Bn.avoidRouteWatcher === !1 ? v(nn) : T();
      }
      function Gt() {
        if (H === void 0) {
          const G = ze(() => a.$route.fullPath, qt);
          H = () => {
            G(), (H = void 0);
          };
        }
      }
      function Zn(G) {
        D.push(G),
          A.value++,
          me(),
          G.routeData === void 0 || a.$route === void 0
            ? v(() => {
                if ($.value === !0) {
                  const de = P.value,
                    qe =
                      de != null && de !== ""
                        ? D.find((gt) => gt.name.value === de)
                        : null;
                  qe && Z(qe.rootRef.value);
                }
              })
            : (Gt(), G.routeData.hasRouterLink.value === !0 && qt());
      }
      function Kt(G) {
        D.splice(D.indexOf(G), 1),
          A.value--,
          me(),
          H !== void 0 &&
            G.routeData !== void 0 &&
            (D.every((de) => de.routeData === void 0) === !0 && H(), qt());
      }
      const Bn = {
        currentModel: P,
        tabProps: pe,
        hasFocus: N,
        hasActiveTab: _e,
        registerTab: Zn,
        unregisterTab: Kt,
        verifyRouteModel: qt,
        updateModel: K,
        onKbdNavigate: Me,
        avoidRouteWatcher: !1,
      };
      zh(Uh, Bn);
      function Pr() {
        J !== null && clearTimeout(J), we(), H !== void 0 && H();
      }
      let St;
      return (
        Ht(Pr),
        ia(() => {
          (St = H !== void 0), Pr();
        }),
        aa(() => {
          St === !0 && Gt(), me();
        }),
        () =>
          E(
            "div",
            {
              ref: M,
              class: lt.value,
              role: "tablist",
              onFocusin: un,
              onFocusout: rn,
            },
            [
              E(xu, { onResize: rt }),
              E(
                "div",
                { ref: _, class: te.value, onScroll: he },
                Mt(t.default)
              ),
              E(Wt, {
                class:
                  "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" +
                  (L.value === !0 ? "" : " q-tabs__arrow--faded"),
                name:
                  e.leftIcon ||
                  l.iconSet.tabs[e.vertical === !0 ? "up" : "left"],
                onMousedownPassive: Ke,
                onTouchstartPassive: Ke,
                onMouseupPassive: we,
                onMouseleavePassive: we,
                onTouchendPassive: we,
              }),
              E(Wt, {
                class:
                  "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" +
                  (F.value === !0 ? "" : " q-tabs__arrow--faded"),
                name:
                  e.rightIcon ||
                  l.iconSet.tabs[e.vertical === !0 ? "down" : "right"],
                onMousedownPassive: Ve,
                onTouchstartPassive: Ve,
                onMouseupPassive: we,
                onMouseleavePassive: we,
                onTouchendPassive: we,
              }),
            ]
          )
      );
    },
  }),
  OS = Je({
    name: "QField",
    inheritAttrs: !1,
    props: Xu,
    emits: Wh,
    setup() {
      return Yh(Hh());
    },
  });
const vh = (e) => ["add", "add-unique", "toggle"].includes(e),
  LS = ".*+?^${}()|[]\\",
  NS = Object.keys(Xu);
var Aa = Je({
  name: "QSelect",
  inheritAttrs: !1,
  props: {
    ...eg,
    ...Wb,
    ...Xu,
    modelValue: { required: !0 },
    multiple: Boolean,
    displayValue: [String, Number],
    displayValueHtml: Boolean,
    dropdownIcon: String,
    options: { type: Array, default: () => [] },
    optionValue: [Function, String],
    optionLabel: [Function, String],
    optionDisable: [Function, String],
    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,
    maxValues: [Number, String],
    optionsDense: Boolean,
    optionsDark: { type: Boolean, default: null },
    optionsSelectedClass: String,
    optionsHtml: Boolean,
    optionsCover: Boolean,
    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,
    popupContentClass: String,
    popupContentStyle: [String, Array, Object],
    useInput: Boolean,
    useChips: Boolean,
    newValueMode: { type: String, validator: vh },
    mapOptions: Boolean,
    emitValue: Boolean,
    inputDebounce: { type: [Number, String], default: 500 },
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object],
    tabindex: { type: [String, Number], default: 0 },
    autocomplete: String,
    transitionShow: String,
    transitionHide: String,
    transitionDuration: [String, Number],
    behavior: {
      type: String,
      validator: (e) => ["default", "menu", "dialog"].includes(e),
      default: "default",
    },
    virtualScrollItemSize: { type: [Number, String], default: void 0 },
    onNewValue: Function,
    onFilter: Function,
  },
  emits: [
    ...Wh,
    "add",
    "remove",
    "inputValue",
    "newValue",
    "keyup",
    "keypress",
    "keydown",
    "filterAbort",
  ],
  setup(e, { slots: t, emit: r }) {
    const { proxy: a } = Dt(),
      { $q: l } = a,
      s = se(!1),
      u = se(!1),
      d = se(-1),
      f = se(""),
      g = se(!1),
      v = se(!1);
    let T = null,
      M,
      _,
      P,
      $ = null,
      L,
      F,
      W,
      D;
    const A = se(null),
      N = se(null),
      J = se(null),
      z = se(null),
      H = se(null),
      pe = Yb(e),
      _e = Kb(al),
      Pe = I(() => (Array.isArray(e.options) ? e.options.length : 0)),
      lt = I(() =>
        e.virtualScrollItemSize === void 0
          ? e.optionsDense === !0
            ? 24
            : 48
          : e.virtualScrollItemSize
      ),
      {
        virtualScrollSliceRange: te,
        virtualScrollSliceSizeComputed: xe,
        localResetVirtualScroll: Be,
        padVirtualScroll: j,
        onVirtualScrollEvt: K,
        scrollTo: me,
        setVirtualScrollSize: rt,
      } = tg({
        virtualScrollLength: Pe,
        getVirtualScrollTarget: nl,
        getVirtualScrollEl: tl,
        virtualScrollItemSizeComputed: lt,
      }),
      X = Hh(),
      Z = I(() => {
        const C = e.mapOptions === !0 && e.multiple !== !0,
          le =
            e.modelValue !== void 0 && (e.modelValue !== null || C === !0)
              ? e.multiple === !0 && Array.isArray(e.modelValue)
                ? e.modelValue
                : [e.modelValue]
              : [];
        if (e.mapOptions === !0 && Array.isArray(e.options) === !0) {
          const ie = e.mapOptions === !0 && M !== void 0 ? M : [],
            De = le.map((st) => ti(st, ie));
          return e.modelValue === null && C === !0
            ? De.filter((st) => st !== null)
            : De;
        }
        return le;
      }),
      he = I(() => {
        const C = {};
        return (
          NS.forEach((le) => {
            const ie = e[le];
            ie !== void 0 && (C[le] = ie);
          }),
          C
        );
      }),
      fe = I(() => (e.optionsDark === null ? X.isDark.value : e.optionsDark)),
      Ke = I(() => eh(Z.value)),
      Ve = I(() => {
        let C = "q-field__input q-placeholder col";
        return e.hideSelected === !0 || Z.value.length === 0
          ? [C, e.inputClass]
          : ((C += " q-field__input--padding"),
            e.inputClass === void 0 ? C : [C, e.inputClass]);
      }),
      we = I(
        () =>
          (e.virtualScrollHorizontal === !0
            ? "q-virtual-scroll--horizontal"
            : "") + (e.popupContentClass ? " " + e.popupContentClass : "")
      ),
      Me = I(() => Pe.value === 0),
      ft = I(() => Z.value.map((C) => G.value(C)).join(", ")),
      ee = I(() => (e.displayValue !== void 0 ? e.displayValue : ft.value)),
      wt = I(() =>
        e.optionsHtml === !0 ? () => !0 : (C) => C != null && C.html === !0
      ),
      nn = I(
        () =>
          e.displayValueHtml === !0 ||
          (e.displayValue === void 0 &&
            (e.optionsHtml === !0 || Z.value.some(wt.value)))
      ),
      un = I(() => (X.focused.value === !0 ? e.tabindex : -1)),
      rn = I(() => {
        const C = {
          tabindex: e.tabindex,
          role: "combobox",
          "aria-label": e.label,
          "aria-readonly": e.readonly === !0 ? "true" : "false",
          "aria-autocomplete": e.useInput === !0 ? "list" : "none",
          "aria-expanded": s.value === !0 ? "true" : "false",
          "aria-controls": `${X.targetUid.value}_lb`,
        };
        return (
          d.value >= 0 &&
            (C["aria-activedescendant"] = `${X.targetUid.value}_${d.value}`),
          C
        );
      }),
      qt = I(() => ({
        id: `${X.targetUid.value}_lb`,
        role: "listbox",
        "aria-multiselectable": e.multiple === !0 ? "true" : "false",
      })),
      Gt = I(() =>
        Z.value.map((C, le) => ({
          index: le,
          opt: C,
          html: wt.value(C),
          selected: !0,
          removeAtIndex: Fe,
          toggleOption: xt,
          tabindex: un.value,
        }))
      ),
      Zn = I(() => {
        if (Pe.value === 0) return [];
        const { from: C, to: le } = te.value;
        return e.options.slice(C, le).map((ie, De) => {
          const st = de.value(ie) === !0,
            tt = C + De,
            kt = {
              clickable: !0,
              active: !1,
              activeClass: Pr.value,
              manualFocus: !0,
              focused: !1,
              disable: st,
              tabindex: -1,
              dense: e.optionsDense,
              dark: fe.value,
              role: "option",
              id: `${X.targetUid.value}_${tt}`,
              onClick: () => {
                xt(ie);
              },
            };
          return (
            st !== !0 &&
              (Qt(ie) === !0 && (kt.active = !0),
              d.value === tt && (kt.focused = !0),
              (kt["aria-selected"] = kt.active === !0 ? "true" : "false"),
              l.platform.is.desktop === !0 &&
                (kt.onMousemove = () => {
                  s.value === !0 && cn(tt);
                })),
            {
              index: tt,
              opt: ie,
              html: wt.value(ie),
              label: G.value(ie),
              selected: kt.active,
              focused: kt.focused,
              toggleOption: xt,
              setOptionIndex: cn,
              itemProps: kt,
            }
          );
        });
      }),
      Kt = I(() =>
        e.dropdownIcon !== void 0 ? e.dropdownIcon : l.iconSet.arrow.dropdown
      ),
      Bn = I(
        () =>
          e.optionsCover === !1 &&
          e.outlined !== !0 &&
          e.standout !== !0 &&
          e.borderless !== !0 &&
          e.rounded !== !0
      ),
      Pr = I(() =>
        e.optionsSelectedClass !== void 0
          ? e.optionsSelectedClass
          : e.color !== void 0
          ? `text-${e.color}`
          : ""
      ),
      St = I(() => Fn(e.optionValue, "value")),
      G = I(() => Fn(e.optionLabel, "label")),
      de = I(() => Fn(e.optionDisable, "disable")),
      qe = I(() => Z.value.map((C) => St.value(C))),
      gt = I(() => {
        const C = {
          onInput: al,
          onChange: _e,
          onKeydown: el,
          onKeyup: ki,
          onKeypress: Xa,
          onFocus: wi,
          onClick(le) {
            _ === !0 && gi(le);
          },
        };
        return (
          (C.onCompositionstart =
            C.onCompositionupdate =
            C.onCompositionend =
              _e),
          C
        );
      });
    ze(
      Z,
      (C) => {
        (M = C),
          e.useInput === !0 &&
            e.fillInput === !0 &&
            e.multiple !== !0 &&
            X.innerLoading.value !== !0 &&
            ((u.value !== !0 && s.value !== !0) || Ke.value !== !0) &&
            (P !== !0 && Rr(), (u.value === !0 || s.value === !0) && Er(""));
      },
      { immediate: !0 }
    ),
      ze(() => e.fillInput, Rr),
      ze(s, Ti),
      ze(Pe, Jo);
    function it(C) {
      return e.emitValue === !0 ? St.value(C) : C;
    }
    function Ze(C) {
      if (C > -1 && C < Z.value.length)
        if (e.multiple === !0) {
          const le = e.modelValue.slice();
          r("remove", { index: C, value: le.splice(C, 1)[0] }),
            r("update:modelValue", le);
        } else r("update:modelValue", null);
    }
    function Fe(C) {
      Ze(C), X.focus();
    }
    function mt(C, le) {
      const ie = it(C);
      if (e.multiple !== !0) {
        e.fillInput === !0 && Ar(G.value(C), !0, !0),
          r("update:modelValue", ie);
        return;
      }
      if (Z.value.length === 0) {
        r("add", { index: 0, value: ie }),
          r("update:modelValue", e.multiple === !0 ? [ie] : ie);
        return;
      }
      if (
        (le === !0 && Qt(C) === !0) ||
        (e.maxValues !== void 0 && e.modelValue.length >= e.maxValues)
      )
        return;
      const De = e.modelValue.slice();
      r("add", { index: De.length, value: ie }),
        De.push(ie),
        r("update:modelValue", De);
    }
    function xt(C, le) {
      if (X.editable.value !== !0 || C === void 0 || de.value(C) === !0) return;
      const ie = St.value(C);
      if (e.multiple !== !0) {
        le !== !0 && (Ar(e.fillInput === !0 ? G.value(C) : "", !0, !0), ur()),
          N.value !== null && N.value.focus(),
          (Z.value.length === 0 || Wi(St.value(Z.value[0]), ie) !== !0) &&
            r("update:modelValue", e.emitValue === !0 ? ie : C);
        return;
      }
      if (
        ((_ !== !0 || g.value === !0) && X.focus(), wi(), Z.value.length === 0)
      ) {
        const tt = e.emitValue === !0 ? ie : C;
        r("add", { index: 0, value: tt }),
          r("update:modelValue", e.multiple === !0 ? [tt] : tt);
        return;
      }
      const De = e.modelValue.slice(),
        st = qe.value.findIndex((tt) => Wi(tt, ie));
      if (st > -1) r("remove", { index: st, value: De.splice(st, 1)[0] });
      else {
        if (e.maxValues !== void 0 && De.length >= e.maxValues) return;
        const tt = e.emitValue === !0 ? ie : C;
        r("add", { index: De.length, value: tt }), De.push(tt);
      }
      r("update:modelValue", De);
    }
    function cn(C) {
      if (l.platform.is.desktop !== !0) return;
      const le = C > -1 && C < Pe.value ? C : -1;
      d.value !== le && (d.value = le);
    }
    function Jn(C = 1, le) {
      if (s.value === !0) {
        let ie = d.value;
        do ie = rh(ie + C, -1, Pe.value - 1);
        while (ie !== -1 && ie !== d.value && de.value(e.options[ie]) === !0);
        d.value !== ie &&
          (cn(ie),
          me(ie),
          le !== !0 &&
            e.useInput === !0 &&
            e.fillInput === !0 &&
            Ci(ie >= 0 ? G.value(e.options[ie]) : L));
      }
    }
    function ti(C, le) {
      const ie = (De) => Wi(St.value(De), C);
      return e.options.find(ie) || le.find(ie) || C;
    }
    function Fn(C, le) {
      const ie = C !== void 0 ? C : le;
      return typeof ie == "function"
        ? ie
        : (De) =>
            De !== null && typeof De == "object" && ie in De ? De[ie] : De;
    }
    function Qt(C) {
      const le = St.value(C);
      return qe.value.find((ie) => Wi(ie, le)) !== void 0;
    }
    function wi(C) {
      e.useInput === !0 &&
        N.value !== null &&
        (C === void 0 ||
          (N.value === C.target && C.target.value === ft.value)) &&
        N.value.select();
    }
    function Si(C) {
      Wa(C, 27) === !0 && s.value === !0 && (gi(C), ur(), Rr()), r("keyup", C);
    }
    function ki(C) {
      const { value: le } = C.target;
      if (C.keyCode !== void 0) {
        Si(C);
        return;
      }
      if (
        ((C.target.value = ""),
        T !== null && (clearTimeout(T), (T = null)),
        Rr(),
        typeof le == "string" && le.length !== 0)
      ) {
        const ie = le.toLocaleLowerCase(),
          De = (tt) => {
            const kt = e.options.find(
              (Nt) => tt.value(Nt).toLocaleLowerCase() === ie
            );
            return kt === void 0
              ? !1
              : (Z.value.indexOf(kt) === -1 ? xt(kt) : ur(), !0);
          },
          st = (tt) => {
            De(St) !== !0 &&
              (De(G) === !0 || tt === !0 || Er(le, !0, () => st(!0)));
          };
        st();
      } else X.clearValue(C);
    }
    function Xa(C) {
      r("keypress", C);
    }
    function el(C) {
      if ((r("keydown", C), Vh(C) === !0)) return;
      const le =
          f.value.length !== 0 &&
          (e.newValueMode !== void 0 || e.onNewValue !== void 0),
        ie =
          C.shiftKey !== !0 && e.multiple !== !0 && (d.value > -1 || le === !0);
      if (C.keyCode === 27) {
        Ia(C);
        return;
      }
      if (C.keyCode === 9 && ie === !1) {
        Ir();
        return;
      }
      if (
        C.target === void 0 ||
        C.target.id !== X.targetUid.value ||
        X.editable.value !== !0
      )
        return;
      if (C.keyCode === 40 && X.innerLoading.value !== !0 && s.value === !1) {
        Ft(C), $r();
        return;
      }
      if (C.keyCode === 8 && e.hideSelected !== !0 && f.value.length === 0) {
        e.multiple === !0 && Array.isArray(e.modelValue) === !0
          ? Ze(e.modelValue.length - 1)
          : e.multiple !== !0 &&
            e.modelValue !== null &&
            r("update:modelValue", null);
        return;
      }
      (C.keyCode === 35 || C.keyCode === 36) &&
        (typeof f.value != "string" || f.value.length === 0) &&
        (Ft(C), (d.value = -1), Jn(C.keyCode === 36 ? 1 : -1, e.multiple)),
        (C.keyCode === 33 || C.keyCode === 34) &&
          xe.value !== void 0 &&
          (Ft(C),
          (d.value = Math.max(
            -1,
            Math.min(
              Pe.value,
              d.value + (C.keyCode === 33 ? -1 : 1) * xe.value.view
            )
          )),
          Jn(C.keyCode === 33 ? 1 : -1, e.multiple)),
        (C.keyCode === 38 || C.keyCode === 40) &&
          (Ft(C), Jn(C.keyCode === 38 ? -1 : 1, e.multiple));
      const De = Pe.value;
      if (
        ((W === void 0 || D < Date.now()) && (W = ""),
        De > 0 &&
          e.useInput !== !0 &&
          C.key !== void 0 &&
          C.key.length === 1 &&
          C.altKey === !1 &&
          C.ctrlKey === !1 &&
          C.metaKey === !1 &&
          (C.keyCode !== 32 || W.length !== 0))
      ) {
        s.value !== !0 && $r(C);
        const st = C.key.toLocaleLowerCase(),
          tt = W.length === 1 && W[0] === st;
        (D = Date.now() + 1500), tt === !1 && (Ft(C), (W += st));
        const kt = new RegExp(
          "^" +
            W.split("")
              .map((Mi) => (LS.indexOf(Mi) > -1 ? "\\" + Mi : Mi))
              .join(".*"),
          "i"
        );
        let Nt = d.value;
        if (tt === !0 || Nt < 0 || kt.test(G.value(e.options[Nt])) !== !0)
          do Nt = rh(Nt + 1, -1, De - 1);
          while (
            Nt !== d.value &&
            (de.value(e.options[Nt]) === !0 ||
              kt.test(G.value(e.options[Nt])) !== !0)
          );
        d.value !== Nt &&
          Sn(() => {
            cn(Nt),
              me(Nt),
              Nt >= 0 &&
                e.useInput === !0 &&
                e.fillInput === !0 &&
                Ci(G.value(e.options[Nt]));
          });
        return;
      }
      if (
        !(
          C.keyCode !== 13 &&
          (C.keyCode !== 32 || e.useInput === !0 || W !== "") &&
          (C.keyCode !== 9 || ie === !1)
        )
      ) {
        if ((C.keyCode !== 9 && Ft(C), d.value > -1 && d.value < De)) {
          xt(e.options[d.value]);
          return;
        }
        if (le === !0) {
          const st = (tt, kt) => {
            if (kt) {
              if (vh(kt) !== !0) return;
            } else kt = e.newValueMode;
            if ((Ar("", e.multiple !== !0, !0), tt == null)) return;
            (kt === "toggle" ? xt : mt)(tt, kt === "add-unique"),
              e.multiple !== !0 && (N.value !== null && N.value.focus(), ur());
          };
          if (
            (e.onNewValue !== void 0 ? r("newValue", f.value, st) : st(f.value),
            e.multiple !== !0)
          )
            return;
        }
        s.value === !0 ? Ir() : X.innerLoading.value !== !0 && $r();
      }
    }
    function tl() {
      return _ === !0
        ? H.value
        : J.value !== null && J.value.contentEl !== null
        ? J.value.contentEl
        : void 0;
    }
    function nl() {
      return tl();
    }
    function rl() {
      return e.hideSelected === !0
        ? []
        : t["selected-item"] !== void 0
        ? Gt.value.map((C) => t["selected-item"](C)).slice()
        : t.selected !== void 0
        ? [].concat(t.selected())
        : e.useChips === !0
        ? Gt.value.map((C, le) =>
            E(
              Ha,
              {
                key: "option-" + le,
                removable: X.editable.value === !0 && de.value(C.opt) !== !0,
                dense: !0,
                textColor: e.color,
                tabindex: un.value,
                onRemove() {
                  C.removeAtIndex(le);
                },
              },
              () =>
                E("span", {
                  class: "ellipsis",
                  [C.html === !0 ? "innerHTML" : "textContent"]: G.value(C.opt),
                })
            )
          )
        : [
            E("span", {
              [nn.value === !0 ? "innerHTML" : "textContent"]: ee.value,
            }),
          ];
    }
    function il() {
      if (Me.value === !0)
        return t["no-option"] !== void 0
          ? t["no-option"]({ inputValue: f.value })
          : void 0;
      const C =
        t.option !== void 0
          ? t.option
          : (ie) =>
              E(zt, { key: ie.index, ...ie.itemProps }, () =>
                E(Ie, () =>
                  E(Ge, () =>
                    E("span", {
                      [ie.html === !0 ? "innerHTML" : "textContent"]: ie.label,
                    })
                  )
                )
              );
      let le = j("div", Zn.value.map(C));
      return (
        t["before-options"] !== void 0 &&
          (le = t["before-options"]().concat(le)),
        _i(t["after-options"], le)
      );
    }
    function Wo(C, le) {
      const ie =
          le === !0
            ? { ...rn.value, ...X.splitAttrs.attributes.value }
            : void 0,
        De = {
          ref: le === !0 ? N : void 0,
          key: "i_t",
          class: Ve.value,
          style: e.inputStyle,
          value: f.value !== void 0 ? f.value : "",
          type: "search",
          ...ie,
          id: le === !0 ? X.targetUid.value : void 0,
          maxlength: e.maxlength,
          autocomplete: e.autocomplete,
          "data-autofocus": C === !0 || e.autofocus === !0 || void 0,
          disabled: e.disable === !0,
          readonly: e.readonly === !0,
          ...gt.value,
        };
      return (
        C !== !0 &&
          _ === !0 &&
          (Array.isArray(De.class) === !0
            ? (De.class = [...De.class, "no-pointer-events"])
            : (De.class += " no-pointer-events")),
        E("input", De)
      );
    }
    function al(C) {
      T !== null && (clearTimeout(T), (T = null)),
        !(C && C.target && C.target.qComposing === !0) &&
          (Ci(C.target.value || ""),
          (P = !0),
          (L = f.value),
          X.focused.value !== !0 && (_ !== !0 || g.value === !0) && X.focus(),
          e.onFilter !== void 0 &&
            (T = setTimeout(() => {
              (T = null), Er(f.value);
            }, e.inputDebounce)));
    }
    function Ci(C) {
      f.value !== C && ((f.value = C), r("inputValue", C));
    }
    function Ar(C, le, ie) {
      (P = ie !== !0),
        e.useInput === !0 &&
          (Ci(C), (le === !0 || ie !== !0) && (L = C), le !== !0 && Er(C));
    }
    function Er(C, le, ie) {
      if (e.onFilter === void 0 || (le !== !0 && X.focused.value !== !0))
        return;
      X.innerLoading.value === !0
        ? r("filterAbort")
        : ((X.innerLoading.value = !0), (v.value = !0)),
        C !== "" &&
          e.multiple !== !0 &&
          Z.value.length !== 0 &&
          P !== !0 &&
          C === G.value(Z.value[0]) &&
          (C = "");
      const De = setTimeout(() => {
        s.value === !0 && (s.value = !1);
      }, 10);
      $ !== null && clearTimeout($),
        ($ = De),
        r(
          "filter",
          C,
          (st, tt) => {
            (le === !0 || X.focused.value === !0) &&
              $ === De &&
              (clearTimeout($),
              typeof st == "function" && st(),
              (v.value = !1),
              Sn(() => {
                (X.innerLoading.value = !1),
                  X.editable.value === !0 &&
                    (le === !0
                      ? s.value === !0 && ur()
                      : s.value === !0
                      ? Ti(!0)
                      : (s.value = !0)),
                  typeof tt == "function" &&
                    Sn(() => {
                      tt(a);
                    }),
                  typeof ie == "function" &&
                    Sn(() => {
                      ie(a);
                    });
              }));
          },
          () => {
            X.focused.value === !0 &&
              $ === De &&
              (clearTimeout($), (X.innerLoading.value = !1), (v.value = !1)),
              s.value === !0 && (s.value = !1);
          }
        );
    }
    function Yo() {
      return E(
        ng,
        {
          ref: J,
          class: we.value,
          style: e.popupContentStyle,
          modelValue: s.value,
          fit: e.menuShrink !== !0,
          cover: e.optionsCover === !0 && Me.value !== !0 && e.useInput !== !0,
          anchor: e.menuAnchor,
          self: e.menuSelf,
          offset: e.menuOffset,
          dark: fe.value,
          noParentEvent: !0,
          noRefocus: !0,
          noFocus: !0,
          square: Bn.value,
          transitionShow: e.transitionShow,
          transitionHide: e.transitionHide,
          transitionDuration: e.transitionDuration,
          separateClosePopup: !0,
          ...qt.value,
          onScrollPassive: K,
          onBeforeShow: ol,
          onBeforeHide: Ho,
          onShow: sa,
        },
        il
      );
    }
    function Ho(C) {
      sl(C), Ir();
    }
    function sa() {
      rt();
    }
    function Go(C) {
      gi(C),
        N.value !== null && N.value.focus(),
        (g.value = !0),
        window.scrollTo(
          window.pageXOffset || window.scrollX || document.body.scrollLeft || 0,
          0
        );
    }
    function ua(C) {
      gi(C),
        Sn(() => {
          g.value = !1;
        });
    }
    function Ko() {
      const C = [
        E(
          OS,
          {
            class: `col-auto ${X.fieldClass.value}`,
            ...he.value,
            for: X.targetUid.value,
            dark: fe.value,
            square: !0,
            loading: v.value,
            itemAligned: !1,
            filled: !0,
            stackLabel: f.value.length !== 0,
            ...X.splitAttrs.listeners.value,
            onFocus: Go,
            onBlur: ua,
          },
          {
            ...t,
            rawControl: () => X.getControl(!0),
            before: void 0,
            after: void 0,
          }
        ),
      ];
      return (
        s.value === !0 &&
          C.push(
            E(
              "div",
              {
                ref: H,
                class: we.value + " scroll",
                style: e.popupContentStyle,
                ...qt.value,
                onClick: Ia,
                onScrollPassive: K,
              },
              il()
            )
          ),
        E(
          co,
          {
            ref: z,
            modelValue: u.value,
            position: e.useInput === !0 ? "top" : void 0,
            transitionShow: F,
            transitionHide: e.transitionHide,
            transitionDuration: e.transitionDuration,
            onBeforeShow: ol,
            onBeforeHide: Qo,
            onHide: jo,
            onShow: Zo,
          },
          () =>
            E(
              "div",
              {
                class:
                  "q-select__dialog" +
                  (fe.value === !0 ? " q-select__dialog--dark q-dark" : "") +
                  (g.value === !0 ? " q-select__dialog--focused" : ""),
              },
              C
            )
        )
      );
    }
    function Qo(C) {
      sl(C),
        z.value !== null &&
          z.value.__updateRefocusTarget(
            X.rootRef.value.querySelector(
              ".q-field__native > [tabindex]:last-child"
            )
          ),
        (X.focused.value = !1);
    }
    function jo(C) {
      ur(), X.focused.value === !1 && r("blur", C), Rr();
    }
    function Zo() {
      const C = document.activeElement;
      (C === null || C.id !== X.targetUid.value) &&
        N.value !== null &&
        N.value !== C &&
        N.value.focus(),
        rt();
    }
    function Ir() {
      u.value !== !0 &&
        ((d.value = -1),
        s.value === !0 && (s.value = !1),
        X.focused.value === !1 &&
          ($ !== null && (clearTimeout($), ($ = null)),
          X.innerLoading.value === !0 &&
            (r("filterAbort"), (X.innerLoading.value = !1), (v.value = !1))));
    }
    function $r(C) {
      X.editable.value === !0 &&
        (_ === !0
          ? (X.onControlFocusin(C),
            (u.value = !0),
            Sn(() => {
              X.focus();
            }))
          : X.focus(),
        e.onFilter !== void 0
          ? Er(f.value)
          : (Me.value !== !0 || t["no-option"] !== void 0) && (s.value = !0));
    }
    function ur() {
      (u.value = !1), Ir();
    }
    function Rr() {
      e.useInput === !0 &&
        Ar(
          (e.multiple !== !0 &&
            e.fillInput === !0 &&
            Z.value.length !== 0 &&
            G.value(Z.value[0])) ||
            "",
          !0,
          !0
        );
    }
    function Ti(C) {
      let le = -1;
      if (C === !0) {
        if (Z.value.length !== 0) {
          const ie = St.value(Z.value[0]);
          le = e.options.findIndex((De) => Wi(St.value(De), ie));
        }
        Be(le);
      }
      cn(le);
    }
    function Jo(C, le) {
      s.value === !0 &&
        X.innerLoading.value === !1 &&
        (Be(-1, !0),
        Sn(() => {
          s.value === !0 &&
            X.innerLoading.value === !1 &&
            (C > le ? Be() : Ti(!0));
        }));
    }
    function ll() {
      u.value === !1 && J.value !== null && J.value.updatePosition();
    }
    function ol(C) {
      C !== void 0 && gi(C),
        r("popupShow", C),
        (X.hasPopupOpen = !0),
        X.onControlFocusin(C);
    }
    function sl(C) {
      C !== void 0 && gi(C),
        r("popupHide", C),
        (X.hasPopupOpen = !1),
        X.onControlFocusout(C);
    }
    function ul() {
      (_ =
        l.platform.is.mobile !== !0 && e.behavior !== "dialog"
          ? !1
          : e.behavior !== "menu" &&
            (e.useInput === !0
              ? t["no-option"] !== void 0 ||
                e.onFilter !== void 0 ||
                Me.value === !1
              : !0)),
        (F =
          l.platform.is.ios === !0 && _ === !0 && e.useInput === !0
            ? "fade"
            : e.transitionShow);
    }
    return (
      Hb(ul),
      Gb(ll),
      ul(),
      Ht(() => {
        T !== null && clearTimeout(T);
      }),
      Object.assign(a, {
        showPopup: $r,
        hidePopup: ur,
        removeAtIndex: Ze,
        add: mt,
        toggleOption: xt,
        getOptionIndex: () => d.value,
        setOptionIndex: cn,
        moveOptionSelection: Jn,
        filter: Er,
        updateMenuPosition: ll,
        updateInputValue: Ar,
        isOptionSelected: Qt,
        getEmittingOptionValue: it,
        isOptionDisabled: (...C) => de.value.apply(null, C) === !0,
        getOptionValue: (...C) => St.value.apply(null, C),
        getOptionLabel: (...C) => G.value.apply(null, C),
      }),
      Object.assign(X, {
        innerValue: Z,
        fieldClass: I(
          () =>
            `q-select q-field--auto-height q-select--with${
              e.useInput !== !0 ? "out" : ""
            }-input q-select--with${
              e.useChips !== !0 ? "out" : ""
            }-chips q-select--${e.multiple === !0 ? "multiple" : "single"}`
        ),
        inputRef: A,
        targetRef: N,
        hasValue: Ke,
        showPopup: $r,
        floatingLabel: I(
          () =>
            (e.hideSelected !== !0 && Ke.value === !0) ||
            typeof f.value == "number" ||
            f.value.length !== 0 ||
            eh(e.displayValue)
        ),
        getControlChild: () => {
          if (
            X.editable.value !== !1 &&
            (u.value === !0 || Me.value !== !0 || t["no-option"] !== void 0)
          )
            return _ === !0 ? Ko() : Yo();
          X.hasPopupOpen === !0 && (X.hasPopupOpen = !1);
        },
        controlEvents: {
          onFocusin(C) {
            X.onControlFocusin(C);
          },
          onFocusout(C) {
            X.onControlFocusout(C, () => {
              Rr(), Ir();
            });
          },
          onClick(C) {
            if ((Ia(C), _ !== !0 && s.value === !0)) {
              Ir(), N.value !== null && N.value.focus();
              return;
            }
            $r(C);
          },
        },
        getControl: (C) => {
          const le = rl(),
            ie = C === !0 || u.value !== !0 || _ !== !0;
          if (e.useInput === !0) le.push(Wo(C, ie));
          else if (X.editable.value === !0) {
            const st = ie === !0 ? rn.value : void 0;
            le.push(
              E("input", {
                ref: ie === !0 ? N : void 0,
                key: "d_t",
                class: "q-select__focus-target",
                id: ie === !0 ? X.targetUid.value : void 0,
                value: ee.value,
                readonly: !0,
                "data-autofocus": C === !0 || e.autofocus === !0 || void 0,
                ...st,
                onKeydown: el,
                onKeyup: Si,
                onKeypress: Xa,
              })
            ),
              ie === !0 &&
                typeof e.autocomplete == "string" &&
                e.autocomplete.length !== 0 &&
                le.push(
                  E("input", {
                    class: "q-select__autocomplete-input",
                    autocomplete: e.autocomplete,
                    tabindex: -1,
                    onKeyup: ki,
                  })
                );
          }
          if (
            pe.value !== void 0 &&
            e.disable !== !0 &&
            qe.value.length !== 0
          ) {
            const st = qe.value.map((tt) =>
              E("option", { value: tt, selected: !0 })
            );
            le.push(
              E(
                "select",
                { class: "hidden", name: pe.value, multiple: e.multiple },
                st
              )
            );
          }
          const De =
            e.useInput === !0 || ie !== !0
              ? void 0
              : X.splitAttrs.attributes.value;
          return E(
            "div",
            {
              class: "q-field__native row items-center",
              ...De,
              ...X.splitAttrs.listeners.value,
            },
            le
          );
        },
        getInnerAppend: () =>
          e.loading !== !0 && v.value !== !0 && e.hideDropdownIcon !== !0
            ? [
                E(Wt, {
                  class:
                    "q-select__dropdown-icon" +
                    (s.value === !0 ? " rotate-180" : ""),
                  name: Kt.value,
                }),
              ]
            : null,
      }),
      Yh(X)
    );
  },
});
function BS(e) {
  const t = [0.06, 6, 50];
  return (
    typeof e == "string" &&
      e.length &&
      e.split(":").forEach((r, a) => {
        const l = parseFloat(r);
        l && (t[a] = l);
      }),
    t
  );
}
var FS = Fh({
  name: "touch-swipe",
  beforeMount(e, { value: t, arg: r, modifiers: a }) {
    if (a.mouse !== !0 && zi.has.touch !== !0) return;
    const l = a.mouseCapture === !0 ? "Capture" : "",
      s = {
        handler: t,
        sensitivity: BS(r),
        direction: ih(a),
        noop: Eh,
        mouseStart(u) {
          ah(u, s) &&
            Qb(u) &&
            (Hr(s, "temp", [
              [document, "mousemove", "move", `notPassive${l}`],
              [document, "mouseup", "end", "notPassiveCapture"],
            ]),
            s.start(u, !0));
        },
        touchStart(u) {
          if (ah(u, s)) {
            const d = u.target;
            Hr(s, "temp", [
              [d, "touchmove", "move", "notPassiveCapture"],
              [d, "touchcancel", "end", "notPassiveCapture"],
              [d, "touchend", "end", "notPassiveCapture"],
            ]),
              s.start(u);
          }
        },
        start(u, d) {
          zi.is.firefox === !0 && uu(e, !0);
          const f = Du(u);
          s.event = {
            x: f.left,
            y: f.top,
            time: Date.now(),
            mouse: d === !0,
            dir: !1,
          };
        },
        move(u) {
          if (s.event === void 0) return;
          if (s.event.dir !== !1) {
            Ft(u);
            return;
          }
          const d = Date.now() - s.event.time;
          if (d === 0) return;
          const f = Du(u),
            g = f.left - s.event.x,
            v = Math.abs(g),
            T = f.top - s.event.y,
            M = Math.abs(T);
          if (s.event.mouse !== !0) {
            if (v < s.sensitivity[1] && M < s.sensitivity[1]) {
              s.end(u);
              return;
            }
          } else if (window.getSelection().toString() !== "") {
            s.end(u);
            return;
          } else if (v < s.sensitivity[2] && M < s.sensitivity[2]) return;
          const _ = v / d,
            P = M / d;
          s.direction.vertical === !0 &&
            v < M &&
            v < 100 &&
            P > s.sensitivity[0] &&
            (s.event.dir = T < 0 ? "up" : "down"),
            s.direction.horizontal === !0 &&
              v > M &&
              M < 100 &&
              _ > s.sensitivity[0] &&
              (s.event.dir = g < 0 ? "left" : "right"),
            s.direction.up === !0 &&
              v < M &&
              T < 0 &&
              v < 100 &&
              P > s.sensitivity[0] &&
              (s.event.dir = "up"),
            s.direction.down === !0 &&
              v < M &&
              T > 0 &&
              v < 100 &&
              P > s.sensitivity[0] &&
              (s.event.dir = "down"),
            s.direction.left === !0 &&
              v > M &&
              g < 0 &&
              M < 100 &&
              _ > s.sensitivity[0] &&
              (s.event.dir = "left"),
            s.direction.right === !0 &&
              v > M &&
              g > 0 &&
              M < 100 &&
              _ > s.sensitivity[0] &&
              (s.event.dir = "right"),
            s.event.dir !== !1
              ? (Ft(u),
                s.event.mouse === !0 &&
                  (document.body.classList.add("no-pointer-events--children"),
                  document.body.classList.add("non-selectable"),
                  fo(),
                  (s.styleCleanup = ($) => {
                    (s.styleCleanup = void 0),
                      document.body.classList.remove("non-selectable");
                    const L = () => {
                      document.body.classList.remove(
                        "no-pointer-events--children"
                      );
                    };
                    $ === !0 ? setTimeout(L, 50) : L();
                  })),
                s.handler({
                  evt: u,
                  touch: s.event.mouse !== !0,
                  mouse: s.event.mouse,
                  direction: s.event.dir,
                  duration: d,
                  distance: { x: v, y: M },
                }))
              : s.end(u);
        },
        end(u) {
          s.event !== void 0 &&
            (Ki(s, "temp"),
            zi.is.firefox === !0 && uu(e, !1),
            s.styleCleanup !== void 0 && s.styleCleanup(!0),
            u !== void 0 && s.event.dir !== !1 && Ft(u),
            (s.event = void 0));
        },
      };
    if (((e.__qtouchswipe = s), a.mouse === !0)) {
      const u = a.mouseCapture === !0 || a.mousecapture === !0 ? "Capture" : "";
      Hr(s, "main", [[e, "mousedown", "mouseStart", `passive${u}`]]);
    }
    zi.has.touch === !0 &&
      Hr(s, "main", [
        [
          e,
          "touchstart",
          "touchStart",
          `passive${a.capture === !0 ? "Capture" : ""}`,
        ],
        [e, "touchmove", "noop", "notPassiveCapture"],
      ]);
  },
  updated(e, t) {
    const r = e.__qtouchswipe;
    r !== void 0 &&
      (t.oldValue !== t.value &&
        (typeof t.value != "function" && r.end(), (r.handler = t.value)),
      (r.direction = ih(t.modifiers)));
  },
  beforeUnmount(e) {
    const t = e.__qtouchswipe;
    t !== void 0 &&
      (Ki(t, "main"),
      Ki(t, "temp"),
      zi.is.firefox === !0 && uu(e, !1),
      t.styleCleanup !== void 0 && t.styleCleanup(),
      delete e.__qtouchswipe);
  },
});
function US() {
  const e = new Map();
  return {
    getCache: function (t, r) {
      return e[t] === void 0 ? (e[t] = r) : e[t];
    },
    getCacheWithFn: function (t, r) {
      return e[t] === void 0 ? (e[t] = r()) : e[t];
    },
  };
}
const bg = { name: { required: !0 }, disable: Boolean },
  ph = {
    setup(e, { slots: t }) {
      return () =>
        E("div", { class: "q-panel scroll", role: "tabpanel" }, Mt(t.default));
    },
  },
  wg = {
    modelValue: { required: !0 },
    animated: Boolean,
    infinite: Boolean,
    swipeable: Boolean,
    vertical: Boolean,
    transitionPrev: String,
    transitionNext: String,
    transitionDuration: { type: [String, Number], default: 300 },
    keepAlive: Boolean,
    keepAliveInclude: [String, Array, RegExp],
    keepAliveExclude: [String, Array, RegExp],
    keepAliveMax: Number,
  },
  Sg = ["update:modelValue", "beforeTransition", "transition"];
function kg() {
  const { props: e, emit: t, proxy: r } = Dt(),
    { getCacheWithFn: a } = US();
  let l, s;
  const u = se(null),
    d = se(null);
  function f(te) {
    const xe = e.vertical === !0 ? "up" : "left";
    z((r.$q.lang.rtl === !0 ? -1 : 1) * (te.direction === xe ? 1 : -1));
  }
  const g = I(() => [
      [
        FS,
        f,
        void 0,
        { horizontal: e.vertical !== !0, vertical: e.vertical, mouse: !0 },
      ],
    ]),
    v = I(
      () => e.transitionPrev || `slide-${e.vertical === !0 ? "down" : "right"}`
    ),
    T = I(
      () => e.transitionNext || `slide-${e.vertical === !0 ? "up" : "left"}`
    ),
    M = I(() => `--q-transition-duration: ${e.transitionDuration}ms`),
    _ = I(() =>
      typeof e.modelValue == "string" || typeof e.modelValue == "number"
        ? e.modelValue
        : String(e.modelValue)
    ),
    P = I(() => ({
      include: e.keepAliveInclude,
      exclude: e.keepAliveExclude,
      max: e.keepAliveMax,
    })),
    $ = I(() => e.keepAliveInclude !== void 0 || e.keepAliveExclude !== void 0);
  ze(
    () => e.modelValue,
    (te, xe) => {
      const Be = D(te) === !0 ? A(te) : -1;
      s !== !0 && J(Be === -1 ? 0 : Be < A(xe) ? -1 : 1),
        u.value !== Be &&
          ((u.value = Be),
          t("beforeTransition", te, xe),
          Sn(() => {
            t("transition", te, xe);
          }));
    }
  );
  function L() {
    z(1);
  }
  function F() {
    z(-1);
  }
  function W(te) {
    t("update:modelValue", te);
  }
  function D(te) {
    return te != null && te !== "";
  }
  function A(te) {
    return l.findIndex(
      (xe) =>
        xe.props.name === te &&
        xe.props.disable !== "" &&
        xe.props.disable !== !0
    );
  }
  function N() {
    return l.filter((te) => te.props.disable !== "" && te.props.disable !== !0);
  }
  function J(te) {
    const xe =
      te !== 0 && e.animated === !0 && u.value !== -1
        ? "q-transition--" + (te === -1 ? v.value : T.value)
        : null;
    d.value !== xe && (d.value = xe);
  }
  function z(te, xe = u.value) {
    let Be = xe + te;
    for (; Be > -1 && Be < l.length; ) {
      const j = l[Be];
      if (j !== void 0 && j.props.disable !== "" && j.props.disable !== !0) {
        J(te),
          (s = !0),
          t("update:modelValue", j.props.name),
          setTimeout(() => {
            s = !1;
          });
        return;
      }
      Be += te;
    }
    e.infinite === !0 &&
      l.length !== 0 &&
      xe !== -1 &&
      xe !== l.length &&
      z(te, te === -1 ? l.length : -1);
  }
  function H() {
    const te = A(e.modelValue);
    return u.value !== te && (u.value = te), !0;
  }
  function pe() {
    const te = D(e.modelValue) === !0 && H() && l[u.value];
    return e.keepAlive === !0
      ? [
          E(jb, P.value, [
            E(
              $.value === !0
                ? a(_.value, () => ({ ...ph, name: _.value }))
                : ph,
              { key: _.value, style: M.value },
              () => te
            ),
          ]),
        ]
      : [
          E(
            "div",
            {
              class: "q-panel scroll",
              style: M.value,
              key: _.value,
              role: "tabpanel",
            },
            [te]
          ),
        ];
  }
  function _e() {
    if (l.length !== 0)
      return e.animated === !0 ? [E(Ya, { name: d.value }, pe)] : pe();
  }
  function Pe(te) {
    return (
      (l = Ju(Mt(te.default, [])).filter(
        (xe) =>
          xe.props !== null &&
          xe.props.slot === void 0 &&
          D(xe.props.name) === !0
      )),
      l.length
    );
  }
  function lt() {
    return l;
  }
  return (
    Object.assign(r, { next: L, previous: F, goTo: W }),
    {
      panelIndex: u,
      panelDirectives: g,
      updatePanelsList: Pe,
      updatePanelIndex: H,
      getPanelContent: _e,
      getEnabledPanels: N,
      getPanels: lt,
      isValidPanelName: D,
      keepAliveProps: P,
      needsUniqueKeepAliveWrapper: $,
      goToPanelByOffset: z,
      goToPanel: W,
      nextPanel: L,
      previousPanel: F,
    }
  );
}
var bu = Je({
    name: "QTabPanel",
    props: bg,
    setup(e, { slots: t }) {
      return () =>
        E("div", { class: "q-tab-panel", role: "tabpanel" }, Mt(t.default));
    },
  }),
  VS = Je({
    name: "QTabPanels",
    props: { ...wg, ...ir },
    emits: Sg,
    setup(e, { slots: t }) {
      const r = Dt(),
        a = ar(e, r.proxy.$q),
        { updatePanelsList: l, getPanelContent: s, panelDirectives: u } = kg(),
        d = I(
          () =>
            "q-tab-panels q-panel-parent" +
            (a.value === !0 ? " q-tab-panels--dark q-dark" : "")
        );
      return () => (
        l(t),
        Ku("div", { class: d.value }, s(), "pan", e.swipeable, () => u.value)
      );
    },
  });
const yh = (e) => {
  e = (1831565813 + (e |= 0)) | 0;
  let t = Math.imul(e ^ (e >>> 15), 1 | e);
  return (
    (t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t),
    ((t ^ (t >>> 14)) >>> 0) / 4294967296
  );
};
class zS {
  constructor(t) {
    (this.dictionaries = void 0),
      (this.length = void 0),
      (this.separator = void 0),
      (this.style = void 0),
      (this.seed = void 0);
    const { length: r, separator: a, dictionaries: l, style: s, seed: u } = t;
    (this.dictionaries = l),
      (this.separator = a),
      (this.length = r),
      (this.style = s),
      (this.seed = u);
  }
  generate() {
    if (!this.dictionaries)
      throw new Error(
        'Cannot find any dictionary. Please provide at least one, or leave the "dictionary" field empty in the config object'
      );
    if (this.length <= 0) throw new Error("Invalid length provided");
    if (this.length > this.dictionaries.length)
      throw new Error(`The length cannot be bigger than the number of dictionaries.
Length provided: ${this.length}. Number of dictionaries provided: ${this.dictionaries.length}`);
    let t = this.seed;
    return this.dictionaries.slice(0, this.length).reduce((r, a) => {
      let l;
      t
        ? ((l = ((u) => {
            if (typeof u == "string") {
              const d = u
                  .split("")
                  .map((g) => g.charCodeAt(0))
                  .reduce((g, v) => g + v, 1),
                f = Math.floor(Number(d));
              return yh(f);
            }
            return yh(u);
          })(t)),
          (t = 4294967296 * l))
        : (l = Math.random());
      let s = a[Math.floor(l * a.length)] || "";
      if (this.style === "lowerCase") s = s.toLowerCase();
      else if (this.style === "capital") {
        const [u, ...d] = s.split("");
        s = u.toUpperCase() + d.join("");
      } else this.style === "upperCase" && (s = s.toUpperCase());
      return r ? `${r}${this.separator}${s}` : `${s}`;
    }, "");
  }
}
const _h = { separator: "_", dictionaries: [] },
  Cg = (e) => {
    const t = [...((e && e.dictionaries) || _h.dictionaries)],
      r = { ..._h, ...e, length: (e && e.length) || t.length, dictionaries: t };
    if (!e || !e.dictionaries || !e.dictionaries.length)
      throw new Error(
        'A "dictionaries" array must be provided. This is a breaking change introduced starting from Unique Name Generator v4. Read more about the breaking change here: https://github.com/andreasonny83/unique-names-generator#migration-guide'
      );
    return new zS(r).generate();
  };
var Tg = [
    "able",
    "above",
    "absent",
    "absolute",
    "abstract",
    "abundant",
    "academic",
    "acceptable",
    "accepted",
    "accessible",
    "accurate",
    "accused",
    "active",
    "actual",
    "acute",
    "added",
    "additional",
    "adequate",
    "adjacent",
    "administrative",
    "adorable",
    "advanced",
    "adverse",
    "advisory",
    "aesthetic",
    "afraid",
    "aggregate",
    "aggressive",
    "agreeable",
    "agreed",
    "agricultural",
    "alert",
    "alive",
    "alleged",
    "allied",
    "alone",
    "alright",
    "alternative",
    "amateur",
    "amazing",
    "ambitious",
    "amused",
    "ancient",
    "angry",
    "annoyed",
    "annual",
    "anonymous",
    "anxious",
    "appalling",
    "apparent",
    "applicable",
    "appropriate",
    "arbitrary",
    "architectural",
    "armed",
    "arrogant",
    "artificial",
    "artistic",
    "ashamed",
    "asleep",
    "assistant",
    "associated",
    "atomic",
    "attractive",
    "automatic",
    "autonomous",
    "available",
    "average",
    "awake",
    "aware",
    "awful",
    "awkward",
    "back",
    "bad",
    "balanced",
    "bare",
    "basic",
    "beautiful",
    "beneficial",
    "better",
    "bewildered",
    "big",
    "binding",
    "biological",
    "bitter",
    "bizarre",
    "blank",
    "blind",
    "blonde",
    "bloody",
    "blushing",
    "boiling",
    "bold",
    "bored",
    "boring",
    "bottom",
    "brainy",
    "brave",
    "breakable",
    "breezy",
    "brief",
    "bright",
    "brilliant",
    "broad",
    "broken",
    "bumpy",
    "burning",
    "busy",
    "calm",
    "capable",
    "capitalist",
    "careful",
    "casual",
    "causal",
    "cautious",
    "central",
    "certain",
    "changing",
    "characteristic",
    "charming",
    "cheap",
    "cheerful",
    "chemical",
    "chief",
    "chilly",
    "chosen",
    "christian",
    "chronic",
    "chubby",
    "circular",
    "civic",
    "civil",
    "civilian",
    "classic",
    "classical",
    "clean",
    "clear",
    "clever",
    "clinical",
    "close",
    "closed",
    "cloudy",
    "clumsy",
    "coastal",
    "cognitive",
    "coherent",
    "cold",
    "collective",
    "colonial",
    "colorful",
    "colossal",
    "coloured",
    "colourful",
    "combative",
    "combined",
    "comfortable",
    "coming",
    "commercial",
    "common",
    "communist",
    "compact",
    "comparable",
    "comparative",
    "compatible",
    "competent",
    "competitive",
    "complete",
    "complex",
    "complicated",
    "comprehensive",
    "compulsory",
    "conceptual",
    "concerned",
    "concrete",
    "condemned",
    "confident",
    "confidential",
    "confused",
    "conscious",
    "conservation",
    "conservative",
    "considerable",
    "consistent",
    "constant",
    "constitutional",
    "contemporary",
    "content",
    "continental",
    "continued",
    "continuing",
    "continuous",
    "controlled",
    "controversial",
    "convenient",
    "conventional",
    "convinced",
    "convincing",
    "cooing",
    "cool",
    "cooperative",
    "corporate",
    "correct",
    "corresponding",
    "costly",
    "courageous",
    "crazy",
    "creative",
    "creepy",
    "criminal",
    "critical",
    "crooked",
    "crowded",
    "crucial",
    "crude",
    "cruel",
    "cuddly",
    "cultural",
    "curious",
    "curly",
    "current",
    "curved",
    "cute",
    "daily",
    "damaged",
    "damp",
    "dangerous",
    "dark",
    "dead",
    "deaf",
    "deafening",
    "dear",
    "decent",
    "decisive",
    "deep",
    "defeated",
    "defensive",
    "defiant",
    "definite",
    "deliberate",
    "delicate",
    "delicious",
    "delighted",
    "delightful",
    "democratic",
    "dependent",
    "depressed",
    "desirable",
    "desperate",
    "detailed",
    "determined",
    "developed",
    "developing",
    "devoted",
    "different",
    "difficult",
    "digital",
    "diplomatic",
    "direct",
    "dirty",
    "disabled",
    "disappointed",
    "disastrous",
    "disciplinary",
    "disgusted",
    "distant",
    "distinct",
    "distinctive",
    "distinguished",
    "disturbed",
    "disturbing",
    "diverse",
    "divine",
    "dizzy",
    "domestic",
    "dominant",
    "double",
    "doubtful",
    "drab",
    "dramatic",
    "dreadful",
    "driving",
    "drunk",
    "dry",
    "dual",
    "due",
    "dull",
    "dusty",
    "dutch",
    "dying",
    "dynamic",
    "eager",
    "early",
    "eastern",
    "easy",
    "economic",
    "educational",
    "eerie",
    "effective",
    "efficient",
    "elaborate",
    "elated",
    "elderly",
    "eldest",
    "electoral",
    "electric",
    "electrical",
    "electronic",
    "elegant",
    "eligible",
    "embarrassed",
    "embarrassing",
    "emotional",
    "empirical",
    "empty",
    "enchanting",
    "encouraging",
    "endless",
    "energetic",
    "enormous",
    "enthusiastic",
    "entire",
    "entitled",
    "envious",
    "environmental",
    "equal",
    "equivalent",
    "essential",
    "established",
    "estimated",
    "ethical",
    "ethnic",
    "eventual",
    "everyday",
    "evident",
    "evil",
    "evolutionary",
    "exact",
    "excellent",
    "exceptional",
    "excess",
    "excessive",
    "excited",
    "exciting",
    "exclusive",
    "existing",
    "exotic",
    "expected",
    "expensive",
    "experienced",
    "experimental",
    "explicit",
    "extended",
    "extensive",
    "external",
    "extra",
    "extraordinary",
    "extreme",
    "exuberant",
    "faint",
    "fair",
    "faithful",
    "familiar",
    "famous",
    "fancy",
    "fantastic",
    "far",
    "fascinating",
    "fashionable",
    "fast",
    "fat",
    "fatal",
    "favourable",
    "favourite",
    "federal",
    "fellow",
    "female",
    "feminist",
    "few",
    "fierce",
    "filthy",
    "final",
    "financial",
    "fine",
    "firm",
    "fiscal",
    "fit",
    "fixed",
    "flaky",
    "flat",
    "flexible",
    "fluffy",
    "fluttering",
    "flying",
    "following",
    "fond",
    "foolish",
    "foreign",
    "formal",
    "formidable",
    "forthcoming",
    "fortunate",
    "forward",
    "fragile",
    "frail",
    "frantic",
    "free",
    "frequent",
    "fresh",
    "friendly",
    "frightened",
    "front",
    "frozen",
    "full",
    "fun",
    "functional",
    "fundamental",
    "funny",
    "furious",
    "future",
    "fuzzy",
    "gastric",
    "gay",
    "general",
    "generous",
    "genetic",
    "gentle",
    "genuine",
    "geographical",
    "giant",
    "gigantic",
    "given",
    "glad",
    "glamorous",
    "gleaming",
    "global",
    "glorious",
    "golden",
    "good",
    "gorgeous",
    "gothic",
    "governing",
    "graceful",
    "gradual",
    "grand",
    "grateful",
    "greasy",
    "great",
    "grieving",
    "grim",
    "gross",
    "grotesque",
    "growing",
    "grubby",
    "grumpy",
    "guilty",
    "handicapped",
    "handsome",
    "happy",
    "hard",
    "harsh",
    "head",
    "healthy",
    "heavy",
    "helpful",
    "helpless",
    "hidden",
    "high",
    "hilarious",
    "hissing",
    "historic",
    "historical",
    "hollow",
    "holy",
    "homeless",
    "homely",
    "hon",
    "honest",
    "horizontal",
    "horrible",
    "hostile",
    "hot",
    "huge",
    "human",
    "hungry",
    "hurt",
    "hushed",
    "husky",
    "icy",
    "ideal",
    "identical",
    "ideological",
    "ill",
    "illegal",
    "imaginative",
    "immediate",
    "immense",
    "imperial",
    "implicit",
    "important",
    "impossible",
    "impressed",
    "impressive",
    "improved",
    "inadequate",
    "inappropriate",
    "inc",
    "inclined",
    "increased",
    "increasing",
    "incredible",
    "independent",
    "indirect",
    "individual",
    "industrial",
    "inevitable",
    "influential",
    "informal",
    "inherent",
    "initial",
    "injured",
    "inland",
    "inner",
    "innocent",
    "innovative",
    "inquisitive",
    "instant",
    "institutional",
    "insufficient",
    "intact",
    "integral",
    "integrated",
    "intellectual",
    "intelligent",
    "intense",
    "intensive",
    "interested",
    "interesting",
    "interim",
    "interior",
    "intermediate",
    "internal",
    "international",
    "intimate",
    "invisible",
    "involved",
    "irrelevant",
    "isolated",
    "itchy",
    "jealous",
    "jittery",
    "joint",
    "jolly",
    "joyous",
    "judicial",
    "juicy",
    "junior",
    "just",
    "keen",
    "key",
    "kind",
    "known",
    "labour",
    "large",
    "late",
    "latin",
    "lazy",
    "leading",
    "left",
    "legal",
    "legislative",
    "legitimate",
    "lengthy",
    "lesser",
    "level",
    "lexical",
    "liable",
    "liberal",
    "light",
    "like",
    "likely",
    "limited",
    "linear",
    "linguistic",
    "liquid",
    "literary",
    "little",
    "live",
    "lively",
    "living",
    "local",
    "logical",
    "lonely",
    "long",
    "loose",
    "lost",
    "loud",
    "lovely",
    "low",
    "loyal",
    "ltd",
    "lucky",
    "mad",
    "magic",
    "magnetic",
    "magnificent",
    "main",
    "major",
    "male",
    "mammoth",
    "managerial",
    "managing",
    "manual",
    "many",
    "marginal",
    "marine",
    "marked",
    "married",
    "marvellous",
    "marxist",
    "mass",
    "massive",
    "mathematical",
    "mature",
    "maximum",
    "mean",
    "meaningful",
    "mechanical",
    "medical",
    "medieval",
    "melodic",
    "melted",
    "mental",
    "mere",
    "metropolitan",
    "mid",
    "middle",
    "mighty",
    "mild",
    "military",
    "miniature",
    "minimal",
    "minimum",
    "ministerial",
    "minor",
    "miserable",
    "misleading",
    "missing",
    "misty",
    "mixed",
    "moaning",
    "mobile",
    "moderate",
    "modern",
    "modest",
    "molecular",
    "monetary",
    "monthly",
    "moral",
    "motionless",
    "muddy",
    "multiple",
    "mushy",
    "musical",
    "mute",
    "mutual",
    "mysterious",
    "naked",
    "narrow",
    "nasty",
    "national",
    "native",
    "natural",
    "naughty",
    "naval",
    "near",
    "nearby",
    "neat",
    "necessary",
    "negative",
    "neighbouring",
    "nervous",
    "net",
    "neutral",
    "new",
    "nice",
    "noble",
    "noisy",
    "normal",
    "northern",
    "nosy",
    "notable",
    "novel",
    "nuclear",
    "numerous",
    "nursing",
    "nutritious",
    "nutty",
    "obedient",
    "objective",
    "obliged",
    "obnoxious",
    "obvious",
    "occasional",
    "occupational",
    "odd",
    "official",
    "ok",
    "okay",
    "old",
    "olympic",
    "only",
    "open",
    "operational",
    "opposite",
    "optimistic",
    "oral",
    "ordinary",
    "organic",
    "organisational",
    "original",
    "orthodox",
    "other",
    "outdoor",
    "outer",
    "outrageous",
    "outside",
    "outstanding",
    "overall",
    "overseas",
    "overwhelming",
    "painful",
    "pale",
    "panicky",
    "parallel",
    "parental",
    "parliamentary",
    "partial",
    "particular",
    "passing",
    "passive",
    "past",
    "patient",
    "payable",
    "peaceful",
    "peculiar",
    "perfect",
    "permanent",
    "persistent",
    "personal",
    "petite",
    "philosophical",
    "physical",
    "plain",
    "planned",
    "plastic",
    "pleasant",
    "pleased",
    "poised",
    "polite",
    "political",
    "poor",
    "popular",
    "positive",
    "possible",
    "potential",
    "powerful",
    "practical",
    "precious",
    "precise",
    "preferred",
    "pregnant",
    "preliminary",
    "premier",
    "prepared",
    "present",
    "presidential",
    "pretty",
    "previous",
    "prickly",
    "primary",
    "prime",
    "primitive",
    "principal",
    "printed",
    "prior",
    "private",
    "probable",
    "productive",
    "professional",
    "profitable",
    "profound",
    "progressive",
    "prominent",
    "promising",
    "proper",
    "proposed",
    "prospective",
    "protective",
    "protestant",
    "proud",
    "provincial",
    "psychiatric",
    "psychological",
    "public",
    "puny",
    "pure",
    "purring",
    "puzzled",
    "quaint",
    "qualified",
    "quarrelsome",
    "querulous",
    "quick",
    "quickest",
    "quiet",
    "quintessential",
    "quixotic",
    "racial",
    "radical",
    "rainy",
    "random",
    "rapid",
    "rare",
    "raspy",
    "rational",
    "ratty",
    "raw",
    "ready",
    "real",
    "realistic",
    "rear",
    "reasonable",
    "recent",
    "reduced",
    "redundant",
    "regional",
    "registered",
    "regular",
    "regulatory",
    "related",
    "relative",
    "relaxed",
    "relevant",
    "reliable",
    "relieved",
    "religious",
    "reluctant",
    "remaining",
    "remarkable",
    "remote",
    "renewed",
    "representative",
    "repulsive",
    "required",
    "resident",
    "residential",
    "resonant",
    "respectable",
    "respective",
    "responsible",
    "resulting",
    "retail",
    "retired",
    "revolutionary",
    "rich",
    "ridiculous",
    "right",
    "rigid",
    "ripe",
    "rising",
    "rival",
    "roasted",
    "robust",
    "rolling",
    "romantic",
    "rotten",
    "rough",
    "round",
    "royal",
    "rubber",
    "rude",
    "ruling",
    "running",
    "rural",
    "sacred",
    "sad",
    "safe",
    "salty",
    "satisfactory",
    "satisfied",
    "scared",
    "scary",
    "scattered",
    "scientific",
    "scornful",
    "scrawny",
    "screeching",
    "secondary",
    "secret",
    "secure",
    "select",
    "selected",
    "selective",
    "selfish",
    "semantic",
    "senior",
    "sensible",
    "sensitive",
    "separate",
    "serious",
    "severe",
    "sexual",
    "shaggy",
    "shaky",
    "shallow",
    "shared",
    "sharp",
    "sheer",
    "shiny",
    "shivering",
    "shocked",
    "short",
    "shrill",
    "shy",
    "sick",
    "significant",
    "silent",
    "silky",
    "silly",
    "similar",
    "simple",
    "single",
    "skilled",
    "skinny",
    "sleepy",
    "slight",
    "slim",
    "slimy",
    "slippery",
    "slow",
    "small",
    "smart",
    "smiling",
    "smoggy",
    "smooth",
    "social",
    "socialist",
    "soft",
    "solar",
    "sole",
    "solid",
    "sophisticated",
    "sore",
    "sorry",
    "sound",
    "sour",
    "southern",
    "soviet",
    "spare",
    "sparkling",
    "spatial",
    "special",
    "specific",
    "specified",
    "spectacular",
    "spicy",
    "spiritual",
    "splendid",
    "spontaneous",
    "sporting",
    "spotless",
    "spotty",
    "square",
    "squealing",
    "stable",
    "stale",
    "standard",
    "static",
    "statistical",
    "statutory",
    "steady",
    "steep",
    "sticky",
    "stiff",
    "still",
    "stingy",
    "stormy",
    "straight",
    "straightforward",
    "strange",
    "strategic",
    "strict",
    "striking",
    "striped",
    "strong",
    "structural",
    "stuck",
    "stupid",
    "subjective",
    "subsequent",
    "substantial",
    "subtle",
    "successful",
    "successive",
    "sudden",
    "sufficient",
    "suitable",
    "sunny",
    "super",
    "superb",
    "superior",
    "supporting",
    "supposed",
    "supreme",
    "sure",
    "surprised",
    "surprising",
    "surrounding",
    "surviving",
    "suspicious",
    "sweet",
    "swift",
    "symbolic",
    "sympathetic",
    "systematic",
    "tall",
    "tame",
    "tart",
    "tasteless",
    "tasty",
    "technical",
    "technological",
    "teenage",
    "temporary",
    "tender",
    "tense",
    "terrible",
    "territorial",
    "testy",
    "then",
    "theoretical",
    "thick",
    "thin",
    "thirsty",
    "thorough",
    "thoughtful",
    "thoughtless",
    "thundering",
    "tight",
    "tiny",
    "tired",
    "top",
    "tory",
    "total",
    "tough",
    "toxic",
    "traditional",
    "tragic",
    "tremendous",
    "tricky",
    "tropical",
    "troubled",
    "typical",
    "ugliest",
    "ugly",
    "ultimate",
    "unable",
    "unacceptable",
    "unaware",
    "uncertain",
    "unchanged",
    "uncomfortable",
    "unconscious",
    "underground",
    "underlying",
    "unemployed",
    "uneven",
    "unexpected",
    "unfair",
    "unfortunate",
    "unhappy",
    "uniform",
    "uninterested",
    "unique",
    "united",
    "universal",
    "unknown",
    "unlikely",
    "unnecessary",
    "unpleasant",
    "unsightly",
    "unusual",
    "unwilling",
    "upper",
    "upset",
    "uptight",
    "urban",
    "urgent",
    "used",
    "useful",
    "useless",
    "usual",
    "vague",
    "valid",
    "valuable",
    "variable",
    "varied",
    "various",
    "varying",
    "vast",
    "verbal",
    "vertical",
    "very",
    "vicarious",
    "vicious",
    "victorious",
    "violent",
    "visible",
    "visiting",
    "visual",
    "vital",
    "vitreous",
    "vivacious",
    "vivid",
    "vocal",
    "vocational",
    "voiceless",
    "voluminous",
    "voluntary",
    "vulnerable",
    "wandering",
    "warm",
    "wasteful",
    "watery",
    "weak",
    "wealthy",
    "weary",
    "wee",
    "weekly",
    "weird",
    "welcome",
    "well",
    "western",
    "wet",
    "whispering",
    "whole",
    "wicked",
    "wide",
    "widespread",
    "wild",
    "wilful",
    "willing",
    "willowy",
    "wily",
    "wise",
    "wispy",
    "wittering",
    "witty",
    "wonderful",
    "wooden",
    "working",
    "worldwide",
    "worried",
    "worrying",
    "worthwhile",
    "worthy",
    "written",
    "wrong",
    "xenacious",
    "xenial",
    "xenogeneic",
    "xenophobic",
    "xeric",
    "xerothermic",
    "yabbering",
    "yammering",
    "yappiest",
    "yappy",
    "yawning",
    "yearling",
    "yearning",
    "yeasty",
    "yelling",
    "yelping",
    "yielding",
    "yodelling",
    "young",
    "youngest",
    "youthful",
    "ytterbic",
    "yucky",
    "yummy",
    "zany",
    "zealous",
    "zeroth",
    "zestful",
    "zesty",
    "zippy",
    "zonal",
    "zoophagous",
    "zygomorphic",
    "zygotic",
  ],
  Mg = [
    "aardvark",
    "aardwolf",
    "albatross",
    "alligator",
    "alpaca",
    "amphibian",
    "anaconda",
    "angelfish",
    "anglerfish",
    "ant",
    "anteater",
    "antelope",
    "antlion",
    "ape",
    "aphid",
    "armadillo",
    "asp",
    "baboon",
    "badger",
    "bandicoot",
    "barnacle",
    "barracuda",
    "basilisk",
    "bass",
    "bat",
    "bear",
    "beaver",
    "bedbug",
    "bee",
    "beetle",
    "bird",
    "bison",
    "blackbird",
    "boa",
    "boar",
    "bobcat",
    "bobolink",
    "bonobo",
    "booby",
    "bovid",
    "bug",
    "butterfly",
    "buzzard",
    "camel",
    "canid",
    "canidae",
    "capybara",
    "cardinal",
    "caribou",
    "carp",
    "cat",
    "caterpillar",
    "catfish",
    "catshark",
    "cattle",
    "centipede",
    "cephalopod",
    "chameleon",
    "cheetah",
    "chickadee",
    "chicken",
    "chimpanzee",
    "chinchilla",
    "chipmunk",
    "cicada",
    "clam",
    "clownfish",
    "cobra",
    "cockroach",
    "cod",
    "condor",
    "constrictor",
    "coral",
    "cougar",
    "cow",
    "coyote",
    "crab",
    "crane",
    "crawdad",
    "crayfish",
    "cricket",
    "crocodile",
    "crow",
    "cuckoo",
    "damselfly",
    "deer",
    "dingo",
    "dinosaur",
    "dog",
    "dolphin",
    "donkey",
    "dormouse",
    "dove",
    "dragon",
    "dragonfly",
    "duck",
    "eagle",
    "earthworm",
    "earwig",
    "echidna",
    "eel",
    "egret",
    "elephant",
    "elk",
    "emu",
    "ermine",
    "falcon",
    "felidae",
    "ferret",
    "finch",
    "firefly",
    "fish",
    "flamingo",
    "flea",
    "fly",
    "flyingfish",
    "fowl",
    "fox",
    "frog",
    "galliform",
    "gamefowl",
    "gayal",
    "gazelle",
    "gecko",
    "gerbil",
    "gibbon",
    "giraffe",
    "goat",
    "goldfish",
    "goose",
    "gopher",
    "gorilla",
    "grasshopper",
    "grouse",
    "guan",
    "guanaco",
    "guineafowl",
    "gull",
    "guppy",
    "haddock",
    "halibut",
    "hamster",
    "hare",
    "harrier",
    "hawk",
    "hedgehog",
    "heron",
    "herring",
    "hippopotamus",
    "hookworm",
    "hornet",
    "horse",
    "hoverfly",
    "hummingbird",
    "hyena",
    "iguana",
    "impala",
    "jackal",
    "jaguar",
    "jay",
    "jellyfish",
    "junglefowl",
    "kangaroo",
    "kingfisher",
    "kite",
    "kiwi",
    "koala",
    "koi",
    "krill",
    "ladybug",
    "lamprey",
    "landfowl",
    "lark",
    "leech",
    "lemming",
    "lemur",
    "leopard",
    "leopon",
    "limpet",
    "lion",
    "lizard",
    "llama",
    "lobster",
    "locust",
    "loon",
    "louse",
    "lungfish",
    "lynx",
    "macaw",
    "mackerel",
    "magpie",
    "mammal",
    "manatee",
    "mandrill",
    "marlin",
    "marmoset",
    "marmot",
    "marsupial",
    "marten",
    "mastodon",
    "meadowlark",
    "meerkat",
    "mink",
    "minnow",
    "mite",
    "mockingbird",
    "mole",
    "mollusk",
    "mongoose",
    "monkey",
    "moose",
    "mosquito",
    "moth",
    "mouse",
    "mule",
    "muskox",
    "narwhal",
    "newt",
    "nightingale",
    "ocelot",
    "octopus",
    "opossum",
    "orangutan",
    "orca",
    "ostrich",
    "otter",
    "owl",
    "ox",
    "panda",
    "panther",
    "parakeet",
    "parrot",
    "parrotfish",
    "partridge",
    "peacock",
    "peafowl",
    "pelican",
    "penguin",
    "perch",
    "pheasant",
    "pig",
    "pigeon",
    "pike",
    "pinniped",
    "piranha",
    "planarian",
    "platypus",
    "pony",
    "porcupine",
    "porpoise",
    "possum",
    "prawn",
    "primate",
    "ptarmigan",
    "puffin",
    "puma",
    "python",
    "quail",
    "quelea",
    "quokka",
    "rabbit",
    "raccoon",
    "rat",
    "rattlesnake",
    "raven",
    "reindeer",
    "reptile",
    "rhinoceros",
    "roadrunner",
    "rodent",
    "rook",
    "rooster",
    "roundworm",
    "sailfish",
    "salamander",
    "salmon",
    "sawfish",
    "scallop",
    "scorpion",
    "seahorse",
    "shark",
    "sheep",
    "shrew",
    "shrimp",
    "silkworm",
    "silverfish",
    "skink",
    "skunk",
    "sloth",
    "slug",
    "smelt",
    "snail",
    "snake",
    "snipe",
    "sole",
    "sparrow",
    "spider",
    "spoonbill",
    "squid",
    "squirrel",
    "starfish",
    "stingray",
    "stoat",
    "stork",
    "sturgeon",
    "swallow",
    "swan",
    "swift",
    "swordfish",
    "swordtail",
    "tahr",
    "takin",
    "tapir",
    "tarantula",
    "tarsier",
    "termite",
    "tern",
    "thrush",
    "tick",
    "tiger",
    "tiglon",
    "toad",
    "tortoise",
    "toucan",
    "trout",
    "tuna",
    "turkey",
    "turtle",
    "tyrannosaurus",
    "unicorn",
    "urial",
    "vicuna",
    "viper",
    "vole",
    "vulture",
    "wallaby",
    "walrus",
    "warbler",
    "wasp",
    "weasel",
    "whale",
    "whippet",
    "whitefish",
    "wildcat",
    "wildebeest",
    "wildfowl",
    "wolf",
    "wolverine",
    "wombat",
    "woodpecker",
    "worm",
    "wren",
    "xerinae",
    "yak",
    "zebra",
  ],
  Dg = [
    "amaranth",
    "amber",
    "amethyst",
    "apricot",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "black",
    "blue",
    "blush",
    "bronze",
    "brown",
    "chocolate",
    "coffee",
    "copper",
    "coral",
    "crimson",
    "cyan",
    "emerald",
    "fuchsia",
    "gold",
    "gray",
    "green",
    "harlequin",
    "indigo",
    "ivory",
    "jade",
    "lavender",
    "lime",
    "magenta",
    "maroon",
    "moccasin",
    "olive",
    "orange",
    "peach",
    "pink",
    "plum",
    "purple",
    "red",
    "rose",
    "salmon",
    "sapphire",
    "scarlet",
    "silver",
    "tan",
    "teal",
    "tomato",
    "turquoise",
    "violet",
    "white",
    "yellow",
  ];
function Ea(e, t, r) {
  return parseInt(e.substr(t, r), 16);
}
function qg(e) {
  return (
    (e |= 0),
    e < 0
      ? "00"
      : e < 16
      ? "0" + e.toString(16)
      : e < 256
      ? e.toString(16)
      : "ff"
  );
}
function wu(e, t, r) {
  return (
    (r = r < 0 ? r + 6 : r > 6 ? r - 6 : r),
    qg(
      255 *
        (r < 1
          ? e + (t - e) * r
          : r < 3
          ? t
          : r < 4
          ? e + (t - e) * (4 - r)
          : e)
    )
  );
}
function WS(e) {
  if (/^#[0-9a-f]{3,8}$/i.test(e)) {
    let t;
    const r = e.length;
    if (r < 6) {
      const a = e[1],
        l = e[2],
        s = e[3],
        u = e[4] || "";
      t = "#" + a + a + l + l + s + s + u + u;
    }
    return (r == 7 || r > 8) && (t = e), t;
  }
}
function YS(e, t, r) {
  let a;
  if (t == 0) {
    const l = qg(r * 255);
    a = l + l + l;
  } else {
    const l = r <= 0.5 ? r * (t + 1) : r + t - r * t,
      s = r * 2 - l;
    a = wu(s, l, e * 6 + 2) + wu(s, l, e * 6) + wu(s, l, e * 6 - 2);
  }
  return "#" + a;
}
function Da(e, t, r) {
  const a = [0.55, 0.5, 0.5, 0.46, 0.6, 0.55, 0.55],
    l = a[(e * 6 + 0.5) | 0];
  return (r = r < 0.5 ? r * l * 2 : l + (r - 0.5) * (1 - l) * 2), YS(e, t, r);
}
const HS =
    typeof window != "undefined"
      ? window
      : typeof self != "undefined"
      ? self
      : typeof global != "undefined"
      ? global
      : {},
  bh = { V: "jdenticon_config", n: "config" };
var GS = {};
function KS(e, t) {
  const r = (typeof e == "object" && e) || GS[bh.n] || HS[bh.V] || {},
    a = r.lightness || {},
    l = r.saturation || {},
    s = "color" in l ? l.color : l,
    u = l.grayscale,
    d = r.backColor,
    f = r.padding;
  function g(T, M) {
    let _ = a[T];
    return (
      (_ && _.length > 1) || (_ = M),
      function (P) {
        return (P = _[0] + P * (_[1] - _[0])), P < 0 ? 0 : P > 1 ? 1 : P;
      }
    );
  }
  function v(T) {
    const M = r.hues;
    let _;
    return (
      M && M.length > 0 && (_ = M[0 | (0.999 * T * M.length)]),
      typeof _ == "number" ? (((_ / 360) % 1) + 1) % 1 : T
    );
  }
  return {
    W: v,
    o: typeof s == "number" ? s : 0.5,
    D: typeof u == "number" ? u : 0,
    p: g("color", [0.4, 0.8]),
    F: g("grayscale", [0.3, 0.9]),
    G: WS(d),
    X: typeof e == "number" ? e : typeof f == "number" ? f : t,
  };
}
class eo {
  constructor(t, r) {
    (this.x = t), (this.y = r);
  }
}
class xg {
  constructor(t, r, a, l) {
    (this.q = t), (this.t = r), (this.H = a), (this.Y = l);
  }
  I(t, r, a, l) {
    const s = this.q + this.H,
      u = this.t + this.H,
      d = this.Y;
    return d === 1
      ? new eo(s - r - (l || 0), this.t + t)
      : d === 2
      ? new eo(s - t - (a || 0), u - r - (l || 0))
      : d === 3
      ? new eo(this.q + r, u - t - (a || 0))
      : new eo(this.q + t, this.t + r);
  }
}
const QS = new xg(0, 0, 0, 0);
class jS {
  constructor(t) {
    (this.J = t), (this.u = QS);
  }
  g(t, r) {
    const a = r ? -2 : 2,
      l = [];
    for (let s = r ? t.length - 2 : 0; s < t.length && s >= 0; s += a)
      l.push(this.u.I(t[s], t[s + 1]));
    this.J.g(l);
  }
  h(t, r, a, l) {
    const s = this.u.I(t, r, a, a);
    this.J.h(s, a, l);
  }
  i(t, r, a, l, s) {
    this.g([t, r, t + a, r, t + a, r + l, t, r + l], s);
  }
  j(t, r, a, l, s, u) {
    const d = [t + a, r, t + a, r + l, t, r + l, t, r];
    d.splice(((s || 0) % 4) * 2, 2), this.g(d, u);
  }
  K(t, r, a, l, s) {
    this.g([t + a / 2, r, t + a, r + l / 2, t + a / 2, r + l, t, r + l / 2], s);
  }
}
function ZS(e, t, r, a) {
  e = e % 14;
  let l, s, u, d, f, g;
  e
    ? e == 1
      ? ((u = 0 | (r * 0.5)), (d = 0 | (r * 0.8)), t.j(r - u, 0, u, d, 2))
      : e == 2
      ? ((u = 0 | (r / 3)), t.i(u, u, r - u, r - u))
      : e == 3
      ? ((f = r * 0.1),
        (g = r < 6 ? 1 : r < 8 ? 2 : 0 | (r * 0.25)),
        (f = f > 1 ? 0 | f : f > 0.5 ? 1 : f),
        t.i(g, g, r - f - g, r - f - g))
      : e == 4
      ? ((s = 0 | (r * 0.15)),
        (u = 0 | (r * 0.5)),
        t.h(r - u - s, r - u - s, u))
      : e == 5
      ? ((f = r * 0.1),
        (g = f * 4),
        g > 3 && (g = 0 | g),
        t.i(0, 0, r, r),
        t.g([g, g, r - f, g, g + (r - g - f) / 2, r - f], !0))
      : e == 6
      ? t.g([0, 0, r, 0, r, r * 0.7, r * 0.4, r * 0.4, r * 0.7, r, 0, r])
      : e == 7
      ? t.j(r / 2, r / 2, r / 2, r / 2, 3)
      : e == 8
      ? (t.i(0, 0, r, r / 2),
        t.i(0, r / 2, r / 2, r / 2),
        t.j(r / 2, r / 2, r / 2, r / 2, 1))
      : e == 9
      ? ((f = r * 0.14),
        (g = r < 4 ? 1 : r < 6 ? 2 : 0 | (r * 0.35)),
        (f = r < 8 ? f : 0 | f),
        t.i(0, 0, r, r),
        t.i(g, g, r - g - f, r - g - f, !0))
      : e == 10
      ? ((f = r * 0.12), (g = f * 3), t.i(0, 0, r, r), t.h(g, g, r - f - g, !0))
      : e == 11
      ? t.j(r / 2, r / 2, r / 2, r / 2, 3)
      : e == 12
      ? ((s = r * 0.25), t.i(0, 0, r, r), t.K(s, s, r - s, r - s, !0))
      : !a && ((s = r * 0.4), (u = r * 1.2), t.h(s, s, u))
    : ((l = r * 0.42), t.g([0, 0, r, 0, r, r - l * 2, r - l, r, 0, r]));
}
function wh(e, t, r) {
  e = e % 4;
  let a;
  e
    ? e == 1
      ? t.j(0, r / 2, r, r / 2, 0)
      : e == 2
      ? t.K(0, 0, r, r)
      : ((a = r / 6), t.h(a, a, r - 2 * a))
    : t.j(0, 0, r, r, 0);
}
function JS(e, t) {
  return (
    (e = t.W(e)),
    [
      Da(e, t.D, t.F(0)),
      Da(e, t.o, t.p(0.5)),
      Da(e, t.D, t.F(1)),
      Da(e, t.o, t.p(1)),
      Da(e, t.o, t.p(0)),
    ]
  );
}
function XS(e, t, r) {
  const a = KS(r, 0.08);
  a.G && e.m(a.G);
  let l = e.k;
  const s = (0.5 + l * a.X) | 0;
  l -= s * 2;
  const u = new jS(e),
    d = 0 | (l / 4),
    f = 0 | (s + l / 2 - d * 2),
    g = 0 | (s + l / 2 - d * 2);
  function v(L, F, W, D, A) {
    const N = Ea(t, W, 1);
    let J = D ? Ea(t, D, 1) : 0;
    e.L(M[_[L]]);
    for (let z = 0; z < A.length; z++)
      (u.u = new xg(f + A[z][0] * d, g + A[z][1] * d, d, J++ % 4)),
        F(N, u, d, z);
    e.M();
  }
  const T = Ea(t, -7) / 268435455,
    M = JS(T, a),
    _ = [];
  let P;
  function $(L) {
    if (L.indexOf(P) >= 0) {
      for (let F = 0; F < L.length; F++) if (_.indexOf(L[F]) >= 0) return !0;
    }
  }
  for (let L = 0; L < 3; L++)
    (P = Ea(t, 8 + L, 1) % M.length),
      ($([0, 4]) || $([2, 3])) && (P = 1),
      _.push(P);
  v(0, wh, 2, 3, [
    [1, 0],
    [2, 0],
    [2, 3],
    [1, 3],
    [0, 1],
    [3, 1],
    [3, 2],
    [0, 2],
  ]),
    v(1, wh, 4, 5, [
      [0, 0],
      [3, 0],
      [3, 3],
      [0, 3],
    ]),
    v(2, ZS, 1, null, [
      [1, 1],
      [2, 1],
      [2, 2],
      [1, 2],
    ]),
    e.finish();
}
function ek(e) {
  var a = 0,
    l = 0,
    s = encodeURI(e) + "%80",
    u = [],
    d,
    f = [],
    g = 1732584193,
    v = 4023233417,
    T = ~g,
    M = ~v,
    _ = 3285377520,
    P = [g, v, T, M, _],
    $ = 0,
    L = "";
  function F(W, D) {
    return (W << D) | (W >>> (32 - D));
  }
  for (; a < s.length; l++)
    u[l >> 2] =
      u[l >> 2] |
      ((s[a] == "%"
        ? parseInt(s.substring(a + 1, (a += 3)), 16)
        : s.charCodeAt(a++)) <<
        ((3 - (l & 3)) * 8));
  for (d = (((l + 7) >> 6) + 1) * 16, u[d - 1] = l * 8 - 8; $ < d; $ += 16) {
    for (a = 0; a < 80; a++)
      (l =
        F(g, 5) +
        _ +
        (a < 20
          ? ((v & T) ^ (~v & M)) + 1518500249
          : a < 40
          ? (v ^ T ^ M) + 1859775393
          : a < 60
          ? ((v & T) ^ (v & M) ^ (T & M)) + 2400959708
          : (v ^ T ^ M) + 3395469782) +
        (f[a] =
          a < 16
            ? u[$ + a] | 0
            : F(f[a - 3] ^ f[a - 8] ^ f[a - 14] ^ f[a - 16], 1))),
        (_ = M),
        (M = T),
        (T = F(v, 30)),
        (v = g),
        (g = l);
    (P[0] = g = (P[0] + g) | 0),
      (P[1] = v = (P[1] + v) | 0),
      (P[2] = T = (P[2] + T) | 0),
      (P[3] = M = (P[3] + M) | 0),
      (P[4] = _ = (P[4] + _) | 0);
  }
  for (a = 0; a < 40; a++)
    L += ((P[a >> 3] >>> ((7 - (a & 7)) * 4)) & 15).toString(16);
  return L;
}
function tk(e) {
  return /^[0-9a-f]{11,}$/i.test(e) && e;
}
function nk(e) {
  return ek(e == null ? "" : "" + e);
}
function Ui(e) {
  return ((e * 10 + 0.5) | 0) / 10;
}
class rk {
  constructor() {
    this.v = "";
  }
  g(t) {
    let r = "";
    for (let a = 0; a < t.length; a++)
      r += (a ? "L" : "M") + Ui(t[a].x) + " " + Ui(t[a].y);
    this.v += r + "Z";
  }
  h(t, r, a) {
    const l = a ? 0 : 1,
      s = Ui(r / 2),
      u = Ui(r),
      d = "a" + s + "," + s + " 0 1," + l + " ";
    this.v +=
      "M" + Ui(t.x) + " " + Ui(t.y + r / 2) + d + u + ",0" + d + -u + ",0";
  }
}
class ik {
  constructor(t) {
    this.A, (this.B = {}), (this.N = t), (this.k = t.k);
  }
  m(t) {
    const r = /^(#......)(..)?/.exec(t),
      a = r[2] ? Ea(r[2], 0) / 255 : 1;
    this.N.m(r[1], a);
  }
  L(t) {
    this.A = this.B[t] || (this.B[t] = new rk());
  }
  M() {}
  g(t) {
    this.A.g(t);
  }
  h(t, r, a) {
    this.A.h(t, r, a);
  }
  finish() {
    const t = this.B;
    for (let r in t) t.hasOwnProperty(r) && this.N.O(r, t[r].v);
  }
}
const ak = { P: "http://www.w3.org/2000/svg", R: "width", S: "height" };
class lk {
  constructor(t) {
    (this.k = t),
      (this.C =
        '<svg xmlns="' +
        ak.P +
        '" width="' +
        t +
        '" height="' +
        t +
        '" viewBox="0 0 ' +
        t +
        " " +
        t +
        '">');
  }
  m(t, r) {
    r &&
      (this.C +=
        '<rect width="100%" height="100%" fill="' +
        t +
        '" opacity="' +
        r.toFixed(2) +
        '"/>');
  }
  O(t, r) {
    this.C += '<path fill="' + t + '" d="' + r + '"/>';
  }
  toString() {
    return this.C + "</svg>";
  }
}
function ok(e, t, r) {
  const a = new lk(t);
  return XS(new ik(a), tk(e) || nk(e), r), a.toString();
}
typeof document != "undefined" && document.querySelectorAll.bind(document);
const sk = sn({
    name: "UserProfile",
    props: ["pubkey", "profiles", "description"],
    data: function () {
      return {};
    },
    methods: {
      merchantProfile(e) {
        var t;
        return (t = this.profiles) == null
          ? void 0
          : t.find((r) => r.pubkey === e);
      },
      pubkeyAlias(e) {
        return Cg({
          dictionaries: [Tg, Mg, Dg],
          length: 2,
          separator: " ",
          style: "capital",
          seed: e,
        });
      },
      pubkeyAvatar(e) {
        return ok(e, 100);
      },
    },
    created: async function () {},
  }),
  uk = ["src"],
  ck = ["innerHTML"],
  dk = { class: "text-caption text-grey ellipsis-2-lines" };
function fk(e, t, r, a, l, s) {
  return (
    R(),
    re(
      Lt,
      null,
      [
        y(
          Ie,
          { avatar: "" },
          {
            default: b(() => [
              y(jr, null, {
                default: b(() => {
                  var u;
                  return [
                    (u = e.merchantProfile(e.pubkey)) != null && u.picture
                      ? (R(),
                        re(
                          "img",
                          { key: 0, src: e.merchantProfile(e.pubkey).picture },
                          null,
                          8,
                          uk
                        ))
                      : (R(),
                        re(
                          "div",
                          { key: 1, innerHTML: e.pubkeyAvatar(e.pubkey) },
                          null,
                          8,
                          ck
                        )),
                  ];
                }),
                _: 1,
              }),
            ]),
            _: 1,
          }
        ),
        y(
          Ie,
          { class: "q-mt-sm" },
          {
            default: b(() => [
              y(Ge, null, {
                default: b(() => {
                  var u, d;
                  return [
                    S(
                      "strong",
                      null,
                      ge(
                        ((u = e.merchantProfile(e.pubkey)) == null
                          ? void 0
                          : u.name) ||
                          ((d = e.merchantProfile(e.pubkey)) == null
                            ? void 0
                            : d.display_name) ||
                          e.pubkeyAlias(e.pubkey)
                      ),
                      1
                    ),
                  ];
                }),
                _: 1,
              }),
              y(
                Ge,
                { class: "gt-sm" },
                {
                  default: b(() => [
                    S("div", dk, [
                      S("p", null, ge(e.description || e.pubkey), 1),
                    ]),
                  ]),
                  _: 1,
                }
              ),
              y(Yr, null, { default: b(() => [Te(ge(e.pubkey), 1)]), _: 1 }),
            ]),
            _: 1,
          }
        ),
      ],
      64
    )
  );
}
var Ka = Tn(sk, [["render", fk]]);
const hk = sn({
    name: "EssentialLink",
    props: ["market", "profiles", "relays-data", "read-notes"],
    components: { UserProfile: Ka },
    data: function () {
      return {
        tab: "marketplace",
        merchantPubkey: null,
        relayUrl: null,
        marketData: {
          pubkey: null,
          relays: [],
          opts: {
            identifier: null,
            name: null,
            about: null,
            merchants: [],
            ui: { picture: null, banner: null, theme: null, darkMode: !1 },
          },
        },
        themeOptions: [
          "classic",
          "bitcoin",
          "flamingo",
          "cyber",
          "freedom",
          "mint",
          "autumn",
          "monochrome",
          "salvador",
        ],
      };
    },
    methods: {
      addMerchant: async function () {
        if (!isValidKey(this.merchantPubkey, "npub")) {
          $q.notify({ message: "Invalid Public Key!", type: "warning" });
          return;
        }
        const e = isValidKeyHex(this.merchantPubkey)
          ? this.merchantPubkey
          : NostrTools.nip19.decode(this.merchantPubkey).data;
        this.marketData.opts.merchants.push(e),
          this.updateMarketData(),
          (this.merchantPubkey = null);
      },
      removeMerchant: async function (e) {
        console.log("### removeMerchant", e),
          (this.marketData.opts.merchants =
            this.marketData.opts.merchants.filter((t) => t !== e)),
          this.updateMarketData();
      },
      addRelay: async function () {
        const e = (this.relayUrl || "").trim();
        if (!e.startsWith("wss://") && !e.startsWith("ws://")) {
          (this.relayUrl = null),
            $q.notify({
              timeout: 5e3,
              type: "warning",
              message: "Invalid relay URL.",
              caption: "Should start with 'wss://'' or 'ws://'",
            });
          return;
        }
        try {
          new URL(e), this.marketData.relays.push(e), this.updateMarketData();
        } catch (t) {
          $q.notify({
            timeout: 5e3,
            type: "warning",
            message: "Invalid relay URL.",
            caption: `Error: ${t}`,
          });
        }
        this.relayUrl = null;
      },
      removeRelay: async function (e) {
        (this.marketData.relays = this.marketData.relays.filter(
          (t) => t !== e
        )),
          this.updateMarketData();
      },
      updateMarketData: function () {
        this.$emit("market-update", this.cloneMarketData());
      },
      publishNaddr() {
        this.$emit("publish-naddr", this.cloneMarketData());
      },
      deleteMarket() {
        this.$emit("delete-market", this.cloneMarketData());
      },
      applyLookAndFeel() {
        this.$emit("apply-ui", this.cloneMarketData());
      },
      markNoteAsRead(e) {
        this.$emit("note-read", e);
      },
      cloneMarketData() {
        return JSON.parse(JSON.stringify(this.marketData));
      },
      relayData(e) {
        return (
          (this.relaysData || []).find((t) => t.relayUrl === e) || {
            connected: !1,
            error: null,
          }
        );
      },
    },
    created: async function () {
      var e;
      (this.marketData = {
        ...this.marketData,
        ...JSON.parse(JSON.stringify(this.market || {})),
      }),
        ((e = this.readNotes) != null && e.merchants) ||
          (this.tab = "merchants");
    },
  }),
  gk = { class: "q-pt-md" },
  mk = { class: "q-gutter-y-md" },
  vk = { class: "q-pa-md" },
  pk = { class: "q-gutter-y-md" },
  yk = S("strong", null, "Note", -1),
  _k = S(
    "div",
    { class: "text-caption" },
    [
      S("ul", null, [
        S("li", null, [
          S(
            "span",
            { class: "text-subtitle1" },
            " Here one can customize the look and feel of the Market. "
          ),
        ]),
        S("li", null, [
          S("span", { class: "text-subtitle1" }, [
            Te(" When the Market Profile is shared (via "),
            S("code", null, "naddr"),
            Te(" ) these customisations will be available to the customers. "),
          ]),
        ]),
      ]),
    ],
    -1
  ),
  bk = S("div", { class: "q-mb-md" }, [S("strong", null, "Information")], -1),
  wk = S(
    "div",
    { class: "q-mb-md q-mt-lg" },
    [S("strong", null, "UI Configurations")],
    -1
  ),
  Sk = S("div", { class: "lt-md q-mt-lg" }, null, -1),
  kk = S("strong", null, "Note", -1),
  Ck = S(
    "div",
    { class: "text-caption" },
    [
      S("ul", null, [
        S("li", null, [
          S(
            "span",
            { class: "text-subtitle1" },
            " Here all the mercants of the marketplace are listed. "
          ),
        ]),
        S("li", null, [
          S(
            "span",
            { class: "text-subtitle1" },
            " You can easily add a new merchant by entering its public key in the input below. "
          ),
        ]),
        S("li", null, [
          S(
            "span",
            { class: "text-subtitle1" },
            " When a merchant is added all its products and stalls will be available in the Market page. "
          ),
        ]),
      ]),
    ],
    -1
  ),
  Tk = { key: 0, class: "text-caption text-grey ellipsis-2-lines" },
  Mk = { class: "float-right" };
function Dk(e, t, r, a, l, s) {
  const u = Jr("user-profile");
  return (
    R(),
    oe(Jt, null, {
      default: b(() => [
        y(Ne, null, {
          default: b(() => [
            S("div", gk, [
              S("div", mk, [
                y(
                  RS,
                  {
                    modelValue: e.tab,
                    "onUpdate:modelValue": t[3] || (t[3] = (d) => (e.tab = d)),
                    "active-color": "primary",
                    align: "justify",
                  },
                  {
                    default: b(() => [
                      y(_u, {
                        name: "marketplace",
                        label: "Look And Feel",
                        onUpdate: t[0] || (t[0] = (d) => (e.tab = d.name)),
                      }),
                      y(_u, {
                        name: "merchants",
                        label: "Merchants",
                        onUpdate: t[1] || (t[1] = (d) => (e.tab = d.name)),
                      }),
                      y(_u, {
                        name: "relays",
                        label: "Relays",
                        onUpdate: t[2] || (t[2] = (d) => (e.tab = d.name)),
                      }),
                    ]),
                    _: 1,
                  },
                  8,
                  ["modelValue"]
                ),
              ]),
            ]),
          ]),
          _: 1,
        }),
        y(ut),
        y(Ne, null, {
          default: b(() => [
            S("div", vk, [
              S("div", pk, [
                y(
                  VS,
                  {
                    modelValue: e.tab,
                    "onUpdate:modelValue":
                      t[14] || (t[14] = (d) => (e.tab = d)),
                  },
                  {
                    default: b(() => [
                      y(
                        bu,
                        { name: "marketplace" },
                        {
                          default: b(() => {
                            var d;
                            return [
                              (d = e.readNotes) != null && d.marketUi
                                ? $e("", !0)
                                : (R(),
                                  oe(
                                    kr,
                                    {
                                      key: 0,
                                      class: "q-mb-lg gt-sm",
                                      bordered: "",
                                    },
                                    {
                                      default: b(() => [
                                        y(zt, null, {
                                          default: b(() => [
                                            y(
                                              Ie,
                                              { avatar: "" },
                                              {
                                                default: b(() => [
                                                  y(jr, null, {
                                                    default: b(() => [
                                                      y(Wt, {
                                                        color: "primary",
                                                        name: "info",
                                                        size: "xl",
                                                      }),
                                                    ]),
                                                    _: 1,
                                                  }),
                                                ]),
                                                _: 1,
                                              }
                                            ),
                                            y(
                                              Ie,
                                              { class: "q-mt-sm q-ml-lg" },
                                              {
                                                default: b(() => [
                                                  y(Ge, null, {
                                                    default: b(() => [yk]),
                                                    _: 1,
                                                  }),
                                                  y(Ge, null, {
                                                    default: b(() => [_k]),
                                                    _: 1,
                                                  }),
                                                ]),
                                                _: 1,
                                              }
                                            ),
                                            y(
                                              Ie,
                                              { side: "" },
                                              {
                                                default: b(() => [
                                                  y(ye, {
                                                    onClick:
                                                      t[4] ||
                                                      (t[4] = (f) =>
                                                        e.markNoteAsRead(
                                                          "marketUi"
                                                        )),
                                                    size: "lg",
                                                    outline: "",
                                                    color: "primary",
                                                    label: "Got it!",
                                                    icon: "check_small",
                                                  }),
                                                ]),
                                                _: 1,
                                              }
                                            ),
                                          ]),
                                          _: 1,
                                        }),
                                      ]),
                                      _: 1,
                                    }
                                  )),
                              bk,
                              y(
                                It,
                                {
                                  onChange: e.updateMarketData,
                                  outlined: "",
                                  modelValue: e.marketData.opts.name,
                                  "onUpdate:modelValue":
                                    t[5] ||
                                    (t[5] = (f) =>
                                      (e.marketData.opts.name = f)),
                                  type: "text",
                                  label: "Market Name",
                                  hint: "Short name for the market",
                                  class: "q-mb-md",
                                },
                                null,
                                8,
                                ["onChange", "modelValue"]
                              ),
                              y(
                                It,
                                {
                                  onChange: e.updateMarketData,
                                  outlined: "",
                                  modelValue: e.marketData.opts.about,
                                  "onUpdate:modelValue":
                                    t[6] ||
                                    (t[6] = (f) =>
                                      (e.marketData.opts.about = f)),
                                  type: "textarea",
                                  rows: "3",
                                  label: "Marketplace Description",
                                  hint: "It will be displayed on top of the banner image. Can be a longer text.",
                                  class: "q-mb-lg",
                                },
                                null,
                                8,
                                ["onChange", "modelValue"]
                              ),
                              wk,
                              y(
                                It,
                                {
                                  onChange: e.updateMarketData,
                                  outlined: "",
                                  modelValue: e.marketData.opts.ui.picture,
                                  "onUpdate:modelValue":
                                    t[7] ||
                                    (t[7] = (f) =>
                                      (e.marketData.opts.ui.picture = f)),
                                  type: "text",
                                  label: "Logo",
                                  hint: "It will be displayed next to the search input. Can be png, jpg, ico, gif, svg.",
                                  class: "q-mb-md",
                                },
                                null,
                                8,
                                ["onChange", "modelValue"]
                              ),
                              y(
                                It,
                                {
                                  onChange: e.updateMarketData,
                                  outlined: "",
                                  modelValue: e.marketData.opts.ui.banner,
                                  "onUpdate:modelValue":
                                    t[8] ||
                                    (t[8] = (f) =>
                                      (e.marketData.opts.ui.banner = f)),
                                  type: "text",
                                  label: "Banner",
                                  hint: "It represents the visual identity of the market. Can be png, jpg, ico, gif, svg.",
                                  class: "q-mb-md",
                                },
                                null,
                                8,
                                ["onChange", "modelValue"]
                              ),
                              y(
                                Aa,
                                {
                                  onInput: e.updateMarketData,
                                  "onUpdate:modelValue": [
                                    e.updateMarketData,
                                    t[9] ||
                                      (t[9] = (f) =>
                                        (e.marketData.opts.ui.theme = f)),
                                  ],
                                  filled: "",
                                  modelValue: e.marketData.opts.ui.theme,
                                  hint: "The colors of the market will vary based on the theme. It applies to all components (buttons, labels, inputs, etc)",
                                  options: e.themeOptions,
                                  label: "Marketplace Theme",
                                },
                                null,
                                8,
                                [
                                  "onInput",
                                  "onUpdate:modelValue",
                                  "modelValue",
                                  "options",
                                ]
                              ),
                              Sk,
                              y(
                                ro,
                                {
                                  onInput: e.updateMarketData,
                                  onClick: e.updateMarketData,
                                  modelValue: e.marketData.opts.ui.darkMode,
                                  "onUpdate:modelValue":
                                    t[10] ||
                                    (t[10] = (f) =>
                                      (e.marketData.opts.ui.darkMode = f)),
                                  label: "Dark Mode",
                                  size: "sm",
                                  class: "q-mt-sm",
                                },
                                null,
                                8,
                                ["onInput", "onClick", "modelValue"]
                              ),
                            ];
                          }),
                          _: 1,
                        }
                      ),
                      y(
                        bu,
                        { name: "merchants" },
                        {
                          default: b(() => {
                            var d;
                            return [
                              (d = e.readNotes) != null && d.merchants
                                ? $e("", !0)
                                : (R(),
                                  oe(
                                    kr,
                                    {
                                      key: 0,
                                      class: "q-mb-lg gt-sm",
                                      bordered: "",
                                    },
                                    {
                                      default: b(() => [
                                        y(zt, null, {
                                          default: b(() => [
                                            y(
                                              Ie,
                                              { avatar: "" },
                                              {
                                                default: b(() => [
                                                  y(jr, null, {
                                                    default: b(() => [
                                                      y(Wt, {
                                                        color: "primary",
                                                        name: "info",
                                                        size: "xl",
                                                      }),
                                                    ]),
                                                    _: 1,
                                                  }),
                                                ]),
                                                _: 1,
                                              }
                                            ),
                                            y(
                                              Ie,
                                              { class: "q-mt-sm q-ml-lg" },
                                              {
                                                default: b(() => [
                                                  y(Ge, null, {
                                                    default: b(() => [kk]),
                                                    _: 1,
                                                  }),
                                                  y(Ge, null, {
                                                    default: b(() => [Ck]),
                                                    _: 1,
                                                  }),
                                                ]),
                                                _: 1,
                                              }
                                            ),
                                            y(
                                              Ie,
                                              { side: "" },
                                              {
                                                default: b(() => [
                                                  y(ye, {
                                                    onClick:
                                                      t[11] ||
                                                      (t[11] = (f) =>
                                                        e.markNoteAsRead(
                                                          "merchants"
                                                        )),
                                                    size: "lg",
                                                    outline: "",
                                                    color: "primary",
                                                    label: "Got it!",
                                                    icon: "check_small",
                                                  }),
                                                ]),
                                                _: 1,
                                              }
                                            ),
                                          ]),
                                          _: 1,
                                        }),
                                      ]),
                                      _: 1,
                                    }
                                  )),
                              S("div", null, [
                                y(
                                  It,
                                  {
                                    outlined: "",
                                    modelValue: e.merchantPubkey,
                                    "onUpdate:modelValue":
                                      t[12] ||
                                      (t[12] = (f) => (e.merchantPubkey = f)),
                                    onKeydown: qu(e.addMerchant, ["enter"]),
                                    type: "text",
                                    label: "Pubkey/Npub",
                                    hint: "Add merchants",
                                  },
                                  {
                                    default: b(() => [
                                      y(
                                        ye,
                                        {
                                          onClick: e.addMerchant,
                                          dense: "",
                                          flat: "",
                                          icon: "add",
                                        },
                                        null,
                                        8,
                                        ["onClick"]
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["modelValue", "onKeydown"]
                                ),
                                y(
                                  kr,
                                  { class: "q-mt-md" },
                                  {
                                    default: b(() => [
                                      (R(!0),
                                      re(
                                        Lt,
                                        null,
                                        Yt(
                                          e.marketData.opts.merchants,
                                          (f) => (
                                            R(),
                                            oe(
                                              zt,
                                              { key: f },
                                              {
                                                default: b(() => [
                                                  y(
                                                    u,
                                                    {
                                                      pubkey: f,
                                                      profiles: e.profiles,
                                                    },
                                                    null,
                                                    8,
                                                    ["pubkey", "profiles"]
                                                  ),
                                                  y(
                                                    Ie,
                                                    { side: "" },
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          ye,
                                                          {
                                                            size: "12px",
                                                            flat: "",
                                                            dense: "",
                                                            round: "",
                                                            icon: "delete",
                                                            onClick: (g) =>
                                                              e.removeMerchant(
                                                                f
                                                              ),
                                                          },
                                                          null,
                                                          8,
                                                          ["onClick"]
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                ]),
                                                _: 2,
                                              },
                                              1024
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                            ];
                          }),
                          _: 1,
                        }
                      ),
                      y(
                        bu,
                        { name: "relays" },
                        {
                          default: b(() => [
                            S("div", null, [
                              S("div", null, [
                                y(
                                  It,
                                  {
                                    outlined: "",
                                    modelValue: e.relayUrl,
                                    "onUpdate:modelValue":
                                      t[13] ||
                                      (t[13] = (d) => (e.relayUrl = d)),
                                    onKeydown: qu(e.addRelay, ["enter"]),
                                    type: "text",
                                    label: "wss://",
                                    hint: "Add realays",
                                  },
                                  {
                                    default: b(() => [
                                      y(
                                        ye,
                                        {
                                          onClick: e.addRelay,
                                          dense: "",
                                          flat: "",
                                          icon: "add",
                                        },
                                        null,
                                        8,
                                        ["onClick"]
                                      ),
                                    ]),
                                    _: 1,
                                  },
                                  8,
                                  ["modelValue", "onKeydown"]
                                ),
                                y(
                                  kr,
                                  { class: "q-mt-md" },
                                  {
                                    default: b(() => [
                                      (R(!0),
                                      re(
                                        Lt,
                                        null,
                                        Yt(
                                          e.marketData.relays,
                                          (d) => (
                                            R(),
                                            oe(
                                              zt,
                                              { key: d },
                                              {
                                                default: b(() => [
                                                  y(
                                                    Ie,
                                                    { avatar: "" },
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          jr,
                                                          null,
                                                          {
                                                            default: b(() => [
                                                              y(
                                                                Wt,
                                                                {
                                                                  name: "router",
                                                                  color:
                                                                    e.relayData(
                                                                      d
                                                                    ).connected
                                                                      ? "green"
                                                                      : "pink",
                                                                },
                                                                null,
                                                                8,
                                                                ["color"]
                                                              ),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  y(
                                                    Ie,
                                                    { class: "q-mt-sm" },
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          Ge,
                                                          null,
                                                          {
                                                            default: b(() => [
                                                              S(
                                                                "strong",
                                                                null,
                                                                ge(d),
                                                                1
                                                              ),
                                                              e.relayData(d)
                                                                .error
                                                                ? (R(),
                                                                  re(
                                                                    "div",
                                                                    Tk,
                                                                    [
                                                                      S(
                                                                        "p",
                                                                        null,
                                                                        "Error: " +
                                                                          ge(
                                                                            e.relayData(
                                                                              d
                                                                            )
                                                                              .error
                                                                          ),
                                                                        1
                                                                      ),
                                                                    ]
                                                                  ))
                                                                : $e("", !0),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  y(
                                                    Ie,
                                                    { side: "" },
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          ye,
                                                          {
                                                            size: "12px",
                                                            flat: "",
                                                            dense: "",
                                                            round: "",
                                                            icon: "delete",
                                                            onClick: (f) =>
                                                              e.removeRelay(d),
                                                          },
                                                          null,
                                                          8,
                                                          ["onClick"]
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                ]),
                                                _: 2,
                                              },
                                              1024
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ]),
                                    _: 1,
                                  }
                                ),
                              ]),
                            ]),
                          ]),
                          _: 1,
                        }
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ["modelValue"]
                ),
              ]),
            ]),
          ]),
          _: 1,
        }),
        y(ut),
        y(
          Ne,
          { class: "q-pb-xl" },
          {
            default: b(() => [
              S("div", Mk, [
                y(
                  ye,
                  {
                    onClick: e.deleteMarket,
                    flat: "",
                    label: "Delete Market",
                    icon: "delete",
                    class: "q-ml-lg",
                    color: "negative",
                  },
                  null,
                  8,
                  ["onClick"]
                ),
                y(
                  ye,
                  {
                    onClick: e.applyLookAndFeel,
                    flat: "",
                    label: "Apply Look and Feel",
                    icon: "palette",
                    class: "q-ml-lg",
                    color: "secondary",
                  },
                  null,
                  8,
                  ["onClick"]
                ),
                y(
                  ye,
                  {
                    onClick: e.publishNaddr,
                    flat: "",
                    label: "Share Market Profile",
                    icon: "share",
                    class: "q-ml-lg",
                    color: "primary",
                  },
                  null,
                  8,
                  ["onClick"]
                ),
              ]),
            ]),
            _: 1,
          }
        ),
        y(Ne, { class: "lt-md" }),
      ]),
      _: 1,
    })
  );
}
var Pg = Tn(hk, [["render", Dk]]);
const qk = sn({
    name: "UserConfig",
    props: ["account"],
    data: function () {
      return { accountData: null };
    },
    watch: {
      account() {
        this.accountData =
          this.account && JSON.parse(JSON.stringify(this.account));
      },
    },
    methods: {
      logout: async function () {
        this.$q
          .dialog(
            confirm(
              "Please make sure you save your private key! You will not be able to recover it later!"
            )
          )
          .onOk(async () => {
            this.$emit("logout");
          });
      },
      copyText(e) {
        this.$emit("copy-text", e);
      },
      clearAllData() {
        this.$emit("clear-all-data");
      },
    },
    created: async function () {
      this.accountData =
        this.account && JSON.parse(JSON.stringify(this.account));
    },
  }),
  xk = { class: "row" },
  Pk = { class: "col-10" },
  Ak = { class: "col-2 auto-width" },
  Ek = { class: "row" },
  Ik = { class: "col-10" },
  $k = { class: "col-2 auto-width" },
  Rk = S("div", null, [S("strong", null, "No Account")], -1),
  Ok = { class: "float-right" };
function Lk(e, t, r, a, l, s) {
  return (
    R(),
    oe(Jt, null, {
      default: b(() => [
        e.accountData
          ? (R(),
            oe(
              Ne,
              { key: 0 },
              {
                default: b(() => [
                  S("div", xk, [
                    S("div", Pk, [
                      y(
                        It,
                        {
                          modelValue: e.accountData.npub,
                          "onUpdate:modelValue":
                            t[1] || (t[1] = (u) => (e.accountData.npub = u)),
                          readonly: "",
                          disbled: "",
                          outlined: "",
                          hint: e.accountData.pubkey,
                          type: "text",
                          label: "Public Key",
                          class: "q-mb-md",
                        },
                        {
                          append: b(() => [
                            y(ye, {
                              onClick:
                                t[0] ||
                                (t[0] = (u) => e.copyText(e.accountData.npub)),
                              icon: "content_copy",
                              label: "Npub",
                              flat: "",
                              color: "gray float-right q-mt-sm",
                            }),
                          ]),
                          _: 1,
                        },
                        8,
                        ["modelValue", "hint"]
                      ),
                    ]),
                    S("div", Ak, [
                      y(ye, {
                        onClick:
                          t[2] ||
                          (t[2] = (u) => e.copyText(e.accountData.pubkey)),
                        icon: "content_copy",
                        label: "Hex",
                        flat: "",
                        color: "gray float-right q-mt-sm",
                      }),
                    ]),
                  ]),
                  S("div", Ek, [
                    S("div", Ik, [
                      y(
                        It,
                        {
                          modelValue: e.accountData.nsec,
                          "onUpdate:modelValue":
                            t[4] || (t[4] = (u) => (e.accountData.nsec = u)),
                          readonly: "",
                          disbled: "",
                          outlined: "",
                          type: "password",
                          label: "Private Key",
                          class: "q-mb-md",
                        },
                        {
                          append: b(() => [
                            y(ye, {
                              onClick:
                                t[3] ||
                                (t[3] = (u) => e.copyText(e.accountData.nsec)),
                              icon: "content_copy",
                              label: "Nsec",
                              flat: "",
                              color: "gray float-right q-mt-sm",
                            }),
                          ]),
                          _: 1,
                        },
                        8,
                        ["modelValue"]
                      ),
                    ]),
                    S("div", $k, [
                      y(ye, {
                        onClick:
                          t[5] ||
                          (t[5] = (u) => e.copyText(e.accountData.privkey)),
                        icon: "content_copy",
                        label: "Hex",
                        flat: "",
                        color: "gray float-right q-mt-sm",
                      }),
                    ]),
                  ]),
                ]),
                _: 1,
              }
            ))
          : (R(), oe(Ne, { key: 1 }, { default: b(() => [Rk]), _: 1 })),
        y(ut),
        y(Ne, null, {
          default: b(() => [
            S("div", Ok, [
              y(
                ye,
                {
                  onClick: e.clearAllData,
                  flat: "",
                  label: "Clear All Data",
                  icon: "delete",
                  class: "q-ml-lg",
                  color: "negative",
                },
                null,
                8,
                ["onClick"]
              ),
              e.accountData
                ? (R(),
                  oe(
                    ye,
                    {
                      key: 0,
                      onClick: e.logout,
                      flat: "",
                      label: "Logout",
                      icon: "logout",
                      class: "q-ml-lg",
                      color: "primary",
                    },
                    null,
                    8,
                    ["onClick"]
                  ))
                : (R(),
                  oe(ye, {
                    key: 1,
                    onClick: t[6] || (t[6] = (u) => e.$emit("login")),
                    flat: "",
                    label: "Login",
                    icon: "login",
                    class: "q-ml-lg",
                    color: "primary",
                  })),
            ]),
          ]),
          _: 1,
        }),
        y(Ne),
      ]),
      _: 1,
    })
  );
}
var Nk = Tn(qk, [["render", Lk]]),
  Bk = Je({
    name: "QChatMessage",
    props: {
      sent: Boolean,
      label: String,
      bgColor: String,
      textColor: String,
      name: String,
      avatar: String,
      text: Array,
      stamp: String,
      size: String,
      labelHtml: Boolean,
      nameHtml: Boolean,
      textHtml: Boolean,
      stampHtml: Boolean,
    },
    setup(e, { slots: t }) {
      const r = I(() => (e.sent === !0 ? "sent" : "received")),
        a = I(
          () =>
            `q-message-text-content q-message-text-content--${r.value}` +
            (e.textColor !== void 0 ? ` text-${e.textColor}` : "")
        ),
        l = I(
          () =>
            `q-message-text q-message-text--${r.value}` +
            (e.bgColor !== void 0 ? ` text-${e.bgColor}` : "")
        ),
        s = I(
          () =>
            "q-message-container row items-end no-wrap" +
            (e.sent === !0 ? " reverse" : "")
        ),
        u = I(() => (e.size !== void 0 ? `col-${e.size}` : "")),
        d = I(() => ({
          msg: e.textHtml === !0 ? "innerHTML" : "textContent",
          stamp: e.stampHtml === !0 ? "innerHTML" : "textContent",
          name: e.nameHtml === !0 ? "innerHTML" : "textContent",
          label: e.labelHtml === !0 ? "innerHTML" : "textContent",
        }));
      function f(v) {
        return t.stamp !== void 0
          ? [v, E("div", { class: "q-message-stamp" }, t.stamp())]
          : e.stamp
          ? [
              v,
              E("div", { class: "q-message-stamp", [d.value.stamp]: e.stamp }),
            ]
          : [v];
      }
      function g(v, T) {
        const M =
          T === !0
            ? v.length > 1
              ? (_) => _
              : (_) => E("div", [_])
            : (_) => E("div", { [d.value.msg]: _ });
        return v.map((_, P) =>
          E("div", { key: P, class: l.value }, [
            E("div", { class: a.value }, f(M(_))),
          ])
        );
      }
      return () => {
        const v = [];
        t.avatar !== void 0
          ? v.push(t.avatar())
          : e.avatar !== void 0 &&
            v.push(
              E("img", {
                class: `q-message-avatar q-message-avatar--${r.value}`,
                src: e.avatar,
                "aria-hidden": "true",
              })
            );
        const T = [];
        t.name !== void 0
          ? T.push(
              E(
                "div",
                { class: `q-message-name q-message-name--${r.value}` },
                t.name()
              )
            )
          : e.name !== void 0 &&
            T.push(
              E("div", {
                class: `q-message-name q-message-name--${r.value}`,
                [d.value.name]: e.name,
              })
            ),
          t.default !== void 0
            ? T.push(g(Ju(t.default()), !0))
            : e.text !== void 0 && T.push(g(e.text)),
          v.push(E("div", { class: u.value }, T));
        const M = [];
        return (
          t.label !== void 0
            ? M.push(E("div", { class: "q-message-label" }, t.label()))
            : e.label !== void 0 &&
              M.push(
                E("div", { class: "q-message-label", [d.value.label]: e.label })
              ),
          M.push(E("div", { class: s.value }, v)),
          E("div", { class: `q-message q-message-${r.value}` }, M)
        );
      };
    },
  });
const Sh = ["vertical", "horizontal"],
  Su = {
    vertical: {
      offset: "offsetY",
      scroll: "scrollTop",
      dir: "down",
      dist: "y",
    },
    horizontal: {
      offset: "offsetX",
      scroll: "scrollLeft",
      dir: "right",
      dist: "x",
    },
  },
  kh = { prevent: !0, mouse: !0, mouseAllDir: !0 },
  Ch = (e) => (e >= 250 ? 50 : Math.ceil(e / 5));
var Fk = Je({
    name: "QScrollArea",
    props: {
      ...ir,
      thumbStyle: Object,
      verticalThumbStyle: Object,
      horizontalThumbStyle: Object,
      barStyle: [Array, String, Object],
      verticalBarStyle: [Array, String, Object],
      horizontalBarStyle: [Array, String, Object],
      contentStyle: [Array, String, Object],
      contentActiveStyle: [Array, String, Object],
      delay: { type: [String, Number], default: 1e3 },
      visible: { type: Boolean, default: null },
      tabindex: [String, Number],
      onScroll: Function,
    },
    setup(e, { slots: t, emit: r }) {
      const a = se(!1),
        l = se(!1),
        s = se(!1),
        u = { vertical: se(0), horizontal: se(0) },
        d = {
          vertical: { ref: se(null), position: se(0), size: se(0) },
          horizontal: { ref: se(null), position: se(0), size: se(0) },
        },
        { proxy: f } = Dt(),
        g = ar(e, f.$q);
      let v = null,
        T;
      const M = se(null),
        _ = I(
          () => "q-scrollarea" + (g.value === !0 ? " q-scrollarea--dark" : "")
        );
      (d.vertical.percentage = I(() => {
        const j = d.vertical.size.value - u.vertical.value;
        if (j <= 0) return 0;
        const K = Zl(d.vertical.position.value / j, 0, 1);
        return Math.round(K * 1e4) / 1e4;
      })),
        (d.vertical.thumbHidden = I(
          () =>
            ((e.visible === null ? s.value : e.visible) !== !0 &&
              a.value === !1 &&
              l.value === !1) ||
            d.vertical.size.value <= u.vertical.value + 1
        )),
        (d.vertical.thumbStart = I(
          () =>
            d.vertical.percentage.value *
            (u.vertical.value - d.vertical.thumbSize.value)
        )),
        (d.vertical.thumbSize = I(() =>
          Math.round(
            Zl(
              (u.vertical.value * u.vertical.value) / d.vertical.size.value,
              Ch(u.vertical.value),
              u.vertical.value
            )
          )
        )),
        (d.vertical.style = I(() => ({
          ...e.thumbStyle,
          ...e.verticalThumbStyle,
          top: `${d.vertical.thumbStart.value}px`,
          height: `${d.vertical.thumbSize.value}px`,
        }))),
        (d.vertical.thumbClass = I(
          () =>
            "q-scrollarea__thumb q-scrollarea__thumb--v absolute-right" +
            (d.vertical.thumbHidden.value === !0
              ? " q-scrollarea__thumb--invisible"
              : "")
        )),
        (d.vertical.barClass = I(
          () =>
            "q-scrollarea__bar q-scrollarea__bar--v absolute-right" +
            (d.vertical.thumbHidden.value === !0
              ? " q-scrollarea__bar--invisible"
              : "")
        )),
        (d.horizontal.percentage = I(() => {
          const j = d.horizontal.size.value - u.horizontal.value;
          if (j <= 0) return 0;
          const K = Zl(Math.abs(d.horizontal.position.value) / j, 0, 1);
          return Math.round(K * 1e4) / 1e4;
        })),
        (d.horizontal.thumbHidden = I(
          () =>
            ((e.visible === null ? s.value : e.visible) !== !0 &&
              a.value === !1 &&
              l.value === !1) ||
            d.horizontal.size.value <= u.horizontal.value + 1
        )),
        (d.horizontal.thumbStart = I(
          () =>
            d.horizontal.percentage.value *
            (u.horizontal.value - d.horizontal.thumbSize.value)
        )),
        (d.horizontal.thumbSize = I(() =>
          Math.round(
            Zl(
              (u.horizontal.value * u.horizontal.value) /
                d.horizontal.size.value,
              Ch(u.horizontal.value),
              u.horizontal.value
            )
          )
        )),
        (d.horizontal.style = I(() => ({
          ...e.thumbStyle,
          ...e.horizontalThumbStyle,
          [f.$q.lang.rtl === !0
            ? "right"
            : "left"]: `${d.horizontal.thumbStart.value}px`,
          width: `${d.horizontal.thumbSize.value}px`,
        }))),
        (d.horizontal.thumbClass = I(
          () =>
            "q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom" +
            (d.horizontal.thumbHidden.value === !0
              ? " q-scrollarea__thumb--invisible"
              : "")
        )),
        (d.horizontal.barClass = I(
          () =>
            "q-scrollarea__bar q-scrollarea__bar--h absolute-bottom" +
            (d.horizontal.thumbHidden.value === !0
              ? " q-scrollarea__bar--invisible"
              : "")
        ));
      const P = I(() =>
          d.vertical.thumbHidden.value === !0 &&
          d.horizontal.thumbHidden.value === !0
            ? e.contentStyle
            : e.contentActiveStyle
        ),
        $ = [
          [
            lh,
            (j) => {
              z(j, "vertical");
            },
            void 0,
            { vertical: !0, ...kh },
          ],
        ],
        L = [
          [
            lh,
            (j) => {
              z(j, "horizontal");
            },
            void 0,
            { horizontal: !0, ...kh },
          ],
        ];
      function F() {
        const j = {};
        return (
          Sh.forEach((K) => {
            const me = d[K];
            (j[K + "Position"] = me.position.value),
              (j[K + "Percentage"] = me.percentage.value),
              (j[K + "Size"] = me.size.value),
              (j[K + "ContainerSize"] = u[K].value);
          }),
          j
        );
      }
      const W = ju(() => {
        const j = F();
        (j.ref = f), r("scroll", j);
      }, 0);
      function D(j, K, me) {
        if (Sh.includes(j) === !1) {
          console.error(
            "[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)"
          );
          return;
        }
        (j === "vertical" ? Ra : cu)(M.value, K, me);
      }
      function A({ height: j, width: K }) {
        let me = !1;
        u.vertical.value !== j && ((u.vertical.value = j), (me = !0)),
          u.horizontal.value !== K && ((u.horizontal.value = K), (me = !0)),
          me === !0 && Pe();
      }
      function N({ position: j }) {
        let K = !1;
        d.vertical.position.value !== j.top &&
          ((d.vertical.position.value = j.top), (K = !0)),
          d.horizontal.position.value !== j.left &&
            ((d.horizontal.position.value = j.left), (K = !0)),
          K === !0 && Pe();
      }
      function J({ height: j, width: K }) {
        d.horizontal.size.value !== K && ((d.horizontal.size.value = K), Pe()),
          d.vertical.size.value !== j && ((d.vertical.size.value = j), Pe());
      }
      function z(j, K) {
        const me = d[K];
        if (j.isFirst === !0) {
          if (me.thumbHidden.value === !0) return;
          (T = me.position.value), (l.value = !0);
        } else if (l.value !== !0) return;
        j.isFinal === !0 && (l.value = !1);
        const rt = Su[K],
          X = u[K].value,
          Z = (me.size.value - X) / (X - me.thumbSize.value),
          he = j.distance[rt.dist],
          fe = T + (j.direction === rt.dir ? 1 : -1) * he * Z;
        lt(fe, K);
      }
      function H(j, K) {
        const me = d[K];
        if (me.thumbHidden.value !== !0) {
          const rt = j[Su[K].offset];
          if (
            rt < me.thumbStart.value ||
            rt > me.thumbStart.value + me.thumbSize.value
          ) {
            const X = rt - me.thumbSize.value / 2;
            lt((X / u[K].value) * me.size.value, K);
          }
          me.ref.value !== null &&
            me.ref.value.dispatchEvent(new MouseEvent(j.type, j));
        }
      }
      function pe(j) {
        H(j, "vertical");
      }
      function _e(j) {
        H(j, "horizontal");
      }
      function Pe() {
        (a.value = !0),
          v !== null && clearTimeout(v),
          (v = setTimeout(() => {
            (v = null), (a.value = !1);
          }, e.delay)),
          e.onScroll !== void 0 && W();
      }
      function lt(j, K) {
        M.value[Su[K].scroll] = j;
      }
      function te() {
        s.value = !0;
      }
      function xe() {
        s.value = !1;
      }
      let Be = null;
      return (
        ze(
          () => f.$q.lang.rtl,
          (j) => {
            M.value !== null &&
              cu(
                M.value,
                Math.abs(d.horizontal.position.value) * (j === !0 ? -1 : 1)
              );
          }
        ),
        ia(() => {
          Be = {
            top: d.vertical.position.value,
            left: d.horizontal.position.value,
          };
        }),
        aa(() => {
          if (Be === null) return;
          const j = M.value;
          j !== null && (cu(j, Be.left), Ra(j, Be.top));
        }),
        Ht(W.cancel),
        Object.assign(f, {
          getScrollTarget: () => M.value,
          getScroll: F,
          getScrollPosition: () => ({
            top: d.vertical.position.value,
            left: d.horizontal.position.value,
          }),
          getScrollPercentage: () => ({
            top: d.vertical.percentage.value,
            left: d.horizontal.percentage.value,
          }),
          setScrollPosition: D,
          setScrollPercentage(j, K, me) {
            D(
              j,
              K *
                (d[j].size.value - u[j].value) *
                (j === "horizontal" && f.$q.lang.rtl === !0 ? -1 : 1),
              me
            );
          },
        }),
        () =>
          E("div", { class: _.value, onMouseenter: te, onMouseleave: xe }, [
            E(
              "div",
              {
                ref: M,
                class:
                  "q-scrollarea__container scroll relative-position fit hide-scrollbar",
                tabindex: e.tabindex !== void 0 ? e.tabindex : void 0,
              },
              [
                E(
                  "div",
                  { class: "q-scrollarea__content absolute", style: P.value },
                  _i(t.default, [E(xu, { debounce: 0, onResize: J })])
                ),
                E(ow, { axis: "both", onScroll: N }),
              ]
            ),
            E(xu, { debounce: 0, onResize: A }),
            E("div", {
              class: d.vertical.barClass.value,
              style: [e.barStyle, e.verticalBarStyle],
              "aria-hidden": "true",
              onMousedown: pe,
            }),
            E("div", {
              class: d.horizontal.barClass.value,
              style: [e.barStyle, e.horizontalBarStyle],
              "aria-hidden": "true",
              onMousedown: _e,
            }),
            Hn(
              E("div", {
                ref: d.vertical.ref,
                class: d.vertical.thumbClass.value,
                style: d.vertical.style.value,
                "aria-hidden": "true",
              }),
              $
            ),
            Hn(
              E("div", {
                ref: d.horizontal.ref,
                class: d.horizontal.thumbClass.value,
                style: d.horizontal.style.value,
                "aria-hidden": "true",
              }),
              L
            ),
          ])
      );
    },
  }),
  Uk = Je({
    name: "QForm",
    props: {
      autofocus: Boolean,
      noErrorFocus: Boolean,
      noResetFocus: Boolean,
      greedy: Boolean,
      onSubmit: Function,
    },
    emits: ["reset", "validationSuccess", "validationError"],
    setup(e, { slots: t, emit: r }) {
      const a = Dt(),
        l = se(null);
      let s = 0;
      const u = [];
      function d(_) {
        const P = typeof _ == "boolean" ? _ : e.noErrorFocus !== !0,
          $ = ++s,
          L = (D, A) => {
            r("validation" + (D === !0 ? "Success" : "Error"), A);
          },
          F = (D) => {
            const A = D.validate();
            return typeof A.then == "function"
              ? A.then(
                  (N) => ({ valid: N, comp: D }),
                  (N) => ({ valid: !1, comp: D, err: N })
                )
              : Promise.resolve({ valid: A, comp: D });
          };
        return (
          e.greedy === !0
            ? Promise.all(u.map(F)).then((D) => D.filter((A) => A.valid !== !0))
            : u
                .reduce(
                  (D, A) =>
                    D.then(() =>
                      F(A).then((N) => {
                        if (N.valid === !1) return Promise.reject(N);
                      })
                    ),
                  Promise.resolve()
                )
                .catch((D) => [D])
        ).then((D) => {
          if (D === void 0 || D.length === 0) return $ === s && L(!0), !0;
          if ($ === s) {
            const { comp: A, err: N } = D[0];
            if ((N !== void 0 && console.error(N), L(!1, A), P === !0)) {
              const J = D.find(
                ({ comp: z }) => typeof z.focus == "function" && Zb(z.$) === !1
              );
              J !== void 0 && J.comp.focus();
            }
          }
          return !1;
        });
      }
      function f() {
        s++,
          u.forEach((_) => {
            typeof _.resetValidation == "function" && _.resetValidation();
          });
      }
      function g(_) {
        _ !== void 0 && Ft(_);
        const P = s + 1;
        d().then(($) => {
          P === s &&
            $ === !0 &&
            (e.onSubmit !== void 0
              ? r("submit", _)
              : _ !== void 0 &&
                _.target !== void 0 &&
                typeof _.target.submit == "function" &&
                _.target.submit());
        });
      }
      function v(_) {
        _ !== void 0 && Ft(_),
          r("reset"),
          Sn(() => {
            f(), e.autofocus === !0 && e.noResetFocus !== !0 && T();
          });
      }
      function T() {
        Nh(() => {
          if (l.value === null) return;
          const _ =
            l.value.querySelector(
              "[autofocus][tabindex], [data-autofocus][tabindex]"
            ) ||
            l.value.querySelector(
              "[autofocus] [tabindex], [data-autofocus] [tabindex]"
            ) ||
            l.value.querySelector("[autofocus], [data-autofocus]") ||
            Array.prototype.find.call(
              l.value.querySelectorAll("[tabindex]"),
              (P) => P.tabIndex > -1
            );
          _ != null && _.focus({ preventScroll: !0 });
        });
      }
      zh(Jb, {
        bindComponent(_) {
          u.push(_);
        },
        unbindComponent(_) {
          const P = u.indexOf(_);
          P > -1 && u.splice(P, 1);
        },
      });
      let M = !1;
      return (
        ia(() => {
          M = !0;
        }),
        aa(() => {
          M === !0 && e.autofocus === !0 && T();
        }),
        Xr(() => {
          e.autofocus === !0 && T();
        }),
        Object.assign(a.proxy, {
          validate: d,
          resetValidation: f,
          submit: g,
          reset: v,
          focus: T,
          getValidationComponents: () => u,
        }),
        () =>
          E(
            "form",
            { class: "q-form", ref: l, onSubmit: g, onReset: v },
            Mt(t.default)
          )
      );
    },
  }); //! moment.js
//! version : 2.29.4
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
var Ag;
function ae() {
  return Ag.apply(null, arguments);
}
function Vk(e) {
  Ag = e;
}
function Kn(e) {
  return (
    e instanceof Array || Object.prototype.toString.call(e) === "[object Array]"
  );
}
function pi(e) {
  return e != null && Object.prototype.toString.call(e) === "[object Object]";
}
function Xe(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function sc(e) {
  if (Object.getOwnPropertyNames)
    return Object.getOwnPropertyNames(e).length === 0;
  var t;
  for (t in e) if (Xe(e, t)) return !1;
  return !0;
}
function mn(e) {
  return e === void 0;
}
function Dr(e) {
  return (
    typeof e == "number" ||
    Object.prototype.toString.call(e) === "[object Number]"
  );
}
function Qa(e) {
  return (
    e instanceof Date || Object.prototype.toString.call(e) === "[object Date]"
  );
}
function Eg(e, t) {
  var r = [],
    a,
    l = e.length;
  for (a = 0; a < l; ++a) r.push(t(e[a], a));
  return r;
}
function Kr(e, t) {
  for (var r in t) Xe(t, r) && (e[r] = t[r]);
  return (
    Xe(t, "toString") && (e.toString = t.toString),
    Xe(t, "valueOf") && (e.valueOf = t.valueOf),
    e
  );
}
function or(e, t, r, a) {
  return nm(e, t, r, a, !0).utc();
}
function zk() {
  return {
    empty: !1,
    unusedTokens: [],
    unusedInput: [],
    overflow: -2,
    charsLeftOver: 0,
    nullInput: !1,
    invalidEra: null,
    invalidMonth: null,
    invalidFormat: !1,
    userInvalidated: !1,
    iso: !1,
    parsedDateParts: [],
    era: null,
    meridiem: null,
    rfc2822: !1,
    weekdayMismatch: !1,
  };
}
function Oe(e) {
  return e._pf == null && (e._pf = zk()), e._pf;
}
var Ou;
Array.prototype.some
  ? (Ou = Array.prototype.some)
  : (Ou = function (e) {
      var t = Object(this),
        r = t.length >>> 0,
        a;
      for (a = 0; a < r; a++) if (a in t && e.call(this, t[a], a, t)) return !0;
      return !1;
    });
function uc(e) {
  if (e._isValid == null) {
    var t = Oe(e),
      r = Ou.call(t.parsedDateParts, function (l) {
        return l != null;
      }),
      a =
        !isNaN(e._d.getTime()) &&
        t.overflow < 0 &&
        !t.empty &&
        !t.invalidEra &&
        !t.invalidMonth &&
        !t.invalidWeekday &&
        !t.weekdayMismatch &&
        !t.nullInput &&
        !t.invalidFormat &&
        !t.userInvalidated &&
        (!t.meridiem || (t.meridiem && r));
    if (
      (e._strict &&
        (a =
          a &&
          t.charsLeftOver === 0 &&
          t.unusedTokens.length === 0 &&
          t.bigHour === void 0),
      Object.isFrozen == null || !Object.isFrozen(e))
    )
      e._isValid = a;
    else return a;
  }
  return e._isValid;
}
function Eo(e) {
  var t = or(NaN);
  return e != null ? Kr(Oe(t), e) : (Oe(t).userInvalidated = !0), t;
}
var Th = (ae.momentProperties = []),
  ku = !1;
function cc(e, t) {
  var r,
    a,
    l,
    s = Th.length;
  if (
    (mn(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
    mn(t._i) || (e._i = t._i),
    mn(t._f) || (e._f = t._f),
    mn(t._l) || (e._l = t._l),
    mn(t._strict) || (e._strict = t._strict),
    mn(t._tzm) || (e._tzm = t._tzm),
    mn(t._isUTC) || (e._isUTC = t._isUTC),
    mn(t._offset) || (e._offset = t._offset),
    mn(t._pf) || (e._pf = Oe(t)),
    mn(t._locale) || (e._locale = t._locale),
    s > 0)
  )
    for (r = 0; r < s; r++) (a = Th[r]), (l = t[a]), mn(l) || (e[a] = l);
  return e;
}
function ja(e) {
  cc(this, e),
    (this._d = new Date(e._d != null ? e._d.getTime() : NaN)),
    this.isValid() || (this._d = new Date(NaN)),
    ku === !1 && ((ku = !0), ae.updateOffset(this), (ku = !1));
}
function Qn(e) {
  return e instanceof ja || (e != null && e._isAMomentObject != null);
}
function Ig(e) {
  ae.suppressDeprecationWarnings === !1 &&
    typeof console != "undefined" &&
    console.warn &&
    console.warn("Deprecation warning: " + e);
}
function Ln(e, t) {
  var r = !0;
  return Kr(function () {
    if ((ae.deprecationHandler != null && ae.deprecationHandler(null, e), r)) {
      var a = [],
        l,
        s,
        u,
        d = arguments.length;
      for (s = 0; s < d; s++) {
        if (((l = ""), typeof arguments[s] == "object")) {
          l +=
            `
[` +
            s +
            "] ";
          for (u in arguments[0])
            Xe(arguments[0], u) && (l += u + ": " + arguments[0][u] + ", ");
          l = l.slice(0, -2);
        } else l = arguments[s];
        a.push(l);
      }
      Ig(
        e +
          `
Arguments: ` +
          Array.prototype.slice.call(a).join("") +
          `
` +
          new Error().stack
      ),
        (r = !1);
    }
    return t.apply(this, arguments);
  }, t);
}
var Mh = {};
function $g(e, t) {
  ae.deprecationHandler != null && ae.deprecationHandler(e, t),
    Mh[e] || (Ig(t), (Mh[e] = !0));
}
ae.suppressDeprecationWarnings = !1;
ae.deprecationHandler = null;
function sr(e) {
  return (
    (typeof Function != "undefined" && e instanceof Function) ||
    Object.prototype.toString.call(e) === "[object Function]"
  );
}
function Wk(e) {
  var t, r;
  for (r in e)
    Xe(e, r) && ((t = e[r]), sr(t) ? (this[r] = t) : (this["_" + r] = t));
  (this._config = e),
    (this._dayOfMonthOrdinalParseLenient = new RegExp(
      (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
        "|" +
        /\d{1,2}/.source
    ));
}
function Lu(e, t) {
  var r = Kr({}, e),
    a;
  for (a in t)
    Xe(t, a) &&
      (pi(e[a]) && pi(t[a])
        ? ((r[a] = {}), Kr(r[a], e[a]), Kr(r[a], t[a]))
        : t[a] != null
        ? (r[a] = t[a])
        : delete r[a]);
  for (a in e) Xe(e, a) && !Xe(t, a) && pi(e[a]) && (r[a] = Kr({}, r[a]));
  return r;
}
function dc(e) {
  e != null && this.set(e);
}
var Nu;
Object.keys
  ? (Nu = Object.keys)
  : (Nu = function (e) {
      var t,
        r = [];
      for (t in e) Xe(e, t) && r.push(t);
      return r;
    });
var Yk = {
  sameDay: "[Today at] LT",
  nextDay: "[Tomorrow at] LT",
  nextWeek: "dddd [at] LT",
  lastDay: "[Yesterday at] LT",
  lastWeek: "[Last] dddd [at] LT",
  sameElse: "L",
};
function Hk(e, t, r) {
  var a = this._calendar[e] || this._calendar.sameElse;
  return sr(a) ? a.call(t, r) : a;
}
function rr(e, t, r) {
  var a = "" + Math.abs(e),
    l = t - a.length,
    s = e >= 0;
  return (
    (s ? (r ? "+" : "") : "-") +
    Math.pow(10, Math.max(0, l)).toString().substr(1) +
    a
  );
}
var fc =
    /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
  to = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
  Cu = {},
  ji = {};
function be(e, t, r, a) {
  var l = a;
  typeof a == "string" &&
    (l = function () {
      return this[a]();
    }),
    e && (ji[e] = l),
    t &&
      (ji[t[0]] = function () {
        return rr(l.apply(this, arguments), t[1], t[2]);
      }),
    r &&
      (ji[r] = function () {
        return this.localeData().ordinal(l.apply(this, arguments), e);
      });
}
function Gk(e) {
  return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
}
function Kk(e) {
  var t = e.match(fc),
    r,
    a;
  for (r = 0, a = t.length; r < a; r++)
    ji[t[r]] ? (t[r] = ji[t[r]]) : (t[r] = Gk(t[r]));
  return function (l) {
    var s = "",
      u;
    for (u = 0; u < a; u++) s += sr(t[u]) ? t[u].call(l, e) : t[u];
    return s;
  };
}
function io(e, t) {
  return e.isValid()
    ? ((t = Rg(t, e.localeData())), (Cu[t] = Cu[t] || Kk(t)), Cu[t](e))
    : e.localeData().invalidDate();
}
function Rg(e, t) {
  var r = 5;
  function a(l) {
    return t.longDateFormat(l) || l;
  }
  for (to.lastIndex = 0; r >= 0 && to.test(e); )
    (e = e.replace(to, a)), (to.lastIndex = 0), (r -= 1);
  return e;
}
var Qk = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A",
};
function jk(e) {
  var t = this._longDateFormat[e],
    r = this._longDateFormat[e.toUpperCase()];
  return t || !r
    ? t
    : ((this._longDateFormat[e] = r
        .match(fc)
        .map(function (a) {
          return a === "MMMM" || a === "MM" || a === "DD" || a === "dddd"
            ? a.slice(1)
            : a;
        })
        .join("")),
      this._longDateFormat[e]);
}
var Zk = "Invalid date";
function Jk() {
  return this._invalidDate;
}
var Xk = "%d",
  eC = /\d{1,2}/;
function tC(e) {
  return this._ordinal.replace("%d", e);
}
var nC = {
  future: "in %s",
  past: "%s ago",
  s: "a few seconds",
  ss: "%d seconds",
  m: "a minute",
  mm: "%d minutes",
  h: "an hour",
  hh: "%d hours",
  d: "a day",
  dd: "%d days",
  w: "a week",
  ww: "%d weeks",
  M: "a month",
  MM: "%d months",
  y: "a year",
  yy: "%d years",
};
function rC(e, t, r, a) {
  var l = this._relativeTime[r];
  return sr(l) ? l(e, t, r, a) : l.replace(/%d/i, e);
}
function iC(e, t) {
  var r = this._relativeTime[e > 0 ? "future" : "past"];
  return sr(r) ? r(t) : r.replace(/%s/i, t);
}
var La = {};
function en(e, t) {
  var r = e.toLowerCase();
  La[r] = La[r + "s"] = La[t] = e;
}
function Nn(e) {
  return typeof e == "string" ? La[e] || La[e.toLowerCase()] : void 0;
}
function hc(e) {
  var t = {},
    r,
    a;
  for (a in e) Xe(e, a) && ((r = Nn(a)), r && (t[r] = e[a]));
  return t;
}
var Og = {};
function tn(e, t) {
  Og[e] = t;
}
function aC(e) {
  var t = [],
    r;
  for (r in e) Xe(e, r) && t.push({ unit: r, priority: Og[r] });
  return (
    t.sort(function (a, l) {
      return a.priority - l.priority;
    }),
    t
  );
}
function Io(e) {
  return (e % 4 === 0 && e % 100 !== 0) || e % 400 === 0;
}
function On(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}
function We(e) {
  var t = +e,
    r = 0;
  return t !== 0 && isFinite(t) && (r = On(t)), r;
}
function la(e, t) {
  return function (r) {
    return r != null
      ? (Lg(this, e, r), ae.updateOffset(this, t), this)
      : bo(this, e);
  };
}
function bo(e, t) {
  return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
}
function Lg(e, t, r) {
  e.isValid() &&
    !isNaN(r) &&
    (t === "FullYear" && Io(e.year()) && e.month() === 1 && e.date() === 29
      ? ((r = We(r)),
        e._d["set" + (e._isUTC ? "UTC" : "") + t](
          r,
          e.month(),
          Bo(r, e.month())
        ))
      : e._d["set" + (e._isUTC ? "UTC" : "") + t](r));
}
function lC(e) {
  return (e = Nn(e)), sr(this[e]) ? this[e]() : this;
}
function oC(e, t) {
  if (typeof e == "object") {
    e = hc(e);
    var r = aC(e),
      a,
      l = r.length;
    for (a = 0; a < l; a++) this[r[a].unit](e[r[a].unit]);
  } else if (((e = Nn(e)), sr(this[e]))) return this[e](t);
  return this;
}
var Ng = /\d/,
  Dn = /\d\d/,
  Bg = /\d{3}/,
  gc = /\d{4}/,
  $o = /[+-]?\d{6}/,
  yt = /\d\d?/,
  Fg = /\d\d\d\d?/,
  Ug = /\d\d\d\d\d\d?/,
  Ro = /\d{1,3}/,
  mc = /\d{1,4}/,
  Oo = /[+-]?\d{1,6}/,
  oa = /\d+/,
  Lo = /[+-]?\d+/,
  sC = /Z|[+-]\d\d:?\d\d/gi,
  No = /Z|[+-]\d\d(?::?\d\d)?/gi,
  uC = /[+-]?\d+(\.\d{1,3})?/,
  Za =
    /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
  wo;
wo = {};
function ce(e, t, r) {
  wo[e] = sr(t)
    ? t
    : function (a, l) {
        return a && r ? r : t;
      };
}
function cC(e, t) {
  return Xe(wo, e) ? wo[e](t._strict, t._locale) : new RegExp(dC(e));
}
function dC(e) {
  return kn(
    e
      .replace("\\", "")
      .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, r, a, l, s) {
        return r || a || l || s;
      })
  );
}
function kn(e) {
  return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var Bu = {};
function ct(e, t) {
  var r,
    a = t,
    l;
  for (
    typeof e == "string" && (e = [e]),
      Dr(t) &&
        (a = function (s, u) {
          u[t] = We(s);
        }),
      l = e.length,
      r = 0;
    r < l;
    r++
  )
    Bu[e[r]] = a;
}
function Ja(e, t) {
  ct(e, function (r, a, l, s) {
    (l._w = l._w || {}), t(r, l._w, l, s);
  });
}
function fC(e, t, r) {
  t != null && Xe(Bu, e) && Bu[e](t, r._a, r, e);
}
var Xt = 0,
  Cr = 1,
  nr = 2,
  Ot = 3,
  Gn = 4,
  Tr = 5,
  mi = 6,
  hC = 7,
  gC = 8;
function mC(e, t) {
  return ((e % t) + t) % t;
}
var Et;
Array.prototype.indexOf
  ? (Et = Array.prototype.indexOf)
  : (Et = function (e) {
      var t;
      for (t = 0; t < this.length; ++t) if (this[t] === e) return t;
      return -1;
    });
function Bo(e, t) {
  if (isNaN(e) || isNaN(t)) return NaN;
  var r = mC(t, 12);
  return (e += (t - r) / 12), r === 1 ? (Io(e) ? 29 : 28) : 31 - ((r % 7) % 2);
}
be("M", ["MM", 2], "Mo", function () {
  return this.month() + 1;
});
be("MMM", 0, 0, function (e) {
  return this.localeData().monthsShort(this, e);
});
be("MMMM", 0, 0, function (e) {
  return this.localeData().months(this, e);
});
en("month", "M");
tn("month", 8);
ce("M", yt);
ce("MM", yt, Dn);
ce("MMM", function (e, t) {
  return t.monthsShortRegex(e);
});
ce("MMMM", function (e, t) {
  return t.monthsRegex(e);
});
ct(["M", "MM"], function (e, t) {
  t[Cr] = We(e) - 1;
});
ct(["MMM", "MMMM"], function (e, t, r, a) {
  var l = r._locale.monthsParse(e, a, r._strict);
  l != null ? (t[Cr] = l) : (Oe(r).invalidMonth = e);
});
var vC =
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    ),
  Vg = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
  zg = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
  pC = Za,
  yC = Za;
function _C(e, t) {
  return e
    ? Kn(this._months)
      ? this._months[e.month()]
      : this._months[
          (this._months.isFormat || zg).test(t) ? "format" : "standalone"
        ][e.month()]
    : Kn(this._months)
    ? this._months
    : this._months.standalone;
}
function bC(e, t) {
  return e
    ? Kn(this._monthsShort)
      ? this._monthsShort[e.month()]
      : this._monthsShort[zg.test(t) ? "format" : "standalone"][e.month()]
    : Kn(this._monthsShort)
    ? this._monthsShort
    : this._monthsShort.standalone;
}
function wC(e, t, r) {
  var a,
    l,
    s,
    u = e.toLocaleLowerCase();
  if (!this._monthsParse)
    for (
      this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = [],
        a = 0;
      a < 12;
      ++a
    )
      (s = or([2e3, a])),
        (this._shortMonthsParse[a] = this.monthsShort(
          s,
          ""
        ).toLocaleLowerCase()),
        (this._longMonthsParse[a] = this.months(s, "").toLocaleLowerCase());
  return r
    ? t === "MMM"
      ? ((l = Et.call(this._shortMonthsParse, u)), l !== -1 ? l : null)
      : ((l = Et.call(this._longMonthsParse, u)), l !== -1 ? l : null)
    : t === "MMM"
    ? ((l = Et.call(this._shortMonthsParse, u)),
      l !== -1
        ? l
        : ((l = Et.call(this._longMonthsParse, u)), l !== -1 ? l : null))
    : ((l = Et.call(this._longMonthsParse, u)),
      l !== -1
        ? l
        : ((l = Et.call(this._shortMonthsParse, u)), l !== -1 ? l : null));
}
function SC(e, t, r) {
  var a, l, s;
  if (this._monthsParseExact) return wC.call(this, e, t, r);
  for (
    this._monthsParse ||
      ((this._monthsParse = []),
      (this._longMonthsParse = []),
      (this._shortMonthsParse = [])),
      a = 0;
    a < 12;
    a++
  ) {
    if (
      ((l = or([2e3, a])),
      r &&
        !this._longMonthsParse[a] &&
        ((this._longMonthsParse[a] = new RegExp(
          "^" + this.months(l, "").replace(".", "") + "$",
          "i"
        )),
        (this._shortMonthsParse[a] = new RegExp(
          "^" + this.monthsShort(l, "").replace(".", "") + "$",
          "i"
        ))),
      !r &&
        !this._monthsParse[a] &&
        ((s = "^" + this.months(l, "") + "|^" + this.monthsShort(l, "")),
        (this._monthsParse[a] = new RegExp(s.replace(".", ""), "i"))),
      r && t === "MMMM" && this._longMonthsParse[a].test(e))
    )
      return a;
    if (r && t === "MMM" && this._shortMonthsParse[a].test(e)) return a;
    if (!r && this._monthsParse[a].test(e)) return a;
  }
}
function Wg(e, t) {
  var r;
  if (!e.isValid()) return e;
  if (typeof t == "string") {
    if (/^\d+$/.test(t)) t = We(t);
    else if (((t = e.localeData().monthsParse(t)), !Dr(t))) return e;
  }
  return (
    (r = Math.min(e.date(), Bo(e.year(), t))),
    e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, r),
    e
  );
}
function Yg(e) {
  return e != null
    ? (Wg(this, e), ae.updateOffset(this, !0), this)
    : bo(this, "Month");
}
function kC() {
  return Bo(this.year(), this.month());
}
function CC(e) {
  return this._monthsParseExact
    ? (Xe(this, "_monthsRegex") || Hg.call(this),
      e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    : (Xe(this, "_monthsShortRegex") || (this._monthsShortRegex = pC),
      this._monthsShortStrictRegex && e
        ? this._monthsShortStrictRegex
        : this._monthsShortRegex);
}
function TC(e) {
  return this._monthsParseExact
    ? (Xe(this, "_monthsRegex") || Hg.call(this),
      e ? this._monthsStrictRegex : this._monthsRegex)
    : (Xe(this, "_monthsRegex") || (this._monthsRegex = yC),
      this._monthsStrictRegex && e
        ? this._monthsStrictRegex
        : this._monthsRegex);
}
function Hg() {
  function e(u, d) {
    return d.length - u.length;
  }
  var t = [],
    r = [],
    a = [],
    l,
    s;
  for (l = 0; l < 12; l++)
    (s = or([2e3, l])),
      t.push(this.monthsShort(s, "")),
      r.push(this.months(s, "")),
      a.push(this.months(s, "")),
      a.push(this.monthsShort(s, ""));
  for (t.sort(e), r.sort(e), a.sort(e), l = 0; l < 12; l++)
    (t[l] = kn(t[l])), (r[l] = kn(r[l]));
  for (l = 0; l < 24; l++) a[l] = kn(a[l]);
  (this._monthsRegex = new RegExp("^(" + a.join("|") + ")", "i")),
    (this._monthsShortRegex = this._monthsRegex),
    (this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i")),
    (this._monthsShortStrictRegex = new RegExp("^(" + t.join("|") + ")", "i"));
}
be("Y", 0, 0, function () {
  var e = this.year();
  return e <= 9999 ? rr(e, 4) : "+" + e;
});
be(0, ["YY", 2], 0, function () {
  return this.year() % 100;
});
be(0, ["YYYY", 4], 0, "year");
be(0, ["YYYYY", 5], 0, "year");
be(0, ["YYYYYY", 6, !0], 0, "year");
en("year", "y");
tn("year", 1);
ce("Y", Lo);
ce("YY", yt, Dn);
ce("YYYY", mc, gc);
ce("YYYYY", Oo, $o);
ce("YYYYYY", Oo, $o);
ct(["YYYYY", "YYYYYY"], Xt);
ct("YYYY", function (e, t) {
  t[Xt] = e.length === 2 ? ae.parseTwoDigitYear(e) : We(e);
});
ct("YY", function (e, t) {
  t[Xt] = ae.parseTwoDigitYear(e);
});
ct("Y", function (e, t) {
  t[Xt] = parseInt(e, 10);
});
function Na(e) {
  return Io(e) ? 366 : 365;
}
ae.parseTwoDigitYear = function (e) {
  return We(e) + (We(e) > 68 ? 1900 : 2e3);
};
var Gg = la("FullYear", !0);
function MC() {
  return Io(this.year());
}
function DC(e, t, r, a, l, s, u) {
  var d;
  return (
    e < 100 && e >= 0
      ? ((d = new Date(e + 400, t, r, a, l, s, u)),
        isFinite(d.getFullYear()) && d.setFullYear(e))
      : (d = new Date(e, t, r, a, l, s, u)),
    d
  );
}
function Ua(e) {
  var t, r;
  return (
    e < 100 && e >= 0
      ? ((r = Array.prototype.slice.call(arguments)),
        (r[0] = e + 400),
        (t = new Date(Date.UTC.apply(null, r))),
        isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e))
      : (t = new Date(Date.UTC.apply(null, arguments))),
    t
  );
}
function So(e, t, r) {
  var a = 7 + t - r,
    l = (7 + Ua(e, 0, a).getUTCDay() - t) % 7;
  return -l + a - 1;
}
function Kg(e, t, r, a, l) {
  var s = (7 + r - a) % 7,
    u = So(e, a, l),
    d = 1 + 7 * (t - 1) + s + u,
    f,
    g;
  return (
    d <= 0
      ? ((f = e - 1), (g = Na(f) + d))
      : d > Na(e)
      ? ((f = e + 1), (g = d - Na(e)))
      : ((f = e), (g = d)),
    { year: f, dayOfYear: g }
  );
}
function Va(e, t, r) {
  var a = So(e.year(), t, r),
    l = Math.floor((e.dayOfYear() - a - 1) / 7) + 1,
    s,
    u;
  return (
    l < 1
      ? ((u = e.year() - 1), (s = l + Mr(u, t, r)))
      : l > Mr(e.year(), t, r)
      ? ((s = l - Mr(e.year(), t, r)), (u = e.year() + 1))
      : ((u = e.year()), (s = l)),
    { week: s, year: u }
  );
}
function Mr(e, t, r) {
  var a = So(e, t, r),
    l = So(e + 1, t, r);
  return (Na(e) - a + l) / 7;
}
be("w", ["ww", 2], "wo", "week");
be("W", ["WW", 2], "Wo", "isoWeek");
en("week", "w");
en("isoWeek", "W");
tn("week", 5);
tn("isoWeek", 5);
ce("w", yt);
ce("ww", yt, Dn);
ce("W", yt);
ce("WW", yt, Dn);
Ja(["w", "ww", "W", "WW"], function (e, t, r, a) {
  t[a.substr(0, 1)] = We(e);
});
function qC(e) {
  return Va(e, this._week.dow, this._week.doy).week;
}
var xC = { dow: 0, doy: 6 };
function PC() {
  return this._week.dow;
}
function AC() {
  return this._week.doy;
}
function EC(e) {
  var t = this.localeData().week(this);
  return e == null ? t : this.add((e - t) * 7, "d");
}
function IC(e) {
  var t = Va(this, 1, 4).week;
  return e == null ? t : this.add((e - t) * 7, "d");
}
be("d", 0, "do", "day");
be("dd", 0, 0, function (e) {
  return this.localeData().weekdaysMin(this, e);
});
be("ddd", 0, 0, function (e) {
  return this.localeData().weekdaysShort(this, e);
});
be("dddd", 0, 0, function (e) {
  return this.localeData().weekdays(this, e);
});
be("e", 0, 0, "weekday");
be("E", 0, 0, "isoWeekday");
en("day", "d");
en("weekday", "e");
en("isoWeekday", "E");
tn("day", 11);
tn("weekday", 11);
tn("isoWeekday", 11);
ce("d", yt);
ce("e", yt);
ce("E", yt);
ce("dd", function (e, t) {
  return t.weekdaysMinRegex(e);
});
ce("ddd", function (e, t) {
  return t.weekdaysShortRegex(e);
});
ce("dddd", function (e, t) {
  return t.weekdaysRegex(e);
});
Ja(["dd", "ddd", "dddd"], function (e, t, r, a) {
  var l = r._locale.weekdaysParse(e, a, r._strict);
  l != null ? (t.d = l) : (Oe(r).invalidWeekday = e);
});
Ja(["d", "e", "E"], function (e, t, r, a) {
  t[a] = We(e);
});
function $C(e, t) {
  return typeof e != "string"
    ? e
    : isNaN(e)
    ? ((e = t.weekdaysParse(e)), typeof e == "number" ? e : null)
    : parseInt(e, 10);
}
function RC(e, t) {
  return typeof e == "string"
    ? t.weekdaysParse(e) % 7 || 7
    : isNaN(e)
    ? null
    : e;
}
function vc(e, t) {
  return e.slice(t, 7).concat(e.slice(0, t));
}
var OC = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  Qg = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
  LC = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
  NC = Za,
  BC = Za,
  FC = Za;
function UC(e, t) {
  var r = Kn(this._weekdays)
    ? this._weekdays
    : this._weekdays[
        e && e !== !0 && this._weekdays.isFormat.test(t)
          ? "format"
          : "standalone"
      ];
  return e === !0 ? vc(r, this._week.dow) : e ? r[e.day()] : r;
}
function VC(e) {
  return e === !0
    ? vc(this._weekdaysShort, this._week.dow)
    : e
    ? this._weekdaysShort[e.day()]
    : this._weekdaysShort;
}
function zC(e) {
  return e === !0
    ? vc(this._weekdaysMin, this._week.dow)
    : e
    ? this._weekdaysMin[e.day()]
    : this._weekdaysMin;
}
function WC(e, t, r) {
  var a,
    l,
    s,
    u = e.toLocaleLowerCase();
  if (!this._weekdaysParse)
    for (
      this._weekdaysParse = [],
        this._shortWeekdaysParse = [],
        this._minWeekdaysParse = [],
        a = 0;
      a < 7;
      ++a
    )
      (s = or([2e3, 1]).day(a)),
        (this._minWeekdaysParse[a] = this.weekdaysMin(
          s,
          ""
        ).toLocaleLowerCase()),
        (this._shortWeekdaysParse[a] = this.weekdaysShort(
          s,
          ""
        ).toLocaleLowerCase()),
        (this._weekdaysParse[a] = this.weekdays(s, "").toLocaleLowerCase());
  return r
    ? t === "dddd"
      ? ((l = Et.call(this._weekdaysParse, u)), l !== -1 ? l : null)
      : t === "ddd"
      ? ((l = Et.call(this._shortWeekdaysParse, u)), l !== -1 ? l : null)
      : ((l = Et.call(this._minWeekdaysParse, u)), l !== -1 ? l : null)
    : t === "dddd"
    ? ((l = Et.call(this._weekdaysParse, u)),
      l !== -1 || ((l = Et.call(this._shortWeekdaysParse, u)), l !== -1)
        ? l
        : ((l = Et.call(this._minWeekdaysParse, u)), l !== -1 ? l : null))
    : t === "ddd"
    ? ((l = Et.call(this._shortWeekdaysParse, u)),
      l !== -1 || ((l = Et.call(this._weekdaysParse, u)), l !== -1)
        ? l
        : ((l = Et.call(this._minWeekdaysParse, u)), l !== -1 ? l : null))
    : ((l = Et.call(this._minWeekdaysParse, u)),
      l !== -1 || ((l = Et.call(this._weekdaysParse, u)), l !== -1)
        ? l
        : ((l = Et.call(this._shortWeekdaysParse, u)), l !== -1 ? l : null));
}
function YC(e, t, r) {
  var a, l, s;
  if (this._weekdaysParseExact) return WC.call(this, e, t, r);
  for (
    this._weekdaysParse ||
      ((this._weekdaysParse = []),
      (this._minWeekdaysParse = []),
      (this._shortWeekdaysParse = []),
      (this._fullWeekdaysParse = [])),
      a = 0;
    a < 7;
    a++
  ) {
    if (
      ((l = or([2e3, 1]).day(a)),
      r &&
        !this._fullWeekdaysParse[a] &&
        ((this._fullWeekdaysParse[a] = new RegExp(
          "^" + this.weekdays(l, "").replace(".", "\\.?") + "$",
          "i"
        )),
        (this._shortWeekdaysParse[a] = new RegExp(
          "^" + this.weekdaysShort(l, "").replace(".", "\\.?") + "$",
          "i"
        )),
        (this._minWeekdaysParse[a] = new RegExp(
          "^" + this.weekdaysMin(l, "").replace(".", "\\.?") + "$",
          "i"
        ))),
      this._weekdaysParse[a] ||
        ((s =
          "^" +
          this.weekdays(l, "") +
          "|^" +
          this.weekdaysShort(l, "") +
          "|^" +
          this.weekdaysMin(l, "")),
        (this._weekdaysParse[a] = new RegExp(s.replace(".", ""), "i"))),
      r && t === "dddd" && this._fullWeekdaysParse[a].test(e))
    )
      return a;
    if (r && t === "ddd" && this._shortWeekdaysParse[a].test(e)) return a;
    if (r && t === "dd" && this._minWeekdaysParse[a].test(e)) return a;
    if (!r && this._weekdaysParse[a].test(e)) return a;
  }
}
function HC(e) {
  if (!this.isValid()) return e != null ? this : NaN;
  var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
  return e != null ? ((e = $C(e, this.localeData())), this.add(e - t, "d")) : t;
}
function GC(e) {
  if (!this.isValid()) return e != null ? this : NaN;
  var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
  return e == null ? t : this.add(e - t, "d");
}
function KC(e) {
  if (!this.isValid()) return e != null ? this : NaN;
  if (e != null) {
    var t = RC(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
  } else return this.day() || 7;
}
function QC(e) {
  return this._weekdaysParseExact
    ? (Xe(this, "_weekdaysRegex") || pc.call(this),
      e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    : (Xe(this, "_weekdaysRegex") || (this._weekdaysRegex = NC),
      this._weekdaysStrictRegex && e
        ? this._weekdaysStrictRegex
        : this._weekdaysRegex);
}
function jC(e) {
  return this._weekdaysParseExact
    ? (Xe(this, "_weekdaysRegex") || pc.call(this),
      e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    : (Xe(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = BC),
      this._weekdaysShortStrictRegex && e
        ? this._weekdaysShortStrictRegex
        : this._weekdaysShortRegex);
}
function ZC(e) {
  return this._weekdaysParseExact
    ? (Xe(this, "_weekdaysRegex") || pc.call(this),
      e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    : (Xe(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = FC),
      this._weekdaysMinStrictRegex && e
        ? this._weekdaysMinStrictRegex
        : this._weekdaysMinRegex);
}
function pc() {
  function e(v, T) {
    return T.length - v.length;
  }
  var t = [],
    r = [],
    a = [],
    l = [],
    s,
    u,
    d,
    f,
    g;
  for (s = 0; s < 7; s++)
    (u = or([2e3, 1]).day(s)),
      (d = kn(this.weekdaysMin(u, ""))),
      (f = kn(this.weekdaysShort(u, ""))),
      (g = kn(this.weekdays(u, ""))),
      t.push(d),
      r.push(f),
      a.push(g),
      l.push(d),
      l.push(f),
      l.push(g);
  t.sort(e),
    r.sort(e),
    a.sort(e),
    l.sort(e),
    (this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i")),
    (this._weekdaysShortRegex = this._weekdaysRegex),
    (this._weekdaysMinRegex = this._weekdaysRegex),
    (this._weekdaysStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")),
    (this._weekdaysShortStrictRegex = new RegExp(
      "^(" + r.join("|") + ")",
      "i"
    )),
    (this._weekdaysMinStrictRegex = new RegExp("^(" + t.join("|") + ")", "i"));
}
function yc() {
  return this.hours() % 12 || 12;
}
function JC() {
  return this.hours() || 24;
}
be("H", ["HH", 2], 0, "hour");
be("h", ["hh", 2], 0, yc);
be("k", ["kk", 2], 0, JC);
be("hmm", 0, 0, function () {
  return "" + yc.apply(this) + rr(this.minutes(), 2);
});
be("hmmss", 0, 0, function () {
  return "" + yc.apply(this) + rr(this.minutes(), 2) + rr(this.seconds(), 2);
});
be("Hmm", 0, 0, function () {
  return "" + this.hours() + rr(this.minutes(), 2);
});
be("Hmmss", 0, 0, function () {
  return "" + this.hours() + rr(this.minutes(), 2) + rr(this.seconds(), 2);
});
function jg(e, t) {
  be(e, 0, 0, function () {
    return this.localeData().meridiem(this.hours(), this.minutes(), t);
  });
}
jg("a", !0);
jg("A", !1);
en("hour", "h");
tn("hour", 13);
function Zg(e, t) {
  return t._meridiemParse;
}
ce("a", Zg);
ce("A", Zg);
ce("H", yt);
ce("h", yt);
ce("k", yt);
ce("HH", yt, Dn);
ce("hh", yt, Dn);
ce("kk", yt, Dn);
ce("hmm", Fg);
ce("hmmss", Ug);
ce("Hmm", Fg);
ce("Hmmss", Ug);
ct(["H", "HH"], Ot);
ct(["k", "kk"], function (e, t, r) {
  var a = We(e);
  t[Ot] = a === 24 ? 0 : a;
});
ct(["a", "A"], function (e, t, r) {
  (r._isPm = r._locale.isPM(e)), (r._meridiem = e);
});
ct(["h", "hh"], function (e, t, r) {
  (t[Ot] = We(e)), (Oe(r).bigHour = !0);
});
ct("hmm", function (e, t, r) {
  var a = e.length - 2;
  (t[Ot] = We(e.substr(0, a))), (t[Gn] = We(e.substr(a))), (Oe(r).bigHour = !0);
});
ct("hmmss", function (e, t, r) {
  var a = e.length - 4,
    l = e.length - 2;
  (t[Ot] = We(e.substr(0, a))),
    (t[Gn] = We(e.substr(a, 2))),
    (t[Tr] = We(e.substr(l))),
    (Oe(r).bigHour = !0);
});
ct("Hmm", function (e, t, r) {
  var a = e.length - 2;
  (t[Ot] = We(e.substr(0, a))), (t[Gn] = We(e.substr(a)));
});
ct("Hmmss", function (e, t, r) {
  var a = e.length - 4,
    l = e.length - 2;
  (t[Ot] = We(e.substr(0, a))),
    (t[Gn] = We(e.substr(a, 2))),
    (t[Tr] = We(e.substr(l)));
});
function XC(e) {
  return (e + "").toLowerCase().charAt(0) === "p";
}
var e2 = /[ap]\.?m?\.?/i,
  t2 = la("Hours", !0);
function n2(e, t, r) {
  return e > 11 ? (r ? "pm" : "PM") : r ? "am" : "AM";
}
var Jg = {
    calendar: Yk,
    longDateFormat: Qk,
    invalidDate: Zk,
    ordinal: Xk,
    dayOfMonthOrdinalParse: eC,
    relativeTime: nC,
    months: vC,
    monthsShort: Vg,
    week: xC,
    weekdays: OC,
    weekdaysMin: LC,
    weekdaysShort: Qg,
    meridiemParse: e2,
  },
  bt = {},
  qa = {},
  za;
function r2(e, t) {
  var r,
    a = Math.min(e.length, t.length);
  for (r = 0; r < a; r += 1) if (e[r] !== t[r]) return r;
  return a;
}
function Dh(e) {
  return e && e.toLowerCase().replace("_", "-");
}
function i2(e) {
  for (var t = 0, r, a, l, s; t < e.length; ) {
    for (
      s = Dh(e[t]).split("-"),
        r = s.length,
        a = Dh(e[t + 1]),
        a = a ? a.split("-") : null;
      r > 0;

    ) {
      if (((l = Fo(s.slice(0, r).join("-"))), l)) return l;
      if (a && a.length >= r && r2(s, a) >= r - 1) break;
      r--;
    }
    t++;
  }
  return za;
}
function a2(e) {
  return e.match("^[^/\\\\]*$") != null;
}
function Fo(e) {
  var t = null,
    r;
  if (
    bt[e] === void 0 &&
    typeof module != "undefined" &&
    module &&
    module.exports &&
    a2(e)
  )
    try {
      (t = za._abbr), (r = require), r("./locale/" + e), Zr(t);
    } catch {
      bt[e] = null;
    }
  return bt[e];
}
function Zr(e, t) {
  var r;
  return (
    e &&
      (mn(t) ? (r = qr(e)) : (r = _c(e, t)),
      r
        ? (za = r)
        : typeof console != "undefined" &&
          console.warn &&
          console.warn(
            "Locale " + e + " not found. Did you forget to load it?"
          )),
    za._abbr
  );
}
function _c(e, t) {
  if (t !== null) {
    var r,
      a = Jg;
    if (((t.abbr = e), bt[e] != null))
      $g(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ),
        (a = bt[e]._config);
    else if (t.parentLocale != null)
      if (bt[t.parentLocale] != null) a = bt[t.parentLocale]._config;
      else if (((r = Fo(t.parentLocale)), r != null)) a = r._config;
      else
        return (
          qa[t.parentLocale] || (qa[t.parentLocale] = []),
          qa[t.parentLocale].push({ name: e, config: t }),
          null
        );
    return (
      (bt[e] = new dc(Lu(a, t))),
      qa[e] &&
        qa[e].forEach(function (l) {
          _c(l.name, l.config);
        }),
      Zr(e),
      bt[e]
    );
  } else return delete bt[e], null;
}
function l2(e, t) {
  if (t != null) {
    var r,
      a,
      l = Jg;
    bt[e] != null && bt[e].parentLocale != null
      ? bt[e].set(Lu(bt[e]._config, t))
      : ((a = Fo(e)),
        a != null && (l = a._config),
        (t = Lu(l, t)),
        a == null && (t.abbr = e),
        (r = new dc(t)),
        (r.parentLocale = bt[e]),
        (bt[e] = r)),
      Zr(e);
  } else
    bt[e] != null &&
      (bt[e].parentLocale != null
        ? ((bt[e] = bt[e].parentLocale), e === Zr() && Zr(e))
        : bt[e] != null && delete bt[e]);
  return bt[e];
}
function qr(e) {
  var t;
  if ((e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e))
    return za;
  if (!Kn(e)) {
    if (((t = Fo(e)), t)) return t;
    e = [e];
  }
  return i2(e);
}
function o2() {
  return Nu(bt);
}
function bc(e) {
  var t,
    r = e._a;
  return (
    r &&
      Oe(e).overflow === -2 &&
      ((t =
        r[Cr] < 0 || r[Cr] > 11
          ? Cr
          : r[nr] < 1 || r[nr] > Bo(r[Xt], r[Cr])
          ? nr
          : r[Ot] < 0 ||
            r[Ot] > 24 ||
            (r[Ot] === 24 && (r[Gn] !== 0 || r[Tr] !== 0 || r[mi] !== 0))
          ? Ot
          : r[Gn] < 0 || r[Gn] > 59
          ? Gn
          : r[Tr] < 0 || r[Tr] > 59
          ? Tr
          : r[mi] < 0 || r[mi] > 999
          ? mi
          : -1),
      Oe(e)._overflowDayOfYear && (t < Xt || t > nr) && (t = nr),
      Oe(e)._overflowWeeks && t === -1 && (t = hC),
      Oe(e)._overflowWeekday && t === -1 && (t = gC),
      (Oe(e).overflow = t)),
    e
  );
}
var s2 =
    /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  u2 =
    /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
  c2 = /Z|[+-]\d\d(?::?\d\d)?/,
  no = [
    ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
    ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
    ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
    ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
    ["YYYY-DDD", /\d{4}-\d{3}/],
    ["YYYY-MM", /\d{4}-\d\d/, !1],
    ["YYYYYYMMDD", /[+-]\d{10}/],
    ["YYYYMMDD", /\d{8}/],
    ["GGGG[W]WWE", /\d{4}W\d{3}/],
    ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
    ["YYYYDDD", /\d{7}/],
    ["YYYYMM", /\d{6}/, !1],
    ["YYYY", /\d{4}/, !1],
  ],
  Tu = [
    ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
    ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
    ["HH:mm:ss", /\d\d:\d\d:\d\d/],
    ["HH:mm", /\d\d:\d\d/],
    ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
    ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
    ["HHmmss", /\d\d\d\d\d\d/],
    ["HHmm", /\d\d\d\d/],
    ["HH", /\d\d/],
  ],
  d2 = /^\/?Date\((-?\d+)/i,
  f2 =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
  h2 = {
    UT: 0,
    GMT: 0,
    EDT: -4 * 60,
    EST: -5 * 60,
    CDT: -5 * 60,
    CST: -6 * 60,
    MDT: -6 * 60,
    MST: -7 * 60,
    PDT: -7 * 60,
    PST: -8 * 60,
  };
function Xg(e) {
  var t,
    r,
    a = e._i,
    l = s2.exec(a) || u2.exec(a),
    s,
    u,
    d,
    f,
    g = no.length,
    v = Tu.length;
  if (l) {
    for (Oe(e).iso = !0, t = 0, r = g; t < r; t++)
      if (no[t][1].exec(l[1])) {
        (u = no[t][0]), (s = no[t][2] !== !1);
        break;
      }
    if (u == null) {
      e._isValid = !1;
      return;
    }
    if (l[3]) {
      for (t = 0, r = v; t < r; t++)
        if (Tu[t][1].exec(l[3])) {
          d = (l[2] || " ") + Tu[t][0];
          break;
        }
      if (d == null) {
        e._isValid = !1;
        return;
      }
    }
    if (!s && d != null) {
      e._isValid = !1;
      return;
    }
    if (l[4])
      if (c2.exec(l[4])) f = "Z";
      else {
        e._isValid = !1;
        return;
      }
    (e._f = u + (d || "") + (f || "")), Sc(e);
  } else e._isValid = !1;
}
function g2(e, t, r, a, l, s) {
  var u = [
    m2(e),
    Vg.indexOf(t),
    parseInt(r, 10),
    parseInt(a, 10),
    parseInt(l, 10),
  ];
  return s && u.push(parseInt(s, 10)), u;
}
function m2(e) {
  var t = parseInt(e, 10);
  return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t;
}
function v2(e) {
  return e
    .replace(/\([^()]*\)|[\n\t]/g, " ")
    .replace(/(\s\s+)/g, " ")
    .replace(/^\s\s*/, "")
    .replace(/\s\s*$/, "");
}
function p2(e, t, r) {
  if (e) {
    var a = Qg.indexOf(e),
      l = new Date(t[0], t[1], t[2]).getDay();
    if (a !== l) return (Oe(r).weekdayMismatch = !0), (r._isValid = !1), !1;
  }
  return !0;
}
function y2(e, t, r) {
  if (e) return h2[e];
  if (t) return 0;
  var a = parseInt(r, 10),
    l = a % 100,
    s = (a - l) / 100;
  return s * 60 + l;
}
function em(e) {
  var t = f2.exec(v2(e._i)),
    r;
  if (t) {
    if (((r = g2(t[4], t[3], t[2], t[5], t[6], t[7])), !p2(t[1], r, e))) return;
    (e._a = r),
      (e._tzm = y2(t[8], t[9], t[10])),
      (e._d = Ua.apply(null, e._a)),
      e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
      (Oe(e).rfc2822 = !0);
  } else e._isValid = !1;
}
function _2(e) {
  var t = d2.exec(e._i);
  if (t !== null) {
    e._d = new Date(+t[1]);
    return;
  }
  if ((Xg(e), e._isValid === !1)) delete e._isValid;
  else return;
  if ((em(e), e._isValid === !1)) delete e._isValid;
  else return;
  e._strict ? (e._isValid = !1) : ae.createFromInputFallback(e);
}
ae.createFromInputFallback = Ln(
  "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
  function (e) {
    e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
  }
);
function Yi(e, t, r) {
  return e != null ? e : t != null ? t : r;
}
function b2(e) {
  var t = new Date(ae.now());
  return e._useUTC
    ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()]
    : [t.getFullYear(), t.getMonth(), t.getDate()];
}
function wc(e) {
  var t,
    r,
    a = [],
    l,
    s,
    u;
  if (!e._d) {
    for (
      l = b2(e),
        e._w && e._a[nr] == null && e._a[Cr] == null && w2(e),
        e._dayOfYear != null &&
          ((u = Yi(e._a[Xt], l[Xt])),
          (e._dayOfYear > Na(u) || e._dayOfYear === 0) &&
            (Oe(e)._overflowDayOfYear = !0),
          (r = Ua(u, 0, e._dayOfYear)),
          (e._a[Cr] = r.getUTCMonth()),
          (e._a[nr] = r.getUTCDate())),
        t = 0;
      t < 3 && e._a[t] == null;
      ++t
    )
      e._a[t] = a[t] = l[t];
    for (; t < 7; t++)
      e._a[t] = a[t] = e._a[t] == null ? (t === 2 ? 1 : 0) : e._a[t];
    e._a[Ot] === 24 &&
      e._a[Gn] === 0 &&
      e._a[Tr] === 0 &&
      e._a[mi] === 0 &&
      ((e._nextDay = !0), (e._a[Ot] = 0)),
      (e._d = (e._useUTC ? Ua : DC).apply(null, a)),
      (s = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
      e._tzm != null && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
      e._nextDay && (e._a[Ot] = 24),
      e._w &&
        typeof e._w.d != "undefined" &&
        e._w.d !== s &&
        (Oe(e).weekdayMismatch = !0);
  }
}
function w2(e) {
  var t, r, a, l, s, u, d, f, g;
  (t = e._w),
    t.GG != null || t.W != null || t.E != null
      ? ((s = 1),
        (u = 4),
        (r = Yi(t.GG, e._a[Xt], Va(pt(), 1, 4).year)),
        (a = Yi(t.W, 1)),
        (l = Yi(t.E, 1)),
        (l < 1 || l > 7) && (f = !0))
      : ((s = e._locale._week.dow),
        (u = e._locale._week.doy),
        (g = Va(pt(), s, u)),
        (r = Yi(t.gg, e._a[Xt], g.year)),
        (a = Yi(t.w, g.week)),
        t.d != null
          ? ((l = t.d), (l < 0 || l > 6) && (f = !0))
          : t.e != null
          ? ((l = t.e + s), (t.e < 0 || t.e > 6) && (f = !0))
          : (l = s)),
    a < 1 || a > Mr(r, s, u)
      ? (Oe(e)._overflowWeeks = !0)
      : f != null
      ? (Oe(e)._overflowWeekday = !0)
      : ((d = Kg(r, a, l, s, u)),
        (e._a[Xt] = d.year),
        (e._dayOfYear = d.dayOfYear));
}
ae.ISO_8601 = function () {};
ae.RFC_2822 = function () {};
function Sc(e) {
  if (e._f === ae.ISO_8601) {
    Xg(e);
    return;
  }
  if (e._f === ae.RFC_2822) {
    em(e);
    return;
  }
  (e._a = []), (Oe(e).empty = !0);
  var t = "" + e._i,
    r,
    a,
    l,
    s,
    u,
    d = t.length,
    f = 0,
    g,
    v;
  for (l = Rg(e._f, e._locale).match(fc) || [], v = l.length, r = 0; r < v; r++)
    (s = l[r]),
      (a = (t.match(cC(s, e)) || [])[0]),
      a &&
        ((u = t.substr(0, t.indexOf(a))),
        u.length > 0 && Oe(e).unusedInput.push(u),
        (t = t.slice(t.indexOf(a) + a.length)),
        (f += a.length)),
      ji[s]
        ? (a ? (Oe(e).empty = !1) : Oe(e).unusedTokens.push(s), fC(s, a, e))
        : e._strict && !a && Oe(e).unusedTokens.push(s);
  (Oe(e).charsLeftOver = d - f),
    t.length > 0 && Oe(e).unusedInput.push(t),
    e._a[Ot] <= 12 &&
      Oe(e).bigHour === !0 &&
      e._a[Ot] > 0 &&
      (Oe(e).bigHour = void 0),
    (Oe(e).parsedDateParts = e._a.slice(0)),
    (Oe(e).meridiem = e._meridiem),
    (e._a[Ot] = S2(e._locale, e._a[Ot], e._meridiem)),
    (g = Oe(e).era),
    g !== null && (e._a[Xt] = e._locale.erasConvertYear(g, e._a[Xt])),
    wc(e),
    bc(e);
}
function S2(e, t, r) {
  var a;
  return r == null
    ? t
    : e.meridiemHour != null
    ? e.meridiemHour(t, r)
    : (e.isPM != null &&
        ((a = e.isPM(r)), a && t < 12 && (t += 12), !a && t === 12 && (t = 0)),
      t);
}
function k2(e) {
  var t,
    r,
    a,
    l,
    s,
    u,
    d = !1,
    f = e._f.length;
  if (f === 0) {
    (Oe(e).invalidFormat = !0), (e._d = new Date(NaN));
    return;
  }
  for (l = 0; l < f; l++)
    (s = 0),
      (u = !1),
      (t = cc({}, e)),
      e._useUTC != null && (t._useUTC = e._useUTC),
      (t._f = e._f[l]),
      Sc(t),
      uc(t) && (u = !0),
      (s += Oe(t).charsLeftOver),
      (s += Oe(t).unusedTokens.length * 10),
      (Oe(t).score = s),
      d
        ? s < a && ((a = s), (r = t))
        : (a == null || s < a || u) && ((a = s), (r = t), u && (d = !0));
  Kr(e, r || t);
}
function C2(e) {
  if (!e._d) {
    var t = hc(e._i),
      r = t.day === void 0 ? t.date : t.day;
    (e._a = Eg(
      [t.year, t.month, r, t.hour, t.minute, t.second, t.millisecond],
      function (a) {
        return a && parseInt(a, 10);
      }
    )),
      wc(e);
  }
}
function T2(e) {
  var t = new ja(bc(tm(e)));
  return t._nextDay && (t.add(1, "d"), (t._nextDay = void 0)), t;
}
function tm(e) {
  var t = e._i,
    r = e._f;
  return (
    (e._locale = e._locale || qr(e._l)),
    t === null || (r === void 0 && t === "")
      ? Eo({ nullInput: !0 })
      : (typeof t == "string" && (e._i = t = e._locale.preparse(t)),
        Qn(t)
          ? new ja(bc(t))
          : (Qa(t) ? (e._d = t) : Kn(r) ? k2(e) : r ? Sc(e) : M2(e),
            uc(e) || (e._d = null),
            e))
  );
}
function M2(e) {
  var t = e._i;
  mn(t)
    ? (e._d = new Date(ae.now()))
    : Qa(t)
    ? (e._d = new Date(t.valueOf()))
    : typeof t == "string"
    ? _2(e)
    : Kn(t)
    ? ((e._a = Eg(t.slice(0), function (r) {
        return parseInt(r, 10);
      })),
      wc(e))
    : pi(t)
    ? C2(e)
    : Dr(t)
    ? (e._d = new Date(t))
    : ae.createFromInputFallback(e);
}
function nm(e, t, r, a, l) {
  var s = {};
  return (
    (t === !0 || t === !1) && ((a = t), (t = void 0)),
    (r === !0 || r === !1) && ((a = r), (r = void 0)),
    ((pi(e) && sc(e)) || (Kn(e) && e.length === 0)) && (e = void 0),
    (s._isAMomentObject = !0),
    (s._useUTC = s._isUTC = l),
    (s._l = r),
    (s._i = e),
    (s._f = t),
    (s._strict = a),
    T2(s)
  );
}
function pt(e, t, r, a) {
  return nm(e, t, r, a, !1);
}
var D2 = Ln(
    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
    function () {
      var e = pt.apply(null, arguments);
      return this.isValid() && e.isValid() ? (e < this ? this : e) : Eo();
    }
  ),
  q2 = Ln(
    "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
    function () {
      var e = pt.apply(null, arguments);
      return this.isValid() && e.isValid() ? (e > this ? this : e) : Eo();
    }
  );
function rm(e, t) {
  var r, a;
  if ((t.length === 1 && Kn(t[0]) && (t = t[0]), !t.length)) return pt();
  for (r = t[0], a = 1; a < t.length; ++a)
    (!t[a].isValid() || t[a][e](r)) && (r = t[a]);
  return r;
}
function x2() {
  var e = [].slice.call(arguments, 0);
  return rm("isBefore", e);
}
function P2() {
  var e = [].slice.call(arguments, 0);
  return rm("isAfter", e);
}
var A2 = function () {
    return Date.now ? Date.now() : +new Date();
  },
  xa = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond",
  ];
function E2(e) {
  var t,
    r = !1,
    a,
    l = xa.length;
  for (t in e)
    if (Xe(e, t) && !(Et.call(xa, t) !== -1 && (e[t] == null || !isNaN(e[t]))))
      return !1;
  for (a = 0; a < l; ++a)
    if (e[xa[a]]) {
      if (r) return !1;
      parseFloat(e[xa[a]]) !== We(e[xa[a]]) && (r = !0);
    }
  return !0;
}
function I2() {
  return this._isValid;
}
function $2() {
  return jn(NaN);
}
function Uo(e) {
  var t = hc(e),
    r = t.year || 0,
    a = t.quarter || 0,
    l = t.month || 0,
    s = t.week || t.isoWeek || 0,
    u = t.day || 0,
    d = t.hour || 0,
    f = t.minute || 0,
    g = t.second || 0,
    v = t.millisecond || 0;
  (this._isValid = E2(t)),
    (this._milliseconds = +v + g * 1e3 + f * 6e4 + d * 1e3 * 60 * 60),
    (this._days = +u + s * 7),
    (this._months = +l + a * 3 + r * 12),
    (this._data = {}),
    (this._locale = qr()),
    this._bubble();
}
function ao(e) {
  return e instanceof Uo;
}
function Fu(e) {
  return e < 0 ? Math.round(-1 * e) * -1 : Math.round(e);
}
function R2(e, t, r) {
  var a = Math.min(e.length, t.length),
    l = Math.abs(e.length - t.length),
    s = 0,
    u;
  for (u = 0; u < a; u++)
    ((r && e[u] !== t[u]) || (!r && We(e[u]) !== We(t[u]))) && s++;
  return s + l;
}
function im(e, t) {
  be(e, 0, 0, function () {
    var r = this.utcOffset(),
      a = "+";
    return (
      r < 0 && ((r = -r), (a = "-")),
      a + rr(~~(r / 60), 2) + t + rr(~~r % 60, 2)
    );
  });
}
im("Z", ":");
im("ZZ", "");
ce("Z", No);
ce("ZZ", No);
ct(["Z", "ZZ"], function (e, t, r) {
  (r._useUTC = !0), (r._tzm = kc(No, e));
});
var O2 = /([\+\-]|\d\d)/gi;
function kc(e, t) {
  var r = (t || "").match(e),
    a,
    l,
    s;
  return r === null
    ? null
    : ((a = r[r.length - 1] || []),
      (l = (a + "").match(O2) || ["-", 0, 0]),
      (s = +(l[1] * 60) + We(l[2])),
      s === 0 ? 0 : l[0] === "+" ? s : -s);
}
function Cc(e, t) {
  var r, a;
  return t._isUTC
    ? ((r = t.clone()),
      (a = (Qn(e) || Qa(e) ? e.valueOf() : pt(e).valueOf()) - r.valueOf()),
      r._d.setTime(r._d.valueOf() + a),
      ae.updateOffset(r, !1),
      r)
    : pt(e).local();
}
function Uu(e) {
  return -Math.round(e._d.getTimezoneOffset());
}
ae.updateOffset = function () {};
function L2(e, t, r) {
  var a = this._offset || 0,
    l;
  if (!this.isValid()) return e != null ? this : NaN;
  if (e != null) {
    if (typeof e == "string") {
      if (((e = kc(No, e)), e === null)) return this;
    } else Math.abs(e) < 16 && !r && (e = e * 60);
    return (
      !this._isUTC && t && (l = Uu(this)),
      (this._offset = e),
      (this._isUTC = !0),
      l != null && this.add(l, "m"),
      a !== e &&
        (!t || this._changeInProgress
          ? om(this, jn(e - a, "m"), 1, !1)
          : this._changeInProgress ||
            ((this._changeInProgress = !0),
            ae.updateOffset(this, !0),
            (this._changeInProgress = null))),
      this
    );
  } else return this._isUTC ? a : Uu(this);
}
function N2(e, t) {
  return e != null
    ? (typeof e != "string" && (e = -e), this.utcOffset(e, t), this)
    : -this.utcOffset();
}
function B2(e) {
  return this.utcOffset(0, e);
}
function F2(e) {
  return (
    this._isUTC &&
      (this.utcOffset(0, e),
      (this._isUTC = !1),
      e && this.subtract(Uu(this), "m")),
    this
  );
}
function U2() {
  if (this._tzm != null) this.utcOffset(this._tzm, !1, !0);
  else if (typeof this._i == "string") {
    var e = kc(sC, this._i);
    e != null ? this.utcOffset(e) : this.utcOffset(0, !0);
  }
  return this;
}
function V2(e) {
  return this.isValid()
    ? ((e = e ? pt(e).utcOffset() : 0), (this.utcOffset() - e) % 60 === 0)
    : !1;
}
function z2() {
  return (
    this.utcOffset() > this.clone().month(0).utcOffset() ||
    this.utcOffset() > this.clone().month(5).utcOffset()
  );
}
function W2() {
  if (!mn(this._isDSTShifted)) return this._isDSTShifted;
  var e = {},
    t;
  return (
    cc(e, this),
    (e = tm(e)),
    e._a
      ? ((t = e._isUTC ? or(e._a) : pt(e._a)),
        (this._isDSTShifted = this.isValid() && R2(e._a, t.toArray()) > 0))
      : (this._isDSTShifted = !1),
    this._isDSTShifted
  );
}
function Y2() {
  return this.isValid() ? !this._isUTC : !1;
}
function H2() {
  return this.isValid() ? this._isUTC : !1;
}
function am() {
  return this.isValid() ? this._isUTC && this._offset === 0 : !1;
}
var G2 = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
  K2 =
    /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function jn(e, t) {
  var r = e,
    a = null,
    l,
    s,
    u;
  return (
    ao(e)
      ? (r = { ms: e._milliseconds, d: e._days, M: e._months })
      : Dr(e) || !isNaN(+e)
      ? ((r = {}), t ? (r[t] = +e) : (r.milliseconds = +e))
      : (a = G2.exec(e))
      ? ((l = a[1] === "-" ? -1 : 1),
        (r = {
          y: 0,
          d: We(a[nr]) * l,
          h: We(a[Ot]) * l,
          m: We(a[Gn]) * l,
          s: We(a[Tr]) * l,
          ms: We(Fu(a[mi] * 1e3)) * l,
        }))
      : (a = K2.exec(e))
      ? ((l = a[1] === "-" ? -1 : 1),
        (r = {
          y: di(a[2], l),
          M: di(a[3], l),
          w: di(a[4], l),
          d: di(a[5], l),
          h: di(a[6], l),
          m: di(a[7], l),
          s: di(a[8], l),
        }))
      : r == null
      ? (r = {})
      : typeof r == "object" &&
        ("from" in r || "to" in r) &&
        ((u = Q2(pt(r.from), pt(r.to))),
        (r = {}),
        (r.ms = u.milliseconds),
        (r.M = u.months)),
    (s = new Uo(r)),
    ao(e) && Xe(e, "_locale") && (s._locale = e._locale),
    ao(e) && Xe(e, "_isValid") && (s._isValid = e._isValid),
    s
  );
}
jn.fn = Uo.prototype;
jn.invalid = $2;
function di(e, t) {
  var r = e && parseFloat(e.replace(",", "."));
  return (isNaN(r) ? 0 : r) * t;
}
function qh(e, t) {
  var r = {};
  return (
    (r.months = t.month() - e.month() + (t.year() - e.year()) * 12),
    e.clone().add(r.months, "M").isAfter(t) && --r.months,
    (r.milliseconds = +t - +e.clone().add(r.months, "M")),
    r
  );
}
function Q2(e, t) {
  var r;
  return e.isValid() && t.isValid()
    ? ((t = Cc(t, e)),
      e.isBefore(t)
        ? (r = qh(e, t))
        : ((r = qh(t, e)),
          (r.milliseconds = -r.milliseconds),
          (r.months = -r.months)),
      r)
    : { milliseconds: 0, months: 0 };
}
function lm(e, t) {
  return function (r, a) {
    var l, s;
    return (
      a !== null &&
        !isNaN(+a) &&
        ($g(
          t,
          "moment()." +
            t +
            "(period, number) is deprecated. Please use moment()." +
            t +
            "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
        ),
        (s = r),
        (r = a),
        (a = s)),
      (l = jn(r, a)),
      om(this, l, e),
      this
    );
  };
}
function om(e, t, r, a) {
  var l = t._milliseconds,
    s = Fu(t._days),
    u = Fu(t._months);
  !e.isValid() ||
    ((a = a == null ? !0 : a),
    u && Wg(e, bo(e, "Month") + u * r),
    s && Lg(e, "Date", bo(e, "Date") + s * r),
    l && e._d.setTime(e._d.valueOf() + l * r),
    a && ae.updateOffset(e, s || u));
}
var j2 = lm(1, "add"),
  Z2 = lm(-1, "subtract");
function sm(e) {
  return typeof e == "string" || e instanceof String;
}
function J2(e) {
  return (
    Qn(e) ||
    Qa(e) ||
    sm(e) ||
    Dr(e) ||
    eT(e) ||
    X2(e) ||
    e === null ||
    e === void 0
  );
}
function X2(e) {
  var t = pi(e) && !sc(e),
    r = !1,
    a = [
      "years",
      "year",
      "y",
      "months",
      "month",
      "M",
      "days",
      "day",
      "d",
      "dates",
      "date",
      "D",
      "hours",
      "hour",
      "h",
      "minutes",
      "minute",
      "m",
      "seconds",
      "second",
      "s",
      "milliseconds",
      "millisecond",
      "ms",
    ],
    l,
    s,
    u = a.length;
  for (l = 0; l < u; l += 1) (s = a[l]), (r = r || Xe(e, s));
  return t && r;
}
function eT(e) {
  var t = Kn(e),
    r = !1;
  return (
    t &&
      (r =
        e.filter(function (a) {
          return !Dr(a) && sm(e);
        }).length === 0),
    t && r
  );
}
function tT(e) {
  var t = pi(e) && !sc(e),
    r = !1,
    a = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"],
    l,
    s;
  for (l = 0; l < a.length; l += 1) (s = a[l]), (r = r || Xe(e, s));
  return t && r;
}
function nT(e, t) {
  var r = e.diff(t, "days", !0);
  return r < -6
    ? "sameElse"
    : r < -1
    ? "lastWeek"
    : r < 0
    ? "lastDay"
    : r < 1
    ? "sameDay"
    : r < 2
    ? "nextDay"
    : r < 7
    ? "nextWeek"
    : "sameElse";
}
function rT(e, t) {
  arguments.length === 1 &&
    (arguments[0]
      ? J2(arguments[0])
        ? ((e = arguments[0]), (t = void 0))
        : tT(arguments[0]) && ((t = arguments[0]), (e = void 0))
      : ((e = void 0), (t = void 0)));
  var r = e || pt(),
    a = Cc(r, this).startOf("day"),
    l = ae.calendarFormat(this, a) || "sameElse",
    s = t && (sr(t[l]) ? t[l].call(this, r) : t[l]);
  return this.format(s || this.localeData().calendar(l, this, pt(r)));
}
function iT() {
  return new ja(this);
}
function aT(e, t) {
  var r = Qn(e) ? e : pt(e);
  return this.isValid() && r.isValid()
    ? ((t = Nn(t) || "millisecond"),
      t === "millisecond"
        ? this.valueOf() > r.valueOf()
        : r.valueOf() < this.clone().startOf(t).valueOf())
    : !1;
}
function lT(e, t) {
  var r = Qn(e) ? e : pt(e);
  return this.isValid() && r.isValid()
    ? ((t = Nn(t) || "millisecond"),
      t === "millisecond"
        ? this.valueOf() < r.valueOf()
        : this.clone().endOf(t).valueOf() < r.valueOf())
    : !1;
}
function oT(e, t, r, a) {
  var l = Qn(e) ? e : pt(e),
    s = Qn(t) ? t : pt(t);
  return this.isValid() && l.isValid() && s.isValid()
    ? ((a = a || "()"),
      (a[0] === "(" ? this.isAfter(l, r) : !this.isBefore(l, r)) &&
        (a[1] === ")" ? this.isBefore(s, r) : !this.isAfter(s, r)))
    : !1;
}
function sT(e, t) {
  var r = Qn(e) ? e : pt(e),
    a;
  return this.isValid() && r.isValid()
    ? ((t = Nn(t) || "millisecond"),
      t === "millisecond"
        ? this.valueOf() === r.valueOf()
        : ((a = r.valueOf()),
          this.clone().startOf(t).valueOf() <= a &&
            a <= this.clone().endOf(t).valueOf()))
    : !1;
}
function uT(e, t) {
  return this.isSame(e, t) || this.isAfter(e, t);
}
function cT(e, t) {
  return this.isSame(e, t) || this.isBefore(e, t);
}
function dT(e, t, r) {
  var a, l, s;
  if (!this.isValid()) return NaN;
  if (((a = Cc(e, this)), !a.isValid())) return NaN;
  switch (((l = (a.utcOffset() - this.utcOffset()) * 6e4), (t = Nn(t)), t)) {
    case "year":
      s = lo(this, a) / 12;
      break;
    case "month":
      s = lo(this, a);
      break;
    case "quarter":
      s = lo(this, a) / 3;
      break;
    case "second":
      s = (this - a) / 1e3;
      break;
    case "minute":
      s = (this - a) / 6e4;
      break;
    case "hour":
      s = (this - a) / 36e5;
      break;
    case "day":
      s = (this - a - l) / 864e5;
      break;
    case "week":
      s = (this - a - l) / 6048e5;
      break;
    default:
      s = this - a;
  }
  return r ? s : On(s);
}
function lo(e, t) {
  if (e.date() < t.date()) return -lo(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()),
    a = e.clone().add(r, "months"),
    l,
    s;
  return (
    t - a < 0
      ? ((l = e.clone().add(r - 1, "months")), (s = (t - a) / (a - l)))
      : ((l = e.clone().add(r + 1, "months")), (s = (t - a) / (l - a))),
    -(r + s) || 0
  );
}
ae.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
ae.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
function fT() {
  return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function hT(e) {
  if (!this.isValid()) return null;
  var t = e !== !0,
    r = t ? this.clone().utc() : this;
  return r.year() < 0 || r.year() > 9999
    ? io(
        r,
        t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
      )
    : sr(Date.prototype.toISOString)
    ? t
      ? this.toDate().toISOString()
      : new Date(this.valueOf() + this.utcOffset() * 60 * 1e3)
          .toISOString()
          .replace("Z", io(r, "Z"))
    : io(r, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ");
}
function gT() {
  if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
  var e = "moment",
    t = "",
    r,
    a,
    l,
    s;
  return (
    this.isLocal() ||
      ((e = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone"),
      (t = "Z")),
    (r = "[" + e + '("]'),
    (a = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"),
    (l = "-MM-DD[T]HH:mm:ss.SSS"),
    (s = t + '[")]'),
    this.format(r + a + l + s)
  );
}
function mT(e) {
  e || (e = this.isUtc() ? ae.defaultFormatUtc : ae.defaultFormat);
  var t = io(this, e);
  return this.localeData().postformat(t);
}
function vT(e, t) {
  return this.isValid() && ((Qn(e) && e.isValid()) || pt(e).isValid())
    ? jn({ to: this, from: e }).locale(this.locale()).humanize(!t)
    : this.localeData().invalidDate();
}
function pT(e) {
  return this.from(pt(), e);
}
function yT(e, t) {
  return this.isValid() && ((Qn(e) && e.isValid()) || pt(e).isValid())
    ? jn({ from: this, to: e }).locale(this.locale()).humanize(!t)
    : this.localeData().invalidDate();
}
function _T(e) {
  return this.to(pt(), e);
}
function um(e) {
  var t;
  return e === void 0
    ? this._locale._abbr
    : ((t = qr(e)), t != null && (this._locale = t), this);
}
var cm = Ln(
  "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
  function (e) {
    return e === void 0 ? this.localeData() : this.locale(e);
  }
);
function dm() {
  return this._locale;
}
var ko = 1e3,
  Zi = 60 * ko,
  Co = 60 * Zi,
  fm = (365 * 400 + 97) * 24 * Co;
function Ji(e, t) {
  return ((e % t) + t) % t;
}
function hm(e, t, r) {
  return e < 100 && e >= 0
    ? new Date(e + 400, t, r) - fm
    : new Date(e, t, r).valueOf();
}
function gm(e, t, r) {
  return e < 100 && e >= 0 ? Date.UTC(e + 400, t, r) - fm : Date.UTC(e, t, r);
}
function bT(e) {
  var t, r;
  if (((e = Nn(e)), e === void 0 || e === "millisecond" || !this.isValid()))
    return this;
  switch (((r = this._isUTC ? gm : hm), e)) {
    case "year":
      t = r(this.year(), 0, 1);
      break;
    case "quarter":
      t = r(this.year(), this.month() - (this.month() % 3), 1);
      break;
    case "month":
      t = r(this.year(), this.month(), 1);
      break;
    case "week":
      t = r(this.year(), this.month(), this.date() - this.weekday());
      break;
    case "isoWeek":
      t = r(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
      break;
    case "day":
    case "date":
      t = r(this.year(), this.month(), this.date());
      break;
    case "hour":
      (t = this._d.valueOf()),
        (t -= Ji(t + (this._isUTC ? 0 : this.utcOffset() * Zi), Co));
      break;
    case "minute":
      (t = this._d.valueOf()), (t -= Ji(t, Zi));
      break;
    case "second":
      (t = this._d.valueOf()), (t -= Ji(t, ko));
      break;
  }
  return this._d.setTime(t), ae.updateOffset(this, !0), this;
}
function wT(e) {
  var t, r;
  if (((e = Nn(e)), e === void 0 || e === "millisecond" || !this.isValid()))
    return this;
  switch (((r = this._isUTC ? gm : hm), e)) {
    case "year":
      t = r(this.year() + 1, 0, 1) - 1;
      break;
    case "quarter":
      t = r(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
      break;
    case "month":
      t = r(this.year(), this.month() + 1, 1) - 1;
      break;
    case "week":
      t = r(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
      break;
    case "isoWeek":
      t =
        r(
          this.year(),
          this.month(),
          this.date() - (this.isoWeekday() - 1) + 7
        ) - 1;
      break;
    case "day":
    case "date":
      t = r(this.year(), this.month(), this.date() + 1) - 1;
      break;
    case "hour":
      (t = this._d.valueOf()),
        (t += Co - Ji(t + (this._isUTC ? 0 : this.utcOffset() * Zi), Co) - 1);
      break;
    case "minute":
      (t = this._d.valueOf()), (t += Zi - Ji(t, Zi) - 1);
      break;
    case "second":
      (t = this._d.valueOf()), (t += ko - Ji(t, ko) - 1);
      break;
  }
  return this._d.setTime(t), ae.updateOffset(this, !0), this;
}
function ST() {
  return this._d.valueOf() - (this._offset || 0) * 6e4;
}
function kT() {
  return Math.floor(this.valueOf() / 1e3);
}
function CT() {
  return new Date(this.valueOf());
}
function TT() {
  var e = this;
  return [
    e.year(),
    e.month(),
    e.date(),
    e.hour(),
    e.minute(),
    e.second(),
    e.millisecond(),
  ];
}
function MT() {
  var e = this;
  return {
    years: e.year(),
    months: e.month(),
    date: e.date(),
    hours: e.hours(),
    minutes: e.minutes(),
    seconds: e.seconds(),
    milliseconds: e.milliseconds(),
  };
}
function DT() {
  return this.isValid() ? this.toISOString() : null;
}
function qT() {
  return uc(this);
}
function xT() {
  return Kr({}, Oe(this));
}
function PT() {
  return Oe(this).overflow;
}
function AT() {
  return {
    input: this._i,
    format: this._f,
    locale: this._locale,
    isUTC: this._isUTC,
    strict: this._strict,
  };
}
be("N", 0, 0, "eraAbbr");
be("NN", 0, 0, "eraAbbr");
be("NNN", 0, 0, "eraAbbr");
be("NNNN", 0, 0, "eraName");
be("NNNNN", 0, 0, "eraNarrow");
be("y", ["y", 1], "yo", "eraYear");
be("y", ["yy", 2], 0, "eraYear");
be("y", ["yyy", 3], 0, "eraYear");
be("y", ["yyyy", 4], 0, "eraYear");
ce("N", Tc);
ce("NN", Tc);
ce("NNN", Tc);
ce("NNNN", VT);
ce("NNNNN", zT);
ct(["N", "NN", "NNN", "NNNN", "NNNNN"], function (e, t, r, a) {
  var l = r._locale.erasParse(e, a, r._strict);
  l ? (Oe(r).era = l) : (Oe(r).invalidEra = e);
});
ce("y", oa);
ce("yy", oa);
ce("yyy", oa);
ce("yyyy", oa);
ce("yo", WT);
ct(["y", "yy", "yyy", "yyyy"], Xt);
ct(["yo"], function (e, t, r, a) {
  var l;
  r._locale._eraYearOrdinalRegex &&
    (l = e.match(r._locale._eraYearOrdinalRegex)),
    r._locale.eraYearOrdinalParse
      ? (t[Xt] = r._locale.eraYearOrdinalParse(e, l))
      : (t[Xt] = parseInt(e, 10));
});
function ET(e, t) {
  var r,
    a,
    l,
    s = this._eras || qr("en")._eras;
  for (r = 0, a = s.length; r < a; ++r) {
    switch (typeof s[r].since) {
      case "string":
        (l = ae(s[r].since).startOf("day")), (s[r].since = l.valueOf());
        break;
    }
    switch (typeof s[r].until) {
      case "undefined":
        s[r].until = 1 / 0;
        break;
      case "string":
        (l = ae(s[r].until).startOf("day").valueOf()),
          (s[r].until = l.valueOf());
        break;
    }
  }
  return s;
}
function IT(e, t, r) {
  var a,
    l,
    s = this.eras(),
    u,
    d,
    f;
  for (e = e.toUpperCase(), a = 0, l = s.length; a < l; ++a)
    if (
      ((u = s[a].name.toUpperCase()),
      (d = s[a].abbr.toUpperCase()),
      (f = s[a].narrow.toUpperCase()),
      r)
    )
      switch (t) {
        case "N":
        case "NN":
        case "NNN":
          if (d === e) return s[a];
          break;
        case "NNNN":
          if (u === e) return s[a];
          break;
        case "NNNNN":
          if (f === e) return s[a];
          break;
      }
    else if ([u, d, f].indexOf(e) >= 0) return s[a];
}
function $T(e, t) {
  var r = e.since <= e.until ? 1 : -1;
  return t === void 0
    ? ae(e.since).year()
    : ae(e.since).year() + (t - e.offset) * r;
}
function RT() {
  var e,
    t,
    r,
    a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (
      ((r = this.clone().startOf("day").valueOf()),
      (a[e].since <= r && r <= a[e].until) ||
        (a[e].until <= r && r <= a[e].since))
    )
      return a[e].name;
  return "";
}
function OT() {
  var e,
    t,
    r,
    a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (
      ((r = this.clone().startOf("day").valueOf()),
      (a[e].since <= r && r <= a[e].until) ||
        (a[e].until <= r && r <= a[e].since))
    )
      return a[e].narrow;
  return "";
}
function LT() {
  var e,
    t,
    r,
    a = this.localeData().eras();
  for (e = 0, t = a.length; e < t; ++e)
    if (
      ((r = this.clone().startOf("day").valueOf()),
      (a[e].since <= r && r <= a[e].until) ||
        (a[e].until <= r && r <= a[e].since))
    )
      return a[e].abbr;
  return "";
}
function NT() {
  var e,
    t,
    r,
    a,
    l = this.localeData().eras();
  for (e = 0, t = l.length; e < t; ++e)
    if (
      ((r = l[e].since <= l[e].until ? 1 : -1),
      (a = this.clone().startOf("day").valueOf()),
      (l[e].since <= a && a <= l[e].until) ||
        (l[e].until <= a && a <= l[e].since))
    )
      return (this.year() - ae(l[e].since).year()) * r + l[e].offset;
  return this.year();
}
function BT(e) {
  return (
    Xe(this, "_erasNameRegex") || Mc.call(this),
    e ? this._erasNameRegex : this._erasRegex
  );
}
function FT(e) {
  return (
    Xe(this, "_erasAbbrRegex") || Mc.call(this),
    e ? this._erasAbbrRegex : this._erasRegex
  );
}
function UT(e) {
  return (
    Xe(this, "_erasNarrowRegex") || Mc.call(this),
    e ? this._erasNarrowRegex : this._erasRegex
  );
}
function Tc(e, t) {
  return t.erasAbbrRegex(e);
}
function VT(e, t) {
  return t.erasNameRegex(e);
}
function zT(e, t) {
  return t.erasNarrowRegex(e);
}
function WT(e, t) {
  return t._eraYearOrdinalRegex || oa;
}
function Mc() {
  var e = [],
    t = [],
    r = [],
    a = [],
    l,
    s,
    u = this.eras();
  for (l = 0, s = u.length; l < s; ++l)
    t.push(kn(u[l].name)),
      e.push(kn(u[l].abbr)),
      r.push(kn(u[l].narrow)),
      a.push(kn(u[l].name)),
      a.push(kn(u[l].abbr)),
      a.push(kn(u[l].narrow));
  (this._erasRegex = new RegExp("^(" + a.join("|") + ")", "i")),
    (this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i")),
    (this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i")),
    (this._erasNarrowRegex = new RegExp("^(" + r.join("|") + ")", "i"));
}
be(0, ["gg", 2], 0, function () {
  return this.weekYear() % 100;
});
be(0, ["GG", 2], 0, function () {
  return this.isoWeekYear() % 100;
});
function Vo(e, t) {
  be(0, [e, e.length], 0, t);
}
Vo("gggg", "weekYear");
Vo("ggggg", "weekYear");
Vo("GGGG", "isoWeekYear");
Vo("GGGGG", "isoWeekYear");
en("weekYear", "gg");
en("isoWeekYear", "GG");
tn("weekYear", 1);
tn("isoWeekYear", 1);
ce("G", Lo);
ce("g", Lo);
ce("GG", yt, Dn);
ce("gg", yt, Dn);
ce("GGGG", mc, gc);
ce("gggg", mc, gc);
ce("GGGGG", Oo, $o);
ce("ggggg", Oo, $o);
Ja(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, r, a) {
  t[a.substr(0, 2)] = We(e);
});
Ja(["gg", "GG"], function (e, t, r, a) {
  t[a] = ae.parseTwoDigitYear(e);
});
function YT(e) {
  return mm.call(
    this,
    e,
    this.week(),
    this.weekday(),
    this.localeData()._week.dow,
    this.localeData()._week.doy
  );
}
function HT(e) {
  return mm.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
}
function GT() {
  return Mr(this.year(), 1, 4);
}
function KT() {
  return Mr(this.isoWeekYear(), 1, 4);
}
function QT() {
  var e = this.localeData()._week;
  return Mr(this.year(), e.dow, e.doy);
}
function jT() {
  var e = this.localeData()._week;
  return Mr(this.weekYear(), e.dow, e.doy);
}
function mm(e, t, r, a, l) {
  var s;
  return e == null
    ? Va(this, a, l).year
    : ((s = Mr(e, a, l)), t > s && (t = s), ZT.call(this, e, t, r, a, l));
}
function ZT(e, t, r, a, l) {
  var s = Kg(e, t, r, a, l),
    u = Ua(s.year, 0, s.dayOfYear);
  return (
    this.year(u.getUTCFullYear()),
    this.month(u.getUTCMonth()),
    this.date(u.getUTCDate()),
    this
  );
}
be("Q", 0, "Qo", "quarter");
en("quarter", "Q");
tn("quarter", 7);
ce("Q", Ng);
ct("Q", function (e, t) {
  t[Cr] = (We(e) - 1) * 3;
});
function JT(e) {
  return e == null
    ? Math.ceil((this.month() + 1) / 3)
    : this.month((e - 1) * 3 + (this.month() % 3));
}
be("D", ["DD", 2], "Do", "date");
en("date", "D");
tn("date", 9);
ce("D", yt);
ce("DD", yt, Dn);
ce("Do", function (e, t) {
  return e
    ? t._dayOfMonthOrdinalParse || t._ordinalParse
    : t._dayOfMonthOrdinalParseLenient;
});
ct(["D", "DD"], nr);
ct("Do", function (e, t) {
  t[nr] = We(e.match(yt)[0]);
});
var vm = la("Date", !0);
be("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
en("dayOfYear", "DDD");
tn("dayOfYear", 4);
ce("DDD", Ro);
ce("DDDD", Bg);
ct(["DDD", "DDDD"], function (e, t, r) {
  r._dayOfYear = We(e);
});
function XT(e) {
  var t =
    Math.round(
      (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
    ) + 1;
  return e == null ? t : this.add(e - t, "d");
}
be("m", ["mm", 2], 0, "minute");
en("minute", "m");
tn("minute", 14);
ce("m", yt);
ce("mm", yt, Dn);
ct(["m", "mm"], Gn);
var eM = la("Minutes", !1);
be("s", ["ss", 2], 0, "second");
en("second", "s");
tn("second", 15);
ce("s", yt);
ce("ss", yt, Dn);
ct(["s", "ss"], Tr);
var tM = la("Seconds", !1);
be("S", 0, 0, function () {
  return ~~(this.millisecond() / 100);
});
be(0, ["SS", 2], 0, function () {
  return ~~(this.millisecond() / 10);
});
be(0, ["SSS", 3], 0, "millisecond");
be(0, ["SSSS", 4], 0, function () {
  return this.millisecond() * 10;
});
be(0, ["SSSSS", 5], 0, function () {
  return this.millisecond() * 100;
});
be(0, ["SSSSSS", 6], 0, function () {
  return this.millisecond() * 1e3;
});
be(0, ["SSSSSSS", 7], 0, function () {
  return this.millisecond() * 1e4;
});
be(0, ["SSSSSSSS", 8], 0, function () {
  return this.millisecond() * 1e5;
});
be(0, ["SSSSSSSSS", 9], 0, function () {
  return this.millisecond() * 1e6;
});
en("millisecond", "ms");
tn("millisecond", 16);
ce("S", Ro, Ng);
ce("SS", Ro, Dn);
ce("SSS", Ro, Bg);
var Qr, pm;
for (Qr = "SSSS"; Qr.length <= 9; Qr += "S") ce(Qr, oa);
function nM(e, t) {
  t[mi] = We(("0." + e) * 1e3);
}
for (Qr = "S"; Qr.length <= 9; Qr += "S") ct(Qr, nM);
pm = la("Milliseconds", !1);
be("z", 0, 0, "zoneAbbr");
be("zz", 0, 0, "zoneName");
function rM() {
  return this._isUTC ? "UTC" : "";
}
function iM() {
  return this._isUTC ? "Coordinated Universal Time" : "";
}
var Q = ja.prototype;
Q.add = j2;
Q.calendar = rT;
Q.clone = iT;
Q.diff = dT;
Q.endOf = wT;
Q.format = mT;
Q.from = vT;
Q.fromNow = pT;
Q.to = yT;
Q.toNow = _T;
Q.get = lC;
Q.invalidAt = PT;
Q.isAfter = aT;
Q.isBefore = lT;
Q.isBetween = oT;
Q.isSame = sT;
Q.isSameOrAfter = uT;
Q.isSameOrBefore = cT;
Q.isValid = qT;
Q.lang = cm;
Q.locale = um;
Q.localeData = dm;
Q.max = q2;
Q.min = D2;
Q.parsingFlags = xT;
Q.set = oC;
Q.startOf = bT;
Q.subtract = Z2;
Q.toArray = TT;
Q.toObject = MT;
Q.toDate = CT;
Q.toISOString = hT;
Q.inspect = gT;
typeof Symbol != "undefined" &&
  Symbol.for != null &&
  (Q[Symbol.for("nodejs.util.inspect.custom")] = function () {
    return "Moment<" + this.format() + ">";
  });
Q.toJSON = DT;
Q.toString = fT;
Q.unix = kT;
Q.valueOf = ST;
Q.creationData = AT;
Q.eraName = RT;
Q.eraNarrow = OT;
Q.eraAbbr = LT;
Q.eraYear = NT;
Q.year = Gg;
Q.isLeapYear = MC;
Q.weekYear = YT;
Q.isoWeekYear = HT;
Q.quarter = Q.quarters = JT;
Q.month = Yg;
Q.daysInMonth = kC;
Q.week = Q.weeks = EC;
Q.isoWeek = Q.isoWeeks = IC;
Q.weeksInYear = QT;
Q.weeksInWeekYear = jT;
Q.isoWeeksInYear = GT;
Q.isoWeeksInISOWeekYear = KT;
Q.date = vm;
Q.day = Q.days = HC;
Q.weekday = GC;
Q.isoWeekday = KC;
Q.dayOfYear = XT;
Q.hour = Q.hours = t2;
Q.minute = Q.minutes = eM;
Q.second = Q.seconds = tM;
Q.millisecond = Q.milliseconds = pm;
Q.utcOffset = L2;
Q.utc = B2;
Q.local = F2;
Q.parseZone = U2;
Q.hasAlignedHourOffset = V2;
Q.isDST = z2;
Q.isLocal = Y2;
Q.isUtcOffset = H2;
Q.isUtc = am;
Q.isUTC = am;
Q.zoneAbbr = rM;
Q.zoneName = iM;
Q.dates = Ln("dates accessor is deprecated. Use date instead.", vm);
Q.months = Ln("months accessor is deprecated. Use month instead", Yg);
Q.years = Ln("years accessor is deprecated. Use year instead", Gg);
Q.zone = Ln(
  "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
  N2
);
Q.isDSTShifted = Ln(
  "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
  W2
);
function aM(e) {
  return pt(e * 1e3);
}
function lM() {
  return pt.apply(null, arguments).parseZone();
}
function ym(e) {
  return e;
}
var et = dc.prototype;
et.calendar = Hk;
et.longDateFormat = jk;
et.invalidDate = Jk;
et.ordinal = tC;
et.preparse = ym;
et.postformat = ym;
et.relativeTime = rC;
et.pastFuture = iC;
et.set = Wk;
et.eras = ET;
et.erasParse = IT;
et.erasConvertYear = $T;
et.erasAbbrRegex = FT;
et.erasNameRegex = BT;
et.erasNarrowRegex = UT;
et.months = _C;
et.monthsShort = bC;
et.monthsParse = SC;
et.monthsRegex = TC;
et.monthsShortRegex = CC;
et.week = qC;
et.firstDayOfYear = AC;
et.firstDayOfWeek = PC;
et.weekdays = UC;
et.weekdaysMin = zC;
et.weekdaysShort = VC;
et.weekdaysParse = YC;
et.weekdaysRegex = QC;
et.weekdaysShortRegex = jC;
et.weekdaysMinRegex = ZC;
et.isPM = XC;
et.meridiem = n2;
function To(e, t, r, a) {
  var l = qr(),
    s = or().set(a, t);
  return l[r](s, e);
}
function _m(e, t, r) {
  if ((Dr(e) && ((t = e), (e = void 0)), (e = e || ""), t != null))
    return To(e, t, r, "month");
  var a,
    l = [];
  for (a = 0; a < 12; a++) l[a] = To(e, a, r, "month");
  return l;
}
function Dc(e, t, r, a) {
  typeof e == "boolean"
    ? (Dr(t) && ((r = t), (t = void 0)), (t = t || ""))
    : ((t = e),
      (r = t),
      (e = !1),
      Dr(t) && ((r = t), (t = void 0)),
      (t = t || ""));
  var l = qr(),
    s = e ? l._week.dow : 0,
    u,
    d = [];
  if (r != null) return To(t, (r + s) % 7, a, "day");
  for (u = 0; u < 7; u++) d[u] = To(t, (u + s) % 7, a, "day");
  return d;
}
function oM(e, t) {
  return _m(e, t, "months");
}
function sM(e, t) {
  return _m(e, t, "monthsShort");
}
function uM(e, t, r) {
  return Dc(e, t, r, "weekdays");
}
function cM(e, t, r) {
  return Dc(e, t, r, "weekdaysShort");
}
function dM(e, t, r) {
  return Dc(e, t, r, "weekdaysMin");
}
Zr("en", {
  eras: [
    {
      since: "0001-01-01",
      until: 1 / 0,
      offset: 1,
      name: "Anno Domini",
      narrow: "AD",
      abbr: "AD",
    },
    {
      since: "0000-12-31",
      until: -1 / 0,
      offset: 1,
      name: "Before Christ",
      narrow: "BC",
      abbr: "BC",
    },
  ],
  dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
  ordinal: function (e) {
    var t = e % 10,
      r =
        We((e % 100) / 10) === 1
          ? "th"
          : t === 1
          ? "st"
          : t === 2
          ? "nd"
          : t === 3
          ? "rd"
          : "th";
    return e + r;
  },
});
ae.lang = Ln("moment.lang is deprecated. Use moment.locale instead.", Zr);
ae.langData = Ln(
  "moment.langData is deprecated. Use moment.localeData instead.",
  qr
);
var br = Math.abs;
function fM() {
  var e = this._data;
  return (
    (this._milliseconds = br(this._milliseconds)),
    (this._days = br(this._days)),
    (this._months = br(this._months)),
    (e.milliseconds = br(e.milliseconds)),
    (e.seconds = br(e.seconds)),
    (e.minutes = br(e.minutes)),
    (e.hours = br(e.hours)),
    (e.months = br(e.months)),
    (e.years = br(e.years)),
    this
  );
}
function bm(e, t, r, a) {
  var l = jn(t, r);
  return (
    (e._milliseconds += a * l._milliseconds),
    (e._days += a * l._days),
    (e._months += a * l._months),
    e._bubble()
  );
}
function hM(e, t) {
  return bm(this, e, t, 1);
}
function gM(e, t) {
  return bm(this, e, t, -1);
}
function xh(e) {
  return e < 0 ? Math.floor(e) : Math.ceil(e);
}
function mM() {
  var e = this._milliseconds,
    t = this._days,
    r = this._months,
    a = this._data,
    l,
    s,
    u,
    d,
    f;
  return (
    (e >= 0 && t >= 0 && r >= 0) ||
      (e <= 0 && t <= 0 && r <= 0) ||
      ((e += xh(Vu(r) + t) * 864e5), (t = 0), (r = 0)),
    (a.milliseconds = e % 1e3),
    (l = On(e / 1e3)),
    (a.seconds = l % 60),
    (s = On(l / 60)),
    (a.minutes = s % 60),
    (u = On(s / 60)),
    (a.hours = u % 24),
    (t += On(u / 24)),
    (f = On(wm(t))),
    (r += f),
    (t -= xh(Vu(f))),
    (d = On(r / 12)),
    (r %= 12),
    (a.days = t),
    (a.months = r),
    (a.years = d),
    this
  );
}
function wm(e) {
  return (e * 4800) / 146097;
}
function Vu(e) {
  return (e * 146097) / 4800;
}
function vM(e) {
  if (!this.isValid()) return NaN;
  var t,
    r,
    a = this._milliseconds;
  if (((e = Nn(e)), e === "month" || e === "quarter" || e === "year"))
    switch (((t = this._days + a / 864e5), (r = this._months + wm(t)), e)) {
      case "month":
        return r;
      case "quarter":
        return r / 3;
      case "year":
        return r / 12;
    }
  else
    switch (((t = this._days + Math.round(Vu(this._months))), e)) {
      case "week":
        return t / 7 + a / 6048e5;
      case "day":
        return t + a / 864e5;
      case "hour":
        return t * 24 + a / 36e5;
      case "minute":
        return t * 1440 + a / 6e4;
      case "second":
        return t * 86400 + a / 1e3;
      case "millisecond":
        return Math.floor(t * 864e5) + a;
      default:
        throw new Error("Unknown unit " + e);
    }
}
function pM() {
  return this.isValid()
    ? this._milliseconds +
        this._days * 864e5 +
        (this._months % 12) * 2592e6 +
        We(this._months / 12) * 31536e6
    : NaN;
}
function xr(e) {
  return function () {
    return this.as(e);
  };
}
var yM = xr("ms"),
  _M = xr("s"),
  bM = xr("m"),
  wM = xr("h"),
  SM = xr("d"),
  kM = xr("w"),
  CM = xr("M"),
  TM = xr("Q"),
  MM = xr("y");
function DM() {
  return jn(this);
}
function qM(e) {
  return (e = Nn(e)), this.isValid() ? this[e + "s"]() : NaN;
}
function bi(e) {
  return function () {
    return this.isValid() ? this._data[e] : NaN;
  };
}
var xM = bi("milliseconds"),
  PM = bi("seconds"),
  AM = bi("minutes"),
  EM = bi("hours"),
  IM = bi("days"),
  $M = bi("months"),
  RM = bi("years");
function OM() {
  return On(this.days() / 7);
}
var wr = Math.round,
  Gi = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
function LM(e, t, r, a, l) {
  return l.relativeTime(t || 1, !!r, e, a);
}
function NM(e, t, r, a) {
  var l = jn(e).abs(),
    s = wr(l.as("s")),
    u = wr(l.as("m")),
    d = wr(l.as("h")),
    f = wr(l.as("d")),
    g = wr(l.as("M")),
    v = wr(l.as("w")),
    T = wr(l.as("y")),
    M =
      (s <= r.ss && ["s", s]) ||
      (s < r.s && ["ss", s]) ||
      (u <= 1 && ["m"]) ||
      (u < r.m && ["mm", u]) ||
      (d <= 1 && ["h"]) ||
      (d < r.h && ["hh", d]) ||
      (f <= 1 && ["d"]) ||
      (f < r.d && ["dd", f]);
  return (
    r.w != null && (M = M || (v <= 1 && ["w"]) || (v < r.w && ["ww", v])),
    (M = M ||
      (g <= 1 && ["M"]) ||
      (g < r.M && ["MM", g]) ||
      (T <= 1 && ["y"]) || ["yy", T]),
    (M[2] = t),
    (M[3] = +e > 0),
    (M[4] = a),
    LM.apply(null, M)
  );
}
function BM(e) {
  return e === void 0 ? wr : typeof e == "function" ? ((wr = e), !0) : !1;
}
function FM(e, t) {
  return Gi[e] === void 0
    ? !1
    : t === void 0
    ? Gi[e]
    : ((Gi[e] = t), e === "s" && (Gi.ss = t - 1), !0);
}
function UM(e, t) {
  if (!this.isValid()) return this.localeData().invalidDate();
  var r = !1,
    a = Gi,
    l,
    s;
  return (
    typeof e == "object" && ((t = e), (e = !1)),
    typeof e == "boolean" && (r = e),
    typeof t == "object" &&
      ((a = Object.assign({}, Gi, t)),
      t.s != null && t.ss == null && (a.ss = t.s - 1)),
    (l = this.localeData()),
    (s = NM(this, !r, a, l)),
    r && (s = l.pastFuture(+this, s)),
    l.postformat(s)
  );
}
var Mu = Math.abs;
function Vi(e) {
  return (e > 0) - (e < 0) || +e;
}
function zo() {
  if (!this.isValid()) return this.localeData().invalidDate();
  var e = Mu(this._milliseconds) / 1e3,
    t = Mu(this._days),
    r = Mu(this._months),
    a,
    l,
    s,
    u,
    d = this.asSeconds(),
    f,
    g,
    v,
    T;
  return d
    ? ((a = On(e / 60)),
      (l = On(a / 60)),
      (e %= 60),
      (a %= 60),
      (s = On(r / 12)),
      (r %= 12),
      (u = e ? e.toFixed(3).replace(/\.?0+$/, "") : ""),
      (f = d < 0 ? "-" : ""),
      (g = Vi(this._months) !== Vi(d) ? "-" : ""),
      (v = Vi(this._days) !== Vi(d) ? "-" : ""),
      (T = Vi(this._milliseconds) !== Vi(d) ? "-" : ""),
      f +
        "P" +
        (s ? g + s + "Y" : "") +
        (r ? g + r + "M" : "") +
        (t ? v + t + "D" : "") +
        (l || a || e ? "T" : "") +
        (l ? T + l + "H" : "") +
        (a ? T + a + "M" : "") +
        (e ? T + u + "S" : ""))
    : "P0D";
}
var je = Uo.prototype;
je.isValid = I2;
je.abs = fM;
je.add = hM;
je.subtract = gM;
je.as = vM;
je.asMilliseconds = yM;
je.asSeconds = _M;
je.asMinutes = bM;
je.asHours = wM;
je.asDays = SM;
je.asWeeks = kM;
je.asMonths = CM;
je.asQuarters = TM;
je.asYears = MM;
je.valueOf = pM;
je._bubble = mM;
je.clone = DM;
je.get = qM;
je.milliseconds = xM;
je.seconds = PM;
je.minutes = AM;
je.hours = EM;
je.days = IM;
je.weeks = OM;
je.months = $M;
je.years = RM;
je.humanize = UM;
je.toISOString = zo;
je.toString = zo;
je.toJSON = zo;
je.locale = um;
je.localeData = dm;
je.toIsoString = Ln(
  "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
  zo
);
je.lang = cm;
be("X", 0, 0, "unix");
be("x", 0, 0, "valueOf");
ce("x", Lo);
ce("X", uC);
ct("X", function (e, t, r) {
  r._d = new Date(parseFloat(e) * 1e3);
});
ct("x", function (e, t, r) {
  r._d = new Date(We(e));
}); //! moment.js
ae.version = "2.29.4";
Vk(pt);
ae.fn = Q;
ae.min = x2;
ae.max = P2;
ae.now = A2;
ae.utc = or;
ae.unix = aM;
ae.months = oM;
ae.isDate = Qa;
ae.locale = Zr;
ae.invalid = Eo;
ae.duration = jn;
ae.isMoment = Qn;
ae.weekdays = uM;
ae.parseZone = lM;
ae.localeData = qr;
ae.isDuration = ao;
ae.monthsShort = sM;
ae.weekdaysMin = dM;
ae.defineLocale = _c;
ae.updateLocale = l2;
ae.locales = o2;
ae.weekdaysShort = cM;
ae.normalizeUnits = Nn;
ae.relativeTimeRounding = BM;
ae.relativeTimeThreshold = FM;
ae.calendarFormat = nT;
ae.prototype = Q;
ae.HTML5_FMT = {
  DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
  DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
  DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
  DATE: "YYYY-MM-DD",
  TIME: "HH:mm",
  TIME_SECONDS: "HH:mm:ss",
  TIME_MS: "HH:mm:ss.SSS",
  WEEK: "GGGG-[W]WW",
  MONTH: "YYYY-MM",
};
const VM = sn({
    name: "UserChat",
    props: ["account-pubkey", "peer-pubkeys", "profiles", "events"],
    components: { UserProfile: Ka },
    data: function () {
      return {
        selectedPubkey: null,
        selectedProfile: null,
        dmEvents: [],
        newMessage: null,
        rawMessage: null,
        showRawMessage: !1,
      };
    },
    watch: {
      events(e) {
        (this.dmEvents = ((e == null ? void 0 : e.events) || []).map((t) => {
          var l;
          const r = this.accountPubkey === t.pubkey,
            a = {
              isJson: !1,
              message: t.content,
              sent: r,
              avatar: r
                ? $q.config.staticPath + "/images/blank-avatar.webp"
                : ((l = this.selectedProfile) == null ? void 0 : l.picture) ||
                  $q.config.staticPath + "/images/blank-avatar.webp",
              dateFrom: ae(t.created_at * 1e3).fromNow(),
            };
          return (
            isNaN(t.content) &&
              isJson(t.content) &&
              ((a.isJson = !0), (a.message = JSON.parse(t.content))),
            a
          );
        })),
          setTimeout(() => {
            document.getElementById("bottom-user-chat").scrollIntoView();
          }, 0);
      },
    },
    methods: {
      pubkeySelected(e) {
        (this.selectedPubkey = e),
          (this.selectedProfile = this.profiles.find((t) => t.pubkey === e)),
          this.$emit("chat-selected", e),
          setTimeout(() => {
            document.getElementById("bottom-user-chat").scrollIntoView();
          }, 100);
      },
      async sendDirectMesage() {
        this.$emit("send-dm", {
          to: this.selectedPubkey,
          message: this.newMessage,
        }),
          (this.newMessage = null);
      },
      pubkeyAlias(e) {
        return Cg({
          dictionaries: [Tg, Mg, Dg],
          length: 2,
          separator: " ",
          style: "capital",
          seed: e,
        });
      },
      showMessageRawData: function (e) {
        var t;
        (this.rawMessage = JSON.stringify(
          (t = this.dmEvents[e]) == null ? void 0 : t.message,
          null,
          2
        )),
          (this.showRawMessage = !0);
      },
    },
    created: async function () {},
  }),
  zM = { style: { width: "100%" }, class: "q-pa-md row justify-center" },
  WM = { style: { width: "100%" } },
  YM = { key: 0 },
  HM = { key: 0 },
  GM = { key: 0 },
  KM = S("strong", null, "New order:", -1),
  QM = [KM],
  jM = { key: 1 },
  ZM = S("strong", null, "Reply sent for order: ", -1),
  JM = [ZM],
  XM = { key: 2 },
  eD = ["textContent"],
  tD = ["textContent", "onClick"],
  nD = { key: 1 },
  rD = ["textContent"],
  iD = S("div", { id: "bottom-user-chat" }, null, -1),
  aD = { class: "row q-mt-lg" };
function lD(e, t, r, a, l, s) {
  const u = Jr("user-profile");
  return (
    R(),
    re("div", null, [
      y(
        Jt,
        { bordered: "", class: "q-mb-md" },
        {
          default: b(() => [
            y(
              Ne,
              { horizontal: "" },
              {
                default: b(() => [
                  y(
                    Ne,
                    { class: "col-sm-2 col-md-4" },
                    {
                      default: b(() => [
                        (R(!0),
                        re(
                          Lt,
                          null,
                          Yt(
                            e.peerPubkeys,
                            (d) => (
                              R(),
                              oe(
                                zt,
                                {
                                  key: d,
                                  clickable: "",
                                  onClick: (f) => e.pubkeySelected(d),
                                  active: e.selectedPubkey === d,
                                  class: "cursor-pointer",
                                },
                                {
                                  default: b(() => [
                                    y(
                                      u,
                                      { pubkey: d, profiles: e.profiles },
                                      null,
                                      8,
                                      ["pubkey", "profiles"]
                                    ),
                                  ]),
                                  _: 2,
                                },
                                1032,
                                ["onClick", "active"]
                              )
                            )
                          ),
                          128
                        )),
                      ]),
                      _: 1,
                    }
                  ),
                  y(ut, { vertical: "" }),
                  y(
                    Ne,
                    { style: { width: "100%" } },
                    {
                      default: b(() => [
                        S("div", zM, [
                          S("div", WM, [
                            y(
                              Fk,
                              { style: { height: "500px" } },
                              {
                                default: b(() => [
                                  e.dmEvents
                                    ? (R(),
                                      re("div", YM, [
                                        (R(!0),
                                        re(
                                          Lt,
                                          null,
                                          Yt(e.dmEvents, (d, f) => {
                                            var g;
                                            return (
                                              R(),
                                              oe(
                                                Bk,
                                                {
                                                  key: f,
                                                  name: d.sent
                                                    ? "me"
                                                    : ((g =
                                                        e.selectedProfile) ==
                                                      null
                                                        ? void 0
                                                        : g.name) ||
                                                      e.pubkeyAlias(
                                                        e.selectedPubkey
                                                      ),
                                                  sent: d.sent,
                                                  avatar: d.avatar,
                                                  stamp: d.dateFrom,
                                                },
                                                {
                                                  default: b(() => [
                                                    d.isJson
                                                      ? (R(),
                                                        re("div", HM, [
                                                          d.message.type === 0
                                                            ? (R(),
                                                              re("div", GM, QM))
                                                            : d.message.type ===
                                                              1
                                                            ? (R(),
                                                              re("div", jM, JM))
                                                            : d.message.type ===
                                                              2
                                                            ? (R(),
                                                              re("div", XM, [
                                                                d.message.paid
                                                                  ? (R(),
                                                                    oe(
                                                                      Cn,
                                                                      {
                                                                        key: 0,
                                                                        color:
                                                                          "green",
                                                                      },
                                                                      {
                                                                        default:
                                                                          b(
                                                                            () => [
                                                                              Te(
                                                                                "Paid "
                                                                              ),
                                                                            ]
                                                                          ),
                                                                        _: 1,
                                                                      }
                                                                    ))
                                                                  : $e("", !0),
                                                                d.message
                                                                  .shipped
                                                                  ? (R(),
                                                                    oe(
                                                                      Cn,
                                                                      {
                                                                        key: 1,
                                                                        color:
                                                                          "green",
                                                                      },
                                                                      {
                                                                        default:
                                                                          b(
                                                                            () => [
                                                                              Te(
                                                                                "Shipped "
                                                                              ),
                                                                            ]
                                                                          ),
                                                                        _: 1,
                                                                      }
                                                                    ))
                                                                  : $e("", !0),
                                                              ]))
                                                            : $e("", !0),
                                                          S("div", null, [
                                                            S(
                                                              "span",
                                                              {
                                                                textContent: ge(
                                                                  d.message
                                                                    .message
                                                                ),
                                                              },
                                                              null,
                                                              8,
                                                              eD
                                                            ),
                                                            y(
                                                              Cn,
                                                              {
                                                                class: "gt-sm",
                                                                color: "orange",
                                                              },
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    S(
                                                                      "span",
                                                                      {
                                                                        textContent:
                                                                          ge(
                                                                            d
                                                                              .message
                                                                              .id
                                                                          ),
                                                                        onClick:
                                                                          (v) =>
                                                                            e.showOrderDetails(
                                                                              d
                                                                                .message
                                                                                .id
                                                                            ),
                                                                        class:
                                                                          "cursor-pointer",
                                                                      },
                                                                      null,
                                                                      8,
                                                                      tD
                                                                    ),
                                                                  ]
                                                                ),
                                                                _: 2,
                                                              },
                                                              1024
                                                            ),
                                                          ]),
                                                          y(
                                                            Cn,
                                                            {
                                                              onClick: (v) =>
                                                                e.showMessageRawData(
                                                                  f
                                                                ),
                                                              class:
                                                                "cursor-pointer",
                                                            },
                                                            {
                                                              default: b(() => [
                                                                Te("..."),
                                                              ]),
                                                              _: 2,
                                                            },
                                                            1032,
                                                            ["onClick"]
                                                          ),
                                                        ]))
                                                      : (R(),
                                                        re("div", nD, [
                                                          S(
                                                            "span",
                                                            {
                                                              textContent: ge(
                                                                d.message
                                                              ),
                                                            },
                                                            null,
                                                            8,
                                                            rD
                                                          ),
                                                        ])),
                                                  ]),
                                                  _: 2,
                                                },
                                                1032,
                                                [
                                                  "name",
                                                  "sent",
                                                  "avatar",
                                                  "stamp",
                                                ]
                                              )
                                            );
                                          }),
                                          128
                                        )),
                                      ]))
                                    : $e("", !0),
                                  iD,
                                ]),
                                _: 1,
                              }
                            ),
                          ]),
                        ]),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              }
            ),
            y(ut),
            y(
              Ne,
              { horizontal: "" },
              {
                default: b(() => [
                  y(Ne, { class: "col-sm-2 col-md-4" }),
                  y(
                    Ne,
                    { style: { width: "100%" } },
                    {
                      default: b(() => [
                        y(
                          Uk,
                          { onSubmit: e.sendDirectMesage, class: "auto-width" },
                          {
                            default: b(() => [
                              y(
                                It,
                                {
                                  class: "rounded-pill",
                                  style: { width: "100%" },
                                  rounded: "",
                                  outlined: "",
                                  clearable: "",
                                  modelValue: e.newMessage,
                                  "onUpdate:modelValue":
                                    t[0] || (t[0] = (d) => (e.newMessage = d)),
                                  modelModifiers: { trim: !0 },
                                  label: "Write a message",
                                },
                                {
                                  append: b(() => [
                                    y(
                                      Wt,
                                      {
                                        name: "send",
                                        class: "cursor-pointer",
                                        color: "secondary",
                                        onClick: e.sendDirectMesage,
                                      },
                                      null,
                                      8,
                                      ["onClick"]
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ["modelValue"]
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ["onSubmit"]
                        ),
                      ]),
                      _: 1,
                    }
                  ),
                ]),
                _: 1,
              }
            ),
          ]),
          _: 1,
        }
      ),
      y(
        co,
        {
          modelValue: e.showRawMessage,
          "onUpdate:modelValue": t[2] || (t[2] = (d) => (e.showRawMessage = d)),
          position: "top",
        },
        {
          default: b(() => [
            y(
              Jt,
              { class: "q-pa-lg q-pt-xl", style: { width: "500px" } },
              {
                default: b(() => [
                  y(
                    It,
                    {
                      filled: "",
                      dense: "",
                      type: "textarea",
                      rows: "20",
                      modelValue: e.rawMessage,
                      "onUpdate:modelValue":
                        t[1] || (t[1] = (d) => (e.rawMessage = d)),
                      modelModifiers: { trim: !0 },
                      label: "Raw Data",
                    },
                    null,
                    8,
                    ["modelValue"]
                  ),
                  S("div", aD, [
                    Hn(
                      (R(),
                      oe(
                        ye,
                        { flat: "", color: "grey", class: "q-ml-auto" },
                        { default: b(() => [Te("Close")]), _: 1 }
                      )),
                      [[Hi]]
                    ),
                  ]),
                ]),
                _: 1,
              }
            ),
          ]),
          _: 1,
        },
        8,
        ["modelValue"]
      ),
    ])
  );
}
var oD = Tn(VM, [["render", lD]]);
const sD = sn({
    name: "ShoppingCartList",
    props: ["carts", "profiles"],
    components: { UserProfile: Ka },
    data: function () {
      return {};
    },
    computed: {},
    methods: {
      formatCurrency: function (e, t) {
        return formatCurrency(e, t);
      },
      cartTotalFormatted(e) {
        var r;
        if (!((r = e.products) != null && r.length)) return "";
        const t = e.products.reduce((a, l) => l.price + a, 0);
        return formatCurrency(t, e.products[0].currency);
      },
      removeProduct: function (e, t) {
        this.$emit("remove-from-cart", { stallId: e, productId: t });
      },
      removeCart: function (e) {
        this.$emit("remove-cart", e);
      },
      quantityChanged: function (e) {
        this.$emit("add-to-cart", e);
      },
      proceedToCheckout: function (e) {
        this.$emit("checkout-cart", e);
      },
    },
    created() {},
  }),
  uD = S("strong", null, "No products in cart!", -1),
  cD = ["src"],
  dD = ["src"],
  fD = { class: "text-caption text-grey ellipsis-2-lines" },
  hD = { class: "q-ma-md" };
function gD(e, t, r, a, l, s) {
  var d;
  const u = Jr("user-profile");
  return (
    R(),
    re("div", null, [
      (d = e.carts) != null && d.length
        ? $e("", !0)
        : (R(),
          oe(
            Jt,
            { key: 0, bordered: "", class: "q-mb-md" },
            {
              default: b(() => [y(Ne, null, { default: b(() => [uD]), _: 1 })]),
              _: 1,
            }
          )),
      (R(!0),
      re(
        Lt,
        null,
        Yt(
          e.carts,
          (f) => (
            R(),
            re("div", { key: f.id }, [
              y(
                Jt,
                { bordered: "", class: "q-mb-md" },
                {
                  default: b(() => [
                    y(
                      zt,
                      null,
                      {
                        default: b(() => {
                          var g;
                          return [
                            y(
                              u,
                              {
                                pubkey: f.merchant,
                                profiles: e.profiles,
                                description:
                                  (g = f.products[0]) == null
                                    ? void 0
                                    : g.stallName,
                              },
                              null,
                              8,
                              ["pubkey", "profiles", "description"]
                            ),
                            y(
                              Ie,
                              { side: "" },
                              {
                                default: b(() => [
                                  S("div", null, [
                                    y(
                                      ye,
                                      {
                                        onClick: (v) => e.removeCart(f.id),
                                        flat: "",
                                        color: "pink",
                                      },
                                      {
                                        default: b(() => [Te(" Clear Cart ")]),
                                        _: 2,
                                      },
                                      1032,
                                      ["onClick"]
                                    ),
                                  ]),
                                ]),
                                _: 2,
                              },
                              1024
                            ),
                          ];
                        }),
                        _: 2,
                      },
                      1024
                    ),
                    y(ut),
                    y(
                      Ne,
                      { horizontal: "" },
                      {
                        default: b(() => [
                          y(
                            Ne,
                            { class: "col-12" },
                            {
                              default: b(() => [
                                y(
                                  kr,
                                  { class: "q-mt-md" },
                                  {
                                    default: b(() => [
                                      (R(!0),
                                      re(
                                        Lt,
                                        null,
                                        Yt(
                                          f.products,
                                          (g) => (
                                            R(),
                                            oe(
                                              zt,
                                              { key: g.id },
                                              {
                                                default: b(() => [
                                                  y(
                                                    Ie,
                                                    { avatar: "" },
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          jr,
                                                          null,
                                                          {
                                                            default: b(() => [
                                                              g.images[0] ||
                                                              g.image
                                                                ? (R(),
                                                                  re(
                                                                    "img",
                                                                    {
                                                                      key: 0,
                                                                      src:
                                                                        g
                                                                          .images[0] ||
                                                                        g.image,
                                                                    },
                                                                    null,
                                                                    8,
                                                                    cD
                                                                  ))
                                                                : (R(),
                                                                  re(
                                                                    "img",
                                                                    {
                                                                      key: 1,
                                                                      src:
                                                                        e.$q
                                                                          .config
                                                                          .staticPath +
                                                                        "/images/placeholder.png",
                                                                    },
                                                                    null,
                                                                    8,
                                                                    dD
                                                                  )),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  y(
                                                    Ie,
                                                    { class: "q-mt-sm" },
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          Ge,
                                                          null,
                                                          {
                                                            default: b(() => [
                                                              Te(ge(g.name), 1),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                        y(
                                                          Ge,
                                                          { class: "gt-sm" },
                                                          {
                                                            default: b(() => [
                                                              S("div", fD, [
                                                                S(
                                                                  "p",
                                                                  null,
                                                                  ge(
                                                                    g.description
                                                                  ),
                                                                  1
                                                                ),
                                                              ]),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  y(
                                                    Ie,
                                                    { class: "q-mt-sm gt-sm" },
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          Ge,
                                                          null,
                                                          {
                                                            default: b(() => [
                                                              S(
                                                                "strong",
                                                                null,
                                                                ge(
                                                                  e.formatCurrency(
                                                                    g.price,
                                                                    g.currency
                                                                  )
                                                                ),
                                                                1
                                                              ),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                        y(Ge),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  y(
                                                    Ie,
                                                    { class: "q-ma-sm" },
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          It,
                                                          {
                                                            modelValue:
                                                              g.orderedQuantity,
                                                            "onUpdate:modelValue":
                                                              (v) =>
                                                                (g.orderedQuantity =
                                                                  v),
                                                            modelModifiers: {
                                                              number: !0,
                                                            },
                                                            onChange: (v) =>
                                                              e.quantityChanged(
                                                                g
                                                              ),
                                                            type: "number",
                                                            rounded: "",
                                                            outlined: "",
                                                            min: "1",
                                                            max: g.quantity,
                                                          },
                                                          null,
                                                          8,
                                                          [
                                                            "modelValue",
                                                            "onUpdate:modelValue",
                                                            "onChange",
                                                            "max",
                                                          ]
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  y(
                                                    Ie,
                                                    null,
                                                    {
                                                      default: b(() => [
                                                        y(
                                                          Ge,
                                                          null,
                                                          {
                                                            default: b(() => [
                                                              S(
                                                                "strong",
                                                                null,
                                                                ge(
                                                                  e.formatCurrency(
                                                                    g.price *
                                                                      g.orderedQuantity,
                                                                    g.currency
                                                                  )
                                                                ),
                                                                1
                                                              ),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1024
                                                        ),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                  y(
                                                    Ie,
                                                    { side: "" },
                                                    {
                                                      default: b(() => [
                                                        S("div", null, [
                                                          y(
                                                            ye,
                                                            {
                                                              flat: "",
                                                              dense: "",
                                                              round: "",
                                                              icon: "delete",
                                                              onClick: (v) =>
                                                                e.removeProduct(
                                                                  g.stall_id,
                                                                  g.id
                                                                ),
                                                            },
                                                            null,
                                                            8,
                                                            ["onClick"]
                                                          ),
                                                        ]),
                                                      ]),
                                                      _: 2,
                                                    },
                                                    1024
                                                  ),
                                                ]),
                                                _: 2,
                                              },
                                              1024
                                            )
                                          )
                                        ),
                                        128
                                      )),
                                    ]),
                                    _: 2,
                                  },
                                  1024
                                ),
                              ]),
                              _: 2,
                            },
                            1024
                          ),
                        ]),
                        _: 2,
                      },
                      1024
                    ),
                    y(ut),
                    y(
                      yi,
                      { align: "right" },
                      {
                        default: b(() => [
                          Te(" Total: "),
                          S("strong", hD, ge(e.cartTotalFormatted(f)), 1),
                          y(
                            ye,
                            {
                              onClick: (g) => e.proceedToCheckout(f),
                              flat: "",
                              color: "primary",
                            },
                            {
                              default: b(() => [Te(" Proceed to Checkout ")]),
                              _: 2,
                            },
                            1032,
                            ["onClick"]
                          ),
                        ]),
                        _: 2,
                      },
                      1024
                    ),
                  ]),
                  _: 2,
                },
                1024
              ),
            ])
          )
        ),
        128
      )),
    ])
  );
}
var mD = Tn(sD, [["render", gD]]);
const vD = sn({
    name: "ShoppingCartCheckout",
    props: ["cart", "stall", "customer-pubkey", "profiles"],
    components: { UserProfile: Ka },
    data: function () {
      return {
        orderConfirmed: !1,
        paymentMethod: "ln",
        shippingZone: null,
        contactData: { email: null, npub: null, address: null, message: null },
        paymentOptions: [
          { label: "Lightning Network", value: "ln" },
          { label: "BTC Onchain", value: "btc" },
          { label: "Cashu", value: "cashu" },
        ],
      };
    },
    computed: {
      cartTotal() {
        var e;
        return (e = this.cart.products) != null && e.length
          ? this.cart.products.reduce((t, r) => r.price + t, 0)
          : 0;
      },
      cartTotalWithShipping() {
        return this.shippingZone
          ? this.cartTotal + this.shippingZone.cost
          : this.cartTotal;
      },
      shippingZoneLabel() {
        if (!this.shippingZone) return "Shipping Zone";
        let e =
          this.shippingZone.name || this.shippingZone.id || "Shipping Zone";
        return (e = e.substring(0, 10)), e.length < 10 ? e : e + "...";
      },
    },
    methods: {
      formatCurrency: function (e, t) {
        return formatCurrency(e, t);
      },
      selectShippingZone: function (e) {
        this.shippingZone = e;
      },
      confirmOrder: function () {
        if (!this.shippingZone) {
          this.$q.notify({
            timeout: 5e3,
            type: "warning",
            message: "Please select a shipping zone!",
          });
          return;
        }
        this.orderConfirmed = !0;
      },
      async placeOrder() {
        if (!this.shippingZone) {
          this.$q.notify({
            timeout: 5e3,
            type: "warning",
            message: "Please select a shipping zone!",
          });
          return;
        }
        if (!this.customerPubkey) {
          this.$emit("login-required");
          return;
        }
        const e = {
            address: this.contactData.address,
            message: this.contactData.message,
            contact: {
              nostr: this.contactData.npub,
              email: this.contactData.email,
            },
            items: Array.from(this.cart.products, (a) => ({
              product_id: a.id,
              quantity: a.orderedQuantity,
            })),
            shipping_id: this.shippingZone.id,
            type: 0,
          },
          t = Math.floor(Date.now() / 1e3);
        e.id = await hash(
          [this.customerPubkey, t, JSON.stringify(e)].join(":")
        );
        const r = {
          ...(await NostrTools.getBlankEvent()),
          kind: 4,
          created_at: t,
          tags: [["p", this.stall.pubkey]],
          pubkey: this.customerPubkey,
        };
        this.$emit("place-order", { event: r, order: e, cartId: this.cart.id });
      },
      goToShoppingCart: function () {
        this.$emit("change-page", "shopping-cart-list");
      },
      merchantProfile(e) {
        var t;
        return (t = this.profiles) == null
          ? void 0
          : t.find((r) => r.pubkey === e);
      },
    },
    created() {
      var e;
      ((e = this.stall.shipping) == null ? void 0 : e.length) === 1 &&
        (this.shippingZone = this.stall.shipping[0]);
    },
  }),
  pD = { class: "row q-mt-md q-ml-md q-pr-md" },
  yD = S(
    "div",
    { class: "col-xs-12 col-sm-12 col-md-2 q-mt-md" },
    [S("strong", null, "Message:")],
    -1
  ),
  _D = { class: "col-xs-12 col-sm-12 col-md-10" },
  bD = { class: "row q-mt-md q-ml-md q-pr-md" },
  wD = S(
    "div",
    { class: "col-xs-12 col-sm-12 col-md-2 q-mt-md" },
    [S("strong", null, "Address:")],
    -1
  ),
  SD = { class: "col-xs-12 col-sm-12 col-md-10" },
  kD = { class: "row q-mt-md q-ml-md q-pr-md" },
  CD = S(
    "div",
    { class: "col-xs-12 col-sm-12 col-md-2 q-mt-md" },
    [S("strong", null, "Email:")],
    -1
  ),
  TD = { class: "col-xs-12 col-sm-12 col-md-10" },
  MD = { class: "row q-mt-md q-ml-md q-pr-md" },
  DD = S(
    "div",
    { class: "col-xs-12 col-sm-12 col-md-2 q-mt-md" },
    [S("strong", null, "Npub:")],
    -1
  ),
  qD = { class: "col-xs-12 col-sm-12 col-md-10" },
  xD = { class: "row q-mt-md" },
  PD = S(
    "div",
    { class: "col-xs-12 col-sm-12 col-md-4" },
    [S("strong", null, "Subtotal:")],
    -1
  ),
  AD = { class: "col-xs-12 col-sm-12 col-md-4" },
  ED = S("div", { class: "col-xs-12 col-sm-12 col-md-4" }, null, -1),
  ID = { class: "row q-mt-md" },
  $D = S(
    "div",
    { class: "col-xs-12 col-sm-12 col-md-4" },
    [S("strong", null, "Shipping:")],
    -1
  ),
  RD = { class: "col-xs-12 col-sm-12 col-md-4" },
  OD = { key: 0 },
  LD = { class: "col-xs-12 col-sm-12 col-md-4" },
  ND = ["textContent"],
  BD = ["textContent"],
  FD = { class: "row q-mt-md" },
  UD = S(
    "div",
    { class: "col-xs-12 col-sm-12 col-md-4" },
    [S("strong", null, "Total:")],
    -1
  ),
  VD = { class: "col-xs-12 col-sm-12 col-md-4" },
  zD = S("div", { class: "col-xs-12 col-sm-12 col-md-4" }, null, -1),
  WD = { key: 0, class: "row q-mt-md" },
  YD = { class: "col" },
  HD = S("strong", null, "Payment Method", -1),
  GD = { key: 0 },
  KD = { key: 1 };
function QD(e, t, r, a, l, s) {
  const u = Jr("user-profile");
  return (
    R(),
    re("div", null, [
      e.cart && e.stall
        ? (R(),
          oe(
            Jt,
            { key: 0, bordered: "", class: "q-mb-md" },
            {
              default: b(() => [
                y(zt, null, {
                  default: b(() => {
                    var d;
                    return [
                      y(
                        u,
                        {
                          pubkey: e.cart.merchant,
                          profiles: e.profiles,
                          description:
                            (d = e.cart.products[0]) == null
                              ? void 0
                              : d.stallName,
                        },
                        null,
                        8,
                        ["pubkey", "profiles", "description"]
                      ),
                      y(Ie, { side: "" }),
                    ];
                  }),
                  _: 1,
                }),
                y(ut),
                e.orderConfirmed
                  ? (R(),
                    oe(
                      Ne,
                      { key: 0 },
                      {
                        default: b(() => [
                          S("div", pD, [
                            yD,
                            S("div", _D, [
                              y(
                                It,
                                {
                                  modelValue: e.contactData.message,
                                  "onUpdate:modelValue":
                                    t[0] ||
                                    (t[0] = (d) => (e.contactData.message = d)),
                                  modelModifiers: { trim: !0 },
                                  outlined: "",
                                  type: "textarea",
                                  rows: "3",
                                  label: "Message (optional)",
                                  hint: "Message merchant about additional order needs",
                                },
                                null,
                                8,
                                ["modelValue"]
                              ),
                            ]),
                          ]),
                          S("div", bD, [
                            wD,
                            S("div", SD, [
                              y(
                                It,
                                {
                                  modelValue: e.contactData.address,
                                  "onUpdate:modelValue":
                                    t[1] ||
                                    (t[1] = (d) => (e.contactData.address = d)),
                                  modelModifiers: { trim: !0 },
                                  outlined: "",
                                  type: "textarea",
                                  rows: "3",
                                  label: "Address (optional)",
                                  hint: "Must provide for physical shipping",
                                },
                                null,
                                8,
                                ["modelValue"]
                              ),
                            ]),
                          ]),
                          S("div", kD, [
                            CD,
                            S("div", TD, [
                              y(
                                It,
                                {
                                  modelValue: e.contactData.email,
                                  "onUpdate:modelValue":
                                    t[2] ||
                                    (t[2] = (d) => (e.contactData.email = d)),
                                  modelModifiers: { trim: !0 },
                                  type: "email",
                                  outlined: "",
                                  label: "Email (optional)",
                                  hint: "Merchant may not use email",
                                },
                                null,
                                8,
                                ["modelValue"]
                              ),
                            ]),
                          ]),
                          S("div", MD, [
                            DD,
                            S("div", qD, [
                              y(
                                It,
                                {
                                  modelValue: e.contactData.npub,
                                  "onUpdate:modelValue":
                                    t[3] ||
                                    (t[3] = (d) => (e.contactData.npub = d)),
                                  modelModifiers: { trim: !0 },
                                  outlined: "",
                                  label: "Alternative Npub (optional)",
                                  hint: "Use a different Npub to communicate with the merchant",
                                },
                                null,
                                8,
                                ["modelValue"]
                              ),
                            ]),
                          ]),
                        ]),
                        _: 1,
                      }
                    ))
                  : (R(),
                    oe(
                      Ne,
                      { key: 1, horizontal: "" },
                      {
                        default: b(() => [
                          y(
                            Ne,
                            { class: "col-7" },
                            {
                              default: b(() => [
                                S("div", xD, [
                                  PD,
                                  S("div", AD, [
                                    S(
                                      "strong",
                                      null,
                                      ge(
                                        e.formatCurrency(
                                          e.cartTotal,
                                          e.stall.currency
                                        )
                                      ),
                                      1
                                    ),
                                  ]),
                                  ED,
                                ]),
                                S("div", ID, [
                                  $D,
                                  S("div", RD, [
                                    e.shippingZone
                                      ? (R(),
                                        re(
                                          "strong",
                                          OD,
                                          ge(
                                            e.formatCurrency(
                                              e.shippingZone.cost,
                                              e.stall.currency
                                            )
                                          ),
                                          1
                                        ))
                                      : $e("", !0),
                                  ]),
                                  S("div", LD, [
                                    y(
                                      rg,
                                      {
                                        unelevated: "",
                                        color: "secondary",
                                        rounded: "",
                                        label: e.shippingZoneLabel,
                                      },
                                      {
                                        default: b(() => [
                                          (R(!0),
                                          re(
                                            Lt,
                                            null,
                                            Yt(e.stall.shipping, (d) =>
                                              Hn(
                                                (R(),
                                                oe(
                                                  zt,
                                                  {
                                                    onClick: (f) =>
                                                      e.selectShippingZone(d),
                                                    key: d.id,
                                                    clickable: "",
                                                  },
                                                  {
                                                    default: b(() => [
                                                      y(
                                                        Ie,
                                                        null,
                                                        {
                                                          default: b(() => [
                                                            y(
                                                              Ge,
                                                              null,
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    S(
                                                                      "span",
                                                                      {
                                                                        textContent:
                                                                          ge(
                                                                            d.name
                                                                          ),
                                                                      },
                                                                      null,
                                                                      8,
                                                                      ND
                                                                    ),
                                                                  ]
                                                                ),
                                                                _: 2,
                                                              },
                                                              1024
                                                            ),
                                                            y(
                                                              Ge,
                                                              { caption: "" },
                                                              {
                                                                default: b(
                                                                  () => {
                                                                    var f;
                                                                    return [
                                                                      S(
                                                                        "span",
                                                                        {
                                                                          textContent:
                                                                            ge(
                                                                              (f =
                                                                                d.countries) ==
                                                                                null
                                                                                ? void 0
                                                                                : f.join(
                                                                                    ", "
                                                                                  )
                                                                            ),
                                                                        },
                                                                        null,
                                                                        8,
                                                                        BD
                                                                      ),
                                                                    ];
                                                                  }
                                                                ),
                                                                _: 2,
                                                              },
                                                              1024
                                                            ),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1024
                                                      ),
                                                    ]),
                                                    _: 2,
                                                  },
                                                  1032,
                                                  ["onClick"]
                                                )),
                                                [[Hi]]
                                              )
                                            ),
                                            128
                                          )),
                                        ]),
                                        _: 1,
                                      },
                                      8,
                                      ["label"]
                                    ),
                                  ]),
                                ]),
                                y(ut, { class: "q-mt-sm" }),
                                S("div", FD, [
                                  UD,
                                  S("div", VD, [
                                    S(
                                      "strong",
                                      null,
                                      ge(
                                        e.formatCurrency(
                                          e.cartTotalWithShipping,
                                          e.stall.currency
                                        )
                                      ),
                                      1
                                    ),
                                  ]),
                                  zD,
                                ]),
                                e.shippingZone
                                  ? (R(),
                                    re("div", WD, [
                                      S("div", YD, [
                                        y(
                                          Cn,
                                          { color: "secondary" },
                                          {
                                            default: b(() => [
                                              Te(
                                                " Additional per product shipping costs might apply."
                                              ),
                                            ]),
                                            _: 1,
                                          }
                                        ),
                                      ]),
                                    ]))
                                  : $e("", !0),
                              ]),
                              _: 1,
                            }
                          ),
                          y(ut, { vertical: "" }),
                          y(Ne, null, {
                            default: b(() => [
                              HD,
                              y(
                                Xb,
                                {
                                  modelValue: e.paymentMethod,
                                  "onUpdate:modelValue":
                                    t[4] ||
                                    (t[4] = (d) => (e.paymentMethod = d)),
                                  options: e.paymentOptions,
                                  color: "green",
                                  disable: "",
                                },
                                null,
                                8,
                                ["modelValue", "options"]
                              ),
                            ]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      }
                    )),
                y(ut),
                y(
                  yi,
                  { align: "right" },
                  {
                    default: b(() => [
                      e.orderConfirmed
                        ? (R(),
                          re("div", GD, [
                            y(
                              ye,
                              {
                                onClick:
                                  t[5] ||
                                  (t[5] = (d) => (e.orderConfirmed = !1)),
                                flat: "",
                                color: "grey",
                              },
                              { default: b(() => [Te(" Back ")]), _: 1 }
                            ),
                            y(
                              ye,
                              {
                                onClick: t[6] || (t[6] = (d) => e.placeOrder()),
                                flat: "",
                                color: "primary",
                              },
                              { default: b(() => [Te(" Place Order ")]), _: 1 }
                            ),
                          ]))
                        : (R(),
                          re("div", KD, [
                            y(
                              ye,
                              {
                                onClick: e.goToShoppingCart,
                                flat: "",
                                color: "grey",
                              },
                              { default: b(() => [Te(" Back ")]), _: 1 },
                              8,
                              ["onClick"]
                            ),
                            y(
                              ye,
                              {
                                onClick: e.confirmOrder,
                                flat: "",
                                color: "primary",
                              },
                              { default: b(() => [Te(" Confirm ")]), _: 1 },
                              8,
                              ["onClick"]
                            ),
                          ])),
                    ]),
                    _: 1,
                  }
                ),
              ]),
              _: 1,
            }
          ))
        : $e("", !0),
    ])
  );
}
var jD = Tn(vD, [["render", QD]]);
const { passive: fi } = Xi;
var ZD = Je({
    name: "QInfiniteScroll",
    props: {
      offset: { type: Number, default: 500 },
      debounce: { type: [String, Number], default: 100 },
      scrollTarget: { default: void 0 },
      initialIndex: Number,
      disable: Boolean,
      reverse: Boolean,
    },
    emits: ["load"],
    setup(e, { slots: t, emit: r }) {
      const a = se(!1),
        l = se(!0),
        s = se(null),
        u = se(null);
      let d = e.initialIndex || 0,
        f,
        g;
      const v = I(
        () =>
          "q-infinite-scroll__loading" + (a.value === !0 ? "" : " invisible")
      );
      function T() {
        if (e.disable === !0 || a.value === !0 || l.value === !1) return;
        const z = jl(f),
          H = du(f),
          pe = th(f);
        e.reverse === !1
          ? Math.round(H + pe + e.offset) >= Math.round(z) && M()
          : Math.round(H) <= e.offset && M();
      }
      function M() {
        if (e.disable === !0 || a.value === !0 || l.value === !1) return;
        d++, (a.value = !0);
        const z = jl(f);
        r("load", d, (H) => {
          l.value === !0 &&
            ((a.value = !1),
            Sn(() => {
              if (e.reverse === !0) {
                const pe = jl(f),
                  _e = du(f),
                  Pe = pe - z;
                Ra(f, _e + Pe);
              }
              H === !0 ? $() : s.value && s.value.closest("body") && g();
            }));
        });
      }
      function _() {
        d = 0;
      }
      function P() {
        l.value === !1 && ((l.value = !0), f.addEventListener("scroll", g, fi)),
          T();
      }
      function $() {
        l.value === !0 &&
          ((l.value = !1),
          (a.value = !1),
          f.removeEventListener("scroll", g, fi),
          g !== void 0 && g.cancel !== void 0 && g.cancel());
      }
      function L() {
        if (
          (f && l.value === !0 && f.removeEventListener("scroll", g, fi),
          (f = Mo(s.value, e.scrollTarget)),
          l.value === !0)
        ) {
          if ((f.addEventListener("scroll", g, fi), e.reverse === !0)) {
            const z = jl(f),
              H = th(f);
            Ra(f, z - H);
          }
          T();
        }
      }
      function F(z) {
        d = z;
      }
      function W(z) {
        z = parseInt(z, 10);
        const H = g;
        (g = z <= 0 ? T : ju(T, isNaN(z) === !0 ? 100 : z)),
          f &&
            l.value === !0 &&
            (H !== void 0 && f.removeEventListener("scroll", H, fi),
            f.addEventListener("scroll", g, fi));
      }
      function D(z) {
        if (A.value === !0) {
          if (u.value === null) {
            z !== !0 &&
              Sn(() => {
                D(!0);
              });
            return;
          }
          const H = `${a.value === !0 ? "un" : ""}pauseAnimations`;
          Array.from(u.value.getElementsByTagName("svg")).forEach((pe) => {
            pe[H]();
          });
        }
      }
      const A = I(() => e.disable !== !0 && l.value === !0);
      ze([a, A], () => {
        D();
      }),
        ze(
          () => e.disable,
          (z) => {
            z === !0 ? $() : P();
          }
        ),
        ze(
          () => e.reverse,
          () => {
            a.value === !1 && l.value === !0 && T();
          }
        ),
        ze(() => e.scrollTarget, L),
        ze(() => e.debounce, W);
      let N = !1;
      aa(() => {
        N !== !1 && f && Ra(f, N);
      }),
        ia(() => {
          N = f ? du(f) : !1;
        }),
        Ht(() => {
          l.value === !0 && f.removeEventListener("scroll", g, fi);
        }),
        Xr(() => {
          W(e.debounce), L(), a.value === !1 && D();
        });
      const J = Dt();
      return (
        Object.assign(J.proxy, {
          poll: () => {
            g !== void 0 && g();
          },
          trigger: M,
          stop: $,
          reset: _,
          resume: P,
          setIndex: F,
        }),
        () => {
          const z = Rh(t.default, []);
          return (
            A.value === !0 &&
              z[e.reverse === !1 ? "push" : "unshift"](
                E("div", { ref: u, class: v.value }, Mt(t.loading))
              ),
            E("div", { class: "q-infinite-scroll", ref: s }, z)
          );
        }
      );
    },
  }),
  zu = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ (function (e, t) {
  (function () {
    var r,
      a = "4.17.21",
      l = 200,
      s = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.",
      u = "Expected a function",
      d = "Invalid `variable` option passed into `_.template`",
      f = "__lodash_hash_undefined__",
      g = 500,
      v = "__lodash_placeholder__",
      T = 1,
      M = 2,
      _ = 4,
      P = 1,
      $ = 2,
      L = 1,
      F = 2,
      W = 4,
      D = 8,
      A = 16,
      N = 32,
      J = 64,
      z = 128,
      H = 256,
      pe = 512,
      _e = 30,
      Pe = "...",
      lt = 800,
      te = 16,
      xe = 1,
      Be = 2,
      j = 3,
      K = 1 / 0,
      me = 9007199254740991,
      rt = 17976931348623157e292,
      X = 0 / 0,
      Z = 4294967295,
      he = Z - 1,
      fe = Z >>> 1,
      Ke = [
        ["ary", z],
        ["bind", L],
        ["bindKey", F],
        ["curry", D],
        ["curryRight", A],
        ["flip", pe],
        ["partial", N],
        ["partialRight", J],
        ["rearg", H],
      ],
      Ve = "[object Arguments]",
      we = "[object Array]",
      Me = "[object AsyncFunction]",
      ft = "[object Boolean]",
      ee = "[object Date]",
      wt = "[object DOMException]",
      nn = "[object Error]",
      un = "[object Function]",
      rn = "[object GeneratorFunction]",
      qt = "[object Map]",
      Gt = "[object Number]",
      Zn = "[object Null]",
      Kt = "[object Object]",
      Bn = "[object Promise]",
      Pr = "[object Proxy]",
      St = "[object RegExp]",
      G = "[object Set]",
      de = "[object String]",
      qe = "[object Symbol]",
      gt = "[object Undefined]",
      it = "[object WeakMap]",
      Ze = "[object WeakSet]",
      Fe = "[object ArrayBuffer]",
      mt = "[object DataView]",
      xt = "[object Float32Array]",
      cn = "[object Float64Array]",
      Jn = "[object Int8Array]",
      ti = "[object Int16Array]",
      Fn = "[object Int32Array]",
      Qt = "[object Uint8Array]",
      wi = "[object Uint8ClampedArray]",
      Si = "[object Uint16Array]",
      ki = "[object Uint32Array]",
      Xa = /\b__p \+= '';/g,
      el = /\b(__p \+=) '' \+/g,
      tl = /(__e\(.*?\)|\b__t\)) \+\n'';/g,
      nl = /&(?:amp|lt|gt|quot|#39);/g,
      rl = /[&<>"']/g,
      il = RegExp(nl.source),
      Wo = RegExp(rl.source),
      al = /<%-([\s\S]+?)%>/g,
      Ci = /<%([\s\S]+?)%>/g,
      Ar = /<%=([\s\S]+?)%>/g,
      Er = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      Yo = /^\w*$/,
      Ho =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      sa = /[\\^$.*+?()[\]{}|]/g,
      Go = RegExp(sa.source),
      ua = /^\s+/,
      Ko = /\s/,
      Qo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
      jo = /\{\n\/\* \[wrapped with (.+)\] \*/,
      Zo = /,? & /,
      Ir = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,
      $r = /[()=,{}\[\]\/\s]/,
      ur = /\\(\\)?/g,
      Rr = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      Ti = /\w*$/,
      Jo = /^[-+]0x[0-9a-f]+$/i,
      ll = /^0b[01]+$/i,
      ol = /^\[object .+?Constructor\]$/,
      sl = /^0o[0-7]+$/i,
      ul = /^(?:0|[1-9]\d*)$/,
      C = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
      le = /($^)/,
      ie = /['\n\r\u2028\u2029\\]/g,
      De = "\\ud800-\\udfff",
      st = "\\u0300-\\u036f",
      tt = "\\ufe20-\\ufe2f",
      kt = "\\u20d0-\\u20ff",
      Nt = st + tt + kt,
      Mi = "\\u2700-\\u27bf",
      qc = "a-z\\xdf-\\xf6\\xf8-\\xff",
      km = "\\xac\\xb1\\xd7\\xf7",
      Cm = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
      Tm = "\\u2000-\\u206f",
      Mm =
        " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
      xc = "A-Z\\xc0-\\xd6\\xd8-\\xde",
      Pc = "\\ufe0e\\ufe0f",
      Ac = km + Cm + Tm + Mm,
      Xo = "['\u2019]",
      Dm = "[" + De + "]",
      Ec = "[" + Ac + "]",
      cl = "[" + Nt + "]",
      Ic = "\\d+",
      qm = "[" + Mi + "]",
      $c = "[" + qc + "]",
      Rc = "[^" + De + Ac + Ic + Mi + qc + xc + "]",
      es = "\\ud83c[\\udffb-\\udfff]",
      xm = "(?:" + cl + "|" + es + ")",
      Oc = "[^" + De + "]",
      ts = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      ns = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      Di = "[" + xc + "]",
      Lc = "\\u200d",
      Nc = "(?:" + $c + "|" + Rc + ")",
      Pm = "(?:" + Di + "|" + Rc + ")",
      Bc = "(?:" + Xo + "(?:d|ll|m|re|s|t|ve))?",
      Fc = "(?:" + Xo + "(?:D|LL|M|RE|S|T|VE))?",
      Uc = xm + "?",
      Vc = "[" + Pc + "]?",
      Am = "(?:" + Lc + "(?:" + [Oc, ts, ns].join("|") + ")" + Vc + Uc + ")*",
      Em = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
      Im = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
      zc = Vc + Uc + Am,
      $m = "(?:" + [qm, ts, ns].join("|") + ")" + zc,
      Rm = "(?:" + [Oc + cl + "?", cl, ts, ns, Dm].join("|") + ")",
      Om = RegExp(Xo, "g"),
      Lm = RegExp(cl, "g"),
      rs = RegExp(es + "(?=" + es + ")|" + Rm + zc, "g"),
      Nm = RegExp(
        [
          Di + "?" + $c + "+" + Bc + "(?=" + [Ec, Di, "$"].join("|") + ")",
          Pm + "+" + Fc + "(?=" + [Ec, Di + Nc, "$"].join("|") + ")",
          Di + "?" + Nc + "+" + Bc,
          Di + "+" + Fc,
          Im,
          Em,
          Ic,
          $m,
        ].join("|"),
        "g"
      ),
      Bm = RegExp("[" + Lc + De + Nt + Pc + "]"),
      Fm = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,
      Um = [
        "Array",
        "Buffer",
        "DataView",
        "Date",
        "Error",
        "Float32Array",
        "Float64Array",
        "Function",
        "Int8Array",
        "Int16Array",
        "Int32Array",
        "Map",
        "Math",
        "Object",
        "Promise",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "TypeError",
        "Uint8Array",
        "Uint8ClampedArray",
        "Uint16Array",
        "Uint32Array",
        "WeakMap",
        "_",
        "clearTimeout",
        "isFinite",
        "parseInt",
        "setTimeout",
      ],
      Vm = -1,
      vt = {};
    (vt[xt] =
      vt[cn] =
      vt[Jn] =
      vt[ti] =
      vt[Fn] =
      vt[Qt] =
      vt[wi] =
      vt[Si] =
      vt[ki] =
        !0),
      (vt[Ve] =
        vt[we] =
        vt[Fe] =
        vt[ft] =
        vt[mt] =
        vt[ee] =
        vt[nn] =
        vt[un] =
        vt[qt] =
        vt[Gt] =
        vt[Kt] =
        vt[St] =
        vt[G] =
        vt[de] =
        vt[it] =
          !1);
    var ht = {};
    (ht[Ve] =
      ht[we] =
      ht[Fe] =
      ht[mt] =
      ht[ft] =
      ht[ee] =
      ht[xt] =
      ht[cn] =
      ht[Jn] =
      ht[ti] =
      ht[Fn] =
      ht[qt] =
      ht[Gt] =
      ht[Kt] =
      ht[St] =
      ht[G] =
      ht[de] =
      ht[qe] =
      ht[Qt] =
      ht[wi] =
      ht[Si] =
      ht[ki] =
        !0),
      (ht[nn] = ht[un] = ht[it] = !1);
    var zm = {
        À: "A",
        Á: "A",
        Â: "A",
        Ã: "A",
        Ä: "A",
        Å: "A",
        à: "a",
        á: "a",
        â: "a",
        ã: "a",
        ä: "a",
        å: "a",
        Ç: "C",
        ç: "c",
        Ð: "D",
        ð: "d",
        È: "E",
        É: "E",
        Ê: "E",
        Ë: "E",
        è: "e",
        é: "e",
        ê: "e",
        ë: "e",
        Ì: "I",
        Í: "I",
        Î: "I",
        Ï: "I",
        ì: "i",
        í: "i",
        î: "i",
        ï: "i",
        Ñ: "N",
        ñ: "n",
        Ò: "O",
        Ó: "O",
        Ô: "O",
        Õ: "O",
        Ö: "O",
        Ø: "O",
        ò: "o",
        ó: "o",
        ô: "o",
        õ: "o",
        ö: "o",
        ø: "o",
        Ù: "U",
        Ú: "U",
        Û: "U",
        Ü: "U",
        ù: "u",
        ú: "u",
        û: "u",
        ü: "u",
        Ý: "Y",
        ý: "y",
        ÿ: "y",
        Æ: "Ae",
        æ: "ae",
        Þ: "Th",
        þ: "th",
        ß: "ss",
        Ā: "A",
        Ă: "A",
        Ą: "A",
        ā: "a",
        ă: "a",
        ą: "a",
        Ć: "C",
        Ĉ: "C",
        Ċ: "C",
        Č: "C",
        ć: "c",
        ĉ: "c",
        ċ: "c",
        č: "c",
        Ď: "D",
        Đ: "D",
        ď: "d",
        đ: "d",
        Ē: "E",
        Ĕ: "E",
        Ė: "E",
        Ę: "E",
        Ě: "E",
        ē: "e",
        ĕ: "e",
        ė: "e",
        ę: "e",
        ě: "e",
        Ĝ: "G",
        Ğ: "G",
        Ġ: "G",
        Ģ: "G",
        ĝ: "g",
        ğ: "g",
        ġ: "g",
        ģ: "g",
        Ĥ: "H",
        Ħ: "H",
        ĥ: "h",
        ħ: "h",
        Ĩ: "I",
        Ī: "I",
        Ĭ: "I",
        Į: "I",
        İ: "I",
        ĩ: "i",
        ī: "i",
        ĭ: "i",
        į: "i",
        ı: "i",
        Ĵ: "J",
        ĵ: "j",
        Ķ: "K",
        ķ: "k",
        ĸ: "k",
        Ĺ: "L",
        Ļ: "L",
        Ľ: "L",
        Ŀ: "L",
        Ł: "L",
        ĺ: "l",
        ļ: "l",
        ľ: "l",
        ŀ: "l",
        ł: "l",
        Ń: "N",
        Ņ: "N",
        Ň: "N",
        Ŋ: "N",
        ń: "n",
        ņ: "n",
        ň: "n",
        ŋ: "n",
        Ō: "O",
        Ŏ: "O",
        Ő: "O",
        ō: "o",
        ŏ: "o",
        ő: "o",
        Ŕ: "R",
        Ŗ: "R",
        Ř: "R",
        ŕ: "r",
        ŗ: "r",
        ř: "r",
        Ś: "S",
        Ŝ: "S",
        Ş: "S",
        Š: "S",
        ś: "s",
        ŝ: "s",
        ş: "s",
        š: "s",
        Ţ: "T",
        Ť: "T",
        Ŧ: "T",
        ţ: "t",
        ť: "t",
        ŧ: "t",
        Ũ: "U",
        Ū: "U",
        Ŭ: "U",
        Ů: "U",
        Ű: "U",
        Ų: "U",
        ũ: "u",
        ū: "u",
        ŭ: "u",
        ů: "u",
        ű: "u",
        ų: "u",
        Ŵ: "W",
        ŵ: "w",
        Ŷ: "Y",
        ŷ: "y",
        Ÿ: "Y",
        Ź: "Z",
        Ż: "Z",
        Ž: "Z",
        ź: "z",
        ż: "z",
        ž: "z",
        Ĳ: "IJ",
        ĳ: "ij",
        Œ: "Oe",
        œ: "oe",
        ŉ: "'n",
        ſ: "s",
      },
      Wm = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      },
      Ym = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
      },
      Hm = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\u2028": "u2028",
        "\u2029": "u2029",
      },
      Gm = parseFloat,
      Km = parseInt,
      Wc = typeof Ma == "object" && Ma && Ma.Object === Object && Ma,
      Qm = typeof self == "object" && self && self.Object === Object && self,
      Ut = Wc || Qm || Function("return this")(),
      is = t && !t.nodeType && t,
      ni = is && !0 && e && !e.nodeType && e,
      Yc = ni && ni.exports === is,
      as = Yc && Wc.process,
      qn = (function () {
        try {
          var q = ni && ni.require && ni.require("util").types;
          return q || (as && as.binding && as.binding("util"));
        } catch {}
      })(),
      Hc = qn && qn.isArrayBuffer,
      Gc = qn && qn.isDate,
      Kc = qn && qn.isMap,
      Qc = qn && qn.isRegExp,
      jc = qn && qn.isSet,
      Zc = qn && qn.isTypedArray;
    function vn(q, B, O) {
      switch (O.length) {
        case 0:
          return q.call(B);
        case 1:
          return q.call(B, O[0]);
        case 2:
          return q.call(B, O[0], O[1]);
        case 3:
          return q.call(B, O[0], O[1], O[2]);
      }
      return q.apply(B, O);
    }
    function jm(q, B, O, ue) {
      for (var Ae = -1, nt = q == null ? 0 : q.length; ++Ae < nt; ) {
        var $t = q[Ae];
        B(ue, $t, O($t), q);
      }
      return ue;
    }
    function xn(q, B) {
      for (
        var O = -1, ue = q == null ? 0 : q.length;
        ++O < ue && B(q[O], O, q) !== !1;

      );
      return q;
    }
    function Zm(q, B) {
      for (var O = q == null ? 0 : q.length; O-- && B(q[O], O, q) !== !1; );
      return q;
    }
    function Jc(q, B) {
      for (var O = -1, ue = q == null ? 0 : q.length; ++O < ue; )
        if (!B(q[O], O, q)) return !1;
      return !0;
    }
    function Or(q, B) {
      for (
        var O = -1, ue = q == null ? 0 : q.length, Ae = 0, nt = [];
        ++O < ue;

      ) {
        var $t = q[O];
        B($t, O, q) && (nt[Ae++] = $t);
      }
      return nt;
    }
    function dl(q, B) {
      var O = q == null ? 0 : q.length;
      return !!O && qi(q, B, 0) > -1;
    }
    function ls(q, B, O) {
      for (var ue = -1, Ae = q == null ? 0 : q.length; ++ue < Ae; )
        if (O(B, q[ue])) return !0;
      return !1;
    }
    function _t(q, B) {
      for (
        var O = -1, ue = q == null ? 0 : q.length, Ae = Array(ue);
        ++O < ue;

      )
        Ae[O] = B(q[O], O, q);
      return Ae;
    }
    function Lr(q, B) {
      for (var O = -1, ue = B.length, Ae = q.length; ++O < ue; )
        q[Ae + O] = B[O];
      return q;
    }
    function os(q, B, O, ue) {
      var Ae = -1,
        nt = q == null ? 0 : q.length;
      for (ue && nt && (O = q[++Ae]); ++Ae < nt; ) O = B(O, q[Ae], Ae, q);
      return O;
    }
    function Jm(q, B, O, ue) {
      var Ae = q == null ? 0 : q.length;
      for (ue && Ae && (O = q[--Ae]); Ae--; ) O = B(O, q[Ae], Ae, q);
      return O;
    }
    function ss(q, B) {
      for (var O = -1, ue = q == null ? 0 : q.length; ++O < ue; )
        if (B(q[O], O, q)) return !0;
      return !1;
    }
    var Xm = us("length");
    function ev(q) {
      return q.split("");
    }
    function tv(q) {
      return q.match(Ir) || [];
    }
    function Xc(q, B, O) {
      var ue;
      return (
        O(q, function (Ae, nt, $t) {
          if (B(Ae, nt, $t)) return (ue = nt), !1;
        }),
        ue
      );
    }
    function fl(q, B, O, ue) {
      for (var Ae = q.length, nt = O + (ue ? 1 : -1); ue ? nt-- : ++nt < Ae; )
        if (B(q[nt], nt, q)) return nt;
      return -1;
    }
    function qi(q, B, O) {
      return B === B ? hv(q, B, O) : fl(q, ed, O);
    }
    function nv(q, B, O, ue) {
      for (var Ae = O - 1, nt = q.length; ++Ae < nt; )
        if (ue(q[Ae], B)) return Ae;
      return -1;
    }
    function ed(q) {
      return q !== q;
    }
    function td(q, B) {
      var O = q == null ? 0 : q.length;
      return O ? ds(q, B) / O : X;
    }
    function us(q) {
      return function (B) {
        return B == null ? r : B[q];
      };
    }
    function cs(q) {
      return function (B) {
        return q == null ? r : q[B];
      };
    }
    function nd(q, B, O, ue, Ae) {
      return (
        Ae(q, function (nt, $t, dt) {
          O = ue ? ((ue = !1), nt) : B(O, nt, $t, dt);
        }),
        O
      );
    }
    function rv(q, B) {
      var O = q.length;
      for (q.sort(B); O--; ) q[O] = q[O].value;
      return q;
    }
    function ds(q, B) {
      for (var O, ue = -1, Ae = q.length; ++ue < Ae; ) {
        var nt = B(q[ue]);
        nt !== r && (O = O === r ? nt : O + nt);
      }
      return O;
    }
    function fs(q, B) {
      for (var O = -1, ue = Array(q); ++O < q; ) ue[O] = B(O);
      return ue;
    }
    function iv(q, B) {
      return _t(B, function (O) {
        return [O, q[O]];
      });
    }
    function rd(q) {
      return q && q.slice(0, od(q) + 1).replace(ua, "");
    }
    function pn(q) {
      return function (B) {
        return q(B);
      };
    }
    function hs(q, B) {
      return _t(B, function (O) {
        return q[O];
      });
    }
    function ca(q, B) {
      return q.has(B);
    }
    function id(q, B) {
      for (var O = -1, ue = q.length; ++O < ue && qi(B, q[O], 0) > -1; );
      return O;
    }
    function ad(q, B) {
      for (var O = q.length; O-- && qi(B, q[O], 0) > -1; );
      return O;
    }
    function av(q, B) {
      for (var O = q.length, ue = 0; O--; ) q[O] === B && ++ue;
      return ue;
    }
    var lv = cs(zm),
      ov = cs(Wm);
    function sv(q) {
      return "\\" + Hm[q];
    }
    function uv(q, B) {
      return q == null ? r : q[B];
    }
    function xi(q) {
      return Bm.test(q);
    }
    function cv(q) {
      return Fm.test(q);
    }
    function dv(q) {
      for (var B, O = []; !(B = q.next()).done; ) O.push(B.value);
      return O;
    }
    function gs(q) {
      var B = -1,
        O = Array(q.size);
      return (
        q.forEach(function (ue, Ae) {
          O[++B] = [Ae, ue];
        }),
        O
      );
    }
    function ld(q, B) {
      return function (O) {
        return q(B(O));
      };
    }
    function Nr(q, B) {
      for (var O = -1, ue = q.length, Ae = 0, nt = []; ++O < ue; ) {
        var $t = q[O];
        ($t === B || $t === v) && ((q[O] = v), (nt[Ae++] = O));
      }
      return nt;
    }
    function hl(q) {
      var B = -1,
        O = Array(q.size);
      return (
        q.forEach(function (ue) {
          O[++B] = ue;
        }),
        O
      );
    }
    function fv(q) {
      var B = -1,
        O = Array(q.size);
      return (
        q.forEach(function (ue) {
          O[++B] = [ue, ue];
        }),
        O
      );
    }
    function hv(q, B, O) {
      for (var ue = O - 1, Ae = q.length; ++ue < Ae; )
        if (q[ue] === B) return ue;
      return -1;
    }
    function gv(q, B, O) {
      for (var ue = O + 1; ue--; ) if (q[ue] === B) return ue;
      return ue;
    }
    function Pi(q) {
      return xi(q) ? vv(q) : Xm(q);
    }
    function Un(q) {
      return xi(q) ? pv(q) : ev(q);
    }
    function od(q) {
      for (var B = q.length; B-- && Ko.test(q.charAt(B)); );
      return B;
    }
    var mv = cs(Ym);
    function vv(q) {
      for (var B = (rs.lastIndex = 0); rs.test(q); ) ++B;
      return B;
    }
    function pv(q) {
      return q.match(rs) || [];
    }
    function yv(q) {
      return q.match(Nm) || [];
    }
    var _v = function q(B) {
        B = B == null ? Ut : Ai.defaults(Ut.Object(), B, Ai.pick(Ut, Um));
        var O = B.Array,
          ue = B.Date,
          Ae = B.Error,
          nt = B.Function,
          $t = B.Math,
          dt = B.Object,
          ms = B.RegExp,
          bv = B.String,
          Pn = B.TypeError,
          gl = O.prototype,
          wv = nt.prototype,
          Ei = dt.prototype,
          ml = B["__core-js_shared__"],
          vl = wv.toString,
          ot = Ei.hasOwnProperty,
          Sv = 0,
          sd = (function () {
            var n = /[^.]+$/.exec((ml && ml.keys && ml.keys.IE_PROTO) || "");
            return n ? "Symbol(src)_1." + n : "";
          })(),
          pl = Ei.toString,
          kv = vl.call(dt),
          Cv = Ut._,
          Tv = ms(
            "^" +
              vl
                .call(ot)
                .replace(sa, "\\$&")
                .replace(
                  /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
                  "$1.*?"
                ) +
              "$"
          ),
          yl = Yc ? B.Buffer : r,
          Br = B.Symbol,
          _l = B.Uint8Array,
          ud = yl ? yl.allocUnsafe : r,
          bl = ld(dt.getPrototypeOf, dt),
          cd = dt.create,
          dd = Ei.propertyIsEnumerable,
          wl = gl.splice,
          fd = Br ? Br.isConcatSpreadable : r,
          da = Br ? Br.iterator : r,
          ri = Br ? Br.toStringTag : r,
          Sl = (function () {
            try {
              var n = si(dt, "defineProperty");
              return n({}, "", {}), n;
            } catch {}
          })(),
          Mv = B.clearTimeout !== Ut.clearTimeout && B.clearTimeout,
          Dv = ue && ue.now !== Ut.Date.now && ue.now,
          qv = B.setTimeout !== Ut.setTimeout && B.setTimeout,
          kl = $t.ceil,
          Cl = $t.floor,
          vs = dt.getOwnPropertySymbols,
          xv = yl ? yl.isBuffer : r,
          hd = B.isFinite,
          Pv = gl.join,
          Av = ld(dt.keys, dt),
          Rt = $t.max,
          jt = $t.min,
          Ev = ue.now,
          Iv = B.parseInt,
          gd = $t.random,
          $v = gl.reverse,
          ps = si(B, "DataView"),
          fa = si(B, "Map"),
          ys = si(B, "Promise"),
          Ii = si(B, "Set"),
          ha = si(B, "WeakMap"),
          ga = si(dt, "create"),
          Tl = ha && new ha(),
          $i = {},
          Rv = ui(ps),
          Ov = ui(fa),
          Lv = ui(ys),
          Nv = ui(Ii),
          Bv = ui(ha),
          Ml = Br ? Br.prototype : r,
          ma = Ml ? Ml.valueOf : r,
          md = Ml ? Ml.toString : r;
        function m(n) {
          if (Tt(n) && !Ee(n) && !(n instanceof He)) {
            if (n instanceof An) return n;
            if (ot.call(n, "__wrapped__")) return pf(n);
          }
          return new An(n);
        }
        var Ri = (function () {
          function n() {}
          return function (i) {
            if (!Ct(i)) return {};
            if (cd) return cd(i);
            n.prototype = i;
            var o = new n();
            return (n.prototype = r), o;
          };
        })();
        function Dl() {}
        function An(n, i) {
          (this.__wrapped__ = n),
            (this.__actions__ = []),
            (this.__chain__ = !!i),
            (this.__index__ = 0),
            (this.__values__ = r);
        }
        (m.templateSettings = {
          escape: al,
          evaluate: Ci,
          interpolate: Ar,
          variable: "",
          imports: { _: m },
        }),
          (m.prototype = Dl.prototype),
          (m.prototype.constructor = m),
          (An.prototype = Ri(Dl.prototype)),
          (An.prototype.constructor = An);
        function He(n) {
          (this.__wrapped__ = n),
            (this.__actions__ = []),
            (this.__dir__ = 1),
            (this.__filtered__ = !1),
            (this.__iteratees__ = []),
            (this.__takeCount__ = Z),
            (this.__views__ = []);
        }
        function Fv() {
          var n = new He(this.__wrapped__);
          return (
            (n.__actions__ = dn(this.__actions__)),
            (n.__dir__ = this.__dir__),
            (n.__filtered__ = this.__filtered__),
            (n.__iteratees__ = dn(this.__iteratees__)),
            (n.__takeCount__ = this.__takeCount__),
            (n.__views__ = dn(this.__views__)),
            n
          );
        }
        function Uv() {
          if (this.__filtered__) {
            var n = new He(this);
            (n.__dir__ = -1), (n.__filtered__ = !0);
          } else (n = this.clone()), (n.__dir__ *= -1);
          return n;
        }
        function Vv() {
          var n = this.__wrapped__.value(),
            i = this.__dir__,
            o = Ee(n),
            c = i < 0,
            h = o ? n.length : 0,
            p = e0(0, h, this.__views__),
            w = p.start,
            k = p.end,
            x = k - w,
            U = c ? k : w - 1,
            V = this.__iteratees__,
            Y = V.length,
            ne = 0,
            ve = jt(x, this.__takeCount__);
          if (!o || (!c && h == x && ve == x)) return Bd(n, this.__actions__);
          var ke = [];
          e: for (; x-- && ne < ve; ) {
            U += i;
            for (var Le = -1, Ce = n[U]; ++Le < Y; ) {
              var Ye = V[Le],
                Qe = Ye.iteratee,
                bn = Ye.type,
                on = Qe(Ce);
              if (bn == Be) Ce = on;
              else if (!on) {
                if (bn == xe) continue e;
                break e;
              }
            }
            ke[ne++] = Ce;
          }
          return ke;
        }
        (He.prototype = Ri(Dl.prototype)), (He.prototype.constructor = He);
        function ii(n) {
          var i = -1,
            o = n == null ? 0 : n.length;
          for (this.clear(); ++i < o; ) {
            var c = n[i];
            this.set(c[0], c[1]);
          }
        }
        function zv() {
          (this.__data__ = ga ? ga(null) : {}), (this.size = 0);
        }
        function Wv(n) {
          var i = this.has(n) && delete this.__data__[n];
          return (this.size -= i ? 1 : 0), i;
        }
        function Yv(n) {
          var i = this.__data__;
          if (ga) {
            var o = i[n];
            return o === f ? r : o;
          }
          return ot.call(i, n) ? i[n] : r;
        }
        function Hv(n) {
          var i = this.__data__;
          return ga ? i[n] !== r : ot.call(i, n);
        }
        function Gv(n, i) {
          var o = this.__data__;
          return (
            (this.size += this.has(n) ? 0 : 1),
            (o[n] = ga && i === r ? f : i),
            this
          );
        }
        (ii.prototype.clear = zv),
          (ii.prototype.delete = Wv),
          (ii.prototype.get = Yv),
          (ii.prototype.has = Hv),
          (ii.prototype.set = Gv);
        function cr(n) {
          var i = -1,
            o = n == null ? 0 : n.length;
          for (this.clear(); ++i < o; ) {
            var c = n[i];
            this.set(c[0], c[1]);
          }
        }
        function Kv() {
          (this.__data__ = []), (this.size = 0);
        }
        function Qv(n) {
          var i = this.__data__,
            o = ql(i, n);
          if (o < 0) return !1;
          var c = i.length - 1;
          return o == c ? i.pop() : wl.call(i, o, 1), --this.size, !0;
        }
        function jv(n) {
          var i = this.__data__,
            o = ql(i, n);
          return o < 0 ? r : i[o][1];
        }
        function Zv(n) {
          return ql(this.__data__, n) > -1;
        }
        function Jv(n, i) {
          var o = this.__data__,
            c = ql(o, n);
          return c < 0 ? (++this.size, o.push([n, i])) : (o[c][1] = i), this;
        }
        (cr.prototype.clear = Kv),
          (cr.prototype.delete = Qv),
          (cr.prototype.get = jv),
          (cr.prototype.has = Zv),
          (cr.prototype.set = Jv);
        function dr(n) {
          var i = -1,
            o = n == null ? 0 : n.length;
          for (this.clear(); ++i < o; ) {
            var c = n[i];
            this.set(c[0], c[1]);
          }
        }
        function Xv() {
          (this.size = 0),
            (this.__data__ = {
              hash: new ii(),
              map: new (fa || cr)(),
              string: new ii(),
            });
        }
        function ep(n) {
          var i = Fl(this, n).delete(n);
          return (this.size -= i ? 1 : 0), i;
        }
        function tp(n) {
          return Fl(this, n).get(n);
        }
        function np(n) {
          return Fl(this, n).has(n);
        }
        function rp(n, i) {
          var o = Fl(this, n),
            c = o.size;
          return o.set(n, i), (this.size += o.size == c ? 0 : 1), this;
        }
        (dr.prototype.clear = Xv),
          (dr.prototype.delete = ep),
          (dr.prototype.get = tp),
          (dr.prototype.has = np),
          (dr.prototype.set = rp);
        function ai(n) {
          var i = -1,
            o = n == null ? 0 : n.length;
          for (this.__data__ = new dr(); ++i < o; ) this.add(n[i]);
        }
        function ip(n) {
          return this.__data__.set(n, f), this;
        }
        function ap(n) {
          return this.__data__.has(n);
        }
        (ai.prototype.add = ai.prototype.push = ip), (ai.prototype.has = ap);
        function Vn(n) {
          var i = (this.__data__ = new cr(n));
          this.size = i.size;
        }
        function lp() {
          (this.__data__ = new cr()), (this.size = 0);
        }
        function op(n) {
          var i = this.__data__,
            o = i.delete(n);
          return (this.size = i.size), o;
        }
        function sp(n) {
          return this.__data__.get(n);
        }
        function up(n) {
          return this.__data__.has(n);
        }
        function cp(n, i) {
          var o = this.__data__;
          if (o instanceof cr) {
            var c = o.__data__;
            if (!fa || c.length < l - 1)
              return c.push([n, i]), (this.size = ++o.size), this;
            o = this.__data__ = new dr(c);
          }
          return o.set(n, i), (this.size = o.size), this;
        }
        (Vn.prototype.clear = lp),
          (Vn.prototype.delete = op),
          (Vn.prototype.get = sp),
          (Vn.prototype.has = up),
          (Vn.prototype.set = cp);
        function vd(n, i) {
          var o = Ee(n),
            c = !o && ci(n),
            h = !o && !c && Wr(n),
            p = !o && !c && !h && Bi(n),
            w = o || c || h || p,
            k = w ? fs(n.length, bv) : [],
            x = k.length;
          for (var U in n)
            (i || ot.call(n, U)) &&
              !(
                w &&
                (U == "length" ||
                  (h && (U == "offset" || U == "parent")) ||
                  (p &&
                    (U == "buffer" ||
                      U == "byteLength" ||
                      U == "byteOffset")) ||
                  mr(U, x))
              ) &&
              k.push(U);
          return k;
        }
        function pd(n) {
          var i = n.length;
          return i ? n[xs(0, i - 1)] : r;
        }
        function dp(n, i) {
          return Ul(dn(n), li(i, 0, n.length));
        }
        function fp(n) {
          return Ul(dn(n));
        }
        function _s(n, i, o) {
          ((o !== r && !zn(n[i], o)) || (o === r && !(i in n))) && fr(n, i, o);
        }
        function va(n, i, o) {
          var c = n[i];
          (!(ot.call(n, i) && zn(c, o)) || (o === r && !(i in n))) &&
            fr(n, i, o);
        }
        function ql(n, i) {
          for (var o = n.length; o--; ) if (zn(n[o][0], i)) return o;
          return -1;
        }
        function hp(n, i, o, c) {
          return (
            Fr(n, function (h, p, w) {
              i(c, h, o(h), w);
            }),
            c
          );
        }
        function yd(n, i) {
          return n && er(i, Bt(i), n);
        }
        function gp(n, i) {
          return n && er(i, hn(i), n);
        }
        function fr(n, i, o) {
          i == "__proto__" && Sl
            ? Sl(n, i, {
                configurable: !0,
                enumerable: !0,
                value: o,
                writable: !0,
              })
            : (n[i] = o);
        }
        function bs(n, i) {
          for (var o = -1, c = i.length, h = O(c), p = n == null; ++o < c; )
            h[o] = p ? r : eu(n, i[o]);
          return h;
        }
        function li(n, i, o) {
          return (
            n === n &&
              (o !== r && (n = n <= o ? n : o),
              i !== r && (n = n >= i ? n : i)),
            n
          );
        }
        function En(n, i, o, c, h, p) {
          var w,
            k = i & T,
            x = i & M,
            U = i & _;
          if ((o && (w = h ? o(n, c, h, p) : o(n)), w !== r)) return w;
          if (!Ct(n)) return n;
          var V = Ee(n);
          if (V) {
            if (((w = n0(n)), !k)) return dn(n, w);
          } else {
            var Y = Zt(n),
              ne = Y == un || Y == rn;
            if (Wr(n)) return Vd(n, k);
            if (Y == Kt || Y == Ve || (ne && !h)) {
              if (((w = x || ne ? {} : sf(n)), !k))
                return x ? Yp(n, gp(w, n)) : Wp(n, yd(w, n));
            } else {
              if (!ht[Y]) return h ? n : {};
              w = r0(n, Y, k);
            }
          }
          p || (p = new Vn());
          var ve = p.get(n);
          if (ve) return ve;
          p.set(n, w),
            Lf(n)
              ? n.forEach(function (Ce) {
                  w.add(En(Ce, i, o, Ce, n, p));
                })
              : Rf(n) &&
                n.forEach(function (Ce, Ye) {
                  w.set(Ye, En(Ce, i, o, Ye, n, p));
                });
          var ke = U ? (x ? Fs : Bs) : x ? hn : Bt,
            Le = V ? r : ke(n);
          return (
            xn(Le || n, function (Ce, Ye) {
              Le && ((Ye = Ce), (Ce = n[Ye])),
                va(w, Ye, En(Ce, i, o, Ye, n, p));
            }),
            w
          );
        }
        function mp(n) {
          var i = Bt(n);
          return function (o) {
            return _d(o, n, i);
          };
        }
        function _d(n, i, o) {
          var c = o.length;
          if (n == null) return !c;
          for (n = dt(n); c--; ) {
            var h = o[c],
              p = i[h],
              w = n[h];
            if ((w === r && !(h in n)) || !p(w)) return !1;
          }
          return !0;
        }
        function bd(n, i, o) {
          if (typeof n != "function") throw new Pn(u);
          return ka(function () {
            n.apply(r, o);
          }, i);
        }
        function pa(n, i, o, c) {
          var h = -1,
            p = dl,
            w = !0,
            k = n.length,
            x = [],
            U = i.length;
          if (!k) return x;
          o && (i = _t(i, pn(o))),
            c
              ? ((p = ls), (w = !1))
              : i.length >= l && ((p = ca), (w = !1), (i = new ai(i)));
          e: for (; ++h < k; ) {
            var V = n[h],
              Y = o == null ? V : o(V);
            if (((V = c || V !== 0 ? V : 0), w && Y === Y)) {
              for (var ne = U; ne--; ) if (i[ne] === Y) continue e;
              x.push(V);
            } else p(i, Y, c) || x.push(V);
          }
          return x;
        }
        var Fr = Gd(Xn),
          wd = Gd(Ss, !0);
        function vp(n, i) {
          var o = !0;
          return (
            Fr(n, function (c, h, p) {
              return (o = !!i(c, h, p)), o;
            }),
            o
          );
        }
        function xl(n, i, o) {
          for (var c = -1, h = n.length; ++c < h; ) {
            var p = n[c],
              w = i(p);
            if (w != null && (k === r ? w === w && !_n(w) : o(w, k)))
              var k = w,
                x = p;
          }
          return x;
        }
        function pp(n, i, o, c) {
          var h = n.length;
          for (
            o = Re(o),
              o < 0 && (o = -o > h ? 0 : h + o),
              c = c === r || c > h ? h : Re(c),
              c < 0 && (c += h),
              c = o > c ? 0 : Bf(c);
            o < c;

          )
            n[o++] = i;
          return n;
        }
        function Sd(n, i) {
          var o = [];
          return (
            Fr(n, function (c, h, p) {
              i(c, h, p) && o.push(c);
            }),
            o
          );
        }
        function Vt(n, i, o, c, h) {
          var p = -1,
            w = n.length;
          for (o || (o = a0), h || (h = []); ++p < w; ) {
            var k = n[p];
            i > 0 && o(k)
              ? i > 1
                ? Vt(k, i - 1, o, c, h)
                : Lr(h, k)
              : c || (h[h.length] = k);
          }
          return h;
        }
        var ws = Kd(),
          kd = Kd(!0);
        function Xn(n, i) {
          return n && ws(n, i, Bt);
        }
        function Ss(n, i) {
          return n && kd(n, i, Bt);
        }
        function Pl(n, i) {
          return Or(i, function (o) {
            return vr(n[o]);
          });
        }
        function oi(n, i) {
          i = Vr(i, n);
          for (var o = 0, c = i.length; n != null && o < c; ) n = n[tr(i[o++])];
          return o && o == c ? n : r;
        }
        function Cd(n, i, o) {
          var c = i(n);
          return Ee(n) ? c : Lr(c, o(n));
        }
        function an(n) {
          return n == null
            ? n === r
              ? gt
              : Zn
            : ri && ri in dt(n)
            ? Xp(n)
            : f0(n);
        }
        function ks(n, i) {
          return n > i;
        }
        function yp(n, i) {
          return n != null && ot.call(n, i);
        }
        function _p(n, i) {
          return n != null && i in dt(n);
        }
        function bp(n, i, o) {
          return n >= jt(i, o) && n < Rt(i, o);
        }
        function Cs(n, i, o) {
          for (
            var c = o ? ls : dl,
              h = n[0].length,
              p = n.length,
              w = p,
              k = O(p),
              x = 1 / 0,
              U = [];
            w--;

          ) {
            var V = n[w];
            w && i && (V = _t(V, pn(i))),
              (x = jt(V.length, x)),
              (k[w] =
                !o && (i || (h >= 120 && V.length >= 120))
                  ? new ai(w && V)
                  : r);
          }
          V = n[0];
          var Y = -1,
            ne = k[0];
          e: for (; ++Y < h && U.length < x; ) {
            var ve = V[Y],
              ke = i ? i(ve) : ve;
            if (
              ((ve = o || ve !== 0 ? ve : 0), !(ne ? ca(ne, ke) : c(U, ke, o)))
            ) {
              for (w = p; --w; ) {
                var Le = k[w];
                if (!(Le ? ca(Le, ke) : c(n[w], ke, o))) continue e;
              }
              ne && ne.push(ke), U.push(ve);
            }
          }
          return U;
        }
        function wp(n, i, o, c) {
          return (
            Xn(n, function (h, p, w) {
              i(c, o(h), p, w);
            }),
            c
          );
        }
        function ya(n, i, o) {
          (i = Vr(i, n)), (n = ff(n, i));
          var c = n == null ? n : n[tr($n(i))];
          return c == null ? r : vn(c, n, o);
        }
        function Td(n) {
          return Tt(n) && an(n) == Ve;
        }
        function Sp(n) {
          return Tt(n) && an(n) == Fe;
        }
        function kp(n) {
          return Tt(n) && an(n) == ee;
        }
        function _a(n, i, o, c, h) {
          return n === i
            ? !0
            : n == null || i == null || (!Tt(n) && !Tt(i))
            ? n !== n && i !== i
            : Cp(n, i, o, c, _a, h);
        }
        function Cp(n, i, o, c, h, p) {
          var w = Ee(n),
            k = Ee(i),
            x = w ? we : Zt(n),
            U = k ? we : Zt(i);
          (x = x == Ve ? Kt : x), (U = U == Ve ? Kt : U);
          var V = x == Kt,
            Y = U == Kt,
            ne = x == U;
          if (ne && Wr(n)) {
            if (!Wr(i)) return !1;
            (w = !0), (V = !1);
          }
          if (ne && !V)
            return (
              p || (p = new Vn()),
              w || Bi(n) ? af(n, i, o, c, h, p) : Zp(n, i, x, o, c, h, p)
            );
          if (!(o & P)) {
            var ve = V && ot.call(n, "__wrapped__"),
              ke = Y && ot.call(i, "__wrapped__");
            if (ve || ke) {
              var Le = ve ? n.value() : n,
                Ce = ke ? i.value() : i;
              return p || (p = new Vn()), h(Le, Ce, o, c, p);
            }
          }
          return ne ? (p || (p = new Vn()), Jp(n, i, o, c, h, p)) : !1;
        }
        function Tp(n) {
          return Tt(n) && Zt(n) == qt;
        }
        function Ts(n, i, o, c) {
          var h = o.length,
            p = h,
            w = !c;
          if (n == null) return !p;
          for (n = dt(n); h--; ) {
            var k = o[h];
            if (w && k[2] ? k[1] !== n[k[0]] : !(k[0] in n)) return !1;
          }
          for (; ++h < p; ) {
            k = o[h];
            var x = k[0],
              U = n[x],
              V = k[1];
            if (w && k[2]) {
              if (U === r && !(x in n)) return !1;
            } else {
              var Y = new Vn();
              if (c) var ne = c(U, V, x, n, i, Y);
              if (!(ne === r ? _a(V, U, P | $, c, Y) : ne)) return !1;
            }
          }
          return !0;
        }
        function Md(n) {
          if (!Ct(n) || o0(n)) return !1;
          var i = vr(n) ? Tv : ol;
          return i.test(ui(n));
        }
        function Mp(n) {
          return Tt(n) && an(n) == St;
        }
        function Dp(n) {
          return Tt(n) && Zt(n) == G;
        }
        function qp(n) {
          return Tt(n) && Gl(n.length) && !!vt[an(n)];
        }
        function Dd(n) {
          return typeof n == "function"
            ? n
            : n == null
            ? gn
            : typeof n == "object"
            ? Ee(n)
              ? Pd(n[0], n[1])
              : xd(n)
            : jf(n);
        }
        function Ms(n) {
          if (!Sa(n)) return Av(n);
          var i = [];
          for (var o in dt(n)) ot.call(n, o) && o != "constructor" && i.push(o);
          return i;
        }
        function xp(n) {
          if (!Ct(n)) return d0(n);
          var i = Sa(n),
            o = [];
          for (var c in n)
            (c == "constructor" && (i || !ot.call(n, c))) || o.push(c);
          return o;
        }
        function Ds(n, i) {
          return n < i;
        }
        function qd(n, i) {
          var o = -1,
            c = fn(n) ? O(n.length) : [];
          return (
            Fr(n, function (h, p, w) {
              c[++o] = i(h, p, w);
            }),
            c
          );
        }
        function xd(n) {
          var i = Vs(n);
          return i.length == 1 && i[0][2]
            ? cf(i[0][0], i[0][1])
            : function (o) {
                return o === n || Ts(o, n, i);
              };
        }
        function Pd(n, i) {
          return Ws(n) && uf(i)
            ? cf(tr(n), i)
            : function (o) {
                var c = eu(o, n);
                return c === r && c === i ? tu(o, n) : _a(i, c, P | $);
              };
        }
        function Al(n, i, o, c, h) {
          n !== i &&
            ws(
              i,
              function (p, w) {
                if ((h || (h = new Vn()), Ct(p))) Pp(n, i, w, o, Al, c, h);
                else {
                  var k = c ? c(Hs(n, w), p, w + "", n, i, h) : r;
                  k === r && (k = p), _s(n, w, k);
                }
              },
              hn
            );
        }
        function Pp(n, i, o, c, h, p, w) {
          var k = Hs(n, o),
            x = Hs(i, o),
            U = w.get(x);
          if (U) {
            _s(n, o, U);
            return;
          }
          var V = p ? p(k, x, o + "", n, i, w) : r,
            Y = V === r;
          if (Y) {
            var ne = Ee(x),
              ve = !ne && Wr(x),
              ke = !ne && !ve && Bi(x);
            (V = x),
              ne || ve || ke
                ? Ee(k)
                  ? (V = k)
                  : Pt(k)
                  ? (V = dn(k))
                  : ve
                  ? ((Y = !1), (V = Vd(x, !0)))
                  : ke
                  ? ((Y = !1), (V = zd(x, !0)))
                  : (V = [])
                : Ca(x) || ci(x)
                ? ((V = k),
                  ci(k) ? (V = Ff(k)) : (!Ct(k) || vr(k)) && (V = sf(x)))
                : (Y = !1);
          }
          Y && (w.set(x, V), h(V, x, c, p, w), w.delete(x)), _s(n, o, V);
        }
        function Ad(n, i) {
          var o = n.length;
          if (!!o) return (i += i < 0 ? o : 0), mr(i, o) ? n[i] : r;
        }
        function Ed(n, i, o) {
          i.length
            ? (i = _t(i, function (p) {
                return Ee(p)
                  ? function (w) {
                      return oi(w, p.length === 1 ? p[0] : p);
                    }
                  : p;
              }))
            : (i = [gn]);
          var c = -1;
          i = _t(i, pn(Se()));
          var h = qd(n, function (p, w, k) {
            var x = _t(i, function (U) {
              return U(p);
            });
            return { criteria: x, index: ++c, value: p };
          });
          return rv(h, function (p, w) {
            return zp(p, w, o);
          });
        }
        function Ap(n, i) {
          return Id(n, i, function (o, c) {
            return tu(n, c);
          });
        }
        function Id(n, i, o) {
          for (var c = -1, h = i.length, p = {}; ++c < h; ) {
            var w = i[c],
              k = oi(n, w);
            o(k, w) && ba(p, Vr(w, n), k);
          }
          return p;
        }
        function Ep(n) {
          return function (i) {
            return oi(i, n);
          };
        }
        function qs(n, i, o, c) {
          var h = c ? nv : qi,
            p = -1,
            w = i.length,
            k = n;
          for (n === i && (i = dn(i)), o && (k = _t(n, pn(o))); ++p < w; )
            for (
              var x = 0, U = i[p], V = o ? o(U) : U;
              (x = h(k, V, x, c)) > -1;

            )
              k !== n && wl.call(k, x, 1), wl.call(n, x, 1);
          return n;
        }
        function $d(n, i) {
          for (var o = n ? i.length : 0, c = o - 1; o--; ) {
            var h = i[o];
            if (o == c || h !== p) {
              var p = h;
              mr(h) ? wl.call(n, h, 1) : Es(n, h);
            }
          }
          return n;
        }
        function xs(n, i) {
          return n + Cl(gd() * (i - n + 1));
        }
        function Ip(n, i, o, c) {
          for (var h = -1, p = Rt(kl((i - n) / (o || 1)), 0), w = O(p); p--; )
            (w[c ? p : ++h] = n), (n += o);
          return w;
        }
        function Ps(n, i) {
          var o = "";
          if (!n || i < 1 || i > me) return o;
          do i % 2 && (o += n), (i = Cl(i / 2)), i && (n += n);
          while (i);
          return o;
        }
        function Ue(n, i) {
          return Gs(df(n, i, gn), n + "");
        }
        function $p(n) {
          return pd(Fi(n));
        }
        function Rp(n, i) {
          var o = Fi(n);
          return Ul(o, li(i, 0, o.length));
        }
        function ba(n, i, o, c) {
          if (!Ct(n)) return n;
          i = Vr(i, n);
          for (
            var h = -1, p = i.length, w = p - 1, k = n;
            k != null && ++h < p;

          ) {
            var x = tr(i[h]),
              U = o;
            if (x === "__proto__" || x === "constructor" || x === "prototype")
              return n;
            if (h != w) {
              var V = k[x];
              (U = c ? c(V, x, k) : r),
                U === r && (U = Ct(V) ? V : mr(i[h + 1]) ? [] : {});
            }
            va(k, x, U), (k = k[x]);
          }
          return n;
        }
        var Rd = Tl
            ? function (n, i) {
                return Tl.set(n, i), n;
              }
            : gn,
          Op = Sl
            ? function (n, i) {
                return Sl(n, "toString", {
                  configurable: !0,
                  enumerable: !1,
                  value: ru(i),
                  writable: !0,
                });
              }
            : gn;
        function Lp(n) {
          return Ul(Fi(n));
        }
        function In(n, i, o) {
          var c = -1,
            h = n.length;
          i < 0 && (i = -i > h ? 0 : h + i),
            (o = o > h ? h : o),
            o < 0 && (o += h),
            (h = i > o ? 0 : (o - i) >>> 0),
            (i >>>= 0);
          for (var p = O(h); ++c < h; ) p[c] = n[c + i];
          return p;
        }
        function Np(n, i) {
          var o;
          return (
            Fr(n, function (c, h, p) {
              return (o = i(c, h, p)), !o;
            }),
            !!o
          );
        }
        function El(n, i, o) {
          var c = 0,
            h = n == null ? c : n.length;
          if (typeof i == "number" && i === i && h <= fe) {
            for (; c < h; ) {
              var p = (c + h) >>> 1,
                w = n[p];
              w !== null && !_n(w) && (o ? w <= i : w < i)
                ? (c = p + 1)
                : (h = p);
            }
            return h;
          }
          return As(n, i, gn, o);
        }
        function As(n, i, o, c) {
          var h = 0,
            p = n == null ? 0 : n.length;
          if (p === 0) return 0;
          i = o(i);
          for (
            var w = i !== i, k = i === null, x = _n(i), U = i === r;
            h < p;

          ) {
            var V = Cl((h + p) / 2),
              Y = o(n[V]),
              ne = Y !== r,
              ve = Y === null,
              ke = Y === Y,
              Le = _n(Y);
            if (w) var Ce = c || ke;
            else
              U
                ? (Ce = ke && (c || ne))
                : k
                ? (Ce = ke && ne && (c || !ve))
                : x
                ? (Ce = ke && ne && !ve && (c || !Le))
                : ve || Le
                ? (Ce = !1)
                : (Ce = c ? Y <= i : Y < i);
            Ce ? (h = V + 1) : (p = V);
          }
          return jt(p, he);
        }
        function Od(n, i) {
          for (var o = -1, c = n.length, h = 0, p = []; ++o < c; ) {
            var w = n[o],
              k = i ? i(w) : w;
            if (!o || !zn(k, x)) {
              var x = k;
              p[h++] = w === 0 ? 0 : w;
            }
          }
          return p;
        }
        function Ld(n) {
          return typeof n == "number" ? n : _n(n) ? X : +n;
        }
        function yn(n) {
          if (typeof n == "string") return n;
          if (Ee(n)) return _t(n, yn) + "";
          if (_n(n)) return md ? md.call(n) : "";
          var i = n + "";
          return i == "0" && 1 / n == -K ? "-0" : i;
        }
        function Ur(n, i, o) {
          var c = -1,
            h = dl,
            p = n.length,
            w = !0,
            k = [],
            x = k;
          if (o) (w = !1), (h = ls);
          else if (p >= l) {
            var U = i ? null : Qp(n);
            if (U) return hl(U);
            (w = !1), (h = ca), (x = new ai());
          } else x = i ? [] : k;
          e: for (; ++c < p; ) {
            var V = n[c],
              Y = i ? i(V) : V;
            if (((V = o || V !== 0 ? V : 0), w && Y === Y)) {
              for (var ne = x.length; ne--; ) if (x[ne] === Y) continue e;
              i && x.push(Y), k.push(V);
            } else h(x, Y, o) || (x !== k && x.push(Y), k.push(V));
          }
          return k;
        }
        function Es(n, i) {
          return (
            (i = Vr(i, n)), (n = ff(n, i)), n == null || delete n[tr($n(i))]
          );
        }
        function Nd(n, i, o, c) {
          return ba(n, i, o(oi(n, i)), c);
        }
        function Il(n, i, o, c) {
          for (
            var h = n.length, p = c ? h : -1;
            (c ? p-- : ++p < h) && i(n[p], p, n);

          );
          return o
            ? In(n, c ? 0 : p, c ? p + 1 : h)
            : In(n, c ? p + 1 : 0, c ? h : p);
        }
        function Bd(n, i) {
          var o = n;
          return (
            o instanceof He && (o = o.value()),
            os(
              i,
              function (c, h) {
                return h.func.apply(h.thisArg, Lr([c], h.args));
              },
              o
            )
          );
        }
        function Is(n, i, o) {
          var c = n.length;
          if (c < 2) return c ? Ur(n[0]) : [];
          for (var h = -1, p = O(c); ++h < c; )
            for (var w = n[h], k = -1; ++k < c; )
              k != h && (p[h] = pa(p[h] || w, n[k], i, o));
          return Ur(Vt(p, 1), i, o);
        }
        function Fd(n, i, o) {
          for (var c = -1, h = n.length, p = i.length, w = {}; ++c < h; ) {
            var k = c < p ? i[c] : r;
            o(w, n[c], k);
          }
          return w;
        }
        function $s(n) {
          return Pt(n) ? n : [];
        }
        function Rs(n) {
          return typeof n == "function" ? n : gn;
        }
        function Vr(n, i) {
          return Ee(n) ? n : Ws(n, i) ? [n] : vf(at(n));
        }
        var Bp = Ue;
        function zr(n, i, o) {
          var c = n.length;
          return (o = o === r ? c : o), !i && o >= c ? n : In(n, i, o);
        }
        var Ud =
          Mv ||
          function (n) {
            return Ut.clearTimeout(n);
          };
        function Vd(n, i) {
          if (i) return n.slice();
          var o = n.length,
            c = ud ? ud(o) : new n.constructor(o);
          return n.copy(c), c;
        }
        function Os(n) {
          var i = new n.constructor(n.byteLength);
          return new _l(i).set(new _l(n)), i;
        }
        function Fp(n, i) {
          var o = i ? Os(n.buffer) : n.buffer;
          return new n.constructor(o, n.byteOffset, n.byteLength);
        }
        function Up(n) {
          var i = new n.constructor(n.source, Ti.exec(n));
          return (i.lastIndex = n.lastIndex), i;
        }
        function Vp(n) {
          return ma ? dt(ma.call(n)) : {};
        }
        function zd(n, i) {
          var o = i ? Os(n.buffer) : n.buffer;
          return new n.constructor(o, n.byteOffset, n.length);
        }
        function Wd(n, i) {
          if (n !== i) {
            var o = n !== r,
              c = n === null,
              h = n === n,
              p = _n(n),
              w = i !== r,
              k = i === null,
              x = i === i,
              U = _n(i);
            if (
              (!k && !U && !p && n > i) ||
              (p && w && x && !k && !U) ||
              (c && w && x) ||
              (!o && x) ||
              !h
            )
              return 1;
            if (
              (!c && !p && !U && n < i) ||
              (U && o && h && !c && !p) ||
              (k && o && h) ||
              (!w && h) ||
              !x
            )
              return -1;
          }
          return 0;
        }
        function zp(n, i, o) {
          for (
            var c = -1,
              h = n.criteria,
              p = i.criteria,
              w = h.length,
              k = o.length;
            ++c < w;

          ) {
            var x = Wd(h[c], p[c]);
            if (x) {
              if (c >= k) return x;
              var U = o[c];
              return x * (U == "desc" ? -1 : 1);
            }
          }
          return n.index - i.index;
        }
        function Yd(n, i, o, c) {
          for (
            var h = -1,
              p = n.length,
              w = o.length,
              k = -1,
              x = i.length,
              U = Rt(p - w, 0),
              V = O(x + U),
              Y = !c;
            ++k < x;

          )
            V[k] = i[k];
          for (; ++h < w; ) (Y || h < p) && (V[o[h]] = n[h]);
          for (; U--; ) V[k++] = n[h++];
          return V;
        }
        function Hd(n, i, o, c) {
          for (
            var h = -1,
              p = n.length,
              w = -1,
              k = o.length,
              x = -1,
              U = i.length,
              V = Rt(p - k, 0),
              Y = O(V + U),
              ne = !c;
            ++h < V;

          )
            Y[h] = n[h];
          for (var ve = h; ++x < U; ) Y[ve + x] = i[x];
          for (; ++w < k; ) (ne || h < p) && (Y[ve + o[w]] = n[h++]);
          return Y;
        }
        function dn(n, i) {
          var o = -1,
            c = n.length;
          for (i || (i = O(c)); ++o < c; ) i[o] = n[o];
          return i;
        }
        function er(n, i, o, c) {
          var h = !o;
          o || (o = {});
          for (var p = -1, w = i.length; ++p < w; ) {
            var k = i[p],
              x = c ? c(o[k], n[k], k, o, n) : r;
            x === r && (x = n[k]), h ? fr(o, k, x) : va(o, k, x);
          }
          return o;
        }
        function Wp(n, i) {
          return er(n, zs(n), i);
        }
        function Yp(n, i) {
          return er(n, lf(n), i);
        }
        function $l(n, i) {
          return function (o, c) {
            var h = Ee(o) ? jm : hp,
              p = i ? i() : {};
            return h(o, n, Se(c, 2), p);
          };
        }
        function Oi(n) {
          return Ue(function (i, o) {
            var c = -1,
              h = o.length,
              p = h > 1 ? o[h - 1] : r,
              w = h > 2 ? o[2] : r;
            for (
              p = n.length > 3 && typeof p == "function" ? (h--, p) : r,
                w && ln(o[0], o[1], w) && ((p = h < 3 ? r : p), (h = 1)),
                i = dt(i);
              ++c < h;

            ) {
              var k = o[c];
              k && n(i, k, c, p);
            }
            return i;
          });
        }
        function Gd(n, i) {
          return function (o, c) {
            if (o == null) return o;
            if (!fn(o)) return n(o, c);
            for (
              var h = o.length, p = i ? h : -1, w = dt(o);
              (i ? p-- : ++p < h) && c(w[p], p, w) !== !1;

            );
            return o;
          };
        }
        function Kd(n) {
          return function (i, o, c) {
            for (var h = -1, p = dt(i), w = c(i), k = w.length; k--; ) {
              var x = w[n ? k : ++h];
              if (o(p[x], x, p) === !1) break;
            }
            return i;
          };
        }
        function Hp(n, i, o) {
          var c = i & L,
            h = wa(n);
          function p() {
            var w = this && this !== Ut && this instanceof p ? h : n;
            return w.apply(c ? o : this, arguments);
          }
          return p;
        }
        function Qd(n) {
          return function (i) {
            i = at(i);
            var o = xi(i) ? Un(i) : r,
              c = o ? o[0] : i.charAt(0),
              h = o ? zr(o, 1).join("") : i.slice(1);
            return c[n]() + h;
          };
        }
        function Li(n) {
          return function (i) {
            return os(Kf(Gf(i).replace(Om, "")), n, "");
          };
        }
        function wa(n) {
          return function () {
            var i = arguments;
            switch (i.length) {
              case 0:
                return new n();
              case 1:
                return new n(i[0]);
              case 2:
                return new n(i[0], i[1]);
              case 3:
                return new n(i[0], i[1], i[2]);
              case 4:
                return new n(i[0], i[1], i[2], i[3]);
              case 5:
                return new n(i[0], i[1], i[2], i[3], i[4]);
              case 6:
                return new n(i[0], i[1], i[2], i[3], i[4], i[5]);
              case 7:
                return new n(i[0], i[1], i[2], i[3], i[4], i[5], i[6]);
            }
            var o = Ri(n.prototype),
              c = n.apply(o, i);
            return Ct(c) ? c : o;
          };
        }
        function Gp(n, i, o) {
          var c = wa(n);
          function h() {
            for (var p = arguments.length, w = O(p), k = p, x = Ni(h); k--; )
              w[k] = arguments[k];
            var U = p < 3 && w[0] !== x && w[p - 1] !== x ? [] : Nr(w, x);
            if (((p -= U.length), p < o))
              return ef(n, i, Rl, h.placeholder, r, w, U, r, r, o - p);
            var V = this && this !== Ut && this instanceof h ? c : n;
            return vn(V, this, w);
          }
          return h;
        }
        function jd(n) {
          return function (i, o, c) {
            var h = dt(i);
            if (!fn(i)) {
              var p = Se(o, 3);
              (i = Bt(i)),
                (o = function (k) {
                  return p(h[k], k, h);
                });
            }
            var w = n(i, o, c);
            return w > -1 ? h[p ? i[w] : w] : r;
          };
        }
        function Zd(n) {
          return gr(function (i) {
            var o = i.length,
              c = o,
              h = An.prototype.thru;
            for (n && i.reverse(); c--; ) {
              var p = i[c];
              if (typeof p != "function") throw new Pn(u);
              if (h && !w && Bl(p) == "wrapper") var w = new An([], !0);
            }
            for (c = w ? c : o; ++c < o; ) {
              p = i[c];
              var k = Bl(p),
                x = k == "wrapper" ? Us(p) : r;
              x &&
              Ys(x[0]) &&
              x[1] == (z | D | N | H) &&
              !x[4].length &&
              x[9] == 1
                ? (w = w[Bl(x[0])].apply(w, x[3]))
                : (w = p.length == 1 && Ys(p) ? w[k]() : w.thru(p));
            }
            return function () {
              var U = arguments,
                V = U[0];
              if (w && U.length == 1 && Ee(V)) return w.plant(V).value();
              for (var Y = 0, ne = o ? i[Y].apply(this, U) : V; ++Y < o; )
                ne = i[Y].call(this, ne);
              return ne;
            };
          });
        }
        function Rl(n, i, o, c, h, p, w, k, x, U) {
          var V = i & z,
            Y = i & L,
            ne = i & F,
            ve = i & (D | A),
            ke = i & pe,
            Le = ne ? r : wa(n);
          function Ce() {
            for (var Ye = arguments.length, Qe = O(Ye), bn = Ye; bn--; )
              Qe[bn] = arguments[bn];
            if (ve)
              var on = Ni(Ce),
                wn = av(Qe, on);
            if (
              (c && (Qe = Yd(Qe, c, h, ve)),
              p && (Qe = Hd(Qe, p, w, ve)),
              (Ye -= wn),
              ve && Ye < U)
            ) {
              var At = Nr(Qe, on);
              return ef(n, i, Rl, Ce.placeholder, o, Qe, At, k, x, U - Ye);
            }
            var Wn = Y ? o : this,
              yr = ne ? Wn[n] : n;
            return (
              (Ye = Qe.length),
              k ? (Qe = h0(Qe, k)) : ke && Ye > 1 && Qe.reverse(),
              V && x < Ye && (Qe.length = x),
              this && this !== Ut && this instanceof Ce && (yr = Le || wa(yr)),
              yr.apply(Wn, Qe)
            );
          }
          return Ce;
        }
        function Jd(n, i) {
          return function (o, c) {
            return wp(o, n, i(c), {});
          };
        }
        function Ol(n, i) {
          return function (o, c) {
            var h;
            if (o === r && c === r) return i;
            if ((o !== r && (h = o), c !== r)) {
              if (h === r) return c;
              typeof o == "string" || typeof c == "string"
                ? ((o = yn(o)), (c = yn(c)))
                : ((o = Ld(o)), (c = Ld(c))),
                (h = n(o, c));
            }
            return h;
          };
        }
        function Ls(n) {
          return gr(function (i) {
            return (
              (i = _t(i, pn(Se()))),
              Ue(function (o) {
                var c = this;
                return n(i, function (h) {
                  return vn(h, c, o);
                });
              })
            );
          });
        }
        function Ll(n, i) {
          i = i === r ? " " : yn(i);
          var o = i.length;
          if (o < 2) return o ? Ps(i, n) : i;
          var c = Ps(i, kl(n / Pi(i)));
          return xi(i) ? zr(Un(c), 0, n).join("") : c.slice(0, n);
        }
        function Kp(n, i, o, c) {
          var h = i & L,
            p = wa(n);
          function w() {
            for (
              var k = -1,
                x = arguments.length,
                U = -1,
                V = c.length,
                Y = O(V + x),
                ne = this && this !== Ut && this instanceof w ? p : n;
              ++U < V;

            )
              Y[U] = c[U];
            for (; x--; ) Y[U++] = arguments[++k];
            return vn(ne, h ? o : this, Y);
          }
          return w;
        }
        function Xd(n) {
          return function (i, o, c) {
            return (
              c && typeof c != "number" && ln(i, o, c) && (o = c = r),
              (i = pr(i)),
              o === r ? ((o = i), (i = 0)) : (o = pr(o)),
              (c = c === r ? (i < o ? 1 : -1) : pr(c)),
              Ip(i, o, c, n)
            );
          };
        }
        function Nl(n) {
          return function (i, o) {
            return (
              (typeof i == "string" && typeof o == "string") ||
                ((i = Rn(i)), (o = Rn(o))),
              n(i, o)
            );
          };
        }
        function ef(n, i, o, c, h, p, w, k, x, U) {
          var V = i & D,
            Y = V ? w : r,
            ne = V ? r : w,
            ve = V ? p : r,
            ke = V ? r : p;
          (i |= V ? N : J), (i &= ~(V ? J : N)), i & W || (i &= ~(L | F));
          var Le = [n, i, h, ve, Y, ke, ne, k, x, U],
            Ce = o.apply(r, Le);
          return Ys(n) && hf(Ce, Le), (Ce.placeholder = c), gf(Ce, n, i);
        }
        function Ns(n) {
          var i = $t[n];
          return function (o, c) {
            if (
              ((o = Rn(o)), (c = c == null ? 0 : jt(Re(c), 292)), c && hd(o))
            ) {
              var h = (at(o) + "e").split("e"),
                p = i(h[0] + "e" + (+h[1] + c));
              return (
                (h = (at(p) + "e").split("e")), +(h[0] + "e" + (+h[1] - c))
              );
            }
            return i(o);
          };
        }
        var Qp =
          Ii && 1 / hl(new Ii([, -0]))[1] == K
            ? function (n) {
                return new Ii(n);
              }
            : lu;
        function tf(n) {
          return function (i) {
            var o = Zt(i);
            return o == qt ? gs(i) : o == G ? fv(i) : iv(i, n(i));
          };
        }
        function hr(n, i, o, c, h, p, w, k) {
          var x = i & F;
          if (!x && typeof n != "function") throw new Pn(u);
          var U = c ? c.length : 0;
          if (
            (U || ((i &= ~(N | J)), (c = h = r)),
            (w = w === r ? w : Rt(Re(w), 0)),
            (k = k === r ? k : Re(k)),
            (U -= h ? h.length : 0),
            i & J)
          ) {
            var V = c,
              Y = h;
            c = h = r;
          }
          var ne = x ? r : Us(n),
            ve = [n, i, o, c, h, V, Y, p, w, k];
          if (
            (ne && c0(ve, ne),
            (n = ve[0]),
            (i = ve[1]),
            (o = ve[2]),
            (c = ve[3]),
            (h = ve[4]),
            (k = ve[9] = ve[9] === r ? (x ? 0 : n.length) : Rt(ve[9] - U, 0)),
            !k && i & (D | A) && (i &= ~(D | A)),
            !i || i == L)
          )
            var ke = Hp(n, i, o);
          else
            i == D || i == A
              ? (ke = Gp(n, i, k))
              : (i == N || i == (L | N)) && !h.length
              ? (ke = Kp(n, i, o, c))
              : (ke = Rl.apply(r, ve));
          var Le = ne ? Rd : hf;
          return gf(Le(ke, ve), n, i);
        }
        function nf(n, i, o, c) {
          return n === r || (zn(n, Ei[o]) && !ot.call(c, o)) ? i : n;
        }
        function rf(n, i, o, c, h, p) {
          return (
            Ct(n) && Ct(i) && (p.set(i, n), Al(n, i, r, rf, p), p.delete(i)), n
          );
        }
        function jp(n) {
          return Ca(n) ? r : n;
        }
        function af(n, i, o, c, h, p) {
          var w = o & P,
            k = n.length,
            x = i.length;
          if (k != x && !(w && x > k)) return !1;
          var U = p.get(n),
            V = p.get(i);
          if (U && V) return U == i && V == n;
          var Y = -1,
            ne = !0,
            ve = o & $ ? new ai() : r;
          for (p.set(n, i), p.set(i, n); ++Y < k; ) {
            var ke = n[Y],
              Le = i[Y];
            if (c) var Ce = w ? c(Le, ke, Y, i, n, p) : c(ke, Le, Y, n, i, p);
            if (Ce !== r) {
              if (Ce) continue;
              ne = !1;
              break;
            }
            if (ve) {
              if (
                !ss(i, function (Ye, Qe) {
                  if (!ca(ve, Qe) && (ke === Ye || h(ke, Ye, o, c, p)))
                    return ve.push(Qe);
                })
              ) {
                ne = !1;
                break;
              }
            } else if (!(ke === Le || h(ke, Le, o, c, p))) {
              ne = !1;
              break;
            }
          }
          return p.delete(n), p.delete(i), ne;
        }
        function Zp(n, i, o, c, h, p, w) {
          switch (o) {
            case mt:
              if (n.byteLength != i.byteLength || n.byteOffset != i.byteOffset)
                return !1;
              (n = n.buffer), (i = i.buffer);
            case Fe:
              return !(
                n.byteLength != i.byteLength || !p(new _l(n), new _l(i))
              );
            case ft:
            case ee:
            case Gt:
              return zn(+n, +i);
            case nn:
              return n.name == i.name && n.message == i.message;
            case St:
            case de:
              return n == i + "";
            case qt:
              var k = gs;
            case G:
              var x = c & P;
              if ((k || (k = hl), n.size != i.size && !x)) return !1;
              var U = w.get(n);
              if (U) return U == i;
              (c |= $), w.set(n, i);
              var V = af(k(n), k(i), c, h, p, w);
              return w.delete(n), V;
            case qe:
              if (ma) return ma.call(n) == ma.call(i);
          }
          return !1;
        }
        function Jp(n, i, o, c, h, p) {
          var w = o & P,
            k = Bs(n),
            x = k.length,
            U = Bs(i),
            V = U.length;
          if (x != V && !w) return !1;
          for (var Y = x; Y--; ) {
            var ne = k[Y];
            if (!(w ? ne in i : ot.call(i, ne))) return !1;
          }
          var ve = p.get(n),
            ke = p.get(i);
          if (ve && ke) return ve == i && ke == n;
          var Le = !0;
          p.set(n, i), p.set(i, n);
          for (var Ce = w; ++Y < x; ) {
            ne = k[Y];
            var Ye = n[ne],
              Qe = i[ne];
            if (c) var bn = w ? c(Qe, Ye, ne, i, n, p) : c(Ye, Qe, ne, n, i, p);
            if (!(bn === r ? Ye === Qe || h(Ye, Qe, o, c, p) : bn)) {
              Le = !1;
              break;
            }
            Ce || (Ce = ne == "constructor");
          }
          if (Le && !Ce) {
            var on = n.constructor,
              wn = i.constructor;
            on != wn &&
              "constructor" in n &&
              "constructor" in i &&
              !(
                typeof on == "function" &&
                on instanceof on &&
                typeof wn == "function" &&
                wn instanceof wn
              ) &&
              (Le = !1);
          }
          return p.delete(n), p.delete(i), Le;
        }
        function gr(n) {
          return Gs(df(n, r, bf), n + "");
        }
        function Bs(n) {
          return Cd(n, Bt, zs);
        }
        function Fs(n) {
          return Cd(n, hn, lf);
        }
        var Us = Tl
          ? function (n) {
              return Tl.get(n);
            }
          : lu;
        function Bl(n) {
          for (
            var i = n.name + "", o = $i[i], c = ot.call($i, i) ? o.length : 0;
            c--;

          ) {
            var h = o[c],
              p = h.func;
            if (p == null || p == n) return h.name;
          }
          return i;
        }
        function Ni(n) {
          var i = ot.call(m, "placeholder") ? m : n;
          return i.placeholder;
        }
        function Se() {
          var n = m.iteratee || iu;
          return (
            (n = n === iu ? Dd : n),
            arguments.length ? n(arguments[0], arguments[1]) : n
          );
        }
        function Fl(n, i) {
          var o = n.__data__;
          return l0(i) ? o[typeof i == "string" ? "string" : "hash"] : o.map;
        }
        function Vs(n) {
          for (var i = Bt(n), o = i.length; o--; ) {
            var c = i[o],
              h = n[c];
            i[o] = [c, h, uf(h)];
          }
          return i;
        }
        function si(n, i) {
          var o = uv(n, i);
          return Md(o) ? o : r;
        }
        function Xp(n) {
          var i = ot.call(n, ri),
            o = n[ri];
          try {
            n[ri] = r;
            var c = !0;
          } catch {}
          var h = pl.call(n);
          return c && (i ? (n[ri] = o) : delete n[ri]), h;
        }
        var zs = vs
            ? function (n) {
                return n == null
                  ? []
                  : ((n = dt(n)),
                    Or(vs(n), function (i) {
                      return dd.call(n, i);
                    }));
              }
            : ou,
          lf = vs
            ? function (n) {
                for (var i = []; n; ) Lr(i, zs(n)), (n = bl(n));
                return i;
              }
            : ou,
          Zt = an;
        ((ps && Zt(new ps(new ArrayBuffer(1))) != mt) ||
          (fa && Zt(new fa()) != qt) ||
          (ys && Zt(ys.resolve()) != Bn) ||
          (Ii && Zt(new Ii()) != G) ||
          (ha && Zt(new ha()) != it)) &&
          (Zt = function (n) {
            var i = an(n),
              o = i == Kt ? n.constructor : r,
              c = o ? ui(o) : "";
            if (c)
              switch (c) {
                case Rv:
                  return mt;
                case Ov:
                  return qt;
                case Lv:
                  return Bn;
                case Nv:
                  return G;
                case Bv:
                  return it;
              }
            return i;
          });
        function e0(n, i, o) {
          for (var c = -1, h = o.length; ++c < h; ) {
            var p = o[c],
              w = p.size;
            switch (p.type) {
              case "drop":
                n += w;
                break;
              case "dropRight":
                i -= w;
                break;
              case "take":
                i = jt(i, n + w);
                break;
              case "takeRight":
                n = Rt(n, i - w);
                break;
            }
          }
          return { start: n, end: i };
        }
        function t0(n) {
          var i = n.match(jo);
          return i ? i[1].split(Zo) : [];
        }
        function of(n, i, o) {
          i = Vr(i, n);
          for (var c = -1, h = i.length, p = !1; ++c < h; ) {
            var w = tr(i[c]);
            if (!(p = n != null && o(n, w))) break;
            n = n[w];
          }
          return p || ++c != h
            ? p
            : ((h = n == null ? 0 : n.length),
              !!h && Gl(h) && mr(w, h) && (Ee(n) || ci(n)));
        }
        function n0(n) {
          var i = n.length,
            o = new n.constructor(i);
          return (
            i &&
              typeof n[0] == "string" &&
              ot.call(n, "index") &&
              ((o.index = n.index), (o.input = n.input)),
            o
          );
        }
        function sf(n) {
          return typeof n.constructor == "function" && !Sa(n) ? Ri(bl(n)) : {};
        }
        function r0(n, i, o) {
          var c = n.constructor;
          switch (i) {
            case Fe:
              return Os(n);
            case ft:
            case ee:
              return new c(+n);
            case mt:
              return Fp(n, o);
            case xt:
            case cn:
            case Jn:
            case ti:
            case Fn:
            case Qt:
            case wi:
            case Si:
            case ki:
              return zd(n, o);
            case qt:
              return new c();
            case Gt:
            case de:
              return new c(n);
            case St:
              return Up(n);
            case G:
              return new c();
            case qe:
              return Vp(n);
          }
        }
        function i0(n, i) {
          var o = i.length;
          if (!o) return n;
          var c = o - 1;
          return (
            (i[c] = (o > 1 ? "& " : "") + i[c]),
            (i = i.join(o > 2 ? ", " : " ")),
            n.replace(
              Qo,
              `{
/* [wrapped with ` +
                i +
                `] */
`
            )
          );
        }
        function a0(n) {
          return Ee(n) || ci(n) || !!(fd && n && n[fd]);
        }
        function mr(n, i) {
          var o = typeof n;
          return (
            (i = i == null ? me : i),
            !!i &&
              (o == "number" || (o != "symbol" && ul.test(n))) &&
              n > -1 &&
              n % 1 == 0 &&
              n < i
          );
        }
        function ln(n, i, o) {
          if (!Ct(o)) return !1;
          var c = typeof i;
          return (
            c == "number" ? fn(o) && mr(i, o.length) : c == "string" && i in o
          )
            ? zn(o[i], n)
            : !1;
        }
        function Ws(n, i) {
          if (Ee(n)) return !1;
          var o = typeof n;
          return o == "number" ||
            o == "symbol" ||
            o == "boolean" ||
            n == null ||
            _n(n)
            ? !0
            : Yo.test(n) || !Er.test(n) || (i != null && n in dt(i));
        }
        function l0(n) {
          var i = typeof n;
          return i == "string" ||
            i == "number" ||
            i == "symbol" ||
            i == "boolean"
            ? n !== "__proto__"
            : n === null;
        }
        function Ys(n) {
          var i = Bl(n),
            o = m[i];
          if (typeof o != "function" || !(i in He.prototype)) return !1;
          if (n === o) return !0;
          var c = Us(o);
          return !!c && n === c[0];
        }
        function o0(n) {
          return !!sd && sd in n;
        }
        var s0 = ml ? vr : su;
        function Sa(n) {
          var i = n && n.constructor,
            o = (typeof i == "function" && i.prototype) || Ei;
          return n === o;
        }
        function uf(n) {
          return n === n && !Ct(n);
        }
        function cf(n, i) {
          return function (o) {
            return o == null ? !1 : o[n] === i && (i !== r || n in dt(o));
          };
        }
        function u0(n) {
          var i = Yl(n, function (c) {
              return o.size === g && o.clear(), c;
            }),
            o = i.cache;
          return i;
        }
        function c0(n, i) {
          var o = n[1],
            c = i[1],
            h = o | c,
            p = h < (L | F | z),
            w =
              (c == z && o == D) ||
              (c == z && o == H && n[7].length <= i[8]) ||
              (c == (z | H) && i[7].length <= i[8] && o == D);
          if (!(p || w)) return n;
          c & L && ((n[2] = i[2]), (h |= o & L ? 0 : W));
          var k = i[3];
          if (k) {
            var x = n[3];
            (n[3] = x ? Yd(x, k, i[4]) : k), (n[4] = x ? Nr(n[3], v) : i[4]);
          }
          return (
            (k = i[5]),
            k &&
              ((x = n[5]),
              (n[5] = x ? Hd(x, k, i[6]) : k),
              (n[6] = x ? Nr(n[5], v) : i[6])),
            (k = i[7]),
            k && (n[7] = k),
            c & z && (n[8] = n[8] == null ? i[8] : jt(n[8], i[8])),
            n[9] == null && (n[9] = i[9]),
            (n[0] = i[0]),
            (n[1] = h),
            n
          );
        }
        function d0(n) {
          var i = [];
          if (n != null) for (var o in dt(n)) i.push(o);
          return i;
        }
        function f0(n) {
          return pl.call(n);
        }
        function df(n, i, o) {
          return (
            (i = Rt(i === r ? n.length - 1 : i, 0)),
            function () {
              for (
                var c = arguments, h = -1, p = Rt(c.length - i, 0), w = O(p);
                ++h < p;

              )
                w[h] = c[i + h];
              h = -1;
              for (var k = O(i + 1); ++h < i; ) k[h] = c[h];
              return (k[i] = o(w)), vn(n, this, k);
            }
          );
        }
        function ff(n, i) {
          return i.length < 2 ? n : oi(n, In(i, 0, -1));
        }
        function h0(n, i) {
          for (var o = n.length, c = jt(i.length, o), h = dn(n); c--; ) {
            var p = i[c];
            n[c] = mr(p, o) ? h[p] : r;
          }
          return n;
        }
        function Hs(n, i) {
          if (
            !(i === "constructor" && typeof n[i] == "function") &&
            i != "__proto__"
          )
            return n[i];
        }
        var hf = mf(Rd),
          ka =
            qv ||
            function (n, i) {
              return Ut.setTimeout(n, i);
            },
          Gs = mf(Op);
        function gf(n, i, o) {
          var c = i + "";
          return Gs(n, i0(c, g0(t0(c), o)));
        }
        function mf(n) {
          var i = 0,
            o = 0;
          return function () {
            var c = Ev(),
              h = te - (c - o);
            if (((o = c), h > 0)) {
              if (++i >= lt) return arguments[0];
            } else i = 0;
            return n.apply(r, arguments);
          };
        }
        function Ul(n, i) {
          var o = -1,
            c = n.length,
            h = c - 1;
          for (i = i === r ? c : i; ++o < i; ) {
            var p = xs(o, h),
              w = n[p];
            (n[p] = n[o]), (n[o] = w);
          }
          return (n.length = i), n;
        }
        var vf = u0(function (n) {
          var i = [];
          return (
            n.charCodeAt(0) === 46 && i.push(""),
            n.replace(Ho, function (o, c, h, p) {
              i.push(h ? p.replace(ur, "$1") : c || o);
            }),
            i
          );
        });
        function tr(n) {
          if (typeof n == "string" || _n(n)) return n;
          var i = n + "";
          return i == "0" && 1 / n == -K ? "-0" : i;
        }
        function ui(n) {
          if (n != null) {
            try {
              return vl.call(n);
            } catch {}
            try {
              return n + "";
            } catch {}
          }
          return "";
        }
        function g0(n, i) {
          return (
            xn(Ke, function (o) {
              var c = "_." + o[0];
              i & o[1] && !dl(n, c) && n.push(c);
            }),
            n.sort()
          );
        }
        function pf(n) {
          if (n instanceof He) return n.clone();
          var i = new An(n.__wrapped__, n.__chain__);
          return (
            (i.__actions__ = dn(n.__actions__)),
            (i.__index__ = n.__index__),
            (i.__values__ = n.__values__),
            i
          );
        }
        function m0(n, i, o) {
          (o ? ln(n, i, o) : i === r) ? (i = 1) : (i = Rt(Re(i), 0));
          var c = n == null ? 0 : n.length;
          if (!c || i < 1) return [];
          for (var h = 0, p = 0, w = O(kl(c / i)); h < c; )
            w[p++] = In(n, h, (h += i));
          return w;
        }
        function v0(n) {
          for (
            var i = -1, o = n == null ? 0 : n.length, c = 0, h = [];
            ++i < o;

          ) {
            var p = n[i];
            p && (h[c++] = p);
          }
          return h;
        }
        function p0() {
          var n = arguments.length;
          if (!n) return [];
          for (var i = O(n - 1), o = arguments[0], c = n; c--; )
            i[c - 1] = arguments[c];
          return Lr(Ee(o) ? dn(o) : [o], Vt(i, 1));
        }
        var y0 = Ue(function (n, i) {
            return Pt(n) ? pa(n, Vt(i, 1, Pt, !0)) : [];
          }),
          _0 = Ue(function (n, i) {
            var o = $n(i);
            return (
              Pt(o) && (o = r), Pt(n) ? pa(n, Vt(i, 1, Pt, !0), Se(o, 2)) : []
            );
          }),
          b0 = Ue(function (n, i) {
            var o = $n(i);
            return Pt(o) && (o = r), Pt(n) ? pa(n, Vt(i, 1, Pt, !0), r, o) : [];
          });
        function w0(n, i, o) {
          var c = n == null ? 0 : n.length;
          return c
            ? ((i = o || i === r ? 1 : Re(i)), In(n, i < 0 ? 0 : i, c))
            : [];
        }
        function S0(n, i, o) {
          var c = n == null ? 0 : n.length;
          return c
            ? ((i = o || i === r ? 1 : Re(i)),
              (i = c - i),
              In(n, 0, i < 0 ? 0 : i))
            : [];
        }
        function k0(n, i) {
          return n && n.length ? Il(n, Se(i, 3), !0, !0) : [];
        }
        function C0(n, i) {
          return n && n.length ? Il(n, Se(i, 3), !0) : [];
        }
        function T0(n, i, o, c) {
          var h = n == null ? 0 : n.length;
          return h
            ? (o && typeof o != "number" && ln(n, i, o) && ((o = 0), (c = h)),
              pp(n, i, o, c))
            : [];
        }
        function yf(n, i, o) {
          var c = n == null ? 0 : n.length;
          if (!c) return -1;
          var h = o == null ? 0 : Re(o);
          return h < 0 && (h = Rt(c + h, 0)), fl(n, Se(i, 3), h);
        }
        function _f(n, i, o) {
          var c = n == null ? 0 : n.length;
          if (!c) return -1;
          var h = c - 1;
          return (
            o !== r && ((h = Re(o)), (h = o < 0 ? Rt(c + h, 0) : jt(h, c - 1))),
            fl(n, Se(i, 3), h, !0)
          );
        }
        function bf(n) {
          var i = n == null ? 0 : n.length;
          return i ? Vt(n, 1) : [];
        }
        function M0(n) {
          var i = n == null ? 0 : n.length;
          return i ? Vt(n, K) : [];
        }
        function D0(n, i) {
          var o = n == null ? 0 : n.length;
          return o ? ((i = i === r ? 1 : Re(i)), Vt(n, i)) : [];
        }
        function q0(n) {
          for (var i = -1, o = n == null ? 0 : n.length, c = {}; ++i < o; ) {
            var h = n[i];
            c[h[0]] = h[1];
          }
          return c;
        }
        function wf(n) {
          return n && n.length ? n[0] : r;
        }
        function x0(n, i, o) {
          var c = n == null ? 0 : n.length;
          if (!c) return -1;
          var h = o == null ? 0 : Re(o);
          return h < 0 && (h = Rt(c + h, 0)), qi(n, i, h);
        }
        function P0(n) {
          var i = n == null ? 0 : n.length;
          return i ? In(n, 0, -1) : [];
        }
        var A0 = Ue(function (n) {
            var i = _t(n, $s);
            return i.length && i[0] === n[0] ? Cs(i) : [];
          }),
          E0 = Ue(function (n) {
            var i = $n(n),
              o = _t(n, $s);
            return (
              i === $n(o) ? (i = r) : o.pop(),
              o.length && o[0] === n[0] ? Cs(o, Se(i, 2)) : []
            );
          }),
          I0 = Ue(function (n) {
            var i = $n(n),
              o = _t(n, $s);
            return (
              (i = typeof i == "function" ? i : r),
              i && o.pop(),
              o.length && o[0] === n[0] ? Cs(o, r, i) : []
            );
          });
        function $0(n, i) {
          return n == null ? "" : Pv.call(n, i);
        }
        function $n(n) {
          var i = n == null ? 0 : n.length;
          return i ? n[i - 1] : r;
        }
        function R0(n, i, o) {
          var c = n == null ? 0 : n.length;
          if (!c) return -1;
          var h = c;
          return (
            o !== r && ((h = Re(o)), (h = h < 0 ? Rt(c + h, 0) : jt(h, c - 1))),
            i === i ? gv(n, i, h) : fl(n, ed, h, !0)
          );
        }
        function O0(n, i) {
          return n && n.length ? Ad(n, Re(i)) : r;
        }
        var L0 = Ue(Sf);
        function Sf(n, i) {
          return n && n.length && i && i.length ? qs(n, i) : n;
        }
        function N0(n, i, o) {
          return n && n.length && i && i.length ? qs(n, i, Se(o, 2)) : n;
        }
        function B0(n, i, o) {
          return n && n.length && i && i.length ? qs(n, i, r, o) : n;
        }
        var F0 = gr(function (n, i) {
          var o = n == null ? 0 : n.length,
            c = bs(n, i);
          return (
            $d(
              n,
              _t(i, function (h) {
                return mr(h, o) ? +h : h;
              }).sort(Wd)
            ),
            c
          );
        });
        function U0(n, i) {
          var o = [];
          if (!(n && n.length)) return o;
          var c = -1,
            h = [],
            p = n.length;
          for (i = Se(i, 3); ++c < p; ) {
            var w = n[c];
            i(w, c, n) && (o.push(w), h.push(c));
          }
          return $d(n, h), o;
        }
        function Ks(n) {
          return n == null ? n : $v.call(n);
        }
        function V0(n, i, o) {
          var c = n == null ? 0 : n.length;
          return c
            ? (o && typeof o != "number" && ln(n, i, o)
                ? ((i = 0), (o = c))
                : ((i = i == null ? 0 : Re(i)), (o = o === r ? c : Re(o))),
              In(n, i, o))
            : [];
        }
        function z0(n, i) {
          return El(n, i);
        }
        function W0(n, i, o) {
          return As(n, i, Se(o, 2));
        }
        function Y0(n, i) {
          var o = n == null ? 0 : n.length;
          if (o) {
            var c = El(n, i);
            if (c < o && zn(n[c], i)) return c;
          }
          return -1;
        }
        function H0(n, i) {
          return El(n, i, !0);
        }
        function G0(n, i, o) {
          return As(n, i, Se(o, 2), !0);
        }
        function K0(n, i) {
          var o = n == null ? 0 : n.length;
          if (o) {
            var c = El(n, i, !0) - 1;
            if (zn(n[c], i)) return c;
          }
          return -1;
        }
        function Q0(n) {
          return n && n.length ? Od(n) : [];
        }
        function j0(n, i) {
          return n && n.length ? Od(n, Se(i, 2)) : [];
        }
        function Z0(n) {
          var i = n == null ? 0 : n.length;
          return i ? In(n, 1, i) : [];
        }
        function J0(n, i, o) {
          return n && n.length
            ? ((i = o || i === r ? 1 : Re(i)), In(n, 0, i < 0 ? 0 : i))
            : [];
        }
        function X0(n, i, o) {
          var c = n == null ? 0 : n.length;
          return c
            ? ((i = o || i === r ? 1 : Re(i)),
              (i = c - i),
              In(n, i < 0 ? 0 : i, c))
            : [];
        }
        function ey(n, i) {
          return n && n.length ? Il(n, Se(i, 3), !1, !0) : [];
        }
        function ty(n, i) {
          return n && n.length ? Il(n, Se(i, 3)) : [];
        }
        var ny = Ue(function (n) {
            return Ur(Vt(n, 1, Pt, !0));
          }),
          ry = Ue(function (n) {
            var i = $n(n);
            return Pt(i) && (i = r), Ur(Vt(n, 1, Pt, !0), Se(i, 2));
          }),
          iy = Ue(function (n) {
            var i = $n(n);
            return (
              (i = typeof i == "function" ? i : r), Ur(Vt(n, 1, Pt, !0), r, i)
            );
          });
        function ay(n) {
          return n && n.length ? Ur(n) : [];
        }
        function ly(n, i) {
          return n && n.length ? Ur(n, Se(i, 2)) : [];
        }
        function oy(n, i) {
          return (
            (i = typeof i == "function" ? i : r),
            n && n.length ? Ur(n, r, i) : []
          );
        }
        function Qs(n) {
          if (!(n && n.length)) return [];
          var i = 0;
          return (
            (n = Or(n, function (o) {
              if (Pt(o)) return (i = Rt(o.length, i)), !0;
            })),
            fs(i, function (o) {
              return _t(n, us(o));
            })
          );
        }
        function kf(n, i) {
          if (!(n && n.length)) return [];
          var o = Qs(n);
          return i == null
            ? o
            : _t(o, function (c) {
                return vn(i, r, c);
              });
        }
        var sy = Ue(function (n, i) {
            return Pt(n) ? pa(n, i) : [];
          }),
          uy = Ue(function (n) {
            return Is(Or(n, Pt));
          }),
          cy = Ue(function (n) {
            var i = $n(n);
            return Pt(i) && (i = r), Is(Or(n, Pt), Se(i, 2));
          }),
          dy = Ue(function (n) {
            var i = $n(n);
            return (i = typeof i == "function" ? i : r), Is(Or(n, Pt), r, i);
          }),
          fy = Ue(Qs);
        function hy(n, i) {
          return Fd(n || [], i || [], va);
        }
        function gy(n, i) {
          return Fd(n || [], i || [], ba);
        }
        var my = Ue(function (n) {
          var i = n.length,
            o = i > 1 ? n[i - 1] : r;
          return (o = typeof o == "function" ? (n.pop(), o) : r), kf(n, o);
        });
        function Cf(n) {
          var i = m(n);
          return (i.__chain__ = !0), i;
        }
        function vy(n, i) {
          return i(n), n;
        }
        function Vl(n, i) {
          return i(n);
        }
        var py = gr(function (n) {
          var i = n.length,
            o = i ? n[0] : 0,
            c = this.__wrapped__,
            h = function (p) {
              return bs(p, n);
            };
          return i > 1 ||
            this.__actions__.length ||
            !(c instanceof He) ||
            !mr(o)
            ? this.thru(h)
            : ((c = c.slice(o, +o + (i ? 1 : 0))),
              c.__actions__.push({ func: Vl, args: [h], thisArg: r }),
              new An(c, this.__chain__).thru(function (p) {
                return i && !p.length && p.push(r), p;
              }));
        });
        function yy() {
          return Cf(this);
        }
        function _y() {
          return new An(this.value(), this.__chain__);
        }
        function by() {
          this.__values__ === r && (this.__values__ = Nf(this.value()));
          var n = this.__index__ >= this.__values__.length,
            i = n ? r : this.__values__[this.__index__++];
          return { done: n, value: i };
        }
        function wy() {
          return this;
        }
        function Sy(n) {
          for (var i, o = this; o instanceof Dl; ) {
            var c = pf(o);
            (c.__index__ = 0),
              (c.__values__ = r),
              i ? (h.__wrapped__ = c) : (i = c);
            var h = c;
            o = o.__wrapped__;
          }
          return (h.__wrapped__ = n), i;
        }
        function ky() {
          var n = this.__wrapped__;
          if (n instanceof He) {
            var i = n;
            return (
              this.__actions__.length && (i = new He(this)),
              (i = i.reverse()),
              i.__actions__.push({ func: Vl, args: [Ks], thisArg: r }),
              new An(i, this.__chain__)
            );
          }
          return this.thru(Ks);
        }
        function Cy() {
          return Bd(this.__wrapped__, this.__actions__);
        }
        var Ty = $l(function (n, i, o) {
          ot.call(n, o) ? ++n[o] : fr(n, o, 1);
        });
        function My(n, i, o) {
          var c = Ee(n) ? Jc : vp;
          return o && ln(n, i, o) && (i = r), c(n, Se(i, 3));
        }
        function Dy(n, i) {
          var o = Ee(n) ? Or : Sd;
          return o(n, Se(i, 3));
        }
        var qy = jd(yf),
          xy = jd(_f);
        function Py(n, i) {
          return Vt(zl(n, i), 1);
        }
        function Ay(n, i) {
          return Vt(zl(n, i), K);
        }
        function Ey(n, i, o) {
          return (o = o === r ? 1 : Re(o)), Vt(zl(n, i), o);
        }
        function Tf(n, i) {
          var o = Ee(n) ? xn : Fr;
          return o(n, Se(i, 3));
        }
        function Mf(n, i) {
          var o = Ee(n) ? Zm : wd;
          return o(n, Se(i, 3));
        }
        var Iy = $l(function (n, i, o) {
          ot.call(n, o) ? n[o].push(i) : fr(n, o, [i]);
        });
        function $y(n, i, o, c) {
          (n = fn(n) ? n : Fi(n)), (o = o && !c ? Re(o) : 0);
          var h = n.length;
          return (
            o < 0 && (o = Rt(h + o, 0)),
            Kl(n) ? o <= h && n.indexOf(i, o) > -1 : !!h && qi(n, i, o) > -1
          );
        }
        var Ry = Ue(function (n, i, o) {
            var c = -1,
              h = typeof i == "function",
              p = fn(n) ? O(n.length) : [];
            return (
              Fr(n, function (w) {
                p[++c] = h ? vn(i, w, o) : ya(w, i, o);
              }),
              p
            );
          }),
          Oy = $l(function (n, i, o) {
            fr(n, o, i);
          });
        function zl(n, i) {
          var o = Ee(n) ? _t : qd;
          return o(n, Se(i, 3));
        }
        function Ly(n, i, o, c) {
          return n == null
            ? []
            : (Ee(i) || (i = i == null ? [] : [i]),
              (o = c ? r : o),
              Ee(o) || (o = o == null ? [] : [o]),
              Ed(n, i, o));
        }
        var Ny = $l(
          function (n, i, o) {
            n[o ? 0 : 1].push(i);
          },
          function () {
            return [[], []];
          }
        );
        function By(n, i, o) {
          var c = Ee(n) ? os : nd,
            h = arguments.length < 3;
          return c(n, Se(i, 4), o, h, Fr);
        }
        function Fy(n, i, o) {
          var c = Ee(n) ? Jm : nd,
            h = arguments.length < 3;
          return c(n, Se(i, 4), o, h, wd);
        }
        function Uy(n, i) {
          var o = Ee(n) ? Or : Sd;
          return o(n, Hl(Se(i, 3)));
        }
        function Vy(n) {
          var i = Ee(n) ? pd : $p;
          return i(n);
        }
        function zy(n, i, o) {
          (o ? ln(n, i, o) : i === r) ? (i = 1) : (i = Re(i));
          var c = Ee(n) ? dp : Rp;
          return c(n, i);
        }
        function Wy(n) {
          var i = Ee(n) ? fp : Lp;
          return i(n);
        }
        function Yy(n) {
          if (n == null) return 0;
          if (fn(n)) return Kl(n) ? Pi(n) : n.length;
          var i = Zt(n);
          return i == qt || i == G ? n.size : Ms(n).length;
        }
        function Hy(n, i, o) {
          var c = Ee(n) ? ss : Np;
          return o && ln(n, i, o) && (i = r), c(n, Se(i, 3));
        }
        var Gy = Ue(function (n, i) {
            if (n == null) return [];
            var o = i.length;
            return (
              o > 1 && ln(n, i[0], i[1])
                ? (i = [])
                : o > 2 && ln(i[0], i[1], i[2]) && (i = [i[0]]),
              Ed(n, Vt(i, 1), [])
            );
          }),
          Wl =
            Dv ||
            function () {
              return Ut.Date.now();
            };
        function Ky(n, i) {
          if (typeof i != "function") throw new Pn(u);
          return (
            (n = Re(n)),
            function () {
              if (--n < 1) return i.apply(this, arguments);
            }
          );
        }
        function Df(n, i, o) {
          return (
            (i = o ? r : i),
            (i = n && i == null ? n.length : i),
            hr(n, z, r, r, r, r, i)
          );
        }
        function qf(n, i) {
          var o;
          if (typeof i != "function") throw new Pn(u);
          return (
            (n = Re(n)),
            function () {
              return (
                --n > 0 && (o = i.apply(this, arguments)), n <= 1 && (i = r), o
              );
            }
          );
        }
        var js = Ue(function (n, i, o) {
            var c = L;
            if (o.length) {
              var h = Nr(o, Ni(js));
              c |= N;
            }
            return hr(n, c, i, o, h);
          }),
          xf = Ue(function (n, i, o) {
            var c = L | F;
            if (o.length) {
              var h = Nr(o, Ni(xf));
              c |= N;
            }
            return hr(i, c, n, o, h);
          });
        function Pf(n, i, o) {
          i = o ? r : i;
          var c = hr(n, D, r, r, r, r, r, i);
          return (c.placeholder = Pf.placeholder), c;
        }
        function Af(n, i, o) {
          i = o ? r : i;
          var c = hr(n, A, r, r, r, r, r, i);
          return (c.placeholder = Af.placeholder), c;
        }
        function Ef(n, i, o) {
          var c,
            h,
            p,
            w,
            k,
            x,
            U = 0,
            V = !1,
            Y = !1,
            ne = !0;
          if (typeof n != "function") throw new Pn(u);
          (i = Rn(i) || 0),
            Ct(o) &&
              ((V = !!o.leading),
              (Y = "maxWait" in o),
              (p = Y ? Rt(Rn(o.maxWait) || 0, i) : p),
              (ne = "trailing" in o ? !!o.trailing : ne));
          function ve(At) {
            var Wn = c,
              yr = h;
            return (c = h = r), (U = At), (w = n.apply(yr, Wn)), w;
          }
          function ke(At) {
            return (U = At), (k = ka(Ye, i)), V ? ve(At) : w;
          }
          function Le(At) {
            var Wn = At - x,
              yr = At - U,
              Zf = i - Wn;
            return Y ? jt(Zf, p - yr) : Zf;
          }
          function Ce(At) {
            var Wn = At - x,
              yr = At - U;
            return x === r || Wn >= i || Wn < 0 || (Y && yr >= p);
          }
          function Ye() {
            var At = Wl();
            if (Ce(At)) return Qe(At);
            k = ka(Ye, Le(At));
          }
          function Qe(At) {
            return (k = r), ne && c ? ve(At) : ((c = h = r), w);
          }
          function bn() {
            k !== r && Ud(k), (U = 0), (c = x = h = k = r);
          }
          function on() {
            return k === r ? w : Qe(Wl());
          }
          function wn() {
            var At = Wl(),
              Wn = Ce(At);
            if (((c = arguments), (h = this), (x = At), Wn)) {
              if (k === r) return ke(x);
              if (Y) return Ud(k), (k = ka(Ye, i)), ve(x);
            }
            return k === r && (k = ka(Ye, i)), w;
          }
          return (wn.cancel = bn), (wn.flush = on), wn;
        }
        var Qy = Ue(function (n, i) {
            return bd(n, 1, i);
          }),
          jy = Ue(function (n, i, o) {
            return bd(n, Rn(i) || 0, o);
          });
        function Zy(n) {
          return hr(n, pe);
        }
        function Yl(n, i) {
          if (typeof n != "function" || (i != null && typeof i != "function"))
            throw new Pn(u);
          var o = function () {
            var c = arguments,
              h = i ? i.apply(this, c) : c[0],
              p = o.cache;
            if (p.has(h)) return p.get(h);
            var w = n.apply(this, c);
            return (o.cache = p.set(h, w) || p), w;
          };
          return (o.cache = new (Yl.Cache || dr)()), o;
        }
        Yl.Cache = dr;
        function Hl(n) {
          if (typeof n != "function") throw new Pn(u);
          return function () {
            var i = arguments;
            switch (i.length) {
              case 0:
                return !n.call(this);
              case 1:
                return !n.call(this, i[0]);
              case 2:
                return !n.call(this, i[0], i[1]);
              case 3:
                return !n.call(this, i[0], i[1], i[2]);
            }
            return !n.apply(this, i);
          };
        }
        function Jy(n) {
          return qf(2, n);
        }
        var Xy = Bp(function (n, i) {
            i =
              i.length == 1 && Ee(i[0])
                ? _t(i[0], pn(Se()))
                : _t(Vt(i, 1), pn(Se()));
            var o = i.length;
            return Ue(function (c) {
              for (var h = -1, p = jt(c.length, o); ++h < p; )
                c[h] = i[h].call(this, c[h]);
              return vn(n, this, c);
            });
          }),
          Zs = Ue(function (n, i) {
            var o = Nr(i, Ni(Zs));
            return hr(n, N, r, i, o);
          }),
          If = Ue(function (n, i) {
            var o = Nr(i, Ni(If));
            return hr(n, J, r, i, o);
          }),
          e1 = gr(function (n, i) {
            return hr(n, H, r, r, r, i);
          });
        function t1(n, i) {
          if (typeof n != "function") throw new Pn(u);
          return (i = i === r ? i : Re(i)), Ue(n, i);
        }
        function n1(n, i) {
          if (typeof n != "function") throw new Pn(u);
          return (
            (i = i == null ? 0 : Rt(Re(i), 0)),
            Ue(function (o) {
              var c = o[i],
                h = zr(o, 0, i);
              return c && Lr(h, c), vn(n, this, h);
            })
          );
        }
        function r1(n, i, o) {
          var c = !0,
            h = !0;
          if (typeof n != "function") throw new Pn(u);
          return (
            Ct(o) &&
              ((c = "leading" in o ? !!o.leading : c),
              (h = "trailing" in o ? !!o.trailing : h)),
            Ef(n, i, { leading: c, maxWait: i, trailing: h })
          );
        }
        function i1(n) {
          return Df(n, 1);
        }
        function a1(n, i) {
          return Zs(Rs(i), n);
        }
        function l1() {
          if (!arguments.length) return [];
          var n = arguments[0];
          return Ee(n) ? n : [n];
        }
        function o1(n) {
          return En(n, _);
        }
        function s1(n, i) {
          return (i = typeof i == "function" ? i : r), En(n, _, i);
        }
        function u1(n) {
          return En(n, T | _);
        }
        function c1(n, i) {
          return (i = typeof i == "function" ? i : r), En(n, T | _, i);
        }
        function d1(n, i) {
          return i == null || _d(n, i, Bt(i));
        }
        function zn(n, i) {
          return n === i || (n !== n && i !== i);
        }
        var f1 = Nl(ks),
          h1 = Nl(function (n, i) {
            return n >= i;
          }),
          ci = Td(
            (function () {
              return arguments;
            })()
          )
            ? Td
            : function (n) {
                return Tt(n) && ot.call(n, "callee") && !dd.call(n, "callee");
              },
          Ee = O.isArray,
          g1 = Hc ? pn(Hc) : Sp;
        function fn(n) {
          return n != null && Gl(n.length) && !vr(n);
        }
        function Pt(n) {
          return Tt(n) && fn(n);
        }
        function m1(n) {
          return n === !0 || n === !1 || (Tt(n) && an(n) == ft);
        }
        var Wr = xv || su,
          v1 = Gc ? pn(Gc) : kp;
        function p1(n) {
          return Tt(n) && n.nodeType === 1 && !Ca(n);
        }
        function y1(n) {
          if (n == null) return !0;
          if (
            fn(n) &&
            (Ee(n) ||
              typeof n == "string" ||
              typeof n.splice == "function" ||
              Wr(n) ||
              Bi(n) ||
              ci(n))
          )
            return !n.length;
          var i = Zt(n);
          if (i == qt || i == G) return !n.size;
          if (Sa(n)) return !Ms(n).length;
          for (var o in n) if (ot.call(n, o)) return !1;
          return !0;
        }
        function _1(n, i) {
          return _a(n, i);
        }
        function b1(n, i, o) {
          o = typeof o == "function" ? o : r;
          var c = o ? o(n, i) : r;
          return c === r ? _a(n, i, r, o) : !!c;
        }
        function Js(n) {
          if (!Tt(n)) return !1;
          var i = an(n);
          return (
            i == nn ||
            i == wt ||
            (typeof n.message == "string" &&
              typeof n.name == "string" &&
              !Ca(n))
          );
        }
        function w1(n) {
          return typeof n == "number" && hd(n);
        }
        function vr(n) {
          if (!Ct(n)) return !1;
          var i = an(n);
          return i == un || i == rn || i == Me || i == Pr;
        }
        function $f(n) {
          return typeof n == "number" && n == Re(n);
        }
        function Gl(n) {
          return typeof n == "number" && n > -1 && n % 1 == 0 && n <= me;
        }
        function Ct(n) {
          var i = typeof n;
          return n != null && (i == "object" || i == "function");
        }
        function Tt(n) {
          return n != null && typeof n == "object";
        }
        var Rf = Kc ? pn(Kc) : Tp;
        function S1(n, i) {
          return n === i || Ts(n, i, Vs(i));
        }
        function k1(n, i, o) {
          return (o = typeof o == "function" ? o : r), Ts(n, i, Vs(i), o);
        }
        function C1(n) {
          return Of(n) && n != +n;
        }
        function T1(n) {
          if (s0(n)) throw new Ae(s);
          return Md(n);
        }
        function M1(n) {
          return n === null;
        }
        function D1(n) {
          return n == null;
        }
        function Of(n) {
          return typeof n == "number" || (Tt(n) && an(n) == Gt);
        }
        function Ca(n) {
          if (!Tt(n) || an(n) != Kt) return !1;
          var i = bl(n);
          if (i === null) return !0;
          var o = ot.call(i, "constructor") && i.constructor;
          return typeof o == "function" && o instanceof o && vl.call(o) == kv;
        }
        var Xs = Qc ? pn(Qc) : Mp;
        function q1(n) {
          return $f(n) && n >= -me && n <= me;
        }
        var Lf = jc ? pn(jc) : Dp;
        function Kl(n) {
          return typeof n == "string" || (!Ee(n) && Tt(n) && an(n) == de);
        }
        function _n(n) {
          return typeof n == "symbol" || (Tt(n) && an(n) == qe);
        }
        var Bi = Zc ? pn(Zc) : qp;
        function x1(n) {
          return n === r;
        }
        function P1(n) {
          return Tt(n) && Zt(n) == it;
        }
        function A1(n) {
          return Tt(n) && an(n) == Ze;
        }
        var E1 = Nl(Ds),
          I1 = Nl(function (n, i) {
            return n <= i;
          });
        function Nf(n) {
          if (!n) return [];
          if (fn(n)) return Kl(n) ? Un(n) : dn(n);
          if (da && n[da]) return dv(n[da]());
          var i = Zt(n),
            o = i == qt ? gs : i == G ? hl : Fi;
          return o(n);
        }
        function pr(n) {
          if (!n) return n === 0 ? n : 0;
          if (((n = Rn(n)), n === K || n === -K)) {
            var i = n < 0 ? -1 : 1;
            return i * rt;
          }
          return n === n ? n : 0;
        }
        function Re(n) {
          var i = pr(n),
            o = i % 1;
          return i === i ? (o ? i - o : i) : 0;
        }
        function Bf(n) {
          return n ? li(Re(n), 0, Z) : 0;
        }
        function Rn(n) {
          if (typeof n == "number") return n;
          if (_n(n)) return X;
          if (Ct(n)) {
            var i = typeof n.valueOf == "function" ? n.valueOf() : n;
            n = Ct(i) ? i + "" : i;
          }
          if (typeof n != "string") return n === 0 ? n : +n;
          n = rd(n);
          var o = ll.test(n);
          return o || sl.test(n)
            ? Km(n.slice(2), o ? 2 : 8)
            : Jo.test(n)
            ? X
            : +n;
        }
        function Ff(n) {
          return er(n, hn(n));
        }
        function $1(n) {
          return n ? li(Re(n), -me, me) : n === 0 ? n : 0;
        }
        function at(n) {
          return n == null ? "" : yn(n);
        }
        var R1 = Oi(function (n, i) {
            if (Sa(i) || fn(i)) {
              er(i, Bt(i), n);
              return;
            }
            for (var o in i) ot.call(i, o) && va(n, o, i[o]);
          }),
          Uf = Oi(function (n, i) {
            er(i, hn(i), n);
          }),
          Ql = Oi(function (n, i, o, c) {
            er(i, hn(i), n, c);
          }),
          O1 = Oi(function (n, i, o, c) {
            er(i, Bt(i), n, c);
          }),
          L1 = gr(bs);
        function N1(n, i) {
          var o = Ri(n);
          return i == null ? o : yd(o, i);
        }
        var B1 = Ue(function (n, i) {
            n = dt(n);
            var o = -1,
              c = i.length,
              h = c > 2 ? i[2] : r;
            for (h && ln(i[0], i[1], h) && (c = 1); ++o < c; )
              for (var p = i[o], w = hn(p), k = -1, x = w.length; ++k < x; ) {
                var U = w[k],
                  V = n[U];
                (V === r || (zn(V, Ei[U]) && !ot.call(n, U))) && (n[U] = p[U]);
              }
            return n;
          }),
          F1 = Ue(function (n) {
            return n.push(r, rf), vn(Vf, r, n);
          });
        function U1(n, i) {
          return Xc(n, Se(i, 3), Xn);
        }
        function V1(n, i) {
          return Xc(n, Se(i, 3), Ss);
        }
        function z1(n, i) {
          return n == null ? n : ws(n, Se(i, 3), hn);
        }
        function W1(n, i) {
          return n == null ? n : kd(n, Se(i, 3), hn);
        }
        function Y1(n, i) {
          return n && Xn(n, Se(i, 3));
        }
        function H1(n, i) {
          return n && Ss(n, Se(i, 3));
        }
        function G1(n) {
          return n == null ? [] : Pl(n, Bt(n));
        }
        function K1(n) {
          return n == null ? [] : Pl(n, hn(n));
        }
        function eu(n, i, o) {
          var c = n == null ? r : oi(n, i);
          return c === r ? o : c;
        }
        function Q1(n, i) {
          return n != null && of(n, i, yp);
        }
        function tu(n, i) {
          return n != null && of(n, i, _p);
        }
        var j1 = Jd(function (n, i, o) {
            i != null && typeof i.toString != "function" && (i = pl.call(i)),
              (n[i] = o);
          }, ru(gn)),
          Z1 = Jd(function (n, i, o) {
            i != null && typeof i.toString != "function" && (i = pl.call(i)),
              ot.call(n, i) ? n[i].push(o) : (n[i] = [o]);
          }, Se),
          J1 = Ue(ya);
        function Bt(n) {
          return fn(n) ? vd(n) : Ms(n);
        }
        function hn(n) {
          return fn(n) ? vd(n, !0) : xp(n);
        }
        function X1(n, i) {
          var o = {};
          return (
            (i = Se(i, 3)),
            Xn(n, function (c, h, p) {
              fr(o, i(c, h, p), c);
            }),
            o
          );
        }
        function e_(n, i) {
          var o = {};
          return (
            (i = Se(i, 3)),
            Xn(n, function (c, h, p) {
              fr(o, h, i(c, h, p));
            }),
            o
          );
        }
        var t_ = Oi(function (n, i, o) {
            Al(n, i, o);
          }),
          Vf = Oi(function (n, i, o, c) {
            Al(n, i, o, c);
          }),
          n_ = gr(function (n, i) {
            var o = {};
            if (n == null) return o;
            var c = !1;
            (i = _t(i, function (p) {
              return (p = Vr(p, n)), c || (c = p.length > 1), p;
            })),
              er(n, Fs(n), o),
              c && (o = En(o, T | M | _, jp));
            for (var h = i.length; h--; ) Es(o, i[h]);
            return o;
          });
        function r_(n, i) {
          return zf(n, Hl(Se(i)));
        }
        var i_ = gr(function (n, i) {
          return n == null ? {} : Ap(n, i);
        });
        function zf(n, i) {
          if (n == null) return {};
          var o = _t(Fs(n), function (c) {
            return [c];
          });
          return (
            (i = Se(i)),
            Id(n, o, function (c, h) {
              return i(c, h[0]);
            })
          );
        }
        function a_(n, i, o) {
          i = Vr(i, n);
          var c = -1,
            h = i.length;
          for (h || ((h = 1), (n = r)); ++c < h; ) {
            var p = n == null ? r : n[tr(i[c])];
            p === r && ((c = h), (p = o)), (n = vr(p) ? p.call(n) : p);
          }
          return n;
        }
        function l_(n, i, o) {
          return n == null ? n : ba(n, i, o);
        }
        function o_(n, i, o, c) {
          return (
            (c = typeof c == "function" ? c : r), n == null ? n : ba(n, i, o, c)
          );
        }
        var Wf = tf(Bt),
          Yf = tf(hn);
        function s_(n, i, o) {
          var c = Ee(n),
            h = c || Wr(n) || Bi(n);
          if (((i = Se(i, 4)), o == null)) {
            var p = n && n.constructor;
            h
              ? (o = c ? new p() : [])
              : Ct(n)
              ? (o = vr(p) ? Ri(bl(n)) : {})
              : (o = {});
          }
          return (
            (h ? xn : Xn)(n, function (w, k, x) {
              return i(o, w, k, x);
            }),
            o
          );
        }
        function u_(n, i) {
          return n == null ? !0 : Es(n, i);
        }
        function c_(n, i, o) {
          return n == null ? n : Nd(n, i, Rs(o));
        }
        function d_(n, i, o, c) {
          return (
            (c = typeof c == "function" ? c : r),
            n == null ? n : Nd(n, i, Rs(o), c)
          );
        }
        function Fi(n) {
          return n == null ? [] : hs(n, Bt(n));
        }
        function f_(n) {
          return n == null ? [] : hs(n, hn(n));
        }
        function h_(n, i, o) {
          return (
            o === r && ((o = i), (i = r)),
            o !== r && ((o = Rn(o)), (o = o === o ? o : 0)),
            i !== r && ((i = Rn(i)), (i = i === i ? i : 0)),
            li(Rn(n), i, o)
          );
        }
        function g_(n, i, o) {
          return (
            (i = pr(i)),
            o === r ? ((o = i), (i = 0)) : (o = pr(o)),
            (n = Rn(n)),
            bp(n, i, o)
          );
        }
        function m_(n, i, o) {
          if (
            (o && typeof o != "boolean" && ln(n, i, o) && (i = o = r),
            o === r &&
              (typeof i == "boolean"
                ? ((o = i), (i = r))
                : typeof n == "boolean" && ((o = n), (n = r))),
            n === r && i === r
              ? ((n = 0), (i = 1))
              : ((n = pr(n)), i === r ? ((i = n), (n = 0)) : (i = pr(i))),
            n > i)
          ) {
            var c = n;
            (n = i), (i = c);
          }
          if (o || n % 1 || i % 1) {
            var h = gd();
            return jt(n + h * (i - n + Gm("1e-" + ((h + "").length - 1))), i);
          }
          return xs(n, i);
        }
        var v_ = Li(function (n, i, o) {
          return (i = i.toLowerCase()), n + (o ? Hf(i) : i);
        });
        function Hf(n) {
          return nu(at(n).toLowerCase());
        }
        function Gf(n) {
          return (n = at(n)), n && n.replace(C, lv).replace(Lm, "");
        }
        function p_(n, i, o) {
          (n = at(n)), (i = yn(i));
          var c = n.length;
          o = o === r ? c : li(Re(o), 0, c);
          var h = o;
          return (o -= i.length), o >= 0 && n.slice(o, h) == i;
        }
        function y_(n) {
          return (n = at(n)), n && Wo.test(n) ? n.replace(rl, ov) : n;
        }
        function __(n) {
          return (n = at(n)), n && Go.test(n) ? n.replace(sa, "\\$&") : n;
        }
        var b_ = Li(function (n, i, o) {
            return n + (o ? "-" : "") + i.toLowerCase();
          }),
          w_ = Li(function (n, i, o) {
            return n + (o ? " " : "") + i.toLowerCase();
          }),
          S_ = Qd("toLowerCase");
        function k_(n, i, o) {
          (n = at(n)), (i = Re(i));
          var c = i ? Pi(n) : 0;
          if (!i || c >= i) return n;
          var h = (i - c) / 2;
          return Ll(Cl(h), o) + n + Ll(kl(h), o);
        }
        function C_(n, i, o) {
          (n = at(n)), (i = Re(i));
          var c = i ? Pi(n) : 0;
          return i && c < i ? n + Ll(i - c, o) : n;
        }
        function T_(n, i, o) {
          (n = at(n)), (i = Re(i));
          var c = i ? Pi(n) : 0;
          return i && c < i ? Ll(i - c, o) + n : n;
        }
        function M_(n, i, o) {
          return (
            o || i == null ? (i = 0) : i && (i = +i),
            Iv(at(n).replace(ua, ""), i || 0)
          );
        }
        function D_(n, i, o) {
          return (
            (o ? ln(n, i, o) : i === r) ? (i = 1) : (i = Re(i)), Ps(at(n), i)
          );
        }
        function q_() {
          var n = arguments,
            i = at(n[0]);
          return n.length < 3 ? i : i.replace(n[1], n[2]);
        }
        var x_ = Li(function (n, i, o) {
          return n + (o ? "_" : "") + i.toLowerCase();
        });
        function P_(n, i, o) {
          return (
            o && typeof o != "number" && ln(n, i, o) && (i = o = r),
            (o = o === r ? Z : o >>> 0),
            o
              ? ((n = at(n)),
                n &&
                (typeof i == "string" || (i != null && !Xs(i))) &&
                ((i = yn(i)), !i && xi(n))
                  ? zr(Un(n), 0, o)
                  : n.split(i, o))
              : []
          );
        }
        var A_ = Li(function (n, i, o) {
          return n + (o ? " " : "") + nu(i);
        });
        function E_(n, i, o) {
          return (
            (n = at(n)),
            (o = o == null ? 0 : li(Re(o), 0, n.length)),
            (i = yn(i)),
            n.slice(o, o + i.length) == i
          );
        }
        function I_(n, i, o) {
          var c = m.templateSettings;
          o && ln(n, i, o) && (i = r), (n = at(n)), (i = Ql({}, i, c, nf));
          var h = Ql({}, i.imports, c.imports, nf),
            p = Bt(h),
            w = hs(h, p),
            k,
            x,
            U = 0,
            V = i.interpolate || le,
            Y = "__p += '",
            ne = ms(
              (i.escape || le).source +
                "|" +
                V.source +
                "|" +
                (V === Ar ? Rr : le).source +
                "|" +
                (i.evaluate || le).source +
                "|$",
              "g"
            ),
            ve =
              "//# sourceURL=" +
              (ot.call(i, "sourceURL")
                ? (i.sourceURL + "").replace(/\s/g, " ")
                : "lodash.templateSources[" + ++Vm + "]") +
              `
`;
          n.replace(ne, function (Ce, Ye, Qe, bn, on, wn) {
            return (
              Qe || (Qe = bn),
              (Y += n.slice(U, wn).replace(ie, sv)),
              Ye &&
                ((k = !0),
                (Y +=
                  `' +
__e(` +
                  Ye +
                  `) +
'`)),
              on &&
                ((x = !0),
                (Y +=
                  `';
` +
                  on +
                  `;
__p += '`)),
              Qe &&
                (Y +=
                  `' +
((__t = (` +
                  Qe +
                  `)) == null ? '' : __t) +
'`),
              (U = wn + Ce.length),
              Ce
            );
          }),
            (Y += `';
`);
          var ke = ot.call(i, "variable") && i.variable;
          if (!ke)
            Y =
              `with (obj) {
` +
              Y +
              `
}
`;
          else if ($r.test(ke)) throw new Ae(d);
          (Y = (x ? Y.replace(Xa, "") : Y)
            .replace(el, "$1")
            .replace(tl, "$1;")),
            (Y =
              "function(" +
              (ke || "obj") +
              `) {
` +
              (ke
                ? ""
                : `obj || (obj = {});
`) +
              "var __t, __p = ''" +
              (k ? ", __e = _.escape" : "") +
              (x
                ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
`
                : `;
`) +
              Y +
              `return __p
}`);
          var Le = Qf(function () {
            return nt(p, ve + "return " + Y).apply(r, w);
          });
          if (((Le.source = Y), Js(Le))) throw Le;
          return Le;
        }
        function $_(n) {
          return at(n).toLowerCase();
        }
        function R_(n) {
          return at(n).toUpperCase();
        }
        function O_(n, i, o) {
          if (((n = at(n)), n && (o || i === r))) return rd(n);
          if (!n || !(i = yn(i))) return n;
          var c = Un(n),
            h = Un(i),
            p = id(c, h),
            w = ad(c, h) + 1;
          return zr(c, p, w).join("");
        }
        function L_(n, i, o) {
          if (((n = at(n)), n && (o || i === r))) return n.slice(0, od(n) + 1);
          if (!n || !(i = yn(i))) return n;
          var c = Un(n),
            h = ad(c, Un(i)) + 1;
          return zr(c, 0, h).join("");
        }
        function N_(n, i, o) {
          if (((n = at(n)), n && (o || i === r))) return n.replace(ua, "");
          if (!n || !(i = yn(i))) return n;
          var c = Un(n),
            h = id(c, Un(i));
          return zr(c, h).join("");
        }
        function B_(n, i) {
          var o = _e,
            c = Pe;
          if (Ct(i)) {
            var h = "separator" in i ? i.separator : h;
            (o = "length" in i ? Re(i.length) : o),
              (c = "omission" in i ? yn(i.omission) : c);
          }
          n = at(n);
          var p = n.length;
          if (xi(n)) {
            var w = Un(n);
            p = w.length;
          }
          if (o >= p) return n;
          var k = o - Pi(c);
          if (k < 1) return c;
          var x = w ? zr(w, 0, k).join("") : n.slice(0, k);
          if (h === r) return x + c;
          if ((w && (k += x.length - k), Xs(h))) {
            if (n.slice(k).search(h)) {
              var U,
                V = x;
              for (
                h.global || (h = ms(h.source, at(Ti.exec(h)) + "g")),
                  h.lastIndex = 0;
                (U = h.exec(V));

              )
                var Y = U.index;
              x = x.slice(0, Y === r ? k : Y);
            }
          } else if (n.indexOf(yn(h), k) != k) {
            var ne = x.lastIndexOf(h);
            ne > -1 && (x = x.slice(0, ne));
          }
          return x + c;
        }
        function F_(n) {
          return (n = at(n)), n && il.test(n) ? n.replace(nl, mv) : n;
        }
        var U_ = Li(function (n, i, o) {
            return n + (o ? " " : "") + i.toUpperCase();
          }),
          nu = Qd("toUpperCase");
        function Kf(n, i, o) {
          return (
            (n = at(n)),
            (i = o ? r : i),
            i === r ? (cv(n) ? yv(n) : tv(n)) : n.match(i) || []
          );
        }
        var Qf = Ue(function (n, i) {
            try {
              return vn(n, r, i);
            } catch (o) {
              return Js(o) ? o : new Ae(o);
            }
          }),
          V_ = gr(function (n, i) {
            return (
              xn(i, function (o) {
                (o = tr(o)), fr(n, o, js(n[o], n));
              }),
              n
            );
          });
        function z_(n) {
          var i = n == null ? 0 : n.length,
            o = Se();
          return (
            (n = i
              ? _t(n, function (c) {
                  if (typeof c[1] != "function") throw new Pn(u);
                  return [o(c[0]), c[1]];
                })
              : []),
            Ue(function (c) {
              for (var h = -1; ++h < i; ) {
                var p = n[h];
                if (vn(p[0], this, c)) return vn(p[1], this, c);
              }
            })
          );
        }
        function W_(n) {
          return mp(En(n, T));
        }
        function ru(n) {
          return function () {
            return n;
          };
        }
        function Y_(n, i) {
          return n == null || n !== n ? i : n;
        }
        var H_ = Zd(),
          G_ = Zd(!0);
        function gn(n) {
          return n;
        }
        function iu(n) {
          return Dd(typeof n == "function" ? n : En(n, T));
        }
        function K_(n) {
          return xd(En(n, T));
        }
        function Q_(n, i) {
          return Pd(n, En(i, T));
        }
        var j_ = Ue(function (n, i) {
            return function (o) {
              return ya(o, n, i);
            };
          }),
          Z_ = Ue(function (n, i) {
            return function (o) {
              return ya(n, o, i);
            };
          });
        function au(n, i, o) {
          var c = Bt(i),
            h = Pl(i, c);
          o == null &&
            !(Ct(i) && (h.length || !c.length)) &&
            ((o = i), (i = n), (n = this), (h = Pl(i, Bt(i))));
          var p = !(Ct(o) && "chain" in o) || !!o.chain,
            w = vr(n);
          return (
            xn(h, function (k) {
              var x = i[k];
              (n[k] = x),
                w &&
                  (n.prototype[k] = function () {
                    var U = this.__chain__;
                    if (p || U) {
                      var V = n(this.__wrapped__),
                        Y = (V.__actions__ = dn(this.__actions__));
                      return (
                        Y.push({ func: x, args: arguments, thisArg: n }),
                        (V.__chain__ = U),
                        V
                      );
                    }
                    return x.apply(n, Lr([this.value()], arguments));
                  });
            }),
            n
          );
        }
        function J_() {
          return Ut._ === this && (Ut._ = Cv), this;
        }
        function lu() {}
        function X_(n) {
          return (
            (n = Re(n)),
            Ue(function (i) {
              return Ad(i, n);
            })
          );
        }
        var eb = Ls(_t),
          tb = Ls(Jc),
          nb = Ls(ss);
        function jf(n) {
          return Ws(n) ? us(tr(n)) : Ep(n);
        }
        function rb(n) {
          return function (i) {
            return n == null ? r : oi(n, i);
          };
        }
        var ib = Xd(),
          ab = Xd(!0);
        function ou() {
          return [];
        }
        function su() {
          return !1;
        }
        function lb() {
          return {};
        }
        function ob() {
          return "";
        }
        function sb() {
          return !0;
        }
        function ub(n, i) {
          if (((n = Re(n)), n < 1 || n > me)) return [];
          var o = Z,
            c = jt(n, Z);
          (i = Se(i)), (n -= Z);
          for (var h = fs(c, i); ++o < n; ) i(o);
          return h;
        }
        function cb(n) {
          return Ee(n) ? _t(n, tr) : _n(n) ? [n] : dn(vf(at(n)));
        }
        function db(n) {
          var i = ++Sv;
          return at(n) + i;
        }
        var fb = Ol(function (n, i) {
            return n + i;
          }, 0),
          hb = Ns("ceil"),
          gb = Ol(function (n, i) {
            return n / i;
          }, 1),
          mb = Ns("floor");
        function vb(n) {
          return n && n.length ? xl(n, gn, ks) : r;
        }
        function pb(n, i) {
          return n && n.length ? xl(n, Se(i, 2), ks) : r;
        }
        function yb(n) {
          return td(n, gn);
        }
        function _b(n, i) {
          return td(n, Se(i, 2));
        }
        function bb(n) {
          return n && n.length ? xl(n, gn, Ds) : r;
        }
        function wb(n, i) {
          return n && n.length ? xl(n, Se(i, 2), Ds) : r;
        }
        var Sb = Ol(function (n, i) {
            return n * i;
          }, 1),
          kb = Ns("round"),
          Cb = Ol(function (n, i) {
            return n - i;
          }, 0);
        function Tb(n) {
          return n && n.length ? ds(n, gn) : 0;
        }
        function Mb(n, i) {
          return n && n.length ? ds(n, Se(i, 2)) : 0;
        }
        return (
          (m.after = Ky),
          (m.ary = Df),
          (m.assign = R1),
          (m.assignIn = Uf),
          (m.assignInWith = Ql),
          (m.assignWith = O1),
          (m.at = L1),
          (m.before = qf),
          (m.bind = js),
          (m.bindAll = V_),
          (m.bindKey = xf),
          (m.castArray = l1),
          (m.chain = Cf),
          (m.chunk = m0),
          (m.compact = v0),
          (m.concat = p0),
          (m.cond = z_),
          (m.conforms = W_),
          (m.constant = ru),
          (m.countBy = Ty),
          (m.create = N1),
          (m.curry = Pf),
          (m.curryRight = Af),
          (m.debounce = Ef),
          (m.defaults = B1),
          (m.defaultsDeep = F1),
          (m.defer = Qy),
          (m.delay = jy),
          (m.difference = y0),
          (m.differenceBy = _0),
          (m.differenceWith = b0),
          (m.drop = w0),
          (m.dropRight = S0),
          (m.dropRightWhile = k0),
          (m.dropWhile = C0),
          (m.fill = T0),
          (m.filter = Dy),
          (m.flatMap = Py),
          (m.flatMapDeep = Ay),
          (m.flatMapDepth = Ey),
          (m.flatten = bf),
          (m.flattenDeep = M0),
          (m.flattenDepth = D0),
          (m.flip = Zy),
          (m.flow = H_),
          (m.flowRight = G_),
          (m.fromPairs = q0),
          (m.functions = G1),
          (m.functionsIn = K1),
          (m.groupBy = Iy),
          (m.initial = P0),
          (m.intersection = A0),
          (m.intersectionBy = E0),
          (m.intersectionWith = I0),
          (m.invert = j1),
          (m.invertBy = Z1),
          (m.invokeMap = Ry),
          (m.iteratee = iu),
          (m.keyBy = Oy),
          (m.keys = Bt),
          (m.keysIn = hn),
          (m.map = zl),
          (m.mapKeys = X1),
          (m.mapValues = e_),
          (m.matches = K_),
          (m.matchesProperty = Q_),
          (m.memoize = Yl),
          (m.merge = t_),
          (m.mergeWith = Vf),
          (m.method = j_),
          (m.methodOf = Z_),
          (m.mixin = au),
          (m.negate = Hl),
          (m.nthArg = X_),
          (m.omit = n_),
          (m.omitBy = r_),
          (m.once = Jy),
          (m.orderBy = Ly),
          (m.over = eb),
          (m.overArgs = Xy),
          (m.overEvery = tb),
          (m.overSome = nb),
          (m.partial = Zs),
          (m.partialRight = If),
          (m.partition = Ny),
          (m.pick = i_),
          (m.pickBy = zf),
          (m.property = jf),
          (m.propertyOf = rb),
          (m.pull = L0),
          (m.pullAll = Sf),
          (m.pullAllBy = N0),
          (m.pullAllWith = B0),
          (m.pullAt = F0),
          (m.range = ib),
          (m.rangeRight = ab),
          (m.rearg = e1),
          (m.reject = Uy),
          (m.remove = U0),
          (m.rest = t1),
          (m.reverse = Ks),
          (m.sampleSize = zy),
          (m.set = l_),
          (m.setWith = o_),
          (m.shuffle = Wy),
          (m.slice = V0),
          (m.sortBy = Gy),
          (m.sortedUniq = Q0),
          (m.sortedUniqBy = j0),
          (m.split = P_),
          (m.spread = n1),
          (m.tail = Z0),
          (m.take = J0),
          (m.takeRight = X0),
          (m.takeRightWhile = ey),
          (m.takeWhile = ty),
          (m.tap = vy),
          (m.throttle = r1),
          (m.thru = Vl),
          (m.toArray = Nf),
          (m.toPairs = Wf),
          (m.toPairsIn = Yf),
          (m.toPath = cb),
          (m.toPlainObject = Ff),
          (m.transform = s_),
          (m.unary = i1),
          (m.union = ny),
          (m.unionBy = ry),
          (m.unionWith = iy),
          (m.uniq = ay),
          (m.uniqBy = ly),
          (m.uniqWith = oy),
          (m.unset = u_),
          (m.unzip = Qs),
          (m.unzipWith = kf),
          (m.update = c_),
          (m.updateWith = d_),
          (m.values = Fi),
          (m.valuesIn = f_),
          (m.without = sy),
          (m.words = Kf),
          (m.wrap = a1),
          (m.xor = uy),
          (m.xorBy = cy),
          (m.xorWith = dy),
          (m.zip = fy),
          (m.zipObject = hy),
          (m.zipObjectDeep = gy),
          (m.zipWith = my),
          (m.entries = Wf),
          (m.entriesIn = Yf),
          (m.extend = Uf),
          (m.extendWith = Ql),
          au(m, m),
          (m.add = fb),
          (m.attempt = Qf),
          (m.camelCase = v_),
          (m.capitalize = Hf),
          (m.ceil = hb),
          (m.clamp = h_),
          (m.clone = o1),
          (m.cloneDeep = u1),
          (m.cloneDeepWith = c1),
          (m.cloneWith = s1),
          (m.conformsTo = d1),
          (m.deburr = Gf),
          (m.defaultTo = Y_),
          (m.divide = gb),
          (m.endsWith = p_),
          (m.eq = zn),
          (m.escape = y_),
          (m.escapeRegExp = __),
          (m.every = My),
          (m.find = qy),
          (m.findIndex = yf),
          (m.findKey = U1),
          (m.findLast = xy),
          (m.findLastIndex = _f),
          (m.findLastKey = V1),
          (m.floor = mb),
          (m.forEach = Tf),
          (m.forEachRight = Mf),
          (m.forIn = z1),
          (m.forInRight = W1),
          (m.forOwn = Y1),
          (m.forOwnRight = H1),
          (m.get = eu),
          (m.gt = f1),
          (m.gte = h1),
          (m.has = Q1),
          (m.hasIn = tu),
          (m.head = wf),
          (m.identity = gn),
          (m.includes = $y),
          (m.indexOf = x0),
          (m.inRange = g_),
          (m.invoke = J1),
          (m.isArguments = ci),
          (m.isArray = Ee),
          (m.isArrayBuffer = g1),
          (m.isArrayLike = fn),
          (m.isArrayLikeObject = Pt),
          (m.isBoolean = m1),
          (m.isBuffer = Wr),
          (m.isDate = v1),
          (m.isElement = p1),
          (m.isEmpty = y1),
          (m.isEqual = _1),
          (m.isEqualWith = b1),
          (m.isError = Js),
          (m.isFinite = w1),
          (m.isFunction = vr),
          (m.isInteger = $f),
          (m.isLength = Gl),
          (m.isMap = Rf),
          (m.isMatch = S1),
          (m.isMatchWith = k1),
          (m.isNaN = C1),
          (m.isNative = T1),
          (m.isNil = D1),
          (m.isNull = M1),
          (m.isNumber = Of),
          (m.isObject = Ct),
          (m.isObjectLike = Tt),
          (m.isPlainObject = Ca),
          (m.isRegExp = Xs),
          (m.isSafeInteger = q1),
          (m.isSet = Lf),
          (m.isString = Kl),
          (m.isSymbol = _n),
          (m.isTypedArray = Bi),
          (m.isUndefined = x1),
          (m.isWeakMap = P1),
          (m.isWeakSet = A1),
          (m.join = $0),
          (m.kebabCase = b_),
          (m.last = $n),
          (m.lastIndexOf = R0),
          (m.lowerCase = w_),
          (m.lowerFirst = S_),
          (m.lt = E1),
          (m.lte = I1),
          (m.max = vb),
          (m.maxBy = pb),
          (m.mean = yb),
          (m.meanBy = _b),
          (m.min = bb),
          (m.minBy = wb),
          (m.stubArray = ou),
          (m.stubFalse = su),
          (m.stubObject = lb),
          (m.stubString = ob),
          (m.stubTrue = sb),
          (m.multiply = Sb),
          (m.nth = O0),
          (m.noConflict = J_),
          (m.noop = lu),
          (m.now = Wl),
          (m.pad = k_),
          (m.padEnd = C_),
          (m.padStart = T_),
          (m.parseInt = M_),
          (m.random = m_),
          (m.reduce = By),
          (m.reduceRight = Fy),
          (m.repeat = D_),
          (m.replace = q_),
          (m.result = a_),
          (m.round = kb),
          (m.runInContext = q),
          (m.sample = Vy),
          (m.size = Yy),
          (m.snakeCase = x_),
          (m.some = Hy),
          (m.sortedIndex = z0),
          (m.sortedIndexBy = W0),
          (m.sortedIndexOf = Y0),
          (m.sortedLastIndex = H0),
          (m.sortedLastIndexBy = G0),
          (m.sortedLastIndexOf = K0),
          (m.startCase = A_),
          (m.startsWith = E_),
          (m.subtract = Cb),
          (m.sum = Tb),
          (m.sumBy = Mb),
          (m.template = I_),
          (m.times = ub),
          (m.toFinite = pr),
          (m.toInteger = Re),
          (m.toLength = Bf),
          (m.toLower = $_),
          (m.toNumber = Rn),
          (m.toSafeInteger = $1),
          (m.toString = at),
          (m.toUpper = R_),
          (m.trim = O_),
          (m.trimEnd = L_),
          (m.trimStart = N_),
          (m.truncate = B_),
          (m.unescape = F_),
          (m.uniqueId = db),
          (m.upperCase = U_),
          (m.upperFirst = nu),
          (m.each = Tf),
          (m.eachRight = Mf),
          (m.first = wf),
          au(
            m,
            (function () {
              var n = {};
              return (
                Xn(m, function (i, o) {
                  ot.call(m.prototype, o) || (n[o] = i);
                }),
                n
              );
            })(),
            { chain: !1 }
          ),
          (m.VERSION = a),
          xn(
            [
              "bind",
              "bindKey",
              "curry",
              "curryRight",
              "partial",
              "partialRight",
            ],
            function (n) {
              m[n].placeholder = m;
            }
          ),
          xn(["drop", "take"], function (n, i) {
            (He.prototype[n] = function (o) {
              o = o === r ? 1 : Rt(Re(o), 0);
              var c = this.__filtered__ && !i ? new He(this) : this.clone();
              return (
                c.__filtered__
                  ? (c.__takeCount__ = jt(o, c.__takeCount__))
                  : c.__views__.push({
                      size: jt(o, Z),
                      type: n + (c.__dir__ < 0 ? "Right" : ""),
                    }),
                c
              );
            }),
              (He.prototype[n + "Right"] = function (o) {
                return this.reverse()[n](o).reverse();
              });
          }),
          xn(["filter", "map", "takeWhile"], function (n, i) {
            var o = i + 1,
              c = o == xe || o == j;
            He.prototype[n] = function (h) {
              var p = this.clone();
              return (
                p.__iteratees__.push({ iteratee: Se(h, 3), type: o }),
                (p.__filtered__ = p.__filtered__ || c),
                p
              );
            };
          }),
          xn(["head", "last"], function (n, i) {
            var o = "take" + (i ? "Right" : "");
            He.prototype[n] = function () {
              return this[o](1).value()[0];
            };
          }),
          xn(["initial", "tail"], function (n, i) {
            var o = "drop" + (i ? "" : "Right");
            He.prototype[n] = function () {
              return this.__filtered__ ? new He(this) : this[o](1);
            };
          }),
          (He.prototype.compact = function () {
            return this.filter(gn);
          }),
          (He.prototype.find = function (n) {
            return this.filter(n).head();
          }),
          (He.prototype.findLast = function (n) {
            return this.reverse().find(n);
          }),
          (He.prototype.invokeMap = Ue(function (n, i) {
            return typeof n == "function"
              ? new He(this)
              : this.map(function (o) {
                  return ya(o, n, i);
                });
          })),
          (He.prototype.reject = function (n) {
            return this.filter(Hl(Se(n)));
          }),
          (He.prototype.slice = function (n, i) {
            n = Re(n);
            var o = this;
            return o.__filtered__ && (n > 0 || i < 0)
              ? new He(o)
              : (n < 0 ? (o = o.takeRight(-n)) : n && (o = o.drop(n)),
                i !== r &&
                  ((i = Re(i)), (o = i < 0 ? o.dropRight(-i) : o.take(i - n))),
                o);
          }),
          (He.prototype.takeRightWhile = function (n) {
            return this.reverse().takeWhile(n).reverse();
          }),
          (He.prototype.toArray = function () {
            return this.take(Z);
          }),
          Xn(He.prototype, function (n, i) {
            var o = /^(?:filter|find|map|reject)|While$/.test(i),
              c = /^(?:head|last)$/.test(i),
              h = m[c ? "take" + (i == "last" ? "Right" : "") : i],
              p = c || /^find/.test(i);
            !h ||
              (m.prototype[i] = function () {
                var w = this.__wrapped__,
                  k = c ? [1] : arguments,
                  x = w instanceof He,
                  U = k[0],
                  V = x || Ee(w),
                  Y = function (Ye) {
                    var Qe = h.apply(m, Lr([Ye], k));
                    return c && ne ? Qe[0] : Qe;
                  };
                V &&
                  o &&
                  typeof U == "function" &&
                  U.length != 1 &&
                  (x = V = !1);
                var ne = this.__chain__,
                  ve = !!this.__actions__.length,
                  ke = p && !ne,
                  Le = x && !ve;
                if (!p && V) {
                  w = Le ? w : new He(this);
                  var Ce = n.apply(w, k);
                  return (
                    Ce.__actions__.push({ func: Vl, args: [Y], thisArg: r }),
                    new An(Ce, ne)
                  );
                }
                return ke && Le
                  ? n.apply(this, k)
                  : ((Ce = this.thru(Y)),
                    ke ? (c ? Ce.value()[0] : Ce.value()) : Ce);
              });
          }),
          xn(
            ["pop", "push", "shift", "sort", "splice", "unshift"],
            function (n) {
              var i = gl[n],
                o = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru",
                c = /^(?:pop|shift)$/.test(n);
              m.prototype[n] = function () {
                var h = arguments;
                if (c && !this.__chain__) {
                  var p = this.value();
                  return i.apply(Ee(p) ? p : [], h);
                }
                return this[o](function (w) {
                  return i.apply(Ee(w) ? w : [], h);
                });
              };
            }
          ),
          Xn(He.prototype, function (n, i) {
            var o = m[i];
            if (o) {
              var c = o.name + "";
              ot.call($i, c) || ($i[c] = []), $i[c].push({ name: i, func: o });
            }
          }),
          ($i[Rl(r, F).name] = [{ name: "wrapper", func: r }]),
          (He.prototype.clone = Fv),
          (He.prototype.reverse = Uv),
          (He.prototype.value = Vv),
          (m.prototype.at = py),
          (m.prototype.chain = yy),
          (m.prototype.commit = _y),
          (m.prototype.next = by),
          (m.prototype.plant = Sy),
          (m.prototype.reverse = ky),
          (m.prototype.toJSON = m.prototype.valueOf = m.prototype.value = Cy),
          (m.prototype.first = m.prototype.head),
          da && (m.prototype[da] = wy),
          m
        );
      },
      Ai = _v();
    ni ? (((ni.exports = Ai)._ = Ai), (is._ = Ai)) : (Ut._ = Ai);
  }).call(Ma);
})(zu, zu.exports);
var JD = zu.exports;
const XD = sn({
    name: "ProductCard",
    props: ["product", "is-stall"],
    data: function () {
      return {};
    },
    methods: {},
    created() {},
  }),
  eq = { class: "row no-wrap items-center" },
  tq = { class: "col text-subtitle2 ellipsis-2-lines" },
  nq = { key: 0 },
  rq = { class: "text-h6" },
  iq = { key: 1 },
  aq = { class: "text-h6" },
  lq = {
    class: "q-ml-md text-caption text-green-8 text-weight-bolder q-mt-md",
  },
  oq = { key: 0, class: "text-subtitle1" },
  sq = ["textContent"],
  uq = { key: 1, class: "text-subtitle1" },
  cq = {
    class: "text-caption text-grey ellipsis-2-lines",
    style: { "min-height": "40px" },
  },
  dq = { key: 0 },
  fq = { class: "text-caption text-weight-bolder" },
  hq = { class: "q-ml-auto" };
function gq(e, t, r, a, l, s) {
  return (
    R(),
    oe(
      Jt,
      { class: "card--product" },
      {
        default: b(() => [
          y(
            nc,
            {
              src:
                e.product.images &&
                e.product.images.length > 0 &&
                e.product.images[0]
                  ? e.product.images[0]
                  : e.$q.config.staticPath + "/images/placeholder.png",
              alt: "Product Image",
              loading: "lazy",
              "spinner-color": "white",
              fit: "contain",
              height: "300px",
            },
            null,
            8,
            ["src"]
          ),
          y(
            Ne,
            { class: "q-pb-xs q-pt-md" },
            {
              default: b(() => [
                y(
                  ye,
                  {
                    round: "",
                    disabled: e.product.quantity < 1,
                    color: "primary",
                    rounded: "",
                    icon: "shopping_cart",
                    size: "lg",
                    style: {
                      position: "absolute",
                      top: "0",
                      right: "0",
                      transform: "translate(-50%, -50%)",
                    },
                    onClick:
                      t[0] || (t[0] = (u) => e.$emit("add-to-cart", e.product)),
                  },
                  {
                    default: b(() => [
                      y(Yr, null, {
                        default: b(() => [Te(" Add to cart ")]),
                        _: 1,
                      }),
                    ]),
                    _: 1,
                  },
                  8,
                  ["disabled"]
                ),
                S("div", eq, [S("div", tq, ge(e.product.name), 1)]),
              ]),
              _: 1,
            }
          ),
          y(
            Ne,
            { class: "q-py-sm" },
            {
              default: b(() => [
                S("div", null, [
                  e.product.currency == "sat"
                    ? (R(),
                      re("span", nq, [
                        S("span", rq, ge(e.product.price) + " sats", 1),
                        y(Yr, null, {
                          default: b(() => [
                            Te(
                              " BTC " + ge((e.product.price / 1e8).toFixed(8)),
                              1
                            ),
                          ]),
                          _: 1,
                        }),
                      ]))
                    : (R(),
                      re("span", iq, [
                        S("span", aq, ge(e.product.formatedPrice), 1),
                      ])),
                  S("span", lq, ge(e.product.quantity) + " left", 1),
                ]),
                e.product.categories
                  ? (R(),
                    re("div", oq, [
                      y(
                        tc,
                        {
                          items: e.product.categories || [],
                          "virtual-scroll-horizontal": "",
                        },
                        {
                          default: b(({ item: u, index: d }) => [
                            (R(),
                            oe(
                              Ha,
                              { key: d, dense: "" },
                              {
                                default: b(() => [
                                  S(
                                    "span",
                                    { textContent: ge(u) },
                                    null,
                                    8,
                                    sq
                                  ),
                                ]),
                                _: 2,
                              },
                              1024
                            )),
                          ]),
                          _: 1,
                        },
                        8,
                        ["items"]
                      ),
                    ]))
                  : (R(), re("div", uq, " \xA0 ")),
                S("div", cq, [
                  e.product.description
                    ? (R(), re("p", dq, ge(e.product.description), 1))
                    : $e("", !0),
                ]),
              ]),
              _: 1,
            }
          ),
          y(ut),
          y(yi, null, {
            default: b(() => [S("div", fq, ge(e.product.stallName), 1)]),
            _: 1,
          }),
          y(ut),
          y(yi, null, {
            default: b(() => [
              S("div", hq, [
                e.isStall
                  ? $e("", !0)
                  : (R(),
                    oe(
                      ye,
                      {
                        key: 0,
                        flat: "",
                        class:
                          "text-weight-bold text-capitalize q-ml-auto float-left",
                        dense: "",
                        color: "primary",
                        onClick:
                          t[1] ||
                          (t[1] = (u) =>
                            e.$emit("change-page", "stall", {
                              stall: e.product.stall_id,
                            })),
                      },
                      { default: b(() => [Te(" Visit Stall ")]), _: 1 }
                    )),
                y(
                  ye,
                  {
                    flat: "",
                    class: "text-weight-bold text-capitalize q-ml-auto",
                    dense: "",
                    color: "primary",
                    onClick:
                      t[2] ||
                      (t[2] = (u) =>
                        e.$emit("change-page", "stall", {
                          stall: e.product.stall_id,
                          product: e.product.id,
                        })),
                  },
                  { default: b(() => [Te(" View details ")]), _: 1 }
                ),
              ]),
            ]),
            _: 1,
          }),
        ]),
        _: 1,
      }
    )
  );
}
var Sm = Tn(XD, [["render", gq]]);
const mq = sn({
    name: "CustomerMarket",
    components: { ProductCard: Sm },
    props: ["filtered-products", "search-text", "filter-categories"],
    data: function () {
      return {
        search: null,
        partialProducts: [],
        productsPerPage: 12,
        startIndex: 0,
        lastProductIndex: 0,
        showProducts: !0,
        debounceRefreshProducts: null,
      };
    },
    watch: {
      searchText: function () {
        this.debounceRefreshProducts();
      },
      filteredProducts: function () {
        this.debounceRefreshProducts();
      },
      filterCategories: function () {
        this.debounceRefreshProducts();
      },
    },
    methods: {
      refreshProducts: function () {
        (this.showProducts = !1),
          (this.partialProducts = []),
          (this.startIndex = 0),
          (this.lastProductIndex = Math.min(
            this.filteredProducts.length,
            this.productsPerPage
          )),
          this.partialProducts.push(
            ...this.filteredProducts.slice(0, this.lastProductIndex)
          ),
          setTimeout(() => {
            this.showProducts = !0;
          }, 0);
      },
      addToCart(e) {
        this.$emit("add-to-cart", e);
      },
      changePageM(e, t) {
        this.$emit("change-page", e, t);
      },
      onLoad(e, t) {
        setTimeout(() => {
          if (this.startIndex >= this.filteredProducts.length) {
            t();
            return;
          }
          (this.startIndex = this.lastProductIndex),
            (this.lastProductIndex = Math.min(
              this.filteredProducts.length,
              this.lastProductIndex + this.productsPerPage
            )),
            this.partialProducts.push(
              ...this.filteredProducts.slice(
                this.startIndex,
                this.lastProductIndex
              )
            ),
            t();
        }, 100);
      },
    },
    created() {
      (this.debounceRefreshProducts = JD.debounce(this.refreshProducts, 100)),
        (this.lastProductIndex = Math.min(this.filteredProducts.length, 24)),
        this.partialProducts.push(
          ...this.filteredProducts.slice(0, this.lastProductIndex)
        );
    },
  }),
  vq = { class: "row q-col-gutter-md" },
  pq = { class: "row justify-center q-my-md" };
function yq(e, t, r, a, l, s) {
  const u = Jr("product-card");
  return (
    R(),
    re("div", null, [
      e.showProducts
        ? (R(),
          oe(
            ZD,
            { key: 0, onLoad: e.onLoad, offset: 250 },
            Gh(
              {
                default: b(() => [
                  S("div", vq, [
                    (R(!0),
                    re(
                      Lt,
                      null,
                      Yt(
                        e.partialProducts,
                        (d, f) => (
                          R(),
                          re(
                            "div",
                            {
                              class: "col-xs-12 col-sm-6 col-md-4 col-lg-3",
                              key: f,
                            },
                            [
                              y(
                                u,
                                {
                                  product: d,
                                  onChangePage: e.changePageM,
                                  onAddToCart: e.addToCart,
                                },
                                null,
                                8,
                                ["product", "onChangePage", "onAddToCart"]
                              ),
                            ]
                          )
                        )
                      ),
                      128
                    )),
                  ]),
                ]),
                _: 2,
              },
              [
                e.lastProductIndex < e.filteredProducts.length
                  ? {
                      name: "loading",
                      fn: b(() => [
                        S("div", pq, [
                          y(Au, { color: "primary", size: "40px" }),
                        ]),
                      ]),
                      key: "0",
                    }
                  : void 0,
              ]
            ),
            1032,
            ["onLoad"]
          ))
        : $e("", !0),
    ])
  );
}
var _q = Tn(mq, [["render", yq]]),
  bq = Je({
    name: "QSlideTransition",
    props: { appear: Boolean, duration: { type: Number, default: 300 } },
    emits: ["show", "hide"],
    setup(e, { slots: t, emit: r }) {
      let a = !1,
        l,
        s,
        u = null,
        d = null,
        f,
        g;
      function v() {
        l && l(),
          (l = null),
          (a = !1),
          u !== null && (clearTimeout(u), (u = null)),
          d !== null && (clearTimeout(d), (d = null)),
          s !== void 0 && s.removeEventListener("transitionend", f),
          (f = null);
      }
      function T($, L, F) {
        L !== void 0 && ($.style.height = `${L}px`),
          ($.style.transition = `height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`),
          (a = !0),
          (l = F);
      }
      function M($, L) {
        ($.style.overflowY = null),
          ($.style.height = null),
          ($.style.transition = null),
          v(),
          L !== g && r(L);
      }
      function _($, L) {
        let F = 0;
        (s = $),
          a === !0
            ? (v(), (F = $.offsetHeight === $.scrollHeight ? 0 : void 0))
            : ((g = "hide"), ($.style.overflowY = "hidden")),
          T($, F, L),
          (u = setTimeout(() => {
            (u = null),
              ($.style.height = `${$.scrollHeight}px`),
              (f = (W) => {
                (d = null), (Object(W) !== W || W.target === $) && M($, "show");
              }),
              $.addEventListener("transitionend", f),
              (d = setTimeout(f, e.duration * 1.1));
          }, 100));
      }
      function P($, L) {
        let F;
        (s = $),
          a === !0
            ? v()
            : ((g = "show"),
              ($.style.overflowY = "hidden"),
              (F = $.scrollHeight)),
          T($, F, L),
          (u = setTimeout(() => {
            (u = null),
              ($.style.height = 0),
              (f = (W) => {
                (d = null), (Object(W) !== W || W.target === $) && M($, "hide");
              }),
              $.addEventListener("transitionend", f),
              (d = setTimeout(f, e.duration * 1.1));
          }, 100));
      }
      return (
        Ht(() => {
          a === !0 && v();
        }),
        () =>
          E(
            Ya,
            { css: !1, appear: e.appear, onEnter: _, onLeave: P },
            t.default
          )
      );
    },
  });
const hi = ew({}),
  wq = Object.keys(Do);
var Sq = Je({
  name: "QExpansionItem",
  props: {
    ...Do,
    ...Wu,
    ...ir,
    icon: String,
    label: String,
    labelLines: [Number, String],
    caption: String,
    captionLines: [Number, String],
    dense: Boolean,
    toggleAriaLabel: String,
    expandIcon: String,
    expandedIcon: String,
    expandIconClass: [Array, String, Object],
    duration: Number,
    headerInsetLevel: Number,
    contentInsetLevel: Number,
    expandSeparator: Boolean,
    defaultOpened: Boolean,
    hideExpandIcon: Boolean,
    expandIconToggle: Boolean,
    switchToggleSide: Boolean,
    denseToggle: Boolean,
    group: String,
    popup: Boolean,
    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object],
  },
  emits: [...Hu, "click", "afterShow", "afterHide"],
  setup(e, { slots: t, emit: r }) {
    const {
        proxy: { $q: a },
      } = Dt(),
      l = ar(e, a),
      s = se(e.modelValue !== null ? e.modelValue : e.defaultOpened),
      u = se(null),
      d = so(),
      { show: f, hide: g, toggle: v } = Gu({ showing: s });
    let T, M;
    const _ = I(
        () =>
          `q-expansion-item q-item-type q-expansion-item--${
            s.value === !0 ? "expanded" : "collapsed"
          } q-expansion-item--${e.popup === !0 ? "popup" : "standard"}`
      ),
      P = I(() => {
        if (e.contentInsetLevel === void 0) return null;
        const K = a.lang.rtl === !0 ? "Right" : "Left";
        return { ["padding" + K]: e.contentInsetLevel * 56 + "px" };
      }),
      $ = I(
        () =>
          e.disable !== !0 &&
          (e.href !== void 0 ||
            (e.to !== void 0 && e.to !== null && e.to !== ""))
      ),
      L = I(() => {
        const K = {};
        return (
          wq.forEach((me) => {
            K[me] = e[me];
          }),
          K
        );
      }),
      F = I(() => $.value === !0 || e.expandIconToggle !== !0),
      W = I(() =>
        e.expandedIcon !== void 0 && s.value === !0
          ? e.expandedIcon
          : e.expandIcon ||
            a.iconSet.expansionItem[e.denseToggle === !0 ? "denseIcon" : "icon"]
      ),
      D = I(
        () => e.disable !== !0 && ($.value === !0 || e.expandIconToggle === !0)
      ),
      A = I(() => ({
        expanded: s.value === !0,
        detailsId: e.targetUid,
        toggle: v,
        show: f,
        hide: g,
      })),
      N = I(() => {
        const K =
          e.toggleAriaLabel !== void 0
            ? e.toggleAriaLabel
            : a.lang.label[s.value === !0 ? "collapse" : "expand"](e.label);
        return {
          role: "button",
          "aria-expanded": s.value === !0 ? "true" : "false",
          "aria-controls": d,
          "aria-label": K,
        };
      });
    ze(
      () => e.group,
      (K) => {
        M !== void 0 && M(), K !== void 0 && Pe();
      }
    );
    function J(K) {
      $.value !== !0 && v(K), r("click", K);
    }
    function z(K) {
      K.keyCode === 13 && H(K, !0);
    }
    function H(K, me) {
      me !== !0 && u.value !== null && u.value.focus(), v(K), Ft(K);
    }
    function pe() {
      r("afterShow");
    }
    function _e() {
      r("afterHide");
    }
    function Pe() {
      T === void 0 && (T = so()), s.value === !0 && (hi[e.group] = T);
      const K = ze(s, (rt) => {
          rt === !0
            ? (hi[e.group] = T)
            : hi[e.group] === T && delete hi[e.group];
        }),
        me = ze(
          () => hi[e.group],
          (rt, X) => {
            X === T && rt !== void 0 && rt !== T && g();
          }
        );
      M = () => {
        K(), me(), hi[e.group] === T && delete hi[e.group], (M = void 0);
      };
    }
    function lt() {
      const K = {
          class: [
            `q-focusable relative-position cursor-pointer${
              e.denseToggle === !0 && e.switchToggleSide === !0
                ? " items-end"
                : ""
            }`,
            e.expandIconClass,
          ],
          side: e.switchToggleSide !== !0,
          avatar: e.switchToggleSide,
        },
        me = [
          E(Wt, {
            class:
              "q-expansion-item__toggle-icon" +
              (e.expandedIcon === void 0 && s.value === !0
                ? " q-expansion-item__toggle-icon--rotated"
                : ""),
            name: W.value,
          }),
        ];
      return (
        D.value === !0 &&
          (Object.assign(K, {
            tabindex: 0,
            ...N.value,
            onClick: H,
            onKeyup: z,
          }),
          me.unshift(
            E("div", {
              ref: u,
              class:
                "q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",
              tabindex: -1,
            })
          )),
        E(Ie, K, () => me)
      );
    }
    function te() {
      let K;
      return (
        t.header !== void 0
          ? (K = [].concat(t.header(A.value)))
          : ((K = [
              E(Ie, () => [
                E(Ge, { lines: e.labelLines }, () => e.label || ""),
                e.caption
                  ? E(
                      Ge,
                      { lines: e.captionLines, caption: !0 },
                      () => e.caption
                    )
                  : null,
              ]),
            ]),
            e.icon &&
              K[e.switchToggleSide === !0 ? "push" : "unshift"](
                E(
                  Ie,
                  {
                    side: e.switchToggleSide === !0,
                    avatar: e.switchToggleSide !== !0,
                  },
                  () => E(Wt, { name: e.icon })
                )
              )),
        e.disable !== !0 &&
          e.hideExpandIcon !== !0 &&
          K[e.switchToggleSide === !0 ? "unshift" : "push"](lt()),
        K
      );
    }
    function xe() {
      const K = {
        ref: "item",
        style: e.headerStyle,
        class: e.headerClass,
        dark: l.value,
        disable: e.disable,
        dense: e.dense,
        insetLevel: e.headerInsetLevel,
      };
      return (
        F.value === !0 &&
          ((K.clickable = !0),
          (K.onClick = J),
          Object.assign(K, $.value === !0 ? L.value : N.value)),
        E(zt, K, te)
      );
    }
    function Be() {
      return Hn(
        E(
          "div",
          {
            key: "e-content",
            class: "q-expansion-item__content relative-position",
            style: P.value,
            id: d,
          },
          Mt(t.default)
        ),
        [[tw, s.value]]
      );
    }
    function j() {
      const K = [
        xe(),
        E(bq, { duration: e.duration, onShow: pe, onHide: _e }, Be),
      ];
      return (
        e.expandSeparator === !0 &&
          K.push(
            E(ut, {
              class:
                "q-expansion-item__border q-expansion-item__border--top absolute-top",
              dark: l.value,
            }),
            E(ut, {
              class:
                "q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",
              dark: l.value,
            })
          ),
        K
      );
    }
    return (
      e.group !== void 0 && Pe(),
      Ht(() => {
        M !== void 0 && M();
      }),
      () =>
        E("div", { class: _.value }, [
          E(
            "div",
            { class: "q-expansion-item__container relative-position" },
            j()
          ),
        ])
    );
  },
});
const kq = sn({
    name: "CustomerOrders",
    props: ["orders", "products", "stalls", "profiles"],
    components: { UserProfile: Ka },
    data: function () {
      return {};
    },
    computed: {
      merchantOrders: function () {
        return Object.keys(this.orders).map((e) => ({
          pubkey: e,
          orders: this.orders[e].map(this.enrichOrder),
        }));
      },
    },
    methods: {
      enrichOrder: function (e) {
        var r;
        const t = this.stallForOrder(e);
        return {
          ...e,
          stallName: (t == null ? void 0 : t.name) || "Stall",
          shippingZone: ((r = t == null ? void 0 : t.shipping) == null
            ? void 0
            : r.find((a) => a.id === e.shipping_id)) || {
            id: e.shipping_id,
            name: e.shipping_id,
          },
          invoice: this.invoiceForOrder(e),
          products: this.getProductsForOrder(e),
        };
      },
      stallForOrder: function (e) {
        var t;
        try {
          const r =
            e.items && ((t = e.items[0]) == null ? void 0 : t.product_id);
          if (!r) return;
          const a = this.products.find((s) => s.id === r);
          if (!a) return;
          const l = this.stalls.find((s) => s.id === a.stall_id);
          return l || void 0;
        } catch (r) {
          console.log(r);
        }
      },
      invoiceForOrder: function (e) {
        var t;
        try {
          const r =
            (t = e == null ? void 0 : e.payment_options) == null
              ? void 0
              : t.find((a) => a.type === "ln");
          return r != null && r.link ? decode(r.link) : void 0;
        } catch (r) {
          console.warn(r);
        }
      },
      getProductsForOrder: function (e) {
        var t;
        return (t = e == null ? void 0 : e.items) != null && t.length
          ? e.items.map((r) => ({
              ...(this.products.find((l) => l.id === r.product_id) || {
                id: r.product_id,
                name: r.product_id,
              }),
              orderedQuantity: r.quantity,
            }))
          : [];
      },
      showInvoice: function (e) {
        var r;
        if (e.paid) return;
        const t =
          (r = e == null ? void 0 : e.payment_options) == null
            ? void 0
            : r.find((a) => a.type === "ln").link;
        !t || this.$emit("show-invoice", t);
      },
      formatCurrency: function (e, t) {
        return formatCurrency(e, t);
      },
      fromNow: function (e) {
        return e ? ae(e * 1e3).fromNow() : "";
      },
    },
    created() {},
  }),
  Cq = S("strong", null, "No Orders", -1),
  Tq = ["textContent"],
  Mq = ["textContent"],
  Dq = { class: "text-caption text-grey ellipsis-2-lines" },
  qq = { key: 0 },
  xq = ["textContent"],
  Pq = ["textContent"],
  Aq = ["textContent"],
  Eq = { class: "text-caption text-grey ellipsis-2-lines" },
  Iq = ["textContent"],
  Rq = ["textContent"],
  Oq = S("strong", null, "Order ID: ", -1),
  Lq = ["textContent"],
  Nq = S("strong", null, "Products", -1),
  Bq = ["src"],
  Fq = ["src"],
  Uq = { class: "text-caption text-grey ellipsis-2-lines" },
  Vq = S("strong", null, "Shipping Zone: ", -1),
  zq = ["textContent"],
  Wq = S("strong", null, "Message: ", -1),
  Yq = ["textContent"],
  Hq = S("strong", null, "Invoice: ", -1),
  Gq = ["textContent"];
function Kq(e, t, r, a, l, s) {
  var d;
  const u = Jr("user-profile");
  return (
    R(),
    re("div", null, [
      (d = e.merchantOrders) != null && d.length
        ? $e("", !0)
        : (R(),
          oe(
            Jt,
            { key: 0, bordered: "", class: "q-mb-md" },
            {
              default: b(() => [y(Ne, null, { default: b(() => [Cq]), _: 1 })]),
              _: 1,
            }
          )),
      (R(!0),
      re(
        Lt,
        null,
        Yt(
          e.merchantOrders,
          (f) => (
            R(),
            re("div", { key: f.id }, [
              y(
                Jt,
                { bordered: "", class: "q-mb-md" },
                {
                  default: b(() => [
                    y(
                      zt,
                      null,
                      {
                        default: b(() => [
                          y(
                            u,
                            { pubkey: f.pubkey, profiles: e.profiles },
                            null,
                            8,
                            ["pubkey", "profiles"]
                          ),
                        ]),
                        _: 2,
                      },
                      1024
                    ),
                    y(ut),
                    y(
                      Ne,
                      { class: "col-12" },
                      {
                        default: b(() => [
                          y(
                            kr,
                            null,
                            {
                              default: b(() => [
                                (R(!0),
                                re(
                                  Lt,
                                  null,
                                  Yt(
                                    f.orders,
                                    (g) => (
                                      R(),
                                      re(
                                        "div",
                                        { key: g.id, class: "q-mb-md" },
                                        [
                                          y(
                                            Sq,
                                            {
                                              dense: "",
                                              "expand-separator": "",
                                            },
                                            {
                                              header: b(() => [
                                                y(
                                                  Ie,
                                                  { class: "q-mt-sm" },
                                                  {
                                                    default: b(() => [
                                                      y(
                                                        Ge,
                                                        null,
                                                        {
                                                          default: b(() => {
                                                            var v, T;
                                                            return [
                                                              S(
                                                                "strong",
                                                                null,
                                                                [
                                                                  S(
                                                                    "span",
                                                                    {
                                                                      textContent:
                                                                        ge(
                                                                          g.stallName
                                                                        ),
                                                                    },
                                                                    null,
                                                                    8,
                                                                    Tq
                                                                  ),
                                                                ]
                                                              ),
                                                              (T =
                                                                (v =
                                                                  g.invoice) ==
                                                                null
                                                                  ? void 0
                                                                  : v.human_readable_part) !=
                                                                null && T.amount
                                                                ? (R(),
                                                                  oe(
                                                                    Cn,
                                                                    {
                                                                      key: 0,
                                                                      onClick: (
                                                                        M
                                                                      ) =>
                                                                        e.showInvoice(
                                                                          g
                                                                        ),
                                                                      color:
                                                                        "orange",
                                                                      class:
                                                                        "q-ml-lg gt-sm",
                                                                    },
                                                                    {
                                                                      default:
                                                                        b(
                                                                          () => {
                                                                            var M,
                                                                              _;
                                                                            return [
                                                                              S(
                                                                                "span",
                                                                                {
                                                                                  textContent:
                                                                                    ge(
                                                                                      e.formatCurrency(
                                                                                        ((_ =
                                                                                          (M =
                                                                                            g.invoice) ==
                                                                                          null
                                                                                            ? void 0
                                                                                            : M.human_readable_part) ==
                                                                                        null
                                                                                          ? void 0
                                                                                          : _.amount) /
                                                                                          1e3,
                                                                                        "sat"
                                                                                      )
                                                                                    ),
                                                                                },
                                                                                null,
                                                                                8,
                                                                                Mq
                                                                              ),
                                                                            ];
                                                                          }
                                                                        ),
                                                                      _: 2,
                                                                    },
                                                                    1032,
                                                                    ["onClick"]
                                                                  ))
                                                                : $e("", !0),
                                                            ];
                                                          }),
                                                          _: 2,
                                                        },
                                                        1024
                                                      ),
                                                      y(
                                                        Ge,
                                                        null,
                                                        {
                                                          default: b(() => [
                                                            S("div", Dq, [
                                                              g.createdAt
                                                                ? (R(),
                                                                  re("p", qq, [
                                                                    S(
                                                                      "span",
                                                                      {
                                                                        textContent:
                                                                          ge(
                                                                            e.fromNow(
                                                                              g.createdAt
                                                                            )
                                                                          ),
                                                                      },
                                                                      null,
                                                                      8,
                                                                      xq
                                                                    ),
                                                                  ]))
                                                                : $e("", !0),
                                                            ]),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1024
                                                      ),
                                                    ]),
                                                    _: 2,
                                                  },
                                                  1024
                                                ),
                                                y(
                                                  Ie,
                                                  { side: "" },
                                                  {
                                                    default: b(() => [
                                                      y(
                                                        Ge,
                                                        null,
                                                        {
                                                          default: b(() => [
                                                            y(
                                                              Cn,
                                                              {
                                                                color: g.paid
                                                                  ? "green"
                                                                  : "grey",
                                                              },
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    S(
                                                                      "span",
                                                                      {
                                                                        textContent:
                                                                          ge(
                                                                            g.paid
                                                                              ? "Paid"
                                                                              : "Not Paid"
                                                                          ),
                                                                      },
                                                                      null,
                                                                      8,
                                                                      Pq
                                                                    ),
                                                                  ]
                                                                ),
                                                                _: 2,
                                                              },
                                                              1032,
                                                              ["color"]
                                                            ),
                                                            y(
                                                              Cn,
                                                              {
                                                                color: g.shipped
                                                                  ? "green"
                                                                  : "grey",
                                                                class:
                                                                  "q-ml-md",
                                                              },
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    S(
                                                                      "span",
                                                                      {
                                                                        textContent:
                                                                          ge(
                                                                            g.shipped
                                                                              ? "Shipped"
                                                                              : "Not Shipped"
                                                                          ),
                                                                      },
                                                                      null,
                                                                      8,
                                                                      Aq
                                                                    ),
                                                                  ]
                                                                ),
                                                                _: 2,
                                                              },
                                                              1032,
                                                              ["color"]
                                                            ),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1024
                                                      ),
                                                      y(
                                                        Ge,
                                                        null,
                                                        {
                                                          default: b(() => {
                                                            var v, T;
                                                            return [
                                                              S("div", Eq, [
                                                                S("p", null, [
                                                                  S(
                                                                    "span",
                                                                    {
                                                                      textContent:
                                                                        ge(
                                                                          (v =
                                                                            g.items) ==
                                                                            null
                                                                            ? void 0
                                                                            : v.length
                                                                        ),
                                                                    },
                                                                    null,
                                                                    8,
                                                                    Iq
                                                                  ),
                                                                  S(
                                                                    "span",
                                                                    {
                                                                      textContent:
                                                                        ge(
                                                                          ((T =
                                                                            g.items) ==
                                                                          null
                                                                            ? void 0
                                                                            : T.length) ===
                                                                            1
                                                                            ? "product"
                                                                            : "products"
                                                                        ),
                                                                    },
                                                                    null,
                                                                    8,
                                                                    Rq
                                                                  ),
                                                                ]),
                                                              ]),
                                                            ];
                                                          }),
                                                          _: 2,
                                                        },
                                                        1024
                                                      ),
                                                    ]),
                                                    _: 2,
                                                  },
                                                  1024
                                                ),
                                              ]),
                                              default: b(() => [
                                                y(ut),
                                                y(
                                                  Ne,
                                                  { class: "col-12" },
                                                  {
                                                    default: b(() => [
                                                      y(
                                                        Ie,
                                                        null,
                                                        {
                                                          default: b(() => [
                                                            y(
                                                              Ge,
                                                              null,
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    Oq,
                                                                    S(
                                                                      "span",
                                                                      {
                                                                        class:
                                                                          "ellipsis-2-lines text-wrap",
                                                                        textContent:
                                                                          ge(
                                                                            g.id
                                                                          ),
                                                                      },
                                                                      null,
                                                                      8,
                                                                      Lq
                                                                    ),
                                                                  ]
                                                                ),
                                                                _: 2,
                                                              },
                                                              1024
                                                            ),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1024
                                                      ),
                                                    ]),
                                                    _: 2,
                                                  },
                                                  1024
                                                ),
                                                y(ut),
                                                y(
                                                  Ne,
                                                  { horizontal: "" },
                                                  {
                                                    default: b(() => [
                                                      y(
                                                        Ne,
                                                        { class: "col-7" },
                                                        {
                                                          default: b(() => [
                                                            y(
                                                              Ie,
                                                              {
                                                                class:
                                                                  "q-mt-sm",
                                                              },
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    y(
                                                                      Ge,
                                                                      null,
                                                                      {
                                                                        default:
                                                                          b(
                                                                            () => [
                                                                              Nq,
                                                                            ]
                                                                          ),
                                                                        _: 1,
                                                                      }
                                                                    ),
                                                                  ]
                                                                ),
                                                                _: 1,
                                                              }
                                                            ),
                                                            (R(!0),
                                                            re(
                                                              Lt,
                                                              null,
                                                              Yt(
                                                                g.products,
                                                                (v) => (
                                                                  R(),
                                                                  oe(
                                                                    zt,
                                                                    {
                                                                      key: v.id,
                                                                    },
                                                                    {
                                                                      default:
                                                                        b(
                                                                          () => [
                                                                            y(
                                                                              Ie,
                                                                              {
                                                                                avatar:
                                                                                  "",
                                                                              },
                                                                              {
                                                                                default:
                                                                                  b(
                                                                                    () => [
                                                                                      y(
                                                                                        jr,
                                                                                        null,
                                                                                        {
                                                                                          default:
                                                                                            b(
                                                                                              () => [
                                                                                                (v.images &&
                                                                                                  v
                                                                                                    .images[0]) ||
                                                                                                v.image
                                                                                                  ? (R(),
                                                                                                    re(
                                                                                                      "img",
                                                                                                      {
                                                                                                        key: 0,
                                                                                                        src:
                                                                                                          v
                                                                                                            .images[0] ||
                                                                                                          v.image,
                                                                                                      },
                                                                                                      null,
                                                                                                      8,
                                                                                                      Bq
                                                                                                    ))
                                                                                                  : (R(),
                                                                                                    re(
                                                                                                      "img",
                                                                                                      {
                                                                                                        key: 1,
                                                                                                        src:
                                                                                                          e
                                                                                                            .$q
                                                                                                            .config
                                                                                                            .staticPath +
                                                                                                          "/images/placeholder.png",
                                                                                                      },
                                                                                                      null,
                                                                                                      8,
                                                                                                      Fq
                                                                                                    )),
                                                                                              ]
                                                                                            ),
                                                                                          _: 2,
                                                                                        },
                                                                                        1024
                                                                                      ),
                                                                                    ]
                                                                                  ),
                                                                                _: 2,
                                                                              },
                                                                              1024
                                                                            ),
                                                                            y(
                                                                              Ie,
                                                                              {
                                                                                class:
                                                                                  "q-mt-sm",
                                                                              },
                                                                              {
                                                                                default:
                                                                                  b(
                                                                                    () => [
                                                                                      y(
                                                                                        Ge
                                                                                      ),
                                                                                      y(
                                                                                        Ge,
                                                                                        null,
                                                                                        {
                                                                                          default:
                                                                                            b(
                                                                                              () => [
                                                                                                S(
                                                                                                  "strong",
                                                                                                  null,
                                                                                                  ge(
                                                                                                    v.orderedQuantity
                                                                                                  ) +
                                                                                                    " x " +
                                                                                                    ge(
                                                                                                      v.name
                                                                                                    ),
                                                                                                  1
                                                                                                ),
                                                                                              ]
                                                                                            ),
                                                                                          _: 2,
                                                                                        },
                                                                                        1024
                                                                                      ),
                                                                                      y(
                                                                                        Ge,
                                                                                        null,
                                                                                        {
                                                                                          default:
                                                                                            b(
                                                                                              () => [
                                                                                                S(
                                                                                                  "div",
                                                                                                  Uq,
                                                                                                  [
                                                                                                    S(
                                                                                                      "p",
                                                                                                      null,
                                                                                                      ge(
                                                                                                        v.description
                                                                                                      ),
                                                                                                      1
                                                                                                    ),
                                                                                                  ]
                                                                                                ),
                                                                                              ]
                                                                                            ),
                                                                                          _: 2,
                                                                                        },
                                                                                        1024
                                                                                      ),
                                                                                    ]
                                                                                  ),
                                                                                _: 2,
                                                                              },
                                                                              1024
                                                                            ),
                                                                          ]
                                                                        ),
                                                                      _: 2,
                                                                    },
                                                                    1024
                                                                  )
                                                                )
                                                              ),
                                                              128
                                                            )),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1024
                                                      ),
                                                      y(ut, { vertical: "" }),
                                                      y(
                                                        Ne,
                                                        null,
                                                        {
                                                          default: b(() => [
                                                            y(
                                                              Ie,
                                                              {
                                                                class:
                                                                  "q-mt-md q-ml-sm",
                                                              },
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    y(
                                                                      Ge,
                                                                      null,
                                                                      {
                                                                        default:
                                                                          b(
                                                                            () => {
                                                                              var v;
                                                                              return [
                                                                                Vq,
                                                                                S(
                                                                                  "span",
                                                                                  {
                                                                                    textContent:
                                                                                      ge(
                                                                                        ((v =
                                                                                          g.shippingZone) ==
                                                                                        null
                                                                                          ? void 0
                                                                                          : v.name) ||
                                                                                          ""
                                                                                      ),
                                                                                  },
                                                                                  null,
                                                                                  8,
                                                                                  zq
                                                                                ),
                                                                              ];
                                                                            }
                                                                          ),
                                                                        _: 2,
                                                                      },
                                                                      1024
                                                                    ),
                                                                  ]
                                                                ),
                                                                _: 2,
                                                              },
                                                              1024
                                                            ),
                                                            g.message
                                                              ? (R(),
                                                                oe(
                                                                  Ie,
                                                                  {
                                                                    key: 0,
                                                                    class:
                                                                      "q-mt-md q-ml-sm",
                                                                  },
                                                                  {
                                                                    default: b(
                                                                      () => [
                                                                        y(
                                                                          Ge,
                                                                          null,
                                                                          {
                                                                            default:
                                                                              b(
                                                                                () => [
                                                                                  Wq,
                                                                                  S(
                                                                                    "span",
                                                                                    {
                                                                                      textContent:
                                                                                        ge(
                                                                                          g.message
                                                                                        ),
                                                                                    },
                                                                                    null,
                                                                                    8,
                                                                                    Yq
                                                                                  ),
                                                                                ]
                                                                              ),
                                                                            _: 2,
                                                                          },
                                                                          1024
                                                                        ),
                                                                      ]
                                                                    ),
                                                                    _: 2,
                                                                  },
                                                                  1024
                                                                ))
                                                              : $e("", !0),
                                                            y(
                                                              Ie,
                                                              {
                                                                class:
                                                                  "q-mt-md q-ml-sm",
                                                              },
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    y(
                                                                      Ge,
                                                                      null,
                                                                      {
                                                                        default:
                                                                          b(
                                                                            () => {
                                                                              var v,
                                                                                T;
                                                                              return [
                                                                                Hq,
                                                                                (T =
                                                                                  (v =
                                                                                    g.invoice) ==
                                                                                  null
                                                                                    ? void 0
                                                                                    : v.human_readable_part) !=
                                                                                  null &&
                                                                                T.amount
                                                                                  ? (R(),
                                                                                    oe(
                                                                                      Cn,
                                                                                      {
                                                                                        key: 0,
                                                                                        onClick:
                                                                                          (
                                                                                            M
                                                                                          ) =>
                                                                                            e.showInvoice(
                                                                                              g
                                                                                            ),
                                                                                        color:
                                                                                          "orange",
                                                                                        class:
                                                                                          "cursor-pointer",
                                                                                      },
                                                                                      {
                                                                                        default:
                                                                                          b(
                                                                                            () => {
                                                                                              var M,
                                                                                                _;
                                                                                              return [
                                                                                                S(
                                                                                                  "span",
                                                                                                  {
                                                                                                    textContent:
                                                                                                      ge(
                                                                                                        e.formatCurrency(
                                                                                                          ((_ =
                                                                                                            (M =
                                                                                                              g.invoice) ==
                                                                                                            null
                                                                                                              ? void 0
                                                                                                              : M.human_readable_part) ==
                                                                                                          null
                                                                                                            ? void 0
                                                                                                            : _.amount) /
                                                                                                            1e3,
                                                                                                          "sat"
                                                                                                        )
                                                                                                      ),
                                                                                                  },
                                                                                                  null,
                                                                                                  8,
                                                                                                  Gq
                                                                                                ),
                                                                                              ];
                                                                                            }
                                                                                          ),
                                                                                        _: 2,
                                                                                      },
                                                                                      1032,
                                                                                      [
                                                                                        "onClick",
                                                                                      ]
                                                                                    ))
                                                                                  : $e(
                                                                                      "",
                                                                                      !0
                                                                                    ),
                                                                              ];
                                                                            }
                                                                          ),
                                                                        _: 2,
                                                                      },
                                                                      1024
                                                                    ),
                                                                  ]
                                                                ),
                                                                _: 2,
                                                              },
                                                              1024
                                                            ),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1024
                                                      ),
                                                    ]),
                                                    _: 2,
                                                  },
                                                  1024
                                                ),
                                                y(ut, { class: "q-mb-xl" }),
                                              ]),
                                              _: 2,
                                            },
                                            1024
                                          ),
                                          y(ut),
                                        ]
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ]),
                              _: 2,
                            },
                            1024
                          ),
                        ]),
                        _: 2,
                      },
                      1024
                    ),
                  ]),
                  _: 2,
                },
                1024
              ),
            ])
          )
        ),
        128
      )),
    ])
  );
}
var Qq = Tn(kq, [["render", Kq]]),
  jq = Je({
    name: "QCarouselSlide",
    props: { ...bg, imgSrc: String },
    setup(e, { slots: t }) {
      const r = I(() =>
        e.imgSrc ? { backgroundImage: `url("${e.imgSrc}")` } : {}
      );
      return () =>
        E("div", { class: "q-carousel__slide", style: r.value }, Mt(t.default));
    },
  });
let Pa = 0;
const Zq = { fullscreen: Boolean, noRouteFullscreenExit: Boolean },
  Jq = ["update:fullscreen", "fullscreen"];
function Xq() {
  const e = Dt(),
    { props: t, emit: r, proxy: a } = e;
  let l, s, u;
  const d = se(!1);
  nw(e) === !0 &&
    ze(
      () => a.$route.fullPath,
      () => {
        t.noRouteFullscreenExit !== !0 && v();
      }
    ),
    ze(
      () => t.fullscreen,
      (T) => {
        d.value !== T && f();
      }
    ),
    ze(d, (T) => {
      r("update:fullscreen", T), r("fullscreen", T);
    });
  function f() {
    d.value === !0 ? v() : g();
  }
  function g() {
    d.value !== !0 &&
      ((d.value = !0),
      (u = a.$el.parentNode),
      u.replaceChild(s, a.$el),
      document.body.appendChild(a.$el),
      Pa++,
      Pa === 1 && document.body.classList.add("q-body--fullscreen-mixin"),
      (l = { handler: v }),
      nh.add(l));
  }
  function v() {
    d.value === !0 &&
      (l !== void 0 && (nh.remove(l), (l = void 0)),
      u.replaceChild(a.$el, s),
      (d.value = !1),
      (Pa = Math.max(0, Pa - 1)),
      Pa === 0 &&
        (document.body.classList.remove("q-body--fullscreen-mixin"),
        a.$el.scrollIntoView !== void 0 &&
          setTimeout(() => {
            a.$el.scrollIntoView();
          })));
  }
  return (
    Zu(() => {
      s = document.createElement("span");
    }),
    Xr(() => {
      t.fullscreen === !0 && g();
    }),
    Ht(v),
    Object.assign(a, {
      toggleFullscreen: f,
      setFullscreen: g,
      exitFullscreen: v,
    }),
    { inFullscreen: d, toggleFullscreen: f }
  );
}
const ex = ["top", "right", "bottom", "left"],
  tx = ["regular", "flat", "outline", "push", "unelevated"];
var nx = Je({
  name: "QCarousel",
  props: {
    ...ir,
    ...wg,
    ...Zq,
    transitionPrev: { type: String, default: "fade" },
    transitionNext: { type: String, default: "fade" },
    height: String,
    padding: Boolean,
    controlColor: String,
    controlTextColor: String,
    controlType: {
      type: String,
      validator: (e) => tx.includes(e),
      default: "flat",
    },
    autoplay: [Number, Boolean],
    arrows: Boolean,
    prevIcon: String,
    nextIcon: String,
    navigation: Boolean,
    navigationPosition: { type: String, validator: (e) => ex.includes(e) },
    navigationIcon: String,
    navigationActiveIcon: String,
    thumbnails: Boolean,
  },
  emits: [...Jq, ...Sg],
  setup(e, { slots: t }) {
    const {
        proxy: { $q: r },
      } = Dt(),
      a = ar(e, r);
    let l = null,
      s;
    const {
        updatePanelsList: u,
        getPanelContent: d,
        panelDirectives: f,
        goToPanel: g,
        previousPanel: v,
        nextPanel: T,
        getEnabledPanels: M,
        panelIndex: _,
      } = kg(),
      { inFullscreen: P } = Xq(),
      $ = I(() =>
        P.value !== !0 && e.height !== void 0 ? { height: e.height } : {}
      ),
      L = I(() => (e.vertical === !0 ? "vertical" : "horizontal")),
      F = I(
        () =>
          `q-carousel q-panel-parent q-carousel--with${
            e.padding === !0 ? "" : "out"
          }-padding` +
          (P.value === !0 ? " fullscreen" : "") +
          (a.value === !0 ? " q-carousel--dark q-dark" : "") +
          (e.arrows === !0 ? ` q-carousel--arrows-${L.value}` : "") +
          (e.navigation === !0 ? ` q-carousel--navigation-${N.value}` : "")
      ),
      W = I(() => {
        const _e = [
          e.prevIcon || r.iconSet.carousel[e.vertical === !0 ? "up" : "left"],
          e.nextIcon ||
            r.iconSet.carousel[e.vertical === !0 ? "down" : "right"],
        ];
        return e.vertical === !1 && r.lang.rtl === !0 ? _e.reverse() : _e;
      }),
      D = I(() => e.navigationIcon || r.iconSet.carousel.navigationIcon),
      A = I(() => e.navigationActiveIcon || D.value),
      N = I(
        () => e.navigationPosition || (e.vertical === !0 ? "right" : "bottom")
      ),
      J = I(() => ({
        color: e.controlColor,
        textColor: e.controlTextColor,
        round: !0,
        [e.controlType]: !0,
        dense: !0,
      }));
    ze(
      () => e.modelValue,
      () => {
        e.autoplay && z();
      }
    ),
      ze(
        () => e.autoplay,
        (_e) => {
          _e ? z() : l !== null && (clearTimeout(l), (l = null));
        }
      );
    function z() {
      const _e = rw(e.autoplay) === !0 ? Math.abs(e.autoplay) : 5e3;
      l !== null && clearTimeout(l),
        (l = setTimeout(() => {
          (l = null), _e >= 0 ? T() : v();
        }, _e));
    }
    Xr(() => {
      e.autoplay && z();
    }),
      Ht(() => {
        l !== null && clearTimeout(l);
      });
    function H(_e, Pe) {
      return E(
        "div",
        {
          class:
            `q-carousel__control q-carousel__navigation no-wrap absolute flex q-carousel__navigation--${_e} q-carousel__navigation--${N.value}` +
            (e.controlColor !== void 0 ? ` text-${e.controlColor}` : ""),
        },
        [
          E(
            "div",
            { class: "q-carousel__navigation-inner flex flex-center no-wrap" },
            M().map(Pe)
          ),
        ]
      );
    }
    function pe() {
      const _e = [];
      if (e.navigation === !0) {
        const Pe =
            t["navigation-icon"] !== void 0
              ? t["navigation-icon"]
              : (te) =>
                  E(ye, {
                    key: "nav" + te.name,
                    class: `q-carousel__navigation-icon q-carousel__navigation-icon--${
                      te.active === !0 ? "" : "in"
                    }active`,
                    ...te.btnProps,
                    onClick: te.onClick,
                  }),
          lt = s - 1;
        _e.push(
          H("buttons", (te, xe) => {
            const Be = te.props.name,
              j = _.value === xe;
            return Pe({
              index: xe,
              maxIndex: lt,
              name: Be,
              active: j,
              btnProps: {
                icon: j === !0 ? A.value : D.value,
                size: "sm",
                ...J.value,
              },
              onClick: () => {
                g(Be);
              },
            });
          })
        );
      } else if (e.thumbnails === !0) {
        const Pe = e.controlColor !== void 0 ? ` text-${e.controlColor}` : "";
        _e.push(
          H("thumbnails", (lt) => {
            const te = lt.props;
            return E("img", {
              key: "tmb#" + te.name,
              class:
                `q-carousel__thumbnail q-carousel__thumbnail--${
                  te.name === e.modelValue ? "" : "in"
                }active` + Pe,
              src: te.imgSrc || te["img-src"],
              onClick: () => {
                g(te.name);
              },
            });
          })
        );
      }
      return (
        e.arrows === !0 &&
          _.value >= 0 &&
          ((e.infinite === !0 || _.value > 0) &&
            _e.push(
              E(
                "div",
                {
                  key: "prev",
                  class: `q-carousel__control q-carousel__arrow q-carousel__prev-arrow q-carousel__prev-arrow--${L.value} absolute flex flex-center`,
                },
                [E(ye, { icon: W.value[0], ...J.value, onClick: v })]
              )
            ),
          (e.infinite === !0 || _.value < s - 1) &&
            _e.push(
              E(
                "div",
                {
                  key: "next",
                  class: `q-carousel__control q-carousel__arrow q-carousel__next-arrow q-carousel__next-arrow--${L.value} absolute flex flex-center`,
                },
                [E(ye, { icon: W.value[1], ...J.value, onClick: T })]
              )
            )),
        _i(t.control, _e)
      );
    }
    return () => (
      (s = u(t)),
      E(
        "div",
        { class: F.value, style: $.value },
        [
          Ku(
            "div",
            { class: "q-carousel__slides-container" },
            d(),
            "sl-cont",
            e.swipeable,
            () => f.value
          ),
        ].concat(pe())
      )
    );
  },
});
const rx = sn({
    name: "ProductDetail",
    props: ["product", "add-to-cart"],
    data: function () {
      return { slide: 1 };
    },
    computed: {},
    methods: {},
    created() {},
  }),
  ix = { class: "row" },
  ax = { class: "col-lg-5 col-md-5 col-sm-12 col-xs-12 q-mt-sm" },
  lx = { key: 0, class: "q-pr-md" },
  ox = { key: 1, class: "q-pr-md" },
  sx = { class: "col-lg-7 col-md-7 col-sm-12 col-xs-12 q-mt-sm" },
  ux = { class: "row" },
  cx = { class: "text-subtitle1 q-mt-sm q-pt-xs" },
  dx = { key: 0, class: "text-subtitle1" },
  fx = { class: "q-mt-sm text-weight-bold" },
  hx = { key: 0 },
  gx = { class: "text-h6" },
  mx = { class: "q-ml-sm text-grey-6" },
  vx = { key: 1 },
  px = { class: "text-h6" },
  yx = {
    class: "q-ml-md text-caption text-green-8 text-weight-bolder q-mt-md",
  },
  _x = { class: "q-mt-md" };
function bx(e, t, r, a, l, s) {
  return (
    R(),
    re("div", ix, [
      S("div", ax, [
        e.product.images && e.product.images[0]
          ? (R(),
            re("div", lx, [
              y(
                nx,
                {
                  swipeable: "",
                  animated: "",
                  modelValue: e.slide,
                  "onUpdate:modelValue": t[0] || (t[0] = (u) => (e.slide = u)),
                  thumbnails: "",
                  infinite: "",
                  arrows: "",
                  "transition-prev": "slide-right",
                  "transition-next": "slide-left",
                  "navigation-icon": "radio_button_unchecked",
                  "control-type": "regular",
                  "control-color": "secondary",
                  "control-text-color": "white",
                },
                {
                  default: b(() => [
                    (R(!0),
                    re(
                      Lt,
                      null,
                      Yt(
                        e.product.images,
                        (u, d) => (
                          R(),
                          oe(
                            jq,
                            { name: d + 1, key: d, "img-src": u },
                            null,
                            8,
                            ["name", "img-src"]
                          )
                        )
                      ),
                      128
                    )),
                  ]),
                  _: 1,
                },
                8,
                ["modelValue"]
              ),
            ]))
          : (R(),
            re("div", ox, [
              y(
                nc,
                {
                  src: e.$q.config.staticPath + "/images/placeholder.png",
                  ratio: 16 / 9,
                },
                null,
                8,
                ["src"]
              ),
            ])),
      ]),
      S("div", sx, [
        y(Jt, null, {
          default: b(() => [
            y(Ne, null, {
              default: b(() => [
                S("div", ux, [
                  S(
                    "div",
                    {
                      class: iw([
                        "col-12",
                        e.$q.platform.is.desktop ? "" : "q-px-md",
                      ]),
                    },
                    [
                      S("div", cx, ge(e.product.name), 1),
                      e.product.categories
                        ? (R(),
                          re("div", dx, [
                            (R(!0),
                            re(
                              Lt,
                              null,
                              Yt(
                                e.product.categories,
                                (u, d) => (
                                  R(),
                                  oe(
                                    Ha,
                                    { key: d, dense: "" },
                                    { default: b(() => [Te(ge(u), 1)]), _: 2 },
                                    1024
                                  )
                                )
                              ),
                              128
                            )),
                          ]))
                        : $e("", !0),
                      S("div", fx, ge(e.product.description), 1),
                      S("div", null, [
                        e.product.currency == "sat"
                          ? (R(),
                            re("span", hx, [
                              S("span", gx, ge(e.product.price) + " sats", 1),
                              S(
                                "span",
                                mx,
                                "BTC " + ge((e.product.price / 1e8).toFixed(8)),
                                1
                              ),
                            ]))
                          : (R(),
                            re("span", vx, [
                              S("span", px, ge(e.product.formatedPrice), 1),
                            ])),
                        S(
                          "span",
                          yx,
                          ge(
                            e.product.quantity > 0
                              ? `In
                  stock. ${e.product.quantity} left.`
                              : "Out of stock."
                          ),
                          1
                        ),
                      ]),
                      S("div", _x, [
                        y(ye, {
                          class: "q-mt-md",
                          color: "primary",
                          rounded: "",
                          icon: "shopping_cart",
                          label: "Add to cart",
                          onClick:
                            t[1] ||
                            (t[1] = (u) => e.$emit("add-to-cart", e.product)),
                        }),
                      ]),
                    ],
                    2
                  ),
                ]),
              ]),
              _: 1,
            }),
          ]),
          _: 1,
        }),
      ]),
    ])
  );
}
var wx = Tn(rx, [["render", bx]]);
const Sx = sn({
    name: "CustomerStall",
    components: { ProductCard: Sm, ProductDetail: wx },
    props: ["stall", "products", "product-detail"],
    data: function () {
      return {};
    },
    computed: {
      product() {
        if (this.productDetail)
          return this.products.find((e) => e.id == this.productDetail);
      },
    },
    methods: {
      changePageS(e, t) {
        var r;
        e === "stall" &&
          (t == null ? void 0 : t.product) &&
          ((r = document.getElementById("product-focus-area")) == null ||
            r.scrollIntoView()),
          this.$emit("change-page", e, t);
      },
      addToCart(e) {
        this.$emit("add-to-cart", e);
      },
    },
  }),
  kx = S("div", { id: "product-focus-area" }, null, -1),
  Cx = { key: 0, class: "row" },
  Tx = { class: "col-12 auto-width" },
  Mx = { class: "col-12 q-my-lg" },
  Dx = { class: "row q-col-gutter-md" };
function qx(e, t, r, a, l, s) {
  const u = Jr("product-detail"),
    d = Jr("product-card");
  return (
    R(),
    re("div", null, [
      kx,
      e.productDetail && e.product
        ? (R(),
          re("div", Cx, [
            S("div", Tx, [
              y(u, { product: e.product, onAddToCart: e.addToCart }, null, 8, [
                "product",
                "onAddToCart",
              ]),
            ]),
            S("div", Mx, [y(ut)]),
          ]))
        : $e("", !0),
      S("div", Dx, [
        (R(!0),
        re(
          Lt,
          null,
          Yt(
            e.products,
            (f, g) => (
              R(),
              re(
                "div",
                { class: "col-xs-12 col-sm-6 col-md-4 col-lg-3", key: g },
                [
                  y(
                    d,
                    {
                      product: f,
                      onChangePage: e.changePageS,
                      onAddToCart: e.addToCart,
                      "is-stall": !0,
                    },
                    null,
                    8,
                    ["product", "onChangePage", "onAddToCart"]
                  ),
                ]
              )
            )
          ),
          128
        )),
      ]),
    ])
  );
}
var xx = Tn(Sx, [["render", qx]]);
const Px = sn({
    name: "CustomerStallList",
    props: ["stalls"],
    data: function () {
      return { showStalls: !0 };
    },
    watch: {
      stalls() {
        (this.showProducts = !1),
          setTimeout(() => {
            this.showProducts = !0;
          }, 0);
      },
    },
    computed: {},
    methods: {},
    created() {},
  }),
  Ax = { key: 0, class: "row q-col-gutter-md" },
  Ex = { class: "q-pa-md q-gutter-sm", style: { height: "80px" } },
  Ix = ["src"],
  $x = { class: "row no-wrap items-center" },
  Rx = { class: "col text-subtitle2 ellipsis-2-lines" },
  Ox = { class: "text-caption text-green-8 text-weight-bolder q-mt-md" },
  Lx = ["textContent"],
  Nx = ["textContent"],
  Bx = { key: 0, class: "text-subtitle1" },
  Fx = ["textContent"],
  Ux = { key: 1, class: "text-subtitle1" },
  Vx = {
    class: "text-caption text-grey ellipsis-2-lines",
    style: { "min-height": "40px" },
  },
  zx = { class: "q-ml-auto" };
function Wx(e, t, r, a, l, s) {
  return e.showStalls
    ? (R(),
      re("div", Ax, [
        (R(!0),
        re(
          Lt,
          null,
          Yt(
            e.stalls,
            (u) => (
              R(),
              re(
                "div",
                { key: u.id, class: "col-xs-12 col-sm-6 col-md-4 col-lg-3" },
                [
                  y(
                    Jt,
                    { class: "card--product" },
                    {
                      default: b(() => [
                        y(
                          Ne,
                          { class: "q-pb-xs q-pt-md" },
                          {
                            default: b(() => [
                              S("div", Ex, [
                                (R(!0),
                                re(
                                  Lt,
                                  null,
                                  Yt(
                                    u.images,
                                    (d, f) => (
                                      R(),
                                      oe(
                                        jr,
                                        {
                                          key: f,
                                          size: "40px",
                                          class: "overlapping",
                                          style: aw(
                                            `left: ${
                                              f * 25
                                            }px; border: 2px solid white; position: absolute`
                                          ),
                                        },
                                        {
                                          default: b(() => [
                                            S("img", { src: d }, null, 8, Ix),
                                          ]),
                                          _: 2,
                                        },
                                        1032,
                                        ["style"]
                                      )
                                    )
                                  ),
                                  128
                                )),
                              ]),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                        y(
                          Ne,
                          { class: "q-pb-xs q-pt-md" },
                          {
                            default: b(() => [
                              S("div", $x, [S("div", Rx, ge(u.name), 1)]),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                        y(ut),
                        y(
                          Ne,
                          { class: "q-pl-sm" },
                          {
                            default: b(() => [
                              S("div", null, [
                                S("span", Ox, [
                                  S(
                                    "span",
                                    { textContent: ge(u.productCount) },
                                    null,
                                    8,
                                    Lx
                                  ),
                                  Te(" products"),
                                ]),
                                S(
                                  "span",
                                  {
                                    textContent: ge(u.currency),
                                    class: "float-right",
                                  },
                                  null,
                                  8,
                                  Nx
                                ),
                              ]),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                        y(
                          Ne,
                          { class: "q-pl-sm gt-sm" },
                          {
                            default: b(() => [
                              u.categories
                                ? (R(),
                                  re("div", Bx, [
                                    y(
                                      tc,
                                      {
                                        items: u.categories || [],
                                        "virtual-scroll-horizontal": "",
                                      },
                                      {
                                        default: b(({ item: d, index: f }) => [
                                          (R(),
                                          oe(
                                            Ha,
                                            { key: f, dense: "" },
                                            {
                                              default: b(() => [
                                                S(
                                                  "span",
                                                  { textContent: ge(d) },
                                                  null,
                                                  8,
                                                  Fx
                                                ),
                                              ]),
                                              _: 2,
                                            },
                                            1024
                                          )),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ["items"]
                                    ),
                                  ]))
                                : (R(), re("div", Ux, " \xA0 ")),
                              S("div", Vx, [
                                S("p", null, ge(u.description || ""), 1),
                              ]),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                        y(ut),
                        y(
                          yi,
                          null,
                          {
                            default: b(() => [
                              S("div", zx, [
                                y(
                                  ye,
                                  {
                                    flat: "",
                                    class:
                                      "text-weight-bold text-capitalize q-ml-auto float-left",
                                    dense: "",
                                    color: "primary",
                                    onClick: (d) =>
                                      e.$emit("change-page", "stall", {
                                        stall: u.id,
                                      }),
                                  },
                                  {
                                    default: b(() => [Te(" Visit Stall ")]),
                                    _: 2,
                                  },
                                  1032,
                                  ["onClick"]
                                ),
                              ]),
                            ]),
                            _: 2,
                          },
                          1024
                        ),
                      ]),
                      _: 2,
                    },
                    1024
                  ),
                ]
              )
            )
          ),
          128
        )),
      ]))
    : $e("", !0);
}
var Yx = Tn(Px, [["render", Wx]]);
const Hx = sn({
    name: "ProductFilter",
    props: [
      "filter",
      "currencies",
      "categories",
      "merchants",
      "profiles",
      "stalls",
    ],
    data: function () {
      return {
        merchantProfiles: [],
        filterData: {
          currency: null,
          priceFrom: 0,
          priceTo: null,
          categories: [],
          merchants: [],
          stalls: [],
        },
      };
    },
    watch: {
      categories(e, t) {
        this.filterData.categories = (e || [])
          .filter((r) => r.selected)
          .map((r) => r.category);
      },
    },
    methods: {
      clear: function () {
        (this.filterData = {
          currency: null,
          priceFrom: 0,
          priceTo: null,
          categories: [],
          merchants: [],
          stalls: [],
        }),
          this.$emit("filter-update", this.filterData);
      },
      clearPrice() {
        (this.filterData.currency = null),
          (this.filterData.priceFrom = 0),
          (this.filterData.priceTo = null);
      },
      clearMerchants() {
        this.filterData.merchants = [];
      },
      clearCategories() {
        this.filterData.categories = [];
      },
      clearStalls() {
        this.filterData.stalls = [];
      },
      search: function () {
        const e = {
          ...this.filterData,
          merchants: this.filterData.merchants.map((t) => t.value),
          stalls: this.filterData.stalls.map((t) => t.value),
        };
        this.$emit("filter-update", e);
      },
      mapMerchantProfile(e) {
        const t = this.profiles.find((r) => r.pubkey === e);
        return t
          ? {
              label:
                t.name +
                ` (${e.substring(0, 10)}...${e.substring(e.length - 10)})`,
              value: e,
            }
          : { label: e, value: e };
      },
    },
    created: async function () {
      console.log("### this.filter", this.filter),
        (this.filterData = {
          ...this.filterData,
          ...JSON.parse(JSON.stringify(this.filter || {})),
        }),
        (this.filterData.categories = [
          ...new Set(
            (this.filterData.categories || []).concat(
              (this.categories || [])
                .filter((e) => e.selected)
                .map((e) => e.category)
            )
          ),
        ]),
        (this.filterData.merchants = (this.filterData.merchants || []).map(
          this.mapMerchantProfile
        )),
        (this.filterData.stalls = (this.filterData.stalls || []).map((e) => {
          const t = this.stalls.find((r) => r.id === e) || {
            label: e,
            value: e,
          };
          return { label: t.name, value: t.id };
        })),
        (this.merchantProfiles = this.merchants.map(this.mapMerchantProfile));
    },
  }),
  Gx = { class: "row q-mt-md q-ml-md q-pr-md" },
  Kx = { class: "col-md-3 col-sm-12 col-xs-12 q-pt-sm" },
  Qx = { class: "col-md-3 col-sm-12 col-xs-12 q-pt-sm q-pl-md" },
  jx = { class: "col-md-3 col-sm-12 col-xs-12 q-pt-sm q-pl-lg" },
  Zx = { class: "col-md-3 col-sm-12 col-xs-12" },
  Jx = { class: "row q-mt-md q-ml-md q-pr-md" },
  Xx = { class: "col-9" },
  eP = { class: "col-3" },
  tP = { class: "row q-mt-md q-ml-md q-pr-md" },
  nP = { class: "col-9" },
  rP = { class: "col-3" },
  iP = { class: "row q-mt-md q-ml-md q-pr-md" },
  aP = { class: "col-9" },
  lP = { class: "col-3" };
function oP(e, t, r, a, l, s) {
  return (
    R(),
    oe(Jt, null, {
      default: b(() => [
        y(Ne, null, {
          default: b(() => [
            S("div", Gx, [
              S("div", Kx, [
                y(
                  Aa,
                  {
                    options: [...e.currencies].sort(),
                    modelValue: e.filterData.currency,
                    "onUpdate:modelValue":
                      t[0] || (t[0] = (u) => (e.filterData.currency = u)),
                    filled: "",
                    hint: "Only this Currency",
                    label: "Currency",
                  },
                  null,
                  8,
                  ["options", "modelValue"]
                ),
              ]),
              S("div", Qx, [
                y(
                  It,
                  {
                    modelValue: e.filterData.priceFrom,
                    "onUpdate:modelValue":
                      t[1] || (t[1] = (u) => (e.filterData.priceFrom = u)),
                    type: "number",
                    label: "Price From",
                    hint: "Price Starting At",
                  },
                  null,
                  8,
                  ["modelValue"]
                ),
              ]),
              S("div", jx, [
                y(
                  It,
                  {
                    modelValue: e.filterData.priceTo,
                    "onUpdate:modelValue":
                      t[2] || (t[2] = (u) => (e.filterData.priceTo = u)),
                    type: "number",
                    label: "Price To",
                    hint: "Maximum Price",
                  },
                  null,
                  8,
                  ["modelValue"]
                ),
              ]),
              S("div", Zx, [
                y(
                  ye,
                  {
                    onClick: t[3] || (t[3] = (u) => e.clearPrice()),
                    flat: "",
                    color: "grey",
                    class: "float-right q-mt-sm",
                  },
                  { default: b(() => [Te(" Clear")]), _: 1 }
                ),
              ]),
            ]),
          ]),
          _: 1,
        }),
        y(Ne, null, {
          default: b(() => [
            S("div", Jx, [
              S("div", Xx, [
                y(
                  Aa,
                  {
                    options: [...e.categories.map((u) => u.category).sort()],
                    modelValue: e.filterData.categories,
                    "onUpdate:modelValue":
                      t[4] || (t[4] = (u) => (e.filterData.categories = u)),
                    filled: "",
                    multiple: "",
                    "use-chips": "",
                    "stack-label": "",
                    hint: "Any of these Categories",
                    label: "Categories",
                  },
                  null,
                  8,
                  ["options", "modelValue"]
                ),
              ]),
              S("div", eP, [
                y(
                  ye,
                  {
                    onClick: t[5] || (t[5] = (u) => e.clearCategories()),
                    flat: "",
                    color: "grey",
                    class: "float-right q-mt-sm",
                  },
                  { default: b(() => [Te(" Clear")]), _: 1 }
                ),
              ]),
            ]),
            S("div", tP, [
              S("div", nP, [
                y(
                  Aa,
                  {
                    options: e.merchantProfiles,
                    modelValue: e.filterData.merchants,
                    "onUpdate:modelValue":
                      t[6] || (t[6] = (u) => (e.filterData.merchants = u)),
                    filled: "",
                    multiple: "",
                    "use-chips": "",
                    "stack-label": "",
                    hint: "Only these Merchant",
                    label: "Merchants",
                  },
                  null,
                  8,
                  ["options", "modelValue"]
                ),
              ]),
              S("div", rP, [
                y(
                  ye,
                  {
                    onClick: t[7] || (t[7] = (u) => e.clearMerchants()),
                    flat: "",
                    color: "grey",
                    class: "float-right q-mt-sm",
                  },
                  { default: b(() => [Te(" Clear")]), _: 1 }
                ),
              ]),
            ]),
            S("div", iP, [
              S("div", aP, [
                y(
                  Aa,
                  {
                    options: e.stalls.map((u) => ({
                      label: u.name,
                      value: u.id,
                    })),
                    modelValue: e.filterData.stalls,
                    "onUpdate:modelValue":
                      t[8] || (t[8] = (u) => (e.filterData.stalls = u)),
                    filled: "",
                    multiple: "",
                    "use-chips": "",
                    "stack-label": "",
                    hint: "Only these Stalls",
                    label: "Stalls",
                  },
                  null,
                  8,
                  ["options", "modelValue"]
                ),
              ]),
              S("div", lP, [
                y(
                  ye,
                  {
                    onClick: t[9] || (t[9] = (u) => e.clearStalls()),
                    flat: "",
                    color: "grey",
                    class: "float-right q-mt-sm",
                  },
                  { default: b(() => [Te(" Clear")]), _: 1 }
                ),
              ]),
            ]),
          ]),
          _: 1,
        }),
        y(ut),
        y(
          yi,
          { align: "right" },
          {
            default: b(() => [
              y(
                ye,
                {
                  onClick: t[10] || (t[10] = (u) => e.clear()),
                  flat: "",
                  color: "grey",
                },
                { default: b(() => [Te(" Clear All Filters")]), _: 1 }
              ),
              y(
                ye,
                {
                  onClick: t[11] || (t[11] = (u) => e.search()),
                  flat: "",
                  icon: "search",
                  color: "primary",
                  class: "q-mr-md",
                },
                { default: b(() => [Te(" Search ")]), _: 1 }
              ),
            ]),
            _: 1,
          }
        ),
      ]),
      _: 1,
    })
  );
}
var sP = Tn(Hx, [["render", oP]]);
const uP = { class: "row q-mb-md" },
  cP = { class: "col-lg-1 col-md-1 gt-sm" },
  dP = ["src"],
  fP = { class: "col-lg-7 col-md-5 col-12 auto-width" },
  hP = S("div", { id: "search-text" }, null, -1),
  gP = { class: "col-lg-4 col-md-6 col-12" },
  mP = { class: "float-right" },
  vP = ["textContent"],
  pP = ["textContent"],
  yP = { key: 0, class: "gt-sm" },
  _P = ["textContent", "onClick"],
  bP = ["textContent"],
  wP = S(
    "div",
    { class: "text-h6" },
    " There are no relays configured at this moment. ",
    -1
  ),
  SP = S(
    "div",
    { class: "text-subtitle2" },
    " Start by creating or importing a market. ",
    -1
  ),
  kP = { key: 2, class: "row q-mb-sm" },
  CP = { class: "col-12 text-center" },
  TP = { key: 0, class: "absolute-bottom text-subtitle1 text-center" },
  MP = ["textContent"],
  DP = { class: "row q-mb-sm" },
  qP = { class: "col-md-10 col-sm-7 auto-width" },
  xP = ["textContent"],
  PP = S("strong", null, "All markets", -1),
  AP = ["textContent"],
  EP = ["textContent"],
  IP = { class: "col-md-2 col-sm-5" },
  $P = { key: 3, class: "row q-mb-sm" },
  RP = { class: "col-12 text-center" },
  OP = { key: 12 },
  LP = S("strong", { class: "text-h4" }, "Welcome to the Nostr Market!", -1),
  NP = S(
    "strong",
    { class: "text-h5 q-mt-lg" },
    "In order to start you can:",
    -1
  ),
  BP = { class: "text-h6" },
  FP = { class: "text-h6" },
  UP = { class: "text-h6" },
  VP = S("code", null, "naddr", -1),
  zP = { key: 13 },
  WP = S("div", { class: "text-h6" }, "Account Setup", -1),
  YP = S("p", null, "Enter your Nostr private key or generate a new one.", -1),
  HP = { class: "text-center q-mb-lg" },
  GP = { key: 0, class: "q-my-lg" },
  KP = ["textContent"],
  QP = ["href"],
  jP = { key: 0, ratio: 1 },
  ZP = { key: 1 },
  JP = { class: "row q-mt-lg" },
  XP = sn({
    name: "MarketPage",
    components: { MarketConfig: Pg },
    data: function () {
      return {
        account: null,
        accountMetadata: null,
        accountDialog: { show: !1, data: { watchOnly: !1, key: null } },
        relaysData: {},
        markets: [],
        shoppingCarts: [],
        checkoutCart: null,
        checkoutStall: null,
        activePage: "market",
        activeOrderId: null,
        dmSubscriptions: {},
        allMarketsSelected: !1,
        qrCodeDialog: {
          data: { payment_request: null, message: null },
          dismissMsg: null,
          show: !1,
        },
        groupByStall: !1,
        relays: new Set(),
        stalls: [],
        products: [],
        orders: {},
        profiles: [],
        bannerImage: null,
        logoImage: null,
        isLoading: !1,
        showFilterDetails: !1,
        searchText: null,
        filterData: {
          categories: [],
          merchants: [],
          stalls: [],
          currency: null,
          priceFrom: null,
          priceTo: null,
        },
        dmEvents: null,
        activeMarket: null,
        activeStall: null,
        activeProduct: null,
        pool: null,
        config: { opts: null },
        defaultBanner: this.$q.config.staticPath + "images/nostr-cover.png",
        defaultLogo: this.$q.config.staticPath + "images/nostr-avatar.png",
        defaultMarketNaddr:
          "naddr1qqjr2e34v3jrzd3e95ensdfn956rywps94snwcmr95crvepexc6kxcfcxqmnvqg5waehxw309aex2mrp0yhxgctdw4eju6t0qyv8wumn8ghj7un9d3shjtnndehhyapwwdhkx6tpdsq36amnwvaz7tmwdaehgu3dwp6kytnhv4kxcmmjv3jhytnwv46qzxthwden5te0dehhxarj9eax2cn9v3jk2tnrd3hh2eqprfmhxue69uhhyetvv9ujummjv9hxwetsd9kxctnyv4mqzrthwden5te0dehhxtnvdakqz9rhwden5te0wfjkccte9ehx7um5wghxyecpzpmhxue69uhkummnw3ezuamfdejsz9thwden5te0v4jx2m3wdehhxarj9ekxzmnyqgstle9w09rt8y7xdlqs33v23vqvdtqx6j6j2wa4984g9n77tppx2tqrqsqqqa2ruusd5z",
        readNotes: { merchants: !1, marketUi: !1 },
      };
    },
    watch: {
      config(e, t) {
        var r, a, l, s;
        (a = (r = e == null ? void 0 : e.opts) == null ? void 0 : r.ui) !=
          null && a.banner
          ? ((this.bannerImage = null),
            setTimeout(() => {
              var u, d;
              this.bannerImage = this.sanitizeImageSrc(
                (d =
                  (u = e == null ? void 0 : e.opts) == null ? void 0 : u.ui) ==
                  null
                  ? void 0
                  : d.banner,
                this.defaultBanner
              );
            }))
          : (this.bannerImage = this.defaultBanner),
          (s = (l = e == null ? void 0 : e.opts) == null ? void 0 : l.ui) !=
            null && s.picture
            ? ((this.logoImage = null),
              setTimeout(() => {
                var u, d;
                this.logoImage = this.sanitizeImageSrc(
                  (d =
                    (u = e == null ? void 0 : e.opts) == null
                      ? void 0
                      : u.ui) == null
                    ? void 0
                    : d.picture,
                  this.defaultLogo
                );
              }))
            : (this.logoImage = this.defaultLogo);
      },
      searchText(e, t) {
        if (!!e && e.toLowerCase().startsWith("naddr"))
          try {
            const { type: r, data: a } = NostrTools.nip19.decode(e);
            if (r !== "naddr" || a.kind !== 30019) return;
            this.$q
              .dialog(confirm("Do you want to import this market profile?"))
              .onOk(async () => {
                (this.searchText = ""), await this.addMarket(e);
              });
          } catch {}
      },
    },
    computed: {
      selectedMarketsMerchants() {
        return [
          ...new Set(
            this.markets
              .filter((e) => e.selected)
              .map((e) => e.opts.merchants)
              .flat()
          ),
        ];
      },
      filteredProducts() {
        const e = (g) => {
            var v;
            return (
              !((v = this.filterData.merchants) != null && v.length) ||
              this.filterData.merchants.includes(g)
            );
          },
          t = (g) => this.selectedMarketsMerchants.includes(g),
          r = (g) => {
            var v;
            return (
              !((v = this.filterData.stalls) != null && v.length) ||
              this.filterData.stalls.includes(g)
            );
          },
          a = (g) =>
            !this.filterData.currency ||
            this.filterData.currency.toLowerCase() === g.toLowerCase(),
          l = (g) =>
            !this.filterData.priceFrom || g >= this.filterData.priceFrom,
          s = (g) => !this.filterData.priceTo || g <= this.filterData.priceTo,
          u = (g) => !this.activeStall || g == this.activeStall;
        let d = this.products.filter(
          (g) =>
            this.hasCategory(g.categories) &&
            u(g.stall_id) &&
            e(g.pubkey) &&
            t(g.pubkey) &&
            r(g.stall_id) &&
            a(g.currency) &&
            l(g.price) &&
            s(g.price)
        );
        if (!this.searchText || this.searchText.length < 2) return d;
        const f = this.searchText.toLowerCase();
        return d.filter(
          (g) =>
            g.name.toLowerCase().includes(f) ||
            (g.description && g.description.toLowerCase().includes(f)) ||
            (g.categories && g.categories.toString().toLowerCase().includes(f))
        );
      },
      filterCount() {
        let e = 0;
        return (
          this.filterData.currency && e++,
          this.filterData.priceFrom && e++,
          this.filterData.priceTo && e++,
          this.filterData.categories &&
            (e += this.filterData.categories.length),
          this.filterData.merchants && (e += this.filterData.merchants.length),
          this.filterData.stalls && (e += this.filterData.stalls.length),
          e
        );
      },
      filterStalls() {
        const e = this.stalls
          .map((r) => ({
            ...r,
            categories: this.allStallCatgories(r.id),
            images: this.allStallImages(r.id).slice(0, 8),
            productCount: this.products.filter((a) => a.stall_id === r.id)
              .length,
          }))
          .filter((r) => this.hasCategory(r.categories));
        if (!this.searchText || this.searchText.length < 2) return e;
        const t = this.searchText.toLowerCase();
        return this.stalls.filter(
          (r) =>
            r.name.toLowerCase().includes(t) ||
            (r.description && r.description.toLowerCase().includes(t)) ||
            (r.categories && r.categories.toString().toLowerCase().includes(t))
        );
      },
      marketsName() {
        var t, r;
        if (this.activeMarket)
          return (
            ((t = this.activeMarket.opts) == null ? void 0 : t.name) || "Market"
          );
        const e = this.markets.filter((a) => a.selected);
        return e.length === 0
          ? "No Market"
          : e.length === 1
          ? ((r = e[0].opts) == null ? void 0 : r.name) || "Market"
          : e.length + " Markets";
      },
      stallName() {
        var e;
        return (
          ((e = this.stalls.find((t) => t.id == this.activeStall)) == null
            ? void 0
            : e.name) || "Stall"
        );
      },
      productName() {
        var e;
        return (
          ((e = this.products.find((t) => t.id == this.activeProduct)) == null
            ? void 0
            : e.name) || "Product"
        );
      },
      isValidAccountKey() {
        return isValidKey(this.accountDialog.data.key);
      },
      allCartsItemCount() {
        return this.shoppingCarts
          .map((e) => e.products)
          .flat()
          .reduce((e, t) => e + t.orderedQuantity, 0);
      },
      allCategories() {
        const t = this.products
          .map((r) => r.categories)
          .flat()
          .filter((r) => !!r)
          .map((r) => r.toLowerCase())
          .reduce((r, a) => ((r[a] = (r[a] || 0) + 1), r), {});
        return Object.keys(t)
          .map((r) => ({
            category: r,
            count: t[r],
            selected: this.filterData.categories.indexOf(r) !== -1,
          }))
          .sort((r, a) => a.count - r.count);
      },
      allCurrencies() {
        const e = this.products.map((t) => t.currency.toUpperCase());
        return [...new Set(e)];
      },
      allMerchants() {
        return [...new Set(this.markets.map((e) => e.opts.merchants).flat())];
      },
      allRelays() {
        return [...new Set(this.markets.map((e) => e.relays).flat())];
      },
      processedEventIds() {
        const e = this.stalls.map((r) => r.eventId),
          t = this.products.map((r) => r.eventId);
        return e.concat(t);
      },
      activeMarketRelaysData() {
        return this.activeMarket
          ? Object.values(this.relaysData).filter(
              (e) => e && this.activeMarket.relays.includes(e.relayUrl)
            )
          : [];
      },
      dmPeers() {
        this.dmEvents;
        const e = "nostrmarket.dm.";
        return this.$q.localStorage
          .getAllKeys()
          .filter((r) => r.startsWith(e))
          .map((r) => r.substring(e.length));
      },
    },
    async created() {
      (this.bannerImage = this.defaultBanner),
        (this.logoImage = this.defaultLogo),
        this._restoreFromStorage();
      const e = new URLSearchParams(window.location.search);
      await this.addMarket(e.get("naddr")),
        await this._handleQueryParams(e),
        (this.isLoading = !1),
        this._loadRelaysData(),
        this._startRelaysHealtCheck();
    },
    methods: {
      async _handleQueryParams(e) {
        const t = e.get("merchant");
        console.log("### merchantPubkey", t);
        const r = e.get("stall"),
          a = e.get("product");
        r &&
          (this.setActivePage("customer-stall"),
          a && (this.activeProduct = a),
          (this.activeStall = r)),
          t &&
            (isValidKey(t)
              ? this.allMerchants.includes(t)
                ? this.$q.notify({
                    message: "Request (URL) merchant already exists!",
                    type: "positive",
                  })
                : this.$q
                    .dialog(
                      confirm(
                        "We found a merchant pubkey in your request. Do you want to add it to the merchants list?"
                      )
                    )
                    .onOk(async () => {
                      this.createMarket(!1, [t]);
                    })
              : this.$q.notify({
                  message: "Invalid merchant public key!",
                  icon: "warning",
                }));
      },
      _applyUiConfigs(e = {}) {
        const { name: t, about: r, ui: a } = e;
        this.$q.localStorage.set("nostrmarket.marketplaceConfig", {
          name: t,
          about: r,
          ui: a,
        }),
          a != null &&
            a.theme &&
            document.body.setAttribute("data-theme", a.theme),
          this.$q.dark.set(!!(a != null && a.darkMode));
      },
      handleFilterData(e) {
        console.log("### handleFilterData", e),
          (this.filterData = e),
          this.setActivePage("market");
      },
      async updateUiConfig(e = { opts: {} }) {
        var l;
        const { name: t, about: r, ui: a } = e.opts;
        (this.config = {
          ...this.config,
          opts: { ...this.config.opts, name: t, about: r, ui: a },
        }),
          this._applyUiConfigs((l = this.config) == null ? void 0 : l.opts);
      },
      generateKeyPair() {
        (this.accountDialog.data.key = NostrTools.generatePrivateKey()),
          (this.accountDialog.data.watchOnly = !1);
      },
      openAccountDialog() {
        this.accountDialog.show = !0;
      },
      async createAccount() {
        if (isValidKey(this.accountDialog.data.key, "nsec")) {
          let { key: e, watchOnly: t } = this.accountDialog.data;
          if (e.startsWith("n")) {
            let { type: l, data: s } = NostrTools.nip19.decode(e);
            e = s;
          }
          const r = t ? null : e,
            a = t ? e : NostrTools.getPublicKey(e);
          this.$q.localStorage.set("nostrmarket.account", {
            privkey: r,
            pubkey: a,
            nsec: NostrTools.nip19.nsecEncode(e),
            npub: NostrTools.nip19.npubEncode(a),
            useExtension: !1,
          }),
            (this.accountDialog.data = { watchOnly: !1, key: null }),
            (this.accountDialog.show = !1),
            (this.account = this.$q.localStorage.getItem(
              "nostrmarket.account"
            )),
            await this._requeryAllRelays();
        }
        this.accountDialog.show = !1;
      },
      logout() {
        window.localStorage.removeItem("nostrmarket.account"),
          this._clearNonAccountData(),
          (window.location.href =
            window.location.origin + window.location.pathname),
          (this.account = null),
          (this.accountMetadata = null);
      },
      clearAllData() {
        this.$q
          .dialog(
            confirm(
              "This will remove all information about merchants, products, relays and others. You will NOT be logged out. Do you want to proceed?"
            )
          )
          .onOk(async () => {
            this._clearNonAccountData(),
              (window.location.href =
                window.location.origin + window.location.pathname);
          });
      },
      _clearNonAccountData() {
        this.$q.localStorage
          .getAllKeys()
          .filter((e) => e !== "nostrmarket.account")
          .forEach((e) => window.localStorage.removeItem(e)),
          (this.orders = []),
          (this.config = { opts: null }),
          (this.shoppingCarts = []),
          (this.checkoutCart = null);
      },
      _startRelaysHealtCheck() {
        setInterval(() => {
          Object.keys(this.relaysData).forEach((e) => {
            this.relaysData[e].relay.status === WebSocket.CLOSED &&
              this._connectToRelay(e);
          });
        }, 30 * 1e3);
      },
      async _toRelayKey(e) {
        return "relay_" + (await hash(e));
      },
      async _loadRelaysData() {
        for (const e of this.markets)
          for (const t of e.relays)
            await this._loadRelayData(t, e.opts.merchants);
        Object.keys(this.relaysData).forEach(this._connectToRelay);
      },
      async _loadRelayData(e, t) {
        const r = await this._toRelayKey(e);
        this.relaysData[r] = this.relaysData[r] || {
          relayUrl: e,
          connected: !1,
          error: null,
          merchants: [],
          lastEventAt: this.getLastEventDateForRelay(e),
        };
        const a = this.relaysData[r];
        a.merchants = [...new Set(a.merchants.concat(t))];
      },
      getLastEventDateForRelay(e) {
        const t = (
          this.$q.localStorage.getItem("nostrmarket.relays") || []
        ).find((r) => r.relayUrl === e);
        return (
          console.log("### getLastEventForRelay", e, t),
          (t == null ? void 0 : t.lastEventAt) || 0
        );
      },
      async _connectToRelay(e) {
        const t = this.relaysData[e];
        try {
          console.log(`Trying to connect to relay ${t.relayUrl}`),
            (t.relay = NostrTools.relayInit(t.relayUrl)),
            t.relay.on("connect", () => {
              (t.connected = !0),
                (t.error = null),
                console.log(`Connected to relay ${t.relayUrl}`),
                this._queryRelay(e);
            }),
            t.relay.on("error", (r) => {
              console.warn(`Error by relay ${t.relayUrl}`),
                (t.connected = !1),
                (t.error = r);
            }),
            await t.relay.connect();
        } catch (r) {
          (t.connected = !1),
            (t.error = `${r}`),
            console.warn(`Failed to connect to ${t.relayUrl}`);
        }
      },
      async _requeryAllRelays() {
        Object.keys(this.relaysData).forEach(async (e) => {
          await this._requeryRelay(e);
        });
      },
      async _requeryRelay(e) {
        var r;
        const t = this.relaysData[e];
        t.connected && ((r = t.sub) == null || r.unsub(), this._queryRelay(e));
      },
      _buildRelayFilters(e) {
        var a;
        const t = e.merchants,
          r = [
            {
              kinds: [0, 5, 30017, 30018],
              authors: t,
              since: e.lastEventAt + 1,
            },
          ];
        if ((a = this.account) != null && a.pubkey) {
          const l = this._noDmEvents() ? 0 : e.lastEventAt + 1;
          r.push(
            { kinds: [4], "#p": [this.account.pubkey], since: l },
            { kinds: [4], authors: [this.account.pubkey], since: l }
          );
        }
        return r;
      },
      async _queryRelay(e) {
        const t = this.relaysData[e],
          r = this._buildRelayFilters(t),
          a = await t.relay.list(r);
        console.log("### _queryRelay.filters", t.relayUrl, r),
          console.log("### _queryRelay.events", t.relayUrl, a),
          a != null && a.length && (await this._processEvents(a, t)),
          (t.sub = t.relay.sub(r)),
          t.sub.on(
            "event",
            (l) => {
              this._processEvents([l], t);
            },
            { id: "masterSub" }
          );
      },
      async _publishEventToRelays(e, t) {
        let r = 0;
        for (const a of t) (await this._publishEventToRelay(e, a)) && r++;
        return r;
      },
      async _publishEventToRelay(e, t) {
        try {
          const r = await this._toRelayKey(t),
            a = this.relaysData[r];
          return a != null && a.connected && (await a.relay.publish(e)), !0;
        } catch (r) {
          return console.warn(r), !1;
        }
      },
      _findRelaysForMerchant(e) {
        const t = this.markets
          .filter((r) => r.opts.merchants.includes(e))
          .map((r) => r.relays)
          .flat();
        return [...new Set(t)];
      },
      _processEvents(e, t) {
        if (!(e != null && e.length)) return;
        console.log("### _processEvents", t.relayUrl, e);
        const r = e.sort((a, l) => l.created_at - a.created_at)[0].created_at;
        (t.lastEventAt = Math.max(r, t.lastEventAt)),
          (e = e
            .filter((a) => !this.processedEventIds.includes(a.id))
            .map((a) => ({ ...a, relayUrl: t.relayUrl }))
            .map(eventToObj)),
          e.filter((a) => a.kind === 0).forEach(this._processProfileEvents),
          e.filter((a) => a.kind === 4).forEach(this._processDmEvents),
          e.filter((a) => a.kind === 5).forEach(this._processDeleteEvents),
          e.filter((a) => a.kind === 30017).forEach(this._processStallEvents),
          e.filter((a) => a.kind === 30018).forEach(this._processProductEvents),
          this._persistStallsAndProducts(),
          this._persistRelaysData();
      },
      _processProfileEvents(e) {
        try {
          (this.profiles = this.profiles.filter((t) => t.pubkey !== e.pubkey)),
            this.profiles.push({ pubkey: e.pubkey, ...e.content }),
            this.$q.localStorage.set("nostrmarket.profiles", this.profiles);
        } catch (t) {
          console.warn(t);
        }
      },
      _processStallEvents(e) {
        this._processStall({
          ...e.content,
          id: e.d,
          pubkey: e.pubkey,
          createdAt: e.created_at,
          eventId: e.id,
          relayUrls: [e.relayUrl],
        });
      },
      _processStall(e) {
        const t = this.stalls.findIndex(
          (a) => a.id === e.id && a.pubkey === e.pubkey
        );
        if (t === -1) {
          this.stalls.push(e);
          return;
        }
        this.stalls[t].createdAt < e.createdAt &&
          (this.stalls.splice(t, 1, e),
          this.products
            .filter((a) => a.pubkey === e.pubkey && a.stall_id === e.id)
            .forEach((a) => (a.stallName = e.name)));
      },
      _processProductEvents(e) {
        const t = { ...e.content },
          r = this.stalls.find((a) => a.id == t.stall_id);
        !r ||
          (t.currency != "sat" &&
            (t.formatedPrice = this.getAmountFormated(t.price, t.currency)),
          this._processProduct({
            ...t,
            stallName: r.name,
            images: t.images || [t.image],
            pubkey: e.pubkey,
            id: e.d,
            categories: e.t,
            eventId: e.id,
            createdAt: e.created_at,
            relayUrls: [e.relayUrl],
          }));
      },
      _processProduct(e) {
        const t = this.products.findIndex(
          (a) => a.id === e.id && a.pubkey === e.pubkey
        );
        if (t === -1) {
          this.products.push(e);
          return;
        }
        const r = this.products[t];
        (r.relayUrls = [...new Set(e.relayUrls.concat(r.relayUrls))]),
          r.createdAt < e.createdAt && this.products.splice(t, 1, e);
      },
      async _processDmEvents(e) {
        var l;
        if (!((l = this.account) != null && l.pubkey)) return;
        const t = e.tags.find(([s, u]) => s === "p" && u && u !== "")[1],
          r = e.pubkey === this.account.pubkey;
        if (t !== this.account.pubkey && !r) {
          console.warn("Unexpected DM. Dropped!");
          return;
        }
        const a = r ? t : e.pubkey;
        (e.content = await NostrTools.nip04.decrypt(
          this.account.privkey,
          a,
          e.content
        )),
          this._persistDMEvent(e, a),
          isJson(e.content) && (await this._handleStructuredDm(e, a));
      },
      async _processDeleteEvents(e) {
        const t = (e.tags || []).filter((s) => s[0] === "e").map((s) => s[1]),
          r = this.stalls
            .filter((s) => s.pubkey === e.pubkey && t.includes(s.eventId))
            .map((s) => s.id),
          a = (s) =>
            s.pubkey === e.pubkey &&
            (t.includes(s.eventId) || r.includes(s.stall_id));
        this.products = this.products.filter((s) => !a(s));
        const l = (s) => s.pubkey === e.pubkey && t.includes(s.eventId);
        this.stalls = this.stalls.filter((s) => !l(s));
      },
      async createMarket(e, t) {
        var r;
        try {
          this.setActivePage("loading");
          const a = {
            d: crypto.randomUUID(),
            pubkey: ((r = this.account) == null ? void 0 : r.pubkey) || "",
            relays: [...defaultRelays],
            selected: !0,
            opts: { name: "New Market", merchants: t || [], ui: {} },
          };
          this.markets.unshift(a),
            this.$q.localStorage.set("nostrmarket.markets", this.markets);
          for (const l of a.relays) this._handleNewRelay(l, a);
          e === !0 && this.showMarketConfig(0);
        } catch (a) {
          console.warn(a);
        } finally {
          this.setActivePage("market-config");
        }
      },
      async addMarket(e) {
        if (!!e)
          try {
            this.setActivePage("loading");
            const { type: t, data: r } = NostrTools.nip19.decode(e);
            if (t !== "naddr" || r.kind !== 30019) return;
            const a = {
                d: r.identifier,
                pubkey: r.pubkey,
                relays: r.relays,
                selected: !0,
              },
              s = await new NostrTools.SimplePool().get(a.relays, {
                kinds: [30019],
                limit: 1,
                authors: [a.pubkey],
                "#d": [a.d],
              });
            if (!s) return;
            isJson(s.content) &&
              ((a.opts = JSON.parse(s.content)),
              this.$q
                .dialog(
                  confirm(
                    `Do you want to use the look and feel of the '${a.opts.name}' market?`
                  )
                )
                .onOk(async () => {
                  (this.config = { ...this.config, opts: a.opts }),
                    this._applyUiConfigs(a == null ? void 0 : a.opts);
                })),
              (this.markets = this.markets.filter(
                (u) => u.d !== a.d || u.pubkey !== a.pubkey
              )),
              this.markets.unshift(a),
              this.$q.localStorage.set("nostrmarket.markets", this.markets);
            for (const u of a.relays) await this._handleNewRelay(u, a);
          } catch (t) {
            console.warn(t);
          } finally {
            this.setActivePage("market");
          }
      },
      updateMarket(e) {
        var t, r;
        try {
          this.isLoading = !0;
          const { d: a, pubkey: l } = e,
            s = this.markets.find((v) => v.d === a && v.pubkey === l) || {},
            u =
              (t = e.opts) == null
                ? void 0
                : t.merchants.filter((v) => {
                    var T;
                    return !((T = s.opts) != null && T.merchants.includes(v));
                  }),
            d =
              (r = s.opts) == null
                ? void 0
                : r.merchants.filter((v) => {
                    var T;
                    return !((T = e.opts) != null && T.merchants.includes(v));
                  }),
            f = e.relays.filter((v) => !s.relays.includes(v)),
            g = s.relays.filter((v) => !e.relays.includes(v));
          (this.markets = this.markets.filter(
            (v) => v.d !== a || v.pubkey !== l
          )),
            this.markets.unshift(e),
            this.$q.localStorage.set("nostrmarket.markets", this.markets),
            d == null || d.forEach(this._handleRemoveMerchant),
            u == null || u.forEach((v) => this._handleNewMerchant(e, v)),
            console.log("### newRelays", f),
            console.log("### removedRelays", g),
            f == null || f.forEach((v) => this._handleNewRelay(v, e)),
            g == null || g.forEach(this._handleRemovedRelay),
            this._persistStallsAndProducts(),
            this._persistRelaysData();
        } catch (a) {
          console.warn(a);
        } finally {
          this.isLoading = !1;
        }
      },
      deleteMarket(e) {
        var t, r;
        try {
          this.isLoading = !0;
          const { d: a, pubkey: l } = e;
          (this.markets = this.markets.filter(
            (s) => s.d !== a || s.pubkey !== l
          )),
            this.$q.localStorage.set("nostrmarket.markets", this.markets),
            this.activeMarket &&
              this.activeMarket.d === a &&
              this.activeMarket.pubkey === l &&
              ((this.activeMarket = null),
              this.navigateTo("market"),
              this.updateUiConfig(this.markets[0])),
            (t = e.opts.merchants) == null ||
              t.forEach(this._handleRemoveMerchant),
            (r = e.relays) == null || r.forEach(this._handleRemovedRelay),
            this._persistStallsAndProducts(),
            this._persistRelaysData();
        } catch (a) {
          console.warn(a);
        } finally {
          this.isLoading = !1;
        }
      },
      toggleMarket() {
        (this.allMarketsSelected = !this.markets.find((e) => !e.selected)),
          this.$q.localStorage.set("nostrmarket.markets", this.markets);
      },
      toggleAllMarkets() {
        this.markets.forEach((e) => (e.selected = this.allMarketsSelected)),
          this.$q.localStorage.set("nostrmarket.markets", this.markets);
      },
      showMarketConfig(e) {
        (this.activeMarket = this.markets[e]),
          this.transitToPage("market-config");
      },
      async publishNaddr(e) {
        var l, s;
        if (!((l = this.account) != null && l.privkey)) {
          this.openAccountDialog(),
            this.$q.notify({ message: "Login Required!", icon: "warning" });
          return;
        }
        console.log("### marketData", e);
        const t = (s = e.d) != null ? s : crypto.randomUUID(),
          r = {
            ...(await NostrTools.getBlankEvent()),
            kind: 30019,
            content: JSON.stringify(e.opts),
            created_at: Math.floor(Date.now() / 1e3),
            tags: [["d", t]],
            pubkey: this.account.pubkey,
          };
        r.id = NostrTools.getEventHash(r);
        try {
          r.sig = await NostrTools.signEvent(r, this.account.privkey);
          const u = await this._publishEventToRelays(r, e.relays);
          this.$q.notify({
            type: u ? "positive" : "warning",
            message: u
              ? `The market profile has been published tp (${u} relays)!`
              : "The market profile could not be published",
          });
        } catch (u) {
          console.error(u),
            this.$q.notify({
              message: "Cannot publish market profile",
              caption: `Error: ${u}`,
              color: "negative",
            });
          return;
        }
        const a = NostrTools.nip19.naddrEncode({
          pubkey: r.pubkey,
          kind: 30019,
          identifier: t,
          relays: e.relays,
        });
        this.copyText(a);
      },
      _handleNewMerchant(e, t) {
        Object.keys(this.relaysData).forEach(async (r) => {
          const a = this.relaysData[r];
          if (!e.relays.includes(a.relayUrl) || a.merchants.includes(t)) return;
          const l = await a.relay.list([
            { kinds: [0, 30017, 30018], authors: [t] },
          ]);
          await this._processEvents(l, a),
            a.merchants.push(t),
            await this._requeryRelay(r);
        });
      },
      async _handleNewRelay(e, t) {
        const r = await this._toRelayKey(e);
        if (this.relaysData[r]) {
          const a = this.relaysData[r],
            l = await a.relay.list([
              { kinds: [0, 30017, 30018], authors: t.opts.merchants },
            ]);
          await this._processEvents(l, a),
            (a.merchants = [...new Set(a.merchants.concat(t.opts.merchants))]),
            await this._requeryRelay(r);
        } else
          await this._loadRelayData(e, t.opts.merchants),
            await this._connectToRelay(r);
      },
      _handleRemoveMerchant(e) {
        this.markets.find((r) => r.opts.merchants.find((a) => a === e)) ||
          ((this.products = this.products.filter((r) => r.pubkey !== e)),
          (this.stalls = this.stalls.filter((r) => r.pubkey !== e)),
          this._removeSubscriptionsForMerchant(e));
      },
      _removeSubscriptionsForMerchant(e) {
        Object.keys(this.relaysData).forEach(async (t) => {
          const r = this.relaysData[t];
          !r.merchants.includes(e) ||
            ((r.merchants = r.merchants.filter((a) => a !== e)),
            await this._requeryRelay(t));
        });
      },
      async _handleRemovedRelay(e) {
        if (!this.markets.find((r) => r.relays.find((a) => a === e))) {
          const r = await this._toRelayKey(e);
          delete this.relaysData[r], this._persistRelaysData();
        }
      },
      addProductToCart(e) {
        let t = this.shoppingCarts.find((a) => a.id === e.stall_id);
        t ||
          ((t = { id: e.stall_id, products: [] }), this.shoppingCarts.push(t)),
          (t.merchant = e.pubkey);
        let r = t.products.find((a) => a.id === e.id);
        r || ((r = { ...e, orderedQuantity: 0 }), t.products.push(r)),
          (r.orderedQuantity = Math.min(
            r.quantity,
            e.orderedQuantity || r.orderedQuantity + 1
          )),
          this.$q.localStorage.set(
            "nostrmarket.shoppingCarts",
            this.shoppingCarts
          ),
          this.$q.notify({
            type: "positive",
            message: "Product added to cart!",
          });
      },
      removeProductFromCart(e) {
        const t = this.shoppingCarts.find((r) => r.id === e.stallId);
        t &&
          ((t.products = t.products.filter((r) => r.id !== e.productId)),
          t.products.length ||
            (this.shoppingCarts = this.shoppingCarts.filter(
              (r) => r.id !== e.stallId
            )),
          this.$q.localStorage.set(
            "nostrmarket.shoppingCarts",
            this.shoppingCarts
          ));
      },
      removeCart(e) {
        (this.shoppingCarts = this.shoppingCarts.filter((t) => t.id !== e)),
          this.$q.localStorage.set(
            "nostrmarket.shoppingCarts",
            this.shoppingCarts
          );
      },
      checkoutStallCart(e) {
        (this.checkoutCart = e),
          (this.checkoutStall = this.stalls.find((t) => t.id === e.id)),
          this.setActivePage("shopping-cart-checkout");
      },
      handleDmChatSelected(e) {
        this.dmEvents =
          this.$q.localStorage.getItem(`nostrmarket.dm.${e}`) || {};
      },
      async sendDirectMessage(e) {
        var t;
        if (!((t = this.account) != null && t.pubkey)) {
          this.$q.notify({
            type: "warning",
            message: "Cannot send message. No user logged in!",
          });
          return;
        }
        try {
          const r = {
            ...(await NostrTools.getBlankEvent()),
            kind: 4,
            created_at: Math.floor(Date.now() / 1e3),
            tags: [["p", e.to]],
            pubkey: this.account.pubkey,
          };
          (r.content = await NostrTools.nip04.encrypt(
            this.account.privkey,
            e.to,
            e.message
          )),
            (r.id = NostrTools.getEventHash(r)),
            (r.sig = await NostrTools.signEvent(r, this.account.privkey)),
            await this._sendDmEvent(r),
            (r.content = e.message),
            this._persistDMEvent(r, e.to);
        } catch {
          this.$q.notify({
            type: "warning",
            message: "Failed to send message!",
          });
        }
      },
      async _sendDmEvent(e) {
        const t = e.tags.filter((a) => a[0] === "p").map((a) => a[1]);
        let r = this._findRelaysForMerchant(t[0]);
        (r != null && r.length) || (r = [...defaultRelays]),
          await this._publishEventToRelays(e, r);
      },
      _noDmEvents() {
        return (
          this.$q.localStorage
            .getAllKeys()
            .filter((t) => t.startsWith("nostrmarket.dm")).length === 0
        );
      },
      async placeOrder({ event: e, order: t, cartId: r }) {
        var a;
        if (!((a = this.account) != null && a.privkey)) {
          this.openAccountDialog();
          return;
        }
        try {
          (this.activeOrderId = t.id),
            (e.content = await NostrTools.nip04.encrypt(
              this.account.privkey,
              this.checkoutStall.pubkey,
              JSON.stringify(t)
            )),
            (e.id = NostrTools.getEventHash(e)),
            (e.sig = await NostrTools.signEvent(e, this.account.privkey)),
            await this._sendOrderEvent(e),
            this._persistOrderUpdate(
              this.checkoutStall.pubkey,
              e.created_at,
              t
            ),
            this.removeCart(r),
            this.setActivePage("shopping-cart-list");
        } catch (l) {
          console.warn(l),
            this.$q.notify({
              type: "warning",
              message: "Failed to place order!",
            });
        }
      },
      async _sendOrderEvent(e) {
        const t = e.tags.filter((l) => l[0] === "p").map((l) => l[1]),
          r = this._findRelaysForMerchant(t[0]),
          a = await this._publishEventToRelays(e, r);
        this.$q.notify({
          type: a ? "positive" : "warning",
          message: a
            ? `The order has been placed (${a} relays)!`
            : "Order could not be placed",
        }),
          (this.qrCodeDialog = {
            data: { payment_request: null, message: null },
            dismissMsg: null,
            show: !!a,
          });
      },
      _handlePaymentRequest(e) {
        var r;
        if (e.id && e.id !== this.activeOrderId) return;
        if (!((r = e.payment_options) != null && r.length)) {
          this.qrCodeDialog.data.message = e.message || "Unexpected error";
          return;
        }
        const t = e.payment_options.find((a) => a.type == "ln").link;
        !t ||
          ((this.qrCodeDialog.data.payment_request = t),
          (this.qrCodeDialog.dismissMsg = this.$q.notify({
            timeout: 1e4,
            message: "Waiting for payment...",
          })));
      },
      _handleOrderStatusUpdate(e) {
        if (e.id && e.id !== this.activeOrderId) return;
        this.qrCodeDialog.dismissMsg && this.qrCodeDialog.dismissMsg(),
          (this.qrCodeDialog.show = !1);
        const t = e.shipped
          ? "Order shipped"
          : e.paid
          ? "Order paid"
          : "Order notification";
        this.$q.notify({
          type: "positive",
          message: t,
          caption: e.message || "",
        });
      },
      async _handleStructuredDm(e, t) {
        try {
          const r = JSON.parse(e.content);
          [0, 1, 2].indexOf(r.type) !== -1 &&
            this._persistOrderUpdate(t, e.created_at, r),
            r.type === 1
              ? this._handlePaymentRequest(r)
              : r.type === 2 && this._handleOrderStatusUpdate(r);
        } catch (r) {
          console.warn("Unable to handle incomming DM", r);
        }
      },
      _restoreFromStorage() {
        (this.markets =
          this.$q.localStorage.getItem("nostrmarket.markets") || []),
          (this.allMarketsSelected = !this.markets.find((l) => !l.selected)),
          (this.shoppingCarts =
            this.$q.localStorage.getItem("nostrmarket.shoppingCarts") || []),
          (this.profiles =
            this.$q.localStorage.getItem("nostrmarket.profiles") || []),
          (this.account =
            this.$q.localStorage.getItem("nostrmarket.account") || null),
          (this.stalls =
            this.$q.localStorage.getItem("nostrmarket.stalls") || []),
          (this.products =
            this.$q.localStorage.getItem("nostrmarket.products") || []);
        const e = this.$q.localStorage.getItem(
          "nostrmarket.marketplaceConfig"
        ) || { ui: { darkMode: !1 } };
        (this.config = { ...this.config, opts: { ...this.config.opts, ...e } }),
          this._applyUiConfigs(this.config.opts);
        const t = "nostrmarket.orders.";
        this.$q.localStorage
          .getAllKeys()
          .filter((l) => l.startsWith(t))
          .forEach((l) => {
            const s = l.substring(t.length);
            this.orders[s] = this.$q.localStorage.getItem(l);
          });
        const a = this.$q.localStorage.getItem("nostrmarket.readNotes") || {};
        this.readNotes = { ...this.readNotes, ...a };
      },
      _persistStallsAndProducts() {
        this.$q.localStorage.set("nostrmarket.stalls", this.stalls),
          this.$q.localStorage.set("nostrmarket.products", this.products);
      },
      _persistRelaysData() {
        this.$q.localStorage.set(
          "nostrmarket.relays",
          Object.values(this.relaysData)
            .filter((e) => !!e)
            .map((e) => ({ lastEventAt: e.lastEventAt, relayUrl: e.relayUrl }))
        );
      },
      _persistDMEvent(e, t) {
        var l;
        const r = this.$q.localStorage.getItem(`nostrmarket.dm.${t}`) || {
          events: [],
          lastCreatedAt: 0,
        };
        r.events.find((s) => s.id === e.id) ||
          (r.events.push(e),
          r.events.sort((s, u) => s.created_at - u.created_at),
          (r.lastCreatedAt = r.events[r.events.length - 1].created_at),
          (r.peerPubkey = t),
          this.$q.localStorage.set(`nostrmarket.dm.${t}`, r),
          ((l = this.dmEvents) == null ? void 0 : l.peerPubkey) === t
            ? (this.dmEvents =
                this.$q.localStorage.getItem(`nostrmarket.dm.${t}`) || {})
            : (this.dmEvents = { ...this.dmEvents }));
      },
      _persistOrderUpdate(e, t, r) {
        let a = this.$q.localStorage.getItem(`nostrmarket.orders.${e}`) || [];
        const l = a.findIndex((u) => u.id === r.id);
        if (l === -1) {
          a.unshift({ ...r, eventCreatedAt: t, createdAt: t }),
            (this.orders[e] = a),
            (this.orders = { ...this.orders }),
            this.$q.localStorage.set(`nostrmarket.orders.${e}`, a);
          return;
        }
        let s = a[l];
        r.type === 0
          ? ((s.createdAt = t),
            (s = { ...s, ...r, message: s.message || r.message }))
          : (s = s.eventCreatedAt < t ? { ...s, ...r } : { ...r, ...s }),
          a.splice(l, 1, s),
          (this.orders[e] = a),
          (this.orders = { ...this.orders }),
          this.$q.localStorage.set(`nostrmarket.orders.${e}`, a);
      },
      navigateTo(e, t = { stall: null, product: null, pubkey: null }) {
        var d;
        console.log("### navigateTo", e, t);
        const { stall: r, product: a, pubkey: l } = t,
          s = new URL(window.location),
          u =
            l ||
            ((d = this.stalls.find((f) => f.id == r)) == null
              ? void 0
              : d.pubkey);
        s.searchParams.set("merchant", u),
          e === "stall" || e === "product"
            ? r &&
              ((this.activeStall = r),
              this.setActivePage("customer-stall"),
              s.searchParams.set("stall", r),
              (this.activeProduct = a),
              a
                ? s.searchParams.set("product", a)
                : s.searchParams.delete("product"))
            : ((this.activeMarket = null),
              (this.activeStall = null),
              (this.activeProduct = null),
              s.searchParams.delete("merchant"),
              s.searchParams.delete("stall"),
              s.searchParams.delete("product"),
              this.setActivePage(e)),
          window.history.pushState({}, "", s);
      },
      copyUrl: function () {
        this.copyText(window.location);
      },
      copyText: function (e) {
        var t = this.$q.notify;
        qS(e).then(function () {
          t({ message: "Copied to clipboard!", position: "bottom" });
        });
      },
      getAmountFormated(e, t = "USD") {
        return formatCurrency(e, t);
      },
      setActivePage(e = "market") {
        this.activePage = e;
      },
      transitToPage(e) {
        (this.activePage = "loading"),
          setTimeout(() => this.setActivePage(e), 100);
      },
      showInvoiceQr(e) {
        !e ||
          (this.qrCodeDialog = {
            data: { payment_request: e },
            dismissMsg: null,
            show: !0,
          });
      },
      toggleCategoryFilter(e) {
        const t = this.filterData.categories.indexOf(e);
        t === -1
          ? this.filterData.categories.push(e)
          : this.filterData.categories.splice(t, 1);
      },
      hasCategory(e = []) {
        var t;
        if (!((t = this.filterData.categories) != null && t.length)) return !0;
        for (const r of e)
          if (this.filterData.categories.indexOf(r.toLowerCase()) !== -1)
            return !0;
        return !1;
      },
      allStallCatgories(e) {
        const t = this.products
          .filter((r) => r.stall_id === e)
          .map((r) => r.categories)
          .flat()
          .filter((r) => !!r);
        return Array.from(new Set(t));
      },
      allStallImages(e) {
        const t = this.products
          .filter((r) => r.stall_id === e)
          .map((r) => r.images && r.images[0])
          .filter((r) => !!r);
        return Array.from(new Set(t));
      },
      sanitizeImageSrc(e, t) {
        try {
          if (e) return new URL(e), e;
        } catch {}
        return t;
      },
      markNoteAsRead(e) {
        (this.readNotes[e] = !0),
          this.$q.localStorage.set("nostrmarket.readNotes", this.readNotes);
      },
      focusOnElement(e) {
        var t;
        (t = document.getElementById(e)) == null || t.scrollIntoView(),
          (this.showFilterDetails = !0);
      },
    },
  }),
  nA = Object.assign(XP, {
    setup(e) {
      return (
        (window.$q = $w()),
        (t, r) => (
          R(),
          re(
            Lt,
            null,
            [
              y(
                Aw,
                { class: "q-pa-sm" },
                {
                  default: b(() => {
                    var a, l, s, u, d;
                    return [
                      S("div", uP, [
                        S("div", cP, [
                          y(
                            jr,
                            {
                              onClick:
                                r[0] || (r[0] = (f) => t.navigateTo("market")),
                              rounded: "",
                              size: "64px",
                              class: "q-ma-none q-pa-none gt-sm cursor-pointer",
                            },
                            {
                              default: b(() => [
                                t.logoImage
                                  ? (R(),
                                    re(
                                      "img",
                                      { key: 0, src: t.logoImage },
                                      null,
                                      8,
                                      dP
                                    ))
                                  : $e("", !0),
                              ]),
                              _: 1,
                            }
                          ),
                        ]),
                        S("div", fP, [
                          hP,
                          y(
                            It,
                            {
                              class: "rounded-pill",
                              style: { width: "100%" },
                              rounded: "",
                              outlined: "",
                              clearable: "",
                              modelValue: t.searchText,
                              "onUpdate:modelValue":
                                r[1] || (r[1] = (f) => (t.searchText = f)),
                              modelModifiers: { trim: !0 },
                              label: "Filter products, load market profile...",
                            },
                            Gh(
                              {
                                append: b(() => [
                                  t.searchText
                                    ? $e("", !0)
                                    : (R(), oe(Wt, { key: 0, name: "search" })),
                                ]),
                                _: 2,
                              },
                              [
                                t.showFilterDetails
                                  ? {
                                      name: "label",
                                      fn: b(() => [
                                        Te(" Filter or paste a "),
                                        y(
                                          Cn,
                                          {
                                            class: "q-px-sm text-subtitle1",
                                            color: "secondary",
                                          },
                                          {
                                            default: b(() => [Te("naddr")]),
                                            _: 1,
                                          }
                                        ),
                                        Te(" here "),
                                      ]),
                                      key: "0",
                                    }
                                  : void 0,
                              ]
                            ),
                            1032,
                            ["modelValue"]
                          ),
                        ]),
                        S("div", gP, [
                          S("div", mP, [
                            y(
                              ye,
                              {
                                color: "gray",
                                icon: "travel_explore",
                                flat: "",
                                size: "lg",
                                onClick:
                                  r[2] ||
                                  (r[2] = (f) =>
                                    t.navigateTo("product-filter")),
                              },
                              {
                                default: b(() => [
                                  y(Yr, null, {
                                    default: b(() => [
                                      Te("Search for products on Nostr"),
                                    ]),
                                    _: 1,
                                  }),
                                  t.filterCount
                                    ? (R(),
                                      oe(
                                        Cn,
                                        {
                                          key: 0,
                                          color: "secondary",
                                          floating: "",
                                        },
                                        {
                                          default: b(() => [
                                            S(
                                              "span",
                                              {
                                                textContent: ge(t.filterCount),
                                              },
                                              null,
                                              8,
                                              vP
                                            ),
                                          ]),
                                          _: 1,
                                        }
                                      ))
                                    : $e("", !0),
                                ]),
                                _: 1,
                              }
                            ),
                            y(
                              ye,
                              {
                                onClick:
                                  r[3] ||
                                  (r[3] = (f) => t.navigateTo("user-config")),
                                color: "gray",
                                icon: t.account
                                  ? "perm_identity"
                                  : "person_add",
                                flat: "",
                                size: "lg",
                              },
                              {
                                default: b(() => [
                                  y(Yr, null, {
                                    default: b(() => [Te("User Config")]),
                                    _: 1,
                                  }),
                                ]),
                                _: 1,
                              },
                              8,
                              ["icon"]
                            ),
                            y(
                              ye,
                              {
                                onClick:
                                  r[4] ||
                                  (r[4] = (f) => t.navigateTo("user-chat")),
                                color: "gray",
                                icon: "chat",
                                flat: "",
                                size: "lg",
                              },
                              {
                                default: b(() => [
                                  y(Yr, null, {
                                    default: b(() => [Te("Chat")]),
                                    _: 1,
                                  }),
                                ]),
                                _: 1,
                              }
                            ),
                            y(
                              ye,
                              {
                                onClick:
                                  r[5] ||
                                  (r[5] = (f) =>
                                    t.navigateTo("customer-orders")),
                                color: "gray",
                                icon: "receipt_long",
                                flat: "",
                                size: "lg",
                              },
                              {
                                default: b(() => [
                                  y(Yr, null, {
                                    default: b(() => [Te("Orders")]),
                                    _: 1,
                                  }),
                                ]),
                                _: 1,
                              }
                            ),
                            y(
                              ye,
                              {
                                color: "gray",
                                icon: "shopping_cart",
                                dense: "",
                                round: "",
                                flat: "",
                                size: "lg",
                                onClick:
                                  r[6] ||
                                  (r[6] = (f) =>
                                    t.navigateTo("shopping-cart-list")),
                              },
                              {
                                default: b(() => [
                                  y(Yr, null, {
                                    default: b(() => [Te("Shopping Cart")]),
                                    _: 1,
                                  }),
                                  t.allCartsItemCount
                                    ? (R(),
                                      oe(
                                        Cn,
                                        {
                                          key: 0,
                                          color: "secondary",
                                          floating: "",
                                        },
                                        {
                                          default: b(() => [
                                            S(
                                              "span",
                                              {
                                                textContent: ge(
                                                  t.allCartsItemCount
                                                ),
                                              },
                                              null,
                                              8,
                                              pP
                                            ),
                                          ]),
                                          _: 1,
                                        }
                                      ))
                                    : $e("", !0),
                                ]),
                                _: 1,
                              }
                            ),
                          ]),
                        ]),
                      ]),
                      (a = t.products) != null && a.length
                        ? (R(),
                          re("div", yP, [
                            y(
                              tc,
                              {
                                items: t.allCategories,
                                "virtual-scroll-horizontal": "",
                              },
                              {
                                default: b(({ item: f, index: g }) => [
                                  (R(),
                                  oe(
                                    Ha,
                                    {
                                      key: g,
                                      color: f.selected ? "grey" : "",
                                      class: "cursor-pointer q-mb-md",
                                    },
                                    {
                                      default: b(() => [
                                        S(
                                          "span",
                                          {
                                            textContent: ge(f.category),
                                            onClick: (v) =>
                                              t.toggleCategoryFilter(
                                                f.category
                                              ),
                                          },
                                          null,
                                          8,
                                          _P
                                        ),
                                        y(
                                          Cn,
                                          {
                                            onClick: (v) =>
                                              t.toggleCategoryFilter(
                                                f.category
                                              ),
                                            rounded: "",
                                            class: "q-ml-sm",
                                            color: "secondary",
                                          },
                                          {
                                            default: b(() => [
                                              S(
                                                "span",
                                                { textContent: ge(f.count) },
                                                null,
                                                8,
                                                bP
                                              ),
                                            ]),
                                            _: 2,
                                          },
                                          1032,
                                          ["onClick"]
                                        ),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ["color"]
                                  )),
                                ]),
                                _: 1,
                              },
                              8,
                              ["items"]
                            ),
                          ]))
                        : $e("", !0),
                      t.markets.length
                        ? $e("", !0)
                        : (R(),
                          oe(
                            Jt,
                            { key: 1, class: "q-mb-sm" },
                            {
                              default: b(() => [
                                y(
                                  Ne,
                                  { class: "bg-secondary text-white" },
                                  { default: b(() => [wP, SP]), _: 1 }
                                ),
                              ]),
                              _: 1,
                            }
                          )),
                      t.isLoading
                        ? (R(),
                          re("div", kP, [
                            S("div", CP, [
                              y(Au, { color: "primary", size: "xl" }),
                            ]),
                          ]))
                        : $e("", !0),
                      y(
                        Tw,
                        { class: "row q-pa-none q-mb-lg gt-sm shadow-2" },
                        {
                          default: b(() => [
                            t.bannerImage
                              ? (R(),
                                oe(
                                  nc,
                                  {
                                    key: 0,
                                    src: t.bannerImage,
                                    onClick:
                                      r[7] ||
                                      (r[7] = (f) => t.navigateTo("market")),
                                    class: "rounded-borders cursor-pointer",
                                    style: { width: "100%", height: "250px" },
                                    cover: "",
                                  },
                                  {
                                    default: b(() => {
                                      var f, g;
                                      return [
                                        (g =
                                          (f = t.config) == null
                                            ? void 0
                                            : f.opts) != null && g.about
                                          ? (R(),
                                            re("div", TP, [
                                              S(
                                                "span",
                                                {
                                                  textContent: ge(
                                                    t.config.opts.about
                                                  ),
                                                },
                                                null,
                                                8,
                                                MP
                                              ),
                                            ]))
                                          : $e("", !0),
                                      ];
                                    }),
                                    _: 1,
                                  },
                                  8,
                                  ["src"]
                                ))
                              : $e("", !0),
                          ]),
                          _: 1,
                        }
                      ),
                      S("div", DP, [
                        S("div", qP, [
                          y(
                            Pw,
                            { class: "cursor q-mt-sm q-mr-sm" },
                            {
                              default: b(() => [
                                y(_r, null, {
                                  default: b(() => [
                                    y(
                                      ye,
                                      {
                                        onClick:
                                          r[8] ||
                                          (r[8] = (f) =>
                                            t.navigateTo("market")),
                                        icon: "home",
                                        flat: "",
                                        class: "q-pa-none",
                                      },
                                      {
                                        default: b(() => [
                                          S(
                                            "span",
                                            {
                                              textContent: ge(t.marketsName),
                                              class: "q-ml-sm",
                                            },
                                            null,
                                            8,
                                            xP
                                          ),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                    y(
                                      rg,
                                      { flat: "", class: "q-pl-xs" },
                                      {
                                        default: b(() => [
                                          y(kr, null, {
                                            default: b(() => [
                                              Hn(
                                                (R(),
                                                oe(zt, null, {
                                                  default: b(() => [
                                                    y(
                                                      Ie,
                                                      { side: "", top: "" },
                                                      {
                                                        default: b(() => [
                                                          y(
                                                            ro,
                                                            {
                                                              modelValue:
                                                                t.allMarketsSelected,
                                                              "onUpdate:modelValue":
                                                                r[9] ||
                                                                (r[9] = (f) =>
                                                                  (t.allMarketsSelected =
                                                                    f)),
                                                              onClick:
                                                                t.toggleAllMarkets,
                                                            },
                                                            null,
                                                            8,
                                                            [
                                                              "modelValue",
                                                              "onClick",
                                                            ]
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      }
                                                    ),
                                                    y(Ie, null, {
                                                      default: b(() => [
                                                        y(Ge, null, {
                                                          default: b(() => [
                                                            PP,
                                                          ]),
                                                          _: 1,
                                                        }),
                                                        y(
                                                          Ge,
                                                          { caption: "" },
                                                          {
                                                            default: b(() => [
                                                              Te(
                                                                "Aggregate all markets into one view"
                                                              ),
                                                            ]),
                                                            _: 1,
                                                          }
                                                        ),
                                                      ]),
                                                      _: 1,
                                                    }),
                                                    y(
                                                      Ie,
                                                      { side: "", top: "" },
                                                      {
                                                        default: b(() => [
                                                          Hn(
                                                            (R(),
                                                            oe(
                                                              ye,
                                                              {
                                                                onClick:
                                                                  r[10] ||
                                                                  (r[10] = (
                                                                    f
                                                                  ) =>
                                                                    t.createMarket(
                                                                      !0
                                                                    )),
                                                                color: "green",
                                                                outline: "",
                                                              },
                                                              {
                                                                default: b(
                                                                  () => [
                                                                    Te("New"),
                                                                  ]
                                                                ),
                                                                _: 1,
                                                              }
                                                            )),
                                                            [[Hi]]
                                                          ),
                                                        ]),
                                                        _: 1,
                                                      }
                                                    ),
                                                  ]),
                                                  _: 1,
                                                })),
                                                [[Qu]]
                                              ),
                                              y(ut),
                                              (R(!0),
                                              re(
                                                Lt,
                                                null,
                                                Yt(
                                                  t.markets,
                                                  (f, g) => (
                                                    R(),
                                                    oe(
                                                      zt,
                                                      { key: g },
                                                      {
                                                        default: b(() => [
                                                          y(
                                                            Ie,
                                                            {
                                                              side: "",
                                                              top: "",
                                                            },
                                                            {
                                                              default: b(() => [
                                                                y(
                                                                  ro,
                                                                  {
                                                                    modelValue:
                                                                      f.selected,
                                                                    "onUpdate:modelValue":
                                                                      (v) =>
                                                                        (f.selected =
                                                                          v),
                                                                    onClick:
                                                                      r[11] ||
                                                                      (r[11] = (
                                                                        v
                                                                      ) =>
                                                                        t.toggleMarket()),
                                                                  },
                                                                  null,
                                                                  8,
                                                                  [
                                                                    "modelValue",
                                                                    "onUpdate:modelValue",
                                                                  ]
                                                                ),
                                                              ]),
                                                              _: 2,
                                                            },
                                                            1024
                                                          ),
                                                          y(
                                                            Ie,
                                                            null,
                                                            {
                                                              default: b(() => [
                                                                y(
                                                                  Ge,
                                                                  null,
                                                                  {
                                                                    default: b(
                                                                      () => {
                                                                        var v;
                                                                        return [
                                                                          S(
                                                                            "span",
                                                                            {
                                                                              textContent:
                                                                                ge(
                                                                                  ((v =
                                                                                    f.opts) ==
                                                                                  null
                                                                                    ? void 0
                                                                                    : v.name) ||
                                                                                    "Market"
                                                                                ),
                                                                            },
                                                                            null,
                                                                            8,
                                                                            AP
                                                                          ),
                                                                        ];
                                                                      }
                                                                    ),
                                                                    _: 2,
                                                                  },
                                                                  1024
                                                                ),
                                                                y(
                                                                  Ge,
                                                                  {
                                                                    caption: "",
                                                                  },
                                                                  {
                                                                    default: b(
                                                                      () => {
                                                                        var v;
                                                                        return [
                                                                          S(
                                                                            "span",
                                                                            {
                                                                              textContent:
                                                                                ge(
                                                                                  (v =
                                                                                    f.opts) ==
                                                                                    null
                                                                                    ? void 0
                                                                                    : v.about
                                                                                ),
                                                                              class:
                                                                                "ellipsis-2-lines text-wrap",
                                                                            },
                                                                            null,
                                                                            8,
                                                                            EP
                                                                          ),
                                                                        ];
                                                                      }
                                                                    ),
                                                                    _: 2,
                                                                  },
                                                                  1024
                                                                ),
                                                              ]),
                                                              _: 2,
                                                            },
                                                            1024
                                                          ),
                                                          y(
                                                            Ie,
                                                            {
                                                              side: "",
                                                              top: "",
                                                            },
                                                            {
                                                              default: b(() => [
                                                                Hn(
                                                                  y(
                                                                    ye,
                                                                    {
                                                                      color:
                                                                        "secondary",
                                                                      flat: "",
                                                                      icon: "settings",
                                                                      onClick: (
                                                                        v
                                                                      ) =>
                                                                        t.showMarketConfig(
                                                                          g
                                                                        ),
                                                                    },
                                                                    null,
                                                                    8,
                                                                    ["onClick"]
                                                                  ),
                                                                  [[Hi]]
                                                                ),
                                                              ]),
                                                              _: 2,
                                                            },
                                                            1024
                                                          ),
                                                        ]),
                                                        _: 2,
                                                      },
                                                      1024
                                                    )
                                                  )
                                                ),
                                                128
                                              )),
                                            ]),
                                            _: 1,
                                          }),
                                        ]),
                                        _: 1,
                                      }
                                    ),
                                  ]),
                                  _: 1,
                                }),
                                t.activePage === "customer-stall"
                                  ? (R(),
                                    oe(
                                      _r,
                                      {
                                        key: 0,
                                        label: t.stallName,
                                        onClick:
                                          r[12] ||
                                          (r[12] = (f) =>
                                            t.navigateTo("stall", {
                                              stall: t.activeStall,
                                            })),
                                        icon: "storefront",
                                        class: "cursor-pointer",
                                      },
                                      null,
                                      8,
                                      ["label"]
                                    ))
                                  : $e("", !0),
                                t.activePage === "customer-stall" &&
                                t.activeProduct
                                  ? (R(),
                                    oe(
                                      _r,
                                      {
                                        key: 1,
                                        label: t.productName,
                                        class: "cursor-pointer",
                                        icon: "widgets",
                                      },
                                      null,
                                      8,
                                      ["label"]
                                    ))
                                  : $e("", !0),
                                t.activePage === "shopping-cart-list"
                                  ? (R(),
                                    oe(_r, {
                                      key: 2,
                                      label: "Shoping Cart",
                                      icon: "shopping_cart",
                                    }))
                                  : $e("", !0),
                                t.activePage === "customer-orders"
                                  ? (R(),
                                    oe(_r, {
                                      key: 3,
                                      label: "Orders",
                                      icon: "receipt_long",
                                    }))
                                  : $e("", !0),
                                t.activePage === "market-config"
                                  ? (R(),
                                    oe(_r, {
                                      key: 4,
                                      label: "Settings",
                                      icon: "settings",
                                    }))
                                  : $e("", !0),
                                t.activePage === "product-filter"
                                  ? (R(),
                                    oe(_r, {
                                      key: 5,
                                      label: "Filter",
                                      icon: "travel_explore",
                                    }))
                                  : $e("", !0),
                                t.activePage === "user-config"
                                  ? (R(),
                                    oe(_r, {
                                      key: 6,
                                      label: "User Config",
                                      icon: "perm_identity",
                                    }))
                                  : $e("", !0),
                                t.activePage === "user-chat"
                                  ? (R(),
                                    oe(_r, {
                                      key: 7,
                                      label: "User Chat",
                                      icon: "chat",
                                    }))
                                  : $e("", !0),
                              ]),
                              _: 1,
                            }
                          ),
                        ]),
                        S("div", IP, [
                          t.activePage === "customer-stall"
                            ? (R(),
                              oe(ye, {
                                key: 0,
                                flat: "",
                                color: "grey",
                                icon: "content_copy",
                                onClick: r[13] || (r[13] = (f) => t.copyUrl()),
                                class: "float-right",
                              }))
                            : t.activePage === "market" &&
                              ((l = t.stalls) == null ? void 0 : l.length)
                            ? (R(),
                              oe(
                                ro,
                                {
                                  key: 1,
                                  modelValue: t.groupByStall,
                                  "onUpdate:modelValue":
                                    r[14] ||
                                    (r[14] = (f) => (t.groupByStall = f)),
                                  class: "q-pl-md q-mt-sm float-right",
                                  size: "xs",
                                  val: "xs",
                                  label: "Group by stalls",
                                },
                                null,
                                8,
                                ["modelValue"]
                              ))
                            : $e("", !0),
                        ]),
                      ]),
                      y(ut, { class: "q-mt-sm q-mb-md" }),
                      t.activePage === "loading"
                        ? (R(),
                          re("div", $P, [
                            S("div", RP, [
                              y(Au, { color: "primary", size: "xl" }),
                            ]),
                          ]))
                        : $e("", !0),
                      t.activePage === "product-filter"
                        ? (R(),
                          oe(
                            sP,
                            {
                              key: 4,
                              filter: t.filterData,
                              categories: t.allCategories,
                              currencies: t.allCurrencies,
                              merchants: t.allMerchants,
                              stalls: t.stalls,
                              profiles: t.profiles,
                              onFilterUpdate: t.handleFilterData,
                              class: "q-mb-md",
                            },
                            null,
                            8,
                            [
                              "filter",
                              "categories",
                              "currencies",
                              "merchants",
                              "stalls",
                              "profiles",
                              "onFilterUpdate",
                            ]
                          ))
                        : t.activeMarket && t.activePage === "market-config"
                        ? (R(),
                          oe(
                            Pg,
                            {
                              key: 5,
                              market: t.activeMarket,
                              profiles: t.profiles,
                              "relays-data": t.activeMarketRelaysData,
                              "read-notes": t.readNotes,
                              onApplyUi: t.updateUiConfig,
                              onMarketUpdate: t.updateMarket,
                              onDeleteMarket: t.deleteMarket,
                              onPublishNaddr: t.publishNaddr,
                              onNoteRead: t.markNoteAsRead,
                            },
                            null,
                            8,
                            [
                              "market",
                              "profiles",
                              "relays-data",
                              "read-notes",
                              "onApplyUi",
                              "onMarketUpdate",
                              "onDeleteMarket",
                              "onPublishNaddr",
                              "onNoteRead",
                            ]
                          ))
                        : t.activePage === "user-config"
                        ? (R(),
                          oe(
                            Nk,
                            {
                              key: 6,
                              account: t.account,
                              onLogin:
                                r[15] ||
                                (r[15] = (f) => (t.accountDialog.show = !0)),
                              onLogout: t.logout,
                              onClearAllData: t.clearAllData,
                              onCopyText: t.copyText,
                            },
                            null,
                            8,
                            [
                              "account",
                              "onLogout",
                              "onClearAllData",
                              "onCopyText",
                            ]
                          ))
                        : t.activePage === "user-chat"
                        ? (R(),
                          oe(
                            oD,
                            {
                              key: 7,
                              "account-pubkey":
                                (s = t.account) == null ? void 0 : s.pubkey,
                              "peer-pubkeys": t.dmPeers,
                              profiles: t.profiles,
                              events: t.dmEvents,
                              onChatSelected: t.handleDmChatSelected,
                              onSendDm: t.sendDirectMessage,
                            },
                            null,
                            8,
                            [
                              "account-pubkey",
                              "peer-pubkeys",
                              "profiles",
                              "events",
                              "onChatSelected",
                              "onSendDm",
                            ]
                          ))
                        : t.activePage === "shopping-cart-list"
                        ? (R(),
                          oe(
                            mD,
                            {
                              key: 8,
                              carts: t.shoppingCarts,
                              profiles: t.profiles,
                              onAddToCart: t.addProductToCart,
                              onRemoveFromCart: t.removeProductFromCart,
                              onRemoveCart: t.removeCart,
                              onCheckoutCart: t.checkoutStallCart,
                            },
                            null,
                            8,
                            [
                              "carts",
                              "profiles",
                              "onAddToCart",
                              "onRemoveFromCart",
                              "onRemoveCart",
                              "onCheckoutCart",
                            ]
                          ))
                        : t.activePage === "shopping-cart-checkout"
                        ? (R(),
                          oe(
                            jD,
                            {
                              key: 9,
                              cart: t.checkoutCart,
                              stall: t.checkoutStall,
                              "customer-pubkey":
                                (u = t.account) == null ? void 0 : u.pubkey,
                              profiles: t.profiles,
                              onLoginRequired: t.openAccountDialog,
                              onPlaceOrder: t.placeOrder,
                              onChangePage: t.navigateTo,
                            },
                            null,
                            8,
                            [
                              "cart",
                              "stall",
                              "customer-pubkey",
                              "profiles",
                              "onLoginRequired",
                              "onPlaceOrder",
                              "onChangePage",
                            ]
                          ))
                        : t.activePage === "customer-orders"
                        ? (R(),
                          oe(
                            Qq,
                            {
                              key: 10,
                              orders: t.orders,
                              products: t.products,
                              stalls: t.stalls,
                              profiles: t.profiles,
                              onShowInvoice: t.showInvoiceQr,
                            },
                            null,
                            8,
                            [
                              "orders",
                              "products",
                              "stalls",
                              "profiles",
                              "onShowInvoice",
                            ]
                          ))
                        : t.activePage === "customer-stall"
                        ? (R(),
                          oe(
                            xx,
                            {
                              key: 11,
                              stall: t.stalls.find(
                                (f) => f.id == t.activeStall
                              ),
                              products: t.filteredProducts,
                              "product-detail": t.activeProduct,
                              onChangePage: t.navigateTo,
                              onAddToCart: t.addProductToCart,
                            },
                            null,
                            8,
                            [
                              "stall",
                              "products",
                              "product-detail",
                              "onChangePage",
                              "onAddToCart",
                            ]
                          ))
                        : (d = t.markets) != null && d.length
                        ? (R(),
                          re("div", zP, [
                            t.groupByStall
                              ? (R(),
                                oe(
                                  Yx,
                                  {
                                    key: 0,
                                    stalls: t.filterStalls,
                                    onChangePage: t.navigateTo,
                                  },
                                  null,
                                  8,
                                  ["stalls", "onChangePage"]
                                ))
                              : (R(),
                                oe(
                                  _q,
                                  {
                                    key: 1,
                                    "filtered-products": t.filteredProducts,
                                    "search-text": t.searchText,
                                    "filter-categories":
                                      t.filterData.categories,
                                    onChangePage: t.navigateTo,
                                    onAddToCart: t.addProductToCart,
                                  },
                                  null,
                                  8,
                                  [
                                    "filtered-products",
                                    "search-text",
                                    "filter-categories",
                                    "onChangePage",
                                    "onAddToCart",
                                  ]
                                )),
                          ]))
                        : (R(),
                          re("div", OP, [
                            y(
                              kr,
                              { class: "q-mt-md", bordered: "" },
                              {
                                default: b(() => [
                                  y(zt, null, {
                                    default: b(() => [
                                      y(
                                        Ie,
                                        { class: "q-mt-sm q-ml-lg" },
                                        {
                                          default: b(() => [
                                            y(Ge, null, {
                                              default: b(() => [LP]),
                                              _: 1,
                                            }),
                                            y(ut, { class: "q-mb-xl q-mt-md" }),
                                            y(Ge, null, {
                                              default: b(() => [NP]),
                                              _: 1,
                                            }),
                                          ]),
                                          _: 1,
                                        }
                                      ),
                                    ]),
                                    _: 1,
                                  }),
                                  y(zt, null, {
                                    default: b(() => [
                                      y(
                                        Ie,
                                        { class: "q-mt-sm q-ml-lg" },
                                        {
                                          default: b(() => [
                                            y(Ge, null, {
                                              default: b(() => [
                                                S("ul", null, [
                                                  S("li", null, [
                                                    S("span", BP, [
                                                      y(
                                                        ye,
                                                        {
                                                          onClick:
                                                            r[16] ||
                                                            (r[16] = (f) =>
                                                              t.addMarket(
                                                                t.defaultMarketNaddr
                                                              )),
                                                          size: "xl",
                                                          flat: "",
                                                          color: "secondary",
                                                          class: "q-mb-xs",
                                                        },
                                                        {
                                                          default: b(() => [
                                                            Te("Import"),
                                                          ]),
                                                          _: 1,
                                                        }
                                                      ),
                                                      Te(
                                                        " a list of popular merchants, or "
                                                      ),
                                                    ]),
                                                  ]),
                                                  S("li", null, [
                                                    S("span", FP, [
                                                      y(
                                                        ye,
                                                        {
                                                          onClick:
                                                            r[17] ||
                                                            (r[17] = (f) =>
                                                              t.createMarket(
                                                                !0
                                                              )),
                                                          flat: "",
                                                          size: "xl",
                                                          color: "secondary",
                                                          class: "q-mb-xs",
                                                        },
                                                        {
                                                          default: b(() => [
                                                            Te(
                                                              "Add a merchant"
                                                            ),
                                                          ]),
                                                          _: 1,
                                                        }
                                                      ),
                                                      Te(
                                                        " using its public key, or "
                                                      ),
                                                    ]),
                                                  ]),
                                                  S("li", null, [
                                                    S("span", UP, [
                                                      y(
                                                        ye,
                                                        {
                                                          onClick:
                                                            r[18] ||
                                                            (r[18] = (f) =>
                                                              t.focusOnElement(
                                                                "search-text"
                                                              )),
                                                          flat: "",
                                                          size: "xl",
                                                          color: "secondary",
                                                          class: "q-mb-xs",
                                                        },
                                                        {
                                                          default: b(() => [
                                                            Te(
                                                              "Add a market profile"
                                                            ),
                                                          ]),
                                                          _: 1,
                                                        }
                                                      ),
                                                      Te(" using a shareable "),
                                                      VP,
                                                      Te(" identifier "),
                                                    ]),
                                                    y(
                                                      It,
                                                      {
                                                        class: "rounded-pill",
                                                        style: {
                                                          width: "100%",
                                                        },
                                                        rounded: "",
                                                        outlined: "",
                                                        clearable: "",
                                                        modelValue:
                                                          t.searchText,
                                                        "onUpdate:modelValue":
                                                          r[19] ||
                                                          (r[19] = (f) =>
                                                            (t.searchText = f)),
                                                        modelModifiers: {
                                                          trim: !0,
                                                        },
                                                        label:
                                                          "Load market profile (naddr)...",
                                                      },
                                                      null,
                                                      8,
                                                      ["modelValue"]
                                                    ),
                                                  ]),
                                                ]),
                                              ]),
                                              _: 1,
                                            }),
                                          ]),
                                          _: 1,
                                        }
                                      ),
                                      y(Ie, { side: "" }),
                                    ]),
                                    _: 1,
                                  }),
                                ]),
                                _: 1,
                              }
                            ),
                          ])),
                    ];
                  }),
                  _: 1,
                }
              ),
              y(
                co,
                {
                  modelValue: t.accountDialog.show,
                  "onUpdate:modelValue":
                    r[22] || (r[22] = (a) => (t.accountDialog.show = a)),
                  position: "top",
                },
                {
                  default: b(() => [
                    y(Jt, null, {
                      default: b(() => [
                        y(
                          Ne,
                          { class: "row" },
                          { default: b(() => [WP, y(Iw)]), _: 1 }
                        ),
                        y(Ne, null, { default: b(() => [YP]), _: 1 }),
                        y(
                          Ne,
                          { class: "q-pt-none" },
                          {
                            default: b(() => [
                              y(
                                It,
                                {
                                  dense: "",
                                  label: "Nsec/Hex",
                                  modelValue: t.accountDialog.data.key,
                                  "onUpdate:modelValue":
                                    r[20] ||
                                    (r[20] = (a) =>
                                      (t.accountDialog.data.key = a)),
                                  autofocus: "",
                                  onKeyup: qu(t.createAccount, ["enter"]),
                                  error:
                                    t.accountDialog.data.key &&
                                    !t.isValidAccountKey,
                                  hint: "Enter you private key",
                                },
                                null,
                                8,
                                ["modelValue", "onKeyup", "error"]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                        y(
                          yi,
                          { align: "right", class: "text-primary" },
                          {
                            default: b(() => [
                              t.isValidAccountKey
                                ? (R(),
                                  oe(ye, {
                                    key: 0,
                                    label: "Login",
                                    color: "primary",
                                    onClick:
                                      r[21] ||
                                      (r[21] = () => t.createAccount()),
                                  }))
                                : (R(),
                                  oe(
                                    ye,
                                    {
                                      key: 1,
                                      flat: "",
                                      label: "Generate",
                                      onClick: t.generateKeyPair,
                                    },
                                    null,
                                    8,
                                    ["onClick"]
                                  )),
                              Hn(
                                (R(),
                                oe(
                                  ye,
                                  {
                                    flat: "",
                                    color: "grey",
                                    class: "q-ml-auto",
                                  },
                                  { default: b(() => [Te("Close")]), _: 1 }
                                )),
                                [[Hi]]
                              ),
                            ]),
                            _: 1,
                          }
                        ),
                      ]),
                      _: 1,
                    }),
                  ]),
                  _: 1,
                },
                8,
                ["modelValue"]
              ),
              y(
                co,
                {
                  modelValue: t.qrCodeDialog.show,
                  "onUpdate:modelValue":
                    r[24] || (r[24] = (a) => (t.qrCodeDialog.show = a)),
                  position: "top",
                },
                {
                  default: b(() => [
                    y(
                      Jt,
                      { class: "q-pa-md q-pt-xl" },
                      {
                        default: b(() => {
                          var a;
                          return [
                            S("div", HP, [
                              t.qrCodeDialog.data.message
                                ? (R(),
                                  re("div", GP, [
                                    S("strong", null, [
                                      S(
                                        "span",
                                        {
                                          textContent: ge(
                                            t.qrCodeDialog.data.message
                                          ),
                                        },
                                        null,
                                        8,
                                        KP
                                      ),
                                    ]),
                                  ]))
                                : (R(),
                                  re(
                                    "a",
                                    {
                                      key: 1,
                                      href:
                                        "lightning:" +
                                        ((a = t.qrCodeDialog.data) == null
                                          ? void 0
                                          : a.payment_request),
                                    },
                                    [
                                      t.qrCodeDialog.data.payment_request
                                        ? (R(),
                                          re("div", jP, [
                                            y(
                                              lw(MS),
                                              {
                                                value:
                                                  t.qrCodeDialog.data
                                                    .payment_request,
                                                options: { width: 340 },
                                                class: "rounded-borders",
                                              },
                                              null,
                                              8,
                                              ["value"]
                                            ),
                                          ]))
                                        : (R(),
                                          re("div", ZP, [
                                            y(Ih, {
                                              color: "primary",
                                              size: "2.55em",
                                            }),
                                          ])),
                                    ],
                                    8,
                                    QP
                                  )),
                            ]),
                            S("div", JP, [
                              t.qrCodeDialog.data.payment_request
                                ? (R(),
                                  oe(
                                    ye,
                                    {
                                      key: 0,
                                      outline: "",
                                      color: "grey",
                                      onClick:
                                        r[23] ||
                                        (r[23] = (l) =>
                                          t.copyText(
                                            t.qrCodeDialog.data.payment_request
                                          )),
                                    },
                                    {
                                      default: b(() => [Te("Copy invoice")]),
                                      _: 1,
                                    }
                                  ))
                                : $e("", !0),
                              Hn(
                                (R(),
                                oe(
                                  ye,
                                  {
                                    flat: "",
                                    color: "grey",
                                    class: "q-ml-auto",
                                  },
                                  { default: b(() => [Te("Close")]), _: 1 }
                                )),
                                [[Hi]]
                              ),
                            ]),
                          ];
                        }),
                        _: 1,
                      }
                    ),
                  ]),
                  _: 1,
                },
                8,
                ["modelValue"]
              ),
            ],
            64
          )
        )
      );
    },
  });
export { nA as default };
