_-----USER-----_

1.For new user registation
@ endpoint:/api/user
@ method:POST
@ req-body:{
name:string,
avatar:file -> optional(),
email:string,
password:{type:string,min:5},
role:user|admin ->optional()
}

2.For update exist user
@ endpoint:/api/users/:userId
@ method:PUT,
@ req-body: name|avatar|

3.For delete exist user
@ endpoint:/api/users/:userId
@ method:DELETE,
@ req-body:null

4.For Get user by id
@ endpoint:/api/users/:userId
@ method:GET,
@ req-body:null

5.For Get all user
@ endpoint:/api/users
@ method:GET,
@ req-body:null

6.For login user
@ endpoint:/api/users/:userId/password
@ method:POST,
@ req-body:{
password:string,
newPassword:string
}

7.For login user
@ endpoint:/api/login
@ method:POST,
@ req-body:{
email:string,
password:{type:string,min:5},
}

_----CATEGORY----_
1.For create new category
@ endpoint:/api/category
@ method:POST,
@ req-body:{
name:string,
}
2.For get all category
@ endpoint:/api/categories
@ method:GET,
@ req-body:null

3.For create new sub-category
@ endpoint:/api/categories/:id/subcategory
@ method:POST,
@ req-body:{
name:string,
}
4.For get all sub-category
@ endpoint:/api/subcategories
@ method:GET,
@ req-body:null

_----PRODUCT-----_

1.For create new product
@ endpoint:/api/product
@ method:POST,
@ req-body:{
name:string,
description:string,
features: Array,
price:number,
stock:number,
cover:1 image file,
feature:2 image file,
discount:number,
rating: {
rate: {
type: Number,
default: 0,
},
count: {
type: Number,
default: 0,
},
},
category:string -->category slug,
subcategory:string -->subcategory slug,
}

2.For update existing product
@ endpoint:/api/products/:id
@ method:PUT,
@ req-body:{
name:string,
description:string,
features: Array,
price:number,
stock:number,
cover:1 image file,
feature:2 image file,
discount:number,
rating: {
rate: {
type: Number,
default: 0,
},
count: {
type: Number,
default: 0,
},
}
}

3.For delete existing product
@ endpoint:/api/products/:id
@ method:DELETE,
@ req-body:null

4.For get all products
@ endpoint:/api/products?
@ query-field:category,subcategory,discount,stock,search,priceMin,priceMax,page,limit,rate,&orderBy=price:desc
@ method:GET,
@ req-body:null

_-----PRODUCT ORDER-----_

1.For create new order
@ endpoint:/api/order
@ method:POST,
@ req-body:{
userId,
products:string[] -->all product id,
totalAmount:number,
subTotal:number,
deliveryCharge:number,
quantity:number,
phone:number,
address:string,
}

2.get order by user id
@ endpoint:/api/orders/:userId
@ method:GET,
@ req-body:null

3.get all order
@ endpoint:/api/orders/
@ method:GET,
@ req-body:null

_-----cart----_
1.add to cart
@ endpoint:/api/cart
@ method:POST,
@ req-body:{
userId,
product: productId,
totalAmount:number,
subTotal:number,
quantity:number,
}

2.remove from cart
@ endpoint:/api/cart/:id
@ method:DELETE,
@ req-body:null

3.update existing cart
@ endpoint:/api/cart/:id
@ method:PUT,
@ req-body:{
quantity:number,
}

4.get all cart list by user id
@ endpoint:/api/cart/:userId
@ method:GET,
@ req-body:null
