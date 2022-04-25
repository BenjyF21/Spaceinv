//variabler
const Tast_A = 65
const Tast_D = 68
const Tast_Space = 32
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const LaserSpeed = 8;
const FiendeBredde = 150;
const enemy_width = 50;
 xPos = 0;
 yPos = 0;
 xPos_shot = 0;
 yPos_shot = 500;
 xPos_bomb = 0;
 yPos_bomb = 0;
 enemy_lives = 10;
 player_lives = 3;
 bomb = false;
 shot = false;

 Flytt_Hoyre = false
 Flytt_Venstre = false
 Skyte = false
 Spiller_Bredde = 100
//funksjonen aktiveres av event listner når jeg trykker på en tast
function TrykkTast(event){
console.log("-")
if (event.keyCode === Tast_A){  //trykker A
console.log("trykkerA")
Flytt_Venstre = true   //setter funksjonen Flytt_Venstre til true
}
if (event.keyCode === Tast_D){
console.log("trykkerD")        //trykker D
Flytt_Hoyre = true    //setter funksjonen Flytt_Hoyre til true som får figuren til å gå til siden
//varibelen brukes i en funksjon

}
if (event.keyCode === Tast_Space){  // aktiverer skuddene ved trykk av space
console.log("trykkerSpace")
Skyte = !Skyte
}
}
//funksjonen aktiveres av event listner når jeg slipper en tast setter den funkjsonen til false
function SlippTast(event){
console.log("-")
if (event.keyCode === Tast_A){  // = false
console.log("SlipperA")
Flytt_Venstre = false
}
if (event.keyCode === Tast_D){   // = false
console.log("SlipperD")
Flytt_Hoyre = false
}
if (event.keyCode === Tast_Space){  // = false
console.log("SlipperSpace")
Skyte = false
}
}


function setSize(object, bredde) {   //generisk funksjon som setter størrelse på objekter
  console.log("setSize")
  object.style.width = `${bredde}px`;
  object.style.height = "auto";
}   //auto tilbappser bredden til objektet

function setPosition(object, x , y){ //setter posisjonen til objektene
//console.log("setPosition")
object.style.transform = `translate(${x}px, ${y}px)`;
}


function LagLaser($container,x,y) {
const $laser = document.createElement("img");  //gir objektet et utseende
$laser.src = "bilder/laser.png";              // ----------------------
$laser.className = "laser";    //klassen
$container.appendChild($laser);  // appendChild legger bildeobjekt til canvasen
//const laser = {x, y, $laser};
setPosition($laser, x, -100); //plasserer lasern utafor canvasen
if(!shot){ //hvis den ikke har skutt setter den til True
xPos_shot = x;
}
shot = true;
}

function FlyttLaser(){
  if(shot) {
    if(yPos_shot < -20){yPos_shot = 550}  //hvis y posisjonen er mindre en -20 flytter lasern til y aksen 550.
    const $laser = document.querySelector(".laser");  //VELGER UT VARIABEL
    const $enemy = document.querySelector(".enemy");  //-------
    const laser_rek = document.querySelector(".laser").getBoundingClientRect();//her bruker vi en innebyg funksjoh til å gjøre bildene til rectangel for å skape en kolliasjon
    const enemy_rek = document.querySelector(".enemy").getBoundingClientRect();

if (collideRect(laser_rek, enemy_rek)){ //hvis spiller sin laser kolliderer med enemy mister enemy et liv
  console.log("kollisjon", enemy_lives);
  enemy_lives--
  shot = false  // og skuddet forsvinner =false
  yPos_shot = -20
}

if(enemy_lives < 1){ //hvis enemien har mindre en 1 liv vinner du spillet
  document.querySelector(".win").style.display = "block";
}

    //y = $laser.y;
    yPos_shot -= LaserSpeed;  //endre posisjonen til kula.

if (yPos_shot < -20)  //hvis skuddet er mindre enn position -20 blir skuddet borte
{
  shot = false        //--------------I
}
  setPosition($laser, xPos_shot , yPos_shot); //denne koden setter posisjonen på laseret
  //$container.removeChild($laser);
}
}

function CreateBomb(x,y){  //bombefunksjon
  const $bomb = document.createElement("img"); //utseende på objektet
  $bomb.src = "bilder/enemyLaser.png";       //---------
  $bomb.className = "bomb";  //clas
  $container.appendChild($bomb);  // legger til bomben på skjermen
  console.log(x,y);
  yPos_bomb = y;  //posisjonen til bomben
  xPos_bomb = x;  //-------
  setPosition($bomb, x, y)  //-----
}

function DropBomb(){  //funksjon bombe bevegelse
  const $bomb = document.querySelector(".bomb");  //henter ut classene
  const $player = document.querySelector(".player");   //------
  const bomb_rek = document.querySelector(".bomb").getBoundingClientRect(); //-------  //hente ut rec
  const player_rek = document.querySelector(".player").getBoundingClientRect(); //-----  //--

if(collideRect(bomb_rek, player_rek)){  //når bomben kolliderer med spiller mister
  console.log("bombekollisjon");        //spillern et liv //samme konsept som motsatt
  player_lives = player_lives - 1;     //-------
  bomb = false  //setter bomben til false ved bombekollisjon
  $container.removeChild($bomb)   //fjerner bomben
}
if(player_lives < 1){  //hvis spillern har mindre enn 1 liv taper du
  document.querySelector(".lose").style.display = "block";  //-----
}

  yPos_bomb = yPos_bomb + 13; //fart på bomben
  setPosition($bomb, xPos_bomb, yPos_bomb)  //posisjonen til bomben
  if (yPos_bomb > 600){  //når bomben har passert 600 slettes bomben
    bomb=false  //----
    $container.removeChild($bomb); //----
  }
}


function LagFiende($container, x, y){  //funksjon som lager enemy
  const $enemy = document.createElement("img");  // utsende til enemy
  $enemy.src = "bilder/ufo.png";              //----
  $enemy.className = "enemy"; //clas
  $container.appendChild($enemy); //leggertil enemy på canvasen
  const enemy_cooldown = Math.floor(Math.random()*500);  //
  const enemy = {x, y, $enemy, enemy_cooldown}  //plasseringen
  //STATE.enemies.push(enemy);
  setSize($enemy, FiendeBredde);  //størrelsen på fiende
  setPosition($enemy, x, y)  //posisjon
}

function collideRect(rect1, rect2){ //returnerer true om alle er false
//kollisjon funkjson
  //console.log(rect1.left, rect1.right, rect1.top, rect1.bottom);
  //console.log(rect2.left, rect2.right, rect2.top, rect2.bottom);

  return!(rect2.left > rect1.right ||  // presentasjon
    rect2.right < rect1.left ||
    rect2.top > rect1.bottom ||   //
    rect2.bottom < rect1.top
  );

}  //



function FlyttSpiller(){  //movment på spillern
  if(Flytt_Venstre){   //hvis Flytt_Venstre funksjon blir aktivert går spillern 5 til venstre
    xPos -= 5; //spiller går 5 bortover når når enten Key Left eller Right blir presset
  } if(Flytt_Hoyre){
    xPos += 5;
  } if(Skyte){
    LagLaser($container, xPos - Spiller_Bredde/2, yPos); //gjør sånn at det ser ut som laser kommer ut av spiller
    console.log("skyte");                                // hvis den skyter


  }
  const $player = document.querySelector(".player"); //henter ut spiller, canvas
  setPosition($player, xPos, yPos-10);  // posisjon
}

function update(){  //update funksjon som går hele tiden
  if (enemy_lives > 0 && player_lives > 0){  //game over eller win
  //console.log("i update");
  FlyttSpiller();   //variabler
  FlyttLaser();
FlyttFiende($container)
DropBomb();
  requestAnimationFrame(update);  //animert backgrunn
}
}

function LagSpiller($container) {
  xPos = GAME_WIDTH / 2;  //midt på skjermen
  yPos = GAME_HEIGHT - 50;  50 //opp fra bunnen
  const $player = document.createElement("img");  //bilde av spaceship
  $player.src = "bilder/spaceship.png";          // utseende til spiller
  $player.className = "player";     //class
  $container.appendChild($player);  //legger til på canvasen
  setPosition($player, xPos, yPos);  //posisjon til spiller
  setSize($player, Spiller_Bredde);   //størrelsen
}


function FlyttFiende(){  //movment på fiende
  const $enemy = document.querySelector(".enemy");  //enemy på canvas
//const $laser = document.querySelector(".laser");
//  const laser_rectangle = document.querySelector(".laser").getBoundingClientRect();
//const spaceship_rectangle = document.querySelector(".laser").getBoundingClientRect();
//  const fiende_rektangel = $enemy.getBoundingClientRect();

  const dx = Math.sin(Date.now()/500)*370;  // kode som får enemy til å bevege seg i cosinus sinus
  const dy = Math.cos(Date.now()/500)*40;  // innebygde javascriptfunksjoner og coisinus og sinus gir verdiger mellom 0-1 som beskriver plasseringen i et x og y kordinatsystem
  //const rand = Math.floor(Math.random()*10)-5 //---//og sammen vil forme en sirkel
  //const enemies = STATE.enemies;              //date er et tall som øker vært milliskukunnd, så vi bruker denne til å få en konstnt økende verdi
  //for (let i = 0; i < enemies.length; i++){
  //  const enemy = enemies[i];
    var a = 220 + dx //+ rand;
    var b = 100 + dy //+ rand;   //
    setPosition($enemy, a, b);
if (!bomb)
{  //når det ikke er bombe på skjermen så kan du skyte en ny
  bomb = true  //----
  CreateBomb(a, b) //----
}
  }

window.requestAnimationFrame(update);  //update på animation frame
const $container = document.querySelector(".main");   //velger fra css
LagSpiller($container);  //css
LagFiende($container, 220,90); // plassering
//CreateBomb();
window.addEventListener("keydown", TrykkTast);  //event listner, basiclyy bare venter
window.addEventListener("keyup", SlippTast);    // på at funksjonen blir aktivert
update();  //opptater koden hele tiden
