// middlewares/menuMiddleware.js
const menuController = require('../controllers/menuController');

const getMenuItemsMiddleware = async (req, res, next) => {
  try {
    const menuItems = await menuController.getMenuItems();
    res.locals.menuItems = menuItems; // res.locals에 메뉴 항목 추가
    next();
  } catch (error) {
    console.error(error);
    next(error); // 에러 처리를 위해 next에 에러를 전달
  }
};

module.exports = getMenuItemsMiddleware;
