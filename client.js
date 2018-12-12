showList("pizza", 1);

function search(page) {

    let item = $('#search').val();
    let collection = $('#selector').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/listSearch",
        data: {
            'collection': collection,
            'item': item,
            'page': page


        },
        success: function (data) {//array of items found
            showSearch(data, item, collection);

        }
    });

}

function showSearch(data, item, collection){
    let listDiv = $("#thumbnailSection");
    listDiv.empty();

    listDiv.className = "list";

    for (let i = 0; i < data.length; i++) {
        let boxDiv = document.createElement("div");

        boxDiv.style.backgroundColor = "tan";
        boxDiv.style.border = "1px solid";
        boxDiv.style.padding = "1%";
        boxDiv.style.width = "30%";
        boxDiv.className = "box";

        let topRow = document.createElement("div");
        topRow.className = "row";
        let nameDiv = document.createElement("div");
        let name = data[i].name;
        nameDiv.append(name);
        nameDiv.className = "name col-12 text-center";
        nameDiv.style.width = "100px";
        nameDiv.style.display = "inline-block";
        let priceDiv = document.createElement("div");
        let price = data[i].price;
        priceDiv.append("$");
        priceDiv.append(price);
        priceDiv.className = "price col-12 text-center";
        priceDiv.style.width = "100px";
        priceDiv.style.display = "inline-block";
        let descDiv = document.createElement("div");
        let desc = data[i].description;
        descDiv.className = "description col-12 text-center ";
        descDiv.append(desc);
        descDiv.style.width = "100px";
        descDiv.style.display = "inline-block";

        let bottomRow = document.createElement("div");
        bottomRow.className = "row justify-content-center";
        let moreBtn = document.createElement("button");
        moreBtn.id = data[i]._id;
        moreBtn.className = "more col-4  btn btn-secondary";
        moreBtn.style.margin = "1%";
        moreBtn.append("more");
        moreBtn.onclick = function () {
            showModal(data[i].description, data[i].id, name, price);
        };

        let addBtn = document.createElement("button");
        addBtn.className = "add col-4  btn btn-success";
        addBtn.id = data[i]._id;
        addBtn.style.margin = "1%";
        addBtn.append("add");
        addBtn.onclick = function () {
            addCart(data[i]._id, name, price);
        };


        listDiv.append(boxDiv);
        boxDiv.append(topRow);
        boxDiv.append(bottomRow);
        topRow.append(nameDiv);
        topRow.append(descDiv);
        topRow.append(priceDiv);

        bottomRow.append(moreBtn);
        bottomRow.append(addBtn);
    }
    addNumbers(item, collection);
}

function addNumbers(item, collection){
    $('#pageSelector').empty();
    let pageNumbers = document.createElement("span");
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/countSearch",
        data: {
            'collection': collection,
            'item': item


        },
        success: function (data) { //number items
            let numPages = Math.ceil(data/ 6);
        console.log(data);
        for (let i = 0; i < numPages; i++) {
        let num = i + 1;
        let pageNum = document.createElement("button");
        pageNum.append(num);
        pageNum.id = "page" + i;
        pageNum.onclick= function () {
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/listSearch",
                data: {
                    'collection': collection,
                    'page': num,
                    'item': item


                },
                success: function (data) { //arr of items for current page clicked
                    console.log(data);
                    showSearch(data, item, collection);// show this page of items for page

                }
            });
        };
            pageNumbers.append(pageNum);
    }
            $('#pageSelector').append(pageNumbers);
        },


    })

}





function show(data, id) {

    let listDiv = $("#thumbnailSection");
    listDiv.empty();

    listDiv.className = "list";

    for (let i = 0; i < data.length; i++) {
        let boxDiv = document.createElement("div");

        boxDiv.style.backgroundColor = "tan";
        boxDiv.style.border = "1px solid";
        boxDiv.style.padding = "1%";
        boxDiv.style.width = "30%";
        boxDiv.className = "box";

        let topRow = document.createElement("div");
        topRow.className = "row";
        let nameDiv = document.createElement("div");
        let name = data[i].name;
        nameDiv.append(name);
        nameDiv.className = "name col-12 text-center";
        nameDiv.style.width = "100px";
        nameDiv.style.display = "inline-block";
        let priceDiv = document.createElement("div");
        let price = data[i].price;
        priceDiv.append("$");
        priceDiv.append(price);
        priceDiv.className = "price col-12 text-center";
        priceDiv.style.width = "100px";
        priceDiv.style.display = "inline-block";
        let descDiv = document.createElement("div");
        let desc = data[i].description;
        descDiv.className = "description col-12 text-center ";
        descDiv.append(desc);
        descDiv.style.width = "100px";
        descDiv.style.display = "inline-block";

        let bottomRow = document.createElement("div");
        bottomRow.className = "row justify-content-center";
        let moreBtn = document.createElement("button");
        moreBtn.id = data[i]._id;
        moreBtn.className = "more col-4  btn btn-secondary";
        moreBtn.style.margin = "1%";
        moreBtn.append("more");
        moreBtn.onclick = function () {
            showModal(data[i].description, data[i].id, name, price);
        };

        let addBtn = document.createElement("button");
        addBtn.className = "add col-4  btn btn-success";
        addBtn.id = data[i]._id;
        addBtn.style.margin = "1%";
        addBtn.append("add");
        addBtn.onclick = function () {
            addCart(data[i]._id, name, price);
        };


        listDiv.append(boxDiv);
        boxDiv.append(topRow);
        boxDiv.append(bottomRow);
        topRow.append(nameDiv);
        topRow.append(descDiv);
        topRow.append(priceDiv);

        bottomRow.append(moreBtn);
        bottomRow.append(addBtn);
    }

    createPages(id);
}





    function createPages(id) {

        $('#pageSelector').empty();
        let pageNumbers = document.createElement("span");
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/count",
            data: {
                'collection': id,



            },
            success: function (data) {

                let numPages = Math.ceil(data/ 6);
                console.log(data);
                for (let i = 0; i < numPages; i++) {
                    let num = i + 1;
                    let pageNum = document.createElement("button");
                    pageNum.append(num);
                    pageNum.id = "page" + i;
                    pageNum.onclick= function () {
                        $.ajax({
                            type: "GET",
                            url: "http://localhost:3000/list",
                            data: {
                                'collection': id,
                                'page': num


                            },
                            success: function addThumbnails(data) {
                                console.log(data);
                                show(data, id);

                            }
                        });
                    };
                    pageNumbers.append(pageNum);

                }
                $('#pageSelector').append(pageNumbers);

            }
        })
    }


    function showList(id, page) {

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/list",
            data: {
                'collection': id,
                'page': page


            },
            success: function (data) {

                show(data, id);

            }
        });
    }


    let counter = 0;

    function addCart(id, name, price) {
        counter++;
        let list = $("#ls");


        let spanDelete = document.createElement("span");
        spanDelete.className = "badge badge-pill badge-danger float-right col-1";
        spanDelete.onclick = function () {
            removeItem(li.id, price)
        };
        spanDelete.innerHTML = "-";

        let li = document.createElement("li");
        li.className = "col-12 list-group-item row";
        let liName= document.createElement("span");
        liName.className= "col-6 item";
        liName.append(name);
        let liPrice= document.createElement("span");
        liPrice.className="col-3";
        liPrice.append("$"+ price);

        li.id = counter;


        li.appendChild(spanDelete);
        list.append(li);
        li.append(liName);
        li.append(liPrice);

        cartTotal(price);
        hideModal();

    }

    let currentPrice = 0;

    function cartTotal(price) {

        currentPrice = currentPrice + price;
        $('#totalAmount').empty();
        $('#totalAmount').append("Total: $ " + currentPrice);

    }

    function showModal(info, id, name, price) {
        $('#modalContent').empty();
        $('#modal').css("display", "block");
        let firstDiv= document.createElement("div");
        firstDiv.className= "firstDiv row";
        let description= document.createElement("p");
        description.append(info);
        description.className="text-center col-12";
        let secondSpan= document.createElement("span");
        secondSpan.className= "secondSpan row";
        let space= document.createElement("p");
        space.className="col-3";
        let addBtn = document.createElement("button");
        addBtn.className = "add col-3 btn btn-success";
        addBtn.style.margin = "1%";
        addBtn.append("add");
        addBtn.onclick = function () {
            addCart(id, name, price);
        };

        let closeBtn = document.createElement("button");
        closeBtn.className = "col-3  btn btn-danger";
        closeBtn.style.margin = "1%";
        closeBtn.append("close");
        closeBtn.onclick = function () {
            hideModal();
        };

        $('#modalContent').append(firstDiv);
        $('#modalContent').append(secondSpan);
        firstDiv.append(description);
        secondSpan.append(space);
        secondSpan.append(addBtn);
        secondSpan.append(closeBtn);
        secondSpan.append(space);


    }


function showOrderModal() {
    $('#modalContent').empty();
    $('#modal').css("display", "block");
    let firstSpan= document.createElement("span");
    firstSpan.className="row";
    let name= document.createElement("p");
    name.className="col-4";
    name.append("name ");
    let input1= document.createElement("input");
    input1.className="input1 text-center col-8";
    let secondSpan= document.createElement("span");
    secondSpan.className="row";
    let phone= document.createElement("p");
    phone.className="col-4";
    phone.append("phone ");
    let input2= document.createElement("input");
    input2.className="input2 text-center col-8";
    let thirdSpan= document.createElement("span");
    thirdSpan.className="row";
    let address= document.createElement("p");
    address.className="col-4";
    address.append("address ");
    let input3= document.createElement("input");
    input3.className="input3 text-center col-8";
    let fourthSpan= document.createElement("span");
    fourthSpan.className="row";
    let addBtn = document.createElement("button");
    addBtn.className = "add col-3 btn btn-success float-left";
    addBtn.style.margin = "1%";
    addBtn.append("order");
    addBtn.onclick = function () {
        order();
    };

    let closeBtn = document.createElement("button");
    closeBtn.className = "col-3  btn btn-danger float-right";
    closeBtn.style.margin = "1%";
    closeBtn.append("close");
    closeBtn.onclick = function () {
        hideModal();
    };

    $('#modalContent').append(firstSpan);
    firstSpan.append(name);
    firstSpan.append(input1);
    $('#modalContent').append(secondSpan);
    secondSpan.append(phone);
    secondSpan.append(input2);
    $('#modalContent').append(thirdSpan);
    thirdSpan.append(address);
    thirdSpan.append(input3);
    $('#modalContent').append(fourthSpan);
    fourthSpan.append(addBtn);
    fourthSpan.append(closeBtn);



}

    function hideModal() {
        $("#modal").css("display", "none");
    }


    function removeItem(id, price) {
        let item = "#" + id;
        $(item).remove();


        currentPrice = currentPrice - price;
        $('#totalAmount').empty();
        $('#totalAmount').append("Total: $ " + currentPrice);


    }

    function clearCart() {
        $('#ls').empty();
        $('#totalAmount').empty();
        $('#totalAmount').append("Total: $0");
    }


    function order() {
        let name = $('.input1').val();
        let number = $('.input2').val();
        let address = $('.input3').val();
        let items = [];
        items.push($('#ls').find('.item').text());



        let total = currentPrice;
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/order",
            data: {
                'name': name,
                'number': number,
                'address': address,
                'items': items,
                'total': total,
                'time': new Date().getTime()


            },

        });
        hideModal();
        clearCart();
    };






