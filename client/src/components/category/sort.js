const prods = [
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101019-1_533x.jpg?v=1650306662",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101019-4_533x.jpg?v=1650306665",
    name: "Crystal Clear Hook Earing (14K)",
    price: "14.00",
    id: "1",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101048-B-1_533x.jpg?v=1649869980",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101048-B-4_533x.jpg?v=1649869984",
    name: "Refined Stud Earrings",
    price: "21.00",
    id: "2",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101048-A-1_533x.jpg?v=1649869856",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101048-A-4_533x.jpg?v=1649869873",
    name: "Terrace Drop Earrings",
    price: "25.00",
    id: "3",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101017-1_533x.jpg?v=1649869479",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101017-4_533x.jpg?v=1649869520",
    name: "Textile Drop Earrings | Houndstooth",
    price: "25.00",
    id: "4",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101009-C-2_533x.jpg?v=1650308512",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101009-C-4_533x.jpg?v=1650308512",
    name: "Textile Drop Earrings | Checkered",
    price: "25.00",
    id: "5",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101009-B-1_533x.jpg?v=1650308456",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101009-B-4_533x.jpg?v=1650308459",
    name: "Terrace Drop Earrings | Florals",
    price: "25.00",
    id: "6",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101009-A-2_533x.jpg?v=1650308396",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101009-A-4_533x.jpg?v=1650308396",
    name: "Terrace Drop Earrings | Specks",
    price: "25.00",
    id: "7",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101045-1_533x.jpg?v=1650308318",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101045-4_533x.jpg?v=1650308327",
    name: "Jelly Hoop Earrings",
    price: "25.00",
    id: "8",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101043-1_533x.jpg?v=1650308196",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101043-4_533x.jpg?v=1650308200",
    name: "Regal Hoop Earrings",
    price: "82.00",
    id: "9",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101042-1_533x.jpg?v=1650307912",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101042-4_533x.jpg?v=1650308121",
    name: "Heartbreaker Dagle Earrings",
    price: "72.00",
    id: "10",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101032-D-2_533x.jpg?v=1650307839",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101032-D-4_533x.jpg?v=1650307839",
    name: "Glacier Hoop Earrings | Pine",
    price: "52.00",
    id: "11",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101032-C-2_533x.jpg?v=1650307778",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101032-C-4_533x.jpg?v=1650307778",
    name: "Glacier Hoop Earrings | Wine",
    price: "52.00",
    id: "12",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101032-B-1_533x.jpg?v=1650307728",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101032-B-2_533x.jpg?v=1650307727",
    name: "Glacier Hoop Earrings | Ocean",
    price: "52.00",
    id: "13",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101032-A-1_533x.jpg?v=1650307640",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101032-A-4_533x.jpg?v=1650307648",
    name: "Glacier Hoop Earrings | Clear",
    price: "52.00",
    id: "14",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101020-1_533x.jpg?v=1650307558",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101020-4_533x.jpg?v=1650307565",
    name: "Adela Drop Earrings",
    price: "52.00",
    id: "15",
  },
  {
    img1: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101031-1_533x.jpg?v=1650306784",
    img2: "https://cdn.shopify.com/s/files/1/0627/7388/7215/products/L101031-4_533x.jpg?v=1650306792",
    name: "Fawn Pearl Hoop Earrings",
    price: "30.00",
    id: "16",
  },
];

prods.sort((a, b) => b.price - a.price);

setTimeout(() => {
  prods.sort((a, b) => a.price - b.price);
}, 3000);

