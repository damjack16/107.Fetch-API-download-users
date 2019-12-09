const template = document.querySelector('#template');
const usersList = document.querySelector('#usersList')

fetch("https://jsonplaceholder.typicode.com/users")
    .then(resp =>
        resp.json()
    )
    .then(resp => {
        console.log(resp)
        resp.forEach(user => {
            // Clone template content
            const clone = document.importNode(template.content, true);
            // Find element with class "user-name" in template content
            const userName = clone.querySelector('.user-name');
            // Insert name of each user in API to h2
            userName.innerHTML = user.name;
            // Find element with class "address" in template content
            const address = clone.querySelector('.address');
            // Inser phone and email of each user in API to div with class "address"
            address.innerHTML = `Phone: ${user.phone}<br>
            email: <a href="mailto: ${user.email}">${user.email}</a>`
            // Add cloned template content to div with id #usersList
            usersList.appendChild(clone);
        })
    })