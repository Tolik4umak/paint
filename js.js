
function createCanvas(x , y){
    let arr = []
    let subArr = []

    for(let i = 0; i < x; i++){
        subArr[i] = false
    }

    for(let i = 0; i < y; i++){
        arr.push([...subArr])
    }

    return arr
}


let arr = createCanvas(20, 20)
let drawMode = true

let container = document.querySelector('.container')
let paint = document.querySelector('.paint')
let fill = document.querySelector('.fill')
let clear = document.querySelector('.clear')
let isMouseActive = false

window.onmousedown = function(){
    isMouseActive = true;
}

window.onmouseup = function(){
    isMouseActive = false;
}

function switchModeButtons(){
    if(drawMode){
        fill.classList.remove('button_active')
        paint.classList.add('button_active')
    } else {
        fill.classList.add('button_active')
        paint.classList.remove('button_active')
    }
}
switchModeButtons()

clear.addEventListener('click', () => {
    console.log(arr)
    drawMode = true
    switchModeButtons()
    arr = createCanvas(20, 20)
    rerender()
})

paint.addEventListener('click', () => {
    drawMode = true
    console.log(drawMode)
    switchModeButtons()

    
})

fill.addEventListener('click', () => {
    drawMode = false  
    console.log(drawMode)
    switchModeButtons()

})


rerender()
function rerender(){

    container.innerHTML = ''

    arr.forEach((lineX, x) => {
        lineX.forEach((lineY , y , subArr) => {

            const sqr = document.createElement('div')
            sqr.classList.add('sqr')
            container.append(sqr)

            if(arr[x][y] === true){
                sqr.classList.add('red')
            }

            if(arr[x][y] === 'fill'){
                sqr.classList.add('fill_color')
            }
          
            sqr.addEventListener('mousemove', (e) => {

                if(isMouseActive){
                    if(drawMode){
                        arr[x][y] = true
                        sqr.classList.add('red')
                        sqr.classList.remove('fill_color')
                    }
                }
            })

            sqr.addEventListener('click', (e) => {

                if(drawMode){
                    arr[x][y] = true
                    sqr.classList.add('red')
                    sqr.classList.remove('fill_color')
                }else{
                    markInner(x, y)
                }

            })
    
        })
    })
    
}



function  markInner(x , y){
    
    arr[x][y] = 'fill'


    if((x-1)>=0 && !arr[x-1][y]){
        markInner(x-1, y)
    }if((y+1)< arr[x].length && !arr[x][y+1]){
        markInner(x, y+1)
    }
    if((x+1)< arr.length && !arr[x+1][y]){
        markInner(x+1, y)
    }
    if ((y-1)>=0  && !arr[x][y-1]){
        markInner(x, y-1)
    }

    rerender()

    return

    
}






