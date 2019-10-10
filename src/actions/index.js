import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
        await dispatch(fetchPosts());
        
//        const userIds = _.uniq(_.map(getState().posts, 'userId'));
//        userIds.forEach(id => dispatch (fetchUser(id)))


       _.chain(getState().posts) //chain - łączy szereg dodatkowych funkcji(jej argument jest zawsze "włożony" jako pierwszy argument funkcji po niej następujacej, argumentem każdej kolejnej funkcji jest efekt funkcji poprzedniej); getState - pobranie stanu
        .map('userId') // jej pierwszy argunment to getState dzięki funkcji chain, a drugi, trzeci lub czwary dopisujemy
        .uniq() //argumentem jest wynik poprzedniej funkcji; innych nie potrzebujemy, więc zostaje tylko ()
        .forEach( id => dispatch(fetchUser(id))) 
        .value() //na końcu dopisujemy by zakończyć i otrzymać ostateczną    wartość
};

export const fetchPosts = () => async dispatch => {
        const response = await jsonPlaceholder.get('/posts');
        
        dispatch({ type: 'FETCH_POSTS', payload: response.data});
};

export const fetchUser = id => async dispatch => {
        const response = await jsonPlaceholder.get(`/users/${id}`)

        dispatch({ type: 'FETCH_USER', payload: response.data});
};

// export const fetchUser = id => dispatch => _fetchUser(id, dispatch)
// const _fetchUser = _.memoize(async (id, dispatch) => {
//         const response = await jsonPlaceholder.get(`/users/${id}`)
//         dispatch({ type: 'FETCH_USER', payload: response.data});
// });

