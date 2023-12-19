  // Giả sử bạn có một biến isAuthenticated để kiểm tra đăng nhập
  var isAuthenticated = false; // Giả sử chưa đăng nhập

  // Kiểm tra và thêm hoặc ẩn liên kết đến trang Profile
  $(document).ready(function() {
    if (isAuthenticated) {
      // Đã đăng nhập, thêm liên kết đến trang Profile
      var profileLink = '<li class="nav-item"><a class="nav-link" href="profile.html">Profile</a></li>';
      $(".navbar-nav").append(profileLink);
    }
  });