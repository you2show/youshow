!function(h,j,b,l,a,d){function k(f,c){d?l(f,c||32):a.push(f,c)}function g(m,f,o,c){return f&&j.getElementById(f)||(c=j.createElement(m||"SCRIPT"),f&&(c.id=f),o&&(c.onload=o),j.head.appendChild(c)),c||{}}d=/p/.test(j.readyState),h.addEventListener("on"+b in h?b:"load",function(){for(d=1;a[0];){k(a.shift(),a.shift())}}),k._=g,h.defer=k,h.deferscript=function(m,f,o,c){k(function(){g("",f,c).src=m},o)}}(this,document,"pageshow",setTimeout,[]),function(G,j){var C="IntersectionObserver",w="src",o="lazied",q="data-",k=q+o,B="load",f="forEach",z="getAttribute",r="setAttribute",E=Function(),D=G.defer||E,x=D._||E;function i(b,a){return[].slice.call((a||j).querySelectorAll(b))}function u(a){return function(h,b,l,d,m,g){D(function(p,e){function c(s){!1!==(d||E).call(s,s)&&((g||["srcset",w,"style"])[f](function(v,n){(n=s[z](q+v))&&s[r](v,n)}),i("SOURCE",s)[f](c),B in s&&s[B]()),s.className+=" "+(l||o)}e=C in G?(p=new G[C](function(n){n[f](function(v,s){v.isIntersecting&&(s=v.target)&&(p.unobserve(s),c(s))})},m)).observe.bind(p):c,i(h||a+"["+q+w+"]:not(["+k+"])")[f](function(n){n[z](k)||(n[r](k,a),e(n))})},b)}}function F(){D(function(b,h,a,g,c){b=i((a="[type=deferjs]")+":not("+(g="[async]")+")").concat(i(a+g)),function d(){if(0!=b){for(g in (a=b.shift()).parentNode.removeChild(a),a.removeAttribute("type"),h=x(a.nodeName),a){"string"==typeof(c=a[g])&&h[g]!=c&&(h[g]=c)}h[w]&&!h.hasAttribute("async")?h.onload=h.onerror=d:D(d,0.1)}}()},4)}F(),G.deferstyle=function(b,d,c,a){D(function(g){(g=x("LINK",d,a)).rel="stylesheet",g.href=b},c)},G.deferimg=u("IMG"),G.deferiframe=u("IFRAME"),D.all=F}(this,document);

/* Smart Active Defense System (Anti-Scam & Counter-Attack Module) */
(function(window, document) {
    'use strict';

    // 1. Anti-Clickjacking / Framebusting Protection
    try {
        if (window.top !== window.self) {
            window.top.location.href = window.self.location.href;
        }
    } catch (e) {
        if (window.top) {
            window.top.location = window.self.location;
        }
    }

    // 2. XSS & Malicious Payload Detector in URL
    function detectXSSAttack() {
        var uri;
        try {
            uri = decodeURIComponent(window.location.search + window.location.hash);
        } catch (e) {
            uri = window.location.search + window.location.hash;
        }
        var suspiciousPatterns = [
            /<script[^>]*>/i,
            /javascript:/i,
            /onerror\s*=/i,
            /onload\s*=/i,
            /eval\s*\(/i,
            /document\.cookie/i,
            /<iframe[^>]*>/i
        ];

        for (var i = 0; i < suspiciousPatterns.length; i++) {
            if (suspiciousPatterns[i].test(uri)) {
                console.warn("[SECURITY DEFENDER] Malicious payload detected and blocked.");
                // Counter-response: Neutralize payload by stripping query params
                window.location.href = window.location.pathname;
                break;
            }
        }
    }
    detectXSSAttack();

    // 3. Dynamic Link Sanitization (Anti-Tabnabbing & Scam Defense)
    function sanitizeLinks() {
        var links = document.querySelectorAll('a[target="_blank"]');
        for (var i = 0; i < links.length; i++) {
            var rel = links[i].getAttribute('rel') || '';
            if (rel.indexOf('noopener') === -1 || rel.indexOf('noreferrer') === -1) {
                links[i].setAttribute('rel', (rel + ' noopener noreferrer').trim());
            }
        }
    }

    // 4. Rate Limiting & Flood Counter-Response
    var clickCount = 0;
    var lastClickTime = Date.now();
    function detectInteractionFlood(e) {
        var now = Date.now();
        if (now - lastClickTime < 200) {
            clickCount++;
        } else {
            clickCount = 0;
        }
        lastClickTime = now;

        if (clickCount > 15) {
            console.warn("[SECURITY DEFENDER] Suspicious high-frequency interaction detected.");
            e.preventDefault();
            e.stopPropagation();
        }
    }

    // Initialize Security Event Listeners
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            sanitizeLinks();
            document.addEventListener('click', detectInteractionFlood, true);
        });
    } else {
        sanitizeLinks();
        document.addEventListener('click', detectInteractionFlood, true);
    }

})(window, document);
