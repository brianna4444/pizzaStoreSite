showList("pizza", 1);

function searchPizza() {
    let item = $('#search').val();
    let category = $('#selector').val();
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/search",
        data: {
            'category': category,
            'item': item


        },
        success: function (data) {
            show(data);

        }
    });
}


function show(data, numPages) {

    let listDiv = $("#thumbnailSection");
    listDiv.empty();
    console.log(data);
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
        moreBtn.className = "more col-4  btn btn-outline-secondary";
        moreBtn.style.margin = "1%";
        moreBtn.append("more");
        moreBtn.onclick = function () {
            showModal(data[i].description);
        };

        let addBtn = document.createElement("button");
        addBtn.className = "add col-4  btn btn-outline-success";
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
    createPages(numPages);
}





    function createPages(numPages) {


        for (let i = 0; i < numPages; i++) {
            let num=i+1;
            let pageNum = document.createElement("span");
            pageNum.append(num + "|");
            pageNum.id = "page" + i;
            $('#pageSelector').append(pageNum);


        }
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
                let numPages = Math.round(data.length / 6);
                createPages(numPages);

                show(data, numPages);

            }
        });
    }


    let counter = 0;

    function addCart(id, name, price) {
        counter++;
        let list = $("#ls");


        let spanDelete = document.createElement("span");
        spanDelete.className = "badge badge-pill badge-danger float-right";
        spanDelete.onclick = function () {
            removeItem(li.id, price)
        };
        spanDelete.innerHTML = "-";

        let li = document.createElement("li");
        li.className = "col-12 list-group-item";
        li.innerHTML = name + " " + "$" + price;

        li.id = counter;


        li.appendChild(spanDelete);
        list.append(li);

        cartTotal(price);
    }

    let currentPrice = 0;

    function cartTotal(price) {

        currentPrice = currentPrice + price;
        $('#totalAmount').empty();
        $('#totalAmount').append("Total: $ " + currentPrice);

    }

    function showModal(info) {
        $('#modal').css("display", "block");
        $('#modalContent').append(info);
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
        let name = $('#name').val();
        let number = $('#number').val();
        let address = $('#address').val();
        let items = [];
        $("#cartRows").find().each(
            function () {
                items.push(this.name);
            });

        let total = $('#totalAmount').val();
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
    };






