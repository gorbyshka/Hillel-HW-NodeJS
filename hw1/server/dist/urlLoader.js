"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class UrlLoader {
    constructor(urls) {
        this.urls = urls;
        this.results = [];
    }
    loadingOneByOne() {
        return __awaiter(this, void 0, void 0, function* () {
            const uniqueResults = [];
            for (const url of this.urls) {
                try {
                    const response = yield axios_1.default.get(url);
                    const existingResult = uniqueResults.find(result => result.data === response.data && result.error === null);
                    if (!existingResult)
                        uniqueResults.push({ data: response.data, error: null });
                }
                catch (errorData) {
                    console.log(errorData);
                    uniqueResults.push({ data: null, error: errorData });
                }
            }
            this.results = uniqueResults;
        });
    }
    getResults() { return this.results; }
}
exports.default = UrlLoader;
