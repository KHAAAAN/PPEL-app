
import { Router } from 'express';

import tabPageController from '../controllers/tabPageController';

const router = new Router();

//only allow updates
router.put('/*', tabPageController.update);

module.exports = router;
