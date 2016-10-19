module.exports = exports = BulletPool;

function BulletPool(maxSize){
  //32 array memory buffer
  this.pool = new Float32Array(4 * maxSize);
  this.end = 0;
  this.max = maxSize;
}

BulletPool.prototype.add = function(position, velocity){
  if(this.end < this.max){
    this.pool[4 * this.end] = position.x;
    this.pool[4 * this.end + 1] = position.y;
    this.pool[4 * this.end + 2] = velocity.x;
    this.pool[4 * this.end + 3] = velocity.y;
    this.end ++;
  }
}
BulletPool.prototype.update = function(elapsedTime, callback){
  //Check for collisions
  for(var i =0; i< this.end; i++){
    if(callback({x:this.pool[4*i], y:this.pool[4*i+1]})){
      this.pool[4*i] = this.pool[4*(this.end-1)];
      this.pool[4*i] = this.pool[4*(this.end-1)+1];
      this.pool[4*i] = this.pool[4*(this.end-1)+2];
      this.pool[4*i] = this.pool[4*(this.end-1)+3];
      this.end --;
      i --;
    }
  }
}
BulletPool.prototype.render = function(elapsedTime, ctx){
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = 'Black';
  for(var i =0; i< this.end; i++){
    ctx.moveTo(this.pool[4*i], this.pool[4*i+1]);
    ctx.arc(this.pool[4*i],this.pool[4*i+1],2,0,2*Math.PI);
  }
  ctx.fill();
  ctx.restore();
}
