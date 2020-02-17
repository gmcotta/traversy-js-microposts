import { http } from './http';
import { ui } from './ui';

document.addEventListener('DOMContentLoaded', getPosts);

document.querySelector('.post-submit').addEventListener('click', submitPost);

document.querySelector('#posts').addEventListener('click', deletePost);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost() {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  const data = { title, body };

  http.post('http://localhost:3000/posts', data)
    .then(() => {
      ui.showAlert('Post added', 'alert alert-success');
      ui.clearFields();
      getPosts();
    })
    .catch(err => console.log(err));
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
    }
    console.log(id);
  }
}
