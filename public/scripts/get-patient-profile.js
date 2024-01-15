
function getInforPatient() {
    var fullname = document.getElementById("HoTen");
    var dayOfBirth = document.getElementById("NgaySinh");
    var address = document.getElementById("DiaChi");
    var phoneNumber = document.getElementsByName('SoDienThoai');
    var email = document.getElementsByName('Email');

    fetch(`/api/v1/admin/getadmin`)/////////////// chưa sửa
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fullname.value = data.data.name || ''; /////////////// chưa sửa
                dayOfBirth.value = data.data.hospital || ''; /////////////// chưa sửa
                address.value = data.data.city || ''; /////////////// chưa sửa
                phoneNumber.value = data.data.dayOfBirth || ''; /////////////// chưa sửa
                email.value = data.data.country || ''; /////////////// chưa sửa
            } else {
                console.error('Không thể lấy thông tin người dùng');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gọi API getUser:', error);
        });
}