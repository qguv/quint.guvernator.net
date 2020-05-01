/* canvas background */

const scaledown = 4;
const stripes = 5;
const opacity = 0.5;

let frame = 0;

function setup() {
    const canvas = document.getElementsByTagName('canvas')[0];
    [canvas.height, canvas.width] = dims();
    window.requestAnimationFrame(draw);
}

function dims() {
    return [window.innerHeight / scaledown, window.innerWidth / scaledown];
}

function draw() {

    const canvas = document.getElementsByTagName('canvas')[0];
    if (!canvas.getContext)
        return;

    const ctx = canvas.getContext('2d');

    const [h, w] = dims();

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, w, h);

    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    const separation = Math.floor(w / stripes);

    for (let y = 0; y < h; y++) {
        for (let x = frame % separation; x < w; x += separation) {
            const b = (y * w + x) * 4;

            data[b] = 255;
            data[b + 1] = 255;
            data[b + 2] = 255;
            data[b + 3] = 255 * opacity;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    frame++;
    window.requestAnimationFrame(draw);
}
