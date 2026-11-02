/**
 * Central Toddler Vocabulary Bank (Kho 300+ Từ Vựng Danh Từ Thiết Yếu Cho Trẻ Mầm Non & Lộ Trình 52 Tuần)
 * Chuẩn tỷ lệ trí nhớ 80/20 (80% củng cố thực hành, 20% chân trời mới)
 * 10 Chủ đề Đời Sống Thực Tế Gần Gũi:
 * 1. Family & Friends (12 từ)
 * 2. Animals - Farm, Safari, Ocean, Birds, Pets (45 từ)
 * 3. Food, Fruits, Veggies, Meals & Drinks (52 từ)
 * 4. Colors & Shapes (16 từ)
 * 5. Body Parts (16 từ)
 * 6. Clothes & Accessories (24 từ)
 * 7. Toys & Household Items (46 từ)
 * 8. Vehicles & Transport (24 từ)
 * 9. Nature, Weather & Outdoor (20 từ)
 * 10. Actions & Feelings (24 từ)
 * Tổng cộng: Hơn 300 từ vựng danh từ trực quan, 100% kèm Emoji chuẩn quốc tế.
 */
var ToddlerVocabulary = window.ToddlerVocabulary || {
  CATEGORIES: {
    // 1. Gia đình & Bạn bè (12 từ)
    family: [
      { id: 'baby', word: 'Baby', emoji: '👶', sound: 'Cute baby' },
      { id: 'mommy', word: 'Mommy', emoji: '👩', sound: 'Sweet mommy' },
      { id: 'daddy', word: 'Daddy', emoji: '👨', sound: 'Strong daddy' },
      { id: 'brother', word: 'Brother', emoji: '👦', sound: 'Little brother' },
      { id: 'sister', word: 'Sister', emoji: '👧', sound: 'Happy sister' },
      { id: 'grandma', word: 'Grandma', emoji: '👵', sound: 'Kind grandma' },
      { id: 'grandpa', word: 'Grandpa', emoji: '👴', sound: 'Wise grandpa' },
      { id: 'boy', word: 'Boy', emoji: '🧒', sound: 'Good boy' },
      { id: 'girl', word: 'Girl', emoji: '👧', sound: 'Pretty girl' },
      { id: 'friend', word: 'Friend', emoji: '🧑‍🤝‍🧑', sound: 'Best friend' },
      { id: 'me', word: 'Me', emoji: '🙋', sound: 'Look at me' },
      { id: 'you', word: 'You', emoji: '🫵', sound: 'I love you' }
    ],

    // 2. Thế giới Động vật (45 loài phong phú: Thú cưng, Nông trại, Rừng xanh, Đại dương, Côn trùng)
    animals: [
      { id: 'dog', word: 'Dog', emoji: '🐶', sound: 'Woof woof' },
      { id: 'cat', word: 'Cat', emoji: '🐱', sound: 'Meow meow' },
      { id: 'bear', word: 'Bear', emoji: '🐻', sound: 'Grrr' },
      { id: 'duck', word: 'Duck', emoji: '🦆', sound: 'Quack quack' },
      { id: 'pig', word: 'Pig', emoji: '🐷', sound: 'Oink oink' },
      { id: 'cow', word: 'Cow', emoji: '🐮', sound: 'Moo moo' },
      { id: 'sheep', word: 'Sheep', emoji: '🐑', sound: 'Baa baa' },
      { id: 'chicken', word: 'Chicken', emoji: '🐔', sound: 'Cluck cluck' },
      { id: 'rabbit', word: 'Rabbit', emoji: '🐰', sound: 'Hop hop' },
      { id: 'frog', word: 'Frog', emoji: '🐸', sound: 'Ribbit ribbit' },
      { id: 'lion', word: 'Lion', emoji: '🦁', sound: 'Roar' },
      { id: 'tiger', word: 'Tiger', emoji: '🐯', sound: 'Grrr roar' },
      { id: 'elephant', word: 'Elephant', emoji: '🐘', sound: 'Pawoo' },
      { id: 'monkey', word: 'Monkey', emoji: '🐵', sound: 'Ooh ooh' },
      { id: 'giraffe', word: 'Giraffe', emoji: '🦒', sound: 'Tall giraffe' },
      { id: 'zebra', word: 'Zebra', emoji: '🦓', sound: 'Stripes' },
      { id: 'hippo', word: 'Hippo', emoji: '🦛', sound: 'Big hippo' },
      { id: 'kangaroo', word: 'Kangaroo', emoji: '🦘', sound: 'Boing boing' },
      { id: 'panda', word: 'Panda', emoji: '🐼', sound: 'Cute panda' },
      { id: 'koala', word: 'Koala', emoji: '🐨', sound: 'Sleepy koala' },
      { id: 'horse', word: 'Horse', emoji: '🐴', sound: 'Neigh neigh' },
      { id: 'goat', word: 'Goat', emoji: '🐐', sound: 'Maa maa' },
      { id: 'bird', word: 'Bird', emoji: '🐦', sound: 'Tweet tweet' },
      { id: 'penguin', word: 'Penguin', emoji: '🐧', sound: 'Waddle waddle' },
      { id: 'owl', word: 'Owl', emoji: '🦉', sound: 'Hoo hoo' },
      { id: 'fish', word: 'Fish', emoji: '🐟', sound: 'Swim swim' },
      { id: 'whale', word: 'Whale', emoji: '🐋', sound: 'Big whale' },
      { id: 'dolphin', word: 'Dolphin', emoji: '🐬', sound: 'Click click' },
      { id: 'octopus', word: 'Octopus', emoji: '🐙', sound: 'Eight arms' },
      { id: 'crab', word: 'Crab', emoji: '🦀', sound: 'Snap snap' },
      { id: 'turtle', word: 'Turtle', emoji: '🐢', sound: 'Slow turtle' },
      { id: 'shark', word: 'Shark', emoji: '🦈', sound: 'Chomp chomp' },
      { id: 'seal', word: 'Seal', emoji: '🦭', sound: 'Arf arf' },
      { id: 'starfish', word: 'Starfish', emoji: '⭐', sound: 'Little star' },
      { id: 'bee', word: 'Bee', emoji: '🐝', sound: 'Bzz bzz' },
      { id: 'butterfly', word: 'Butterfly', emoji: '🦋', sound: 'Flutter flutter' },
      { id: 'ladybug', word: 'Ladybug', emoji: '🐞', sound: 'Tiny bug' },
      { id: 'snail', word: 'Snail', emoji: '🐌', sound: 'Slow snail' },
      { id: 'caterpillar', word: 'Caterpillar', emoji: '🐛', sound: 'Wiggle wiggle' },
      { id: 'hamster', word: 'Hamster', emoji: '🐹', sound: 'Squeak squeak' },
      { id: 'fox', word: 'Fox', emoji: '🦊', sound: 'Clever fox' },
      { id: 'deer', word: 'Deer', emoji: '🦌', sound: 'Gentle deer' },
      { id: 'mouse', word: 'Mouse', emoji: '🐭', sound: 'Squeak' },
      { id: 'squirrel', word: 'Squirrel', emoji: '🐿️', sound: 'Chirp' },
      { id: 'camel', word: 'Camel', emoji: '🐪', sound: 'Desert camel' },
      { id: 'crocodile', word: 'Crocodile', emoji: '🐊', sound: 'Snap snap' },
      { id: 'dinosaur', word: 'Dinosaur', emoji: '🦖', sound: 'Roar' }
    ],

    // 3. Đồ ăn, Trái cây, Rau củ, Món ngon & Thức uống (52 từ)
    food: [
      // 16 Loại Trái Cây Mọng Nước
      { id: 'apple', word: 'Apple', emoji: '🍎', soundType: 'crunch', isFruit: true },
      { id: 'banana', word: 'Banana', emoji: '🍌', soundType: 'crunch', isFruit: true },
      { id: 'orange_food', word: 'Orange', emoji: '🍊', soundType: 'crunch', isFruit: true },
      { id: 'strawberry', word: 'Strawberry', emoji: '🍓', soundType: 'crunch', isFruit: true },
      { id: 'grape', word: 'Grape', emoji: '🍇', soundType: 'crunch', isFruit: true },
      { id: 'watermelon', word: 'Watermelon', emoji: '🍉', soundType: 'crunch', isFruit: true },
      { id: 'mango', word: 'Mango', emoji: '🥭', soundType: 'crunch', isFruit: true },
      { id: 'peach', word: 'Peach', emoji: '🍑', soundType: 'crunch', isFruit: true },
      { id: 'cherry', word: 'Cherry', emoji: '🍒', soundType: 'crunch', isFruit: true },
      { id: 'pineapple', word: 'Pineapple', emoji: '🍍', soundType: 'crunch', isFruit: true },
      { id: 'pear', word: 'Pear', emoji: '🍐', soundType: 'crunch', isFruit: true },
      { id: 'kiwi', word: 'Kiwi', emoji: '🥝', soundType: 'crunch', isFruit: true },
      { id: 'avocado', word: 'Avocado', emoji: '🥑', soundType: 'crunch', isFruit: true },
      { id: 'coconut', word: 'Coconut', emoji: '🥥', soundType: 'crunch', isFruit: true },
      { id: 'lemon', word: 'Lemon', emoji: '🍋', soundType: 'crunch', isFruit: true },
      { id: 'melon', word: 'Melon', emoji: '🍈', soundType: 'crunch', isFruit: true },

      // 14 Loại Rau Củ Tươi Ngon
      { id: 'carrot', word: 'Carrot', emoji: '🥕', soundType: 'crunch', isVeggie: true },
      { id: 'tomato', word: 'Tomato', emoji: '🍅', soundType: 'crunch', isVeggie: true },
      { id: 'corn', word: 'Corn', emoji: '🌽', soundType: 'crunch', isVeggie: true },
      { id: 'potato', word: 'Potato', emoji: '🥔', soundType: 'crunch', isVeggie: true },
      { id: 'broccoli', word: 'Broccoli', emoji: '🥦', soundType: 'crunch', isVeggie: true },
      { id: 'mushroom', word: 'Mushroom', emoji: '🍄', soundType: 'crunch', isVeggie: true },
      { id: 'cucumber', word: 'Cucumber', emoji: '🥒', soundType: 'crunch', isVeggie: true },
      { id: 'pumpkin', word: 'Pumpkin', emoji: '🎃', soundType: 'crunch', isVeggie: true },
      { id: 'onion', word: 'Onion', emoji: '🧅', soundType: 'crunch', isVeggie: true },
      { id: 'peas', word: 'Peas', emoji: '🫛', soundType: 'crunch', isVeggie: true },
      { id: 'sweetpotato', word: 'Sweet potato', emoji: '🍠', soundType: 'crunch', isVeggie: true },
      { id: 'cabbage', word: 'Cabbage', emoji: '🥬', soundType: 'crunch', isVeggie: true },
      { id: 'pepper', word: 'Pepper', emoji: '🫑', soundType: 'crunch', isVeggie: true },
      { id: 'eggplant', word: 'Eggplant', emoji: '🍆', soundType: 'crunch', isVeggie: true },

      // 22 Món Ăn Bữa Chính, Điểm Tâm, Tráng Miệng & Thức Uống
      { id: 'bread', word: 'Bread', emoji: '🍞', soundType: 'crunch' },
      { id: 'milk', word: 'Milk', emoji: '🥛', soundType: 'gulp' },
      { id: 'honey', word: 'Honey', emoji: '🍯', soundType: 'gulp' },
      { id: 'water', word: 'Water', emoji: '💧', soundType: 'gulp' },
      { id: 'juice', word: 'Juice', emoji: '🧃', soundType: 'gulp' },
      { id: 'egg', word: 'Egg', emoji: '🥚', soundType: 'crunch' },
      { id: 'cheese', word: 'Cheese', emoji: '🧀', soundType: 'crunch' },
      { id: 'rice', word: 'Rice', emoji: '🍚', soundType: 'crunch' },
      { id: 'soup', word: 'Soup', emoji: '🥣', soundType: 'gulp' },
      { id: 'noodles', word: 'Noodles', emoji: '🍜', soundType: 'gulp' },
      { id: 'pizza', word: 'Pizza', emoji: '🍕', soundType: 'crunch' },
      { id: 'meat', word: 'Meat', emoji: '🥩', soundType: 'crunch' },
      { id: 'fish_food', word: 'Fish meat', emoji: '🐟', soundType: 'crunch' },
      { id: 'sandwich', word: 'Sandwich', emoji: '🥪', soundType: 'crunch' },
      { id: 'pancake', word: 'Pancake', emoji: '🥞', soundType: 'crunch' },
      { id: 'cake', word: 'Cake', emoji: '🍰', soundType: 'crunch' },
      { id: 'cookie', word: 'Cookie', emoji: '🍪', soundType: 'crunch' },
      { id: 'donut', word: 'Donut', emoji: '🍩', soundType: 'crunch' },
      { id: 'icecream', word: 'Ice cream', emoji: '🍦', soundType: 'gulp' },
      { id: 'candy', word: 'Candy', emoji: '🍬', soundType: 'crunch' },
      { id: 'chocolate', word: 'Chocolate', emoji: '🍫', soundType: 'crunch' },
      { id: 'popcorn', word: 'Popcorn', emoji: '🍿', soundType: 'crunch' }
    ],

    // 4. Màu sắc & Hình khối (16 từ)
    colors_shapes: [
      { id: 'red', word: 'Red', hex: '#FF5252', emoji: '🔴', type: 'color' },
      { id: 'blue', word: 'Blue', hex: '#448AFF', emoji: '🔵', type: 'color' },
      { id: 'yellow', word: 'Yellow', hex: '#FFD600', emoji: '🟡', type: 'color' },
      { id: 'green', word: 'Green', hex: '#69F0AE', emoji: '🟢', type: 'color' },
      { id: 'pink', word: 'Pink', hex: '#FF4081', emoji: '🌸', type: 'color' },
      { id: 'purple', word: 'Purple', hex: '#B388FF', emoji: '🟣', type: 'color' },
      { id: 'orange_col', word: 'Orange', hex: '#FF9100', emoji: '🟠', type: 'color' },
      { id: 'white', word: 'White', hex: '#FFFFFF', emoji: '⚪', type: 'color' },
      { id: 'black', word: 'Black', hex: '#212121', emoji: '⚫', type: 'color' },
      { id: 'brown', word: 'Brown', hex: '#795548', emoji: '🟤', type: 'color' },
      { id: 'circle', word: 'Circle', emoji: '⭕', type: 'shape' },
      { id: 'star_shape', word: 'Star', emoji: '⭐', type: 'shape' },
      { id: 'heart_shape', word: 'Heart', emoji: '❤️', type: 'shape' },
      { id: 'square', word: 'Square', emoji: '⬛', type: 'shape' },
      { id: 'triangle', word: 'Triangle', emoji: '🔺', type: 'shape' },
      { id: 'diamond', word: 'Diamond', emoji: '💎', type: 'shape' }
    ],

    // 5. Bộ phận cơ thể toàn diện (16 từ)
    body: [
      { id: 'eye', word: 'Eye', emoji: '👀' },
      { id: 'nose', word: 'Nose', emoji: '👃' },
      { id: 'ear', word: 'Ear', emoji: '👂' },
      { id: 'mouth', word: 'Mouth', emoji: '👄' },
      { id: 'hand', word: 'Hand', emoji: '✋' },
      { id: 'foot', word: 'Foot', emoji: '🦶' },
      { id: 'arm', word: 'Arm', emoji: '💪' },
      { id: 'leg', word: 'Leg', emoji: '🦵' },
      { id: 'head', word: 'Head', emoji: '👶' },
      { id: 'hair', word: 'Hair', emoji: '💇' },
      { id: 'teeth', word: 'Teeth', emoji: '🦷' },
      { id: 'belly', word: 'Belly', emoji: '🧸' },
      { id: 'knee', word: 'Knee', emoji: '🧎' },
      { id: 'finger', word: 'Finger', emoji: '☝️' },
      { id: 'toe', word: 'Toe', emoji: '👣' },
      { id: 'cheek', word: 'Cheek', emoji: '😊' }
    ],

    // 6. Quần áo & Trang phục (24 từ)
    clothes: [
      { id: 'hat', word: 'Hat', emoji: '👒' },
      { id: 'cap', word: 'Cap', emoji: '🧢' },
      { id: 'crown', word: 'Crown', emoji: '👑' },
      { id: 'ribbon', word: 'Ribbon', emoji: '🎀' },
      { id: 'party_hat', word: 'Party Hat', emoji: '🥳' },
      { id: 'shirt', word: 'Shirt', emoji: '👕' },
      { id: 'dress', word: 'Dress', emoji: '👗' },
      { id: 'jacket', word: 'Jacket', emoji: '🧥' },
      { id: 'coat', word: 'Coat', emoji: '🦺' },
      { id: 'pants', word: 'Pants', emoji: '👖' },
      { id: 'skirt', word: 'Skirt', emoji: '🩳' },
      { id: 'shoes', word: 'Shoes', emoji: '👟' },
      { id: 'boots', word: 'Boots', emoji: '🥾' },
      { id: 'rainboots', word: 'Rain boots', emoji: '👢' },
      { id: 'slippers', word: 'Slippers', emoji: '🩴' },
      { id: 'socks', word: 'Socks', emoji: '🧦' },
      { id: 'glasses', word: 'Glasses', emoji: '👓' },
      { id: 'sunglasses', word: 'Sunglasses', emoji: '🕶️' },
      { id: 'scarf', word: 'Scarf', emoji: '🧣' },
      { id: 'gloves', word: 'Gloves', emoji: '🧤' },
      { id: 'vest', word: 'Vest', emoji: '🦺' },
      { id: 'belt', word: 'Belt', emoji: '🪢' },
      { id: 'cape', word: 'Cape', emoji: '🦸' },
      { id: 'pajamas', word: 'Pajamas', emoji: '🥼' }
    ],

    // 7. Đồ dùng & Đồ chơi gia đình (46 từ)
    toys_home: [
      { id: 'ball', word: 'Ball', emoji: '⚽' },
      { id: 'balloon', word: 'Balloon', emoji: '🎈' },
      { id: 'doll', word: 'Doll', emoji: '🪆' },
      { id: 'teddy', word: 'Teddy bear', emoji: '🧸' },
      { id: 'toycar', word: 'Toy car', emoji: '🏎️' },
      { id: 'robot', word: 'Robot', emoji: '🤖' },
      { id: 'block', word: 'Block', emoji: '🧱' },
      { id: 'drum', word: 'Drum', emoji: '🥁' },
      { id: 'guitar', word: 'Guitar', emoji: '🎸' },
      { id: 'crayon', word: 'Crayon', emoji: '🖍️' },
      { id: 'book', word: 'Book', emoji: '📖' },
      { id: 'box', word: 'Box', emoji: '📦' },
      { id: 'kite', word: 'Kite', emoji: '🪁' },
      { id: 'bell', word: 'Bell', emoji: '🔔' },
      { id: 'wand', word: 'Magic wand', emoji: '🪄' },
      { id: 'bed', word: 'Bed', emoji: '🛏️' },
      { id: 'chair', word: 'Chair', emoji: '🪑' },
      { id: 'table', word: 'Table', emoji: '🪵' },
      { id: 'cup', word: 'Cup', emoji: '🥤' },
      { id: 'spoon', word: 'Spoon', emoji: '🥄' },
      { id: 'fork', word: 'Fork', emoji: '🍴' },
      { id: 'bowl', word: 'Bowl', emoji: '🥣' },
      { id: 'clock', word: 'Clock', emoji: '⏰' },
      { id: 'door', word: 'Door', emoji: '🚪' },
      { id: 'window', word: 'Window', emoji: '🪟' },
      { id: 'house', word: 'House', emoji: '🏠' },
      { id: 'room', word: 'Room', emoji: '🛋️' },
      { id: 'pillow', word: 'Pillow', emoji: '🛏️' },
      { id: 'blanket', word: 'Blanket', emoji: '🧶' },
      { id: 'lamp', word: 'Lamp', emoji: '💡' },
      { id: 'phone', word: 'Phone', emoji: '📱' },
      { id: 'tv', word: 'TV', emoji: '📺' },
      { id: 'mirror', word: 'Mirror', emoji: '🪞' },
      { id: 'bath', word: 'Bath', emoji: '🛁' },
      { id: 'soap', word: 'Soap', emoji: '🧼' },
      { id: 'towel', word: 'Towel', emoji: '🧖' },
      { id: 'brush', word: 'Brush', emoji: '🪥' },
      { id: 'key', word: 'Key', emoji: '🔑' },
      { id: 'bucket', word: 'Bucket', emoji: '🪣' },
      { id: 'umbrella', word: 'Umbrella', emoji: '☂️' },
      { id: 'watergun', word: 'Water gun', emoji: '🔫' },
      { id: 'magnet', word: 'Magnet', emoji: '🧲' },
      { id: 'ring', word: 'Ring', emoji: '💍' },
      { id: 'basket', word: 'Basket', emoji: '🧺' },
      { id: 'pot', word: 'Pot', emoji: '🍳' },
      { id: 'pan', word: 'Pan', emoji: '🥘' }
    ],

    // 8. Phương tiện giao thông (24 từ)
    vehicles: [
      { id: 'car', word: 'Car', emoji: '🚗', sound: 'Brum brum' },
      { id: 'bus', word: 'Bus', emoji: '🚌', sound: 'Honk honk' },
      { id: 'train', word: 'Train', emoji: '🚂', sound: 'Choo choo' },
      { id: 'plane', word: 'Plane', emoji: '✈️', sound: 'Whoosh' },
      { id: 'boat', word: 'Boat', emoji: '⛵', sound: 'Splash' },
      { id: 'ship', word: 'Ship', emoji: '🚢', sound: 'Toot toot' },
      { id: 'truck', word: 'Truck', emoji: '🚚', sound: 'Vroom' },
      { id: 'bike', word: 'Bike', emoji: '🚲', sound: 'Ring ring' },
      { id: 'chopper', word: 'Chopper', emoji: '🚁', sound: 'Chop chop' },
      { id: 'rocket', word: 'Rocket', emoji: '🚀', sound: 'Blast off' },
      { id: 'taxi', word: 'Taxi', emoji: '🚕', sound: 'Beep beep' },
      { id: 'ambulance', word: 'Ambulance', emoji: '🚑', sound: 'Wee woo' },
      { id: 'firetruck', word: 'Fire truck', emoji: '🚒', sound: 'Wee woo' },
      { id: 'policecar', word: 'Police car', emoji: '🚓', sound: 'Wail wail' },
      { id: 'motor', word: 'Motor', emoji: '🏍️', sound: 'Vroom' },
      { id: 'van', word: 'Van', emoji: '🚐', sound: 'Beep' },
      { id: 'tractor', word: 'Tractor', emoji: '🚜', sound: 'Chug chug' },
      { id: 'scooter', word: 'Scooter', emoji: '🛴', sound: 'Wheee' },
      { id: 'submarine', word: 'Submarine', emoji: '🛥️', sound: 'Blub blub' },
      { id: 'sailboat', word: 'Sailboat', emoji: '⛵', sound: 'Whoosh' },
      { id: 'hotairballoon', word: 'Hot air balloon', emoji: '🎈', sound: 'Float' },
      { id: 'helicopter', word: 'Helicopter', emoji: '🚁', sound: 'Chop' },
      { id: 'excavator', word: 'Digger', emoji: '🚜', sound: 'Dig dig' },
      { id: 'skateboard', word: 'Skateboard', emoji: '🛹', sound: 'Roll roll' }
    ],

    // 9. Thiên nhiên & Thời tiết (20 từ)
    nature: [
      { id: 'sun', word: 'Sun', emoji: '☀️' },
      { id: 'moon', word: 'Moon', emoji: '🌙' },
      { id: 'star_sky', word: 'Star', emoji: '⭐' },
      { id: 'cloud', word: 'Cloud', emoji: '☁️' },
      { id: 'rain', word: 'Rain', emoji: '🌧️' },
      { id: 'rainbow', word: 'Rainbow', emoji: '🌈' },
      { id: 'tree', word: 'Tree', emoji: '🌳' },
      { id: 'flower', word: 'Flower', emoji: '🌸' },
      { id: 'grass', word: 'Grass', emoji: '🌱' },
      { id: 'sea', word: 'Sea', emoji: '🌊' },
      { id: 'wind', word: 'Wind', emoji: '💨' },
      { id: 'snow', word: 'Snow', emoji: '❄️' },
      { id: 'sky', word: 'Sky', emoji: '🌤️' },
      { id: 'leaf', word: 'Leaf', emoji: '🍃' },
      { id: 'river', word: 'River', emoji: '🌊' },
      { id: 'mountain', word: 'Mountain', emoji: '⛰️' },
      { id: 'sand', word: 'Sand', emoji: '🏖️' },
      { id: 'park', word: 'Park', emoji: '🛝' },
      { id: 'forest', word: 'Forest', emoji: '🌲' },
      { id: 'island', word: 'Island', emoji: '🏝️' }
    ],

    // 10. Hành động & Cảm xúc (24 từ)
    actions_feelings: [
      { id: 'run', word: 'Run', emoji: '🏃', type: 'verb' },
      { id: 'jump', word: 'Jump', emoji: '🦘', type: 'verb' },
      { id: 'walk', word: 'Walk', emoji: '🚶', type: 'verb' },
      { id: 'sleep', word: 'Sleep', emoji: '😴', type: 'verb' },
      { id: 'eat', word: 'Eat', emoji: '🍽️', type: 'verb' },
      { id: 'drink', word: 'Drink', emoji: '🥛', type: 'verb' },
      { id: 'dance', word: 'Dance', emoji: '💃', type: 'verb' },
      { id: 'sing', word: 'Sing', emoji: '🎤', type: 'verb' },
      { id: 'clap', word: 'Clap', emoji: '👏', type: 'verb' },
      { id: 'wash', word: 'Wash', emoji: '🧼', type: 'verb' },
      { id: 'smile', word: 'Smile', emoji: '😊', type: 'verb' },
      { id: 'laugh', word: 'Laugh', emoji: '😆', type: 'verb' },
      { id: 'cry', word: 'Cry', emoji: '😢', type: 'verb' },
      { id: 'hug', word: 'Hug', emoji: '🫂', type: 'verb' },
      { id: 'stop', word: 'Stop', emoji: '🛑', type: 'verb' },
      { id: 'go', word: 'Go', emoji: '🟢', type: 'verb' },
      { id: 'happy', word: 'Happy', emoji: '😄', type: 'adjective' },
      { id: 'big', word: 'Big', emoji: '🐘', type: 'adjective' },
      { id: 'small', word: 'Small', emoji: '🐜', type: 'adjective' },
      { id: 'hot', word: 'Hot', emoji: '☀️', type: 'adjective' },
      { id: 'cold', word: 'Cold', emoji: '🧊', type: 'adjective' },
      { id: 'fast', word: 'Fast', emoji: '⚡', type: 'adjective' },
      { id: 'slow', word: 'Slow', emoji: '🐢', type: 'adjective' },
      { id: 'clean', word: 'Clean', emoji: '✨', type: 'adjective' }
    ]
  },

  // 16 Bạn Động Vật Xoay Vòng Cho Game 2 (Drag and Feed) - Đầy đủ muôn loài
  FEEDING_CHARACTERS: [
    { id: 'bear', name: 'Bear', vnName: 'Gấu Bự', emoji: '🐻', voice: 'Grrr! I am Bear! Feed me sweet honey and apples!' },
    { id: 'rabbit', name: 'Rabbit', vnName: 'Thỏ Trắng', emoji: '🐰', voice: 'Hop hop! I am Rabbit! I love carrots and berries!' },
    { id: 'monkey', name: 'Monkey', vnName: 'Khỉ Con', emoji: '🐵', voice: 'Ooh ooh! I am Monkey! Give me yellow bananas!' },
    { id: 'cat', name: 'Cat', vnName: 'Mèo Miu', emoji: '🐱', voice: 'Meow meow! I am Kitty! Feed me yummy fish and milk!' },
    { id: 'dog', name: 'Dog', vnName: 'Cún Con', emoji: '🐶', voice: 'Woof woof! I am Doggy! I love meat and bread!' },
    { id: 'duck', name: 'Duck', vnName: 'Vịt Vàng', emoji: '🦆', voice: 'Quack quack! I am Duck! Give me corn and bread!' },
    { id: 'pig', name: 'Pig', vnName: 'Heo Hồng', emoji: '🐷', voice: 'Oink oink! I am Piggy! I love all delicious foods!' },
    { id: 'cow', name: 'Cow', vnName: 'Bò Sữa', emoji: '🐮', voice: 'Moo moo! I am Cow! Give me fresh green grass and water!' },
    { id: 'sheep', name: 'Sheep', vnName: 'Cừu Bông', emoji: '🐑', voice: 'Baa baa! I am Sheep! Feed me snacks!' },
    { id: 'lion', name: 'Lion', vnName: 'Sư Tử Vui', emoji: '🦁', voice: 'Roar! I am King Lion! Feed me big feast!' },
    { id: 'elephant', name: 'Elephant', vnName: 'Voi Khổng Lồ', emoji: '🐘', voice: 'Pawoo! I am Elephant! I love sweet melons!' },
    { id: 'panda', name: 'Panda', vnName: 'Gấu Trúc', emoji: '🐼', voice: 'Hello! I am Panda! Give me crunchy bamboo and fruit!' },
    { id: 'giraffe', name: 'Giraffe', vnName: 'Hươu Cao Cổ', emoji: '🦒', voice: 'Hi! I am Giraffe! I love fresh green leaves!' },
    { id: 'tiger', name: 'Tiger', vnName: 'Hổ Con', emoji: '🐯', voice: 'Grrr! I am Tiger! Feed me healthy meat!' },
    { id: 'penguin', name: 'Penguin', vnName: 'Chim Cánh Cụt', emoji: '🐧', voice: 'Waddle waddle! I am Penguin! I love fish!' },
    { id: 'koala', name: 'Koala', vnName: 'Bạn Koala', emoji: '🐨', voice: 'Yawn! I am Koala! Give me sweet snacks!' }
  ],

  // 16 Đối Tượng Tắm Rửa Xoay Vòng Cho Game 4 (Rub to Clean)
  CLEANING_TARGETS: [
    { id: 'pig', name: 'Dirty Pig', vnTitle: 'Tắm cho bạn Heo lấm bùn', emoji: '🐷', voice: 'Wash the Dirty Pig! Make it clean and pink!' },
    { id: 'dog', name: 'Muddy Dog', vnTitle: 'Tắm cho bạn Cún nghịch bùn', emoji: '🐶', voice: 'Wash the Muddy Dog! Good puppy!' },
    { id: 'car', name: 'Dusty Car', vnTitle: 'Rửa sạch chiếc Ô tô bám bụi', emoji: '🚗', voice: 'Clean the Dusty Car! Brum brum shiny car!' },
    { id: 'apple', name: 'Dirty Apple', vnTitle: 'Rửa sạch Quả Táo ngọt lịm', emoji: '🍎', voice: 'Wash the Sweet Apple before we eat!' },
    { id: 'baby', name: 'Messy Baby', vnTitle: 'Lau mặt cho Em Bé đáng yêu', emoji: '👶', voice: 'Clean the Messy Baby! Smile baby!' },
    { id: 'duck', name: 'Muddy Duck', vnTitle: 'Tắm cho bạn Vịt bơi ao', emoji: '🦆', voice: 'Wash the Muddy Duck! Quack quack clean duck!' },
    { id: 'shoes', name: 'Dusty Shoes', vnTitle: 'Lau sạch Đôi Giày thể thao', emoji: '👟', voice: 'Clean the Shoes! Ready to run!' },
    { id: 'cat', name: 'Muddy Cat', vnTitle: 'Tắm cho bạn Mèo con dễ thương', emoji: '🐱', voice: 'Clean the Cute Cat! Soft and fluffy!' },
    { id: 'truck', name: 'Dusty Truck', vnTitle: 'Rửa xe Tải bám bụi', emoji: '🚚', voice: 'Wash the Big Truck! Vroom vroom clean truck!' },
    { id: 'hippo', name: 'Muddy Hippo', vnTitle: 'Tắm cho bạn Hà Mã nghịch ao', emoji: '🦛', voice: 'Wash the Muddy Hippo! Splash splash!' },
    { id: 'elephant', name: 'Muddy Elephant', vnTitle: 'Xịt nước cho bạn Voi khổng lồ', emoji: '🐘', voice: 'Wash the Big Elephant with water!' },
    { id: 'carrot', name: 'Dirty Carrot', vnTitle: 'Rửa sạch Củ Cà Rốt giòn ngọt', emoji: '🥕', voice: 'Wash the Fresh Carrot for bunny!' },
    { id: 'bike', name: 'Dusty Bike', vnTitle: 'Lau sạch Xe Đạp của bé', emoji: '🚲', voice: 'Clean the Bike! Ring ring shiny bike!' },
    { id: 'robot', name: 'Dusty Robot', vnTitle: 'Lau sạch Bạn Robot thông minh', emoji: '🤖', voice: 'Clean the Robot! Beep boop thank you!' },
    { id: 'bear', name: 'Muddy Bear', vnTitle: 'Tắm cho bạn Gấu nâu nghịch rừng', emoji: '🐻', voice: 'Wash the Big Bear! Soft warm fur!' },
    { id: 'potato', name: 'Dirty Potato', vnTitle: 'Rửa củ Khoai Tây sạch sẽ', emoji: '🥔', voice: 'Wash the Potato! Ready to cook!' }
  ],

  /**
   * MA TRẬN PHÂN BỔ 52 TUẦN: 100% DANH TỪ CỤ THỂ CHO BÉ 3 TUỔI
   * Phân bổ đều đặn 4 giai đoạn, từ thế giới gần gũi đến đại dương, vũ trụ
   */
  CURRICULUM_52_WEEKS: [
    // GIAI ĐOẠN 1 (Tuần 1 - 13): Bé, Gia Đình & Nhu Cầu Đầu Đời
    { week: 1, title: 'Bé & Gia Đình Thân Yêu', words: ['baby', 'mommy', 'daddy'], reviews: [] },
    { week: 2, title: 'Bữa Ăn Ngon Miệng', words: ['apple', 'banana', 'milk'], reviews: ['baby', 'mommy'] },
    { week: 3, title: 'Thú Cưng Quanh Bé', words: ['dog', 'cat', 'duck'], reviews: ['apple', 'milk', 'baby'] },
    { week: 4, title: 'Xe Cộ & Đồ Chơi Bé Thích', words: ['car', 'bus', 'ball', 'box'], reviews: ['dog', 'cat', 'baby'] },
    { week: 5, title: 'Khuôn Mặt Đáng Yêu', words: ['eye', 'nose', 'mouth', 'ear'], reviews: ['ball', 'box', 'car'] },
    { week: 6, title: 'Anh Chị Em & Bạn Nhỏ', words: ['brother', 'sister', 'boy', 'girl'], reviews: ['mommy', 'daddy'] },
    { week: 7, title: 'Nông Trại Vui Nhộn', words: ['cow', 'pig', 'sheep', 'chicken'], reviews: ['dog', 'cat', 'duck'] },
    { week: 8, title: 'Món Ăn Ngọt Lành', words: ['honey', 'water', 'bread', 'egg'], reviews: ['milk', 'apple'] },
    { week: 9, title: 'Hình Khối Diệu Kỳ', words: ['circle', 'square', 'triangle', 'star_shape'], reviews: ['ball', 'car'] },
    { week: 10, title: 'Đôi Tay & Đôi Chân Bé', words: ['hand', 'foot', 'head', 'belly'], reviews: ['eye', 'nose', 'mouth'] },
    { week: 11, title: 'Đồ Chơi Bé Thích', words: ['doll', 'balloon', 'book', 'toycar'], reviews: ['ball', 'box'] },
    { week: 12, title: 'Đồ Dùng Bàn Ăn Của Bé', words: ['cup', 'spoon', 'bowl', 'rice'], reviews: ['water', 'bread'] },
    { week: 13, title: 'Tổng Kết Giai Đoạn 1: Mái Ấm Gia Đình', words: ['house', 'room', 'bed', 'chair'], reviews: ['mommy', 'daddy', 'baby', 'dog'] },

    // GIAI ĐOẠN 2 (Tuần 14 - 26): Thế Giới Trái Cây, Trang Phục & Muôn Loài
    { week: 14, title: 'Trang Phục Của Bé', words: ['hat', 'shirt', 'pants', 'shoes'], reviews: ['ball', 'book', 'bed'] },
    { week: 15, title: 'Rừng Xanh Kỳ Thú', words: ['lion', 'tiger', 'elephant', 'monkey'], reviews: ['cow', 'dog', 'cat'] },
    { week: 16, title: 'Vườn Trái Cây Nhiệt Đới', words: ['mango', 'melon', 'strawberry', 'grape'], reviews: ['apple', 'banana'] },
    { week: 17, title: 'Căn Phòng Ấm Áp', words: ['table', 'door', 'window', 'mirror'], reviews: ['book', 'ball'] },
    { week: 18, title: 'Vật Dụng Phòng Ngủ', words: ['lamp', 'pillow', 'blanket', 'clock'], reviews: ['bed', 'door'] },
    { week: 19, title: 'Ấm Áp Mùa Đông', words: ['socks', 'dress', 'jacket', 'boots'], reviews: ['hat', 'shoes'] },
    { week: 20, title: 'Bạn Hươu & Ngựa Vằn', words: ['giraffe', 'zebra', 'hippo', 'kangaroo'], reviews: ['lion', 'elephant'] },
    { week: 21, title: 'Rau Củ Tươi Ngon', words: ['carrot', 'tomato', 'corn', 'potato'], reviews: ['honey', 'egg'] },
    { week: 22, title: 'Đồ Dùng Tiện Ích', words: ['phone', 'tv', 'key', 'drum'], reviews: ['cup', 'spoon'] },
    { week: 23, title: 'Cơ Thể Khỏe Mạnh', words: ['arm', 'leg', 'hair', 'teeth'], reviews: ['hand', 'foot', 'head'] },
    { week: 24, title: 'Đồ Chơi Thông Minh', words: ['block', 'robot', 'crayon', 'toycar'], reviews: ['ball', 'doll', 'book'] },
    { week: 25, title: 'Ông Bà & Bạn Bè', words: ['grandma', 'grandpa', 'house', 'room'], reviews: ['mommy', 'daddy', 'boy'] },
    { week: 26, title: 'Tổng Kết Giai Đoạn 2: Nhà Tắm & Đồ Dùng', words: ['bath', 'soap', 'towel', 'brush'], reviews: ['hat', 'shoes', 'lion', 'car'] },

    // GIAI ĐOẠN 3 (Tuần 27 - 39): Thiên Nhiên, Biển Cả & Phương Tiện
    { week: 27, title: 'Xe Cộ Tốc Độ & Hành Trình', words: ['train', 'bike', 'truck', 'plane'], reviews: ['car', 'bus', 'ball'] },
    { week: 28, title: 'Đại Dương Bao La', words: ['fish', 'whale', 'dolphin', 'octopus'], reviews: ['water', 'duck'] },
    { week: 29, title: 'Bầu Trời & Thời Tiết', words: ['sun', 'moon', 'cloud', 'rain'], reviews: ['star_shape', 'rainbow'] },
    { week: 30, title: 'Món Ngọt Tráng Miệng', words: ['cheese', 'cake', 'cookie', 'icecream'], reviews: ['milk', 'bread'] },
    { week: 31, title: 'Phụ Kiện Xinh Xắn', words: ['cap', 'scarf', 'gloves', 'glasses'], reviews: ['hat', 'dress'] },
    { week: 32, title: 'Thuyền Buồm & Máy Bay', words: ['plane', 'boat', 'ship', 'truck'], reviews: ['car', 'train'] },
    { week: 33, title: 'Côn Trùng & Chim Ca', words: ['bird', 'frog', 'bee', 'butterfly'], reviews: ['duck', 'fish'] },
    { week: 34, title: 'Cầu Vồng & Cây Xanh', words: ['rainbow', 'tree', 'flower', 'grass'], reviews: ['sun', 'cloud'] },
    { week: 35, title: 'Vật Dụng Nhỏ Trong Nhà', words: ['box', 'pillow', 'blanket', 'lamp'], reviews: ['bed', 'clock'] },
    { week: 36, title: 'Khớp Gối & Ngón Tay', words: ['knee', 'finger', 'toe', 'cheek'], reviews: ['eye', 'ear', 'arm'] },
    { week: 37, title: 'Sinh Vật Biển Kỳ Thú', words: ['crab', 'turtle', 'penguin', 'sea'], reviews: ['fish', 'whale', 'dolphin'] },
    { week: 38, title: 'Vườn Quả Mọng Nước', words: ['peach', 'cherry', 'melon', 'juice'], reviews: ['orange_food', 'strawberry'] },
    { week: 39, title: 'Tổng Kết Giai Đoạn 3: Thiên Nhiên Kỳ Vĩ', words: ['sky', 'leaf', 'river', 'mountain'], reviews: ['plane', 'rainbow', 'whale', 'train'] },

    // GIAI ĐOẠN 4 (Tuần 40 - 52): Thế Giới Mở Rộng, Nông Trại & Vũ Trụ
    { week: 40, title: 'Những Bạn Thú Thân Thiết', words: ['horse', 'panda', 'rabbit', 'bear'], reviews: ['whale', 'fish', 'duck'] },
    { week: 41, title: 'Phương Tiện Cứu Trợ & Phố Thị', words: ['chopper', 'taxi', 'motor', 'van'], reviews: ['car', 'bus', 'plane'] },
    { week: 42, title: 'Băng Tuyết & Công Viên', words: ['snow', 'sand', 'park', 'tree'], reviews: ['rain', 'river', 'sun'] },
    { week: 43, title: 'Bữa Tiệc Pizza Vui Vẻ', words: ['candy', 'pizza', 'soup', 'meat'], reviews: ['cake', 'cheese', 'bread'] },
    { week: 44, title: 'Trang Phục Dự Tiệc', words: ['skirt', 'coat', 'jacket', 'belt'], reviews: ['jacket', 'boots', 'socks'] },
    { week: 45, title: 'Biệt Đội Cứu Trợ Thành Phố', words: ['firetruck', 'ambulance', 'policecar', 'chopper'], reviews: ['car', 'truck', 'van'] },
    { week: 46, title: 'Những Người Bạn Khổng Lồ', words: ['whale', 'turtle', 'hippo', 'elephant'], reviews: ['lion', 'horse', 'bear'] },
    { week: 47, title: 'Thảo Nguyên Rực Rỡ', words: ['zebra', 'giraffe', 'tiger', 'monkey'], reviews: ['panda', 'rabbit', 'bear'] },
    { week: 48, title: 'Phương Tiện Tốc Độ & Hành Trình Lớn', words: ['rocket', 'plane', 'ship', 'train'], reviews: ['truck', 'chopper', 'bus'] },
    { week: 49, title: 'Góc Đồ Chơi Kỳ Diệu', words: ['key', 'toycar', 'robot', 'drum'], reviews: ['block', 'ball', 'balloon'] },
    { week: 50, title: 'Trạm Cứu Hỏa & Khám Phá Không Gian', words: ['rocket', 'firetruck', 'policecar', 'train'], reviews: ['ambulance', 'chopper', 'ship'] },
    { week: 51, title: 'Khu Vườn Côn Trùng & Hoa Lá', words: ['butterfly', 'bee', 'flower', 'leaf'], reviews: ['tree', 'grass', 'sun', 'rainbow'] },
    { week: 52, title: 'Tốt Nghiệp 52 Tuần: Bé Là Nhà Vô Địch', words: ['baby', 'sun', 'rainbow', 'rocket'], reviews: ['star_shape', 'heart_shape', 'elephant', 'mommy'] }
  ],

  // Tra cứu từ theo ID trong danh mục
  findWordById(id) {
    for (const catKey in this.CATEGORIES) {
      const list = this.CATEGORIES[catKey];
      const found = list.find(w => w.id === id);
      if (found) {
        let detectedType = found.type;
        if (!detectedType) {
          if (catKey === 'actions_feelings') detectedType = 'verb';
          else if (catKey === 'colors_shapes' && found.hex) detectedType = 'adjective';
          else detectedType = 'noun';
        }
        return { ...found, category: catKey, type: detectedType };
      }
    }
    // Fallback search by prefix or word
    return { id: id, word: id.charAt(0).toUpperCase() + id.slice(1), emoji: '⭐', type: 'noun' };
  },

  /**
   * BỘ SINH CẤU HÌNH ĐỘNG 52 TUẦN: PHÁ VỠ HOÀN TOÀN THẮT CỔ CHAI VỐN TỪ!
   * Không còn ghim cố định 4 món ăn cũ mèm cho 52 tuần.
   * Mỗi tuần thực đơn ăn uống, trái cây, sinh vật biển và đồ vật đều đổi mới sinh động.
   */
  build80_20Pack(weekNum = 1) {
    const safeWeek = Math.max(1, Math.min(52, weekNum));
    const month = Math.ceil(safeWeek / 4);

    // 1. Lấy dữ liệu cấu hình tuần từ ma trận 52 tuần
    const weekPlan = this.CURRICULUM_52_WEEKS[safeWeek - 1] || this.CURRICULUM_52_WEEKS[0];

    const newTargetWords = weekPlan.words.map(id => this.findWordById(id));
    const reviewTargetWords = weekPlan.reviews.map(id => this.findWordById(id));

    // 2. Nhân vật cho ăn tuần này (Xoay tua 16 bạn thú khắp năm)
    const charIndex = (safeWeek - 1) % this.FEEDING_CHARACTERS.length;
    const activeChar = this.FEEDING_CHARACTERS[charIndex];

    // 3. THỰC ĐƠN 5 MÓN ĐỔI MỚI THEO TUẦN (Không còn ghim cứng Apple, Banana, Honey, Milk!)
    const allFoods = this.CATEGORIES.food;
    // Chọn 5 món ăn trượt động xoay vòng theo tuần khắp 52 món ăn/quả/rau
    const foodStart = (safeWeek - 1) * 2;
    const weekFoods = [0, 1, 2, 3, 4].map(i => allFoods[(foodStart + i) % allFoods.length]);

    // 4. Đối tượng tắm Game 4 (Xoay tua 16 đối tượng khắp năm)
    const cleanIndex = (safeWeek - 1) % this.CLEANING_TARGETS.length;
    const activeClean = this.CLEANING_TARGETS[cleanIndex];

    // 5. Game 3: Peek-a-boo Box (3 bạn trốn trong hộp quà, 1 bạn mục tiêu)
    const animalPool = this.CATEGORIES.animals;
    let peekHiding = newTargetWords.filter(w => w.emoji && !w.hex).slice(0, 3);
    if (peekHiding.length < 3) {
      const p1 = animalPool[((safeWeek - 1) * 2) % animalPool.length];
      const p2 = animalPool[((safeWeek - 1) * 2 + 1) % animalPool.length];
      const p3 = animalPool[((safeWeek - 1) * 2 + 2) % animalPool.length];
      peekHiding = [...peekHiding, p1, p2, p3].slice(0, 3);
    }
    const peekTarget = peekHiding[0];

    // 6. Game 7: Shadow Match Pool (3 đối tượng cho ngày Thứ Sáu)
    let shadowItems = newTargetWords.filter(w => w.emoji && !w.hex).slice(0, 3);
    if (shadowItems.length < 3) {
      shadowItems = [...shadowItems, ...peekHiding].slice(0, 3);
    }

    // 7. Chế độ bóng Game 1 (Màu sắc / Đồ vật / Động vật / Xe cộ)
    const balloonModes = ['color', 'animal', 'toy', 'vehicle'];
    const currentBalloonMode = balloonModes[(safeWeek - 1) % balloonModes.length];

    // 8. Game 5: Touch & Find Theme (Cơ thể / Đồ phòng / Quần áo / Thiên nhiên)
    const touchModes = ['body', 'home', 'clothes', 'nature'];
    const currentTouchMode = touchModes[(safeWeek - 1) % touchModes.length];

    // 9. Game 6: Nốt nhạc phím đàn động vật (Xoay tua khắp 45 loài động vật)
    const pianoStart = (safeWeek - 1) * 2;
    const pianoKeyAnimals = [0, 1, 2, 3, 4, 5, 6].map(i => animalPool[(pianoStart + i) % animalPool.length]);
    const targetPianoAnimal = pianoKeyAnimals[0];

    // 10. Game 12: Thử thách Mix & Match (Recipe Card)
    const colorsList = ['Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange'];
    const charsList = ['Frog', 'Bear', 'Cat', 'Dog', 'Panda', 'Lion', 'Rabbit', 'Elephant'];
    const actsList = ['Dance', 'Jump', 'Sleep', 'Eat', 'Run', 'Sing', 'Clap'];
    const recipeMod = colorsList[(safeWeek - 1) % colorsList.length];
    const recipeChar = charsList[(safeWeek - 1) % charsList.length];
    const recipeAct = actsList[(safeWeek - 1) % actsList.length];

    // 11. Game 17: Trái cây theo mùa của tuần (Xoay tua trọn vẹn 16 loại quả nhiệt đới)
    const allFruits = allFoods.filter(f => f.isFruit);
    const fruitShift = (safeWeek - 1) % allFruits.length;
    const weekFruits = [0, 1, 2, 3].map(i => allFruits[(fruitShift + i) % allFruits.length]);

    return {
      week: safeWeek,
      month: month,
      title: `Tuần ${safeWeek}: ${weekPlan.title}`,
      englishTitle: `Week ${safeWeek}: ${activeChar.name}'s Adventure`,
      newWords: newTargetWords,
      reviewWords: reviewTargetWords,
      feedingChar: activeChar,
      foods: weekFoods,
      weekFruits: weekFruits,
      newWord: newTargetWords[0] || weekFoods[0],
      balloonMode: currentBalloonMode,
      cleanTarget: activeClean,
      peekBox: {
        hidingAnimals: peekHiding,
        target: peekTarget
      },
      shadowPool: shadowItems,
      touchMode: currentTouchMode,
      pianoTarget: targetPianoAnimal,
      pianoKeys: pianoKeyAnimals,
      mixerRecipe: {
        color: recipeMod,
        animal: recipeChar,
        action: recipeAct,
        label: `${recipeMod} ${recipeChar} ${recipeAct}`
      },
      sticker: {
        id: `sticker_w${safeWeek}`,
        icon: (newTargetWords[0] ? newTargetWords[0].emoji : activeChar.emoji) + '✨',
        name: `Bé Giỏi Tuần ${safeWeek}: ${weekPlan.title}`
      }
    };
  },

  // Backward compatible alias
  getWeekData(weekNum = 1) {
    return this.build80_20Pack(weekNum);
  },

  // -------------------------------------------------------------
  // 3D CLAYMORPHIC ASSET MANAGER (Microsoft Fluent 3D Integration)
  // -------------------------------------------------------------
  iconCache: {},

  getWordIconPath(itemOrId) {
    let id = (typeof itemOrId === 'string') ? itemOrId : (itemOrId && (itemOrId.id || itemOrId.word || itemOrId.name || ''));
    if (!id) return '';
    id = id.toLowerCase().trim().replace(/\s+/g, '_');
    
    // Path resolution: mini-game subdirectories require '../'
    let prefix = '';
    if (typeof window !== 'undefined' && window.location && window.location.pathname) {
      const p = window.location.pathname.replace(/\\/g, '/');
      if (/\/(0[1-9]|1[0-8])_[a-z0-9_]+\//i.test(p) || p.includes('/13_weekend_test/')) {
        prefix = '../';
      }
    }
    return `${prefix}assets/icons/${id}.png`;
  },

  renderWordIcon(itemOrId, size = 64, extraClass = '') {
    if (!itemOrId) return '';
    const emoji = (typeof itemOrId === 'object' && itemOrId.emoji) ? itemOrId.emoji : '⭐';
    const word = (typeof itemOrId === 'object' && (itemOrId.word || itemOrId.name)) ? (itemOrId.word || itemOrId.name) : '';
    const iconUrl = this.getWordIconPath(itemOrId);

    return `
      <img src="${iconUrl}" 
           alt="${word}" 
           class="toddler-3d-word-icon ${extraClass}" 
           style="width:${size}px; height:${size}px; object-fit:contain; filter:drop-shadow(0 6px 12px rgba(62,39,35,0.14)); vertical-align:middle; pointer-events:none;" 
           onerror="this.outerHTML='<span class=\\'toddler-fallback-emoji\\' style=\\'font-size:${Math.round(size * 0.78)}px; line-height:1; vertical-align:middle;\\'>${emoji}</span>'">
    `;
  },

  getWordImage(itemOrId) {
    const url = this.getWordIconPath(itemOrId);
    if (!url) return null;
    if (this.iconCache[url]) {
      return this.iconCache[url];
    }
    if (typeof Image !== 'undefined') {
      const img = new Image();
      img.src = url;
      this.iconCache[url] = img;
      return img;
    }
    return null;
  }
};

if (typeof window !== 'undefined') {
  window.ToddlerVocabulary = ToddlerVocabulary;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ToddlerVocabulary;
}
