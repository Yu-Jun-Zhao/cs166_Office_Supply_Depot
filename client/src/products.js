const products = [
    {
        "id": 99,
        "text": "Sleek Frozen Towels",
        "quantity": 18,
        "price": "98.00",
        "weight": "18.00"
    },
    {
        "id": 98,
        "text": "Fantastic Granite Ball",
        "quantity": 452,
        "price": "20.00",
        "weight": "2.00"
    },
    {
        "id": 97,
        "text": "Rustic Granite Shirt",
        "quantity": 862,
        "price": "19.00",
        "weight": "22.00"
    },
    {
        "id": 96,
        "text": "Fantastic Granite Gloves",
        "quantity": 178,
        "price": "62.00",
        "weight": "7.00"
    },
    {
        "id": 95,
        "text": "Gorgeous Steel Cheese",
        "quantity": 596,
        "price": "90.00",
        "weight": "10.00"
    },
    {
        "id": 94,
        "text": "Licensed Metal Car",
        "quantity": 891,
        "price": "84.00",
        "weight": "11.00"
    },
    {
        "id": 93,
        "text": "Sleek Wooden Table",
        "quantity": 399,
        "price": "64.00",
        "weight": "2.00"
    },
    {
        "id": 92,
        "text": "Generic Concrete Chair",
        "quantity": 709,
        "price": "81.00",
        "weight": "23.00"
    },
    {
        "id": 91,
        "text": "Practical Rubber Table",
        "quantity": 641,
        "price": "87.00",
        "weight": "22.00"
    },
    {
        "id": 90,
        "text": "Small Soft Pants",
        "quantity": 932,
        "price": "72.00",
        "weight": "3.00"
    },
    {
        "id": 89,
        "text": "Unbranded Rubber Ball",
        "quantity": 949,
        "price": "76.00",
        "weight": "25.00"
    },
    {
        "id": 88,
        "text": "Unbranded Soft Sausages",
        "quantity": 214,
        "price": "86.00",
        "weight": "3.00"
    },
    {
        "id": 87,
        "text": "Refined Concrete Chicken",
        "quantity": 764,
        "price": "17.00",
        "weight": "11.00"
    },
    {
        "id": 86,
        "text": "Rustic Fresh Chicken",
        "quantity": 236,
        "price": "76.00",
        "weight": "28.00"
    },
    {
        "id": 85,
        "text": "Sleek Fresh Car",
        "quantity": 990,
        "price": "26.00",
        "weight": "22.00"
    },
    {
        "id": 84,
        "text": "Gorgeous Concrete Sausages",
        "quantity": 271,
        "price": "88.00",
        "weight": "2.00"
    },
    {
        "id": 83,
        "text": "Licensed Metal Pizza",
        "quantity": 679,
        "price": "98.00",
        "weight": "3.00"
    },
    {
        "id": 82,
        "text": "Practical Cotton Soap",
        "quantity": 419,
        "price": "41.00",
        "weight": "24.00"
    },
    {
        "id": 81,
        "text": "Awesome Wooden Chicken",
        "quantity": 743,
        "price": "64.00",
        "weight": "5.00"
    },
    {
        "id": 80,
        "text": "Practical Metal Chips",
        "quantity": 567,
        "price": "33.00",
        "weight": "4.00"
    },
    {
        "id": 79,
        "text": "Licensed Steel Bike",
        "quantity": 460,
        "price": "69.00",
        "weight": "25.00"
    },
    {
        "id": 78,
        "text": "Refined Steel Sausages",
        "quantity": 146,
        "price": "39.00",
        "weight": "13.00"
    },
    {
        "id": 77,
        "text": "Intelligent Metal Car",
        "quantity": 622,
        "price": "50.00",
        "weight": "23.00"
    },
    {
        "id": 76,
        "text": "Practical Fresh Mouse",
        "quantity": 610,
        "price": "5.00",
        "weight": "2.00"
    },
    {
        "id": 75,
        "text": "Practical Frozen Keyboard",
        "quantity": 444,
        "price": "3.00",
        "weight": "13.00"
    },
    {
        "id": 74,
        "text": "Rustic Frozen Towels",
        "quantity": 819,
        "price": "4.00",
        "weight": "28.00"
    },
    {
        "id": 73,
        "text": "Generic Rubber Tuna",
        "quantity": 737,
        "price": "58.00",
        "weight": "10.00"
    },
    {
        "id": 72,
        "text": "Gorgeous Metal Tuna",
        "quantity": 172,
        "price": "65.00",
        "weight": "19.00"
    },
    {
        "id": 71,
        "text": "Handcrafted Frozen Chicken",
        "quantity": 606,
        "price": "33.00",
        "weight": "12.00"
    },
    {
        "id": 70,
        "text": "Awesome Frozen Car",
        "quantity": 785,
        "price": "2.00",
        "weight": "6.00"
    },
    {
        "id": 69,
        "text": "Incredible Steel Keyboard",
        "quantity": 822,
        "price": "90.00",
        "weight": "13.00"
    },
    {
        "id": 68,
        "text": "Handcrafted Rubber Pizza",
        "quantity": 392,
        "price": "51.00",
        "weight": "18.00"
    },
    {
        "id": 67,
        "text": "Small Fresh Hat",
        "quantity": 570,
        "price": "22.00",
        "weight": "8.00"
    },
    {
        "id": 66,
        "text": "Ergonomic Steel Shirt",
        "quantity": 119,
        "price": "93.00",
        "weight": "4.00"
    },
    {
        "id": 65,
        "text": "Generic Soft Ball",
        "quantity": 101,
        "price": "46.00",
        "weight": "5.00"
    },
    {
        "id": 64,
        "text": "Handmade Cotton Pizza",
        "quantity": 837,
        "price": "55.00",
        "weight": "22.00"
    },
    {
        "id": 63,
        "text": "Awesome Wooden Table",
        "quantity": 22,
        "price": "27.00",
        "weight": "3.00"
    },
    {
        "id": 62,
        "text": "Awesome Rubber Table",
        "quantity": 347,
        "price": "11.00",
        "weight": "16.00"
    },
    {
        "id": 61,
        "text": "Tasty Steel Ball",
        "quantity": 836,
        "price": "7.00",
        "weight": "10.00"
    },
    {
        "id": 60,
        "text": "Unbranded Metal Shoes",
        "quantity": 403,
        "price": "78.00",
        "weight": "27.00"
    },
    {
        "id": 59,
        "text": "Small Metal Towels",
        "quantity": 891,
        "price": "94.00",
        "weight": "2.00"
    },
    {
        "id": 58,
        "text": "Refined Concrete Keyboard",
        "quantity": 392,
        "price": "94.00",
        "weight": "1.00"
    },
    {
        "id": 57,
        "text": "Refined Metal Towels",
        "quantity": 672,
        "price": "11.00",
        "weight": "17.00"
    },
    {
        "id": 56,
        "text": "Unbranded Concrete Table",
        "quantity": 280,
        "price": "16.00",
        "weight": "13.00"
    },
    {
        "id": 55,
        "text": "Handmade Soft Shoes",
        "quantity": 547,
        "price": "14.00",
        "weight": "18.00"
    },
    {
        "id": 54,
        "text": "Ergonomic Steel Tuna",
        "quantity": 304,
        "price": "44.00",
        "weight": "15.00"
    },
    {
        "id": 53,
        "text": "Small Metal Mouse",
        "quantity": 112,
        "price": "14.00",
        "weight": "30.00"
    },
    {
        "id": 52,
        "text": "Small Wooden Towels",
        "quantity": 757,
        "price": "13.00",
        "weight": "21.00"
    },
    {
        "id": 51,
        "text": "Unbranded Fresh Cheese",
        "quantity": 895,
        "price": "52.00",
        "weight": "28.00"
    },
    {
        "id": 50,
        "text": "Unbranded Rubber Pizza",
        "quantity": 831,
        "price": "42.00",
        "weight": "26.00"
    },
    {
        "id": 49,
        "text": "Sleek Steel Shirt",
        "quantity": 576,
        "price": "96.00",
        "weight": "7.00"
    },
    {
        "id": 48,
        "text": "Licensed Concrete Hat",
        "quantity": 318,
        "price": "27.00",
        "weight": "14.00"
    },
    {
        "id": 47,
        "text": "Incredible Fresh Computer",
        "quantity": 581,
        "price": "26.00",
        "weight": "17.00"
    },
    {
        "id": 46,
        "text": "Licensed Frozen Mouse",
        "quantity": 457,
        "price": "37.00",
        "weight": "1.00"
    },
    {
        "id": 45,
        "text": "Generic Concrete Tuna",
        "quantity": 899,
        "price": "9.00",
        "weight": "30.00"
    },
    {
        "id": 44,
        "text": "Small Steel Shirt",
        "quantity": 855,
        "price": "39.00",
        "weight": "26.00"
    },
    {
        "id": 43,
        "text": "Fantastic Plastic Pants",
        "quantity": 21,
        "price": "37.00",
        "weight": "6.00"
    },
    {
        "id": 42,
        "text": "Licensed Cotton Bacon",
        "quantity": 298,
        "price": "5.00",
        "weight": "10.00"
    },
    {
        "id": 41,
        "text": "Incredible Rubber Keyboard",
        "quantity": 334,
        "price": "97.00",
        "weight": "30.00"
    },
    {
        "id": 40,
        "text": "Refined Granite Bike",
        "quantity": 365,
        "price": "59.00",
        "weight": "23.00"
    },
    {
        "id": 39,
        "text": "Rustic Metal Tuna",
        "quantity": 794,
        "price": "11.00",
        "weight": "3.00"
    },
    {
        "id": 38,
        "text": "Handcrafted Fresh Chair",
        "quantity": 33,
        "price": "96.00",
        "weight": "3.00"
    },
    {
        "id": 37,
        "text": "Generic Granite Pizza",
        "quantity": 272,
        "price": "95.00",
        "weight": "29.00"
    },
    {
        "id": 36,
        "text": "Fantastic Fresh Mouse",
        "quantity": 33,
        "price": "23.00",
        "weight": "15.00"
    },
    {
        "id": 35,
        "text": "Handmade Frozen Pizza",
        "quantity": 885,
        "price": "66.00",
        "weight": "26.00"
    },
    {
        "id": 34,
        "text": "Small Fresh Pizza",
        "quantity": 613,
        "price": "95.00",
        "weight": "14.00"
    },
    {
        "id": 33,
        "text": "Practical Frozen Pants",
        "quantity": 129,
        "price": "85.00",
        "weight": "19.00"
    },
    {
        "id": 32,
        "text": "Licensed Soft Bike",
        "quantity": 233,
        "price": "21.00",
        "weight": "12.00"
    },
    {
        "id": 31,
        "text": "Rustic Wooden Bike",
        "quantity": 876,
        "price": "75.00",
        "weight": "30.00"
    },
    {
        "id": 30,
        "text": "Intelligent Soft Gloves",
        "quantity": 50,
        "price": "2.00",
        "weight": "4.00"
    },
    {
        "id": 29,
        "text": "Gorgeous Wooden Ball",
        "quantity": 118,
        "price": "35.00",
        "weight": "6.00"
    },
    {
        "id": 28,
        "text": "Awesome Granite Towels",
        "quantity": 877,
        "price": "36.00",
        "weight": "25.00"
    },
    {
        "id": 27,
        "text": "Small Cotton Tuna",
        "quantity": 657,
        "price": "8.00",
        "weight": "21.00"
    },
    {
        "id": 26,
        "text": "Awesome Granite Bike",
        "quantity": 696,
        "price": "29.00",
        "weight": "14.00"
    },
    {
        "id": 25,
        "text": "Handcrafted Wooden Pizza",
        "quantity": 774,
        "price": "81.00",
        "weight": "21.00"
    },
    {
        "id": 24,
        "text": "Refined Granite Car",
        "quantity": 359,
        "price": "22.00",
        "weight": "16.00"
    },
    {
        "id": 23,
        "text": "Gorgeous Plastic Cheese",
        "quantity": 899,
        "price": "76.00",
        "weight": "11.00"
    },
    {
        "id": 22,
        "text": "Awesome Cotton Gloves",
        "quantity": 940,
        "price": "40.00",
        "weight": "19.00"
    },
    {
        "id": 21,
        "text": "Small Wooden Soap",
        "quantity": 470,
        "price": "41.00",
        "weight": "20.00"
    },
    {
        "id": 20,
        "text": "Gorgeous Metal Table",
        "quantity": 12,
        "price": "70.00",
        "weight": "11.00"
    },
    {
        "id": 19,
        "text": "Small Frozen Table",
        "quantity": 753,
        "price": "60.00",
        "weight": "14.00"
    },
    {
        "id": 18,
        "text": "Rustic Plastic Ball",
        "quantity": 706,
        "price": "52.00",
        "weight": "13.00"
    },
    {
        "id": 17,
        "text": "Ergonomic Frozen Tuna",
        "quantity": 170,
        "price": "67.00",
        "weight": "15.00"
    },
    {
        "id": 16,
        "text": "Handcrafted Soft Soap",
        "quantity": 723,
        "price": "43.00",
        "weight": "20.00"
    },
    {
        "id": 15,
        "text": "Licensed Rubber Table",
        "quantity": 435,
        "price": "72.00",
        "weight": "12.00"
    },
    {
        "id": 14,
        "text": "Unbranded Steel Gloves",
        "quantity": 232,
        "price": "33.00",
        "weight": "15.00"
    },
    {
        "id": 13,
        "text": "Rustic Concrete Gloves",
        "quantity": 69,
        "price": "84.00",
        "weight": "18.00"
    },
    {
        "id": 12,
        "text": "Sleek Metal Chicken",
        "quantity": 634,
        "price": "36.00",
        "weight": "11.00"
    },
    {
        "id": 11,
        "text": "Unbranded Concrete Cheese",
        "quantity": 586,
        "price": "78.00",
        "weight": "22.00"
    },
    {
        "id": 10,
        "text": "Ergonomic Cotton Shoes",
        "quantity": 711,
        "price": "75.00",
        "weight": "9.00"
    },
    {
        "id": 9,
        "text": "Fantastic Frozen Soap",
        "quantity": 432,
        "price": "29.00",
        "weight": "2.00"
    },
    {
        "id": 8,
        "text": "Generic Metal Tuna",
        "quantity": 24,
        "price": "4.00",
        "weight": "17.00"
    },
    {
        "id": 7,
        "text": "Small Concrete Soap",
        "quantity": 795,
        "price": "48.00",
        "weight": "21.00"
    },
    {
        "id": 6,
        "text": "Awesome Steel Fish",
        "quantity": 780,
        "price": "28.00",
        "weight": "23.00"
    },
    {
        "id": 5,
        "text": "Generic Concrete Bacon",
        "quantity": 207,
        "price": "31.00",
        "weight": "20.00"
    },
    {
        "id": 4,
        "text": "Small Cotton Towels",
        "quantity": 438,
        "price": "83.00",
        "weight": "1.00"
    },
    {
        "id": 3,
        "text": "Handmade Cotton Bacon",
        "quantity": 489,
        "price": "89.00",
        "weight": "5.00"
    },
    {
        "id": 2,
        "text": "Ergonomic Wooden Pizza",
        "quantity": 62,
        "price": "88.00",
        "weight": "10.00"
    },
    {
        "id": 1,
        "text": "Gorgeous Plastic Salad",
        "quantity": 603,
        "price": "7.00",
        "weight": "6.00"
    },
    {
        "id": 0,
        "text": "Ergonomic Concrete Shoes",
        "quantity": 42,
        "price": "88.00",
        "weight": "2.00"
    }
]

export default products