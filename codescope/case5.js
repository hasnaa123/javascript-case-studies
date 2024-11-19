// Room Database
const RoomDatabase = [
    { roomNum: 101, roomType: "Suite", price: 500, checkOutDate: "2024-12-10" },
    { roomNum: 102, roomType: "Deluxe", price: 300, checkOutDate: "2024-12-12" },
    { roomNum: 103, roomType: "Standard", price: 150, checkOutDate: "2024-12-11" },
];

// Customer Booking Database
const booking = [];

// Payment Card Information
const CardInfo = [
    { cardNumber: "4111 1111 1111 1111", cardOwner: "Alice Brown", amount: 30000 },
    { cardNumber: "4222 2222 2222 2222", cardOwner: "Bob Green", amount: 15000 },
];

// Check Room Availability
function availableRoom(roomType, checkInDate, checkOutDate) {
    return new Promise((resolve, reject) => {
        console.log("Checking room availability...");
        const room = RoomDatabase.find(
            (room) =>
                room.roomType === roomType &&
                new Date(checkInDate) >= new Date(room.checkOutDate)
        );
        if (room) {
            resolve({
                roomNum: room.roomNum,
                roomType: room.roomType,
                price: room.price,
                checkInDate,
                checkOutDate,
            });
        } else {
            reject("No rooms available for the selected dates.");
        }
    });
}

// Store Booking Details
function storeBookingDetails(customerName, bookingDetails) {
    return new Promise((resolve, reject) => {
        console.log("Storing booking details...");
        const bookingID = booking.length + 1;
        booking.push({
            id: bookingID,
            name: customerName,
            roomType: bookingDetails.roomType,
            checkInDate: bookingDetails.checkInDate,
            checkOutDate: bookingDetails.checkOutDate,
            price: bookingDetails.price,
            paid: false,
        });
        resolve(bookingID);
    });
}

// Process Payment
function processPayment(bookingID, paymentCard) {
    return new Promise((resolve, reject) => {
        console.log("Processing payment...");
        const bookingIndex = booking.findIndex((b) => b.id === bookingID);
        const cardIndex = CardInfo.findIndex(
            (c) =>
                c.cardNumber === paymentCard &&
                c.cardOwner === booking[bookingIndex].name
        );

        if (cardIndex >= 0 && CardInfo[cardIndex].amount >= booking[bookingIndex].price) {
            CardInfo[cardIndex].amount -= booking[bookingIndex].price;
            booking[bookingIndex].paid = true;
            console.log("Payment successful. Remaining balance:", CardInfo[cardIndex].amount);
            resolve("Payment successfully processed.");
        } else {
            reject("Payment failed. Please verify your account balance or card details.");
        }
    });
}

// Send Confirmation Email
function sendConfirmationEmail(customerEmail, bookingDetails) {
    return new Promise((resolve, reject) => {
        console.log("Sending confirmation email...");
        setTimeout(() => {
            if (Math.random() > 0.2) {
                resolve(`Confirmation email sent to ${customerEmail} for booking.`);
            } else {
                reject("Failed to send confirmation email due to a network issue.");
            }
        }, 1000);
    });
}

// Booking Process
async function bookRoom() {
    try {
        const roomDetails = await availableRoom("Suite", "2024-12-15", "2024-12-20");
        const bookingID = await storeBookingDetails("Alice Brown", roomDetails);
        await processPayment(bookingID, "4111 1111 1111 1111");
        const confirmation = await sendConfirmationEmail("alice.brown@example.com", roomDetails);
        console.log(confirmation);
    } catch (error) {
        console.error("Error:", error);
    }
}

console.log("Starting the booking process...");
bookRoom();
