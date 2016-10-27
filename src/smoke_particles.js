"use strict";

/**
 * @module SmokeParticles
 * A class for Smoke Engine
 * emulates a smoke trail
 */
module.exports = exports = SmokeParticles;

/**
 * @constructor SmokeParticles
 * Creates a SmokeParticles engine of the specified size
 * @param {uint} size the maximum number of paricles to exits concurrently
 */
function SmokeParticles(maxSize) {
  this.pool = new Float32Array(3 * maxSize);
  this.start = 0;
  this.wrapped = false;
  this.max = maxSize;
}

/**
 * @function emit
 * Adds a new particle at the given position
 * @param {Vector} position
*/
SmokeParticles.prototype.emit = function(position) {
  if(this.start > this.end){
    //wrapped our array
    this.pool[3*this.end] = position.x;
    this.pool[3*this.end+1] = position.y;
    this.pool[3*this.end+2] = 0.0;
    this.end++;
}

/**
 * @function update
 * Updates the particles
 * @param {DOMHighResTimeStamp} elapsedTime
 */
SmokeParticles.prototype.update = function(elapsedTime, callback) {
  var i;
  if(this.wrapped){
    for(i = 0; i <this.end; i++){
        this.pool[3*i +2] += elapsedTime;
    }
    for(i = this.start; i <this.max; i++){
      this.pool[3*i +2] += elapsedTime;
    }
  }else{
    for(i = this.start; i <this.end; i++){
      this.pool[3*i +2] += elapsedTime;
    }
  }
}
/**
 * @function render
 * Renders all bullets in our array.
 * @param {DOMHighResTimeStamp} elapsedTime
 * @param {CanvasRenderingContext2D} ctx
 */
SmokeParticles.prototype.render = function(elapsedTime, ctx) {
  function renderParticle(i){
    var alpha =  1 - (this.pool[3*i+2] / 1000) ;
    ctx.beginPath();
    ctx.arc(
      this.pool[3*i],//X position
      this.pool[3 * i+1], //Y position
      0。01* this.pool[3*i+2], //radius
      0,
      2*MATH.PI
    );
    ctx.fillStyle = 'rgba(60, 60, 60, '+1/(.04+this.pool[3*i+2])+')';
    ctx.fill();
  }
  // Render the bullets as a single path
  var i;
  if(this.wrapped){
    renderParticle.call(i);
    }
    for(i = this.start; i <this.max; i++){
      renderParticle.call(i);
    }
  }else{
    for(i = this.start; i <this.end; i++){
      renderParticle.call(i);
    }
  }
}
