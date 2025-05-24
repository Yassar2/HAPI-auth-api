const Skill = require('../models/Skill');

const getSkillsHandler = async (request, h) => {
  const data = await Skill.find();
  return h.response(data);
};

module.exports = [
  {
    method: 'GET',
    path: '/api/skills',
    handler: getSkillsHandler,
  },
];
