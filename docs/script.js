/*
 *Animates connected nodes about a grid
 *-------------------------------------  
 *@date:      19th April, 2020  
 *@email:     redutron@protonmail.com
 */  
//set up the gridworm
class GridWorm
{ 
    constructor(point,interval,pointsList,screenWidth,screenHeight)
    {      
        this.radius  = 2;     
        this.xCoord  = point.x; 
        this.yCoord  = point.y; 
        this.interval= interval;
        this.Opacity = this.getRandomNumber(0, 100) / 100;
        this.nOpacity = this.getRandomNumber(0, 100) / 100;
        // this.color = this.getColor(this.Opacity,true);//get random color object
        this.color = this.getColor(this.Opacity,true);//get random color object
        this.mainColor = this.color.color;//color of the head and body of the girdworm
        this.mainColorIndex = this.color.index;
        this.nColor = this.getColor(this.nOpacity,true);//get another random color object
        this.arrowHeadColor = this.nColor.color;//color of the arrrow points at the head of the gridworm
        this.arrowHeadColorIndex = this.nColor.index; 
        this.pointsList = pointsList;  
        this.screenWidth = screenWidth; 
        this.screenHeight= screenHeight; 
        this.speed   = 5;//the magnitude of the velocity
        this.velocity= this.getVelocity(); 
        this.junctionMemory = [{point:point,velocity:this.velocity}];//memory of each junction visited(helps to construct the worm)
        //the maximum number of junctions a gridworm can keep in memory(this determines how long the gridworm will be)
        this.junctionMemoryLength = 6; 
    } 
    getColor(opacity,isRandom = true,index = 0) 
    { 
        if(opacity < 0 || opacity > 1 || opacity === null || isNaN(opacity))//if opacity is incorrect
        {
            const opacity = 1; 
        }
        // rgb(96, 125, 139)
        // rgb(158, 158, 158)
        // rgb(255, 87, 34)
        // rgb(255, 152, 0)
        // rgb(255, 192, 8)
        // rgb(255, 235, 59)
        // rgb(205, 220, 57)
        // rgb(139, 195, 75)
        // rgb(76, 175, 80)
        // rgb(0, 150, 136)
        // rgb(0, 188, 212)
        // rgb(1, 169, 244)
        // rgb(33, 150, 243)
        // rgb(64, 80, 181)
        // rgb(103, 58, 183)
        // rgb(156, 39, 176)
        // rgb(233, 30, 99)
        // rgb(244, 67, 54)
        //
        // rgb(120, 144, 156)
        // rgb(189, 189, 189)
        // rgb(244, 81, 30)
        // rgb(255, 112, 67)
        // rgb(255, 202, 39)
        // rgb(255, 238, 88)
        // rgb(156, 204, 101)
        // rgb(102, 187, 106)
        // rgb(39, 166, 154)
        // rgb(39, 198, 218)
        // rgb(43, 182, 246)
        // rgb(66, 165, 245)
        // rgb(92, 107, 192)
        // rgb(171, 71, 188)
        // rgb(236, 64, 122)
        // rgb(84, 110, 122)
        // rgb(117, 117, 117)
        // rgb(255, 179, 0)
        // rgb(253, 216, 54)
        // rgb(192, 202, 51)
        // rgb(124, 179, 66)
        // rgb(68, 160, 71)
        // rgb(0, 137, 123)
        // rgb(4, 155, 229)
        // rgb(30, 136, 229)
        // rgb(57, 73, 171)
        // rgb(94, 53, 177)
        // rgb(142, 36, 170)
        // rgb(216, 27, 96)
        // rgb(229, 56, 53)
        const colors = [
            `rgba(96, 125, 139, ${opacity})`,
            `rgba(158, 158, 158, ${opacity})`,
            `rgba(255, 87, 34, ${opacity})`,
            `rgba(255, 152, 0, ${opacity})`,
            `rgba(255, 192, 8, ${opacity})`,
            `rgba(255, 235, 59, ${opacity})`,
            `rgba(205, 220, 57, ${opacity})`,
            `rgba(139, 195, 75, ${opacity})`,
            `rgba(76, 175, 80, ${opacity})`,
            `rgba(0, 150, 136, ${opacity})`,
            `rgba(0, 188, 212, ${opacity})`,
            `rgba(1, 169, 244, ${opacity})`,
            `rgba(33, 150, 243, ${opacity})`,
            `rgba(64, 80, 181, ${opacity})`,
            `rgba(103, 58, 183, ${opacity})`,
            `rgba(156, 39, 176, ${opacity})`,
            `rgba(233, 30, 99, ${opacity})`,
            `rgba(244, 67, 54, ${opacity})`,
            `rgba(120, 144, 156, ${opacity})`,
            `rgba(189, 189, 189, ${opacity})`,
            `rgba(244, 81, 30, ${opacity})`,
            `rgba(255, 112, 67, ${opacity})`,
            `rgba(255, 202, 39, ${opacity})`,
            `rgba(255, 238, 88, ${opacity})`,
            `rgba(156, 204, 101, ${opacity})`,
            `rgba(102, 187, 106, ${opacity})`,
            `rgba(39, 166, 154, ${opacity})`,
            `rgba(39, 198, 218, ${opacity})`,
            `rgba(43, 182, 246, ${opacity})`,
            `rgba(66, 165, 245, ${opacity})`,
            `rgba(92, 107, 192, ${opacity})`,
            `rgba(171, 71, 188, ${opacity})`,
            `rgba(236, 64, 122, ${opacity})`,
            `rgba(84, 110, 122, ${opacity})`,
            `rgba(117, 117, 117, ${opacity})`,
            `rgba(255, 179, 0, ${opacity})`,
            `rgba(253, 216, 54, ${opacity})`,
            `rgba(192, 202, 51, ${opacity})`,
            `rgba(124, 179, 66, ${opacity})`,
            `rgba(68, 160, 71, ${opacity})`,
            `rgba(0, 137, 123, ${opacity})`,
            `rgba(4, 155, 229, ${opacity})`,
            `rgba(30, 136, 229, ${opacity})`,
            `rgba(57, 73, 171, ${opacity})`,
            `rgba(94, 53, 177, ${opacity})`,
            `rgba(142, 36, 170, ${opacity})`,
            `rgba(216, 27, 96, ${opacity})`,
            `rgba(229, 56, 53, ${opacity})`,
        ]
        if(isRandom)
        {
            const index = Math.floor(this.getRandomNumber(0,colors.length-1)); 
            const color = colors[index];
            return {color:color,index:index}; 
        }
        else//if specific
        {
            if(index >=0 && index < colors.length)
            {
                return colors[index];
            } 
            return colors[0];
        } 
    }
    getVelocity() 
    {
        let x;
        let y;
        //flip a coin to decide if gridworm moves vertically or horizontally
        if( Math.random() > 0.5)//if gridworm moves vertically
        {
            x = 0;//no horizontal movement
            y = Math.random() > 0.5? -this.speed: this.speed;//flip a coin to decide if gridworm moves upwards or downwards
        }
        else//if gridworm moves horizontally
        {
            x = Math.random() > 0.5? -this.speed: this.speed;//flip a coin to decide if gridworm moves left or right
            y = 0;//no vertical movement
        } 
        return {x:x, y:y};
    }
    /**
    * Returns a random number between min (inclusive) and max (exclusive)
    * @param  {number} min The lesser of the two numbers. 
    * @param  {number} max The greater of the two numbers.  
    * @return {number} A random number between min (inclusive) and max (exclusive)
    */
    getRandomNumber(min, max) 
    {
        return Math.random() * (max - min) + min;
    }
    drawCircle(x,y,circleradius,ctx,colorIndex) 
    {
        for(let i = 0; i < 2; i++)
        {
            let color   = '';  
            let radius = 0; 
            switch(i)//create three circles with same center
            {
                case 0: 
                    radius  =circleradius;//smallest circle
                    color   = this.getColor(1,false,colorIndex); 
                    break; 
                case 1: 
                    radius  =circleradius *   2;//bigger circle 
                    color   = this.getColor(0.5,false,colorIndex);             
                    break; 
                case 2: 
                    radius  =circleradius *   6;//biggest circle 
                    color   = this.getColor(0.2,false,colorIndex); 
                    break; 
            }
            //draw the node
            ctx.beginPath(); 
            ctx.arc(x,y,radius,0,2*Math.PI);
            ctx.fillStyle = color; 
            ctx.fill(); 
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    }
    drawArrowHead(x,y,circleradius,ctx,colorIndex) 
    { 
        const points = [];  
        if(this.velocity.x === 0)//if gridworm is moving vertically
        {
            if(this.velocity.y > 0)//if gridworm is moving down
            {
                points.push({x:x+this.interval/3,y:y});//point to the right
                points.push({x:x-this.interval/3,y:y});//point to the left 
                points.push({x:x,y:y+this.interval/3});//point below 
            }
            else//if gridworm is moving up
            {
                points.push({x:x+this.interval/3,y:y});//point to the right
                points.push({x:x-this.interval/3,y:y});//point to the left
                points.push({x:x,y:y-this.interval/3});//point above  
            }
        }
        else//if gridworm is moving horizontally
        {
            if(this.velocity.x > 0)//if gridworm is moving right
            {
                points.push({x:x+this.interval/3,y:y});//point to the right 
                points.push({x:x,y:y-this.interval/3});//point above
                points.push({x:x,y:y+this.interval/3});//point below 
            }
            else//if gridworm is moving left
            {     
                points.push({x:x-this.interval/3,y:y});//point to the left
                points.push({x:x,y:y-this.interval/3});//point above
                points.push({x:x,y:y+this.interval/3});//point below 
            }
        }
        //draw a circle about the points that make the arrow head
        for(let i = 0; i < points.length;i++)
        {
            const point = points[i];
            this.drawCircle(point.x,point.y,circleradius/2,ctx,colorIndex); 
        } 
        this.drawTriangle(points[0],points[1],points[2],ctx);//draw the arrow head 
    }
    drawTriangle(point1,point2,point3,ctx)
    {
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.lineTo(point3.x, point3.y);  
        ctx.fillStyle = 'rgba(0,0,0,0.0)';//transparent black  
        ctx.fill();   
    }
    draw(ctx)
    {    
        //draw the head of the gridworm 
        this.drawCircle(this.xCoord,this.yCoord,this.radius/2,ctx,this.mainColorIndex); 
        // this.drawArrowHead(this.xCoord,this.yCoord,this.radius/2,ctx,this.arrowHeadColorIndex); 
        //draw circles and squares at every visited junctions in the gridworm's memory(not RAM)
        for(let i = 0; i < this.junctionMemory.length; i++)
        {   
            const junction = this.junctionMemory[this.junctionMemory.length -(i+1)];
            //draw a circle at each junction point
            this.drawCircle(junction.point.x, junction.point.y,this.radius/2,ctx,this.mainColorIndex);  
            //draw painted squares at every junction point
            ctx.fillStyle   = this.getColor(0.2,false,this.mainColorIndex); 
            ctx.fillRect(junction.point.x,junction.point.y,this.interval,this.interval);
            
        } 
        //draw the line connecting head to body
        // ctx.strokeStyle = 'rgba(102,102,102, 0.3)';
        ctx.strokeSttyle = this.getColor(1,false,this.mainColorIndex);
        ctx.lineWidth = this.radius; 
        ctx.beginPath(); 
        ctx.moveTo(this.xCoord,this.yCoord); 
        //draw a line to link all the visited junctions in the gridworm's memory(not RAM)
        for(let i = 0; i < this.junctionMemory.length; i++)
        {   //starting from the most recent to the least recent(LIFO)[NB: more like a stack data structure]
            const junction = this.junctionMemory[this.junctionMemory.length -(i+1)]; 
            ctx.lineTo(junction.point.x, junction.point.y);   
        } 
        ctx.stroke(); 
        ctx.closePath(); 
    } 
    update(deltaTime)
    {       
        this.junctionMemoryLength = this.junctionMemoryLength < 1? 1: this.junctionMemoryLength; 
        //keep the gridworm moving in its current direction  
        this.xCoord += this.velocity.x;//if gridworm is going left or right, keep it going
        this.yCoord += this.velocity.y;//if gridworm is going up or down, keep it going   
        if(this.xCoord <= this.interval)//if gridworm reaches the leftmost point 
        {
            this.xCoord = this.interval;
            this.velocity.x  = -this.velocity.x;//move right 
            this.xCoord += this.velocity.x * 3;//nudge it a bit away from the edge
        }
        if(this.xCoord >= this.screenWidth - this.interval)//if gridworm reaches the rightmost point
        {
            this.xCoord = this.junctionMemory[this.junctionMemory.length-1].point.x; 
            this.velocity.x  = -this.velocity.x;//move left 
            this.xCoord += this.velocity.x * 3;//nudge it a bit away from the edge
        }
        if(this.yCoord <= this.interval)//if gridworm reaches the topmost most point
        {
            this.yCoord  = this.interval; 
            this.velocity.y  = -this.velocity.y; //move down
            this.yCoord  += this.velocity.y * 3;//nudge it a bit away from the edge
        }
        if(this.yCoord >= this.screenHeight - this.interval)//if gridworm reaches the lowest point) 
        {
            this.yCoord  = this.junctionMemory[this.junctionMemory.length-1].point.y; 
            this.velocity.y  = -this.velocity.y;//move up
            this.yCoord  += this.velocity.y * 3;//nudge it a bit away from the edge
        }
        const currentCoord    = {x:this.xCoord,y:this.yCoord}; 
        const latestJunction  = this.getJunctionReached(currentCoord); 
        if(latestJunction !== currentCoord)
        {   
            const originalVelocity = this.velocity; 
            const newVelocity = this.getVelocity();//flip a coin to decide to move up and down or right and left  
            if(originalVelocity.y === 0 )//if gridworm is moving horizontally
            {
                this.velocity = newVelocity;
                if(newVelocity.y === 0 && newVelocity.x === -originalVelocity.x )//if it continues the horizontal movement in the opposite direction
                {
                    //don't add the new junction to the memory queue
                }
                else 
                {
                    const memory = {point:latestJunction,velocity:this.velocity}; 
                    if(!this.isInMemory(memory))
                    {
                        this.junctionMemory.push(memory);//add new memory to the queue
                    }
                    //this.junctionMemory.push({point:latestJunction,velocity:this.velocity});//add new memory to the queue
                }
                //nudge it a bit away from the junction
                this.xCoord += this.velocity.x * 3; //not complete yet. Don't make it too much or too little.  
            }
            else //if gridworm is moving vertically 
            {
                this.velocity = newVelocity;
                if(newVelocity.x === 0 && newVelocity.y === -originalVelocity.y )//if it continues the verticalal movement in the opposite direction
                {
                    //don't add the new junction to the memory queue
                }
                else 
                {
                    const memory = {point:latestJunction,velocity:this.velocity}; 
                    if(!this.isInMemory(memory))
                    {
                        this.junctionMemory.push(memory);//add new memory to the queue
                    } 
                }
                //nudge it a bit away from the junction
                this.yCoord += this.velocity.y * 3; //not complete yet. Don't make it too much or too little. 
            } 
        }
        if(this.junctionMemory.length > this.junctionMemoryLength)//if memory is too long
        {
            this.junctionMemory.shift();//remove the first memory
        } 
    }  
    isInMemory(memory)//check if a junction is in memory
    { 
        this.junctionMemory.some(function(mem)
        {
            if(mem.point === memory.point)
            { 
                return true;//junction is in memory
            }
            return mem.point === memory.point; 
        }); 
        return false;//junction is NOT in memory
    }
    getJunctionReached(currentCoord)
    {
        for(let i = 0; i < this.pointsList.length; i++)
        {
            const point = this.pointsList[i];
            //if point(junction) is too far away, ignore it 
            if(Math.abs(currentCoord.x - point.x) > (2 * this.interval) || Math.abs(currentCoord.y - point.y) > (2 *this.interval) )
            {
                continue; 
            }
            const distance = this.getDistance(currentCoord,point);  
            if(distance <= (this.radius))//if gridworm head is close enough to a junction
            {  
                return point;  
            }
        } 
        return currentCoord;  
    }     
    getDistance(p1,p2)//the distance between two points, p1 and p2
    {
        const dx = p1.x - p2.x; 
        const dy = p1.y - p2.y; 
        const distance = Math.sqrt(dx*dx + dy*dy);
        return distance; 
    }
    
    
    /**
    * Let node correspond to window resizing.
    * @param  {number} screenHeight The height of the screen. 
    * @param  {number} screenWidth  The width of the screen.  
    * @param  {number} dy           The percentage change in browser window height 
    * @param  {number} dx           The percentage change in browser window width  .  
    */
    refreshScreenSize(screenHeight,screenWidth,dx,dy,points)
    {     
        
    }   
}

//sets up and controls all points and gridworms on the canvas 
class Painter
{
    constructor(screenWidth,screenHeight)
    {      
        this.screenWidth    = screenWidth;
        this.screenHeight   = screenHeight;   
        // this.interval       = 40;//interval from one point to the next 
        this.interval = 40
        this.points         = this.createPoints(); //coordinates of the vertices of all squares when the canvas is partitioned
        // this.numWorms       = this.getRandomNumber(1, 10);
        this.gridWorms      = this.createGridWorms(this.getRandomNumber(1, 10));
        this.opacity        = this.getRandomNumber(1, 100);
        this.color          = this.getRandomColor(this.opacity);
        document.addEventListener('click',(event)=>//when user clicks on the canvas
        {   
            // this.numWorms = this.getRandomNumber(1, 10);
            this.points     = this.createPoints();
            this.opacity    = this.getRandomNumber(1, 100);
            this.gridWorms  = this.createGridWorms(this.getRandomNumber(1, 10));//spawn new gridworms
            this.color          = this.getRandomColor(this.opacity);
        });
    } 
    createGridWorms(numOfGridWorms = 10)
    {
        const gridworms = []
        for(let i = 0; i < numOfGridWorms; i++)
        { 
            const point = this.points[Math.floor(this.getRandomNumber(0,this.points.length-1))];//randomly select a point
            gridworms.push(new GridWorm(point,this.interval,this.points,this.screenWidth,this.screenHeight));
        }
        return gridworms; 
    }
    createPoints()//divide the canvas into squares 
    {
        const points = []
        const interval = this.interval;//interval from one point to the next 
        for(let y = interval; y < this.screenHeight; y+=interval)//get all points in the grid, starting from the top to the bottom
        { 
            if(y+interval > this.screenHeight)//if the next point is beyond the right edge of the canvas
            {
                continue; //skip
            } 
            for(let x = interval; x < this.screenWidth; x+=interval)//all the while, getting all the horizontal points at each level 
            { 
                if(x+interval > this.screenWidth)//if the next point is beyond the bottom edge of the canvas
                { 
                    continue; //skip
                } 
                points.push({x:x,y:y}); 
            } 
        }
        return points;  
    }  
    getRandomColor(opacity)
    {
        const colors = [
            `rgba(96, 125, 139, ${opacity})`,
            `rgba(158, 158, 158, ${opacity})`,
            `rgba(255, 87, 34, ${opacity})`,
            `rgba(255, 152, 0, ${opacity})`,
            `rgba(255, 192, 8, ${opacity})`,
            `rgba(255, 235, 59, ${opacity})`,
            `rgba(205, 220, 57, ${opacity})`,
            `rgba(139, 195, 75, ${opacity})`,
            `rgba(76, 175, 80, ${opacity})`,
            `rgba(0, 150, 136, ${opacity})`,
            `rgba(0, 188, 212, ${opacity})`,
            `rgba(1, 169, 244, ${opacity})`,
            `rgba(33, 150, 243, ${opacity})`,
            `rgba(64, 80, 181, ${opacity})`,
            `rgba(103, 58, 183, ${opacity})`,
            `rgba(156, 39, 176, ${opacity})`,
            `rgba(233, 30, 99, ${opacity})`,
            `rgba(244, 67, 54, ${opacity})`,
            `rgba(120, 144, 156, ${opacity})`,
            `rgba(189, 189, 189, ${opacity})`,
            `rgba(244, 81, 30, ${opacity})`,
            `rgba(255, 112, 67, ${opacity})`,
            `rgba(255, 202, 39, ${opacity})`,
            `rgba(255, 238, 88, ${opacity})`,
            `rgba(156, 204, 101, ${opacity})`,
            `rgba(102, 187, 106, ${opacity})`,
            `rgba(39, 166, 154, ${opacity})`,
            `rgba(39, 198, 218, ${opacity})`,
            `rgba(43, 182, 246, ${opacity})`,
            `rgba(66, 165, 245, ${opacity})`,
            `rgba(92, 107, 192, ${opacity})`,
            `rgba(171, 71, 188, ${opacity})`,
            `rgba(236, 64, 122, ${opacity})`,
            `rgba(84, 110, 122, ${opacity})`,
            `rgba(117, 117, 117, ${opacity})`,
            `rgba(255, 179, 0, ${opacity})`,
            `rgba(253, 216, 54, ${opacity})`,
            `rgba(192, 202, 51, ${opacity})`,
            `rgba(124, 179, 66, ${opacity})`,
            `rgba(68, 160, 71, ${opacity})`,
            `rgba(0, 137, 123, ${opacity})`,
            `rgba(4, 155, 229, ${opacity})`,
            `rgba(30, 136, 229, ${opacity})`,
            `rgba(57, 73, 171, ${opacity})`,
            `rgba(94, 53, 177, ${opacity})`,
            `rgba(142, 36, 170, ${opacity})`,
            `rgba(216, 27, 96, ${opacity})`,
            `rgba(229, 56, 53, ${opacity})`,
        ]
        return colors[parseInt(this.getRandomNumber(0, colors.length))];
    }
    /**
    * Returns a random number between min (inclusive) and max (exclusive)
    * @param  {number} min The lesser of the two numbers.
    * @param  {number} max The greater of the two numbers.
    * @return {number} A random number between min (inclusive) and max (exclusive)
    */
    getRandomNumber(min, max) 
    {
        return Math.random() * (max - min) + min;
    } 
    /**
    * Let canvas respond to window resizing.
    * @param  {number} screenHeight The height of the screen.
    * @param  {number} screenWidth  The width of the screen
    */
    refreshScreenSize(screenHeight,screenWidth)
    {   
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        {  
            this.screenHeight   = screenHeight;
            this.screenWidth    = screenWidth;
            this.points         = this.createPoints(); //coordinates of the vertices of all squares when the canvas is partitioned
            this.gridWorms      = this.createGridWorms(this.getRandomNumber(1, 10));
        } 
    }  
    update(deltaTime)
    {     
       this.gridWorms.forEach(function(gridworm)
        {
            gridworm.update(deltaTime); 
        }); 
    }  
    draw(ctx)
    {    
        /*
        for(var i = 0; i < this.points.length; i++)
        {
            let point = this.points[i];
            ctx.fillStyle   = Math.random() > 0.5? this.color:'white';//creates a disco effect 
            ctx.fillRect(point.x,point.y,this.interval,this.interval);
        }
        */
        this.gridWorms.forEach(function(gridworm)
        {
            gridworm.draw(ctx); 
        }); 
    }   
}

//set everything up 
function getBrowserWindowSize() 
{
    const win = window;
    const doc     = document;
    const offset  = 5;//
    const docElem = doc.documentElement;
    const body    = doc.getElementsByTagName('body')[0];
    const browserWindowWidth  = win.innerWidth || docElem.clientWidth || body.clientWidth;
    const browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    return {x:browserWindowWidth-offset,y:browserWindowHeight-offset}; 
} 
const browserWindowSize   = getBrowserWindowSize();
const c   = document.getElementById("gridwormCanvas");
const ctx = c.getContext("2d"); 
//set size of canvas
c.width          = browserWindowSize.x; 
c.height         = browserWindowSize.y; 
let SCREEN_WIDTH = browserWindowSize.x;
let SCREEN_HEIGHT= browserWindowSize.y;
const painter      = new Painter(SCREEN_WIDTH,SCREEN_HEIGHT);
let lastTime     = 100;
let windowSize;
function onWindowResize()//called every time the window gets resized. 
{
    windowSize     = getBrowserWindowSize();
    c.width        = windowSize.x; 
    c.height       = windowSize.y; 
    SCREEN_WIDTH   = windowSize.x;
    SCREEN_HEIGHT  = windowSize.y;  
}
window.addEventListener('resize',onWindowResize); 
function updateCanvas()
{
    ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);    
    ctx.fillStyle   = '#1c1c1c';  
    ctx.fillRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);
}
function doAnimationLoop(timestamp)
{           
    updateCanvas();
    painter.refreshScreenSize(SCREEN_HEIGHT,SCREEN_WIDTH);//let canvas respond to window resizing  
    const deltaTime  = timestamp - lastTime; 
        lastTime   = timestamp;
    painter.update(deltaTime);   
    painter.draw(ctx);  
    requestAnimationFrame(doAnimationLoop); 
} 
requestAnimationFrame(doAnimationLoop);

