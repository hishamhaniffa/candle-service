import { NextFunction, Request, Response, Router, } from 'express';
import { body } from 'express-validator';
import * as StockController from './controller/stock';

const router = Router();

/**
 * Health check route for the API exposed - for multi-core usage probe test
 */
router
    .route('/health-check')
    .get(
        async (req: Request, res: Response): Promise<Response> => {
            return res.status(200).send({
                message: "OK",
            });
        }
    )

/** stock route which returns the price per interval per stock provided */
router
    .route('/stocks/:ticker')
    .get(StockController.getStockPriceByTicker)


export default router;