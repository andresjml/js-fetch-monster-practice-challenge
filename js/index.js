
function changePag(){
    let page=1
    let forw=document.getElementById('forward')
    let back=document.getElementById('back')
    forw.addEventListener('click', function(){
        page++
        clearContainer();
        fetchMonsters(page);
        console.log(page)
    })
    back.addEventListener('click', function(){
        page--
        clearContainer()
        fetchMonsters(page);
        console.log(page)
    })

}


function fetchMonsters(page){    
    fetch (`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(resp => resp.json())
    .then(json => displayMonsters(json));
}



function displayMonsters(monsters){
    let div= document.getElementById('monster-container')
    monsters.forEach(element => {
        let div2= document.createElement('div')
        div2.id=element.id
        let h1 = document.createElement('h1')
        h1.innerText=element.name
        div2.appendChild(h1)
        let h2 = document.createElement('h2')
        h2.innerText=element.age
        div2.appendChild(h2)
        let p = document.createElement('p')
        p.innerText=element.description
        div2.appendChild(p)
                
        div.appendChild(div2)
    });
    
}

function clearContainer(){
    let div= document.getElementById('monster-container')
    while (div.firstChild) {
        div.removeChild(div.firstChild);
      }
}

function addData(){
    let form = document.getElementById('monster-form')

    form.addEventListener('submit',function(e){
        e.preventDefault()
        let formData = {
            name:`${e.target[0].value}`,
            age:`${e.target[1].value}`,
            description:`${e.target[2].value}`
        }
        let configObj= {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        }
        fetch('http://localhost:3000/monsters',configObj)
        
        e.target[0].value=""
        e.target[1].value=""
        e.target[2].value=""

    })
}


window.addEventListener('DOMContentLoaded', function(){
    fetchMonsters(1)
    changePag()
    addData();
})
