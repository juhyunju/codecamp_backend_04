const sharp = require("sharp");
const { Storage } = require("@google-cloud/storage");
exports.GenerateThumbnail = async (event, context) => {
    const gcsEvent = event;
    if (event.name.includes("thumb/")) return;

    console.log("aaaaaaaaaaaaaaaaaaaa", gcsEvent);

    const size = [
        { dir: "s", width: 320 },
        { dir: "m", width: 640 },
        { dir: "l", width: 1280 },
    ];

    const storage = new Storage().bucket("juju-storage");

    const results = await Promise.all(
        size.map((ele) => {
            return new Promise((resolve, reject) => {
                storage
                    .file(gcsEvent.name)
                    .createReadStream()
                    .pipe(sharp().resize({ width: ele.width }))
                    .pipe(
                        storage
                            .file(`thumb/${ele.dir}/${gcsEvent.name}`)
                            .createWriteStream()
                    )
                    .on("finish", () => resolve())
                    .on("error", () => reject("실패"));
            });
        })
    );
    return results;
};
