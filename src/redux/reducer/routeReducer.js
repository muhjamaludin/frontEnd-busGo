import * as RouteActions from '../actions/routeActions';
import { LOGOUT_SUCCESS } from '../actions/authActions';

const initialState = {
  lastUpdated: null,
  isFetching: false,
  isSynced: false,
  routes: []
};

export function routeReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        routes: action.routes
      };
    case RouteActions.GET_ROUTES_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.GET_ROUTES_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.GET_ROUTES_FROM_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        routes: action.routes
      };
    case RouteActions.ADD_ROUTE_TO_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.ADD_ROUTE_TO_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.ADD_ROUTE_TO_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.ADD_ROUTE_TO_STATE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        routes: [
          ...state.routes.filter(
            t => t.route_id !== action.routeToAdd.route_id
          ),
          action.routeToAdd
        ]
      };
    case RouteActions.UPDATE_ROUTE_IN_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.UPDATE_ROUTE_IN_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.UPDATE_ROUTE_IN_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.DELETE_ROUTE_IN_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.DELETE_ROUTE_IN_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.DELETE_ROUTE_IN_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.DELETE_ROUTE_IN_STATE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced,
        routes: state.routes.filter(route => {
          return route.route_id !== action.routeToDelete.route_id;
        })
      };
    case RouteActions.GET_ROUTE_INFO_FROM_DB_REQUEST:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.GET_ROUTE_INFO_FROM_DB_FAILURE:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    case RouteActions.GET_ROUTE_INFO_FROM_DB_SUCCESS:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        isFetching: action.isFetching,
        isSynced: action.isSynced
      };
    default:
      return state;
  }
}
