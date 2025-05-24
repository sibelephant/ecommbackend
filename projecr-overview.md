database tables 

--------------------------------------------------------------------------------------------------------
|                                                                                                       |
|                                                                                                       |
|                                                                                                       |
|
|
|
|
|
|
|
|
|
|
|
|
|
________________________________________________________________________________________________________


Routes 
for user
/login -> to log in users
/signup -> signup users
/me -> to return current logged in user based on auth token(Role based Auth)


Role Based Routes

for products
/products(post) -> to create a product
/products/:id(get,put,delete) ->fetch , update and delete a single product
/products(get) -> Search api for products, this will include full text search

For cart

/cart(post) -> to add product to cart
/cart(get) -> to list the cart
/cart(put) -> modify the cart

For Orders

/orders(post) -> create a  order from the cart
/orders(get) -> list all orders of user
/orders/:id(get) -> list single order and it's products

