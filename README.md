# Free-Cart-Client

## Getting ready for own deployment :
 - Clone it
   - `git clone https://github.com/maifeeulasad/Free-Cart-Client.git`
   - Or download `https://github.com/maifeeulasad/Free-Cart-Client/archive/refs/heads/master.zip` 
 - Open `/src/defaults.js` and change the server url : https://github.com/maifeeulasad/Free-Cart-Client/blob/master/src/defaults.js#L1
 - And you can change the default image url also, that's just a line below.
 - Build
 - Share with your client

## API 
 - **GET** */product/featured/*
   - 
    ```
    [
      {
        "id": "string id",
        "name": "product name",
        "title": "product title",
        "details": "product details",
        "tags": ["tag1", "tag2"],
        "price": 0,
        "discount": 0,
        "image": "",
        "availability": 100,
        "minimum_order":1,
      },
      ...
    ]
    ```
 - **POST** */product/order/*
   -
   ```
   {
     user_details: {
       name: 'name',
       address: 'address',
       contact: 'contact number'
     },
     cart_items: { '1': { count: 1, price: 440 }, '4': { count: 5, price: 3350 } }
   }
   ```

## Snaps : 

Home                       |  Home with a few orders
:-------------------------:|:-------------------------:
![home-free cart client-mua-maifee](https://github.com/maifeeulasad/Free-Cart-Client/blob/gh-pages/snaps/Screenshot_2021-04-18-13-55-19-163_com.freecartclient.jpg) | ![home with order-free cart client-mua-maifee](https://github.com/maifeeulasad/Free-Cart-Client/blob/gh-pages/snaps/Screenshot_2021-04-18-13-55-25-392_com.freecartclient.jpg)

Cart                       |  Checkout/Place Order
:-------------------------:|:-------------------------:
![cart-free cart client-mua-maifee](https://github.com/maifeeulasad/Free-Cart-Client/blob/gh-pages/snaps/Screenshot_2021-04-18-13-55-28-776_com.freecartclient.jpg) | ![checkout/place order-free cart client-mua-maifee](https://github.com/maifeeulasad/Free-Cart-Client/blob/gh-pages/snaps/Screenshot_2021-04-18-13-55-56-094_com.freecartclient.jpg)

## Custom build :
**If you need custom feature, you can contact with me. I think we can come to some sort of agreement**

Features like :
 - implement login
  - basic
  - jwt
  - oauth2
 - group product by tag
 - add analytics
 - add location suppport
 - product suggestion(backend in django or node using tensorflow)

## Need server ?
Build your own **or contact me**
