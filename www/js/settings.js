const p_template = document.createElement("p");
const p_key = p_template.cloneNode(1);
p_key.setAttribute("class", "key");
const div_row_template = document.createElement("div");
div_row_template.appendChild(p_key);
const input_template = document.createElement("input"); 
const button_template = document.createElement("button");
button_template.innerText = "set"; 
let id = 0;

document.getElementById("reset").addEventListener("click", function(){reset_settings(); location.reload()});

create_editfields(settings,document.getElementById("content"))

function create_editfields(object, parent){
    for(key in object){
        let id_copy = id;
        let key_copy = key;
        let div = div_row_template.cloneNode(1);
        let value = object[key];
        div.getElementsByClassName("key")[0].innerText = key + ": ";
        switch(typeof object[key]){
            case 'bigint':
                {
                    let input = input_template.cloneNode(1);
                    input.setAttribute("type", "number");
                    input.setAttribute("value", value);
                    input.setAttribute("id", id);
                    let button = button_template.cloneNode(1);
                    button.addEventListener("click", function(){
                        edit(object, key_copy, id_copy);
                    });
                    div.appendChild(input);
                    div.appendChild(button);
                    id++;
                }
                break;
            case 'boolean':
                {
                    let input = input_template.cloneNode(1);
                    input.setAttribute("type", "checkbox");
                    input.setAttribute("checked", value);
                    input.setAttribute("id", id);
                    let button = button_template.cloneNode(1);
                    button.addEventListener("click", function(){
                        edit(object, key_copy, id_copy);
                    });
                    div.appendChild(input);
                    div.appendChild(button);
                    id++;
                }
                break;
            case 'number':
                {
                    let input = input_template.cloneNode(1);
                    input.setAttribute("type", "number");
                    input.setAttribute("value", value);
                    input.setAttribute("id", id);
                    let button = button_template.cloneNode(1);
                    button.addEventListener("click", function(){
                        edit(object, key_copy, id_copy)
                    });
                    div.appendChild(input);
                    div.appendChild(button);
                    id++;
                }
                break;
            case 'object':
                create_editfields(object[key], div);
                break;
            case 'string':
                {
                    let input = input_template.cloneNode(1);
                    input.setAttribute("type", "text");
                    input.setAttribute("value", value);
                    input.setAttribute("id", id);
                    let button = button_template.cloneNode(1);
                    button.addEventListener("click", function(){
                        edit(object, key_copy, id_copy)
                    });
                    div.appendChild(input);
                    div.appendChild(button);
                    id++;
                }
                break;
            case 'symbol':
                {
                    let input = input_template.cloneNode(1);
                    input.setAttribute("type", "text");
                    input.setAttribute("value", value);
                    input.setAttribute("id", id);
                    let button = button_template.cloneNode(1);
                    button.addEventListener("click", function(){
                        edit(object, key_copy, id_copy)
                    });
                    div.appendChild(input);
                    div.appendChild(button);
                    id++;
                }
                break;
            case 'undefined':
                {
                    let input = input_template.cloneNode(1);
                    input.setAttribute("type", "text");
                    input.setAttribute("value", "undefined");
                    input.setAttribute("id", id);
                    let button = button_template.cloneNode(1);
                    button.addEventListener("click", function(){
                        edit(object, key_copy, id_copy)
                    });
                    div.appendChild(input);
                    div.appendChild(button);
                    id++;
                }
            default:
                console.error("typeof object[" + key + "]: " + typeof object[key])
                break;
        }
        parent.appendChild(div);
    }
}

function edit(object, key, id){
    if(document.getElementById(id).getAttribute("type") == "checkbox"){
        object[key] = Boolean(document.getElementById(id).checked);
    }else{
        object[key] = document.getElementById(id).value;
    }
    save_settings();
}