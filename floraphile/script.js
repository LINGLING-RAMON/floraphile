
  const tabDrinks = document.getElementById('tab-drinks');
  const tabFood = document.getElementById('tab-food');
  const panelDrinks = document.getElementById('panel-drinks');
  const panelFood = document.getElementById('panel-food');
  const navDrinks = document.getElementById('nav-drinks');
  const navFood = document.getElementById('nav-food');

  function showDrinks() {
    tabDrinks.classList.add('active'); tabDrinks.setAttribute('aria-pressed', 'true');
    tabFood.classList.remove('active'); tabFood.setAttribute('aria-pressed', 'false');
    panelDrinks.classList.add('active'); panelFood.classList.remove('active');
    navDrinks.style.display = 'flex'; navFood.style.display = 'none';
  }
  function showFood() {
    tabFood.classList.add('active'); tabFood.setAttribute('aria-pressed', 'true');
    tabDrinks.classList.remove('active'); tabDrinks.setAttribute('aria-pressed', 'false');
    panelFood.classList.add('active'); panelDrinks.classList.remove('active');
    navFood.style.display = 'flex'; navDrinks.style.display = 'none';
  }
  tabDrinks.addEventListener('click', showDrinks);
  tabFood.addEventListener('click', showFood);

  function wireNav(nav, panel) {
    const links = Array.from(nav.querySelectorAll('a'));
    const sections = links.map(a => panel.querySelector(a.getAttribute('href')));
    const setActive = (id) => links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    // While a click-triggered smooth scroll is in flight, the section being
    // left and the section being entered can both briefly count as "on
    // screen" at once. Suppress observer-driven updates for a short window
    // after a click so the clicked pill's highlight doesn't get overridden
    // mid-scroll, then let the observer resume once the scroll has settled.
    let suppressUntil = 0;
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (Date.now() < suppressUntil) return;
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      }, { rootMargin: '-130px 0px -60% 0px', threshold: 0 });
      sections.forEach(s => s && io.observe(s));
    }
    links.forEach(a => a.addEventListener('click', () => {
      setActive(a.getAttribute('href').slice(1));
      suppressUntil = Date.now() + 700;
    }));
  }
  wireNav(navDrinks, panelDrinks);
  wireNav(navFood, panelFood);