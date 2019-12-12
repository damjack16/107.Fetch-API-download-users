const template = document.querySelector('#template');
const usersList = document.querySelector('#usersList');


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
            // Find element with class "user-cnt" in template content
            const article = clone.querySelector('.user-cnt');
            // Set data-id from API
            article.dataset.id = `${user.id}`;
            // Find element with class "address" in template content
            const address = clone.querySelector('.address');
            // Insert phone and email of each user in API to div with class "address"
            address.innerHTML = `Phone: ${user.phone}<br>
            email: <a href="mailto: ${user.email}">${user.email}</a>`;

            const ulList = clone.querySelector(".user-posts");

            // Show posts
            const btn = clone.querySelector('.btn');

            btn.addEventListener('click', () => {
                if (ulList.dataset.visible === "false") {
                    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                        .then(resp =>
                            resp.json()
                        )
                        .then(resp => {
                            resp.forEach(news => {
                                // Clone post template content
                                const clone = document.importNode(post.content, true);
                                // Find element with class "post-title" in post template content
                                const postTitle = clone.querySelector('.post-title');
                                // Insert title of each post in API to h3
                                postTitle.innerHTML = news.title;
                                // Find element with class "post-body" in post template content
                                const postBody = clone.querySelector('.post-body');
                                // Insert body post of each post in API to div with class "post-body"
                                postBody.innerHTML = news.body;
                                // Change display value to show ulList
                                ulList.style.display = "block";
                                // Change value of dataset-visible on true after click
                                ulList.dataset.visible = "true";
                                btn.innerHTML = "Hide posts";
                                // Add cloned template content to ul with clas users-posts
                                ulList.appendChild(clone);
                            })
                        })
                } else {
                    // Change display value to hide ulList
                    ulList.style.display = "none";
                    // Change value of dataset-visible on false after click
                    ulList.dataset.visible = "false"
                    // Clear ul list
                    ulList.innerHTML = "";
                    btn.innerHTML = "Show posts"
                }
            });

            // Add cloned template content to div with id #usersList
            usersList.appendChild(clone);
        })
    })