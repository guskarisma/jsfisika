const canvas=document.querySelector("#canvas");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
const c=canvas.getContext("2d");

class Graph{
	constructor(){
		this.w=0;
		this.h=0;
		this.sv=canvas.height-50;
		this.sh=50
		this.spacing=15;
	}

	drawAxis(c){
		let sv=this.sv;
		let sh=this.sh;
		c.fontSize=12;
		//draw y axis		
		for(let i=0;i<=this.h;i+=1){
			c.beginPath();
			c.moveTo(sh,sv);
			c.lineTo(sh-5,sv);
			c.stroke();
			c.fillText(i,sh-25,sv);
			c.moveTo(sh,sv);
			sv-=this.spacing;
			c.lineTo(sh,sv);
			c.stroke();
		}

		//draw x axis
		sv=this.sv;
		for(let i=0;i<=this.w;i+=1){
			c.beginPath();
			c.moveTo(sh,sv);
			c.lineTo(sh,sv+5);
			c.stroke();
			i!=0?c.fillText(i,sh-3,sv+15):c.fillText("",sh-6,sv+15);
			c.moveTo(sh,sv);
			sh+=this.spacing;
			c.lineTo(sh,sv);
			c.stroke();
		}
	}

	paint(c,fx,...x){
		this.drawAxis(c);
		let coordinates=[];
		x.forEach((x)=>{
			coordinates.push([x,fx(x)]);
		});
		
		//calculating max values
		let xs=coordinates.map(([x,y])=>x);
		let ys=coordinates.map(([x,y])=>y);
		this.h=Math.max(...ys);
		this.w=Math.max(...xs);

		//draw the axis
		this.drawAxis(c);

		//draw the points and lines
		if(coordinates.length>0){
			c.save();
			c.fillStyle="red";
			c.strokeStyle="red";
			for(let i=0;i<coordinates.length;i++){
				let x=coordinates[i][0]*this.spacing+50;
				let y=canvas.height-(50+coordinates[i][1]*this.spacing);
				if(i!=0){
					c.lineTo(x,y);
					c.stroke();
				}
				c.beginPath();
				c.arc(x,y,2,0,2*Math.PI);
				c.moveTo(x,y);
				c.fill();
			}
			c.restore();
		}
	}
}

let graph= new Graph();
graph.paint(c,function(x){return Math.pow(x,2)-2*x+1;},1,2,3,4,5,6,7,8);