$(document).ready(function() {

    //  add new item on the bottom of the list
    $('.btn.add').on('click', function (event) {
        var new_mineral_name = $('#new_mineral_name').val();
        var new_mineral_price = $('#new_mineral_price').val();
        var new_mineral_quantity = $(this).closest('tr').find('.quantity input').val();

        $('#addItem').before(`
            <tr>
                <td class="mineral_name">${new_mineral_name}</td>
                <td class="mineral_price">${new_mineral_price}</td>
                <td class="quantity"><input type="number" value=${new_mineral_quantity} /></td>
                <td class="row_total_price"></td>
                <td><button class="btn btn-light btn-sm remove">Clear</button></td>
            </tr>`);

            $('#newItemName', '#newItemPrice').val('');
            updateFinalTotal();  // function defined at bottom, should it be moved up?
    });

    // remove an item by clicking the clear button on the right
    $('tbody').on('click', '.btn.remove', function () { 
        // a button labeled "clear" is not specified but the clear button is the only one which removes things
        $(this).closest('tr').remove();
        updateFinalTotal();
    });

        // add up the total price for each item
        $('tbody').on('input', '.quantity input', function() {
            var $row = $(this).closest('tr');  // check this logic and make sure it only works per row
            var unit_price = parseFloat($row.find('.mineral_price').text());
            var quantity = parseFloat($(this).val());

            var total_cost = unit_price * (isNaN(quantity) ? 0 : quantity);

            $row.find('.row_total_price').html(total_cost.toFixed(2));
            updateFinalTotal();
        });

    // display the total price for all items selected
    var updateFinalTotal = function () {
        final_total = 0;
        $('.row_total_price').each(function() {
            final_total += parseFloat($(this).text()) || onabort;
        });
        $('#final_checkout_total').text(final_total.toFixed(2)); // is 2 the correct value, check
    };

    });
