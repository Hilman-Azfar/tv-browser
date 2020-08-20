// API Docs at:
// http://www.tvmaze.com/api
async function getData(query){
    const url = `http://api.tvmaze.com/api/search/shows?q=${query}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        addOptions(data);
    } catch (err) {
        console.log(err);
    }
}


let handleSearchChange =(e)=>{
    let query = e.target.value;
    getData(query);
    e.target.value = '';
}

let addOptions =(arr)=>{
    let showSelect = document.getElementById("show-select");
    arr.forEach((item)=>{
        let option = document.createElement('option');
        option.value = item.show.id;
        option.innerText = item.show.name;
        showSelect.appendChild(option);
    })
    showSelect.addEventListener('input', (e)=>{
        getSingleSearch(e.target.value);
    });
}

async function getSingleSearch(id){
    const url = `http://api.tvmaze.com/shows/${id}`;
    let showDetail = document.getElementById("show-detail");
    try{
        let response = await fetch(url);
        let data = await response.json();

        let heading = document.createElement('h2');
        let image = document.createElement('img');
        let para = document.createElement('p');

        heading.innerText = data.name;
        image.src = data.image.medium;
        para.textContent = data.summary;

        showDetail.appendChild(heading);
        showDetail.appendChild(image);
        showDetail.appendChild(para);
    } catch (err) {
        console.log(err)
    }
}











//