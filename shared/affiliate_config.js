/**
 * Shopee Affiliate Rewards Engine (Phần Thưởng Của Mẹ)
 * Kho quà tặng giáo dục sớm mầm non gợi ý cho mẹ khi bé hoàn thành bài test cuối tuần.
 * Gắn link Affiliate Shopee chính hãng, tự nhiên, mang ý nghĩa khen thưởng giáo dục.
 * QUY TẮC BẮT BUỘC: TUYỆT ĐỐI KHÔNG GẮN GIÁ TIỀN VÀO GỢI Ý.
 */
const AffiliateConfig = {
  // Link Shopee Affiliate mặc định (Dễ dàng thay đổi tracking code hoặc deep link của bạn)
  DEFAULT_SHOPEE_BASE: 'https://shopee.vn/search?keyword=',

  // Cụm từ kêu gọi hành động (CTA) thuần Shopee, tập trung vào tình yêu thương và khen thưởng cho bé
  shopeeCtaList: [
    '🎁 Mở Quà Shopee Khen Thưởng Bé ➜',
    '✨ Khám Phá Quà Tặng Cho Bé Trên Shopee ➜',
    '🛒 Mở Quà Shopee Thưởng Bé Yêu ➜',
    '💌 Mẹ Mở Quà Khen Thưởng Bé Trên Shopee ➜',
    '🌟 Nhận Quà Khen Thưởng Cho Bé Trên Shopee ➜',
    '💖 Mở Hộp Quà Shopee Cho Bé Cưng ➜'
  ],

  getRandomCTA() {
    const idx = Math.floor(Math.random() * this.shopeeCtaList.length);
    return this.shopeeCtaList[idx];
  },

  // Danh mục quà tặng 52 tuần: TUYỆT ĐỐI KHÔNG HIỆN GIÁ TIỀN, KHÔNG DÙNG TỪ MUA BÁN
  weeklyGifts: [
    {
      week: 1,
      title: 'Bộ Sách Ehon Gia Đình Ấm Áp "Cả Nhà Yêu Thương"',
      subTitle: 'Phần thưởng ý nghĩa sau tuần học đầu tiên về Ba Mẹ và Bé',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ các mẹ bỉm sữa',
      emoji: '👶📖',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 1',
      whyBuy: 'Trang tranh màu sắc ấm áp giúp bé gắn kết tình cảm với Ba Mẹ và thực hành lại các từ Baby, Mommy, Daddy bé vừa học xuất sắc!',
      shopeeKeyword: 'sach ehon gia dinh cho be mam non',
      shopeeUrl: 'https://shopee.vn/search?keyword=sach+ehon+gia+dinh+cho+be+mam+non'
    },
    {
      week: 2,
      title: 'Bộ Đồ Chơi Hoa Quả Cắt Bằng Gỗ Tự Nhiên Bo Tròn An Toàn',
      subTitle: 'Món quà tương ứng bài học Tuần 2: Thức Ăn & Trái Cây',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '🍎🧺',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 2',
      whyBuy: 'Bé vừa chơi trò cắt hoa quả vừa rèn luyện đôi bàn tay khéo léo và ôn lại các từ Apple, Banana, Bread, Milk bé đã học!',
      shopeeKeyword: 'bo do choi cat hoa qua go cho be',
      shopeeUrl: 'https://shopee.vn/search?keyword=bo+do+choi+cat+hoa+qua+go+cho+be'
    },
    {
      week: 3,
      title: 'Bộ Mô Hình Đoàn Tàu Hỏa & Xe Giao Thông Bằng Gỗ Chạy Trớn',
      subTitle: 'Món quà tương ứng bài học Tuần 3: Phương Tiện Giao Thông',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '🚂🚗',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 3',
      whyBuy: 'Đoàn tàu bằng gỗ mộc mịn màng không góc nhọn, bé tự tay đẩy trớn và hào hứng gọi tên Car, Bus, Train như trong trò chơi.',
      shopeeKeyword: 'doan tau go chay tron montessori cho be',
      shopeeUrl: 'https://shopee.vn/search?keyword=doan+tau+go+chay+tron+montessori+cho+be'
    },
    {
      week: 4,
      title: 'Bảng Ghép Hình Núm Gỗ Động Vật Nông Trại Montessori',
      subTitle: 'Món quà tương ứng bài học Tuần 4: Bạn Thú Đáng Yêu',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '🐶🐱',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 4',
      whyBuy: 'Bé tập cầm nắm các núm gỗ hình chú Chó, Mèo, Vịt, rèn thị giác không gian và phát âm tiếng Anh các bạn thú cưng.',
      shopeeKeyword: 'bang ghep hinh num go dong vat cho be',
      shopeeUrl: 'https://shopee.vn/search?keyword=bang+ghep+hinh+num+go+dong+vat+cho+be'
    },
    {
      week: 5,
      title: 'Bộ Xếp Hình Nam Châm Khám Phá Cơ Thể & Quần Áo Xinh',
      subTitle: 'Món quà tương ứng bài học Tuần 5: Bộ Phận Cơ Thể & Trang Phục',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '👀👕',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 5',
      whyBuy: 'Bé hào hứng gắn nam châm lên bảng để phối đồ và chỉ đúng Mắt (Eye), Mũi (Nose), Áo (Shirt), Mũ (Hat) cho bạn nhỏ.',
      shopeeKeyword: 'xep hinh nam cham co the trang phuc cho be',
      shopeeUrl: 'https://shopee.vn/search?keyword=xep+hinh+nam+cham+co+the+trang+phuc+cho+be'
    },
    {
      week: 6,
      title: 'Đàn Gõ Xylophone 8 Thanh Màu Sắc Âm Thanh Trong Trẻo',
      subTitle: 'Món quà tương ứng bài học Tuần 6: Nốt Nhạc & Giai Điệu Vui',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '🎹🎵',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 6',
      whyBuy: 'Phím đàn gỗ sắc màu tươi sáng giúp bé luyện cảm âm cao độ và tự tay gõ những bản nhạc thiếu nhi vui nhộn.',
      shopeeKeyword: 'dan go xylophone 8 thanh cho be',
      shopeeUrl: 'https://shopee.vn/search?keyword=dan+go+xylophone+8+thanh+cho+be'
    },
    {
      week: 7,
      title: 'Bộ Đất Nặn Hữu Cơ Từ Bột Mì Tự Nhiên & Khuôn Con Vật',
      subTitle: 'Món quà tương ứng bài học Tuần 7: Sáng Tạo Hình Khối & Màu Sắc',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '🎨🐸',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 7',
      whyBuy: 'Đất nặn bột mì an toàn tuyệt đối giúp đôi tay bé mềm mại, tự do nhào nặn các bạn thú và hình tròn, vuông theo ý thích.',
      shopeeKeyword: 'dat nan huu co bot mi cho be',
      shopeeUrl: 'https://shopee.vn/search?keyword=dat+nan+huu+co+bot+mi+cho+be'
    },
    {
      week: 8,
      title: 'Bộ Đồ Chơi Nhà Tắm Thú Phun Nước & Vớt Bọt Silicon Cao Cấp',
      subTitle: 'Món quà tương ứng bài học Tuần 8: Tắm Mát & Giữ Vệ Sinh',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '🧼🦆',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 8',
      whyBuy: 'Biến giờ tắm của bé thành đại dương vui nhộn với bạn Vịt, bạn Heo bơi lội, bé yêu thích việc giữ gìn cơ thể sạch sẽ mỗi ngày.',
      shopeeKeyword: 'do choi nha tam phun nuoc silicon cho be',
      shopeeUrl: 'https://shopee.vn/search?keyword=do+choi+nha+tam+phun+nuoc+silicon+cho+be'
    },
    {
      week: 9,
      title: 'Tháp Xếp Chồng Cầu Vồng 7 Tầng Bằng Gỗ Mộc Nhẵn Mịn',
      subTitle: 'Món quà tương ứng bài học Tuần 9: Cao Thấp & Xếp Tháp',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '🏗️🌈',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 9',
      whyBuy: 'Giúp bé nhận biết thứ tự to - nhỏ, cao - thấp và kiên nhẫn xếp tháp vững vàng như trong trò chơi Stack & Crash!',
      shopeeKeyword: 'thap xep chong cau vong go montessori cho be',
      shopeeUrl: 'https://shopee.vn/search?keyword=thap+xep+chong+cau+vong+go+montessori+cho+be'
    },
    {
      week: 10,
      title: 'Bộ Thẻ Flashcard Song Ngữ Cỡ Lớn Bo Tròn Dày Dặn Kèm Hình 3D',
      subTitle: 'Món quà tương ứng bài học Tuần 10: Tổng Ôn Siêu Trí Nhớ',
      rating: '⭐⭐⭐⭐⭐ Đánh giá 5 sao từ phụ huynh',
      emoji: '🃏✨',
      badge: '🏆 Phần Thưởng Xuất Sắc Tuần 10',
      whyBuy: 'Thẻ in sắc nét, cán màng chống nước giúp mẹ và bé cùng đố vui, củng cố toàn bộ vốn từ vựng bé đã tích lũy trên app.',
      shopeeKeyword: 'the flashcard song ngu tieng anh cho be mam non',
      shopeeUrl: 'https://shopee.vn/search?keyword=the+flashcard+song+ngu+tieng+anh+cho+be+mam+non'
    }
  ],

  // Lấy quà tặng theo tuần (Tự động xoay vòng linh hoạt cho toàn bộ 52 tuần)
  getWeeklyReward(weekNum) {
    const validWeek = parseInt(weekNum) || 1;
    const idx = (validWeek - 1) % this.weeklyGifts.length;
    const baseGift = this.weeklyGifts[idx];

    return {
      ...baseGift,
      week: validWeek,
      badge: `🏆 Phần Thưởng Xuất Sắc Tuần ${validWeek}`,
      // Link Shopee chuẩn Universal Link kèm từ khóa tối ưu tìm kiếm sản phẩm chính hãng
      shopeeUrl: baseGift.shopeeUrl || `${this.DEFAULT_SHOPEE_BASE}${encodeURIComponent(baseGift.shopeeKeyword)}`
    };
  }
};

if (typeof window !== 'undefined') {
  window.AffiliateConfig = AffiliateConfig;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AffiliateConfig;
}
