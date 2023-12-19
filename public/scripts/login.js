
var username = document.getElementById("username");
var password = document.getElementById("password");
var registerUsername = document.getElementById("registerUsername");
var registerPassword = document.getElementById("registerPassword");
var registerConfirmPassword = document.getElementById("registerConfirmPassword");

function login() {
    alert(username.value + " - " + password.value);
}

function signup() {
    if (registerConfirmPassword.value !== registerPassword.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your confirm password does not match with your password."
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "Registered New Account Successfully",
            timer: 1000,
            timerProgressBar: true,
            showConfirmButton: false
        }).then((result) =>{
            location.reload();
        });
        
    }

    // var newAccount = new account({
    //     username: registerUsername.value,
    //     password: registerPassword.value
    // });
    // newAccount.save()
    //     .then(() => {
    //         console.log('Data saved to MongoDB'.green.bold);
    //         let timerInterval;
    //         Swal.fire({
    //             icon: "success",
    //             title: "Registered New Account Successfully",
    //             timer: 1000,
    //             timerProgressBar: true,
    //             showConfirmButton: false,
    //             didOpen: () => {
    //                 const timer = Swal.getPopup().querySelector("b");
    //                 timerInterval = setInterval(() => {
    //                     timer.textContent = `${Swal.getTimerLeft()}`;
    //                 }, 100);
    //             },
    //             willClose: () => {
    //                 clearInterval(timerInterval);
    //             }
    //         }).then((result) => {
    //             /* Read more about handling dismissals below */
    //             if (result.dismiss === Swal.DismissReason.timer) {
    //                 console.log("I was closed by the timer");
    //             }
    //         });
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
}