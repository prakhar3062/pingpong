let can =document.getElementById("table");
let draw_=can.getContext('2d');


const ball={
    x:can.width/2,
    y:can.height/2,
    r:10,
    vel_in_x_dir:5,
    vel_in_y_dir:5,
    speed:7,
    color:"Green"
}
const sep={
    x:(can.width-2)/2,
    y:0,
    height:10,
    width:2,
    color:"white"
}
const user={
    x:0,
    y:(can.height-100)/2,
    height:100,
    width:10,
    score:0,
    color:"red"
}
const Cpu_Bar={
    x:can.width-10,
    y:(can.height-100)/2,
    height:100,
    width:10,
    score:0,
    color:"red"
}
function restart(){
    ball.x=can.width/2;
    ball.x=can.height/2;
    ball.speed=-ball.vel_in_x_dir;
    ball.speed=5;
}
function detect_collision(ball,player){
    player.top=player.y;
    player.bottom=player.y+player.height;
    player.left=player.x;
    player.right=player.x+player.width;
    ball.top=ball.y-ball.r;
    ball.bottom=ball.y+ball.r;
    ball.left=ball.x-ball.r;
    ball.right=ball.x+ball.r;
    return player.left<ball.right&&player.top<ball.bottom&&player.bottom>ball.top&&player.right>ball.left;
                                           
                                             
                                             
}
can.addEventListener("mousemove",getMousePointer);
function getMousePointer(evt){
    let rect=can.getBoundingClientRect();
    user.y=evt.clientY-rect.top-user.height;
}
function cpu_movement(){
    if(Cpu_Bar.y<ball.y)
       Cpu_Bar.y+=5;
    else
      Cpu_Bar.y-=5;
}
function drawRectangle(x,y,w,h,color){
    draw_.fillStyle=color;
    draw_.fillRect(x,y,w,h);
}
function drawCircle(x,y,r,color){
   draw_.fillStyle=color;
   draw_.beginPath();
   draw_.arc(x,y,r,0,Math.PI*2,true);
   draw_.closePath();
   draw_.fill();
}
function drawScore(text,x,y){
    draw_.fillStyle="white";
    draw_.font="60px Arial";
    draw_.fillText(text,x,y);
}
function drawSeprator(){
    for(let i=0;i<=can.height;i+=20){
        drawRectangle(sep.x,sep.y+i,sep.width,sep.height,sep.color);
    } // to create gap increase gap by incrementong greater than 20
}
function helper(){
    drawRectangle(0,0,can.width,can.height,"black");
    drawScore(user.score,can.width/4,can.height/5);
    drawScore(Cpu_Bar.score,3*can.width/4,can.height/5);
    drawSeprator();
    drawRectangle(user.x,user.y,user.width,user.height,user.color);
    drawRectangle(Cpu_Bar.x,Cpu_Bar.y,Cpu_Bar.width,Cpu_Bar.height,user.color);
    drawCircle(ball.x,ball.y,ball.r,ball.color);
}
function update(){
    if(ball.x-ball.r<0){
        Cpu_Bar.score++;
        restart();
    }else if(ball.x+ball.r>can.width){
        user.score++;
        restart();
    }
    ball.x+=ball.vel_in_x_dir;
    ball.y+=ball.vel_in_y_dir;
    cpu_movement();
    //top and bottom
    if(ball.y-ball.r<0||ball.y+ball.r>can.width){
        ball.vel_in_y_dir=-ball.vel_in_y_dir;
    }
    let player=(ball.x+ball.r<can.width/2)?user:Cpu_Bar;
    if(detect_collision(ball,player)){
        let collidePoint=(ball.y-(player.y+player.height/2));
        collidePoint=collidePoint/(player.height/2);
        let angleRad=(Math.PI/4)*collidePoint;
        let direction=(ball.x+ball.r<can.width);
        ball.vel_in_x_dir=-ball.vel_in_x_dir;
        ball.vel_in_y_dir=-ball.vel_in_y_dir;
        ball.speed+=1;
    }
}
function call_back(){
  update();  
  helper();
}
let fps=50;
let looper =setInterval(call_back,1000/fps);