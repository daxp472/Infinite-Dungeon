const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'assets/images/background.jpg');
    this.load.image('player', 'assets/images/player.png');
    this.load.image('enemy', 'assets/images/enemy.png');
}

function create() {
    this.add.image(400, 300, 'background');

    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setCollideWorldBounds(true);

    this.enemy = this.physics.add.sprite(700, 450, 'enemy');
    this.enemy.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, this.enemy, hitEnemy, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
    } else {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
    } else {
        this.player.setVelocityY(0);
    }
}

function hitEnemy(player, enemy) {
    enemy.setTint(0xff0000);
    player.setTint(0xff0000);
    this.time.delayedCall(500, () => {
        enemy.clearTint();
        player.clearTint();
    });

    enemy.setPosition(700, 450);  // Reset enemy position after hit
}
