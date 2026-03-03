(function(){
  const toast = document.getElementById('toast');
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 3500);
  }

  // Copy snippet buttons
  document.querySelectorAll('[data-copy]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const id = btn.getAttribute('data-copy');
      const el = document.getElementById(id);
      if(!el) return;
      try{
        await navigator.clipboard.writeText(el.innerText);
        showToast('Copied to clipboard.');
      }catch(e){
        showToast('Could not copy — please copy manually.');
      }
    });
  });

  // Demo signup (marketing only)
  const signup = document.getElementById('signup-form');
  if(signup){
    signup.addEventListener('submit', (e)=>{
      e.preventDefault();
      const email = (signup.querySelector('input[name="email"]')||{}).value || '';
      if(!email.includes('@')){
        showToast('Please enter a valid email address.');
        return;
      }
      showToast('Thanks! We’ll be in touch. Redirecting to the app…');
      setTimeout(()=>{ window.location.href = 'https://app.mandalar.app'; }, 1200);
    });
  }
})();


// Mobile drawer navigation
(function () {
      const root = document.documentElement;
      const toggle = document.querySelector('.nav-toggle');
      const drawer = document.querySelector('[data-drawer]');
      const backdrop = document.querySelector('[data-backdrop]');

      if (!toggle || !drawer || !backdrop) return;

      function openNav() {
        root.classList.add('nav-open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close menu');
        backdrop.hidden = false;
        // focus first link for accessibility
        const firstLink = drawer.querySelector('a');
        if (firstLink) firstLink.focus({ preventScroll: true });
      }

      function closeNav() {
        root.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
        backdrop.hidden = true;
        toggle.focus({ preventScroll: true });
      }

      function isOpen() {
        return root.classList.contains('nav-open');
      }

      toggle.addEventListener('click', () => (isOpen() ? closeNav() : openNav()));
      backdrop.addEventListener('click', closeNav);

      // close when clicking a link in the drawer (useful for hash links)
      drawer.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (a && isOpen()) closeNav();
      });

      // ESC to close
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen()) closeNav();
      });

      // safety: if resizing up to desktop, ensure closed
      window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 921px)').matches && isOpen()) closeNav();
      });
    })();
