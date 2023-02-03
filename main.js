// Start when DOM is ready
const init = () => {
    const canvas = document.getElementById('canvas')
    if (!canvas.getContext) throw new Error('Canvas unsupported')

    let clicks = []
    const ctx = canvas.getContext('2d')

    // Reset canvas content
    const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draws each saved vertex
    const drawVertex = () => {
        clicks.forEach(item => {
            ctx.beginPath()
            ctx.arc(item.x, item.y, 3, 0, 2 * Math.PI)
            ctx.fillStyle = 'orange'
            ctx.fill()
        })
    }

    // Draws a polygon traversing an array of coordinates
    const joinVertices = () => {
        ctx.beginPath()
        ctx.strokeStyle = "grey";
        ctx.lineWidth = 0.5;

        clicks.forEach((item, index) => {
            if (index === 0)
                ctx.moveTo(item.x, item.y)
            else
                ctx.lineTo(item.x, item.y)
        })
    }

    // Redraws the board content
    const redrawBoard = () => {
        clearCanvas()
        drawVertex()
        joinVertices()
    }


    /* =============== CLICK LISTENERS =============== */
    // Canvas Click
    canvas.addEventListener('click', (event) => {
        clicks.push({
            x: event.offsetX,
            y: event.offsetY
        })

        redrawBoard()
        ctx.stroke()
    });

    // Complete Click
    const completeBtn = document.getElementById('complete')
    completeBtn.addEventListener('click', () => {
        redrawBoard()
        ctx.closePath()
        ctx.stroke()
    })

    // Reset Click
    const resetBtn = document.getElementById('reset')
    resetBtn.addEventListener('click', () => {
        clicks = []
        clearCanvas()
    })
}

document.addEventListener("DOMContentLoaded", init)