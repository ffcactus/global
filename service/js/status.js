const HEALTH_NORMAL = "normal";
const HEALTH_WARNNING = "warning";
const HEALTH_CRITICAL = "critical";

const LIFE_CYCLE_INIT = "initializing";
const LIFE_CYCLE_NORMAL = "normal";
const LIFE_CYCLE_TERMINATING = "terminating";
const LIFE_CYCLE_TERMINATED = 'terminated';

var status = {
  "health": HEALTH_NORMAL,
  "lifeCycle": LIFE_CYCLE_TERMINATED,
  "message" : ""
};

exports.HEALTH_NORMAL = HEALTH_NORMAL;
exports.HEALTH_WARNNING = HEALTH_WARNNING;
exports.HEALTH_CRITICAL = HEALTH_CRITICAL;
exports.LIFE_CYCLE_INIT = LIFE_CYCLE_INIT;
exports.LIFE_CYCLE_NORMAL = LIFE_CYCLE_NORMAL;
exports.LIFE_CYCLE_TERMINATING = LIFE_CYCLE_TERMINATING;
exports.LIFE_CYCLE_TERMINATED = LIFE_CYCLE_TERMINATED;

exports.getStatus = getStatus;
exports.setHealth = setHealth;
exports.setLifeCycle = setLifeCycle;
exports.setMessage = setMessage;

function getStatus() {
  return status;
}

function setHealth(health) {
  status.health = health;
}

function setLifeCycle(lifeCycle) {
  status.lifeCycle = lifeCycle;
}

function setMessage(message) {
  status.message = message;
}


