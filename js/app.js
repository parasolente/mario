(function(){
    AudioManager.init();

    document.querySelectorAll('.btn-green').forEach(btn => {
        btn.addEventListener('click', function(){
            const s = new Audio('assets/audio/sfx/click.mp3');
            s.volume = 0.5;
            s.play();
        });
    });
})();