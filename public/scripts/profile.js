document.getElementById('inputImage').addEventListener('change', function(event) {
  var fileInput = event.target;
  var file = fileInput.files[0];

  if (file) {
      var reader = new FileReader();
      reader.onload = function(e) {
          // Cập nhật nguồn ảnh trên trang web
          document.getElementById('profileImage').src = e.target.result;
      };
      reader.readAsDataURL(file);
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Kiểm tra xem có giá trị loginIdentifier trong localStorage không
    const storedLoginIdentifier = localStorage.getItem('loginIdentifier');
    if (storedLoginIdentifier) {
        // Lấy thông tin người dùng khi trang được tải
        fetchUserInfo(storedLoginIdentifier);
        console.log("storedLoginIdentifier: " + storedLoginIdentifier);

        // Gán sự kiện cho nút "Save changes"
        document.querySelector('#saveChangesBtn').addEventListener('click', function() {
            saveChanges(storedLoginIdentifier);
        });
    } else {
        console.log("Không có giá trị Login Identifier trong localStorage");
    }
});

function fetchUserInfo(loginIdentifier) {
    // Thay thế '0918582160' bằng số điện thoại hoặc '...@gmail.com' bằng địa chỉ email
    fetch(`/api/v1/user/getuser/${loginIdentifier}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Điền thông tin người dùng vào các trường
                document.getElementById('inputFirstName').value = data.data.name || '';
                document.getElementById('inputLocation').value = data.data.address || '';
                document.getElementById('inputEmailAddress').value = data.data.email || '';
                document.getElementById('inputPhone').value = data.data.phoneNumber || '';
                document.getElementById('inputBirthday').value = data.data.dayOfBirth || '';
                document.getElementById('inputPassword').value = data.data.pass || '';
                console.log(data.data.address);
            } else {
                console.error('Không thể lấy thông tin người dùng');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gọi API getUser:', error);
        });
}

function saveChanges(loginIdentifier) {
    // Lấy giá trị từ các trường và gửi yêu cầu fetch để cập nhật thông tin người dùng
    const updatedUserInfo = {
        firstName: document.getElementById('inputFirstName').value,
        location: document.getElementById('inputLocation').value,
        emailAddress: document.getElementById('inputEmailAddress').value,
        phoneNumber: document.getElementById('inputPhone').value,
        birthday: document.getElementById('inputBirthday').value,
        pass: document.getElementById('inputPassword').value,
        // Thêm các trường khác nếu cần
    };
    console.log(updatedUserInfo); // Log để kiểm tra giá trị
    fetch(`/api/v1/user/updateuser/${loginIdentifier}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserInfo),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            Swal.fire({
                icon: "success",
                title: "Cập nhật thông tin thành công.",
                timer: 1200,
                timerProgressBar: true,
                showConfirmButton: false
            }).then((result) => {
                // Cập nhật lại thông tin người dùng trên trang nếu cần
                console.log("abc");
                fetchUserInfo(loginIdentifier);
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cập nhật thông tin thất bại."
            });
        }
    })
    .catch(error => {
        console.error('Lỗi khi gọi API updateUser:', error);
    });
}
