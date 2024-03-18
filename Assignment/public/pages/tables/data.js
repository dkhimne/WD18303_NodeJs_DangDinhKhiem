 
//list order
fetch("http://localhost:3000/orders")
    .then((response) => {
        response.json().then((data) => {
            const orders = data;
            const html = document.querySelector('#don-hang tbody');

            orders.forEach(or => {
                html.innerHTML += `
                    <tr>                        
                        <td>${or.id}</td>
                        <td>${or.customer_name}</td>
                        <td>${or.customer_address}</td>
                        <td>${or.customer_email}</td>
                        <td>${or.customer_phone_number}</td>
                        <td>${or.created_date}</td>
                        <td>${or.status}</td>
                        <td>
                        <button type="button" class="btn btn-primary mt-3"  ">Edit </button>
                        <button type="button" class="btn btn-danger mt-3"  ">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
    });