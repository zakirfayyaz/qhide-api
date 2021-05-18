function checkEmpty(val) {
    if (val == undefined || val == " " || val == null) {
        return true
    }
    else {
        return false
    }
}

module.exports = checkEmpty