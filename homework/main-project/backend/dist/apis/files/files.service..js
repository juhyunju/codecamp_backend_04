"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
let FilesService = class FilesService {
    async upload({ files }) {
        const waitedFiles = await Promise.all(files);
        console.log(waitedFiles);
        const bucket = "juju-storage";
        const storage = new storage_1.Storage({
            projectId: "emerald-lattice-358105",
            keyFilename: "gcp-file-storage.json",
        }).bucket("juju-storage");
        const results = await Promise.all(waitedFiles.map((el) => {
            return new Promise((resolve, reject) => {
                el.createReadStream()
                    .pipe(storage.file(el.filename).createWriteStream())
                    .on("finish", () => resolve(`${bucket}/${el.filename}`))
                    .on("error", () => reject("실패"));
            });
        }));
        return results;
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)()
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service..js.map