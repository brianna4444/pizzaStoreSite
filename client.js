showList("pizza");

function searchPizza(){
let item= $('#search').val();
let category= $('#selector').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/search",
        data: {
            'category': category,
            'item': item


        },
        success: function (data){
            show(data);

        }
    });
}


function show(data){

    let listDiv= $("#resultBoxes");
    listDiv.empty();
    console.log(data);
    listDiv.className="list";
    for (let i=0; i<data.length; i++){
        let boxDiv= document.createElement("div");

        boxDiv.style.border="1px solid";
        boxDiv.style.padding="1%";
        boxDiv.style.width="30%";
        boxDiv.className="box";


        let nameDiv= document.createElement("div");
        let name= data[i].name;
        nameDiv.append(name);
        nameDiv.className="name";
        nameDiv.style.width="100px";
        nameDiv.style.display="inline-block";
        let priceDiv= document.createElement("div");
        let price= data[i].price;
        priceDiv.append("$");
        priceDiv.append(price);
        priceDiv.className="price";
        priceDiv.style.width="100px";
        priceDiv.style.display="inline-block";
        let descDiv= document.createElement("div");
        let desc= data[i].description;
        descDiv.className="description";
        descDiv.append(desc);
        descDiv.style.width="100px";
        descDiv.style.display="inline-block";
        let moreBtn= document.createElement("button");
        moreBtn.className="more";
        moreBtn.id=data[i]._id;
        moreBtn.className="btn btn-info btn-sm";
        //$("#myModal").modal('toggle');
        $(".btn-info").attr=("data-toggle", "modal");
        $(".btn-info").attr=("data-target", "#myModal");
        moreBtn.style.margin="1%";
        moreBtn.append("more");
        moreBtn.style.backgroundColor="purple";
        let addBtn= document.createElement("button");
        addBtn.className="add";
        addBtn.id= data[i]._id;
        addBtn.style.margin="1%";
        addBtn.append("add");
        addBtn.onclick= function() { addCart(data[i]._id, name, price); };
        addBtn.style.backgroundColor="red";
        listDiv.append(boxDiv);
        boxDiv.append(nameDiv);
        boxDiv.append(descDiv);
        boxDiv.append(priceDiv);
        boxDiv.append(moreBtn);
        boxDiv.append(addBtn);


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




let counter= 0;
function addCart(id, name, price){

    let div= $('#cartRows');
    div.className="container-fluid row";
    let infoDiv= document.createElement("div");
    counter++;
    infoDiv.id=counter;
    infoDiv.className="col-12";
    infoDiv.append(name);
    infoDiv.append(price);
    infoDiv.className="info";
    let removeBtn= document.createElement("button");
    removeBtn.className="fa fa-minus-circle";
    removeBtn.onclick= function() { removeItem(infoDiv.id,price); };
    infoDiv.style.width="100px";
    infoDiv.style.display="inline-block";
    infoDiv.append(removeBtn);
    div.append(infoDiv);

    cartTotal(price);
}

let currentPrice= 0;
function cartTotal(price){

    currentPrice= currentPrice + price;
    $('#totalAmount').empty();
    $('#totalAmount').append(currentPrice);

}

function details(){}


function choosePage(){}


function removeItem(id, price){
    let box= $('#' + id);
    let listDiv= $("#resultBoxes");

    currentPrice= currentPrice - price;
    $('#totalAmount').empty();
    $('#totalAmount').append(currentPrice);

    box.remove();
}

function clearCart() {
$('#cartRows').empty();
}


function order(){
    let name= $('#name').val();
    let number= $('#number').val();
    let address= $('#address').val();
    let items = [];
    $("#cartRows").find().each(
        function(){
        items.push(this.name);
    });

    let total= $('#totalAmount').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/list",
        data: {
            'name': name,
            'number': number,
            'address': address,
            'items': items,
            'total': total


        },

    });
}



