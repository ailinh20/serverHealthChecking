document.addEventListener('DOMContentLoaded', function() {
    // Gọi API để lấy danh sách tất cả người dùng
    fetch('/api/v1/user')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                data.data.forEach(user => {
                    let idUser;
                    let SPO2;
                    let Heart;
                    console.log(user.username);
                    fetch(`/api/v1/user/getuser/${user.username}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            idUser = data.data._id;
                            console.log(`idUser for ${user.username}: ${idUser}`);
                            fetch(`/api/v1/sensor/getById/${idUser}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    SPO2 = data.sensor.sp02;
                                    Heart = data.sensor.heartbeat;
                                    console.log("user: "+ user.username+ "SPO2: "+ SPO2+ "Heart :"+ Heart)
                                    displayUser(user, SPO2, Heart);
                                } else {
                                    console.error('Không thể tìm thấy sensor');
                                }
                            })
                            .catch(error => {
                                console.error('Lỗi khi gọi API get sensor:', error);
                            });
                        
                        } else {
                            console.error('Không thể lấy idUser');
                        }
                    })
                    .catch(error => {
                        console.error('Lỗi khi gọi API getUserIdByUsername:', error);
                    });    
                });
                
            } else {
                console.error('Không thể lấy danh sách người dùng');
            }
        })
        .catch(error => {
            console.error('Lỗi khi gọi API getAllUsers:', error);
        });

});


function displayUser(user, sp02, heartbeat) {
    // Tạo một phần tử div mới cho mỗi người dùng
    const userDiv = document.createElement('div');
    userDiv.className = 'odr-content rounded';

    // Thêm nội dung HTML cho người dùng
    userDiv.innerHTML = `
        <a href="../app/patient-profile.html?username=${user.username}">
            <h4 class="mb-2">${user.name}</h4>
        </a>
        <p class="mb-3" id="SoDienThoai">${user.phoneNumber}</p>
        <img src="${user.UrlImg}" alt="Avatar" class="user-image"> <!-- Thêm hình ảnh -->
        <div id="stat">
            <section id="bpm-display-container">
                <div id="bpm-display">
                    <output id="bpm-value" title="Heart rate">${sp02}</output>
                    <label for="bpm-value">bpm</label>
                    <div id="bpm-icon"></div>
                </div>
            </section>
            <section id="bpm-display-container">
                <div id="spo2-display">
                    <output id="spo2-value" title="SpO2">${heartbeat}</output>
                    <label for="spo2-value">SpO2(%)</label>
                </div>
            </section>
            <div id="notification" class="text-animation">
                <span id="text-content"></span>
                <div id="face-emoji"></div>
            </div>
        </div>
    `;

    // Thêm người dùng vào trang web
    document.getElementById('userListContainer').appendChild(userDiv);
}
