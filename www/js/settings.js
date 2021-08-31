const p_template = document.createElement("p");
const p_key = p_template.cloneNode(1);
p_key.setAttribute("class", "key");
const div_row_template = document.createElement("div");
div_row_template.appendChild(p_key);

create_editfields(settings,document.getElementById("content"))

function create_editfields(object, parent){
    for(key in object){
        let div = div_row_template.cloneNode(1);
        div.getElementsByClassName("key")[0].innerText = key + ": ";
        switch(typeof object[key]){
            case 'bigint':
                {
                    let p = p_template.cloneNode(1);
                    p.innerText = object[key];
                    div.appendChild(p);
                }
                break;
            case 'boolean':
                {
                    let p = p_template.cloneNode(1);
                    p.innerText = object[key];
                    div.appendChild(p);
                }
                break;
            case 'number':
                {
                    let p = p_template.cloneNode(1);
                    p.innerText = object[key];
                    div.appendChild(p);
                }
                break;
            case 'object':
                create_editfields(object[key], div);
                break;
            case 'string':
                {
                    let p = p_template.cloneNode(1);
                    p.innerText = "\"" + object[key] + "\"";
                    div.appendChild(p);
                }
                break;
            case 'symbol':
                {
                    let p = p_template.cloneNode(1);
                    p.innerText = object[key];
                    div.appendChild(p);
                }
                break;
            case 'undefined':
                {
                    let p = p_template.cloneNode(1);
                    p.innerText = "undefined";
                    div.appendChild(p);
                    break;
                }
            default:
                console.error("typeof object[" + key + "]: " + typeof object[key])
                break;
        }
        parent.appendChild(div);
    }
}