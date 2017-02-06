(function() {
	var g = window.lhgcore = window.J = function(a, d) {
		return g.ret.init(a, d)
	};
	g.ret = g.prototype = {
		init: function(a, d) {
			a = (a == 'body') ? document.body : (a == 'doc') ? document : a;
			if ('string' == typeof(a)) {
				if (a.indexOf('#') == 0) {
					var b = (d || document).getElementById(a.substr(1));
					if (b) return b;
					else return null
				}
				var b = (d || document).getElementById(a);
				if (b) return g(b);
				else return null
			} else {
				this[0] = a;
				this.length = 1;
				return this
			}
		},
		html: function(t) {
			if (t) {
				this[0].innerHTML = t;
				return this
			} else return this[0].innerHTML
		},
		isnl: function() {
			var v = this[0].value;
			return (v == '' || v.length == 0) ? true : false
		},
		val: function(v) {
			if (v) {
				this[0].value = v;
				return this
			} else return this[0].value
		},
		acls: function(c, p) {
			this[0].className = p ? this[0].className + ' ' + c : c;
			return this
		},
		rcls: function() {
			var a = g.ie ? 'className' : 'class';
			this[0].removeAttribute(a, 0);
			return this
		},
		crte: function(e) {
			return this[0].createElement(e)
		},
		apch: function(c, y) {
			switch (y) {
				case 'pr':
					return this[0].insertBefore(c, this[0].firstChild);
					break;
				case 'be':
					return this[0].parentNode.insertBefore(c, this[0]);
					break;
				case 'af':
					return this[0].parentNode.insertBefore(c, this[0].nextSibling);
					break;
				default:
					return this[0].appendChild(c);
					break
			}
		},
		stcs: function(d, s) {
			if (typeof(d) == 'object') {
				for (var n in d) this[0].style[n] = d[n];
				return this
			} else {
				this[0].style[d] = s;
				return this
			}
		},
		gtcs: function(p) {
			if (g.ie) return this[0].currentStyle[p];
			else return this[0].ownerDocument.defaultView.getComputedStyle(this[0], '').getPropertyValue(p)
		},
		gtag: function(n) {
			return this[0].getElementsByTagName(n)
		},
		attr: function(k, v) {
			if (typeof(k) == 'object') {
				for (var n in k) this[0][n] = k[n];
				return this
			}
			if (v) {
				this[0].setAttribute(k, v, 0);
				return this
			} else {
				var a = this[0].attributes[k];
				if (a == null || !a.specified) return '';
				return this[0].getAttribute(k, 2)
			}
		},
		ratt: function(n) {
			var a = this[0].attributes[n];
			if (a == null || !a.specified) return this;
			this[0].removeAttribute(n, 0);
			return this
		},
		aevt: function(n, f) {
			if (g.ie) this[0].attachEvent('on' + n, f);
			else this[0].addEventListener(n, f, false);
			return this
		},
		revt: function(n, f) {
			if (g.ie) this[0].detachEvent('on' + n, f);
			else this[0].removeEventListener(n, f, false);
			return this
		},
		alnk: function(c) {
			if (g.ie) return this[0].createStyleSheet(c).owningElement;
			else {
				var e = this[0].createElement('link');
				e.rel = 'stylesheet';
				e.type = 'text/css';
				e.href = c;
				this[0].getElementsByTagName('head')[0].appendChild(e);
				return e
			}
		}
	};
	g.ret.init.prototype = g.ret;
	g.exend = g.ret.exend = function() {
		var a = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false,
			options;
		if (a.constructor == Boolean) {
			deep = a;
			a = arguments[1] || {};
			i = 2
		}
		if (typeof a != 'object' && typeof a != 'function') a = {};
		if (length == i) {
			a = this;
			--i
		}
		for (; i < length; i++)
			if ((options = arguments[i]) != null)
				for (var b in options) {
					var c = a[b],
						copy = options[b];
					if (a === copy) continue;
					if (deep && copy && typeof copy == 'object' && !copy.nodeType) a[b] = g.extend(deep, c || (copy.length != null ? [] : {}), copy);
					else if (copy !== undefined) a[b] = copy
				}
			return a
	};
	g.ret.exend({
		stopac: function(o) {
			if (g.ie) {
				o = Math.round(o * 100);
				this[0].style.filter = (o > 100 ? '' : 'alpha(opacity=' + o + ')')
			} else this[0].style.opacity = o
		},
		addentex: function(n, l, p) {
			if (g.ie) {
				var o = {};
				o.source = this[0];
				o.params = p || [];
				o.listen = function(a) {
					return l.apply(o.source, [a].concat(o.params))
				};
				if (g.clean) g.clean.items(null, function() {
					o.source = null;
					o.params = null
				});
				this[0].attachEvent('on' + n, o.listen);
				this[0] = null;
				p = null
			} else this[0].addEventListener(n, function(e) {
				l.apply(this[0], [e].concat(p || []))
			}, false);
			return this
		},
		click: function(f) {
			this[0].onclick = f;
			return this
		},
		blur: function(f) {
			this[0].onblur = f;
			return this
		},
		focus: function(f) {
			if (f) this[0].onfocus = f;
			else this[0].focus();
			return this
		},
		msdown: function(f) {
			this[0].onmousedown = f;
			return this
		},
		msmove: function(f) {
			this[0].onmousemove = f;
			return this
		},
		msover: function(f) {
			this[0].onmouseover = f;
			return this
		},
		msout: function(f) {
			this[0].onmouseout = f;
			return this
		},
		msup: function(f) {
			this[0].onmouseup = f;
			return this
		},
		submit: function(f) {
			if (f) this[0].onsubmit = f;
			else this[0].onsubmit();
			return this
		},
		cmenu: function(f) {
			this[0].oncontextmenu = f;
			return this
		},
		hover: function(r, t) {
			this[0].onmouseover = r;
			this[0].onmouseout = t;
			return this
		}
	});
	g.exend({
		build: '1.0.0',
		author: 'LiHuiGang',
		path: function(t) {
			t = t || 'lhgcore.js';
			var a, len, sc = g('doc').gtag('script');
			for (var i = 0; i < sc.length; i++) {
				a = sc[i].src.substr(0, g.inde(sc[i].src.toLowerCase(), t));
				len = a.lastIndexOf('/');
				if (len > 0) a = a.substr(0, len + 1);
				if (a) break
			}
			if (g.ie && g.inde(a, '../') != -1) {
				var b = window.location.href;
				b = b.substr(0, b.lastIndexOf('/'));
				while (g.inde(a, '../') >= 0) {
					a = a.substr(3);
					b = b.substr(0, b.lastIndexOf('/'))
				}
				return b + '/' + a
			} else return a
		},
		idtd: function(d) {
			return ('CSS1Compat' == (d.compatMode || 'CSS1Compat'))
		},
		rech: function(c) {
			if (c) return c.parentNode.removeChild(c)
		},
		gtev: function() {
			if (g.ie) return window.event;
			var a = this.gtev.caller;
			while (a != null) {
				var b = a.arguments[0];
				if (b && (b + '').indexOf('Event') >= 0) return b;
				a = a.caller
			}
			return null
		},
		trim: function(t) {
			return (t || '').replace(/^\s+|\s+$/g, '')
		},
		inde: function(t, s) {
			return t.indexOf(s)
		},
		edoc: function(a) {
			return a.ownerDocument || a.document
		},
		ewin: function(a) {
			return this.dwin(this.edoc(a))
		},
		dwin: function(d) {
			if (g.sa && !d.parentWindow) this.fixw(window.top);
			return d.parentWindow || d.defaultView
		},
		fixw: function(w) {
			if (w.document) w.document.parentWindow = w;
			for (var i = 0; i < w.frames.length; i++) g.fixw(w.frames[i])
		},
		vsiz: function(a) {
			if (g.ie) {
				var b, doc = a.document.documentElement;
				if (doc && doc.clientWidth) b = doc;
				else b = a.document.body; if (b) return {
					w: b.clientWidth,
					h: b.clientHeight
				};
				else return {
					w: 0,
					h: 0
				}
			} else return {
				w: a.innerWidth,
				h: a.innerHeight
			}
		},
		spos: function(w) {
			if (g.ie) {
				var a = w.document;
				oPos = {
					x: a.documentElement.scrollLeft,
					y: a.documentElement.scrollTop
				};
				if (oPos.x > 0 || oPos.y > 0) return oPos;
				return {
					x: a.body.scrollLeft,
					y: a.body.scrollTop
				}
			} else return {
				x: w.pageXOffset,
				y: w.pageYOffset
			}
		},
		dpos: function(w, n) {
			var x = 0,
				y = 0,
				cn = n,
				pn = null,
				cw = g.ewin(cn);
			while (cn && !(cw == w && (cn == w.document.body || cn == w.document.documentElement))) {
				x += cn.offsetLeft - cn.scrollLeft;
				y += cn.offsetTop - cn.scrollTop;
				if (g.op) {
					var a = pn;
					while (a && a != cn) {
						x -= a.scrollLeft;
						y -= a.scrollTop;
						a = a.parentNode
					}
				}
				pn = cn;
				if (cn.offsetParent) cn = cn.offsetParent;
				else {
					if (cw != w) {
						cn = cw.frameElement;
						pn = null;
						if (cn) cw = cn.contentWindow.parent
					} else cn = null
				}
			}
			if (g(w.document.body).gtcs('position') != 'static' || (g.ie && g.gtan(n) == null)) {
				x += w.document.body.offsetLeft;
				y += w.document.body.offsetTop
			}
			return {
				'x': x,
				'y': y
			}
		},
		gtan: function(e) {
			var a = e;
			while (a != g.edoc(a).documentElement) {
				if (g(a).gtcs('position') != 'static') return a;
				a = a.parentNode
			}
			return null
		},
		canc: function(e) {
			if (g.ie) return false;
			else {
				if (e) e.preventDefault()
			}
		},
		empty: function(t) {
			return (t == '' || t.length == 0) ? true : false
		},
		dismn: function(e) {
			var a = e || window.event,
				el = a.srcElement || a.target,
				tn = el.tagName;
			if (!((tn == 'INPUT' && el.type == 'text') || tn == 'TEXTAREA')) {
				if (g.ie) return false;
				else {
					if (e) e.preventDefault()
				}
			}
		},
		nosel: function(o) {
			if (g.ie) {
				o.unselectable = 'on';
				var e, i = 0;
				while ((e = o.all[i++])) {
					switch (e.tagName.toLowerCase()) {
						case 'iframe':
						case 'textarea':
						case 'input':
						case 'select':
							break;
						default:
							e.unselectable = 'on'
					}
				}
			} else {
				if (g.mz) o.style.MozUserSelect = 'none';
				else if (g.sa) o.style.KhtmlUserSelect = 'none';
				else o.style.userSelect = 'none'
			}
		},
		gtvod: function() {
			if (g.ie) return (g.i7 ? '' : 'javascript:\'\'');
			return 'javascript:void(0)'
		}
	});
	var j = navigator.userAgent.toLowerCase();
	g.exend({
		ie: /msie/.test(j) && !/opera/.test(j),
		i7: (j.match(/msie (\d+)/) || [])[1] >= 7 && !/opera/.test(j),
		ch: /chrome/.test(j),
		op: /opera/.test(j),
		sa: /webkit/.test(j) && !/chrome/.test(j),
		mz: /mozilla/.test(j) && !/(compatible|webkit)/.test(j)
	});
	g.exend({
		cleanup: function() {
			if (window._lhgcleanobj) this.citem = window._lhgcleanobj.citem;
			else {
				this.citem = [];
				window._lhgcleanobj = this;
				J(window).addentex('unload', this.lhg_clean)
			}
		}
	});
	g.exend(g.cleanup.prototype, {
		items: function(a, b) {
			this.citem.push([a, b])
		},
		lhg_clean: function() {
			if (!this._lhgcleanobj) return;
			var a = this._lhgcleanobj.citem;
			while (a.length > 0) {
				var b = a.pop();
				if (b) b[1].call(b[0])
			}
			this._lhgcleanobj = null;
			g = null;
			if (CollectGarbage) CollectGarbage()
		}
	});
	if (g.ie) g.clean = new g.cleanup();
	J.exend({
		panel: function(b, w) {
			this._win = window;
			var a, doc, r_win = [this._win];
			if (b) {
				while (this._win.parent && this._win.parent != this._win) {
					try {
						if (this._win.parent.document.domain != document.domain) break
					} catch (e) {
						break
					}
					this._win = this._win.parent;
					r_win.push(this._win)
				}
			}
			if (w) {
				for (var i = 0; i < w.length; i++) r_win.push(w[i])
			}
			a = this._ifrm = J(this._win.document).crte('iframe');
			J(a).attr({
				src: 'javascript:void(0)',
				frameBorder: 0,
				scrolling: 'no'
			}).stcs({
				display: 'none',
				position: 'absolute',
				zIndex: 19700
			});
			J(this._win.document.body).apch(a);
			doc = this._doc = a.contentWindow.document;
			if (J.ie) g.clean.items(this, this.p_clean);
			var c = '';
			if (J.sa) c = '<base href="' + window.document.location + '">';
			doc.open();
			doc.write('<html><head>' + c + '<\/head><body style="margin:0px;padding:0px;"><\/body><\/html>');
			doc.close();
			for (var i = 0; i < r_win.length; i++) J(r_win[i].document).addentex('click', this.hide, this);
			J(doc).aevt('contextmenu', J.dismn);
			this._main = J(doc.body).apch(doc.createElement('div'));
			this._main.style.cssFloat = 'left'
		}
	});
	J.exend(J.panel.prototype, {
		applnk: function(l) {
			J(this._doc).alnk(l)
		},
		show: function(x, y, e, w, h) {
			var a = this._main,
				iw, ih;
			J(this._ifrm).stcs('display', 'block');
			J(a).stcs({
				width: w ? w + 'px' : '',
				height: h ? h + 'px' : ''
			});
			iw = a.offsetWidth;
			ih = a.offsetHeight;
			if (!w) this._ifrm.style.width = '1px';
			if (!h) this._ifrm.style.height = '1px';
			iw = a.offsetWidth || a.firstChild.offsetWidth;
			var b = e.nodeType == 9 ? J.idtd(e) ? e.documentElement : e.body : e;
			var c = J.dpos(this._win, b);
			x += c.x;
			y += c.y;
			var d = J.vsiz(this._win),
				sp = J.spos(this._win),
				vh = d.h + sp.y,
				vw = d.w + sp.x;
			if ((x + iw) > vw) x -= x + iw - vw;
			if ((y + ih) > vh) y -= y + ih - vh;
			J(this._ifrm).stcs({
				left: x + 'px',
				top: y + 'px',
				width: iw + 'px',
				height: ih + 'px'
			})
		},
		hide: function(e, a) {
			J(a._ifrm).stcs('display', 'none')
		},
		p_clean: function() {
			this._main = null;
			this._doc = null;
			this._ifrm = null;
			this._win = null
		}
	});
	g.ajax = g.A = {
		geth: function() {
			try {
				return new ActiveXObject('Msxml2.XMLHTTP')
			} catch (e) {}
			try {
				return new XMLHttpRequest()
			} catch (e) {}
			return null
		},
		send: function(u, m, p, f, x) {
			m = m ? m.toLocaleUpperCase() : 'GET';
			x = x ? x : 0;
			p = p ? p + '&uuid=' + new Date().getTime() : null;
			var a = (typeof(f) == 'function'),
				ret;
			var b = this.geth();
			b.open(m, u, a);
			if (a) {
				b.onreadystatechange = function() {
					if (b.readyState == 4) {
						ret = (x == 0) ? b.responseText : b.responseXML;
						f(ret);
						delete(b);
						return
					} else return false
				}
			}
			if (m == 'GET') b.send(null);
			else {
				b.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
				if (p) b.send(p);
				else return false
			} if (!a) {
				if (b.readyState == 4 && b.status == 200) {
					ret = (x == 0) ? b.responseText : b.responseXML;
					delete(b);
					return ret
				} else return false
			}
		}
	}
})();