(function () {
  'use strict';

  /* ----------------------------------------------------------
     Inline icon registry (stroke icons + filled brand marks)
     ---------------------------------------------------------- */

  var ICONS = {
    home: '<path d="M4 10.4 12 4l8 6.4"/><path d="M6.4 9.4V20h11.2V9.4"/><path d="M9.8 20v-5.1h4.4V20"/>',
    user: '<circle cx="12" cy="8.4" r="3.2"/><path d="M5.6 19.6c.7-3.4 3.2-5.1 6.4-5.1s5.7 1.7 6.4 5.1"/>',
    folder: '<path d="M3.6 7.4h5.9l1.8 2h9.1v8.7a1.5 1.5 0 0 1-1.5 1.5H5.1a1.5 1.5 0 0 1-1.5-1.5z"/><path d="M3.6 9.5V7a1.5 1.5 0 0 1 1.5-1.5h3.1l1.8 2"/>',
    external: '<path d="M7.2 16.8 16.8 7.2"/><path d="M9.2 7.2h7.6v7.6"/>',
    arrow: '<path d="M4.8 12h14.4"/><path d="m13.6 6.4 5.6 5.6-5.6 5.6"/>',
    chevron: '<path d="m6.5 9.2 5.5 5.6 5.5-5.6"/>',
    spark: '<path d="M12 3.8v16.4M3.8 12h16.4" opacity=".7"/><circle cx="12" cy="12" r="2.1"/>',

    bilibili: '<path fill="currentColor" stroke="none" d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373Z"/>',

    github: '<path fill="currentColor" stroke="none" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',

    orcid: '<path fill="currentColor" stroke="none" d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/>',

    steam: '<path fill="currentColor" stroke="none" d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>'
  };

  function iconSvg(name, className) {
    var glyph = ICONS[name] || ICONS.spark;
    return '<svg class="' + className + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      glyph + '</svg>';
  }

  /* ----------------------------------------------------------
     Data fallbacks
     ---------------------------------------------------------- */

  var FALLBACK_NAV = [
    {
      "display": "About",
      "sub": [
        {
          "display": "首页",
          "link": "./"
        },
        {
          "display": "博客",
          "link": "https://blog.gugumur.dev/"
        },
        {
          "display": "关于",
          "link": "./about.html"
        }
      ]
    },
    {
      "display": "Sites",
      "title": "Channels",
      "sub": [
      ]
    }
  ];

  var SOCIALS = [
    { display: '哔哩哔哩', icon: 'bilibili', link: 'https://space.bilibili.com/' },
    { display: 'GitHub', icon: 'github', link: 'https://github.com/GuGuMur' },
    { display: 'ORCID', icon: 'orcid', link: 'https://orcid.org/0009-0008-1297-2460' },
    { display: 'Steam', icon: 'steam', link: 'https://steamcommunity.com/id/GuGuMur/' }
  ];

  function normalizePath(value) {
    try {
      var url = new URL(value, window.location.href);
      var path = url.pathname;
      if (path.endsWith('/')) path += 'index.html';
      return path.replace(/\/{2,}/g, '/');
    } catch (error) {
      return '';
    }
  }

  function safeLink(value) {
    if (typeof value !== 'string' || !value.trim()) return '#';
    try {
      var url = new URL(value, window.location.href);
      if (url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'mailto:') {
        return value.trim();
      }
    } catch (error) {
      /* ignore */
    }
    return '#';
  }

  function isExternal(value) {
    try {
      var url = new URL(value, window.location.href);
      return /^https?:$/.test(url.protocol) && url.origin !== window.location.origin;
    } catch (error) {
      return false;
    }
  }

  /* ----------------------------------------------------------
     Social icons
     ---------------------------------------------------------- */

  function renderSocials() {
    var host = document.getElementById('site-socials');
    if (!host) return;

    var fragment = document.createDocumentFragment();

    SOCIALS.forEach(function (item) {
      var href = safeLink(item.link);
      var link = document.createElement('a');
      link.className = 'social-link social-link--' + item.icon;
      link.href = href;
      link.setAttribute('aria-label', item.display);
      link.setAttribute('data-label', item.display);

      if (isExternal(href)) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }

      link.innerHTML = iconSvg(item.icon, 'social-link__icon');
      fragment.appendChild(link);
    });

    host.replaceChildren(fragment);
  }

  /* ----------------------------------------------------------
     Dropdown navigation
     ---------------------------------------------------------- */

  var list = document.getElementById('site-nav');
  var toggle = document.querySelector('.nav__toggle');

  if (!list) return;

  var closeTimer = null;

  function isDesktop() {
    return window.innerWidth > 960;
  }

  function clearCloseTimer() {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = null;
    }
  }

  function setGroupState(group, open) {
    group.classList.toggle('is-open', open);
    var tab = group.querySelector('.nav__tab');
    if (tab) tab.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function openGroup(group) {
    clearCloseTimer();
    list.querySelectorAll('.nav__group.is-open').forEach(function (other) {
      if (other !== group) setGroupState(other, false);
    });
    setGroupState(group, true);
  }

  function closeGroup(group, restoreFocus) {
    setGroupState(group, false);
    if (restoreFocus) {
      var tab = group.querySelector('.nav__tab');
      if (tab) tab.focus();
    }
  }

  function closeAllGroups() {
    list.querySelectorAll('.nav__group.is-open').forEach(function (group) {
      setGroupState(group, false);
    });
  }

  function scheduleClose(group) {
    clearCloseTimer();
    closeTimer = window.setTimeout(function () {
      var active = document.activeElement;
      if (group.contains(active)) return;
      closeGroup(group, false);
    }, 170);
  }

  function createSubLink(item, currentPath, groupHasCurrent) {
    var href = safeLink(item.link);
    var external = isExternal(href);

    var link = document.createElement('a');
    link.className = 'nav__sublink';
    link.href = href;

    if (external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.classList.add('is-external');
    }

    var iconWrap = document.createElement('span');
    iconWrap.className = 'nav__sublink-icon';
    iconWrap.innerHTML = iconSvg(item.icon, 'nav__sublink-glyph');
    link.appendChild(iconWrap);

    var text = document.createElement('span');
    text.className = 'nav__sublink-text';
    text.textContent = item.display.trim();
    link.appendChild(text);

    var arrow = document.createElement('span');
    arrow.className = 'nav__sublink-arrow';
    arrow.innerHTML = iconSvg(external ? 'external' : 'arrow', 'nav__sublink-arrow-glyph');
    link.appendChild(arrow);

    if (!external && normalizePath(href) === currentPath) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-active');
      groupHasCurrent.value = true;
    }

    return link;
  }

  function createGroup(group, index, currentPath) {
    var tabId = 'nav-tab-' + index;
    var panelId = 'nav-panel-' + index;

    var item = document.createElement('li');
    item.className = 'nav__group';

    var tab = document.createElement('button');
    tab.className = 'nav__tab';
    tab.type = 'button';
    tab.id = tabId;
    tab.setAttribute('aria-expanded', 'false');
    tab.setAttribute('aria-controls', panelId);
    tab.setAttribute('aria-haspopup', 'true');

    var copy = document.createElement('span');
    copy.className = 'nav__tab-copy';

    var title = document.createElement('span');
    title.className = 'nav__tab-title';
    title.textContent = typeof group.title === 'string' ? group.title : '';

    var display = document.createElement('span');
    display.className = 'nav__tab-display';
    display.textContent = group.display.trim();

    copy.appendChild(title);
    copy.appendChild(display);
    tab.appendChild(copy);

    var chevron = document.createElement('span');
    chevron.className = 'nav__chevron';
    chevron.innerHTML = iconSvg('chevron', 'nav__chevron-glyph');
    tab.appendChild(chevron);

    var dropdown = document.createElement('div');
    dropdown.className = 'nav__dropdown';
    dropdown.id = panelId;
    dropdown.setAttribute('aria-labelledby', tabId);

    var panel = document.createElement('div');
    panel.className = 'nav__dropdown-panel';

    var label = document.createElement('p');
    label.className = 'nav__dropdown-label';

    var code = document.createElement('span');
    code.className = 'nav__dropdown-code';
    code.textContent = (typeof group.title === 'string' && group.title ? group.title : 'Menu').toUpperCase();

    var separator = document.createElement('span');
    separator.className = 'nav__dropdown-separator';
    separator.setAttribute('aria-hidden', 'true');
    separator.textContent = '/';

    var zh = document.createElement('span');
    zh.className = 'nav__dropdown-zh';
    zh.textContent = group.display;

    label.appendChild(code);
    label.appendChild(separator);
    label.appendChild(zh);
    panel.appendChild(label);

    var sublist = document.createElement('ul');
    sublist.className = 'nav__sublist';

    var hasCurrent = { value: false };

    group.sub.forEach(function (subItem) {
      if (!subItem || typeof subItem.display !== 'string' || !subItem.display.trim()) return;
      var sublink = createSubLink(subItem, currentPath, hasCurrent);
      var li = document.createElement('li');
      li.className = 'nav__subitem';
      li.appendChild(sublink);
      sublist.appendChild(li);
    });

    if (!sublist.children.length) return null;

    panel.appendChild(sublist);
    dropdown.appendChild(panel);
    item.appendChild(tab);
    item.appendChild(dropdown);

    if (hasCurrent.value) item.classList.add('is-current');

    return item;
  }

  function renderNav(groups) {
    var currentPath = normalizePath(window.location.href);
    var fragment = document.createDocumentFragment();

    groups.forEach(function (group, index) {
      if (!group || typeof group.display !== 'string' || !group.display.trim() || !Array.isArray(group.sub)) return;
      var node = createGroup(group, index, currentPath);
      if (node) fragment.appendChild(node);
    });

    list.replaceChildren(fragment);
  }

  /* ----------------------------------------------------------
     Events
     ---------------------------------------------------------- */

  function closeMobileMenu(restoreFocus) {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开菜单');
    list.classList.remove('is-open');
    closeAllGroups();
    if (restoreFocus) toggle.focus();
  }

  function openMobileMenu() {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '关闭菜单');
    list.classList.add('is-open');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (list.classList.contains('is-open')) {
        closeMobileMenu(false);
      } else {
        openMobileMenu();
      }
    });
  }

  document.addEventListener('pointerdown', function (event) {
    if (!event.target.closest('.nav')) {
      closeAllGroups();
      clearCloseTimer();
    }
  });

  list.addEventListener('mouseover', function (event) {
    if (!isDesktop()) return;
    var group = event.target.closest('.nav__group');
    if (!group) return;
    if (event.relatedTarget && group.contains(event.relatedTarget)) return;
    openGroup(group);
  });

  list.addEventListener('mouseout', function (event) {
    if (!isDesktop()) return;
    var group = event.target.closest('.nav__group');
    if (!group) return;
    if (event.relatedTarget && group.contains(event.relatedTarget)) return;
    scheduleClose(group);
  });

  list.addEventListener('focusout', function (event) {
    if (!isDesktop()) return;
    var group = event.target.closest('.nav__group');
    if (!group) return;
    if (event.relatedTarget && group.contains(event.relatedTarget)) return;
    scheduleClose(group);
  });

  list.addEventListener('click', function (event) {
    var tab = event.target.closest('.nav__tab');
    if (tab) {
      var group = tab.closest('.nav__group');
      if (group.classList.contains('is-open')) {
        closeGroup(group, false);
      } else {
        openGroup(group);
      }
      return;
    }

    var link = event.target.closest('a');
    if (link) {
      clearCloseTimer();
      closeAllGroups();
      if (!isDesktop()) closeMobileMenu(false);
    }
  });

  list.addEventListener('keydown', function (event) {
    var tab = event.target.closest('.nav__tab');

    if (event.key === 'Escape') {
      var openGroupNode = list.querySelector('.nav__group.is-open');
      if (openGroupNode) {
        var openTab = openGroupNode.querySelector('.nav__tab');
        closeGroup(openGroupNode, false);
        if (openTab) openTab.focus();
        event.preventDefault();
      }
      return;
    }

    if (tab && event.key === 'ArrowDown') {
      event.preventDefault();
      var group = tab.closest('.nav__group');
      openGroup(group);
      var firstLink = group.querySelector('.nav__sublink');
      if (firstLink) firstLink.focus();
      return;
    }

    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && event.target.closest('.nav__dropdown')) {
      var links = Array.prototype.slice.call(list.querySelectorAll('.nav__group.is-open .nav__sublink'));
      var index = links.indexOf(event.target.closest('.nav__sublink'));
      if (index !== -1) {
        event.preventDefault();
        var next = event.key === 'ArrowDown' ? index + 1 : index - 1;
        if (next >= links.length) next = 0;
        if (next < 0) next = links.length - 1;
        links[next].focus();
      }
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (list.classList.contains('is-open')) closeMobileMenu(true);
      closeAllGroups();
    }
  });

  document.addEventListener('click', function (event) {
    if (!list.classList.contains('is-open')) return;
    if (event.target.closest('.nav') || event.target.closest('.nav__toggle')) return;
    closeMobileMenu(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) {
      closeMobileMenu(false);
    } else {
      closeAllGroups();
    }
  });

  /* ----------------------------------------------------------
     Boot
     ---------------------------------------------------------- */

  renderSocials();
  renderNav(FALLBACK_NAV);

  fetch('data/nav.json', { cache: 'no-cache' })
    .then(function (response) {
      if (!response.ok) throw new Error('nav.json ' + response.status);
      return response.json();
    })
    .then(function (data) {
      if (!Array.isArray(data)) throw new Error('nav.json must be an array');
      var groups = data.filter(function (group) {
        return group && typeof group.display === 'string' && Array.isArray(group.sub);
      });
      if (groups.length) renderNav(groups);
    })
    .catch(function () {
    });

  var topbar = document.querySelector('.topbar');
  if (topbar && !document.body.classList.contains('page--home')) {
    var onScroll = function () {
      topbar.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
