import moxios from 'moxios';
import ReduxThunk from 'redux-thunk';
import rootReducer from '../../store/reducers/index';
import { applyMiddleware, createStore } from 'redux';
import {fetchTaskList} from '../../store/actions/index'
import {http} from 'axios';
describe('#Task store', () => {

    let createStoreWithMiddleware;

    beforeEach(() => {
        moxios.install(http);
        
        const middlewares = [ReduxThunk];
        createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

    });

    afterEach(() => {
        moxios.uninstall(http);
    });

    test('Store is updated correctly', async() => {
        

        const expectedState = [{
            _id:'1',
            task: 'Example title 1',
            
        },{
            _id:'2',
            task: 'Example title 2',
            
        },{
            _id:'3',
            task: 'Example title 3',
            
        }];
        
        const store = createStoreWithMiddleware(rootReducer);
        console.log(store);
/* 
        moxios.stubRequest('localhost:3000/tasks', {
            status: 200,
            response: {
                status:200,
                results: expectedState
            }
          }) */
        
       // axios.get('localhost:3000/tasks').then(resp=>console.log(resp.data));
/*          moxios.wait(() => {
             
            const request = moxios.requests.mostRecent();
            console.log('moxios wait')
            request.respondWith({
                status: 200,
                results: expectedState
            })
        });

        return store.dispatch(fetchTaskList)
        .then(() => {
            const newState = store.getState();
            console.log(newState);
        }) 
         */

        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request.respondWith({ status: 200, results: expectedState }) //mocked response
       })
  
       /* const result = await fetchUserPosts(1)
       console.log(result) // ['Post1','Post2'] 
       expect(result).toEqual(expectedPosts) */
       return store.dispatch(fetchTaskList)
        .then(() => {
            const newState = store.getState();
            console.log(newState);
        }) 
    });

});