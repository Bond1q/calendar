/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/server/src/app/absence/absence.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbsenceController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const absence_service_1 = __webpack_require__("./apps/server/src/app/absence/absence.service.ts");
const create_absence_dto_1 = __webpack_require__("./apps/server/src/app/absence/dto/create-absence.dto.ts");
const update_absence_dto_1 = __webpack_require__("./apps/server/src/app/absence/dto/update-absence.dto.ts");
let AbsenceController = class AbsenceController {
    constructor(absenceService) {
        this.absenceService = absenceService;
    }
    getAllAbsence() {
        return this.absenceService.getAllAbsence();
    }
    createAbsence(absence) {
        return this.absenceService.createAbsence(absence);
    }
    updateAbsence(id, absence) {
        return this.absenceService.updateAbsence(id, absence);
    }
    deleteAbsence(id) {
        return this.absenceService.deleteAbsence(id);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AbsenceController.prototype, "getAllAbsence", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof create_absence_dto_1.CreateAbsenceDto !== "undefined" && create_absence_dto_1.CreateAbsenceDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AbsenceController.prototype, "createAbsence", null);
tslib_1.__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof update_absence_dto_1.UpdateAbsenceDto !== "undefined" && update_absence_dto_1.UpdateAbsenceDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AbsenceController.prototype, "updateAbsence", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    tslib_1.__param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], AbsenceController.prototype, "deleteAbsence", null);
AbsenceController = tslib_1.__decorate([
    (0, common_1.Controller)('absence'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof absence_service_1.AbsenceService !== "undefined" && absence_service_1.AbsenceService) === "function" ? _a : Object])
], AbsenceController);
exports.AbsenceController = AbsenceController;


/***/ }),

/***/ "./apps/server/src/app/absence/absence.model.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Absence = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const types_1 = __webpack_require__("./libs/shared/types/src/index.ts");
let Absence = class Absence {
};
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: types_1.AbsenceTypes }),
    tslib_1.__metadata("design:type", typeof (_a = typeof types_1.AbsenceTypes !== "undefined" && types_1.AbsenceTypes) === "function" ? _a : Object)
], Absence.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Absence.prototype, "dateStart", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Absence.prototype, "dateEnd", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Absence.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Absence.prototype, "id", void 0);
Absence = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Absence);
exports.Absence = Absence;


/***/ }),

/***/ "./apps/server/src/app/absence/absence.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbsenceModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const absence_controller_1 = __webpack_require__("./apps/server/src/app/absence/absence.controller.ts");
const absence_model_1 = __webpack_require__("./apps/server/src/app/absence/absence.model.ts");
const absence_service_1 = __webpack_require__("./apps/server/src/app/absence/absence.service.ts");
let AbsenceModule = class AbsenceModule {
};
AbsenceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([absence_model_1.Absence])],
        controllers: [absence_controller_1.AbsenceController],
        providers: [absence_service_1.AbsenceService],
    })
], AbsenceModule);
exports.AbsenceModule = AbsenceModule;


/***/ }),

/***/ "./apps/server/src/app/absence/absence.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbsenceService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const absence_model_1 = __webpack_require__("./apps/server/src/app/absence/absence.model.ts");
const types_1 = __webpack_require__("./libs/shared/types/src/index.ts");
const moment = __webpack_require__("moment");
let AbsenceService = class AbsenceService {
    constructor(absenceRepository) {
        this.absenceRepository = absenceRepository;
    }
    getAllAbsence() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.absenceRepository.find();
        });
    }
    createAbsence(absence) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (absence.type !== types_1.AbsenceTypes.SICK && moment(absence.dateStart).isBefore(moment(), 'day')) {
                throw new common_1.HttpException(`Cannot create absence with type: ${absence.type} in the past`, common_1.HttpStatus.BAD_REQUEST);
            }
            const findedAbsences = yield this.absenceRepository.find({
                where: {
                    dateStart: (0, typeorm_2.Between)(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
                    dateEnd: (0, typeorm_2.Between)(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
                },
            });
            if (findedAbsences.length === 0) {
                const result = yield this.absenceRepository.insert(absence);
                return this.absenceRepository.findOneBy({ id: result.raw[0].id });
            }
            throw new common_1.HttpException('There is absence in this period in database', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    updateAbsence(id, absence) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findedAbsences = yield this.absenceRepository.find({
                where: {
                    dateStart: (0, typeorm_2.Between)(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
                    dateEnd: (0, typeorm_2.Between)(moment(absence.dateStart).toDate(), moment(absence.dateEnd).toDate()),
                    id: (0, typeorm_2.Not)(id),
                },
            });
            if (findedAbsences.length !== 0) {
                throw new common_1.HttpException('There is absence in this period in database', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = yield this.absenceRepository.update(id, absence);
            if (result.affected)
                return this.absenceRepository.findOneBy({ id: id });
            throw new common_1.HttpException('There is not such id in database', common_1.HttpStatus.BAD_REQUEST);
        });
    }
    deleteAbsence(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const res = yield this.absenceRepository.delete(id);
            if (res.affected)
                return this.absenceRepository.findOneBy({ id: id });
            throw new common_1.HttpException('There is not such id in database', common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
AbsenceService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_1.InjectRepository)(absence_model_1.Absence)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], AbsenceService);
exports.AbsenceService = AbsenceService;


/***/ }),

/***/ "./apps/server/src/app/absence/dto/create-absence.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAbsenceDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const types_1 = __webpack_require__("./libs/shared/types/src/index.ts");
class CreateAbsenceDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(types_1.AbsenceTypes, { message: "Incorrect absence type" }),
    tslib_1.__metadata("design:type", typeof (_a = typeof types_1.AbsenceTypes !== "undefined" && types_1.AbsenceTypes) === "function" ? _a : Object)
], CreateAbsenceDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CreateAbsenceDto.prototype, "dateStart", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], CreateAbsenceDto.prototype, "dateEnd", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(200),
    tslib_1.__metadata("design:type", String)
], CreateAbsenceDto.prototype, "comment", void 0);
exports.CreateAbsenceDto = CreateAbsenceDto;


/***/ }),

/***/ "./apps/server/src/app/absence/dto/update-absence.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAbsenceDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
class UpdateAbsenceDto {
}
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UpdateAbsenceDto.prototype, "dateStart", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], UpdateAbsenceDto.prototype, "dateEnd", void 0);
exports.UpdateAbsenceDto = UpdateAbsenceDto;


/***/ }),

/***/ "./apps/server/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const config_1 = __webpack_require__("@nestjs/config");
const absence_module_1 = __webpack_require__("./apps/server/src/app/absence/absence.module.ts");
const absence_model_1 = __webpack_require__("./apps/server/src/app/absence/absence.model.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env'
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env['POSTGRES_HOST'],
                port: Number(process.env['POSTGRES_PORT']),
                username: process.env['POSTGRES_USER'],
                password: process.env['POSTGRES_PASSWORD'],
                database: process.env['POSTGRES_DB'],
                entities: [absence_model_1.Absence],
                synchronize: true,
            }),
            absence_module_1.AbsenceModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./libs/shared/types/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/shared/types/src/lib/shared-types.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/shared/types/src/lib/types.ts"), exports);


/***/ }),

/***/ "./libs/shared/types/src/lib/shared-types.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sharedTypes = void 0;
function sharedTypes() {
    return 'shared-types';
}
exports.sharedTypes = sharedTypes;


/***/ }),

/***/ "./libs/shared/types/src/lib/types.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AbsenceTypes = void 0;
var AbsenceTypes;
(function (AbsenceTypes) {
    AbsenceTypes["SICK"] = "sick";
    AbsenceTypes["VACATION"] = "vacation";
})(AbsenceTypes = exports.AbsenceTypes || (exports.AbsenceTypes = {}));


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "moment":
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/server/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
        const port = process.env['PORT'] || 3333;
        app.setGlobalPrefix('calendar-server.netlify.app');
        yield app.listen(port);
        common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map