const productCategory = [
    { 
        id: 1, 
        label: "Personal Care", 
        value: "personal care", 
        subcategories: [
            { id: 101, label: "Hair Care", value: "hair care" },
            { id: 102, label: "Skin Care", value: "skin care" },
            { id: 103, label: "Oral Care", value: "oral care" },
            { id: 104, label: "Men's Grooming", value: "men's grooming" },
            { id: 105, label: "Deo & Fragrances", value: "deo & fragrances" },
            { id: 106, label: "Health & Wellness", value: "health & wellness" },
        ]
    },
    { 
        id: 2, 
        label: "Kitchenware", 
        value: "kitchenware", 
        subcategories: [
            { id: 201, label: "Cookers & Steamers", value: "cookers & steamers" },
            { id: 202, label: "Kitchen Tools", value: "kitchen tools" },
            { id: 203, label: "Pots & Pans", value: "pots & pans" },
            { id: 204, label: "Containers & Storage", value: "containers & storage" },
            { id: 205, label: "Flask, Bottle & Tiffin Boxes", value: "flask, bottle & tiffin boxes" },
            { id: 206, label: "Cutting & Chopping", value: "Cutting & Chopping" },
        ]
    },
    { 
        id: 3, 
        label: "Toys & Games", 
        value: "toys & games", 
        subcategories: [
            { id: 301, label: "Bikes, Trikes & Ride-Ons", value: "bikes, trikes & ride-ons" },
            { id: 302, label: "Remote & App-Controlled Toys", value: "remote & app-controlled toys" },
            { id: 302, label: "Toy Vehicles", value: "toy vehicles" },
            { id: 302, label: "Model Building Kits", value: "model building kits" },
        ]
    },
    { 
        id: 4, 
        label: "Beauty", 
        value: "beauty", 
        subcategories: [
            { id: 401, label: "Beauty Accessories", value: "beauty accessories" },
            { id: 402, label: "Nails & Lips", value: "nails & lips" },
            { id: 403, label: "Eyes", value: "eyes" },
            { id: 404, label: "Face", value: "face" },
        ]
    },
    { 
        id: 5, 
        label: "Stationary", 
        value: "stationary", 
        subcategories: [
            { id: 501, label: "Notebooks", value: "notebooks" },
            { id: 502, label: "Pens & Pencils", value: "pens pencils" },
            { id: 503, label: "Art Supplies", value: "art supplies" },
            { id: 504, label: "Office Supplies", value: "office supplies    " },
            { id: 505, label: "Party Accessories", value: "party accessories" },
            { id: 506, label: "Children's Books", value: "children's books" },
        ]
    },
    { 
        id: 6, 
        label: "Electronics", 
        value: "electronics", 
        subcategories: [
            { id: 601, label: "Mobile Phones", value: "mobile phones" },
            { id: 602, label: "Laptops", value: "laptops" },
            { id: 603, label: "Accessories", value: "accessories" },
            { id: 604, label: "Airpods", value: "airpods" },
            { id: 605, label: "Smart Watches", value: "smart watches" },
        ]
    },
    { 
        id: 7, 
        label: "Home Decor", 
        value: "home decor", 
        subcategories: [
            { id: 701, label: "Wall Art", value: "wall art" },
            { id: 702, label: "Furniture", value: "furniture" },
            { id: 703, label: "Lighting", value: "lighting" }
        ]
    },
    { 
        id: 8, 
        label: "Groceries", 
        value: "groceries", 
        subcategories: [
            { id: 801, label: "Biscuits & Drinks", value: "biscuits, drinks" },
            { id: 802, label: "Fruits & Vegetables", value: "fruits, vegetables" },
            { id: 803, label: "Cooking Essentials", value: "cooking essentials" },
            { id: 804, label: "Dairy & Bakery", value: "dairy & bakery" },
            { id: 805, label: "Mom & Baby Care", value: "mom, baby care" },
            { id: 806, label: "Disposables", value: "disposables" },
            { id: 807, label: "Dairy & Bakery", value: "dairy & bakery" },
            { id: 808, label: "Dairy & Bakery", value: "dairy & bakery" },

        ]
    },
    { 
        id: 9, 
        label: "Gifts & Hampers", 
        value: "gifts & hampers", 
        subcategories: [
            { id: 901, label: "Tea Gifts", value: "Tea Gifts" },
            { id: 902, label: "Chocolate Gifts", value: "Chocolate Gifts" },
            { id: 903, label: "Gourmet Gifts", value: "Gourmet Gifts" },
        ]
    }
];

export default productCategory;
