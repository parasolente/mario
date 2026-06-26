const Navigation = {
    currentWorld: 1,
    totalWorlds: 4,

    init(){
        this.showWorld(1);
        this.setupButtons();
        this.setupCameraButtons();
        this.setupDownloads();
    },

    showWorld(num){
        document.querySelectorAll('.world').forEach(w => w.classList.remove('active'));
        const world = document.querySelector(`.world[data-world="${num}"]`);
        if(world) world.classList.add('active');
        this.currentWorld = num;
        AudioManager.loadWorldMusic();
    },

    advance(){
        const next = this.currentWorld + 1;
        if(next > this.totalWorlds){
            this.showGallery();
        } else {
            this.showWorld(next);
        }
    },

    showGallery(){
        document.getElementById('galleryScreen').classList.add('show');
        for(let i = 1; i <= 4; i++){
            const thumb = document.getElementById(`thumb${i}`);
            if(CameraManager.photos[i]){
                thumb.style.backgroundImage = `url(${CameraManager.photos[i]})`;
                thumb.style.backgroundSize = 'cover';
                thumb.style.backgroundPosition = 'center';
            }
        }
    },

    setupButtons(){
        document.querySelectorAll('.btn-green').forEach(btn => {
            btn.addEventListener('click', function(e){
                const s = new Audio('assets/audio/sfx/click.mp3');
                s.volume = 0.5; s.play();
                const world = this.closest('.world');
                if(!world) return;
                const num = parseInt(world.dataset.world);
                CameraManager.open(num);
            });
        });
    },

    setupCameraButtons(){
        document.getElementById('cameraShoot').addEventListener('click', () => CameraManager.capture());
        document.getElementById('cameraBack').addEventListener('click', () => {
            CameraManager.close();
            Navigation.showWorld(Navigation.currentWorld);
        });
        document.getElementById('cameraClose').addEventListener('click', () => {
            CameraManager.close();
            Navigation.showWorld(Navigation.currentWorld);
        });
    },

    setupDownloads(){
        document.querySelectorAll('.gallery-download').forEach(btn => {
            btn.addEventListener('click', function(){
                const m = parseInt(this.dataset.mundo);
                CameraManager.download(m);
            });
        });
    }
};

function scalePage(){
    const wrapper = document.querySelector('.page-wrapper');
    if(!wrapper) return;
    const sx = window.innerWidth / 1280;
    const sy = window.innerHeight / 720;
    const s = Math.min(1, Math.max(sx, sy));
    wrapper.style.transform = `translate(-50%,-50%) scale(${s})`;
}
scalePage();
window.addEventListener('resize', scalePage);
document.addEventListener('DOMContentLoaded', () => Navigation.init());