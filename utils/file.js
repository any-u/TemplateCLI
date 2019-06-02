const fs = require('fs')

const utils = {
    writeFile(path, data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, data, 'utf8', function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    },
    checkDirExist(folderpath) {
        const pathArr = folderpath.split('/');
        let _path = '';
        for (let i = 0; i < pathArr.length; i++) {
            if (pathArr[i]) {
                _path += `/${pathArr[i]}`;
                console.log('111', _path, fs.existsSync(_path))
                if (!fs.existsSync(_path)) {
                    console.log('2222')
                    fs.mkdirSync(_path);
                }
            }
        }
    }
}
module.exports = utils