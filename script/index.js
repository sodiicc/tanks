let gameField = document.querySelector('.tanks-field');
let start = document.querySelector('.start');
let tank = document.querySelector('.tank');

let enemy1 = document.querySelectorAll('.enemy')[0];
let enemy2 = document.querySelectorAll('.enemy')[1];
let enemy3 = document.querySelectorAll('.enemy')[2];
let enemy4 = document.querySelectorAll('.enemy')[3];


let topEl = gameField.getBoundingClientRect().top + 3;
let leftEl = gameField.getBoundingClientRect().left + 3;


start.addEventListener('click', () => {
  start.style.display = 'none';
  myTank.createTank();
  enemyTank1.createTank(5);

  enemy1.hp = 5;
  enemy2.hp = 5;
  enemy3.hp = 5;
  enemy4.hp = 5;
  enemyTank2.createTank(5);
  enemyTank3.createTank(5);
  enemyTank4.createTank(5);
  enemyTank1.enemyOnMove();
  enemyTank2.enemyOnMove();
  enemyTank3.enemyOnMove();
  enemyTank4.enemyOnMove();

  document.querySelectorAll('.tank').forEach((el) => {
    let tg = document.elementFromPoint(el.getBoundingClientRect().left - 5, el.getBoundingClientRect().top - 5);
    tg.classList.remove('obsticle', 'armor-obsticle');

  })

});

gameField.onclick = (() => {
  console.log('event.target', event.target)
})

document.addEventListener('keydown', (event) => {

  if (event.key == 'a') {
    myTank.moveLeft()
  }

  if (event.key == 'd') {
    myTank.moveRight()
  }
  if (event.key == 'w') {
    myTank.moveTop()
  }
  if (event.key == 's') {
    myTank.moveBottom()
  }
  if (event.key == ' ') {

    myTank.createBullet(20, 'myBullet')
  }

}
);

for (let i = 0; i < 17 * 17; i++) {
  let square = document.createElement('div');
  square.className = 'square';
  if (Math.random() < 0.1) {
    square.classList.add('obsticle');
    square.hp = 5;
    if (Math.random() < 0.3) {
      square.classList.add('armor-obsticle');
      square.hp = 20;
    }
  }
  gameField.appendChild(square);
}

let obsticle = document.querySelectorAll('.obsticle');
let enemyshoot = 0;



class Tank {
  constructor(tank, speed, topValue = 805, rotate = 0) {
    this.left = Math.floor(Math.random() * 17) * 50 + 5;
    this.top = topValue;
    this.speed = speed;
    this.tank = tank;
    this.rotate = rotate;
  }


  createTank(position = 0) {
    this.tank.style.display = 'block';
    this.tank.style.left = this.left + 'px';
    this.tank.style.top = this.top + position + 'px';
  }

  moveLeft() {
    this.tank.style.transform = `rotate(${this.rotate + 180}deg)`;
    this.tank.style.left = this.left;

    let tg = document.elementFromPoint(this.tank.getBoundingClientRect().left - 10, this.tank.getBoundingClientRect().top);
    let tg1 = document.elementFromPoint(this.tank.getBoundingClientRect().left - 10, this.tank.getBoundingClientRect().top + 40);

    if (tg == document.querySelector('body') || tg == null) {
      this.left = 5;
      this.tank.style.left = this.left + 'px';
    }
    else if (!tg.classList.contains('obsticle') && !tg1.classList.contains('obsticle')) {
      this.left -= this.speed;
      if (this.tank.getBoundingClientRect().left - leftEl < 5) { this.left = 5 }
      this.tank.style.left = this.left + 'px';

    } else {
      this.left = tg.getBoundingClientRect().right - leftEl + 5;
      this.tank.style.left = this.left + 'px';
    }

  }
  moveRight() {
    this.tank.style.transform = `rotate(${this.rotate}deg)`;
    this.tank.style.left = this.left;


    let tg = document.elementFromPoint(this.tank.getBoundingClientRect().right + 10, this.tank.getBoundingClientRect().top);
    let tg1 = document.elementFromPoint(this.tank.getBoundingClientRect().right + 10, this.tank.getBoundingClientRect().bottom);

    if (tg == document.querySelector('body') || tg == null) {
      this.left = 805
      this.tank.style.left = this.left + 'px';
    }

    else if (!tg.classList.contains('obsticle') && !tg1.classList.contains('obsticle')) {
      this.left += this.speed;
      if (this.tank.getBoundingClientRect().right - leftEl >= 845) { this.left = 805 }
      this.tank.style.left = this.left + 'px';

    } else {
      this.left = tg.getBoundingClientRect().left - leftEl - 45;
      this.tank.style.left = this.left + 'px';
    }
  }
  moveTop() {
    this.tank.style.transform = `rotate(${this.rotate + 270}deg)`;
    this.tank.style.top = this.top + 'px';

    let tg = document.elementFromPoint(this.tank.getBoundingClientRect().left, this.tank.getBoundingClientRect().top - 10);
    let tg1 = document.elementFromPoint(this.tank.getBoundingClientRect().right, this.tank.getBoundingClientRect().top - 10);

    if (tg == document.querySelector('body') || tg == null) {
      this.top = 5;
      this.tank.style.top = this.top + 'px';
    }
    else if (!tg.classList.contains('obsticle') && !tg1.classList.contains('obsticle')) {

      this.top -= this.speed;
      if (this.tank.getBoundingClientRect().top - topEl < 10) { this.top = 5 }
      this.tank.style.top = this.top + 'px';
    } else {
      this.top = tg.getBoundingClientRect().bottom - topEl + 5;
      this.tank.style.top = this.top + 'px';
    }
  }
  moveBottom() {
    this.tank.style.transform = `rotate(${this.rotate + 90}deg)`;
    this.tank.style.top = this.top + 'px';

    let tg = document.elementFromPoint(this.tank.getBoundingClientRect().left, this.tank.getBoundingClientRect().bottom + 10);
    let tg1 = document.elementFromPoint(this.tank.getBoundingClientRect().right, this.tank.getBoundingClientRect().bottom + 10);

    if (tg == document.querySelector('body') || tg == null) {
      this.top = 805;
      this.tank.style.top = this.top + 'px';
    }
    if (!tg.classList.contains('obsticle') && !tg1.classList.contains('obsticle')) {
      this.top += this.speed;
      if (this.tank.getBoundingClientRect().bottom > 845) { this.top = 805 }
      this.tank.style.top = this.top + 'px';
    } else {
      this.top = tg.getBoundingClientRect().top - topEl - 45;
      this.tank.style.top = this.top + 'px';
    }
  }

  enemyOnMove() {
    let timer = 0;
    enemyshoot = setInterval(() => {
      // console.log('this.tankAlive', this.tankAlive)
      if (!this.tank.classList.contains('died')) {
        let rand = Math.random();
        if (rand > 0.75) {
          timer = setInterval(() => {
            this.moveLeft()
          }, 50)
        }
        else if (rand < 0.25) {
          timer = setInterval(() => {
            this.moveRight()
          }, 50)
        }
        else if (rand < 0.75 && rand > 0.5) {
          timer = setInterval(() => {
            this.moveTop()
          }, 50)
        }
        else {
          timer = setInterval(() => {
            this.moveBottom()
          }, 50)
        }
        setTimeout(() => {
          clearInterval(timer)
        }, 1000)
        this.createBullet(15, 'enemyBullet', 'rgb(255, 111, 195)')
      }


    }, 1100)
  }

  objectDessapiar(tg, bull) {
    if (tg == null || tg.classList.contains('enemy')) {
      if (bull.name === 'myBullet') {
        tg.hp -= 1
      }
    } else {
      tg.hp -= 1
    }
    if (tg == null || (tg.classList.contains('enemy') && bull.name !== 'enemyBullet')) {
      bull.style.display = 'none';

    }
    if (tg.hp <= 0) {
      if (tg.classList.contains('enemy')) {
        tg.style.display = 'none';
        tg.classList.add('died')
      }
      tg.classList.remove('obsticle', 'armor-obsticle')
    }
  }

  createBullet(speed = 15, name, color) {

    let bullet = document.createElement('div');
    let bullet2 = document.createElement('div');
    bullet.style.backgroundColor = color;
    bullet2.style.backgroundColor = color;
    bullet.name = name;
    bullet2.name = name;
    let bulletTop = this.top;
    let bulletLeft = this.left;

    bullet.className = 'bullet';
    bullet.style.top = bulletTop + 'px';
    bullet.style.left = bulletLeft + 'px';
    bullet2.className = 'bullet';
    // bullet2.style.top = bulletTop + 'px';
    // bullet2.style.left = bulletLeft+40 + 'px';  

    let bulletDesapier = () => {
      let tg = document.elementFromPoint(bullet.getBoundingClientRect().left, bullet.getBoundingClientRect().top);
      let tg1 = document.elementFromPoint(bullet.getBoundingClientRect().right, bullet.getBoundingClientRect().top);
      let tg0 = document.elementFromPoint(bullet.getBoundingClientRect().left, bullet.getBoundingClientRect().bottom);
      let tg11 = document.elementFromPoint(bullet.getBoundingClientRect().right, bullet.getBoundingClientRect().bottom);
      let tg2 = document.elementFromPoint(bullet2.getBoundingClientRect().left, bullet2.getBoundingClientRect().top);
      let tg3 = document.elementFromPoint(bullet2.getBoundingClientRect().right, bullet2.getBoundingClientRect().top);
      let tg22 = document.elementFromPoint(bullet2.getBoundingClientRect().left, bullet2.getBoundingClientRect().bottom);
      let tg33 = document.elementFromPoint(bullet2.getBoundingClientRect().right, bullet2.getBoundingClientRect().bottom);


      if (tg == null || tg.classList.contains('obsticle') || tg.classList.contains('enemy')) { this.objectDessapiar(tg, bullet) }
      else if (tg1.classList.contains('obsticle') || tg1.classList.contains('enemy')) { this.objectDessapiar(tg1, bullet) }
      else if (tg0.classList.contains('obsticle') || tg0.classList.contains('enemy')) { this.objectDessapiar(tg0, bullet) }
      else if (tg11.classList.contains('obsticle') || tg11.classList.contains('enemy')) { this.objectDessapiar(tg11, bullet) }

      if (tg == null || tg2.classList.contains('obsticle') || tg2.classList.contains('enemy')) { this.objectDessapiar(tg2, bullet2) }
      else if (tg22.classList.contains('obsticle') || tg22.classList.contains('enemy')) { this.objectDessapiar(tg22, bullet2) }
      else if (tg3.classList.contains('obsticle') || tg3.classList.contains('enemy')) { this.objectDessapiar(tg3, bullet2) }
      else if (tg33.classList.contains('obsticle') || tg33.classList.contains('enemy')) { this.objectDessapiar(tg33, bullet2) }
    }

    if (this.tank.style.transform === `rotate(${270 - this.rotate}deg)` || !this.tank.style.transform) {
      bullet2.style.top = bulletTop + 'px';
      bullet2.style.left = bulletLeft + 30 + 'px';
      gameField.appendChild(bullet)
      gameField.appendChild(bullet2)
      let timer = setInterval(() => {
        bulletDesapier();
        bulletTop -= speed;
        if (bulletTop < 0) {
          bullet2.style.display = 'none';
          bullet.style.display = 'none';
          clearInterval(timer)
        }
        bullet.style.top = bulletTop + 'px';
        bullet2.style.top = bulletTop + 'px';
      }, 50)
    }
    if (this.tank.style.transform === `rotate(${90 - this.rotate}deg)`) {
      bullet2.style.top = bulletTop + 30 + 'px';
      bullet.style.top = bulletTop + 30 + 'px';
      bullet2.style.left = bulletLeft + 30 + 'px';
      gameField.appendChild(bullet)
      gameField.appendChild(bullet2)
      let timer = setInterval(() => {
        bulletDesapier();
        bulletTop += speed;
        if (bulletTop > 810) {
          bullet2.style.display = 'none';
          bullet.style.display = 'none';
          clearInterval(timer)
        }
        bullet.style.top = bulletTop + 30 + 'px';
        bullet2.style.top = bulletTop + 30 + 'px';
      }, 50)
    }
    if (this.tank.style.transform === `rotate(${180 - this.rotate}deg)`) {
      bullet2.style.top = bulletTop + 30 + 'px';
      bullet2.style.left = bulletLeft + 'px';
      gameField.appendChild(bullet)
      gameField.appendChild(bullet2)
      let timer = setInterval(() => {
        bulletDesapier();
        bulletLeft -= speed;
        if (bulletLeft < 0) {
          bullet2.style.display = 'none';
          bullet.style.display = 'none';
          clearInterval(timer)
        }
        bullet.style.left = bulletLeft + 'px';
        bullet2.style.left = bulletLeft + 'px';
      }, 50)
    }
    if (this.tank.style.transform === `rotate(${0 - this.rotate}deg)`) {
      bullet2.style.top = bulletTop + 30 + 'px';
      bullet2.style.left = bulletLeft + 30 + 'px';
      bullet.style.left = bulletLeft + 30 + 'px';
      gameField.appendChild(bullet)
      gameField.appendChild(bullet2)
      let timer = setInterval(() => {
        bulletDesapier();
        bulletLeft += speed;
        if (bulletLeft > 810) {
          bullet2.style.display = 'none';
          bullet.style.display = 'none';
          clearInterval(timer)
        }
        bullet.style.left = bulletLeft + 30 + 'px';
        bullet2.style.left = bulletLeft + 30 + 'px';
      }, 50)
    }
  }
}

let myTank = new Tank(tank, 5);
let enemyTank1 = new Tank(enemy1, 5, 0, 90);
let enemyTank2 = new Tank(enemy2, 5, 0, 90);
let enemyTank3 = new Tank(enemy3, 5, 0, 90);
let enemyTank4 = new Tank(enemy4, 5, 0, 90);

// console.log('enemyTank1.enemyOnMove()', enemyTank1.enemyOnMove())
