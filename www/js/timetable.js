document.addEventListener("deviceready", ondeviceready, false);
const parser = new DOMParser();
let monday = get_first_day_of_week(new Date(Date.now())).toDateString();
const timetable_now = settings.baseurl + settings.timetable_now;
const timetable_plusweek = settings.baseurl + settings.timetable_plusweek; 
const timetable_minusweek = settings.baseurl + settings.timetable_minusweek; 

function ondeviceready() {
    tryrequest(timetable_now);
    document.getElementById("week_back").addEventListener("click", function(){button(0)});
    document.getElementById("week_forward").addEventListener("click", function(){button(1)});
    document.getElementById("this_week").addEventListener("click", reset_button);
}

function remove_timetables(){
    while(Array.from(document.body.content.getElementsByTagName("table")).length > 0){
        document.body.content.getElementsByTagName("table")[0].remove()
    }
}

function button(how){
    monday = new Date(monday);
    if(how){
        monday = new Date(monday.getTime() + 7*86400000);
        monday = monday.toDateString();
        tryrequest(timetable_plusweek);
    }else{
        monday = new Date(monday.getTime() - 7*86400000);
        monday = monday.toDateString()
        tryrequest(timetable_minusweek);
    }
}

function reset_button(){
    monday = get_first_day_of_week(new Date(Date.now())).toDateString();
    tryrequest(timetable_now);
}

function tryrequest(timetable_next){
    let rendered = 0;
    document.getElementById("week_from").innerText = monday;
    if(localStorage.getItem(monday)){
        remove_timetables();
        render(JSON.parse(localStorage.getItem(monday)));
        rendered = 1;
    }
    if(checkConnection() == "NONE"){
        console.log("no connection");
        usernotify("offline");
        document.addEventListener("online", function(){request(timetable_next,{method: "get"}, function(response){callback(response, rendered)});}, false);
    }else{
        request(timetable_next,{method: "get"}, function(response){callback(response, rendered)});
    }        
}

/**
 * returns date of Monday of that week
 * @param {Date} date date of some day week
 * @returns {Date} date of first day of week
 */
function get_first_day_of_week(date){
    let day_of_week = date.getDay()
    if (day_of_week == 0){  //because here first day is actualy monday
        day_of_week = 6;
    }else{
        day_of_week--;
    }

    return new Date(date.getTime() - day_of_week * 86400000); //86400000 miliseconds perDay
}

/**
 * callback for request function
 * @param {Object} response 
 */
function callback(response, rendered = 0){
    let was_in_cache = 0;
    const objtable = parse(response);
    //lets update localstorage
    let monday_date = get_first_day_of_week(new Date(objtable.lessons[0][0])).toDateString();
    if(localStorage.getItem(monday_date)){
        //dif of saved timetable
        if(!(localStorage.getItem(monday_date) == JSON.stringify(objtable))){
            localStorage.setItem(monday_date, JSON.stringify(objtable));    
        }else{
            was_in_cache = 1;
        }
    }else{
        localStorage.setItem(monday_date, JSON.stringify(objtable));
    }
    if(!(was_in_cache & rendered)){
        remove_timetables();
        render(objtable);
    }
}

/**
 * function to actualy render timetable
 * @param {Object} objtable 
 */
function render(objtable = new Object()){
    document.body.content.appendChild(create_table(objtable));
}

/**
 * function to creatre table node with info from objtable
 * @param {Object} objtable object from parse function
 * @returns {HTMLTableElement}
 */
function create_table(objtable){

    //generate template th content
    const lesson_number_template = document.createElement("p");
    lesson_number_template.setAttribute("class", lesson_number_template.getAttribute("class") + " lesson_number");
    const lesson_usual_time_template = document.createElement("p");
    lesson_usual_time_template.setAttribute("class", lesson_usual_time_template.getAttribute("class") + " lesson_usual_time");

    //generate template th
    const th_template = document.createElement("th");
    th_template.appendChild(lesson_number_template.cloneNode(1));
    th_template.appendChild(lesson_usual_time_template.cloneNode(1));

    //finaly generate thead
    const thead = document.createElement("thead");
    thead.appendChild(document.createElement("tr"));
    {
        const th = th_template.cloneNode(1);
        thead.firstElementChild.appendChild(th);
    }

    objtable.classtimes.forEach(element => {
        const th = th_template.cloneNode(1);
        th.getElementsByClassName("lesson_number")[0].innerText = element.lessson_number;
        th.getElementsByClassName("lesson_usual_time")[0].innerText = element.time_from + " - " + element.time_to;
        thead.firstElementChild.appendChild(th);
    });

    //generate template td content
    const add_info_template = document.createElement("p");
    add_info_template.setAttribute("class", add_info_template.getAttribute("class") + " table_add_info");
    const add_info_left_template = add_info_template.cloneNode(1);
    add_info_left_template.setAttribute("class", add_info_left_template.getAttribute("class") + " table_add_info_left");
    const add_info_right_template = add_info_template.cloneNode(1);
    add_info_right_template.setAttribute("class", add_info_right_template.getAttribute("class") + " table_add_info_right");
    const lesson_name_template = document.createElement("p");
    lesson_name_template.setAttribute("class", lesson_name_template.getAttribute("class") + " table_lesson_name");
    
    //generate template td
    const td_template = document.createElement("td");
    const container_template = document.createElement("div");
    container_template.setAttribute("class", container_template.getAttribute("class") + " table_gridcontainer");
    

    container_template.appendChild(add_info_left_template.cloneNode(1));
    container_template.appendChild(add_info_right_template.cloneNode(1));
    container_template.appendChild(lesson_name_template.cloneNode(1));
    container_template.appendChild(add_info_left_template.cloneNode(1));
    container_template.appendChild(add_info_right_template.cloneNode(1));

    //finaly generate tbody
    const tbody = document.createElement("tbody");

    const th_body_template = document.createElement("th");

    objtable.lessons.forEach(element => {
        tbody.appendChild(document.createElement("tr"));
        //setting day prefix
        const th_body = th_body_template.cloneNode(1);
        th_body.innerText = element[0]
        tbody.lastElementChild.appendChild(th_body);
        let j = 0;

        //add td
        while(j < objtable.classtimes.length){
            tbody.lastElementChild.appendChild(td_template.cloneNode(0));
            j++;
        }

        //finaly add cells
        let i = 0; //which lesson from day
        j = 0; //which classtime from day
        while(i < element[1].length & j < objtable.classtimes.length){
            let lesson_time_from = new Date(element[1][i].lesson_time_from);
            let classtime_from_now = new Date(lesson_time_from.getTime());
            classtime_from_now.setHours(objtable.classtimes[j].time_from.split(":")[0], objtable.classtimes[j].time_from.split(":")[1]);

            if(lesson_time_from.getTime() <= classtime_from_now.getTime()){
                const container = container_template.cloneNode(1);

                //detect if lesson is in unusual time
                let lesson_time_to = new Date(element[1][i].lesson_time_to);
                let classtime_to_now = new Date(lesson_time_to.getTime());
                classtime_to_now.setHours(objtable.classtimes[j].time_to.split(":")[0], objtable.classtimes[j].time_to.split(":")[1]);

                if(lesson_time_to.getTime() != classtime_to_now.getTime()){
                    let info_edit = container.getElementsByClassName("table_add_info_right")[0];
                    info_edit.setAttribute("class", info_edit.getAttribute("class") + " unusual_time");   
                }

                if(lesson_time_from.getTime() != classtime_from_now.getTime()){
                    let info_edit = container.getElementsByClassName("table_add_info_left")[0];
                    info_edit.setAttribute("class", info_edit.getAttribute("class") + " unusual_time");   
                }

                //fill info
                container.getElementsByClassName("table_add_info_left")[0].innerText = element[1][i].lesson_time_from.match(/\d\d?:\d\d/m)[0];
                container.getElementsByClassName("table_add_info_right")[0].innerText = element[1][i].lesson_time_to.match(/\d\d?:\d\d/m)[0];
                container.getElementsByClassName("table_lesson_name")[0].innerText = element[1][i].lesson;
                container.getElementsByClassName("table_add_info_left")[1].innerText = element[1][i].teacher;
                container.getElementsByClassName("table_add_info_right")[1].innerText = element[1][i].classroom;
                
                const tds = Array.from(tbody.lastElementChild.children);
                tds[j+1].appendChild(container);    //+1 because of th
                i++;
                j=0;
            }else{
                j++;
            }
        }
    });

    const table = document.createElement("table");
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

/**
 * function to rearange lessons in objtable, so they are then sorted by day and time in array
 * @param {Object} objtable 
 * @returns {Object} objtable
 */
function rearange_table(objtable){
    //sort objtable
    objtable.lessons =  objtable.lessons.sort(function(lesson1, lesson2){
        let date1 = new Date(lesson1.lesson_time_from); 
        let date2 = new Date(lesson2.lesson_time_from); 
        return date1.getTime()-date2.getTime();
    });
    let sorted_day = new Array();
    let thisDate = new Date(objtable.lessons[0].lesson_time_from);
    let thisDatestring = thisDate.toDateString();

    let i = 0;
    while(i < objtable.lessons.length){
        let date = new Date(objtable.lessons[i].lesson_time_from);
        let dateindex = date.toDateString();
        if(dateindex == "Invalid Date"){
            console.error("invalid date");
        }
        if(thisDatestring != dateindex){
            sorted_day.push([thisDatestring, objtable.lessons.splice(0, i)]);
            thisDatestring = dateindex;
            i = 0;
        }else if(i+1 == objtable.lessons.length){
            sorted_day.push([thisDatestring, objtable.lessons.splice(0, objtable.lessons.length)]);
            i = 0;
        }
        i++;
    }
    objtable.lessons= sorted_day

    return objtable;
}

/**
 * function to parse gym-tisnov.edookit.net/timetable/to object
 * @param {Object} response
 * @returns {Object} objtable object (to be used in )
 */
function parse(response){
    let string = response.data;
    string = string.replace(/\n/gm, "");
    const doc = parser.parseFromString(string, "text/html");
    const table = doc.getElementById("prints-timetable").firstElementChild;
    const lessonbox = table.getElementsByClassName("lessonsBox")[0];

    //get classtimes
    let classtimestoextr = Array.from(table.getElementsByClassName("period-time"));
    let classtimes = new Array();
    classtimestoextr.forEach(element => {
        let time = element.getAttribute("title").trim().split(/\s/gm);

        if(time[0] == undefined | time[1]== undefined){
            console.error("missing lessontimes");
            usernotify("missing lessontimes: is this a week with valid lessons?");
            throw("missing lessontimes");
        }
        const classtime = {
            "lessson_number": time[0],
            "time_from": time[1].match(/\d\d?:\d\d(?=\–)/m)[0],
            "time_to": time[1].match(/(?<=–)\d\d?:\d\d/m)[0]
        }
        
        classtimes.push(classtime);
    });

    //get classes
    let objtable = {
        "classtimes": classtimes,
        "lessons": []
    };
    let children = Array.from(lessonbox.children);
    children.forEach(element => {
        if(element.firstElementChild != null){
            let children = Array.from(element.children)
            let i = 0;
            while (i < children.length){
                while(children[i].nodeName != "A"){
                    i++;
                    //not a beautifull solution :(
                    if(!(i < children.length)){
                        break;
                    }
                }
                if(i < children.length){
                    let divinfo = Array.from(children[i].getElementsByClassName("lessonRow"));             
                    let lesson = {
                        "lesson": "",
                        "teacher": "",
                        "classroom": "",
                        "lesson_full": "",
                        "teacher_full": "",
                        "classroom_full": "",
                        "lesson_time_from": "",
                        "lesson_time_to": "",
                        "teaching_content": ""
                    }

                    if(divinfo[0] != undefined){
                        lesson.lesson = divinfo[0].innerText.trim();
                    }
                    if(divinfo[1] != undefined){
                        lesson.teacher = divinfo[1].innerText.trim();
                    }
                    if(divinfo[2] != undefined){
                        lesson.classroom = divinfo[2].innerText.trim();
                    }
    
                    if((i+1) < children.length){
                        if(children[i+1].nodeName == "DIV"){
                            let divmoreinfo = Array.from(children[i+1].childNodes);
                            let j = 0;
                            while(j < divmoreinfo.length & children[i].firstChild != undefined){
                                if(divmoreinfo[j].nodeName == "DIV" | divmoreinfo[j].nodeName == "#text"){
                                    if(divmoreinfo[j].nodeName == "#text"){
                                        divmoreinfo[j].innerText = divmoreinfo[j].wholeText;
                                    }
                                    if(/[A-ZÁČĎÉĚÍŇÓŘŠŤUÚŮÝŽ][a-záčďéěíňóřšťuúůýž]+\s*(\d\d?).\s*(\d\d?).\d\d?:\d\d\–\d\d?:\d\d/m.test(divmoreinfo[j].innerText)){
                                        if(children[i].firstElementChild.nodeType = "SPAN"){
                                            if(children[i].firstElementChild.getAttribute("data-day") != undefined){
                                                let lesson_time = children[i].firstElementChild.getAttribute("data-day").match(/\d+(?=_)/m)[0];
                                                let match_array = divmoreinfo[j].innerText.trim().replace("\n", " ").match(/(\d\d?)./gm); //this horrible hack is here to change day. month. to month. day. 
                                                lesson_time = lesson_time + " " + match_array[1] + " " + match_array[0];
                                                lesson.lesson_time_from = lesson_time + " " + divmoreinfo[j].innerText.trim().replace("\n", " ").match(/\d\d?:\d\d(?=\–)/m)[0];
                                                lesson.lesson_time_to = lesson_time + " " + divmoreinfo[j].innerText.trim().replace("\n", " ").match(/(?<=–)\d\d?:\d\d/m)[0];
                                            }
                                        }
                                    }
                                }
                                j++;
                            }

                            divmoreinfo = divmoreinfo = Array.from(children[i+1].children);
                            if(divmoreinfo[0] != undefined){
                                lesson.lesson_full = divmoreinfo[0].innerText.trim();
                                if(lesson.lesson ==""){
                                    lesson.lesson = lesson.lesson_full;
                                }
                            }
                            if(divmoreinfo[1] != undefined){
                                lesson.teacher_full = divmoreinfo[1].innerText.trim();
                            }
                            if(divmoreinfo[2] != undefined){
                                lesson.classroom_full = divmoreinfo[2].innerText.trim();
                            }
                            if(divmoreinfo[4] != undefined){
                                lesson.teaching_content = divmoreinfo[4].innerText.trim();
                            }

                            i++;
                        }
                    }

                    objtable.lessons.push(lesson);
                    i++;
                }
            }
        }
    });
    objtable = rearange_table(objtable);
    return objtable;
}