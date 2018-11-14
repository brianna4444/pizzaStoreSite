showList();

function searchPizza(){}


function show(data){

    let listDiv= $("#resultBoxes");
    listDiv.empty();
    console.log(data);
    for (let i=0; i<data.length; i++){
        let rowDiv= document.createElement("div");
        rowDiv.style.border="1px solid";
        rowDiv.style.padding="1%";
        rowDiv.style.width="30%";


        let nameDiv= document.createElement("div");
        let name= data[i].name;
        nameDiv.append(name);
        nameDiv.style.width="100px";
        nameDiv.style.display="inline-block";
        let priceDiv= document.createElement("div");
        let price= data[i].price;
        priceDiv.append(price);
        priceDiv.style.width="100px";
        priceDiv.style.display="inline-block";
        let descDiv= document.createElement("div");
        let desc= data[i].description;
        descDiv.append(desc);
        descDiv.style.width="100px";
        descDiv.style.display="inline-block";
        let moreBtn= document.createElement("button");
        moreBtn.id=data[i]._id;
        moreBtn.style.margin="1%";
        moreBtn.append("more");
        moreBtn.onclick= function() { };
        moreBtn.style.backgroundColor="purple";
        let addBtn= document.createElement("button");
        addBtn.id= data[i]._id;
        addBtn.style.margin="1%";
        addBtn.append("add");
        addBtn.onclick= function() { addCart(data[i]._id); };
        addBtn.style.backgroundColor="red";
        rowDiv.append(nameDiv);
        rowDiv.append(priceDiv);
        rowDiv.append(moreBtn);
        rowDiv.append(addBtn);
    }

}




function showList(id){
$.ajax({
        type: "GET",
        url: "http://localhost:3000/list",
        data: {
            'collection': id


        },
        success: function (data){
            show(data);

        }
    });
}





function addCart(name, price){
    let div= $('#cartRows);
    let infoDiv= div.createElement("div");
    infoDiv.append(name);
    infoDiv.append(price);
    let removeBtn= infoDiv.createElement("button");
    removeBtn.append("remove");
    infoDiv.style.width="100px";
    infoDiv.style.display="inline-block";
    div.append(infoDiv);

    cartTotal(price);
}

function cartTotal(price){
    let currentPrice= $('#totalAmount');
    let newTotal= currentPrice+ price;
    currentPrice.append(newTotal);
}

function details(){}


function choosePage(){}


function removeItem(){}


function order(){}



