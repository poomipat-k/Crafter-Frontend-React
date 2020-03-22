import React from "react";

const DUMMY_SHOP_DATA = {
  polo: [
    {
      id: "p1",
      category: "polo",
      imageUrl:
        "https://media.quiksilver.co.th/media/catalog/product/cache/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/e/q/eqmkt03016_quiksilver_mens_waterpolo_2_short_sleeve_polo_shirt_brd0_1_h.jpg",
      description: "This is the best Polo from our shop craft by Ployen",
      price: 320,
      sold: 1200
    },
    {
      id: "p2",
      category: "polo",
      imageUrl:
        "data:image/jpeg;base64,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",
      description: "เสื้อโปโลเนื้อผ้าพรีเมียม จากคุณ พลอย",
      price: 280,
      sold: 509
    },
    {
      id: "p3",
      category: "polo",
      imageUrl:
        "https://www.egosportthailand.com/wp-content/uploads/2019/07/6155-07.jpg",
      description: "This is the best Polo from our shop craft by Ployen",
      price: 399,
      sold: 12000
    }
  ],
  tshirt: [
    {
      id: "ts1",
      category: "tshirt",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQaWts15WsfV4hQnseb0pZryPlzuHKKy8eVTmv_dmsjHhDswAal",
      description: "This is the best Polo from our shop craft by Ployen",
      price: 320,
      sold: 1200
    },
    {
      id: "ts2",
      category: "tshirt",
      imageUrl:
        "https://www.whiteswandrycleaners.co.uk/wp-content/uploads/2018/09/mock-10-2122-14213D-nh-ns-111802514472174936291489614087-3_1800x-1000x658.png",
      description: "This is the best Polo from our shop craft by Ployen",
      price: 280,
      sold: 509
    },
    {
      id: "ts3",
      category: "tshirt",
      imageUrl:
        "https://wwws.dior.com/couture/ecommerce/media/catalog/product/cache/1/zoom_image_1/3000x2000/17f82f742ffe127f42dca9de82fb58b1/N/v/1570643102_863J621I0533_C980_E01_ZH.jpg",
      description: "This is the best Polo from our shop craft by Ployen",
      price: 399,
      sold: 12000
    }
  ],
  bag: [
    {
      id: "b1",
      category: "bag",
      imageUrl:
        "https://th-test-11.slatic.net/original/88491ee22a0d3418a1cc3efc4463d8ae.jpg_720x720q80.jpg_.webp",
      description: "This is the best Polo from our shop craft by Ployen",
      price: 320,
      sold: 1200
    },
    {
      id: "b2",
      category: "bag",
      imageUrl:
        "https://dexiino.com/wp-content/uploads/2020/01/canvas-bag-dexiino.jpg",
      description: "This is the best Polo from our shop craft by Ployen",
      price: 280,
      sold: 509
    },
    {
      id: "b3",
      category: "bag",
      imageUrl: "https://cf.shopee.co.th/file/3dc562bd33e192a71f37d7afcd03ecc0",
      description: "This is the best Polo from our shop craft by Ployen",
      price: 399,
      sold: 12000
    }
  ]
};

const ShopPost = props => {
  let id;
  try {
    id = props.location.pathname
      .split("/")
      .slice(-1)[0]
      .split("-id.")
      .slice(-1)[0];
  } catch (err) {
    console.log(err);
  }
  if (!id) {
    id = "Something went wrong, please try again later.";
  }
  let foundItem;
  for (let cat in DUMMY_SHOP_DATA) {
    foundItem = DUMMY_SHOP_DATA[cat].find(item => item.id === id);
    if (foundItem) {
      break;
    }
  }

  console.log(foundItem);

  return (
    <React.Fragment>
      <h1>{id}</h1>
    </React.Fragment>
  );
};

export default ShopPost;
