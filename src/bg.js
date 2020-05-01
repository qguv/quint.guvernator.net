/* canvas background */

const resolution = 512;
const separation = 64;
const sprite_border = 7;
const echoes = 4;
const sprite_size = 128;
const alpha_fade = 0.4;
const initial_scale = 0.85;
const fallback_amount = 0.87;
const rainbow_pixel_diff = 0.001;
const framerate = 24;
const frame_time_ms = 1000 / framerate;
const rainbow_speed_ms = 10000;
const fallback_speed_ms = 5000;
const fade_in_fraction = 0.3;
const x_cheat = -25;
const y_cheat = 0;
const redness = 3;
const greenness = 1;
const blueness = 1;

let frame = 0;
let last_time = 0;

let canvas;
let sprite;

function setup() {
    canvas = document.getElementsByTagName('canvas')[0];

    sprite = document.createElement('canvas');
    sprite.width = sprite.height = sprite_size;

    window.requestAnimationFrame(animate);
}

function min(x, y) {
    return y < x ? y : x;
}

function max(x, y) {
    return y > x ? y : x;
}

function frac(x) {
    return x - Math.trunc(x);
}

function psin(offset) {
    const radians = offset * 2 * Math.PI;
    return Math.sin(radians);
}

function rgb(hue_period) {
    return [
        min(Math.floor((psin(hue_period) + 1) * (redness * 128)), 255),
        min(Math.floor((psin(hue_period + (1/3)) + 1) * (greenness * 128)), 255),
        min(Math.floor((psin(hue_period + (2/3)) + 1) * (blueness * 128)), 255),
    ];
}

function dims() {
    const h = window.innerHeight;
    const w = window.innerWidth;
    const scale_raw = resolution / min(h, w);

    /* never scale up */
    const scale = min(1, scale_raw);

    return [Math.floor(h * scale), Math.floor(w * scale)];
}

function draw_sprite(now) {
    const ctx = sprite.getContext('2d');
    const image = ctx.getImageData(0, 0, sprite_size, sprite_size);
    const data = image.data;

    ctx.clearRect(0, 0, sprite_size, sprite_size);

    let period = now / rainbow_speed_ms;
    for (let x = 0; x < sprite_size; x++) {
        for (let y = 0; y < sprite_size; y++) {
            let [r, g, b] = rgb(period + (rainbow_pixel_diff * x) + (rainbow_pixel_diff * y));

            if (x < sprite_border || y < sprite_border || sprite_size - x <= sprite_border || sprite_size - y <= sprite_border) {
                b = min(b + 64, 255);
            }

            const i = (y * sprite_size + x) * 4;
            data[i] = r;
            data[i + 1] = g;
            data[i + 2] = b;
            data[i + 3] = 255;
        }
    }

    ctx.putImageData(image, 0, 0);
}

function draw(now) {
    const canvas = document.getElementsByTagName('canvas')[0];
    if (!canvas.getContext)
        return false;

    const [h, w] = dims();
    [canvas.height, canvas.width] = [h, w];

    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'lighter';

    draw_sprite(now);

    ctx.clearRect(0, 0, w, h);

    for (let i = echoes; i >= 0; i--) {
        ctx.save();

        const anim = frac(now / fallback_speed_ms);
        const fade_in = anim / fade_in_fraction;

        ctx.globalAlpha = Math.pow(alpha_fade, i + anim);

        if (i == 0 && fade_in < 1) {
            ctx.globalAlpha *= fade_in;
        }

        const fallback = Math.pow(fallback_amount, i + anim) * initial_scale;
        ctx.scale(fallback, fallback);
        ctx.translate(
            Math.floor(w * (1 - fallback) / 2),
            Math.floor(h * (1 - fallback) / 2),
        );

        for (let x = x_cheat; x < w; x += sprite_size + separation) {
            for (let y = y_cheat; y < h; y += sprite_size + separation) {
                ctx.drawImage(sprite, x, y);
            }
        }

        ctx.restore();
    }

    return true;
}

function animate(now) {
    if ((now - last_time) > frame_time_ms) {
        last_time = now;
        const ok = draw(now);
        if (!ok)
            return;
        frame++;
    }
    window.requestAnimationFrame(animate);
}
