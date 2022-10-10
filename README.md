##### Lovoda is an online jewelry store, using this clone user can login, search and see products, add them to cart and purchase them.

### Learned how to create a full stacked application

### when to rerender, how to rerender and when to stop rerender

### Problems1 » In Paginate.jsx sorting feature is handled by a function and i have to rerender the page when select tag is trigerred so for that i have passed this function as a dependency to useEffect but when we pass a function as a dependency to use effect then it causes infinite rerenderes so to avoid that i had to wrap that function with a useCallback hook but to useCallback with [] as dependency but it wasnt getting rerendered when that select tag gets triggerred because useCallback will only trigerr it when page gets loaded »» this is the problem that i was facing and to solve this problem i have declared a new count variable and i am passing it as a dependency to the useCallback so that the page will only rerender when the count variable gets trigerred and this is how we can solve this problem of getting infinite rerenders

### Problem2 » Page was getting rerendered before i got the data from api » to solve that i have used a useTimeout to load that component after 1 second
