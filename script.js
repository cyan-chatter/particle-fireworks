const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
console.log(ctx);  
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const colours = {
    0: 'white', 1: 'blue', 2: 'lightgreen', 3: 'cyan', 4: 'lightblue', 5: 'black', 6: 'pink', 7: 'voilet', 8: 'red', 9: 'golden', 10: 'white'
}

const mouse = {
    x:undefined,
    y:undefined
}
 
let H=0,S=100,L=50;

class Particle{
    constructor(createParticleWithClick=false, fill='cyan'){
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.createParticleWithClick = createParticleWithClick;
        this.size = Math.random()*5 + 3;
        this.vx = Math.random()*4 - 2;
        this.vy = Math.random()*4 - 2;
        this.fill = fill
        if(createParticleWithClick){
            this.x = mouse.x;
            this.y = mouse.y;
        }
    }
    update(){
        this.x += this.vx;
        this.y += this.vy;
        if(this.x >= canvas.width || this.x <= 0){
            this.vx = -this.vx;
            this.x += this.vx*5;
        }
        if(this.y >= canvas.height || this.y <= 0){
            this.vy = -this.vy;
            this.y += this.vy*5;
        }
        if(this.size > 0.05) this.size -= 0.1; 
    }
    draw(sizeinc = 0,size=this.size, fill=this.fill){
        if(size <= 0) return;
        if(size + sizeinc <= 0) sizeinc = 0;
        ctx.fillStyle = fill;
        ctx.beginPath();
        let posx = this.x; let posy = this.y; 
        ctx.arc(posx,posy,size+sizeinc,0,Math.PI*2);
        ctx.fill();           
    }
    getSize(){
        return this.size;
    }
}

const particles = [];

const init = (createParticleWithClick=false,num=100) => {
    for(let i=0; i<num; ++i){
        let color = `hsl(${H},${S}%,${L}%)`;
        H += 0.1;
        particles.push(new Particle(createParticleWithClick,color));
    }    
}

const generate = () => {    
    for(let i=0; i<particles.length; ++i){
        particles[i].update();
        particles[i].draw();
        if(particles[i].getSize() <= 0.05){
            particles.splice(i,1);
            --i;
        }
    }
}

let dragging = false;
canvas.addEventListener('mousedown', () => {
    dragging = true;
})

canvas.addEventListener('mouseup', () => {
    dragging = false;
})

canvas.addEventListener('mousemove', (event) => {
    if(dragging){
        mouse.x = event.x; mouse.y = event.y;
        init(true,10);
    } 
})

const animate = () => {
    //ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    generate();
    requestAnimationFrame(animate);
}
animate();
