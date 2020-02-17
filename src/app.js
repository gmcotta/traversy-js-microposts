import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);

document.querySelector('.post-submit').addEventListener('click', submitPost);

document.querySelector('#posts').addEventListener('click', deletePost);

document.querySelector('#posts').addEventListener('click', editPost);

document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = { title, body };
  
  if (title === '' || body === '') {
    ui.showAlert('Please fill in all fields', 'alert alert-danger');
  } else {
    if (id === '') {
      http.post('http://localhost:3000/posts', data)
      .then(() => {
        ui.showAlert('Post added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
    } else {
      http.put(`http://localhost:3000/posts/${id}`, data)
      .then(() => {
        ui.showAlert('Post updated', 'alert alert-success');
        ui.changeFormState('add');

        getPosts();
      })
    }
  
    
  }
}

function deletePost(evt) {
  evt.preventDefault();

  if (evt.target.parentElement.classList.contains('delete')) {
    const id = evt.target.parentElement.getAttribute('data-id');
    if (confirm('Are you sure?')) {
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert('Post removed', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err));

        ui.changeFormState('add');
    }
  }
}

function editPost(evt) {
  evt.preventDefault();

  if (evt.target.parentElement.classList.contains('edit')) {
    const id = evt.target.parentElement.getAttribute('data-id');
    const title = evt.target.parentElement.previousElementSibling
      .previousElementSibling.textContent;
    const body = evt.target.parentElement.previousElementSibling.textContent;

    const data = { id, title, body };

    ui.fillForm(data);
  }
}

function cancelEdit(evt) {
  evt.preventDefault();

  if (evt.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}