const canvas=document.querySelector("#canvas");
const c=canvas.getContext("2d");

let balls=[];

const mouse={
	isdragging:false,
	x:0,
	y:0
}

function init(){
	canvas.width=800;
	canvas.height=400;
	canvas.addEventListener("mousemove",function(event){
		if(mouse.isdragging){
			if(balls.length>0){					
				balls.forEach(
					(ball)=>{
						let dx=Math.abs(event.clientX-ball.x);
						let dy=Math.abs(event.clientY-ball.y);
						if(Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))<=ball.r){	
							ball.dragged=true;					
							ball.drag(event);
						}
					}
				);
			}
		}
	});
	canvas.addEventListener("mousedown",function(event){
		event.preventDefault();
		mouse.x=event.clientX;
		mouse.y=event.clientY;
		mouse.isdragging=true;
	});
	canvas.addEventListener("mouseup",function(event){
		event.preventDefault();
		mouse.isdragging=false;
		balls.forEach((ball)=>ball.dragged=false);
	});
}


class Ball{
	constructor(x,y){
		this.x=x;
		this.y=y;
		this.r=20;
		this.dy=10;
		this.dx=0;
		this.vy=0.5;
		this.dragged=false;
	}

	drag(event){
		if(mouse.isdragging&&this.dragged){
			let dx=event.clientX-mouse.x;
			mouse.x=event.clientX;
			let dy=event.clientY-mouse.y;
			mouse.y=event.clientY;
			this.move(dx,dy);
		}
	}

	draw(c){
		c.save();
		c.fillStyle="red";
		c.strokeStyle="black";
		c.lineWidth="2";
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,2*Math.PI);
		c.fill();
		c.stroke();
		c.restore();
	}

	move(dx,dy){
		this.x+=dx;
		this.y+=dy;
		if(this.y>=canvas.height-this.r){
			this.y=canvas.height-this.r;
		}
	}

	fall(){
		if(!this.dragged){
			this.dy+=this.vy;
			if(Math.round(this.y)===canvas.height-this.r){
				this.dy-=1;
				this.dy=-this.dy;
			}
			if(Math.round(this.dy)<0.5&&Math.round(this.dy)>0){
				this.dy=0;
				this.y=canvas.height-this.r;
			}
			this.move(this.dx,this.dy);
		}
	}
}

function updateFrame(){
	c.clearRect(0,0,canvas.width,canvas.height);
	balls.forEach((ball)=>{
		ball.fall();
		ball.draw(c);
		});
	window.requestAnimationFrame(updateFrame);
}

//-----------------------------------------//

init();
balls.push(new Ball(100,100));
balls.push(new Ball(200,300));
balls.push(new Ball(300,100));
updateFrame();
