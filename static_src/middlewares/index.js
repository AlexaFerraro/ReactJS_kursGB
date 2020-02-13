import messageMiddleware from './messageMiddleware';
import highlightMiddleware from './highlightMiddleware';
import { apiMiddleware } from 'redux-api-middleware';

export default [
   messageMiddleware,
   highlightMiddleware,
   apiMiddleware,
];