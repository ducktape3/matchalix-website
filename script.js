// Menu tabs: click or arrow keys switch between matcha, coffee and chocolate.
const tabs = [...document.querySelectorAll('[role="tab"]')];

function select(tab, focus) {
  tabs.forEach((t) => {
    const on = t === tab;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
  });
  if (focus) tab.focus();
}

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => select(tab));
  tab.addEventListener('keydown', (e) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (step) select(tabs[(i + step + tabs.length) % tabs.length], true);
    else if (e.key === 'Home') select(tabs[0], true);
    else if (e.key === 'End') select(tabs[tabs.length - 1], true);
    else return;
    e.preventDefault();
  });
});
