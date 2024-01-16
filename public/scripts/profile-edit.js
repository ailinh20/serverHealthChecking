// Lấy các đối tượng input theo ID
var fullname = document.getElementById("fname");
var hospital = document.getElementById("oname");
var city = document.getElementById("cname");
var dayOfBirth = document.getElementById("dob");
var country = document.getElementById("exampleFormControlSelect3");
var address = document.getElementById("address");
var genderMale = document.getElementsByName('customRadio6');
var genderFemale = document.getElementsByName('customRadio7');



function getInforInit() {
    fetch(`/api/v1/admin/getadmin`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Điền thông tin người dùng vào các trường
                fullname.value = data.data.name || '';
                hospital.value = data.data.hospital || '';
                city.value = data.data.city || '';
                dayOfBirth.value = data.data.dayOfBirth || '';
                country.value = data.data.country || '';
                address.value = data.data.address || '';
                genderMale.value = data.data.male || false;
                genderFemale.value = data.data.female;
                
            } else {
                console.error('Không thể lấy thông tin người dùng');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gọi API getUser:', error);
        });
}
getInforInit();
function updateInfo() {
    // Get the selected radio button value
    
    
    const updatedAdminInfo = {
        name: fullname.value,
        hospital: hospital.value,
        city: city.value,
        dayOfBirth: dayOfBirth.value,
        country: country.value,
        address: address.value,
        male: genderMale.value,
        female : genderFemale.value,
        // Thêm các trường khác nếu cần
    };

    console.log("Nam",genderMale.value)
    console.log("Nu",genderFemale.value)
   
    // Hoặc có thể gửi dữ liệu lên server thông qua Ajax, tùy thuộc vào yêu cầu của bạn
    // Ví dụ sử dụng fetch:
    fetch('/api/v1/admin/updateadmin', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAdminInfo),
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
                console.log(data.data)
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cập nhật thông tin thất bại."
            });
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    return false;
}

