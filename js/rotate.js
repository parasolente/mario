(function(){
    const screen = document.getElementById('rotateScreen');
    function check(){
        if(window.innerWidth > window.innerHeight) screen.classList.remove('show');
        else screen.classList.add('show');
    }
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', () => setTimeout(check, 200));
    check();
})();