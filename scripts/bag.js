const CONVENIENCE_FEE=99;
let bag_item_objects;
on_load();

function on_load()
{
    load_bag_item_objects();
    display_bag_items();
    display_bag_summary();
}

function display_bag_summary()
{
    let bag_summary_element=document.querySelector('.bag-summary');

    let total_items=bag_item_objects.length;
    let total_mrp=0;
    let total_discount=0;

    bag_item_objects.forEach(bag_item=>
    {
        total_mrp+=bag_item.original_price;
        total_discount+=bag_item.original_price - bag_item.current_price;
    })

    let final_payment;

    if (total_items===0)
    {
        final_payment=0;
    }
    else
    {
        final_payment=total_mrp-total_discount+CONVENIENCE_FEE;
    }

    bag_summary_element.innerHTML=`
        <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${total_items} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹${total_mrp}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹${total_discount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹${CONVENIENCE_FEE}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹${final_payment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="css-xjhrni">PLACE ORDER</div>
          </button>`;
}

function load_bag_item_objects()
{
    console.log(bag_items);
    bag_item_objects= bag_items.map(itemID=>{

        for (let i=0;i<=items.length-1;i++)
        {
            if (itemID==items[i].id)
            {
                return items[i];
            }
        }
    });
    console.log(bag_item_objects);

}

function display_bag_items()
{
    let container_element=document.querySelector('.bag-items-container');
    let innerHTML='';
    bag_item_objects.forEach(bag_items => {
        innerHTML+=generate_item_HTML(bag_items);
    });

    container_element.innerHTML=innerHTML;
}

function remove_from_bag(itemID) 
{
    bag_items=bag_items.filter(bag_itemID => bag_itemID !=itemID);
    localStorage.setItem('bag_items',JSON.stringify(bag_items));
    load_bag_item_objects();
    display_bag_icon();
    display_bag_items();
    display_bag_summary();
}

function generate_item_HTML(item)
{
    return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="remove_from_bag(${item.id})">X</div>
          </div>`;   
}









