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
                            let flag = true;

                            if (ulList.dataset.visible === "false") {
                                flag = !flag;
                            } else if (ulList.dataset.visible === "true") {
                                flag = !flag;
                            }

                            if (flag) {
                                ulList.style.display = "none";
                                btn.innerHTML = "Show posts";
                                ulList.dataset.visible = "false"
                            } else {
                                ulList.dataset.visible = "true"
                                ulList.style.display = "block";
                                btn.innerHTML = "Hide posts";
                            }
                            ulList.appendChild(clone);
                        })
                    })
            });

            // Add cloned template content to div with id #usersList
            usersList.appendChild(clone);
        })
    })