/* ============================================================
   GuGuMur — meteor shower
   Canvas 2D · no dependencies
   ============================================================ */

(function () {
  'use strict';

  var canvas = document.getElementById('cosmos-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  var TAU = Math.PI * 2;
  var DEG = Math.PI / 180;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 0;
  var H = 0;
  var DPR = 1;
  var elapsed = 0;
  var lastTime = performance.now();

  var stars = [];
  var meteors = [];
  var sparks = [];
  var sprites = {};

  var pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  var radiant = { x: 0.55, y: 0.18 };

  var spawnTimer = 0.35;
  var burstTimer = 4.5;
  var burstLeft = 0;
  var burstGap = 0;
  var heroTimer = 2.4;

  var COLORS = {
    ice:  [126, 224, 255],
    blue: [120, 166, 255],
    gold: [255, 211, 146],
    white:[236, 247, 255],
    violet:[188, 156, 255]
  };

  function smoothstep(min, max, value) {
    var t = Math.min(1, Math.max(0, (value - min) / (max - min)));
    return t * t * (3 - 2 * t);
  }

  /* ----------------------------------------------------------
     Star sprites (pre-rendered for soft glow)
     ---------------------------------------------------------- */

  function makeSprite(rgb) {
    var size = 64;
    var c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    var g = c.getContext('2d');
    var gradient = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);

    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.10, 'rgba(255,255,255,.96)');
    gradient.addColorStop(0.22, 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',.82)');
    gradient.addColorStop(0.44, 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',.22)');
    gradient.addColorStop(1, 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0)');

    g.fillStyle = gradient;
    g.fillRect(0, 0, size, size);
    return c;
  }

  function buildSprites() {
    sprites.ice = makeSprite(COLORS.ice);
    sprites.blue = makeSprite(COLORS.blue);
    sprites.gold = makeSprite(COLORS.gold);
    sprites.white = makeSprite(COLORS.white);
    sprites.violet = makeSprite(COLORS.violet);
  }

  /* ----------------------------------------------------------
     Stars
     ---------------------------------------------------------- */

  function pickStarColor() {
    var random = Math.random();
    if (random < 0.50) return { name: 'white', rgb: COLORS.white };
    if (random < 0.74) return { name: 'ice', rgb: COLORS.ice };
    if (random < 0.90) return { name: 'blue', rgb: COLORS.blue };
    if (random < 0.97) return { name: 'violet', rgb: COLORS.violet };
    return { name: 'gold', rgb: COLORS.gold };
  }

  function buildStars() {
    stars = [];
    var count = Math.max(420, Math.min(1050, Math.round((W * H) / 1700)));

    for (var i = 0; i < count; i++) {
      var inBand = Math.random() < 0.24;
      var x;
      var y;

      if (inBand) {
        var t = Math.random();
        x = W * (t * 1.18 - 0.08) + (Math.random() - 0.5) * W * 0.20;
        y = H * (0.10 + t * 0.52) + (Math.random() - 0.5) * H * 0.22;
      } else {
        x = Math.random() * W;
        y = Math.random() * H;
      }

      var nearRadiant = Math.random() < 0.055;
      if (nearRadiant) {
        var angle = Math.random() * TAU;
        var radius = Math.pow(Math.random(), 1.7) * Math.min(W, H) * 0.13;
        x = W * radiant.x + Math.cos(angle) * radius;
        y = H * radiant.y + Math.sin(angle) * radius * 0.7;
      }

      var color = pickStarColor();
      var glow = Math.random() < 0.04;

      stars.push({
        x: x,
        y: y,
        r: glow ? 1.5 + Math.random() * 1.5 : 0.45 + Math.random() * 1.15,
        depth: 0.25 + Math.random() * 0.9,
        alpha: 0.28 + Math.random() * 0.72,
        phase: Math.random() * TAU,
        speed: 0.25 + Math.random() * 1.25,
        color: color,
        glow: glow,
        cross: glow && Math.random() < 0.4
      });
    }
  }

  function drawStars(time) {
    for (var i = 0; i < stars.length; i++) {
      var star = stars[i];
      var twinkle = 0.68 + 0.32 * Math.sin(time * star.speed + star.phase);
      var alpha = star.alpha * twinkle;
      var ox = pointer.x * 16 * (star.depth - 0.45);
      var oy = pointer.y * 11 * (star.depth - 0.45);
      var x = star.x + ox;
      var y = star.y + oy;

      if (star.glow) {
        var size = star.r * 9;
        ctx.globalAlpha = alpha * 0.7;
        ctx.drawImage(sprites[star.color.name], x - size / 2, y - size / 2, size, size);

        ctx.globalAlpha = alpha;
        ctx.fillStyle = 'rgba(255,255,255,1)';
        ctx.beginPath();
        ctx.arc(x, y, star.r * 0.52, 0, TAU);
        ctx.fill();

      } else {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = 'rgba(' + star.color.rgb.join(',') + ',1)';
        ctx.beginPath();
        ctx.arc(x, y, star.r, 0, TAU);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  function drawRadiant(time) {
    var rx = W * radiant.x;
    var ry = H * radiant.y;
    var radius = Math.min(W, H) * 0.42;
    var pulse = 0.9 + 0.1 * Math.sin(time * 0.45);

    var glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, radius);
    glow.addColorStop(0, 'rgba(126,196,255,' + (0.12 * pulse) + ')');
    glow.addColorStop(0.24, 'rgba(92,146,255,.055)');
    glow.addColorStop(0.58, 'rgba(70,110,230,.018)');
    glow.addColorStop(1, 'rgba(40,70,180,0)');

    ctx.fillStyle = glow;
    ctx.fillRect(rx - radius, ry - radius, radius * 2, radius * 2);
  }

  /* ----------------------------------------------------------
     Meteors
     ---------------------------------------------------------- */

  function pickMeteorColor(fireball) {
    var random = Math.random();
    if (fireball && random < 0.30) return COLORS.gold;
    if (random < 0.48) return COLORS.ice;
    if (random < 0.76) return COLORS.blue;
    if (random < 0.92) return COLORS.white;
    return COLORS.violet;
  }

  function spawnMeteor(fireballChance) {
    var fireball = Math.random() < fireballChance;
    var micro = !fireball && Math.random() < 0.52;
    var angle;
    var startX;
    var startY;

    var speed = (fireball ? 340 : micro ? 620 : 500) +
      Math.random() * (fireball ? 260 : micro ? 480 : 480);

    // every meteor flies outward from the same radiant point
    var rx = W * radiant.x;
    var ry = H * radiant.y;
    var fanAngle = (14 + Math.random() * 152) * DEG;
    var radius = Math.min(W, H) * (micro ? 0.03 : 0.10) +
      Math.random() * Math.min(W, H) * (micro ? 0.26 : 0.56);

    startX = rx + Math.cos(fanAngle) * radius;
    startY = ry + Math.sin(fanAngle) * radius;

    startX = Math.max(22, Math.min(W - 22, startX));
    startY = Math.max(ry + H * 0.035, Math.min(H * 0.86, startY));

    var baseAngle = Math.atan2(startY - ry, startX - rx);
    if (Math.sin(baseAngle) < 0.12) {
      baseAngle = Math.cos(baseAngle) < 0 ? Math.PI - 0.2 : 0.2;
    }
    angle = baseAngle + (Math.random() - 0.5) * 8 * DEG;

    var vx = Math.cos(angle) * speed;
    var vy = Math.sin(angle) * speed;

    var color = pickMeteorColor(fireball);
    var lengthFactor = fireball
      ? (0.36 + Math.random() * 0.30)
      : micro
        ? (0.055 + Math.random() * 0.10)
        : (0.30 + Math.random() * 0.28);

    var meteor = {
      x: startX,
      y: startY,
      vx: vx,
      vy: vy,
      speed: speed,
      age: 0,
      life: (fireball ? 1.7 : micro ? 0.6 : 1.1) + Math.random() * (fireball ? 1.2 : micro ? 0.55 : 1.15),
      length: speed * lengthFactor,
      width: fireball ? 2.8 + Math.random() * 2.0 : micro ? 0.65 + Math.random() * 0.6 : 1.45 + Math.random() * 1.65,
      color: color,
      fireball: fireball,
      micro: micro,
      alpha: 0,
      flicker: Math.random() * TAU,
      sparkClock: 0
    };

    meteors.push(meteor);

    if (meteors.length > 96) meteors.shift();
  }

  function updateMeteors(dt) {
    for (var i = meteors.length - 1; i >= 0; i--) {
      var meteor = meteors[i];
      meteor.age += dt;
      meteor.x += meteor.vx * dt;
      meteor.y += meteor.vy * dt;
      meteor.alpha = Math.min(1, meteor.age * 5.5) * (1 - smoothstep(0.66, 1, meteor.age / meteor.life));

      var edgeDistance = Math.min(meteor.x, W - meteor.x, meteor.y, H - meteor.y);
      meteor.alpha *= smoothstep(-90, 90, edgeDistance);

      if (meteor.fireball) {
        meteor.sparkClock += dt;
        if (meteor.sparkClock > 0.018) {
          meteor.sparkClock = 0;
          spawnSpark(meteor);
        }
      }

      var margin = meteor.length + 160;
      if (
        meteor.age > meteor.life ||
        meteor.x < -margin ||
        meteor.y > H + margin ||
        meteor.y < -margin ||
        meteor.x > W + margin
      ) {
        meteors.splice(i, 1);
      }
    }
  }

  function drawMeteor(meteor) {
    var alpha = meteor.alpha * (meteor.micro ? 0.82 : 1);
    alpha *= 0.91 + 0.09 * Math.sin(elapsed * 17 + meteor.flicker);
    if (alpha <= 0.012) return;

    var tailSeconds = meteor.length / meteor.speed;
    var tailX = meteor.x - meteor.vx * tailSeconds;
    var tailY = meteor.y - meteor.vy * tailSeconds;

    var dx = meteor.x - tailX;
    var dy = meteor.y - tailY;
    var magnitude = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / magnitude;
    var ny = dx / magnitude;
    var halfWidth = meteor.width * 0.5;

    var gradient = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
    gradient.addColorStop(0, 'rgba(' + meteor.color.join(',') + ',0)');
    gradient.addColorStop(0.36, 'rgba(' + meteor.color.join(',') + ',' + (0.06 * alpha) + ')');
    gradient.addColorStop(0.70, 'rgba(' + meteor.color.join(',') + ',' + (0.46 * alpha) + ')');
    gradient.addColorStop(0.90, 'rgba(' + meteor.color.join(',') + ',' + (0.86 * alpha) + ')');
    gradient.addColorStop(1, 'rgba(255,255,255,' + (0.86 * alpha) + ')');

    // soft halo along the trail, fading to nothing at the tail
    var halo = ctx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
    halo.addColorStop(0, 'rgba(' + meteor.color.join(',') + ',0)');
    halo.addColorStop(0.58, 'rgba(' + meteor.color.join(',') + ',' + (0.035 * alpha) + ')');
    halo.addColorStop(1, 'rgba(' + meteor.color.join(',') + ',' + (0.10 * alpha) + ')');
    ctx.strokeStyle = halo;
    ctx.lineWidth = meteor.width * 3.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(meteor.x, meteor.y);
    ctx.stroke();

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(meteor.x + nx * halfWidth, meteor.y + ny * halfWidth);
    ctx.lineTo(meteor.x - nx * halfWidth, meteor.y - ny * halfWidth);
    ctx.closePath();
    ctx.fill();

    // bright core near the head
    var coreStartX = meteor.x - dx * 0.46;
    var coreStartY = meteor.y - dy * 0.46;
    var coreGradient = ctx.createLinearGradient(coreStartX, coreStartY, meteor.x, meteor.y);
    coreGradient.addColorStop(0, 'rgba(255,255,255,0)');
    coreGradient.addColorStop(0.55, 'rgba(255,255,255,' + (0.16 * alpha) + ')');
    coreGradient.addColorStop(1, 'rgba(255,255,255,' + (0.76 * alpha) + ')');

    ctx.strokeStyle = coreGradient;
    ctx.lineWidth = Math.max(0.5, meteor.width * 0.22);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(coreStartX, coreStartY);
    ctx.lineTo(meteor.x, meteor.y);
    ctx.stroke();

    // head bloom
    var flicker = 0.86 + 0.14 * Math.sin(elapsed * 18 + meteor.flicker);
    var headRadius = (meteor.fireball ? 12.5 : meteor.micro ? 4.6 : 7.2) * (0.82 + meteor.width * 0.10) * flicker;
    var headGradient = ctx.createRadialGradient(
      meteor.x, meteor.y, 0,
      meteor.x, meteor.y, headRadius
    );
    headGradient.addColorStop(0, 'rgba(255,255,255,' + (0.86 * alpha) + ')');
    headGradient.addColorStop(0.16, 'rgba(' + meteor.color.join(',') + ',' + (0.68 * alpha) + ')');
    headGradient.addColorStop(0.46, 'rgba(' + meteor.color.join(',') + ',' + (0.16 * alpha) + ')');
    headGradient.addColorStop(1, 'rgba(' + meteor.color.join(',') + ',0)');

    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, headRadius, 0, TAU);
    ctx.fill();

  }

  /* ----------------------------------------------------------
     Fireball sparks
     ---------------------------------------------------------- */

  function spawnSpark(meteor) {
    if (sparks.length > 150) return;

    var angle = Math.random() * TAU;
    var speed = 12 + Math.random() * 55;
    var life = 0.35 + Math.random() * 0.85;

    sparks.push({
      x: meteor.x + (Math.random() - 0.5) * 8,
      y: meteor.y + (Math.random() - 0.5) * 8,
      vx: Math.cos(angle) * speed + meteor.vx * 0.04,
      vy: Math.sin(angle) * speed + meteor.vy * 0.04,
      age: 0,
      life: life,
      size: 0.7 + Math.random() * 1.7,
      color: meteor.color
    });
  }

  function updateSparks(dt) {
    for (var i = sparks.length - 1; i >= 0; i--) {
      var spark = sparks[i];
      spark.age += dt;
      spark.x += spark.vx * dt;
      spark.y += spark.vy * dt;
      spark.vx *= 0.985;
      spark.vy = spark.vy * 0.985 + 16 * dt;

      if (spark.age >= spark.life) sparks.splice(i, 1);
    }
  }

  function drawSparks() {
    for (var i = 0; i < sparks.length; i++) {
      var spark = sparks[i];
      var alpha = 1 - spark.age / spark.life;
      alpha = Math.max(0, alpha * alpha);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(' + spark.color.join(',') + ',1)';
      ctx.beginPath();
      ctx.arc(spark.x, spark.y, spark.size * alpha, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ----------------------------------------------------------
     Spawning rhythm
     ---------------------------------------------------------- */

  function spawnHero() {
    var startX = W * (0.48 + Math.random() * 0.12);
    var startY = H * (0.21 + Math.random() * 0.04);
    var rx = W * radiant.x;
    var ry = H * radiant.y;
    var angle = Math.atan2(startY - ry, startX - rx) + (Math.random() - 0.5) * 4 * DEG;
    var speed = 440 + Math.random() * 140;
    var meteor = {
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      speed: speed,
      age: 0,
      life: 2.4 + Math.random() * 1.0,
      length: speed * (1.0 + Math.random() * 0.35),
      width: 3.2 + Math.random() * 1.2,
      color: Math.random() < 0.36 ? COLORS.gold : COLORS.ice,
      fireball: true,
      hero: true,
      micro: false,
      alpha: 0,
      flicker: Math.random() * TAU,
      sparkClock: 0
    };
    meteors.push(meteor);
  }

  function updateSpawning(dt) {
    var target = W < 700 ? 8 : 14;

    if (burstLeft > 0) {
      burstGap -= dt;
      if (burstGap <= 0) {
        spawnMeteor(0.18);
        burstLeft -= 1;
        burstGap = 0.03 + Math.random() * 0.065;
      }
    } else {
      burstTimer -= dt;
      if (burstTimer <= 0) {
        burstLeft = 10 + Math.floor(Math.random() * 7);
        burstGap = 0;
        burstTimer = 5 + Math.random() * 6;
      }
    }

    spawnTimer -= dt;
    if (spawnTimer <= 0) {
      if (meteors.length < target) {
        spawnMeteor(0.07);
        spawnTimer = 0.035 + Math.random() * 0.06;
      } else {
        spawnMeteor(0.07);
        spawnTimer = 0.22 + Math.random() * 0.30;
      }
    }

    heroTimer -= dt;
    if (heroTimer <= 0) {
      spawnHero();
      heroTimer = 4.5 + Math.random() * 3.5;
    }
  }

  /* ----------------------------------------------------------
     Main loop
     ---------------------------------------------------------- */

  function update(dt) {
    pointer.x += (pointer.tx - pointer.x) * 0.045;
    pointer.y += (pointer.ty - pointer.y) * 0.045;

    updateSpawning(dt);
    updateMeteors(dt);
    updateSparks(dt);
  }

  function draw(time) {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    drawRadiant(time);
    drawStars(time);

    for (var i = 0; i < meteors.length; i++) {
      drawMeteor(meteors[i]);
    }

    drawSparks();
    ctx.globalCompositeOperation = 'source-over';
  }

  function frame(now) {
    var dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    elapsed += dt;

    update(dt);
    draw(elapsed);

    requestAnimationFrame(frame);
  }

  /* ----------------------------------------------------------
     Layout / boot
     ---------------------------------------------------------- */

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    buildStars();

    if (reduceMotion) {
      drawStatic();
    }
  }

  function seedMeteors() {
    meteors = [];
    sparks = [];

    spawnHero();
    meteors[0].age = 0.45;
    meteors[0].x += meteors[0].vx * 0.45;
    meteors[0].y += meteors[0].vy * 0.45;

    for (var i = 0; i < 22; i++) {
      spawnMeteor(i === 0 ? 1 : 0.08);
      var meteor = meteors[meteors.length - 1];
      var age = Math.random() * meteor.life * 0.40;
      meteor.age = age;
      meteor.x += meteor.vx * age;
      meteor.y += meteor.vy * age;
      meteor.alpha = Math.min(1, age * 5.5) * (1 - smoothstep(0.66, 1, age / meteor.life));
    }
  }

  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    drawRadiant(0);
    drawStars(0);

    for (var i = 0; i < meteors.length; i++) {
      meteors[i].alpha = 0.7;
      drawMeteor(meteors[i]);
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  function onPointerMove(event) {
    pointer.tx = (event.clientX / W - 0.5) * 2;
    pointer.ty = (event.clientY / H - 0.5) * 2;
  }

  function onVisibility() {
    lastTime = performance.now();
  }

  function init() {
    buildSprites();
    resize();
    seedMeteors();

    document.body.classList.add('cosmos-ready');

    if (reduceMotion) {
      drawStatic();
      window.addEventListener('resize', resize);
      return;
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    requestAnimationFrame(frame);
  }

  init();
})();
