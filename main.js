let canvas;

let canvas2;

let canvas_container;

let ani_canvas;

let ani_ctx;

let intro_dots;

let intro_used_lines;

let sign_img;

let play_squares;

let players_divs;

let players_dom_scores;
    
let teams_dom_totals;
    
let teams_dom_totals_p;

let player_scores;

let team_imgs;

let main_ctx;

let main_ctx2;

let myroom;

let ismyturnflag;

let modal_title;

let modal_cards;

let modal;

let closeBtn;

let play_again;

let small_canvas;

let medium_canvas;

let new_room;

let new_game2;

let start_flag;

let modal_first;

let modal_name;

let msel2;

let initial_team;

let new_name_input;

let ufo;

let sound1;

let sound2;

let sound3;

let sound4;

window.addEventListener("load", charge);

function charge(){

    canvas_container = document.getElementById("canvas_container");

    ani_canvas = document.getElementById("ani_canvas");

    canvas = document.getElementById("canvas");
    
    canvas2 = document.getElementById("canvas2");
    
    ani_ctx = ani_canvas.getContext("2d");

    team_imgs = document.querySelectorAll(".team_img");
    
    closeBtn = document.getElementsByClassName("closeBtn")[0];
    
    document.getElementsByClassName("banner")[0].addEventListener("click", printMousePos1);
    
    modal_title = document.getElementById("modal_title");
    
    modal = document.getElementById("simpleModal");
    
    modal_cards = document.getElementById("modal_cards");
    
    play_again = document.getElementById("play_again");
    
    small_canvas = document.getElementById("small_canvas");
    
    medium_canvas = document.getElementById("medium_canvas");
    
    modal_first = document.getElementById("modal_first");
    
    modal_name = document.getElementById("modal_name");
    
    new_name_input = document.getElementById("new_name_input");
    
    sound1 = document.getElementById("sound1");
    
    sound2 = document.getElementById("sound2");
    
    sound3 = document.getElementById("sound3");
    
    sound4 = document.getElementById("sound4");
    
    ufo = document.getElementById("ufo");
    
    msel2 = document.getElementById("msel2");
    
    modal_name.style.display = "none";
    
    new_game2 = document.getElementById("new_game2");

    closeBtn.addEventListener("click", closeModal);
    
    new_room = false;
    
    start_flag = true;

    intro_dots = [];

    intro_used_lines = [];

    sign_img = [];

    sign_img[0] = document.getElementById("sign1_img");
    sign_img[1] = document.getElementById("sign2_img");
    sign_img[2] = document.getElementById("sign3_img");
    sign_img[3] = document.getElementById("sign4_img");
    
    ufo.className = "ufo";
    
    intro();
    
    render_game();
}

function intro_strokes(){

    ani_ctx.clearRect(0, 0, ani_canvas.width, ani_canvas.height);

    ani_ctx.fillStyle = "white";

	ani_ctx.fillRect(ani_canvas.width/3.6, ani_canvas.height/2.8, 70, 60);

    ani_ctx.fillStyle = "black";

    let p = 0;

    for(let c = 0; c < 4; c++){

        for(let b = 0; b < 4; b++){

            ani_ctx.beginPath();

            ani_ctx.fillRect(((ani_canvas.width/3.6) + (b * 20) + 4), ((ani_canvas.height/2.8) + (c * 16) + 6), 2, 2);

            let ob = {

                "x":((ani_canvas.width/3.6) + (b * 20) + 4),
                "y":((ani_canvas.height/2.8) + (c * 16) + 6),
                "ix":b,
                "iy":c,
                "used":false
            }

            intro_dots.push(ob);

            p++;
        } 
    }

    let lines = [];

    let a = 0;

    while(a < 24){

        let dot1 = random_int(0, 15);

        let dot2 = random_int(0, 15);

        let flag = false;

        lines.forEach((line)=>{

            if(((line.iax === intro_dots[dot1].ix && line.iay === intro_dots[dot1].iy) && (line.ibx === intro_dots[dot2].ix && line.iby === intro_dots[dot2].iy))){

                flag = true;
            }
        })
   
        

        if((((intro_dots[dot1].ix + 1) === intro_dots[dot2].ix && intro_dots[dot1].iy === intro_dots[dot2].iy) ||  
           (intro_dots[dot1].ix === intro_dots[dot2].ix && (intro_dots[dot1].iy + 1) === intro_dots[dot2].iy)) && !flag){

            let ob = {

                "ax":intro_dots[dot1].x,
                "ay":intro_dots[dot1].y,
                "bx":intro_dots[dot2].x,
                "by":intro_dots[dot2].y,
                "iax":intro_dots[dot1].ix,
                "iay":intro_dots[dot1].iy,
                "ibx":intro_dots[dot2].ix,
                "iby":intro_dots[dot2].iy,
                "dot1":dot1,
                "dot2":dot2,
                "used":false,
                "square1":false,
                "square2":false
            } 

            lines.push(ob); 

            a++;  
        }
    }

    a = 0;

    


    let inter1 = setInterval(()=>{

        if(a >= 24){

            clearInterval(inter1);
            return;
        }
        
        ani_ctx.beginPath();

        ani_ctx.moveTo(lines[a].ax, lines[a].ay);

        ani_ctx.lineTo(lines[a].bx, lines[a].by);

        ani_ctx.stroke();

        intro_used_lines.push(lines[a]);

        

        intro_squares.forEach((sq)=>{

            let sq_count = 0;

            sq.lines.forEach((line)=>{

                intro_used_lines.forEach((used_line)=>{

                    if(used_line.iax === line.iax && used_line.iay === line.iay && used_line.ibx === line.ibx && used_line.iby === line.iby && !sq.painted){

                        line.ax = used_line.ax;
                        line.ay = used_line.ay;
                        line.bx = used_line.bx;
                        line.by = used_line.by;

                        sq_count++;
                    }
                }) 
            })

            if(sq_count >= 4){

                ani_ctx.drawImage(sign_img[random_int(0, 3)], sq.lines[0].ax + 5, sq.lines[0].ay + 5, 10, 10); 

                sq.painted = true;
            }

        })
        a++;
    }, 1000);
}

function intro(){

    let ani_canvas2 = document.getElementById("ani_canvas2");

    let kids_img = document.getElementById("kids_img");

    let ani_ctx2 = ani_canvas2.getContext("2d");

    ani_ctx2.drawImage(kids_img, 0, 0, ani_canvas.width, ani_canvas.height);

    intro_strokes();
}

function random_int(min, max) {

    let floor = Math.ceil(min);
    let coil = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openModal(){
    
    if(innerWidth <= 429){
    
        window.scrollTo({
    
            top: 0,
            behavior: "smooth"
        });
    }
    
    modal.style.display = "block";
}

function closeModal(){

    modal.style.display = "none";
    
    window.scrollTo({
    
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

function select_canvas_ani(){

    let small_ctx = small_canvas.getContext("2d");
    
    small_ctx.clearRect(0, 0, small_canvas.width, small_canvas.height);

    small_ctx.fillStyle = "white";

	small_ctx.fillRect(0, 0, small_canvas.width, small_canvas.height);
    
    let medium_ctx = medium_canvas.getContext("2d");
    
    medium_ctx.clearRect(0, 0, medium_canvas.width, medium_canvas.height);

    medium_ctx.fillStyle = "white";

	medium_ctx.fillRect(0, 0, medium_canvas.width, medium_canvas.height);

    small_ctx.fillStyle = "black";
	
	for(let c = 0; c < 4; c++){

        for(let b = 0; b < 4; b++){

            small_ctx.beginPath();

            small_ctx.fillRect(((b * 24) + 8), ((c * 24) + 8), 2, 2);
        } 
    }
    
    

    medium_ctx.fillStyle = "black";
	
	for(let c = 0; c < 8; c++){

        for(let b = 0; b < 8; b++){

            medium_ctx.beginPath();

            medium_ctx.fillRect(((b * 12) + 2), ((c * 12) + 2), 2, 2);
        } 
    }
}

function select_size(can){

    new_room = {
        
        "size":false
    }

    if(can.dataset.size === "small"){
    
        small_canvas.className = "selected_canvas";
        medium_canvas.className = "non_selected";
        
        new_room.size = "small";
    }else if(can.dataset.size === "medium"){
    
        medium_canvas.className = "selected_canvas";
        small_canvas.className = "non_selected";
        
        new_room.size = "medium";
    }
}

function new_game_dom(){

    modal_name.style.display = "none";
    
    modal_first.style.display = "block";

    new_room = {
        
        "size":"medium"
    }
    
    small_canvas.className = "non_selected";
    
    medium_canvas.className = "selected_canvas";

    modal_cards.style.display = "none";

    play_again.style.display = "none";

    modal_title.innerText = "Select New Game Size";
    
    new_game2.style.display = "block";
    
    select_canvas_ani();

    openModal();  
}

function new_game(){
    
    new_game2.style.display = "none";

    closeModal();

    render_game();    
}

function change_name(){

    new_name_input.value = player_scores[0].name;

    modal_title.innerText = "Change Name";

    modal_first.style.display = "none";
    
    modal_name.style.display = "flex";
    
    modal_name.style.flexDirection = "column";
    
    modal_name.style.rowGap = "20px";
    
    let opt2a = [];
                                            
    opt2a[0] = document.createElement("option");
    opt2a[0].setAttribute("selected", true);
    opt2a[0].value = player_scores[0].team;
    opt2a[0].text = teams[initial_team].sign + " " + teams[initial_team].name + " team";
    msel2.add(opt2a[0]);
                                            
    for(let j = 1; j < 112; j++){
                                            
        if(j !== player_scores[0].team && j !== player_scores[1].team){
                                            
            opt2a[j] = document.createElement("option");
            opt2a[j].value = j;
            opt2a[j].text = teams[j].sign + " " + teams[j].name + " team";
            msel2.add(opt2a[j]);
        }
    }
    
    openModal();
}

function new_name(){

    player_scores[0].team = parseInt(msel2.value);
    
    player_scores[0].name = new_name_input.value;
    
    const human_img = document.getElementById("human_img");
    
    const human_name = document.getElementById("human_name");
    
    human_img.src = teams[player_scores[0].team].img;
    
    human_name.innerText = player_scores[0].name;
    
    modal_name.style.display = "none";
    
    modal_first.style.display = "block";
    
    closeModal();
}

function go_multiplayer(){

    alert("go multiplayer server");
}

// CLICK FLASH EFFECT

function printMousePos2(event){

    let y_offset;
  
    const current_relation = (innerWidth/innerHeight);
    let min = 100;
    let min_index = false;
    
    aspect_relations.forEach((relation, index)=>{
    
        if(Math.abs(relation.factor - current_relation) < min){
        
            min_index = index;
            min = Math.abs(relation.factor - current_relation);
        }
    })
    
    if(aspect_relations[min_index].offset === 0){
    
        y_offset = 0;
    }else{
    
        y_offset = (innerWidth/aspect_relations[min_index].offset);
    }

  let pure = document.getElementById('pure');
  pure.style.position = "absolute";
  pure.style.left = event.clientX - 40 + 'px';
  pure.style.top = event.clientY - 40 + y_offset + 'px';
  pure.className = "pure_end";

  let timeout = setTimeout(()=>{

        pure.className = "pure_start";
  }, 500)
}

function printMousePos1(event){

  let pure = document.getElementById('pure');
  pure.style.position = "absolute";
  pure.style.left = event.clientX - 40 + 'px';
  pure.style.top = event.clientY - 40 + 'px';
  pure.className = "pure_end";

  let timeout = setTimeout(()=>{

        pure.className = "pure_start";
  }, 500)
}


// CLICK FLASH EFFECT
