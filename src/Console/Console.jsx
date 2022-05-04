import React, { useRef } from 'react'
import classes from './Console.module.css'

const PointItem = (props) => {
  return <div className={classes.PointItem} style={{border:`3px solid ${props.point.color}`}}><span>X: {props.point.x} | Y: {props.point.y}</span><span className={classes.delete} onClick={() => {
    props.remove(props.point);
  }}>DELETE</span></div>
}

const AddPoint = (props) => {
  const xRef = useRef(null);
  const yRef = useRef(null);
  
  return <div className={classes.PointItem}><span>X: <input className={classes.coordip} ref={xRef}/></span><span>Y: <input className={classes.coordip} ref={yRef}/></span><span className={classes.add} onClick={() => {
    props.add({x: parseFloat(xRef.current.value), y: parseFloat(yRef.current.value), key: Math.random()});
    xRef.current.value = '';
    yRef.current.value = '';
  }}>ADD POINT</span></div>;
}

function Console(props) {
  const nclus = useRef(null)
  return (
    <div className={classes.Console}>
      <div className={classes.Console__header}>
        Points
      </div>
      {props.points.map((point) => <PointItem point={point} remove={props.remove} key={point.key}/>)}
      <AddPoint add={props.add}/>
      <input ref={nclus} placeholder="Number of clusters" className={classes.nclus}/>
      <button onClick={() => 
        {props.clusterize(parseInt(nclus.current.value))}} className={classes.clust}>Clusterize</button>
        <button onClick={props.clr} className={classes.clr}>Clear All Points</button>
    </div>
  )
}

export default Console