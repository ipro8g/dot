function render_game(){

    let map;
    
    play_squares = [];

    if(new_room){

        if(new_room.size === "small"){

            map = JSON.stringify(small_squares_map);
        
        }else{
        
            map = JSON.stringify(medium_squares_map);    
        }
    }else{
    
        if(start_flag){
        
            initial_team = random_int(0,110);

            map = JSON.stringify(small_squares_map);
        }else{
        
            map = JSON.stringify(medium_squares_map);
        }
    }
    
    play_squares = JSON.parse(map); 
        
    players_divs = [];
    
    players_dom_scores = [];
    
    const random1 = initial_team;
    
    let random2 = random_int(0,110);
    
    while(random2 === random1){
        
        random2 = random_int(0,110);
    }
    
    if(player_scores){
    
        while(random2 === player_scores[0].team){
        
            random2 = random_int(0,110);
        }
    
        player_scores = [
        
            {
                "name":player_scores[0].name,
                "score":0,
                "team":player_scores[0].team
            },
            {
                "name":"computer",
                "score":0,
                "team":random2
            }
        ]; 
    }else{
    
        player_scores = [
            {
                "name":"human",
                "score":0,
                "team":random1
            },
            {
                "name":"computer",
                "score":0,
                "team":random2
            }
        ]; 
    }
    
    const remove_d = document.querySelectorAll(".players_div");
    
    remove_d.forEach((d)=>{
    
        players_container.removeChild(d);        
    })    
    
    const remove_d2 = document.querySelectorAll(".players_active_div");
    
    remove_d2.forEach((d2)=>{
    
        players_container.removeChild(d2);        
    })   
        
    player_scores.forEach((player, index)=>{
    
        let d = document.createElement("div");
        d.setAttribute("class", "players_div");
    
        let i = document.createElement("img");
        i.setAttribute("src", teams[player.team].img);
        i.setAttribute("class", "players_i");
        
        
        if(index === 0){
        
            i.setAttribute("id", "human_img");
        }
        
        d.appendChild(i);
    
        let p = document.createElement("p");
        p.setAttribute("class", "players_p");
        p.innerText = player.name;
        
        if(index === 0){
        
            p.setAttribute("id", "human_name");
        
        }
        
        d.appendChild(p);
        
        let ps = document.createElement("p");
        ps.setAttribute("class", "players_dom_scores");
        ps.innerText = player.score;
        d.appendChild(ps);
        players_dom_scores.push(ps);
        
        players_container.prepend(d);
        players_divs.push(d);
    })    
    
    main_ctx = canvas.getContext("2d");
    
    main_ctx2 = canvas2.getContext("2d");
    
    main_ctx2.fillStyle = "LightSeaGreen";

    main_ctx.clearRect(0, 0, canvas.width, canvas.height);

    const back_colors = ["Indigo","MidnightBlue","DarkGreen","DarkRed"];

    main_ctx.fillStyle = back_colors[random_int(0,3)];

	main_ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	main_ctx.fillStyle = "White";
	
	const first_turn = random_int(0, 1);
	
	if(new_room){
	
	    myroom = {
	
	        "size":new_room.size,
	        "current_turn":first_turn
	    }   
	
	}else{
	
	    if(start_flag){
	
	        myroom = {
	
	            "size":"small",
	            "current_turn":first_turn
	        }
	    }else{
	
	        myroom = {
	
	            "size":"medium",
	            "current_turn":first_turn
	        }
	    }
	}
	
	gen_map(myroom.size);
	
	//GENERATE DOTS MAP
    
    players_divs[myroom.current_turn].className = "players_active_div";
        
    if(first_turn === 0){ 
    
	    ismyturnflag = true; 
	}else{
	
	    ismyturnflag = false; 
	    computer_turn();
	}
	
	canvas2.addEventListener("click", get_coords);
}

function get_coords(event){

    printMousePos2(event);

    if(!ismyturnflag){
    
        return;
    }else{
    
        ismyturnflag = false;
    }
    
    let iax;
    let iay;
    let ibx;
    let iby;

    let x = event.offsetX * canvas2.width / canvas2.clientWidth;
    let y = event.offsetY * canvas2.height / canvas2.clientHeight;
    
    let line_result = false;
    
    if(myroom.size === "small"){
    
        play_squares.forEach((square)=>{
        
            square.lines.forEach((line)=>{
            
                if(line.vertical){
                
                    if((y > (line.ay + 48) && y < (line.by - 48)) && (x >= (line.ax - 42) && x <= (line.ax + 42)) && (!line.painted)){
                    
                        iax = line.iax;
                        iay = line.iay;
                        ibx = line.ibx;
                        iby = line.iby;
                        line_result = true;
                    }
                }else{
                
                
                    if((x > (line.ax + 48) && x < (line.bx - 48)) && (y >= (line.ay - 42) && y <= (line.ay + 42)) && (!line.painted)){
                    
                        iax = line.iax;
                        iay = line.iay;
                        ibx = line.ibx;
                        iby = line.iby;
                        line_result = true;
                    }       
                }    
            })
        })
    }else if(myroom.size === "medium"){
    
        play_squares.forEach((square)=>{
        
            square.lines.forEach((line)=>{
            
                if(line.vertical){
                
                    if((y > (line.ay + 24) && y < (line.by - 24)) && (x >= (line.ax - 21) && x <= (line.ax + 31)) && (!line.painted)){
                    
                        iax = line.iax;
                        iay = line.iay;
                        ibx = line.ibx;
                        iby = line.iby;
                        line_result = true;
                    }
                }else{
                
                
                    if((x > (line.ax + 24) && x < (line.bx - 24)) && (y >= (line.ay - 40) && y <= (line.ay + 50)) && (!line.painted)){
                    
                        iax = line.iax;
                        iay = line.iay;
                        ibx = line.ibx;
                        iby = line.iby;
                        line_result = true;
                    }       
                }    
            })
        })
    }
    
    if(!line_result){
    
            ismyturnflag = true;
    
            return;
    }
    
    let flag_computer_turn = true;
    
    play_squares.forEach((square, psq_indx)=>{
        
            let cont1 = 0;
            
            square.lines.forEach((line)=>{
            
                if(line.painted){
                
                    cont1++;
                }
            
                if((iax === line.iax && iay === line.iay) && (ibx === line.ibx && iby === line.iby)){
                
                    if(line.vertical){
                    
                            animate_vline(line);
                    }else{
                    
                        animate_hline(line);
                    }
                    
                    line.painted = true;
                
                    cont1++;
                }     
            })
            
            if(cont1 >= 4 && !square.painted){
                    
                        main_ctx2.strokeStyle = "Gold";
                
                        players_dom_scores[0].innerText = parseInt(players_dom_scores[0].innerText) + 1;
                        
                        if(myroom.size === "small"){
                        
                            main_ctx.drawImage(team_imgs[player_scores[0].team], (square.lines[0].ax + 20), (square.lines[0].ay + 20), 170, 170);
                            
                        }else if(myroom.size === "medium"){
                        
                            main_ctx.drawImage(team_imgs[player_scores[0].team], (square.lines[0].ax + 15), (square.lines[0].ay + 15), 80, 80);
                        }
                        
                animate_square(square);
                
                sound1.play();
                
                square.painted = true;
                
                flag_computer_turn = false;
                
                ismyturnflag = true;
            }
     })
    
        const continue_flag = check_game_continue();
        
        if(myroom.size === "small" && continue_flag >= 9){
        
            end_game();
            return;
        }else if(myroom.size === "medium" && continue_flag >= 49){
        
            end_game();
            return;
        }
            
        if(flag_computer_turn){
        
                players_divs[0].className = "players_div";
            
                players_divs[1].className = "players_active_div";

        		computer_turn();
        		
        		sound2.play();
        }  
				
		return;      
}

function computer_turn(){

    setTimeout(()=>{

    //is there any square to fill?
    
    const continue_flag = check_game_continue();
        
    if(myroom.size === "small" && continue_flag >= 9){
        
        end_game();
        return;
    }else if(myroom.size === "medium" && continue_flag >= 49){
        
        end_game();
        return;
    }

    //options will save an array of squares with three painted lines to fill

    let options = [];

    play_squares.forEach((square)=>{
    
        let cont_lines = 0;
        
        square.lines.forEach((line)=>{
        
            if(line.painted){
            
                cont_lines++;
            }
        })
        
        if(cont_lines === 3){
            
            square.lines.forEach((line)=>{
            
                if(!line.painted){
            
                    options.push(line);
                }
            })
        }
    })
    
    //among all options, better to find a line to fill two squares
    
    const double_result = search_double(options);
    
    if(double_result.result){
    
        			computer_double(double_result); 
        
        			computer_turn();
        
        		return;  
    }
    
    //with no doubles, any option is good
    
    if(options.length > 0){
    
        			any_square(options[random_int(0, (options.length - 1))]);

        			computer_turn();
     
        	    return;
    }
    
    //if not options, any square under 2 painted lines
    
    options = []
    
    play_squares.forEach((square1, index1)=>{
    
        let cont_lines = 0;
        
        square1.lines.forEach((line1)=>{
        
            if(line1.painted){
            
                cont_lines++;
            }
        })
        
        if(cont_lines < 2){
        
            //this square is good candidate, but can be part of another square who have 2 painted lines
        
            let detect_flag = false;
            
            //detect if the line1 is part of another square and check it
            
            square1.lines.forEach((line1)=>{
            
            play_squares.forEach((square2, index2)=>{
            
                square2.lines.forEach((line2)=>{
                
                    //line1 is part of another square2, now lets see if this square has 2 painted lines
                    
                    if(line1.iax === line2.iax && line1.iay === line2.iay && line1.ibx === line2.ibx && line1.iby === line2.iby && index1 !== index2 && !line1.painted){
                    
                        let cont_lines3 = 0;
        
                        square2.lines.forEach((line3)=>{
        
                            if(line3.painted){
            
                                cont_lines3++;
                            }
                        })
                        
                        //cont_lines3 is over 2 this means that square1 has a shared line with square2 who have at least 2 painted lines
                        //so it cannot be candidate, we dont want square2 to have 3 painted lines dah!
                        
                        if(cont_lines3 > 1){ 
                        
                            detect_flag = true;
                        }                 
                    }
                })  
            })
            
                //finally this line is elegible, its square is under 2 painted lines and we have not detected that is part of another square with 2 lines
            
                if(!detect_flag && !line1.painted){
            
                    options.push(line1);
            
                }
            
            })
        }
    })
    
    if(options.length > 0){
    
        			any_line(options[random_int(0, (options.length - 1))]);
            
    				players_divs[1].className = "players_div";
            
   				 	players_divs[0].className = "players_active_div";
        
    				ismyturnflag = true;
    				
    				sound3.play();
    }else{
    
    //if there is no option, calculate costs
    //costs are the squares number that my rival will make if we fill a specific line
    //first lets see all non painted lines, that are part of a square who have 2 painted lines
    
                    let new_options = search_lines();
                    
                    if(new_options.length > 1){
                    
                        const json_string_map = JSON.stringify(play_squares);
                    
                        //let simulate all options to see the less cost and make the decision
                        
                        let costs = [];
                        
                        new_options.forEach((line)=>{
                        
                            costs.push(line_cost(line, json_string_map));
                        })
                        
                        //minimum cost index
                        
                        let min = 50;
                        let min_index;
                        
                        costs.forEach((cost, index)=>{
                        
                            if(cost < min){
                            
                                min = cost;
                                min_index = index;
                            }
                        })
                        
                        //finally draw the line with less cost
                        any_line(new_options[min_index]);
                    }else{
    
        			    any_line(false);
        			
        			}
            
    				players_divs[1].className = "players_div";
            
    				players_divs[0].className = "players_active_div";
        
    				ismyturnflag = true;
    				
    				sound3.play();
    }
    
    

	},(500 + (random_int(0, 9)*100)));
				
	return;
}

function simulate_cost(string_map){

    let ensure_line = true;

    let squares_before = 0;

    let squares_after = 0;

    let json_map = JSON.parse(string_map);
    
    json_map.forEach((square)=>{
    
        if(square.painted){
        
            squares_before++;
        }
    })
    
    while(ensure_line){
    
    ensure_line = false;
    
    json_map.forEach((square)=>{
    
        let cont3 = 0;
    
        square.lines.forEach((line)=>{
        
            if(line.painted){
            
                cont3++;
            }    
        })    
        
        if(cont3 === 3){
        
            square.lines.forEach((line)=>{
        
                if(!line.painted){
                
                    ensure_line = line;
                }    
            })    
        }
    })
    
    if(ensure_line){
    
    json_map.forEach((square)=>{
    
        let cont4 = 0;
    
        square.lines.forEach((line)=>{
        
            if(line.iax === ensure_line.iax && line.iay === ensure_line.iay && line.ibx === ensure_line.ibx && line.iby === ensure_line.iby){
            
                line.painted = true;
            }    
        })
        
        square.lines.forEach((line)=>{
        
            if(line.painted){
            
                cont4++;    
            }
        })
        
        if(cont4 === 4){
        
            square.painted = true;
        } 
    })
    
    }
    
    }
    
     json_map.forEach((square)=>{
     
        if(square.painted){
        
            squares_after++;    
        }
     })
    
    return (squares_after - squares_before);
}

function line_cost(option, string_map){

    let play_squares_copy = JSON.parse(string_map);
    
    play_squares_copy.forEach((square)=>{
    
        square.lines.forEach((line)=>{
        
            if(line.iax === option.iax && line.iay === option.iay && line.ibx === option.ibx && line.iby === option.iby){
            
                line.painted = true;
            }
        })
    })

    const squares_map = JSON.stringify(play_squares_copy);
    
    return simulate_cost(squares_map);  
}

function search_lines(){

    let options = [];
    
    play_squares.forEach((square)=>{
    
        let cont2 = 0;
    
        square.lines.forEach((line)=>{
        
            if(line.painted){
            
                cont2++;
            }    
        })
        
        if(cont2 === 2){
        
            square.lines.forEach((line)=>{
        
                if(!line.painted){
            
                    options.push(line);
                }    
            })
        }
    })
    
    //remove duplicates
    let new_options = [];
    
    options.forEach((line1)=>{
    
        let flag = false;
    
        new_options.forEach((line2)=>{
        
            if((line1.iax === line2.iax && line1.iay === line2.iay) && (line1.ibx === line2.ibx && line1.iby === line2.iby)){
            
                flag = true;    
            }
        })
        
        if(!flag){
        
            new_options.push(line1);
        }
    })
    
    return new_options;
}

function any_line(the_line){

    if(the_line){

    play_squares.forEach((square)=>{
    
        square.lines.forEach((line)=>{
        
            if((line.iax === the_line.iax && line.iay === the_line.iay) && (line.ibx === the_line.ibx && line.iby === the_line.iby)){
            
                if(line.vertical){
                    
                        animate_vline(line);
                }else{
                    
                        animate_hline(line);
                }
            
                line.painted = true;
            }
        })
    }) 
   }else{
   
        let options = [];
        
        play_squares.forEach((square)=>{
    
            square.lines.forEach((line)=>{
            
                if(!line.painted){
                
                    options.push(line);
                }
            }) 
       })
       
       const win_line = options[random_int(0, options.length - 1)];
       
       play_squares.forEach((square)=>{
    
            square.lines.forEach((line)=>{
            
                if((line.iax === win_line.iax && line.iay === win_line.iay) && (line.ibx === win_line.ibx && line.iby === win_line.iby)){
            
                if(line.vertical){
                    
                        animate_vline(line);
                }else{
                    
                        animate_hline(line);
                }
            
                    line.painted = true;
                }
            }) 
       })
   }
}

function any_square(the_line){

    play_squares.forEach((square)=>{
    
            //this square has 3 lines painted?
    
            let cont3 = 0;
            
            square.lines.forEach((line)=>{
            
                if(line.painted){
                    
                    cont3++;
                }
            })
        
            square.lines.forEach((line)=>{
            
                if((line.iax === the_line.iax && line.iay === the_line.iay) && (line.ibx === the_line.ibx && line.iby === the_line.iby)){
                
                    line.painted = true;
                    
                    if(line.vertical){
                    
                        animate_vline(line);
                    }else{
                    
                        animate_hline(line);
                    }
                        
                        if(!square.painted && cont3 === 3){
                    
                        if(myroom.size === "small"){
                        
                            main_ctx.drawImage(team_imgs[player_scores[1].team], (square.lines[0].ax + 20), (square.lines[0].ay + 20), 170, 170);
                            
                        }else if(myroom.size === "medium"){
                        
                            main_ctx.drawImage(team_imgs[player_scores[1].team], (square.lines[0].ax + 15), (square.lines[0].ay + 15), 80, 80);
                        }
                    
                            square.painted = true;
                    
                            players_dom_scores[1].innerText = parseInt(players_dom_scores[1].innerText) + 1;
                    
                            animate_square(square);
                            
                            sound4.play();
                        }
                }
            })
        })    
}

function computer_double(double_result){

    play_squares.forEach((square)=>{
        
            square.lines.forEach((line)=>{
            
                if((line.iax === double_result.iax && line.iay === double_result.iay) && (line.ibx === double_result.ibx && line.iby === double_result.iby) && !line.painted){
                
                    line.painted = true;
                    
                    if(line.vertical){
                    
                        animate_vline(line);
                    }else{
                    
                        animate_hline(line);
                    }
                    
                        square.painted = true;
                    
                        if(myroom.size === "small"){
                        
                            main_ctx.drawImage(team_imgs[player_scores[1].team], (square.lines[0].ax + 20), (square.lines[0].ay + 20), 170, 170);
                            
                        }else if(myroom.size === "medium"){
                        
                            main_ctx.drawImage(team_imgs[player_scores[1].team], (square.lines[0].ax + 15), (square.lines[0].ay + 15), 80, 80);
                        }
                    
                        players_dom_scores[1].innerText = parseInt(players_dom_scores[1].innerText) + 1;
                    
                        animate_square(square);
                        
                        sound4.play();
                    
                }
            })
        }) 
}

function search_double(options){

    let obj = {
    
        "result":false,
        "iax":false,
        "iay":false,
        "ibx":false,
        "iby":false
    }

    options.forEach((line1, index1)=>{
    
        options.forEach((line2, index2)=>{
        
            if(line1.iax === line2.iax && line1.iay === line2.iay && line1.ibx === line2.ibx && line1.iby === line2.iby && index1 !== index2){
            
    
                obj.result = true;
                obj.iax = line2.iax;
                obj.iay = line2.iay;
                obj.ibx = line2.ibx;
                obj.iby = line2.iby;
                
                return obj;
            }
        })    
    })
    
    return obj;    
}

function end_game(){

    start_flag = false;

    modal_name.style.display = "none";
    
    modal_first.style.display = "block";

    new_game2.style.display = "none";
    
    modal_cards.style.display = "flex";
    
    modal_cards.style.flexDirection = "row";
    
    modal_cards.style.justifyContent = "center";

    let max = -1;
    let win_index = false;
    
    players_dom_scores.forEach((p, index)=>{
    
        if(parseInt(p.innerText) > max){
        
            max = parseInt(p.innerText);
            win_index = index;
        }
    })

    modal_title.innerText = player_scores[win_index].name + ", won the game";
    
    const remove_el = document.querySelectorAll(".grid-itemb");
    
    remove_el.forEach((card)=>{
    
        modal_cards.removeChild(card);        
    })

    player_scores.forEach((pl, index)=>{

        let card = document.createElement("div");
        card.setAttribute("class", "grid-itemb");
        
        let h3 = document.createElement("h3");  
        
        h3.innerText = teams[pl.team].name + " Team";
        
        let imgt = document.createElement("img");
        imgt.setAttribute("src", teams[pl.team].img);
        imgt.setAttribute("class", "team_img");
        
        let p3 = document.createElement("h3");
        p3.innerText = players_dom_scores[index].innerText;
    
        card.appendChild(h3);
        card.appendChild(imgt);
        card.appendChild(p3);
        modal_cards.appendChild(card);
    })
    
    play_again.style.display = "block";
    
    openModal();
    
    select_canvas_ani();
}

function check_game_continue(){
     
      let cont = 0;
     
      play_squares.forEach((square)=>{
      
        if(square.painted){
        
            cont++;
        }
      })
      
      return cont;
}

function gen_map(opt){

    if(opt === "small"){
    
        small_dots = [];
	
	    for(let c = 0; c < 4; c++){

            for(let b = 0; b < 4; b++){
                
                let dot_ob = {
                    "x":(75 + (b * 210)),
                    "y":(60 + (c * 220)),
                    "ix":b,
                    "iy":c
                }
                
                small_dots.push(dot_ob);
            }         
        }
        
        //GENERATE SQUARES, LINES MAP
        
        small_dots.forEach((dot)=>{
        
           play_squares.forEach((square)=>{
        
                square.lines.forEach((line)=>{
            
                    if(dot.ix === line.iax && dot.iy === line.iay){
                    
                        line.ax = dot.x;
                        line.ay = dot.y;
                    }else if(dot.ix === line.ibx && dot.iy === line.iby){
                    
                        line.bx = dot.x;
                        line.by = dot.y;
                    }
                    
                    if(line.iby > line.iay){
                    
                        line.vertical = true;    
                    }
                })
            })    
        })        
        
        main_ctx.strokeStyle = "LightSeaGreen";
        main_ctx.setLineDash([10, 60]);
        main_ctx.lineWidth = 4;
        
        play_squares.forEach((square)=>{
        
            square.lines.forEach((line)=>{
            
                    main_ctx.beginPath();
                    main_ctx.moveTo(line.ax, line.ay);
                    main_ctx.lineTo(line.bx, line.by);
                    main_ctx.stroke();
            })
        })
        
        main_ctx.strokeStyle = "White";
        main_ctx.setLineDash([]);
        main_ctx.lineWidth = 4;
        
        for(let c = 0; c < 4; c++){

            for(let b = 0; b < 4; b++){

                main_ctx.beginPath();

                main_ctx.arc((75 + (b * 210)), (60 + (c * 220)), 8, 0, 2 * Math.PI);
                
                main_ctx.fill();
            }
        }
	}else if(opt === "medium"){
	
	    medium_dots = [];
	
	    for(let c = 0; c < 8; c++){

            for(let b = 0; b < 8; b++){
                
                let dot_ob = {
                    "x":(37.5 + (b * 105))-20,
                    "y":(30 + (c * 110))-15,
                    "ix":b,
                    "iy":c
                }
                
                medium_dots.push(dot_ob);
            }         
        }
        
        //GENERATE SQUARES, LINES MAP
        
        medium_dots.forEach((dot)=>{
        
           play_squares.forEach((square)=>{
        
                square.lines.forEach((line)=>{
            
                    if(dot.ix === line.iax && dot.iy === line.iay){
                    
                        line.ax = dot.x;
                        line.ay = dot.y;
                    }else if(dot.ix === line.ibx && dot.iy === line.iby){
                    
                        line.bx = dot.x;
                        line.by = dot.y;
                    }
                    
                    if(line.iby > line.iay){
                    
                        line.vertical = true;    
                    }
                })
            })    
        })        
        
        main_ctx.strokeStyle = "LightSeaGreen";
        main_ctx.setLineDash([5, 30]);
        main_ctx.lineWidth = 2;
        
        play_squares.forEach((square)=>{
        
            square.lines.forEach((line)=>{
            
                    main_ctx.beginPath();
                    main_ctx.moveTo(line.ax, line.ay);
                    main_ctx.lineTo(line.bx, line.by);
                    main_ctx.stroke();
            })
        })
        
        main_ctx.strokeStyle = "White";
        main_ctx.setLineDash([]);
        main_ctx.lineWidth = 4;
        
        play_squares.forEach((square, indx)=>{
        
                    if(((indx+1)%7) === 0){
            
                        main_ctx.beginPath();
                        main_ctx.arc(square.lines[0].ax, square.lines[0].ay, 6, 0, 2 * Math.PI);
                        main_ctx.fill();
            
                        main_ctx.beginPath();
                        main_ctx.arc(square.lines[0].bx, square.lines[0].by, 6, 0, 2 * Math.PI);
                        main_ctx.fill();
            
                        main_ctx.beginPath();
                        main_ctx.arc(square.lines[2].ax, square.lines[2].ay, 6, 0, 2 * Math.PI);
                        main_ctx.fill();
            
                        main_ctx.beginPath();
                        main_ctx.arc(square.lines[2].bx, square.lines[2].by, 6, 0, 2 * Math.PI);
                        main_ctx.fill();
                    
                    }else{
            
                        main_ctx.beginPath();
                        main_ctx.arc(square.lines[0].ax, square.lines[0].ay, 6, 0, 2 * Math.PI);
                        main_ctx.fill();
            
                        main_ctx.beginPath();
                        main_ctx.arc(square.lines[0].bx, square.lines[0].by, 6, 0, 2 * Math.PI);
                        main_ctx.fill();
                    
                    }
        })   
	}
}

function animate_square(square){

    main_ctx2.strokeStyle = "Gold";
                
                            const time2a = setTimeout(()=>{
                                
                            let w = 64;
                        
                            const inter2 = setInterval(()=>{
                            
                                main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                
                                main_ctx2.lineWidth = w;
                
                                main_ctx2.beginPath();
                
                                main_ctx2.rect(square.lines[0].ax, square.lines[0].ay, square.lines[3].bx-square.lines[3].ax, square.lines[0].by-square.lines[0].ay);
                
                                main_ctx2.stroke(); 
                                
                                w /= 2;
                                
                                if(w <= 2){
                                
                                    main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                                
                                    clearInterval(inter2);
                                }      
                            },100);
                        }, 350);
}

function animate_hline(line){
                            
    main_ctx2.fillStyle = "White";         

    let dx = line.ax;
                        
                            let dtime2 = 1;
                            
                            const time2 = setInterval(()=>{
                                main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);           
                                            
                                main_ctx2.beginPath();
                                            
                                main_ctx2.arc(line.ax, line.ay, (7*dtime2), 0, 2 * Math.PI);
                
                                main_ctx2.fill();
                                
                                dtime2++;
                                
                                if(dtime2 > 4){
                                
                                    clearInterval(time2); 
                                    
                                    main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);   
                                }
                            }, 50);
                        
                        const time1 = setInterval(()=>{
                        
                                        main_ctx.beginPath();
                                        main_ctx.moveTo(dx, line.ay); 
                                        dx = dx + ((line.bx-line.ax)/(1000/(line.bx-line.ax))) - 1;
                        
                                        if(dx >= line.bx){
                                        
                                            clearInterval(time1);
                                            
                                                let dtime2 = 1;
                            
                                                const time2 = setInterval(()=>{
                        
                                                main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                                            
                                                main_ctx2.beginPath();
                                            
                                                main_ctx2.arc(line.bx, line.by, (7*dtime2), 0, 2 * Math.PI);
                
                                                main_ctx2.fill();
                                
                                                dtime2++;
                                
                                                if(dtime2 > 4){
                                
                                                    clearInterval(time2); 
                                    
                                                    main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);   
                                                }
                                            }, 50);
                                        }
                                        
                                        main_ctx.lineTo(dx, line.by);
                                        main_ctx.stroke();
                                        
                                    },200/(1000/(line.bx-line.ax)));
}

function animate_vline(line){
                            
                            main_ctx2.fillStyle = "White";

                            let dy = line.ay;
                            
                            let dtime2 = 1;
                            
                            const time2 = setInterval(()=>{
                        
                                main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                                           
                                main_ctx2.beginPath();
                                            
                                main_ctx2.arc(line.ax, line.ay, (7*dtime2), 0, 2 * Math.PI);
                
                                main_ctx2.fill();
                                
                                dtime2++;
                                
                                if(dtime2 > 4){
                                
                                    clearInterval(time2); 
                                    
                                    main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);   
                                }
                            }, 50);
                            
                            const time1 = setInterval(()=>{
                        
                                        main_ctx.beginPath();
                                        main_ctx.moveTo(line.ax, dy);    
                                        dy = dy + ((line.by-line.ay)/(1000/(line.by-line.ay))) - 3;
                                        
                                        if(dy >= line.by){
                                        
                                            clearInterval(time1);
                                            
                                            let dtime2 = 1;
                            
                                            const time2 = setInterval(()=>{
                        
                                                main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                                            
                                                main_ctx2.beginPath();
                                            
                                                main_ctx2.arc(line.bx, line.by, (7*dtime2), 0, 2 * Math.PI);
                
                                                main_ctx2.fill();
                                
                                                dtime2++;
                                
                                                if(dtime2 > 4){
                                
                                                    clearInterval(time2); 
                                    
                                                    main_ctx2.clearRect(0, 0, canvas2.width, canvas2.height);   
                                                }
                                            }, 50);
                                        }
                                        
                                        main_ctx.lineTo(line.bx, dy);
                                        main_ctx.stroke();
                                    },200/(1000/(line.by-line.ay)));
}
