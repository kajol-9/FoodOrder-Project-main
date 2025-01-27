import { ALL_RESTAURANTS_FAIL, ALL_RESTAURANTS_REQUEST, ALL_RESTAURANTS_SUCCESS, CLEAR_ERROR, SORT_BY_RATINGS,SORT_BY_REVIEWS,TOGGLE_VEG_ONLY } from '../constants/restaurantConstant';

const initialState = {
    restaurants: [],
    loading:false,
    error:null,
};
const calculatePureVegCount=(restaurants,showVeg)=>{
    if(!showVeg){
        return restaurants.length;
    }
    else{
        return restaurants.filter((restaurant)=>restaurant.isVeg).length;
    }
};
export const restaurantReducer = (state = initialState, action) => {
    switch(action.type) {
        case ALL_RESTAURANTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ALL_RESTAURANTS_SUCCESS:
            return {
                ...state,
                loading: false,
                count: action.payload.count,
                restaurants: action.payload.restaurants,
            };

        case ALL_RESTAURANTS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload,

            }; 
        case SORT_BY_RATINGS:
            return {
                    ...state,
                    restaurants:[...state.restaurants].sort(
                (a,b)=> b.rating-a.ratings),

             };
             case SORT_BY_REVIEWS:
            return {
                    ...state,
                    restaurants:[...state.restaurants].sort(
                (a,b)=> b.numOfReviews-a.numOfReviews),

             };
             case TOGGLE_VEG_ONLY:
            return {
                    ...state,
                    showVeg:!state.showVeg,
                    pureVegRestaurantsCount:calculatePureVegCount(
                        state.restaurants,
                        !state.showVeg
                    ),
                   

             };
             case CLEAR_ERROR:
                 return{
                    ...state,
                    error:null,
                 };
        default:
            return state;
    }
};
