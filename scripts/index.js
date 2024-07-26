let bag_items=[];

on_load();

function on_load()
{
    let bag_item_str=localStorage.getItem('bag_items');
    bag_items=bag_item_str ? JSON.parse(bag_item_str) : [];
    display_items_on_home_page();
    display_bag_icon();
}

function add_to_bag(itemID)
{
    bag_items.push(itemID);
    localStorage.setItem('bag_items',JSON.stringify(bag_items));
    display_bag_icon();
}

function display_bag_icon()
{
    let bag_item_count_element=document.querySelector('.bag_item_count');
    if (bag_items.length>0)
    {
        bag_item_count_element.style.visibility='visible';
        bag_item_count_element.innerText=bag_items.length;
    }
    else
    {
        bag_item_count_element.style.visibility='hidden';
    }
    
}

function display_items_on_home_page()
{
    let items_container_element=document.querySelector('.items_container');

    if (!items_container_element)
    {
        return;
    }

    let innerHTML=''
    items.forEach(item=>{
    innerHTML+=`

    <div class="item_container">
        <img class="item_image" src="${item.image}" alt="item image">
        <div class="rating">
            ${item.rating.stars} ⭐ | ${item.rating.count}
        </div>
        <div class="company_name">${item.company}</div>
        <div class="item_name">${item.item_name}</div>
        <div class="price">
            <span class="current_price">Rs ${item.current_price}</span>
            <span class="Original_price">Rs ${item.original_price}</span>
            <span class="discount">(${item.discount_percentage}% OFF)</span>
        </div>
        <button class="add_btn" onclick="add_to_bag(${item.id})">Add to Bag</button>
    </div>`
    });
items_container_element.innerHTML=innerHTML;
}



