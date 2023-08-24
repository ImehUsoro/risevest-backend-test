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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommentController = exports.updateCommentController = exports.getCommentController = exports.getCommentsController = exports.createCommentController = void 0;
const createCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createCommentController = createCommentController;
const getCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getCommentsController = getCommentsController;
const getCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getCommentController = getCommentController;
const updateCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateCommentController = updateCommentController;
const deleteCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteCommentController = deleteCommentController;
