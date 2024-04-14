const { HTTP_STATUS } = require('../utils/constants');

const getProfile = async (req, res, next) => {
    const {Profile} = req.app.get('models')
    const profile = await Profile.findOne({where: {id: req.get('profile_id') || 0}})

    if(!profile) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).end()
    }

    req.profile = profile
    next()
}
module.exports = {getProfile}