const addPostForm = document.querySelector('#add-post-form');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
let imageUrl = '';

// Listen for the submit event on the form
addPostForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Extract the input data from the farm
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  //  client-side validation
  if (!title || !body) {
    alert('Please fill out all fields.');
    return;
  }

  //  API call to your backend route to create a new user post
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: { 'Content-Type': 'application/json' },
    });

    // If the post is created successfully, take the user to a relevant page
    if (response.ok) {
      window.location.replace('/');
    } else {
      alert('Failed to create post');
    }
  } catch (error) {
    console.error(error);
    alert('Error creating post');
  }
});

document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'ddiyjjqhn', 
    uploadPreset: 'fbuysf1t'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
        imageUrl = result.info.url
      }
    });

const addPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const body = document.querySelector('#body').value.trim();
  const imageInput = document.querySelector('#image');
  
  

  if (title && body && imageUrl) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        imageUrl
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add post');
    }
  }
};

document.querySelector('#add-post-form').addEventListener('submit', addPostFormHandler);
