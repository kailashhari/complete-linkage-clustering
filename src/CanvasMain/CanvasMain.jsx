import React, {useRef, useEffect} from 'react'
import classes from './CanvasMain.module.css'



function CanvasMain(props) {
  const canvasRef = useRef(null);
  const canvasHolderRef = useRef(null);
  const plotPoints = (points) => {
    const ctx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    if(points.length <= 0) {
      ctx.fillStyle = "#FFFFFF";
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      ctx.font = "18px Arial";
      ctx.fillText("Add Points to continue", canvas.width/2 - 100, canvas.height/2);
      return;
    }
    let max = 0;
    points.forEach(point => {
      max = Math.max(max, point.y);
      max = Math.max(max, point.x);
    });
    let unit = canvas.width /(2*max * 1.1);
    if(unit * max > canvas.height/2) {
      unit = canvas.height / (2*max*1.1);
    }
    const jmp = Math.ceil(max/10);
    ctx.lineWidth = 0.2;
    console.log(jmp);
    ctx.font = "12px Arial";
    for(let i = 0;i  <= canvas.width/2;i+=jmp) {
      
      ctx.beginPath();
      ctx.moveTo(canvas.width/2 + i  * unit, 0);
      ctx.lineTo(canvas.width/2 + i  * unit, canvas.height);
      ctx.stroke();
      ctx.fillText(`${i}`, canvas.width/2 + i  * unit - 9, canvas.height/2-3);
      ctx.fillText(`${-i}`, canvas.width/2 - i  * unit - 9, canvas.height/2-3);
      ctx.beginPath();
      ctx.moveTo(canvas.width/2 - i  * unit, 0);
      ctx.lineTo(canvas.width/2 - i  * unit, canvas.height);
      ctx.stroke();
    }
    for(let i = jmp;i  <= canvas.height/2;i+=jmp) {
      
      ctx.beginPath();
      ctx.moveTo(0, canvas.height/2 + i  * unit);
      ctx.lineTo(canvas.width, canvas.height/2 + i  * unit);
      ctx.stroke();
      ctx.fillText(`${-i}`, canvas.width/2 - 10, canvas.height/2 + i  * unit);
      ctx.fillText(`${i}`, canvas.width/2 - 10, canvas.height/2 - i  * unit);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height/2 - i  * unit);
      ctx.lineTo(canvas.width, canvas.height/2 - i  * unit);
      ctx.stroke();
    }
    // unit * max * 110 = canvas width
    ctx.fillStyle = "#000000";
    for(let i = 0; i < points.length; i++) {
      ctx.beginPath();
      ctx.fillStyle = points[i].color;
      ctx.arc(canvas.width/2 + points[i].x*unit, canvas.height/2-points[i].y*unit, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvasHolderRef.current.clientWidth;
    canvas.height = canvasHolderRef.current.clientHeight;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    plotPoints(props.points);
  }, [props.points]);
  return (
    <div className={classes.CanvasMain} ref={canvasHolderRef}>
        <canvas className={classes.canvas} ref={canvasRef}/>
    </div>
  )
}

export default CanvasMain