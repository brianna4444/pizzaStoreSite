function showThumbnails() {

    for (let i = 0; i < 6; i++) {
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
        moreBtn.onclick= function () { showModal(data[i].description)};

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
}