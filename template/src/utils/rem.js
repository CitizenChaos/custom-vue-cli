;(function(doc, win) {
  const docEl = doc.documentElement
  const isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  let dpr
  dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1
  dpr = window.top === window.self ? dpr : 1 // 被iframe引用时，禁止缩放
  dpr = 1
  const scale = 1 / dpr
  const resizeEvt =
    'orientationchange' in window ? 'orientationchange' : 'resize'
  docEl.dataset.dpr = dpr
  const metaEl = doc.createElement('meta')
  metaEl.name = 'viewport'
  metaEl.content =
    'initial-scale=' +
    scale +
    ',maximum-scale=' +
    scale +
    ', minimum-scale=' +
    scale
  docEl.firstElementChild.appendChild(metaEl)
  const recalc = function() {
    let width = docEl.clientWidth
    if (width / dpr > 750) {
      width = 750 * dpr
    }
    docEl.style.fontSize = 100 * (width / 750) + 'px'
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
})(document, window)
