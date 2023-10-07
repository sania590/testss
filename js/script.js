
// totoL number of posts
var totalPosts = 0;
fetch('https://sania590.github.io/Culinary-Delights-json/db.json')
    .then(res => res.json())
    .then(json => {
        totalPosts = json.length;
    })


function fetch_posts(url, offset, limit) {
    offset = offset; // Track the number of items already displayed
    //   laod all posts
    var postwrapper = document.getElementById('postWrapper');
    // fetch function
    var url = `https://sania590.github.io/Culinary-Delights-json/db.json?_start=${offset}&_limit=${limit}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (offset + json.length >= totalPosts) {
                $('#show_more_btn').hide();
            }
            json.map(data => {

                postwrapper.append(load_post(data));
            })

        })
}
function load_post({ id, title, author, feature_image, date, views, comments, likes, content }) {
    let div = document.createElement('div');
    var classesToAdd = [ 'col-lg-4', 'col-md-6',   'col-12'];
    div.classList.add(...classesToAdd);
    div.setAttribute('data-aos', 'fade-up');
    // date array
    var datearray = date.split(' ');
    // short description
    var shortDesc = content.slice(0, 100);

    div.innerHTML = `
    <div class = "post" >
    <a href="single-post.html?id=${id}">
    <div class="post-image"><img src="images/${feature_image}" alt=""></div>
    <div class="post-content">
      <div class="post-content_primary">
        <h4 class="post-title">${title}</h4>
        <p class="post-metadata">
        <span>${author}</span>
        <span class="separator"></span>
        <span> ${datearray[0]}</span><span class="number"> ${datearray[1]}</span>
         <span class="number"> ${datearray[2]}</span>
          </p>
        <p class="post-desc">${shortDesc} ...</p>
      </div>
      <div class="post-content_bottom d-flex">
        <div class="views">
          <span class="number">${views}</span> <span>Views</span>
        </div>
        <div class="comments">
          <span class="number">${comments}</span> <span>Comments</span>
        </div>
        <div class="likes">
          <span class="number">${likes}</span> <span><i class="fa-regular fa-heart"></i></span>
        </div>
      </div>

    </div>
    </a>
    </div>
    `;

    return div;
}
$(document).ready(function () {
    /*  Navbar
------------------------------ */
    // menu-icon toggle
    $('#menuIcon').click(function () {
        $('.menu-icon').toggleClass('active');
        $('.nav-links').toggleClass('active');
    })
    // ----  close alert message on the click of close button -----
    $('#sub-success-alert').find('.btn-close').click(function () {
        $('#sub-success-alert').hide();
    });
    // ----  submission of newsletter subscription form -----
    $('#subscribe-btn').click(function (e) {
        e.preventDefault();

        var email = $('#email-input').val(); // get email input value
        if (email != '') {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (emailPattern.test(email)) { // if entered email is matching with email pattern then show success message
                $('#sub-error').hide();
                $('#sub-success-alert').show(); // show success message
                setTimeout(function () {
                    $('#sub-success-alert').hide();
                }, 3000); // this function will hide this success message after 3 seconds
                $('#email-input').val(''); // set email value to null
            } else {
                // show error that invalid email is entered
                $('#sub-error').show();
                $('#sub-error').text('Please enter a valid email address.')
            }
        } else {
            // show error that email field is empty
            $('#sub-error').show();
            $('#sub-error').text('Please enter your email address.')
        }

    })
    // aos-animate on scroll
    AOS.init({
        offset: 100,
        duration: 1000,
        once: true,
        delay: 100,
    });








});
