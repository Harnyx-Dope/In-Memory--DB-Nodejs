const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const authenticateToken = require('../middleware/authentication');

 
// Define routes
router.get('/AccessAllow', controller.getAccess);
router.post('/addRecord', authenticateToken, controller.addRecord);
router.delete('/deleteRecord', authenticateToken, controller.deleteRecord);
router.get('/summaryStatistics/all', controller.getSummaryStatisticsAll);
router.get('/summaryStatistics/onContract', controller.getSummaryStatisticsOnContract);
router.get('/summaryStatistics/department', controller.getSummaryStatisticsByDepartment);
router.get('/summaryStatistics/departmentSubDepartment', controller.getSummaryStatisticsByDepartmentAndSubDepartment);

module.exports = router;
