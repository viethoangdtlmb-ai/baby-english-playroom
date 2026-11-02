/**
 * Certificate Engine (Bằng Khen Thành Tích Khung Ảnh Cho Bé)
 * Tự động tạo ảnh Bằng Khen nét căng 1080x1350px (tỉ lệ 4:5 chuẩn Facebook / Zalo)
 * Tích hợp ảnh thật/avatar của bé, tên bé, cúp vàng 3D, 5 sao thành tích và từ vựng trong tuần.
 */
const CertificateEngine = {
  CANVAS_WIDTH: 1080,
  CANVAS_HEIGHT: 1350,

  DYNAMIC_LINK_URL: 'https://samngoclinh.github.io/dynamic_link/BabyEnglish/',

  /**
   * QR Code sạch sắc nét (không chấm vàng, viền mỏng 1px) trỏ trực tiếp tới Dynamic Link BabyEnglish
   */
  QR_CODE_DATA_URL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjAAAAIwCAIAAAAXk8Y4AAALmUlEQVR4nO3dwY0jNxRF0ZahMGavuByZ49LeeXDgBAwQ04Tub56zH02piq2LWr3HWusLAD7tr09fAAD8R5AASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABKeu//g/evvM1dyqde//xz9/N3ntXs9pz//NtP/vqafn+n3v2b3eXlDAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAZu4h7bpt/6a2p3L6/tu/+azT9/+06b8P069/1+nz4w0JgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkAC4Yw9pl72Wz96f6fs6p/eW7DnNOp81tef1it1Pb0gAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBEBCbg+Jz6rttdT2XWr7SbXrmf75fJY3JAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIMEeEn/k9N7M9H2m276vfSP+hDckABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgIbeHZO9klul7NrXrOX0/T+8t1a6/9nxr11PjDQmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQALhjD+n0/gqz9mZqn79r+h4P38vv2/fyhgRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIAMzcQ7LvMsv0/aHbnP77qj3f2vnx+/ZZ3pAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYCEx1pr6x/Y1/nZ+yunn++u0+ehdv2n/1583+/9/Olesd8fb0gAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBEDCc/p+Rs30vZnaPs30+19T25eqnZ/Tpu8zvQ8/L29IACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAwmOttfUPbtsvqe3H7Dr9vGqfX1O7n9PVzkPt+b6H/155QwIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABKeX8NN3/+o7bvUrmf6Ps1tz+u2+3/b79v78PPyhgRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQ81lpH/4Pa3kltP+a02v2cfj3Tz0/t/tdMPw+v2PXbQwJgJEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEjI7SFN34Nh1v7K9D2n6Wp/j7XzMP382EMCYCRBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIeH4NV9u/safys51+vrXzMF3tPNeuZ9fp8+kNCYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAAmLmHVNvzqF1PbT+p9vnTnd6D8bz+n72on30/vSEBkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAz95Bq+xm1fZfTezbTn1dtT+i02r7R9Pt/+vNr+1Kv2N/v6fPmDQmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEh4rLW2/sFt+y7T1fZaantF069/V+3vpfZ7clrt+l+x32dvSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQMLz0xdQV9tTqe3fTN+vqu3x3HZ/Tn/f2v5Q7by9Y+fTGxIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZCQ20Oy3zNrr+X050/fy6mdn9Nq96e2P3TbHtsub0gAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBEDCY6119D+Yvo9yWm0vp/a8dt12/btqez8108/DK/b7uXs93pAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYCEZ20Po7a/UtsXme70+Zl+3k6bvq+z6/R5qO0nTecNCYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASHista7aQ6pdz67b9mluM/3va9dt56F2/2vPyxsSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQ8PyKqe391K6nprbHU3teteu57TzUTL8/78Pn3xsSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQkNtDqqnt90y/ntr3nX5/amrPq6Z2Ht6x6/GGBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAJAgSAAmCBECCIAGQIEgAzNxDmr7XMv36b9vvue15Td8fum2/p/a83rHP373/3pAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYAEQQIgQZAASBAkABIECYCZe0i1/ZXpdvdCTu8b1ZzeX5m+r1PbH3LefrbX4e/rDQmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAJi5h7Trtr2Q03swtX2g6eendj5r9/82t52HV+z7ekMCIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJADu2EOavgdT2wupmf68pu/NnN7Hmr7XVTufp70O38/T58cbEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkJDbQ+J71fZOans5u2r35/Tn737f2vOa/nxfsT2209fvDQmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEgQJAASBAmABEECIEGQAEiwh0R6L2fX6T2e6fdnV+373ran9Y5dz2nekABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgARBAiBBkABIECQAEgQJgITcHlJtn6Nm+v25bc/mtNPf97b9pF2165nOGxIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAXDHHpL9j1l7M7XnO/381J5X7TxM3yuqPd9dtev3hgRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQIEgAJggRAgiABkCBIACQ81lqfvgYA8IYEQIMgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAAkCBIACYIEQIIgAZAgSAB8FfwGUMTijYjmppQAAAAASUVORK5CYII=',

  /**
   * 20 Lời Nhắn Yêu Thương Tinh Tế & Giàu Cảm Xúc (Đúng tâm lý gia đình)
   */
  LOVE_MESSAGES: [
    {
      line1: '"Con gửi tặng thành tích xuất sắc này cho Ông Bà và Ba Mẹ nè!',
      line2: 'Con đã nỗ lực vượt qua bài thi cuối tuần và nhớ hết từ mới rồi!',
      line3: 'Cả nhà hãy cùng khen thưởng và ôm con một cái thật to nhé! ❤️"'
    },
    {
      line1: '"Ba Mẹ ơi, hôm nay con đã học thuộc hết từ vựng tuần này rồi!',
      line2: 'Mỗi ngày con đều tiến bộ một chút để cả nhà luôn tự hào về con.',
      line3: 'Ba Mẹ thưởng cho con một tràng pháo tay thật giòn giã nha! 🌟"'
    },
    {
      line1: '"Gửi Ông Bà và Ba Mẹ kính yêu của con!',
      line2: 'Con đã hoàn thành xuất sắc thử thách 5 sao vàng tuần này rồi đó ạ!',
      line3: 'Con yêu cả nhà nhiều lắm, cả nhà thơm má con đi nè! 🥰"'
    },
    {
      line1: '"Ting ting! Bằng khen siêu sao tiếng Anh của con đã về tới tay rồi!',
      line2: 'Con học vui lắm, phát âm chuẩn và nhớ từ siêu nhanh luôn.',
      line3: 'Tối nay Ba Mẹ đọc truyện tiếng Anh cùng con trước khi ngủ nhé! 📖"'
    },
    {
      line1: '"Ba Mẹ có thấy con hôm nay giỏi giang không nè?',
      line2: 'Tuần này con đã chinh phục trọn vẹn bài học và đạt điểm tối đa!',
      line3: 'Cả nhà chụp hình cùng con để khoe với mọi người nhé! 📸"'
    },
    {
      line1: '"Con gửi ngàn nụ hôn và chiếc cúp vàng này cho Mẹ yêu!',
      line2: 'Mẹ đồng hành cùng con mỗi ngày làm con vui và hào hứng học lắm.',
      line3: 'Mẹ luôn là cô giáo tuyệt vời nhất của con trên đời! 💐"'
    },
    {
      line1: '"Gửi Ba Mẹ siêu nhân tuyệt vời của con!',
      line2: 'Con đã cố gắng học thật chăm chỉ và giành được 5 ngôi sao lấp lánh.',
      line3: 'Cuối tuần này Ba Mẹ dẫn con đi dạo chơi công viên nhé! 🎠"'
    },
    {
      line1: '"Con tặng cúp vàng tiếng Anh này cho Ông Bà thân thương!',
      line2: 'Mỗi lần nghe con bập bẹ nói tiếng Anh, Ông Bà đều cười thật tươi.',
      line3: 'Con chúc Ông Bà luôn mạnh khỏe và sống vui cùng con ạ! 🌸"'
    },
    {
      line1: '"Hôm nay con đã là một em bé kiên trì và tự giác rồi!',
      line2: 'Con tự mình hoàn thành hết các trò chơi và bài ôn tập tuần này.',
      line3: 'Ba Mẹ thấy con đã lớn thêm một chút xíu rồi đúng không nè? 🌱"'
    },
    {
      line1: '"Bé cưng của Ba Mẹ đã xuất sắc giành cúp vàng tuần này rồi nè!',
      line2: 'Con nhớ vanh vách từng từ mới và phát âm rất tự tin.',
      line3: 'Cả nhà cùng nhau nhảy một điệu nhảy chiến thắng ăn mừng nha! 💃"'
    },
    {
      line1: '"Mỗi tuần trôi qua là một chuyến phiêu lưu tiếng Anh diệu kỳ!',
      line2: 'Con được khám phá thế giới muôn màu và biết thêm bao điều mới.',
      line3: 'Cảm ơn Ba Mẹ đã luôn bên cạnh và cổ vũ cho con từng bước! 🚀"'
    },
    {
      line1: '"Ba Mẹ ơi, con đã thuộc hết từ vựng của tuần này rồi đó nha!',
      line2: 'Con phát âm to, rõ ràng và nhận diện hình ảnh cực kỳ chuẩn xác.',
      line3: 'Ba Mẹ mau thưởng cho con một cái ôm ấm áp đi nào! 🤗"'
    },
    {
      line1: '"Bằng khen này là món quà nhỏ con dành tặng cả gia đình mình!',
      line2: 'Con hứa sẽ tiếp tục chăm ngoan, học giỏi và vâng lời Ba Mẹ.',
      line3: 'Cả nhà mình cùng nhau lưu giữ khoảnh khắc đáng yêu này nhé! 🎀"'
    },
    {
      line1: '"Con đã chứng minh em bé nhỏ cũng làm được điều phi thường!',
      line2: 'Vượt qua thử thách cuối tuần với trọn vẹn 5 sao vàng sáng rực rỡ.',
      line3: 'Ba Mẹ hãy tự hào về em bé thông minh, đáng yêu này nha! 👑"'
    },
    {
      line1: '"Niềm vui lớn nhất của con là được học tiếng Anh cùng Ba Mẹ!',
      line2: 'Tuần này con đã xuất sắc ghi nhớ toàn bộ từ khóa chủ đề rồi.',
      line3: 'Tối nay cả nhà mình cùng nghe lại bài hát tiếng Anh vui nhộn nhé! 🎶"'
    },
    {
      line1: '"Gửi tặng Ba Mẹ chiếc bằng khen lấp lánh nỗ lực của con!',
      line2: 'Con không hề nản lòng mà luôn cố gắng để đạt kết quả tốt nhất.',
      line3: 'Ba Mẹ hãy xoa đầu và khen con: \\"Bé cưng giỏi quá\\" nhé! 🌈"'
    },
    {
      line1: '"Hooray! Tuần này con đã thu hoạch cả một giỏ từ vựng mới toanh!',
      line2: 'Con tự tin nói tiếng Anh líu lo như chú chim nhỏ trong vườn.',
      line3: 'Cả nhà cùng chia sẻ niềm vui này tới bạn bè và người thân nha! 🎈"'
    },
    {
      line1: '"Con gửi tình yêu to đùng vào tấm bằng khen này cho Ba Mẹ!',
      line2: 'Từng ngôi sao vàng là từng ngày con chăm chỉ rèn luyện.',
      line3: 'Ba Mẹ là động lực lớn nhất để con tự tin vươn xa mỗi ngày! 💖"'
    },
    {
      line1: '"Ông Bà và Ba Mẹ ơi, con làm được rồi nè!',
      line2: 'Bài thi cuối tuần không làm khó được em bé thông minh của gia đình.',
      line3: 'Con sẽ tiếp tục cố gắng để tuần nào cũng mang cúp vàng về nhà! 🏆"'
    },
    {
      line1: '"Con yêu việc học tiếng Anh mỗi ngày vì ở đây ngập tràn niềm vui!',
      line2: 'Tuần này con đã hoàn thành tất cả nhiệm vụ một cách xuất sắc nhất.',
      line3: 'Con yêu Ba Mẹ nhiều như muôn vàn vì sao trên bầu trời đêm! 🌌"'
    }
  ],

  /**
   * Lấy lời nhắn theo tuần (hoặc xoay tua ngẫu nhiên)
   */
  getLoveMessage(weekNum = 1) {
    const safeWeek = Math.max(1, parseInt(weekNum, 10) || 1);
    const idx = (safeWeek - 1) % this.LOVE_MESSAGES.length;
    return this.LOVE_MESSAGES[idx] || this.LOVE_MESSAGES[0];
  },

  /**
   * Trích xuất thông tin chủ đề & danh sách từ vựng chuẩn từ ToddlerVocabulary
   */
  getWeekCurriculum(weekNum = 1) {
    const safeWeek = Math.max(1, Math.min(52, parseInt(weekNum, 10) || 1));
    let weekTitle = 'Bé Chinh Phục Thử Thách';
    let wordsStr = '';

    if (typeof ToddlerVocabulary !== 'undefined') {
      try {
        if (ToddlerVocabulary.CURRICULUM_52_WEEKS) {
          const plan = ToddlerVocabulary.CURRICULUM_52_WEEKS[safeWeek - 1] || ToddlerVocabulary.CURRICULUM_52_WEEKS[0];
          if (plan) {
            if (plan.title) weekTitle = plan.title;
            if (plan.words && plan.words.length > 0) {
              const wordList = plan.words.map(wId => {
                const found = ToddlerVocabulary.findWordById ? ToddlerVocabulary.findWordById(wId) : null;
                const rawWord = found ? (found.word || found.id) : wId;
                return rawWord.charAt(0).toUpperCase() + rawWord.slice(1);
              });
              wordsStr = wordList.join(' • ');
            }
          }
        }
      } catch (e) {
        console.warn('[CertificateEngine] Lỗi trích xuất giáo trình tuần:', e);
      }
    }

    return {
      weekTitle: `TUẦN ${safeWeek} • CHỦ ĐỀ: ${weekTitle.toUpperCase()}`,
      wordsStr: wordsStr ? `✨ Từ vựng tinh thông: ${wordsStr} ✨` : '✨ Bé học chăm chỉ & nhớ từ siêu nhanh ✨'
    };
  },

  /**
   * Tải trước một hình ảnh từ URL thành HTMLImageElement
   */
  loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      if (typeof window !== 'undefined' && window.location && window.location.protocol !== 'file:') {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  },

  /**
   * Vẽ khung tròn có ảnh (Avatar bé)
   */
  drawCircularImage(ctx, img, cx, cy, radius, borderWidth = 12, borderColor = '#FFB300') {
    ctx.save();
    // Vẽ bóng đổ ngoài
    ctx.shadowColor = 'rgba(255, 179, 0, 0.45)';
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 10;

    // Vành vàng ngoài
    ctx.beginPath();
    ctx.arc(cx, cy, radius + borderWidth, 0, Math.PI * 2);
    ctx.fillStyle = borderColor;
    ctx.fill();

    // Vành trắng trong
    ctx.shadowColor = 'transparent';
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 4, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

    // Clip ảnh tròn
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (img) {
      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) / 2;
      ctx.drawImage(img, sx, sy, minDim, minDim, cx - radius, cy - radius, radius * 2, radius * 2);
    } else {
      ctx.fillStyle = '#FFE082';
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
      ctx.fillStyle = '#E65100';
      ctx.font = 'bold 80px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('⭐', cx, cy);
    }

    ctx.restore();
  },

  /**
   * Vẽ Ngôi Sao Vàng Hoàng Gia 3D Vector (Không lo lỗi font hay wireframe trên mọi thiết bị)
   */
  drawGoldenStar(ctx, cx, cy, outerRadius = 26, innerRadius = null) {
    if (!innerRadius) innerRadius = outerRadius * 0.44;
    ctx.save();

    // Bóng đổ vàng ấm áp
    ctx.shadowColor = 'rgba(255, 143, 0, 0.4)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    ctx.beginPath();
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / 5;

    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < 5; i++) {
      let x = cx + Math.cos(rot) * outerRadius;
      let y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();

    // Gradient vàng kim hoàng gia óng ánh
    const starGrad = ctx.createLinearGradient(cx - outerRadius, cy - outerRadius, cx + outerRadius, cy + outerRadius);
    starGrad.addColorStop(0, '#FFF59D'); // Vàng sáng óng ánh
    starGrad.addColorStop(0.3, '#FFD54F');
    starGrad.addColorStop(0.7, '#FFB300');
    starGrad.addColorStop(1, '#FF8F00'); // Vàng cam chiều sâu 3D
    ctx.fillStyle = starGrad;
    ctx.fill();

    // Viền nét chỉ vàng cam sắc nét
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#FFA000';
    ctx.stroke();

    ctx.restore();
  },

  /**
   * Sinh Canvas Bằng Khen hoàn chỉnh
   */
  async generateCanvas(weekNum = 1, basePath = '') {
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (e) { /* ignore */ }
    }
    const canvas = document.createElement('canvas');
    canvas.width = this.CANVAS_WIDTH;
    canvas.height = this.CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');

    const prefix = basePath ? (basePath.endsWith('/') ? basePath : basePath + '/') : '';
    const prof = (typeof BabyProfile !== 'undefined') ? BabyProfile.getProfile() : { name: 'Bé Yêu', age: 3 };
    const rawName = (prof.name || 'Bé Yêu').trim();
    const formattedName = rawName.toLowerCase().startsWith('bé ')
      ? rawName.toUpperCase()
      : `BÉ ${rawName.toUpperCase()}`;
    const babyAge = prof.age || 3;
    const avatarSrc = (typeof BabyProfile !== 'undefined' && typeof BabyProfile.getAvatarSrc === 'function') 
      ? BabyProfile.getAvatarSrc(basePath) 
      : `${prefix}assets/icons/baby.png`;

    // 1. TẢI CÁC TÀI NGUYÊN ẢNH (Kèm QR Code)
    const [avatarImg, trophyImg, starImg, crownImg, ribbonImg, qrImg] = await Promise.all([
      this.loadImage(avatarSrc),
      this.loadImage(`${prefix}assets/icons/cup.png`).then(img => img || this.loadImage(`${prefix}assets/icons/star.png`)),
      this.loadImage(`${prefix}assets/icons/star.png`),
      this.loadImage(`${prefix}assets/icons/crown.png`),
      this.loadImage(`${prefix}assets/icons/ribbon.png`),
      this.loadImage(this.QR_CODE_DATA_URL)
    ]);

    // 2. NỀN GIẤY HOÀNG GIA PASTEL
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.CANVAS_HEIGHT);
    bgGrad.addColorStop(0, '#FFFDF5');
    bgGrad.addColorStop(0.5, '#FFF8E7');
    bgGrad.addColorStop(1, '#FFF3D6');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    // Chấm bi sao nhỏ li ti chìm
    ctx.fillStyle = 'rgba(255, 179, 0, 0.08)';
    for (let x = 40; x < this.CANVAS_WIDTH; x += 60) {
      for (let y = 40; y < this.CANVAS_HEIGHT; y += 60) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. KHUNG VIỀN ĐÔI MẠ VÀNG SANG TRỌNG
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#FFA000';
    ctx.strokeRect(36, 36, this.CANVAS_WIDTH - 72, this.CANVAS_HEIGHT - 72);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFD54F';
    ctx.strokeRect(54, 54, this.CANVAS_WIDTH - 108, this.CANVAS_HEIGHT - 108);

    // 4 góc trang trí hoa văn vàng
    const drawCornerDeco = (x, y) => {
      ctx.save();
      ctx.fillStyle = '#FFA000';
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFF9C4';
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCornerDeco(54, 54);
    drawCornerDeco(this.CANVAS_WIDTH - 54, 54);
    drawCornerDeco(54, this.CANVAS_HEIGHT - 54);
    drawCornerDeco(this.CANVAS_WIDTH - 54, this.CANVAS_HEIGHT - 54);

    // 4. TIÊU ĐỀ BẢNG VÀNG (Đẩy lên y = 110 tạo khoảng cách thoáng đạt)
    const ribbonY = 110;
    ctx.save();
    ctx.shadowColor = 'rgba(216, 27, 96, 0.25)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#E91E63';
    ctx.beginPath();
    ctx.roundRect(this.CANVAS_WIDTH / 2 - 360, ribbonY - 38, 720, 76, 38);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 34px "Nunito", "Baloo 2", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌟 BẢNG VÀNG THÀNH TÍCH TIẾNG ANH 🌟', this.CANVAS_WIDTH / 2, ribbonY);

    // Dòng chữ "CHỨNG NHẬN XUẤT SẮC"
    ctx.fillStyle = '#C2185B';
    ctx.font = '900 42px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText('CHỨNG NHẬN XUẤT SẮC', this.CANVAS_WIDTH / 2, 188);

    // Trích xuất chủ đề và danh sách từ vựng tuần thực tế từ 52 tuần
    const curriculum = this.getWeekCurriculum(weekNum);

    // Dòng 1: Chủ đề tuần
    ctx.fillStyle = '#5D4037';
    ctx.font = '800 27px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(curriculum.weekTitle, this.CANVAS_WIDTH / 2, 238);

    // Dòng 2: Từ vựng tinh thông của tuần
    ctx.fillStyle = '#2E7D32';
    ctx.font = '700 22px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(curriculum.wordsStr, this.CANVAS_WIDTH / 2, 274);

    // 5. VÒNG TRÒN ẢNH BÉ & VƯƠNG MIỆN (Hoàn toàn không đè chữ)
    // Chữ kết thúc ở y = 274, vương miện đặt tại y = 312 -> Khoảng hở an toàn 38px!
    const avatarY = 505;
    const avatarRadius = 135;

    // Vương miện ngự đỉnh vòng tròn avatar
    if (crownImg) {
      ctx.drawImage(crownImg, this.CANVAS_WIDTH / 2 - 41, 312, 82, 68);
    }

    this.drawCircularImage(ctx, avatarImg, this.CANVAS_WIDTH / 2, avatarY, avatarRadius, 14, '#FFB300');

    // 6. TÊN BÉ VÀ TUỔI
    const nameY = 690;
    ctx.fillStyle = '#D81B60';
    ctx.font = '900 54px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(formattedName, this.CANVAS_WIDTH / 2, nameY);

    ctx.fillStyle = '#8D6E63';
    ctx.font = '800 28px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(`✨ ${babyAge} Tuổi • Học Giỏi & Vui Khỏe Mỗi Ngày ✨`, this.CANVAS_WIDTH / 2, nameY + 46);

    // 7. DÃY 5 NGÔI SAO VÀNG ĐẠT ĐƯỢC
    const starsY = 795;
    const starCount = 5;
    const starSpacing = 72;
    const startX = this.CANVAS_WIDTH / 2 - ((starCount - 1) * starSpacing) / 2;

    for (let i = 0; i < starCount; i++) {
      const sx = startX + i * starSpacing;
      if (starImg) {
        ctx.drawImage(starImg, sx - 26, starsY - 26, 52, 52);
      } else {
        this.drawGoldenStar(ctx, sx, starsY, 26);
      }
    }

    // 8. KHUNG THÔNG ĐIỆP GỬI ÔNG BÀ & BA MẸ (Lấy 1 trong 20 lời nhắn ngẫu nhiên theo tuần)
    const cardY = 870;
    const loveMsg = this.getLoveMessage(weekNum);

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(110, cardY, this.CANVAS_WIDTH - 220, 230, 26);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFE082';
    ctx.stroke();
    ctx.restore();

    // Dòng chữ nhắn nhủ
    ctx.fillStyle = '#3E2723';
    ctx.font = '800 30px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText('💌 LỜI NHẮN YÊU THƯƠNG TỪ BÉ', this.CANVAS_WIDTH / 2, cardY + 44);

    ctx.fillStyle = '#6D4C41';
    ctx.font = '700 24px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(loveMsg.line1, this.CANVAS_WIDTH / 2, cardY + 92);
    ctx.fillText(loveMsg.line2, this.CANVAS_WIDTH / 2, cardY + 132);

    ctx.fillStyle = '#E91E63';
    ctx.font = '900 26px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(loveMsg.line3, this.CANVAS_WIDTH / 2, cardY + 180);

    // 9. DƯỚI CÙNG: CON DẤU VÀ NGÀY CẤP (BÊN TRÁI) + MÃ QR QUÉT TẢI APP (BÊN PHẢI)
    const today = new Date();
    const dateStr = `Ngày ${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()} tháng ${(today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)} năm ${today.getFullYear()}`;

    // --- CỤM CHỨNG NHẬN BÊN TRÁI: CON DẤU ĐỎ + NGÀY CẤP BÊN DƯỚI ---
    const sealX = 200;
    const sealY = 1175;

    ctx.save();
    ctx.translate(sealX, sealY);
    ctx.rotate(-0.06);
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#D81B60';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#D81B60';
    ctx.stroke();
    ctx.fillStyle = '#D81B60';
    ctx.font = '900 12px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MONTESSORI VERIFIED', 0, -13);
    ctx.font = '900 17px "Nunito", sans-serif';
    ctx.fillText('XUẤT SẮC', 0, 5);
    ctx.font = '700 10px "Nunito", sans-serif';
    ctx.fillText('★ ★ ★ ★ ★', 0, 22);
    ctx.restore();

    // Ngày cấp đặt ngay dưới con dấu chứng nhận (Chuẩn mực bằng khen)
    ctx.fillStyle = '#8D6E63';
    ctx.font = 'italic 700 19px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dateStr, sealX, sealY + 68);

    // --- CỤM CÔNG NGHỆ BÊN PHẢI: THẺ QR CODE + LỜI MỜI QUÉT TẢI APP ---
    const qrSize = 115;
    const qrX = this.CANVAS_WIDTH - 215;
    const qrY = 1145;

    // Khung thẻ trắng nền cho QR code
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 16);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFE082';
    ctx.stroke();
    ctx.restore();

    if (qrImg) {
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
    }

    // Chú thích gọn gàng bên trái QR (Rộng rãi, thoáng mắt, không nhồi nhét)
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#E65100';
    ctx.font = '900 21px "Nunito", sans-serif';
    ctx.fillText('📷 Quét mã tải app', qrX - 25, qrY + 36);

    ctx.fillStyle = '#D81B60';
    ctx.font = '900 24px "Nunito", sans-serif';
    ctx.fillText('BabyEnglish Playroom 🌟', qrX - 25, qrY + 78);

    try {
      // Kiểm tra xem canvas có bị trình duyệt đánh dấu tainted trên protocol file:// không
      canvas.toDataURL('image/png', 0.1);
      return canvas;
    } catch (e) {
      console.warn('[CertificateEngine] Canvas tainted on local file:// protocol, switching to untainted vector canvas');
      return this._renderPureVectorCanvas(weekNum, basePath, prof);
    }
  },

  /**
   * Render Canvas 100% Vector & Data-URI (Không phụ thuộc ảnh tĩnh ngoại vi)
   * Đảm bảo xuất file PNG an toàn tuyệt đối trên mọi nền tảng kể cả file://
   */
  async _renderPureVectorCanvas(weekNum = 1, basePath = '', prof = null) {
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (e) { /* ignore */ }
    }
    const canvas = document.createElement('canvas');
    canvas.width = this.CANVAS_WIDTH;
    canvas.height = this.CANVAS_HEIGHT;
    const ctx = canvas.getContext('2d');

    if (!prof) {
      prof = (typeof BabyProfile !== 'undefined') ? BabyProfile.getProfile() : { name: 'Bé Yêu', age: 3 };
    }
    const rawName = (prof.name || 'Bé Yêu').trim();
    const formattedName = rawName.toLowerCase().startsWith('bé ')
      ? rawName.toUpperCase()
      : `BÉ ${rawName.toUpperCase()}`;
    const babyAge = prof.age || 3;

    // 1. NỀN GIẤY HOÀNG GIA
    const bgGrad = ctx.createLinearGradient(0, 0, 0, this.CANVAS_HEIGHT);
    bgGrad.addColorStop(0, '#FFFDF5');
    bgGrad.addColorStop(0.5, '#FFF8E7');
    bgGrad.addColorStop(1, '#FFF3D6');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

    // Chấm bi sao nhỏ
    ctx.fillStyle = 'rgba(255, 179, 0, 0.08)';
    for (let x = 40; x < this.CANVAS_WIDTH; x += 60) {
      for (let y = 40; y < this.CANVAS_HEIGHT; y += 60) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. KHUNG VIỀN ĐÔI MẠ VÀNG
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#FFA000';
    ctx.strokeRect(36, 36, this.CANVAS_WIDTH - 72, this.CANVAS_HEIGHT - 72);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFD54F';
    ctx.strokeRect(54, 54, this.CANVAS_WIDTH - 108, this.CANVAS_HEIGHT - 108);

    const drawCornerDeco = (x, y) => {
      ctx.save();
      ctx.fillStyle = '#FFA000';
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFF9C4';
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCornerDeco(54, 54);
    drawCornerDeco(this.CANVAS_WIDTH - 54, 54);
    drawCornerDeco(54, this.CANVAS_HEIGHT - 54);
    drawCornerDeco(this.CANVAS_WIDTH - 54, this.CANVAS_HEIGHT - 54);

    // 3. TIÊU ĐỀ BẢNG VÀNG
    const ribbonY = 110;
    ctx.save();
    ctx.shadowColor = 'rgba(216, 27, 96, 0.25)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#E91E63';
    ctx.beginPath();
    ctx.roundRect(this.CANVAS_WIDTH / 2 - 360, ribbonY - 38, 720, 76, 38);
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 34px "Nunito", "Baloo 2", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌟 BẢNG VÀNG THÀNH TÍCH TIẾNG ANH 🌟', this.CANVAS_WIDTH / 2, ribbonY);

    ctx.fillStyle = '#C2185B';
    ctx.font = '900 42px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText('CHỨNG NHẬN XUẤT SẮC', this.CANVAS_WIDTH / 2, 188);

    const curriculum = this.getWeekCurriculum(weekNum);
    ctx.fillStyle = '#5D4037';
    ctx.font = '800 27px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(curriculum.weekTitle, this.CANVAS_WIDTH / 2, 238);

    ctx.fillStyle = '#2E7D32';
    ctx.font = '700 22px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(curriculum.wordsStr, this.CANVAS_WIDTH / 2, 274);

    // 4. VÒNG TRÒN AVATAR BÉ & VƯƠNG MIỆN
    const avatarY = 505;
    const avatarRadius = 135;

    // Vương miện Vector
    ctx.font = '72px sans-serif';
    ctx.fillText('👑', this.CANVAS_WIDTH / 2, 355);

    // Nếu bé có ảnh thật upload (base64)
    if (prof.avatarType === 'custom' && prof.photoBase64) {
      const customImg = await this.loadImage(prof.photoBase64);
      this.drawCircularImage(ctx, customImg, this.CANVAS_WIDTH / 2, avatarY, avatarRadius, 14, '#FFB300');
    } else {
      // Dùng Avatar Preset Emoji với viền vàng
      let presetEmoji = '👶';
      if (typeof BabyProfile !== 'undefined' && BabyProfile.PRESET_AVATARS) {
        const found = BabyProfile.PRESET_AVATARS.find(a => a.id === prof.presetId);
        if (found) presetEmoji = found.emoji;
      }
      ctx.save();
      ctx.shadowColor = 'rgba(255, 179, 0, 0.45)';
      ctx.shadowBlur = 28;
      ctx.shadowOffsetY = 10;
      ctx.beginPath();
      ctx.arc(this.CANVAS_WIDTH / 2, avatarY, avatarRadius + 14, 0, Math.PI * 2);
      ctx.fillStyle = '#FFB300';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.CANVAS_WIDTH / 2, avatarY, avatarRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#FFF8E1';
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.font = '125px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(presetEmoji, this.CANVAS_WIDTH / 2, avatarY + 8);
      ctx.restore();
    }

    // 5. TÊN BÉ
    const nameY = 690;
    ctx.fillStyle = '#D81B60';
    ctx.font = '900 54px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(formattedName, this.CANVAS_WIDTH / 2, nameY);

    ctx.fillStyle = '#8D6E63';
    ctx.font = '800 28px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(`✨ ${babyAge} Tuổi • Học Giỏi & Vui Khỏe Mỗi Ngày ✨`, this.CANVAS_WIDTH / 2, nameY + 46);

    // 6. DÃY 5 NGÔI SAO VÀNG (Chống lỗi wireframe, luôn đổ bóng vàng 3D lấp lánh)
    const starsY = 795;
    const starCount = 5;
    const starSpacing = 72;
    const startX = this.CANVAS_WIDTH / 2 - ((starCount - 1) * starSpacing) / 2;
    for (let i = 0; i < starCount; i++) {
      this.drawGoldenStar(ctx, startX + i * starSpacing, starsY, 26);
    }

    // 7. KHUNG THÔNG ĐIỆP
    const cardY = 870;
    const loveMsg = this.getLoveMessage(weekNum);

    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(110, cardY, this.CANVAS_WIDTH - 220, 230, 26);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#FFE082';
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#3E2723';
    ctx.font = '800 30px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText('💌 LỜI NHẮN YÊU THƯƠNG TỪ BÉ', this.CANVAS_WIDTH / 2, cardY + 44);

    ctx.fillStyle = '#6D4C41';
    ctx.font = '700 24px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(loveMsg.line1, this.CANVAS_WIDTH / 2, cardY + 92);
    ctx.fillText(loveMsg.line2, this.CANVAS_WIDTH / 2, cardY + 132);

    ctx.fillStyle = '#E91E63';
    ctx.font = '900 26px "Nunito", "Baloo 2", sans-serif';
    ctx.fillText(loveMsg.line3, this.CANVAS_WIDTH / 2, cardY + 180);

    // 8. DƯỚI CÙNG: CON DẤU VÀ NGÀY CẤP (BÊN TRÁI) + MÃ QR QUÉT TẢI APP (BÊN PHẢI)
    const today = new Date();
    const dateStr = `Ngày ${today.getDate() < 10 ? '0' + today.getDate() : today.getDate()} tháng ${(today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1)} năm ${today.getFullYear()}`;

    // --- CỤM CHỨNG NHẬN BÊN TRÁI: CON DẤU ĐỎ + NGÀY CẤP BÊN DƯỚI ---
    const sealX = 200;
    const sealY = 1175;

    ctx.save();
    ctx.translate(sealX, sealY);
    ctx.rotate(-0.06);
    ctx.beginPath();
    ctx.arc(0, 0, 48, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#D81B60';
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#D81B60';
    ctx.stroke();
    ctx.fillStyle = '#D81B60';
    ctx.font = '900 12px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MONTESSORI VERIFIED', 0, -13);
    ctx.font = '900 17px "Nunito", sans-serif';
    ctx.fillText('XUẤT SẮC', 0, 5);
    ctx.font = '700 10px "Nunito", sans-serif';
    ctx.fillText('★ ★ ★ ★ ★', 0, 22);
    ctx.restore();

    // Ngày cấp đặt ngay dưới con dấu chứng nhận (Chuẩn mực bằng khen)
    ctx.fillStyle = '#8D6E63';
    ctx.font = 'italic 700 19px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(dateStr, sealX, sealY + 68);

    // --- CỤM CÔNG NGHỆ BÊN PHẢI: THẺ QR CODE + LỜI MỜI QUÉT TẢI APP ---
    const qrSize = 115;
    const qrX = this.CANVAS_WIDTH - 215;
    const qrY = 1145;

    // Khung thẻ trắng nền cho QR code
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(qrX - 8, qrY - 8, qrSize + 16, qrSize + 16, 16);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#FFE082';
    ctx.stroke();
    ctx.restore();

    const qrImg = await this.loadImage(this.QR_CODE_DATA_URL);
    if (qrImg) {
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);
    }

    // Chú thích gọn gàng bên trái QR (Rộng rãi, thoáng mắt, không nhồi nhét)
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#E65100';
    ctx.font = '900 21px "Nunito", sans-serif';
    ctx.fillText('📷 Quét mã tải app', qrX - 25, qrY + 36);

    ctx.fillStyle = '#D81B60';
    ctx.font = '900 24px "Nunito", sans-serif';
    ctx.fillText('BabyEnglish Playroom 🌟', qrX - 25, qrY + 78);

    return canvas;
  },

  /**
   * Tải ảnh bằng khen PNG về máy
   */
  async downloadCertificate(weekNum = 1, basePath = '') {
    try {
      const canvas = await this.generateCanvas(weekNum, basePath);
      const prof = (typeof BabyProfile !== 'undefined') ? BabyProfile.getProfile() : { name: 'Be_Yeu' };
      const safeName = (prof.name || 'Be_Yeu').replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_');
      const filename = `Bang_Khen_${safeName}_Tuan_${weekNum}.png`;

      const link = document.createElement('a');
      link.download = filename;
      link.href = canvas.toDataURL('image/png', 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (e) {
      console.error('[CertificateEngine] Lỗi tải ảnh:', e);
      alert('Không thể tạo file ảnh tải về: ' + e.message);
      return false;
    }
  },

  /**
   * Chia sẻ bằng khen qua Web Share API (Zalo, Facebook, Messenger trên mobile)
   */
  async shareCertificate(weekNum = 1, basePath = '') {
    try {
      const canvas = await this.generateCanvas(weekNum, basePath);
      const prof = (typeof BabyProfile !== 'undefined') ? BabyProfile.getProfile() : { name: 'Bé Yêu' };
      const name = prof.name || 'Bé Yêu';

      if (navigator.share && navigator.canShare) {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            this.downloadCertificate(weekNum, basePath);
            return;
          }
          const file = new File([blob], `Bang_Khen_${name}_Tuan_${weekNum}.png`, { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: `Bằng Khen Tiếng Anh của ${name}`,
              text: `🌟 ${name} đã xuất sắc đạt 5 Sao Vàng trong bài kiểm tra tuần ${weekNum}! Mời cả nhà cùng chúc mừng bé nè! ❤️`,
              files: [file]
            });
            return;
          }
          // Fallback tải file
          this.downloadCertificate(weekNum, basePath);
        }, 'image/png');
      } else {
        // Fallback tự động tải file trên desktop
        this.downloadCertificate(weekNum, basePath);
      }
    } catch (e) {
      console.warn('[CertificateEngine] Không thể share trực tiếp, chuyển sang tải ảnh:', e);
      this.downloadCertificate(weekNum, basePath);
    }
  },

  /**
   * Mở hộp thoại chia sẻ Facebook Web Dialog với Dynamic Link và tự động tải ảnh
   */
  shareToFacebook(weekNum = 1, basePath = '') {
    const prof = (typeof BabyProfile !== 'undefined') ? BabyProfile.getProfile() : { name: 'Bé Yêu' };
    const rawName = (prof.name || 'Bé Yêu').trim();
    const dynamicUrl = this.DYNAMIC_LINK_URL;
    const quote = `🎉 Bé ${rawName} vừa xuất sắc đạt 5 Sao Vàng trong bài thi tiếng Anh tuần ${weekNum}! Mời cả nhà cùng chúc mừng bé và tải app BabyEnglish cùng học nhé! ❤️🌟`;

    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(dynamicUrl)}&quote=${encodeURIComponent(quote)}`;
    const width = 640, height = 580;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(shareUrl, 'fb-share-dialog', `width=${width},height=${height},top=${top},left=${left}`);

    // Đồng thời tải ảnh Bằng Khen để mẹ có sẵn ảnh đính kèm bài viết Facebook
    this.downloadCertificate(weekNum, basePath);
  },

  /**
   * Sao chép link cài đặt app BabyEnglish vào clipboard
   */
  async copyAppInstallLink() {
    const url = this.DYNAMIC_LINK_URL;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      alert('Đã sao chép link tải BabyEnglish! Mẹ có thể dán vào Zalo/Facebook để chia sẻ cho mọi người nhé! ❤️');
    } catch (e) {
      prompt('Link tải app BabyEnglish:', url);
    }
  },

  /**
   * Mở modal xem trước Bằng Khen với các nút hành động (Tải ảnh / Chia sẻ Zalo Facebook)
   */
  async openCertificateModal(weekNum = 1, basePath = '') {
    let modal = document.getElementById('cert-preview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'cert-preview-modal';
      modal.className = 'cert-modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="cert-modal-box">
        <button type="button" class="cert-modal-close" onclick="CertificateEngine.closeModal()">✕</button>
        <div class="cert-loading-state" id="cert-loading-state">
          <div class="cert-spinner">🌟</div>
          <p>Đang vẽ Bằng Khen Xinh Xắn cho Bé...</p>
        </div>
        <div class="cert-preview-wrap" id="cert-preview-wrap" style="display: none;">
          <img id="cert-preview-img" class="cert-preview-img" alt="Bằng khen của bé">
          
          <div class="cert-action-buttons">
            <button type="button" class="btn-cert-download" onclick="CertificateEngine.downloadCertificate(${weekNum}, '${basePath}')">
              <span class="btn-cert-icon">📥</span>
              <span class="btn-cert-text">
                <strong>Lưu Ảnh Bằng Khen Về Máy</strong>
                <small>Đăng Facebook, Story hoặc in làm kỷ niệm</small>
              </span>
            </button>
            <button type="button" class="btn-cert-share-social" onclick="CertificateEngine.shareCertificate(${weekNum}, '${basePath}')">
              <span class="btn-cert-icon">💬</span>
              <span class="btn-cert-text">
                <strong>Gửi Khoe Ông Bà (Zalo / Tin Nhắn)</strong>
                <small>Gửi thẳng tấm ảnh sắc nét vào khung chat</small>
              </span>
            </button>
            <button type="button" class="btn-cert-copy-text" onclick="CertificateEngine.copyAppInstallLink()">
              <span>🔗 Sao chép link tải app cho bạn bè</span>
            </button>
          </div>
        </div>
      </div>
    `;

    modal.style.display = 'flex';

    try {
      const canvas = await this.generateCanvas(weekNum, basePath);
      const dataUrl = canvas.toDataURL('image/png', 0.95);
      const img = document.getElementById('cert-preview-img');
      const loader = document.getElementById('cert-loading-state');
      const wrap = document.getElementById('cert-preview-wrap');

      if (img && wrap && loader) {
        img.src = dataUrl;
        loader.style.display = 'none';
        wrap.style.display = 'flex';
      }
    } catch (e) {
      console.error('[CertificateEngine] Lỗi hiển thị modal:', e);
      const loader = document.getElementById('cert-loading-state');
      if (loader) {
        loader.innerHTML = `<p style="color: red;">Không thể tạo bằng khen: ${e.message}</p>`;
      }
    }
  },

  closeModal() {
    const modal = document.getElementById('cert-preview-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }
};

if (typeof window !== 'undefined') {
  window.CertificateEngine = CertificateEngine;
}
