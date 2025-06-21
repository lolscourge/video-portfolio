// Contact form handling
var form = document.getElementById("contact-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("form-success");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.style.display = "block";
      form.style.display = "none";
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form");
        }
      })
    }
  }).catch(error => {
    alert("Oops! There was a problem submitting your form");
  });
}

form.addEventListener("submit", handleSubmit); 