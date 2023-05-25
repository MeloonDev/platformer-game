const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = 1024;
canvas.height = 576;

const vievportScale = 1.2;

const scaledCanvas = {
  width: canvas.width / 1.2,
  height: canvas.height / 1.2,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 128) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 128));
}

const collisionBlocks = [];
floorCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 12289) {
      collisionBlocks.push(
        new CollisionBlock({ position: { x: x * 10, y: y * 10 } })
      );
    }
  });
});

const platformCollisions2D = [];
for (let i = 0; i < platformCollisions.length; i += 128) {
  platformCollisions2D.push(platformCollisions.slice(i, i + 128));
}

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 12289) {
      platformCollisionBlocks.push(
        new CollisionBlock({ position: { x: x * 10, y: y * 10 } })
      );
    }
  });
});

const gravity = 0.5;

const player = new Player({
  position: {
    x: 500,
    y: 0,
  },
  collisionBlocks,
  imageSrc: "/img/idle.png",
  frameRate: 6,
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: { x: 0, y: 0 },
  imageSrc: "./img/background.png",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(1.2, 1.2);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();

  collisionBlocks.forEach((collisionBlock) => collisionBlock.update());
  platformCollisionBlocks.forEach((platformCollisionBlock) =>
    platformCollisionBlock.update()
  );
  player.update();
  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = 5;
  else if (keys.a.pressed) player.velocity.x = -5;
  c.restore();
}

animate();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
    case "d":
      keys.d.pressed = true;
      break;
    case "ArrowLeft":
    case "a":
      keys.a.pressed = true;
      break;
    case "ArrowUp":
    case "w":
      player.velocity.y = -14;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight":
    case "d":
      keys.d.pressed = false;
      break;
    case "ArrowLeft":
    case "a":
      keys.a.pressed = false;
      break;
  }
});
