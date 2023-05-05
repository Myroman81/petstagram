
const commentFormHandler = async function (event) {
    event.preventDefault();

    const body = document.querySelector('#comment').value;

    if (body) {
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length - 1
          ];
        const response = await fetch(`/api/comments/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                body
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok ){
            document.location.replace(`/posts/${id}`)
        }
        // const data = await response.json();
        // console.log(data)

        // create a new comment element
    //     const commentElement = document.createElement('div');
    //     commentElement.classList.add('comment');
    //     commentElement.innerHTML = `
    //     <p>Comment by User Number: ${data.user_id}</p>
    
    //     <p>${data.body}</p>
    //   `;

        // add the new comment element to the comments section
        const commentsSection = document.querySelector('#comments');
        commentsSection.appendChild(commentElement);

        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(data);
        localStorage.setItem('comments', JSON.stringify(comments));

        // clear the comment input
        document.querySelector('#comment').value = '';
    }
};

document
    .querySelector('#commentSubmit')
    .addEventListener('submit', commentFormHandler);

document.addEventListener('DOMContentLoaded', () => {
    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <p>Comment by User Number: ${comment.user_id}</p>
            <p>${comment.body}</p>
          `;
        const commentsSection = document.querySelector('#comments');
        commentsSection.appendChild(commentElement);
    });
});