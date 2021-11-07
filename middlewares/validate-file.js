const { request, response } = require("express");
const { validExtensionsForImage } = require("../utils/extensions-image");


const validateFlieUploades = (req = request, res = response, next) => {

    if (
        !req.files ||
        Object.keys(req.files).length == 0 ||
        !req.files.file
    ) {
        return res.status(400).json(
            {
                ok: false,
                msg: "No files were uploaded correctly"
            }
        );
    } else {

        const { file } = req.files;
        const cutName = file.name.split(".");
        const extensionName = cutName[cutName.length - 1];

        if (!validExtensionsForImage.includes(extensionName)) return res.status(400).json(
            {
                ok: false,
                msg: `Invalid extension of the image, extensions valid: ${validExtensionsForImage}`
            }
        );
    }
    next();
}






module.exports = {
    validateFlieUploades
}



