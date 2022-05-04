import React from 'react'
import classes from './Main.module.css'
import CanvasMain from '../CanvasMain/CanvasMain'
import Console from '../Console/Console'

class Cluster{
  constructor(city, color){
    this.color = color;
    this.cities = [city];
  }
};


function Main() {
  
  const initPoints = [{x: 5, y: 0, color: '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), key: Math.random()}, {x: 0, y: 0, color: '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), key: Math.random()}, {x: 1, y: 2, color: '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'), key: Math.random()}]
  const [points, setPoints] = React.useState(initPoints)
  const removePoint = (point) => {
    setPoints(points => points.filter((item) => item !== point));
  }
  const addPoint = (point) => {
    setPoints(points => {
      return [...points, {...point, color: '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}];
    });
  }
  const clearPoints = () => {
    setPoints([]);
  }
  const clusterize = (numClusters) => {
    if(!numClusters || numClusters <= 0) {
      alert("Invalid number of target clusters!");
    }
    let clusters = [];
    points.forEach(point => {
      clusters.push(new Cluster(point, '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')));
    });
    console.log(numClusters)
    while(clusters.length > numClusters) {
      console.log(clusters);
      let minDist = Infinity;
      let currClosest = [];
      clusters.forEach(cluster => {
        clusters.forEach(cluster2 => {
          if(cluster !== cluster2) {
            let maxD = 0;
            cluster.cities.forEach(city => {
              cluster2.cities.forEach(city2 => {
                maxD = Math.max(maxD, Math.sqrt(Math.pow(city.x - city2.x, 2) + Math.pow(city.y - city2.y, 2)));
              });
            });
            if(maxD < minDist) {
              currClosest = [cluster, cluster2];
              minDist = maxD;
            }
          }
        });
      });
      let keep = currClosest[0];
      let del = currClosest[1];
      keep.cities = [...keep.cities, ...del.cities];
      clusters = clusters.filter((clus) => {
        return clus !== del;
      });
    }
    console.log(clusters);
    let newPoints = [];

    clusters.forEach((cluster, ind) => {
      cluster.cities.forEach((city) => {
        city.color = cluster.color;
        city.ind = ind;
        newPoints.push(city);
      });
      
    });
    setPoints(newPoints);
  }
  return (
    <div className={classes.Main}>
        <Console points={points} remove={removePoint} add={addPoint} clusterize={clusterize} clr={clearPoints}/>
        <div className={classes.divider}></div>
        <CanvasMain points={points}/>
        
    </div>
  )
}

export default Main