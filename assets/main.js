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
