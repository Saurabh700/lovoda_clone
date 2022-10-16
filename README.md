##### Lovoda is an online jewelry store, using this clone user can login, search and see products, add them to cart and purchase them.

### Learned how to create a full stacked application

### when to rerender, how to rerender and when to stop rerender

### Problems1 » In Paginate.jsx sorting feature is handled by a function and i have to rerender the page when select tag is trigerred so for that i have passed this function as a dependency to useEffect but when we pass a function as a dependency to use effect then it causes infinite rerenderes so to avoid that i had to wrap that function with a useCallback hook but to useCallback with [] as dependency but it wasn't getting rerendered when that select tag gets triggerred because useCallback will only trigerr it when page gets loaded »» this is the problem that i was facing and to solve this problem i have declared a new count variable and i am passing it as a dependency to the useCallback so that the page will only rerender when the count variable gets trigerred and this is how we can solve this problem of getting infinite rerenders

## this problem occurs because useEffect cannot rerender the page when dependency array gets modified, here when we are sorting the data than jewelryItems gets modified but it wont make useEffect to rerender thats why current items wont get modified

## if we pass a function as a dependency array then it will cause infinite rerenders because function gets recomputed every time our component gets rerendered even if the value inside the function remain unchanged thats why we have to use useCallback hook which will only recompute the function when dependency array trigerred

### Problem2 » Page was getting rerendered before i got the data from api » to solve that i have used a useTimeout to load that component after 1 second

#### Problem 3 » when i was removing items from wishlist then dom wasnt rerendering because on dom there jewelery array and we are modifying wishlist array thats why useSelector wont rerender jewelery array when wishlist array gets modified thats why i passed a setCount to wishlist component and i was modifying setcount when item gets deleted and this setCount is used as a dependency array to useEffect in which i am manipulating setLoading to rerender jewelry items in Home.jsx
