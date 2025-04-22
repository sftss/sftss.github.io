(function () {
  "use strict";
  var j =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : typeof self < "u"
      ? self
      : {};
  function xe(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  function Se() {
    (this.__data__ = []), (this.size = 0);
  }
  var Ie = Se;
  function Pe(e, t) {
    return e === t || (e !== e && t !== t);
  }
  var C = Pe,
    Ee = C;
  function De(e, t) {
    for (var r = e.length; r--; ) if (Ee(e[r][0], t)) return r;
    return -1;
  }
  var A = De,
    Fe = A,
    Me = Array.prototype,
    Ue = Me.splice;
  function Le(e) {
    var t = this.__data__,
      r = Fe(t, e);
    if (r < 0) return !1;
    var a = t.length - 1;
    return r == a ? t.pop() : Ue.call(t, r, 1), --this.size, !0;
  }
  var Ge = Le,
    Be = A;
  function He(e) {
    var t = this.__data__,
      r = Be(t, e);
    return r < 0 ? void 0 : t[r][1];
  }
  var ze = He,
    Ne = A;
  function Re(e) {
    return Ne(this.__data__, e) > -1;
  }
  var Ve = Re,
    Ke = A;
  function qe(e, t) {
    var r = this.__data__,
      a = Ke(r, e);
    return a < 0 ? (++this.size, r.push([e, t])) : (r[a][1] = t), this;
  }
  var We = qe,
    Ye = Ie,
    Je = Ge,
    Xe = ze,
    ke = Ve,
    Ze = We;
  function b(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var a = e[t];
      this.set(a[0], a[1]);
    }
  }
  (b.prototype.clear = Ye),
    (b.prototype.delete = Je),
    (b.prototype.get = Xe),
    (b.prototype.has = ke),
    (b.prototype.set = Ze);
  var x = b,
    Qe = x;
  function et() {
    (this.__data__ = new Qe()), (this.size = 0);
  }
  var tt = et;
  function rt(e) {
    var t = this.__data__,
      r = t.delete(e);
    return (this.size = t.size), r;
  }
  var at = rt;
  function nt(e) {
    return this.__data__.get(e);
  }
  var it = nt;
  function ot(e) {
    return this.__data__.has(e);
  }
  var st = ot,
    ct = typeof j == "object" && j && j.Object === Object && j,
    z = ct,
    ut = z,
    lt = typeof self == "object" && self && self.Object === Object && self,
    ft = ut || lt || Function("return this")(),
    g = ft,
    pt = g,
    vt = pt.Symbol,
    N = vt,
    R = N,
    V = Object.prototype,
    dt = V.hasOwnProperty,
    ht = V.toString,
    m = R ? R.toStringTag : void 0;
  function bt(e) {
    var t = dt.call(e, m),
      r = e[m];
    try {
      e[m] = void 0;
      var a = !0;
    } catch {}
    var n = ht.call(e);
    return a && (t ? (e[m] = r) : delete e[m]), n;
  }
  var gt = bt,
    _t = Object.prototype,
    yt = _t.toString;
  function $t(e) {
    return yt.call(e);
  }
  var mt = $t,
    K = N,
    wt = gt,
    Ot = mt,
    Tt = "[object Null]",
    jt = "[object Undefined]",
    q = K ? K.toStringTag : void 0;
  function Ct(e) {
    return e == null
      ? e === void 0
        ? jt
        : Tt
      : q && q in Object(e)
      ? wt(e)
      : Ot(e);
  }
  var S = Ct;
  function At(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  var h = At,
    xt = S,
    St = h,
    It = "[object AsyncFunction]",
    Pt = "[object Function]",
    Et = "[object GeneratorFunction]",
    Dt = "[object Proxy]";
  function Ft(e) {
    if (!St(e)) return !1;
    var t = xt(e);
    return t == Pt || t == Et || t == It || t == Dt;
  }
  var M = Ft,
    Mt = g,
    Ut = Mt["__core-js_shared__"],
    Lt = Ut,
    U = Lt,
    W = (function () {
      var e = /[^.]+$/.exec((U && U.keys && U.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })();
  function Gt(e) {
    return !!W && W in e;
  }
  var Bt = Gt,
    Ht = Function.prototype,
    zt = Ht.toString;
  function Nt(e) {
    if (e != null) {
      try {
        return zt.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  var Rt = Nt,
    Vt = M,
    Kt = Bt,
    qt = h,
    Wt = Rt,
    Yt = /[\\^$.*+?()[\]{}|]/g,
    Jt = /^\[object .+?Constructor\]$/,
    Xt = Function.prototype,
    kt = Object.prototype,
    Zt = Xt.toString,
    Qt = kt.hasOwnProperty,
    er = RegExp(
      "^" +
        Zt.call(Qt)
          .replace(Yt, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function tr(e) {
    if (!qt(e) || Kt(e)) return !1;
    var t = Vt(e) ? er : Jt;
    return t.test(Wt(e));
  }
  var rr = tr;
  function ar(e, t) {
    return e?.[t];
  }
  var nr = ar,
    ir = rr,
    or = nr;
  function sr(e, t) {
    var r = or(e, t);
    return ir(r) ? r : void 0;
  }
  var L = sr,
    cr = L,
    ur = g,
    lr = cr(ur, "Map"),
    Y = lr,
    fr = L,
    pr = fr(Object, "create"),
    I = pr,
    J = I;
  function vr() {
    (this.__data__ = J ? J(null) : {}), (this.size = 0);
  }
  var dr = vr;
  function hr(e) {
    var t = this.has(e) && delete this.__data__[e];
    return (this.size -= t ? 1 : 0), t;
  }
  var br = hr,
    gr = I,
    _r = "__lodash_hash_undefined__",
    yr = Object.prototype,
    $r = yr.hasOwnProperty;
  function mr(e) {
    var t = this.__data__;
    if (gr) {
      var r = t[e];
      return r === _r ? void 0 : r;
    }
    return $r.call(t, e) ? t[e] : void 0;
  }
  var wr = mr,
    Or = I,
    Tr = Object.prototype,
    jr = Tr.hasOwnProperty;
  function Cr(e) {
    var t = this.__data__;
    return Or ? t[e] !== void 0 : jr.call(t, e);
  }
  var Ar = Cr,
    xr = I,
    Sr = "__lodash_hash_undefined__";
  function Ir(e, t) {
    var r = this.__data__;
    return (
      (this.size += this.has(e) ? 0 : 1),
      (r[e] = xr && t === void 0 ? Sr : t),
      this
    );
  }
  var Pr = Ir,
    Er = dr,
    Dr = br,
    Fr = wr,
    Mr = Ar,
    Ur = Pr;
  function _(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var a = e[t];
      this.set(a[0], a[1]);
    }
  }
  (_.prototype.clear = Er),
    (_.prototype.delete = Dr),
    (_.prototype.get = Fr),
    (_.prototype.has = Mr),
    (_.prototype.set = Ur);
  var Lr = _,
    X = Lr,
    Gr = x,
    Br = Y;
  function Hr() {
    (this.size = 0),
      (this.__data__ = {
        hash: new X(),
        map: new (Br || Gr)(),
        string: new X(),
      });
  }
  var zr = Hr;
  function Nr(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  var Rr = Nr,
    Vr = Rr;
  function Kr(e, t) {
    var r = e.__data__;
    return Vr(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
  }
  var P = Kr,
    qr = P;
  function Wr(e) {
    var t = qr(this, e).delete(e);
    return (this.size -= t ? 1 : 0), t;
  }
  var Yr = Wr,
    Jr = P;
  function Xr(e) {
    return Jr(this, e).get(e);
  }
  var kr = Xr,
    Zr = P;
  function Qr(e) {
    return Zr(this, e).has(e);
  }
  var ea = Qr,
    ta = P;
  function ra(e, t) {
    var r = ta(this, e),
      a = r.size;
    return r.set(e, t), (this.size += r.size == a ? 0 : 1), this;
  }
  var aa = ra,
    na = zr,
    ia = Yr,
    oa = kr,
    sa = ea,
    ca = aa;
  function y(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var a = e[t];
      this.set(a[0], a[1]);
    }
  }
  (y.prototype.clear = na),
    (y.prototype.delete = ia),
    (y.prototype.get = oa),
    (y.prototype.has = sa),
    (y.prototype.set = ca);
  var ua = y,
    la = x,
    fa = Y,
    pa = ua,
    va = 200;
  function da(e, t) {
    var r = this.__data__;
    if (r instanceof la) {
      var a = r.__data__;
      if (!fa || a.length < va - 1)
        return a.push([e, t]), (this.size = ++r.size), this;
      r = this.__data__ = new pa(a);
    }
    return r.set(e, t), (this.size = r.size), this;
  }
  var ha = da,
    ba = x,
    ga = tt,
    _a = at,
    ya = it,
    $a = st,
    ma = ha;
  function $(e) {
    var t = (this.__data__ = new ba(e));
    this.size = t.size;
  }
  ($.prototype.clear = ga),
    ($.prototype.delete = _a),
    ($.prototype.get = ya),
    ($.prototype.has = $a),
    ($.prototype.set = ma);
  var wa = $,
    Oa = L,
    Ta = (function () {
      try {
        var e = Oa(Object, "defineProperty");
        return e({}, "", {}), e;
      } catch {}
    })(),
    k = Ta,
    Z = k;
  function ja(e, t, r) {
    t == "__proto__" && Z
      ? Z(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
      : (e[t] = r);
  }
  var G = ja,
    Ca = G,
    Aa = C;
  function xa(e, t, r) {
    ((r !== void 0 && !Aa(e[t], r)) || (r === void 0 && !(t in e))) &&
      Ca(e, t, r);
  }
  var Q = xa;
  function Sa(e) {
    return function (t, r, a) {
      for (var n = -1, i = Object(t), c = a(t), o = c.length; o--; ) {
        var u = c[e ? o : ++n];
        if (r(i[u], u, i) === !1) break;
      }
      return t;
    };
  }
  var Ia = Sa,
    Pa = Ia,
    Ea = Pa(),
    Da = Ea,
    E = { exports: {} };
  E.exports,
    (function (e, t) {
      var r = g,
        a = t && !t.nodeType && t,
        n = a && !0 && e && !e.nodeType && e,
        i = n && n.exports === a,
        c = i ? r.Buffer : void 0,
        o = c ? c.allocUnsafe : void 0;
      function u(f, p) {
        if (p) return f.slice();
        var v = f.length,
          d = o ? o(v) : new f.constructor(v);
        return f.copy(d), d;
      }
      e.exports = u;
    })(E, E.exports);
  var Fa = E.exports,
    Ma = g,
    Ua = Ma.Uint8Array,
    La = Ua,
    ee = La;
  function Ga(e) {
    var t = new e.constructor(e.byteLength);
    return new ee(t).set(new ee(e)), t;
  }
  var Ba = Ga,
    Ha = Ba;
  function za(e, t) {
    var r = t ? Ha(e.buffer) : e.buffer;
    return new e.constructor(r, e.byteOffset, e.length);
  }
  var Na = za;
  function Ra(e, t) {
    var r = -1,
      a = e.length;
    for (t || (t = Array(a)); ++r < a; ) t[r] = e[r];
    return t;
  }
  var Va = Ra,
    Ka = h,
    te = Object.create,
    qa = (function () {
      function e() {}
      return function (t) {
        if (!Ka(t)) return {};
        if (te) return te(t);
        e.prototype = t;
        var r = new e();
        return (e.prototype = void 0), r;
      };
    })(),
    Wa = qa;
  function Ya(e, t) {
    return function (r) {
      return e(t(r));
    };
  }
  var Ja = Ya,
    Xa = Ja,
    ka = Xa(Object.getPrototypeOf, Object),
    re = ka,
    Za = Object.prototype;
  function Qa(e) {
    var t = e && e.constructor,
      r = (typeof t == "function" && t.prototype) || Za;
    return e === r;
  }
  var ae = Qa,
    en = Wa,
    tn = re,
    rn = ae;
  function an(e) {
    return typeof e.constructor == "function" && !rn(e) ? en(tn(e)) : {};
  }
  var nn = an;
  function on(e) {
    return e != null && typeof e == "object";
  }
  var w = on,
    sn = S,
    cn = w,
    un = "[object Arguments]";
  function ln(e) {
    return cn(e) && sn(e) == un;
  }
  var fn = ln,
    ne = fn,
    pn = w,
    ie = Object.prototype,
    vn = ie.hasOwnProperty,
    dn = ie.propertyIsEnumerable,
    hn = ne(
      (function () {
        return arguments;
      })()
    )
      ? ne
      : function (e) {
          return pn(e) && vn.call(e, "callee") && !dn.call(e, "callee");
        },
    oe = hn,
    bn = Array.isArray,
    se = bn,
    gn = 9007199254740991;
  function _n(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= gn;
  }
  var ce = _n,
    yn = M,
    $n = ce;
  function mn(e) {
    return e != null && $n(e.length) && !yn(e);
  }
  var B = mn,
    wn = B,
    On = w;
  function Tn(e) {
    return On(e) && wn(e);
  }
  var jn = Tn,
    D = { exports: {} };
  function Cn() {
    return !1;
  }
  var An = Cn;
  D.exports,
    (function (e, t) {
      var r = g,
        a = An,
        n = t && !t.nodeType && t,
        i = n && !0 && e && !e.nodeType && e,
        c = i && i.exports === n,
        o = c ? r.Buffer : void 0,
        u = o ? o.isBuffer : void 0,
        f = u || a;
      e.exports = f;
    })(D, D.exports);
  var ue = D.exports,
    xn = S,
    Sn = re,
    In = w,
    Pn = "[object Object]",
    En = Function.prototype,
    Dn = Object.prototype,
    le = En.toString,
    Fn = Dn.hasOwnProperty,
    Mn = le.call(Object);
  function Un(e) {
    if (!In(e) || xn(e) != Pn) return !1;
    var t = Sn(e);
    if (t === null) return !0;
    var r = Fn.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && le.call(r) == Mn;
  }
  var Ln = Un,
    Gn = S,
    Bn = ce,
    Hn = w,
    zn = "[object Arguments]",
    Nn = "[object Array]",
    Rn = "[object Boolean]",
    Vn = "[object Date]",
    Kn = "[object Error]",
    qn = "[object Function]",
    Wn = "[object Map]",
    Yn = "[object Number]",
    Jn = "[object Object]",
    Xn = "[object RegExp]",
    kn = "[object Set]",
    Zn = "[object String]",
    Qn = "[object WeakMap]",
    ei = "[object ArrayBuffer]",
    ti = "[object DataView]",
    ri = "[object Float32Array]",
    ai = "[object Float64Array]",
    ni = "[object Int8Array]",
    ii = "[object Int16Array]",
    oi = "[object Int32Array]",
    si = "[object Uint8Array]",
    ci = "[object Uint8ClampedArray]",
    ui = "[object Uint16Array]",
    li = "[object Uint32Array]",
    l = {};
  (l[ri] = l[ai] = l[ni] = l[ii] = l[oi] = l[si] = l[ci] = l[ui] = l[li] = !0),
    (l[zn] =
      l[Nn] =
      l[ei] =
      l[Rn] =
      l[ti] =
      l[Vn] =
      l[Kn] =
      l[qn] =
      l[Wn] =
      l[Yn] =
      l[Jn] =
      l[Xn] =
      l[kn] =
      l[Zn] =
      l[Qn] =
        !1);
  function fi(e) {
    return Hn(e) && Bn(e.length) && !!l[Gn(e)];
  }
  var pi = fi;
  function vi(e) {
    return function (t) {
      return e(t);
    };
  }
  var di = vi,
    F = { exports: {} };
  F.exports,
    (function (e, t) {
      var r = z,
        a = t && !t.nodeType && t,
        n = a && !0 && e && !e.nodeType && e,
        i = n && n.exports === a,
        c = i && r.process,
        o = (function () {
          try {
            var u = n && n.require && n.require("util").types;
            return u || (c && c.binding && c.binding("util"));
          } catch {}
        })();
      e.exports = o;
    })(F, F.exports);
  var hi = F.exports,
    bi = pi,
    gi = di,
    fe = hi,
    pe = fe && fe.isTypedArray,
    _i = pe ? gi(pe) : bi,
    ve = _i;
  function yi(e, t) {
    if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
      return e[t];
  }
  var de = yi,
    $i = G,
    mi = C,
    wi = Object.prototype,
    Oi = wi.hasOwnProperty;
  function Ti(e, t, r) {
    var a = e[t];
    (!(Oi.call(e, t) && mi(a, r)) || (r === void 0 && !(t in e))) &&
      $i(e, t, r);
  }
  var ji = Ti,
    Ci = ji,
    Ai = G;
  function xi(e, t, r, a) {
    var n = !r;
    r || (r = {});
    for (var i = -1, c = t.length; ++i < c; ) {
      var o = t[i],
        u = a ? a(r[o], e[o], o, r, e) : void 0;
      u === void 0 && (u = e[o]), n ? Ai(r, o, u) : Ci(r, o, u);
    }
    return r;
  }
  var Si = xi;
  function Ii(e, t) {
    for (var r = -1, a = Array(e); ++r < e; ) a[r] = t(r);
    return a;
  }
  var Pi = Ii,
    Ei = 9007199254740991,
    Di = /^(?:0|[1-9]\d*)$/;
  function Fi(e, t) {
    var r = typeof e;
    return (
      (t = t ?? Ei),
      !!t &&
        (r == "number" || (r != "symbol" && Di.test(e))) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
    );
  }
  var he = Fi,
    Mi = Pi,
    Ui = oe,
    Li = se,
    Gi = ue,
    Bi = he,
    Hi = ve,
    zi = Object.prototype,
    Ni = zi.hasOwnProperty;
  function Ri(e, t) {
    var r = Li(e),
      a = !r && Ui(e),
      n = !r && !a && Gi(e),
      i = !r && !a && !n && Hi(e),
      c = r || a || n || i,
      o = c ? Mi(e.length, String) : [],
      u = o.length;
    for (var f in e)
      (t || Ni.call(e, f)) &&
        !(
          c &&
          (f == "length" ||
            (n && (f == "offset" || f == "parent")) ||
            (i && (f == "buffer" || f == "byteLength" || f == "byteOffset")) ||
            Bi(f, u))
        ) &&
        o.push(f);
    return o;
  }
  var Vi = Ri;
  function Ki(e) {
    var t = [];
    if (e != null) for (var r in Object(e)) t.push(r);
    return t;
  }
  var qi = Ki,
    Wi = h,
    Yi = ae,
    Ji = qi,
    Xi = Object.prototype,
    ki = Xi.hasOwnProperty;
  function Zi(e) {
    if (!Wi(e)) return Ji(e);
    var t = Yi(e),
      r = [];
    for (var a in e) (a == "constructor" && (t || !ki.call(e, a))) || r.push(a);
    return r;
  }
  var Qi = Zi,
    eo = Vi,
    to = Qi,
    ro = B;
  function ao(e) {
    return ro(e) ? eo(e, !0) : to(e);
  }
  var be = ao,
    no = Si,
    io = be;
  function oo(e) {
    return no(e, io(e));
  }
  var so = oo,
    ge = Q,
    co = Fa,
    uo = Na,
    lo = Va,
    fo = nn,
    _e = oe,
    ye = se,
    po = jn,
    vo = ue,
    ho = M,
    bo = h,
    go = Ln,
    _o = ve,
    $e = de,
    yo = so;
  function $o(e, t, r, a, n, i, c) {
    var o = $e(e, r),
      u = $e(t, r),
      f = c.get(u);
    if (f) {
      ge(e, r, f);
      return;
    }
    var p = i ? i(o, u, r + "", e, t, c) : void 0,
      v = p === void 0;
    if (v) {
      var d = ye(u),
        T = !d && vo(u),
        Ae = !d && !T && _o(u);
      (p = u),
        d || T || Ae
          ? ye(o)
            ? (p = o)
            : po(o)
            ? (p = lo(o))
            : T
            ? ((v = !1), (p = co(u, !0)))
            : Ae
            ? ((v = !1), (p = uo(u, !0)))
            : (p = [])
          : go(u) || _e(u)
          ? ((p = o), _e(o) ? (p = yo(o)) : (!bo(o) || ho(o)) && (p = fo(u)))
          : (v = !1);
    }
    v && (c.set(u, p), n(p, u, a, i, c), c.delete(u)), ge(e, r, p);
  }
  var mo = $o,
    wo = wa,
    Oo = Q,
    To = Da,
    jo = mo,
    Co = h,
    Ao = be,
    xo = de;
  function me(e, t, r, a, n) {
    e !== t &&
      To(
        t,
        function (i, c) {
          if ((n || (n = new wo()), Co(i))) jo(e, t, c, r, me, a, n);
          else {
            var o = a ? a(xo(e, c), i, c + "", e, t, n) : void 0;
            o === void 0 && (o = i), Oo(e, c, o);
          }
        },
        Ao
      );
  }
  var So = me;
  function Io(e) {
    return e;
  }
  var we = Io;
  function Po(e, t, r) {
    switch (r.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, r[0]);
      case 2:
        return e.call(t, r[0], r[1]);
      case 3:
        return e.call(t, r[0], r[1], r[2]);
    }
    return e.apply(t, r);
  }
  var Eo = Po,
    Do = Eo,
    Oe = Math.max;
  function Fo(e, t, r) {
    return (
      (t = Oe(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (
          var a = arguments, n = -1, i = Oe(a.length - t, 0), c = Array(i);
          ++n < i;

        )
          c[n] = a[t + n];
        n = -1;
        for (var o = Array(t + 1); ++n < t; ) o[n] = a[n];
        return (o[t] = r(c)), Do(e, this, o);
      }
    );
  }
  var Mo = Fo;
  function Uo(e) {
    return function () {
      return e;
    };
  }
  var Lo = Uo,
    Go = Lo,
    Te = k,
    Bo = we,
    Ho = Te
      ? function (e, t) {
          return Te(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: Go(t),
            writable: !0,
          });
        }
      : Bo,
    zo = Ho,
    No = 800,
    Ro = 16,
    Vo = Date.now;
  function Ko(e) {
    var t = 0,
      r = 0;
    return function () {
      var a = Vo(),
        n = Ro - (a - r);
      if (((r = a), n > 0)) {
        if (++t >= No) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  var qo = Ko,
    Wo = zo,
    Yo = qo,
    Jo = Yo(Wo),
    Xo = Jo,
    ko = we,
    Zo = Mo,
    Qo = Xo;
  function es(e, t) {
    return Qo(Zo(e, t, ko), e + "");
  }
  var ts = es,
    rs = C,
    as = B,
    ns = he,
    is = h;
  function os(e, t, r) {
    if (!is(r)) return !1;
    var a = typeof t;
    return (a == "number" ? as(r) && ns(t, r.length) : a == "string" && t in r)
      ? rs(r[t], e)
      : !1;
  }
  var ss = os,
    cs = ts,
    us = ss;
  function ls(e) {
    return cs(function (t, r) {
      var a = -1,
        n = r.length,
        i = n > 1 ? r[n - 1] : void 0,
        c = n > 2 ? r[2] : void 0;
      for (
        i = e.length > 3 && typeof i == "function" ? (n--, i) : void 0,
          c && us(r[0], r[1], c) && ((i = n < 3 ? void 0 : i), (n = 1)),
          t = Object(t);
        ++a < n;

      ) {
        var o = r[a];
        o && e(t, o, a, i);
      }
      return t;
    });
  }
  var fs = ls,
    ps = So,
    vs = fs,
    ds = vs(function (e, t, r) {
      ps(e, t, r);
    }),
    hs = ds;
  const H = xe(hs),
    bs = "body",
    gs = "https://cdn.botpress.cloud/webchat/v2.2/webchat.js",
    _s = "https://cdn.botpress.cloud/webchat/v2.2/fab.js",
    ys = () => {
      (s.state = "opened"), O(), s._emit("webchat:opened", {});
    },
    $s = () => {
      (s.state = "closed"), O(), s._emit("webchat:closed", {});
    },
    ms = () => {
      (s.state = s.state === "opened" ? "closed" : "opened"),
        O(),
        s.state === "opened"
          ? s._emit("webchat:opened", {})
          : s.state === "closed" && s._emit("webchat:closed", {});
    },
    ws = (e) => {
      throw new Error(
        "Botpress webchat is not initialized. Please call botpress.init() before sending events."
      );
    },
    Os = (e) => {
      throw new Error(
        "Botpress webchat is not initialized. Please call botpress.init() before sending messages."
      );
    },
    Ts = () => {
      throw new Error(
        "Botpress webchat is not initialized. Please call botpress.init() before getting the user information."
      );
    },
    js = async (e) => {
      s.user = H(s.user, e);
    },
    Cs = (e) => {
      const { configuration: t, user: r } = e;
      t && (s.configuration = H(s.configuration, t)),
        r && (s.user = H(s.user, r)),
        O();
    },
    As = (e) => {
      if (s.initialized) return;
      if (!e.botId) {
        console.error("Botpress: botId is required");
        return;
      }
      if (!e.clientId) {
        console.error("Botpress: clientId is required");
        return;
      }
      const {
        botId: t,
        clientId: r,
        selector: a = bs,
        webchatScriptUrl: n = gs,
        fabScriptUrl: i = _s,
        pushpinUrl: c,
        defaultState: o,
        configuration: u,
        user: f,
      } = e;
      (s.botId = t),
        (s.clientId = r),
        (s.pushpinUrl = c ?? s.pushpinUrl),
        (s.state = o ?? s.state),
        (s.configuration = u ?? s.configuration),
        (s.user = f ?? s.user);
      const p = document.querySelector(a);
      if (!p) {
        console.error(
          `Botpress: could not find element to inject the webchat selector "${a}"`
        );
        return;
      }
      (s.webchatIframe = je(
        p,
        s.webchatId,
        n,
        "webchat",
        s.configuration?.additionalStylesheetUrl
      )),
        (s.fabIframe = je(
          p,
          s.fabId,
          i,
          "fab",
          s.configuration?.additionalStylesheetUrl
        ));
      const v = s.configuration?.radius ?? 1;
      O();
      const d = document.createElement("style"),
        T = `
    .bpFab {
    z-index: 9998;
    position: fixed;
    bottom: 1.5rem;
    right: 1.4rem;
    height: 6.4rem;
    width: 6.4rem;
    border-radius: 100%;
    background: linear-gradient(135deg, #3d6aff, #00e0ff);
    transition: all 0.3s ease;
    animation: pulseGlow 3s infinite ease-in-out;
    }

    .bpFab::before {
    position: absolute;
    width: 120%;
    height: 120%;
    animation: ripple 2s infinite;
    border-radius: 100%;
    }

    .bpFab:hover {
    transform: scale(1.1);
    }

    .bpFab:active {
    transform: scale(0.9);
    }

    @keyframes pulseGlow {
    0%, 100% {
        box-shadow: 0 0 20px rgba(61, 106, 255, 0.6), 0 0 40px rgba(0, 224, 255, 0.4);
    }
    50% {
        box-shadow: 0 0 30px rgba(61, 106, 255, 0.9), 0 0 60px rgba(0, 224, 255, 0.6);
    }
    }

    @keyframes ripple {
    0% {
        transform: scale(0.8);
        opacity: 0.6;
    }
    100% {
        transform: scale(1.5);
        opacity: 0;
    }
    }

    .bpWebchat {
      width: 100%;
      height: 100dvh;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 9999;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: ${0.375 * v}rem;
    }
    @media (min-width: 57em) {
      .bpWebchat {
        width: 400px;
        bottom: 8.5rem;
        right: 1.5rem;
        max-height: 700px;
        height: min(700px, calc(100% - 120px));
        transform-origin: bottom right;
      }
    }

    @media (max-width: 700px) {
      :has(.bpOpen) {
        overflow: hidden;
      }
    }
    @media only screen and (max-width: 40em) {
        .bpWebchat {
            width: 100vw;
            height: 100vh;
            border-radius: 0;      
            box-shadow: none;
        }
    }

    .bpOpen {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity 100ms ease-in-out,
        transform 100ms ease-in-out;
    }
    .bpClose {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      transform: translateY(80px);
      transition:
        visibility 0s 100ms,
        opacity 100ms ease-in-out,
        transform 100ms ease-in-out;
    }
  `;
      (d.textContent = T),
        p.appendChild(d),
        (s.initialized = !0),
        s._emit("webchat:ready", {});
    },
    O = () => {
      const e = s.state === "opened" ? "bpOpen" : "bpClose";
      s.webchatIframe?.setAttribute("class", `${e} bpWebchat bpReset`),
        s.fabIframe?.setAttribute("class", "bpFab");
    },
    xs = () => !!navigator.userAgent.match("Firefox"),
    Ss = (e) => {
      const t = document.createElement("script");
      return (t.type = "text/javascript"), (t.src = e), (t.type = "module"), t;
    },
    je = (e, t, r, a, n) => {
      const i = document.createElement("iframe");
      if (
        (i.setAttribute("aria-hidden", "true"),
        i.setAttribute("tabIndex", "-1"),
        i.setAttribute("title", "Botpress"),
        i.setAttribute("frameborder", "0"),
        i.setAttribute("name", a),
        e.appendChild(i),
        xs())
      ) {
        const o = i.contentDocument?.open();
        o?.write("<!DOCTYPE html>"), o?.close();
      }
      i.contentDocument &&
        ((i.contentDocument.documentElement.innerHTML = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1 viewport-fit=cover, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"></head><body class="bpHeightFull"><div class="bpHeightFull" id="${t}"></div></body></html>`),
        i.contentDocument.documentElement.setAttribute("lang", "en"),
        i.contentDocument.documentElement.setAttribute(
          "class",
          "bpHeightFull bpReset"
        ));
      const c = Ss(r);
      return (
        i.contentDocument?.head.append(c),
        i.contentDocument?.head.append(`<link
    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet" />`),
        n &&
          i.contentDocument?.head.append(
            `<link rel="stylesheet" href="${n}" />`
          ),
        i
      );
    },
    Ce = (() => {
      const e = {};
      return {
        on: (a, n) => (
          e[a] || (e[a] = new Set()), e[a]?.add(n), () => e[a]?.delete(n)
        ),
        emit: (a, n) => {
          e[a]?.forEach((i) => i(n)),
            e["*"]?.forEach((i) => i({ type: a, payload: n }));
        },
      };
    })(),
    s = {
      initialized: !1,
      version: "2f1670244fa58c10f74063afb0de2d3518d16b56",
      pushpinUrl: "https://webchat.botpress.cloud",
      clientId: "",
      botId: "",
      fabIframe: void 0,
      fabId: "fab-root",
      state: "initial",
      webchatIframe: void 0,
      webchatId: "webchat-root",
      configuration: void 0,
      user: void 0,
      allowFileUpload: void 0,
      open: ys,
      close: $s,
      toggle: ms,
      init: As,
      config: Cs,
      sendEvent: ws,
      sendMessage: Os,
      updateUser: js,
      getUser: Ts,
      on: Ce.on,
      _emit: Ce.emit,
    };
  window.botpress = s;
})();
